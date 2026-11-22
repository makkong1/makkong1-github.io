import { Link } from 'react-router-dom';
import MermaidDiagram from '../../../components/Common/MermaidDiagram';
import TableOfContents from '../../../components/Common/TableOfContents';

function PetoryProjectPage() {
  const sections = [
    { id: 'hero', title: '프로젝트 소개' },
    { id: 'achievements', title: '핵심 성과' },
    { id: 'why', title: '왜 이걸 했는가' },
    { id: 'architecture', title: '아키텍처' },
    { id: 'sequence-flows', title: '데이터 흐름 시퀀스' },
    { id: 'features', title: '도메인 구성' },
    { id: 'tech-stack', title: '기술 스택' }
  ];

  // 세 다이어그램 모두 PDF 포트폴리오(docs/interview/이력서/범용/petory-PDF-본문-8p.md) 와 동일본.
  // style 지정 없음 — MermaidDiagram 이 data-theme 으로 dark/default 테마를 고른다.
  const architectureDiagram = `flowchart LR
    C["React 19<br/>(SPA)"]
    C -->|"REST · WS/STOMP · SSE"| CT["Controller"]
    CT --> SV["Service<br/>트랜잭션 경계<br/>비관적 락 · 이벤트 발행"]
    SV --> RP["Repository<br/>Spring Data JPA<br/>(QueryDSL은 관리자 회원조회 1곳)"]
    RP --> DB[("MySQL 8.4<br/>Flyway V1~V24<br/>공간·커버링 인덱스 · 트리거")]
    SV -.->|"@Cacheable + TTL"| RD[("Redis · 4곳")]
    SV -.->|"AFTER_COMMIT<br/>@Async petIntentExecutor"| NLP["FastAPI<br/>NLP 의도분석"]
    SV -.->|"AFTER_COMMIT + @Async<br/>채널별 예외 격리 · outbox 없음"| NT["Redis 캐시 / SSE / FCM<br/>커밋 후 3채널 팬아웃"]
    SCH["@Scheduled 배치 14개 (단일 스레드)<br/>통계 · 인기글 랭킹 · 공공데이터 동기화<br/>케어 만료 · 휴면 전환 · 제재 해제 · 모임 · 채팅방 복구<br/>실행 슬롯을 시간대로 분산"] --> SV`;

  const domainDependencyDiagram = `flowchart LR
    T1["표현 · 집계 계층<br/>statistics (읽기 전용 집계)<br/>admin · activity · profile (쓰기 포함)"]
    T2["업무 도메인 10 · 4-레이어(C→S→R→E)<br/>board · care · chat · meetup · location<br/>notification · payment · report · file · petRecommendation<br/>순환 2곳: care ↔ payment, chat ↔ meetup"]
    T3["user — 사실상 말단<br/>대부분의 업무 도메인이 참조<br/>자신은 file 하나만 참조"]
    T1 -->|"의존: 읽기"| T2
    T2 -->|"의존: 참조(FK 등)"| T3`;

  const transactionBoundaryDiagram = `flowchart LR
    TX["Service 트랜잭션 경계<br/>(쓰기 메서드)"]
    TX -->|"현재 값 읽어 분기 필요"| L1["비관적 락<br/>잔액 부족 · 에스크로 상태<br/>findByIdForUpdate"]
    TX -->|"값 증가만 · 분기 없음"| L2["원자적 UPDATE + 락 순서 교정<br/>경고 횟수 · 모임 정원"]
    TX -->|"이 조합은 한 번만"| L3["DB UNIQUE 제약<br/>닉네임 · 소셜계정 · 신고"]
    TX -->|"상태 전이 규칙 고정"| L4["엔티티 상태 가드 + 트리거<br/>HOLD→RELEASED/REFUNDED<br/>users AFTER UPDATE → author_visible"]
    L1 --> CM["commit"]
    L2 --> CM
    L3 --> CM
    L4 --> CM
    CM -.->|"AFTER_COMMIT<br/>실패해도 원 트랜잭션 롤백 안 됨"| E1["결제 완료 → 매출 집계"]
    CM -.-> E2["사용자 활동 → NLP 의도분석<br/>(전용 스레드풀)"]
    CM -.-> E3["알림성 이벤트 → 3채널 팬아웃<br/>Redis 캐시 · SSE · FCM (채널별 격리)"]
    CM -.-> E4["사용자 제재 → care · meetup 정리<br/>도메인 직접 참조 대신 이벤트로 파급"]`;

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
              <Link to="/domains/cases?case=list-n-plus-one" className="stat-item" style={{ textDecoration: 'none', display: 'block' }}>
                <div className="stat-number">99%</div>
                <div className="stat-label">목록 N+1 쿼리 감소</div>
                <div className="stat-sub">Board · 303문 → 3문 · 561ms → 55ms (git worktree 로 수정 직전 커밋 재현)</div>
              </Link>
              <Link to="/domains/cases?case=spatial-search" className="stat-item" style={{ textDecoration: 'none', display: 'block' }}>
                <div className="stat-number">-99.6%</div>
                <div className="stat-label">공간검색 초기 응답 크기</div>
                <div className="stat-sub">Location · 반경 + 공간 인덱스 · 22.4MB → 100KB (531.8 → 50.9ms)</div>
              </Link>
              <Link to="/domains/cases?case=concurrency" className="stat-item" style={{ textDecoration: 'none', display: 'block' }}>
                <div className="stat-number">5/5</div>
                <div className="stat-label">경고 동시 5요청 성공 (수정 후)</div>
                <div className="stat-sub">수정 전 1/5 · 4건이 데드락으로 롤백 → 락 획득 순서 교정 (git worktree 로 수정 직전 커밋 재현)</div>
              </Link>
            </div>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', fontStyle: 'italic', marginTop: '1rem', marginBottom: '0.75rem' }}>
                📌 프로젝트 전체에서 추린 대표 성과입니다. 카드를 누르면 각 사례의 전/후 실측 근거로 이동합니다.
              </p>
              <Link to="/domains/cases" style={{ color: 'var(--link-color)', fontWeight: 600, textDecoration: 'none' }}>
                대표 사례 전체 보기 →
              </Link>
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
              <h3>요청 처리 흐름</h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: 0, lineHeight: 1.7 }}>
                실선은 동기 요청·저장(트랜잭션 경계 = Service), 점선은 비동기(캐시·이벤트·외부 연동)입니다.
                표준 4-레이어를 업무 도메인에서 같은 형태로 반복합니다.
              </p>
              <MermaidDiagram chart={architectureDiagram} flat />
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.75rem', marginBottom: 0, lineHeight: 1.65 }}>
                Redis: 알림 · NLP dedup · 이메일 인증 TTL (게시글 상세 캐시는 조회수 실시간 반영 때문에 현재 비활성).
                배치·도메인 간 연동은{' '}
                <Link to="/domains/flows" style={{ color: 'var(--link-color)', fontWeight: 600, textDecoration: 'none' }}>
                  통합 시퀀스
                </Link>
                와 아래 도메인 카드에서 확인.
              </p>
            </div>

            <div className="content-card">
              <h3>도메인 의존 계층</h3>
              <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', fontSize: '0.92rem', marginBottom: '0.5rem' }}>
                domain 패키지 16개의 import 를 계산한 결과입니다. 업무 도메인은 기반 도메인만 참조하고,
                statistics·admin 처럼 읽기만 하는 쪽은 들어오는 참조가 0입니다.
              </p>
              <MermaidDiagram chart={domainDependencyDiagram} flat />
              <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', fontSize: '0.92rem', marginTop: '0.5rem', marginBottom: 0 }}>
                <strong style={{ color: 'var(--text-color)' }}>순환은 두 곳 남아 있습니다</strong> —{' '}
                <code>care ↔ payment</code>(에스크로 엔티티가 케어 요청을 참조),{' '}
                <code>chat ↔ meetup</code>(모임 생성이 그룹 채팅방을 만듦). 둘 다 도메인 요구에서 나온 양방향이라
                억지로 끊지 않았습니다. 대신 그 경계의 락 획득 순서가 실제로 순환 대기를 만드는지는 따로 확인했습니다.
              </p>
            </div>

            <div className="content-card">
              <h3>쓰기 정합성</h3>
              <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', fontSize: '0.92rem', marginBottom: '0.5rem' }}>
                트랜잭션 경계는 Service 이고, 조회 위주 서비스는 클래스 레벨 <code>readOnly=true</code> 위에서 쓰기 메서드만
                재정의합니다. 되돌릴 수 있어야 하는 것만 안에 두고, 나머지는 밖으로 뺐습니다.
              </p>
              <MermaidDiagram chart={transactionBoundaryDiagram} flat />
              <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', fontSize: '0.92rem', marginTop: '0.5rem', marginBottom: 0 }}>
                <code>REQUIRES_NEW</code> 는 <strong style={{ color: 'var(--text-color)' }}>별도 빈</strong>으로 뺐습니다
                (<code>ConversationCreatorService</code>, <code>LocationServiceBatchWriter</code>). 같은 클래스 안에서
                메서드끼리 호출하면 AOP 프록시를 타지 않아 전파 설정이 조용히 무시됩니다.
                <br />
                단일 인스턴스를 전제로 합니다. 인스턴스를 늘리면 SSE 연결 라우팅이 먼저 깨지고,
                스케줄러도 중복 실행됩니다.
              </p>
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

          <section id="features" style={{ marginBottom: '3rem', scrollMarginTop: '2rem' }}>
            <span className="eyebrow">Features</span>
            <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>도메인 구성</h2>
            <div className="section-card">
              <div className="domain-link-grid">
              {domains.map((domain) => (
                <div key={domain.name} className="project-card">
                  <h3>{domain.name}</h3>
                  <p className="project-description">{domain.description}</p>
                  <div className="tech-stack-wrapper">
                    {domain.features.map((feature, idx) => (
                      <span key={idx} className="tech-badge">{feature}</span>
                    ))}
                  </div>
                </div>
              ))}
              </div>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', marginTop: '1rem', marginBottom: 0, lineHeight: 1.7 }}>
                공통: Payment(펫코인 에스크로) · Notification(SSE·FCM) · Report(신고·제재) · Statistics·Admin(Daily Summary)
              </p>
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

        </div>
        <TableOfContents sections={sections} />
      </div>
    </div>
  );
}

export default PetoryProjectPage;
