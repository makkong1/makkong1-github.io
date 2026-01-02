import { Link } from 'react-router-dom';
import MermaidDiagram from '../../../../components/Common/MermaidDiagram';
import TableOfContents from '../../../../components/Common/TableOfContents';

function ChatDomainOptimization() {
  const sections = [
    { id: 'intro', title: '개요' },
    { id: 'test-design', title: '문제 재현 방식 (테스트 설계)' },
    { id: 'before', title: '성능 측정 결과 (개선 전)' },
    { id: 'optimization', title: '성능 최적화 및 동시성 제어' },
    { id: 'after', title: '성능 개선 결과 (개선 후)' }
  ];

  const beforeSequenceDiagram = `sequenceDiagram
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

  const afterSequenceDiagram = `sequenceDiagram
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
    <div className="domain-page-wrapper" style={{ padding: '2rem 0' }}>
      <div className="domain-page-container" style={{ display: 'flex', gap: '2rem', alignItems: 'flex-start' }}>
        <div className="domain-page-content" style={{ flex: 1 }}>
          <div style={{ marginBottom: '1rem' }}>
            <Link 
              to="/domains/chat" 
              style={{ 
                color: 'var(--link-color)', 
                textDecoration: 'none',
                fontSize: '0.9rem'
              }}
            >
              ← Chat 도메인으로 돌아가기
            </Link>
          </div>
          <h1 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>Chat 도메인 - 성능 최적화 상세</h1>
          
          {/* 1. 개요 */}
          <section id="intro" style={{ marginBottom: '3rem', scrollMarginTop: '2rem' }}>
            <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>개요</h2>
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

          {/* 2. 문제 재현 방식 (테스트 설계) */}
          <section id="test-design" style={{ marginBottom: '3rem', scrollMarginTop: '2rem' }}>
            <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>문제 재현 방식 (테스트 설계)</h2>
            <div className="section-card" style={{
              padding: '1.5rem',
              backgroundColor: 'var(--card-bg)',
              borderRadius: '8px',
              border: '1px solid var(--nav-border)',
              marginBottom: '1rem'
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
              <MermaidDiagram chart={beforeSequenceDiagram} />
            </div>
          </section>

          {/* 3. 성능 측정 결과 (개선 전) */}
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

          {/* 4. 성능 최적화 및 동시성 제어 */}
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

          {/* 5. 성능 개선 결과 (개선 후) */}
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
              <MermaidDiagram chart={afterSequenceDiagram} />
            </div>
          </section>
        </div>
        <TableOfContents sections={sections} />
      </div>
    </div>
  );
}

export default ChatDomainOptimization;

