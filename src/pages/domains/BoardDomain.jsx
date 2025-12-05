import MermaidDiagram from '../../components/Common/MermaidDiagram';

function BoardDomain() {
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
    <div style={{ padding: '2rem 0' }}>
      <h1 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>게시판 도메인</h1>
      
      <section style={{ marginBottom: '3rem' }}>
        <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>도메인 소개</h2>
        <p style={{ lineHeight: '1.8', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
          커뮤니티 게시판, 댓글, 반응(좋아요/싫어요), 인기글 스냅샷 등을 관리하는 핵심 도메인입니다.
        </p>
        <p style={{ lineHeight: '1.8', color: 'var(--text-secondary)' }}>
          게시글 CRUD, 댓글 시스템, 좋아요/싫어요 반응, 조회수 관리, 인기글 스냅샷 기능을 제공합니다.
        </p>
      </section>

      <section style={{ marginBottom: '3rem' }}>
        <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>주요 기능</h2>
        
        <div style={{ 
          display: 'grid', 
          gap: '1.5rem',
          gridTemplateColumns: 'repeat(2, 1fr)'
        }}>
          <div style={{
            padding: '1.5rem',
            backgroundColor: 'var(--card-bg)',
            borderRadius: '8px',
            border: '1px solid var(--nav-border)'
          }}>
            <h3 style={{ marginBottom: '0.5rem', color: 'var(--text-color)' }}>게시판 기능</h3>
            <ul style={{ 
              listStyle: 'none', 
              padding: 0,
              color: 'var(--text-secondary)',
              lineHeight: '1.8'
            }}>
              <li>• 카테고리별 게시글 작성 (자유, 정보, 질문 등)</li>
              <li>• 게시글 조회수 관리</li>
              <li>• 소프트 삭제</li>
              <li>• 검색 기능 (제목, 내용, 작성자)</li>
            </ul>
          </div>

          <div style={{
            padding: '1.5rem',
            backgroundColor: 'var(--card-bg)',
            borderRadius: '8px',
            border: '1px solid var(--nav-border)'
          }}>
            <h3 style={{ marginBottom: '0.5rem', color: 'var(--text-color)' }}>댓글 시스템</h3>
            <ul style={{ 
              listStyle: 'none', 
              padding: 0,
              color: 'var(--text-secondary)',
              lineHeight: '1.8'
            }}>
              <li>• 댓글 작성/수정/삭제</li>
              <li>• 댓글 수 실시간 업데이트</li>
              <li>• 댓글 반응 (좋아요/싫어요)</li>
            </ul>
          </div>

          <div style={{
            padding: '1.5rem',
            backgroundColor: 'var(--card-bg)',
            borderRadius: '8px',
            border: '1px solid var(--nav-border)'
          }}>
            <h3 style={{ marginBottom: '0.5rem', color: 'var(--text-color)' }}>반응 시스템</h3>
            <ul style={{ 
              listStyle: 'none', 
              padding: 0,
              color: 'var(--text-secondary)',
              lineHeight: '1.8'
            }}>
              <li>• 좋아요/싫어요 기능</li>
              <li>• 반응 수 집계</li>
              <li>• 중복 반응 방지 (유니크 제약)</li>
            </ul>
          </div>

          <div style={{
            padding: '1.5rem',
            backgroundColor: 'var(--card-bg)',
            borderRadius: '8px',
            border: '1px solid var(--nav-border)'
          }}>
            <h3 style={{ marginBottom: '0.5rem', color: 'var(--text-color)' }}>인기글 스냅샷</h3>
            <ul style={{ 
              listStyle: 'none', 
              padding: 0,
              color: 'var(--text-secondary)',
              lineHeight: '1.8'
            }}>
              <li>• 주기적으로 인기글 스냅샷 생성</li>
              <li>• 조회수, 좋아요 수 기반 랭킹</li>
              <li>• 주간/월간 인기글 조회</li>
            </ul>
          </div>
        </div>
      </section>

      <section style={{ marginBottom: '3rem' }}>
        <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>Entity 구조</h2>
        
        <div style={{
          padding: '1.5rem',
          backgroundColor: 'var(--card-bg)',
          borderRadius: '8px',
          border: '1px solid var(--nav-border)',
          marginBottom: '1.5rem'
        }}>
          <MermaidDiagram chart={entityDiagram} />
        </div>

        <div style={{
          padding: '1.5rem',
          backgroundColor: 'var(--card-bg)',
          borderRadius: '8px',
          border: '1px solid var(--nav-border)',
          marginBottom: '1rem'
        }}>
          <h3 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>1. Board (게시글)</h3>
          <div style={{ 
            color: 'var(--text-secondary)',
            lineHeight: '1.8',
            fontFamily: 'monospace',
            fontSize: '0.9rem'
          }}>
            <div style={{ marginBottom: '0.5rem' }}><strong style={{ color: 'var(--text-color)' }}>주요 필드:</strong></div>
            <div>• idx (PK), user (작성자), title, content</div>
            <div>• category, status (ACTIVE/HIDDEN/DELETED)</div>
            <div>• createdAt, viewCount, likeCount, commentCount</div>
            <div>• lastReactionAt, isDeleted</div>
            <div style={{ marginTop: '0.5rem' }}><strong style={{ color: 'var(--text-color)' }}>연관관계:</strong></div>
            <div>• ManyToOne → Users</div>
            <div>• OneToMany → Comment, BoardReaction, BoardViewLog</div>
          </div>
        </div>

        <div style={{
          padding: '1.5rem',
          backgroundColor: 'var(--card-bg)',
          borderRadius: '8px',
          border: '1px solid var(--nav-border)',
          marginBottom: '1rem'
        }}>
          <h3 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>2. Comment (댓글)</h3>
          <div style={{ 
            color: 'var(--text-secondary)',
            lineHeight: '1.8',
            fontFamily: 'monospace',
            fontSize: '0.9rem'
          }}>
            <div style={{ marginBottom: '0.5rem' }}><strong style={{ color: 'var(--text-color)' }}>주요 필드:</strong></div>
            <div>• idx (PK), board (게시글), user (작성자)</div>
            <div>• content, status, createdAt, isDeleted</div>
            <div style={{ marginTop: '0.5rem' }}><strong style={{ color: 'var(--text-color)' }}>연관관계:</strong></div>
            <div>• ManyToOne → Board, Users</div>
            <div>• OneToMany → CommentReaction</div>
          </div>
        </div>

        <div style={{
          padding: '1.5rem',
          backgroundColor: 'var(--card-bg)',
          borderRadius: '8px',
          border: '1px solid var(--nav-border)',
          marginBottom: '1rem'
        }}>
          <h3 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>3. CommentReaction (댓글 반응)</h3>
          <div style={{ 
            color: 'var(--text-secondary)',
            lineHeight: '1.8',
            fontFamily: 'monospace',
            fontSize: '0.9rem'
          }}>
            <div style={{ marginBottom: '0.5rem' }}><strong style={{ color: 'var(--text-color)' }}>주요 필드:</strong></div>
            <div>• idx (PK), comment (댓글), user (사용자), type (LIKE/DISLIKE)</div>
            <div>• createdAt</div>
            <div style={{ marginTop: '0.5rem' }}><strong style={{ color: 'var(--text-color)' }}>연관관계:</strong></div>
            <div>• ManyToOne → Comment, Users</div>
            <div>• Unique 제약: (comment_idx, user_idx)</div>
          </div>
        </div>

        <div style={{
          padding: '1.5rem',
          backgroundColor: 'var(--card-bg)',
          borderRadius: '8px',
          border: '1px solid var(--nav-border)',
          marginBottom: '1rem'
        }}>
          <h3 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>4. BoardReaction (게시글 반응)</h3>
          <div style={{ 
            color: 'var(--text-secondary)',
            lineHeight: '1.8',
            fontFamily: 'monospace',
            fontSize: '0.9rem'
          }}>
            <div style={{ marginBottom: '0.5rem' }}><strong style={{ color: 'var(--text-color)' }}>주요 필드:</strong></div>
            <div>• idx (PK), board, user, type (LIKE/DISLIKE)</div>
            <div>• createdAt</div>
            <div style={{ marginTop: '0.5rem' }}><strong style={{ color: 'var(--text-color)' }}>연관관계:</strong></div>
            <div>• ManyToOne → Board, Users</div>
            <div>• Unique 제약: (board_idx, user_idx)</div>
          </div>
        </div>

        <div style={{
          padding: '1.5rem',
          backgroundColor: 'var(--card-bg)',
          borderRadius: '8px',
          border: '1px solid var(--nav-border)',
          marginBottom: '1rem'
        }}>
          <h3 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>5. BoardViewLog (조회 로그)</h3>
          <div style={{ 
            color: 'var(--text-secondary)',
            lineHeight: '1.8',
            fontFamily: 'monospace',
            fontSize: '0.9rem'
          }}>
            <div style={{ marginBottom: '0.5rem' }}><strong style={{ color: 'var(--text-color)' }}>목적:</strong></div>
            <div>사용자당 1회만 조회수 증가 (중복 조회 방지)</div>
            <div style={{ marginTop: '0.5rem' }}><strong style={{ color: 'var(--text-color)' }}>주요 필드:</strong></div>
            <div>• idx (PK), board, user, viewedAt</div>
          </div>
        </div>

        <div style={{
          padding: '1.5rem',
          backgroundColor: 'var(--card-bg)',
          borderRadius: '8px',
          border: '1px solid var(--nav-border)'
        }}>
          <h3 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>6. BoardPopularitySnapshot (인기글 스냅샷)</h3>
          <div style={{ 
            color: 'var(--text-secondary)',
            lineHeight: '1.8',
            fontFamily: 'monospace',
            fontSize: '0.9rem'
          }}>
            <div style={{ marginBottom: '0.5rem' }}><strong style={{ color: 'var(--text-color)' }}>목적:</strong></div>
            <div>주간/월간 인기글을 미리 계산하여 조회 성능 향상</div>
            <div style={{ marginTop: '0.5rem' }}><strong style={{ color: 'var(--text-color)' }}>주요 필드:</strong></div>
            <div>• idx (PK), board, periodType (WEEKLY/MONTHLY)</div>
            <div>• snapshotDate, viewCount, likeCount, commentCount</div>
            <div>• popularityScore (인기도 점수)</div>
          </div>
        </div>
      </section>

      <section style={{ marginBottom: '3rem' }}>
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
            <div style={{ marginTop: '1rem', marginBottom: '0.5rem' }}><strong style={{ color: 'var(--text-color)' }}>검색:</strong></div>
            <div>• searchBoardsWithPaging() - 게시글 검색 (제목+내용)</div>
            <div style={{ marginTop: '1rem', marginBottom: '0.5rem' }}><strong style={{ color: 'var(--text-color)' }}>성능 최적화:</strong></div>
            <div>• 배치 조회로 N+1 문제 해결</div>
            <div>• 좋아요/싫어요 카운트 배치 조회 (IN 절, 500개 단위)</div>
          </div>
        </div>

        <div style={{
          padding: '1.5rem',
          backgroundColor: 'var(--card-bg)',
          borderRadius: '8px',
          border: '1px solid var(--nav-border)',
          marginBottom: '1rem'
        }}>
          <h3 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>CommentService</h3>
          <div style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}>
            <div>• getCommentsByBoard() - 댓글 목록 조회</div>
            <div>• createComment() - 댓글 작성</div>
            <div>• updateComment() - 댓글 수정</div>
            <div>• deleteComment() - 댓글 삭제</div>
          </div>
        </div>

        <div style={{
          padding: '1.5rem',
          backgroundColor: 'var(--card-bg)',
          borderRadius: '8px',
          border: '1px solid var(--nav-border)',
          marginBottom: '1rem'
        }}>
          <h3 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>ReactionService</h3>
          <div style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}>
            <div>• toggleBoardReaction() - 게시글에 반응 추가/변경/취소</div>
            <div>• toggleCommentReaction() - 댓글에 반응 추가/변경/취소</div>
            <div>• getMyReaction() - 내 반응 조회</div>
            <div>• getReactionSummary() - 반응 요약 조회</div>
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
            <div style={{ marginTop: '0.5rem', fontSize: '0.9rem' }}>
              <strong style={{ color: 'var(--text-color)' }}>인기도 점수:</strong> (조회수 × 0.1) + (좋아요 × 2.0) + (댓글 × 1.5)
            </div>
          </div>
        </div>
      </section>

      <section style={{ marginBottom: '3rem' }}>
        <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>성능 최적화</h2>
        
        <div style={{
          padding: '1.5rem',
          backgroundColor: 'var(--card-bg)',
          borderRadius: '8px',
          border: '1px solid var(--nav-border)',
          marginBottom: '1rem'
        }}>
          <h3 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>N+1 문제 해결</h3>
          <ul style={{ 
            listStyle: 'none', 
            padding: 0,
            color: 'var(--text-secondary)',
            lineHeight: '1.8'
          }}>
            <li>• <strong style={{ color: 'var(--text-color)' }}>배치 조회</strong>: 좋아요/싫어요 카운트를 IN 절로 한 번에 조회 (500개 단위)</li>
            <li>• <strong style={{ color: 'var(--text-color)' }}>효과</strong>: 1000개 게시글 조회 시 2001 쿼리 → 3 쿼리</li>
          </ul>
        </div>

        <div style={{
          padding: '1.5rem',
          backgroundColor: 'var(--card-bg)',
          borderRadius: '8px',
          border: '1px solid var(--nav-border)',
          marginBottom: '1rem'
        }}>
          <h3 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>캐싱 전략</h3>
          <ul style={{ 
            listStyle: 'none', 
            padding: 0,
            color: 'var(--text-secondary)',
            lineHeight: '1.8'
          }}>
            <li>• <strong style={{ color: 'var(--text-color)' }}>게시글 상세</strong>: @Cacheable로 조회 빈도 높은 게시글 캐싱</li>
            <li>• <strong style={{ color: 'var(--text-color)' }}>캐시 무효화</strong>: 게시글 수정/삭제 시 자동 무효화</li>
          </ul>
        </div>

        <div style={{
          padding: '1.5rem',
          backgroundColor: 'var(--card-bg)',
          borderRadius: '8px',
          border: '1px solid var(--nav-border)',
          marginBottom: '1rem'
        }}>
          <h3 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>인기글 스냅샷</h3>
          <ul style={{ 
            listStyle: 'none', 
            padding: 0,
            color: 'var(--text-secondary)',
            lineHeight: '1.8'
          }}>
            <li>• <strong style={{ color: 'var(--text-color)' }}>스케줄러</strong>: 매일 18:30 주간, 매주 월요일 18:30 월간 스냅샷 생성</li>
            <li>• <strong style={{ color: 'var(--text-color)' }}>효과</strong>: 복잡한 계산을 미리 수행하여 조회 성능 향상</li>
          </ul>
        </div>

        <div style={{
          padding: '1.5rem',
          backgroundColor: 'var(--card-bg)',
          borderRadius: '8px',
          border: '1px solid var(--nav-border)'
        }}>
          <h3 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>조회수 중복 방지</h3>
          <ul style={{ 
            listStyle: 'none', 
            padding: 0,
            color: 'var(--text-secondary)',
            lineHeight: '1.8'
          }}>
            <li>• <strong style={{ color: 'var(--text-color)' }}>BoardViewLog</strong>: 사용자당 1회만 조회수 증가</li>
            <li>• <strong style={{ color: 'var(--text-color)' }}>개선안</strong>: Redis Set으로 조회수 관리 (TTL 24시간)</li>
          </ul>
        </div>
      </section>

      <section style={{ marginBottom: '3rem' }}>
        <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>동시성 제어</h2>
        
        <div style={{
          padding: '1.5rem',
          backgroundColor: 'var(--card-bg)',
          borderRadius: '8px',
          border: '1px solid var(--nav-border)',
          marginBottom: '1rem'
        }}>
          <h3 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>좋아요/싫어요 동시 처리</h3>
          <ul style={{ 
            listStyle: 'none', 
            padding: 0,
            color: 'var(--text-secondary)',
            lineHeight: '1.8'
          }}>
            <li>• <strong style={{ color: 'var(--text-color)' }}>Unique 제약</strong>: (board_idx, user_idx)로 중복 방지</li>
            <li>• <strong style={{ color: 'var(--text-color)' }}>개선안</strong>: 낙관적 락 (@Version) 사용</li>
          </ul>
        </div>

        <div style={{
          padding: '1.5rem',
          backgroundColor: 'var(--card-bg)',
          borderRadius: '8px',
          border: '1px solid var(--nav-border)'
        }}>
          <h3 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>댓글 수 동기화</h3>
          <ul style={{ 
            listStyle: 'none', 
            padding: 0,
            color: 'var(--text-secondary)',
            lineHeight: '1.8'
          }}>
            <li>• <strong style={{ color: 'var(--text-color)' }}>문제</strong>: 동시 댓글 작성 시 카운트 누락 가능</li>
            <li>• <strong style={{ color: 'var(--text-color)' }}>해결</strong>: UPDATE 쿼리로 직접 증가 (원자적 연산)</li>
          </ul>
        </div>
      </section>

      <section style={{ marginBottom: '3rem' }}>
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
            <div>• 게시글/댓글 신고, 신고 처리 결과로 상태 변경 (HIDDEN, DELETED)</div>
            <div style={{ marginTop: '1rem', marginBottom: '0.5rem' }}><strong style={{ color: 'var(--text-color)' }}>Notification 도메인:</strong></div>
            <div>• 댓글 작성 시 게시글 작성자에게 알림, 반응 추가 시 알림</div>
          </div>
        </div>
      </section>

      <section style={{ marginBottom: '3rem' }}>
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
            <div>• GET /search - 게시글 검색</div>
            <div>• GET /me - 내 게시글</div>
            <div>• GET /popular - 인기글 (주간/월간)</div>
          </div>
        </div>

        <div style={{
          padding: '1.5rem',
          backgroundColor: 'var(--card-bg)',
          borderRadius: '8px',
          border: '1px solid var(--nav-border)',
          marginBottom: '1rem'
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

        <div style={{
          padding: '1.5rem',
          backgroundColor: 'var(--card-bg)',
          borderRadius: '8px',
          border: '1px solid var(--nav-border)'
        }}>
          <h3 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>반응 (/api/boards/{'{boardId}'}/reactions)</h3>
          <div style={{ 
            color: 'var(--text-secondary)',
            lineHeight: '1.8',
            fontFamily: 'monospace',
            fontSize: '0.9rem'
          }}>
            <div>• POST / - 반응 추가/변경/취소</div>
            <div>• GET /summary - 반응 요약</div>
            <div>• GET /me - 내 반응 조회</div>
          </div>
        </div>
      </section>

      <section>
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
              textDecoration: 'none'
            }}
          >
            → Board 도메인 상세 문서 보기
          </a>
        </div>
      </section>
    </div>
  );
}

export default BoardDomain;
