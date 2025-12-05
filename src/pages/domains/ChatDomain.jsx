import MermaidDiagram from '../../components/Common/MermaidDiagram';

function ChatDomain() {
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

  return (
    <div style={{ padding: '2rem 0' }}>
      <h1 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>채팅 도메인</h1>
      
      <section style={{ marginBottom: '3rem' }}>
        <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>도메인 소개</h2>
        <p style={{ lineHeight: '1.8', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
          실시간 채팅 시스템으로, 다양한 채팅방 타입을 관리하는 도메인입니다.
        </p>
        <p style={{ lineHeight: '1.8', color: 'var(--text-secondary)' }}>
          WebSocket 기반 실시간 통신, 채팅방 타입별 관리, 메시지 읽음 처리 기능을 제공합니다.
        </p>
      </section>

      <section style={{ marginBottom: '3rem' }}>
        <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>주요 기능</h2>
        
        <div style={{ 
          display: 'grid', 
          gap: '1.5rem',
          gridTemplateColumns: 'repeat(2, 1fr)'
        }}>
          <div style={{
            padding: '1.5rem',
            backgroundColor: 'var(--card-bg)',
            borderRadius: '8px',
            border: '1px solid var(--nav-border)'
          }}>
            <h3 style={{ marginBottom: '0.5rem', color: 'var(--text-color)' }}>실시간 채팅</h3>
            <ul style={{ 
              listStyle: 'none', 
              padding: 0,
              color: 'var(--text-secondary)',
              lineHeight: '1.8'
            }}>
              <li>• WebSocket 기반 양방향 통신</li>
              <li>• 실시간 메시지 전송/수신</li>
              <li>• 연결 상태 관리</li>
              <li>• STOMP 프로토콜 사용</li>
            </ul>
          </div>

          <div style={{
            padding: '1.5rem',
            backgroundColor: 'var(--card-bg)',
            borderRadius: '8px',
            border: '1px solid var(--nav-border)'
          }}>
            <h3 style={{ marginBottom: '0.5rem', color: 'var(--text-color)' }}>채팅방 타입</h3>
            <ul style={{ 
              listStyle: 'none', 
              padding: 0,
              color: 'var(--text-secondary)',
              lineHeight: '1.8'
            }}>
              <li>• DIRECT: 1:1 일반 채팅</li>
              <li>• CARE_REQUEST: 펫케어 요청 관련 채팅</li>
              <li>• MISSING_PET: 실종 신고 관련 채팅</li>
              <li>• MEETUP: 모임 관련 채팅 (그룹)</li>
            </ul>
          </div>

          <div style={{
            padding: '1.5rem',
            backgroundColor: 'var(--card-bg)',
            borderRadius: '8px',
            border: '1px solid var(--nav-border)'
          }}>
            <h3 style={{ marginBottom: '0.5rem', color: 'var(--text-color)' }}>메시지 관리</h3>
            <ul style={{ 
              listStyle: 'none', 
              padding: 0,
              color: 'var(--text-secondary)',
              lineHeight: '1.8'
            }}>
              <li>• 메시지 읽음 처리</li>
              <li>• 읽지 않은 메시지 수 집계</li>
              <li>• 메시지 히스토리 조회</li>
              <li>• 참여 시점 이후 메시지만 조회 (그룹 채팅)</li>
            </ul>
          </div>

          <div style={{
            padding: '1.5rem',
            backgroundColor: 'var(--card-bg)',
            borderRadius: '8px',
            border: '1px solid var(--nav-border)'
          }}>
            <h3 style={{ marginBottom: '0.5rem', color: 'var(--text-color)' }}>참여자 관리</h3>
            <ul style={{ 
              listStyle: 'none', 
              padding: 0,
              color: 'var(--text-secondary)',
              lineHeight: '1.8'
            }}>
              <li>• 채팅방 참여자 목록</li>
              <li>• 참여자 추가/제거</li>
              <li>• 참여 상태 관리 (ACTIVE/LEFT)</li>
              <li>• 그룹 채팅 인원 수 표시</li>
            </ul>
          </div>
        </div>
      </section>

      <section style={{ marginBottom: '3rem' }}>
        <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>채팅 프로세스</h2>
        
        <div style={{
          padding: '1.5rem',
          backgroundColor: 'var(--card-bg)',
          borderRadius: '8px',
          border: '1px solid var(--nav-border)',
          marginBottom: '1rem'
        }}>
          <h3 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>1:1 일반 채팅 (DIRECT)</h3>
          <div style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}>
            <div>• 사용자가 다른 사용자에게 채팅 요청</div>
            <div>• 기존 채팅방이 있으면 재사용, 없으면 새로 생성</div>
            <div>• 양쪽 사용자를 ConversationParticipant에 추가</div>
            <div>• 메시지 주고받기, 메시지 도착 시 알림</div>
          </div>
        </div>

        <div style={{
          padding: '1.5rem',
          backgroundColor: 'var(--card-bg)',
          borderRadius: '8px',
          border: '1px solid var(--nav-border)',
          marginBottom: '1rem'
        }}>
          <h3 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>펫케어 요청 채팅 (CARE_REQUEST)</h3>
          <div style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}>
            <div>• 펫시터가 댓글 작성으로 지원 의사 표현</div>
            <div>• 보호자가 댓글에서 "채팅하기" 버튼 클릭</div>
            <div>• 1:1 일반 채팅(DIRECT) 시작, 기존 채팅방이 있으면 재사용</div>
            <div>• 채팅/협상 후 서비스 완료</div>
          </div>
        </div>

        <div style={{
          padding: '1.5rem',
          backgroundColor: 'var(--card-bg)',
          borderRadius: '8px',
          border: '1px solid var(--nav-border)',
          marginBottom: '1rem'
        }}>
          <h3 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>실종제보 채팅 (MISSING_PET)</h3>
          <div style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}>
            <div>• 사용자가 실종동물 제보 작성</div>
            <div>• 다른 사용자가 "목격했어요" 버튼 클릭</div>
            <div>• 제보자와 목격자 간 1:1 채팅방 생성 또는 기존 채팅방 조회</div>
            <div>• conversation_type = 'MISSING_PET', related_type = 'MISSING_PET_BOARD'</div>
            <div>• 제보자 본인은 자신의 제보에 대해 채팅 시작 불가</div>
          </div>
        </div>

        <div style={{
          padding: '1.5rem',
          backgroundColor: 'var(--card-bg)',
          borderRadius: '8px',
          border: '1px solid var(--nav-border)'
        }}>
          <h3 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>그룹 채팅 - 산책모임 (MEETUP)</h3>
          <div style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}>
            <div>• 모임 생성 시 그룹 채팅방 자동 생성</div>
            <div>• conversation_type = 'MEETUP', related_type = 'MEETUP'</div>
            <div>• 주최자만 초기 참여자로 추가, 주최자는 자동으로 ADMIN 역할</div>
            <div>• 모임 참여 후 "채팅 참여하기" 버튼으로 수동 참여</div>
            <div>• 참여 시점 이후 메시지만 볼 수 있음 (재참여 시 이전 대화 내용 못 봄)</div>
            <div>• 모임 참여 취소 시 채팅방에서도 자동으로 나가기</div>
          </div>
        </div>
      </section>

      <section style={{ marginBottom: '3rem' }}>
        <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>기술 구현</h2>
        
        <div style={{
          padding: '1.5rem',
          backgroundColor: 'var(--card-bg)',
          borderRadius: '8px',
          border: '1px solid var(--nav-border)',
          marginBottom: '1rem'
        }}>
          <h3 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>WebSocket + STOMP</h3>
          <ul style={{ 
            listStyle: 'none', 
            padding: 0,
            color: 'var(--text-secondary)',
            lineHeight: '1.8'
          }}>
            <li>• <strong style={{ color: 'var(--text-color)' }}>Spring WebSocket</strong>: WebSocket 연결 관리</li>
            <li>• <strong style={{ color: 'var(--text-color)' }}>STOMP 프로토콜</strong>: Pub/Sub 메시징</li>
            <li>• <strong style={{ color: 'var(--text-color)' }}>인증</strong>: WebSocket 연결 시 JWT 토큰 검증</li>
            <li>• <strong style={{ color: 'var(--text-color)' }}>실시간성</strong>: STOMP를 통한 실시간 메시지 전송</li>
          </ul>
        </div>

        <div style={{
          padding: '1.5rem',
          backgroundColor: 'var(--card-bg)',
          borderRadius: '8px',
          border: '1px solid var(--nav-border)',
          marginBottom: '1.5rem'
        }}>
          <MermaidDiagram chart={entityDiagram} />
        </div>

        <div style={{
          padding: '1.5rem',
          backgroundColor: 'var(--card-bg)',
          borderRadius: '8px',
          border: '1px solid var(--nav-border)',
          marginBottom: '1rem'
        }}>
          <h3 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>1. Conversation (채팅방)</h3>
          <div style={{ 
            color: 'var(--text-secondary)',
            lineHeight: '1.8',
            fontFamily: 'monospace',
            fontSize: '0.9rem'
          }}>
            <div style={{ marginBottom: '0.5rem' }}><strong style={{ color: 'var(--text-color)' }}>주요 필드:</strong></div>
            <div>• idx (PK), conversationType (DIRECT/CARE_REQUEST/MISSING_PET/MEETUP)</div>
            <div>• relatedType, relatedIdx, title</div>
            <div>• createdAt, updatedAt</div>
            <div style={{ marginTop: '0.5rem' }}><strong style={{ color: 'var(--text-color)' }}>연관관계:</strong></div>
            <div>• OneToMany → ConversationParticipant, Message</div>
          </div>
        </div>

        <div style={{
          padding: '1.5rem',
          backgroundColor: 'var(--card-bg)',
          borderRadius: '8px',
          border: '1px solid var(--nav-border)',
          marginBottom: '1rem'
        }}>
          <h3 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>2. ConversationParticipant (참여자)</h3>
          <div style={{ 
            color: 'var(--text-secondary)',
            lineHeight: '1.8',
            fontFamily: 'monospace',
            fontSize: '0.9rem'
          }}>
            <div style={{ marginBottom: '0.5rem' }}><strong style={{ color: 'var(--text-color)' }}>주요 필드:</strong></div>
            <div>• idx (PK), conversation (채팅방), user (참여자)</div>
            <div>• role (USER/ADMIN), status (ACTIVE/LEFT)</div>
            <div>• lastReadMessageIdx, lastReadAt</div>
            <div>• joinedAt, leftAt</div>
            <div style={{ marginTop: '0.5rem' }}><strong style={{ color: 'var(--text-color)' }}>연관관계:</strong></div>
            <div>• ManyToOne → Conversation, Users</div>
          </div>
        </div>

        <div style={{
          padding: '1.5rem',
          backgroundColor: 'var(--card-bg)',
          borderRadius: '8px',
          border: '1px solid var(--nav-border)'
        }}>
          <h3 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>3. Message (메시지)</h3>
          <div style={{ 
            color: 'var(--text-secondary)',
            lineHeight: '1.8',
            fontFamily: 'monospace',
            fontSize: '0.9rem'
          }}>
            <div style={{ marginBottom: '0.5rem' }}><strong style={{ color: 'var(--text-color)' }}>주요 필드:</strong></div>
            <div>• idx (PK), conversation (채팅방), sender (발신자)</div>
            <div>• content, createdAt</div>
            <div style={{ marginTop: '0.5rem' }}><strong style={{ color: 'var(--text-color)' }}>연관관계:</strong></div>
            <div>• ManyToOne → Conversation, Users</div>
          </div>
        </div>
      </section>

      <section style={{ marginBottom: '3rem' }}>
        <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>다른 도메인과의 연관관계</h2>
        
        <div style={{
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

      <section>
        <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>관련 문서</h2>
        <div style={{
          padding: '1rem',
          backgroundColor: 'var(--card-bg)',
          borderRadius: '8px',
          border: '1px solid var(--nav-border)'
        }}>
          <a 
            href="https://github.com/makkong1/makkong1-github.io/blob/main/docs/architecture/채팅%20시스템%20설계.md" 
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
  );
}

export default ChatDomain;
