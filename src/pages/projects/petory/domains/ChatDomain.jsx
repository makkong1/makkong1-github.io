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
    Conversation ||--o{ ConversationParticipant : "has"
    Conversation ||--o{ Message : "has"
    Users ||--o{ ConversationParticipant : "participates"
    Users ||--o{ Message : "sends"
    
    Conversation {
        Long idx PK
        ConversationType conversationType
        String relatedType
        Long relatedIdx
        String title
        LocalDateTime createdAt
        LocalDateTime updatedAt
    }
    
    ConversationParticipant {
        Long idx PK
        Long conversation_idx FK
        Long user_idx FK
        ParticipantRole role
        ParticipantStatus status
        Integer unreadCount
        Long lastReadMessageIdx FK
        LocalDateTime lastReadAt
        LocalDateTime joinedAt
        LocalDateTime leftAt
        Boolean dealConfirmed
        LocalDateTime dealConfirmedAt
    }
    
    ChatMessage {
        Long idx PK
        Long conversation_idx FK
        Long sender_idx FK
        MessageType messageType
        String content
        Long replyToMessageIdx FK
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
                  <li>• 1:1 일반 채팅 (DIRECT) - 기존 채팅방 재사용, 펫케어/실종제보와 연동 가능</li>
                  <li>• 펫케어 요청 채팅 (CARE_REQUEST) - 거래 확정 기능 지원</li>
                  <li>• 실종제보 채팅 (MISSING_PET) - 제보자-목격자 조합별 개별 채팅방</li>
                  <li>• 산책모임 채팅 (MEETUP) - 모임 참여 시 자동 참여, 모임 나가기 시 채팅방에서도 나감</li>
                  <li>• 그룹 채팅 (GROUP) - 관리자 지정 가능</li>
                  <li>• 채팅방 참여/나가기, 참여자 관리</li>
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
                  border: '1px solid var(--link-color)'
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
              </div>
            </div>
          </section>

          {/* 6. Entity 구조 */}
          <section id="entities" style={{ marginBottom: '3rem', scrollMarginTop: '2rem' }}>
            <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>Entity 구조</h2>
            <div className="section-card" style={{
              padding: '1.5rem',
              backgroundColor: 'var(--card-bg)',
              borderRadius: '8px',
              border: '1px solid var(--nav-border)',
              marginBottom: '1.5rem'
            }}>
              <MermaidDiagram chart={entityDiagram} />
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
                <li>• <strong style={{ color: 'var(--text-color)' }}>WebSocket 인증</strong>: 연결 시 JWT 토큰 검증</li>
                <li>• <strong style={{ color: 'var(--text-color)' }}>채팅방 접근 권한</strong>: 참여자만 메시지 조회/전송 가능</li>
                <li>• <strong style={{ color: 'var(--text-color)' }}>메시지 삭제 권한</strong>: 본인 메시지만 삭제 가능</li>
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
            <div>• 펫케어 요청 관련 채팅방 생성 (RelatedType.CARE_APPLICATION), 거래 확정 기능 지원</div>
            <div style={{ marginTop: '1rem', marginBottom: '0.5rem' }}><strong style={{ color: 'var(--text-color)' }}>MissingPet 도메인:</strong></div>
            <div>• "목격했어요" 버튼으로 제보자-목격자 간 1:1 채팅 시작 (제보자-목격자 조합별 개별 채팅방)</div>
            <div style={{ marginTop: '1rem', marginBottom: '0.5rem' }}><strong style={{ color: 'var(--text-color)' }}>Meetup 도메인:</strong></div>
            <div>• 모임 생성 시 그룹 채팅방 자동 생성, 모임 참여 시 자동 참여, 모임 나가기 시 채팅방에서도 나감</div>
            <div style={{ marginTop: '1rem', marginBottom: '0.5rem' }}><strong style={{ color: 'var(--text-color)' }}>Notification 도메인:</strong></div>
            <div>• 새 메시지 도착 시 알림, 읽지 않은 메시지 알림</div>
          </div>
        </div>
      </section>

          {/* 8. API 엔드포인트 */}
          <section id="api" style={{ marginBottom: '3rem', scrollMarginTop: '2rem' }}>
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
                <div>• GET / - 내 채팅방 목록 (userId 파라미터)</div>
                <div>• GET /{'{conversationIdx}'} - 채팅방 상세 (userId 파라미터)</div>
                <div>• POST / - 채팅방 생성 (범용)</div>
                <div>• POST /care-request - 펫케어 채팅방 생성 (careApplicationIdx, requesterId, providerId 파라미터)</div>
                <div>• POST /direct - 1:1 채팅방 생성/조회 (user1Id, user2Id 파라미터)</div>
                <div>• POST /{'{conversationIdx}'}/leave - 채팅방 나가기 (userId 파라미터, 응답: 204 No Content)</div>
                <div>• DELETE /{'{conversationIdx}'} - 채팅방 삭제 (userId 파라미터, 응답: 204 No Content)</div>
                <div>• PATCH /{'{conversationIdx}'}/status - 채팅방 상태 변경 (status 파라미터)</div>
                <div>• POST /meetup/{'{meetupIdx}'}/join - 산책모임 채팅방 참여 (userId 파라미터)</div>
                <div>• GET /meetup/{'{meetupIdx}'}/participant-count - 산책모임 채팅방 참여 인원 수 조회 (응답: Integer)</div>
                <div>• POST /{'{conversationIdx}'}/confirm-deal - 펫케어 거래 확정 (userId 파라미터, 양쪽 모두 확정 시 자동 승인, 응답: 204 No Content)</div>
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
                <div>• POST / - 메시지 전송 (senderIdx 파라미터, RequestBody: SendMessageRequest)</div>
                <div>• GET /conversation/{'{conversationIdx}'} - 메시지 목록 조회 (페이징, userId 파라미터, page 기본값 0, size 기본값 50)</div>
                <div>• GET /conversation/{'{conversationIdx}'}/before - 메시지 목록 조회 (커서 기반, beforeDate 파라미터 ISO 형식, size 기본값 50)</div>
                <div>• POST /conversation/{'{conversationIdx}'}/read - 메시지 읽음 처리 (userId, lastMessageIdx 파라미터, 응답: 204 No Content)</div>
                <div>• DELETE /{'{messageIdx}'} - 메시지 삭제 (userId 파라미터, 응답: 204 No Content)</div>
                <div>• GET /conversation/{'{conversationIdx}'}/search - 메시지 검색 (keyword 파라미터)</div>
                <div>• GET /conversation/{'{conversationIdx}'}/unread-count - 읽지 않은 메시지 수 조회 (userId 파라미터, 응답: Long)</div>
              </div>
            </div>

            <div className="section-card" style={{
              padding: '1.5rem',
              backgroundColor: 'var(--card-bg)',
              borderRadius: '8px',
              border: '1px solid var(--nav-border)'
            }}>
              <h3 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>WebSocket (/app/chat, /topic/conversation)</h3>
              <div style={{
                color: 'var(--text-secondary)',
                lineHeight: '1.8',
                fontFamily: 'monospace',
                fontSize: '0.9rem'
              }}>
                <div>• /app/chat.send - 실시간 메시지 전송</div>
                <div>• /app/chat.read - 실시간 읽음 처리</div>
                <div>• /app/chat.typing - 타이핑 표시</div>
                <div>• /topic/conversation/{'{conversationIdx}'} - 채팅방 메시지 구독</div>
                <div>• /user/{'{userId}'}/queue/errors - 에러 메시지 수신</div>
              </div>
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
              textDecoration: 'none'
            }}
          >
            → Chat 도메인 상세 문서
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
