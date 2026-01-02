import { Link } from 'react-router-dom';
import MermaidDiagram from '../../../../components/Common/MermaidDiagram';
import TableOfContents from '../../../../components/Common/TableOfContents';

function BoardDomain() {
  const sections = [
    { id: 'intro', title: '도메인 소개' },
    { id: 'features', title: '주요 기능' },
    { id: 'troubleshooting', title: '트러블슈팅' },
    { id: 'db-optimization', title: 'DB 최적화' },
    { id: 'entities', title: 'Entity 구조' },
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

  return (
    <div className="domain-page-wrapper" style={{ padding: '2rem 0' }}>
      <div className="domain-page-container" style={{ display: 'flex', gap: '2rem', alignItems: 'flex-start' }}>
        <div className="domain-page-content" style={{ flex: 1 }}>
          <h1 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>게시판 도메인</h1>
          
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

          {/* 2. 주요 기능 */}
          <section id="features" style={{ marginBottom: '3rem', scrollMarginTop: '2rem' }}>
            <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>주요 기능</h2>
            
            <div className="section-card" style={{
              padding: '1.5rem',
              backgroundColor: 'var(--card-bg)',
              borderRadius: '8px',
              border: '1px solid var(--nav-border)',
              marginBottom: '1rem'
            }}>
              <h3 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>1. 게시글 작성 및 조회</h3>
              <div style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}>
                <p style={{ marginBottom: '0.5rem' }}>사용자가 게시글을 작성하고, 카테고리별로 필터링하여 조회할 수 있습니다.</p>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  <li>• 게시글 작성 (제목, 내용, 카테고리 선택)</li>
                  <li>• 이미지 첨부 가능</li>
                  <li>• 카테고리별 필터링 (자유, 정보, 질문, 자랑 등)</li>
                  <li>• 페이징 지원 (기본 20개씩)</li>
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
              <h3 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>2. 댓글 및 반응 시스템</h3>
              <div style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}>
                <p style={{ marginBottom: '0.5rem' }}>게시글에 댓글을 작성하고, 좋아요/싫어요를 누를 수 있습니다.</p>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  <li>• 게시글 상세 조회 시 댓글 목록 표시</li>
                  <li>• 댓글 작성 시 게시글 작성자에게 알림 발송</li>
                  <li>• 좋아요/싫어요 클릭 시 실시간 카운트 업데이트</li>
                  <li>• 같은 반응 재클릭 시 취소 (토글)</li>
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
              <h3 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>3. 인기글 시스템</h3>
              <div style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}>
                <p style={{ marginBottom: '0.5rem' }}>주간/월간 인기글을 미리 계산하여 스냅샷으로 저장하고 빠르게 조회합니다.</p>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  <li>• 매일 18:30에 주간 인기글 스냅샷 자동 생성</li>
                  <li>• 매주 월요일 18:30에 월간 인기글 스냅샷 자동 생성</li>
                  <li>• 인기도 점수 = (좋아요 × 3) + (댓글 × 2) + 조회수</li>
                  <li>• "자랑" 카테고리 게시글만 대상으로 상위 30개 게시글 스냅샷 저장</li>
                  <li>• 스냅샷 조회 시 다단계 전략 사용 (정확한 날짜 매칭 → 겹치는 기간 → 최근 스냅샷 → 생성)</li>
                </ul>
              </div>
            </div>

            <div className="section-card" style={{
              padding: '1.5rem',
              backgroundColor: 'var(--card-bg)',
              borderRadius: '8px',
              border: '1px solid var(--nav-border)'
            }}>
              <h3 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>4. 게시글 검색</h3>
              <div style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}>
                <p style={{ marginBottom: '0.5rem' }}>제목, 내용, 작성자 ID로 게시글을 검색할 수 있습니다.</p>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  <li>• 검색 타입 선택 (제목만, 내용만, 제목+내용, 작성자 ID)</li>
                  <li>• 페이징 지원 (기본 20개씩)</li>
                  <li>• 검색 결과는 최신순으로 정렬</li>
                  <li>• FULLTEXT 인덱스로 검색 성능 최적화</li>
                </ul>
              </div>
            </div>
          </section>

          {/* 3. 트러블슈팅 */}
          <section id="troubleshooting" style={{ marginBottom: '3rem', scrollMarginTop: '2rem' }}>
            <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>트러블슈팅</h2>
            
            <div className="section-card" style={{
              padding: '1.5rem',
              backgroundColor: 'var(--card-bg)',
              borderRadius: '8px',
              border: '1px solid var(--nav-border)',
              marginBottom: '1rem'
            }}>
              <h3 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>1. 게시글 목록 조회 시 N+1 문제</h3>
              <div style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}>
                <p style={{ marginBottom: '0.5rem' }}><strong style={{ color: 'var(--text-color)' }}>문제:</strong> 게시글 목록 조회 시 각 게시글의 좋아요/싫어요 수를 개별 쿼리로 조회하면 N+1 문제 발생</p>
                <p style={{ marginBottom: '0.5rem' }}><strong style={{ color: 'var(--text-color)' }}>해결:</strong> 배치 조회로 한 번에 모든 게시글의 반응 수를 조회</p>
                <p style={{ marginBottom: '0.5rem' }}><strong style={{ color: 'var(--text-color)' }}>효과:</strong> 1000개 게시글 조회 시 2001개 쿼리 → 3개 쿼리로 감소 (99.8% 개선)</p>
                <div style={{
                  marginTop: '1rem',
                  padding: '1rem',
                  backgroundColor: 'var(--bg-color)',
                  borderRadius: '6px',
                  border: '1px solid var(--link-color)'
                }}>
                  <Link
                    to="/domains/board/optimization"
                    style={{
                      color: 'var(--link-color)',
                      textDecoration: 'none',
                      fontWeight: 'bold',
                      display: 'inline-block'
                    }}
                  >
                    → N+1 문제 해결 상세 보기
                  </Link>
                </div>
              </div>
            </div>

            {/* <div className="section-card" style={{
              padding: '1.5rem',
              backgroundColor: 'var(--card-bg)',
              borderRadius: '8px',
              border: '1px solid var(--nav-border)',
              marginBottom: '1rem'
            }}>
              <h3 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>2. 조회수 중복 방지</h3>
              <div style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}>
                <p style={{ marginBottom: '0.5rem' }}><strong style={{ color: 'var(--text-color)' }}>문제:</strong> 같은 사용자가 새로고침할 때마다 조회수 증가</p>
                <p style={{ marginBottom: '0.5rem' }}><strong style={{ color: 'var(--text-color)' }}>해결:</strong> BoardViewLog 테이블에 사용자별 조회 기록 저장하여 중복 방지</p>
                <p style={{ marginBottom: 0 }}><strong style={{ color: 'var(--text-color)' }}>효과:</strong> 정확한 조회 수 추적, 중복 조회 방지</p>
              </div>
            </div>

            <div className="section-card" style={{
              padding: '1.5rem',
              backgroundColor: 'var(--card-bg)',
              borderRadius: '8px',
              border: '1px solid var(--nav-border)',
              marginBottom: '1rem'
            }}>
              <h3 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>3. 반응 중복 방지</h3>
              <div style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}>
                <p style={{ marginBottom: '0.5rem' }}><strong style={{ color: 'var(--text-color)' }}>문제:</strong> 동시에 같은 사용자가 좋아요/싫어요를 여러 번 클릭 시 중복 저장 가능</p>
                <p style={{ marginBottom: '0.5rem' }}><strong style={{ color: 'var(--text-color)' }}>해결:</strong> Unique 제약조건 (`board_idx`, `user_idx`) + 예외 처리</p>
                <p style={{ marginBottom: 0 }}><strong style={{ color: 'var(--text-color)' }}>효과:</strong> 동시 클릭 시에도 하나의 반응만 저장</p>
              </div>
            </div>

            <div className="section-card" style={{
              padding: '1.5rem',
              backgroundColor: 'var(--card-bg)',
              borderRadius: '8px',
              border: '1px solid var(--nav-border)',
              marginBottom: '1rem'
            }}>
              <h3 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>4. 인기글 스냅샷 조회 전략</h3>
              <div style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}>
                <p style={{ marginBottom: '0.5rem' }}><strong style={{ color: 'var(--text-color)' }}>문제:</strong> 스냅샷이 정확한 날짜로 매칭되지 않을 수 있음</p>
                <p style={{ marginBottom: '0.5rem' }}><strong style={{ color: 'var(--text-color)' }}>해결:</strong> 다단계 조회 전략 사용</p>
                <ul style={{ listStyle: 'none', padding: 0, margin: '0.5rem 0 0 0' }}>
                  <li>• 정확한 날짜 매칭으로 조회 시도</li>
                  <li>• 기간이 겹치는 스냅샷 조회 시도</li>
                  <li>• 가장 최근 스냅샷 조회 시도</li>
                  <li>• 모든 시도 실패 시 새로 생성</li>
                </ul>
                <p style={{ marginTop: '0.5rem', marginBottom: 0 }}><strong style={{ color: 'var(--text-color)' }}>효과:</strong> 다양한 상황에서도 인기글을 안정적으로 제공</p>
              </div>
            </div>

            <div className="section-card" style={{
              padding: '1.5rem',
              backgroundColor: 'var(--card-bg)',
              borderRadius: '8px',
              border: '1px solid var(--nav-border)'
            }}>
              <h3 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>5. 인기글 스냅샷 생성 시 동시성 문제</h3>
              <div style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}>
                <p style={{ marginBottom: '0.5rem' }}><strong style={{ color: 'var(--text-color)' }}>문제:</strong> 실시간 집계 시 동시성 문제로 인한 부정확한 카운트</p>
                <p style={{ marginBottom: '0.5rem' }}><strong style={{ color: 'var(--text-color)' }}>해결:</strong> 배치 조회로 실시간 집계 (1000개 단위로 분할)</p>
                <p style={{ marginBottom: 0 }}><strong style={{ color: 'var(--text-color)' }}>효과:</strong> 동시성 문제 없이 정확한 인기도 점수 계산</p>
              </div>
            </div> */}
          </section>

          {/* 4. DB 최적화 */}
          <section id="db-optimization" style={{ marginBottom: '3rem', scrollMarginTop: '2rem' }}>
            <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>DB 최적화</h2>
            
            <div className="section-card" style={{
              padding: '1.5rem',
              backgroundColor: 'var(--card-bg)',
              borderRadius: '8px',
              border: '1px solid var(--nav-border)',
              marginBottom: '1rem'
            }}>
              <h3 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>인덱스 전략</h3>
              <div style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}>
                <p style={{ marginBottom: '0.5rem' }}><strong style={{ color: 'var(--text-color)' }}>board 테이블:</strong></p>
                <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 1rem 0' }}>
                  <li>• 카테고리별 조회: <code style={{ backgroundColor: 'var(--bg-color)', padding: '0.2rem 0.4rem', borderRadius: '4px' }}>CREATE INDEX idx_board_category_deleted_created ON board(category, is_deleted, created_at)</code></li>
                  <li>• 전체 게시글 조회 (최신순): <code style={{ backgroundColor: 'var(--bg-color)', padding: '0.2rem 0.4rem', borderRadius: '4px' }}>CREATE INDEX idx_board_created_at_desc ON board(created_at)</code></li>
                  <li>• 검색 (제목, 내용): <code style={{ backgroundColor: 'var(--bg-color)', padding: '0.2rem 0.4rem', borderRadius: '4px' }}>CREATE FULLTEXT INDEX idx_board_title_content ON board(title, content) WITH PARSER ngram</code></li>
                  <li>• 사용자별 게시글 조회: <code style={{ backgroundColor: 'var(--bg-color)', padding: '0.2rem 0.4rem', borderRadius: '4px' }}>CREATE INDEX idx_board_user_deleted_created ON board(user_idx, is_deleted, created_at)</code></li>
                </ul>
                <p style={{ marginBottom: '0.5rem' }}><strong style={{ color: 'var(--text-color)' }}>board_reaction 테이블:</strong></p>
                <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 1rem 0' }}>
                  <li>• 게시글-사용자 조합 (Unique 제약조건): <code style={{ backgroundColor: 'var(--bg-color)', padding: '0.2rem 0.4rem', borderRadius: '4px' }}>CREATE UNIQUE INDEX UKaymqx4hghgrqitkbplgp553u0 ON board_reaction(board_idx, user_idx)</code></li>
                </ul>
                <p style={{ marginBottom: '0.5rem' }}><strong style={{ color: 'var(--text-color)' }}>board_view_log 테이블:</strong></p>
                <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 1rem 0' }}>
                  <li>• 게시글-사용자 조합 (Unique 제약조건, 중복 방지): <code style={{ backgroundColor: 'var(--bg-color)', padding: '0.2rem 0.4rem', borderRadius: '4px' }}>CREATE UNIQUE INDEX uk_board_view_log_board_user ON board_view_log(board_id, user_id)</code></li>
                </ul>
                <p style={{ marginBottom: '0.5rem' }}><strong style={{ color: 'var(--text-color)' }}>선정 이유:</strong></p>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  <li>• 자주 조회되는 컬럼 조합 (category, is_deleted, created_at)</li>
                  <li>• WHERE 절에서 자주 사용되는 조건</li>
                  <li>• JOIN에 사용되는 외래키 (user_idx, board_idx)</li>
                  <li>• 검색 성능 향상 (title, content)</li>
                  <li>• 중복 방지를 위한 Unique 제약조건</li>
                </ul>
              </div>
            </div>

            <div className="section-card" style={{
              padding: '1.5rem',
              backgroundColor: 'var(--card-bg)',
              borderRadius: '8px',
              border: '1px solid var(--nav-border)'
            }}>
              <h3 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>쿼리 최적화</h3>
              <div style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}>
                <p style={{ marginBottom: '0.5rem' }}><strong style={{ color: 'var(--text-color)' }}>Before:</strong> 비효율적인 쿼리 (N+1 문제)</p>
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
{`SELECT * FROM board WHERE is_deleted = false;
-- 각 게시글마다 개별 쿼리
SELECT COUNT(*) FROM board_reaction 
WHERE board_idx = ? AND reaction_type = 'LIKE';`}
                </pre>
                <p style={{ marginBottom: '0.5rem' }}><strong style={{ color: 'var(--text-color)' }}>After:</strong> 최적화된 쿼리 (배치 조회)</p>
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
{`SELECT * FROM board 
WHERE is_deleted = false 
ORDER BY created_at DESC LIMIT 20;
SELECT board_idx, reaction_type, COUNT(*) 
FROM board_reaction 
WHERE board_idx IN (?, ?, ..., ?) 
GROUP BY board_idx, reaction_type;`}
                </pre>
                <p style={{ marginBottom: '0.5rem' }}><strong style={{ color: 'var(--text-color)' }}>개선 포인트:</strong></p>
                <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 1rem 0' }}>
                  <li>• 배치 조회로 N+1 문제 해결</li>
                  <li>• IN 절 사용으로 여러 게시글의 반응 수를 한 번에 조회</li>
                  <li>• GROUP BY로 집계 성능 향상</li>
                </ul>
              </div>
            </div>
          </section>

          {/* 7. Entity 구조 */}
          <section id="entities" style={{ marginBottom: '3rem', scrollMarginTop: '2rem' }}>
            <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>Entity 구조</h2>
            <div className="section-card" style={{
              padding: '1.5rem',
              backgroundColor: 'var(--card-bg)',
              borderRadius: '8px',
              border: '1px solid var(--nav-border)'
            }}>
              <MermaidDiagram chart={entityDiagram} />
            </div>
          </section>

          {/* 7. 보안 및 권한 체계 */}
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
                <li>• <strong style={{ color: 'var(--text-color)' }}>작성자만 수정/삭제 가능</strong>: 게시글/댓글 작성자만 수정/삭제 가능</li>
                <li>• <strong style={{ color: 'var(--text-color)' }}>이메일 인증</strong>: 게시글/댓글 수정/삭제 시 이메일 인증 필수</li>
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
            <div className="section-card" style={{
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
            <div className="section-card" style={{
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
            <div className="section-card" style={{
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
