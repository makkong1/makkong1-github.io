import { Link } from 'react-router-dom';
import MermaidDiagram from '../../../components/Common/MermaidDiagram';
import TableOfContents from '../../../components/Common/TableOfContents';
import petoryErdImage from '../../../assets/petory-erd-0131.png';

function PetoryProjectPage() {
  const isDarkMode = true;

  const sections = [
    { id: 'hero', title: '프로젝트 소개' },
    { id: 'achievements', title: '핵심 성과' },
    { id: 'why', title: '왜 이걸 했는가' },
    { id: 'architecture', title: '아키텍처' },
    { id: 'sequence-flows', title: '데이터 흐름 시퀀스' },
    { id: 'problem-solving', title: '문제 해결 사례' },
    { id: 'features', title: '주요 기능' },
    { id: 'tech-stack', title: '기술 스택' },
    { id: 'links', title: '관련 링크' }
  ];

  const nodeStyles = isDarkMode
    ? `
    style FE fill:#1a3a4a,color:#cce8f4,stroke:#4a8fad
    style SEC fill:#3a3010,color:#f4e6b0,stroke:#a08030
    style CORE fill:#1a3a1a,color:#b0d4b0,stroke:#40804a
    style MYSQL fill:#3a1a3a,color:#e4b0e4,stroke:#904090
    style REDIS fill:#3a1a3a,color:#e4b0e4,stroke:#904090`
    : `
    style FE fill:#e1f5ff,stroke:#4a8fad
    style SEC fill:#fff4e1,stroke:#a08030
    style CORE fill:#e8f5e9,stroke:#40804a
    style MYSQL fill:#ffe1f5,stroke:#904090
    style REDIS fill:#ffe1f5,stroke:#904090`;

  const architectureDiagram = `flowchart TB
    subgraph CLIENT["클라이언트"]
        FE["React SPA · Capacitor"]
        RT["SSE · WebSocket/STOMP"]
    end

    subgraph BOOT["Spring Boot"]
        SEC["Security · JWT"]
        CORE["핵심 8 도메인\\nUser · Board · Care · Chat\\nLocation · petRecommendation · Meetup"]
        COMMON["공통\\nPayment · Notification · Report\\nStatistics · Admin · Activity · File"]
    end

    subgraph STORE["데이터"]
        MYSQL[("MySQL 8")]
        REDIS[("Redis")]
    end

    subgraph OUT["외부"]
        NLP["petory-nlp-server"]
        EXT["Naver Map · OAuth · FCM · SMTP"]
    end

    FE --> SEC
    RT --> SEC
    SEC --> CORE
    SEC --> COMMON
    CORE --> MYSQL
    COMMON --> MYSQL
    CORE --> REDIS
    COMMON --> REDIS
    CORE -.-> NLP
    CORE --> EXT
${nodeStyles}`;

  const notificationArchitectureDiagram = `flowchart LR
    DOMAIN["Board · Care · MissingPet\\nRecommendation"] --> NS["NotificationService"]
    NS --> DB[("MySQL\\nnotifications")]
    NS --> REDIS[("Redis\\nnotification:{userId}")]
    NS --> SSE["SSE\\nSseEmitter"]
    NS --> FCM["Firebase FCM"]

    CLIENT["React · Capacitor"] --> API["NotificationController"]
    API --> NS
    SSE --> CLIENT
    FCM --> CLIENT

    style DOMAIN fill:#1a3a1a,color:#b0d4b0,stroke:#40804a
    style NS fill:#1a3a4a,color:#cce8f4,stroke:#4a8fad
    style API fill:#1a3a4a,color:#cce8f4,stroke:#4a8fad
    style DB fill:#3a1a3a,color:#e4b0e4,stroke:#904090
    style REDIS fill:#3a1a3a,color:#e4b0e4,stroke:#904090
    style SSE fill:#3a3010,color:#f4e6b0,stroke:#a08030
    style FCM fill:#3a3010,color:#f4e6b0,stroke:#a08030
    style CLIENT fill:#2a2622,color:#d0d0d0,stroke:#6b7280`;

  const domains = [
    {
      name: 'User',
      description: '사용자 인증/인가, 프로필 관리, 반려동물 등록, 제재 시스템',
      link: '/domains/user',
      features: ['JWT 인증', '소셜 로그인 (OAuth2)', '이메일 인증', '반려동물 관리', '제재 시스템']
    },
    {
      name: 'Board',
      description: '커뮤니티 게시판, 댓글, 좋아요/싫어요, 인기글 스냅샷',
      link: '/domains/board',
      features: ['게시글 CRUD', '댓글 시스템', '조회수 관리', '인기글 스냅샷', 'N+1 최적화']
    },
    {
      name: 'Care',
      description: '펫케어 요청/지원, 채팅 기반 매칭, 거래 확정, 리뷰 시스템',
      link: '/domains/care',
      features: ['케어 요청', '지원 매칭', '거래 확정', '채팅 연동', '리뷰 시스템']
    },
    {
      name: 'Missing Pet',
      description: '실종 동물 신고 및 관리, 위치 기반 검색, 목격 정보 댓글',
      link: '/domains/missing-pet',
      features: ['실종 신고', '위치 기반 검색', '목격 정보 댓글', '상태 관리', '이미지 첨부']
    },
    {
      name: 'Location',
      description: '공공데이터 기반 위치 서비스, 통합 검색, 네이버맵·리뷰',
      link: '/domains/location',
      features: ['통합 검색 분기', '반경·지역·FULLTEXT', '이 지역 검색 UX', '네이버맵 API', '리뷰·CSV 적재']
    },
    {
      name: 'Recommendation',
      description: '커뮤니티·케어·검색어 intent 분석 후 주변서비스 탭 추천 카드 → Location 카테고리 검색',
      link: '/domains/recommendation',
      features: ['비동기 NLP', 'user_pet_intent_signal', '/pet-recommend/signals', 'petIntentExecutor', 'Location 연동']
    },
    {
      name: 'Meetup',
      description: '오프라인 모임 생성/참여, 위치 기반 검색, 상태 관리',
      link: '/domains/meetup',
      features: ['모임 생성', '최대 인원 제한', '위치 기반 검색', '상태 관리', '채팅 연동']
    },
    {
      name: 'Chat',
      description: '실시간 채팅 시스템, WebSocket 기반 통신, 펫케어 거래 확정',
      link: '/domains/chat',
      features: ['1:1 채팅', '그룹 채팅', '읽음 상태', '펫케어 거래 확정', 'STOMP 프로토콜']
    }
  ];
  return (
    <div className="layout-main">
      <div className="project-page-layout">
        <div className="project-main-content">
          {/* Hero Section */}
          <section id="hero" style={{ marginBottom: '4rem', scrollMarginTop: '2rem' }}>
            <div className="project-hero glow-bg">
              <span className="eyebrow">Backend Portfolio · 2025</span>
              <h1>Petory</h1>
              <p className="subtitle">반려동물 통합 플랫폼</p>
              <p className="description">
                반려동물 보호자를 위한 웹·모바일 통합 플랫폼. 8개 핵심 도메인과
                결제·알림·신고 공통 기능으로 구성했습니다. 기능을 만든 뒤엔 성능·동시성 병목을
                테스트로 재현하고 <strong>측정 → 개선 → 재검증</strong>을 반복했습니다.
              </p>
              <div className="buttons-wrapper">
                <Link
                  to="/demo?project=petory"
                  className="btn-primary"
                >
                  🎮 Live Demo
                </Link>
                <a
                  href="https://github.com/makkong1/Petory"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary"
                >
                  GitHub 저장소 →
                </a>
              </div>
            </div>
          </section>
          
          {/* 성과 숫자 카드 - 대표 지표 */}
          <section id="achievements" style={{ marginBottom: '3rem', scrollMarginTop: '2rem' }}>
            <span className="eyebrow">Achievements</span>
            <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>핵심 성과</h2>
            <div className="glass" style={{ padding: '2rem', textAlign: 'center' }}>
              <div className="stat-grid">
              <Link to="/domains/refactoring#n-plus-one" className="stat-item" style={{ textDecoration: 'none', display: 'block' }}>
                <div className="stat-number">99.8%</div>
                <div className="stat-label">쿼리 수 감소</div>
                <div className="stat-sub">Care · N+1 · 2,400 → 4~5개</div>
              </Link>
              <Link to="/domains/refactoring#spatial-index" className="stat-item" style={{ textDecoration: 'none', display: 'block' }}>
                <div className="stat-number">~30배</div>
                <div className="stat-label">p95 지연 단축</div>
                <div className="stat-sub">Meetup · 근처검색 5만건 · 1.75s → 57.5ms</div>
              </Link>
              <Link to="/domains/refactoring#notification-read" className="stat-item" style={{ textDecoration: 'none', display: 'block' }}>
                <div className="stat-number">100 → 1</div>
                <div className="stat-label">UPDATE 쿼리 수</div>
                <div className="stat-sub">Notification · 읽음 처리 · JPQL bulk UPDATE</div>
              </Link>
            </div>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', fontStyle: 'italic', marginTop: '1rem' }}>
                📌 서로 다른 세 가지 최적화 사례입니다. 카드를 누르면 전/후 실측 근거로 이동합니다.
              </p>
            </div>
          </section>

          {/* 왜 이걸 했는가 */}
          <section id="why" style={{ marginBottom: '3rem', scrollMarginTop: '2rem' }}>
            <span className="eyebrow">Why</span>
            <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>왜 이걸 했는가</h2>
            <div className="section-card">
              <div className="about-text-block">
                <p>
                  목록·상세 조회처럼 자주 밟는 흐름일수록, 연관 엔티티를 하나씩 불러오는
                  <strong> N+1과 불필요한 DB 접근</strong>이 쌓입니다.
                </p>
                <p>
                  이런 병목은 단위 테스트로는 안 보여서,
                  <strong> 실제 사용자 흐름을 재현하는 시나리오 테스트</strong>로 문제를 드러내고 개선했습니다.
                </p>
                <p>
                  포트폴리오 목적이라 실제 운영 배포는 범위 밖이지만,
                  <strong> 언제든 배포 가능한 구조</strong>를 기준으로 설계했습니다.
                </p>
              </div>
            </div>
          </section>

          {/* 아키텍처 섹션 */}
          <section id="architecture" style={{ marginBottom: '3rem', scrollMarginTop: '2rem' }}>
            <span className="eyebrow">Architecture</span>
            <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>아키텍처</h2>

            <div className="content-card">
              <h3>설계 근거</h3>
              <div className="feature-points-grid">
                <div>
                  <h4>레이어드 아키텍처</h4>
                  <p style={{ fontSize: '0.9rem' }}>
                    Controller → Service → Repository → Entity 구조로 명확한 책임 분리
                  </p>
                </div>
                <div>
                  <h4>도메인 주도 설계</h4>
                  <p style={{ fontSize: '0.9rem' }}>
                    DDD 원칙을 따른 도메인별 패키지 구조와 명확한 경계
                  </p>
                </div>
                <div>
                  <h4>성능 최적화</h4>
                  <p style={{ fontSize: '0.9rem' }}>
                    N+1 문제 해결, 캐싱 전략, 배치 쿼리로 성능 향상
                  </p>
                </div>
              </div>
            </div>

            <div className="content-card">
              <h3>전체 시스템 아키텍처</h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: 0, lineHeight: 1.7 }}>
                React·Capacitor → Spring Security → domain/ 패키지(핵심 8 + 공통) → MySQL·Redis.
                Missing Pet은 board 도메인, petRecommendation은 Board·Care·Location 이벤트 후 NLP 연동.
              </p>
              <MermaidDiagram chart={architectureDiagram} flat />
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.75rem', marginBottom: 0, lineHeight: 1.65 }}>
                Redis: 알림 · 게시글 캐시 · NLP dedup · 이메일 인증 TTL.
                배치·도메인 간 연동은{' '}
                <Link to="/domains/flows" style={{ color: 'var(--link-color)', fontWeight: 600, textDecoration: 'none' }}>
                  통합 시퀀스
                </Link>
                와 아래 도메인 카드에서 확인.
              </p>
            </div>

            <div className="content-card">
              <h3>레이어드 아키텍처</h3>
              <div className="about-text-block">
                <p>• <strong>Controller Layer</strong>: HTTP 요청/응답 처리, 요청 검증</p>
                <p>• <strong>Service Layer</strong>: 비즈니스 로직 구현, 트랜잭션 관리</p>
                <p>• <strong>Repository Layer</strong>: 데이터 액세스 추상화, JPA 쿼리</p>
                <p>• <strong>Entity Layer</strong>: 도메인 모델 정의, 연관관계 관리</p>
              </div>
            </div>

            <div className="content-card">
              <h3>알림 전달 아키텍처</h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: 0, lineHeight: 1.7 }}>
                Board·Care·Missing Pet·Recommendation에서 발생한 알림을 하나의 서비스가
                영구 저장, 최신 목록 캐시, 실시간 전송, 모바일 푸시로 분기합니다.
              </p>
              <MermaidDiagram chart={notificationArchitectureDiagram} flat />
              <div className="feature-points-grid">
                <div>
                  <h4>MySQL</h4>
                  <p style={{ fontSize: '0.9rem' }}>
                    전체 알림 이력과 읽음 상태를 관리하는 기준 저장소
                  </p>
                </div>
                <div>
                  <h4>Redis</h4>
                  <p style={{ fontSize: '0.9rem' }}>
                    사용자별 최신 50개 알림을 24시간 보관하고 DB 목록과 병합
                  </p>
                </div>
                <div>
                  <h4>SSE · FCM</h4>
                  <p style={{ fontSize: '0.9rem' }}>
                    앱 실행 중에는 SSE, 네이티브 백그라운드에서는 FCM으로 전달
                  </p>
                </div>
              </div>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.75rem', marginBottom: 0, lineHeight: 1.65 }}>
                MySQL 저장과 Redis·SSE·FCM 전달은 하나의 원자적 트랜잭션으로 묶이지 않습니다.
                현재 구조는 캐시 미스 시 DB를 기준으로 복구하며, 다중 서버 환경에서는
                SSE 연결 라우팅과 이벤트 전달 일관성 보완이 필요합니다.
              </p>
            </div>

            <div className="content-card">
              <h3>도메인 주도 설계 (DDD)</h3>
              <div className="about-text-block">
                <p>• <strong>도메인별 패키지 구조</strong>: 각 도메인은 독립적인 패키지로 구성</p>
                <p>• <strong>명확한 경계</strong>: 도메인 간 의존성 최소화</p>
                <p>• <strong>도메인 모델</strong>: 엔티티와 비즈니스 로직의 응집도 향상</p>
              </div>
            </div>

            <div className="content-card" style={{ marginBottom: 0 }}>
              <h3>도메인 간 연관관계</h3>
              <div style={{ width: '100%', overflowX: 'auto', marginTop: '1rem' }}>
                <img
                  src={petoryErdImage}
                  alt="Petory 데이터베이스 ERD"
                  style={{
                    width: '100%',
                    height: 'auto',
                    borderRadius: '8px',
                    border: '1px solid var(--border-color)',
                  }}
                />
              </div>
            </div>
          </section>

          <section
            id="sequence-flows"
            style={{ marginBottom: '3rem', scrollMarginTop: '2rem' }}
          >
            <span className="eyebrow">Data Flow</span>
            <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>
              데이터 흐름 시퀀스
            </h2>
            <div className="content-card">
              <p style={{ fontSize: '0.95rem', lineHeight: 1.75, color: 'var(--text-secondary)', marginBottom: '0.75rem' }}>
                도메인별 시퀀스 다이어그램을 한 페이지에 모았습니다. Care·Missing Pet·Meetup의
                Chat 연계 흐름을 나란히 비교할 수 있습니다.
              </p>
              <Link
                to="/domains/flows"
                style={{ color: 'var(--link-color)', fontWeight: 600, textDecoration: 'none' }}
              >
                통합 시퀀스 보기 →
              </Link>
            </div>
          </section>

          <section id="problem-solving" style={{ marginBottom: '3rem', scrollMarginTop: '2rem' }}>
            <span className="eyebrow">Problem Solving</span>
            <h2 style={{ marginBottom: '0.5rem', color: 'var(--text-color)' }}>성능 개선 & 리팩토링</h2>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '1rem', lineHeight: 1.65 }}>
              전체 7개 사례 중 면접에서 설명하기 좋은 대표 4개를 추렸습니다. 전체는 리팩토링 페이지에서 확인할 수 있습니다.
            </p>
            <div className="problem-summary-grid">
              <Link to="/domains/refactoring#n-plus-one" className="problem-summary-card">
                <span>01</span>
                <h3>JPA N+1 성능 개선</h3>
                <p>Board 301→3 · Care ~2,400→4~5 · Chat 21→4 · MissingPet 105→3</p>
                <strong>배치 조회 · Fetch Join · Map DTO 조립</strong>
              </Link>
              <Link to="/domains/refactoring#concurrency" className="problem-summary-card">
                <span>02</span>
                <h3>동시성 제어</h3>
                <p>Meetup 인원 초과와 PetCoin Lost Update 가능성을 테스트로 재현</p>
                <strong>조건부 UPDATE · SELECT FOR UPDATE</strong>
              </Link>
              <Link to="/domains/refactoring#location" className="problem-summary-card">
                <span>03</span>
                <h3>Location 검색 최적화</h3>
                <p>초기 로드 22,699개→1,026개, 지역명 검색 198~368ms→36~53ms</p>
                <strong>반경 조회 · 시군구 검색 우회</strong>
              </Link>
              <Link to="/domains/refactoring#spatial-index" className="problem-summary-card">
                <span>04</span>
                <h3>근처 검색 인덱스 튜닝</h3>
                <p>EXPLAIN으로 풀스캔 확인 → bounding box+인덱스로 스캔 96%↓ → 공간 인덱스로 재구현</p>
                <strong>EXPLAIN · B-tree bounding box · ST_Within 공간 인덱스</strong>
              </Link>
            </div>
          </section>

          <section id="features" style={{ marginBottom: '3rem', scrollMarginTop: '2rem' }}>
            <span className="eyebrow">Features</span>
            <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>핵심 기능</h2>
            <div className="section-card">
              <div className="domain-link-grid">
              {domains.map((domain) => (
                <Link key={domain.name} to={domain.link} className="project-card">
                  <h3>{domain.name}</h3>
                  <p className="project-description">{domain.description}</p>
                  <div className="tech-stack-wrapper">
                    {domain.features.map((feature, idx) => (
                      <span key={idx} className="tech-badge">{feature}</span>
                    ))}
                  </div>
                </Link>
              ))}
              </div>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', marginTop: '1rem', marginBottom: 0, lineHeight: 1.7 }}>
                공통: Payment(펫코인 에스크로) · Notification(SSE·FCM) · Report(신고·제재) · Statistics·Admin(Daily Summary)
              </p>
            </div>
          </section>

          <section style={{ marginBottom: '3rem', scrollMarginTop: '2rem' }}>
            <div className="section-card">
              <h2 style={{ textAlign: 'center' }}>주요 기능 요약</h2>
              <div className="icon-grid">
                <div className="icon-item">
                  <div className="icon-emoji">💬</div>
                  <strong>커뮤니티</strong>
                  <p className="stat-sub">게시판, 댓글, 인기글</p>
                </div>
                <div className="icon-item">
                  <div className="icon-emoji">🐾</div>
                  <strong>펫케어</strong>
                  <p className="stat-sub">요청/지원 매칭</p>
                </div>
                <div className="icon-item">
                  <div className="icon-emoji">🔍</div>
                  <strong>실종 찾기</strong>
                  <p className="stat-sub">실종 동물 신고</p>
                </div>
                <div className="icon-item">
                  <div className="icon-emoji">📍</div>
                  <strong>위치 서비스</strong>
                  <p className="stat-sub">통합 검색·리뷰</p>
                </div>
                <div className="icon-item">
                  <div className="icon-emoji">✨</div>
                  <strong>추천</strong>
                  <p className="stat-sub">NLP intent → 추천 카드</p>
                </div>
                <div className="icon-item">
                  <div className="icon-emoji">👥</div>
                  <strong>모임</strong>
                  <p className="stat-sub">산책 모임</p>
                </div>
                <div className="icon-item">
                  <div className="icon-emoji">💬</div>
                  <strong>채팅</strong>
                  <p className="stat-sub">WebSocket 기반</p>
                </div>
              </div>
            </div>
          </section>

          <section id="tech-stack" style={{ marginBottom: '3rem', scrollMarginTop: '2rem' }}>
            <span className="eyebrow">Tech Stack</span>
            <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>기술 스택</h2>
            <div className="section-card">
              <div className="feature-points-grid">
              <div className="content-card" style={{ marginBottom: 0 }}>
                <h3>Backend</h3>
                <ul className="about-text-block" style={{ listStyle: 'none', padding: 0 }}>
                  <li>• Spring Boot 3.5.7</li>
                  <li>• Java 17</li>
                  <li>• Spring Data JPA</li>
                  <li>• Spring Security</li>
                  <li>• Spring WebSocket (STOMP)</li>
                </ul>
              </div>
              <div className="content-card" style={{ marginBottom: 0 }}>
                <h3>Frontend · Mobile</h3>
                <ul className="about-text-block" style={{ listStyle: 'none', padding: 0 }}>
                  <li>• React 19</li>
                  <li>• Styled-components</li>
                  <li>• Recharts · Axios</li>
                  <li>• Capacitor 8 (Android / iOS)</li>
                </ul>
              </div>
              <div className="content-card" style={{ marginBottom: 0 }}>
                <h3>NLP</h3>
                <ul className="about-text-block" style={{ listStyle: 'none', padding: 0 }}>
                  <li>• Python · FastAPI</li>
                  <li>• petory-nlp-server</li>
                  <li>• rule + embedding intent 분류</li>
                </ul>
              </div>
              <div className="content-card" style={{ marginBottom: 0 }}>
                <h3>Database · Cache · Realtime</h3>
                <ul className="about-text-block" style={{ listStyle: 'none', padding: 0 }}>
                  <li>• MySQL 8.0</li>
                  <li>• Redis · Spring Cache</li>
                  <li>• SSE · Firebase FCM</li>
                </ul>
              </div>
              <div className="content-card" style={{ marginBottom: 0 }}>
                <h3>External Services</h3>
                <ul className="about-text-block" style={{ listStyle: 'none', padding: 0 }}>
                  <li>• Naver Map API</li>
                  <li>• OAuth2 (Google, Kakao, Naver)</li>
                  <li>• SMTP (Email)</li>
                </ul>
              </div>
            </div>
            </div>
          </section>

        <section id="links" style={{ marginBottom: '3rem', scrollMarginTop: '2rem' }}>
            <span className="eyebrow">Links</span>
            <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>관련 링크</h2>
            <div className="section-card">
              <div className="domain-link-grid">
              <a href="https://github.com/makkong1/makkong1-github.io" target="_blank" rel="noopener noreferrer" className="project-card">
                <h3>GitHub 저장소</h3>
                <p style={{ fontSize: '0.9rem' }}>전체 소스 코드 및 문서</p>
              </a>
              <Link to="/docs" className="project-card">
                <h3>문서 모음</h3>
                <p style={{ fontSize: '0.9rem' }}>아키텍처 및 도메인 문서</p>
              </Link>
              <Link
                to="/domains/recommendation"
                className="project-card"
              >
                <h3>Recommendation 도메인</h3>
                <p style={{ fontSize: '0.9rem' }}>
                  intent signal · NLP · 주변서비스 추천 카드
                </p>
              </Link>
              <Link to="/demo" className="project-card">
                <h3>라이브 데모</h3>
                <p style={{ fontSize: '0.9rem' }}>인터랙티브 데모 체험</p>
              </Link>
              </div>
            </div>
          </section>
        </div>
        <TableOfContents sections={sections} />
      </div>
    </div>
  );
}

export default PetoryProjectPage;
