import { Link } from 'react-router-dom';
import MermaidDiagram from '../components/Common/MermaidDiagram';
import TableOfContents from '../components/Common/TableOfContents';

function HomePage() {
  const sections = [
    { id: 'hero', title: '프로젝트 소개' },
    { id: 'achievements', title: '핵심 성과' },
    { id: 'why', title: '왜 이걸 했는가' },
    { id: 'architecture', title: '아키텍처' },
    { id: 'problem-solving', title: '문제 해결 사례' },
    { id: 'features', title: '주요 기능' },
    { id: 'tech-stack', title: '기술 스택' },
    { id: 'domains', title: '도메인별 상세' },
    { id: 'deployment', title: '배포 전략' },
    { id: 'links', title: '관련 링크' }
  ];

  const architectureDiagram = `graph TB
    subgraph "Frontend Layer"
        REACT[React SPA<br/>Styled-components<br/>Recharts]
        SSE_CLIENT[SSE Client<br/>EventSource]
        WEBSOCKET_CLIENT[WebSocket Client<br/>STOMP]
    end
    
    subgraph "API Gateway Layer"
        SECURITY[Spring Security<br/>JWT 인증/인가]
        CONTROLLERS[REST Controllers<br/>WebSocket Controllers<br/>SSE Endpoints]
    end
    
    subgraph "Service Layer"
        USER_SVC[User Service<br/>인증, 소셜 로그인]
        BOARD_SVC[Board Service<br/>커뮤니티, 인기글]
        CARE_SVC[Care Service<br/>케어 매칭, 리뷰]
        LOCATION_SVC[Location Service<br/>위치 서비스, 리뷰]
        MEETUP_SVC[Meetup Service<br/>오프라인 모임]
        MISSING_SVC[MissingPet Service<br/>실종 제보]
        CHAT_SVC[Chat Service<br/>실시간 채팅]
        NOTIF_SVC[Notification Service<br/>알림 시스템]
        REPORT_SVC[Report Service<br/>신고 및 제재]
        STATS_SVC[Statistics Service<br/>통계 집계]
        ACTIVITY_SVC[Activity Service<br/>활동 로그]
        FILE_SVC[File Service<br/>파일 관리]
    end
    
    subgraph "Data Layer"
        REPOS[JPA Repositories]
        MYSQL[(MySQL<br/>관계형 데이터베이스)]
        REDIS[(Redis<br/>캐시 및 알림)]
    end
    
    subgraph "External Services"
        NAVER_MAP[Naver Map API<br/>Geocoding, Directions]
        EMAIL[Email Service<br/>SMTP]
        OAUTH[OAuth2 Providers<br/>Google, Kakao, Naver]
    end
    
    subgraph "Scheduler Layer"
        STATS_SCHED[Statistics Scheduler<br/>일별 통계 집계]
        POPULAR_SCHED[Popularity Scheduler<br/>인기글 스냅샷]
        SANCTION_SCHED[Sanction Scheduler<br/>제재 자동 해제]
        CARE_SCHED[Care Scheduler<br/>케어 요청 만료 처리]
    end
    
    REACT --> SECURITY
    SSE_CLIENT --> SECURITY
    WEBSOCKET_CLIENT --> SECURITY
    
    SECURITY --> CONTROLLERS
    
    CONTROLLERS --> USER_SVC
    CONTROLLERS --> BOARD_SVC
    CONTROLLERS --> CARE_SVC
    CONTROLLERS --> LOCATION_SVC
    CONTROLLERS --> MEETUP_SVC
    CONTROLLERS --> MISSING_SVC
    CONTROLLERS --> CHAT_SVC
    CONTROLLERS --> NOTIF_SVC
    CONTROLLERS --> REPORT_SVC
    CONTROLLERS --> STATS_SVC
    CONTROLLERS --> ACTIVITY_SVC
    CONTROLLERS --> FILE_SVC
    
    USER_SVC --> REPOS
    BOARD_SVC --> REPOS
    CARE_SVC --> REPOS
    CARE_SVC --> CHAT_SVC
    LOCATION_SVC --> REPOS
    MEETUP_SVC --> REPOS
    MEETUP_SVC --> CHAT_SVC
    MISSING_SVC --> REPOS
    CHAT_SVC --> REPOS
    NOTIF_SVC --> REPOS
    NOTIF_SVC --> REDIS
    REPORT_SVC --> REPOS
    STATS_SVC --> REPOS
    ACTIVITY_SVC --> REPOS
    FILE_SVC --> REPOS
    
    REPOS --> MYSQL
    
    STATS_SCHED --> STATS_SVC
    POPULAR_SCHED --> BOARD_SVC
    SANCTION_SCHED --> REPORT_SVC
    CARE_SCHED --> CARE_SVC
    
    LOCATION_SVC --> NAVER_MAP
    USER_SVC --> EMAIL
    USER_SVC --> OAUTH
    
    style REACT fill:#e1f5ff
    style SECURITY fill:#fff4e1
    style CHAT_SVC fill:#e1f5ff
    style MYSQL fill:#ffe1f5
    style REDIS fill:#ffe1f5`;

  const domainRelationsDiagram = `graph TB
    Users[Users<br/>사용자]
    Pet[Pet<br/>반려동물]
    Board[Board<br/>게시판]
    Comment[Comment<br/>댓글]
    CareRequest[CareRequest<br/>펫케어요청]
    CareApplication[CareApplication<br/>펫케어지원]
    MissingPet[MissingPetBoard<br/>실종동물]
    Meetup[Meetup<br/>모임]
    LocationService[LocationService<br/>위치서비스]
    Report[Report<br/>신고]
    Notification[Notification<br/>알림]
    File[AttachmentFile<br/>파일]
    
    Users -->|소유| Pet
    Users -->|작성| Board
    Users -->|작성| Comment
    Users -->|요청| CareRequest
    Users -->|지원| CareApplication
    Users -->|신고| MissingPet
    Users -->|주최| Meetup
    Users -->|참여| Meetup
    Users -->|리뷰| LocationService
    Users -->|신고| Report
    Users -->|수신| Notification
    
    Board -->|댓글| Comment
    Board -->|첨부| File
    
    CareRequest -->|지원| CareApplication
    CareRequest -->|관련| Pet
    CareRequest -->|첨부| File
    
    MissingPet -->|첨부| File
    
    Report -.->|대상| Board
    Report -.->|대상| Comment
    Report -.->|대상| CareRequest
    Report -.->|대상| Users`;

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
      description: '공공데이터 기반 위치 서비스, 네이버맵 API 연동, 리뷰 시스템',
      link: '/domains/location',
      features: ['공공데이터 연동', '지역 계층 탐색', '네이버맵 API', '길찾기', '리뷰 시스템']
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
    <div style={{ padding: '2rem 0' }}>
      <div style={{ display: 'flex', gap: '2rem', alignItems: 'flex-start', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ flex: 1 }}>
          {/* Hero Section */}
          <section id="hero" style={{ marginBottom: '4rem', scrollMarginTop: '2rem' }}>
        <div style={{
          textAlign: 'center',
          padding: '3rem 2rem',
          backgroundColor: 'var(--card-bg)',
          borderRadius: '12px',
          border: '1px solid var(--nav-border)',
          marginBottom: '2rem'
        }}>
          <h1 style={{
            fontSize: '3.5rem',
            marginBottom: '1rem',
            color: 'var(--text-color)',
            fontWeight: 'bold'
          }}>
            Petory
          </h1>
          <p style={{
            fontSize: '1.5rem',
            color: 'var(--text-secondary)',
            marginBottom: '2rem'
          }}>
            반려동물 통합 플랫폼
          </p>
          <p style={{
            fontSize: '1.1rem',
            color: 'var(--text-secondary)',
            lineHeight: '1.8',
            maxWidth: '800px',
            margin: '0 auto'
          }}>
            본 프로젝트는 기능 구현 이후,
            도메인별로 발생 가능성이 높은 성능·동시성 문제를 가정하고
            테스트 코드 기반으로 이를 의도적으로 재현한 뒤
            측정 → 개선 → 재검증 과정을 반복하는 방식으로 진행되었습니다.
          </p>
        </div>
      </section>
          
          {/* 성과 숫자 카드 - 대표 지표 */}
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
              80.95%
            </div>
            <div style={{
              fontSize: '1rem',
              color: 'var(--text-secondary)',
              marginBottom: '0.25rem'
            }}>
              쿼리 수 감소
            </div>
            <div style={{
              fontSize: '0.85rem',
              color: 'var(--text-muted)'
            }}>
              21개 → 4개
            </div>
          </div>
          <div>
            <div style={{
              fontSize: '3rem',
              fontWeight: 'bold',
              color: 'var(--link-color)',
              marginBottom: '0.5rem'
            }}>
              81.97%
            </div>
            <div style={{
              fontSize: '1rem',
              color: 'var(--text-secondary)',
              marginBottom: '0.25rem'
            }}>
              실행 시간 개선
            </div>
            <div style={{
              fontSize: '0.85rem',
              color: 'var(--text-muted)'
            }}>
              305ms → 55ms
            </div>
          </div>
          <div>
            <div style={{
              fontSize: '3rem',
              fontWeight: 'bold',
              color: 'var(--link-color)',
              marginBottom: '0.5rem'
            }}>
              77.24%
            </div>
            <div style={{
              fontSize: '1rem',
              color: 'var(--text-secondary)',
              marginBottom: '0.25rem'
            }}>
              메모리 절감
            </div>
            <div style={{
              fontSize: '0.85rem',
              color: 'var(--text-muted)'
            }}>
              0.58MB → 0.13MB
            </div>
          </div>
        </div>
        <p style={{
          fontSize: '0.9rem',
          color: 'var(--text-muted)',
          fontStyle: 'italic',
          marginTop: '1rem'
        }}>
          📌 상세 근거는 아래 "문제 해결 사례" 섹션에서 확인 가능
        </p>
      </div>
      </section>

          {/* 왜 이걸 했는가 */}
          <section id="why" style={{ marginBottom: '4rem', scrollMarginTop: '2rem' }}>
            <div style={{
              padding: '2rem',
              backgroundColor: 'var(--card-bg)',
              borderRadius: '8px',
              border: '1px solid var(--nav-border)',
              marginBottom: '2rem'
            }}>
              <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>왜 이걸 했는가</h2>
              <div style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}>
                <p style={{ marginBottom: '1rem' }}>
                  실서비스 환경에서는 다수 사용자가 동시에 접근하는 상황에서, 인증 과정 중 연관 엔티티 조회로 인해 
                  <strong style={{ color: 'var(--text-color)' }}> N+1 문제와 불필요한 DB 접근이 발생할 수 있다고 가정</strong>했습니다.
                </p>
                <p style={{ marginBottom: '1rem' }}>
                  단일 기능 테스트만으로는 성능 병목을 발견하기 어렵기 때문에, 
                  <strong style={{ color: 'var(--text-color)' }}> 시나리오 기반 테스트</strong>를 통해 실제 문제를 재현하고 해결했습니다.
                </p>
                <p>
                  이 프로젝트는 <strong style={{ color: 'var(--text-color)' }}>포트폴리오 목적상 코드 품질과 아키텍처 설계에 집중</strong>했으며, 
                  실제 운영 배포는 프로젝트 범위를 벗어나지만, 필요 시 배포 가능한 구조로 설계되었습니다.
                </p>
              </div>
            </div>
          </section>

          {/* 아키텍처 섹션 */}
          <section id="architecture" style={{ marginBottom: '4rem', scrollMarginTop: '2rem' }}>
            <h2 style={{ marginBottom: '2rem', color: 'var(--text-color)' }}>아키텍처</h2>
            
            {/* 설계 근거 요약 */}
            <div style={{
              padding: '2rem',
              backgroundColor: 'var(--card-bg)',
              borderRadius: '8px',
              border: '1px solid var(--nav-border)',
              marginBottom: '2rem'
            }}>
          <h3 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>설계 근거</h3>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '1.5rem',
            marginBottom: '1.5rem'
          }}>
            <div>
              <h4 style={{ marginBottom: '0.5rem', color: 'var(--text-color)' }}>레이어드 아키텍처</h4>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                Controller → Service → Repository → Entity 구조로 명확한 책임 분리
              </p>
            </div>
            <div>
              <h4 style={{ marginBottom: '0.5rem', color: 'var(--text-color)' }}>도메인 주도 설계</h4>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                DDD 원칙을 따른 도메인별 패키지 구조와 명확한 경계
              </p>
            </div>
            <div>
              <h4 style={{ marginBottom: '0.5rem', color: 'var(--text-color)' }}>성능 최적화</h4>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                N+1 문제 해결, 캐싱 전략, 배치 쿼리로 성능 향상
              </p>
            </div>
          </div>
        </div>

        {/* 전체 시스템 아키텍처 다이어그램 */}
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

        {/* 레이어드 아키텍처 설명 */}
        <div style={{
          padding: '1.5rem',
          backgroundColor: 'var(--card-bg)',
          borderRadius: '8px',
          border: '1px solid var(--nav-border)',
          marginBottom: '2rem'
        }}>
          <h3 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>레이어드 아키텍처</h3>
          <div style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}>
            <p style={{ marginBottom: '1rem' }}>
              <strong style={{ color: 'var(--text-color)' }}>Controller Layer</strong>: HTTP 요청/응답 처리, 요청 검증
            </p>
            <p style={{ marginBottom: '1rem' }}>
              <strong style={{ color: 'var(--text-color)' }}>Service Layer</strong>: 비즈니스 로직 구현, 트랜잭션 관리
            </p>
            <p style={{ marginBottom: '1rem' }}>
              <strong style={{ color: 'var(--text-color)' }}>Repository Layer</strong>: 데이터 액세스 추상화, JPA 쿼리
            </p>
            <p>
              <strong style={{ color: 'var(--text-color)' }}>Entity Layer</strong>: 도메인 모델 정의, 연관관계 관리
            </p>
          </div>
        </div>

        {/* DDD 설명 */}
        <div style={{
          padding: '1.5rem',
          backgroundColor: 'var(--card-bg)',
          borderRadius: '8px',
          border: '1px solid var(--nav-border)',
          marginBottom: '2rem'
        }}>
          <h3 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>도메인 주도 설계 (DDD)</h3>
          <div style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}>
            <p style={{ marginBottom: '1rem' }}>
              • <strong style={{ color: 'var(--text-color)' }}>도메인별 패키지 구조</strong>: 각 도메인은 독립적인 패키지로 구성
            </p>
            <p style={{ marginBottom: '1rem' }}>
              • <strong style={{ color: 'var(--text-color)' }}>명확한 경계</strong>: 도메인 간 의존성 최소화
            </p>
            <p>
              • <strong style={{ color: 'var(--text-color)' }}>도메인 모델</strong>: 엔티티와 비즈니스 로직의 응집도 향상
            </p>
          </div>
        </div>

        {/* 도메인 간 연관관계 다이어그램 */}
        <div style={{
          padding: '1.5rem',
          backgroundColor: 'var(--card-bg)',
          borderRadius: '8px',
          border: '1px solid var(--nav-border)'
        }}>
          <h3 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>도메인 간 연관관계</h3>
          <MermaidDiagram chart={domainRelationsDiagram} />
        </div>
      </section>

      {/* 문제 해결 사례 - 케이스별 출처 명시 */}
      <section id="problem-solving" style={{ marginBottom: '4rem', scrollMarginTop: '2rem' }}>
        <h2 style={{ marginBottom: '1.5rem', color: 'var(--text-color)' }}>문제 해결 사례</h2>
        
        {/* 케이스 1: 로그인 쿼리 최적화 */}
        <div style={{
          padding: '1.5rem',
          backgroundColor: 'var(--bg-color)',
          borderRadius: '8px',
          border: '1px solid var(--nav-border)',
          marginBottom: '1.5rem'
        }}>
          <h3 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>
            케이스 1: 로그인 쿼리 최적화
          </h3>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
            gap: '1rem',
            marginBottom: '1rem'
          }}>
            <div>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.25rem' }}>쿼리 수</div>
              <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: 'var(--text-color)' }}>
                21개 → 4개
              </div>
              <div style={{ fontSize: '0.85rem', color: 'var(--link-color)' }}>80.95% 감소</div>
            </div>
            <div>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.25rem' }}>실행 시간</div>
              <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: 'var(--text-color)' }}>
                305ms → 55ms
              </div>
              <div style={{ fontSize: '0.85rem', color: 'var(--link-color)' }}>81.97% 개선</div>
            </div>
            <div>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.25rem' }}>메모리</div>
              <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: 'var(--text-color)' }}>
                0.58MB → 0.13MB
              </div>
              <div style={{ fontSize: '0.85rem', color: 'var(--link-color)' }}>77.24% 절감</div>
            </div>
          </div>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>
            로그인 시 채팅방 목록 조회 과정에서 발생한 N+1 문제를 배치 조회로 해결
          </p>
          <Link
            to="/domains/user"
            style={{
              color: 'var(--link-color)',
              textDecoration: 'none',
              fontSize: '0.9rem',
              fontWeight: '500'
            }}
          >
            → 상세 보기 (User 도메인)
          </Link>
        </div>

        {/* 케이스 2: 게시판 N+1 해결 */}
        <div style={{
          padding: '1.5rem',
          backgroundColor: 'var(--bg-color)',
          borderRadius: '8px',
          border: '1px solid var(--nav-border)',
          marginBottom: '1.5rem'
        }}>
          <h3 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>
            케이스 2: 게시판 N+1 문제 해결
          </h3>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
            gap: '1rem',
            marginBottom: '1rem'
          }}>
            <div>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.25rem' }}>쿼리 수</div>
              <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: 'var(--text-color)' }}>
                2001개 → 3개
              </div>
              <div style={{ fontSize: '0.85rem', color: 'var(--link-color)' }}>99.8% 감소</div>
            </div>
          </div>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>
            게시글 목록 조회 시 반응 수 조회에서 발생한 N+1 문제를 배치 조회로 해결
          </p>
          <Link
            to="/domains/board"
            style={{
              color: 'var(--link-color)',
              textDecoration: 'none',
              fontSize: '0.9rem',
              fontWeight: '500'
            }}
          >
            → 상세 보기 (Board 도메인)
          </Link>
        </div>

        {/* 케이스 3: 캐싱 전략 */}
        <div style={{
          padding: '1.5rem',
          backgroundColor: 'var(--bg-color)',
          borderRadius: '8px',
          border: '1px solid var(--nav-border)'
        }}>
          <h3 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>
            케이스 3: 캐싱 전략
          </h3>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>
            Redis 캐싱과 스냅샷 패턴을 활용하여 조회 성능 향상 및 실시간 집계 부하 감소
          </p>
          <Link
            to="/docs"
            style={{
              color: 'var(--link-color)',
              textDecoration: 'none',
              fontSize: '0.9rem',
              fontWeight: '500'
            }}
          >
            → 상세 보기 (문서)
          </Link>
        </div>
      </section>

      {/* 주요 기능 */}
      <section id="features" style={{ marginBottom: '4rem', scrollMarginTop: '2rem' }}>
        <h2 style={{ marginBottom: '2rem', color: 'var(--text-color)' }}>핵심 기능</h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '1.5rem',
          marginBottom: '2rem'
        }}>
          {domains.map((domain) => (
            <Link
              key={domain.name}
              to={domain.link}
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
                e.currentTarget.style.backgroundColor = 'var(--nav-bg)';
                e.currentTarget.style.borderColor = 'var(--link-color)';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--card-bg)';
                e.currentTarget.style.borderColor = 'var(--nav-border)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <h3 style={{
                marginBottom: '0.75rem',
                color: 'var(--text-color)',
                fontSize: '1.25rem'
              }}>
                {domain.name}
              </h3>
              <p style={{
                fontSize: '0.95rem',
                color: 'var(--text-secondary)',
                marginBottom: '1rem',
                lineHeight: '1.6'
              }}>
                {domain.description}
              </p>
              <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '0.5rem'
              }}>
                {domain.features.map((feature, idx) => (
                  <span
                    key={idx}
                    style={{
                      padding: '0.25rem 0.75rem',
                      backgroundColor: 'var(--bg-color)',
                      borderRadius: '12px',
                      fontSize: '0.85rem',
                      color: 'var(--text-secondary)'
                    }}
                  >
                    {feature}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 주요 기능 요약 */}
      <div style={{
        padding: '2rem',
        backgroundColor: 'var(--card-bg)',
        borderRadius: '8px',
        border: '1px solid var(--nav-border)',
        marginBottom: '2rem'
      }}>
        <h2 style={{ marginBottom: '1.5rem', color: 'var(--text-color)', textAlign: 'center' }}>주요 기능</h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1rem'
        }}>
          <div style={{ textAlign: 'center', padding: '1rem' }}>
            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>💬</div>
            <strong style={{ color: 'var(--text-color)' }}>커뮤니티</strong>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginTop: '0.5rem' }}>
              게시판, 댓글, 인기글
            </p>
          </div>
          <div style={{ textAlign: 'center', padding: '1rem' }}>
            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🐾</div>
            <strong style={{ color: 'var(--text-color)' }}>펫케어</strong>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginTop: '0.5rem' }}>
              요청/지원 매칭
            </p>
          </div>
          <div style={{ textAlign: 'center', padding: '1rem' }}>
            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🔍</div>
            <strong style={{ color: 'var(--text-color)' }}>실종 찾기</strong>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginTop: '0.5rem' }}>
              실종 동물 신고
            </p>
          </div>
          <div style={{ textAlign: 'center', padding: '1rem' }}>
            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>📍</div>
            <strong style={{ color: 'var(--text-color)' }}>위치 서비스</strong>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginTop: '0.5rem' }}>
              공공데이터 연동
            </p>
          </div>
          <div style={{ textAlign: 'center', padding: '1rem' }}>
            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>👥</div>
            <strong style={{ color: 'var(--text-color)' }}>오프라인 모임</strong>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginTop: '0.5rem' }}>
              산책 모임
            </p>
          </div>
          <div style={{ textAlign: 'center', padding: '1rem' }}>
            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>💬</div>
            <strong style={{ color: 'var(--text-color)' }}>실시간 채팅</strong>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginTop: '0.5rem' }}>
              WebSocket 기반
            </p>
          </div>
        </div>
      </div>

      {/* 기술 스택 섹션 */}
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
              <li>• Spring Boot 3.x</li>
              <li>• Java 17+</li>
              <li>• Spring Data JPA</li>
              <li>• Spring Security</li>
              <li>• Spring WebSocket</li>
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
              <li>• React</li>
              <li>• Styled-components</li>
              <li>• Recharts</li>
              <li>• React Router</li>
              <li>• Axios</li>
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
              <li>• Redis</li>
              <li>• Spring Cache</li>
            </ul>
          </div>
          <div style={{
            padding: '1.5rem',
            backgroundColor: 'var(--card-bg)',
            borderRadius: '8px',
            border: '1px solid var(--nav-border)'
          }}>
            <h3 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>External Services</h3>
            <ul style={{
              listStyle: 'none',
              padding: 0,
              color: 'var(--text-secondary)',
              lineHeight: '2'
            }}>
              <li>• Naver Map API</li>
              <li>• OAuth2 (Google, Kakao, Naver)</li>
              <li>• SMTP (이메일)</li>
            </ul>
          </div>
        </div>
      </section>

      {/* 기술 스택 요약 */}
      <div style={{
        padding: '2rem',
        backgroundColor: 'var(--card-bg)',
        borderRadius: '8px',
        border: '1px solid var(--nav-border)',
        marginBottom: '2rem',
        textAlign: 'center'
      }}>
        <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>기술 스택</h2>
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '0.75rem',
          justifyContent: 'center',
          marginBottom: '1.5rem'
        }}>
          <span style={{
            padding: '0.5rem 1rem',
            backgroundColor: 'var(--bg-color)',
            borderRadius: '20px',
            fontSize: '0.9rem',
            color: 'var(--text-secondary)'
          }}>Spring Boot</span>
          <span style={{
            padding: '0.5rem 1rem',
            backgroundColor: 'var(--bg-color)',
            borderRadius: '20px',
            fontSize: '0.9rem',
            color: 'var(--text-secondary)'
          }}>Java 17</span>
          <span style={{
            padding: '0.5rem 1rem',
            backgroundColor: 'var(--bg-color)',
            borderRadius: '20px',
            fontSize: '0.9rem',
            color: 'var(--text-secondary)'
          }}>React</span>
          <span style={{
            padding: '0.5rem 1rem',
            backgroundColor: 'var(--bg-color)',
            borderRadius: '20px',
            fontSize: '0.9rem',
            color: 'var(--text-secondary)'
          }}>MySQL</span>
          <span style={{
            padding: '0.5rem 1rem',
            backgroundColor: 'var(--bg-color)',
            borderRadius: '20px',
            fontSize: '0.9rem',
            color: 'var(--text-secondary)'
          }}>Redis</span>
          <span style={{
            padding: '0.5rem 1rem',
            backgroundColor: 'var(--bg-color)',
            borderRadius: '20px',
            fontSize: '0.9rem',
            color: 'var(--text-secondary)'
          }}>JWT</span>
          <span style={{
            padding: '0.5rem 1rem',
            backgroundColor: 'var(--bg-color)',
            borderRadius: '20px',
            fontSize: '0.9rem',
            color: 'var(--text-secondary)'
          }}>WebSocket</span>
        </div>
      </div>

      {/* 도메인 빠른 링크 */}
      <section id="domains" style={{ marginBottom: '4rem', scrollMarginTop: '2rem' }}>
        <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>도메인별 상세 문서</h2>
        
        <h3 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>핵심 도메인</h3>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '1rem',
          marginBottom: '2rem'
        }}>
          <Link
            to="/domains/user"
            style={{
              display: 'block',
              padding: '1rem',
              backgroundColor: 'var(--bg-color)',
              borderRadius: '6px',
              border: '1px solid var(--nav-border)',
              textDecoration: 'none',
              color: 'inherit',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--card-bg)';
              e.currentTarget.style.borderColor = 'var(--link-color)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--bg-color)';
              e.currentTarget.style.borderColor = 'var(--nav-border)';
            }}
          >
            <strong style={{ color: 'var(--text-color)' }}>User</strong>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginTop: '0.9rem' }}>
              사용자, 반려동물, 소셜 로그인, 제재 관리
            </p>
          </Link>
          <Link
            to="/domains/board"
            style={{
              display: 'block',
              padding: '1rem',
              backgroundColor: 'var(--bg-color)',
              borderRadius: '6px',
              border: '1px solid var(--nav-border)',
              textDecoration: 'none',
              color: 'inherit',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--card-bg)';
              e.currentTarget.style.borderColor = 'var(--link-color)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--bg-color)';
              e.currentTarget.style.borderColor = 'var(--nav-border)';
            }}
          >
            <strong style={{ color: 'var(--text-color)' }}>Board</strong>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginTop: '0.9rem' }}>
              커뮤니티 게시판, 댓글, 반응, 인기글
            </p>
          </Link>
          <Link
            to="/domains/care"
            style={{
              display: 'block',
              padding: '1rem',
              backgroundColor: 'var(--bg-color)',
              borderRadius: '6px',
              border: '1px solid var(--nav-border)',
              textDecoration: 'none',
              color: 'inherit',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--card-bg)';
              e.currentTarget.style.borderColor = 'var(--link-color)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--bg-color)';
              e.currentTarget.style.borderColor = 'var(--nav-border)';
            }}
          >
            <strong style={{ color: 'var(--text-color)' }}>Care</strong>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginTop: '0.9rem' }}>
              펫케어 요청, 지원, 댓글, 리뷰
            </p>
          </Link>
          <Link
            to="/domains/missing-pet"
            style={{
              display: 'block',
              padding: '1rem',
              backgroundColor: 'var(--bg-color)',
              borderRadius: '6px',
              border: '1px solid var(--nav-border)',
              textDecoration: 'none',
              color: 'inherit',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--card-bg)';
              e.currentTarget.style.borderColor = 'var(--link-color)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--bg-color)';
              e.currentTarget.style.borderColor = 'var(--nav-border)';
            }}
          >
            <strong style={{ color: 'var(--text-color)' }}>Missing Pet</strong>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginTop: '0.9rem' }}>
              실종 동물 신고 및 관리
            </p>
          </Link>
          <Link
            to="/domains/location"
            style={{
              display: 'block',
              padding: '1rem',
              backgroundColor: 'var(--bg-color)',
              borderRadius: '6px',
              border: '1px solid var(--nav-border)',
              textDecoration: 'none',
              color: 'inherit',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--card-bg)';
              e.currentTarget.style.borderColor = 'var(--link-color)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--bg-color)';
              e.currentTarget.style.borderColor = 'var(--nav-border)';
            }}
          >
            <strong style={{ color: 'var(--text-color)' }}>Location</strong>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginTop: '0.9rem' }}>
              공공데이터 기반 위치 서비스
            </p>
          </Link>
          <Link
            to="/domains/meetup"
            style={{
              display: 'block',
              padding: '1rem',
              backgroundColor: 'var(--bg-color)',
              borderRadius: '6px',
              border: '1px solid var(--nav-border)',
              textDecoration: 'none',
              color: 'inherit',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--card-bg)';
              e.currentTarget.style.borderColor = 'var(--link-color)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--bg-color)';
              e.currentTarget.style.borderColor = 'var(--nav-border)';
            }}
          >
            <strong style={{ color: 'var(--text-color)' }}>Meetup</strong>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginTop: '0.9rem' }}>
              오프라인 모임
            </p>
          </Link>
          <Link
            to="/domains/chat"
            style={{
              display: 'block',
              padding: '1rem',
              backgroundColor: 'var(--bg-color)',
              borderRadius: '6px',
              border: '1px solid var(--nav-border)',
              textDecoration: 'none',
              color: 'inherit',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--card-bg)';
              e.currentTarget.style.borderColor = 'var(--link-color)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--bg-color)';
              e.currentTarget.style.borderColor = 'var(--nav-border)';
            }}
          >
            <strong style={{ color: 'var(--text-color)' }}>Chat</strong>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginTop: '0.9rem' }}>
              실시간 채팅 시스템
            </p>
          </Link>
        </div>

        <h3 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>지원 도메인</h3>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '1rem'
        }}>
          <div style={{
            padding: '1rem',
            backgroundColor: 'var(--bg-color)',
            borderRadius: '6px',
            border: '1px solid var(--nav-border)'
          }}>
            <strong style={{ color: 'var(--text-color)' }}>Notification</strong>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginTop: '0.9rem' }}>
              알림 시스템
            </p>
          </div>
          <div style={{
            padding: '1rem',
            backgroundColor: 'var(--bg-color)',
            borderRadius: '6px',
            border: '1px solid var(--nav-border)'
          }}>
            <strong style={{ color: 'var(--text-color)' }}>Report</strong>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginTop: '0.9rem' }}>
              신고 및 제재 시스템
            </p>
          </div>
          <div style={{
            padding: '1rem',
            backgroundColor: 'var(--bg-color)',
            borderRadius: '6px',
            border: '1px solid var(--nav-border)'
          }}>
            <strong style={{ color: 'var(--text-color)' }}>File</strong>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginTop: '0.9rem' }}>
              파일 업로드/다운로드
            </p>
          </div>
          <div style={{
            padding: '1rem',
            backgroundColor: 'var(--bg-color)',
            borderRadius: '6px',
            border: '1px solid var(--nav-border)'
          }}>
            <strong style={{ color: 'var(--text-color)' }}>Activity</strong>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginTop: '0.9rem' }}>
              사용자 활동 로그
            </p>
          </div>
          <div style={{
            padding: '1rem',
            backgroundColor: 'var(--bg-color)',
            borderRadius: '6px',
            border: '1px solid var(--nav-border)'
          }}>
            <strong style={{ color: 'var(--text-color)' }}>Statistics</strong>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginTop: '0.9rem' }}>
              일별 통계 수집
            </p>
          </div>
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
            href="https://github.com/makkong1/makkong1-github.io"
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
          <Link
            to="/docs"
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
            <h3 style={{ marginBottom: '0.5rem', color: 'var(--text-color)' }}>문서 모음</h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
              아키텍처 및 도메인 문서
            </p>
          </Link>
          <Link
            to="/demo"
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
            <h3 style={{ marginBottom: '0.5rem', color: 'var(--text-color)' }}>라이브 데모</h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
              인터랙티브 데모 체험
            </p>
          </Link>
        </div>
      </section>
        </div>
        <TableOfContents sections={sections} />
      </div>
    </div>
  );
}

export default HomePage;

