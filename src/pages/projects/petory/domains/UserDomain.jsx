import { Link } from "react-router-dom";
import MermaidDiagram from "../../../../components/Common/MermaidDiagram";
import TableOfContents from "../../../../components/Common/TableOfContents";

function Card({ children, style }) {
  return (
    <div
      className="section-card"
      style={{
        padding: "1.5rem",
        backgroundColor: "var(--card-bg)",
        borderRadius: "8px",
        border: "1px solid var(--nav-border)",
        ...style,
      }}
    >
      {children}
    </div>
  );
}

function CodeBlock({ children }) {
  return (
    <pre
      style={{
        padding: "0.95rem 1rem",
        backgroundColor: "var(--bg-color)",
        borderRadius: "6px",
        overflowX: "auto",
        fontSize: "0.84rem",
        color: "var(--text-secondary)",
        fontFamily: "monospace",
        lineHeight: "1.65",
        margin: "0.75rem 0 0",
      }}
    >
      {children}
    </pre>
  );
}

const PETORY_USER_ARCH_DOC =
  "https://github.com/makkong1/Petory/blob/main/docs/architecture/user/user-domain-architecture.md";

const PETORY_SYSTEM_ARCH_DOC =
  "https://github.com/makkong1/Petory/blob/main/docs/architecture/시스템_아키텍처_다이어그램.md";

