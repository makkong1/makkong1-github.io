import { Link } from 'react-router-dom';
import MermaidDiagram from '../../../../components/Common/MermaidDiagram';
import TableOfContents from '../../../../components/Common/TableOfContents';

function MissingPetDomainOptimization() {
  const sections = [
    { id: 'intro', title: '개요' },
    { id: 'test-design', title: '문제 재현 방식 (테스트 설계)' },
    { id: 'before', title: '성능 측정 결과 (개선 전)' },
    { id: 'optimization', title: '성능 최적화 및 동시성 제어' },
    { id: 'after', title: '성능 개선 결과 (개선 후)' },
    { id: 'docs', title: '관련 문서' }
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
    
    Note over Service,Repo: 1. 게시글+작성자 조회 (1번 쿼리)
    Service->>Repo: findAllByOrderByCreatedAtDesc()
    Repo->>DB: 게시글+작성자 조회 (쿼리 1)
    DB-->>Repo: MissingPetBoard 리스트 반환 (103개, 댓글 제외)
    Repo-->>Service: List<MissingPetBoard>
    
    Note over Service,FileService: 2. 파일 배치 조회 (1번 쿼리, 이미 최적화됨)
    Service->>Service: boardIds 추출
    Service->>FileService: getAttachmentsBatch(MISSING_PET, boardIds)
    FileService->>DB: 파일 배치 조회 (IN 절) (쿼리 2)
    DB-->>FileService: 모든 게시글의 File 리스트
    FileService-->>Service: Map<boardIdx, List<FileDTO>>
    
    Service->>Converter: toBoardDTOList(boards)
    
    Note over Converter,DB: 3. N+1 문제: 댓글 조회 (103번 쿼리)
    loop 각 게시글마다 (103번)
        Converter->>Converter: toBoardDTO(board)
        Converter->>board: getComments()
        Note over board,DB: LAZY 로딩 트리거!
        board->>DB: 댓글 조회 쿼리 (쿼리 3, 4, 5...)
        DB-->>board: 댓글 목록 반환
        board-->>Converter: List<MissingPetComment>
        Note over Converter: 댓글을 사용하지 않는데도 쿼리가 실행됨!
    end
    
    Converter-->>Service: List<MissingPetBoardDTO>
    Service-->>Service: 파일 정보 매핑
    Service-->>Controller: List<MissingPetBoardDTO>
    Controller-->>Frontend: JSON 응답
    Frontend-->>User: 실종 제보 목록 표시
    
    Note over Service,DB: 총 105개 쿼리 발생<br/>게시글+작성자 조회: 1개<br/>파일 배치 조회: 1개<br/>댓글 조회: 103개 (N+1 문제)`;

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
    
    Note over Service,Repo: 1. 게시글+작성자만 조회 (JOIN FETCH, 댓글 제외)
    Service->>Repo: findAllByOrderByCreatedAtDesc()
    Repo->>DB: 게시글+작성자 조회 (JOIN FETCH) (쿼리 1)
    Note over DB: 게시글과 작성자만 조회 (댓글 제외)
    DB-->>Repo: MissingPetBoard 리스트 반환 (103개, 댓글 미로드)
    Repo-->>Service: List<MissingPetBoard>
    
    Note over Service,FileService: 2. 파일 배치 조회 (IN 절)
    Service->>Service: boardIds 추출 (103개 ID)
    Service->>FileService: getAttachmentsBatch(MISSING_PET, boardIds)
    FileService->>DB: 파일 배치 조회 (IN 절) (쿼리 2)
    Note over DB: 모든 게시글의 파일을 한 번에 조회
    DB-->>FileService: 모든 게시글의 File 리스트
    FileService-->>Service: Map<boardIdx, List<FileDTO>>
    
    Service->>Converter: toBoardDTOWithoutComments(boards)
    Note over Converter: 3. 댓글 접근하지 않는 메서드 사용
    loop 각 게시글 변환
        Converter->>Converter: toBoardDTOWithoutComments(board)
        Note over Converter: 댓글 접근하지 않음! LAZY 로딩 트리거 방지
        Converter->>Service: mapBoardWithAttachmentsFromBatch(board, filesByBoardId)
        Note over Service: 파일은 배치 조회 결과 사용 (개별 쿼리 없음)
    end
    
    Converter-->>Service: List<MissingPetBoardDTO> (댓글 빈 리스트)
    Service-->>Controller: List<MissingPetBoardDTO>
    Controller-->>Frontend: JSON 응답
    Frontend-->>User: 실종 제보 목록 표시 (댓글은 별도 API로 조회)
    
    Note over Service,DB: 총 2개 쿼리로 감소<br/>게시글+작성자 조회: 1개 (JOIN FETCH)<br/>파일 배치 조회: 1개 (IN 절)<br/>댓글 조회: 0개 (접근하지 않음)<br/>98% 쿼리 수 감소 (105개 → 2개)`;

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
                게시글 목록 조회 시 Converter에서 <code style={{ backgroundColor: 'var(--bg-color)', padding: '0.2rem 0.4rem', borderRadius: '4px' }}>board.getComments()</code> 접근으로 LAZY 로딩이 발생하여 
                <strong style={{ color: 'var(--text-color)' }}> 심각한 N+1 문제가 발생</strong>했습니다.
              </p>
              <p style={{ lineHeight: '1.8', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                게시글 103개 조회 시 댓글 조회 쿼리가 103번 실행되어 총 105개의 쿼리가 발생했습니다. 이를 Converter 메서드 분리와 서비스 분리로 완전히 해결했습니다.
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
                  <li>• 게시글 목록 조회 쿼리: <strong style={{ color: 'var(--text-color)' }}>105개 → 2개</strong> (98% 감소)</li>
                  <li>• 백엔드 응답 시간: <strong style={{ color: 'var(--text-color)' }}>571ms → 106ms</strong> (81% 개선)</li>
                  <li>• 메모리 사용량: <strong style={{ color: 'var(--text-color)' }}>11MB → 3MB</strong> (73% 감소)</li>
                  <li>• 댓글 N+1 문제: <strong style={{ color: 'var(--text-color)' }}>103번 → 0번</strong> (100% 제거)</li>
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
                <li>• <strong style={{ color: 'var(--text-color)' }}>더미 데이터 생성</strong>: 게시글 103개, 각 게시글마다 파일 포함 (댓글은 목록 조회 시 제외)</li>
                <li>• <strong style={{ color: 'var(--text-color)' }}>실제 SQL 쿼리 로그 분석</strong>: 실제 실행된 쿼리 수와 패턴 확인, LAZY 로딩 트리거 지점 확인</li>
                <li>• <strong style={{ color: 'var(--text-color)' }}>성능 측정</strong>: 응답 시간, 메모리 사용량, 쿼리 수 측정 (103개 게시글 기준)</li>
                <li>• <strong style={{ color: 'var(--text-color)' }}>Converter 메서드 분석</strong>: <code style={{ backgroundColor: 'var(--bg-color)', padding: '0.2rem 0.4rem', borderRadius: '4px' }}>toBoardDTO()</code> 메서드에서 <code style={{ backgroundColor: 'var(--bg-color)', padding: '0.2rem 0.4rem', borderRadius: '4px' }}>board.getComments()</code> 접근으로 인한 LAZY 로딩 확인</li>
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
                      <td style={{ padding: '0.75rem', fontWeight: 'bold', color: 'var(--text-color)' }}>105개</td>
                    </tr>
                    <tr style={{
                      borderBottom: '1px solid var(--nav-border)'
                    }}>
                      <td style={{ padding: '0.75rem' }}>백엔드 응답 시간</td>
                      <td style={{ padding: '0.75rem', fontWeight: 'bold', color: 'var(--text-color)' }}>571ms</td>
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
                  <strong style={{ color: 'var(--text-color)' }}>테스트 환경:</strong> 게시글 103개, 각 게시글마다 파일 포함 (댓글은 목록 조회 시 포함하지 않음)
                </p>
                <p style={{
                  fontSize: '0.9rem',
                  color: 'var(--text-secondary)',
                  lineHeight: '1.6',
                  margin: 0,
                  marginBottom: '0.5rem'
                }}>
                  <strong style={{ color: 'var(--text-color)' }}>쿼리 분석:</strong> 게시글+작성자 조회 1개 + 파일 배치 조회 1개 + 댓글 조회 103개 (N+1 문제) = 105개
                </p>
                <p style={{
                  fontSize: '0.9rem',
                  color: 'var(--text-secondary)',
                  lineHeight: '1.6',
                  margin: 0
                }}>
                  <strong style={{ color: 'var(--text-color)' }}>문제 원인:</strong> Converter의 <code style={{ backgroundColor: 'var(--bg-color)', padding: '0.2rem 0.4rem', borderRadius: '4px' }}>toBoardDTO()</code> 메서드에서 <code style={{ backgroundColor: 'var(--bg-color)', padding: '0.2rem 0.4rem', borderRadius: '4px' }}>board.getComments()</code> 접근으로 LAZY 로딩 트리거
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
              <h3 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>1. Converter 메서드 분리로 댓글 접근 제거</h3>
              <p style={{ lineHeight: '1.8', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                목록 조회 시 댓글을 포함하지 않도록 <strong style={{ color: 'var(--text-color)' }}>댓글을 접근하지 않는 별도 Converter 메서드를 추가</strong>했습니다.
              </p>
              <p style={{ lineHeight: '1.8', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                <strong style={{ color: 'var(--text-color)' }}>문제:</strong> 기존 <code style={{ backgroundColor: 'var(--bg-color)', padding: '0.2rem 0.4rem', borderRadius: '4px' }}>toBoardDTO()</code> 메서드에서 <code style={{ backgroundColor: 'var(--bg-color)', padding: '0.2rem 0.4rem', borderRadius: '4px' }}>board.getComments()</code> 접근 시 LAZY 로딩 트리거
              </p>
              <pre style={{
                padding: '1rem',
                backgroundColor: 'var(--bg-color)',
                borderRadius: '6px',
                overflow: 'auto',
                fontSize: '0.85rem',
                color: 'var(--text-secondary)',
                fontFamily: 'monospace',
                lineHeight: '1.6',
                marginBottom: '1rem'
              }}>
{`// MissingPetConverter.java

/**
 * 게시글 DTO 변환 (댓글 포함)
 * 댓글이 이미 로드된 경우에만 사용 (N+1 문제 주의)
 */
public MissingPetBoardDTO toBoardDTO(MissingPetBoard board) {
    // 기존 코드 유지 (댓글이 이미 로드된 경우)
    List<MissingPetCommentDTO> commentDTOs = board.getComments() == null
            ? Collections.emptyList()
            : board.getComments().stream()
                    .filter(comment -> !comment.getIsDeleted())
                    .map(this::toCommentDTO)
                    .collect(Collectors.toList());
    // ...
}

/**
 * 게시글 DTO 변환 (댓글 제외, N+1 문제 방지)
 * 목록 조회 시 사용 - 댓글을 접근하지 않아 lazy loading을 트리거하지 않음
 */
public MissingPetBoardDTO toBoardDTOWithoutComments(MissingPetBoard board) {
    return MissingPetBoardDTO.builder()
            .idx(board.getIdx())
            .userId(board.getUser().getIdx())
            .username(board.getUser().getUsername())
            .nickname(board.getUser().getNickname())
            // ... 기타 필드들
            .comments(Collections.emptyList()) // 댓글은 빈 리스트
            .commentCount(0) // 댓글 수는 0
            .build();
}`}
              </pre>
              <p style={{ lineHeight: '1.8', color: 'var(--text-secondary)', marginTop: '1rem' }}>
                <strong style={{ color: 'var(--text-color)' }}>왜 이렇게 선택했는가:</strong>
              </p>
              <ul style={{ listStyle: 'none', padding: 0, margin: '1rem 0', color: 'var(--text-secondary)', lineHeight: '1.8' }}>
                <li>• <strong style={{ color: 'var(--text-color)' }}>조인 폭발 방지</strong>: 댓글이 많은 게시글에서 조인 결과가 기하급수적으로 증가하는 문제 방지</li>
                <li>• <strong style={{ color: 'var(--text-color)' }}>LAZY 로딩 트리거 방지</strong>: 댓글 필드를 전혀 접근하지 않아 N+1 문제 근본 해결</li>
                <li>• <strong style={{ color: 'var(--text-color)' }}>확장성 향상</strong>: 게시글 수가 증가해도 쿼리 수는 일정하게 유지</li>
                <li>• <strong style={{ color: 'var(--text-color)' }}>페이징 지원</strong>: 댓글을 별도 API로 조회하므로 무한 스크롤 적용 가능</li>
              </ul>
            </div>

            <div className="section-card" style={{
              padding: '1.5rem',
              backgroundColor: 'var(--card-bg)',
              borderRadius: '8px',
              border: '1px solid var(--nav-border)',
              marginBottom: '1rem'
            }}>
              <h3 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>2. 서비스 분리 및 게시글+작성자 조회 최적화</h3>
              <p style={{ lineHeight: '1.8', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                게시글 조회 시 <strong style={{ color: 'var(--text-color)' }}>작성자 정보만 JOIN FETCH로 함께 조회</strong>하도록 변경했습니다. (댓글 제외)
              </p>
              <pre style={{
                padding: '1rem',
                backgroundColor: 'var(--bg-color)',
                borderRadius: '6px',
                overflow: 'auto',
                fontSize: '0.85rem',
                color: 'var(--text-secondary)',
                fontFamily: 'monospace',
                lineHeight: '1.6',
                marginBottom: '1rem'
              }}>
{`// MissingPetBoardRepository.java

@Query("SELECT b FROM MissingPetBoard b " +
       "JOIN FETCH b.user u " +
       "WHERE b.isDeleted = false AND u.isDeleted = false " +
       "AND u.status = 'ACTIVE' " +
       "ORDER BY b.createdAt DESC")
List<MissingPetBoard> findAllByOrderByCreatedAtDesc();

// MissingPetBoardService.java

public List<MissingPetBoardDTO> getBoards(MissingPetStatus status) {
    // 게시글 + 작성자만 조회 (댓글 제외)
    List<MissingPetBoard> boards = status == null
            ? boardRepository.findAllByOrderByCreatedAtDesc()
            : boardRepository.findByStatusOrderByCreatedAtDesc(status);
    
    // 파일 배치 조회
    List<Long> boardIds = boards.stream()
            .map(MissingPetBoard::getIdx)
            .collect(Collectors.toList());
    Map<Long, List<FileDTO>> filesByBoardId = attachmentFileService
            .getAttachmentsBatch(FileTargetType.MISSING_PET, boardIds);
    
    // 댓글을 접근하지 않는 컨버터 메서드 사용
    List<MissingPetBoardDTO> result = boards.stream()
            .map(board -> {
                MissingPetBoardDTO dto = missingPetConverter.toBoardDTOWithoutComments(board);
                // 파일 정보 추가
                List<FileDTO> attachments = filesByBoardId.getOrDefault(board.getIdx(), List.of());
                dto.setAttachments(attachments);
                dto.setImageUrl(extractPrimaryFileUrl(attachments));
                return dto;
            })
            .collect(Collectors.toList());
    
    return result;
}`}
              </pre>
              <p style={{ lineHeight: '1.8', color: 'var(--text-secondary)', marginTop: '1rem' }}>
                <strong style={{ color: 'var(--text-color)' }}>핵심 포인트:</strong>
              </p>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, color: 'var(--text-secondary)', lineHeight: '1.8' }}>
                <li>• 게시글과 댓글 조회를 완전히 분리하여 조인 폭발 방지</li>
                <li>• 목록 조회 시 댓글을 접근하지 않아 LAZY 로딩 트리거 방지</li>
                <li>• 댓글이 필요한 경우 별도 API (GET /api/missing-pets/{'{id}'}/comments)로 조회</li>
              </ul>
            </div>

            <div className="section-card" style={{
              padding: '1.5rem',
              backgroundColor: 'var(--card-bg)',
              borderRadius: '8px',
              border: '1px solid var(--nav-border)'
            }}>
              <h3 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>3. 파일 배치 조회 (이미 최적화됨)</h3>
              <p style={{ lineHeight: '1.8', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                게시글 ID 목록을 추출하여 <strong style={{ color: 'var(--text-color)' }}>IN 절로 한 번에 파일 조회</strong>하도록 이미 최적화되어 있었습니다.
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
{`// 게시글 ID 목록으로 한 번에 파일 조회 (IN 절 사용)
List<Long> boardIds = boards.stream()
    .map(MissingPetBoard::getIdx)
    .collect(Collectors.toList());
Map<Long, List<FileDTO>> filesByBoardId = attachmentFileService
    .getAttachmentsBatch(FileTargetType.MISSING_PET, boardIds);`}
              </pre>
              <p style={{ lineHeight: '1.8', color: 'var(--text-secondary)', marginTop: '1rem' }}>
                <strong style={{ color: 'var(--text-color)' }}>참고:</strong> 파일 조회는 이미 배치 조회로 최적화되어 있어 추가 작업이 필요하지 않았습니다. 
                핵심 문제는 댓글 N+1 문제였으며, Converter 메서드 분리로 완전히 해결했습니다.
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
                      <td style={{ padding: '0.75rem' }}>105개</td>
                      <td style={{ padding: '0.75rem', fontWeight: 'bold', color: 'var(--link-color)' }}>2개</td>
                      <td style={{ padding: '0.75rem', fontWeight: 'bold', color: 'var(--link-color)' }}>98% ↓</td>
                    </tr>
                    <tr style={{
                      borderBottom: '1px solid var(--nav-border)'
                    }}>
                      <td style={{ padding: '0.75rem' }}>백엔드 응답 시간</td>
                      <td style={{ padding: '0.75rem' }}>571ms</td>
                      <td style={{ padding: '0.75rem', fontWeight: 'bold', color: 'var(--link-color)' }}>106ms</td>
                      <td style={{ padding: '0.75rem', fontWeight: 'bold', color: 'var(--link-color)' }}>81% ↓</td>
                    </tr>
                    <tr>
                      <td style={{ padding: '0.75rem' }}>메모리 사용량</td>
                      <td style={{ padding: '0.75rem' }}>11MB</td>
                      <td style={{ padding: '0.75rem', fontWeight: 'bold', color: 'var(--link-color)' }}>3MB</td>
                      <td style={{ padding: '0.75rem', fontWeight: 'bold', color: 'var(--link-color)' }}>73% ↓</td>
                    </tr>
                    <tr style={{
                      borderTop: '2px solid var(--nav-border)',
                      borderBottom: '1px solid var(--nav-border)'
                    }}>
                      <td style={{ padding: '0.75rem', fontWeight: 'bold', color: 'var(--text-color)' }}>댓글 조회 쿼리</td>
                      <td style={{ padding: '0.75rem', fontWeight: 'bold' }}>103개</td>
                      <td style={{ padding: '0.75rem', fontWeight: 'bold', color: 'var(--link-color)' }}>0개</td>
                      <td style={{ padding: '0.75rem', fontWeight: 'bold', color: 'var(--link-color)' }}>100% 제거</td>
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
                  <strong style={{ color: 'var(--text-color)' }}>테스트 환경:</strong> 게시글 103개 (2026-01-10 측정)
                </p>
                <p style={{
                  fontSize: '0.9rem',
                  color: 'var(--text-secondary)',
                  lineHeight: '1.6',
                  margin: 0,
                  marginBottom: '0.5rem'
                }}>
                  <strong style={{ color: 'var(--text-color)' }}>쿼리 분석:</strong> 게시글+작성자 조회 1개 + 파일 배치 조회 1개 = 2개 (댓글 조회 0개)
                </p>
                <p style={{
                  fontSize: '0.9rem',
                  color: 'var(--text-secondary)',
                  lineHeight: '1.6',
                  margin: 0
                }}>
                  <strong style={{ color: 'var(--text-color)' }}>핵심 개선:</strong> Converter 메서드 분리로 댓글 접근 완전 제거, LAZY 로딩 트리거 방지
                </p>
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

          {/* 6. 관련 문서 */}
          <section id="docs" style={{ marginBottom: '3rem', scrollMarginTop: '2rem' }}>
            <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>관련 문서</h2>
            <div className="section-card" style={{
              padding: '1rem',
              backgroundColor: 'var(--card-bg)',
              borderRadius: '8px',
              border: '1px solid var(--nav-border)'
            }}>
              <a 
                href="https://github.com/makkong1/makkong1-github.io/blob/main/docs/troubleshooting/missing-pet/n-plus-one-query-issue.md" 
                target="_blank"
                rel="noopener noreferrer"
                style={{ 
                  color: 'var(--link-color)',
                  textDecoration: 'none',
                  display: 'block',
                  marginBottom: '0.5rem'
                }}
              >
                → Missing Pet 도메인 N+1 문제 해결 상세 문서
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

export default MissingPetDomainOptimization;

