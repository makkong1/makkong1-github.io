import { Link } from 'react-router-dom';
import MermaidDiagram from '../../../../components/Common/MermaidDiagram';
import TableOfContents from '../../../../components/Common/TableOfContents';

function Card({ children, style }) {
  return (
    <div
      className="section-card"
      style={{
        padding: '1.5rem',
        backgroundColor: 'var(--card-bg)',
        borderRadius: '8px',
        border: '1px solid var(--nav-border)',
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
        padding: '0.95rem 1rem',
        backgroundColor: 'var(--bg-color)',
        borderRadius: '6px',
        overflowX: 'auto',
        fontSize: '0.84rem',
        color: 'var(--text-secondary)',
        fontFamily: 'monospace',
        lineHeight: '1.65',
        margin: '0.75rem 0 0',
      }}
    >
      {children}
    </pre>
  );
}

const PETORY_USER_ARCH_DOC =
  'https://github.com/makkong1/Petory/blob/main/docs/architecture/user/user-domain-architecture.md';

function UserDomainV2() {
  const sections = [
    { id: 'pillars', title: '핵심 기능' },
    { id: 'intro', title: '도메인 개요' },
    { id: 'design', title: '기술 결정' },
    { id: 'limits', title: '한계 & 개선' },
    { id: 'docs', title: '관련 페이지' },
  ];

  const corePillars = [
    'JWT 인증',
    'OAuth 계정 연결',
    'Pet 소유 검증',
    '제재 상태 동기화',
    '보안 트레이드오프',
  ];

  const flowDiagram = `flowchart TB
    FE["React SPA\n프론트엔드"]

    subgraph Sec["Spring Security"]
        JF["JwtAuthenticationFilter\n인증 필터"]
    end

    subgraph UserDom["User 도메인"]
        direction TB
        subgraph Svc["서비스"]
            direction LR
            AUTH["AuthService\n로그인·토큰"]
            OAUTH["OAuth2Service\n소셜 연결"]
            PET["PetService\n반려 정보"]
            SAN["UserSanctionService\n제재"]
        end
        subgraph Store["엔티티"]
            direction LR
            U["Users\n사용자"]
            SU["SocialUser\n소셜 계정"]
            P["Pet · PetVaccination\n반려 정보"]
            S["UserSanction\n제재 이력"]
        end
        AUTH --> U
        OAUTH --> U
        OAUTH --> SU
        PET --> U
        PET --> P
        SAN --> U
        SAN --> S
    end

    subgraph Ext["외부 도메인"]
        direction LR
        FILE["File 도메인\n첨부파일"]
        REP["Report 도메인\n신고 처리"]
    end

    FE -->|Bearer JWT| JF
    FE --> AUTH
    FE --> OAUTH
    JF --> PET
    JF --> SAN
    PET --> FILE
    REP --> SAN`;

  const li = (text) => <li style={{ marginBottom: '0.35rem' }}>• {text}</li>;

  return (
    <div className="domain-page-wrapper" style={{ padding: '2rem 0' }}>
      <div
        className="domain-page-container"
        style={{ display: 'flex', gap: '2rem', alignItems: 'flex-start' }}
      >
        <div className="domain-page-content" style={{ flex: 1 }}>
          <h1 style={{ marginBottom: '0.5rem', color: 'var(--text-color)' }}>
            유저 도메인
          </h1>
          <p
            style={{
              color: 'var(--text-secondary)',
              lineHeight: '1.8',
              marginBottom: '0.85rem',
              fontSize: '0.95rem',
            }}
          >
            User 도메인은 Petory에서 로그인만 담당하는 얇은 계층이 아니라,
            인증, 소셜 계정 연결, 반려 정보 소유권, 제재 상태를 함께 관리하는
            신원 기반 도메인입니다. 거의 모든 보호 API의 입구 역할을 하기
            때문에 보안 구조와 정책이 코드에 직접 반영됩니다. 저는 단순 회원
            CRUD보다, 시스템이 어떤 사용자를 어떤 상태로 신뢰할지 코드
            구조로 분리하는 데 집중했습니다.
          </p>

          <section
            id="pillars"
            style={{ marginBottom: '2rem', scrollMarginTop: '2rem' }}
          >
            <h2
              style={{
                marginBottom: '0.75rem',
                color: 'var(--text-color)',
                fontSize: '1.1rem',
              }}
            >
              핵심 기능
            </h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {corePillars.map((label) => (
                <span
                  key={label}
                  style={{
                    padding: '0.35rem 0.75rem',
                    borderRadius: '999px',
                    fontSize: '0.82rem',
                    fontWeight: 600,
                    color: 'var(--text-color)',
                    backgroundColor: 'var(--bg-color)',
                    border: '1px solid var(--nav-border)',
                  }}
                >
                  {label}
                </span>
              ))}
            </div>
          </section>

          <section
            id="intro"
            style={{ marginBottom: '3rem', scrollMarginTop: '2rem' }}
          >
            <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>
              도메인 개요
            </h2>

            <Card style={{ marginBottom: '1rem' }}>
              <table
                style={{
                  width: '100%',
                  borderCollapse: 'collapse',
                  fontSize: '0.9rem',
                  color: 'var(--text-secondary)',
                }}
              >
                <thead>
                  <tr style={{ borderBottom: '1px solid var(--nav-border)' }}>
                    <th
                      style={{
                        padding: '0.55rem 0.75rem',
                        textAlign: 'left',
                        color: 'var(--text-color)',
                      }}
                    >
                      항목
                    </th>
                    <th
                      style={{
                        padding: '0.55rem 0.75rem',
                        textAlign: 'left',
                        color: 'var(--text-color)',
                      }}
                    >
                      현재 구조
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['Access 인증', 'JWT Bearer (짧은 TTL)'],
                    ['Refresh 저장', 'refreshToken + refreshExpiration 두 컬럼'],
                    ['OAuth 연결', '(provider, providerId) + 동일 이메일 연결'],
                    ['반려 소유 검증', 'JWT subject ↔ Pet.user.id 대조'],
                    ['제재 정리', '로그인/OAuth 진입 + 배치 스케줄러 이중 처리'],
                  ].map(([label, value], i, arr) => (
                    <tr
                      key={label}
                      style={{
                        borderBottom:
                          i < arr.length - 1
                            ? '1px solid var(--nav-border)'
                            : 'none',
                      }}
                    >
                      <td
                        style={{
                          padding: '0.55rem 0.75rem',
                          color: 'var(--text-color)',
                          fontWeight: 600,
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {label}
                      </td>
                      <td style={{ padding: '0.55rem 0.75rem' }}>{value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Card>

            <Card style={{ marginBottom: '1rem' }}>
              <table
                style={{
                  width: '100%',
                  borderCollapse: 'collapse',
                  fontSize: '0.9rem',
                  color: 'var(--text-secondary)',
                }}
              >
                <thead>
                  <tr style={{ borderBottom: '1px solid var(--nav-border)' }}>
                    <th
                      style={{
                        padding: '0.55rem 0.75rem',
                        textAlign: 'left',
                        color: 'var(--text-color)',
                      }}
                    >
                      지표
                    </th>
                    <th
                      style={{
                        padding: '0.55rem 0.75rem',
                        textAlign: 'left',
                        color: 'var(--text-color)',
                      }}
                    >
                      Before
                    </th>
                    <th
                      style={{
                        padding: '0.55rem 0.75rem',
                        textAlign: 'left',
                        color: 'var(--text-color)',
                      }}
                    >
                      After
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['로그인 쿼리 수', '21개', '4개 (↓81%)'],
                    ['응답 시간', '305ms', '55ms'],
                    ['메모리', '0.58MB', '0.13MB'],
                  ].map(([label, before, after], i, arr) => (
                    <tr
                      key={label}
                      style={{
                        borderBottom:
                          i < arr.length - 1
                            ? '1px solid var(--nav-border)'
                            : 'none',
                      }}
                    >
                      <td
                        style={{
                          padding: '0.55rem 0.75rem',
                          color: 'var(--text-color)',
                        }}
                      >
                        {label}
                      </td>
                      <td style={{ padding: '0.55rem 0.75rem' }}>{before}</td>
                      <td
                        style={{
                          padding: '0.55rem 0.75rem',
                          color: 'var(--text-color)',
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
                  color: 'var(--text-secondary)',
                  fontSize: '0.88rem',
                  marginTop: '0.75rem',
                  marginBottom: 0,
                  lineHeight: '1.7',
                }}
              >
                로그인 응답 구성 기준·테스트 DB·
                <code
                  style={{
                    backgroundColor: 'var(--bg-color)',
                    padding: '0.1rem 0.3rem',
                    borderRadius: '4px',
                  }}
                >
                  entityManager.clear()
                </code>{' '}
                후 측정. 상세는{' '}
                <Link
                  to="/domains/user/optimization"
                  style={{ color: 'var(--link-color)', textDecoration: 'none' }}
                >
                  성능 최적화
                </Link>{' '}
                페이지 참고.
              </p>
            </Card>

            <Card>
              <h3
                style={{
                  marginBottom: '0.75rem',
                  color: 'var(--text-color)',
                  fontSize: '1rem',
                }}
              >
                데이터 흐름
              </h3>
              <MermaidDiagram chart={flowDiagram} />
            </Card>
          </section>

          <section
            id="design"
            style={{ marginBottom: '3rem', scrollMarginTop: '2rem' }}
          >
            <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>
              기술 결정
            </h2>

            <Card style={{ marginBottom: '1rem' }}>
              <h3
                style={{
                  marginBottom: '0.75rem',
                  color: 'var(--text-color)',
                  fontSize: '1rem',
                }}
              >
                A. JWT + Refresh
              </h3>
              <ul
                style={{
                  listStyle: 'none',
                  padding: 0,
                  margin: 0,
                  color: 'var(--text-secondary)',
                  lineHeight: '1.8',
                }}
              >
                {li('Access는 짧은 TTL JWT (기본 15분) — 무상태 검증')}
                {li('Refresh는 DB 컬럼에 저장 — refreshToken + refreshExpiration')}
                {li('사용자당 최근 1개만 유지 — 후발 로그인이 이전 세션 무효화')}
                {li('로그인 시 BANNED / SUSPENDED 선확인 후 토큰 발급')}
              </ul>
              <CodeBlock>{`// 제재 상태 확인 후 Access + Refresh 발급
if (user.getStatus() == UserStatus.BANNED) throw ...;
if (user.getStatus() == UserStatus.SUSPENDED) throw ...;

String refreshToken = jwtUtil.createRefreshToken();
user.setRefreshToken(refreshToken);
user.setRefreshExpiration(LocalDateTime.now().plusDays(1));`}</CodeBlock>
            </Card>

            <Card style={{ marginBottom: '1rem' }}>
              <h3
                style={{
                  marginBottom: '0.75rem',
                  color: 'var(--text-color)',
                  fontSize: '1rem',
                }}
              >
                B. OAuth 계정 연결
              </h3>
              <ul
                style={{
                  listStyle: 'none',
                  padding: 0,
                  margin: 0,
                  color: 'var(--text-secondary)',
                  lineHeight: '1.8',
                }}
              >
                {li('소셜 로그인 → 동일 이메일이면 기존 계정에 SocialUser 연결')}
                {li('없으면 신규 생성 — Unique 충돌 대비 재시도 경로 포함')}
                {li('성공 후 로컬 로그인과 동일하게 Access / Refresh 발급')}
              </ul>
              <CodeBlock>{`// 이메일 기준 기존 계정 연결, 없으면 신규 생성
private Users createOrLinkUser(..., String email, ...) {
    Optional<Users> existing = usersRepository.findByEmail(email);
    if (existing.isPresent()) {
        linkSocialAccount(existing.get(), provider, providerId, attributes);
        return existing.get();
    }
    // Unique 충돌 대비 재시도 로직 포함
    return createNewUserWithRetry(provider, providerId, email, name, attributes);
}`}</CodeBlock>
            </Card>

            <Card style={{ marginBottom: '1rem' }}>
              <h3
                style={{
                  marginBottom: '0.75rem',
                  color: 'var(--text-color)',
                  fontSize: '1rem',
                }}
              >
                C. Pet 소유 검증
              </h3>
              <ul
                style={{
                  listStyle: 'none',
                  padding: 0,
                  margin: 0,
                  color: 'var(--text-secondary)',
                  lineHeight: '1.8',
                }}
              >
                {li('Pet은 단순 프로필이 아닌 사용자 자산 — 케어·실종 도메인이 참조')}
                {li('조회·수정·삭제·복구 4개 경로 모두 소유권 검증 통과 필수')}
                {li('프로필 이미지는 File 도메인과 동기화')}
              </ul>
              <CodeBlock>{`// JWT subject ↔ 펫 소유자 ID 대조
private static void assertPetOwnedBy(Pet pet, String ownerUserId) {
    if (!pet.getUser().getId().equals(ownerUserId))
        throw new UserForbiddenException(...);
}`}</CodeBlock>
            </Card>

            <Card style={{ marginBottom: '1rem' }}>
              <h3
                style={{
                  marginBottom: '0.75rem',
                  color: 'var(--text-color)',
                  fontSize: '1rem',
                }}
              >
                D. 제재 상태 동기화
              </h3>
              <ul
                style={{
                  listStyle: 'none',
                  padding: 0,
                  margin: 0,
                  color: 'var(--text-secondary)',
                  lineHeight: '1.8',
                }}
              >
                {li('경고 3회 도달 시 자동 이용제한 3일 적용')}
                {li('만료된 정지 해제: 배치 스케줄러 + 로그인/OAuth 진입 시 이중 처리')}
                {li('SUSPEND_USER 신고 액션은 실제로 addBan() 연결 — 이름 불일치 (한계)')}
              </ul>
              <CodeBlock>{`private static final int WARNING_THRESHOLD = 3;
private static final int AUTO_SUSPENSION_DAYS = 3;

// 경고 3회 → 자동 이용제한
public UserSanction addWarning(...) {
    ...
    if (user.getWarningCount() >= WARNING_THRESHOLD)
        addSuspension(userId, "경고 누적", adminId, reportId, AUTO_SUSPENSION_DAYS);
}

// 만료 정지 해제 (스케줄러 + 로그인 시 모두 호출)
public void releaseExpiredSuspensions() {
    sanctionRepository.findExpiredSuspensions(LocalDateTime.now())
        .forEach(sanction -> { user.setStatus(UserStatus.ACTIVE); ... });
}`}</CodeBlock>
            </Card>

            <Card>
              <h3
                style={{
                  marginBottom: '0.75rem',
                  color: 'var(--text-color)',
                  fontSize: '1rem',
                }}
              >
                E. 보안 트레이드오프
              </h3>
              <ul
                style={{
                  listStyle: 'none',
                  padding: 0,
                  margin: 0,
                  color: 'var(--text-secondary)',
                  lineHeight: '1.8',
                }}
              >
                {li('Access JWT 유효 기간 중 제재 상태 재평가 없음 — TTL에 의존')}
                {li('Refresh Token 회전 미적용 — 탈취 시 TTL 내 재사용 가능')}
                {li('OAuth / SSE 등에서 토큰을 쿼리 스트링으로 전달 — 노출 표면 존재')}
                {li('이 트레이드오프들은 아래 한계 섹션에 명시')}
              </ul>
            </Card>
          </section>

          <section
            id="limits"
            style={{ marginBottom: '3rem', scrollMarginTop: '2rem' }}
          >
            <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>
              한계 &amp; 다음 개선
            </h2>
            <Card>
              <p
                style={{
                  color: 'var(--text-secondary)',
                  fontSize: '0.9rem',
                  lineHeight: '1.7',
                  marginTop: 0,
                  marginBottom: '0.75rem',
                }}
              >
                인증 구조의 기본 흐름은 갖췄지만, 보안 정책 일부는 현실적인
                트레이드오프를 선택한 상태입니다.
              </p>
              <ul
                style={{
                  listStyle: 'none',
                  padding: 0,
                  margin: 0,
                  color: 'var(--text-secondary)',
                  lineHeight: '1.8',
                }}
              >
                {li(
                  'Access JWT 유효 동안 BANNED / SUSPENDED 상태를 매 요청 재평가하지 않음 — 제재 즉시성은 Access TTL에 의존'
                )}
                {li(
                  'Refresh Token 회전 미적용 — 사용자당 최근 1개 문자열만 갱신, 탈취 시 TTL 내 재사용 가능'
                )}
                {li(
                  'OAuth 성공 후 쿼리 스트링 토큰 리다이렉트 구간 존재 — 브라우저 기록·Referer 노출 표면'
                )}
                {li(
                  'JwtAuthenticationFilter가 SSE 등을 위해 token 쿼리 파라미터도 허용 — URL 노출 표면'
                )}
                {li(
                  'ReportActionType.SUSPEND_USER가 실제로는 addBan()으로 연결 — 이름과 동작 불일치'
                )}
              </ul>
            </Card>
          </section>

          <section
            id="docs"
            style={{ marginBottom: '3rem', scrollMarginTop: '2rem' }}
          >
            <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>
              관련 페이지
            </h2>
            <Card>
              <ul
                style={{
                  listStyle: 'none',
                  padding: 0,
                  margin: 0,
                  color: 'var(--text-secondary)',
                  lineHeight: '2',
                }}
              >
                <li>
                  •{' '}
                  <Link
                    to="/domains/user/optimization"
                    style={{ color: 'var(--link-color)', textDecoration: 'none' }}
                  >
                    User 성능 최적화
                  </Link>
                  {' — 로그인 N+1 상세, Before/After'}
                </li>
                <li>
                  •{' '}
                  <Link
                    to="/domains/user/refactoring"
                    style={{ color: 'var(--link-color)', textDecoration: 'none' }}
                  >
                    User 리팩토링
                  </Link>
                  {' — DTO record, 코드 구조'}
                </li>
                <li>
                  •{' '}
                  <a
                    href={PETORY_USER_ARCH_DOC}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: 'var(--link-color)', textDecoration: 'none' }}
                  >
                    Petory — User 도메인 아키텍처 (GitHub)
                  </a>
                  {' — 전체 구조, 식별자 체계, 보안 갭'}
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

export default UserDomainV2;
