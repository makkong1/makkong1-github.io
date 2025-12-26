import MermaidDiagram from '../../../../components/Common/MermaidDiagram';
import TableOfContents from '../../../../components/Common/TableOfContents';

function ChatDomain() {
  const sections = [
    { id: 'intro', title: '도메인 소개' },
    { id: 'problem', title: '가정한 문제 상황' },
    { id: 'test-design', title: '문제 재현 방식' },
    { id: 'before', title: '성능 측정 결과 (개선 전)' },
    { id: 'optimization', title: '성능 최적화 및 동시성 제어' },
    { id: 'after', title: '성능 개선 결과 (개선 후)' },
    { id: 'entities', title: 'Entity 구조' },
    { id: 'services', title: 'Service 주요 기능' },
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
        Long lastReadMessageIdx
        LocalDateTime lastReadAt
        LocalDateTime joinedAt
        LocalDateTime leftAt
    }
    
    Message {
        Long idx PK
        Long conversation_idx FK
        Long sender_idx FK
        String content
        LocalDateTime createdAt
    }`;

  const markAsReadSequenceDiagram = `sequenceDiagram
    participant User as 사용자
    participant Frontend as Frontend
    participant ChatService as ChatMessageService
    participant MessageRepo as ChatMessageRepository
    participant ParticipantRepo as ParticipantRepository
    participant ReadStatusRepo as MessageReadStatusRepository
    participant DB as MySQL
    
    User->>Frontend: 메시지 읽음 처리 요청
    Frontend->>ChatService: markAsRead()
    
    ChatService->>ParticipantRepo: findByConversationIdxAndUserIdx()
    ParticipantRepo->>DB: 참여자 조회 (1)
    
    Note over ChatService,DB: 비효율적인 전체 메시지 조회
    ChatService->>MessageRepo: findByConversationIdxOrderByCreatedAtDesc()
    MessageRepo->>DB: 채팅방의 모든 메시지 조회 (수천~수만 건) (2)
    
    Note over ChatService: Java에서 필터링
    ChatService->>ChatService: stream().filter() (메모리에서 처리)
    
    Note over ChatService,DB: 불필요한 MessageReadStatus 기록
    loop 각 읽지 않은 메시지마다
        ChatService->>ReadStatusRepo: existsByMessageAndUser()
        ReadStatusRepo->>DB: 읽음 상태 확인 (3, 4, 5...)
        Note over ChatService: 실제로는 사용 안 함 (주석 처리됨)
    end
    
    ChatService->>ParticipantRepo: save() (unreadCount, lastReadMessage 업데이트)
    ParticipantRepo->>DB: 참여자 정보 업데이트
    
    Note over ChatService,DB: 메시지 7,000건 기준: 1 + 1 + 7,000 = 7,002개 이상 쿼리`;

  const optimizedMarkAsReadSequenceDiagram = `sequenceDiagram
    participant User as 사용자
    participant Frontend as Frontend
    participant ChatService as ChatMessageService
    participant ParticipantRepo as ParticipantRepository
    participant MessageRepo as ChatMessageRepository
    participant DB as MySQL
    
    User->>Frontend: 메시지 읽음 처리 요청
    Frontend->>ChatService: markAsRead()
    
    ChatService->>ParticipantRepo: findByConversationIdxAndUserIdx()
    ParticipantRepo->>DB: 참여자 조회 (1)
    
    alt lastMessageIdx가 있는 경우
        ChatService->>MessageRepo: findById()
        MessageRepo->>DB: 마지막 읽은 메시지 조회 (2)
    end
    
    ChatService->>ParticipantRepo: save() (unreadCount=0, lastReadMessage 업데이트)
    ParticipantRepo->>DB: 참여자 정보 업데이트
    
    Note over ChatService,DB: 최적화: 전체 메시지 조회 제거, MessageReadStatus 로직 제거
    Note over ChatService,DB: 메시지 7,000건 기준: 2-3개 쿼리로 감소`;

  return (
    <div style={{ padding: '2rem 0' }}>
      <div style={{ display: 'flex', gap: '2rem', alignItems: 'flex-start' }}>
        <div style={{ flex: 1 }}>
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
            </div>
          </section>

          {/* 2. 가정한 문제 상황 */}
          <section id="problem" style={{ marginBottom: '3rem', scrollMarginTop: '2rem' }}>
            <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>가정한 문제 상황</h2>
            <div className="section-card" style={{
              padding: '1.5rem',
              backgroundColor: 'var(--card-bg)',
              borderRadius: '8px',
              border: '1px solid var(--nav-border)'
            }}>
              <p style={{ lineHeight: '1.8', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                메시지 읽음 처리 시 <strong style={{ color: 'var(--text-color)' }}>전체 메시지 조회 및 프론트엔드 빈번한 호출</strong>로 인한 성능 저하가 발생했습니다.
              </p>
              <div style={{
                padding: '1rem',
                backgroundColor: 'var(--bg-color)',
                borderRadius: '6px',
                marginTop: '1rem'
              }}>
                <h3 style={{ marginBottom: '0.75rem', color: 'var(--text-color)', fontSize: '1rem' }}>주요 문제점</h3>
                <ul style={{
                  listStyle: 'none',
                  padding: 0,
                  color: 'var(--text-secondary)',
                  lineHeight: '1.8'
                }}>
                  <li>• <strong style={{ color: 'var(--text-color)' }}>비효율적인 전체 메시지 조회</strong>: 채팅방의 모든 메시지를 조회하고 Java에서 필터링</li>
                  <li>• <strong style={{ color: 'var(--text-color)' }}>프론트엔드에서 빈번한 호출</strong>: 메시지 조회 후, WebSocket 수신 시, 메시지 전송 후 등 여러 시점에 호출</li>
                  <li>• <strong style={{ color: 'var(--text-color)' }}>불필요한 로직</strong>: MessageReadStatus 기록 로직이 있지만 실제로 사용하지 않음</li>
                  <li>• <strong style={{ color: 'var(--text-color)' }}>트랜잭션 범위가 넓음</strong>: 불필요한 로직 포함으로 Lock 유지 시간 증가</li>
                </ul>
              </div>
              <div style={{
                padding: '1rem',
                backgroundColor: 'var(--bg-color)',
                borderRadius: '6px',
                marginTop: '1rem'
              }}>
                <h3 style={{ marginBottom: '0.75rem', color: 'var(--text-color)', fontSize: '1rem' }}>해결 방법</h3>
                <ul style={{
                  listStyle: 'none',
                  padding: 0,
                  color: 'var(--text-secondary)',
                  lineHeight: '1.8'
                }}>
                  <li>• <strong style={{ color: 'var(--text-color)' }}>불필요한 로직 제거</strong>: 전체 메시지 조회 및 MessageReadStatus 기록 로직 완전 제거</li>
                  <li>• <strong style={{ color: 'var(--text-color)' }}>읽음 처리 단순화</strong>: 참여자의 unreadCount와 lastReadMessage 업데이트만 수행</li>
                  <li>• <strong style={{ color: 'var(--text-color)' }}>프론트엔드 최적화</strong>: 디바운싱 적용으로 호출 빈도 감소 (초당 최대 1회)</li>
                </ul>
              </div>
              <div style={{
                padding: '1rem',
                backgroundColor: 'var(--bg-color)',
                borderRadius: '6px',
                marginTop: '1rem'
              }}>
                <h3 style={{ marginBottom: '0.75rem', color: 'var(--text-color)', fontSize: '1rem' }}>개선 결과</h3>
                <ul style={{
                  listStyle: 'none',
                  padding: 0,
                  color: 'var(--text-secondary)',
                  lineHeight: '1.8'
                }}>
                  <li>• <strong style={{ color: 'var(--text-color)' }}>메시지 조회 제거</strong>: 메시지 7,000건 기준 → 쿼리 1개 제거, 메모리 사용량 대폭 감소</li>
                  <li>• <strong style={{ color: 'var(--text-color)' }}>코드 단순화</strong>: 불필요한 로직 제거로 유지보수성 향상</li>
                  <li>• <strong style={{ color: 'var(--text-color)' }}>트랜잭션 범위 축소</strong>: 필수 로직만 실행하여 Lock 유지 시간 단축</li>
                </ul>
              </div>
            </div>
          </section>

          {/* 3. 문제 재현 방식 (테스트 설계) */}
          <section id="test-design" style={{ marginBottom: '3rem', scrollMarginTop: '2rem' }}>
            <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>문제 재현 방식 (테스트 설계)</h2>
            <div className="section-card" style={{
              padding: '1.5rem',
              backgroundColor: 'var(--card-bg)',
              borderRadius: '8px',
              border: '1px solid var(--nav-border)'
            }}>
              <p style={{ lineHeight: '1.8', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                메시지 읽음 처리 성능 문제를 재현하기 위한 시나리오를 설계했습니다.
              </p>
              <div style={{
                padding: '1rem',
                backgroundColor: 'var(--bg-color)',
                borderRadius: '6px',
                marginTop: '1rem'
              }}>
                <h3 style={{ marginBottom: '0.75rem', color: 'var(--text-color)', fontSize: '1rem' }}>테스트 시나리오</h3>
                <ul style={{
                  listStyle: 'none',
                  padding: 0,
                  color: 'var(--text-secondary)',
                  lineHeight: '1.8'
                }}>
                  <li>• 채팅방에 메시지 7,000건 존재</li>
                  <li>• 사용자가 메시지 읽음 처리 요청</li>
                  <li>• 전체 메시지 조회 및 필터링 과정에서 성능 저하 발생</li>
                  <li>• 프론트엔드에서 빈번한 호출로 인한 추가 부하</li>
                </ul>
              </div>
            </div>
            <div className="section-card" style={{
              padding: '1.5rem',
              backgroundColor: 'var(--card-bg)',
              borderRadius: '8px',
              border: '1px solid var(--nav-border)',
              marginTop: '1rem'
            }}>
              <h3 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>시퀀스 다이어그램 (최적화 전)</h3>
              <MermaidDiagram chart={markAsReadSequenceDiagram} />
            </div>
          </section>

          {/* 4. 성능 측정 결과 (개선 전) */}
          <section id="before" style={{ marginBottom: '3rem', scrollMarginTop: '2rem' }}>
            <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>성능 측정 결과 (개선 전)</h2>
            <div className="section-card" style={{
              padding: '1.5rem',
              backgroundColor: 'var(--card-bg)',
              borderRadius: '8px',
              border: '1px solid var(--nav-border)'
            }}>
              <p style={{ lineHeight: '1.8', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                메시지 읽음 처리 시 전체 메시지 조회로 인해 심각한 성능 저하가 발생했습니다.
              </p>
              <div style={{
                overflowX: 'auto',
                marginBottom: '1rem'
              }}>
                <table style={{
                  width: '100%',
                  borderCollapse: 'collapse',
                  color: 'var(--text-secondary)',
                  fontSize: '0.9rem'
                }}>
                  <thead>
                    <tr style={{
                      borderBottom: '2px solid var(--nav-border)'
                    }}>
                      <th style={{
                        padding: '0.75rem',
                        textAlign: 'left',
                        color: 'var(--text-color)',
                        fontWeight: 'bold'
                      }}>측정 항목</th>
                      <th style={{
                        padding: '0.75rem',
                        textAlign: 'left',
                        color: 'var(--text-color)',
                        fontWeight: 'bold'
                      }}>최적화 전</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr style={{
                      borderBottom: '1px solid var(--nav-border)'
                    }}>
                      <td style={{ padding: '0.75rem' }}>메시지 조회</td>
                      <td style={{ padding: '0.75rem', fontWeight: 'bold', color: '#e74c3c' }}>전체 메시지 조회 (수천~수만 건)</td>
                    </tr>
                    <tr style={{
                      borderBottom: '1px solid var(--nav-border)'
                    }}>
                      <td style={{ padding: '0.75rem' }}>Java 필터링</td>
                      <td style={{ padding: '0.75rem', fontWeight: 'bold', color: '#e74c3c' }}>스트림으로 대량 데이터 필터링</td>
                    </tr>
                    <tr style={{
                      borderBottom: '1px solid var(--nav-border)'
                    }}>
                      <td style={{ padding: '0.75rem' }}>MessageReadStatus</td>
                      <td style={{ padding: '0.75rem', fontWeight: 'bold', color: '#e74c3c' }}>사용 안 하는 로직 포함</td>
                    </tr>
                    <tr>
                      <td style={{ padding: '0.75rem' }}>메모리 사용</td>
                      <td style={{ padding: '0.75rem', fontWeight: 'bold', color: '#e74c3c' }}>전체 메시지 로드</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* 5. 성능 최적화 및 동시성 제어 */}
          <section id="optimization" style={{ marginBottom: '3rem', scrollMarginTop: '2rem' }}>
            <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>성능 최적화 및 동시성 제어</h2>
            <div className="section-card" style={{
              padding: '1.5rem',
              backgroundColor: 'var(--card-bg)',
              borderRadius: '8px',
              border: '1px solid var(--nav-border)',
              marginBottom: '1rem'
            }}>
              <h3 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>1. 불필요한 로직 제거</h3>
              <p style={{ lineHeight: '1.8', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                전체 메시지 조회 및 MessageReadStatus 기록 로직을 완전히 제거했습니다.
              </p>
              <div style={{
                padding: '1rem',
                backgroundColor: 'var(--bg-color)',
                borderRadius: '6px',
                marginBottom: '1rem'
              }}>
                <h4 style={{ marginBottom: '0.75rem', color: 'var(--text-color)', fontSize: '0.95rem' }}>Before (문제 코드)</h4>
                <pre style={{
                  padding: '0.75rem',
                  backgroundColor: 'var(--card-bg)',
                  borderRadius: '4px',
                  overflow: 'auto',
                  fontSize: '0.85rem',
                  color: 'var(--text-secondary)',
                  fontFamily: 'monospace',
                  lineHeight: '1.6',
                  margin: '0.5rem 0'
                }}>
{`@Transactional
public void markAsRead(Long conversationIdx, Long userId, Long lastMessageIdx) {
    // 참여자 확인
    ConversationParticipant participant = participantRepository
            .findByConversationIdxAndUserIdx(conversationIdx, userId)
            .orElseThrow(() -> new IllegalArgumentException("채팅방 참여자가 아닙니다."));

    // ⚠️ 문제: 채팅방의 모든 메시지를 조회하고 Java에서 필터링
    List<ChatMessage> unreadMessages = chatMessageRepository
            .findByConversationIdxOrderByCreatedAtDesc(conversationIdx)  // 전체 조회!
            .stream()
            .filter(m -> m.getCreatedAt().isBefore(
                    chatMessageRepository.findById(lastMessageIdx)
                        .map(ChatMessage::getCreatedAt)
                        .orElse(LocalDateTime.now()))
                && !m.getSender().getIdx().equals(userId))
            .collect(Collectors.toList());

    // ⚠️ 문제: MessageReadStatus 기록 로직 (실제로는 사용 안 함 - 주석 처리됨)
    for (ChatMessage message : unreadMessages) {
        if (!readStatusRepository.existsByMessageAndUser(message, user)) {
            // readStatusRepository.save(...); // 주석 처리됨
        }
    }

    // 읽지 않은 메시지 수 초기화
    participant.setUnreadCount(0);
    if (lastMessageIdx != null) {
        ChatMessage lastMessage = chatMessageRepository.findById(lastMessageIdx)
                .orElse(null);
        if (lastMessage != null) {
            participant.setLastReadMessage(lastMessage);
            participant.setLastReadAt(LocalDateTime.now());
        }
    }
    participantRepository.save(participant);
}`}
                </pre>
              </div>
              <div style={{
                padding: '1rem',
                backgroundColor: 'var(--bg-color)',
                borderRadius: '6px',
                marginBottom: '1rem'
              }}>
                <h4 style={{ marginBottom: '0.75rem', color: 'var(--text-color)', fontSize: '0.95rem' }}>After (개선된 코드)</h4>
                <pre style={{
                  padding: '0.75rem',
                  backgroundColor: 'var(--card-bg)',
                  borderRadius: '4px',
                  overflow: 'auto',
                  fontSize: '0.85rem',
                  color: 'var(--text-secondary)',
                  fontFamily: 'monospace',
                  lineHeight: '1.6',
                  margin: '0.5rem 0'
                }}>
{`@Transactional
public void markAsRead(Long conversationIdx, Long userId, Long lastMessageIdx) {
    // 참여자 확인
    ConversationParticipant participant = participantRepository
            .findByConversationIdxAndUserIdx(conversationIdx, userId)
            .orElseThrow(() -> new IllegalArgumentException("채팅방 참여자가 아닙니다."));

    // 읽지 않은 메시지 수 초기화
    participant.setUnreadCount(0);
    
    if (lastMessageIdx != null) {
        ChatMessage lastMessage = chatMessageRepository.findById(lastMessageIdx)
                .orElse(null);
        if (lastMessage != null) {
            participant.setLastReadMessage(lastMessage);
            participant.setLastReadAt(LocalDateTime.now());
        }
    }
    
    participantRepository.save(participant);
    
    // ✅ 제거됨: 불필요한 전체 메시지 조회 및 MessageReadStatus 기록 로직
    // - 전체 메시지 조회는 성능 문제를 일으킴 (수천~수만 건 조회)
    // - MessageReadStatus 기록 로직은 실제로 사용되지 않음
    // - 참여자의 unreadCount와 lastReadMessage 업데이트만으로 충분함
}`}
                </pre>
              </div>
              <p style={{ lineHeight: '1.8', color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '0.5rem' }}>
                <strong style={{ color: 'var(--text-color)' }}>효과:</strong> 불필요한 전체 메시지 조회 제거, 메모리 사용량 대폭 감소, 트랜잭션 범위 축소
              </p>
            </div>
            <div className="section-card" style={{
              padding: '1.5rem',
              backgroundColor: 'var(--card-bg)',
              borderRadius: '8px',
              border: '1px solid var(--nav-border)'
            }}>
              <h3 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>2. 프론트엔드 최적화 (디바운싱)</h3>
              <p style={{ lineHeight: '1.8', color: 'var(--text-secondary)', marginBottom: '0.75rem' }}>
                읽음 처리 호출 빈도를 감소시키기 위해 디바운싱을 적용할 수 있습니다.
              </p>
              <p style={{ lineHeight: '1.8', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                <strong style={{ color: 'var(--text-color)' }}>효과:</strong> 초당 최대 1회 호출로 제한하여 DB 부하 감소
              </p>
            </div>
          </section>

          {/* 6. 성능 개선 결과 (개선 후) */}
          <section id="after" style={{ marginBottom: '3rem', scrollMarginTop: '2rem' }}>
            <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>성능 개선 결과 (개선 후)</h2>
            <div className="section-card" style={{
              padding: '1.5rem',
              backgroundColor: 'var(--card-bg)',
              borderRadius: '8px',
              border: '1px solid var(--nav-border)'
            }}>
              <p style={{ lineHeight: '1.8', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                불필요한 로직을 제거하여 메시지 읽음 처리 성능이 크게 개선되었습니다.
              </p>
              <div style={{
                overflowX: 'auto',
                marginBottom: '1rem'
              }}>
                <table style={{
                  width: '100%',
                  borderCollapse: 'collapse',
                  color: 'var(--text-secondary)',
                  fontSize: '0.9rem'
                }}>
                  <thead>
                    <tr style={{
                      borderBottom: '2px solid var(--nav-border)'
                    }}>
                      <th style={{
                        padding: '0.75rem',
                        textAlign: 'left',
                        color: 'var(--text-color)',
                        fontWeight: 'bold'
                      }}>항목</th>
                      <th style={{
                        padding: '0.75rem',
                        textAlign: 'left',
                        color: 'var(--text-color)',
                        fontWeight: 'bold'
                      }}>개선 전</th>
                      <th style={{
                        padding: '0.75rem',
                        textAlign: 'left',
                        color: 'var(--text-color)',
                        fontWeight: 'bold'
                      }}>개선 후</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr style={{
                      borderBottom: '1px solid var(--nav-border)'
                    }}>
                      <td style={{ padding: '0.75rem' }}>메시지 조회</td>
                      <td style={{ padding: '0.75rem', fontWeight: 'bold', color: '#e74c3c' }}>전체 메시지 조회 (수천~수만 건)</td>
                      <td style={{ padding: '0.75rem', fontWeight: 'bold', color: '#27ae60' }}>✅ 불필요한 조회 제거</td>
                    </tr>
                    <tr style={{
                      borderBottom: '1px solid var(--nav-border)'
                    }}>
                      <td style={{ padding: '0.75rem' }}>Java 필터링</td>
                      <td style={{ padding: '0.75rem', fontWeight: 'bold', color: '#e74c3c' }}>스트림으로 대량 데이터 필터링</td>
                      <td style={{ padding: '0.75rem', fontWeight: 'bold', color: '#27ae60' }}>✅ 제거</td>
                    </tr>
                    <tr style={{
                      borderBottom: '1px solid var(--nav-border)'
                    }}>
                      <td style={{ padding: '0.75rem' }}>MessageReadStatus</td>
                      <td style={{ padding: '0.75rem', fontWeight: 'bold', color: '#e74c3c' }}>사용 안 하는 로직 포함</td>
                      <td style={{ padding: '0.75rem', fontWeight: 'bold', color: '#27ae60' }}>✅ 제거</td>
                    </tr>
                    <tr>
                      <td style={{ padding: '0.75rem' }}>메모리 사용</td>
                      <td style={{ padding: '0.75rem', fontWeight: 'bold', color: '#e74c3c' }}>전체 메시지 로드</td>
                      <td style={{ padding: '0.75rem', fontWeight: 'bold', color: '#27ae60' }}>✅ 최소화</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className="section-card" style={{
              padding: '1.5rem',
              backgroundColor: 'var(--card-bg)',
              borderRadius: '8px',
              border: '1px solid var(--nav-border)',
              marginTop: '1rem'
            }}>
              <h3 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>시퀀스 다이어그램 (최적화 후)</h3>
              <MermaidDiagram chart={optimizedMarkAsReadSequenceDiagram} />
            </div>
          </section>

          {/* 7. Entity 구조 */}
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

          {/* 8. Service 주요 기능 */}
          <section id="services" style={{ marginBottom: '3rem', scrollMarginTop: '2rem' }}>
            <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>Service 주요 기능</h2>
            <div className="section-card" style={{
              padding: '1.5rem',
              backgroundColor: 'var(--card-bg)',
              borderRadius: '8px',
              border: '1px solid var(--nav-border)'
            }}>
              <h3 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>ConversationService</h3>
              <div style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}>
                <div>• createConversation() - 채팅방 생성</div>
                <div>• getMyConversations() - 내 채팅방 목록 조회</div>
                <div>• getConversation() - 채팅방 상세 조회</div>
                <div>• joinConversation() - 채팅방 참여</div>
                <div>• leaveConversation() - 채팅방 나가기</div>
              </div>
            </div>
          </section>

          {/* 9. 보안 및 권한 체계 */}
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
              </ul>
            </div>
          </section>

          {/* 9. 다른 도메인과의 연관관계 */}
          <section id="relationships" style={{ marginBottom: '3rem', scrollMarginTop: '2rem' }}>
            <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>주요 기능</h2>
            
            <div className="section-card" style={{
              padding: '1.5rem',
              backgroundColor: 'var(--card-bg)',
              borderRadius: '8px',
              border: '1px solid var(--nav-border)',
              marginBottom: '1.5rem'
            }}>
              <h3 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>실시간 채팅</h3>
              <div style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}>
                <p style={{ marginBottom: '0.5rem' }}>WebSocket(STOMP) 기반으로 실시간 양방향 메시지 통신을 제공합니다.</p>
                <p style={{ marginBottom: '0.5rem' }}><strong style={{ color: 'var(--text-color)' }}>주요 기능:</strong></p>
                <ul style={{ marginLeft: '1.5rem', marginBottom: '0.5rem' }}>
                  <li>WebSocket 기반 양방향 통신</li>
                  <li>실시간 메시지 전송/수신</li>
                  <li>STOMP 프로토콜 사용</li>
                  <li>연결 상태 관리</li>
                </ul>
                <p style={{ marginTop: '0.5rem', fontStyle: 'italic', color: 'var(--text-muted)' }}>스크린샷/영상: [추가 예정]</p>
              </div>
            </div>

            <div className="section-card" style={{
              padding: '1.5rem',
              backgroundColor: 'var(--card-bg)',
              borderRadius: '8px',
              border: '1px solid var(--nav-border)',
              marginBottom: '1.5rem'
            }}>
              <h3 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>채팅방 생성 및 관리</h3>
              <div style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}>
                <p style={{ marginBottom: '0.5rem' }}>다양한 타입의 채팅방을 생성하고 관리할 수 있습니다.</p>
                <p style={{ marginBottom: '0.5rem' }}><strong style={{ color: 'var(--text-color)' }}>주요 기능:</strong></p>
                <ul style={{ marginLeft: '1.5rem', marginBottom: '0.5rem' }}>
                  <li>1:1 일반 채팅 (DIRECT)</li>
                  <li>그룹 채팅 (MEETUP - 산책모임)</li>
                  <li>펫케어 요청 관련 채팅 (CARE_REQUEST)</li>
                  <li>실종제보 관련 채팅 (MISSING_PET)</li>
                  <li>채팅방 참여/나가기</li>
                  <li>참여자 관리 (추가/제거)</li>
                  <li>참여 상태 관리 (ACTIVE/LEFT)</li>
                </ul>
                <p style={{ marginTop: '0.5rem', fontStyle: 'italic', color: 'var(--text-muted)' }}>스크린샷/영상: [추가 예정]</p>
              </div>
            </div>

            <div className="section-card" style={{
              padding: '1.5rem',
              backgroundColor: 'var(--card-bg)',
              borderRadius: '8px',
              border: '1px solid var(--nav-border)',
              marginBottom: '1.5rem'
            }}>
              <h3 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>메시지 관리</h3>
              <div style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}>
                <p style={{ marginBottom: '0.5rem' }}>메시지를 전송하고 관리하며, 읽음 상태를 추적합니다.</p>
                <p style={{ marginBottom: '0.5rem' }}><strong style={{ color: 'var(--text-color)' }}>주요 기능:</strong></p>
                <ul style={{ marginLeft: '1.5rem', marginBottom: '0.5rem' }}>
                  <li>메시지 전송/조회/삭제</li>
                  <li>메시지 읽음 처리</li>
                  <li>읽지 않은 메시지 수 관리</li>
                  <li>메시지 히스토리 조회</li>
                  <li>참여 시점 이후 메시지만 조회 (그룹 채팅)</li>
                </ul>
                <p style={{ marginTop: '0.5rem', fontStyle: 'italic', color: 'var(--text-muted)' }}>스크린샷/영상: [추가 예정]</p>
              </div>
            </div>
      </section>

          {/* 10. API 엔드포인트 */}
          <section id="api" style={{ marginBottom: '3rem', scrollMarginTop: '2rem' }}>
            <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>API 엔드포인트</h2>
            <div className="section-card" style={{
              padding: '1.5rem',
              backgroundColor: 'var(--card-bg)',
              borderRadius: '8px',
              border: '1px solid var(--nav-border)'
            }}>
              <div style={{
                color: 'var(--text-secondary)',
                lineHeight: '1.8',
                fontFamily: 'monospace',
                fontSize: '0.9rem'
              }}>
                <div>• GET /api/chat/conversations - 내 채팅방 목록</div>
                <div>• GET /api/chat/conversations/{'{id}'} - 채팅방 상세</div>
                <div>• POST /api/chat/conversations - 채팅방 생성</div>
                <div>• POST /api/chat/conversations/{'{id}'}/join - 채팅방 참여</div>
                <div>• POST /api/chat/conversations/{'{id}'}/leave - 채팅방 나가기</div>
                <div>• GET /api/chat/conversations/{'{id}'}/messages - 메시지 목록</div>
                <div>• POST /api/chat/messages - 메시지 전송</div>
              </div>
            </div>
          </section>

          {/* 11. 관련 문서 */}
          <section id="docs" style={{ marginBottom: '3rem', scrollMarginTop: '2rem' }}>
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
            <div>• 댓글에서 "채팅하기" 버튼으로 1:1 채팅 시작</div>
            <div style={{ marginTop: '1rem', marginBottom: '0.5rem' }}><strong style={{ color: 'var(--text-color)' }}>MissingPet 도메인:</strong></div>
            <div>• "목격했어요" 버튼으로 제보자-목격자 간 1:1 채팅 시작</div>
            <div style={{ marginTop: '1rem', marginBottom: '0.5rem' }}><strong style={{ color: 'var(--text-color)' }}>Meetup 도메인:</strong></div>
            <div>• 모임 생성 시 그룹 채팅방 자동 생성, 모임 참여자 간 채팅</div>
            <div style={{ marginTop: '1rem', marginBottom: '0.5rem' }}><strong style={{ color: 'var(--text-color)' }}>Notification 도메인:</strong></div>
            <div>• 새 메시지 도착 시 알림, 읽지 않은 메시지 알림</div>
          </div>
        </div>
      </section>

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
            → 채팅 시스템 설계 문서 보기
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
