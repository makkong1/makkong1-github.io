import { Link } from "react-router-dom";
import MermaidDiagram from "../../../../components/Common/MermaidDiagram";
import TableOfContents from "../../../../components/Common/TableOfContents";

const GH = "https://github.com/makkong1/makkong1-github.io/blob/main";

function Card({ children, style }) {
  return (
    <div
      className="section-card"
      style={{
        padding: "1.5rem",
        backgroundColor: "var(--card-bg)",
        borderRadius: "8px",
        border: "1px solid var(--nav-border)",
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
        padding: "0.95rem 1rem",
        backgroundColor: "var(--bg-color)",
        borderRadius: "6px",
        overflowX: "auto",
        fontSize: "0.84rem",
        color: "var(--text-secondary)",
        fontFamily: "monospace",
        lineHeight: "1.65",
        margin: "0.75rem 0 0",
        whiteSpace: "pre-wrap",
      }}
    >
      {children}
    </pre>
  );
}

function ChatDomain() {
  const sections = [
    { id: "intro", title: "도메인 개요" },
    { id: "features", title: "주요 기능" },
    { id: "service", title: "핵심 서비스 로직" },
    { id: "architecture", title: "아키텍처" },
    { id: "api", title: "API와 보안" },
    { id: "performance", title: "트랜잭션과 성능" },
    { id: "summary", title: "핵심 포인트" },
    { id: "docs", title: "관련 문서" },
  ];

  const entityDiagram = `erDiagram
    Conversation ||--o{ ConversationParticipant : "participants"
    Conversation ||--o{ ChatMessage : "messages"
    Users ||--o{ ConversationParticipant : "joins"
    Users ||--o{ ChatMessage : "sends"
    ChatMessage ||--o| ChatMessage : "replyTo"
    Conversation }o--|| CareApplication : "related"
    Conversation }o--|| MissingPetBoard : "related"
    Conversation }o--|| Meetup : "related"`;

  const flowDiagram = `sequenceDiagram
    participant Client
    participant WS as WebSocket/STOMP
    participant WSC as ChatWebSocketController
    participant CMS as ChatMessageService
    participant CPR as ConversationParticipantRepository
    participant CMR as ChatMessageRepository

    Client->>WS: /app/chat.send
    WS->>WSC: Principal + payload
    WSC->>CMS: sendMessage(conversationIdx, senderId, ...)
    CMS->>CPR: ACTIVE participant 확인
    CMS->>CMR: message save
    CMS->>CPR: incrementUnreadCount()
    CMS-->>WSC: ChatMessageDTO
    WSC-->>WS: /topic/conversation/{conversationIdx}
    WS-->>Client: 실시간 브로드캐스트`;

  const li = (text) => <li style={{ marginBottom: "0.35rem" }}>• {text}</li>;

  return (
    <div className="domain-page-wrapper" style={{ padding: "2rem 0" }}>
      <div
        className="domain-page-container"
        style={{ display: "flex", gap: "2rem", alignItems: "flex-start" }}
      >
        <div className="domain-page-content" style={{ flex: 1, maxWidth: "56rem" }}>
          <h1 style={{ marginBottom: "0.5rem", color: "var(--text-color)" }}>Chat 도메인</h1>
          <p
            style={{
              color: "var(--text-secondary)",
              lineHeight: "1.8",
              marginBottom: "2.5rem",
              fontSize: "0.95rem",
            }}
          >
            Chat 도메인은 단순 메시지 저장소가 아니라 실시간 WebSocket 전송, 채팅방 생성과 재사용,
            읽지 않은 메시지 수 관리, 펫케어 거래 확정, 실종 제보와 산책모임 연동까지 묶어서 처리하는
            실시간 협업 도메인입니다.
          </p>

          <section id="intro" style={{ marginBottom: "3rem", scrollMarginTop: "2rem" }}>
            <h2 style={{ marginBottom: "1rem", color: "var(--text-color)" }}>도메인 개요</h2>
            <Card style={{ marginBottom: "1rem" }}>
              <p style={{ color: "var(--text-secondary)", lineHeight: "1.8", marginBottom: "0.75rem" }}>
                <code>docs/domains/chat.md</code> 기준으로 Chat은
                <strong style={{ color: "var(--text-color)" }}> STOMP 기반 실시간 채팅</strong>과
                <strong style={{ color: "var(--text-color)" }}> 채팅방 수명주기 관리</strong>를 같이 담당합니다.
              </p>
              <ul
                style={{
                  listStyle: "none",
                  padding: 0,
                  margin: 0,
                  color: "var(--text-secondary)",
                  lineHeight: "1.8",
                }}
              >
                {li("1:1, 그룹, 펫케어, 실종제보, 산책모임 채팅방을 하나의 도메인에서 통합 관리합니다.")}
                {li("메시지 전송 시 unreadCount를 DB 레벨에서 원자적으로 증가시켜 Lost Update를 막습니다.")}
                {li("재참여 사용자는 joinedAt 이후 메시지만 보도록 제한해 대화 경계를 유지합니다.")}
                {li("펫케어 거래 확정은 채팅 흐름 안에서 양측 확인 상태를 관리합니다.")}
              </ul>
            </Card>

            <Card>
              <h3 style={{ marginBottom: "0.75rem", color: "var(--text-color)", fontSize: "1rem" }}>
                현재 문서 기준 핵심 변화
              </h3>
              <ul
                style={{
                  listStyle: "none",
                  padding: 0,
                  margin: 0,
                  color: "var(--text-secondary)",
                  lineHeight: "1.8",
                }}
              >
                {li("REST는 클라이언트 userId를 받지 않고 SecurityContext principal만 사용자 식별에 사용합니다.")}
                {li("메시지 읽음 처리는 MessageReadStatus를 버리고 unreadCount + lastReadMessage로 단순화했습니다.")}
                {li("ConversationCreatorService를 별도 빈으로 분리해 REQUIRES_NEW가 실제로 적용되도록 정리했습니다.")}
                {li("실종 제보 채팅방 생성 시 참가자 배치 조회로 기존 N+1 문제를 줄였습니다.")}
              </ul>
            </Card>
          </section>

          <section id="features" style={{ marginBottom: "3rem", scrollMarginTop: "2rem" }}>
            <h2 style={{ marginBottom: "1rem", color: "var(--text-color)" }}>주요 기능</h2>
            <Card style={{ marginBottom: "1rem" }}>
              <h3 style={{ marginBottom: "0.75rem", color: "var(--text-color)", fontSize: "1rem" }}>
                채팅방 타입
              </h3>
              <table
                style={{
                  width: "100%",
                  borderCollapse: "collapse",
                  fontSize: "0.9rem",
                  color: "var(--text-secondary)",
                }}
              >
                <thead>
                  <tr style={{ borderBottom: "1px solid var(--nav-border)" }}>
                    <th style={{ padding: "0.65rem 0.75rem", textAlign: "left", color: "var(--text-color)" }}>타입</th>
                    <th style={{ padding: "0.65rem 0.75rem", textAlign: "left", color: "var(--text-color)" }}>의미</th>
                    <th style={{ padding: "0.65rem 0.75rem", textAlign: "left", color: "var(--text-color)" }}>특징</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["DIRECT", "일반 1:1 채팅", "기존 방 재사용, 필요 시 relatedType/relatedIdx 갱신"],
                    ["CARE_REQUEST", "펫케어 채팅", "지원서 기준 생성, 거래 확정 흐름과 연결"],
                    ["MISSING_PET", "실종 제보 채팅", "제보자-목격자 조합별 개별 방"],
                    ["MEETUP", "산책모임 그룹 채팅", "모임 참여 시 자동 참여, 나가면 LEFT 처리"],
                    ["GROUP", "일반 그룹 채팅", "ParticipantRole로 역할 조정"],
                  ].map(([type, meaning, note], index, arr) => (
                    <tr key={type} style={{ borderBottom: index < arr.length - 1 ? "1px solid var(--nav-border)" : "none" }}>
                      <td style={{ padding: "0.65rem 0.75rem", color: "var(--text-color)" }}>{type}</td>
                      <td style={{ padding: "0.65rem 0.75rem" }}>{meaning}</td>
                      <td style={{ padding: "0.65rem 0.75rem" }}>{note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p style={{ color: "var(--text-secondary)", lineHeight: "1.8", marginTop: "0.75rem", marginBottom: 0 }}>
                문서 기준으로 <code>ADMIN_SUPPORT</code>는 enum만 존재하고 현재 운영 흐름에는 포함되지 않습니다.
              </p>
            </Card>

            <Card style={{ marginBottom: "1rem" }}>
              <h3 style={{ marginBottom: "0.75rem", color: "var(--text-color)", fontSize: "1rem" }}>
                실시간 메시지와 읽음 처리
              </h3>
              <ul
                style={{
                  listStyle: "none",
                  padding: 0,
                  margin: 0,
                  color: "var(--text-secondary)",
                  lineHeight: "1.8",
                }}
              >
                {li("메시지 타입은 TEXT, IMAGE, FILE, SYSTEM, NOTICE를 지원합니다.")}
                {li("메시지 전송 시 발신자를 제외한 ACTIVE 참여자의 unreadCount를 증가시킵니다.")}
                {li("읽음 처리 시 unreadCount를 0으로 초기화하고 마지막 읽은 메시지와 시각만 남깁니다.")}
                {li("MessageReadStatus 테이블을 쓰지 않아 대량 메시지 읽음 시 쿼리 폭증을 피합니다.")}
              </ul>
            </Card>

            <Card>
              <h3 style={{ marginBottom: "0.75rem", color: "var(--text-color)", fontSize: "1rem" }}>
                재참여와 도메인 연동
              </h3>
              <ul
                style={{
                  listStyle: "none",
                  padding: 0,
                  margin: 0,
                  color: "var(--text-secondary)",
                  lineHeight: "1.8",
                }}
              >
                {li("채팅방에서 나간 뒤 다시 들어오면 joinedAt 이후 메시지만 조회합니다.")}
                {li("실종 제보는 같은 게시글이어도 목격자마다 별도 채팅방을 가질 수 있습니다.")}
                {li("산책모임은 참여와 동시에 그룹 채팅에 연결되고, 나가면 채팅방 상태만 LEFT로 바뀝니다.")}
                {li("펫케어는 채팅방에서 양측이 모두 확정해야 거래 승인으로 이어집니다.")}
              </ul>
            </Card>
          </section>

          <section id="service" style={{ marginBottom: "3rem", scrollMarginTop: "2rem" }}>
            <h2 style={{ marginBottom: "1rem", color: "var(--text-color)" }}>핵심 서비스 로직</h2>
            <Card style={{ marginBottom: "1rem" }}>
              <h3 style={{ marginBottom: "0.75rem", color: "var(--text-color)", fontSize: "1rem" }}>
                채팅방 생성 흐름
              </h3>
              <ol style={{ margin: 0, paddingLeft: "1.2rem", color: "var(--text-secondary)", lineHeight: "1.8" }}>
                <li>요청자는 JWT principal 기준으로 식별되고, participant 목록에 본인이 포함돼야 합니다.</li>
                <li>사용자 존재 여부와 탈퇴 여부를 먼저 검증합니다.</li>
                <li>relatedType/relatedIdx가 있으면 기존 연관 채팅방을 우선 탐색합니다.</li>
                <li>1:1 채팅은 기존 DIRECT 방이 있으면 재사용하고 필요 시 연관 정보를 덮어씁니다.</li>
                <li>실제 생성은 ConversationCreatorService가 REQUIRES_NEW 트랜잭션에서 수행합니다.</li>
              </ol>
            </Card>

            <Card style={{ marginBottom: "1rem" }}>
              <h3 style={{ marginBottom: "0.75rem", color: "var(--text-color)", fontSize: "1rem" }}>
                메시지 전송과 실시간 브로드캐스트
              </h3>
              <MermaidDiagram chart={flowDiagram} />
              <CodeBlock>{`@Modifying
@Query("UPDATE ConversationParticipant p SET p.unreadCount = p.unreadCount + 1 " +
       "WHERE p.conversation.idx = :conversationIdx " +
       "AND p.user.idx != :senderUserId " +
       "AND p.status = 'ACTIVE'")
void incrementUnreadCount(Long conversationIdx, Long senderUserId);`}</CodeBlock>
              <p style={{ color: "var(--text-secondary)", lineHeight: "1.8", marginTop: "0.75rem", marginBottom: 0 }}>
                메시지 저장 후 unreadCount를 SQL 한 번으로 증가시켜 동시 전송 상황에서도 카운트 유실을 막습니다.
              </p>
            </Card>

            <Card style={{ marginBottom: "1rem" }}>
              <h3 style={{ marginBottom: "0.75rem", color: "var(--text-color)", fontSize: "1rem" }}>
                읽음 처리 단순화
              </h3>
              <ul
                style={{
                  listStyle: "none",
                  padding: 0,
                  margin: 0,
                  color: "var(--text-secondary)",
                  lineHeight: "1.8",
                }}
              >
                {li("ACTIVE 참여자만 읽음 처리를 호출할 수 있습니다.")}
                {li("unreadCount를 0으로 만들고, lastMessageIdx가 있으면 lastReadMessage와 lastReadAt을 기록합니다.")}
                {li("예전 MessageReadStatus 기록 방식은 성능 문제와 낮은 활용도 때문에 제거됐습니다.")}
                {li("이 최적화는 별도 페이지에서 상세하게 정리돼 있습니다.")}
              </ul>
              <p style={{ marginTop: "0.75rem", marginBottom: 0 }}>
                <Link to="/domains/chat/optimization" style={{ color: "var(--link-color)", textDecoration: "none", fontWeight: "bold" }}>
                  메시지 읽음 처리 최적화 페이지 보기
                </Link>
              </p>
            </Card>

            <Card>
              <h3 style={{ marginBottom: "0.75rem", color: "var(--text-color)", fontSize: "1rem" }}>
                도메인별 특화 로직
              </h3>
              <ul
                style={{
                  listStyle: "none",
                  padding: 0,
                  margin: 0,
                  color: "var(--text-secondary)",
                  lineHeight: "1.8",
                }}
              >
                {li("createMissingPetChat()은 제보자-목격자 조합 단위로 채팅방을 만들고 본인 제보 채팅은 막습니다.")}
                {li("joinMeetupChat()은 재참여 시 unreadCount, lastReadMessage, lastReadAt을 초기화합니다.")}
                {li("leaveConversation()은 ACTIVE 참여자가 모두 없어지면 채팅방을 CLOSED로 바꿉니다.")}
                {li("confirmCareDeal()은 양측 dealConfirmed가 모두 true일 때 Care 도메인 승인 흐름으로 연결됩니다.")}
              </ul>
            </Card>
          </section>

          <section id="architecture" style={{ marginBottom: "3rem", scrollMarginTop: "2rem" }}>
            <h2 style={{ marginBottom: "1rem", color: "var(--text-color)" }}>아키텍처</h2>
            <Card style={{ marginBottom: "1rem" }}>
              <h3 style={{ marginBottom: "0.75rem", color: "var(--text-color)", fontSize: "1rem" }}>
                엔티티 구조
              </h3>
              <MermaidDiagram chart={entityDiagram} />
            </Card>

            <Card style={{ marginBottom: "1rem" }}>
              <h3 style={{ marginBottom: "0.75rem", color: "var(--text-color)", fontSize: "1rem" }}>
                핵심 엔티티
              </h3>
              <table
                style={{
                  width: "100%",
                  borderCollapse: "collapse",
                  fontSize: "0.9rem",
                  color: "var(--text-secondary)",
                }}
              >
                <tbody>
                  {[
                    ["Conversation", "conversationType, relatedType, relatedIdx, status, lastMessageAt, lastMessagePreview"],
                    ["ConversationParticipant", "role, unreadCount, lastReadMessage, joinedAt, leftAt, dealConfirmed"],
                    ["ChatMessage", "messageType, content, replyToMessage, isDeleted, createdAt, updatedAt"],
                  ].map(([name, fields], index, arr) => (
                    <tr key={name} style={{ borderBottom: index < arr.length - 1 ? "1px solid var(--nav-border)" : "none" }}>
                      <td style={{ padding: "0.65rem 0.75rem", color: "var(--text-color)", width: "12rem" }}>{name}</td>
                      <td style={{ padding: "0.65rem 0.75rem" }}>{fields}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p style={{ color: "var(--text-secondary)", lineHeight: "1.8", marginTop: "0.75rem", marginBottom: 0 }}>
                <code>ChatMessage</code>만 <code>BaseTimeEntity</code>를 상속하고,
                <code> Conversation</code>과 <code>ConversationParticipant</code>는
                <code> @PrePersist/@PreUpdate</code>로 시간을 직접 관리합니다.
              </p>
            </Card>

            <Card style={{ marginBottom: "1rem" }}>
              <h3 style={{ marginBottom: "0.75rem", color: "var(--text-color)", fontSize: "1rem" }}>
                패키지 구조
              </h3>
              <CodeBlock>{`domain/chat/
  controller/
  service/
  entity/
  repository/
  converter/
  dto/
  exception/`}</CodeBlock>
              <p style={{ color: "var(--text-secondary)", lineHeight: "1.8", marginTop: "0.75rem", marginBottom: 0 }}>
                문서 기준으로 Controller, Service, Repository, Converter, DTO, Exception이 도메인 내부에 정리되어 있습니다.
              </p>
            </Card>

            <Card>
              <h3 style={{ marginBottom: "0.75rem", color: "var(--text-color)", fontSize: "1rem" }}>
                주요 예외
              </h3>
              <ul
                style={{
                  listStyle: "none",
                  padding: 0,
                  margin: 0,
                  color: "var(--text-secondary)",
                  lineHeight: "1.8",
                }}
              >
                {li("ConversationNotFoundException, ChatMessageNotFoundException")}
                {li("ChatForbiddenException: notParticipant, notActiveParticipant, ownMessageOnly, deletedUserCannotSend")}
                {li("ChatConflictException: 중복 채팅방 등 충돌")}
                {li("ChatValidationException: 최소 인원, 자기 자신과의 채팅, 본인 제보 채팅 금지 등")}
              </ul>
            </Card>
          </section>

          <section id="api" style={{ marginBottom: "3rem", scrollMarginTop: "2rem" }}>
            <h2 style={{ marginBottom: "1rem", color: "var(--text-color)" }}>API와 보안</h2>
            <Card style={{ marginBottom: "1rem" }}>
              <h3 style={{ marginBottom: "0.75rem", color: "var(--text-color)", fontSize: "1rem" }}>
                REST API 요약
              </h3>
              <ul
                style={{
                  listStyle: "none",
                  padding: 0,
                  margin: 0,
                  color: "var(--text-secondary)",
                  lineHeight: "1.8",
                }}
              >
                {li("GET /api/chat/conversations, GET /api/chat/conversations/{conversationIdx}")}
                {li("POST /api/chat/conversations, /care-request, /direct")}
                {li("POST /api/chat/conversations/{conversationIdx}/leave, /confirm-deal")}
                {li("PATCH /api/chat/conversations/{conversationIdx}/status")}
                {li("POST /api/chat/messages, GET /conversation/{conversationIdx}, /before, /search, /unread-count")}
                {li("POST /api/missing-pets/{boardIdx}/start-chat")}
              </ul>
            </Card>

            <Card style={{ marginBottom: "1rem" }}>
              <h3 style={{ marginBottom: "0.75rem", color: "var(--text-color)", fontSize: "1rem" }}>
                WebSocket/STOMP 경로
              </h3>
              <table
                style={{
                  width: "100%",
                  borderCollapse: "collapse",
                  fontSize: "0.9rem",
                  color: "var(--text-secondary)",
                }}
              >
                <tbody>
                  {[
                    ["/app/chat.send", "실시간 메시지 전송"],
                    ["/app/chat.read", "실시간 읽음 처리"],
                    ["/app/chat.typing", "타이핑 상태 전달"],
                    ["/topic/conversation/{conversationIdx}", "채팅방 메시지 구독"],
                    ["/topic/conversation/{conversationIdx}/typing", "타이핑 브로드캐스트"],
                    ["/user/{loginId}/queue/errors", "개인 에러 큐"],
                  ].map(([path, meaning], index, arr) => (
                    <tr key={path} style={{ borderBottom: index < arr.length - 1 ? "1px solid var(--nav-border)" : "none" }}>
                      <td style={{ padding: "0.65rem 0.75rem", color: "var(--text-color)", width: "20rem" }}>{path}</td>
                      <td style={{ padding: "0.65rem 0.75rem" }}>{meaning}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Card>

            <Card>
              <h3 style={{ marginBottom: "0.75rem", color: "var(--text-color)", fontSize: "1rem" }}>
                보안 정책
              </h3>
              <ul
                style={{
                  listStyle: "none",
                  padding: 0,
                  margin: 0,
                  color: "var(--text-secondary)",
                  lineHeight: "1.8",
                }}
              >
                {li("REST는 SecurityContext principal(Long 문자열)만 신뢰하고 클라이언트 userId 파라미터를 받지 않습니다.")}
                {li("메시지 조회, 커서 조회, 검색, 읽음, 삭제, unreadCount, 상태 변경은 ACTIVE 참여자 검증 후에만 동작합니다.")}
                {li("WebSocket도 JWT 인터셉터 검증을 전제로 하고, 서버가 Principal 기준으로 발신자를 결정합니다.")}
                {li("메시지 삭제는 본인 메시지에 대해서만 허용되며 Soft Delete로 처리됩니다.")}
              </ul>
            </Card>
          </section>

          <section id="performance" style={{ marginBottom: "3rem", scrollMarginTop: "2rem" }}>
            <h2 style={{ marginBottom: "1rem", color: "var(--text-color)" }}>트랜잭션과 성능</h2>
            <Card style={{ marginBottom: "1rem" }}>
              <h3 style={{ marginBottom: "0.75rem", color: "var(--text-color)", fontSize: "1rem" }}>
                트랜잭션 전략
              </h3>
              <ul
                style={{
                  listStyle: "none",
                  padding: 0,
                  margin: 0,
                  color: "var(--text-secondary)",
                  lineHeight: "1.8",
                }}
              >
                {li("ConversationService와 ChatMessageService는 클래스 레벨 readOnly 트랜잭션을 기본으로 둡니다.")}
                {li("쓰기 메서드는 @Transactional로 오버라이드해 저장, 카운트 증가, 메타데이터 갱신을 원자적으로 묶습니다.")}
                {li("ConversationCreatorService는 별도 빈 + REQUIRES_NEW로 self-invocation 문제를 피합니다.")}
                {li("confirmCareDeal()은 양측 확정, CareApplication 승인, CareRequest 상태 변경을 한 트랜잭션에서 처리합니다.")}
              </ul>
            </Card>

            <Card style={{ marginBottom: "1rem" }}>
              <h3 style={{ marginBottom: "0.75rem", color: "var(--text-color)", fontSize: "1rem" }}>
                인덱스와 검색
              </h3>
              <ul
                style={{
                  listStyle: "none",
                  padding: 0,
                  margin: 0,
                  color: "var(--text-secondary)",
                  lineHeight: "1.8",
                }}
              >
                {li("conversation: related_type + related_idx, conversation_type + status + last_message_at")}
                {li("conversationparticipant: conversation_idx + status, user_idx + unread_count, unique(conversation_idx, user_idx)")}
                {li("chatmessage: FULLTEXT(content) WITH PARSER ngram, conversation_idx + created_at, sender_idx + created_at")}
                {li("메시지 검색은 FULLTEXT MATCH 결과 idx를 다시 조회하는 흐름으로 구성됩니다.")}
              </ul>
            </Card>

            <Card style={{ marginBottom: "1rem" }}>
              <h3 style={{ marginBottom: "0.75rem", color: "var(--text-color)", fontSize: "1rem" }}>
                성능 최적화 포인트
              </h3>
              <ul
                style={{
                  listStyle: "none",
                  padding: 0,
                  margin: 0,
                  color: "var(--text-secondary)",
                  lineHeight: "1.8",
                }}
              >
                {li("getMyConversations()는 참여자와 최신 메시지를 배치 조회해 N+1을 줄였습니다.")}
                {li("읽음 처리 최적화로 대량 메시지 방에서 불필요한 전체 스캔과 기록 테이블 저장을 제거했습니다.")}
                {li("재참여 사용자는 joinedAt 이후 메시지만 조회해 데이터 로딩량을 제한합니다.")}
                {li("문서상 알려진 주의점으로는 createMissingPetChat()의 기존 방 탐색 비용이 남아 있습니다.")}
              </ul>
              <p style={{ marginTop: "0.75rem", marginBottom: 0 }}>
                <Link to="/domains/chat/refactoring" style={{ color: "var(--link-color)", textDecoration: "none", fontWeight: "bold" }}>
                  Chat 리팩토링 요약 페이지 보기
                </Link>
              </p>
            </Card>

            <Card>
              <h3 style={{ marginBottom: "0.75rem", color: "var(--text-color)", fontSize: "1rem" }}>
                도메인 연관
              </h3>
              <ul
                style={{
                  listStyle: "none",
                  padding: 0,
                  margin: 0,
                  color: "var(--text-secondary)",
                  lineHeight: "1.8",
                }}
              >
                {li("Care: 지원서 기반 채팅방 생성과 거래 확정 흐름 연동")}
                {li("MissingPet: 제보자-목격자 채팅 생성")}
                {li("Meetup: 참여 시 자동 입장, 나가기 시 LEFT 처리")}
                {li("Notification: 새 메시지와 unread 관련 알림 가능")}
              </ul>
            </Card>
          </section>

          <section id="summary" style={{ marginBottom: "3rem", scrollMarginTop: "2rem" }}>
            <h2 style={{ marginBottom: "1rem", color: "var(--text-color)" }}>핵심 포인트</h2>
            <Card>
              <ul
                style={{
                  listStyle: "none",
                  padding: 0,
                  margin: 0,
                  color: "var(--text-secondary)",
                  lineHeight: "1.8",
                }}
              >
                <li>• Chat은 STOMP 기반 실시간 전송과 채팅방 도메인 규칙을 함께 담당합니다.</li>
                <li>• unreadCount는 DB 레벨 원자적 증가로 관리해 동시성 문제를 줄였습니다.</li>
                <li>• 읽음 처리는 MessageReadStatus 없이 unreadCount와 lastReadMessage만으로 단순화했습니다.</li>
                <li>• 보안상 모든 REST 식별은 JWT principal 기준이며 ACTIVE 참여자 검증이 핵심입니다.</li>
                <li>• Care, MissingPet, Meetup과 강하게 연결된 통합 커뮤니케이션 도메인입니다.</li>
              </ul>
            </Card>
          </section>

          <section id="docs" style={{ marginBottom: "3rem", scrollMarginTop: "2rem" }}>
            <h2 style={{ marginBottom: "1rem", color: "var(--text-color)" }}>관련 문서</h2>
            <Card>
              <ul
                style={{
                  listStyle: "none",
                  padding: 0,
                  margin: 0,
                  color: "var(--text-secondary)",
                  lineHeight: "2",
                }}
              >
                <li>
                  •{" "}
                  <a
                    href={`${GH}/docs/domains/chat.md`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: "var(--link-color)", textDecoration: "none" }}
                  >
                    chat.md
                  </a>
                </li>
                <li>
                  •{" "}
                  <a
                    href={`${GH}/docs/refactoring/chat/chat-code-review-2026-04-14.md`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: "var(--link-color)", textDecoration: "none" }}
                  >
                    chat-code-review-2026-04-14.md
                  </a>
                </li>
                <li>
                  •{" "}
                  <a
                    href={`${GH}/docs/refactoring/chat/chat-backend-security-transaction-2026-04-14.md`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: "var(--link-color)", textDecoration: "none" }}
                  >
                    chat-backend-security-transaction-2026-04-14.md
                  </a>
                </li>
                <li>
                  •{" "}
                  <a
                    href={`${GH}/docs/architecture/%EC%B1%84%ED%8C%85%20%EC%8B%9C%EC%8A%A4%ED%85%9C%20%EC%84%A4%EA%B3%84.md`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: "var(--link-color)", textDecoration: "none" }}
                  >
                    채팅 시스템 설계
                  </a>
                </li>
                <li>
                  •{" "}
                  <Link to="/domains/care" style={{ color: "var(--link-color)", textDecoration: "none" }}>
                    Care 도메인
                  </Link>
                </li>
                <li>
                  •{" "}
                  <Link to="/domains/missingpet" style={{ color: "var(--link-color)", textDecoration: "none" }}>
                    MissingPet 도메인
                  </Link>
                </li>
                <li>
                  •{" "}
                  <Link to="/domains/meetup" style={{ color: "var(--link-color)", textDecoration: "none" }}>
                    Meetup 도메인
                  </Link>
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

export default ChatDomain;
