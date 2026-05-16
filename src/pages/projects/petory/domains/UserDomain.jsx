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
        ...style
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
        margin: '0.75rem 0 0'
      }}
    >
      {children}
    </pre>
  );
}

function UserDomain() {
  const sections = [
    { id: 'intro', title: '도메인 개요' },
    { id: 'features', title: '주요 기능' },
    { id: 'service-logic', title: '핵심 서비스 로직' },
    { id: 'architecture', title: '아키텍처' },
    { id: 'troubleshooting', title: '트러블슈팅' },
    { id: 'performance', title: '성능 최적화' },
    { id: 'summary', title: '핵심 포인트' },
    { id: 'docs', title: '관련 페이지' }
  ];

  const entityDiagram = `erDiagram
    Users ||--o{ SocialUser : "has"
    Users ||--o{ UserSanction : "has"
    Users ||--o{ Pet : "owns"
    Pet ||--o{ PetVaccination : "has"

    Users {
        Long idx PK
        String id
        String username
        String email
        String phone
        String password
        Role role
        String location
        String petInfo
        String refreshToken
        LocalDateTime lastLoginAt
        UserStatus status
        Integer warningCount
        LocalDateTime suspendedUntil
        Boolean isDeleted
    }

    Pet {
        Long idx PK
        Long user_idx FK
        String name
        String species
        String breed
        Integer age
        String gender
        String imageUrl
        String description
    }

    SocialUser {
        Long idx PK
        Long user_idx FK
        String provider
        String providerId
    }

    UserSanction {
        Long idx PK
        Long user_idx FK
        Long sanctionedBy_idx FK
        SanctionType type
        String reason
        LocalDateTime startedAt
        LocalDateTime endedAt
    }

    PetVaccination {
        Long idx PK
        Long pet_idx FK
        String vaccineName
        LocalDate vaccinationDate
        LocalDate nextDueDate
    }`;

  const li = (text) => <li style={{ marginBottom: '0.35rem' }}>• {text}</li>;

  return (
    <div className="domain-page-wrapper" style={{ padding: '2rem 0' }}>
      <div className="domain-page-container" style={{ display: 'flex', gap: '2rem', alignItems: 'flex-start' }}>
        <div className="domain-page-content" style={{ flex: 1 }}>
          <h1 style={{ marginBottom: '0.5rem', color: 'var(--text-color)' }}>유저 도메인</h1>
          <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', marginBottom: '2.5rem', fontSize: '0.95rem' }}>
            User 도메인은 인증·인가, 소셜 연동, 이메일 인증·제재, 반려동물(Pet)·예방접종까지 한 레이어에서 다룹니다. 서비스 전역에서 참조되는 사용자 루트이기 때문에
            로그인 경로 성능과 제재 동시성, 소셜 가입 레이스가 특히 신경 쓰였습니다.
          </p>

          <section id="intro" style={{ marginBottom: '3rem', scrollMarginTop: '2rem' }}>
            <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>도메인 개요</h2>
            <Card style={{ marginBottom: '1rem' }}>
              <p style={{ lineHeight: '1.8', color: 'var(--text-secondary)', marginBottom: '0.75rem' }}>
                `docs/domains/user.md` 기준으로 User 도메인의 핵심은{' '}
                <strong style={{ color: 'var(--text-color)' }}>
                  신뢰할 수 있는 인증 상태를 빠르게 만들고, 제재·이메일 인증 같은 정책을 사용자 생명주기 안에 안정적으로 끼워 넣는 것
                </strong>
                입니다.
              </p>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, color: 'var(--text-secondary)', lineHeight: '1.8' }}>
                {li('JWT(Access/Refresh) + 폼 로그인 + OAuth2(Google/Naver)로 로그인 흐름을 제공합니다.')}
                {li('이메일 인증은 회원가입 전·비밀번호 변경·펫케어/모임 이용 등 목적별로 검증 포인트를 나눕니다.')}
                {li('경고 누적·이용 제한·영구 차단은 관리자 API와 연동되며 동시 증가는 DB 원자 연산으로 막았습니다.')}
              </ul>
            </Card>
            <Card>
              <h3 style={{ marginBottom: '0.75rem', color: 'var(--text-color)', fontSize: '1rem' }}>핵심 성과 (로그인 N+1 개선 예시)</h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, color: 'var(--text-secondary)', lineHeight: '1.8' }}>
                <li>• 로그인 시 연관 로딩 쿼리: <strong style={{ color: 'var(--text-color)' }}>21개 → 4개</strong> (약 81% 감소)</li>
                <li>• 실행 시간: <strong style={{ color: 'var(--text-color)' }}>305ms → 55ms</strong></li>
                <li>• 메모리 사용량: <strong style={{ color: 'var(--text-color)' }}>0.58MB → 0.13MB</strong></li>
              </ul>
              <p style={{ color: 'var(--text-secondary)', lineHeight: '1.7', marginTop: '0.75rem', marginBottom: 0, fontSize: '0.9rem' }}>
                수치 근거·시퀀스·테스트 코드는{' '}
                <Link to="/domains/user/optimization" style={{ color: 'var(--link-color)', textDecoration: 'none' }}>
                  User 성능 최적화 페이지
                </Link>
                에 정리했습니다.
              </p>
            </Card>
          </section>

          <section id="features" style={{ marginBottom: '3rem', scrollMarginTop: '2rem' }}>
            <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>주요 기능</h2>

            <Card style={{ marginBottom: '1rem' }}>
              <h3 style={{ marginBottom: '0.75rem', color: 'var(--text-color)', fontSize: '1rem' }}>1. 회원가입·로그인 (JWT)</h3>
              <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', marginBottom: '0.5rem' }}>
                폼 회원가입 후 Access(짧음) + Refresh(길음) 발급, Refresh 로 Access 재발급, 제재·차단 상태일 때 로그인 차단.
              </p>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, color: 'var(--text-secondary)', lineHeight: '1.8' }}>
                {li('비밀번호 BCrypt 저장, JwtAuthenticationFilter에서 토큰 검증')}
                {li('제재 또는 삭제 상태를 로그인 흐름에서 선제 검증')}
              </ul>
            </Card>

            <Card style={{ marginBottom: '1rem' }}>
              <h3 style={{ marginBottom: '0.75rem', color: 'var(--text-color)', fontSize: '1rem' }}>2. 소셜 로그인 (Google, Naver)</h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, color: 'var(--text-secondary)', lineHeight: '1.8' }}>
                {li('기존 SocialUser 또는 이메일 매칭 시 연결 후 동일하게 JWT 발급')}
                {li('신규면 회원 생성 후 로그인, 닉네임 미설정 시 리다이렉트 플래그 처리')}
                {li('Provider별 OAuth2UserService에서 식별자·프로필 필드 표준화')}
                {li('Naver는 TokenResponse 형식 차이를 커스텀 클라이언트로 흡수')}
              </ul>
            </Card>

            <Card style={{ marginBottom: '1rem' }}>
              <h3 style={{ marginBottom: '0.75rem', color: 'var(--text-color)', fontSize: '1rem' }}>3. 이메일 인증</h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, color: 'var(--text-secondary)', lineHeight: '1.8' }}>
                {li('소셜 로그인은 검증 완료로 간주, 일반 회원은 Redis 임시 토큰 + 메일 플로우')}
                {li('비밀번호 변경·펫케어·모임 등 민감 기능 전 이메일 인증 검사')}
                {li('미인증 사용자는 커뮤니티/위치 조회 위주, 일부 기능은 예외 처리')}
              </ul>
            </Card>

            <Card style={{ marginBottom: '1rem' }}>
              <h3 style={{ marginBottom: '0.75rem', color: 'var(--text-color)', fontSize: '1rem' }}>4. 제재 시스템</h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, color: 'var(--text-secondary)', lineHeight: '1.8' }}>
                {li('관리자: 경고·이용 제한·영구 차단, 경고 3회 자동 이용 제한 규칙')}
                {li('만료 일정 스케줄러와 연계해 제한 해제')}
                {li('경고 카운트는 DB 단일 UPDATE로 원자 증가 (Lost Update 방지)')}
              </ul>
            </Card>

            <Card>
              <h3 style={{ marginBottom: '0.75rem', color: 'var(--text-color)', fontSize: '1rem' }}>5. 반려동물 및 예방접종</h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, color: 'var(--text-secondary)', lineHeight: '1.8' }}>
                {li('내 반려동물 CRUD, 프로필 이미지')}
                {li('예방접종 이력 Pet 하위에서 관리')}
              </ul>
            </Card>
          </section>

          <section id="service-logic" style={{ marginBottom: '3rem', scrollMarginTop: '2rem' }}>
            <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>핵심 서비스 로직</h2>

            <Card style={{ marginBottom: '1rem' }}>
              <h3 style={{ marginBottom: '0.75rem', color: 'var(--text-color)', fontSize: '1rem' }}>
                로그인 응답 구성 시 N+1 제거 방향
              </h3>
              <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', marginBottom: '0.5rem' }}>
                로그인 직후 채팅방 목록·참여자·메시지를 단계별로 조회하면 쿼리가 선형으로 늘어납니다. 채팅방 ID 목록을 먼저 모은 뒤 IN·Fetch Join 등으로 묶어
                단일 패스에서 DTO를 구성했습니다 (상세는 최적화 문서 참고).
              </p>
              <ul style={{ listStyle: 'none', padding: 0, marginTop: '0.75rem', color: 'var(--text-secondary)', lineHeight: '1.8' }}>
                {li('배치 IN 조회와 Fetch Join 조합')}
                {li('최신 메시지만 가져오는 식으로 읽기 범위 축소')}
              </ul>
            </Card>

            <Card style={{ marginBottom: '1rem' }}>
              <h3 style={{ marginBottom: '0.75rem', color: 'var(--text-color)', fontSize: '1rem' }}>
                경고 카운트 동시 증가
              </h3>
              <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', marginBottom: '0.5rem' }}>
                관리자가 동시에 경고를 줄 때 메모리에서 read-modify-write 하면 카운트가 덜 올라갈 수 있습니다. 한 문장 UPDATE로 증가시킵니다.
              </p>
              <CodeBlock>{`// UsersRepository.java
@Modifying
@Query("UPDATE Users u SET u.warningCount = u.warningCount + 1 WHERE u.idx = :userId")
void incrementWarningCount(@Param("userId") Long userId);`}</CodeBlock>
            </Card>

            <Card style={{ marginBottom: '1rem' }}>
              <h3 style={{ marginBottom: '0.75rem', color: 'var(--text-color)', fontSize: '1rem' }}>
                소셜 가입 레이스
              </h3>
              <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', marginBottom: '0.5rem' }}>
                동일 providerId·이메일에 대해 두 요청이 동시에 들어오면 중복 사용자가 생길 수 있어 DB UNIQUE(users.email, socialuser 복합)와 트랜잭션으로 방어합니다.
              </p>
            </Card>

            <Card>
              <h3 style={{ marginBottom: '0.75rem', color: 'var(--text-color)', fontSize: '1rem' }}>
                DTO 레이어 (record 적용 예)
              </h3>
              <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', marginBottom: '0.5rem' }}>
                LoginRequest, TokenResponse, SocialUserDTO 등은 Java record로 단순화했고 필드 많은 프로필 DTO는 class 유지 근거를 두었습니다. 전체 표와 파일 목록은 리팩토링 페이지 참고.
              </p>
            </Card>
          </section>

          <section id="architecture" style={{ marginBottom: '3rem', scrollMarginTop: '2rem' }}>
            <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>아키텍처</h2>

            <Card style={{ marginBottom: '1rem' }}>
              <h3 style={{ marginBottom: '0.75rem', color: 'var(--text-color)', fontSize: '1rem' }}>도메인 구조</h3>
              <CodeBlock>{`domain/user/
  controller/
    AuthController.java
    UsersController.java
    OAuth2 관련 진입점
  service/
    AuthService.java
    UsersService.java
    OAuth2Service.java
    EmailVerificationService.java
    UserSanctionService.java
    PetService.java
  entity/
    Users.java
    SocialUser.java
    UserSanction.java
    Pet.java
    PetVaccination.java
  repository/
    사용자·소셜·제재·펫 레포지토리`}</CodeBlock>
            </Card>

            <Card style={{ marginBottom: '1rem' }}>
              <h3 style={{ marginBottom: '0.75rem', color: 'var(--text-color)', fontSize: '1rem' }}>주요 엔티티</h3>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid var(--nav-border)' }}>
                    <th style={{ padding: '0.65rem 0.75rem', textAlign: 'left', color: 'var(--text-color)' }}>엔티티</th>
                    <th style={{ padding: '0.65rem 0.75rem', textAlign: 'left', color: 'var(--text-color)' }}>역할</th>
                    <th style={{ padding: '0.65rem 0.75rem', textAlign: 'left', color: 'var(--text-color)' }}>핵심</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['Users', '계정·역할·제재 카운터·토큰', 'idx, id, email, role, refreshToken, warningCount, suspendedUntil'],
                    ['SocialUser', 'OAuth 연결 행', 'provider, providerId, user FK'],
                    ['UserSanction', '관리자 제재 이력', 'type, reason, startedAt, endedAt'],
                    ['Pet', '사용자 소유 펫', 'species, breed, imageUrl 등'],
                    ['PetVaccination', '접종 이력', 'vaccineName, vaccinationDate, nextDueDate']
                  ].map(([name, role, fields], index, arr) => (
                    <tr key={name} style={{ borderBottom: index < arr.length - 1 ? '1px solid var(--nav-border)' : 'none' }}>
                      <td style={{ padding: '0.65rem 0.75rem', color: 'var(--text-color)' }}>{name}</td>
                      <td style={{ padding: '0.65rem 0.75rem' }}>{role}</td>
                      <td style={{ padding: '0.65rem 0.75rem' }}>{fields}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Card>

            <Card style={{ marginBottom: '1rem' }}>
              <h3 style={{ marginBottom: '0.75rem', color: 'var(--text-color)', fontSize: '1rem' }}>엔티티 관계도</h3>
              <MermaidDiagram chart={entityDiagram} />
            </Card>

            <Card style={{ marginBottom: '1rem' }}>
              <h3 style={{ marginBottom: '0.75rem', color: 'var(--text-color)', fontSize: '1rem' }}>주요 API (요약)</h3>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid var(--nav-border)' }}>
                    <th style={{ padding: '0.65rem 0.75rem', textAlign: 'left', color: 'var(--text-color)' }}>엔드포인트</th>
                    <th style={{ padding: '0.65rem 0.75rem', textAlign: 'left', color: 'var(--text-color)' }}>Method</th>
                    <th style={{ padding: '0.65rem 0.75rem', textAlign: 'left', color: 'var(--text-color)' }}>설명</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['/api/auth/register', 'POST', '회원가입'],
                    ['/api/auth/login', 'POST', '로그인·토큰 발급'],
                    ['/api/auth/refresh', 'POST', 'Access 갱신'],
                    ['/api/auth/logout', 'POST', '로그아웃·Refresh 무효'],
                    ['/api/oauth2/authorization/google|naver', 'GET', '소셜 로그인 시작'],
                    ['/api/users/me', 'GET/PATCH', '내 프로필·비밀번호·닉네임 등'],
                    ['/api/users/email/verify/...', 'POST/GET', '인증 메일·토큰 검증'],
                    ['/api/users/pets', 'CRUD', '반려동물'],
                    ['/api/admin/users/...', 'GET/POST', '관리자 목록·제재']
                  ].map(([path, method, desc], index, arr) => (
                    <tr key={path + method} style={{ borderBottom: index < arr.length - 1 ? '1px solid var(--nav-border)' : 'none' }}>
                      <td style={{ padding: '0.65rem 0.75rem' }}>
                        <code style={{ backgroundColor: 'var(--bg-color)', padding: '0.15rem 0.35rem', borderRadius: '4px' }}>{path}</code>
                      </td>
                      <td style={{ padding: '0.65rem 0.75rem' }}>{method}</td>
                      <td style={{ padding: '0.65rem 0.75rem' }}>{desc}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Card>

            <Card style={{ marginBottom: '1rem' }}>
              <h3 style={{ marginBottom: '0.75rem', color: 'var(--text-color)', fontSize: '1rem' }}>보안 및 권한</h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, color: 'var(--text-secondary)', lineHeight: '1.8' }}>
                {li('역할 계층(USER 등)과 `@PreAuthorize`로 API별 접근 제어')}
                {li('JWT 만료·서명 검증, Refresh 저장으로 세션 유사 안정성 확보')}
                {li('비밀번호 BCrypt, 소프트 삭제(`isDeleted`)로 계정 상태 분리')}
              </ul>
            </Card>

            <Card>
              <h3 style={{ marginBottom: '0.75rem', color: 'var(--text-color)', fontSize: '1rem' }}>다른 도메인과의 연관</h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, color: 'var(--text-secondary)', lineHeight: '1.8' }}>
                {li('Board: 작성자·댓글·반응 주체')}
                {li('Care / Meetup / Chat: 요청·모임·채팅 참여자 식별, 이메일 인증 연계')}
                {li('Missing Pet · Location · Report 등: 작성자 FK로 Users 참조')}
                <li>
                  • 게시판 패턴 참고:{' '}
                  <Link to="/domains/board" style={{ color: 'var(--link-color)', textDecoration: 'none' }}>
                    Board 도메인
                  </Link>
                </li>
              </ul>
            </Card>
          </section>

          <section id="troubleshooting" style={{ marginBottom: '3rem', scrollMarginTop: '2rem' }}>
            <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>트러블슈팅</h2>

            <Card style={{ marginBottom: '1rem' }}>
              <h3 style={{ marginBottom: '0.75rem', color: 'var(--text-color)', fontSize: '1rem' }}>로그인 N+1</h3>
              <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', marginBottom: '0.5rem' }}>
                <strong style={{ color: 'var(--text-color)' }}>문제:</strong> 채팅방·참여자·메시지를 반복 로딩하며 로그인 응답이 느려짐.
              </p>
              <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', marginBottom: '0.75rem' }}>
                <strong style={{ color: 'var(--text-color)' }}>해결:</strong> 배치 조회, Fetch Join, 읽기 범위 제한 후 쿼리·시간 단축.
              </p>
              <Link to="/domains/user/optimization" style={{ color: 'var(--link-color)', textDecoration: 'none', fontWeight: 600 }}>
                → 성능 최적화 상세
              </Link>
            </Card>

            {[
              [
                '제재 동시성',
                '여러 관리자가 동시에 경고하면 경고 횟수가 밀리거나 자동 이용 제한이 어긋날 수 있음.',
                '경고 카운트를 단일 UPDATE로 원자 증가.'
              ],
              [
                '소셜 가입 레이스',
                '동시에 최초 진입하면 중복 행 생성 위험.',
                'email·(provider, providerId) UNIQUE + 트랜잭션으로 한 건만 남도록 설계.'
              ],
              [
                'Provider별 응답 차이',
                'Google과 Naver 필드 이름·토큰 응답 형식이 달라 매핑이 깨질 수 있음.',
                '전용 OAuth2UserService와 Naver용 Token 클라이언트로 표준화.'
              ]
            ].map(([title, problem, solution]) => (
              <Card key={title} style={{ marginBottom: '1rem' }}>
                <h3 style={{ marginBottom: '0.75rem', color: 'var(--text-color)', fontSize: '1rem' }}>{title}</h3>
                <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', marginBottom: '0.4rem' }}>
                  <strong style={{ color: 'var(--text-color)' }}>문제:</strong> {problem}
                </p>
                <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', marginBottom: 0 }}>
                  <strong style={{ color: 'var(--text-color)' }}>해결:</strong> {solution}
                </p>
              </Card>
            ))}
          </section>

          <section id="performance" style={{ marginBottom: '3rem', scrollMarginTop: '2rem' }}>
            <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>성능 최적화</h2>

            <Card style={{ marginBottom: '1rem' }}>
              <h3 style={{ marginBottom: '0.75rem', color: 'var(--text-color)', fontSize: '1rem' }}>인덱스 전략 (발췌)</h3>
              <CodeBlock>{`CREATE UNIQUE INDEX email ON users(email);
CREATE UNIQUE INDEX id ON users(id);
CREATE UNIQUE INDEX uk_users_nickname ON users(nickname);
CREATE INDEX users_idx ON socialuser(users_idx);
CREATE INDEX idx_ends_at ON user_sanctions(ends_at);
CREATE INDEX idx_user_idx ON user_sanctions(user_idx);`}</CodeBlock>
              <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', marginTop: '0.75rem', marginBottom: 0 }}>
                로그인·중복 검사·제재 만료 스케줄 조회 패턴을 기준으로 인덱스를 잡았습니다.
              </p>
            </Card>

            <Card style={{ marginBottom: '1rem' }}>
              <h3 style={{ marginBottom: '0.75rem', color: 'var(--text-color)', fontSize: '1rem' }}>프로필 조회 예 (N+1 완화)</h3>
              <CodeBlock>{`-- 패턴 예시
SELECT u.*, p.*
FROM users u
LEFT JOIN pet p ON u.idx = p.user_idx
WHERE u.id = ? AND u.is_deleted = false;`}</CodeBlock>
              <ul style={{ listStyle: 'none', padding: 0, marginTop: '0.75rem', color: 'var(--text-secondary)', lineHeight: '1.8' }}>
                {li('페이징 목록에는 Batch Size / 전용 쿼리로 과도한 join을 피함')}
              </ul>
            </Card>

            <Card>
              <h3 style={{ marginBottom: '0.75rem', color: 'var(--text-color)', fontSize: '1rem' }}>더 보기</h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, color: 'var(--text-secondary)', lineHeight: '1.9' }}>
                <li>
                  •{' '}
                  <Link to="/domains/user/optimization" style={{ color: 'var(--link-color)', textDecoration: 'none' }}>
                    User 도메인 성능 최적화 전용 페이지
                  </Link>
                </li>
                <li>
                  •{' '}
                  <a
                    href="https://github.com/makkong1/makkong1-github.io/blob/main/docs/troubleshooting/users/login-n-plus-one-issue.md"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: 'var(--link-color)', textDecoration: 'none' }}
                  >
                    로그인 N+1 트러블슈팅 문서 (GitHub)
                  </a>
                </li>
              </ul>
            </Card>
          </section>

          <section id="summary" style={{ marginBottom: '3rem', scrollMarginTop: '2rem' }}>
            <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>핵심 포인트</h2>
            <Card>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, color: 'var(--text-secondary)', lineHeight: '1.8' }}>
                <li>• 사용자는 모든 기능의 신원·권한·정책(인증·제재·이메일)의 중심 축이라 경로 최적화가 체감 성능과 직결됩니다.</li>
                <li>• 로그인 응답에서 연관 로딩을 배치화해 N+1을 제거한 것이 대표적인 이득이었습니다.</li>
                <li>• 제재·경고와 소셜 가입 모두 동시 요청 전제 하에 DB 무결성(원자 연산·UNIQUE)으로 닫았습니다.</li>
                <li>• 레코드 적용 같은 구조 리팩터는{' '}
                  <Link to="/domains/user/refactoring" style={{ color: 'var(--link-color)', textDecoration: 'none' }}>
                    리팩토링 페이지
                  </Link>
                  에서 단계별로 다룹니다.
                </li>
              </ul>
            </Card>
          </section>

          <section id="docs" style={{ marginBottom: '3rem', scrollMarginTop: '2rem' }}>
            <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>관련 페이지</h2>
            <Card>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, color: 'var(--text-secondary)', lineHeight: '2' }}>
                <li>
                  •{' '}
                  <Link to="/domains/user/optimization" style={{ color: 'var(--link-color)', textDecoration: 'none' }}>
                    User 도메인 성능 최적화
                  </Link>
                </li>
                <li>
                  •{' '}
                  <Link to="/domains/user/refactoring" style={{ color: 'var(--link-color)', textDecoration: 'none' }}>
                    User 도메인 리팩토링
                  </Link>
                </li>
                <li>
                  •{' '}
                  <a
                    href="https://github.com/makkong1/makkong1-github.io/blob/main/docs/domains/user.md"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: 'var(--link-color)', textDecoration: 'none' }}
                  >
                    docs/domains/user.md
                  </a>
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
