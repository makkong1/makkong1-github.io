import { Link } from 'react-router-dom';
import MermaidDiagram from '../../../../components/Common/MermaidDiagram';
import TableOfContents from '../../../../components/Common/TableOfContents';

function MeetupDomainOptimization() {
  const sections = [
    { id: 'intro', title: '개요' },
    { id: 'test-design', title: '문제 재현 방식 (테스트 설계)' },
    { id: 'before', title: '성능 측정 결과 (개선 전)' },
    { id: 'optimization', title: '성능 최적화 및 동시성 제어' },
    { id: 'after', title: '성능 개선 결과 (개선 후)' }
  ];

  const meetupJoinSequenceDiagram = `sequenceDiagram
    participant User1 as 사용자1
    participant User2 as 사용자2
    participant User3 as 사용자3
    participant Frontend as Frontend
    participant MeetupService as MeetupService
    participant MeetupRepo as MeetupRepository
    participant DB as MySQL
    
    Note over User1,User3: 동시에 3명이 참가 요청
    User1->>Frontend: 참가 요청
    User2->>Frontend: 참가 요청
    User3->>Frontend: 참가 요청
    
    Frontend->>MeetupService: joinMeetup() (동시 3개 요청)
    
    Note over MeetupService,DB: Race Condition 발생
    par 사용자1
        MeetupService->>MeetupRepo: findById() (1)
        MeetupRepo->>DB: 모임 조회 (currentParticipants=1)
        Note over MeetupService: 체크: 1 < 3 (통과)
    and 사용자2
        MeetupService->>MeetupRepo: findById() (2)
        MeetupRepo->>DB: 모임 조회 (currentParticipants=1)
        Note over MeetupService: 체크: 1 < 3 (통과)
    and 사용자3
        MeetupService->>MeetupRepo: findById() (3)
        MeetupRepo->>DB: 모임 조회 (currentParticipants=1)
        Note over MeetupService: 체크: 1 < 3 (통과)
    end
    
    par 사용자1
        MeetupService->>MeetupRepo: save() (currentParticipants=2)
    and 사용자2
        MeetupService->>MeetupRepo: save() (currentParticipants=2)
    and 사용자3
        MeetupService->>MeetupRepo: save() (currentParticipants=2)
    end
    
    Note over DB: 최종 결과: currentParticipants=4 (최대 3명 초과!)`;

  const optimizedMeetupJoinSequenceDiagram = `sequenceDiagram
    participant User1 as 사용자1
    participant User2 as 사용자2
    participant User3 as 사용자3
    participant Frontend as Frontend
    participant MeetupService as MeetupService
    participant MeetupRepo as MeetupRepository
    participant DB as MySQL
    
    Note over User1,User3: 동시에 3명이 참가 요청
    User1->>Frontend: 참가 요청
    User2->>Frontend: 참가 요청
    User3->>Frontend: 참가 요청
    
    Frontend->>MeetupService: joinMeetup() (동시 3개 요청)
    
    Note over MeetupService,DB: 원자적 UPDATE 쿼리
    par 사용자1
        MeetupService->>MeetupRepo: incrementParticipantsIfAvailable()
        MeetupRepo->>DB: UPDATE ... WHERE currentParticipants < maxParticipants (1)
        DB-->>MeetupRepo: updated=1 (성공)
    and 사용자2
        MeetupService->>MeetupRepo: incrementParticipantsIfAvailable()
        MeetupRepo->>DB: UPDATE ... WHERE currentParticipants < maxParticipants (2)
        DB-->>MeetupRepo: updated=1 (성공)
    and 사용자3
        MeetupService->>MeetupRepo: incrementParticipantsIfAvailable()
        MeetupRepo->>DB: UPDATE ... WHERE currentParticipants < maxParticipants (3)
        DB-->>MeetupRepo: updated=0 (실패 - 이미 3명 도달)
    end
    
    Note over DB: 최종 결과: currentParticipants=3 (정상)`;

  return (
    <div className="domain-page-wrapper" style={{ padding: '2rem 0' }}>
      <div className="domain-page-container" style={{ display: 'flex', gap: '2rem', alignItems: 'flex-start' }}>
        <div className="domain-page-content" style={{ flex: 1 }}>
          <div style={{ marginBottom: '1rem' }}>
            <Link 
              to="/domains/meetup" 
              style={{ 
                color: 'var(--link-color)', 
                textDecoration: 'none',
                fontSize: '0.9rem'
              }}
            >
              ← Meetup 도메인으로 돌아가기
            </Link>
          </div>
          <h1 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>Meetup 도메인 - 성능 최적화 상세</h1>
          
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
                동시 참가 시 <strong style={{ color: 'var(--text-color)' }}>최대 인원 초과</strong> 문제가 발생했습니다. (예: 3명 제한인데 4명 참가)
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
                  <li>• 동시성 제어: <strong style={{ color: 'var(--text-color)' }}>Lost Update 해결</strong> (원자적 UPDATE 쿼리)</li>
                  <li>• 최대 인원 초과 방지: <strong style={{ color: 'var(--text-color)' }}>Race Condition 완전 해결</strong></li>
                  <li>• 데이터 일치성: <strong style={{ color: 'var(--text-color)' }}>불일치 → 일치</strong> (DB 제약조건 추가)</li>
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
                Race Condition 문제를 재현하기 위해 동시성 테스트를 설계했습니다.
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
                  <li>• 모임 생성 (최대 인원: 3명, 모임장 1명 이미 참가)</li>
                  <li>• 동시에 3명의 사용자가 참가 요청</li>
                  <li>• 각 요청의 성공/실패 여부와 최종 참가자 수 확인</li>
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
              <MermaidDiagram chart={meetupJoinSequenceDiagram} />
            </div>
            <div className="section-card" style={{
              padding: '1.5rem',
              backgroundColor: 'var(--card-bg)',
              borderRadius: '8px',
              border: '1px solid var(--nav-border)',
              marginTop: '1rem'
            }}>
              <h3 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>Before (문제 코드)</h3>
              <pre style={{
                padding: '0.75rem',
                backgroundColor: 'var(--bg-color)',
                borderRadius: '4px',
                overflow: 'auto',
                fontSize: '0.85rem',
                color: 'var(--text-secondary)',
                fontFamily: 'monospace',
                lineHeight: '1.6',
                margin: 0
              }}>
{`// ⚠️ Race Condition 발생 지점
if (meetup.getCurrentParticipants() >= 
    meetup.getMaxParticipants()) {
    throw new RuntimeException("모임 인원이 가득 찼습니다.");
}
// 여기서 다른 트랜잭션이 끼어들 수 있음!
meetup.setCurrentParticipants(
    meetup.getCurrentParticipants() + 1);
meetupRepository.save(meetup);`}
              </pre>
              <p style={{ lineHeight: '1.8', color: 'var(--text-secondary)', marginTop: '0.5rem', fontSize: '0.9rem' }}>
                <strong style={{ color: 'var(--text-color)' }}>결과:</strong> 3명이 동시 참가 시도 → 모두 체크 통과 → 4명 참가 (최대 3명 초과)
              </p>
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
                동시 참가 테스트 결과, Race Condition으로 인해 최대 인원을 초과하여 참가가 허용되었습니다.
              </p>
              <div style={{
                padding: '1rem',
                backgroundColor: 'var(--bg-color)',
                borderRadius: '6px',
                marginTop: '1rem'
              }}>
                <h3 style={{ marginBottom: '0.75rem', color: 'var(--text-color)', fontSize: '1rem' }}>테스트 결과</h3>
                <ul style={{
                  listStyle: 'none',
                  padding: 0,
                  color: 'var(--text-secondary)',
                  lineHeight: '1.8'
                }}>
                  <li>• <strong style={{ color: 'var(--text-color)' }}>요청 결과:</strong> 3명 성공, 0명 실패</li>
                  <li>• <strong style={{ color: 'var(--text-color)' }}>실제 참가자 수:</strong> 4명 (최대 3명 초과)</li>
                  <li>• <strong style={{ color: 'var(--text-color)' }}>문제:</strong> Lost Update 발생, 데이터 불일치</li>
                </ul>
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
              <h3 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>동시성 제어</h3>
              <div style={{ marginBottom: '1.5rem' }}>
                <h4 style={{ marginBottom: '0.75rem', color: 'var(--text-color)', fontSize: '0.95rem' }}>1. 원자적 UPDATE 쿼리</h4>
                <p style={{ lineHeight: '1.8', color: 'var(--text-secondary)', marginBottom: '0.75rem' }}>
                  DB 레벨에서 조건 체크와 증가를 원자적으로 처리하여 Race Condition 완전 방지
                </p>
                <pre style={{
                  padding: '0.75rem',
                  backgroundColor: 'var(--bg-color)',
                  borderRadius: '4px',
                  overflow: 'auto',
                  fontSize: '0.85rem',
                  color: 'var(--text-secondary)',
                  fontFamily: 'monospace',
                  lineHeight: '1.6',
                  margin: '0.5rem 0'
                }}>
{`@Modifying
@Query("UPDATE Meetup m SET " +
       "m.currentParticipants = m.currentParticipants + 1 " +
       "WHERE m.idx = :meetupIdx " +
       "  AND m.currentParticipants < m.maxParticipants")
int incrementParticipantsIfAvailable(
    @Param("meetupIdx") Long meetupIdx);

// Service 로직
int updated = meetupRepository
    .incrementParticipantsIfAvailable(meetupIdx);
if (updated == 0) {
    throw new RuntimeException("모임 인원이 가득 찼습니다.");
}`}
                </pre>
                <p style={{ lineHeight: '1.8', color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '0.5rem' }}>
                  <strong style={{ color: 'var(--text-color)' }}>선택 이유:</strong> 프로젝트 일관성 (Chat, User 도메인과 동일한 패턴), 확장성 (병렬 처리 가능), DB 레벨 보장
                </p>
              </div>
              <div style={{ marginBottom: '1.5rem' }}>
                <h4 style={{ marginBottom: '0.75rem', color: 'var(--text-color)', fontSize: '0.95rem' }}>2. DB 제약조건 추가 (이중 안전장치)</h4>
                <p style={{ lineHeight: '1.8', color: 'var(--text-secondary)', marginBottom: '0.75rem' }}>
                  애플리케이션 로직을 우회하는 직접 SQL 실행 시에도 데이터 무결성 보장
                </p>
                <pre style={{
                  padding: '0.75rem',
                  backgroundColor: 'var(--bg-color)',
                  borderRadius: '4px',
                  overflow: 'auto',
                  fontSize: '0.85rem',
                  color: 'var(--text-secondary)',
                  fontFamily: 'monospace',
                  lineHeight: '1.6',
                  margin: '0.5rem 0'
                }}>
{`ALTER TABLE meetup 
ADD CONSTRAINT chk_participants 
CHECK (current_participants <= max_participants);`}
                </pre>
                <p style={{ lineHeight: '1.8', color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '0.5rem' }}>
                  <strong style={{ color: 'var(--text-color)' }}>주의:</strong> MySQL 8.0.16 이상에서만 적용됨
                </p>
              </div>
              <div>
                <h4 style={{ marginBottom: '0.75rem', color: 'var(--text-color)', fontSize: '0.95rem' }}>3. 이벤트 기반 아키텍처 (핵심 도메인과 파생 도메인 분리)</h4>
                <p style={{ lineHeight: '1.8', color: 'var(--text-secondary)', marginBottom: '0.75rem' }}>
                  모임 생성 후 채팅방 생성 시도 시, 채팅방 생성 실패가 모임 생성까지 롤백하는 문제를 해결하기 위해 이벤트 기반 아키텍처를 적용했습니다.
                </p>
                <p style={{ lineHeight: '1.8', color: 'var(--text-secondary)', marginBottom: '0.75rem', fontSize: '0.9rem' }}>
                  <strong style={{ color: 'var(--text-color)' }}>설계 원칙:</strong> 파생 도메인은 실패해도 핵심 도메인을 롤백하면 안 된다.
                </p>
                <pre style={{
                  padding: '0.75rem',
                  backgroundColor: 'var(--bg-color)',
                  borderRadius: '4px',
                  overflow: 'auto',
                  fontSize: '0.85rem',
                  color: 'var(--text-secondary)',
                  fontFamily: 'monospace',
                  lineHeight: '1.6',
                  margin: '0.5rem 0'
                }}>
{`// 모임 생성 (핵심 도메인)
@Transactional
public MeetupDTO createMeetup(...) {
    Meetup savedMeetup = meetupRepository.save(meetup);
    // 이벤트 발행 (트랜잭션 커밋 후 비동기 처리)
    eventPublisher.publishEvent(
        new MeetupCreatedEvent(...));
    return converter.toDTO(savedMeetup);
}

// 채팅방 생성 (파생 도메인)
@EventListener
@Async
@Transactional(propagation = Propagation.REQUIRES_NEW)
public void handleMeetupCreated(MeetupCreatedEvent event) {
    try {
        conversationService.createConversation(...);
        conversationService.setParticipantRole(...);
    } catch (Exception e) {
        // 채팅방 생성 실패해도 모임은 이미 생성됨
        log.error("채팅방 생성 실패: meetupIdx={}", 
                  event.getMeetupIdx(), e);
    }
}`}
                </pre>
                <p style={{ lineHeight: '1.8', color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '0.5rem' }}>
                  <strong style={{ color: 'var(--text-color)' }}>효과:</strong> 핵심 도메인 보장 (모임 생성은 항상 성공), 사용자 경험 개선 (모임 생성 즉시 응답), 확장성 (다른 부가 기능도 이벤트 리스너로 추가 가능)
                </p>
              </div>
            </div>
            <div className="section-card" style={{
              padding: '1.5rem',
              backgroundColor: 'var(--card-bg)',
              borderRadius: '8px',
              border: '1px solid var(--nav-border)'
            }}>
              <h3 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>중복 참여 방지</h3>
              <ul style={{
                listStyle: 'none',
                padding: 0,
                color: 'var(--text-secondary)',
                lineHeight: '1.8'
              }}>
                <li>• <strong style={{ color: 'var(--text-color)' }}>Unique 제약 조건</strong>: (meetup_idx, user_idx)로 중복 참여 방지</li>
              </ul>
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
                원자적 UPDATE 쿼리와 DB 제약조건을 적용한 결과, Race Condition 문제가 완전히 해결되었습니다.
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
                      }}>Before</th>
                      <th style={{
                        padding: '0.75rem',
                        textAlign: 'left',
                        color: 'var(--text-color)',
                        fontWeight: 'bold'
                      }}>After</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr style={{
                      borderBottom: '1px solid var(--nav-border)'
                    }}>
                      <td style={{ padding: '0.75rem' }}>Lost Update</td>
                      <td style={{ padding: '0.75rem' }}>✅ 발생 (4명 참가)</td>
                      <td style={{ padding: '0.75rem', fontWeight: 'bold', color: 'var(--link-color)' }}>❌ 해결 (3명 참가)</td>
                    </tr>
                    <tr style={{
                      borderBottom: '1px solid var(--nav-border)'
                    }}>
                      <td style={{ padding: '0.75rem' }}>인원 초과</td>
                      <td style={{ padding: '0.75rem' }}>✅ 발생</td>
                      <td style={{ padding: '0.75rem', fontWeight: 'bold', color: 'var(--link-color)' }}>❌ 해결</td>
                    </tr>
                    <tr style={{
                      borderBottom: '1px solid var(--nav-border)'
                    }}>
                      <td style={{ padding: '0.75rem' }}>데이터 일치</td>
                      <td style={{ padding: '0.75rem' }}>❌ 불일치</td>
                      <td style={{ padding: '0.75rem', fontWeight: 'bold', color: 'var(--link-color)' }}>✅ 일치</td>
                    </tr>
                    <tr>
                      <td style={{ padding: '0.75rem' }}>프로젝트 일관성</td>
                      <td style={{ padding: '0.75rem' }}>-</td>
                      <td style={{ padding: '0.75rem', fontWeight: 'bold', color: 'var(--link-color)' }}>✅ 있음</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div style={{
                padding: '1rem',
                backgroundColor: 'var(--bg-color)',
                borderRadius: '6px',
                marginTop: '1rem'
              }}>
                <h3 style={{ marginBottom: '0.75rem', color: 'var(--text-color)', fontSize: '1rem' }}>테스트 결과</h3>
                <ul style={{
                  listStyle: 'none',
                  padding: 0,
                  color: 'var(--text-secondary)',
                  lineHeight: '1.8'
                }}>
                  <li>• <strong style={{ color: 'var(--text-color)' }}>Before:</strong> 3명 성공, 0명 실패 → 실제 4명 참가 (최대 3명 초과)</li>
                  <li>• <strong style={{ color: 'var(--text-color)' }}>After:</strong> 2명 성공, 1명 실패 → 실제 3명 참가 (정상)</li>
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
              <h3 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>시퀀스 다이어그램 (최적화 후)</h3>
              <MermaidDiagram chart={optimizedMeetupJoinSequenceDiagram} />
            </div>
          </section>
        </div>
        <TableOfContents sections={sections} />
      </div>
    </div>
  );
}

export default MeetupDomainOptimization;

