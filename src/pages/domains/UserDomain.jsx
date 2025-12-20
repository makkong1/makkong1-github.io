import { Link } from 'react-router-dom';
import MermaidDiagram from '../../components/Common/MermaidDiagram';
import TableOfContents from '../../components/Common/TableOfContents';

function UserDomain() {
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
    Users ||--o{ SocialUser : "has"
    Users ||--o{ UserSanction : "has"
    Users ||--o{ Pet : "owns"
    Pet ||--o{ PetVaccination : "has"
    
    Users {
        Long idx PK
        String id
        String username
        String email
        String phone
        String password
        Role role
        String location
        String petInfo
        String refreshToken
        LocalDateTime lastLoginAt
        UserStatus status
        Integer warningCount
        LocalDateTime suspendedUntil
        Boolean isDeleted
    }
    
    Pet {
        Long idx PK
        Long user_idx FK
        String name
        String species
        String breed
        Integer age
        String gender
        String imageUrl
        String description
    }
    
    SocialUser {
        Long idx PK
        Long user_idx FK
        String provider
        String providerId
    }
    
    UserSanction {
        Long idx PK
        Long user_idx FK
        Long sanctionedBy_idx FK
        SanctionType type
        String reason
        LocalDateTime startedAt
        LocalDateTime endedAt
    }
    
    PetVaccination {
        Long idx PK
        Long pet_idx FK
        String vaccineName
        LocalDate vaccinationDate
        LocalDate nextDueDate
    }`;

  const loginSequenceDiagram = `sequenceDiagram
    participant User as 사용자
    participant Frontend as Frontend
    participant AuthService as AuthService
    participant ConversationService as ConversationService
    participant ParticipantRepo as ParticipantRepository
    participant MessageRepo as MessageRepository
    participant DB as MySQL
    
    User->>Frontend: 로그인 요청
    Frontend->>AuthService: login()
    AuthService->>DB: 사용자 인증 (1)
    AuthService->>DB: 토큰 저장 (2)
    
    Frontend->>ConversationService: getMyConversations()
    ConversationService->>DB: 채팅방 목록 조회 (3)
    
    Note over ConversationService,DB: N+1 문제 발생
    loop 각 채팅방마다
        ConversationService->>ParticipantRepo: findByConversationIdxAndUserIdx() (4, 5, 6...)
        ParticipantRepo->>DB: 개별 쿼리 실행
        ConversationService->>ParticipantRepo: findByConversationIdxAndStatus() (7, 8, 9...)
        ParticipantRepo->>DB: 개별 쿼리 실행
        ConversationService->>MessageRepo: findAllByConversationIdx() (10, 11, 12...)
        MessageRepo->>DB: 모든 메시지 조회
    end
    
    Note over ConversationService,DB: 총 21개 쿼리 발생`;

  const optimizedSequenceDiagram = `sequenceDiagram
    participant User as 사용자
    participant Frontend as Frontend
    participant AuthService as AuthService
    participant ConversationService as ConversationService
    participant ParticipantRepo as ParticipantRepository
    participant MessageRepo as MessageRepository
    participant DB as MySQL
    
    User->>Frontend: 로그인 요청
    Frontend->>AuthService: login()
    AuthService->>DB: 사용자 인증 (1)
    AuthService->>DB: 토큰 저장 (2)
    
    Frontend->>ConversationService: getMyConversations()
    ConversationService->>DB: 채팅방 목록 조회 (3)
    
    Note over ConversationService,DB: 배치 조회로 최적화
    ConversationService->>ParticipantRepo: findParticipantsByConversationIdxsAndUserIdx() (4)
    ParticipantRepo->>DB: IN 절 배치 조회 (한 번에)
    
    ConversationService->>ParticipantRepo: findParticipantsByConversationIdxsAndStatus() (5)
    ParticipantRepo->>DB: IN 절 배치 조회 (한 번에)
    
    ConversationService->>MessageRepo: findLatestMessagesByConversationIdxs() (6)
    MessageRepo->>DB: 최신 메시지만 배치 조회 (한 번에)
    
    Note over ConversationService,DB: 총 4개 쿼리로 감소`;

  return (
    <div style={{ padding: '2rem 0' }}>
      <div style={{ display: 'flex', gap: '2rem', alignItems: 'flex-start' }}>
        <div style={{ flex: 1 }}>
          <h1 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>유저 도메인</h1>
          
          {/* 1. 도메인 소개 */}
          <section id="intro" style={{ marginBottom: '3rem', scrollMarginTop: '2rem' }}>
            <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>도메인 소개</h2>
            <div style={{
              padding: '1.5rem',
              backgroundColor: 'var(--card-bg)',
              borderRadius: '8px',
              border: '1px solid var(--nav-border)'
            }}>
              <p style={{ lineHeight: '1.8', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                User 도메인은 인증·인가 및 사용자 상태 관리를 담당합니다.
              </p>
              <p style={{ lineHeight: '1.8', color: 'var(--text-secondary)' }}>
                <strong style={{ color: 'var(--text-color)' }}>실서비스 환경에서 가장 빈번하게 호출되는 도메인 중 하나</strong>입니다.
              </p>
            </div>
          </section>

          {/* 2. 가정한 문제 상황 */}
          <section id="problem" style={{ marginBottom: '3rem', scrollMarginTop: '2rem' }}>
            <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>가정한 문제 상황</h2>
            <div style={{
              padding: '1.5rem',
              backgroundColor: 'var(--card-bg)',
              borderRadius: '8px',
              border: '1px solid var(--nav-border)'
            }}>
              <p style={{ lineHeight: '1.8', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                다수 사용자가 동시에 접근하는 상황에서, 인증 과정 중 연관 엔티티 조회로 인해 
                <strong style={{ color: 'var(--text-color)' }}> N+1 문제와 불필요한 DB 접근이 발생할 수 있다고 가정</strong>했습니다.
              </p>
              <div style={{
                padding: '1rem',
                backgroundColor: 'var(--bg-color)',
                borderRadius: '6px',
                marginTop: '1rem'
              }}>
                <h3 style={{ marginBottom: '0.75rem', color: 'var(--text-color)', fontSize: '1rem' }}>구체적인 문제 시나리오</h3>
                <ul style={{
                  listStyle: 'none',
                  padding: 0,
                  color: 'var(--text-secondary)',
                  lineHeight: '1.8'
                }}>
                  <li>• 로그인 시 채팅방 목록 조회 과정에서 N+1 문제 발생</li>
                  <li>• 채팅방 N개 기준: 1번(채팅방 목록) + N번(참여자 정보) + N번(메시지) = <strong style={{ color: 'var(--text-color)' }}>2N+1번 쿼리</strong></li>
                  <li>• 채팅방이 많을수록 쿼리 수가 선형적으로 증가</li>
                  <li>• 모든 메시지를 메모리에 로드하여 메모리 부하 발생</li>
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
                  <li>• <strong style={{ color: 'var(--text-color)' }}>배치 조회 패턴</strong>: 채팅방 ID 목록을 IN 절로 한 번에 조회</li>
                  <li>• <strong style={{ color: 'var(--text-color)' }}>Fetch Join 활용</strong>: 참여자 조회 시 Users 엔티티도 함께 조회하여 추가 쿼리 방지</li>
                  <li>• <strong style={{ color: 'var(--text-color)' }}>최신 메시지만 조회</strong>: 모든 메시지 대신 최신 메시지만 조회하여 메모리 사용량 감소</li>
                  <li>• <strong style={{ color: 'var(--text-color)' }}>메모리에서 매핑</strong>: 조회한 데이터를 Map으로 변환하여 빠르게 매핑</li>
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
                  <li>• <strong style={{ color: 'var(--text-color)' }}>쿼리 수</strong>: 21개 → 4개 (80.95% 감소)</li>
                  <li>• <strong style={{ color: 'var(--text-color)' }}>실행 시간</strong>: 305ms → 55ms (81.97% 단축)</li>
                  <li>• <strong style={{ color: 'var(--text-color)' }}>메모리 사용량</strong>: 0.58MB → 0.13MB (77.24% 감소)</li>
                </ul>
              </div>
            </div>
          </section>

          {/* 3. 문제 재현 방식 (테스트 설계) */}
          <section id="test-design" style={{ marginBottom: '3rem', scrollMarginTop: '2rem' }}>
            <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>문제 재현 방식 (테스트 설계)</h2>
            <div style={{
              padding: '1.5rem',
              backgroundColor: 'var(--card-bg)',
              borderRadius: '8px',
              border: '1px solid var(--nav-border)',
              marginBottom: '1rem'
            }}>
              <p style={{ lineHeight: '1.8', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                위 상황을 재현하기 위해 다음과 같은 테스트를 구성했습니다.
              </p>
              <ul style={{
                listStyle: 'none',
                padding: 0,
                color: 'var(--text-secondary)',
                lineHeight: '1.8'
              }}>
                <li>• <strong style={{ color: 'var(--text-color)' }}>동시 로그인 요청 시나리오</strong>: 다수 사용자 동시 접근 상황 시뮬레이션</li>
                <li>• <strong style={{ color: 'var(--text-color)' }}>운영 환경과 유사한 더미 데이터</strong>: 채팅방 10개, 참여자 3명, 메시지 20개</li>
                <li>• <strong style={{ color: 'var(--text-color)' }}>반복 호출 기반 부하 테스트</strong>: 실제 사용 패턴 반영</li>
              </ul>
            </div>
            <div style={{
              padding: '1.5rem',
              backgroundColor: 'var(--card-bg)',
              borderRadius: '8px',
              border: '1px solid var(--nav-border)',
              marginBottom: '1rem'
            }}>
              <h3 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>시퀀스 다이어그램 (최적화 전)</h3>
              <MermaidDiagram chart={loginSequenceDiagram} />
            </div>
            <div style={{
              padding: '1.5rem',
              backgroundColor: 'var(--card-bg)',
              borderRadius: '8px',
              border: '1px solid var(--nav-border)'
            }}>
              <h3 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>테스트 코드 예시</h3>
              <pre style={{
                padding: '1rem',
                backgroundColor: 'var(--bg-color)',
                borderRadius: '6px',
                overflow: 'auto',
                fontSize: '0.85rem',
                color: 'var(--text-secondary)',
                fontFamily: 'monospace',
                lineHeight: '1.6'
              }}>
{`// 테스트 시나리오: 채팅방 10개, 참여자 3명, 메시지 20개
@Test
void testLoginPerformance() {
    // 1. 더미 데이터 생성
    User user = createUser();
    List<Conversation> conversations = createConversations(10);
    createParticipants(conversations, 3);
    createMessages(conversations, 20);
    
    // 2. 로그인 실행 및 쿼리 수 측정
    long startTime = System.currentTimeMillis();
    loginResponse = authService.login(user.getId(), password);
    long endTime = System.currentTimeMillis();
    
    // 3. 성능 지표 확인
    assertThat(queryCount).isEqualTo(21); // N+1 문제 확인
    assertThat(endTime - startTime).isGreaterThan(300); // 응답 시간 확인
}`}
              </pre>
            </div>
          </section>

          {/* 4. 성능 측정 결과 (개선 전) */}
          <section id="before" style={{ marginBottom: '3rem', scrollMarginTop: '2rem' }}>
            <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>성능 측정 결과 (개선 전)</h2>
            <div style={{
              padding: '1.5rem',
              backgroundColor: 'var(--card-bg)',
              borderRadius: '8px',
              border: '1px solid var(--nav-border)'
            }}>
              <div style={{
                overflowX: 'auto'
              }}>
                <table style={{
                  width: '100%',
                  borderCollapse: 'collapse',
                  color: 'var(--text-secondary)'
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
                    </tr>
                  </thead>
                  <tbody>
                    <tr style={{
                      borderBottom: '1px solid var(--nav-border)'
                    }}>
                      <td style={{ padding: '0.75rem' }}>쿼리 수</td>
                      <td style={{ padding: '0.75rem', fontWeight: 'bold', color: 'var(--text-color)' }}>21개</td>
                    </tr>
                    <tr style={{
                      borderBottom: '1px solid var(--nav-border)'
                    }}>
                      <td style={{ padding: '0.75rem' }}>평균 응답 시간</td>
                      <td style={{ padding: '0.75rem', fontWeight: 'bold', color: 'var(--text-color)' }}>305ms</td>
                    </tr>
                    <tr>
                      <td style={{ padding: '0.75rem' }}>메모리 사용량</td>
                      <td style={{ padding: '0.75rem', fontWeight: 'bold', color: 'var(--text-color)' }}>0.58MB</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div style={{
                marginTop: '1rem',
                padding: '1rem',
                backgroundColor: 'var(--bg-color)',
                borderRadius: '6px'
              }}>
                <p style={{
                  fontSize: '0.9rem',
                  color: 'var(--text-secondary)',
                  lineHeight: '1.6',
                  margin: 0
                }}>
                  <strong style={{ color: 'var(--text-color)' }}>테스트 환경:</strong> 채팅방 10개, 참여자 3명, 메시지 20개
                </p>
              </div>
            </div>
          </section>

          {/* 5. 성능 최적화 및 동시성 제어 */}
          <section id="optimization" style={{ marginBottom: '3rem', scrollMarginTop: '2rem' }}>
            <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>성능 최적화 및 동시성 제어</h2>
            
            <div style={{
              padding: '1.5rem',
              backgroundColor: 'var(--card-bg)',
              borderRadius: '8px',
              border: '1px solid var(--nav-border)',
              marginBottom: '1rem'
            }}>
              <h3 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>1. 배치 조회 패턴 적용</h3>
              <p style={{ lineHeight: '1.8', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                채팅방 ID 목록을 추출하여 <strong style={{ color: 'var(--text-color)' }}>IN 절로 한 번에 조회</strong>하도록 변경했습니다.
              </p>
              <pre style={{
                padding: '1rem',
                backgroundColor: 'var(--bg-color)',
                borderRadius: '6px',
                overflow: 'auto',
                fontSize: '0.85rem',
                color: 'var(--text-secondary)',
                fontFamily: 'monospace',
                lineHeight: '1.6'
              }}>
{`// Repository에 배치 조회 메서드 추가
@Query("SELECT p FROM ConversationParticipant p " +
       "JOIN FETCH p.user u " +
       "WHERE p.conversation.idx IN :conversationIdxs " +
       "  AND p.user.idx = :userId")
List<ConversationParticipant> findParticipantsByConversationIdxsAndUserIdx(
    @Param("conversationIdxs") List<Long> conversationIdxs,
    @Param("userId") Long userId);`}
              </pre>
            </div>

            <div style={{
              padding: '1.5rem',
              backgroundColor: 'var(--card-bg)',
              borderRadius: '8px',
              border: '1px solid var(--nav-border)',
              marginBottom: '1rem'
            }}>
              <h3 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>2. Fetch Join 활용</h3>
              <p style={{ lineHeight: '1.8', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                참여자 조회 시 Users 엔티티도 함께 조회하여 <strong style={{ color: 'var(--text-color)' }}>추가 쿼리 방지</strong>했습니다.
              </p>
              <p style={{ lineHeight: '1.8', color: 'var(--text-secondary)' }}>
                <strong style={{ color: 'var(--text-color)' }}>왜 이렇게 선택했는가:</strong> 연관 엔티티를 별도로 조회하면 또 다른 N+1 문제가 발생하므로, 
                Fetch Join으로 한 번에 조회하는 것이 효율적입니다.
              </p>
            </div>

            <div style={{
              padding: '1.5rem',
              backgroundColor: 'var(--card-bg)',
              borderRadius: '8px',
              border: '1px solid var(--nav-border)',
              marginBottom: '1rem'
            }}>
              <h3 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>3. 최신 메시지만 조회</h3>
              <p style={{ lineHeight: '1.8', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                모든 메시지를 로드하지 않고 <strong style={{ color: 'var(--text-color)' }}>최신 메시지만 조회</strong>하도록 변경했습니다.
              </p>
              <p style={{ lineHeight: '1.8', color: 'var(--text-secondary)' }}>
                <strong style={{ color: 'var(--text-color)' }}>왜 이렇게 선택했는가:</strong> 채팅방 목록에서는 마지막 메시지만 필요하므로, 
                서브쿼리로 최신 메시지만 조회하여 메모리 사용량을 대폭 감소시켰습니다.
              </p>
            </div>

            <div style={{
              padding: '1.5rem',
              backgroundColor: 'var(--card-bg)',
              borderRadius: '8px',
              border: '1px solid var(--nav-border)'
            }}>
              <h3 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>4. 메모리에서 매핑</h3>
              <p style={{ lineHeight: '1.8', color: 'var(--text-secondary)' }}>
                조회한 데이터를 <strong style={{ color: 'var(--text-color)' }}>Map으로 변환하여 메모리에서 빠르게 매핑</strong>하도록 구현했습니다.
              </p>
            </div>
          </section>

          {/* 6. 성능 개선 결과 (개선 후) */}
          <section id="after" style={{ marginBottom: '3rem', scrollMarginTop: '2rem' }}>
            <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>성능 개선 결과 (개선 후)</h2>
            <div style={{
              padding: '1.5rem',
              backgroundColor: 'var(--card-bg)',
              borderRadius: '8px',
              border: '1px solid var(--nav-border)',
              marginBottom: '1rem'
            }}>
              <div style={{
                padding: '1rem',
                backgroundColor: 'var(--bg-color)',
                borderRadius: '6px',
                marginBottom: '1rem',
                border: '2px solid var(--link-color)'
              }}>
                <p style={{
                  fontSize: '0.9rem',
                  color: 'var(--text-muted)',
                  margin: 0,
                  fontStyle: 'italic'
                }}>
                  📌 <strong style={{ color: 'var(--text-color)' }}>홈페이지 숫자 카드의 근거는 여기</strong>
                </p>
              </div>
              <div style={{
                overflowX: 'auto'
              }}>
                <table style={{
                  width: '100%',
                  borderCollapse: 'collapse',
                  color: 'var(--text-secondary)'
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
                      <th style={{
                        padding: '0.75rem',
                        textAlign: 'left',
                        color: 'var(--text-color)',
                        fontWeight: 'bold'
                      }}>개선율</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr style={{
                      borderBottom: '1px solid var(--nav-border)'
                    }}>
                      <td style={{ padding: '0.75rem' }}>쿼리 수</td>
                      <td style={{ padding: '0.75rem' }}>21개</td>
                      <td style={{ padding: '0.75rem', fontWeight: 'bold', color: 'var(--link-color)' }}>4개</td>
                      <td style={{ padding: '0.75rem', fontWeight: 'bold', color: 'var(--link-color)' }}>80.95% ↓</td>
                    </tr>
                    <tr style={{
                      borderBottom: '1px solid var(--nav-border)'
                    }}>
                      <td style={{ padding: '0.75rem' }}>평균 응답 시간</td>
                      <td style={{ padding: '0.75rem' }}>305ms</td>
                      <td style={{ padding: '0.75rem', fontWeight: 'bold', color: 'var(--link-color)' }}>55ms</td>
                      <td style={{ padding: '0.75rem', fontWeight: 'bold', color: 'var(--link-color)' }}>81.97% ↓</td>
                    </tr>
                    <tr>
                      <td style={{ padding: '0.75rem' }}>메모리 사용량</td>
                      <td style={{ padding: '0.75rem' }}>0.58MB</td>
                      <td style={{ padding: '0.75rem', fontWeight: 'bold', color: 'var(--link-color)' }}>0.13MB</td>
                      <td style={{ padding: '0.75rem', fontWeight: 'bold', color: 'var(--link-color)' }}>77.24% ↓</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div style={{
              padding: '1.5rem',
              backgroundColor: 'var(--card-bg)',
              borderRadius: '8px',
              border: '1px solid var(--nav-border)'
            }}>
              <h3 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>시퀀스 다이어그램 (최적화 후)</h3>
              <MermaidDiagram chart={optimizedSequenceDiagram} />
            </div>
          </section>

        
          {/* 7. Entity 구조 */}
          <section id="entities" style={{ marginBottom: '3rem', scrollMarginTop: '2rem' }}>
            <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>Entity 구조</h2>
            <div style={{
              padding: '1.5rem',
              backgroundColor: 'var(--card-bg)',
              borderRadius: '8px',
              border: '1px solid var(--nav-border)'
            }}>
              <MermaidDiagram chart={entityDiagram} />
            </div>
          </section>

          {/* 8. Service 주요 기능 */}
          <section id="services" style={{ marginBottom: '3rem', scrollMarginTop: '2rem' }}>
            <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>Service 주요 기능</h2>
            <div style={{
              padding: '1.5rem',
              backgroundColor: 'var(--card-bg)',
              borderRadius: '8px',
              border: '1px solid var(--nav-border)',
              marginBottom: '1rem'
            }}>
              <h3 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>UsersService</h3>
              <div style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}>
                <div style={{ marginBottom: '0.5rem' }}><strong style={{ color: 'var(--text-color)' }}>사용자 관리:</strong></div>
                <div>• registerUser() - 회원가입</div>
                <div>• login() - 로그인 (JWT 발급)</div>
                <div>• refreshToken() - 리프레시 토큰 갱신</div>
                <div>• getUserProfile() - 프로필 조회</div>
                <div>• updateUserProfile() - 프로필 수정</div>
                <div>• deleteUser() - 회원 탈퇴 (소프트 삭제)</div>
                <div style={{ marginTop: '1rem', marginBottom: '0.5rem' }}><strong style={{ color: 'var(--text-color)' }}>제재 관리:</strong></div>
                <div>• issueWarning() - 경고 부여</div>
                <div>• suspendUser() - 계정 정지</div>
                <div>• banUser() - 영구 차단</div>
                <div>• getSanctionHistory() - 제재 이력 조회</div>
                <div>• unsanctionUser() - 제재 해제</div>
              </div>
            </div>
            <div style={{
              padding: '1.5rem',
              backgroundColor: 'var(--card-bg)',
              borderRadius: '8px',
              border: '1px solid var(--nav-border)'
            }}>
              <h3 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>PetService</h3>
              <div style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}>
                <div style={{ marginBottom: '0.5rem' }}><strong style={{ color: 'var(--text-color)' }}>반려동물 관리:</strong></div>
                <div>• registerPet() - 반려동물 등록</div>
                <div>• getUserPets() - 반려동물 조회 (사용자별)</div>
                <div>• updatePet() - 반려동물 정보 수정</div>
                <div>• deletePet() - 반려동물 삭제</div>
              </div>
            </div>
          </section>

          {/* 9. 보안 및 권한 체계 */}
          <section id="security" style={{ marginBottom: '3rem', scrollMarginTop: '2rem' }}>
            <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>보안 및 권한 체계</h2>
            <div style={{
              padding: '1.5rem',
              backgroundColor: 'var(--card-bg)',
              borderRadius: '8px',
              border: '1px solid var(--nav-border)',
              marginBottom: '1rem'
            }}>
              <h3 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>권한 체계 (Role)</h3>
              <div style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}>
                <div>• <strong style={{ color: 'var(--text-color)' }}>USER</strong> - 일반 사용자</div>
                <div>• <strong style={{ color: 'var(--text-color)' }}>ADMIN</strong> - 관리자</div>
              </div>
            </div>
            <div style={{
              padding: '1.5rem',
              backgroundColor: 'var(--card-bg)',
              borderRadius: '8px',
              border: '1px solid var(--nav-border)'
            }}>
              <h3 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>보안 처리</h3>
              <ul style={{
                listStyle: 'none',
                padding: 0,
                color: 'var(--text-secondary)',
                lineHeight: '1.8'
              }}>
                <li>• <strong style={{ color: 'var(--text-color)' }}>비밀번호 암호화</strong>: BCryptPasswordEncoder 사용</li>
                <li>• <strong style={{ color: 'var(--text-color)' }}>JWT 토큰</strong>: Access Token (15분), Refresh Token (1일)</li>
                <li>• <strong style={{ color: 'var(--text-color)' }}>소프트 삭제</strong>: isDeleted 플래그로 논리 삭제</li>
              </ul>
            </div>
          </section>

          {/* 10. 다른 도메인과의 연관관계 */}
          <section id="relationships" style={{ marginBottom: '3rem', scrollMarginTop: '2rem' }}>
            <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>다른 도메인과의 연관관계</h2>
            <div style={{
              padding: '1.5rem',
              backgroundColor: 'var(--card-bg)',
              borderRadius: '8px',
              border: '1px solid var(--nav-border)'
            }}>
              <div style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}>
                <div style={{ marginBottom: '0.5rem' }}><strong style={{ color: 'var(--text-color)' }}>Board 도메인:</strong></div>
                <div>• Users가 게시글/댓글 작성, 좋아요/싫어요 반응</div>
                <div style={{ marginTop: '1rem', marginBottom: '0.5rem' }}><strong style={{ color: 'var(--text-color)' }}>Care 도메인:</strong></div>
                <div>• Users가 펫케어 요청 생성, 펫케어에 지원, 펫케어 리뷰 작성</div>
                <div style={{ marginTop: '1rem', marginBottom: '0.5rem' }}><strong style={{ color: 'var(--text-color)' }}>Chat 도메인:</strong></div>
                <div>• Users가 채팅방 참여, 메시지 전송</div>
                <div style={{ marginTop: '1rem', marginBottom: '0.5rem' }}><strong style={{ color: 'var(--text-color)' }}>기타:</strong></div>
                <div>• Users가 실종 신고 작성, 모임 주최/참여, 위치 서비스 리뷰 작성</div>
              </div>
            </div>
          </section>

          {/* 11. API 엔드포인트 */}
          <section id="api" style={{ marginBottom: '3rem', scrollMarginTop: '2rem' }}>
            <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>API 엔드포인트</h2>
            <div style={{
              padding: '1.5rem',
              backgroundColor: 'var(--card-bg)',
              borderRadius: '8px',
              border: '1px solid var(--nav-border)',
              marginBottom: '1rem'
            }}>
              <h3 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>인증 (/api/auth)</h3>
              <div style={{
                color: 'var(--text-secondary)',
                lineHeight: '1.8',
                fontFamily: 'monospace',
                fontSize: '0.9rem'
              }}>
                <div>• POST /register - 회원가입</div>
                <div>• POST /login - 로그인</div>
                <div>• POST /refresh - 토큰 갱신</div>
                <div>• POST /logout - 로그아웃</div>
              </div>
            </div>
            <div style={{
              padding: '1.5rem',
              backgroundColor: 'var(--card-bg)',
              borderRadius: '8px',
              border: '1px solid var(--nav-border)'
            }}>
              <h3 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>사용자 (/api/users)</h3>
              <div style={{
                color: 'var(--text-secondary)',
                lineHeight: '1.8',
                fontFamily: 'monospace',
                fontSize: '0.9rem'
              }}>
                <div>• GET /profile - 내 프로필 조회</div>
                <div>• PUT /profile - 프로필 수정</div>
                <div>• DELETE /account - 회원 탈퇴</div>
              </div>
            </div>
          </section>

          {/* 12. 관련 문서 */}
          <section id="docs" style={{ marginBottom: '3rem', scrollMarginTop: '2rem' }}>
            <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>관련 문서</h2>
            <div style={{
              padding: '1rem',
              backgroundColor: 'var(--card-bg)',
              borderRadius: '8px',
              border: '1px solid var(--nav-border)'
            }}>
              <a
                href="https://github.com/makkong1/makkong1-github.io/blob/main/docs/troubleshooting/users/login-n-plus-one-issue.md"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: 'var(--link-color)',
                  textDecoration: 'none',
                  display: 'block',
                  marginBottom: '0.5rem'
                }}
              >
                → 로그인 N+1 문제 해결 상세 문서
              </a>
              <a
                href="https://github.com/makkong1/makkong1-github.io/blob/main/docs/domains/user.md"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: 'var(--link-color)',
                  textDecoration: 'none',
                  display: 'block'
                }}
              >
                → User 도메인 상세 문서
              </a>
            </div>
          </section>
        </div>
        <TableOfContents sections={sections} />
      </div>
    </div>
  );
}

export default UserDomain;
