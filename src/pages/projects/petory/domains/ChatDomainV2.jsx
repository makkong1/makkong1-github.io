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

const PETORY_CHAT_MESSAGE_SERVICE =
  'https://github.com/makkong1/Petory/blob/main/backend/main/java/com/linkup/Petory/domain/chat/service/ChatMessageService.java';
const PETORY_CONVERSATION_SERVICE =
  'https://github.com/makkong1/Petory/blob/main/backend/main/java/com/linkup/Petory/domain/chat/service/ConversationService.java';
const PETORY_CONVERSATION_CREATOR =
  'https://github.com/makkong1/Petory/blob/main/backend/main/java/com/linkup/Petory/domain/chat/service/ConversationCreatorService.java';
const PETORY_CHAT_DOMAIN_DOC =
  'https://github.com/makkong1/Petory/blob/main/docs/domains/chat.md';
const PETORY_CHAT_ARCH_DOC =
  'https://github.com/makkong1/Petory/blob/main/docs/architecture/chat/%EC%B1%84%ED%8C%85%20%EC%8B%9C%EC%8A%A4%ED%85%9C%20%EC%84%A4%EA%B3%84.md';
const PETORY_CHAT_READ_DOC =
  'https://github.com/makkong1/Petory/blob/main/docs/troubleshooting/chat/read-status-performance.md';
const PETORY_CHAT_N1_DOC =
  'https://github.com/makkong1/Petory/blob/main/docs/troubleshooting/chat/n-plus-one-conversationparticipant.md';

