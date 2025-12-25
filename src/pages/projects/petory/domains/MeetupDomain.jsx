import MermaidDiagram from '../../../../components/Common/MermaidDiagram';
import TableOfContents from '../../../../components/Common/TableOfContents';

function MeetupDomain() {
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
    Users ||--o{ Meetup : "organizes"
    Meetup ||--o{ MeetupParticipants : "has"
    Users ||--o{ MeetupParticipants : "participates"
    
    Meetup {
        Long idx PK
        String title
        String description
        String location
        Double latitude
        Double longitude
        LocalDateTime date
        Long organizer_idx FK
        Integer maxParticipants
        Integer currentParticipants
        MeetupStatus status
        LocalDateTime createdAt
        LocalDateTime updatedAt
    }
    
    MeetupParticipants {
        Long idx PK
        Long meetup_idx FK
        Long user_idx FK
        LocalDateTime joinedAt
    }`;

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
    <div style={{ padding: '2rem 0' }}>
      <div style={{ display: 'flex', gap: '2rem', alignItems: 'flex-start' }}>
        <div style={{ flex: 1 }}>
          <h1 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>모임 도메인</h1>
          
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
                Meetup 도메인은 오프라인 반려동물 모임 생성 및 참여 관리를 담당합니다.
              </p>
              <p style={{ lineHeight: '1.8', color: 'var(--text-secondary)' }}>
                사용자가 모임을 생성하고 다른 사용자들이 참여할 수 있습니다.
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
                동시 참가 시 <strong style={{ color: 'var(--text-color)' }}>최대 인원 초과</strong> 문제가 발생했습니다. (예: 3명 제한인데 4명 참가)
              </p>
              <div style={{
                padding: '1rem',
                backgroundColor: 'var(--bg-color)',
                borderRadius: '6px',
                marginTop: '1rem'
              }}>
                <h3 style={{ marginBottom: '0.75rem', color: 'var(--text-color)', fontSize: '1rem' }}>발생 원인</h3>
                <p style={{ lineHeight: '1.8', color: 'var(--text-secondary)', marginBottom: '0.75rem' }}>
                  동시에 여러 사용자가 참가할 때, <code style={{ backgroundColor: 'var(--card-bg)', padding: '0.2rem 0.4rem', borderRadius: '4px' }}>currentParticipants</code> 체크와 증가 사이에 다른 트랜잭션이 끼어들어 Lost Update 발생.
                </p>
                <div style={{
                  padding: '0.75rem',
                  backgroundColor: 'var(--card-bg)',
                  borderRadius: '4px',
                  marginTop: '0.5rem',
                  fontSize: '0.9rem'
                }}>
                  <strong style={{ color: 'var(--text-color)' }}>시나리오 예시:</strong>
                  <ul style={{
                    listStyle: 'none',
                    padding: '0.5rem 0 0 0',
                    margin: 0,
                    color: 'var(--text-secondary)',
                    lineHeight: '1.8'
                  }}>
                    <li>• 모임 최대 인원: 3명</li>
                    <li>• 모임장 1명 (이미 참가) → currentParticipants = 1</li>
                    <li>• 남은 자리: 2명</li>
                    <li>• 동시에 3명이 참가 버튼 클릭</li>
                    <li>• 3명 모두 currentParticipants (1) &lt; maxParticipants (3) 체크 통과</li>
                    <li>• 3명 모두 참가 처리</li>
                    <li>• <strong style={{ color: 'var(--text-color)' }}>결과: currentParticipants = 1 + 3 = 4명 → 최대 인원 초과!</strong></li>
                  </ul>
                </div>
              </div>
              <div style={{
                padding: '1rem',
                backgroundColor: 'var(--bg-color)',
                borderRadius: '6px',
                marginTop: '1rem'
              }}>
                <h3 style={{ marginBottom: '0.75rem', color: 'var(--text-color)', fontSize: '1rem' }}>Before (문제 코드)</h3>
                <pre style={{
                  padding: '0.75rem',
                  backgroundColor: 'var(--card-bg)',
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
            </div>
          </section>

          {/* 3. 문제 재현 방식 (테스트 설계) */}
          <section id="test-design" style={{ marginBottom: '3rem', scrollMarginTop: '2rem' }}>
            <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>문제 재현 방식 (테스트 설계)</h2>
            <div style={{
              padding: '1.5rem',
              backgroundColor: 'var(--card-bg)',
              borderRadius: '8px',
              border: '1px solid var(--nav-border)'
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
            <div style={{
              padding: '1.5rem',
              backgroundColor: 'var(--card-bg)',
              borderRadius: '8px',
              border: '1px solid var(--nav-border)',
              marginTop: '1rem'
            }}>
              <h3 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>시퀀스 다이어그램 (최적화 전)</h3>
              <MermaidDiagram chart={meetupJoinSequenceDiagram} />
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
              <h3 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>현재 구현된 최적화</h3>
              <ul style={{
                listStyle: 'none',
                padding: 0,
                color: 'var(--text-secondary)',
                lineHeight: '1.8'
              }}>
                <li>• <strong style={{ color: 'var(--text-color)' }}>인덱싱</strong>: 모임 상태별 조회 인덱스, 주최자별 모임 인덱스, 위치 기반 검색 (Spatial Index)</li>
                <li>• <strong style={{ color: 'var(--text-color)' }}>Fetch Join</strong>: 참여자와 사용자 정보를 함께 조회</li>
              </ul>
            </div>
            <div style={{
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
            <div style={{
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

          {/* 6. 성능 개선 결과 (개선 후) */}
          <section id="after" style={{ marginBottom: '3rem', scrollMarginTop: '2rem' }}>
            <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>성능 개선 결과 (개선 후)</h2>
            <div style={{
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
            <div style={{
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

          {/* 7. 주요 기능 */}
          <section id="entities" style={{ marginBottom: '3rem', scrollMarginTop: '2rem' }}>
            <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>주요 기능</h2>
            
            <div style={{
              padding: '1.5rem',
              backgroundColor: 'var(--card-bg)',
              borderRadius: '8px',
              border: '1px solid var(--nav-border)',
              marginBottom: '1.5rem'
            }}>
              <h3 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>모임 생성 및 참여</h3>
              <div style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}>
                <p style={{ marginBottom: '0.5rem' }}>사용자가 모임을 생성하고 다른 사용자들이 참여할 수 있습니다.</p>
                <p style={{ marginBottom: '0.5rem' }}><strong style={{ color: 'var(--text-color)' }}>주요 기능:</strong></p>
                <ul style={{ marginLeft: '1.5rem', marginBottom: '0.5rem' }}>
                  <li>모임 생성 (제목, 설명, 장소, 일시, 최대 인원)</li>
                  <li>여러 사용자가 참여</li>
                  <li>최대 인원 도달 시 참여 불가</li>
                  <li>모임 참여/취소</li>
                  <li>현재 참여자 수 관리</li>
                  <li>중복 참여 방지 (Unique 제약)</li>
                  <li>모임 일시 지남 → 자동 완료</li>
                </ul>
                <p style={{ marginBottom: '0.5rem' }}><strong style={{ color: 'var(--text-color)' }}>사용자 시나리오:</strong></p>
                <ol style={{ marginLeft: '1.5rem', marginBottom: '0.5rem' }}>
                  <li>모임 생성 (제목, 설명, 장소, 일시, 최대 인원)</li>
                  <li>여러 사용자가 참여</li>
                  <li>최대 인원 도달 시 참여 불가</li>
                  <li>모임 일시 지남 → 자동 완료</li>
                </ol>
                <p style={{ marginTop: '0.5rem', fontStyle: 'italic', color: 'var(--text-muted)' }}>스크린샷/영상: [추가 예정]</p>
              </div>
            </div>

            <div style={{
              padding: '1.5rem',
              backgroundColor: 'var(--card-bg)',
              borderRadius: '8px',
              border: '1px solid var(--nav-border)',
              marginBottom: '1.5rem'
            }}>
              <h3 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>모임 상태 관리</h3>
              <div style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}>
                <p style={{ marginBottom: '0.5rem' }}>모임의 상태를 관리하여 모집 중, 확정, 완료, 취소 상태를 구분합니다.</p>
                <p style={{ marginBottom: '0.5rem' }}><strong style={{ color: 'var(--text-color)' }}>주요 기능:</strong></p>
                <ul style={{ marginLeft: '1.5rem', marginBottom: '0.5rem' }}>
                  <li>RECRUITING (모집 중) - 모임 생성 시 기본 상태</li>
                  <li>CONFIRMED (확정) - 최소 인원 도달 시 자동 변경</li>
                  <li>COMPLETED (완료) - 모임 일시 지남 시 자동 완료</li>
                  <li>CANCELLED (취소) - 주최자가 취소</li>
                </ul>
                <p style={{ marginTop: '0.5rem', fontStyle: 'italic', color: 'var(--text-muted)' }}>스크린샷/영상: [추가 예정]</p>
              </div>
            </div>

            <div style={{
              padding: '1.5rem',
              backgroundColor: 'var(--card-bg)',
              borderRadius: '8px',
              border: '1px solid var(--nav-border)'
            }}>
              <h3 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>위치 기반 모임 검색</h3>
              <div style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}>
                <p style={{ marginBottom: '0.5rem' }}>내 위치 기반으로 주변 모임을 검색할 수 있습니다.</p>
                <p style={{ marginBottom: '0.5rem' }}><strong style={{ color: 'var(--text-color)' }}>주요 기능:</strong></p>
                <ul style={{ marginLeft: '1.5rem', marginBottom: '0.5rem' }}>
                  <li>위치 기반 모임 검색 (반경 내)</li>
                  <li>위도/경도 좌표 기반 거리 계산</li>
                  <li>Spatial Index 활용</li>
                </ul>
                <p style={{ marginTop: '0.5rem', fontStyle: 'italic', color: 'var(--text-muted)' }}>스크린샷/영상: [추가 예정]</p>
              </div>
            </div>
      </section>

          <section id="entities" style={{ marginBottom: '3rem', scrollMarginTop: '2rem' }}>
            <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>Entity 구조</h2>
        
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
          <h3 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>1. Meetup (모임)</h3>
          <div style={{ 
            color: 'var(--text-secondary)',
            lineHeight: '1.8',
            fontFamily: 'monospace',
            fontSize: '0.9rem'
          }}>
            <div style={{ marginBottom: '0.5rem' }}><strong style={{ color: 'var(--text-color)' }}>주요 필드:</strong></div>
            <div>• idx (PK), title, description, location</div>
            <div>• latitude, longitude, date (모임 일시)</div>
            <div>• organizer (주최자), maxParticipants, currentParticipants</div>
            <div>• status (RECRUITING/CONFIRMED/COMPLETED/CANCELLED)</div>
            <div>• createdAt, updatedAt</div>
            <div style={{ marginTop: '0.5rem' }}><strong style={{ color: 'var(--text-color)' }}>연관관계:</strong></div>
            <div>• ManyToOne → Users (주최자)</div>
            <div>• OneToMany → MeetupParticipants</div>
          </div>
        </div>

        <div style={{
          padding: '1.5rem',
          backgroundColor: 'var(--card-bg)',
          borderRadius: '8px',
          border: '1px solid var(--nav-border)'
        }}>
          <h3 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>2. MeetupParticipants (모임 참여자)</h3>
          <div style={{ 
            color: 'var(--text-secondary)',
            lineHeight: '1.8',
            fontFamily: 'monospace',
            fontSize: '0.9rem'
          }}>
            <div style={{ marginBottom: '0.5rem' }}><strong style={{ color: 'var(--text-color)' }}>주요 필드:</strong></div>
            <div>• idx (PK), meetup (모임), user (참여자), joinedAt</div>
            <div style={{ marginTop: '0.5rem' }}><strong style={{ color: 'var(--text-color)' }}>연관관계:</strong></div>
            <div>• ManyToOne → Meetup, Users</div>
            <div>• Unique 제약: (meetup_idx, user_idx)</div>
          </div>
        </div>
      </section>

          <section id="services" style={{ marginBottom: '3rem', scrollMarginTop: '2rem' }}>
            <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>Service 주요 기능</h2>
        
        <div style={{
          padding: '1.5rem',
          backgroundColor: 'var(--card-bg)',
          borderRadius: '8px',
          border: '1px solid var(--nav-border)',
          marginBottom: '1rem'
        }}>
          <h3 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>MeetupService</h3>
          <div style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}>
            <div style={{ marginBottom: '0.5rem' }}><strong style={{ color: 'var(--text-color)' }}>모임 관리:</strong></div>
            <div>• createMeetup() - 모임 생성</div>
            <div>• getAllMeetups() - 모임 목록 조회 (페이징, 상태 필터)</div>
            <div>• searchByLocation() - 위치 기반 모임 검색 (반경 내)</div>
            <div>• getMeetup() - 모임 상세 조회</div>
            <div>• updateMeetup() - 모임 수정</div>
            <div>• cancelMeetup() - 모임 취소</div>
            <div>• getMyOrganizedMeetups() - 내가 주최한 모임</div>
            <div>• getMyParticipatedMeetups() - 내가 참여한 모임</div>
            <div style={{ marginTop: '1rem', marginBottom: '0.5rem' }}><strong style={{ color: 'var(--text-color)' }}>모임 참여 관리:</strong></div>
            <div>• joinMeetup() - 모임 참여</div>
            <div>• leaveMeetup() - 모임 참여 취소</div>
            <div>• getParticipants() - 참여자 목록 조회</div>
            <div>• canJoin() - 참여 가능 여부 확인</div>
            <div style={{ marginTop: '1rem', marginBottom: '0.5rem' }}><strong style={{ color: 'var(--text-color)' }}>상태 관리:</strong></div>
            <div>• confirmMeetup() - 모임 확정 (최소 인원 도달 시)</div>
            <div>• completeMeetup() - 모임 완료 처리</div>
            <div>• updateExpiredMeetups() - 만료된 모임 자동 완료 (스케줄러)</div>
          </div>
        </div>
      </section>

          {/* 8. 보안 및 권한 체계 */}
          <section id="security" style={{ marginBottom: '3rem', scrollMarginTop: '2rem' }}>
            <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>보안 및 권한 체계</h2>
            <div style={{
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
                <li>• <strong style={{ color: 'var(--text-color)' }}>주최자만 수정/취소 가능</strong>: 모임 주최자만 본인 모임 수정/취소 가능</li>
                <li>• <strong style={{ color: 'var(--text-color)' }}>참여 권한</strong>: 모든 사용자가 모임 참여 가능 (최대 인원 제한 내)</li>
              </ul>
            </div>
          </section>

          {/* 9. 다른 도메인과의 연관관계 */}
          <section id="relationships" style={{ marginBottom: '3rem', scrollMarginTop: '2rem' }}>
            <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>다른 도메인과의 연관관계</h2>
        
        <div style={{
          padding: '1.5rem',
          backgroundColor: 'var(--card-bg)',
          borderRadius: '8px',
          border: '1px solid var(--nav-border)'
        }}>
          <div style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}>
            <div style={{ marginBottom: '0.5rem' }}><strong style={{ color: 'var(--text-color)' }}>User 도메인:</strong></div>
            <div>• Users가 모임을 주최, 모임에 참여, 주최자만 모임 수정/취소 가능</div>
            <div style={{ marginTop: '1rem', marginBottom: '0.5rem' }}><strong style={{ color: 'var(--text-color)' }}>Notification 도메인:</strong></div>
            <div>• 모임 생성 시 알림, 모임 참여 시 주최자에게 알림, 모임 확정 시 참여자들에게 알림, 모임 취소 시 참여자들에게 알림</div>
            <div style={{ marginTop: '1rem', marginBottom: '0.5rem' }}><strong style={{ color: 'var(--text-color)' }}>Report 도메인:</strong></div>
            <div>• 부적절한 모임 신고, ReportTargetType.MEETUP으로 구분</div>
            <div style={{ marginTop: '1rem', marginBottom: '0.5rem' }}><strong style={{ color: 'var(--text-color)' }}>Chat 도메인:</strong></div>
            <div>• 모임 생성 시 그룹 채팅방 자동 생성, 모임 참여자 간 채팅</div>
          </div>
        </div>
      </section>

          <section id="api" style={{ marginBottom: '3rem', scrollMarginTop: '2rem' }}>
            <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>API 엔드포인트</h2>
        
        <div style={{
          padding: '1.5rem',
          backgroundColor: 'var(--card-bg)',
          borderRadius: '8px',
          border: '1px solid var(--nav-border)',
          marginBottom: '1rem'
        }}>
          <h3 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>모임 (/api/meetups)</h3>
          <div style={{ 
            color: 'var(--text-secondary)',
            lineHeight: '1.8',
            fontFamily: 'monospace',
            fontSize: '0.9rem'
          }}>
            <div>• GET / - 목록 조회 (페이징, 상태 필터)</div>
            <div>• GET /{'{id}'} - 상세 조회</div>
            <div>• POST / - 모임 생성</div>
            <div>• PUT /{'{id}'} - 모임 수정</div>
            <div>• DELETE /{'{id}'} - 모임 취소</div>
            <div>• GET /nearby - 위치 기반 검색</div>
            <div>• GET /me/organized - 내가 주최한 모임</div>
            <div>• GET /me/participated - 내가 참여한 모임</div>
          </div>
        </div>

        <div style={{
          padding: '1.5rem',
          backgroundColor: 'var(--card-bg)',
          borderRadius: '8px',
          border: '1px solid var(--nav-border)'
        }}>
          <h3 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>모임 참여 (/api/meetups/{'{meetupId}'}/participants)</h3>
          <div style={{ 
            color: 'var(--text-secondary)',
            lineHeight: '1.8',
            fontFamily: 'monospace',
            fontSize: '0.9rem'
          }}>
            <div>• GET / - 참여자 목록</div>
            <div>• POST / - 모임 참여</div>
            <div>• DELETE / - 참여 취소</div>
          </div>
        </div>
      </section>

          <section id="docs" style={{ marginBottom: '3rem', scrollMarginTop: '2rem' }}>
            <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>관련 문서</h2>
        <div style={{
          padding: '1rem',
          backgroundColor: 'var(--card-bg)',
          borderRadius: '8px',
          border: '1px solid var(--nav-border)'
        }}>
          <a 
            href="https://github.com/makkong1/makkong1-github.io/blob/main/docs/domains/meetup.md" 
            target="_blank"
            rel="noopener noreferrer"
            style={{ 
              color: 'var(--link-color)',
              textDecoration: 'none'
            }}
          >
            → Meetup 도메인 상세 문서 보기
          </a>
        </div>
          </section>
        </div>
        <TableOfContents sections={sections} />
      </div>
    </div>
  );
}

export default MeetupDomain;
