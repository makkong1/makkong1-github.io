import { Link } from 'react-router-dom';
import MermaidDiagram from '../../components/Common/MermaidDiagram';
import TableOfContents from '../../components/Common/TableOfContents';

function LinkupProjectPage() {
  const sections = [
    { id: 'hero', title: '프로젝트 소개' },
    { id: 'achievements', title: '핵심 성과' },
    { id: 'purpose', title: '프로젝트 목적 및 배경' },
    { id: 'features', title: '주요 기능' },
    { id: 'tech-stack', title: '기술 스택' },
    { id: 'architecture', title: '아키텍처' },
    { id: 'performance', title: '성능 최적화' },
    { id: 'security', title: '보안 구현' },
    { id: 'links', title: '관련 링크' }
  ];

  const architectureDiagram = `graph TB
    subgraph "Frontend Layer"
        THYMELEAF[Thymeleaf<br/>서버 사이드 렌더링]
        CSS[CSS<br/>스타일링]
        AJAX[AJAX<br/>비동기 통신]
    end
    
    subgraph "Controller Layer"
        BOARD_CTRL[BoardController<br/>게시판 관리]
        COMMENT_CTRL[CommentController<br/>댓글 관리]
        NOTION_CTRL[NotionController<br/>노션 콘텐츠]
        USER_CTRL[UsersController<br/>사용자 관리]
        ADMIN_CTRL[AdminController<br/>관리자 기능]
    end
    
    subgraph "Service Layer"
        BOARD_SVC[BoardService<br/>게시판 비즈니스 로직]
        COMMENT_SVC[CommentService<br/>댓글 비즈니스 로직]
        NOTION_SVC[NotionService<br/>노션 비즈니스 로직]
        CACHE_SVC[BoardCacheService<br/>캐시 관리]
        LIKE_SVC[LikeDislikeCacheService<br/>좋아요/싫어요 캐시]
        SYNC_SVC[LikeDislikeSyncService<br/>동기화 서비스]
    end
    
    subgraph "Repository Layer"
        BOARD_REPO[BoardRepository<br/>JPA]
        COMMENT_REPO[CommentRepository<br/>JPA]
        NOTION_REPO[NotionRepository<br/>JPA]
        USER_REPO[UsersRepository<br/>JPA]
        MYBATIS[MyBatis<br/>복잡한 쿼리]
    end
    
    subgraph "Data Layer"
        MYSQL[(MySQL 8.0<br/>관계형 데이터베이스)]
        REDIS[(Redis 7.0<br/>캐시 및 Pub/Sub)]
    end
    
    subgraph "Security Layer"
        SECURITY[Spring Security<br/>인증/인가]
        OAUTH2[OAuth2 Client<br/>Google, Naver]
        SESSION[HttpSession<br/>세션 관리]
    end
    
    subgraph "Async Layer"
        ASYNC[@Async<br/>비동기 처리]
        SCHEDULER[@Scheduled<br/>스케줄러]
        SSE[SSE Emitter<br/>실시간 알림]
    end
    
    subgraph "External Services"
        GOOGLE[Google OAuth2]
        NAVER[Naver OAuth2]
    end
    
    THYMELEAF --> BOARD_CTRL
    THYMELEAF --> COMMENT_CTRL
    THYMELEAF --> NOTION_CTRL
    AJAX --> SSE
    
    BOARD_CTRL --> SECURITY
    COMMENT_CTRL --> SECURITY
    NOTION_CTRL --> SECURITY
    USER_CTRL --> SECURITY
    ADMIN_CTRL --> SECURITY
    
    SECURITY --> OAUTH2
    OAUTH2 --> GOOGLE
    OAUTH2 --> NAVER
    SECURITY --> SESSION
    
    BOARD_CTRL --> BOARD_SVC
    COMMENT_CTRL --> COMMENT_SVC
    NOTION_CTRL --> NOTION_SVC
    USER_CTRL --> BOARD_SVC
    
    BOARD_SVC --> CACHE_SVC
    BOARD_SVC --> ASYNC
    COMMENT_SVC --> SSE
    COMMENT_SVC --> REDIS
    BOARD_SVC --> LIKE_SVC
    LIKE_SVC --> REDIS
    SYNC_SVC --> SCHEDULER
    SYNC_SVC --> REDIS
    
    BOARD_SVC --> BOARD_REPO
    COMMENT_SVC --> COMMENT_REPO
    NOTION_SVC --> NOTION_REPO
    BOARD_SVC --> MYBATIS
    
    BOARD_REPO --> MYSQL
    COMMENT_REPO --> MYSQL
    NOTION_REPO --> MYSQL
    USER_REPO --> MYSQL
    MYBATIS --> MYSQL
    
    CACHE_SVC --> REDIS
    LIKE_SVC --> REDIS
    
    style THYMELEAF fill:#e1f5ff
    style SECURITY fill:#fff4e1
    style REDIS fill:#ffe1f5
    style MYSQL fill:#ffe1f5
    style SSE fill:#e1f5ff`;

  return (
    <div style={{ padding: '2rem 0' }}>
      <div style={{ display: 'flex', gap: '2rem', alignItems: 'flex-start', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ flex: 1 }}>
          {/* Hero Section */}
          <section id="hero" style={{ marginBottom: '4rem', scrollMarginTop: '2rem' }}>
            <div className="project-hero">
              <h1>LinkUp</h1>
              <p className="subtitle">게시판 + 노션 스타일 콘텐츠 + 실시간 알림 + 소셜 로그인을 지원하는 커뮤니티 플랫폼</p>
              <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '0.5rem',
                justifyContent: 'center',
                marginBottom: '2rem'
              }}>
                <span className="tech-badge">Spring Boot 3.3.4</span>
                <span className="tech-badge">Java 17</span>
                <span className="tech-badge">MySQL 8.0</span>
                <span className="tech-badge">Redis 7.0</span>
              </div>
              <a
                href="https://github.com/makkong1/LinkUpProject"
                target="_blank"
                rel="noopener noreferrer"
                className="github-link"
              >
                GitHub 저장소 →
              </a>
            </div>
          </section>

          {/* 핵심 성과 */}
          <section id="achievements" style={{ marginBottom: '4rem', scrollMarginTop: '2rem' }}>
            <div style={{
              padding: '3rem 2rem',
              backgroundColor: 'var(--card-bg)',
              borderRadius: '12px',
              border: '2px solid var(--link-color)',
              marginBottom: '4rem',
              textAlign: 'center'
            }}>
              <h2 style={{
                marginBottom: '2rem',
                color: 'var(--text-color)',
                fontSize: '1.8rem'
              }}>
                핵심 성과
              </h2>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '2rem',
                marginBottom: '1.5rem'
              }}>
                <div>
                  <div style={{
                    fontSize: '3rem',
                    fontWeight: 'bold',
                    color: 'var(--link-color)',
                    marginBottom: '0.5rem'
                  }}>
                    77%
                  </div>
                  <div style={{
                    fontSize: '1rem',
                    color: 'var(--text-secondary)',
                    marginBottom: '0.25rem'
                  }}>
                    응답 시간 감소
                  </div>
                  <div style={{
                    fontSize: '0.85rem',
                    color: 'var(--text-muted)'
                  }}>
                    608ms → 137ms
                  </div>
                </div>
                <div>
                  <div style={{
                    fontSize: '3rem',
                    fontWeight: 'bold',
                    color: 'var(--link-color)',
                    marginBottom: '0.5rem'
                  }}>
                    3배
                  </div>
                  <div style={{
                    fontSize: '1rem',
                    color: 'var(--text-secondary)',
                    marginBottom: '0.25rem'
                  }}>
                    처리량 증가
                  </div>
                  <div style={{
                    fontSize: '0.85rem',
                    color: 'var(--text-muted)'
                  }}>
                    144.8/sec → 457.7/sec
                  </div>
                </div>
                <div>
                  <div style={{
                    fontSize: '3rem',
                    fontWeight: 'bold',
                    color: 'var(--link-color)',
                    marginBottom: '0.5rem'
                  }}>
                    80%
                  </div>
                  <div style={{
                    fontSize: '1rem',
                    color: 'var(--text-secondary)',
                    marginBottom: '0.25rem'
                  }}>
                    DB 부하 감소
                  </div>
                  <div style={{
                    fontSize: '0.85rem',
                    color: 'var(--text-muted)'
                  }}>
                    좋아요/싫어요 캐싱
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 프로젝트 목적 및 배경 */}
          <section id="purpose" style={{ marginBottom: '4rem', scrollMarginTop: '2rem' }}>
            <div style={{
              padding: '2rem',
              backgroundColor: 'var(--card-bg)',
              borderRadius: '8px',
              border: '1px solid var(--nav-border)',
              marginBottom: '2rem'
            }}>
              <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>프로젝트 목적</h2>
              <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', marginBottom: '1rem' }}>
                노션 스타일 콘텐츠 작성과 사용자 간 의견 교환을 더 편하게 구현하고자 개발한 커뮤니티 플랫폼입니다. 
                게시판 기능, 노션 스타일 에디터, 실시간 알림, 소셜 로그인 등 현대적인 웹 서비스의 핵심 기능을 통합 구현했습니다.
              </p>
            </div>

            <div style={{
              padding: '2rem',
              backgroundColor: 'var(--card-bg)',
              borderRadius: '8px',
              border: '1px solid var(--nav-border)',
              marginBottom: '2rem'
            }}>
              <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>개발 배경</h2>
              <ul style={{ color: 'var(--text-secondary)', lineHeight: '1.8', paddingLeft: '1.5rem' }}>
                <li><strong style={{ color: 'var(--text-color)' }}>노션 스타일 콘텐츠 작성</strong>: 직관적이고 자유로운 콘텐츠 작성 환경 제공</li>
                <li><strong style={{ color: 'var(--text-color)' }}>사용자 간 의견 교환</strong>: 실시간 알림을 통한 활발한 커뮤니케이션 지원</li>
                <li><strong style={{ color: 'var(--text-color)' }}>성능 최적화</strong>: Redis 캐싱과 비동기 처리를 통한 고성능 서비스 구현</li>
                <li><strong style={{ color: 'var(--text-color)' }}>사용자 편의성</strong>: Google, Naver 소셜 로그인으로 간편한 인증 제공</li>
              </ul>
            </div>

            <div style={{
              padding: '2rem',
              backgroundColor: 'var(--card-bg)',
              borderRadius: '8px',
              border: '1px solid var(--nav-border)'
            }}>
              <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>해결하려는 문제</h2>
              <ul style={{ color: 'var(--text-secondary)', lineHeight: '1.8', paddingLeft: '1.5rem' }}>
                <li><strong style={{ color: 'var(--text-color)' }}>기존 게시판의 한계</strong>: 단순한 CRUD 기능만 제공하는 정적인 게시판</li>
                <li><strong style={{ color: 'var(--text-color)' }}>콘텐츠 작성의 제약</strong>: 텍스트 위주의 제한적인 에디터 환경</li>
                <li><strong style={{ color: 'var(--text-color)' }}>실시간 상호작용 부족</strong>: 댓글 작성 시 실시간 알림 미지원</li>
                <li><strong style={{ color: 'var(--text-color)' }}>성능 이슈</strong>: 조회수, 좋아요/싫어요 등 빈번한 업데이트로 인한 DB 부하</li>
              </ul>
            </div>
          </section>

          {/* 주요 기능 */}
          <section id="features" style={{ marginBottom: '4rem', scrollMarginTop: '2rem' }}>
            <h2 style={{ marginBottom: '2rem', color: 'var(--text-color)' }}>주요 기능</h2>

            {/* 1. 일반/소셜 로그인 */}
            <div style={{
              padding: '2rem',
              backgroundColor: 'var(--card-bg)',
              borderRadius: '8px',
              border: '1px solid var(--nav-border)',
              marginBottom: '2rem'
            }}>
              <h3 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>1️⃣ 일반/소셜 로그인 (Authentication)</h3>
              <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', marginBottom: '1rem' }}>
                Google, Naver 계정을 통한 소셜 로그인 지원. 일반 회원가입과 소셜 로그인 통합 관리. 세션 기반 인증 (동시 세션 1개 제한).
              </p>
              <div style={{
                padding: '1rem',
                backgroundColor: 'var(--bg-color)',
                borderRadius: '6px',
                marginTop: '1rem'
              }}>
                <strong style={{ color: 'var(--text-color)' }}>핵심 로직:</strong>
                <ul style={{ color: 'var(--text-secondary)', lineHeight: '1.8', paddingLeft: '1.5rem', marginTop: '0.5rem' }}>
                  <li>일반 로그인: Spring Security Form Login + BCrypt 암호화</li>
                  <li>소셜 로그인: OAuth2 Client (Google, Naver)</li>
                  <li>로그인 실패 횟수 제한 (5회 초과 시 계정 잠금)</li>
                  <li>세션 고정 공격 방어, CSRF 보호</li>
                </ul>
              </div>
            </div>

            {/* 2. 노션 스타일 에디터 */}
            <div style={{
              padding: '2rem',
              backgroundColor: 'var(--card-bg)',
              borderRadius: '8px',
              border: '1px solid var(--nav-border)',
              marginBottom: '2rem'
            }}>
              <h3 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>2️⃣ 노션 스타일 에디터 (Notion-style Editor)</h3>
              <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', marginBottom: '1rem' }}>
                직관적이고 자유로운 콘텐츠 작성 환경. 노션 스타일 콘텐츠 페이지 관리. 파일 업로드 지원.
              </p>
            </div>

            {/* 3. 게시판 CRUD */}
            <div style={{
              padding: '2rem',
              backgroundColor: 'var(--card-bg)',
              borderRadius: '8px',
              border: '1px solid var(--nav-border)',
              marginBottom: '2rem'
            }}>
              <h3 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>3️⃣ 게시판 CRUD (Board Management with Redis Caching)</h3>
              <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', marginBottom: '1rem' }}>
                게시글 CRUD, 카테고리별 분류, 검색 기능, 페이징 처리, 파일 업로드/다운로드, 게시글 신고 기능.
              </p>
              <div style={{
                padding: '1rem',
                backgroundColor: 'var(--bg-color)',
                borderRadius: '6px',
                marginTop: '1rem'
              }}>
                <strong style={{ color: 'var(--text-color)' }}>성능 개선 결과:</strong>
                <ul style={{ color: 'var(--text-secondary)', lineHeight: '1.8', paddingLeft: '1.5rem', marginTop: '0.5rem' }}>
                  <li>평균 응답 시간: 608ms → 137ms (77% 감소)</li>
                  <li>최대 응답 시간: 4083ms → 955ms</li>
                  <li>Throughput: 144.8/sec → 457.7/sec (3배 증가)</li>
                  <li>에러율: 0% 유지</li>
                </ul>
              </div>
            </div>

            {/* 4. 비동기 좋아요/싫어요 */}
            <div style={{
              padding: '2rem',
              backgroundColor: 'var(--card-bg)',
              borderRadius: '8px',
              border: '1px solid var(--nav-border)',
              marginBottom: '2rem'
            }}>
              <h3 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>4️⃣ 비동기 좋아요/싫어요 (Like/Dislike with Redis Caching)</h3>
              <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', marginBottom: '1rem' }}>
                게시글 및 댓글에 좋아요/싫어요 기능. Redis 캐싱으로 즉시 반영. 주기적 DB 동기화 (5분마다).
              </p>
              <div style={{
                padding: '1rem',
                backgroundColor: 'var(--bg-color)',
                borderRadius: '6px',
                marginTop: '1rem'
              }}>
                <strong style={{ color: 'var(--text-color)' }}>핵심 로직:</strong>
                <ul style={{ color: 'var(--text-secondary)', lineHeight: '1.8', paddingLeft: '1.5rem', marginTop: '0.5rem' }}>
                  <li>즉시 반영: Redis INCR로 원자적 증가</li>
                  <li>변경 추적: 변경된 ID는 Set에 저장</li>
                  <li>주기적 동기화: @Scheduled로 5분마다 Redis → DB 동기화</li>
                  <li>DB 부하 80% 감소</li>
                </ul>
              </div>
            </div>

            {/* 5. 실시간 알림 */}
            <div style={{
              padding: '2rem',
              backgroundColor: 'var(--card-bg)',
              borderRadius: '8px',
              border: '1px solid var(--nav-border)',
              marginBottom: '2rem'
            }}>
              <h3 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>5️⃣ 실시간 알림 기능 (Real-time Notification with Redis Pub/Sub)</h3>
              <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', marginBottom: '1rem' }}>
                댓글 작성 시 게시글 작성자에게 실시간 알림. SSE(Server-Sent Events)로 브라우저 푸시. Redis Pub/Sub으로 서버 간 메시지 전파.
              </p>
              <div style={{
                padding: '1rem',
                backgroundColor: 'var(--bg-color)',
                borderRadius: '6px',
                marginTop: '1rem'
              }}>
                <strong style={{ color: 'var(--text-color)' }}>비동기 구조:</strong>
                <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', marginTop: '0.5rem' }}>
                  댓글 작성 → Publisher → Redis Pub/Sub → Subscriber 수신 → SSE Emitter 전송 → 브라우저 알림 표시
                </p>
              </div>
            </div>

            {/* 6. 관리자 기능 */}
            <div style={{
              padding: '2rem',
              backgroundColor: 'var(--card-bg)',
              borderRadius: '8px',
              border: '1px solid var(--nav-border)'
            }}>
              <h3 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>6️⃣ 관리자 기능 (Admin Management)</h3>
              <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', marginBottom: '1rem' }}>
                게시글/댓글 신고 관리, 사용자 차단/해제, 전체 게시글 조회 및 관리, 모니터링 대시보드 (Spring Boot Admin).
              </p>
            </div>
          </section>

          {/* 기술 스택 */}
          <section id="tech-stack" style={{ marginBottom: '4rem', scrollMarginTop: '2rem' }}>
            <h2 style={{ marginBottom: '2rem', color: 'var(--text-color)' }}>기술 스택</h2>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '1.5rem',
              marginBottom: '2rem'
            }}>
              <div style={{
                padding: '1.5rem',
                backgroundColor: 'var(--card-bg)',
                borderRadius: '8px',
                border: '1px solid var(--nav-border)'
              }}>
                <h3 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>Backend</h3>
                <ul style={{
                  listStyle: 'none',
                  padding: 0,
                  color: 'var(--text-secondary)',
                  lineHeight: '2'
                }}>
                  <li>• Java 17</li>
                  <li>• Spring Boot 3.3.4</li>
                  <li>• Spring Data JPA</li>
                  <li>• MyBatis 3.5.16</li>
                  <li>• Spring Security 6</li>
                  <li>• OAuth2 Client</li>
                </ul>
              </div>
              <div style={{
                padding: '1.5rem',
                backgroundColor: 'var(--card-bg)',
                borderRadius: '8px',
                border: '1px solid var(--nav-border)'
              }}>
                <h3 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>Database & Cache</h3>
                <ul style={{
                  listStyle: 'none',
                  padding: 0,
                  color: 'var(--text-secondary)',
                  lineHeight: '2'
                }}>
                  <li>• MySQL 8.0</li>
                  <li>• Redis 7.0 (Lettuce)</li>
                </ul>
              </div>
              <div style={{
                padding: '1.5rem',
                backgroundColor: 'var(--card-bg)',
                borderRadius: '8px',
                border: '1px solid var(--nav-border)'
              }}>
                <h3 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>Frontend</h3>
                <ul style={{
                  listStyle: 'none',
                  padding: 0,
                  color: 'var(--text-secondary)',
                  lineHeight: '2'
                }}>
                  <li>• Thymeleaf</li>
                  <li>• CSS</li>
                  <li>• AJAX</li>
                </ul>
              </div>
              <div style={{
                padding: '1.5rem',
                backgroundColor: 'var(--card-bg)',
                borderRadius: '8px',
                border: '1px solid var(--nav-border)'
              }}>
                <h3 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>Async & Monitoring</h3>
                <ul style={{
                  listStyle: 'none',
                  padding: 0,
                  color: 'var(--text-secondary)',
                  lineHeight: '2'
                }}>
                  <li>• Spring @Async</li>
                  <li>• @Scheduled</li>
                  <li>• SSE (Server-Sent Events)</li>
                  <li>• Spring Boot Admin</li>
                  <li>• Actuator</li>
                  <li>• Prometheus</li>
                </ul>
              </div>
            </div>
          </section>

          {/* 아키텍처 */}
          <section id="architecture" style={{ marginBottom: '4rem', scrollMarginTop: '2rem' }}>
            <h2 style={{ marginBottom: '2rem', color: 'var(--text-color)' }}>시스템 아키텍처</h2>
            
            <div style={{
              padding: '1.5rem',
              backgroundColor: 'var(--card-bg)',
              borderRadius: '8px',
              border: '1px solid var(--nav-border)',
              marginBottom: '2rem'
            }}>
              <h3 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>전체 시스템 아키텍처</h3>
              <MermaidDiagram chart={architectureDiagram} />
            </div>

            <div style={{
              padding: '2rem',
              backgroundColor: 'var(--card-bg)',
              borderRadius: '8px',
              border: '1px solid var(--nav-border)',
              marginBottom: '2rem'
            }}>
              <h3 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>서비스 구조</h3>
              <div style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}>
                <p style={{ marginBottom: '1rem' }}>
                  <strong style={{ color: 'var(--text-color)' }}>Controller Layer</strong>: HTTP 요청/응답 처리, 입력 검증, 권한 체크
                </p>
                <p style={{ marginBottom: '1rem' }}>
                  <strong style={{ color: 'var(--text-color)' }}>Service Layer</strong>: 비즈니스 로직, 트랜잭션 관리, 캐시 처리
                </p>
                <p style={{ marginBottom: '1rem' }}>
                  <strong style={{ color: 'var(--text-color)' }}>Repository Layer</strong>: 데이터 접근, 쿼리 실행 (JPA, MyBatis)
                </p>
                <p>
                  <strong style={{ color: 'var(--text-color)' }}>Data Layer</strong>: MySQL (관계형 데이터), Redis (캐시 및 Pub/Sub)
                </p>
              </div>
            </div>
          </section>

          {/* 성능 최적화 */}
          <section id="performance" style={{ marginBottom: '4rem', scrollMarginTop: '2rem' }}>
            <h2 style={{ marginBottom: '2rem', color: 'var(--text-color)' }}>성능 최적화</h2>

            <div style={{
              padding: '2rem',
              backgroundColor: 'var(--card-bg)',
              borderRadius: '8px',
              border: '1px solid var(--nav-border)',
              marginBottom: '2rem'
            }}>
              <h3 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>캐싱 전략</h3>
              <ul style={{ color: 'var(--text-secondary)', lineHeight: '1.8', paddingLeft: '1.5rem' }}>
                <li><strong style={{ color: 'var(--text-color)' }}>공지사항 캐싱</strong>: Redis 캐싱 (TTL: 10분), @Cacheable 적용</li>
                <li><strong style={{ color: 'var(--text-color)' }}>좋아요/싫어요</strong>: Write-Through Cache, 5분마다 DB 동기화</li>
                <li><strong style={{ color: 'var(--text-color)' }}>성능 개선</strong>: 평균 응답 시간 77% 감소, Throughput 3배 증가</li>
              </ul>
            </div>

            <div style={{
              padding: '2rem',
              backgroundColor: 'var(--card-bg)',
              borderRadius: '8px',
              border: '1px solid var(--nav-border)',
              marginBottom: '2rem'
            }}>
              <h3 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>비동기 처리</h3>
              <ul style={{ color: 'var(--text-secondary)', lineHeight: '1.8', paddingLeft: '1.5rem' }}>
                <li><strong style={{ color: 'var(--text-color)' }}>조회수 증가</strong>: @Async로 비동기 처리하여 응답 속도 향상</li>
                <li><strong style={{ color: 'var(--text-color)' }}>좋아요/싫어요 동기화</strong>: @Scheduled로 주기적 DB 동기화</li>
                <li><strong style={{ color: 'var(--text-color)' }}>실시간 알림</strong>: SSE + Redis Pub/Sub으로 경량 실시간 통신</li>
              </ul>
            </div>
          </section>

          {/* 보안 구현 */}
          <section id="security" style={{ marginBottom: '4rem', scrollMarginTop: '2rem' }}>
            <h2 style={{ marginBottom: '2rem', color: 'var(--text-color)' }}>보안 구현</h2>

            <div style={{
              padding: '2rem',
              backgroundColor: 'var(--card-bg)',
              borderRadius: '8px',
              border: '1px solid var(--nav-border)',
              marginBottom: '2rem'
            }}>
              <h3 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>인증</h3>
              <ul style={{ color: 'var(--text-secondary)', lineHeight: '1.8', paddingLeft: '1.5rem' }}>
                <li><strong style={{ color: 'var(--text-color)' }}>일반 로그인</strong>: Spring Security Form Login + BCrypt 암호화</li>
                <li><strong style={{ color: 'var(--text-color)' }}>소셜 로그인</strong>: OAuth2 Client (Google, Naver)</li>
                <li><strong style={{ color: 'var(--text-color)' }}>세션 관리</strong>: HttpSession 기반, 동시 세션 1개 제한</li>
                <li><strong style={{ color: 'var(--text-color)' }}>로그인 실패 제한</strong>: 5회 초과 시 계정 잠금</li>
              </ul>
            </div>

            <div style={{
              padding: '2rem',
              backgroundColor: 'var(--card-bg)',
              borderRadius: '8px',
              border: '1px solid var(--nav-border)'
            }}>
              <h3 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>권한 제어</h3>
              <ul style={{ color: 'var(--text-secondary)', lineHeight: '1.8', paddingLeft: '1.5rem' }}>
                <li><strong style={{ color: 'var(--text-color)' }}>Role 구조</strong>: ROLE_USER, ROLE_ADMIN, ROLE_SUB_ADMIN</li>
                <li><strong style={{ color: 'var(--text-color)' }}>접근 제어</strong>: @PreAuthorize로 세밀한 권한 관리</li>
                <li><strong style={{ color: 'var(--text-color)' }}>보안 고려사항</strong>: 세션 고정 공격 방어, CSRF 보호, SQL Injection 방지</li>
              </ul>
            </div>
          </section>

          {/* 관련 링크 */}
          <section id="links" style={{ marginBottom: '4rem', scrollMarginTop: '2rem' }}>
            <h2 style={{ marginBottom: '2rem', color: 'var(--text-color)' }}>관련 링크</h2>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '1.5rem'
            }}>
              <a
                href="https://github.com/makkong1/LinkUpProject"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'block',
                  padding: '1.5rem',
                  backgroundColor: 'var(--card-bg)',
                  borderRadius: '8px',
                  border: '1px solid var(--nav-border)',
                  textDecoration: 'none',
                  color: 'inherit',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'var(--link-color)';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'var(--nav-border)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <h3 style={{ marginBottom: '0.5rem', color: 'var(--text-color)' }}>GitHub 저장소</h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                  전체 소스 코드 및 문서
                </p>
              </a>
            </div>
          </section>
        </div>
        <TableOfContents sections={sections} />
      </div>
    </div>
  );
}

export default LinkupProjectPage;
