import { Link } from 'react-router-dom';
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
  'https://github.com/makkong1/Petory/blob/main/docs/architecture/user/%EC%82%AC%EC%9A%A9%EC%9E%90%20%EC%9D%B8%EC%A6%9D%20%EB%B0%8F%20%ED%94%84%EB%A1%9C%ED%95%84%20%EC%95%84%ED%82%A4%ED%85%8D%EC%B2%98.md';
const PETORY_USER_DOMAIN_DOC =
  'https://github.com/makkong1/Petory/blob/main/docs/domains/user.md';
const PETORY_AUTH_SERVICE =
  'https://github.com/makkong1/Petory/blob/main/backend/main/java/com/linkup/Petory/domain/user/service/AuthService.java';
const PETORY_OAUTH2_SERVICE =
  'https://github.com/makkong1/Petory/blob/main/backend/main/java/com/linkup/Petory/domain/user/service/OAuth2Service.java';
const PETORY_PET_SERVICE =
  'https://github.com/makkong1/Petory/blob/main/backend/main/java/com/linkup/Petory/domain/user/service/PetService.java';
const PETORY_USER_SANCTION_SERVICE =
  'https://github.com/makkong1/Petory/blob/main/backend/main/java/com/linkup/Petory/domain/user/service/UserSanctionService.java';
const PETORY_JWT_FILTER =
  'https://github.com/makkong1/Petory/blob/main/backend/main/java/com/linkup/Petory/filter/JwtAuthenticationFilter.java';
const PETORY_REPORT_DOC =
  'https://github.com/makkong1/Petory/blob/main/docs/domains/report.md';
