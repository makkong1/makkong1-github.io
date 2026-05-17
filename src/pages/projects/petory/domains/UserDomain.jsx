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
    { id: 'design', title: '기능 & 아키텍처' },
    { id: 'troubleshooting', title: '트러블슈팅' },
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
        String password
        Role role
        String refreshToken
        Boolean emailVerified
        Integer warningCount
        UserStatus status
        LocalDateTime suspendedUntil
        Boolean isDeleted
    }

    Pet {
        Long idx PK
        Long user_idx FK
        String name
        String species
        String breed
        LocalDate birthDate
        String imageUrl
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
            인증·인가, 소셜 연동, 이메일 인증, 제재, 반려동물 관리를 하나의 레이어에서 다룹니다.
            서비스 전역에서 참조되는 사용자 루트이기 때문에 로그인 경로 성능과 제재·소셜 가입 동시성이 특히 중요했습니다.
          </p>

          {/* ── 도메인 개요 ── */}
          <section id="intro" style={{ marginBottom: '3rem', scrollMarginTop: '2rem' }}>
            <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>도메인 개요</h2>
            <Card>
              <p style={{ lineHeight: '1.8', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                User 도메인의 핵심은{' '}
                <strong style={{ color: 'var(--text-color)' }}>
                  신뢰할 수 있는 인증 상태를 빠르게 만들고, 제재·이메일 인증 같은 정책을 사용자 생명주기 안에 안정적으로 끼워 넣는 것
                </strong>
                입니다.
              </p>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid var(--nav-border)' }}>
                    <th style={{ padding: '0.55rem 0.75rem', textAlign: 'left', color: 'var(--text-color)' }}>지표</th>
                    <th style={{ padding: '0.55rem 0.75rem', textAlign: 'left', color: 'var(--text-color)' }}>Before</th>
                    <th style={{ padding: '0.55rem 0.75rem', textAlign: 'left', color: 'var(--text-color)' }}>After</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['로그인 쿼리 수', '21개', '4개 (↓81%)'],
                    ['실행 시간', '305ms', '55ms'],
                    ['메모리', '0.58MB', '0.13MB']
                  ].map(([label, before, after], i, arr) => (
                    <tr key={label} style={{ borderBottom: i < arr.length - 1 ? '1px solid var(--nav-border)' : 'none' }}>
                      <td style={{ padding: '0.55rem 0.75rem', color: 'var(--text-color)' }}>{label}</td>
                      <td style={{ padding: '0.55rem 0.75rem' }}>{before}</td>
                      <td style={{ padding: '0.55rem 0.75rem', color: 'var(--text-color)', fontWeight: 600 }}>{after}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', marginTop: '0.75rem', marginBottom: 0 }}>
                수치 근거·시퀀스·테스트 코드 →{' '}
                <Link to="/domains/user/optimization" style={{ color: 'var(--link-color)', textDecoration: 'none' }}>
                  User 성능 최적화 페이지
                </Link>
              </p>
            </Card>
          </section>

          {/* ── 기능 & 아키텍처 ── */}
          <section id="design" style={{ marginBottom: '3rem', scrollMarginTop: '2rem' }}>
            <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>기능 & 아키텍처</h2>

            {/* 인증·인가 */}
            <Card style={{ marginBottom: '1rem' }}>
              <h3 style={{ marginBottom: '0.75rem', color: 'var(--text-color)', fontSize: '1rem' }}>인증·인가</h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, color: 'var(--text-secondary)', lineHeight: '1.8' }}>
                {li('JWT — Access Token(15분) + Refresh Token(1일, DB 저장). JwtAuthenticationFilter에서 매 요청마다 검증.')}
                {li('OAuth2 — Google·Naver. SocialUser 테이블로 계정 연결, 신규면 자동 회원 생성 후 JWT 발급. Naver는 토큰 응답 형식 차이를 전용 클라이언트로 흡수.')}
                {li('역할 계층: USER < SERVICE_PROVIDER < ADMIN < MASTER. API별 @PreAuthorize 메서드 레벨 제어.')}
                {li('제재·삭제 상태는 로그인 흐름에서 선제 검증 후 차단.')}
              </ul>
            </Card>

            {/* 이메일 인증 */}
            <Card style={{ marginBottom: '1rem' }}>
              <h3 style={{ marginBottom: '0.75rem', color: 'var(--text-color)', fontSize: '1rem' }}>이메일 인증</h3>
              <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', marginBottom: '0.5rem' }}>
                단일 <code style={{ backgroundColor: 'var(--bg-color)', padding: '0.1rem 0.3rem', borderRadius: '4px' }}>emailVerified Boolean</code> 필드로 관리.
                소셜 로그인은 자동 인증, 일반 회원은 Redis 임시 토큰(TTL 24h)으로 검증합니다.
              </p>
              <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', marginBottom: '0.25rem' }}>
                <strong style={{ color: 'var(--text-color)' }}>EmailVerificationPurpose</strong> — 목적별 8종으로 검증 시점을 분리합니다:
              </p>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, color: 'var(--text-secondary)', lineHeight: '1.8' }}>
                {li('1단계(로그인만 허용): 회원가입 전 이메일 사전 인증')}
                {li('2단계(emailVerified 필수): PET_CARE, MEETUP, LOCATION_REVIEW, BOARD_EDIT, COMMENT_EDIT, MISSING_PET, PASSWORD_RESET')}
              </ul>
            </Card>

            {/* 제재 시스템 */}
            <Card style={{ marginBottom: '1rem' }}>
              <h3 style={{ marginBottom: '0.75rem', color: 'var(--text-color)', fontSize: '1rem' }}>제재 시스템</h3>
              <ul style={{ listStyle: 'none', padding: 0, marginBottom: '0.75rem', color: 'var(--text-secondary)', lineHeight: '1.8' }}>
                {li('흐름: 경고 → 이용 제한(기간) → 영구 차단. 경고 3회 누적 시 자동 이용 제한.')}
                {li('스케줄러가 suspendedUntil 만료를 감지해 이용 제한 해제.')}
                {li('동시에 여러 관리자가 경고를 줄 때 Lost Update 방지 → DB 원자 UPDATE:')}
              </ul>
              <CodeBlock>{`// UsersRepository.java
@Modifying
@Query("UPDATE Users u SET u.warningCount = u.warningCount + 1 WHERE u.idx = :userId")
void incrementWarningCount(@Param("userId") Long userId);`}</CodeBlock>
            </Card>

            {/* 반려동물 */}
            <Card style={{ marginBottom: '1rem' }}>
              <h3 style={{ marginBottom: '0.75rem', color: 'var(--text-color)', fontSize: '1rem' }}>반려동물 & 예방접종</h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, color: 'var(--text-secondary)', lineHeight: '1.8' }}>
                {li('Pet CRUD + 프로필 이미지. Recommendation 도메인에서 첫 번째 Pet으로 맞춤 추천 요청을 구성.')}
                {li('PetVaccination — 예방접종 이력·다음 접종일 관리.')}
              </ul>
            </Card>

            {/* 엔티티 & 주요 API */}
            <Card style={{ marginBottom: '1rem' }}>
              <h3 style={{ marginBottom: '0.75rem', color: 'var(--text-color)', fontSize: '1rem' }}>엔티티 관계도</h3>
              <MermaidDiagram chart={entityDiagram} />
            </Card>

            <Card>
              <h3 style={{ marginBottom: '0.75rem', color: 'var(--text-color)', fontSize: '1rem' }}>주요 API</h3>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid var(--nav-border)' }}>
                    <th style={{ padding: '0.55rem 0.75rem', textAlign: 'left', color: 'var(--text-color)' }}>엔드포인트</th>
                    <th style={{ padding: '0.55rem 0.75rem', textAlign: 'left', color: 'var(--text-color)' }}>Method</th>
                    <th style={{ padding: '0.55rem 0.75rem', textAlign: 'left', color: 'var(--text-color)' }}>설명</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['/api/auth/register', 'POST', '회원가입 (role: USER 필드 필수)'],
                    ['/api/auth/login', 'POST', '로그인 · 토큰 발급'],
                    ['/api/auth/refresh', 'POST', 'Access Token 갱신'],
                    ['/api/auth/logout', 'POST', '로그아웃 · Refresh 무효화'],
                    ['/api/oauth2/authorization/{provider}', 'GET', '소셜 로그인 진입 (google|naver)'],
                    ['/api/users/me', 'GET/PATCH', '내 프로필 · 비밀번호 · 닉네임'],
                    ['/api/users/email/verify/...', 'POST/GET', '인증 메일 발송 · 토큰 검증'],
                    ['/api/users/pets', 'CRUD', '반려동물 등록 · 수정 · 삭제'],
                    ['/api/admin/users/...', 'GET/POST', '관리자 목록 조회 · 제재']
                  ].map(([path, method, desc], i, arr) => (
                    <tr key={path + method} style={{ borderBottom: i < arr.length - 1 ? '1px solid var(--nav-border)' : 'none' }}>
                      <td style={{ padding: '0.55rem 0.75rem' }}>
                        <code style={{ backgroundColor: 'var(--bg-color)', padding: '0.1rem 0.3rem', borderRadius: '4px', fontSize: '0.82rem' }}>{path}</code>
                      </td>
                      <td style={{ padding: '0.55rem 0.75rem' }}>{method}</td>
                      <td style={{ padding: '0.55rem 0.75rem' }}>{desc}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Card>
          </section>

          {/* ── 트러블슈팅 ── */}
          <section id="troubleshooting" style={{ marginBottom: '3rem', scrollMarginTop: '2rem' }}>
            <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>트러블슈팅</h2>

            <Card style={{ marginBottom: '1rem' }}>
              <h3 style={{ marginBottom: '0.75rem', color: 'var(--text-color)', fontSize: '1rem' }}>로그인 N+1</h3>
              <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', marginBottom: '0.4rem' }}>
                <strong style={{ color: 'var(--text-color)' }}>문제:</strong> 로그인 응답 구성 시 채팅방·참여자·메시지를 반복 로딩 → 쿼리 21개, 305ms.
              </p>
              <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', marginBottom: '0.75rem' }}>
                <strong style={{ color: 'var(--text-color)' }}>해결:</strong> 채팅방 ID 목록 선조회 후 IN·Fetch Join으로 단일 패스 구성. 쿼리 4개·55ms로 단축.
              </p>
              <Link to="/domains/user/optimization" style={{ color: 'var(--link-color)', textDecoration: 'none', fontWeight: 600 }}>
                → 성능 최적화 상세
              </Link>
            </Card>

            {[
              [
                '소셜 가입 레이스',
                '동일 providerId·이메일에 두 요청이 동시에 도착하면 중복 사용자 생성 위험.',
                'email UNIQUE + socialuser(provider, providerId) UNIQUE + 트랜잭션으로 한 건만 남도록 설계.'
              ],
              [
                '제재 동시성',
                '여러 관리자가 경고를 동시에 주면 read-modify-write 경합으로 카운트 누락 위험.',
                '단일 @Modifying UPDATE로 원자 증가. 3회 도달 시 자동 이용 제한 로직과 정합 보장.'
              ],
              [
                'OAuth2 Provider 응답 차이',
                'Google·Naver의 필드명·토큰 응답 형식이 달라 공통 매핑이 깨짐.',
                '전용 OAuth2UserService와 Naver용 커스텀 토큰 클라이언트로 필드를 표준화.'
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

          {/* ── 핵심 포인트 ── */}
          <section id="summary" style={{ marginBottom: '3rem', scrollMarginTop: '2rem' }}>
            <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>핵심 포인트</h2>
            <Card>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, color: 'var(--text-secondary)', lineHeight: '1.8' }}>
                <li>• 사용자는 모든 기능의 신원·권한·정책의 중심 축 — 로그인 경로 최적화가 전체 체감 성능과 직결됩니다.</li>
                <li>• 이메일 인증은 8종 Enum으로 목적별 검증 시점을 명확히 분리해 남용을 방지합니다.</li>
                <li>• 제재·경고 동시성과 소셜 가입 레이스 모두 DB 무결성(원자 연산·UNIQUE)으로 닫았습니다.</li>
                <li>• 구조 리팩터(record 적용 등) 상세는{' '}
                  <Link to="/domains/user/refactoring" style={{ color: 'var(--link-color)', textDecoration: 'none' }}>
                    리팩토링 페이지
                  </Link>
                  에서 단계별로 다룹니다.
                </li>
              </ul>
            </Card>
          </section>

          {/* ── 관련 페이지 ── */}
          <section id="docs" style={{ marginBottom: '3rem', scrollMarginTop: '2rem' }}>
            <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>관련 페이지</h2>
            <Card>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, color: 'var(--text-secondary)', lineHeight: '2' }}>
                <li>• <Link to="/domains/user/optimization" style={{ color: 'var(--link-color)', textDecoration: 'none' }}>User 도메인 성능 최적화</Link></li>
                <li>• <Link to="/domains/user/refactoring" style={{ color: 'var(--link-color)', textDecoration: 'none' }}>User 도메인 리팩토링</Link></li>
                <li>• <Link to="/domains/board" style={{ color: 'var(--link-color)', textDecoration: 'none' }}>Board 도메인</Link></li>
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
