import { Link } from 'react-router-dom';
import MermaidDiagram from '../../../../components/Common/MermaidDiagram';
import TableOfContents from '../../../../components/Common/TableOfContents';

// User 도메인 상세 작업 로그 (아카이브)
// - 기존 UserDomainOptimization(로그인 목록 N+1) + UserDomainRefactoring(인증·중복 조회 정리) 통합
function UserDomainDetail() {
  const sections = [
    { id: 'intro', title: '개요' },
    { id: 'login-n1', title: '로그인 목록 N+1 (대표)' },
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
                로그인 직후 프론트가 부르는 채팅방 목록(<code>getMyConversations</code>) 조회에서 채팅방마다 참여자·메시지를 개별 조회해 N+1이 발생했습니다. 인증·회원가입·프로필 경로의 중복 조회도 함께 정리했습니다.
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

          {/* 3. 인증·중복 조회 정리 */}
          <section id="auth-cleanup" style={{ marginBottom: '3rem', scrollMarginTop: '2rem' }}>
            <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>인증 · 중복 조회 정리</h2>
            <div className="section-card" style={card}>
              <ul style={{ listStyle: 'none', padding: 0, color: 'var(--text-secondary)', lineHeight: '1.9', fontSize: '0.9rem' }}>
                <li>• <strong style={{ color: 'var(--text-color)' }}>로그인/Refresh 중복 조회</strong>: <code>findByIdString</code> 후 <code>getUserById</code>가 또 조회(2회) → 이미 로드한 엔티티를 <code>UsersConverter.toDTO</code>로 변환(1회), AuthService의 UsersService 의존 제거</li>
                <li>• <strong style={{ color: 'var(--text-color)' }}>Admin 삭제 권한 검증</strong>: <code>getUser()</code>가 User+Pet 전체 조회 → 역할만 필요하므로 <code>findRoleByIdx()</code> 프로젝션(2+ → 1쿼리)</li>
                <li>• <strong style={{ color: 'var(--text-color)' }}>socialUsers N+1</strong>: <code>toDTO</code>의 <code>getSocialUsers()</code> Lazy(100명 시 101쿼리) → <code>@BatchSize(50)</code>로 3쿼리</li>
                <li>• <strong style={{ color: 'var(--text-color)' }}>프로필+리뷰</strong>: 리뷰 목록·평균을 각각 조회(2회) → <code>getReviewsWithAverage()</code> 통합(1회)</li>
                <li>• <strong style={{ color: 'var(--text-color)' }}>회원가입 중복 검사</strong>: 닉네임·username·email 각각 조회(3회) → <code>findByNicknameOrUsernameOrEmail()</code> 단일 쿼리</li>
                <li>• <strong style={{ color: 'var(--text-color)' }}>OAuth2 ID 생성</strong>: while 루프 DB 조회 → <code>baseId + UUID 8자리</code>(DB 0회, 충돌 시 최대 3회 재시도)</li>
                <li>• <strong style={{ color: 'var(--text-color)' }}>Admin 사용자 목록</strong>: <code>getAllUsers()</code> 전체 메모리 로드 제거 → 페이징만 사용</li>
              </ul>
            </div>
          </section>

          {/* 4. 요약 */}
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
