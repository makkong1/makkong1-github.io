import { Link } from 'react-router-dom';
import MermaidDiagram from '../../../../components/Common/MermaidDiagram';
import TableOfContents from '../../../../components/Common/TableOfContents';

// User 도메인 상세 작업 로그 (아카이브)
// - 기존 UserDomainOptimization(로그인 목록 N+1) + UserDomainRefactoring(인증·중복 조회 정리) 통합
function UserDomainDetail() {
  const sections = [
    { id: 'intro', title: '개요' },
    { id: 'login-n1', title: '로그인 목록 N+1 (대표)' },
    { id: 'sanction-bypass', title: '제재 중 인증 우회 버그' },
    { id: 'auth-cleanup', title: '인증 · 중복 조회 정리' },
    { id: 'summary', title: '요약' }
  ];

  const card = { padding: '1.5rem', backgroundColor: 'var(--card-bg)', borderRadius: '8px', border: '1px solid var(--nav-border)' };
  const pre = { padding: '1rem', backgroundColor: 'var(--bg-color)', borderRadius: '6px', overflow: 'auto', fontSize: '0.8rem', color: 'var(--text-secondary)' };
  const th = { padding: '0.75rem', textAlign: 'left', color: 'var(--text-color)', fontWeight: 'bold' };
  const td = { padding: '0.75rem' };

  const beforeSeq = `sequenceDiagram
    participant Service as ConversationService
    participant DB as MySQL
    Service->>DB: 로그인 인증 + 토큰 저장 (1,2)
    Service->>DB: 채팅방 목록 조회 (3)
    Note over Service,DB: N+1 발생
    loop 채팅방마다
        Service->>DB: 내 참여 정보 조회
        Service->>DB: 참여자 목록 조회
        Service->>DB: 전체 메시지 조회
    end
    Note over Service,DB: 총 21개 쿼리`;

  const afterSeq = `sequenceDiagram
    participant Service as ConversationService
    participant DB as MySQL
    Service->>DB: 로그인 인증 + 토큰 저장 (1,2)
    Service->>DB: 채팅방 목록 조회 (3)
    Service->>DB: 참여 정보 IN 절 배치 (JOIN FETCH user) (4)
    Service->>DB: 참여자 IN 절 배치 (5)
    Service->>DB: 최신 메시지만 배치 조회 (6)
    Note over Service,DB: 총 4개 쿼리`;

  return (
    <div className="domain-page-wrapper" style={{ padding: '2rem 0' }}>
      <div className="domain-page-container" style={{ display: 'flex', gap: '2rem', alignItems: 'flex-start' }}>
        <div className="domain-page-content" style={{ flex: 1 }}>
          <div style={{ marginBottom: '1rem' }}>
            <Link to="/domains/user" style={{ color: 'var(--link-color)', textDecoration: 'none', fontSize: '0.9rem' }}>
              ← User 도메인으로 돌아가기
            </Link>
          </div>
          <h1 style={{ marginBottom: '0.5rem', color: 'var(--text-color)' }}>User 도메인 — 인증 · 성능 상세</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '2rem', lineHeight: 1.7 }}>
            로그인 직후 채팅방 목록의 N+1 해결(대표)과, 인증·조회 경로의 중복 쿼리 정리를 담았습니다.
            대표 사례(N+1)는 <Link to="/domains/refactoring#n-plus-one" style={{ color: 'var(--link-color)', textDecoration: 'none' }}>리팩토링 대표 사례</Link>에도 있습니다.
          </p>

          {/* 1. 개요 */}
          <section id="intro" style={{ marginBottom: '3rem', scrollMarginTop: '2rem' }}>
            <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>개요</h2>
            <div className="section-card" style={card}>
              <p style={{ lineHeight: '1.8', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                로그인 직후 프론트가 부르는 채팅방 목록(<code>getMyConversations</code>) 조회에서 채팅방마다 참여자·메시지를 개별 조회해 N+1이 발생했습니다. 제재(정지·차단) 상태가 인증 경로 곳곳에서 우회되던 버그 6종과, 인증·회원가입·프로필 경로의 중복 조회도 함께 정리했습니다.
              </p>
              <div style={{ padding: '1rem', backgroundColor: 'var(--bg-color)', borderRadius: '6px', border: '1px solid var(--nav-border)' }}>
                <h3 style={{ marginBottom: '0.75rem', color: 'var(--text-color)', fontSize: '1rem' }}>핵심 성과 (로그인 목록 조회)</h3>
                <ul style={{ listStyle: 'none', padding: 0, color: 'var(--text-secondary)', lineHeight: '1.8', fontSize: '0.9rem' }}>
                  <li>• 쿼리 수: <strong style={{ color: 'var(--text-color)' }}>21개 → 4개</strong> (80.95% 감소)</li>
                  <li>• 실행 시간: <strong style={{ color: 'var(--text-color)' }}>305ms → 55ms</strong> (81.97% 감소)</li>
                  <li>• 메모리: <strong style={{ color: 'var(--text-color)' }}>0.58MB → 0.13MB</strong> (77.24% 감소)</li>
                </ul>
              </div>
            </div>
          </section>

          {/* 2. 로그인 목록 N+1 (대표) */}
          <section id="login-n1" style={{ marginBottom: '3rem', scrollMarginTop: '2rem' }}>
            <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>로그인 목록 N+1 (대표)</h2>

            <div className="section-card" style={{ ...card, marginBottom: '1rem' }}>
              <h3 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>문제 — 채팅방마다 참여자·메시지 개별 조회</h3>
              <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', marginBottom: '0.75rem', fontSize: '0.9rem' }}>
                채팅방 목록을 받은 뒤 방마다 내 참여 정보·참여자 목록·전체 메시지를 개별 조회(채팅방 10 / 참여자 3 / 메시지 20 기준 총 21개).
              </p>
              <MermaidDiagram chart={beforeSeq} />
            </div>

            <div className="section-card" style={{ ...card, marginBottom: '1rem' }}>
              <h3 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>해결 — 배치 조회 + Fetch Join + 최신 메시지만</h3>
              <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', marginBottom: '0.5rem', fontSize: '0.9rem' }}>
                채팅방 ID를 모아 <code>IN</code> 절 배치로 참여 정보·참여자를 한 번에 가져오고(참여자는 <code>JOIN FETCH user</code>), 메시지는 전체가 아닌 <strong style={{ color: 'var(--text-color)' }}>최신 메시지만</strong> 배치 조회 → <code>Map</code>으로 메모리 매핑.
              </p>
              <pre style={pre}>
{`@Query("SELECT p FROM ConversationParticipant p JOIN FETCH p.user u " +
       "WHERE p.conversation.idx IN :conversationIdxs AND p.user.idx = :userId")
List<ConversationParticipant> findParticipantsByConversationIdxsAndUserIdx(
    @Param("conversationIdxs") List<Long> conversationIdxs, @Param("userId") Long userId);
// + findParticipantsByConversationIdxsAndStatus (배치)
// + findLatestMessagesByConversationIdxs (최신 메시지만 배치)`}
              </pre>
              <MermaidDiagram chart={afterSeq} />
            </div>

            <div className="section-card" style={card}>
              <h3 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>결과</h3>
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                  <thead>
                    <tr style={{ borderBottom: '2px solid var(--nav-border)' }}>
                      <th style={th}>항목</th><th style={th}>개선 전</th><th style={th}>개선 후</th><th style={th}>개선율</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr style={{ borderBottom: '1px solid var(--nav-border)' }}>
                      <td style={td}>쿼리 수</td><td style={td}>21개</td>
                      <td style={{ ...td, color: 'var(--link-color)', fontWeight: 'bold' }}>4개</td>
                      <td style={{ ...td, color: 'var(--link-color)', fontWeight: 'bold' }}>80.95% ↓</td>
                    </tr>
                    <tr style={{ borderBottom: '1px solid var(--nav-border)' }}>
                      <td style={td}>평균 응답 시간</td><td style={td}>305ms</td>
                      <td style={{ ...td, color: 'var(--link-color)', fontWeight: 'bold' }}>55ms</td>
                      <td style={{ ...td, color: 'var(--link-color)', fontWeight: 'bold' }}>81.97% ↓</td>
                    </tr>
                    <tr>
                      <td style={td}>메모리</td><td style={td}>0.58MB</td>
                      <td style={{ ...td, color: 'var(--link-color)', fontWeight: 'bold' }}>0.13MB</td>
                      <td style={{ ...td, color: 'var(--link-color)', fontWeight: 'bold' }}>77.24% ↓</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* 3. 제재 중 인증 우회 버그 */}
          <section id="sanction-bypass" style={{ marginBottom: '3rem', scrollMarginTop: '2rem' }}>
            <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>제재 중 인증 우회 버그 (A1~A6, 2026-06-28)</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1rem', lineHeight: 1.7 }}>
              관리자가 사용자를 정지·차단해도, 이미 발급된 토큰이나 세션이 살아있는 경로들에서 제재가 실제로 반영되지 않는 문제 6가지를 찾아 정리했습니다.
            </p>
            <div className="section-card" style={{ ...card, marginBottom: '1rem' }}>
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
                  <thead>
                    <tr style={{ borderBottom: '2px solid var(--nav-border)' }}>
                      <th style={th}>ID</th><th style={th}>문제</th><th style={th}>처리</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr style={{ borderBottom: '1px solid var(--nav-border)' }}>
                      <td style={{ ...td, color: 'var(--text-color)' }}>A1</td>
                      <td style={td}>refresh token으로 access token 재발급 시 <code>BANNED</code>/<code>SUSPENDED</code> 상태를 확인 안 함 — 정지 후에도 재발급 가능</td>
                      <td style={{ ...td, color: 'var(--link-color)', fontWeight: 'bold' }}>수정됨 — 제재 상태 차단 + refresh token 제거</td>
                    </tr>
                    <tr style={{ borderBottom: '1px solid var(--nav-border)' }}>
                      <td style={{ ...td, color: 'var(--text-color)' }}>A2</td>
                      <td style={td}>기존 access token은 <code>JwtAuthenticationFilter</code>가 <code>isEnabled()</code>를 검사하지 않아 제재 직후에도 보호 API 접근 가능</td>
                      <td style={{ ...td, color: 'var(--link-color)', fontWeight: 'bold' }}>수정됨 — 필터가 isEnabled/isAccountNonLocked 검사 후 인증</td>
                    </tr>
                    <tr style={{ borderBottom: '1px solid var(--nav-border)' }}>
                      <td style={{ ...td, color: 'var(--text-color)' }}>A3</td>
                      <td style={td}>WebSocket handshake·STOMP interceptor도 제재 상태를 매 연결/메시지에서 강제하지 않음</td>
                      <td style={{ ...td, color: 'var(--link-color)', fontWeight: 'bold' }}>수정됨 — handshake·interceptor에서 제재/비활성 계정 거부</td>
                    </tr>
                    <tr style={{ borderBottom: '1px solid var(--nav-border)' }}>
                      <td style={{ ...td, color: 'var(--text-color)' }}>A4</td>
                      <td style={td}>만료된 정지의 자동 해제 로직이 <code>AuthenticationManager</code> 인증 단계보다 늦게 실행돼, 만료된 정지 사용자가 로그인 자체에서 막힘</td>
                      <td style={{ ...td, color: 'var(--link-color)', fontWeight: 'bold' }}>수정됨 — 인증 주체 생성 전에 만료 정지를 ACTIVE로 전환</td>
                    </tr>
                    <tr style={{ borderBottom: '1px solid var(--nav-border)' }}>
                      <td style={{ ...td, color: 'var(--text-color)' }}>A5</td>
                      <td style={td}>관리자가 상태를 바꿔도 기존 refresh token이 제거되지 않고, 제재 이력이 남지 않을 수 있음</td>
                      <td style={{ ...td, color: '#d4a72c', fontWeight: 'bold' }}>부분 수정 — refresh token 제거는 반영, UserSanction 이력 통일은 잔여 작업</td>
                    </tr>
                    <tr>
                      <td style={{ ...td, color: 'var(--text-color)' }}>A6</td>
                      <td style={td}>신고 처리 시 <code>targetIdx</code>를 사용자 ID처럼 써서, BOARD/COMMENT/MISSING_PET/CARE_REVIEW 신고는 콘텐츠 ID를 사용자로 오인해 엉뚱한 사람을 제재할 수 있음</td>
                      <td style={{ ...td, color: 'var(--link-color)', fontWeight: 'bold' }}>수정됨 — target type별로 콘텐츠 작성자 user idx를 resolve 후 제재</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p style={{ color: 'var(--text-muted)', lineHeight: '1.6', margin: '0.75rem 0 0', fontSize: '0.8rem' }}>
                이유: 인증이 "로그인 시점"에만 검사되면, 그 이후 발급된 토큰과 이미 연결된 세션은 서버 상태가 바뀌어도 그대로 유효해 제재가 우회됨 — refresh 재발급, 필터의 매 요청 검사, WebSocket 연결/메시지 각 진입점에서 상태를 다시 확인하도록 통일.
              </p>
            </div>

            <div className="section-card" style={card}>
              <h3 style={{ marginBottom: '0.5rem', color: 'var(--text-color)' }}>탈퇴 사용자 닉네임 · username · email 재사용 불가</h3>
              <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', fontSize: '0.9rem', marginBottom: '0.5rem' }}>
                <code>findByNickname/Username/Email</code>이 <code>isDeleted</code> 조건 없이 조회해, 탈퇴(Soft Delete)한 사용자의 닉네임·아이디·이메일을 다른 사용자가 영구히 사용할 수 없었습니다. → Repository 메서드에 <code>isDeleted = false</code> 조건 추가.
              </p>
              <p style={{ color: 'var(--text-muted)', lineHeight: '1.6', margin: '0.4rem 0 0', fontSize: '0.8rem' }}>
                이유: Soft Delete는 row를 지우지 않고 <code>isDeleted</code> 플래그만 바꾸는 방식이라, 중복 체크 쿼리가 이 조건을 넣지 않으면 탈퇴 계정도 계속 "사용 중"으로 걸림 — 활성 사용자만 대상으로 하는 다른 조회와 기준을 맞춤.
              </p>
            </div>
          </section>

          {/* 4. 인증·중복 조회 정리 */}
          <section id="auth-cleanup" style={{ marginBottom: '3rem', scrollMarginTop: '2rem' }}>
            <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>인증 · 중복 조회 정리</h2>
            <div className="section-card" style={card}>
              <ul style={{ listStyle: 'none', padding: 0, color: 'var(--text-secondary)', lineHeight: '1.9', fontSize: '0.9rem' }}>
                <li>• <strong style={{ color: 'var(--text-color)' }}>로그인/Refresh 중복 조회</strong>: <code>findByIdString</code> 후 <code>getUserById</code>가 또 조회(2회) → 이미 로드한 엔티티를 <code>UsersConverter.toDTO</code>로 변환(1회), AuthService의 UsersService 의존 제거</li>
                <li style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginBottom: '0.5rem' }}>&nbsp;&nbsp;이유: 같은 요청 안에서 이미 손에 쥔 엔티티를 다시 ID로 조회할 이유가 없어, 변환만 하도록 정리.</li>
                <li>• <strong style={{ color: 'var(--text-color)' }}>Admin 삭제 권한 검증</strong>: <code>getUser()</code>가 User+Pet 전체 조회 → 역할만 필요하므로 <code>findRoleByIdx()</code> 프로젝션(2+ → 1쿼리)</li>
                <li style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginBottom: '0.5rem' }}>&nbsp;&nbsp;이유: 삭제 가능 여부 판단엔 role 값 하나면 충분한데, User 엔티티 전체(+연관 Pet)를 불러오는 건 과함.</li>
                <li>• <strong style={{ color: 'var(--text-color)' }}>socialUsers N+1</strong>: <code>toDTO</code>의 <code>getSocialUsers()</code> Lazy(100명 시 101쿼리) → <code>@BatchSize(50)</code>로 3쿼리</li>
                <li style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginBottom: '0.5rem' }}>&nbsp;&nbsp;이유: OneToMany 컬렉션이라 Fetch Join은 페이징·DISTINCT 문제를 새로 만들 수 있어, Converter 변경 없이 안전한 @BatchSize로 우회.</li>
                <li>• <strong style={{ color: 'var(--text-color)' }}>프로필+리뷰</strong>: 리뷰 목록·평균을 각각 조회(2회) → <code>getReviewsWithAverage()</code> 통합(1회)</li>
                <li>• <strong style={{ color: 'var(--text-color)' }}>회원가입 중복 검사</strong>: 닉네임·username·email 각각 조회(3회) → <code>findByNicknameOrUsernameOrEmail()</code> 단일 쿼리</li>
                <li style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginBottom: '0.5rem' }}>&nbsp;&nbsp;이유: 세 컬럼을 OR로 묶으면 한 번의 왕복으로 세 가지 중복을 동시에 확인할 수 있음.</li>
                <li>• <strong style={{ color: 'var(--text-color)' }}>OAuth2 ID 생성</strong>: while 루프 DB 조회 → <code>baseId + UUID 8자리</code>(DB 0회, 충돌 시 최대 3회 재시도)</li>
                <li style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginBottom: '0.5rem' }}>&nbsp;&nbsp;이유: while 루프는 충돌할 때마다 DB round-trip이 필요한데, UUID 8자리를 붙이면 애초에 충돌 확률이 낮아 조회 없이 바로 생성하고 실패할 때만 재시도.</li>
                <li>• <strong style={{ color: 'var(--text-color)' }}>Admin 사용자 목록</strong>: <code>getAllUsers()</code> 전체 메모리 로드 제거 → 페이징만 사용</li>
              </ul>
            </div>
          </section>

          {/* 5. 요약 */}
          <section id="summary" style={{ marginBottom: '3rem', scrollMarginTop: '2rem' }}>
            <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>요약</h2>
            <div className="section-card" style={card}>
              <table style={{ width: '100%', borderCollapse: 'collapse', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid var(--nav-border)' }}>
                    <th style={th}>항목</th><th style={th}>개선 효과</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ borderBottom: '1px solid var(--nav-border)' }}>
                    <td style={td}>로그인 목록 N+1 (대표)</td><td style={td}>21개 → 4개 (80.95% ↓), 305ms → 55ms</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid var(--nav-border)' }}>
                    <td style={td}>제재 중 인증 우회 (A1~A6)</td><td style={td}>refresh/필터/WebSocket/로그인/신고매핑 5건 수정, 관리자 상태변경 token 제거 부분 수정</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid var(--nav-border)' }}>
                    <td style={td}>탈퇴 계정 재사용</td><td style={td}>닉네임·username·email 조회에 isDeleted 조건 추가</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid var(--nav-border)' }}>
                    <td style={td}>Auth 로그인/Refresh</td><td style={td}>User 2회 → 1회 조회</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid var(--nav-border)' }}>
                    <td style={td}>socialUsers N+1</td><td style={td}>101쿼리 → 3쿼리 (@BatchSize)</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid var(--nav-border)' }}>
                    <td style={td}>중복 검사 · 프로필</td><td style={td}>회원가입 3 → 1, 리뷰 2 → 1</td>
                  </tr>
                  <tr>
                    <td style={td}>Admin · OAuth2</td><td style={td}>삭제 role 프로젝션, 목록 페이징, ID 생성 DB 0회</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>
        </div>
        <TableOfContents sections={sections} />
      </div>
    </div>
  );
}

export default UserDomainDetail;