const PETORY_FILE_DOC =
  'https://github.com/makkong1/Petory/blob/main/docs/domains/file.md';

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
    'CustomUserDetails',
    'OAuth 계정 연결',
    '프로필 조합',
    'Pet 소유 검증',
    '제재 상태 동기화',
  ];

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
            인증, 소셜 계정 연결, 이메일 인증, 반려동물 소유권, 제재 상태를
            함께 관리하는 신원 기반 도메인입니다. 거의 모든 보호 API의 입구
            역할을 하기 때문에 보안 구조와 트레이드오프가 코드에 직접
            반영됩니다. 현재 구조는 Access JWT와 DB 저장 Refresh Token을
            조합하고, 보호 API에서는 <code>CustomUserDetails</code>로 사용자
            식별자를 통일합니다. OAuth 계정은 provider 식별자와 동일 이메일
            연결로 통합하고, 프로필·Pet·제재 흐름은 다른 도메인이 신뢰할 수
            있는 사용자 상태를 제공합니다.
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
                    ['Access 인증', 'JWT Bearer, subject는 Users.id'],
                    ['보호 API 주체', 'CustomUserDetails(idx, loginId, role, emailVerified, status)'],
                    ['Access TTL', 'jwt.access-token-expiration-ms, 기본 15분'],
                    ['Refresh 저장', 'Users.refreshToken + refreshExpiration'],
                    ['Refresh TTL', '1일, refresh 성공 시 기존 refresh 유지'],
                    ['OAuth 연결', 'provider + providerId 우선, 없으면 동일 email 계정 연결'],
                    ['소셜 신규 사용자', 'nickname이 비어 있으면 needsNickname=true callback'],
                    ['OAuth callback', 'access/refresh token을 query parameter로 redirect'],
                    ['Email 인증', 'JWT token + Redis pre-registration 상태 24시간'],
                    ['내 프로필 조회', 'User + Pet + Care/Location 리뷰 요약 + Meetup 히스토리 조합'],
                    ['반려 소유 검증', 'JWT subject ↔ Pet.user.id 대조'],
                    ['제재 정리', '로그인/OAuth 진입 + 배치 스케줄러 이중 처리'],
                    ['관리자 사용자 목록', 'paging API, role/status/q 필터'],
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
                    ['채팅방 목록 관련 쿼리 수', '21개', '4개 (↓81%)'],
                    ['응답 시간', '305ms', '55ms'],
                    ['메모리', '0.58MB', '0.13MB'],
                    ['로그인 DTO 생성', '토큰 발급 후 사용자 재조회', '이미 로드한 Users 엔티티 변환'],
                    ['회원가입 중복 검사', '필드별 개별 조회 가능성', 'nickname/username/email 단일 쿼리'],
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
                로그인 응답에 채팅방 목록이 엮였던 N+1 개선 수치입니다. 측정
                조건은 채팅방 10개, 참여자 30명, 메시지 200개, 테스트 DB,{' '}
                <code
                  style={{
                    backgroundColor: 'var(--bg-color)',
                    padding: '0.1rem 0.3rem',
                    borderRadius: '4px',
                  }}
                >
                  entityManager.clear()
                </code>{' '}
                후 조회입니다. 일반 로그인 로직 전체의 항상값은 아니며, 상세는{' '}
                <Link
                  to="/domains/user/optimization"
                  style={{ color: 'var(--link-color)', textDecoration: 'none' }}
                >
                  성능 최적화
                </Link>{' '}
                페이지 참고. 최신 User 문서 기준으로 로그인/refresh 응답 DTO는
                토큰 발급 시 이미 로드한 <code>Users</code> 엔티티에서 생성합니다.
              </p>
            </Card>

            <Card>
              <h3
                style={{
                  marginBottom: '0.65rem',
                  color: 'var(--text-color)',
                  fontSize: '1rem',
                }}
              >
                데이터 흐름
              </h3>
              <p
                style={{
                  color: 'var(--text-secondary)',
                  fontSize: '0.88rem',
                  lineHeight: '1.75',
                  margin: '0 0 0.65rem',
                }}
              >
                시퀀스 다이어그램은 도메인별로 두지 않고 통합 페이지에만 있습니다.
              </p>
              <Link
                to="/domains/flows?tab=user"
                style={{
                  color: 'var(--link-color)',
                  fontWeight: 600,
                  textDecoration: 'none',
                }}
              >
                User 시퀀스 보기 →
              </Link>
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
                {li('refresh 성공 시 Refresh Token은 유지하고 Access Token만 재발급')}
                {li('logout은 DB refresh token과 만료 시각을 null로 정리')}
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
                {li('신규 소셜 사용자는 UUID suffix 기반 id/username 생성')}
                {li('nickname이 비어 있으면 callback에 needsNickname=true 추가')}
                {li('성공 후 Access / Refresh 발급, query parameter redirect')}
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
                C. 현재 사용자 식별과 프로필 조합
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
                {li('JwtAuthenticationFilter는 JWT subject인 Users.id로 UserDetails를 로드')}
                {li('UsersDetailsServiceImpl은 Spring 기본 User 대신 CustomUserDetails를 principal로 저장')}
                {li('UserProfileController와 PetController는 @AuthenticationPrincipal을 직접 사용')}
                {li('기존 컨트롤러는 AuthenticatedUserIdResolver fallback 경로로 호환')}
                {li('GET /api/users/me는 User/Pet과 Care·Location 리뷰 요약, Meetup 히스토리를 조합')}
              </ul>
              <CodeBlock>{`Authorization: Bearer {accessToken}
  -> JwtAuthenticationFilter
  -> JwtUtil.getIdFromToken(token) = Users.id
  -> UsersDetailsServiceImpl.loadUserByUsername(loginId)
  -> CustomUserDetails(idx, loginId, role, emailVerified, status)
  -> @AuthenticationPrincipal 또는 AuthenticatedUserIdResolver`}</CodeBlock>
            </Card>

            <Card style={{ marginBottom: '1rem' }}>
              <h3
                style={{
                  marginBottom: '0.75rem',
                  color: 'var(--text-color)',
                  fontSize: '1rem',
                }}
              >
                D. Pet 소유 검증
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
                {li('PetController는 CustomUserDetails.loginId를 서비스에 전달')}
                {li('조회·수정·삭제·복구 4개 경로 모두 소유권 검증 통과 필수')}
                {li('프로필 이미지는 File 도메인과 동기화')}
                {li('PetType.ETC는 breed 필수')}
              </ul>
              <CodeBlock>{`// JWT subject ↔ 펫 소유자 ID 대조
private static void assertPetOwnedBy(Pet pet, String ownerUserId) {
    Users owner = pet.getUser();
    String ownerLoginId = owner != null ? owner.getId() : null;
    if (ownerLoginId == null || !ownerLoginId.equals(ownerUserId)) {
        throw UserForbiddenException.ownPetOnly();
    }
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
                E. 제재 상태 동기화
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
                {li('ReportActionType.SUSPEND_USER는 현재 3일 이용제한 addSuspension 경로로 연결')}
                {li('addWarning()은 경고 증가 후 최신 warning count 확인을 위해 user를 다시 조회')}
              </ul>
              <CodeBlock>{`private static final int WARNING_THRESHOLD = 3;
private static final int AUTO_SUSPENSION_DAYS = 3;

// 경고 3회 → 자동 이용제한
public UserSanction addWarning(...) {
    ...
    if (user.getWarningCount() >= WARNING_THRESHOLD)
        addSuspension(userId, "경고 누적", adminId, reportId, AUTO_SUSPENSION_DAYS);
}

switch (actionType) {
    case WARN_USER -> addWarning(userId, reason, adminId, reportId);
    case SUSPEND_USER -> addSuspension(userId, reason, adminId, reportId, AUTO_SUSPENSION_DAYS);
    default -> { }
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
                F. 남은 구조적 과제
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
                {li('JwtAuthenticationFilter는 validateToken, isTokenExpired, getIdFromToken을 각각 호출')}
                {li('AuthController.validate와 logout은 Authorization header를 직접 파싱')}
                {li('OAuth callback은 token을 query parameter로 전달해 노출 표면이 남아 있음')}
                {li('GET /api/pets/type/{petType}는 현재 사용자 소유 필터가 아닌 타입 기준 전체 조회')}
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
                최신 문서 기준으로 주요 리팩토링은 반영됐지만, 아래 항목은 아직
                명시적으로 남아 있는 구조적 과제입니다.
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
                  'OAuth 성공 후 쿼리 스트링 토큰 리다이렉트 구간 존재 — 브라우저 기록·Referer 노출 표면'
                )}
                {li(
                  'JwtAuthenticationFilter의 JWT 검증/만료확인/subject 추출은 아직 claims를 여러 번 파싱'
                )}
                {li(
                  'AuthController.validateToken()과 logout()은 아직 Authorization header를 직접 파싱'
                )}
                {li(
                  'OAuth2 경로의 제재 예외는 일반 로그인처럼 도메인 예외로 내려가지 않고 redirect error query로 전달'
                )}
                {li(
                  'GET /api/pets/type/{petType}는 사용자 소유 필터가 없는 타입 기준 전체 조회'
                )}
                {li(
                  'UserSanctionService.addWarning()은 경고 증가 후 최신 count 확인을 위해 user를 다시 조회'
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
                    href={PETORY_USER_DOMAIN_DOC}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: 'var(--link-color)', textDecoration: 'none' }}
                  >
                    Petory — User 도메인 문서 (GitHub)
                  </a>
                  {' — API 범위, 엔티티, 현재 구현 기준'}
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
                <li>
                  •{' '}
                  <Link
                    to="/domains/flows?tab=user"
                    style={{ color: 'var(--link-color)', textDecoration: 'none' }}
                  >
                    User 시퀀스
                  </Link>
                  {' — 로그인, OAuth, Pet 소유 검증 흐름'}
                </li>
                <li>
                  •{' '}
                  <a
                    href={PETORY_REPORT_DOC}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: 'var(--link-color)', textDecoration: 'none' }}
                  >
                    Report 도메인 문서
                  </a>
                  {' — 신고 처리와 제재 연결'}
                </li>
                <li>
                  •{' '}
                  <a
                    href={PETORY_FILE_DOC}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: 'var(--link-color)', textDecoration: 'none' }}
                  >
                    File 도메인 문서
                  </a>
                  {' — Pet 프로필 이미지 첨부 동기화'}
                </li>
                <li>
                  •{' '}
                  <a
                    href={PETORY_AUTH_SERVICE}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: 'var(--link-color)', textDecoration: 'none' }}
                  >
                    AuthService.java
                  </a>
                  {' — 로그인, refresh 발급'}
                </li>
                <li>
                  •{' '}
                  <a
                    href={PETORY_OAUTH2_SERVICE}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: 'var(--link-color)', textDecoration: 'none' }}
                  >
                    OAuth2Service.java
                  </a>
                  {' — 소셜 계정 연결'}
                </li>
                <li>
                  •{' '}
                  <a
                    href={PETORY_PET_SERVICE}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: 'var(--link-color)', textDecoration: 'none' }}
                  >
                    PetService.java
                  </a>
                  {' — Pet 소유 검증'}
                </li>
                <li>
                  •{' '}
                  <a
                    href={PETORY_USER_SANCTION_SERVICE}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: 'var(--link-color)', textDecoration: 'none' }}
                  >
                    UserSanctionService.java
                  </a>
                  {' — 경고, 정지, 만료 해제'}
                </li>
                <li>
                  •{' '}
                  <a
                    href={PETORY_JWT_FILTER}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: 'var(--link-color)', textDecoration: 'none' }}
                  >
                    JwtAuthenticationFilter.java
                  </a>
                  {' — Bearer token 검증과 principal 생성'}
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
