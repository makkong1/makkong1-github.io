import MermaidDiagram from '../../components/Common/MermaidDiagram';
import TableOfContents from '../../components/Common/TableOfContents';

function BoardDomain() {
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
    Users ||--o{ Board : "writes"
    Board ||--o{ Comment : "has"
    Board ||--o{ BoardReaction : "has"
    Board ||--o{ BoardViewLog : "has"
    Board ||--o{ BoardPopularitySnapshot : "has"
    Comment ||--o{ CommentReaction : "has"
    Users ||--o{ Comment : "writes"
    Users ||--o{ BoardReaction : "reacts"
    Users ||--o{ CommentReaction : "reacts"
    Users ||--o{ BoardViewLog : "views"
    
    Board {
        Long idx PK
        Long user_idx FK
        String title
        String content
        String category
        ContentStatus status
        LocalDateTime createdAt
        Integer viewCount
        Integer likeCount
        Integer commentCount
        LocalDateTime lastReactionAt
        Boolean isDeleted
    }
    
    Comment {
        Long idx PK
        Long board_idx FK
        Long user_idx FK
        String content
        ContentStatus status
        LocalDateTime createdAt
        Boolean isDeleted
    }
    
    BoardReaction {
        Long idx PK
        Long board_idx FK
        Long user_idx FK
        ReactionType type
        LocalDateTime createdAt
    }
    
    CommentReaction {
        Long idx PK
        Long comment_idx FK
        Long user_idx FK
        ReactionType type
        LocalDateTime createdAt
    }
    
    BoardViewLog {
        Long idx PK
        Long board_idx FK
        Long user_idx FK
        LocalDateTime viewedAt
    }
    
    BoardPopularitySnapshot {
        Long idx PK
        Long board_idx FK
        PopularityPeriodType periodType
        LocalDate snapshotDate
        Integer viewCount
        Integer likeCount
        Integer commentCount
        Double popularityScore
    }`;

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
    <div style={{ padding: '2rem 0' }}>
      <div style={{ display: 'flex', gap: '2rem', alignItems: 'flex-start' }}>
        <div style={{ flex: 1 }}>
          <h1 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>게시판 도메인</h1>
          
          {/* 1. 도메인 소개 */}
          <section id="intro" style={{ marginBottom: '3rem', scrollMarginTop: '2rem' }}>
            <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>도메인 소개</h2>
            <div style={{
              padding: '1.5rem',
              backgroundColor: 'var(--card-bg)',
              borderRadius: '8px',
              border: '1px solid var(--nav-border)'
            }}>
              <p style={{ lineHeight: '1.8', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                Board 도메인은 커뮤니티 게시판 시스템의 핵심 도메인입니다.
              </p>
              <p style={{ lineHeight: '1.8', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                <strong style={{ color: 'var(--text-color)' }}>실서비스 환경에서 가장 빈번하게 조회되는 도메인 중 하나</strong>입니다.
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

          {/* 2. 가정한 문제 상황 */}
          <section id="problem" style={{ marginBottom: '3rem', scrollMarginTop: '2rem' }}>
            <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>가정한 문제 상황</h2>
            <div style={{
              padding: '1.5rem',
              backgroundColor: 'var(--card-bg)',
              borderRadius: '8px',
              border: '1px solid var(--nav-border)'
            }}>
              <p style={{ lineHeight: '1.8', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                Board 도메인에서 <strong style={{ color: 'var(--text-color)' }}>심각한 성능 문제</strong>가 발생했습니다.
              </p>
              <div style={{
                padding: '1rem',
                backgroundColor: 'var(--bg-color)',
                borderRadius: '6px',
                marginTop: '1rem'
              }}>
                <h3 style={{ marginBottom: '0.75rem', color: 'var(--text-color)', fontSize: '1rem' }}>1. N+1 문제: 반응 정보 조회</h3>
                <div style={{
                  overflowX: 'auto',
                  marginBottom: '0.5rem'
                }}>
                  <table style={{
                    width: '100%',
                    borderCollapse: 'collapse',
                    color: 'var(--text-secondary)',
                    fontSize: '0.9rem'
                  }}>
                    <tbody>
                      <tr style={{ borderBottom: '1px solid var(--nav-border)' }}>
                        <td style={{ padding: '0.5rem', fontWeight: 'bold', color: 'var(--text-color)' }}>문제</td>
                        <td style={{ padding: '0.5rem' }}>게시글 목록 조회 시 각 게시글마다 좋아요/싫어요 카운트를 개별 쿼리로 조회</td>
                      </tr>
                      <tr style={{ borderBottom: '1px solid var(--nav-border)' }}>
                        <td style={{ padding: '0.5rem', fontWeight: 'bold', color: 'var(--text-color)' }}>예시</td>
                        <td style={{ padding: '0.5rem' }}>100개 게시글 기준: 1개 (게시글+작성자, Fetch Join) + 100개 (좋아요) + 100개 (싫어요) = <strong style={{ color: 'var(--text-color)' }}>201개 쿼리</strong></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div style={{
                padding: '1rem',
                backgroundColor: 'var(--bg-color)',
                borderRadius: '6px',
                marginTop: '1rem'
              }}>
                <h3 style={{ marginBottom: '0.75rem', color: 'var(--text-color)', fontSize: '1rem' }}>2. N+1 문제: 작성자 정보 조회</h3>
                <div style={{
                  overflowX: 'auto',
                  marginBottom: '0.5rem'
                }}>
                  <table style={{
                    width: '100%',
                    borderCollapse: 'collapse',
                    color: 'var(--text-secondary)',
                    fontSize: '0.9rem'
                  }}>
                    <tbody>
                      <tr style={{ borderBottom: '1px solid var(--nav-border)' }}>
                        <td style={{ padding: '0.5rem', fontWeight: 'bold', color: 'var(--text-color)' }}>문제</td>
                        <td style={{ padding: '0.5rem' }}>게시글 조회 시 LAZY 로딩으로 인해 작성자 정보를 개별 쿼리로 조회</td>
                      </tr>
                      <tr>
                        <td style={{ padding: '0.5rem', fontWeight: 'bold', color: 'var(--text-color)' }}>예시</td>
                        <td style={{ padding: '0.5rem' }}>100개 게시글 조회 시 작성자 정보도 <strong style={{ color: 'var(--text-color)' }}>100번 쿼리</strong> 발생</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div style={{
                padding: '1rem',
                backgroundColor: 'var(--bg-color)',
                borderRadius: '6px',
                marginTop: '1rem'
              }}>
                <h3 style={{ marginBottom: '0.75rem', color: 'var(--text-color)', fontSize: '1rem' }}>3. 인기글 계산 성능 문제</h3>
                <div style={{
                  overflowX: 'auto',
                  marginBottom: '0.5rem'
                }}>
                  <table style={{
                    width: '100%',
                    borderCollapse: 'collapse',
                    color: 'var(--text-secondary)',
                    fontSize: '0.9rem'
                  }}>
                    <tbody>
                      <tr style={{ borderBottom: '1px solid var(--nav-border)' }}>
                        <td style={{ padding: '0.5rem', fontWeight: 'bold', color: 'var(--text-color)' }}>문제</td>
                        <td style={{ padding: '0.5rem' }}>인기글 조회 시마다 복잡한 인기도 점수 계산 (조회수×0.1 + 좋아요×2 + 댓글×1.5)</td>
                      </tr>
                      <tr>
                        <td style={{ padding: '0.5rem', fontWeight: 'bold', color: 'var(--text-color)' }}>성능</td>
                        <td style={{ padding: '0.5rem' }}>매번 전체 게시글을 조회하고 정렬하여 성능 저하 (데이터가 많아질수록 느려짐)</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div style={{
                padding: '1rem',
                backgroundColor: 'var(--bg-color)',
                borderRadius: '6px',
                marginTop: '1rem'
              }}>
                <h3 style={{ marginBottom: '0.75rem', color: 'var(--text-color)', fontSize: '1rem' }}>4. 검색 성능 문제</h3>
                <div style={{
                  overflowX: 'auto',
                  marginBottom: '0.5rem'
                }}>
                  <table style={{
                    width: '100%',
                    borderCollapse: 'collapse',
                    color: 'var(--text-secondary)',
                    fontSize: '0.9rem'
                  }}>
                    <tbody>
                      <tr style={{ borderBottom: '1px solid var(--nav-border)' }}>
                        <td style={{ padding: '0.5rem', fontWeight: 'bold', color: 'var(--text-color)' }}>문제</td>
                        <td style={{ padding: '0.5rem' }}>LIKE 검색은 인덱스를 활용하지 못하여 전체 테이블 스캔</td>
                      </tr>
                      <tr>
                        <td style={{ padding: '0.5rem', fontWeight: 'bold', color: 'var(--text-color)' }}>한글 검색</td>
                        <td style={{ padding: '0.5rem' }}>형태소 분석 부족으로 검색 누락 가능</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </section>

          {/* 3. 문제 재현 방식 (테스트 설계) */}
          <section id="test-design" style={{ marginBottom: '3rem', scrollMarginTop: '2rem' }}>
            <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>문제 재현 방식 (테스트 설계)</h2>
            <div style={{
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
            <div style={{
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

          {/* 4. 성능 측정 결과 (개선 전) */}
          <section id="before" style={{ marginBottom: '3rem', scrollMarginTop: '2rem' }}>
            <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>성능 측정 결과 (개선 전)</h2>
            <div style={{
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

          {/* 5. 성능 최적화 및 동시성 제어 */}
          <section id="optimization" style={{ marginBottom: '3rem', scrollMarginTop: '2rem' }}>
            <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>성능 최적화 및 동시성 제어</h2>
            <div style={{
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
                <p style={{ lineHeight: '1.8', color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '0.75rem', marginBottom: '0.5rem' }}>
                  <strong style={{ color: 'var(--text-color)' }}>핵심 포인트:</strong>
                </p>
                <p style={{ lineHeight: '1.8', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                  게시글 수와 무관하게 반응 정보 조회는 1개 쿼리로 일정하게 유지됩니다. 이는 반응 정보만 배치 조회로 최적화하는 방법이며, 실제 전체 최적화 결과는 아래 "성능 개선 결과 (개선 후)" 섹션에서 확인할 수 있습니다.
                </p>
              </div>
            </div>
            <div style={{
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
                <li>• 모든 게시글 조회 쿼리에 <code style={{ backgroundColor: 'var(--bg-color)', padding: '0.2rem 0.4rem', borderRadius: '4px' }}>JOIN FETCH b.user</code> 적용</li>
                <li>• 작성자 정보를 한 번의 쿼리로 함께 조회</li>
              </ul>
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
List<Board> findAllByIsDeletedFalseOrderByCreatedAtDesc();

@Query("SELECT b FROM Board b JOIN FETCH b.user u " +
       "WHERE b.category = :category AND b.isDeleted = false " +
       "AND u.isDeleted = false AND u.status = 'ACTIVE' " +
       "ORDER BY b.createdAt DESC")
List<Board> findByCategoryAndIsDeletedFalseOrderByCreatedAtDesc(
    @Param("category") String category);`}
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
                  <li>• 프로젝트 전체: 52개 이상의 JOIN FETCH/EntityGraph 사용</li>
                  <li>• Fetch Join 적용으로 작성자 정보 조회 시 추가 쿼리 없음</li>
                  <li>• 배치 조회와 함께 사용 시 전체 쿼리 수가 크게 감소</li>
                </ul>
              </div>
            </div>
            <div style={{
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
                <li>• 스케줄러를 통해 인기글 스냅샷을 미리 생성하여 저장</li>
                <li>• 조회 시에는 스냅샷에서 바로 조회</li>
                <li>• <strong style={{ color: 'var(--text-color)' }}>장점:</strong> 실시간 계산 없이 즉시 조회 가능, DB 부담 감소</li>
              </ul>
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
}

@Scheduled(cron = "0 30 18 ? * MON")  // 매주 월요일 오후 6시 30분
@Transactional
public void generateMonthlyPopularitySnapshots() {
    log.info("월간 인기 게시글 스냅샷 생성 시작");
    boardPopularityService.generateSnapshots(PopularityPeriodType.MONTHLY);
    log.info("월간 인기 게시글 스냅샷 생성 완료");
}`}
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
                  <li>• 조회 시간: 실시간 계산 필요 → <strong style={{ color: 'var(--text-color)' }}>스냅샷 조회 (즉시 응답)</strong></li>
                  <li>• DB 부담: 매번 계산 (게시글 수에 비례) → 스냅샷 조회 (고정) - 대폭 감소</li>
                  <li>• 확장성: 데이터 증가 시 성능 저하 → 데이터와 무관하게 일정 - 향상</li>
                  <li>• 캐싱 결합 시 더욱 빠른 응답</li>
                </ul>
                <p style={{ lineHeight: '1.8', color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '0.5rem', fontStyle: 'italic' }}>
                  참고: 스냅샷 생성은 스케줄러로 백그라운드에서 실행되므로 사용자 요청에 영향을 주지 않습니다.
                </p>
              </div>
            </div>
            <div style={{
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
                <li>• MySQL FULLTEXT 인덱스 사용 (ngram 파서)</li>
                <li>• relevance 점수 기반 정렬</li>
              </ul>
              <p style={{ lineHeight: '1.8', color: 'var(--text-secondary)', marginBottom: '0.75rem', fontSize: '0.9rem' }}>
                <strong style={{ color: 'var(--text-color)' }}>인덱스 생성:</strong>
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
              <p style={{ lineHeight: '1.8', color: 'var(--text-secondary)', marginBottom: '0.75rem', fontSize: '0.9rem' }}>
                <strong style={{ color: 'var(--text-color)' }}>Repository 쿼리:</strong>
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
@Query(value = "SELECT b.*, " +
               "MATCH(b.title, b.content) AGAINST(:kw IN BOOLEAN MODE) as relevance " +
               "FROM board b " +
               "INNER JOIN users u ON b.user_idx = u.idx " +
               "WHERE b.is_deleted = false " +
               "AND u.is_deleted = false " +
               "AND u.status = 'ACTIVE' " +
               "AND MATCH(b.title, b.content) AGAINST(:kw IN BOOLEAN MODE) " +
               "ORDER BY relevance DESC, b.created_at DESC", 
       nativeQuery = true)
Page<Board> searchByKeywordWithPaging(
    @Param("kw") String keyword, Pageable pageable);`}
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
                  <li>• 검색 속도: LIKE 검색 → FULLTEXT 검색<strong style={{ color: 'var(--text-color)' }}></strong></li>
                  <li>• 한글 검색: 형태소 분석 부족 → ngram 파서로 정확도 향상</li>
                  <li>• 검색 품질: 단순 매칭 → relevance 점수 기반 정렬 - 향상</li>
                </ul>
              </div>
            </div>
            <div style={{
              padding: '1.5rem',
              backgroundColor: 'var(--card-bg)',
              borderRadius: '8px',
              border: '1px solid var(--nav-border)',
              marginBottom: '1rem'
            }}>
              <h3 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>5. 기본 인덱싱 전략 적용</h3>
              <p style={{ lineHeight: '1.8', color: 'var(--text-secondary)', marginBottom: '0.75rem' }}>
                게시글, 댓글, 반응, 조회수 로그에 대한 인덱스를 추가하여 쿼리 성능을 향상시켰습니다.
              </p>
              <p style={{ lineHeight: '1.8', color: 'var(--text-secondary)', marginBottom: '0.75rem', fontSize: '0.9rem' }}>
                <strong style={{ color: 'var(--text-color)' }}>게시글 조회 성능 향상:</strong>
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
{`CREATE INDEX idx_board_created_at ON board(created_at);
CREATE INDEX idx_board_category_created_at ON board(category, created_at);
CREATE INDEX idx_board_user_idx_created_at ON board(user_idx, created_at);
CREATE FULLTEXT INDEX idx_board_title_content 
    ON board(title, content) WITH PARSER ngram;`}
              </pre>
              <p style={{ lineHeight: '1.8', color: 'var(--text-secondary)', marginBottom: '0.75rem', fontSize: '0.9rem' }}>
                <strong style={{ color: 'var(--text-color)' }}>댓글 조회 성능 향상:</strong>
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
{`CREATE INDEX idx_comment_board_deleted_created 
    ON comment(board_idx, is_deleted, created_at ASC);
CREATE INDEX idx_comment_user ON comment(user_idx);`}
              </pre>
              <p style={{ lineHeight: '1.8', color: 'var(--text-secondary)', marginBottom: '0.75rem', fontSize: '0.9rem' }}>
                <strong style={{ color: 'var(--text-color)' }}>반응 조회 성능 향상:</strong>
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
{`CREATE INDEX idx_board_reaction_board_type 
    ON board_reaction(board_idx, reaction_type);
CREATE INDEX idx_board_reaction_user ON board_reaction(user_idx);
CREATE UNIQUE INDEX idx_board_reaction_unique 
    ON board_reaction(board_idx, user_idx);`}
              </pre>
              <p style={{ lineHeight: '1.8', color: 'var(--text-secondary)', marginBottom: '0.75rem', fontSize: '0.9rem' }}>
                <strong style={{ color: 'var(--text-color)' }}>조회수 로그:</strong>
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
{`CREATE INDEX idx_board_view_log_board ON board_view_log(board_idx);
CREATE INDEX idx_board_view_log_user ON board_view_log(user_idx);
CREATE UNIQUE INDEX idx_board_view_log_unique 
    ON board_view_log(board_idx, user_idx);`}
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
                  <li>• 쿼리 실행 계획 최적화</li>
                  <li>• 불필요한 테이블 스캔 방지</li>
                  <li>• 정렬 및 필터링 성능 향상</li>
                </ul>
              </div>
            </div>
            <div style={{
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

          {/* 6. 성능 개선 결과 (개선 후) */}
          <section id="after" style={{ marginBottom: '3rem', scrollMarginTop: '2rem' }}>
            <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>성능 개선 결과 (개선 후)</h2>
            <div style={{
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
              <div style={{
                padding: '1rem',
                backgroundColor: 'var(--bg-color)',
                borderRadius: '6px',
                marginTop: '1rem'
              }}>
                <h3 style={{ marginBottom: '0.75rem', color: 'var(--text-color)', fontSize: '1rem' }}>결과 분석</h3>
                <ul style={{
                  listStyle: 'none',
                  padding: 0,
                  color: 'var(--text-secondary)',
                  lineHeight: '1.8',
                  fontSize: '0.9rem'
                }}>
                  <li>• ✅ <strong style={{ color: 'var(--text-color)' }}>N+1 문제 완전 해결</strong>: 배치 조회로 게시글 수와 무관하게 쿼리 수가 일정하게 유지됨</li>
                  <li>• ✅ <strong style={{ color: 'var(--text-color)' }}>Fetch Join 적용</strong>: 작성자 정보를 한 번의 쿼리로 함께 조회</li>
                  <li>• ✅ <strong style={{ color: 'var(--text-color)' }}>실행 시간 대폭 개선</strong>: 745ms → 30ms로 24배 이상 빨라짐</li>
                  <li>• ✅ <strong style={{ color: 'var(--text-color)' }}>메모리 사용량 감소</strong>: 22.50 MB → 2 MB로 91% 감소 (개별 쿼리 오버헤드 제거)</li>
                  <li>• ✅ <strong style={{ color: 'var(--text-color)' }}>확장성 확보</strong>: 게시글이 100개든 1000개든 쿼리 수는 3개로 동일</li>
                </ul>
              </div>
              <div style={{
                padding: '1rem',
                backgroundColor: 'var(--bg-color)',
                borderRadius: '6px',
                marginTop: '1rem',
                border: '1px solid var(--nav-border)'
              }}>
                <h3 style={{ marginBottom: '0.75rem', color: 'var(--text-color)', fontSize: '1rem' }}>📌 테스트 정보</h3>
                <p style={{ lineHeight: '1.8', color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '0.5rem' }}>
                  이 결과는 <strong style={{ color: 'var(--text-color)' }}>테스트 3: 전체 성능 비교 (실제 사용 시나리오)</strong>에서 측정된 값입니다.
                </p>
                <ul style={{
                  listStyle: 'none',
                  padding: 0,
                  color: 'var(--text-secondary)',
                  lineHeight: '1.8',
                  fontSize: '0.9rem'
                }}>
                  <li>• 포함 내용: 작성자 정보 (Fetch Join) + 반응 정보 (배치 조회) + 첨부파일 (배치 조회)</li>
                  <li>• 실제 사용 시나리오를 가장 잘 반영하는 테스트 ⭐</li>
                </ul>
              </div>
              <div style={{
                padding: '1rem',
                backgroundColor: 'var(--bg-color)',
                borderRadius: '6px',
                marginTop: '1rem'
              }}>
                <h3 style={{ marginBottom: '0.75rem', color: 'var(--text-color)', fontSize: '1rem' }}>🎯 결론</h3>
                <p style={{ lineHeight: '1.8', color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '0.75rem', fontWeight: 'bold' }}>
                  성공적으로 해결된 항목:
                </p>
                <ul style={{
                  listStyle: 'none',
                  padding: 0,
                  color: 'var(--text-secondary)',
                  lineHeight: '1.8',
                  fontSize: '0.9rem',
                  marginBottom: '0.75rem'
                }}>
                  <li>• ✅ <strong style={{ color: 'var(--text-color)' }}>N+1 문제 완전 해결</strong>: 배치 조회와 Fetch Join을 적용하여 쿼리 수를 301개 → 3개로 대폭 감소</li>
                  <li>• ✅ <strong style={{ color: 'var(--text-color)' }}>실행 시간 대폭 개선</strong>: 745ms → 30ms로 24배 이상 빨라짐</li>
                  <li>• ✅ <strong style={{ color: 'var(--text-color)' }}>메모리 사용량 감소</strong>: 22.50 MB → 2 MB로 91% 감소 (개별 쿼리 오버헤드 제거)</li>
                  <li>• ✅ <strong style={{ color: 'var(--text-color)' }}>확장성 확보</strong>: 게시글 수와 무관하게 쿼리 수가 일정하게 유지됨</li>
                </ul>
                <p style={{ lineHeight: '1.8', color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '0.75rem', fontStyle: 'italic' }}>
                  실제 운영 환경에서도 유의미한 성능 향상을 기대할 수 있습니다.
                </p>
              </div>
            </div>
            <div style={{
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

          {/* 7. Entity 구조 */}
          <section id="entities" style={{ marginBottom: '3rem', scrollMarginTop: '2rem' }}>
            <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>Entity 구조</h2>
            <div style={{
              padding: '1.5rem',
              backgroundColor: 'var(--card-bg)',
              borderRadius: '8px',
              border: '1px solid var(--nav-border)'
            }}>
              <MermaidDiagram chart={entityDiagram} />
            </div>
          </section>

          {/* 8. Service 주요 기능 */}
          <section id="services" style={{ marginBottom: '3rem', scrollMarginTop: '2rem' }}>
            <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>Service 주요 기능</h2>
            <div style={{
              padding: '1.5rem',
              backgroundColor: 'var(--card-bg)',
              borderRadius: '8px',
              border: '1px solid var(--nav-border)',
              marginBottom: '1rem'
            }}>
              <h3 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>BoardService</h3>
              <div style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}>
                <div style={{ marginBottom: '0.5rem' }}><strong style={{ color: 'var(--text-color)' }}>게시글 CRUD:</strong></div>
                <div>• getAllBoardsWithPaging() - 게시글 목록 조회 (페이징)</div>
                <div>• getBoard() - 게시글 상세 조회 + 조회수 증가</div>
                <div>• createBoard() - 게시글 생성</div>
                <div>• updateBoard() - 게시글 수정</div>
                <div>• deleteBoard() - 게시글 삭제 (소프트 삭제)</div>
                <div style={{ marginTop: '1rem', marginBottom: '0.5rem' }}><strong style={{ color: 'var(--text-color)' }}>성능 최적화:</strong></div>
                <div>• 배치 조회로 N+1 문제 해결</div>
                <div>• 좋아요/싫어요 카운트 배치 조회 (IN 절, 500개 단위)</div>
              </div>
            </div>
            <div style={{
              padding: '1.5rem',
              backgroundColor: 'var(--card-bg)',
              borderRadius: '8px',
              border: '1px solid var(--nav-border)'
            }}>
              <h3 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>BoardPopularityService</h3>
              <div style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}>
                <div>• generateSnapshots() - 인기글 스냅샷 생성 (주간/월간)</div>
                <div>• getPopularBoards() - 인기글 조회</div>
                <div>• calculatePopularityScore() - 인기도 점수 계산</div>
              </div>
            </div>
          </section>

          {/* 9. 보안 및 권한 체계 */}
          <section id="security" style={{ marginBottom: '3rem', scrollMarginTop: '2rem' }}>
            <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>보안 및 권한 체계</h2>
            <div style={{
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
                <li>• <strong style={{ color: 'var(--text-color)' }}>작성자만 수정/삭제 가능</strong>: 게시글/댓글 작성자만 수정/삭제 가능</li>
                <li>• <strong style={{ color: 'var(--text-color)' }}>이메일 인증</strong>: 게시글/댓글 수정/삭제 시 이메일 인증 필수</li>
                <li>• <strong style={{ color: 'var(--text-color)' }}>소프트 삭제</strong>: isDeleted 플래그로 논리 삭제</li>
              </ul>
            </div>
          </section>

          {/* 10. 다른 도메인과의 연관관계 */}
          <section id="relationships" style={{ marginBottom: '3rem', scrollMarginTop: '2rem' }}>
            <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>다른 도메인과의 연관관계</h2>
            <div style={{
              padding: '1.5rem',
              backgroundColor: 'var(--card-bg)',
              borderRadius: '8px',
              border: '1px solid var(--nav-border)'
            }}>
              <div style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}>
                <div style={{ marginBottom: '0.5rem' }}><strong style={{ color: 'var(--text-color)' }}>User 도메인:</strong></div>
                <div>• Users가 게시글/댓글 작성, 반응 추가, 게시글 조회</div>
                <div style={{ marginTop: '1rem', marginBottom: '0.5rem' }}><strong style={{ color: 'var(--text-color)' }}>File 도메인:</strong></div>
                <div>• 게시글에 이미지/파일 첨부, AttachmentFile과 연동</div>
                <div style={{ marginTop: '1rem', marginBottom: '0.5rem' }}><strong style={{ color: 'var(--text-color)' }}>Report 도메인:</strong></div>
                <div>• 게시글/댓글 신고, 신고 처리 결과로 상태 변경</div>
                <div style={{ marginTop: '1rem', marginBottom: '0.5rem' }}><strong style={{ color: 'var(--text-color)' }}>Notification 도메인:</strong></div>
                <div>• 댓글 작성 시 게시글 작성자에게 알림, 반응 추가 시 알림</div>
              </div>
            </div>
          </section>

          {/* 11. API 엔드포인트 */}
          <section id="api" style={{ marginBottom: '3rem', scrollMarginTop: '2rem' }}>
            <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>API 엔드포인트</h2>
            <div style={{
              padding: '1.5rem',
              backgroundColor: 'var(--card-bg)',
              borderRadius: '8px',
              border: '1px solid var(--nav-border)',
              marginBottom: '1rem'
            }}>
              <h3 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>게시글 (/api/boards)</h3>
              <div style={{
                color: 'var(--text-secondary)',
                lineHeight: '1.8',
                fontFamily: 'monospace',
                fontSize: '0.9rem'
              }}>
                <div>• GET / - 게시글 목록 (페이징, 카테고리 필터)</div>
                <div>• GET /{'{id}'} - 게시글 상세</div>
                <div>• POST / - 게시글 작성</div>
                <div>• PUT /{'{id}'} - 게시글 수정</div>
                <div>• DELETE /{'{id}'} - 게시글 삭제</div>
                <div>• GET /popular - 인기글 (주간/월간)</div>
              </div>
            </div>
            <div style={{
              padding: '1.5rem',
              backgroundColor: 'var(--card-bg)',
              borderRadius: '8px',
              border: '1px solid var(--nav-border)'
            }}>
              <h3 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>댓글 (/api/boards/{'{boardId}'}/comments)</h3>
              <div style={{
                color: 'var(--text-secondary)',
                lineHeight: '1.8',
                fontFamily: 'monospace',
                fontSize: '0.9rem'
              }}>
                <div>• GET / - 댓글 목록</div>
                <div>• POST / - 댓글 작성</div>
                <div>• PUT /{'{commentId}'} - 댓글 수정</div>
                <div>• DELETE /{'{commentId}'} - 댓글 삭제</div>
              </div>
            </div>
          </section>

          {/* 12. 관련 문서 */}
          <section id="docs" style={{ marginBottom: '3rem', scrollMarginTop: '2rem' }}>
            <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>관련 문서</h2>
            <div style={{
              padding: '1rem',
              backgroundColor: 'var(--card-bg)',
              borderRadius: '8px',
              border: '1px solid var(--nav-border)'
            }}>
              <a
                href="https://github.com/makkong1/makkong1-github.io/blob/main/docs/domains/board.md"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: 'var(--link-color)',
                  textDecoration: 'none',
                  display: 'block'
                }}
              >
                → Board 도메인 상세 문서
              </a>
            </div>
          </section>
        </div>
        <TableOfContents sections={sections} />
      </div>
    </div>
  );
}

export default BoardDomain;