function ChatDomainV2() {
  const sections = [
    { id: 'pillars', title: '핵심 기능' },
    { id: 'intro', title: '도메인 개요' },
    { id: 'design', title: '기술 결정' },
    { id: 'limits', title: '한계 & 개선' },
    { id: 'docs', title: '관련 페이지' },
  ];

  const li = (text) => <li style={{ marginBottom: '0.35rem' }}>• {text}</li>;

  const corePillars = [
    '채팅 생성 규칙 중앙화',
    'unread count 원자적 갱신',
    '읽음 처리 최적화',
    '재참여 메시지 제한',
    '참여자 N+1 개선',
  ];

  return (
    <div className="domain-page-wrapper" style={{ padding: '2rem 0' }}>
      <div
        className="domain-page-container"
        style={{ display: 'flex', gap: '2rem', alignItems: 'flex-start' }}
      >
        <div className="domain-page-content" style={{ flex: 1 }}>
          <h1 style={{ marginBottom: '0.5rem', color: 'var(--text-color)' }}>
            채팅 도메인
          </h1>
          <p
            style={{
              color: 'var(--text-secondary)',
              lineHeight: '1.8',
              marginBottom: '0.85rem',
              fontSize: '0.95rem',
            }}
          >
            Chat 도메인은 Petory에서 로그인 사용자 간 실시간 소통을 담당하지만,
            실제로는 Care·Missing Pet·Meetup의 핵심 액션을 연결하는 공용 인프라
            역할을 합니다. 단순 WebSocket 연결보다, 각 도메인에 맞는 채팅 생성
            규칙과 unread count 동시성 제어, 재참여 정책 같은 운영 디테일을 더
            중요하게 다뤘습니다. REST와 WebSocket 전송은 모두
            ChatMessageService로 모이고, 읽음 처리에서 전체 메시지를 다시 읽던
            비효율을 제거해 참여자 상태 필드만 갱신하는 방식으로 단순화했습니다.
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
              <p
                style={{
                  lineHeight: '1.8',
                  color: 'var(--text-secondary)',
                  margin: 0,
                }}
              >
                채팅 기능은 보통 "WebSocket 붙였다" 수준에서 끝나기 쉽지만,
                실제 서비스에서는 그 다음 문제가 더 어렵습니다. 기존 1:1
                채팅방을 재사용할 것인가, 모임에서 나간 사람이 다시 들어오면
                이전 대화를 어디까지 보여줄 것인가, 읽음 처리 시 수천 건
                메시지를 다시 읽는 구조를 어떻게 피할 것인가. 이 도메인은
                단순 메시지 송수신보다, 채팅을 비즈니스 흐름의 일부로
                설계한 점이 포트폴리오 가치입니다. REST 요청은
                AuthenticatedUserIdResolver가 사용자 idx를 결정하고, WebSocket은
                Principal 로그인 ID를 UsersRepository로 다시 조회해 발신자를
                정합니다.
              </p>
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
                    {['항목', 'Before', 'After'].map((h) => (
                      <th
                        key={h}
                        style={{
                          padding: '0.55rem 0.75rem',
                          textAlign: 'left',
                          color: 'var(--text-color)',
                        }}
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    [
                      '읽음 처리 메시지 조회',
                      '전체 메시지 조회 (수천~수만 건)',
                      'unreadCount·lastReadMessage 필드만 갱신',
                    ],
                    [
                      'unread count 갱신',
                      '루프 N번 save (Lost Update 위험)',
                      '원자적 UPDATE 1회 (본인 제외, ACTIVE만)',
                    ],
                    [
                      '채팅방 목록 참여자 조회',
                      'Converter LAZY 컬렉션 → N+1 발생',
                      '배치 조회 후 서비스 레이어 직접 세팅',
                    ],
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
                Care·Missing Pet·Meetup 연계 플로우는 통합 페이지에 모아 두었습니다. 같은
                패턴(unread·읽음·재참여)을 세 축에서 나란히 볼 수 있습니다.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', alignItems: 'flex-start' }}>
                <Link
                  to="/domains/flows?tab=chat&seq=care"
                  style={{
                    color: 'var(--link-color)',
                    fontWeight: 600,
                    textDecoration: 'none',
                  }}
                >
                  Chat ↔ Care 시퀀스 →
                </Link>
                <Link
                  to="/domains/flows?tab=chat&seq=missingpet"
                  style={{
                    color: 'var(--link-color)',
                    fontWeight: 600,
                    textDecoration: 'none',
                  }}
                >
                  Chat ↔ Missing Pet 시퀀스 →
                </Link>
                <Link
                  to="/domains/flows?tab=chat&seq=meetup"
                  style={{
                    color: 'var(--link-color)',
                    fontWeight: 600,
                    textDecoration: 'none',
                  }}
                >
                  Chat ↔ Meetup 시퀀스 →
                </Link>
                <Link
                  to="/domains/flows"
                  style={{
                    color: 'var(--text-secondary)',
                    fontSize: '0.82rem',
                    textDecoration: 'none',
                  }}
                >
                  전체 플로우 목록 보기 →
                </Link>
              </div>
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
                A. 채팅 생성 규칙 중앙화
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
                {li('REQUIRES_NEW 트랜잭션 — 호출 도메인 롤백이 채팅 생성에 전파되지 않도록 분리')}
                {li('actingUserId 검증 — JWT 기준 요청자가 반드시 참여자 목록에 포함되어야 함')}
                {li('relatedType + relatedIdx 기존 방은 ACTIVE 참여자 집합이 새 참여자 집합과 같을 때 재사용')}
                {li('DIRECT 타입: findDirectConversationBetweenUsers로 1:1 채팅방 재사용')}
                {li('Care·Missing Pet·Meetup이 각자 생성 로직을 흩뿌리지 않고 한 곳으로 위임')}
              </ul>
              <CodeBlock>{`// 채팅 생성 규칙 전체를 한 클래스로 (REQUIRES_NEW)
@Transactional(propagation = Propagation.REQUIRES_NEW)
public ConversationDTO createConversation(
        ConversationType type, RelatedType relatedType,
        Long relatedIdx, String title,
        List<Long> participantIds, Long actingUserId) {

    // 1. actingUser가 참여자 목록에 있는지 검증
    if (!participants.stream().map(Users::getIdx)
            .anyMatch(actingUserId::equals))
        throw ChatForbiddenException.notAllowedToCreateConversation();

    // 2. relatedType 기준 기존 방은 ACTIVE 참여자 집합까지 비교 후 재사용
    if (relatedType != null && relatedIdx != null) {
        Optional<Conversation> existing = conversationRepository
            .findByRelatedTypeAndRelatedIdxAndIsDeletedFalse(relatedType, relatedIdx);
        if (existing.isPresent()
                && hasSameActiveParticipants(existing.get(), participantIds)) {
            return existing.get(); // 재사용
        }
    }

    // 3. DIRECT 타입: 두 사용자 간 1:1 채팅방 재사용
    if (type == ConversationType.DIRECT && participants.size() == 2) {
        Optional<Conversation> existing = conversationRepository
            .findDirectConversationBetweenUsers(...);
        if (existing.isPresent()) return existing.get();
    }
    // 4. 신규 생성
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
                B. unread count 원자적 갱신
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
                {li('메시지 전송 시 참여자별 루프 save → Lost Update 위험')}
                {li('incrementUnreadCount: UPDATE SET count+1 WHERE idx != sender AND ACTIVE — 원자적 1회')}
                {li('마지막 메시지 미리보기·시각도 함께 갱신 (lastMessagePreview·lastMessageAt)')}
              </ul>
              <CodeBlock>{`// 메시지 저장 후 원자적 unread 증가
chatMessageRepository.save(message);

// 루프 save 대신 DB 레벨 원자적 UPDATE (본인 제외, ACTIVE 참여자만)
participantRepository.incrementUnreadCount(conversationIdx, senderIdx);
// UPDATE ConversationParticipant p
// SET p.unreadCount = p.unreadCount + 1
// WHERE p.conversation.idx = :conversationIdx
//   AND p.user.idx != :senderUserId
//   AND p.status = 'ACTIVE'

// 채팅방 메타데이터 갱신
conversation.setLastMessageAt(LocalDateTime.now());
conversation.setLastMessagePreview(preview);`}</CodeBlock>
            </Card>

            <Card style={{ marginBottom: '1rem' }}>
              <h3
                style={{
                  marginBottom: '0.75rem',
                  color: 'var(--text-color)',
                  fontSize: '1rem',
                }}
              >
                C. 읽음 처리 최적화
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
                {li('이전: 채팅방 전체 메시지 조회 후 Java에서 필터링 — 수천~수만 건 조회')}
                {li('이후: unreadCount=0, lastReadMessage, lastReadAt 필드만 갱신')}
                {li('사용되지 않던 MessageReadStatus 기록 로직도 함께 제거 — 트랜잭션 범위 축소')}
              </ul>
              <CodeBlock>{`// markAsRead — 전체 메시지 조회 없이 참여자 필드만 갱신
participant.setUnreadCount(0);
if (lastMessageIdx != null) {
    ChatMessage lastMessage = chatMessageRepository
        .findById(lastMessageIdx).orElse(null);
    if (lastMessage != null) {
        participant.setLastReadMessage(lastMessage);
        participant.setLastReadAt(LocalDateTime.now());
    }
}
participantRepository.save(participant);

// ⚠️ 제거됨: 전체 메시지 조회 + MessageReadStatus 기록 로직
// — 수천~수만 건 조회 및 미사용 기록으로 트랜잭션 비용 과다`}</CodeBlock>
            </Card>

            <Card style={{ marginBottom: '1rem' }}>
              <h3
                style={{
                  marginBottom: '0.75rem',
                  color: 'var(--text-color)',
                  fontSize: '1rem',
                }}
              >
                D. 재참여 메시지 제한
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
                {li('모임 등 재참여 시 이전 대화 전체 노출 방지')}
                {li('lastReadMessage == null && joinedAt != null → 재참여로 판단')}
                {li('joinedAt 이후 메시지만 조회 — 참여 시점의 의미를 명확히 정의')}
              </ul>
              <CodeBlock>{`// getMessages — 재참여 여부에 따라 조회 분기
LocalDateTime readFrom = null;
if (participant.getLastReadMessage() == null
        && participant.getJoinedAt() != null) {
    // 재참여: lastReadMessage 없고 joinedAt 있으면 재참여로 간주
    readFrom = participant.getJoinedAt();
}

if (readFrom != null) {
    // 재참여: joinedAt 이후 메시지만
    messages = chatMessageRepository
        .findByConversationIdxAndCreatedAtAfterOrderByCreatedAtDesc(
            conversationIdx, readFrom, pageable);
} else {
    // 기존 참여자: 전체 메시지
    messages = chatMessageRepository
        .findByConversationIdxOrderByCreatedAtDesc(
            conversationIdx, pageable);
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
                E. 참여자 조회 N+1 개선
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
                {li('채팅방 목록 변환 시 Converter에서 LAZY 컬렉션 접근 → 채팅방 수만큼 N+1 발생')}
                {li('참여자 데이터를 배치 조회 후 서비스 레이어에서 직접 DTO에 세팅')}
                {li('Converter는 이미 조회된 데이터만 변환 — 추가 쿼리 없음')}
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
                  'Care 거래 확정: CARE_REQUEST 경로는 상태 변경·후속 코인 처리가 이어지지만 에스크로 실패 롤백은 미구현'
                )}
                {li(
                  'Care 거래 확정: CARE_APPLICATION 관련 confirmCareDeal()은 현재 로그 기록 중심 — 상태 전이 완전 미구현'
                )}
                {li(
                  'Meetup 채팅 참여: 모임 참여자 검증은 추가됐지만, 채팅 참여 실패와 모임 참여 취소·복구 결합은 정책 여지 있음'
                )}
                {li(
                  '재참여 메시지 제한: 기본 조회는 joinedAt 이후지만 커서 기반 과거 조회(/before)는 joinedAt 제한을 적용하지 않음'
                )}
                {li(
                  '채팅방 상태 변경: PATCH /status는 ACTIVE 참여자면 가능 — 방장·관리자 전용 정책은 아직 없음'
                )}
                {li(
                  'Chat API 전체 로그인 사용자 전용 — SecurityConfig /api/** authenticated() 적용'
                )}
                {li(
                  'WebSocket 브로커는 Spring SimpleBroker 기반 — 다중 서버 확장 시 외부 브로커, 세션 공유, 전달 보장 설계 필요'
                )}
                {li(
                  'REST sender는 AuthenticatedUserIdResolver, WebSocket sender는 Principal.getName() → findByIdString()으로 결정'
                )}
                {li('FULLTEXT 검색은 chatmessage(content) 인덱스가 실제 DB에 적용되어야 안정 동작')}
                {li(
                  'ConversationParticipant 유니크 제약은 soft delete 이력과 재참여 정책 정리 후 적용 필요'
                )}
                {li('ADMIN_SUPPORT, GROUP, SYSTEM, NOTICE, FILE 타입은 모델에 있지만 사용자 플로우는 일부만 구현')}
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
                    to="/domains/chat/optimization"
                    style={{ color: 'var(--link-color)', textDecoration: 'none' }}
                  >
                    Chat 성능 최적화
                  </Link>
                  {' — 읽음 처리 Before/After, 참여자 N+1 상세'}
                </li>
                <li>
                  •{' '}
                  <Link
                    to="/domains/chat/refactoring"
                    style={{ color: 'var(--link-color)', textDecoration: 'none' }}
                  >
                    Chat 리팩토링
                  </Link>
                  {' — 생성 규칙 분리, 트랜잭션 보안 정리'}
                </li>
                <li>
                  •{' '}
                  <Link
                    to="/domains/care"
                    style={{ color: 'var(--link-color)', textDecoration: 'none' }}
                  >
                    Care 도메인
                  </Link>
                  {' — 거래 확정과 에스크로 연결'}
                </li>
                <li>
                  •{' '}
                  <Link
                    to="/domains/meetup"
                    style={{ color: 'var(--link-color)', textDecoration: 'none' }}
                  >
                    Meetup 도메인
                  </Link>
                  {' — 모임 생성 후 그룹 채팅방 생성'}
                </li>
                <li>
                  •{' '}
                  <Link
                    to="/domains/missing-pet"
                    style={{ color: 'var(--link-color)', textDecoration: 'none' }}
                  >
                    Missing Pet 도메인
                  </Link>
                  {' — 실종 제보자·목격자 채팅'}
                </li>
                <li>
                  •{' '}
                  <a
                    href={PETORY_CHAT_MESSAGE_SERVICE}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: 'var(--link-color)', textDecoration: 'none' }}
                  >
                    ChatMessageService.java
                  </a>
                </li>
                <li>
                  •{' '}
                  <a
                    href={PETORY_CONVERSATION_SERVICE}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: 'var(--link-color)', textDecoration: 'none' }}
                  >
                    ConversationService.java
                  </a>
                </li>
                <li>
                  •{' '}
                  <a
                    href={PETORY_CONVERSATION_CREATOR}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: 'var(--link-color)', textDecoration: 'none' }}
                  >
                    ConversationCreatorService.java
                  </a>
                </li>
                <li>
                  •{' '}
                  <a
                    href={PETORY_CHAT_DOMAIN_DOC}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: 'var(--link-color)', textDecoration: 'none' }}
                  >
                    chat.md (Petory)
                  </a>
                </li>
                <li>
                  •{' '}
                  <a
                    href={PETORY_CHAT_ARCH_DOC}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: 'var(--link-color)', textDecoration: 'none' }}
                  >
                    채팅 시스템 설계
                  </a>
                </li>
                <li>
                  •{' '}
                  <a
                    href={PETORY_CHAT_READ_DOC}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: 'var(--link-color)', textDecoration: 'none' }}
                  >
                    read-status-performance.md
                  </a>
                </li>
                <li>
                  •{' '}
                  <a
                    href={PETORY_CHAT_N1_DOC}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: 'var(--link-color)', textDecoration: 'none' }}
                  >
                    n-plus-one-conversationparticipant.md
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

export default ChatDomainV2;
