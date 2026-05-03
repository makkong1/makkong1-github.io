import { Link } from 'react-router-dom';
import MermaidDiagram from '../../../../components/Common/MermaidDiagram';
import TableOfContents from '../../../../components/Common/TableOfContents';

function ChatDomain() {
  const sections = [
    { id: 'intro', title: '도메인 소개' },
    { id: 'features', title: '주요 기능' },
    { id: 'troubleshooting', title: '트러블슈팅' },
    { id: 'db-optimization', title: 'DB 최적화' },
    { id: 'refactoring', title: '리팩토링' },
    { id: 'entities', title: 'Entity 구조' },
    { id: 'security', title: '보안 및 권한 체계' },
    { id: 'relationships', title: '다른 도메인과의 연관관계' },
    { id: 'api', title: 'API 엔드포인트' },
    { id: 'docs', title: '관련 문서' }
  ];
  const entityDiagram = `erDiagram
    Conversation ||--o{ ConversationParticipant : "참여자"
    Conversation ||--o{ ChatMessage : "메시지"
    Users ||--o{ ConversationParticipant : "참여"
    Users ||--o{ ChatMessage : "발신"
    ChatMessage ||--o| ChatMessage : "replyTo"
    
    Conversation {
        Long idx PK
        ConversationType conversationType
        ConversationStatus status
        RelatedType relatedType
        Long relatedIdx
        String title
        LocalDateTime lastMessageAt
        String lastMessagePreview
        Boolean isDeleted
        LocalDateTime createdAt
        LocalDateTime updatedAt
    }
    
    ConversationParticipant {
        Long idx PK
        ParticipantRole role
        ParticipantStatus status
        Integer unreadCount
        LocalDateTime lastReadAt
        LocalDateTime joinedAt
        LocalDateTime leftAt
        Boolean dealConfirmed
        LocalDateTime dealConfirmedAt
        Boolean isDeleted
        LocalDateTime createdAt
        LocalDateTime updatedAt
    }
    
    ChatMessage {
        Long idx PK
        MessageType messageType
        String content
        Boolean isDeleted
        LocalDateTime deletedAt
        LocalDateTime createdAt
        LocalDateTime updatedAt
    }`;


  return (
    <div className="domain-page-wrapper" style={{ padding: '2rem 0' }}>
      <div className="domain-page-container" style={{ display: 'flex', gap: '2rem', alignItems: 'flex-start' }}>
        <div className="domain-page-content" style={{ flex: 1 }}>
          <h1 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>채팅 도메인</h1>
          
          {/* 1. 도메인 소개 */}
          <section id="intro" style={{ marginBottom: '3rem', scrollMarginTop: '2rem' }}>
            <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>도메인 소개</h2>
            <div className="section-card" style={{
              padding: '1.5rem',
              backgroundColor: 'var(--card-bg)',
              borderRadius: '8px',
              border: '1px solid var(--nav-border)'
            }}>
              <p style={{ lineHeight: '1.8', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                Chat 도메인은 실시간 채팅 기능을 제공하는 도메인입니다.
              </p>
              <p style={{ lineHeight: '1.8', color: 'var(--text-secondary)' }}>
                WebSocket(STOMP)을 사용하여 실시간 메시지 전송, 채팅방 관리, 읽지 않은 메시지 수 추적 등을 담당합니다.
              </p>
              <div style={{
                padding: '1rem',
                backgroundColor: 'var(--bg-color)',
                borderRadius: '6px',
                marginTop: '1rem',
                border: '1px solid var(--nav-border)'
              }}>
                <h3 style={{ marginBottom: '0.75rem', color: 'var(--text-color)', fontSize: '1rem' }}>핵심 성과</h3>
                <ul style={{
                  listStyle: 'none',
                  padding: 0,
                  color: 'var(--text-secondary)',
                  lineHeight: '1.8',
                  fontSize: '0.9rem'
                }}>
                  <li>• 메시지 읽음 처리: <strong style={{ color: 'var(--text-color)' }}>전체 메시지 조회 제거</strong> (불필요한 로직 제거)</li>
                  <li>• 쿼리 수: <strong style={{ color: 'var(--text-color)' }}>7000건 기준 7002개 → 2-3개</strong> (99.9% 감소)</li>
                  <li>• 메모리 사용: <strong style={{ color: 'var(--text-color)' }}>전체 메시지 로드 → 최소화</strong></li>
                </ul>
              </div>
            </div>
          </section>

          {/* 2. 주요 기능 */}
          <section id="features" style={{ marginBottom: '3rem', scrollMarginTop: '2rem' }}>
            <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>주요 기능</h2>
            
            <div className="section-card" style={{
              padding: '1.5rem',
              backgroundColor: 'var(--card-bg)',
              borderRadius: '8px',
              border: '1px solid var(--nav-border)',
              marginBottom: '1rem'
            }}>
              <h3 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>1. 실시간 채팅 (WebSocket 기반)</h3>
              <div style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}>
                <p style={{ marginBottom: '0.5rem' }}>WebSocket(STOMP) 기반으로 실시간 양방향 메시지 통신을 제공합니다.</p>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  <li>• STOMP 프로토콜 사용</li>
                  <li>• 메시지 전송 시 채팅방 참여자들에게 브로드캐스트</li>
                  <li>• 타이핑 표시 기능 지원</li>
                  <li>• 메시지 타입: TEXT, IMAGE, FILE, SYSTEM, NOTICE</li>
                </ul>
              </div>
            </div>

            <div className="section-card" style={{
              padding: '1.5rem',
              backgroundColor: 'var(--card-bg)',
              borderRadius: '8px',
              border: '1px solid var(--nav-border)',
              marginBottom: '1rem'
            }}>
              <h3 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>2. 채팅방 생성 및 관리</h3>
              <div style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}>
                <p style={{ marginBottom: '0.5rem' }}>다양한 타입의 채팅방을 생성하고 관리할 수 있습니다.</p>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  <li>• 1:1 일반 채팅 (DIRECT) — 기존 방 재사용, relatedType/relatedIdx로 펫케어·실종 등과 연동 가능</li>
                  <li>• 펫케어 채팅 (CARE_REQUEST) — 펫케어 채팅방 생성 API는 <code style={{ backgroundColor: 'var(--bg-color)', padding: '0.15rem 0.35rem', borderRadius: '4px' }}>RelatedType.CARE_APPLICATION</code> + 지원 ID로 조회/생성; <code style={{ backgroundColor: 'var(--bg-color)', padding: '0.15rem 0.35rem', borderRadius: '4px' }}>CARE_REQUEST</code>는 거래 확정 등 다른 흐름에서 사용</li>
                  <li>• 실종제보 (MISSING_PET) — <code style={{ backgroundColor: 'var(--bg-color)', padding: '0.15rem 0.35rem', borderRadius: '4px' }}>MISSING_PET_BOARD</code> + 게시글 ID, 제보자·목격자 조합별 개별 방</li>
                  <li>• 산책모임 (MEETUP) — 참여 시 자동 참여, 나가기 시 채팅방에서도 LEFT 처리</li>
                  <li>• 그룹 (GROUP) — <code style={{ backgroundColor: 'var(--bg-color)', padding: '0.15rem 0.35rem', borderRadius: '4px' }}>ParticipantRole</code> MEMBER/ADMIN 등 역할 조정 가능</li>
                  <li>• <code style={{ backgroundColor: 'var(--bg-color)', padding: '0.15rem 0.35rem', borderRadius: '4px' }}>ADMIN_SUPPORT</code>는 enum만 존재 (chat.md 1절)</li>
                  <li>• 채팅방 참여/나가기, 재참여 시 joinedAt 이후 메시지만 조회</li>
                </ul>
              </div>
            </div>

            <div className="section-card" style={{
              padding: '1.5rem',
              backgroundColor: 'var(--card-bg)',
              borderRadius: '8px',
              border: '1px solid var(--nav-border)',
              marginBottom: '1rem'
            }}>
              <h3 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>3. 메시지 전송/조회/삭제/검색</h3>
              <div style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}>
                <p style={{ marginBottom: '0.5rem' }}>메시지를 전송하고 관리하며, 읽음 상태를 추적합니다.</p>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  <li>• 메시지 전송/조회/삭제/검색</li>
                  <li>• 메시지 읽음 처리</li>
                  <li>• 읽지 않은 메시지 수 관리 (원자적 증가)</li>
                  <li>• 재참여 시 이전 대화 내용 제한 (joinedAt 이후 메시지만 조회)</li>
                </ul>
              </div>
            </div>

            <div className="section-card" style={{
              padding: '1.5rem',
              backgroundColor: 'var(--card-bg)',
              borderRadius: '8px',
              border: '1px solid var(--nav-border)'
            }}>
              <h3 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>4. 펫케어 거래 확정</h3>
              <div style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}>
                <p style={{ marginBottom: '0.5rem' }}>펫케어 채팅방에서 양쪽 모두 확인 시 자동 승인됩니다.</p>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  <li>• 양쪽 모두 확정 시 자동 승인</li>
                  <li>• CareApplication 생성/승인 및 CareRequest 상태 변경</li>
                </ul>
              </div>
            </div>
          </section>

          {/* 3. 트러블슈팅 */}
          <section id="troubleshooting" style={{ marginBottom: '3rem', scrollMarginTop: '2rem' }}>
            <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>트러블슈팅</h2>
            
            <div className="section-card" style={{
              padding: '1.5rem',
              backgroundColor: 'var(--card-bg)',
              borderRadius: '8px',
              border: '1px solid var(--nav-border)',
              marginBottom: '1rem'
            }}>
              <h3 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>1. 메시지 읽음 처리 시 성능 문제</h3>
              <div style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}>
                <p style={{ marginBottom: '0.5rem' }}><strong style={{ color: 'var(--text-color)' }}>문제:</strong> 메시지 읽음 처리 시 전체 메시지 조회 및 프론트엔드 빈번한 호출로 인한 성능 저하 (메시지 7,000건 기준 7,002개 이상 쿼리)</p>
                <p style={{ marginBottom: '0.5rem' }}><strong style={{ color: 'var(--text-color)' }}>해결:</strong> 불필요한 전체 메시지 조회 및 MessageReadStatus 기록 로직 완전 제거, 참여자의 unreadCount와 lastReadMessage 업데이트만 수행</p>
                <p style={{ marginBottom: '0.5rem' }}><strong style={{ color: 'var(--text-color)' }}>효과:</strong> 7,002개 쿼리 → 2-3개 쿼리로 감소 (99.9% 개선), 메모리 사용량 대폭 감소, 트랜잭션 범위 축소</p>
                <div style={{
                  marginTop: '1rem',
                  padding: '1rem',
                  backgroundColor: 'var(--bg-color)',
                  borderRadius: '6px',
                  border: '1px solid var(--link-color)'
                }}>
                  <Link
                    to="/domains/chat/optimization"
                    style={{
                      color: 'var(--link-color)',
                      textDecoration: 'none',
                      fontWeight: 'bold',
                      display: 'inline-block'
                    }}
                  >
                    → 메시지 읽음 처리 최적화 상세 보기
                  </Link>
                </div>
              </div>
            </div>
          </section>

          {/* 4. DB 최적화 */}
          <section id="db-optimization" style={{ marginBottom: '3rem', scrollMarginTop: '2rem' }}>
            <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>DB 최적화</h2>
            
            <div className="section-card" style={{
              padding: '1.5rem',
              backgroundColor: 'var(--card-bg)',
              borderRadius: '8px',
              border: '1px solid var(--nav-border)',
              marginBottom: '1rem'
            }}>
              <h3 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>인덱스 전략</h3>
              <div style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}>
                <p style={{ marginBottom: '0.5rem' }}><strong style={{ color: 'var(--text-color)' }}>conversation 테이블:</strong></p>
                <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 1rem 0' }}>
                  <li>• 삭제 여부 조회: <code style={{ backgroundColor: 'var(--bg-color)', padding: '0.2rem 0.4rem', borderRadius: '4px' }}>CREATE INDEX idx_conversation_deleted ON conversation(is_deleted, deleted_at)</code></li>
                  <li>• 관련 엔티티 조회: <code style={{ backgroundColor: 'var(--bg-color)', padding: '0.2rem 0.4rem', borderRadius: '4px' }}>CREATE INDEX idx_conversation_related ON conversation(related_type, related_idx)</code></li>
                  <li>• 타입 및 상태별 조회: <code style={{ backgroundColor: 'var(--bg-color)', padding: '0.2rem 0.4rem', borderRadius: '4px' }}>CREATE INDEX idx_conversation_type_status ON conversation(conversation_type, status, last_message_at)</code></li>
                </ul>
                <p style={{ marginBottom: '0.5rem' }}><strong style={{ color: 'var(--text-color)' }}>conversationparticipant 테이블:</strong></p>
                <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 1rem 0' }}>
                  <li>• 채팅방별 참여자 조회: <code style={{ backgroundColor: 'var(--bg-color)', padding: '0.2rem 0.4rem', borderRadius: '4px' }}>CREATE INDEX idx_participant_conversation ON conversationparticipant(conversation_idx, status)</code></li>
                  <li>• 읽지 않은 메시지 수 조회: <code style={{ backgroundColor: 'var(--bg-color)', padding: '0.2rem 0.4rem', borderRadius: '4px' }}>CREATE INDEX idx_participant_unread ON conversationparticipant(user_idx, unread_count)</code></li>
                  <li>• 사용자별 참여 상태 조회: <code style={{ backgroundColor: 'var(--bg-color)', padding: '0.2rem 0.4rem', borderRadius: '4px' }}>CREATE INDEX idx_participant_user_status ON conversationparticipant(user_idx, status, unread_count)</code></li>
                  <li>• 채팅방-사용자 조합 (Unique): <code style={{ backgroundColor: 'var(--bg-color)', padding: '0.2rem 0.4rem', borderRadius: '4px' }}>CREATE UNIQUE INDEX uk_participant_conversation_user ON conversationparticipant(conversation_idx, user_idx)</code></li>
                </ul>
                <p style={{ marginBottom: '0.5rem' }}><strong style={{ color: 'var(--text-color)' }}>chatmessage 테이블:</strong></p>
                <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 1rem 0' }}>
                  <li>• 채팅방별 메시지 조회 (시간순): <code style={{ backgroundColor: 'var(--bg-color)', padding: '0.2rem 0.4rem', borderRadius: '4px' }}>CREATE INDEX idx_chat_message_conversation_created ON chatmessage(conversation_idx, created_at)</code></li>
                  <li>• 내용 검색: <code style={{ backgroundColor: 'var(--bg-color)', padding: '0.2rem 0.4rem', borderRadius: '4px' }}>CREATE INDEX idx_chat_message_content ON chatmessage(content)</code></li>
                  <li>• 발신자별 메시지 조회: <code style={{ backgroundColor: 'var(--bg-color)', padding: '0.2rem 0.4rem', borderRadius: '4px' }}>CREATE INDEX idx_chat_message_sender ON chatmessage(sender_idx, created_at)</code></li>
                </ul>
                <p style={{ marginBottom: '0.5rem' }}><strong style={{ color: 'var(--text-color)' }}>선정 이유:</strong></p>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  <li>• 자주 조회되는 컬럼 조합 (user_idx, status, conversation_idx)</li>
                  <li>• WHERE 절에서 자주 사용되는 조건</li>
                  <li>• JOIN에 사용되는 외래키 (conversation_idx, user_idx)</li>
                  <li>• 시간순 정렬을 위한 인덱스 (created_at)</li>
                  <li>• 중복 방지를 위한 Unique 제약조건 (conversationparticipant)</li>
                  <li>• 메시지 검색을 위한 인덱스 (content)</li>
                </ul>
              </div>
            </div>

            <div className="section-card" style={{
              padding: '1.5rem',
              backgroundColor: 'var(--card-bg)',
              borderRadius: '8px',
              border: '1px solid var(--nav-border)'
            }}>
              <h3 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>쿼리 최적화</h3>
              <div style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}>
                <p style={{ marginBottom: '0.5rem' }}><strong style={{ color: 'var(--text-color)' }}>N+1 문제 해결:</strong></p>
                <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 1rem 0' }}>
                  <li>• 채팅방 목록 조회 시 배치 조회 사용</li>
                  <li>• 참여자 정보: <code style={{ backgroundColor: 'var(--bg-color)', padding: '0.2rem 0.4rem', borderRadius: '4px' }}>findParticipantsByConversationIdxsAndUserIdx()</code>, <code style={{ backgroundColor: 'var(--bg-color)', padding: '0.2rem 0.4rem', borderRadius: '4px' }}>findParticipantsByConversationIdxsAndStatus()</code></li>
                  <li>• 최신 메시지: <code style={{ backgroundColor: 'var(--bg-color)', padding: '0.2rem 0.4rem', borderRadius: '4px' }}>findLatestMessagesByConversationIdxs()</code></li>
                </ul>
                <p style={{ marginBottom: '0.5rem' }}><strong style={{ color: 'var(--text-color)' }}>원자적 증가:</strong></p>
                <pre style={{
                  padding: '1rem',
                  backgroundColor: 'var(--bg-color)',
                  borderRadius: '6px',
                  overflow: 'auto',
                  fontSize: '0.85rem',
                  color: 'var(--text-secondary)',
                  fontFamily: 'monospace',
                  lineHeight: '1.6',
                  marginBottom: '1rem'
                }}>
{`@Modifying
@Query("UPDATE ConversationParticipant p SET p.unreadCount = p.unreadCount + 1 " +
       "WHERE p.conversation.idx = :conversationIdx " +
       "AND p.user.idx != :senderUserId " +
       "AND p.status = 'ACTIVE'")
void incrementUnreadCount(@Param("conversationIdx") Long conversationIdx, 
                          @Param("senderUserId") Long senderUserId);`}
                </pre>
                <p style={{ marginBottom: '0.5rem' }}><strong style={{ color: 'var(--text-color)' }}>개선 포인트:</strong></p>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  <li>• 배치 조회로 N+1 문제 해결</li>
                  <li>• DB 레벨 원자적 증가로 Lost Update 문제 해결</li>
                  <li>• 재참여 최적화: joinedAt 이후 메시지만 조회</li>
                </ul>
              </div>
            </div>
          </section>

          {/* 5. 리팩토링 */}
          <section id="refactoring" style={{ marginBottom: '3rem', scrollMarginTop: '2rem' }}>
            <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>리팩토링</h2>
            
            <div className="section-card" style={{
              padding: '1.5rem',
              backgroundColor: 'var(--card-bg)',
              borderRadius: '8px',
              border: '1px solid var(--nav-border)'
            }}>
              <h3 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>DTO → record 리팩토링</h3>
              <div style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}>
                <p style={{ marginBottom: '0.75rem' }}>
                  Chat 도메인의 DTO 중 record 적용에 적합한 항목을 선별하여 리팩토링했습니다.
                </p>
                
                <div style={{
                  padding: '1rem',
                  backgroundColor: 'var(--bg-color)',
                  borderRadius: '6px',
                  marginBottom: '1rem'
                }}>
                  <h4 style={{ marginBottom: '0.75rem', color: 'var(--text-color)', fontSize: '0.95rem' }}>record로 전환한 DTO (2개)</h4>
                  <ul style={{
                    listStyle: 'none',
                    padding: 0,
                    margin: 0,
                    fontSize: '0.9rem',
                    lineHeight: '1.8'
                  }}>
                    <li>• <strong style={{ color: 'var(--text-color)' }}>CreateConversationRequest</strong> - 채팅방 생성 요청 (5개 필드: conversationType, relatedType, relatedIdx, title, participantUserIds)</li>
                    <li>• <strong style={{ color: 'var(--text-color)' }}>SendMessageRequest</strong> - 메시지 전송 요청 (4개 필드: conversationIdx, content, messageType, replyToMessageIdx)</li>
                  </ul>
                </div>

                <div style={{
                  padding: '1rem',
                  backgroundColor: 'var(--bg-color)',
                  borderRadius: '6px',
                  marginBottom: '1rem'
                }}>
                  <h4 style={{ marginBottom: '0.75rem', color: 'var(--text-color)', fontSize: '0.95rem' }}>record로 전환하지 않은 DTO (3개)</h4>
                  <ul style={{
                    listStyle: 'none',
                    padding: 0,
                    margin: 0,
                    fontSize: '0.9rem',
                    lineHeight: '1.8'
                  }}>
                    <li>• <strong style={{ color: 'var(--text-color)' }}>ChatMessageDTO</strong> - 필드 15개로 생성자 과도하게 김, 자기 참조 및 중첩 구조 포함</li>
                    <li>• <strong style={{ color: 'var(--text-color)' }}>ConversationDTO</strong> - Service에서 setter 3곳 사용 (setUnreadCount, setParticipants, setLastMessage), N+1 최적화를 위한 배치 조회 후 setter로 조립하는 패턴</li>
                    <li>• <strong style={{ color: 'var(--text-color)' }}>ConversationParticipantDTO</strong> - 필드 18개로 생성자 너무 길어짐</li>
                  </ul>
                </div>

                <div style={{
                  padding: '0.75rem',
                  backgroundColor: 'var(--bg-color)',
                  borderRadius: '4px',
                  marginBottom: '1rem',
                  fontSize: '0.9rem'
                }}>
                  <p style={{ marginBottom: '0.5rem' }}>
                    <strong style={{ color: 'var(--text-color)' }}>변경 사항 요약:</strong>
                  </p>
                  <ul style={{
                    listStyle: 'none',
                    padding: 0,
                    margin: 0,
                    lineHeight: '1.8'
                  }}>
                    <li>• DTO 정의: Lombok <code style={{ backgroundColor: 'var(--card-bg)', padding: '0.2rem 0.4rem', borderRadius: '4px' }}>@Data</code> <code style={{ backgroundColor: 'var(--card-bg)', padding: '0.2rem 0.4rem', borderRadius: '4px' }}>@Builder</code> 제거 → <code style={{ backgroundColor: 'var(--card-bg)', padding: '0.2rem 0.4rem', borderRadius: '4px' }}>public record XxxDTO(...)</code></li>
                    <li>• 생성: <code style={{ backgroundColor: 'var(--card-bg)', padding: '0.2rem 0.4rem', borderRadius: '4px' }}>.builder().field(x).build()</code> → <code style={{ backgroundColor: 'var(--card-bg)', padding: '0.2rem 0.4rem', borderRadius: '4px' }}>new XxxDTO(...)</code></li>
                    <li>• 접근: <code style={{ backgroundColor: 'var(--card-bg)', padding: '0.2rem 0.4rem', borderRadius: '4px' }}>dto.getXxx()</code> → <code style={{ backgroundColor: 'var(--card-bg)', padding: '0.2rem 0.4rem', borderRadius: '4px' }}>dto.xxx()</code> (record accessor)</li>
                  </ul>
                </div>

                <div style={{
                  padding: '0.75rem',
                  backgroundColor: 'var(--bg-color)',
                  borderRadius: '4px',
                  marginBottom: '1rem',
                  fontSize: '0.9rem'
                }}>
                  <p style={{ marginBottom: '0.5rem' }}>
                    <strong style={{ color: 'var(--text-color)' }}>수정된 파일:</strong>
                  </p>
                  <ul style={{
                    listStyle: 'none',
                    padding: 0,
                    margin: 0,
                    lineHeight: '1.8'
                  }}>
                    <li>• <code style={{ backgroundColor: 'var(--card-bg)', padding: '0.2rem 0.4rem', borderRadius: '4px' }}>CreateConversationRequest.java</code> - class → record</li>
                    <li>• <code style={{ backgroundColor: 'var(--card-bg)', padding: '0.2rem 0.4rem', borderRadius: '4px' }}>SendMessageRequest.java</code> - class → record</li>
                    <li>• <code style={{ backgroundColor: 'var(--card-bg)', padding: '0.2rem 0.4rem', borderRadius: '4px' }}>ConversationController.java</code> - getter 호출 방식 변경 (5곳)</li>
                    <li>• <code style={{ backgroundColor: 'var(--card-bg)', padding: '0.2rem 0.4rem', borderRadius: '4px' }}>ChatMessageController.java</code> - getter 호출 방식 변경 (4곳)</li>
                  </ul>
                </div>

                <div style={{
                  padding: '1rem',
                  backgroundColor: 'var(--bg-color)',
                  borderRadius: '6px',
                  border: '1px solid var(--link-color)',
                  marginBottom: '1rem'
                }}>
                  <a
                    href="https://github.com/makkong1/makkong1-github.io/blob/main/docs/refactoring/recordType/chat/dto-record-refactoring.md"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      color: 'var(--link-color)',
                      textDecoration: 'none',
                      fontWeight: 'bold',
                      display: 'inline-block'
                    }}
                  >
                    → DTO → record 리팩토링 상세 문서 보기
                  </a>
                </div>

                <div style={{
                  padding: '1rem',
                  backgroundColor: 'var(--bg-color)',
                  borderRadius: '6px',
                  border: '1px solid var(--link-color)'
                }}>
                  <h4 style={{ marginBottom: '0.75rem', color: 'var(--text-color)', fontSize: '0.95rem' }}>보안·트랜잭션·검색 (2026-04-14)</h4>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: '1.7', marginBottom: '0.75rem' }}>
                    REST IDOR 제거, ACTIVE 참여자 검증, <code style={{ backgroundColor: 'var(--card-bg)', padding: '0.1rem 0.3rem', borderRadius: '4px' }}>REQUIRES_NEW</code> 분리, 실종 N+1·FULLTEXT 검색, readOnly·WebSocket 예외 정리 등은 리팩토링 전용 페이지에 요약해 두었습니다.
                  </p>
                  <Link
                    to="/domains/chat/refactoring"
                    style={{
                      color: 'var(--link-color)',
                      textDecoration: 'none',
                      fontWeight: 'bold',
                      display: 'inline-block',
                      marginBottom: '0.5rem'
                    }}
                  >
                    → Chat 백엔드 리팩토링 상세 페이지 보기
                  </Link>
                  <div style={{ fontSize: '0.85rem', lineHeight: '1.7' }}>
                    <a
                      href="https://github.com/makkong1/makkong1-github.io/blob/main/docs/refactoring/chat/chat-code-review-2026-04-14.md"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: 'var(--link-color)', textDecoration: 'none', display: 'block' }}
                    >
                      GitHub: chat-code-review-2026-04-14.md
                    </a>
                    <a
                      href="https://github.com/makkong1/makkong1-github.io/blob/main/docs/refactoring/chat/chat-backend-security-transaction-2026-04-14.md"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: 'var(--link-color)', textDecoration: 'none', display: 'block' }}
                    >
                      GitHub: chat-backend-security-transaction-2026-04-14.md
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section id="entities" style={{ marginBottom: '3rem', scrollMarginTop: '2rem' }}>
            <h2 style={{ marginBottom: '0.75rem', color: 'var(--text-color)' }}>Entity 구조</h2>
            <p style={{ marginBottom: '1rem', color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: '1.6' }}>
              필드·관계는 <strong style={{ color: 'var(--text-color)' }}>docs/domains/chat.md</strong> 4.1절 엔티티 설명과 맞춥니다. MessageReadStatus 엔티티는 제거되었고, 읽음은 참여자의 <code style={{ backgroundColor: 'var(--bg-color)', padding: '0.15rem 0.35rem', borderRadius: '4px' }}>unreadCount</code>·<code style={{ backgroundColor: 'var(--bg-color)', padding: '0.15rem 0.35rem', borderRadius: '4px' }}>lastReadMessage</code>로 관리합니다.
            </p>
            <div className="section-card" style={{
              padding: '1.5rem',
              backgroundColor: 'var(--card-bg)',
              borderRadius: '8px',
              border: '1px solid var(--nav-border)',
              marginBottom: '1.5rem'
            }}>
              <MermaidDiagram chart={entityDiagram} />
            </div>

            <div className="section-card" style={{
              padding: '1.5rem',
              backgroundColor: 'var(--card-bg)',
              borderRadius: '8px',
              border: '1px solid var(--nav-border)',
              marginBottom: '1rem'
            }}>
              <h3 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>1. Conversation</h3>
              <div style={{
                color: 'var(--text-secondary)',
                lineHeight: '1.8',
                fontFamily: 'monospace',
                fontSize: '0.9rem'
              }}>
                <div>• conversationType, title, relatedType, relatedIdx</div>
                <div>• status (ACTIVE/CLOSED), lastMessageAt, lastMessagePreview</div>
                <div>• isDeleted, deletedAt — BaseTimeEntity 미사용, @PrePersist/@PreUpdate</div>
                <div>• OneToMany → ConversationParticipant, ChatMessage</div>
              </div>
            </div>

            <div className="section-card" style={{
              padding: '1.5rem',
              backgroundColor: 'var(--card-bg)',
              borderRadius: '8px',
              border: '1px solid var(--nav-border)',
              marginBottom: '1rem'
            }}>
              <h3 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>2. ConversationParticipant</h3>
              <div style={{
                color: 'var(--text-secondary)',
                lineHeight: '1.8',
                fontFamily: 'monospace',
                fontSize: '0.9rem'
              }}>
                <div>• role (MEMBER/ADMIN), unreadCount, lastReadMessage, lastReadAt</div>
                <div>• status (ACTIVE/LEFT), joinedAt, leftAt</div>
                <div>• dealConfirmed, dealConfirmedAt (펫케어 거래 확정)</div>
                <div>• isDeleted, deletedAt — BaseTimeEntity 미사용</div>
                <div>• ManyToOne → Conversation, Users</div>
              </div>
            </div>

            <div className="section-card" style={{
              padding: '1.5rem',
              backgroundColor: 'var(--card-bg)',
              borderRadius: '8px',
              border: '1px solid var(--nav-border)'
            }}>
              <h3 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>3. ChatMessage</h3>
              <div style={{
                color: 'var(--text-secondary)',
                lineHeight: '1.8',
                fontFamily: 'monospace',
                fontSize: '0.9rem'
              }}>
                <div>• messageType (TEXT/IMAGE/FILE/SYSTEM/NOTICE), content(Lob)</div>
                <div>• replyToMessage (답장), isDeleted, deletedAt</div>
                <div>• BaseTimeEntity — createdAt, updatedAt</div>
                <div>• ManyToOne → Conversation, Users(sender)</div>
              </div>
            </div>
          </section>

          {/* 6. 보안 및 권한 체계 */}
          <section id="security" style={{ marginBottom: '3rem', scrollMarginTop: '2rem' }}>
            <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>보안 및 권한 체계</h2>
            <div className="section-card" style={{
              padding: '1.5rem',
              backgroundColor: 'var(--card-bg)',
              borderRadius: '8px',
              border: '1px solid var(--nav-border)'
            }}>
              <ul style={{
                listStyle: 'none',
                padding: 0,
                color: 'var(--text-secondary)',
                lineHeight: '1.8'
              }}>
                <li>• <strong style={{ color: 'var(--text-color)' }}>사용자 식별</strong>: REST는 <strong style={{ color: 'var(--text-color)' }}>SecurityContext principal(Long 문자열)</strong>만 사용. <code style={{ backgroundColor: 'var(--bg-color)', padding: '0.15rem 0.35rem', borderRadius: '4px' }}>userId</code>·<code style={{ backgroundColor: 'var(--bg-color)', padding: '0.15rem 0.35rem', borderRadius: '4px' }}>senderIdx</code> 등 클라이언트 스푸핑 파라미터 없음 (chat.md 4.6)</li>
                <li>• <strong style={{ color: 'var(--text-color)' }}>ACTIVE 참여자</strong>: 메시지 목록·커서·검색·읽음·삭제·unread-count·채팅방 상태 PATCH는 ACTIVE 참여자 검증 후에만 동작</li>
                <li>• <strong style={{ color: 'var(--text-color)' }}>WebSocket</strong>: 핸드셰이크 후 JWT 인터셉터 검증. <code style={{ backgroundColor: 'var(--bg-color)', padding: '0.15rem 0.35rem', borderRadius: '4px' }}>ChatWebSocketController</code>는 Principal로 발신자 결정</li>
                <li>• <strong style={{ color: 'var(--text-color)' }}>메시지 삭제</strong>: 본인 메시지만 Soft Delete</li>
              </ul>
            </div>
          </section>

          {/* 7. 다른 도메인과의 연관관계 */}
          <section id="relationships" style={{ marginBottom: '3rem', scrollMarginTop: '2rem' }}>
            <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>다른 도메인과의 연관관계</h2>
        
        <div className="section-card" style={{
          padding: '1.5rem',
          backgroundColor: 'var(--card-bg)',
          borderRadius: '8px',
          border: '1px solid var(--nav-border)'
        }}>
          <div style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}>
            <div style={{ marginBottom: '0.5rem' }}><strong style={{ color: 'var(--text-color)' }}>User 도메인:</strong></div>
            <div>• Users가 채팅방 참여, 메시지 전송/수신</div>
            <div style={{ marginTop: '1rem', marginBottom: '0.5rem' }}><strong style={{ color: 'var(--text-color)' }}>Care 도메인:</strong></div>
            <div>• 펫케어 채팅방 생성은 <code style={{ backgroundColor: 'var(--bg-color)', padding: '0.15rem 0.35rem', borderRadius: '4px' }}>RelatedType.CARE_APPLICATION</code> + 지원 ID; 거래 확정은 <code style={{ backgroundColor: 'var(--bg-color)', padding: '0.15rem 0.35rem', borderRadius: '4px' }}>confirmCareDeal()</code>·Payment 에스크로와 연동 (chat.md 2.1, 3.1)</div>
            <div style={{ marginTop: '1rem', marginBottom: '0.5rem' }}><strong style={{ color: 'var(--text-color)' }}>MissingPet 도메인:</strong></div>
            <div>• <code style={{ backgroundColor: 'var(--bg-color)', padding: '0.15rem 0.35rem', borderRadius: '4px' }}>POST /api/missing-pets/{'{boardIdx}'}/start-chat</code> — 목격자는 JWT principal만 (witnessId 파라미터 없음)</div>
            <div style={{ marginTop: '1rem', marginBottom: '0.5rem' }}><strong style={{ color: 'var(--text-color)' }}>Meetup 도메인:</strong></div>
            <div>• 모임 생성 시 그룹 채팅방 자동 생성, 모임 참여 시 자동 참여, 모임 나가기 시 채팅방에서도 나감</div>
            <div style={{ marginTop: '1rem', marginBottom: '0.5rem' }}><strong style={{ color: 'var(--text-color)' }}>Notification 도메인:</strong></div>
            <div>• 새 메시지 도착 시 알림, 읽지 않은 메시지 알림</div>
          </div>
        </div>
      </section>

          <section id="api" style={{ marginBottom: '3rem', scrollMarginTop: '2rem' }}>
            <p style={{ marginBottom: '1rem', color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: '1.6' }}>
              아래 경로·동작은 <strong style={{ color: 'var(--text-color)' }}>docs/domains/chat.md</strong> 4.6절 REST·WebSocket 표와 동일합니다.
            </p>
            <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>API 엔드포인트</h2>

            <div className="section-card" style={{
              padding: '1.5rem',
              backgroundColor: 'var(--card-bg)',
              borderRadius: '8px',
              border: '1px solid var(--nav-border)',
              marginBottom: '1rem'
            }}>
              <h3 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>채팅방 (/api/chat/conversations)</h3>
              <div style={{
                color: 'var(--text-secondary)',
                lineHeight: '1.8',
                fontFamily: 'monospace',
                fontSize: '0.9rem'
              }}>
                <div>• GET /api/chat/conversations — 내 목록 (JWT principal = user idx, 쿼리 없음)</div>
                <div>• GET /api/chat/conversations/{'{conversationIdx}'} — 상세 (동일)</div>
                <div>• POST /api/chat/conversations — 범용 생성 (<code style={{ backgroundColor: 'var(--bg-color)', padding: '0.1rem 0.3rem', borderRadius: '4px' }}>participantUserIds</code>에 로그인 사용자 포함 필수)</div>
                <div>• POST /api/chat/conversations/care-request — 펫케어 방 (<code style={{ backgroundColor: 'var(--bg-color)', padding: '0.1rem 0.3rem', borderRadius: '4px' }}>careApplicationIdx</code>만; 당사자 검증은 서버)</div>
                <div>• POST /api/chat/conversations/direct — 1:1 생성/조회 (<code style={{ backgroundColor: 'var(--bg-color)', padding: '0.1rem 0.3rem', borderRadius: '4px' }}>otherUserId</code>만)</div>
                <div>• POST /api/chat/conversations/{'{conversationIdx}'}/leave — 나가기 (204)</div>
                <div>• DELETE /api/chat/conversations/{'{conversationIdx}'} — 삭제 (204)</div>
                <div>• PATCH /api/chat/conversations/{'{conversationIdx}'}/status — 상태 (<code style={{ backgroundColor: 'var(--bg-color)', padding: '0.1rem 0.3rem', borderRadius: '4px' }}>status</code>, ACTIVE 참여자만)</div>
                <div>• POST /api/chat/conversations/meetup/{'{meetupIdx}'}/join — 산책모임 참여</div>
                <div>• GET /api/chat/conversations/meetup/{'{meetupIdx}'}/participant-count — 참여 인원 (Integer)</div>
                <div>• POST /api/chat/conversations/{'{conversationIdx}'}/confirm-deal — 펫케어 거래 확정 (204)</div>
              </div>
            </div>

            <div className="section-card" style={{
              padding: '1.5rem',
              backgroundColor: 'var(--card-bg)',
              borderRadius: '8px',
              border: '1px solid var(--nav-border)',
              marginBottom: '1rem'
            }}>
              <h3 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>메시지 (/api/chat/messages)</h3>
              <div style={{
                color: 'var(--text-secondary)',
                lineHeight: '1.8',
                fontFamily: 'monospace',
                fontSize: '0.9rem'
              }}>
                <div>• POST /api/chat/messages — 전송 (Body: <code style={{ backgroundColor: 'var(--bg-color)', padding: '0.1rem 0.3rem', borderRadius: '4px' }}>SendMessageRequest</code>; 발신자는 JWT)</div>
                <div>• GET /api/chat/messages/conversation/{'{conversationIdx}'} — 목록 (page 기본 0, size 기본 50)</div>
                <div>• GET /api/chat/messages/conversation/{'{conversationIdx}'}/before — 커서 (<code style={{ backgroundColor: 'var(--bg-color)', padding: '0.1rem 0.3rem', borderRadius: '4px' }}>beforeDate</code> ISO, size 기본 50)</div>
                <div>• POST /api/chat/messages/conversation/{'{conversationIdx}'}/read — 읽음 (<code style={{ backgroundColor: 'var(--bg-color)', padding: '0.1rem 0.3rem', borderRadius: '4px' }}>lastMessageIdx</code> 선택, 204)</div>
                <div>• DELETE /api/chat/messages/{'{messageIdx}'} — 삭제 (204)</div>
                <div>• GET /api/chat/messages/conversation/{'{conversationIdx}'}/search — 검색 (<code style={{ backgroundColor: 'var(--bg-color)', padding: '0.1rem 0.3rem', borderRadius: '4px' }}>keyword</code> 필수, FULLTEXT 전제)</div>
                <div>• GET /api/chat/messages/conversation/{'{conversationIdx}'}/unread-count — unread (Long)</div>
              </div>
            </div>

            <div className="section-card" style={{
              padding: '1.5rem',
              backgroundColor: 'var(--card-bg)',
              borderRadius: '8px',
              border: '1px solid var(--nav-border)',
              marginBottom: '1rem'
            }}>
              <h3 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>실종 제보 (Missing pet)</h3>
              <div style={{
                color: 'var(--text-secondary)',
                lineHeight: '1.8',
                fontFamily: 'monospace',
                fontSize: '0.9rem'
              }}>
                <div>• POST /api/missing-pets/{'{boardIdx}'}/start-chat — 실종 채팅 시작 (목격자 = JWT principal, witnessId 없음)</div>
              </div>
            </div>

            <div className="section-card" style={{
              padding: '1.5rem',
              backgroundColor: 'var(--card-bg)',
              borderRadius: '8px',
              border: '1px solid var(--nav-border)'
            }}>
              <h3 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>WebSocket (chat.md 4.6)</h3>
              <div style={{
                color: 'var(--text-secondary)',
                lineHeight: '1.8',
                fontFamily: 'monospace',
                fontSize: '0.9rem'
              }}>
                <div>• /app/chat.send — 실시간 메시지 전송</div>
                <div>• /app/chat.read — 실시간 읽음</div>
                <div>• /app/chat.typing — 타이핑</div>
                <div>• /topic/conversation/{'{conversationIdx}'} — 방 메시지 구독</div>
                <div>• /user/{'{loginId}'}/queue/errors — 전송 실패 시 (Principal#getName() = 로그인 ID 문자열, 숫자 userId 아님)</div>
              </div>
              <p style={{ marginTop: '0.75rem', marginBottom: 0, fontSize: '0.85rem', color: 'var(--text-secondary)', fontFamily: 'inherit', lineHeight: '1.6' }}>
                서버 → 클라이언트 타이핑 브로드캐스트는 <code style={{ backgroundColor: 'var(--bg-color)', padding: '0.1rem 0.3rem', borderRadius: '4px' }}>/topic/conversation/{'{conversationIdx}'}/typing</code> (chat.md 4.7절).
              </p>
            </div>
          </section>

          {/* 9. 관련 문서 */}
          <section id="docs" style={{ marginBottom: '3rem', scrollMarginTop: '2rem' }}>
            <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>관련 문서</h2>
        <div className="section-card" style={{
          padding: '1rem',
          backgroundColor: 'var(--card-bg)',
          borderRadius: '8px',
          border: '1px solid var(--nav-border)'
        }}>
          <a 
            href="https://github.com/makkong1/makkong1-github.io/blob/main/docs/domains/chat.md" 
            target="_blank"
            rel="noopener noreferrer"
            style={{ 
              color: 'var(--link-color)',
              textDecoration: 'none',
              display: 'block',
              marginBottom: '0.5rem'
            }}
          >
            → Chat 도메인 상세 문서
          </a>
          <Link
            to="/domains/chat/refactoring"
            style={{
              color: 'var(--link-color)',
              textDecoration: 'none',
              display: 'block',
              marginBottom: '0.5rem',
              fontWeight: 'bold'
            }}
          >
            → Chat 백엔드 리팩토링 요약 페이지
          </Link>
          <a 
            href="https://github.com/makkong1/makkong1-github.io/blob/main/docs/refactoring/chat/chat-code-review-2026-04-14.md" 
            target="_blank"
            rel="noopener noreferrer"
            style={{ 
              color: 'var(--link-color)',
              textDecoration: 'none',
              display: 'block',
              marginBottom: '0.5rem'
            }}
          >
            → Chat 코드 리뷰 (GitHub 원문)
          </a>
          <a 
            href="https://github.com/makkong1/makkong1-github.io/blob/main/docs/refactoring/chat/chat-backend-security-transaction-2026-04-14.md" 
            target="_blank"
            rel="noopener noreferrer"
            style={{ 
              color: 'var(--link-color)',
              textDecoration: 'none',
              display: 'block'
            }}
          >
            → Chat 보안·트랜잭션·검색 정리 (GitHub 원문)
          </a>
        </div>
          </section>
        </div>
        <TableOfContents sections={sections} />
      </div>
    </div>
  );
}

export default ChatDomain;
