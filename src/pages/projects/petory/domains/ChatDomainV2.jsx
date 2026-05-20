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

const PETORY_CHAT_MESSAGE_SERVICE =
  'https://github.com/makkong1/Petory/blob/main/backend/main/java/com/linkup/Petory/domain/chat/service/ChatMessageService.java';
const PETORY_CONVERSATION_CREATOR =
  'https://github.com/makkong1/Petory/blob/main/backend/main/java/com/linkup/Petory/domain/chat/service/ConversationCreatorService.java';

function ChatDomainV2() {
  const sections = [
    { id: 'pillars', title: '핵심 기능' },
    { id: 'intro', title: '도메인 개요' },
    { id: 'design', title: '기술 결정' },
    { id: 'limits', title: '한계 & 개선' },
    { id: 'docs', title: '관련 페이지' },
  ];

  const corePillars = [
    '채팅 생성 규칙 중앙화',
    'unread count 원자적 갱신',
    '읽음 처리 최적화',
    '재참여 메시지 제한',
    '참여자 N+1 개선',
  ];

  const flowDiagram = `flowchart TD
    subgraph Domains["타 도메인에서 채팅 생성"]
        CR["Care\\nCARE\\_REQUEST 채팅"]
        MP["Missing Pet\\n목격자-제보자 채팅"]
        MT["Meetup\\n그룹 채팅"]
    end

    CC["ConversationCreatorService\\nREQUIRES\\_NEW\\n생성 · DIRECT 재사용 · 참여자 검증"]
    CP["ConversationParticipant\\nunreadCount · joinedAt · lastReadMessage"]

    subgraph Msg["메시지 흐름"]
        SM["sendMessage"]
        IU["incrementUnreadCount\\nUPDATE count+1\\nWHERE idx != sender AND ACTIVE"]
        GM["getMessages\\n재참여 시 joinedAt 이후만"]
        MR["markAsRead\\nunreadCount=0 · lastReadMessage 갱신"]
    end

    CR & MP & MT -->|relatedType + relatedIdx| CC
    CC --> CP
    SM --> IU
    IU --> CP
    GM -->|joinedAt 기준 분기| CP
    MR --> CP`;

  const li = (text) => <li style={{ marginBottom: '0.35rem' }}>• {text}</li>;

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
            중요하게 다뤘습니다. 읽음 처리에서 전체 메시지를 다시 읽던 비효율을
            제거하고, 참여자 상태 필드만 갱신하는 방식으로 단순화했습니다.
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
                설계한 점이 포트폴리오 가치입니다.
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
                {li('relatedType + relatedIdx 기반 기존 채팅방 재사용 — 중복 생성 방지')}
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

    // 2. relatedType 기준 기존 채팅방 재사용
    if (relatedType != null && relatedIdx != null) {
        Optional<Conversation> existing = conversationRepository
            .findByRelatedTypeAndRelatedIdxAndIsDeletedFalse(relatedType, relatedIdx);
        if (existing.isPresent()) return existing.get(); // 재사용
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
                  'Meetup 채팅 참여: joinMeetupChat()은 실제 모임 참여자 검증 없이 채팅 참여 허용'
                )}
                {li(
                  '재참여 메시지 제한: 기본 조회는 joinedAt 이후지만 커서 기반 과거 조회(getMessagesBefore)는 별도 보완 필요'
                )}
                {li(
                  '채팅방 상태 변경: 활성 참여자 여부 기준으로 동작 — 역할별 상태 변경 정책은 더 정교화 가능'
                )}
                {li(
                  'Chat API 전체 로그인 사용자 전용 — SecurityConfig /api/** authenticated() 적용'
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
                    href={PETORY_CONVERSATION_CREATOR}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: 'var(--link-color)', textDecoration: 'none' }}
                  >
                    ConversationCreatorService.java
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
