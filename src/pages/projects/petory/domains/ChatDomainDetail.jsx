import { Link } from 'react-router-dom';
import MermaidDiagram from '../../../../components/Common/MermaidDiagram';
import TableOfContents from '../../../../components/Common/TableOfContents';

// Chat 도메인 상세 작업 로그 (아카이브)
// - 기존 ChatDomainOptimization(읽음 처리 성능) + ChatDomainRefactoring(보안·트랜잭션·검색) 통합
function ChatDomainDetail() {
  const sections = [
    { id: 'intro', title: '개요' },
    { id: 'read-perf', title: '읽음 처리 성능 (대표)' },
    { id: 'security', title: '보안 · 인가 계약' },
    { id: 'tx-search', title: '트랜잭션 · 검색 · 구조' },
    { id: 'summary', title: '요약 · 잔여 이슈' }
  ];

  const card = { padding: '1.5rem', backgroundColor: 'var(--card-bg)', borderRadius: '8px', border: '1px solid var(--nav-border)' };
  const pre = { padding: '1rem', backgroundColor: 'var(--bg-color)', borderRadius: '6px', overflow: 'auto', fontSize: '0.8rem', color: 'var(--text-secondary)' };

  const beforeSeq = `sequenceDiagram
    participant Service as ChatMessageService
    participant DB as MySQL
    Service->>DB: 참여자 조회 (1)
    Service->>DB: 채팅방 전체 메시지 조회 (수천~수만 건) (2)
    Note over Service: Java stream().filter() 로 메모리 필터링
    loop 읽지 않은 메시지마다
        Service->>DB: 읽음 상태 확인 (실제 미사용)
    end
    Service->>DB: 참여자 unreadCount / lastRead 업데이트
    Note over Service,DB: 7,000건 기준 7,002개+ 쿼리`;

  const afterSeq = `sequenceDiagram
    participant Service as ChatMessageService
    participant DB as MySQL
    Service->>DB: 참여자 조회 (1)
    Service->>DB: lastMessageIdx 있으면 마지막 메시지만 조회 (2)
    Service->>DB: 참여자 unreadCount=0 / lastRead 업데이트
    Note over Service,DB: 전체 메시지 조회·미사용 로직 제거 → 2~3개 쿼리`;

  return (
    <div className="domain-page-wrapper" style={{ padding: '2rem 0' }}>
      <div className="domain-page-container" style={{ display: 'flex', gap: '2rem', alignItems: 'flex-start' }}>
        <div className="domain-page-content" style={{ flex: 1 }}>
          <div style={{ marginBottom: '1rem' }}>
            <Link to="/domains/chat" style={{ color: 'var(--link-color)', textDecoration: 'none', fontSize: '0.9rem' }}>
              ← Chat 도메인으로 돌아가기
            </Link>
          </div>
          <h1 style={{ marginBottom: '0.5rem', color: 'var(--text-color)' }}>Chat 도메인 — 성능 · 보안 상세</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '2rem', lineHeight: 1.7 }}>
            읽음 처리 성능 개선과, 메시지 API의 보안·인가 계약 정리를 담았습니다.
            인가 계약 정리는 <Link to="/domains/refactoring#security" style={{ color: 'var(--link-color)', textDecoration: 'none' }}>리팩토링 대표 사례</Link>에서도 다룹니다. (2026-04-14 코드 리뷰 기준)
          </p>

          {/* 1. 개요 */}
          <section id="intro" style={{ marginBottom: '3rem', scrollMarginTop: '2rem' }}>
            <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>개요</h2>
            <div className="section-card" style={card}>
              <p style={{ lineHeight: '1.8', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                메시지 읽음 처리에서 발생한 대량 조회를 없애고, 컨트롤러가 클라이언트 식별자를 신뢰하던 계약을 JWT 인증 주체 기준으로 바꿨습니다.
              </p>
              <div style={{ padding: '1rem', backgroundColor: 'var(--bg-color)', borderRadius: '6px', border: '1px solid var(--nav-border)' }}>
                <h3 style={{ marginBottom: '0.75rem', color: 'var(--text-color)', fontSize: '1rem' }}>핵심 성과</h3>
                <ul style={{ listStyle: 'none', padding: 0, color: 'var(--text-secondary)', lineHeight: '1.8', fontSize: '0.9rem' }}>
                  <li>• 읽음 처리: 전체 메시지 조회 제거 → <strong style={{ color: 'var(--text-color)' }}>7,000건 기준 7,002개 → 2~3개</strong> 쿼리</li>
                  <li>• 보안: <strong style={{ color: 'var(--text-color)' }}>IDOR 제거</strong> — 클라이언트 userId/senderIdx 신뢰 중단, ACTIVE 참여자 검증</li>
                </ul>
              </div>
            </div>
          </section>

          {/* 2. 읽음 처리 성능 (대표) */}
          <section id="read-perf" style={{ marginBottom: '3rem', scrollMarginTop: '2rem' }}>
            <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>읽음 처리 성능 (대표)</h2>

            <div className="section-card" style={{ ...card, marginBottom: '1rem' }}>
              <h3 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>문제 — 읽음 처리마다 전체 메시지 조회</h3>
              <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', marginBottom: '0.75rem', fontSize: '0.9rem' }}>
                <code>markAsRead()</code>가 채팅방의 <strong style={{ color: 'var(--text-color)' }}>모든 메시지</strong>를 조회해 Java에서 필터링했고, 실제로는 쓰지 않는 <code>MessageReadStatus</code> 확인 루프까지 있었습니다. 필요한 건 참여자의 <code>unreadCount</code>·<code>lastReadMessage</code> 갱신뿐.
              </p>
              <MermaidDiagram chart={beforeSeq} />
            </div>

            <div className="section-card" style={{ ...card, marginBottom: '1rem' }}>
              <h3 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>해결 — 불필요 로직 제거</h3>
              <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', marginBottom: '0.5rem', fontSize: '0.9rem' }}>
                전체 메시지 조회와 미사용 <code>MessageReadStatus</code> 로직을 걷어내고, 참여자 상태 갱신만 남겼습니다. 프론트는 디바운싱으로 호출 빈도를 낮췄습니다.
              </p>
              <pre style={pre}>
{`@Transactional
public void markAsRead(Long conversationIdx, Long userId, Long lastMessageIdx) {
    ConversationParticipant participant = participantRepository
        .findByConversationIdxAndUserIdx(conversationIdx, userId)
        .orElseThrow(() -> new IllegalArgumentException("채팅방 참여자가 아닙니다."));

    participant.setUnreadCount(0);
    if (lastMessageIdx != null) {
        chatMessageRepository.findById(lastMessageIdx).ifPresent(m -> {
            participant.setLastReadMessage(m);
            participant.setLastReadAt(LocalDateTime.now());
        });
    }
    participantRepository.save(participant);
    // 전체 메시지 조회 · 미사용 MessageReadStatus 로직 제거
}`}
              </pre>
              <MermaidDiagram chart={afterSeq} />
            </div>
          </section>

          {/* 3. 보안 · 인가 계약 */}
          <section id="security" style={{ marginBottom: '3rem', scrollMarginTop: '2rem' }}>
            <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>보안 · 인가 계약</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1rem', lineHeight: 1.7 }}>
              "클라이언트가 넘긴 사용자 식별자를 신뢰하지 않고, 서버가 인증 주체와 리소스 관계로 판단한다"로 계약을 바꾼 작업입니다.
            </p>

            <div className="section-card" style={{ ...card, marginBottom: '1rem' }}>
              <h3 style={{ marginBottom: '0.5rem', color: 'var(--text-color)' }}>IDOR 제거 — JWT principal 기반 식별</h3>
              <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', fontSize: '0.9rem' }}>
                컨트롤러가 <code>userId·senderIdx·requesterId·providerId</code> 등을 요청 파라미터로 받아 로그인 주체와 불일치해도 호출되던 걸, <strong style={{ color: 'var(--text-color)' }}>JWT principal</strong>로만 식별하도록 변경. 펫케어 채팅은 <code>CareApplication</code> 당사자 검증, 직접 채팅은 <code>otherUserId</code>만 수신. 실종 채팅 시작도 목격자를 <strong style={{ color: 'var(--text-color)' }}>토큰 사용자</strong>로 고정(<code>witnessId</code> 제거).
              </p>
            </div>

            <div className="section-card" style={{ ...card, marginBottom: '1rem' }}>
              <h3 style={{ marginBottom: '0.5rem', color: 'var(--text-color)' }}>ACTIVE 참여자 검증 (requireActiveParticipant)</h3>
              <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', fontSize: '0.9rem' }}>
                <code>getMessagesBefore·searchMessages</code> 등에 참여자 검증이 없어 비참여 방의 메시지 커서 조회·검색이 가능했음. <code>requireActiveParticipant</code> 패턴으로 통일해 목록·커서·검색·읽음·unread·삭제가 모두 ACTIVE 참여자만 수행하도록 함.
              </p>
            </div>

            <div className="section-card" style={card}>
              <h3 style={{ marginBottom: '0.5rem', color: 'var(--text-color)' }}>PATCH 채팅방 상태 권한</h3>
              <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', fontSize: '0.9rem' }}>
                <code>PATCH .../conversations/{'{id}'}/status</code>에 검증이 없어 인증만 되면 임의 방 상태 변경이 가능했음 → ACTIVE 참여자만 허용.
              </p>
            </div>
          </section>

          {/* 4. 트랜잭션 · 검색 · 구조 */}
          <section id="tx-search" style={{ marginBottom: '3rem', scrollMarginTop: '2rem' }}>
            <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>트랜잭션 · 검색 · 구조</h2>

            <div className="section-card" style={{ ...card, marginBottom: '1rem' }}>
              <h3 style={{ marginBottom: '0.5rem', color: 'var(--text-color)' }}>REQUIRES_NEW self-invocation 수정</h3>
              <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', fontSize: '0.9rem' }}>
                <code>ConversationService</code>가 같은 클래스의 <code>createConversation(@Transactional(REQUIRES_NEW))</code>을 self-invocation으로 호출해 AOP 프록시를 안 거쳐 <strong style={{ color: 'var(--text-color)' }}>REQUIRES_NEW가 무시</strong>될 수 있었음 → <code>ConversationCreatorService</code>로 분리(참여자 검증 포함), 이벤트 리스너는 해당 빈 직접 호출.
              </p>
            </div>

            <div className="section-card" style={{ ...card, marginBottom: '1rem' }}>
              <h3 style={{ marginBottom: '0.5rem', color: 'var(--text-color)' }}>실종 채팅 N+1 · 검색 FULLTEXT</h3>
              <ul style={{ listStyle: 'none', padding: 0, color: 'var(--text-secondary)', lineHeight: '1.8', fontSize: '0.9rem' }}>
                <li>• <code>createMissingPetChat()</code> 루프 안 참여자 조회 반복(N+1) → <code>findParticipantsByConversationIdxsAndStatus</code> 배치 + <code>groupingBy</code> 매칭</li>
                <li>• 메시지 검색 <code>%keyword%</code>(인덱스 미활용) → <code>MATCH … AGAINST</code> + <code>idx_chat_message_content</code> FULLTEXT (운영 DB에 인덱스 반영 필요)</li>
              </ul>
            </div>

            <div className="section-card" style={card}>
              <h3 style={{ marginBottom: '0.5rem', color: 'var(--text-color)' }}>readOnly 트랜잭션 · 예외 통일</h3>
              <ul style={{ listStyle: 'none', padding: 0, color: 'var(--text-secondary)', lineHeight: '1.8', fontSize: '0.9rem' }}>
                <li>• <code>ConversationService</code> 클래스에 <code>@Transactional(readOnly = true)</code>, 쓰기 메서드만 <code>@Transactional</code></li>
                <li>• WebSocket 경로의 일반 <code>RuntimeException</code> → <code>UserNotFoundException</code> 등 도메인 예외로 통일</li>
              </ul>
            </div>
          </section>

          {/* 5. 요약 · 잔여 이슈 */}
          <section id="summary" style={{ marginBottom: '3rem', scrollMarginTop: '2rem' }}>
            <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>요약 · 잔여 이슈</h2>
            <div className="section-card" style={{ ...card, marginBottom: '1rem' }}>
              <p style={{ lineHeight: '1.8', color: 'var(--text-secondary)', marginBottom: '0.75rem', fontSize: '0.9rem' }}>
                2026-04-14 코드 리뷰의 Critical(보안 3·JPA·트랜잭션)·Warning을 대부분 해소했습니다.
              </p>
              <ul style={{ listStyle: 'none', padding: 0, color: 'var(--text-secondary)', lineHeight: '1.8', fontSize: '0.9rem' }}>
                <li>• <strong style={{ color: 'var(--text-color)' }}>잔여</strong>: <code>ConversationParticipant</code>의 단순 <code>(conversation_idx, user_idx)</code> UNIQUE는 소프트 삭제·재참여 이력과 충돌 가능 → 부분 유니크 전략 후 별도 마이그레이션 권장(보류)</li>
              </ul>
            </div>
            <div className="section-card" style={card}>
              <h3 style={{ marginBottom: '0.75rem', color: 'var(--text-color)' }}>관련 문서</h3>
              <ul style={{ listStyle: 'none', padding: 0, color: 'var(--text-secondary)', lineHeight: '1.9' }}>
                <li><a href="https://github.com/makkong1/makkong1-github.io/blob/main/docs/refactoring/chat/chat-code-review-2026-04-14.md" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--link-color)', textDecoration: 'none', fontWeight: 'bold' }}>→ Chat 코드 리뷰 결과 (전문)</a></li>
                <li><a href="https://github.com/makkong1/makkong1-github.io/blob/main/docs/refactoring/chat/chat-backend-security-transaction-2026-04-14.md" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--link-color)', textDecoration: 'none', fontWeight: 'bold' }}>→ Chat 백엔드 보안·트랜잭션·검색 정리 (전문)</a></li>
              </ul>
            </div>
          </section>
        </div>
        <TableOfContents sections={sections} />
      </div>
    </div>
  );
}

export default ChatDomainDetail;
