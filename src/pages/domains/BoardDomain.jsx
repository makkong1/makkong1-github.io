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
              <p style={{ lineHeight: '1.8', color: 'var(--text-secondary)' }}>
                <strong style={{ color: 'var(--text-color)' }}>실서비스 환경에서 가장 빈번하게 조회되는 도메인 중 하나</strong>입니다.
              </p>
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
              <p style={{ lineHeight: '1.8', color: 'var(--text-secondary)', fontStyle: 'italic' }}>
                아직 구체적인 성능 최적화 작업을 진행하지 않았습니다. 향후 작업 예정입니다.
              </p>
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
              <p style={{ lineHeight: '1.8', color: 'var(--text-secondary)', fontStyle: 'italic' }}>
                아직 구체적인 성능 최적화 작업을 진행하지 않았습니다. 향후 작업 예정입니다.
              </p>
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
              <p style={{ lineHeight: '1.8', color: 'var(--text-secondary)', fontStyle: 'italic' }}>
                아직 구체적인 성능 최적화 작업을 진행하지 않았습니다. 향후 작업 예정입니다.
              </p>
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
              <h3 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>현재 구현된 최적화</h3>
              <ul style={{
                listStyle: 'none',
                padding: 0,
                color: 'var(--text-secondary)',
                lineHeight: '1.8'
              }}>
                <li>• <strong style={{ color: 'var(--text-color)' }}>배치 조회</strong>: 게시글 ID 목록을 IN 절로 한 번에 조회</li>
                <li>• <strong style={{ color: 'var(--text-color)' }}>인기글 스냅샷</strong>: 주간/월간 인기글을 미리 계산하여 저장</li>
                <li>• <strong style={{ color: 'var(--text-color)' }}>조회수 중복 방지</strong>: BoardViewLog로 정확한 조회 수 추적</li>
              </ul>
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
              <p style={{ lineHeight: '1.8', color: 'var(--text-secondary)', fontStyle: 'italic' }}>
                아직 구체적인 성능 최적화 작업을 진행하지 않았습니다. 향후 작업 예정입니다.
              </p>
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
