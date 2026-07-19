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
const PETORY_REPORT_DOC =
  'https://github.com/makkong1/Petory/blob/main/docs/domains/report.md';
const PETORY_FILE_DOC =
  'https://github.com/makkong1/Petory/blob/main/docs/domains/file.md';

function UserDomainV2() {
  const sections = [
    { id: 'pillars', title: '핵심 기능' },
    { id: 'intro', title: '도메인 개요' },
    { id: 'design', title: '기술 결정' },
    { id: 'docs', title: '관련 페이지' },
  ];

  const corePillars = [
    'JWT 인증',
    'CustomUserDetails',
    'OAuth 계정 연결',
    '프로필 조합',
    'Pet 소유 검증',
    '제재 상태 동기화',
    '휴면 계정 관리',
  ];

  const li = (text) => <li style={{ marginBottom: '0.35rem' }}>• {text}</li>;

  return (
    <div className="domain-page-wrapper" style={{ padding: '2rem 0' }}>
      <div
        className="domain-page-container"
        style={{ display: 'flex', gap: '2rem', alignItems: 'flex-start' }}
      >
        <div className="domain-page-content" style={{ flex: 1 }}>
          <div className="domain-hero">
            <span className="eyebrow">User</span>
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
            로그인만 담당하는 얇은 계층이 아니라, 인증·소셜 연결·이메일 인증·
            반려동물 소유권·제재 상태를 함께 관리하는 <strong>신원 도메인</strong>입니다.
            거의 모든 보호 API의 입구라 보안 구조와 트레이드오프가 코드에 그대로
            드러납니다. Access JWT + DB 저장 Refresh Token을 조합하고, 보호 API는
            <code>CustomUserDetails</code>로 사용자 식별자를 통일합니다. OAuth는
            provider 식별자·동일 이메일 연결로 통합해, 프로필·Pet·제재 상태를
            다른 도메인이 신뢰할 수 있게 제공합니다.
          </p>

          </div>

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
                    ['휴면 계정', '1년 미로그인 시 자정 배치로 isDormant 전환, 일반 로그인 재시도로 즉시 해제'],
                    ['탈퇴 계정 중복 검사', 'findByNickname/Username/Email이 삭제되지 않은 사용자만 조회 → 탈퇴 계정의 값 재사용 가능'],
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
                    ['채팅방 목록 관련 쿼리 수', '41개', '4개 (↓90%)'],
                    ['응답 시간', '167ms', '70ms'],
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
                  to="/domains/user/detail"
                  style={{ color: 'var(--link-color)', textDecoration: 'none' }}
                >
                  인증·성능 상세
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
                F. 휴면 계정 (2026-07-09)
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
                {li('isDormant는 UserStatus와 독립된 필드 — "정지 중이면서 동시에 휴면"도 가능')}
                {li('1년간 미로그인 계정은 매일 자정 배치가 isDormant/dormantAt으로 전환')}
                {li('일반 로그인만 차단(OAuth2 제외), confirmReactivate=true로 본인이 재시도하면 즉시 해제')}
                {li('lastLoginAt은 개인로그인·OAuth2가 같은 Users row를 공유해 갱신 — 한쪽 채널만 꾸준히 써도 휴면 전환 자체가 없음')}
                {li('이미 휴면 상태에서 OAuth2로 로그인하면 차단 없이 플래그만 조용히 해제')}
              </ul>
              <CodeBlock>{`// 로그인 시 휴면 확인 (일반 로그인만)
if (Boolean.TRUE.equals(user.getIsDormant())) {
    if (!confirmReactivate) throw new UserDormantException();
    user.setIsDormant(false);
    user.setDormantAt(null);
}

// 매일 자정 배치
@Modifying
@Query("UPDATE Users u SET u.isDormant = true, u.dormantAt = :now " +
       "WHERE u.isDormant = false AND u.isDeleted = false AND (" +
       "  (u.lastLoginAt IS NOT NULL AND u.lastLoginAt < :cutoff) OR " +
       "  (u.lastLoginAt IS NULL AND u.createdAt < :cutoff))")
int markDormantUsers(@Param("cutoff") LocalDateTime cutoff, @Param("now") LocalDateTime now);`}</CodeBlock>
              <p
                style={{
                  color: 'var(--text-secondary)',
                  fontSize: '0.85rem',
                  lineHeight: '1.7',
                  margin: '0.65rem 0 0',
                }}
              >
                이유: OAuth2는 이미 Google/Naver 등 제3자 인증을 거쳤으므로 로그인 성공 자체를 본인 확인으로
                볼 수 있어, 비밀번호 탈취 위험이 있는 개인로그인과 신뢰 수준을 다르게 취급했습니다. 새
                엔드포인트 없이 기존 <code>POST /api/auth/login</code>에 <code>confirmReactivate</code> 필드만
                추가했고, 비밀번호는 이미 <code>authenticationManager.authenticate()</code>에서 검증되므로
                재활성화에 별도 인증 절차를 두지 않았습니다. OAuth2 자체의 차단/재확인 플로우는 작업량 대비
                이득이 크지 않아 의도적으로 범위에서 뺐습니다.
              </p>
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
                    to="/domains/cases?case=list-n-plus-one"
                    style={{ color: 'var(--link-color)', textDecoration: 'none' }}
                  >
                    대표 개선 사례 보기
                  </Link>
                  {' — N+1 성능 개선 (Board · Care · Chat · MissingPet)'}
                </li>
                <li>
                  •{' '}
                  <Link
                    to="/domains/cases"
                    style={{ color: 'var(--link-color)', textDecoration: 'none' }}
                  >
                    전체 쿼리 감사
                  </Link>
                  {' — 펫 목록이 7,667건을 전부 반환하던 것 · Admin 목록 정렬 인덱스'}
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
