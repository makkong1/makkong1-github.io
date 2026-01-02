import { Link } from 'react-router-dom';
import MermaidDiagram from '../../../../components/Common/MermaidDiagram';
import TableOfContents from '../../../../components/Common/TableOfContents';

function UserDomainOptimization() {
  const sections = [
    { id: 'intro', title: '개요' },
    { id: 'test-design', title: '문제 재현 방식 (테스트 설계)' },
    { id: 'before', title: '성능 측정 결과 (개선 전)' },
    { id: 'optimization', title: '성능 최적화 및 동시성 제어' },
    { id: 'after', title: '성능 개선 결과 (개선 후)' }
  ];

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
    <div className="domain-page-wrapper" style={{ padding: '2rem 0' }}>
      <div className="domain-page-container" style={{ display: 'flex', gap: '2rem', alignItems: 'flex-start' }}>
        <div className="domain-page-content" style={{ flex: 1 }}>
          <div style={{ marginBottom: '1rem' }}>
            <Link 
              to="/domains/user" 
              style={{ 
                color: 'var(--link-color)', 
                textDecoration: 'none',
                fontSize: '0.9rem'
              }}
            >
              ← User 도메인으로 돌아가기
            </Link>
          </div>
          <h1 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>User 도메인 - 성능 최적화 상세</h1>
          
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
                다수 사용자가 동시에 접근하는 상황에서, 인증 과정 중 연관 엔티티 조회로 인해 
                <strong style={{ color: 'var(--text-color)' }}> N+1 문제와 불필요한 DB 접근이 발생</strong>했습니다.
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
                  <li>• 로그인 쿼리: <strong style={{ color: 'var(--text-color)' }}>21개 → 4개</strong> (80.95% 감소)</li>
                  <li>• 실행 시간: <strong style={{ color: 'var(--text-color)' }}>305ms → 55ms</strong> (81.97% 감소)</li>
                  <li>• 메모리 사용량: <strong style={{ color: 'var(--text-color)' }}>0.58MB → 0.13MB</strong> (77.24% 감소)</li>
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
            <div className="section-card" style={{
              padding: '1.5rem',
              backgroundColor: 'var(--card-bg)',
              borderRadius: '8px',
              border: '1px solid var(--nav-border)',
              marginBottom: '1rem'
            }}>
              <h3 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>시퀀스 다이어그램 (최적화 전)</h3>
              <MermaidDiagram chart={loginSequenceDiagram} />
            </div>
            <div className="section-card" style={{
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

          {/* 3. 성능 측정 결과 (개선 전) */}
          <section id="before" style={{ marginBottom: '3rem', scrollMarginTop: '2rem' }}>
            <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>성능 측정 결과 (개선 전)</h2>
            <div className="section-card" style={{
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

            <div className="section-card" style={{
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

            <div className="section-card" style={{
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

            <div className="section-card" style={{
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

          {/* 5. 성능 개선 결과 (개선 후) */}
          <section id="after" style={{ marginBottom: '3rem', scrollMarginTop: '2rem' }}>
            <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>성능 개선 결과 (개선 후)</h2>
            <div className="section-card" style={{
              padding: '1.5rem',
              backgroundColor: 'var(--card-bg)',
              borderRadius: '8px',
              border: '1px solid var(--nav-border)',
              marginBottom: '1rem'
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
            <div className="section-card" style={{
              padding: '1.5rem',
              backgroundColor: 'var(--card-bg)',
              borderRadius: '8px',
              border: '1px solid var(--nav-border)'
            }}>
              <h3 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>시퀀스 다이어그램 (최적화 후)</h3>
              <MermaidDiagram chart={optimizedSequenceDiagram} />
            </div>
          </section>
        </div>
        <TableOfContents sections={sections} />
      </div>
    </div>
  );
}

export default UserDomainOptimization;

