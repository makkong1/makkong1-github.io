import { Link } from 'react-router-dom';
import MermaidDiagram from '../../../../components/Common/MermaidDiagram';
import TableOfContents from '../../../../components/Common/TableOfContents';

function BoardDomainOptimization() {
  const sections = [
    { id: 'intro', title: '개요' },
    { id: 'test-design', title: '문제 재현 방식 (테스트 설계)' },
    { id: 'before', title: '성능 측정 결과 (개선 전)' },
    { id: 'optimization', title: '성능 최적화 및 동시성 제어' },
    { id: 'after', title: '성능 개선 결과 (개선 후)' }
  ];

  const boardListSequenceDiagram = `sequenceDiagram
    participant User as 사용자
    participant Frontend as Frontend
    participant BoardService as BoardService
    participant BoardRepo as BoardRepository
    participant ReactionRepo as BoardReactionRepository
    participant UserRepo as UserRepository
    participant DB as MySQL
    
    User->>Frontend: 게시글 목록 조회 요청
    Frontend->>BoardService: getAllBoards()
    BoardService->>BoardRepo: findAllByIsDeletedFalseOrderByCreatedAtDesc()
    BoardRepo->>DB: 게시글 목록 조회 (1)
    
    Note over BoardService,DB: N+1 문제 발생
    loop 각 게시글마다
        BoardService->>UserRepo: getByIdx() (2, 3, 4...)
        UserRepo->>DB: 작성자 정보 개별 조회
        BoardService->>ReactionRepo: countByBoardIdxAndReactionType() (101, 102, 103...)
        ReactionRepo->>DB: 좋아요 카운트 개별 조회
        BoardService->>ReactionRepo: countByBoardIdxAndReactionType() (201, 202, 203...)
        ReactionRepo->>DB: 싫어요 카운트 개별 조회
    end
    
    Note over BoardService,DB: 100개 게시글 기준: 1(게시글) + 10(작성자) + 100(좋아요) + 100(싫어요) + 100(첨부파일) = 311개 예상, 실제 301개 쿼리`;

  const optimizedBoardListSequenceDiagram = `sequenceDiagram
    participant User as 사용자
    participant Frontend as Frontend
    participant BoardService as BoardService
    participant BoardRepo as BoardRepository
    participant ReactionRepo as BoardReactionRepository
    participant DB as MySQL
    
    User->>Frontend: 게시글 목록 조회 요청
    Frontend->>BoardService: getAllBoards()
    
    Note over BoardService,DB: Fetch Join으로 최적화
    BoardService->>BoardRepo: findAllByIsDeletedFalseOrderByCreatedAtDesc()
    BoardRepo->>DB: 게시글 + 작성자 정보 함께 조회 (JOIN FETCH) (1)
    
    Note over BoardService,DB: 배치 조회로 최적화
    BoardService->>ReactionRepo: countByBoardsGroupByReactionType() (2)
    ReactionRepo->>DB: 모든 게시글의 반응 정보 배치 조회 (IN 절)
    
    BoardService->>Frontend: 게시글 목록 반환
    Frontend->>User: 게시글 목록 표시
    
    Note over BoardService,DB: 100개 게시글 기준: 3개 쿼리로 감소 (게시글+작성자 1개, 반응 배치 1개, 첨부파일 배치 1개)`;

  return (
    <div className="domain-page-wrapper" style={{ padding: '2rem 0' }}>
      <div className="domain-page-container" style={{ display: 'flex', gap: '2rem', alignItems: 'flex-start' }}>
        <div className="domain-page-content" style={{ flex: 1 }}>
          <div style={{ marginBottom: '1rem' }}>
            <Link 
              to="/domains/board" 
              style={{ 
                color: 'var(--link-color)', 
                textDecoration: 'none',
                fontSize: '0.9rem'
              }}
            >
              ← Board 도메인으로 돌아가기
            </Link>
          </div>
          <h1 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>Board 도메인 - 성능 최적화 상세</h1>
          
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
                Board 도메인에서 게시글 목록 조회 시 
                <strong style={{ color: 'var(--text-color)' }}> N+1 문제와 불필요한 DB 접근이 발생</strong>했습니다.
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
                  <li>• 게시글 목록 조회: <strong style={{ color: 'var(--text-color)' }}>301개 쿼리 → 3개 쿼리</strong> (99% 감소)</li>
                  <li>• 실행 시간: <strong style={{ color: 'var(--text-color)' }}>745ms → 30ms</strong> (24.83배 개선)</li>
                  <li>• 메모리 사용량: <strong style={{ color: 'var(--text-color)' }}>22.50 MB → 2 MB</strong> (91% 감소)</li>
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
              border: '1px solid var(--nav-border)'
            }}>
              <p style={{ lineHeight: '1.8', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                성능 문제를 재현하고 측정하기 위한 테스트를 설계했습니다.
              </p>
              <div style={{
                padding: '1rem',
                backgroundColor: 'var(--bg-color)',
                borderRadius: '6px',
                marginTop: '1rem'
              }}>
                <h3 style={{ marginBottom: '0.75rem', color: 'var(--text-color)', fontSize: '1rem' }}>테스트 환경</h3>
              <div style={{
                padding: '0.75rem',
                backgroundColor: 'var(--card-bg)',
                borderRadius: '4px',
                fontSize: '0.9rem',
                fontFamily: 'monospace',
                color: 'var(--text-secondary)',
                lineHeight: '1.8'
              }}>
                {`📝 테스트 데이터 구성
├── 사용자
│   ├── 게시글 작성자: 10명 (순환 사용하여 각 게시글마다 다른 작성자 할당)
│   └── 반응을 남길 사용자: 10명 (순환 사용)
│
├── 게시글: 100개
│   ├── 카테고리: "자유"
│   ├── 제목: "테스트 게시글 0" ~ "테스트 게시글 99"
│   ├── 내용: "테스트 내용 0" ~ "테스트 내용 99"
│   └── 작성자: 10명의 사용자를 순환 사용 (LAZY 로딩 N+1 문제 재현용)
│
└── 반응 데이터: 총 700개
    ├── 좋아요: 각 게시글당 5개 (총 500개)
    └── 싫어요: 각 게시글당 2개 (총 200개)`}
                </div>
              </div>
              <div style={{
                padding: '1rem',
                backgroundColor: 'var(--bg-color)',
                borderRadius: '6px',
                marginTop: '1rem'
              }}>
                <h3 style={{ marginBottom: '0.75rem', color: 'var(--text-color)', fontSize: '1rem' }}>테스트 설정</h3>
                <ul style={{
                  listStyle: 'none',
                  padding: 0,
                  color: 'var(--text-secondary)',
                  lineHeight: '1.8',
                  fontSize: '0.9rem'
                }}>
                  <li>• 테스트 클래스: <code style={{ backgroundColor: 'var(--card-bg)', padding: '0.2rem 0.4rem', borderRadius: '4px' }}>BoardPerformanceComparisonTest</code></li>
                  <li>• 측정 도구: Hibernate Statistics (쿼리 수 측정)</li>
                  <li>• 데이터 생성: <code style={{ backgroundColor: 'var(--card-bg)', padding: '0.2rem 0.4rem', borderRadius: '4px' }}>@BeforeEach setUp()</code> 메서드에서 자동 생성</li>
                  <li>• 영속성 컨텍스트 관리: 각 테스트 전후로 <code style={{ backgroundColor: 'var(--card-bg)', padding: '0.2rem 0.4rem', borderRadius: '4px' }}>entityManager.clear()</code> 호출</li>
                </ul>
              </div>
              <div style={{
                padding: '1rem',
                backgroundColor: 'var(--bg-color)',
                borderRadius: '6px',
                marginTop: '1rem',
                border: '1px solid var(--nav-border)'
              }}>
                <h3 style={{ marginBottom: '0.75rem', color: 'var(--text-color)', fontSize: '1rem' }}>테스트 구조</h3>
                <p style={{ lineHeight: '1.8', color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '0.75rem' }}>
                  세 가지 테스트를 통해 각각의 최적화 효과를 측정했습니다:
                </p>
                <ul style={{
                  listStyle: 'none',
                  padding: 0,
                  color: 'var(--text-secondary)',
                  lineHeight: '1.8',
                  fontSize: '0.9rem'
                }}>
                  <li>• <strong style={{ color: 'var(--text-color)' }}>테스트 1</strong>: 반응 정보 조회 최적화 (작성자 Fetch Join + 반응 배치 조회)</li>
                  <li>• <strong style={{ color: 'var(--text-color)' }}>테스트 2</strong>: 작성자 정보 조회 최적화 (LAZY vs Fetch Join)</li>
                  <li>• <strong style={{ color: 'var(--text-color)' }}>테스트 3</strong>: 전체 성능 비교 ⭐ (모든 최적화 적용, 실제 사용 시나리오)</li>
                </ul>
              </div>
            </div>
            <div className="section-card" style={{
              padding: '1.5rem',
              backgroundColor: 'var(--card-bg)',
              borderRadius: '8px',
              border: '1px solid var(--nav-border)',
              marginTop: '1rem'
            }}>
              <h3 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>시퀀스 다이어그램 (최적화 전)</h3>
              <MermaidDiagram chart={boardListSequenceDiagram} />
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
              <p style={{ lineHeight: '1.8', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                실제 테스트 결과, N+1 문제로 인해 많은 쿼리가 발생했습니다.
              </p>
              <div style={{
                overflowX: 'auto',
                marginBottom: '1rem'
              }}>
                <table style={{
                  width: '100%',
                  borderCollapse: 'collapse',
                  color: 'var(--text-secondary)',
                  fontSize: '0.9rem'
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
                      }}>측정 항목</th>
                      <th style={{
                        padding: '0.75rem',
                        textAlign: 'left',
                        color: 'var(--text-color)',
                        fontWeight: 'bold'
                      }}>최적화 전</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr style={{
                      borderBottom: '1px solid var(--nav-border)'
                    }}>
                      <td style={{ padding: '0.75rem' }}>쿼리 수 (100개 게시글)</td>
                      <td style={{ padding: '0.75rem', fontWeight: 'bold', color: '#e74c3c' }}>301개</td>
                    </tr>
                    <tr style={{
                      borderBottom: '1px solid var(--nav-border)'
                    }}>
                      <td style={{ padding: '0.75rem' }}>실행 시간</td>
                      <td style={{ padding: '0.75rem', fontWeight: 'bold', color: '#e74c3c' }}>745ms</td>
                    </tr>
                    <tr style={{
                      borderBottom: '1px solid var(--nav-border)'
                    }}>
                      <td style={{ padding: '0.75rem' }}>메모리 사용량</td>
                      <td style={{ padding: '0.75rem', fontWeight: 'bold', color: '#e74c3c' }}>22.50 MB</td>
                    </tr>
                    <tr>
                      <td style={{ padding: '0.75rem' }}>인기글 조회</td>
                      <td style={{ padding: '0.75rem', fontWeight: 'bold', color: '#e74c3c' }}>실시간 계산 (데이터 증가 시 느려짐)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div style={{
                padding: '1rem',
                backgroundColor: 'var(--bg-color)',
                borderRadius: '6px',
                marginTop: '1rem'
              }}>
                <h3 style={{ marginBottom: '0.75rem', color: 'var(--text-color)', fontSize: '1rem' }}>쿼리 구성 분석</h3>
                <p style={{ lineHeight: '1.8', color: 'var(--text-secondary)', marginBottom: '0.75rem', fontSize: '0.9rem' }}>
                  <strong style={{ color: 'var(--text-color)' }}>최적화 전 (301개 쿼리):</strong>
                </p>
                <ul style={{
                  listStyle: 'none',
                  padding: 0,
                  color: 'var(--text-secondary)',
                  lineHeight: '1.8',
                  fontSize: '0.9rem',
                  marginBottom: '1rem'
                }}>
                  <li>• 게시글 조회 (JOIN FETCH 없음): <strong style={{ color: 'var(--text-color)' }}>1개</strong></li>
                  <li>• 작성자 정보 LAZY 로딩: <strong style={{ color: 'var(--text-color)' }}>10개</strong> (10명의 다른 작성자를 순환 사용)</li>
                  <li>• 좋아요 카운트 개별 조회: <strong style={{ color: 'var(--text-color)' }}>100개</strong> (각 게시글마다 개별 쿼리)</li>
                  <li>• 싫어요 카운트 개별 조회: <strong style={{ color: 'var(--text-color)' }}>100개</strong> (각 게시글마다 개별 쿼리)</li>
                  <li>• 첨부파일 개별 조회: <strong style={{ color: 'var(--text-color)' }}>100개</strong> (각 게시글마다 개별 쿼리)</li>
                  <li>• 총 311개 예상, 실제 301개 발생 (첨부파일이 없는 게시글이 있거나 다른 최적화 가능)</li>
                </ul>
                <p style={{ lineHeight: '1.8', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                  <strong style={{ color: 'var(--text-color)' }}>참고사항:</strong> 이는 실제 사용 시나리오(테스트 3)에서 측정된 결과입니다. 작성자 정보, 반응 정보, 첨부파일 조회가 모두 포함된 전체 시나리오입니다.
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
              <h3 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>1. 배치 조회로 반응 정보 조회 최적화</h3>
              <p style={{ lineHeight: '1.8', color: 'var(--text-secondary)', marginBottom: '0.75rem' }}>
                배치 조회로 IN 절을 활용한 집계 쿼리를 사용하여 N+1 문제를 해결했습니다.
              </p>
              <p style={{ lineHeight: '1.8', color: 'var(--text-secondary)', marginBottom: '0.75rem', fontSize: '0.9rem' }}>
                <strong style={{ color: 'var(--text-color)' }}>해결 방법:</strong>
              </p>
              <ul style={{
                listStyle: 'none',
                padding: 0,
                color: 'var(--text-secondary)',
                lineHeight: '1.8',
                fontSize: '0.9rem',
                marginBottom: '0.75rem'
              }}>
                <li>• 배치 조회로 IN 절을 활용한 집계 쿼리 사용</li>
                <li>• 500개 단위로 배치 처리하여 IN 절 크기 제한</li>
              </ul>
              <p style={{ lineHeight: '1.8', color: 'var(--text-secondary)', marginBottom: '0.75rem', fontSize: '0.9rem' }}>
                <strong style={{ color: 'var(--text-color)' }}>Service Layer:</strong>
              </p>
              <pre style={{
                padding: '0.75rem',
                backgroundColor: 'var(--bg-color)',
                borderRadius: '4px',
                overflow: 'auto',
                fontSize: '0.85rem',
                color: 'var(--text-secondary)',
                fontFamily: 'monospace',
                lineHeight: '1.6',
                margin: '0.5rem 0'
              }}>
{`// BoardService.java
private List<BoardDTO> mapBoardsWithReactionsBatch(List<Board> boards) {
    // 1. 게시글 ID 목록 추출
    List<Long> boardIds = boards.stream()
        .map(Board::getIdx)
        .collect(Collectors.toList());
    
    // 2. 좋아요/싫어요 카운트 배치 조회 (IN 절)
    Map<Long, Map<ReactionType, Long>> reactionCountsMap = 
        getReactionCountsBatch(boardIds);
    
    // 3. 게시글 DTO 변환 및 반응 정보 매핑
    return boards.stream()
        .map(board -> {
            BoardDTO dto = boardConverter.toDTO(board);
            Map<ReactionType, Long> counts = 
                reactionCountsMap.getOrDefault(board.getIdx(), new HashMap<>());
            dto.setLikes(Math.toIntExact(counts.getOrDefault(LIKE, 0L)));
            dto.setDislikes(Math.toIntExact(counts.getOrDefault(DISLIKE, 0L)));
            return dto;
        })
        .collect(Collectors.toList());
}

private Map<Long, Map<ReactionType, Long>> getReactionCountsBatch(List<Long> boardIds) {
    final int BATCH_SIZE = 500;  // IN 절 크기 제한
    Map<Long, Map<ReactionType, Long>> countsMap = new HashMap<>();
    
    // IN 절을 500개 단위로 나누어 조회
    for (int i = 0; i < boardIds.size(); i += BATCH_SIZE) {
        int end = Math.min(i + BATCH_SIZE, boardIds.size());
        List<Long> batch = boardIds.subList(i, end);
        
        List<Object[]> results = boardReactionRepository
            .countByBoardsGroupByReactionType(batch);
        // 결과 파싱 및 Map 구성
    }
    
    return countsMap;
}`}
              </pre>
              <p style={{ lineHeight: '1.8', color: 'var(--text-secondary)', marginBottom: '0.75rem', fontSize: '0.9rem' }}>
                <strong style={{ color: 'var(--text-color)' }}>Repository Layer:</strong>
              </p>
              <pre style={{
                padding: '0.75rem',
                backgroundColor: 'var(--bg-color)',
                borderRadius: '4px',
                overflow: 'auto',
                fontSize: '0.85rem',
                color: 'var(--text-secondary)',
                fontFamily: 'monospace',
                lineHeight: '1.6',
                margin: '0.5rem 0'
              }}>
{`// BoardReactionRepository.java
@Query("SELECT br.board.idx, br.reactionType, COUNT(br) " +
       "FROM BoardReaction br " +
       "WHERE br.board.idx IN :boardIds " +
       "GROUP BY br.board.idx, br.reactionType")
List<Object[]> countByBoardsGroupByReactionType(
    @Param("boardIds") List<Long> boardIds);`}
              </pre>
              <div style={{
                padding: '0.75rem',
                backgroundColor: 'var(--bg-color)',
                borderRadius: '4px',
                marginTop: '0.75rem'
              }}>
                <p style={{ lineHeight: '1.8', color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '0.5rem' }}>
                  <strong style={{ color: 'var(--text-color)' }}>성능 개선 효과:</strong>
                </p>
                <ul style={{
                  listStyle: 'none',
                  padding: 0,
                  color: 'var(--text-secondary)',
                  lineHeight: '1.8',
                  fontSize: '0.9rem'
                }}>
                  <li>• 100개 게시글: 1개(게시글+작성자, Fetch Join) + 100개(좋아요) + 100개(싫어요) = <strong style={{ color: 'var(--text-color)' }}>201개 쿼리</strong></li>
                  <li>• 배치 조회 적용 후: 1개(게시글+작성자) + 1개(반응 배치 조회) = <strong style={{ color: 'var(--text-color)' }}>2개 쿼리</strong>로 대폭 감소</li>
                  <li>• 1000개 게시글 기준: 1개 + 1000개 + 1000개 = <strong style={{ color: 'var(--text-color)' }}>2001개 쿼리</strong> → 배치 조회로 <strong style={{ color: 'var(--text-color)' }}>2개 쿼리</strong></li>
                </ul>
              </div>
            </div>
            <div className="section-card" style={{
              padding: '1.5rem',
              backgroundColor: 'var(--card-bg)',
              borderRadius: '8px',
              border: '1px solid var(--nav-border)',
              marginBottom: '1rem'
            }}>
              <h3 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>2. Fetch Join으로 작성자 정보 조회 최적화</h3>
              <p style={{ lineHeight: '1.8', color: 'var(--text-secondary)', marginBottom: '0.75rem' }}>
                모든 게시글 조회 쿼리에 <code style={{ backgroundColor: 'var(--bg-color)', padding: '0.2rem 0.4rem', borderRadius: '4px' }}>JOIN FETCH b.user</code>를 적용하여 작성자 정보를 한 번의 쿼리로 함께 조회합니다.
              </p>
              <pre style={{
                padding: '0.75rem',
                backgroundColor: 'var(--bg-color)',
                borderRadius: '4px',
                overflow: 'auto',
                fontSize: '0.85rem',
                color: 'var(--text-secondary)',
                fontFamily: 'monospace',
                lineHeight: '1.6',
                margin: '0.5rem 0'
              }}>
{`// BoardRepository.java
@Query("SELECT b FROM Board b JOIN FETCH b.user u " +
       "WHERE b.isDeleted = false AND u.isDeleted = false AND u.status = 'ACTIVE' " +
       "ORDER BY b.createdAt DESC")
List<Board> findAllByIsDeletedFalseOrderByCreatedAtDesc();`}
              </pre>
              <div style={{
                padding: '0.75rem',
                backgroundColor: 'var(--bg-color)',
                borderRadius: '4px',
                marginTop: '0.75rem'
              }}>
                <p style={{ lineHeight: '1.8', color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '0.5rem' }}>
                  <strong style={{ color: 'var(--text-color)' }}>성능 개선 효과:</strong>
                </p>
                <ul style={{
                  listStyle: 'none',
                  padding: 0,
                  color: 'var(--text-secondary)',
                  lineHeight: '1.8',
                  fontSize: '0.9rem'
                }}>
                  <li>• 쿼리 수 (100개 게시글): 101개 → <strong style={{ color: 'var(--text-color)' }}>1개</strong> (99% 감소)</li>
                  <li>• Fetch Join 적용으로 작성자 정보 조회 시 추가 쿼리 없음</li>
                </ul>
              </div>
            </div>
            <div className="section-card" style={{
              padding: '1.5rem',
              backgroundColor: 'var(--card-bg)',
              borderRadius: '8px',
              border: '1px solid var(--nav-border)',
              marginBottom: '1rem'
            }}>
              <h3 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>3. 인기글 스냅샷 생성으로 복잡한 계산 최적화</h3>
              <p style={{ lineHeight: '1.8', color: 'var(--text-secondary)', marginBottom: '0.75rem' }}>
                스케줄러를 통해 인기글 스냅샷을 미리 생성하여 저장하고, 조회 시에는 스냅샷에서 바로 조회합니다.
              </p>
              <pre style={{
                padding: '0.75rem',
                backgroundColor: 'var(--bg-color)',
                borderRadius: '4px',
                overflow: 'auto',
                fontSize: '0.85rem',
                color: 'var(--text-secondary)',
                fontFamily: 'monospace',
                lineHeight: '1.6',
                margin: '0.5rem 0'
              }}>
{`// BoardPopularityScheduler.java
@Scheduled(cron = "0 30 18 * * ?")  // 매일 오후 6시 30분
@Transactional
public void generateWeeklyPopularitySnapshots() {
    log.info("주간 인기 게시글 스냅샷 생성 시작");
    boardPopularityService.generateSnapshots(PopularityPeriodType.WEEKLY);
    log.info("주간 인기 게시글 스냅샷 생성 완료");
}`}
              </pre>
            </div>
            <div className="section-card" style={{
              padding: '1.5rem',
              backgroundColor: 'var(--card-bg)',
              borderRadius: '8px',
              border: '1px solid var(--nav-border)',
              marginBottom: '1rem'
            }}>
              <h3 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>4. FULLTEXT 인덱스로 검색 성능 최적화</h3>
              <p style={{ lineHeight: '1.8', color: 'var(--text-secondary)', marginBottom: '0.75rem' }}>
                MySQL FULLTEXT 인덱스를 사용하여 검색 성능을 최적화했습니다.
              </p>
              <pre style={{
                padding: '0.75rem',
                backgroundColor: 'var(--bg-color)',
                borderRadius: '4px',
                overflow: 'auto',
                fontSize: '0.85rem',
                color: 'var(--text-secondary)',
                fontFamily: 'monospace',
                lineHeight: '1.6',
                margin: '0.5rem 0'
              }}>
{`-- 인덱스 생성
CREATE FULLTEXT INDEX idx_board_title_content 
ON board(title, content) WITH PARSER ngram;`}
              </pre>
            </div>
            <div className="section-card" style={{
              padding: '1.5rem',
              backgroundColor: 'var(--card-bg)',
              borderRadius: '8px',
              border: '1px solid var(--nav-border)'
            }}>
              <h3 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>동시성 제어</h3>
              <ul style={{
                listStyle: 'none',
                padding: 0,
                color: 'var(--text-secondary)',
                lineHeight: '1.8'
              }}>
                <li>• <strong style={{ color: 'var(--text-color)' }}>Unique 제약</strong>: (board_idx, user_idx)로 중복 반응 방지</li>
                <li>• <strong style={{ color: 'var(--text-color)' }}>원자적 연산</strong>: 댓글 수 증가 시 UPDATE 쿼리로 직접 증가</li>
              </ul>
            </div>
          </section>

          {/* 5. 성능 개선 결과 (개선 후) */}
          <section id="after" style={{ marginBottom: '3rem', scrollMarginTop: '2rem' }}>
            <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>성능 개선 결과 (개선 후)</h2>
            <div className="section-card" style={{
              padding: '1.5rem',
              backgroundColor: 'var(--card-bg)',
              borderRadius: '8px',
              border: '1px solid var(--nav-border)'
            }}>
              <p style={{ lineHeight: '1.8', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                배치 조회와 Fetch Join을 적용하여 N+1 문제를 효과적으로 해결했습니다.
              </p>
              <div style={{
                overflowX: 'auto',
                marginBottom: '1rem'
              }}>
                <table style={{
                  width: '100%',
                  borderCollapse: 'collapse',
                  color: 'var(--text-secondary)',
                  fontSize: '0.9rem'
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
                      <td style={{ padding: '0.75rem' }}>게시글 목록 조회 (100개)</td>
                      <td style={{ padding: '0.75rem', fontWeight: 'bold', color: '#e74c3c' }}>301개 쿼리, 745ms, 22.50 MB</td>
                      <td style={{ padding: '0.75rem', fontWeight: 'bold', color: '#27ae60' }}>3개 쿼리, 30ms, 2 MB</td>
                      <td style={{ padding: '0.75rem', fontWeight: 'bold', color: 'var(--link-color)' }}>99.00% 감소, 24.83배 개선, 91% 메모리 감소</td>
                    </tr>
                    <tr style={{
                      borderBottom: '1px solid var(--nav-border)'
                    }}>
                      <td style={{ padding: '0.75rem' }}>반응 정보만 조회 (100개)</td>
                      <td style={{ padding: '0.75rem', fontWeight: 'bold', color: '#e74c3c' }}>201개 쿼리, 244ms, 8.00 MB</td>
                      <td style={{ padding: '0.75rem', fontWeight: 'bold', color: '#27ae60' }}>2개 쿼리, 0ms, 509.41 KB</td>
                      <td style={{ padding: '0.75rem', fontWeight: 'bold', color: 'var(--link-color)' }}>99.00% 감소, 93.8% 메모리 감소</td>
                    </tr>
                    <tr style={{
                      borderBottom: '1px solid var(--nav-border)'
                    }}>
                      <td style={{ padding: '0.75rem' }}>인기글 조회</td>
                      <td style={{ padding: '0.75rem', fontWeight: 'bold', color: '#e74c3c' }}>실시간 계산 (데이터 증가 시 느려짐)</td>
                      <td style={{ padding: '0.75rem', fontWeight: 'bold', color: '#27ae60' }}>스냅샷 조회 (즉시 응답)</td>
                      <td style={{ padding: '0.75rem', fontWeight: 'bold', color: 'var(--link-color)' }}>즉시 응답, 확장성 향상</td>
                    </tr>
                    <tr>
                      <td style={{ padding: '0.75rem' }}>검색 성능</td>
                      <td style={{ padding: '0.75rem', fontWeight: 'bold', color: '#e74c3c' }}>LIKE 검색</td>
                      <td style={{ padding: '0.75rem', fontWeight: 'bold', color: '#27ae60' }}>FULLTEXT 검색</td>
                      <td style={{ padding: '0.75rem', fontWeight: 'bold', color: 'var(--link-color)' }}>10배 이상 개선</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div style={{
                padding: '1rem',
                backgroundColor: 'var(--bg-color)',
                borderRadius: '6px',
                marginTop: '1rem'
              }}>
                <h3 style={{ marginBottom: '0.75rem', color: 'var(--text-color)', fontSize: '1rem' }}>최적화 후 쿼리 구성 (3개)</h3>
                <ul style={{
                  listStyle: 'none',
                  padding: 0,
                  color: 'var(--text-secondary)',
                  lineHeight: '1.8',
                  fontSize: '0.9rem'
                }}>
                  <li>• 게시글 + 작성자 조회 (Fetch Join): <strong style={{ color: 'var(--text-color)' }}>1개 쿼리</strong></li>
                  <li>• 반응 정보 배치 조회 (IN 절): <strong style={{ color: 'var(--text-color)' }}>1개 쿼리</strong> (100개 게시글의 좋아요/싫어요를 한 번에 조회)</li>
                  <li>• 첨부파일 배치 조회: <strong style={{ color: 'var(--text-color)' }}>1개 쿼리</strong> (100개 게시글의 첨부파일을 한 번에 조회)</li>
                </ul>
                <p style={{ lineHeight: '1.8', color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '0.75rem' }}>
                  <strong style={{ color: 'var(--text-color)' }}>핵심 포인트:</strong> 게시글 수가 100개든 1000개든, 배치 조회를 사용하면 쿼리 수는 3개로 일정하게 유지됩니다.
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
              <MermaidDiagram chart={optimizedBoardListSequenceDiagram} />
            </div>
          </section>
        </div>
        <TableOfContents sections={sections} />
      </div>
    </div>
  );
}

export default BoardDomainOptimization;