function UserDomain() {
  const sections = [
    { id: "pillars", title: "핵심 기능" },
    { id: "intro", title: "도메인 개요" },
    { id: "design", title: "기능 & 아키텍처" },
    { id: "troubleshooting", title: "트러블슈팅" },
    { id: "summary", title: "핵심 포인트" },
    { id: "docs", title: "관련 페이지" },
  ];

  const corePillars = [
    "인증",
    "인가",
    "OAuth · 소셜 연동",
    "이메일 인증",
    "제재 · 계정 상태",
    "프로필 · 반려 정보",
  ];

  const authFlowDiagram = `flowchart LR
    subgraph CLIENT
        FE["React SPA"]
    end
    subgraph SECBOOT
        JF[JwtAuthenticationFilter]
        SC[SecurityConfig]
    end
    subgraph USERDOM
        AC[AuthController]
        UPC[UserProfileController]
        PEC[PetController]
        AU[AuthenticationManager]
        AS[AuthService]
        UD[UsersDetailsServiceImpl]
        O2S[OAuth2Service]
        O2Ok[OAuth2SuccessHandler]
    end
    subgraph MYSQLSTORE
        U[(users)]
        SU[(socialuser)]
    end
    FE -->|Bearer JWT| JF
    JF --> UD
    JF --> UPC
    JF --> PEC
    SC --> JF
    FE --> AC
    AC --> AU
    AC --> AS
    AS --> U
    O2Ok --> O2S
    O2S --> U
    O2S --> SU`;

  const entityDiagram = `erDiagram
    Users ||--o{ SocialUser : has
    Users ||--o{ UserSanction : has
    Users ||--o{ Pet : owns
    Pet ||--o{ PetVaccination : has

    Users {
        bigint idx PK
        string id
        string username
        string email
        string password_hash
        string role
        string refresh_token
        boolean emailVerified
        int warningCount
        string status
        datetime suspendedUntil
        boolean isDeleted
    }

    Pet {
        bigint idx PK
        bigint user_idx FK
        string petName
        string petType
        string breed
        string birthDate
        string profileImageUrl
    }

    SocialUser {
        bigint idx PK
        bigint user_idx FK
        string provider
        string providerId
    }

    UserSanction {
        bigint idx PK
        bigint user_idx FK
        string sanctionType
        string reason
        datetime startsAt
        datetime endsAt
    }

    PetVaccination {
        bigint idx PK
        bigint pet_idx FK
        string vaccineName
        date vaccinationDate
        date nextDueDate
    }`;

  const userDomainOverviewDiagram = `graph TB
    subgraph CLIENT["클라이언트"]
        FE["React SPA"]
    end

    subgraph SEC["Spring Security"]
        JF["JwtAuthenticationFilter"]
        SC["SecurityConfig"]
    end

    subgraph USERDOM["domain/user — 기능 블록"]
        direction TB
        AUTH["신원·토큰\\nAuthController · AuthService · JwtUtil"]
        OAUTH["소셜 로그인\\nOAuth2SuccessHandler · OAuth2Service · SocialUser"]
        PROF["프로필\\nUserProfileController · UsersService"]
        PET["반려 정보\\nPetController · PetService · Pet / PetVaccination"]
        SAN["제재·이력\\nUserSanctionService · UserSanctionScheduler"]
    end

    subgraph DATA["영속화 (요지)"]
        U[("users")]
        SU[("socialuser")]
        PT[("pets · pet_vaccinations")]
        SAN_T[("user_sanctions")]
    end

    subgraph CROSS["타 도메인 / 외부"]
        REP["report / admin\\napplySanctionFromReport"]
        FIL["file\\nAttachmentFileService · 업로드 정책"]
    end

    FE -->|"Bearer / 일부 ?token="| JF
    SC --> JF
    FE -->|"회원가입·로그인·refresh"| AUTH
    FE -->|"OAuth2 진입"| OAUTH

    JF --> PROF
    JF --> PET
    AUTH --> U
    OAUTH --> U
    OAUTH --> SU
    PROF --> U
    PET --> U
    PET --> PT
    SAN --> U
    SAN --> SAN_T
    REP --> SAN
    PET --> FIL`;

  const userStatusDiagram = `stateDiagram-v2
    [*] --> ACTIVE
    ACTIVE --> SUSPENDED: 이용제한 부여\\n(addSuspension 등)
    SUSPENDED --> ACTIVE: 만료 시점에 활성 이용제한 없음\\n(scheduler 또는 로그인/OAuth 진입 시 정리)
    ACTIVE --> BANNED: 영구 차단\\n(addBan 등)
    SUSPENDED --> BANNED: 정책에 따라 부여 가능
    BANNED --> [*]: 로그인·OAuth 차단 유지\\n(별도 비즈니스 없으면 복귀 없음)`;

  const li = (text) => <li style={{ marginBottom: "0.35rem" }}>• {text}</li>;

  return (
    <div className="domain-page-wrapper" style={{ padding: "2rem 0" }}>
      <div
        className="domain-page-container"
        style={{ display: "flex", gap: "2rem", alignItems: "flex-start" }}
      >
        <div className="domain-page-content" style={{ flex: 1 }}>
          <h1 style={{ marginBottom: "0.5rem", color: "var(--text-color)" }}>
            유저 도메인
          </h1>
          <p
            style={{
              color: "var(--text-secondary)",
              lineHeight: "1.8",
              marginBottom: "0.85rem",
              fontSize: "0.95rem",
            }}
          >
            User 도메인은 계정·신원·세션의 본체입니다. 로컬·소셜 로그인과
            JWT·Refresh, 프로필·이메일 검증, 반려(Pet) 정보와 접종·이미지,
            제재·경고와 신고 적용까지 한 도메인 안에서 다루며, 보호 API가
            공통으로 거치는 인증·사용자 뿌리라 보안·동시성·식별자 정합성이 특히
            중요했던 영역입니다.
          </p>

          {/* ── 핵심 기능 ── */}
          <section
            id="pillars"
            style={{ marginBottom: "2rem", scrollMarginTop: "2rem" }}
          >
            <h2
              style={{
                marginBottom: "0.75rem",
                color: "var(--text-color)",
                fontSize: "1.1rem",
              }}
            >
              핵심 기능
            </h2>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
              {corePillars.map((label) => (
                <span
                  key={label}
                  style={{
                    padding: "0.35rem 0.75rem",
                    borderRadius: "999px",
                    fontSize: "0.82rem",
                    fontWeight: 600,
                    color: "var(--text-color)",
                    backgroundColor: "var(--bg-color)",
                    border: "1px solid var(--nav-border)",
                  }}
                >
                  {label}
                </span>
              ))}
            </div>
          </section>

          {/* ── 도메인 개요 ── */}
          <section
            id="intro"
            style={{ marginBottom: "3rem", scrollMarginTop: "2rem" }}
          >
            <h2 style={{ marginBottom: "1rem", color: "var(--text-color)" }}>
              도메인 개요
            </h2>
            <Card>
              <p
                style={{
                  lineHeight: "1.8",
                  color: "var(--text-secondary)",
                  marginBottom: "1rem",
                }}
              >
                User 도메인의 핵심은{" "}
                <strong style={{ color: "var(--text-color)" }}>
                  신뢰할 수 있는 인증 상태를 빠르게 만들고, 제재·이메일 인증
                  같은 정책을 사용자 생명주기 안에 안정적으로 끼워 넣는 것
                </strong>
                입니다.
              </p>
              <table
                style={{
                  width: "100%",
                  borderCollapse: "collapse",
                  fontSize: "0.9rem",
                  color: "var(--text-secondary)",
                }}
              >
                <thead>
                  <tr style={{ borderBottom: "1px solid var(--nav-border)" }}>
                    <th
                      style={{
                        padding: "0.55rem 0.75rem",
                        textAlign: "left",
                        color: "var(--text-color)",
                      }}
                    >
                      지표
                    </th>
                    <th
                      style={{
                        padding: "0.55rem 0.75rem",
                        textAlign: "left",
                        color: "var(--text-color)",
                      }}
                    >
                      Before
                    </th>
                    <th
                      style={{
                        padding: "0.55rem 0.75rem",
                        textAlign: "left",
                        color: "var(--text-color)",
                      }}
                    >
                      After
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["로그인 쿼리 수", "21개", "4개 (↓81%)"],
                    ["실행 시간", "305ms", "55ms"],
                    ["메모리", "0.58MB", "0.13MB"],
                  ].map(([label, before, after], i, arr) => (
                    <tr
                      key={label}
                      style={{
                        borderBottom:
                          i < arr.length - 1
                            ? "1px solid var(--nav-border)"
                            : "none",
                      }}
                    >
                      <td
                        style={{
                          padding: "0.55rem 0.75rem",
                          color: "var(--text-color)",
                        }}
                      >
                        {label}
                      </td>
                      <td style={{ padding: "0.55rem 0.75rem" }}>{before}</td>
                      <td
                        style={{
                          padding: "0.55rem 0.75rem",
                          color: "var(--text-color)",
                          fontWeight: 600,
                        }}
                      >
                        {after}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p
                style={{
                  color: "var(--text-secondary)",
                  fontSize: "0.88rem",
                  marginTop: "0.75rem",
                  marginBottom: 0,
                }}
              >
                수치 근거·시퀀스·테스트 코드 →{" "}
                <Link
                  to="/domains/user/optimization"
                  style={{ color: "var(--link-color)", textDecoration: "none" }}
                >
                  성능 최적화
                </Link>
                {" · "}
                <Link
                  to="/domains/user/refactoring"
                  style={{ color: "var(--link-color)", textDecoration: "none" }}
                >
                  리팩토링(DTO·record 등)
                </Link>
              </p>
            </Card>
          </section>

          {/* ── 기능 & 아키텍처 (user-domain-architecture.md 구조와 동일) ── */}
          <section
            id="design"
            style={{ marginBottom: "3rem", scrollMarginTop: "2rem" }}
          >
            <h2 style={{ marginBottom: "1rem", color: "var(--text-color)" }}>
              기능 & 아키텍처
            </h2>

            <p
              style={{
                color: "var(--text-secondary)",
                lineHeight: "1.8",
                marginBottom: "1rem",
                fontSize: "0.92rem",
              }}
            >
              <strong style={{ color: "var(--text-color)" }}>
                domain/user
              </strong>{" "}
              패키지를 시스템 안에서 먼저{" "}
              <strong style={{ color: "var(--text-color)" }}>한 장</strong>으로
              잡고, 그 안에서 인증·반려·제재 축을 펼친다. Petory 전체 층위는{" "}
              <a
                href={PETORY_SYSTEM_ARCH_DOC}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: "var(--link-color)",
                  textDecoration: "none",
                  fontWeight: 600,
                }}
              >
                시스템 아키텍처 다이어그램
              </a>
              과 같이 읽는다. 본 절은 레포{" "}
              <a
                href={PETORY_USER_ARCH_DOC}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: "var(--link-color)",
                  textDecoration: "none",
                  fontWeight: 600,
                }}
              >
                user-domain-architecture.md
              </a>
              와 동일한 절 번호를 따른다. 코드 정리·DTO record화 같은 작업
              요약은{" "}
              <Link
                to="/domains/user/refactoring"
                style={{
                  color: "var(--link-color)",
                  textDecoration: "none",
                  fontWeight: 600,
                }}
              >
                User 도메인 리팩토링
              </Link>
              에서 다룬다.
            </p>

            {/* §1 */}
            <Card style={{ marginBottom: "1rem" }}>
              <h3
                style={{
                  marginBottom: "0.65rem",
                  color: "var(--text-color)",
                  fontSize: "1rem",
                }}
              >
                1. User 도메인 전체 구조
              </h3>
              <p
                style={{
                  color: "var(--text-secondary)",
                  lineHeight: "1.75",
                  margin: "0 0 0.65rem",
                  fontSize: "0.88rem",
                }}
              >
                경로·데이터·타 도메인 관계를 한 그래프로 모은 것이다. 아래
                §4·§5·§6은 이 블록을 펼친 설명이다.
              </p>
              <MermaidDiagram chart={userDomainOverviewDiagram} />
              <ul
                style={{
                  listStyle: "none",
                  padding: 0,
                  margin: "0.75rem 0",
                  color: "var(--text-secondary)",
                  lineHeight: "1.72",
                  fontSize: "0.86rem",
                }}
              >
                {li(
                  "세로: CLIENT → Security → 신원·소셜·프로필·반려·제재 블록 → DATA."
                )}
                {li(
                  "가로: 신고·관리는 `applySanctionFromReport`로 제재 블록만 건드리고, 반려 프로필 이미지는 file 도메인과 맞물린다."
                )}
                {li(
                  "같은 패키지 안에서 HTTP는 필터 → `/api/auth` → (OAuth 병렬) → `/api/users` → `/api/pets` 순으로 읽는 것이 코드와 맞다(아래 §4·부록)."
                )}
              </ul>
              <table
                style={{
                  width: "100%",
                  borderCollapse: "collapse",
                  fontSize: "0.84rem",
                  color: "var(--text-secondary)",
                }}
              >
                <thead>
                  <tr style={{ borderBottom: "1px solid var(--nav-border)" }}>
                    <th
                      style={{
                        padding: "0.45rem 0.55rem",
                        textAlign: "left",
                        color: "var(--text-color)",
                      }}
                    >
                      블록
                    </th>
                    <th
                      style={{
                        padding: "0.45rem 0.55rem",
                        textAlign: "left",
                        color: "var(--text-color)",
                      }}
                    >
                      담당 (한 줄)
                    </th>
                    <th
                      style={{
                        padding: "0.45rem 0.55rem",
                        textAlign: "left",
                        color: "var(--text-color)",
                      }}
                    >
                      주요 저장
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    [
                      "신원·토큰",
                      "로컬 가입·로그인·Refresh·로그아웃, Access JWT",
                      "users Refresh 컬럼 등",
                    ],
                    [
                      "소셜",
                      "Provider 콜백 후 연결·생성, 동일 토큰 정책",
                      "users + socialuser",
                    ],
                    ["프로필", "내 정보, 이메일 검증·emailVerified", "users"],
                    [
                      "반려 정보 (Pet)",
                      "반려 CRUD·접종, 이미지 ↔ file",
                      "pets(FK user) · pet_vaccinations",
                    ],
                    [
                      "제재·이력",
                      "상태·경고·이용정지·스케줄러",
                      "users · user_sanctions",
                    ],
                  ].map(([a, b, c], i, arr) => (
                    <tr
                      key={a}
                      style={{
                        borderBottom:
                          i < arr.length - 1
                            ? "1px solid var(--nav-border)"
                            : "none",
                      }}
                    >
                      <td
                        style={{
                          padding: "0.45rem 0.55rem",
                          color: "var(--text-color)",
                          fontWeight: 600,
                        }}
                      >
                        {a}
                      </td>
                      <td style={{ padding: "0.45rem 0.55rem" }}>{b}</td>
                      <td style={{ padding: "0.45rem 0.55rem" }}>
                        <code style={{ fontSize: "0.82em" }}>{c}</code>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Card>

            {/* §2 */}
            <Card style={{ marginBottom: "1rem" }}>
              <h3
                style={{
                  marginBottom: "0.65rem",
                  color: "var(--text-color)",
                  fontSize: "1rem",
                }}
              >
                2. 도메인 경계 (책임)
              </h3>
              <table
                style={{
                  width: "100%",
                  borderCollapse: "collapse",
                  fontSize: "0.84rem",
                  color: "var(--text-secondary)",
                }}
              >
                <thead>
                  <tr style={{ borderBottom: "1px solid var(--nav-border)" }}>
                    <th
                      style={{
                        padding: "0.45rem 0.5rem",
                        textAlign: "left",
                        color: "var(--text-color)",
                        width: "22%",
                      }}
                    >
                      영역
                    </th>
                    <th
                      style={{
                        padding: "0.45rem 0.5rem",
                        textAlign: "left",
                        color: "var(--text-color)",
                      }}
                    >
                      User가 소유
                    </th>
                    <th
                      style={{
                        padding: "0.45rem 0.5rem",
                        textAlign: "left",
                        color: "var(--text-color)",
                      }}
                    >
                      바깥
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    [
                      "신원·자격증명",
                      "로그인 ID, 비번 해시, Refresh, JWT subject(로그인 ID)",
                      "CORS·전역 예외 등 → global",
                    ],
                    [
                      "OAuth",
                      "SocialUser ↔ Users, 성공 후 토큰·리다이렉트",
                      "Provider 앱 등록 → 설정",
                    ],
                    [
                      "프로필",
                      "계정 단위 공개 정보·메타 (`Users`)",
                      "비즈니스 컨텍스트의 사용자 참조·규칙 → 각 도메인",
                    ],
                    [
                      "반려 정보 (Pet)",
                      "`Pet`·`PetVaccination` CRUD, Users FK; 이미지·첨부는 file과 동기화",
                      "`pet_idx` 참조·규칙 — 케어·실종 등 각 도메인",
                    ],
                    [
                      "제재",
                      "status·이력·로그인/OAuth 선검사 일부",
                      "신고·admin — 적용 시 `applySanctionFromReport`",
                    ],
                  ].map(([a, b, c], i, arr) => (
                    <tr
                      key={a}
                      style={{
                        borderBottom:
                          i < arr.length - 1
                            ? "1px solid var(--nav-border)"
                            : "none",
                      }}
                    >
                      <td
                        style={{
                          padding: "0.45rem 0.5rem",
                          fontWeight: 600,
                          color: "var(--text-color)",
                        }}
                      >
                        {a}
                      </td>
                      <td style={{ padding: "0.45rem 0.5rem" }}>{b}</td>
                      <td style={{ padding: "0.45rem 0.5rem" }}>{c}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p
                style={{
                  color: "var(--text-secondary)",
                  lineHeight: "1.72",
                  margin: "0.65rem 0 0",
                  fontSize: "0.86rem",
                }}
              >
                <code style={{ fontSize: "0.85em" }}>emailVerified</code>{" "}
                게이트는 고위험 액션별 서비스에 분산 — 상세는 Petory 이메일 인증
                아키텍처 문서.
              </p>
            </Card>

            {/* §3 */}
            <Card style={{ marginBottom: "1rem" }}>
              <h3
                style={{
                  marginBottom: "0.65rem",
                  color: "var(--text-color)",
                  fontSize: "1rem",
                }}
              >
                3. 식별자 체계
              </h3>
              <table
                style={{
                  width: "100%",
                  borderCollapse: "collapse",
                  fontSize: "0.82rem",
                  color: "var(--text-secondary)",
                }}
              >
                <thead>
                  <tr style={{ borderBottom: "1px solid var(--nav-border)" }}>
                    <th
                      style={{
                        padding: "0.42rem 0.5rem",
                        textAlign: "left",
                        color: "var(--text-color)",
                      }}
                    >
                      구분
                    </th>
                    <th
                      style={{
                        padding: "0.42rem 0.5rem",
                        textAlign: "left",
                        color: "var(--text-color)",
                      }}
                    >
                      용도
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["Users.idx", "Surrogate PK, 타 도메인 FK"],
                    [
                      "Users.id",
                      "로그인 ID · JWT subject · loadUserByUsername 실질 인자",
                    ],
                    ["Users.username", "별칭 필드 — subject와 혼동 금지"],
                    [
                      "OAuth (Provider, providerId)",
                      "동일 이메일이면 기존 Users에 소셜 연결",
                    ],
                    [
                      "Refresh 컬럼",
                      "사용자당 최근 1문자열 — 후발 로그인/OAuth가 덮음",
                    ],
                    ["Pet.idx", "반려 PK · Users FK — “사용자 반려” 저장 루트"],
                  ].map(([k, v], i, arr) => (
                    <tr
                      key={k}
                      style={{
                        borderBottom:
                          i < arr.length - 1
                            ? "1px solid var(--nav-border)"
                            : "none",
                      }}
                    >
                      <td
                        style={{
                          padding: "0.42rem 0.5rem",
                          fontWeight: 600,
                          color: "var(--text-color)",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {k}
                      </td>
                      <td style={{ padding: "0.42rem 0.5rem" }}>{v}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Card>

            {/* §4 */}
            <Card style={{ marginBottom: "1rem" }}>
              <h3
                style={{
                  marginBottom: "0.65rem",
                  color: "var(--text-color)",
                  fontSize: "1rem",
                }}
              >
                4. 인증·인가
              </h3>

              <p
                style={{
                  marginBottom: "0.4rem",
                  fontSize: "0.82rem",
                  fontWeight: 700,
                  color: "var(--text-color)",
                  letterSpacing: "0.02em",
                }}
              >
                4.1 컴포넌트 레이아웃 (인증 레일)
              </p>
              <MermaidDiagram chart={authFlowDiagram} />
              <ul
                style={{
                  listStyle: "none",
                  padding: 0,
                  margin: "0.65rem 0 0.85rem",
                  color: "var(--text-secondary)",
                  lineHeight: "1.72",
                  fontSize: "0.86rem",
                }}
              >
                {li(
                  "Refresh는 DB 컬럼(stateful), Access는 짧은 TTL JWT(무상태)."
                )}
                {li(
                  "Naver: 커스텀 `accessTokenResponseClient` · 사용자 속성: `OAuth2UserProviderRouter`."
                )}
              </ul>

              <p
                style={{
                  marginBottom: "0.4rem",
                  marginTop: "0.85rem",
                  fontSize: "0.82rem",
                  fontWeight: 700,
                  color: "var(--text-color)",
                  letterSpacing: "0.02em",
                }}
              >
                4.2 인증 흐름 (요지)
              </p>
              <ul
                style={{
                  listStyle: "none",
                  padding: 0,
                  margin: "0 0 0.5rem",
                  color: "var(--text-secondary)",
                  lineHeight: "1.72",
                  fontSize: "0.86rem",
                }}
              >
                {li(
                  "로컬: `AuthController.login` → `AuthenticationManager` → `AuthService.login` — 제재 검사 후 Access·Refresh 발급·저장."
                )}
                {li(
                  "API 보호: `JwtAuthenticationFilter` — Bearer 또는 `?token=` → `loadUserByUsername` → `SecurityContext`에 `ROLE_*`."
                )}
                {li(
                  "`POST /api/auth/refresh` — Access만 재발급, Refresh 문자열 회전 없음. 로그아웃 시 Refresh 무효화."
                )}
                {li(
                  "OAuth 성공: `OAuth2SuccessHandler` → `OAuth2Service.processOAuth2Login` — Refresh 덮어쓰기, 쿼리 스트링 리다이렉트(`needsNickname`)."
                )}
              </ul>
              <p
                style={{
                  color: "var(--text-secondary)",
                  lineHeight: "1.7",
                  fontSize: "0.84rem",
                  margin: "0.55rem 0 0",
                  padding: "0.55rem 0.65rem",
                  borderRadius: "6px",
                  backgroundColor: "var(--bg-color)",
                  border: "1px solid var(--nav-border)",
                }}
              >
                <strong style={{ color: "var(--text-color)" }}>
                  Refresh 정책:
                </strong>{" "}
                설계 노트는 레포{" "}
                <a
                  href={PETORY_USER_ARCH_DOC}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    color: "var(--link-color)",
                    textDecoration: "none",
                    fontWeight: 600,
                  }}
                >
                  §4
                </a>
                .
              </p>

              <p
                style={{
                  marginBottom: "0.35rem",
                  marginTop: "0.85rem",
                  fontSize: "0.82rem",
                  fontWeight: 700,
                  color: "var(--text-color)",
                  letterSpacing: "0.02em",
                }}
              >
                4.3 인가 (역할·경로)
              </p>
              <ul
                style={{
                  listStyle: "none",
                  padding: 0,
                  margin: 0,
                  color: "var(--text-secondary)",
                  lineHeight: "1.72",
                  fontSize: "0.86rem",
                }}
              >
                {li(
                  "JWT + `@PreAuthorize` + `SecurityConfig` matcher 가 함께 동작."
                )}
                {li(
                  "`@PreAuthorize(permitAll)` 과 HTTP 레이어 `authenticated()` 불일치 시 — 요청이 먼저 거절될 수 있음(GOTCHA)."
                )}
              </ul>
            </Card>

            {/* HTTP 부록 */}
            <Card style={{ marginBottom: "1rem" }}>
              <h3
                style={{
                  marginBottom: "0.65rem",
                  color: "var(--text-color)",
                  fontSize: "1rem",
                }}
              >
                부록 — HTTP 요청 순서 (코드 축)
              </h3>
              <p
                style={{
                  color: "var(--text-secondary)",
                  lineHeight: "1.72",
                  margin: "0 0 0.65rem",
                  fontSize: "0.86rem",
                }}
              >
                §1 그래프와 같은 스토리를{" "}
                <strong style={{ color: "var(--text-color)" }}>
                  엔드포인트 순
                </strong>
                으로만 압축한 것이다.
              </p>
              <ul
                style={{
                  listStyle: "none",
                  padding: 0,
                  margin: 0,
                  color: "var(--text-secondary)",
                  lineHeight: "1.72",
                  fontSize: "0.85rem",
                }}
              >
                {li(
                  "① `JwtAuthenticationFilter` · `SecurityConfig` — 보호 `/api/**`에 Bearer 또는 `?token=`."
                )}
                {li(
                  "② `/api/auth/*` — `AuthController` · `AuthService` — 가입·로그인·refresh·logout."
                )}
                {li("③ OAuth 병렬 — `OAuth2SuccessHandler` → `OAuth2Service`.")}
                {li(
                  "④ `/api/users/...` — `UserProfileController` · 이메일 검증."
                )}
                {li(
                  "⑤ `/api/pets` — `PetController` · `PetService` — 반려 정보 API."
                )}
                {li(
                  "⑥ 제재 — 로그인 선검사 · `UserSanctionService` · 스케줄러 · `applySanctionFromReport`."
                )}
              </ul>
            </Card>

            {/* §5 */}
            <Card style={{ marginBottom: "1rem" }}>
              <h3
                style={{
                  marginBottom: "0.65rem",
                  color: "var(--text-color)",
                  fontSize: "1rem",
                }}
              >
                5. 반려 정보 (Pet)
              </h3>
              <ul
                style={{
                  listStyle: "none",
                  padding: 0,
                  margin: 0,
                  color: "var(--text-secondary)",
                  lineHeight: "1.72",
                  fontSize: "0.86rem",
                }}
              >
                {li(
                  "`/api/pets` → `PetController` → `PetService`; 보호 API는 필터 이후 동일 레일."
                )}
                {li("`Pet` → `Users` ManyToOne, `PetVaccination` 자식.")}
                {li(
                  "이미지: `AttachmentFileService` · `FileTargetType.PET` — file 도메인과 동기화."
                )}
                {li(
                  <>
                    알려진 갭: 단건 조회·수정 등에서 소유자 검증이 빠진
                    경로(IDOR 위험) — 레포{" "}
                    <strong style={{ color: "var(--text-color)" }}>
                      §8 항 2
                    </strong>
                    .
                  </>
                )}
              </ul>
            </Card>

            {/* §6 */}
            <Card style={{ marginBottom: "1rem" }}>
              <h3
                style={{
                  marginBottom: "0.65rem",
                  color: "var(--text-color)",
                  fontSize: "1rem",
                }}
              >
                6. 제재·계정 상태
              </h3>
              <MermaidDiagram chart={userStatusDiagram} />
              <ul
                style={{
                  listStyle: "none",
                  padding: 0,
                  margin: "0.65rem 0 0",
                  color: "var(--text-secondary)",
                  lineHeight: "1.72",
                  fontSize: "0.86rem",
                }}
              >
                {li(
                  "배치: `UserSanctionScheduler` → `releaseExpiredSuspensions` — 이력과 `Users.status` 동기화."
                )}
                {li(
                  "요청 시: 로그인·OAuth 진입에서 만료 SUSPENDED 정리(스케줄러 완충)."
                )}
                {li(
                  "신고: `SUSPEND_USER` → 코드상 `addBan` 등 이름·행위 불일치는 도메인 사전으로 관리할 이슈."
                )}
              </ul>
            </Card>

            {/* §7 */}
            <Card style={{ marginBottom: "1rem" }}>
              <h3
                style={{
                  marginBottom: "0.65rem",
                  color: "var(--text-color)",
                  fontSize: "1rem",
                }}
              >
                7. 타 도메인·동시성·성능
              </h3>
              <ul
                style={{
                  listStyle: "none",
                  padding: 0,
                  margin: "0 0 0.65rem",
                  color: "var(--text-secondary)",
                  lineHeight: "1.72",
                  fontSize: "0.86rem",
                }}
              >
                {li(
                  "신고/관리 → `applySanctionFromReport`. 파일은 `/api/uploads/**` 등 전역 정책과 결합."
                )}
                {li("펫코인 등: `findByIdForUpdate` 로 Users 행 비관적 락.")}
              </ul>
              <table
                style={{
                  width: "100%",
                  borderCollapse: "collapse",
                  fontSize: "0.82rem",
                  color: "var(--text-secondary)",
                }}
              >
                <thead>
                  <tr style={{ borderBottom: "1px solid var(--nav-border)" }}>
                    <th
                      style={{
                        padding: "0.4rem 0.5rem",
                        textAlign: "left",
                        color: "var(--text-color)",
                      }}
                    >
                      지점
                    </th>
                    <th
                      style={{
                        padding: "0.4rem 0.5rem",
                        textAlign: "left",
                        color: "var(--text-color)",
                      }}
                    >
                      패턴
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["경고 카운터", "단일 JPQL `incrementWarningCount`"],
                    ["펫코인·차감", "`findByIdForUpdate`"],
                    ["소셜 가입 레이스", "`createNewUserWithRetry`"],
                    [
                      "Refresh",
                      "사용자당 단일 컬럼 — 후발 로그인이 이전 세션 무효화",
                    ],
                  ].map(([k, v], i, arr) => (
                    <tr
                      key={k}
                      style={{
                        borderBottom:
                          i < arr.length - 1
                            ? "1px solid var(--nav-border)"
                            : "none",
                      }}
                    >
                      <td
                        style={{
                          padding: "0.4rem 0.5rem",
                          color: "var(--text-color)",
                          fontWeight: 600,
                        }}
                      >
                        {k}
                      </td>
                      <td style={{ padding: "0.4rem 0.5rem" }}>{v}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <CodeBlock>{`// 경고 카운터 예시 (@Modifying)
UPDATE Users u SET u.warningCount = u.warningCount + 1 WHERE u.idx = :userId`}</CodeBlock>
            </Card>

            {/* §8 */}
            <Card style={{ marginBottom: "1rem" }}>
              <h3
                style={{
                  marginBottom: "0.65rem",
                  color: "var(--text-color)",
                  fontSize: "1rem",
                }}
              >
                8. 보안·정책 갭 (요지)
              </h3>
              <p
                style={{
                  color: "var(--text-secondary)",
                  lineHeight: "1.7",
                  margin: "0 0 0.5rem",
                  fontSize: "0.84rem",
                }}
              >
                전체 9항은 레포 본문(
                <a
                  href={PETORY_USER_ARCH_DOC}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    color: "var(--link-color)",
                    textDecoration: "none",
                    fontWeight: 600,
                  }}
                >
                  §8
                </a>
                ). 여기서는 대표만.
              </p>
              <ol
                style={{
                  paddingLeft: "1.2rem",
                  margin: 0,
                  color: "var(--text-secondary)",
                  lineHeight: "1.72",
                  fontSize: "0.84rem",
                }}
              >
                <li style={{ marginBottom: "0.35rem" }}>
                  JWT 유효 동안 `UserStatus` 재평가 없음 — 제재 즉시성은 Access
                  TTL 의존.
                </li>
                <li style={{ marginBottom: "0.35rem" }}>
                  펫 단건 API 소유 검증 갭(IDOR).
                </li>
                <li style={{ marginBottom: "0.35rem" }}>
                  permitAll vs HTTP authenticated 불일치.
                </li>
                <li style={{ marginBottom: "0.35rem" }}>
                  OAuth·SSE 등 토큰 URL 전달 — 유출 표면.
                </li>
                <li style={{ marginBottom: "0.35rem" }}>
                  CORS·actuator·OAuth 로그 등 운영 전제 없으면 위험 확대.
                </li>
              </ol>
            </Card>

            {/* §9 */}
            <Card style={{ marginBottom: "1rem" }}>
              <h3
                style={{
                  marginBottom: "0.65rem",
                  color: "var(--text-color)",
                  fontSize: "1rem",
                }}
              >
                9. 문서 역할 (요지)
              </h3>
              <table
                style={{
                  width: "100%",
                  borderCollapse: "collapse",
                  fontSize: "0.84rem",
                  color: "var(--text-secondary)",
                }}
              >
                <thead>
                  <tr style={{ borderBottom: "1px solid var(--nav-border)" }}>
                    <th
                      style={{
                        padding: "0.45rem 0.5rem",
                        textAlign: "left",
                        color: "var(--text-color)",
                      }}
                    >
                      문서
                    </th>
                    <th
                      style={{
                        padding: "0.45rem 0.5rem",
                        textAlign: "left",
                        color: "var(--text-color)",
                      }}
                    >
                      읽는 이유
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td
                      style={{
                        padding: "0.45rem 0.5rem",
                        fontWeight: 600,
                        color: "var(--text-color)",
                      }}
                    >
                      user-domain-architecture.md
                    </td>
                    <td style={{ padding: "0.45rem 0.5rem" }}>
                      전체 구조 한 장·경계·식별자·인증·반려·제재·갭
                    </td>
                  </tr>
                  <tr>
                    <td
                      style={{
                        padding: "0.45rem 0.5rem",
                        fontWeight: 600,
                        color: "var(--text-color)",
                      }}
                    >
                      domains/user.md
                    </td>
                    <td style={{ padding: "0.45rem 0.5rem" }}>
                      기능·시나리오·API·예외 메시지
                    </td>
                  </tr>
                </tbody>
              </table>
            </Card>

            <Card style={{ marginBottom: "1rem" }}>
              <h3
                style={{
                  marginBottom: "0.65rem",
                  color: "var(--text-color)",
                  fontSize: "1rem",
                }}
              >
                저장 형태 (ERD 참고)
              </h3>
              <MermaidDiagram chart={entityDiagram} />
            </Card>

            <Card>
              <h3
                style={{
                  marginBottom: "0.65rem",
                  color: "var(--text-color)",
                  fontSize: "1rem",
                }}
              >
                주요 API
              </h3>
              <table
                style={{
                  width: "100%",
                  borderCollapse: "collapse",
                  fontSize: "0.88rem",
                  color: "var(--text-secondary)",
                }}
              >
                <thead>
                  <tr style={{ borderBottom: "1px solid var(--nav-border)" }}>
                    <th
                      style={{
                        padding: "0.55rem 0.75rem",
                        textAlign: "left",
                        color: "var(--text-color)",
                      }}
                    >
                      엔드포인트
                    </th>
                    <th
                      style={{
                        padding: "0.55rem 0.75rem",
                        textAlign: "left",
                        color: "var(--text-color)",
                      }}
                    >
                      Method
                    </th>
                    <th
                      style={{
                        padding: "0.55rem 0.75rem",
                        textAlign: "left",
                        color: "var(--text-color)",
                      }}
                    >
                      설명
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    [
                      "/api/auth/register",
                      "POST",
                      "회원가입 (role: USER 필수)",
                    ],
                    ["/api/auth/login", "POST", "로그인 · 토큰"],
                    ["/api/auth/refresh", "POST", "Access 갱신"],
                    ["/api/auth/logout", "POST", "Refresh 무효화"],
                    [
                      "/api/oauth2/authorization/{provider}",
                      "GET",
                      "소셜 진입",
                    ],
                    ["/api/users/me", "GET/PATCH", "내 프로필"],
                    ["/api/users/email/verify/...", "POST/GET", "메일 인증"],
                    ["/api/pets", "REST", "PetController"],
                    ["/api/admin/...", "—", "관리자·제재 등"],
                  ].map(([path, method, desc], i, arr) => (
                    <tr
                      key={path + method}
                      style={{
                        borderBottom:
                          i < arr.length - 1
                            ? "1px solid var(--nav-border)"
                            : "none",
                      }}
                    >
                      <td style={{ padding: "0.55rem 0.75rem" }}>
                        <code
                          style={{
                            backgroundColor: "var(--bg-color)",
                            padding: "0.1rem 0.3rem",
                            borderRadius: "4px",
                            fontSize: "0.82rem",
                          }}
                        >
                          {path}
                        </code>
                      </td>
                      <td style={{ padding: "0.55rem 0.75rem" }}>{method}</td>
                      <td style={{ padding: "0.55rem 0.75rem" }}>{desc}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Card>
          </section>

          {/* ── 트러블슈팅 ── */}
          <section
            id="troubleshooting"
            style={{ marginBottom: "3rem", scrollMarginTop: "2rem" }}
          >
            <h2 style={{ marginBottom: "1rem", color: "var(--text-color)" }}>
              트러블슈팅
            </h2>

            <Card style={{ marginBottom: "1rem" }}>
              <h3
                style={{
                  marginBottom: "0.75rem",
                  color: "var(--text-color)",
                  fontSize: "1rem",
                }}
              >
                로그인 N+1
              </h3>
              <p
                style={{
                  color: "var(--text-secondary)",
                  lineHeight: "1.8",
                  marginBottom: "0.4rem",
                }}
              >
                <strong style={{ color: "var(--text-color)" }}>문제:</strong>{" "}
                로그인 응답 구성 시 채팅방·참여자·메시지를 반복 로딩 → 쿼리
                21개, 305ms.
              </p>
              <p
                style={{
                  color: "var(--text-secondary)",
                  lineHeight: "1.8",
                  marginBottom: "0.75rem",
                }}
              >
                <strong style={{ color: "var(--text-color)" }}>해결:</strong>{" "}
                채팅방 ID 목록 선조회 후 IN·Fetch Join으로 단일 패스 구성. 쿼리
                4개·55ms로 단축.
              </p>
              <Link
                to="/domains/user/optimization"
                style={{
                  color: "var(--link-color)",
                  textDecoration: "none",
                  fontWeight: 600,
                }}
              >
                → 성능 최적화 상세
              </Link>
            </Card>

            {[
              [
                "소셜 가입 레이스",
                "동일 providerId·이메일에 두 요청이 동시에 도착하면 중복 사용자 생성 위험.",
                "email UNIQUE + socialuser(provider, providerId) UNIQUE + 트랜잭션으로 한 건만 남도록 설계.",
              ],
              [
                "제재 동시성",
                "여러 관리자가 경고를 동시에 주면 read-modify-write 경합으로 카운트 누락 위험.",
                "단일 @Modifying UPDATE로 원자 증가. 3회 도달 시 자동 이용 제한 로직과 정합 보장.",
              ],
              [
                "OAuth2 Provider 응답 차이",
                "Google·Naver의 필드명·토큰 응답 형식이 달라 공통 매핑이 깨짐.",
                "전용 OAuth2UserService와 Naver용 커스텀 토큰 클라이언트로 필드를 표준화.",
              ],
            ].map(([title, problem, solution]) => (
              <Card key={title} style={{ marginBottom: "1rem" }}>
                <h3
                  style={{
                    marginBottom: "0.75rem",
                    color: "var(--text-color)",
                    fontSize: "1rem",
                  }}
                >
                  {title}
                </h3>
                <p
                  style={{
                    color: "var(--text-secondary)",
                    lineHeight: "1.8",
                    marginBottom: "0.4rem",
                  }}
                >
                  <strong style={{ color: "var(--text-color)" }}>문제:</strong>{" "}
                  {problem}
                </p>
                <p
                  style={{
                    color: "var(--text-secondary)",
                    lineHeight: "1.8",
                    marginBottom: 0,
                  }}
                >
                  <strong style={{ color: "var(--text-color)" }}>해결:</strong>{" "}
                  {solution}
                </p>
              </Card>
            ))}
          </section>

          {/* ── 핵심 포인트 
          <section id="summary" style={{ marginBottom: '3rem', scrollMarginTop: '2rem' }}>
            <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>핵심 포인트</h2>
            <Card>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, color: 'var(--text-secondary)', lineHeight: '1.8' }}>
                <li>
                  • 레포 <strong style={{ color: 'var(--text-color)' }}>전체 구조 한 장 → 인증·반려·제재</strong> 절 구조와 맞춰{' '}
                  <a href={PETORY_USER_ARCH_DOC} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--link-color)', textDecoration: 'none', marginLeft: '0.25rem', fontWeight: 600 }}>
                    user-domain-architecture.md
                  </a>
                  를 본다.
                </li>
                <li>• 로그인 응답 N+1 제거 같은 체감 성능 스토리는 최적화 페이지를 유지했습니다.</li>
                <li>• 고위험 액션의 이메일 게이트·Purpose 상세는 Petory 이메일 인증 아키텍처 문서와 정합합니다.</li>
                <li>
                  • DTO 리팩터 등 코드 정리 과정은{' '}
                  <Link to="/domains/user/refactoring" style={{ color: 'var(--link-color)', textDecoration: 'none' }}>
                    리팩토링 페이지
                  </Link>
                  에서 다룹니다.
                </li>
              </ul>
            </Card>
          </section>── */}

          {/* ── 관련 페이지 ── */}
          <section
            id="docs"
            style={{ marginBottom: "3rem", scrollMarginTop: "2rem" }}
          >
            <h2 style={{ marginBottom: "1rem", color: "var(--text-color)" }}>
              관련 페이지
            </h2>
            <Card>
              <ul
                style={{
                  listStyle: "none",
                  padding: 0,
                  margin: 0,
                  color: "var(--text-secondary)",
                  lineHeight: "2",
                }}
              >
                <li>
                  •{" "}
                  <a
                    href={PETORY_USER_ARCH_DOC}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      color: "var(--link-color)",
                      textDecoration: "none",
                    }}
                  >
                    Petory — User 도메인 아키텍처 (GitHub)
                  </a>
                </li>
                <li>
                  •{" "}
                  <a
                    href={PETORY_SYSTEM_ARCH_DOC}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      color: "var(--link-color)",
                      textDecoration: "none",
                    }}
                  >
                    Petory — 시스템 아키텍처 다이어그램 (GitHub)
                  </a>
                </li>
                <li>
                  •{" "}
                  <Link
                    to="/domains/user/optimization"
                    style={{
                      color: "var(--link-color)",
                      textDecoration: "none",
                    }}
                  >
                    User 도메인 성능 최적화
                  </Link>
                </li>
                <li>
                  •{" "}
                  <Link
                    to="/domains/user/refactoring"
                    style={{
                      color: "var(--link-color)",
                      textDecoration: "none",
                    }}
                  >
                    User 도메인 리팩토링
                  </Link>
                </li>
                <li>
                  •{" "}
                  <Link
                    to="/domains/board"
                    style={{
                      color: "var(--link-color)",
                      textDecoration: "none",
                    }}
                  >
                    Board 도메인
                  </Link>
                </li>
              </ul>
            </Card>
          </section>
        </div>

        <TableOfContents sections={sections} />
      </div>
    </div>
  );
}

export default UserDomain;
