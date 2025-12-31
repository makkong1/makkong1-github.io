import MermaidDiagram from '../../../../components/Common/MermaidDiagram';
import TableOfContents from '../../../../components/Common/TableOfContents';

function MissingPetDomain() {
  const sections = [
    { id: 'intro', title: '도메인 소개' },
    { id: 'problem', title: '가정한 문제 상황' },
    { id: 'test-design', title: '문제 재현 방식' },
    { id: 'before', title: '성능 측정 결과 (개선 전)' },
    { id: 'optimization', title: '성능 최적화 및 동시성 제어' },
    { id: 'after', title: '성능 개선 결과 (개선 후)' },
    { id: 'entities', title: 'Entity 구조' },
    { id: 'services', title: 'Service 주요 기능' },
    { id: 'security', title: '보안 및 권한 체계' },
    { id: 'relationships', title: '다른 도메인과의 연관관계' },
    { id: 'api', title: 'API 엔드포인트' },
    { id: 'docs', title: '관련 문서' }
  ];
  const entityDiagram = `erDiagram
    Users ||--o{ MissingPetBoard : "reports"
    MissingPetBoard ||--o{ MissingPetComment : "has"
    
    MissingPetBoard {
        Long idx PK
        Long user_idx FK
        String title
        String content
        String petName
        String species
        String breed
        MissingPetGender gender
        String age
        String color
        LocalDate lostDate
        String lostLocation
        BigDecimal latitude
        BigDecimal longitude
        MissingPetStatus status
        LocalDateTime createdAt
        LocalDateTime updatedAt
        Boolean isDeleted
    }
    
    MissingPetComment {
        Long idx PK
        Long board_idx FK
        Long user_idx FK
        String content
        LocalDateTime createdAt
        Boolean isDeleted
    }`;

  return (
    <div style={{ padding: '2rem 0' }}>
      <div style={{ display: 'flex', gap: '2rem', alignItems: 'flex-start' }}>
        <div style={{ flex: 1 }}>
          <h1 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>실종 신고 도메인</h1>
          
          {/* 1. 도메인 소개 */}
          <section id="intro" style={{ marginBottom: '3rem', scrollMarginTop: '2rem' }}>
            <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>도메인 소개</h2>
            <div className="section-card" style={{
              padding: '1.5rem',
              backgroundColor: 'var(--card-bg)',
              borderRadius: '8px',
              border: '1px solid var(--nav-border)'
            }}>
              <p style={{ lineHeight: '1.8', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                MissingPet 도메인은 실종 동물 신고 및 관리 시스템을 담당합니다.
              </p>
              <p style={{ lineHeight: '1.8', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                반려동물을 잃어버린 사용자가 신고하고 다른 사용자들이 정보를 제공할 수 있습니다.
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

          {/* 2. 가정한 문제 상황 */}
          <section id="problem" style={{ marginBottom: '3rem', scrollMarginTop: '2rem' }}>
            <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>가정한 문제 상황</h2>
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
                marginTop: '1rem'
              }}>
                <h3 style={{ marginBottom: '0.75rem', color: 'var(--text-color)', fontSize: '1rem' }}>구체적인 문제 시나리오</h3>
                <ul style={{
                  listStyle: 'none',
                  padding: 0,
                  color: 'var(--text-secondary)',
                  lineHeight: '1.8'
                }}>
                  <li>• 게시글 목록 조회 시 댓글과 파일을 각 게시글마다 개별 조회</li>
                  <li>• 게시글 N개 기준: 1번(게시글) + N번(댓글) + N번(파일) = <strong style={{ color: 'var(--text-color)' }}>2N+1번 쿼리</strong></li>
                  <li>• 게시글 103개 조회 시 <strong style={{ color: 'var(--text-color)' }}>207번의 쿼리 발생</strong></li>
                  <li>• 응답 시간 571ms로 사용자 경험 저하</li>
                  <li>• 게시글 수가 증가할수록 쿼리 수와 응답 시간이 선형적으로 증가</li>
                </ul>
              </div>
              <div style={{
                padding: '1rem',
                backgroundColor: 'var(--bg-color)',
                borderRadius: '6px',
                marginTop: '1rem'
              }}>
                <h3 style={{ marginBottom: '0.75rem', color: 'var(--text-color)', fontSize: '1rem' }}>해결 방법</h3>
                <ul style={{
                  listStyle: 'none',
                  padding: 0,
                  color: 'var(--text-secondary)',
                  lineHeight: '1.8'
                }}>
                  <li>• <strong style={{ color: 'var(--text-color)' }}>JOIN FETCH 활용</strong>: 게시글 조회 시 댓글과 댓글 작성자 정보를 함께 조회</li>
                  <li>• <strong style={{ color: 'var(--text-color)' }}>배치 조회 패턴</strong>: 게시글 ID 목록을 IN 절로 한 번에 파일 조회</li>
                  <li>• <strong style={{ color: 'var(--text-color)' }}>메모리에서 매핑</strong>: 조회한 데이터를 Map으로 변환하여 빠르게 매핑</li>
                </ul>
              </div>
              <div style={{
                padding: '1rem',
                backgroundColor: 'var(--bg-color)',
                borderRadius: '6px',
                marginTop: '1rem'
              }}>
                <h3 style={{ marginBottom: '0.75rem', color: 'var(--text-color)', fontSize: '1rem' }}>개선 결과</h3>
                <ul style={{
                  listStyle: 'none',
                  padding: 0,
                  color: 'var(--text-secondary)',
                  lineHeight: '1.8'
                }}>
                  <li>• <strong style={{ color: 'var(--text-color)' }}>쿼리 수</strong>: 207개 → 3개 (98.5% 감소)</li>
                  <li>• <strong style={{ color: 'var(--text-color)' }}>백엔드 응답 시간</strong>: 571ms → 79ms (86% 단축)</li>
                  <li>• <strong style={{ color: 'var(--text-color)' }}>메모리 사용량</strong>: 11MB → 4MB (64% 감소)</li>
                </ul>
              </div>
            </div>
          </section>

          {/* 3. 문제 재현 방식 (테스트 설계) */}
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
              <MermaidDiagram chart={`sequenceDiagram
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
    
    Note over Service,DB: 총 207개 쿼리 발생<br/>- 게시글 조회: 1개<br/>- 댓글 조회: 103개<br/>- 파일 조회: 103개`} />
            </div>
          </section>

          {/* 4. 성능 측정 결과 (개선 전) */}
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

          {/* 5. 성능 최적화 및 동시성 제어 */}
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

          {/* 6. 성능 개선 결과 (개선 후) */}
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
              marginBottom: '1rem'
            }}>
              <h3 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>시퀀스 다이어그램 (최적화 후)</h3>
              <MermaidDiagram chart={`sequenceDiagram
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
    
    Note over Service,DB: 총 3개 쿼리로 감소<br/>- 게시글+댓글 조회: 1개 (JOIN FETCH)<br/>- 파일 배치 조회: 1개 (IN 절)<br/>- 사용자 인증: 1개<br/>98.5% 쿼리 수 감소`} />
            </div>
          </section>

          {/* 7. Entity 구조 */}
          <section id="entities" style={{ marginBottom: '3rem', scrollMarginTop: '2rem' }}>
            <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>주요 기능</h2>
            
            <div className="section-card" style={{
              padding: '1.5rem',
              backgroundColor: 'var(--card-bg)',
              borderRadius: '8px',
              border: '1px solid var(--nav-border)',
              marginBottom: '1.5rem'
            }}>
              <h3 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>실종 동물 신고</h3>
              <div style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}>
                <p style={{ marginBottom: '0.5rem' }}>사용자가 실종 동물 정보를 신고하고 사진을 첨부할 수 있습니다.</p>
                <p style={{ marginBottom: '0.5rem' }}><strong style={{ color: 'var(--text-color)' }}>주요 기능:</strong></p>
                <ul style={{ marginLeft: '1.5rem', marginBottom: '0.5rem' }}>
                  <li>실종 동물 신고 (이름, 종, 품종, 성별, 나이, 색상, 실종 날짜, 실종 장소)</li>
                  <li>사진 첨부</li>
                  <li>위치 정보 입력 (위도, 경도)</li>
                  <li>다른 사용자들이 목격 정보 댓글 작성</li>
                </ul>
                <p style={{ marginBottom: '0.5rem' }}><strong style={{ color: 'var(--text-color)' }}>사용자 시나리오:</strong></p>
                <ol style={{ marginLeft: '1.5rem', marginBottom: '0.5rem' }}>
                  <li>실종 동물 신고 (이름, 종, 품종, 성별, 나이, 색상, 실종 날짜, 실종 장소)</li>
                  <li>사진 첨부</li>
                  <li>위치 정보 입력 (위도, 경도)</li>
                  <li>다른 사용자들이 목격 정보 댓글 작성</li>
                </ol>
              </div>
            </div>

            <div className="section-card" style={{
              padding: '1.5rem',
              backgroundColor: 'var(--card-bg)',
              borderRadius: '8px',
              border: '1px solid var(--nav-border)',
              marginBottom: '1.5rem'
            }}>
              <h3 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>위치 기반 검색</h3>
              <div style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}>
                <p style={{ marginBottom: '0.5rem' }}>내 위치 기준 반경 내 실종 동물을 검색할 수 있습니다.</p>
                <p style={{ marginBottom: '0.5rem' }}><strong style={{ color: 'var(--text-color)' }}>주요 기능:</strong></p>
                <ul style={{ marginLeft: '1.5rem', marginBottom: '0.5rem' }}>
                  <li>내 위치 확인</li>
                  <li>반경 설정 (예: 5km)</li>
                  <li>반경 내 실종 동물 목록 표시</li>
                  <li>Haversine 공식으로 거리 계산</li>
                  <li>MySQL Spatial Index 활용</li>
                  <li>지도 연동</li>
                </ul>
                <p style={{ marginBottom: '0.5rem' }}><strong style={{ color: 'var(--text-color)' }}>사용자 시나리오:</strong></p>
                <ol style={{ marginLeft: '1.5rem', marginBottom: '0.5rem' }}>
                  <li>내 위치 확인</li>
                  <li>반경 설정 (예: 5km)</li>
                  <li>반경 내 실종 동물 목록 표시</li>
                </ol>
              </div>
            </div>

            <div className="section-card" style={{
              padding: '1.5rem',
              backgroundColor: 'var(--card-bg)',
              borderRadius: '8px',
              border: '1px solid var(--nav-border)',
              marginBottom: '1.5rem'
            }}>
              <h3 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>목격 정보 댓글</h3>
              <div style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}>
                <p style={{ marginBottom: '0.5rem' }}>댓글로 목격 정보를 제공하고 실종자와 소통할 수 있습니다.</p>
                <p style={{ marginBottom: '0.5rem' }}><strong style={{ color: 'var(--text-color)' }}>주요 기능:</strong></p>
                <ul style={{ marginLeft: '1.5rem', marginBottom: '0.5rem' }}>
                  <li>댓글로 목격 정보 제공</li>
                  <li>실종자와 소통</li>
                  <li>"목격했어요" 버튼으로 채팅 시작</li>
                </ul>
              </div>
            </div>

            <div className="section-card" style={{
              padding: '1.5rem',
              backgroundColor: 'var(--card-bg)',
              borderRadius: '8px',
              border: '1px solid var(--nav-border)'
            }}>
              <h3 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>실종 동물 상태 관리</h3>
              <div style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}>
                <p style={{ marginBottom: '0.5rem' }}>실종 동물의 상태를 관리하여 실종 중, 발견됨, 종료 상태를 구분합니다.</p>
                <p style={{ marginBottom: '0.5rem' }}><strong style={{ color: 'var(--text-color)' }}>주요 기능:</strong></p>
                <ul style={{ marginLeft: '1.5rem', marginBottom: '0.5rem' }}>
                  <li>MISSING (실종 중) - 신고 시 기본 상태</li>
                  <li>FOUND (발견됨) - 찾음 처리</li>
                  <li>CLOSED (종료) - 종료 처리</li>
                </ul>
              </div>
            </div>
      </section>

          <section id="entities" style={{ marginBottom: '3rem', scrollMarginTop: '2rem' }}>
            <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>Entity 구조</h2>
        
        <div className="section-card" style={{
          padding: '1.5rem',
          backgroundColor: 'var(--card-bg)',
          borderRadius: '8px',
          border: '1px solid var(--nav-border)',
          marginBottom: '1.5rem'
        }}>
          <MermaidDiagram chart={entityDiagram} />
        </div>

        <div className="section-card" style={{
          padding: '1.5rem',
          backgroundColor: 'var(--card-bg)',
          borderRadius: '8px',
          border: '1px solid var(--nav-border)',
          marginBottom: '1rem'
        }}>
          <h3 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>MissingPetBoard (실종 동물 게시판)</h3>
          <div style={{ 
            color: 'var(--text-secondary)',
            lineHeight: '1.8',
            fontFamily: 'monospace',
            fontSize: '0.9rem'
          }}>
            <div style={{ marginBottom: '0.5rem' }}><strong style={{ color: 'var(--text-color)' }}>주요 필드:</strong></div>
            <div>• idx (PK), user (신고자), title, content</div>
            <div>• petName, species, breed, gender, age, color</div>
            <div>• lostDate, lostLocation, latitude, longitude</div>
            <div>• status (MISSING/FOUND/CLOSED)</div>
            <div>• createdAt, updatedAt, isDeleted</div>
            <div style={{ marginTop: '0.5rem' }}><strong style={{ color: 'var(--text-color)' }}>연관관계:</strong></div>
            <div>• ManyToOne → Users</div>
            <div>• OneToMany → MissingPetComment, AttachmentFile</div>
          </div>
        </div>

        <div className="section-card" style={{
          padding: '1.5rem',
          backgroundColor: 'var(--card-bg)',
          borderRadius: '8px',
          border: '1px solid var(--nav-border)'
        }}>
          <h3 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>MissingPetComment</h3>
          <div style={{ 
            color: 'var(--text-secondary)',
            lineHeight: '1.8',
            fontFamily: 'monospace',
            fontSize: '0.9rem'
          }}>
            <div style={{ marginBottom: '0.5rem' }}><strong style={{ color: 'var(--text-color)' }}>주요 필드:</strong></div>
            <div>• idx (PK), board (게시글), user (작성자)</div>
            <div>• content (목격 정보 등), createdAt, isDeleted</div>
            <div style={{ marginTop: '0.5rem' }}><strong style={{ color: 'var(--text-color)' }}>연관관계:</strong></div>
            <div>• ManyToOne → MissingPetBoard, Users</div>
          </div>
        </div>
      </section>

          <section id="services" style={{ marginBottom: '3rem', scrollMarginTop: '2rem' }}>
            <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>Service 주요 기능</h2>
        
        <div className="section-card" style={{
          padding: '1.5rem',
          backgroundColor: 'var(--card-bg)',
          borderRadius: '8px',
          border: '1px solid var(--nav-border)'
        }}>
          <h3 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>MissingPetBoardService</h3>
          <div style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}>
            <div>• createMissingPet() - 실종 신고 생성</div>
            <div>• getAllMissingPets() - 실종 동물 목록 (페이징, 상태 필터, 위치 기반)</div>
            <div>• searchByLocation() - 위치 기반 검색 (반경 내)</div>
            <div>• getMissingPet() - 실종 동물 상세</div>
            <div>• updateMissingPet() - 실종 신고 수정</div>
            <div>• markAsFound() - 찾음 처리</div>
            <div>• deleteMissingPet() - 신고 삭제</div>
            <div>• getMyMissingPets() - 내 실종 신고</div>
          </div>
        </div>
      </section>

          {/* 9. 보안 및 권한 체계 */}
          <section id="security" style={{ marginBottom: '3rem', scrollMarginTop: '2rem' }}>
            <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>보안 및 권한 체계</h2>
            <div className="section-card" style={{
              padding: '1.5rem',
              backgroundColor: 'var(--card-bg)',
              borderRadius: '8px',
              border: '1px solid var(--nav-border)'
            }}>
              <ul style={{
                listStyle: 'none',
                padding: 0,
                color: 'var(--text-secondary)',
                lineHeight: '1.8'
              }}>
                <li>• <strong style={{ color: 'var(--text-color)' }}>작성자만 수정/삭제 가능</strong>: 신고 작성자만 본인 신고 수정/삭제 가능</li>
                <li>• <strong style={{ color: 'var(--text-color)' }}>소프트 삭제</strong>: isDeleted 플래그로 논리 삭제</li>
              </ul>
            </div>
          </section>

          {/* 10. 다른 도메인과의 연관관계 */}
          <section id="relationships" style={{ marginBottom: '3rem', scrollMarginTop: '2rem' }}>
            <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>다른 도메인과의 연관관계</h2>
        
        <div className="section-card" style={{
          padding: '1.5rem',
          backgroundColor: 'var(--card-bg)',
          borderRadius: '8px',
          border: '1px solid var(--nav-border)'
        }}>
          <div style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}>
            <div style={{ marginBottom: '0.5rem' }}><strong style={{ color: 'var(--text-color)' }}>User 도메인:</strong></div>
            <div>• Users가 실종 신고 작성, 목격 정보 제공</div>
            <div style={{ marginTop: '1rem', marginBottom: '0.5rem' }}><strong style={{ color: 'var(--text-color)' }}>File 도메인:</strong></div>
            <div>• 실종 동물 사진 첨부</div>
            <div style={{ marginTop: '1rem', marginBottom: '0.5rem' }}><strong style={{ color: 'var(--text-color)' }}>Notification 도메인:</strong></div>
            <div>• 댓글 작성 시 알림 발송</div>
            <div style={{ marginTop: '1rem', marginBottom: '0.5rem' }}><strong style={{ color: 'var(--text-color)' }}>Report 도메인:</strong></div>
            <div>• 부적절한 신고 접수</div>
            <div style={{ marginTop: '1rem', marginBottom: '0.5rem' }}><strong style={{ color: 'var(--text-color)' }}>Chat 도메인:</strong></div>
            <div>• "목격했어요" 버튼으로 제보자-목격자 간 1:1 채팅 시작</div>
          </div>
        </div>
      </section>

          <section id="api" style={{ marginBottom: '3rem', scrollMarginTop: '2rem' }}>
            <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>API 엔드포인트</h2>
        
        <div className="section-card" style={{
          padding: '1.5rem',
          backgroundColor: 'var(--card-bg)',
          borderRadius: '8px',
          border: '1px solid var(--nav-border)'
        }}>
          <div style={{ 
            color: 'var(--text-secondary)',
            lineHeight: '1.8',
            fontFamily: 'monospace',
            fontSize: '0.9rem'
          }}>
            <div>• GET /api/missing-pets - 목록</div>
            <div>• GET /api/missing-pets/{'{id}'} - 상세</div>
            <div>• POST /api/missing-pets - 신고</div>
            <div>• PUT /api/missing-pets/{'{id}'} - 수정</div>
            <div>• PUT /api/missing-pets/{'{id}'}/found - 찾음 처리</div>
            <div>• DELETE /api/missing-pets/{'{id}'} - 삭제</div>
            <div>• GET /api/missing-pets/nearby - 위치 기반 검색</div>
          </div>
        </div>
      </section>

          <section id="docs" style={{ marginBottom: '3rem', scrollMarginTop: '2rem' }}>
            <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>관련 문서</h2>
        <div className="section-card" style={{
          padding: '1rem',
          backgroundColor: 'var(--card-bg)',
          borderRadius: '8px',
          border: '1px solid var(--nav-border)'
        }}>
          <a 
            href="https://github.com/makkong1/makkong1-github.io/blob/main/docs/troubleshooting/missing-pet/performance-measurement-results.md" 
            target="_blank"
            rel="noopener noreferrer"
            style={{ 
              color: 'var(--link-color)',
              textDecoration: 'none',
              display: 'block',
              marginBottom: '0.5rem'
            }}
          >
            → 게시글 목록 조회 N+1 문제 해결 상세 문서
          </a>
          <a 
            href="https://github.com/makkong1/makkong1-github.io/blob/main/docs/domains/missing-pet.md" 
            target="_blank"
            rel="noopener noreferrer"
            style={{ 
              color: 'var(--link-color)',
              textDecoration: 'none',
              display: 'block'
            }}
          >
            → Missing Pet 도메인 상세 문서
          </a>
        </div>
          </section>
        </div>
        <TableOfContents sections={sections} />
      </div>
    </div>
  );
}

export default MissingPetDomain;
