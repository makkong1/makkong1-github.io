import { Link } from 'react-router-dom';
import MermaidDiagram from '../../../components/Common/MermaidDiagram';
import TableOfContents from '../../../components/Common/TableOfContents';

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
        THYMELEAF["Thymeleaf<br/>서버 사이드 렌더링"]
        CSS["CSS<br/>스타일링"]
        AJAX["AJAX<br/>비동기 통신"]
    end
    
    subgraph "Controller Layer"
        BOARD_CTRL["BoardController<br/>게시판 관리"]
        COMMENT_CTRL["CommentController<br/>댓글 관리"]
        NOTION_CTRL["NotionController<br/>노션 콘텐츠"]
        USER_CTRL["UsersController<br/>사용자 관리"]
        ADMIN_CTRL["AdminController<br/>관리자 기능"]
    end
    
    subgraph "Service Layer"
        BOARD_SVC["BoardService<br/>게시판 비즈니스 로직"]
        COMMENT_SVC["CommentService<br/>댓글 비즈니스 로직"]
        NOTION_SVC["NotionService<br/>노션 비즈니스 로직"]
        CACHE_SVC["BoardCacheService<br/>캐시 관리"]
        LIKE_SVC["LikeDislikeCacheService<br/>좋아요/싫어요 캐시"]
        SYNC_SVC["LikeDislikeSyncService<br/>동기화 서비스"]
    end
    
    subgraph "Repository Layer"
        BOARD_REPO["BoardRepository<br/>JPA"]
        COMMENT_REPO["CommentRepository<br/>JPA"]
        NOTION_REPO["NotionRepository<br/>JPA"]
        USER_REPO["UsersRepository<br/>JPA"]
        MYBATIS["MyBatis<br/>복잡한 쿼리"]
    end
    
    subgraph "Data Layer"
        MYSQL[("MySQL 8.0<br/>관계형 데이터베이스")]
        REDIS[("Redis 7.0<br/>캐시 및 Pub/Sub")]
    end
    
    subgraph "Security Layer"
        SECURITY["Spring Security<br/>인증/인가"]
        OAUTH2["OAuth2 Client<br/>Google, Naver"]
        SESSION["HttpSession<br/>세션 관리"]
    end
    
    subgraph "Async Layer"
        ASYNC["@Async<br/>비동기 처리"]
        SCHEDULER["@Scheduled<br/>스케줄러"]
        SSE["SSE Emitter<br/>실시간 알림"]
    end
    
    subgraph "External Services"
        GOOGLE["Google OAuth2"]
        NAVER["Naver OAuth2"]
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
    <div className="layout-main">
      <div className="project-page-layout">
        <div className="project-main-content">
          {/* Hero Section */}
          <section id="hero" style={{ scrollMarginTop: '2rem' }}>
            <div className="project-hero">
              <h1>LinkUp</h1>
              <p className="subtitle">커뮤니티 협업 플랫폼</p>
              <p className="description">
                게시판 + 노션 스타일 콘텐츠 + 실시간 알림 + 소셜 로그인을 통합 구현한 플랫폼입니다.
                Redis 캐싱과 비동기 처리를 통해 대규모 트래픽 상황에서의 성능 최적화에 집중했습니다.
              </p>
              <div className="tech-stack-wrapper" style={{ justifyContent: 'center', marginBottom: '2rem' }}>
                <span className="tech-badge">Spring Boot 3.3.4</span>
                <span className="tech-badge">Java 17</span>
                <span className="tech-badge">MySQL 8.0</span>
                <span className="tech-badge">Redis 7.0</span>
              </div>
              <div className="buttons-wrapper">
                <Link to="/demo?project=linkup" className="demo-link">
                  🖼️ 스크린샷 갤러리
                </Link>
                <a href="https://github.com/makkong1/LinkUpProject" target="_blank" rel="noopener noreferrer" className="github-link">
                  GitHub 저장소 →
                </a>
              </div>
            </div>
          </section>

          {/* 핵심 성과 */}
          <section id="achievements" className="section-card" style={{ border: '2px solid var(--link-color)', textAlign: 'center' }}>
            <h2 style={{ marginBottom: '2rem' }}>핵심 성과</h2>
            <div className="stat-grid">
              <div className="stat-item">
                <div className="stat-number">77%</div>
                <div className="stat-label">응답 시간 감소</div>
                <div className="stat-sub">608ms → 137ms</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">3배</div>
                <div className="stat-label">처리량 증가</div>
                <div className="stat-sub">144.8/sec → 457.7/sec</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">80%</div>
                <div className="stat-label">DB 부하 감소</div>
                <div className="stat-sub">좋아요/싫어요 캐싱</div>
              </div>
            </div>
          </section>

          {/* 프로젝트 목적 및 배경 */}
          <section id="purpose" className="section-card">
            <h2>프로젝트 목적 및 배경</h2>
            <div className="content-card">
              <h3>프로젝트 목적</h3>
              <p style={{ fontSize: '1rem' }}>
                노션 스타일 콘텐츠 작성과 사용자 간 의견 교환을 더 편하게 구현하고자 개발한 커뮤니티 플랫폼입니다. 
                게시판 기능, 노션 스타일 에디터, 실시간 알림, 소셜 로그인 등 현대적인 웹 서비스의 핵심 기능을 통합 구현했습니다.
              </p>
            </div>

            <div className="content-card">
              <h3>개발 배경</h3>
              <div className="about-text-block">
                <p>• <strong>노션 스타일 콘텐츠 작성</strong>: 직관적이고 자유로운 콘텐츠 작성 환경 제공</p>
                <p>• <strong>사용자 간 상호작용</strong>: 실시간 알림을 통한 활발한 커뮤니케이션 지원</p>
                <p>• <strong>성능 최적화</strong>: Redis 캐싱과 비동기 처리를 통한 고성능 서비스 구현</p>
                <p>• <strong>사용자 편의성</strong>: Google, Naver 소셜 로그인으로 간편한 인증 제공</p>
              </div>
            </div>

            <div className="content-card" style={{ marginBottom: 0 }}>
              <h3>해결하고자 하는 문제</h3>
              <div className="about-text-block">
                <p>• <strong>기존 게시판의 한계</strong>: 단순 CRUD 기능만 제공하는 정적인 구조</p>
                <p>• <strong>콘텐츠 작성의 제약</strong>: 텍스트 위주의 제한적인 에디터 환경</p>
                <p>• <strong>실시간성 부족</strong>: 댓글/반응에 대한 즉각적인 피드백 부재</p>
                <p>• <strong>성능 병목</strong>: 빈번한 좋아요/조회수 업데이트로 인한 DB 부하</p>
              </div>
            </div>
          </section>

          <section id="features" className="section-card">
            <h2>주요 기능</h2>
            <div className="content-card">
              <h3>1️⃣ 일반/소셜 로그인</h3>
              <p style={{ fontSize: '1rem', marginBottom: '1rem' }}>
                Google, Naver 계정을 통한 소셜 로그인 지원. 일반 회원가입과 소셜 로그인 통합 관리.
              </p>
              <div className="about-text-block">
                <p>• <strong>인증 방식</strong>: Spring Security + OAuth2 Client (+ HttpSession)</p>
                <p>• <strong>보안 정책</strong>: 로그인 실패 횟수 제한, 세션 고정 방어, CSRF 보호</p>
              </div>
            </div>

            <div className="content-card">
              <h3>2️⃣ 노션 스타일 에디터</h3>
              <p style={{ fontSize: '1rem' }}>
                직관적이고 자유로운 콘텐츠 작성 환경 제공. 파일 업로드 및 커스텀 레이아웃 지원.
              </p>
            </div>

            <div className="content-card">
              <h3>3️⃣ 게시판 & Redis 캐싱</h3>
              <p style={{ fontSize: '1rem', marginBottom: '1rem' }}>
                카테고리 분류, 검색, 페이징 지원. Redis 캐싱을 통해 읽기 성능 극대화.
              </p>
              <div className="about-text-block">
                <p>• <strong>응답 속도</strong>: 608ms → 137ms (77% 감소)</p>
                <p>• <strong>처리량</strong>: 144.8/sec → 457.7/sec (3배 증가)</p>
              </div>
            </div>

            <div className="content-card">
              <h3>4️⃣ 비동기 좋아요/싫어요</h3>
              <p style={{ fontSize: '1rem', marginBottom: '1rem' }}>
                Redis INCR을 활용한 원자적 연산 처리 및 주기적 DB 동기화.
              </p>
              <div className="about-text-block">
                <p>• <strong>DB 동기화</strong>: @Scheduled를 활용한 5분 주기 배치 업데이트</p>
                <p>• <strong>부하 감소</strong>: 데이터베이스 쓰기 부하 약 80% 감소</p>
              </div>
            </div>

            <div className="content-card">
              <h3>5️⃣ 실시간 알림 (Pub/Sub)</h3>
              <p style={{ fontSize: '1rem', marginBottom: '1rem' }}>
                SSE(Server-Sent Events)와 Redis Pub/Sub을 조합한 확장 가능한 알림 구조.
              </p>
              <div className="about-text-block">
                <p>• <strong>메시지 전파</strong>: 분산 환경 대응을 위한 Redis Pub/Sub 활용</p>
              </div>
            </div>

            <div className="content-card" style={{ marginBottom: 0 }}>
              <h3>6️⃣ 관리자 모니터링</h3>
              <p style={{ fontSize: '1rem' }}>
                신고 관리 및 Spring Boot Admin/Actuator를 통한 시스템 실시간 모니터링.
              </p>
            </div>
          </section>

          <section id="tech-stack" className="section-card">
            <h2>기술 스택</h2>
            <div className="feature-points-grid">
              <div className="content-card" style={{ marginBottom: 0 }}>
                <h3>Backend</h3>
                <ul className="about-text-block" style={{ listStyle: 'none', padding: 0 }}>
                  <li>• Java 17 | Spring Boot 3.3.4</li>
                  <li>• Spring Data JPA | MyBatis</li>
                  <li>• Spring Security 6</li>
                </ul>
              </div>
              <div className="content-card" style={{ marginBottom: 0 }}>
                <h3>Cache & DB</h3>
                <ul className="about-text-block" style={{ listStyle: 'none', padding: 0 }}>
                  <li>• MySQL 8.0</li>
                  <li>• Redis 7.0 (Pub/Sub)</li>
                </ul>
              </div>
              <div className="content-card" style={{ marginBottom: 0 }}>
                <h3>Frontend</h3>
                <ul className="about-text-block" style={{ listStyle: 'none', padding: 0 }}>
                  <li>• Thymeleaf</li>
                  <li>• CSS | AJAX</li>
                </ul>
              </div>
              <div className="content-card" style={{ marginBottom: 0 }}>
                <h3>Async & Monitoring</h3>
                <ul className="about-text-block" style={{ listStyle: 'none', padding: 0 }}>
                  <li>• @Async / @Scheduled</li>
                  <li>• SSE (Server-Sent Events)</li>
                  <li>• Spring Boot Admin</li>
                </ul>
              </div>
            </div>
          </section>

          <section id="architecture" className="section-card">
            <h2>시스템 아키텍처</h2>
            <div className="content-card">
              <h3>전체 시스템 아키텍처</h3>
              <MermaidDiagram chart={architectureDiagram} />
            </div>
            <div className="content-card" style={{ marginBottom: 0 }}>
              <h3>서비스 계층 구조</h3>
              <div className="about-text-block">
                <p>• <strong>Controller</strong>: 요청 처리 및 권한 체크</p>
                <p>• <strong>Service</strong>: 비즈니스 로직 및 캐시 전략</p>
                <p>• <strong>Repository</strong>: JPA/MyBatis 기반 데이터 접근</p>
              </div>
            </div>
          </section>

          <section id="performance" className="section-card">
            <h2>성능 최적화</h2>
            <div className="feature-points-grid">
              <div className="content-card" style={{ marginBottom: 0 }}>
                <h3>캐싱 전략</h3>
                <p style={{ fontSize: '0.9rem' }}>게시글, 좋아요/싫어요 데이터에 Redis 캐싱 적용 (응답 시간 77% 감소)</p>
              </div>
              <div className="content-card" style={{ marginBottom: 0 }}>
                <h3>비동기 처리</h3>
                <p style={{ fontSize: '0.9rem' }}>조회수 증가 및 실시간 알림 시스템에 비동기 아키텍처 적용</p>
              </div>
            </div>
          </section>

          <section id="security" className="section-card">
            <h2>보안 구현</h2>
            <div className="feature-points-grid">
              <div className="content-card" style={{ marginBottom: 0 }}>
                <h3>인증 전략</h3>
                <p style={{ fontSize: '0.9rem' }}>OAuth2 소셜 로그인 통합 및 세션 기반 보안 강화 (BCrypt 활용)</p>
              </div>
              <div className="content-card" style={{ marginBottom: 0 }}>
                <h3>권한 제어</h3>
                <p style={{ fontSize: '0.9rem' }}>Spring Security Role 기반 세밀한 접근 제어 및 CSRF 방어</p>
              </div>
            </div>
          </section>

          <section id="links" className="section-card">
            <h2>관련 링크</h2>
            <div className="domain-link-grid">
              <a href="https://github.com/makkong1/LinkUpProject" target="_blank" rel="noopener noreferrer" className="project-card">
                <h3>GitHub 저장소</h3>
                <p style={{ fontSize: '0.9rem' }}>전체 소스 코드 및 문서</p>
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
