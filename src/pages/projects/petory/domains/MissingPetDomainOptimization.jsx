import { Link } from 'react-router-dom';
import MermaidDiagram from '../../../../components/Common/MermaidDiagram';
import TableOfContents from '../../../../components/Common/TableOfContents';

function MissingPetDomainOptimization() {
  const sections = [
    { id: 'intro', title: '개요' },
    { id: 'test-design', title: '문제 재현 방식 (테스트 설계)' },
    { id: 'before', title: '성능 측정 결과 (개선 전)' },
    { id: 'optimization', title: '성능 최적화 및 동시성 제어' },
    { id: 'after', title: '성능 개선 결과 (개선 후)' }
  ];

  const beforeSequenceDiagram = `sequenceDiagram
    participant User as 사용자
    participant Frontend as Frontend
    participant Controller as MissingPetBoardController
    participant Service as MissingPetBoardService
    participant Repo as MissingPetBoardRepository
    participant Converter as MissingPetConverter
    participant FileService as AttachmentFileService
    participant DB as MySQL
    
    User->>Frontend: GET /api/missing-pets
    Frontend->>Controller: listBoards(status)
    Controller->>Service: getBoards(status)
    
    Note over Service,Repo: 1. 게시글 조회 (1번 쿼리)
    Service->>Repo: findAllByOrderByCreatedAtDesc()
    Repo->>DB: SELECT mpb, u FROM missing_pet_board mpb<br/>JOIN users u ON ... (쿼리 1)
    DB-->>Repo: MissingPetBoard 리스트 반환 (103개)
    Repo-->>Service: List<MissingPetBoard>
    
    Service->>Converter: toBoardDTOList(boards)
    
    Note over Converter,DB: 2. N+1 문제: 댓글 조회
    loop 각 게시글마다 (103번)
        Converter->>Converter: toBoardDTO(board)
        Converter->>DB: board.getComments()<br/>LAZY 로딩 트리거
        DB-->>Converter: SELECT c, u FROM missing_pet_comment<br/>WHERE board_idx=? (쿼리 2, 3, 4...)
        Note over DB: 각 게시글마다<br/>개별 쿼리 실행
    end
    
    Note over Service,FileService: 3. N+1 문제: 파일 조회
    loop 각 게시글마다 (103번)
        Service->>FileService: getAttachments(MISSING_PET, boardIdx)
        FileService->>DB: SELECT * FROM file<br/>WHERE target_type=? AND target_idx=? (쿼리 105, 106, 107...)
        DB-->>FileService: File 리스트
        FileService-->>Service: List<FileDTO>
    end
    
    Converter-->>Service: List<MissingPetBoardDTO>
    Service-->>Controller: List<MissingPetBoardDTO>
    Controller-->>Frontend: JSON 응답
    Frontend-->>User: 실종 제보 목록 표시
    
    Note over Service,DB: 총 207개 쿼리 발생<br/>- 게시글 조회: 1개<br/>- 댓글 조회: 103개<br/>- 파일 조회: 103개`;

  const afterSequenceDiagram = `sequenceDiagram
    participant User as 사용자
    participant Frontend as Frontend
    participant Controller as MissingPetBoardController
    participant Service as MissingPetBoardService
    participant Repo as MissingPetBoardRepository
    participant Converter as MissingPetConverter
    participant FileService as AttachmentFileService
    participant DB as MySQL
    
    User->>Frontend: GET /api/missing-pets
    Frontend->>Controller: listBoards(status)
    Controller->>Service: getBoards(status)
    
    Note over Service,Repo: 1. 게시글+댓글 조회 (JOIN FETCH)
    Service->>Repo: findAllWithCommentsByOrderByCreatedAtDesc()
    Repo->>DB: SELECT DISTINCT mpb, u, c, cu FROM missing_pet_board mpb<br/>JOIN FETCH mpb.user u<br/>LEFT JOIN FETCH mpb.comments c<br/>LEFT JOIN FETCH c.user cu<br/>WHERE ... (쿼리 1)
    Note over DB: 게시글, 사용자, 댓글, 댓글 작성자<br/>한 번에 조회
    DB-->>Repo: MissingPetBoard 리스트 반환 (103개, comments 포함)
    Repo-->>Service: List<MissingPetBoard>
    
    Note over Service,FileService: 2. 파일 배치 조회
    Service->>Service: boardIds 추출 (103개 ID)
    Service->>FileService: getAttachmentsBatch(MISSING_PET, boardIds)
    FileService->>DB: SELECT * FROM file<br/>WHERE target_type=? AND target_idx IN (?,?,...,?) (쿼리 2)
    Note over DB: 모든 게시글의 파일을<br/>한 번에 조회 (IN 절)
    DB-->>FileService: 모든 게시글의 File 리스트
    FileService-->>Service: Map<boardIdx, List<FileDTO>>
    
    Service->>Converter: toBoardDTOList(boards)
    Note over Converter: 3. 미리 조회된 데이터 사용
    loop 각 게시글 변환
        Converter->>Converter: toBoardDTO(board)
        Note over Converter: 댓글은 이미 로드됨<br/>(JOIN FETCH로 조회 완료)
        Converter->>Service: mapBoardWithAttachmentsFromBatch(board, filesByBoardId)
        Note over Service: 파일은 배치 조회 결과 사용<br/>(개별 쿼리 없음)
    end
    
    Converter-->>Service: List<MissingPetBoardDTO>
    Service-->>Controller: List<MissingPetBoardDTO>
    Controller-->>Frontend: JSON 응답
    Frontend-->>User: 실종 제보 목록 표시
    
    Note over Service,DB: 총 3개 쿼리로 감소<br/>- 게시글+댓글 조회: 1개 (JOIN FETCH)<br/>- 파일 배치 조회: 1개 (IN 절)<br/>- 사용자 인증: 1개<br/>98.5% 쿼리 수 감소`;

  return (
    <div className="domain-page-wrapper" style={{ padding: '2rem 0' }}>
      <div className="domain-page-container" style={{ display: 'flex', gap: '2rem', alignItems: 'flex-start' }}>
        <div className="domain-page-content" style={{ flex: 1 }}>
          <div style={{ marginBottom: '1rem' }}>
            <Link 
              to="/domains/missing-pet" 
              style={{ 
                color: 'var(--link-color)', 
                textDecoration: 'none',
                fontSize: '0.9rem'
              }}
            >
              ← Missing Pet 도메인으로 돌아가기
            </Link>
          </div>
          <h1 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>Missing Pet 도메인 - 성능 최적화 상세</h1>
          
          {/* 1. 개요 */}
          <section id="intro" style={{ marginBottom: '3rem', scrollMarginTop: '2rem' }}>
            <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>개요</h2>
            <div className="section-card" style={{
              padding: '1.5rem',
              backgroundColor: 'var(--card-bg)',
              borderRadius: '8px',
              border: '1px solid var(--nav-border)'
            }}>
              <p style={{ lineHeight: '1.8', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                게시글 목록 조회 시 연관 엔티티(댓글, 파일)를 개별 조회하여 
                <strong style={{ color: 'var(--text-color)' }}> 심각한 N+1 문제가 발생</strong>했습니다.
              </p>
              <div style={{
                padding: '1rem',
                backgroundColor: 'var(--bg-color)',
                borderRadius: '6px',
                marginTop: '1rem',
                border: '1px solid var(--nav-border)'
              }}>
                <h3 style={{ marginBottom: '0.75rem', color: 'var(--text-color)', fontSize: '1rem' }}>핵심 성과</h3>
                <ul style={{
                  listStyle: 'none',
                  padding: 0,
                  color: 'var(--text-secondary)',
                  lineHeight: '1.8',
                  fontSize: '0.9rem'
                }}>
                  <li>• 게시글 목록 조회 쿼리: <strong style={{ color: 'var(--text-color)' }}>207개 → 3개</strong> (98.5% 감소)</li>
                  <li>• 백엔드 응답 시간: <strong style={{ color: 'var(--text-color)' }}>571ms → 79ms</strong> (86% 감소)</li>
                  <li>• 메모리 사용량: <strong style={{ color: 'var(--text-color)' }}>11MB → 4MB</strong> (64% 감소)</li>
                </ul>
              </div>
            </div>
          </section>

          {/* 2. 문제 재현 방식 (테스트 설계) */}
          <section id="test-design" style={{ marginBottom: '3rem', scrollMarginTop: '2rem' }}>
            <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>문제 재현 방식 (테스트 설계)</h2>
            <div className="section-card" style={{
              padding: '1.5rem',
              backgroundColor: 'var(--card-bg)',
              borderRadius: '8px',
              border: '1px solid var(--nav-border)',
              marginBottom: '1rem'
            }}>
              <p style={{ lineHeight: '1.8', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                위 상황을 재현하기 위해 다음과 같은 테스트를 구성했습니다.
              </p>
              <ul style={{
                listStyle: 'none',
                padding: 0,
                color: 'var(--text-secondary)',
                lineHeight: '1.8'
              }}>
                <li>• <strong style={{ color: 'var(--text-color)' }}>더미 데이터 생성</strong>: 게시글 103개, 각 게시글마다 댓글과 파일 포함</li>
                <li>• <strong style={{ color: 'var(--text-color)' }}>실제 SQL 쿼리 로그 분석</strong>: 실제 실행된 쿼리 수와 패턴 확인</li>
                <li>• <strong style={{ color: 'var(--text-color)' }}>성능 측정</strong>: 응답 시간, 메모리 사용량, 쿼리 수 측정</li>
              </ul>
            </div>
            <div className="section-card" style={{
              padding: '1.5rem',
              backgroundColor: 'var(--card-bg)',
              borderRadius: '8px',
              border: '1px solid var(--nav-border)',
              marginBottom: '1rem'
            }}>
              <h3 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>시퀀스 다이어그램 (최적화 전)</h3>
              <MermaidDiagram chart={beforeSequenceDiagram} />
            </div>
          </section>

          {/* 3. 성능 측정 결과 (개선 전) */}
          <section id="before" style={{ marginBottom: '3rem', scrollMarginTop: '2rem' }}>
            <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>성능 측정 결과 (개선 전)</h2>
            <div className="section-card" style={{
              padding: '1.5rem',
              backgroundColor: 'var(--card-bg)',
              borderRadius: '8px',
              border: '1px solid var(--nav-border)'
            }}>
              <div style={{
                overflowX: 'auto'
              }}>
                <table style={{
                  width: '100%',
                  borderCollapse: 'collapse',
                  color: 'var(--text-secondary)'
                }}>
                  <thead>
                    <tr style={{
                      borderBottom: '2px solid var(--nav-border)'
                    }}>
                      <th style={{
                        padding: '0.75rem',
                        textAlign: 'left',
                        color: 'var(--text-color)',
                        fontWeight: 'bold'
                      }}>항목</th>
                      <th style={{
                        padding: '0.75rem',
                        textAlign: 'left',
                        color: 'var(--text-color)',
                        fontWeight: 'bold'
                      }}>개선 전</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr style={{
                      borderBottom: '1px solid var(--nav-border)'
                    }}>
                      <td style={{ padding: '0.75rem' }}>쿼리 수</td>
                      <td style={{ padding: '0.75rem', fontWeight: 'bold', color: 'var(--text-color)' }}>207개</td>
                    </tr>
                    <tr style={{
                      borderBottom: '1px solid var(--nav-border)'
                    }}>
                      <td style={{ padding: '0.75rem' }}>백엔드 응답 시간</td>
                      <td style={{ padding: '0.75rem', fontWeight: 'bold', color: 'var(--text-color)' }}>571ms</td>
                    </tr>
                    <tr style={{
                      borderBottom: '1px solid var(--nav-border)'
                    }}>
                      <td style={{ padding: '0.75rem' }}>프론트엔드 응답 시간</td>
                      <td style={{ padding: '0.75rem', fontWeight: 'bold', color: 'var(--text-color)' }}>909ms</td>
                    </tr>
                    <tr>
                      <td style={{ padding: '0.75rem' }}>메모리 사용량</td>
                      <td style={{ padding: '0.75rem', fontWeight: 'bold', color: 'var(--text-color)' }}>11MB</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div style={{
                marginTop: '1rem',
                padding: '1rem',
                backgroundColor: 'var(--bg-color)',
                borderRadius: '6px'
              }}>
                <p style={{
                  fontSize: '0.9rem',
                  color: 'var(--text-secondary)',
                  lineHeight: '1.6',
                  margin: 0,
                  marginBottom: '0.5rem'
                }}>
                  <strong style={{ color: 'var(--text-color)' }}>테스트 환경:</strong> 게시글 103개, 각 게시글마다 댓글과 파일 포함
                </p>
                <p style={{
                  fontSize: '0.9rem',
                  color: 'var(--text-secondary)',
                  lineHeight: '1.6',
                  margin: 0
                }}>
                  <strong style={{ color: 'var(--text-color)' }}>쿼리 분석:</strong> 게시글 조회 1개 + 댓글 조회 103개 + 파일 조회 103개 = 207개
                </p>
              </div>
            </div>
          </section>

          {/* 4. 성능 최적화 및 동시성 제어 */}
          <section id="optimization" style={{ marginBottom: '3rem', scrollMarginTop: '2rem' }}>
            <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>성능 최적화 및 동시성 제어</h2>
            
            <div className="section-card" style={{
              padding: '1.5rem',
              backgroundColor: 'var(--card-bg)',
              borderRadius: '8px',
              border: '1px solid var(--nav-border)',
              marginBottom: '1rem'
            }}>
              <h3 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>1. JOIN FETCH를 통한 댓글 조회 최적화</h3>
              <p style={{ lineHeight: '1.8', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                게시글 조회 시 <strong style={{ color: 'var(--text-color)' }}>댓글과 댓글 작성자 정보를 JOIN FETCH로 함께 조회</strong>하도록 변경했습니다.
              </p>
              <pre style={{
                padding: '1rem',
                backgroundColor: 'var(--bg-color)',
                borderRadius: '6px',
                overflow: 'auto',
                fontSize: '0.85rem',
                color: 'var(--text-secondary)',
                fontFamily: 'monospace',
                lineHeight: '1.6'
              }}>
{`@Query("SELECT DISTINCT b FROM MissingPetBoard b " +
       "JOIN FETCH b.user u " +
       "LEFT JOIN FETCH b.comments c " +
       "LEFT JOIN FETCH c.user cu " +
       "WHERE b.isDeleted = false AND u.isDeleted = false " +
       "AND u.status = 'ACTIVE' " +
       "AND (c.idx IS NULL OR (c.isDeleted = false " +
       "AND cu.isDeleted = false AND cu.status = 'ACTIVE')) " +
       "ORDER BY b.createdAt DESC")
List<MissingPetBoard> findAllWithCommentsByOrderByCreatedAtDesc();`}
              </pre>
              <p style={{ lineHeight: '1.8', color: 'var(--text-secondary)', marginTop: '1rem' }}>
                <strong style={{ color: 'var(--text-color)' }}>왜 이렇게 선택했는가:</strong> 각 게시글마다 댓글을 개별 조회하면 N+1 문제가 발생하므로, 
                JOIN FETCH로 한 번에 조회하는 것이 효율적입니다.
              </p>
            </div>

            <div className="section-card" style={{
              padding: '1.5rem',
              backgroundColor: 'var(--card-bg)',
              borderRadius: '8px',
              border: '1px solid var(--nav-border)',
              marginBottom: '1rem'
            }}>
              <h3 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>2. 파일 배치 조회 최적화</h3>
              <p style={{ lineHeight: '1.8', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                게시글 ID 목록을 추출하여 <strong style={{ color: 'var(--text-color)' }}>IN 절로 한 번에 파일 조회</strong>하도록 변경했습니다.
              </p>
              <pre style={{
                padding: '1rem',
                backgroundColor: 'var(--bg-color)',
                borderRadius: '6px',
                overflow: 'auto',
                fontSize: '0.85rem',
                color: 'var(--text-secondary)',
                fontFamily: 'monospace',
                lineHeight: '1.6'
              }}>
{`// 게시글 ID 목록으로 한 번에 파일 조회
List<Long> boardIds = boards.stream()
    .map(MissingPetBoard::getIdx)
    .collect(Collectors.toList());
Map<Long, List<FileDTO>> filesByBoardId = attachmentFileService
    .getAttachmentsBatch(FileTargetType.MISSING_PET, boardIds);`}
              </pre>
              <p style={{ lineHeight: '1.8', color: 'var(--text-secondary)', marginTop: '1rem' }}>
                <strong style={{ color: 'var(--text-color)' }}>왜 이렇게 선택했는가:</strong> 각 게시글마다 파일을 개별 조회하면 또 다른 N+1 문제가 발생하므로, 
                배치 조회로 한 번에 처리하는 것이 효율적입니다.
              </p>
            </div>
          </section>

          {/* 5. 성능 개선 결과 (개선 후) */}
          <section id="after" style={{ marginBottom: '3rem', scrollMarginTop: '2rem' }}>
            <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>성능 개선 결과 (개선 후)</h2>
            <div className="section-card" style={{
              padding: '1.5rem',
              backgroundColor: 'var(--card-bg)',
              borderRadius: '8px',
              border: '1px solid var(--nav-border)',
              marginBottom: '1rem'
            }}>
              <div style={{
                padding: '1rem',
                backgroundColor: 'var(--bg-color)',
                borderRadius: '6px',
                marginBottom: '1rem',
                border: '2px solid var(--link-color)'
              }}>
                <p style={{
                  fontSize: '0.9rem',
                  color: 'var(--text-muted)',
                  margin: 0,
                  fontStyle: 'italic'
                }}>
                  📌 <strong style={{ color: 'var(--text-color)' }}>홈페이지 숫자 카드의 근거는 여기</strong>
                </p>
              </div>
              <div style={{
                overflowX: 'auto'
              }}>
                <table style={{
                  width: '100%',
                  borderCollapse: 'collapse',
                  color: 'var(--text-secondary)'
                }}>
                  <thead>
                    <tr style={{
                      borderBottom: '2px solid var(--nav-border)'
                    }}>
                      <th style={{
                        padding: '0.75rem',
                        textAlign: 'left',
                        color: 'var(--text-color)',
                        fontWeight: 'bold'
                      }}>항목</th>
                      <th style={{
                        padding: '0.75rem',
                        textAlign: 'left',
                        color: 'var(--text-color)',
                        fontWeight: 'bold'
                      }}>개선 전</th>
                      <th style={{
                        padding: '0.75rem',
                        textAlign: 'left',
                        color: 'var(--text-color)',
                        fontWeight: 'bold'
                      }}>개선 후</th>
                      <th style={{
                        padding: '0.75rem',
                        textAlign: 'left',
                        color: 'var(--text-color)',
                        fontWeight: 'bold'
                      }}>개선율</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr style={{
                      borderBottom: '1px solid var(--nav-border)'
                    }}>
                      <td style={{ padding: '0.75rem' }}>쿼리 수</td>
                      <td style={{ padding: '0.75rem' }}>207개</td>
                      <td style={{ padding: '0.75rem', fontWeight: 'bold', color: 'var(--link-color)' }}>3개</td>
                      <td style={{ padding: '0.75rem', fontWeight: 'bold', color: 'var(--link-color)' }}>98.5% ↓</td>
                    </tr>
                    <tr style={{
                      borderBottom: '1px solid var(--nav-border)'
                    }}>
                      <td style={{ padding: '0.75rem' }}>백엔드 응답 시간</td>
                      <td style={{ padding: '0.75rem' }}>571ms</td>
                      <td style={{ padding: '0.75rem', fontWeight: 'bold', color: 'var(--link-color)' }}>79ms</td>
                      <td style={{ padding: '0.75rem', fontWeight: 'bold', color: 'var(--link-color)' }}>86% ↓</td>
                    </tr>
                    <tr style={{
                      borderBottom: '1px solid var(--nav-border)'
                    }}>
                      <td style={{ padding: '0.75rem' }}>프론트엔드 응답 시간</td>
                      <td style={{ padding: '0.75rem' }}>909ms</td>
                      <td style={{ padding: '0.75rem', fontWeight: 'bold', color: 'var(--link-color)' }}>316ms</td>
                      <td style={{ padding: '0.75rem', fontWeight: 'bold', color: 'var(--link-color)' }}>65% ↓</td>
                    </tr>
                    <tr>
                      <td style={{ padding: '0.75rem' }}>메모리 사용량</td>
                      <td style={{ padding: '0.75rem' }}>11MB</td>
                      <td style={{ padding: '0.75rem', fontWeight: 'bold', color: 'var(--link-color)' }}>4MB</td>
                      <td style={{ padding: '0.75rem', fontWeight: 'bold', color: 'var(--link-color)' }}>64% ↓</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className="section-card" style={{
              padding: '1.5rem',
              backgroundColor: 'var(--card-bg)',
              borderRadius: '8px',
              border: '1px solid var(--nav-border)',
              marginTop: '1rem'
            }}>
              <h3 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>시퀀스 다이어그램 (최적화 후)</h3>
              <MermaidDiagram chart={afterSequenceDiagram} />
            </div>
          </section>
        </div>
        <TableOfContents sections={sections} />
      </div>
    </div>
  );
}

export default MissingPetDomainOptimization;

