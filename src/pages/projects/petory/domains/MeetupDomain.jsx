import { Link } from 'react-router-dom';
import MermaidDiagram from '../../../../components/Common/MermaidDiagram';
import TableOfContents from '../../../../components/Common/TableOfContents';

function MeetupDomain() {
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
    Users ||--o{ Meetup : "주최"
    Meetup ||--o{ MeetupParticipants : "참여"
    Users ||--o{ MeetupParticipants : "참여자"
    
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
        Boolean isDeleted
        LocalDateTime deletedAt
        LocalDateTime createdAt
        LocalDateTime updatedAt
    }
    
    MeetupParticipants {
        Long meetup_idx PK
        Long user_idx PK
        LocalDateTime joinedAt
    }`;

  return (
    <div className="domain-page-wrapper" style={{ padding: '2rem 0' }}>
      <div className="domain-page-container" style={{ display: 'flex', gap: '2rem', alignItems: 'flex-start' }}>
        <div className="domain-page-content" style={{ flex: 1 }}>
          <h1 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>모임 도메인</h1>
          
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
                Meetup 도메인은 오프라인 반려동물 모임 생성 및 참여 관리를 담당합니다.
              </p>
              <p style={{ lineHeight: '1.8', color: 'var(--text-secondary)' }}>
                사용자가 모임을 생성하고 다른 사용자들이 참여할 수 있습니다.
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
              <h3 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>1. 모임 생성 및 참여</h3>
              <div style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}>
                <p style={{ marginBottom: '0.5rem' }}>사용자가 모임을 생성하고 다른 사용자들이 참여할 수 있습니다.</p>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  <li>• 모임 생성 (제목, 설명, 장소, 일시, 최대 인원) - 이메일 인증 필요</li>
                  <li>• 주최자 자동 참여 및 그룹 채팅방 자동 생성</li>
                  <li>• 여러 사용자가 참여 가능 (최대 인원 제한)</li>
                  <li>• 모임 참여/취소 (이메일 인증 필요); 참여 후 채팅 입장은 Chat API 별도 호출(meetup.md 2.1)</li>
                  <li>• 중복 참여 방지 (Unique 제약조건)</li>
                  <li>• 모임 일시 지남 시 자동 완료 (스케줄러)</li>
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
              <h3 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>2. 모임 상태 관리</h3>
              <div style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}>
                <p style={{ marginBottom: '0.5rem' }}>모임의 상태를 관리하여 모집 중, 마감, 완료 상태를 구분합니다.</p>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  <li>• RECRUITING (모집 중) — 생성 시 기본값</li>
                  <li>• CLOSED (마감) — 정원 마감 등 (<code style={{ backgroundColor: 'var(--bg-color)', padding: '0.15rem 0.35rem', borderRadius: '4px' }}>MeetupScheduler</code> 매시 정각 <code style={{ backgroundColor: 'var(--bg-color)', padding: '0.15rem 0.35rem', borderRadius: '4px' }}>{'cron = "0 0 * * * ?"'}</code>)</li>
                  <li>• COMPLETED (완료) — 모임 일시 경과 시 스케줄러가 전이</li>
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
              <h3 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>3. 위치 기반 모임 검색</h3>
              <div style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}>
                <p style={{ marginBottom: '0.5rem' }}>내 위치 기반으로 주변 모임을 검색할 수 있습니다.</p>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  <li>• <code style={{ backgroundColor: 'var(--bg-color)', padding: '0.15rem 0.35rem', borderRadius: '4px' }}>GET /api/meetups/nearby</code> — Haversine(6371km), <code style={{ backgroundColor: 'var(--bg-color)', padding: '0.15rem 0.35rem', borderRadius: '4px' }}>radius</code> 기본 5.0km, <code style={{ backgroundColor: 'var(--bg-color)', padding: '0.15rem 0.35rem', borderRadius: '4px' }}>maxResults</code> 기본 500(서비스에서 1~1000 클램프)</li>
                  <li>• <code style={{ backgroundColor: 'var(--bg-color)', padding: '0.15rem 0.35rem', borderRadius: '4px' }}>GET /api/meetups/location</code> — 경계 박스, 삭제 제외, 일시 오름차순</li>
                  <li>• <code style={{ backgroundColor: 'var(--bg-color)', padding: '0.15rem 0.35rem', borderRadius: '4px' }}>GET /api/meetups/search</code> — 제목·설명 키워드(JPQL LIKE)</li>
                  <li>• 근처 조회: 모임 일시가 현재 이후인 글만, <code style={{ backgroundColor: 'var(--bg-color)', padding: '0.15rem 0.35rem', borderRadius: '4px' }}>COMPLETED</code> 제외 (meetup.md 2.3)</li>
                </ul>
              </div>
            </div>

            <div className="section-card" style={{
              padding: '1.5rem',
              backgroundColor: 'var(--card-bg)',
              borderRadius: '8px',
              border: '1px solid var(--nav-border)'
            }}>
              <h3 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>4. 그룹 채팅방 자동 생성 및 연동</h3>
              <div style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}>
                <p style={{ marginBottom: '0.5rem' }}>모임 생성·참가와 채팅 입장은 책임이 나뉩니다 (meetup.md 2.1, 8.6절).</p>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  <li>• <strong style={{ color: 'var(--text-color)' }}>자동 생성</strong>: <code style={{ backgroundColor: 'var(--bg-color)', padding: '0.15rem 0.35rem', borderRadius: '4px' }}>MeetupCreatedEvent</code> → <code style={{ backgroundColor: 'var(--bg-color)', padding: '0.15rem 0.35rem', borderRadius: '4px' }}>MeetupChatRoomEventListener</code>가 <code style={{ backgroundColor: 'var(--bg-color)', padding: '0.15rem 0.35rem', borderRadius: '4px' }}>ConversationType.MEETUP</code> + <code style={{ backgroundColor: 'var(--bg-color)', padding: '0.15rem 0.35rem', borderRadius: '4px' }}>RelatedType.MEETUP</code> 방 생성, 주최자 <strong style={{ color: 'var(--text-color)' }}>ADMIN</strong></li>
                  <li>• <strong style={{ color: 'var(--text-color)' }}>모임 참가</strong>: <code style={{ backgroundColor: 'var(--bg-color)', padding: '0.15rem 0.35rem', borderRadius: '4px' }}>MeetupService.joinMeetup()</code>은 채팅을 건드리지 않음 — 채팅 입장은 <code style={{ backgroundColor: 'var(--bg-color)', padding: '0.15rem 0.35rem', borderRadius: '4px' }}>POST /api/chat/conversations/meetup/{'{meetupIdx}'}/join?userId=…</code>를 <strong style={{ color: 'var(--text-color)' }}>별도 호출</strong></li>
                  <li>• <strong style={{ color: 'var(--text-color)' }}>모임 참가 취소</strong>: <code style={{ backgroundColor: 'var(--bg-color)', padding: '0.15rem 0.35rem', borderRadius: '4px' }}>leaveMeetupChat</code> 호출; 실패해도 모임 취소는 성공</li>
                  <li>• 채팅방 생성 실패해도 모임 생성은 커밋됨(이벤트 비동기, 핵심 도메인 보호)</li>
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
              <h3 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>1. 모임 참여 시 최대 인원 초과 문제 (Race Condition)</h3>
              <div style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}>
                <p style={{ marginBottom: '0.5rem' }}><strong style={{ color: 'var(--text-color)' }}>문제:</strong> 동시에 여러 사용자가 참가할 때, currentParticipants 체크와 증가 사이에 다른 트랜잭션이 끼어들어 Lost Update 발생 (예: 3명 제한인데 4명 참가)</p>
                <p style={{ marginBottom: '0.5rem' }}><strong style={{ color: 'var(--text-color)' }}>해결:</strong> 원자적 UPDATE 쿼리 사용, DB 제약조건 추가, 이벤트 기반 아키텍처 적용</p>
                <p style={{ marginBottom: '0.5rem' }}><strong style={{ color: 'var(--text-color)' }}>효과:</strong> Lost Update 해결, 최대 인원 초과 방지, 데이터 일치성 보장</p>
                <div style={{
                  marginTop: '1rem',
                  padding: '1rem',
                  backgroundColor: 'var(--bg-color)',
                  borderRadius: '6px',
                  border: '1px solid var(--link-color)'
                }}>
                  <Link
                    to="/domains/meetup/optimization"
                    style={{
                      color: 'var(--link-color)',
                      textDecoration: 'none',
                      fontWeight: 'bold',
                      display: 'inline-block'
                    }}
                  >
                    → 동시성 제어 상세 보기
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
                <p style={{ marginBottom: '0.5rem' }}><strong style={{ color: 'var(--text-color)' }}>meetup 테이블:</strong></p>
                <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 1rem 0' }}>
                  <li>• 날짜별 모임 조회: <code style={{ backgroundColor: 'var(--bg-color)', padding: '0.2rem 0.4rem', borderRadius: '4px' }}>CREATE INDEX idx_meetup_date ON meetup(date)</code></li>
                  <li>• 날짜 및 상태별 모임 조회: <code style={{ backgroundColor: 'var(--bg-color)', padding: '0.2rem 0.4rem', borderRadius: '4px' }}>CREATE INDEX idx_meetup_date_status ON meetup(date, status)</code></li>
                  <li>• 위치 기반 검색: <code style={{ backgroundColor: 'var(--bg-color)', padding: '0.2rem 0.4rem', borderRadius: '4px' }}>CREATE INDEX idx_meetup_location ON meetup(latitude, longitude)</code></li>
                  <li>• 상태별 모임 조회: <code style={{ backgroundColor: 'var(--bg-color)', padding: '0.2rem 0.4rem', borderRadius: '4px' }}>CREATE INDEX idx_meetup_status ON meetup(status)</code></li>
                  <li>• 주최자별 모임 조회: <code style={{ backgroundColor: 'var(--bg-color)', padding: '0.2rem 0.4rem', borderRadius: '4px' }}>CREATE INDEX organizer_idx ON meetup(organizer_idx)</code></li>
                </ul>
                <p style={{ marginBottom: '0.5rem' }}><strong style={{ color: 'var(--text-color)' }}>meetupparticipants 테이블:</strong></p>
                <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 1rem 0' }}>
                  <li>• 사용자별 참여 모임 조회: <code style={{ backgroundColor: 'var(--bg-color)', padding: '0.2rem 0.4rem', borderRadius: '4px' }}>CREATE INDEX user_idx ON meetupparticipants(user_idx)</code></li>
                  <li>• 복합 키 (Primary Key, 중복 참여 방지): <code style={{ backgroundColor: 'var(--bg-color)', padding: '0.2rem 0.4rem', borderRadius: '4px' }}>PRIMARY KEY (meetup_idx, user_idx)</code></li>
                </ul>
                <p style={{ marginBottom: '0.5rem' }}><strong style={{ color: 'var(--text-color)' }}>선정 이유:</strong></p>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  <li>• 자주 조회되는 컬럼 조합 (status, date)</li>
                  <li>• WHERE 절에서 자주 사용되는 조건</li>
                  <li>• JOIN에 사용되는 외래키 (organizer_idx)</li>
                  <li>• 위치 기반 검색을 위한 인덱스 (latitude, longitude)</li>
                  <li>• 복합 키로 중복 참여 방지</li>
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
                <p style={{ marginBottom: '0.5rem' }}><strong style={{ color: 'var(--text-color)' }}>Fetch Join 사용:</strong></p>
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
{`@Query("SELECT m FROM Meetup m " +
       "JOIN FETCH m.organizer " +
       "LEFT JOIN FETCH m.participants p " +
       "JOIN FETCH p.user " +
       "WHERE m.isDeleted = false")
List<Meetup> findAllWithOrganizerAndParticipants();`}
                </pre>
                <p style={{ marginBottom: '0.5rem' }}><strong style={{ color: 'var(--text-color)' }}>개선 포인트:</strong></p>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  <li>• Fetch Join으로 N+1 문제 해결</li>
                  <li>• 주최자와 참여자 정보를 한 번에 조회</li>
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
                  Meetup 도메인의 DTO 중 record 적용에 적합한 항목을 선별하여 리팩토링했습니다.
                </p>
                
                <div style={{
                  padding: '1rem',
                  backgroundColor: 'var(--bg-color)',
                  borderRadius: '6px',
                  marginBottom: '1rem'
                }}>
                  <h4 style={{ marginBottom: '0.75rem', color: 'var(--text-color)', fontSize: '0.95rem' }}>record로 전환한 DTO (1개)</h4>
                  <ul style={{
                    listStyle: 'none',
                    padding: 0,
                    margin: 0,
                    fontSize: '0.9rem',
                    lineHeight: '1.8'
                  }}>
                    <li>• <strong style={{ color: 'var(--text-color)' }}>MeetupParticipantsDTO</strong> - 모임 참여자 정보 응답 (4개 필드: meetupIdx, userIdx, username, joinedAt)</li>
                  </ul>
                </div>

                <div style={{
                  padding: '1rem',
                  backgroundColor: 'var(--bg-color)',
                  borderRadius: '6px',
                  marginBottom: '1rem'
                }}>
                  <h4 style={{ marginBottom: '0.75rem', color: 'var(--text-color)', fontSize: '0.95rem' }}>record로 전환하지 않은 DTO (1개)</h4>
                  <ul style={{
                    listStyle: 'none',
                    padding: 0,
                    margin: 0,
                    fontSize: '0.9rem',
                    lineHeight: '1.8'
                  }}>
                    <li>• <strong style={{ color: 'var(--text-color)' }}>MeetupDTO</strong> - 필드 17개로 생성자 과도하게 김, Request/Response 겸용, `toEntity()` 존재하여 역방향 변환에서 getter 다수 사용</li>
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
                    <li>• <code style={{ backgroundColor: 'var(--card-bg)', padding: '0.2rem 0.4rem', borderRadius: '4px' }}>MeetupParticipantsDTO.java</code> - class → record</li>
                    <li>• <code style={{ backgroundColor: 'var(--card-bg)', padding: '0.2rem 0.4rem', borderRadius: '4px' }}>MeetupParticipantsConverter.java</code> - builder → 생성자, getter → accessor</li>
                  </ul>
                </div>

                <div style={{
                  padding: '1rem',
                  backgroundColor: 'var(--bg-color)',
                  borderRadius: '6px',
                  border: '1px solid var(--link-color)'
                }}>
                  <a
                    href="https://github.com/makkong1/makkong1-github.io/blob/main/docs/refactoring/recordType/meetup/dto-record-refactoring.md"
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

            <div className="section-card" style={{
              padding: '1.5rem',
              backgroundColor: 'var(--card-bg)',
              borderRadius: '8px',
              border: '1px solid var(--nav-border)',
              marginTop: '1rem'
            }}>
              <h3 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>Fetch 전략 개선</h3>
              <div style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}>
                <p style={{ marginBottom: '0.75rem' }}>
                  단건 상세 → Fetch Join / 페이징 목록 → Batch Size 규칙에 따라 Meetup 도메인 Fetch 전략을 개선했습니다.
                </p>
                <div style={{
                  padding: '1rem',
                  backgroundColor: 'var(--bg-color)',
                  borderRadius: '6px',
                  marginBottom: '1rem',
                  overflowX: 'auto'
                }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
                    <thead>
                      <tr style={{ borderBottom: '2px solid var(--nav-border)' }}>
                        <th style={{ padding: '0.75rem', textAlign: 'left', color: 'var(--text-color)' }}>구분</th>
                        <th style={{ padding: '0.75rem', textAlign: 'left', color: 'var(--text-color)' }}>대상</th>
                        <th style={{ padding: '0.75rem', textAlign: 'left', color: 'var(--text-color)' }}>전략</th>
                        <th style={{ padding: '0.75rem', textAlign: 'left', color: 'var(--text-color)' }}>상태</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr style={{ borderBottom: '1px solid var(--nav-border)' }}>
                        <td style={{ padding: '0.75rem' }}>Meetup 단건 상세</td>
                        <td style={{ padding: '0.75rem' }}>getMeetupById</td>
                        <td style={{ padding: '0.75rem' }}>Fetch Join</td>
                        <td style={{ padding: '0.75rem' }}>✅ 이미 적용됨</td>
                      </tr>
                      <tr style={{ borderBottom: '1px solid var(--nav-border)' }}>
                        <td style={{ padding: '0.75rem' }}>Meetup 목록</td>
                        <td style={{ padding: '0.75rem' }}>getAllMeetups, getNearbyMeetups 등</td>
                        <td style={{ padding: '0.75rem' }}>Fetch Join + Batch Size</td>
                        <td style={{ padding: '0.75rem' }}>✅ 적용됨</td>
                      </tr>
                      <tr>
                        <td style={{ padding: '0.75rem' }}>MeetupParticipants</td>
                        <td style={{ padding: '0.75rem' }}>getMeetupParticipants</td>
                        <td style={{ padding: '0.75rem' }}>Fetch Join</td>
                        <td style={{ padding: '0.75rem' }}>✅ 적용됨</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div style={{
                  padding: '1rem',
                  backgroundColor: 'var(--bg-color)',
                  borderRadius: '6px',
                  border: '1px solid var(--link-color)'
                }}>
                  <a
                    href="https://github.com/makkong1/makkong1-github.io/blob/main/docs/refactoring/fetch-optimization/meetup/Fetch%20%EC%A0%84%EB%9E%B5%20%EA%B0%9C%EC%84%A0%20(Fetch%20Join%20vs%20Batch%20Size).md"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      color: 'var(--link-color)',
                      textDecoration: 'none',
                      fontWeight: 'bold',
                      display: 'inline-block'
                    }}
                  >
                    → Fetch 전략 개선 상세 문서 보기
                  </a>
                </div>
              </div>
            </div>

            <div className="section-card" style={{
              padding: '1.5rem',
              backgroundColor: 'var(--card-bg)',
              borderRadius: '8px',
              border: '1px solid var(--nav-border)',
              marginTop: '1rem'
            }}>
              <h3 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>성능 최적화 · 리팩토링</h3>
              <p style={{ lineHeight: '1.8', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                반경 기반 모임 조회 최적화, N+1 쿼리 해결, 서브쿼리 최적화, Stream 연산 중복 제거, 프론트엔드 성능 최적화 등 백엔드/프론트엔드 리팩토링 내역을 정리했습니다.
              </p>
              <div style={{
                padding: '1rem',
                backgroundColor: 'var(--bg-color)',
                borderRadius: '6px',
                border: '1px solid var(--link-color)'
              }}>
                <Link
                  to="/domains/meetup/refactoring"
                  style={{
                    color: 'var(--link-color)',
                    textDecoration: 'none',
                    fontWeight: 'bold',
                    display: 'inline-block'
                  }}
                >
                  → 리팩토링 상세 페이지 보기
                </Link>
              </div>
            </div>
          </section>

          <section id="entities" style={{ marginBottom: '3rem', scrollMarginTop: '2rem' }}>
            <h2 style={{ marginBottom: '0.75rem', color: 'var(--text-color)' }}>Entity 구조</h2>
            <p style={{ marginBottom: '1rem', color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: '1.6' }}>
              필드·관계는 <strong style={{ color: 'var(--text-color)' }}>docs/domains/meetup.md</strong> 4.1절·4.3절 ERD와 동일합니다. <code style={{ backgroundColor: 'var(--bg-color)', padding: '0.15rem 0.35rem', borderRadius: '4px' }}>MeetupParticipants</code>는 <code style={{ backgroundColor: 'var(--bg-color)', padding: '0.15rem 0.35rem', borderRadius: '4px' }}>@IdClass(MeetupParticipantsId)</code> 복합 키입니다.
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
            <div>• status (RECRUITING/CLOSED/COMPLETED)</div>
            <div>• createdAt, updatedAt, isDeleted, deletedAt</div>
            <div style={{ marginTop: '0.5rem' }}><strong style={{ color: 'var(--text-color)' }}>연관관계:</strong></div>
            <div>• ManyToOne → Users (주최자)</div>
            <div>• OneToMany → MeetupParticipants</div>
          </div>
        </div>

        <div className="section-card" style={{
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
            <div>• meetup (모임, 복합 키), user (참여자, 복합 키), joinedAt</div>
            <div style={{ marginTop: '0.5rem' }}><strong style={{ color: 'var(--text-color)' }}>연관관계:</strong></div>
            <div>• ManyToOne → Meetup, Users</div>
            <div>• 복합 키: @IdClass(MeetupParticipantsId) — (meetup_idx, user_idx)</div>
            <div>• 중복 참여: PK + 서비스 선검사(<code style={{ backgroundColor: 'var(--bg-color)', padding: '0.15rem 0.35rem', borderRadius: '4px' }}>exists</code>)</div>
          </div>
        </div>

            <div className="section-card" style={{
              padding: '1.5rem',
              backgroundColor: 'var(--card-bg)',
              borderRadius: '8px',
              border: '1px solid var(--nav-border)',
              marginTop: '1rem'
            }}>
              <h3 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>3. MeetupStatus (enum)</h3>
              <div style={{
                color: 'var(--text-secondary)',
                lineHeight: '1.8',
                fontFamily: 'monospace',
                fontSize: '0.9rem'
              }}>
                <div>• RECRUITING — 모집 중(생성 시 기본)</div>
                <div>• CLOSED — 마감(정원 도달 등)</div>
                <div>• COMPLETED — 종료(일시 경과 등, <code style={{ backgroundColor: 'var(--bg-color)', padding: '0.1rem 0.3rem', borderRadius: '4px' }}>MeetupScheduler</code> 매시 정각 전이)</div>
              </div>
            </div>
      </section>

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
                <li>• <strong style={{ color: 'var(--text-color)' }}>인증</strong>: <code style={{ backgroundColor: 'var(--bg-color)', padding: '0.15rem 0.35rem', borderRadius: '4px' }}>MeetupController</code>에 <code style={{ backgroundColor: 'var(--bg-color)', padding: '0.15rem 0.35rem', borderRadius: '4px' }}>{'@PreAuthorize("isAuthenticated()")'}</code> — <strong style={{ color: 'var(--text-color)' }}>모든 <code style={{ backgroundColor: 'var(--bg-color)', padding: '0.1rem 0.3rem', borderRadius: '4px' }}>/api/meetups/**</code> 인증 필요</strong> (meetup.md 4.4)</li>
                <li>• <strong style={{ color: 'var(--text-color)' }}>현재 사용자</strong>: <code style={{ backgroundColor: 'var(--bg-color)', padding: '0.15rem 0.35rem', borderRadius: '4px' }}>Authentication.getName()</code>은 <strong style={{ color: 'var(--text-color)' }}>로그인 ID(문자열)</strong> → <code style={{ backgroundColor: 'var(--bg-color)', padding: '0.15rem 0.35rem', borderRadius: '4px' }}>usersRepository.findByIdString</code></li>
                <li>• <strong style={{ color: 'var(--text-color)' }}>수정·삭제</strong>: 서비스에서 <strong style={{ color: 'var(--text-color)' }}>주최자 또는 ADMIN/MASTER</strong>만 허용, 그 외 <code style={{ backgroundColor: 'var(--bg-color)', padding: '0.1rem 0.3rem', borderRadius: '4px' }}>MeetupForbiddenException.notOrganizer()</code></li>
                <li>• <strong style={{ color: 'var(--text-color)' }}>이메일 인증</strong>: 모임 생성·참여 시 필요(도메인 예외, meetup.md 3.1)</li>
                <li>• <strong style={{ color: 'var(--text-color)' }}>Soft Delete</strong>: <code style={{ backgroundColor: 'var(--bg-color)', padding: '0.15rem 0.35rem', borderRadius: '4px' }}>isDeleted</code>, <code style={{ backgroundColor: 'var(--bg-color)', padding: '0.15rem 0.35rem', borderRadius: '4px' }}>deletedAt</code></li>
              </ul>
            </div>
          </section>

          {/* 9. 다른 도메인과의 연관관계 */}
          <section id="relationships" style={{ marginBottom: '3rem', scrollMarginTop: '2rem' }}>
            <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>다른 도메인과의 연관관계</h2>
        
        <div className="section-card" style={{
          padding: '1.5rem',
          backgroundColor: 'var(--card-bg)',
          borderRadius: '8px',
          border: '1px solid var(--nav-border)'
        }}>
          <div  style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}>
            <div style={{ marginBottom: '0.5rem' }}><strong style={{ color: 'var(--text-color)' }}>User 도메인:</strong></div>
            <div>• Users가 모임을 주최, 모임에 참여, 주최자만 모임 수정/취소 가능</div>
            <div style={{ marginTop: '1rem', marginBottom: '0.5rem' }}><strong style={{ color: 'var(--text-color)' }}>Notification 도메인:</strong></div>
            <div>• 모임 생성 시 알림, 모임 참여 시 주최자에게 알림, 모임 확정 시 참여자들에게 알림, 모임 취소 시 참여자들에게 알림</div>
            <div style={{ marginTop: '1rem', marginBottom: '0.5rem' }}><strong style={{ color: 'var(--text-color)' }}>Report 도메인:</strong></div>
            <div>• 부적절한 모임 신고, ReportTargetType.MEETUP으로 구분</div>
            <div style={{ marginTop: '1rem', marginBottom: '0.5rem' }}><strong style={{ color: 'var(--text-color)' }}>Chat 도메인:</strong></div>
            <div>• 모임 생성 이벤트로 MEETUP 채팅방 비동기 생성; 일반 참가자 채팅 입장은 <code style={{ backgroundColor: 'var(--bg-color)', padding: '0.15rem 0.35rem', borderRadius: '4px' }}>POST /api/chat/conversations/meetup/{'{meetupIdx}'}/join</code> 별도 호출 (meetup.md 8.6, chat.md)</div>
          </div>
        </div>
      </section>

          <section id="api" style={{ marginBottom: '3rem', scrollMarginTop: '2rem' }}>
            <p style={{ marginBottom: '1rem', color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: '1.6' }}>
              경로·응답 형식은 <strong style={{ color: 'var(--text-color)' }}>docs/domains/meetup.md</strong> 4.4절 REST 표와 동일합니다.
            </p>
            <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>API 엔드포인트</h2>
        
        <div className="section-card" style={{
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
            <div>• POST /api/meetups — 생성 → {'{ meetup, message }'}</div>
            <div>• PUT /api/meetups/{'{meetupIdx}'} — 수정 → {'{ meetup, message }'}</div>
            <div>• DELETE /api/meetups/{'{meetupIdx}'} — 삭제 → {'{ message }'}</div>
            <div>• GET /api/meetups — 전체 목록 (<code style={{ backgroundColor: 'var(--bg-color)', padding: '0.1rem 0.3rem', borderRadius: '4px' }}>page</code>/<code style={{ backgroundColor: 'var(--bg-color)', padding: '0.1rem 0.3rem', borderRadius: '4px' }}>size</code> 기본 0·20, <code style={{ backgroundColor: 'var(--bg-color)', padding: '0.1rem 0.3rem', borderRadius: '4px' }}>createdAt</code> DESC)</div>
            <div>• GET /api/meetups/{'{meetupIdx}'} — 단건 → {'{ meetup }'}</div>
            <div>• GET /api/meetups/nearby — 반경 (<code style={{ backgroundColor: 'var(--bg-color)', padding: '0.1rem 0.3rem', borderRadius: '4px' }}>lat</code>, <code style={{ backgroundColor: 'var(--bg-color)', padding: '0.1rem 0.3rem', borderRadius: '4px' }}>lng</code>, <code style={{ backgroundColor: 'var(--bg-color)', padding: '0.1rem 0.3rem', borderRadius: '4px' }}>radius</code> 기본 5.0km, <code style={{ backgroundColor: 'var(--bg-color)', padding: '0.1rem 0.3rem', borderRadius: '4px' }}>maxResults</code> 기본 500)</div>
            <div>• GET /api/meetups/location — 경계 (<code style={{ backgroundColor: 'var(--bg-color)', padding: '0.1rem 0.3rem', borderRadius: '4px' }}>minLat</code>~<code style={{ backgroundColor: 'var(--bg-color)', padding: '0.1rem 0.3rem', borderRadius: '4px' }}>maxLat</code>, <code style={{ backgroundColor: 'var(--bg-color)', padding: '0.1rem 0.3rem', borderRadius: '4px' }}>minLng</code>~<code style={{ backgroundColor: 'var(--bg-color)', padding: '0.1rem 0.3rem', borderRadius: '4px' }}>maxLng</code>)</div>
            <div>• GET /api/meetups/search — 키워드 (<code style={{ backgroundColor: 'var(--bg-color)', padding: '0.1rem 0.3rem', borderRadius: '4px' }}>keyword</code>)</div>
            <div>• GET /api/meetups/available — 참여 가능 Slice (<code style={{ backgroundColor: 'var(--bg-color)', padding: '0.1rem 0.3rem', borderRadius: '4px' }}>page</code>/<code style={{ backgroundColor: 'var(--bg-color)', padding: '0.1rem 0.3rem', borderRadius: '4px' }}>size</code> 기본 0·20, <code style={{ backgroundColor: 'var(--bg-color)', padding: '0.1rem 0.3rem', borderRadius: '4px' }}>date</code> ASC, <code style={{ backgroundColor: 'var(--bg-color)', padding: '0.1rem 0.3rem', borderRadius: '4px' }}>hasNext</code>)</div>
            <div>• GET /api/meetups/organizer/{'{organizerIdx}'} — 주최자별</div>
          </div>
        </div>

        <div className="section-card" style={{
          padding: '1.5rem',
          backgroundColor: 'var(--card-bg)',
          borderRadius: '8px',
          border: '1px solid var(--nav-border)',
          marginBottom: '1rem'
        }}>
          <h3 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>참가자 (/api/meetups/{'{meetupIdx}'}/participants)</h3>
          <div style={{ 
            color: 'var(--text-secondary)',
            lineHeight: '1.8',
            fontFamily: 'monospace',
            fontSize: '0.9rem'
          }}>
            <div>• GET /api/meetups/{'{meetupIdx}'}/participants — 목록</div>
            <div>• POST /api/meetups/{'{meetupIdx}'}/participants — 참여</div>
            <div>• DELETE /api/meetups/{'{meetupIdx}'}/participants — 참여 취소</div>
            <div>• GET /api/meetups/{'{meetupIdx}'}/participants/check — {'{ isParticipating }'}</div>
          </div>
        </div>

        <div className="section-card" style={{
          padding: '1.5rem',
          backgroundColor: 'var(--card-bg)',
          borderRadius: '8px',
          border: '1px solid var(--nav-border)'
        }}>
          <h3 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>채팅 (Chat 도메인, 모임과 별도)</h3>
          <div style={{
            color: 'var(--text-secondary)',
            lineHeight: '1.8',
            fontFamily: 'monospace',
            fontSize: '0.9rem'
          }}>
            <div>• POST /api/chat/conversations/meetup/{'{meetupIdx}'}/join?userId=… — 산책모임 채팅방 참여 (모임 참가 후 별도 호출, meetup.md 4.4)</div>
            <div>• GET /api/chat/conversations/meetup/{'{meetupIdx}'}/participant-count — 채팅 참여 인원</div>
          </div>
          <p style={{ marginTop: '0.75rem', marginBottom: 0, fontSize: '0.85rem', color: 'var(--text-secondary)', fontFamily: 'inherit', lineHeight: '1.6' }}>
            Chat REST의 사용자 식별 정책은 <strong style={{ color: 'var(--text-color)' }}>docs/domains/chat.md</strong> 4.6절과 일치하는지 배포 버전을 확인하세요(meetup 문서에는 <code style={{ backgroundColor: 'var(--bg-color)', padding: '0.1rem 0.3rem', borderRadius: '4px' }}>userId</code> 쿼리가 명시됨).
          </p>
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
            href="https://github.com/makkong1/makkong1-github.io/blob/main/docs/domains/meetup.md" 
            target="_blank"
            rel="noopener noreferrer"
            style={{ 
              color: 'var(--link-color)',
              textDecoration: 'none',
              display: 'block',
              marginBottom: '0.5rem'
            }}
          >
            → Meetup 도메인 상세 문서 보기
          </a>
          <a 
            href="https://github.com/makkong1/makkong1-github.io/blob/main/docs/domains/chat.md" 
            target="_blank"
            rel="noopener noreferrer"
            style={{ 
              color: 'var(--link-color)',
              textDecoration: 'none',
              display: 'block'
            }}
          >
            → Chat 도메인 문서 (모임 채팅·인증)
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
