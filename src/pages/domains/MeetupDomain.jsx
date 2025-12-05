import MermaidDiagram from '../../components/Common/MermaidDiagram';
import TableOfContents from '../../components/Common/TableOfContents';

function MeetupDomain() {
  const sections = [
    { id: 'intro', title: '도메인 소개' },
    { id: 'features', title: '주요 기능' },
    { id: 'entities', title: 'Entity 구조' },
    { id: 'services', title: 'Service 주요 기능' },
    { id: 'business', title: '비즈니스 로직' },
    { id: 'concurrency', title: '동시성 제어' },
    { id: 'performance', title: '성능 최적화' },
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

  return (
    <div style={{ padding: '2rem 0' }}>
      <div style={{ display: 'flex', gap: '2rem', alignItems: 'flex-start' }}>
        <div style={{ flex: 1 }}>
          <h1 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>모임 도메인</h1>
          
          <section id="intro" style={{ marginBottom: '3rem', scrollMarginTop: '2rem' }}>
            <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>도메인 소개</h2>
        <p style={{ lineHeight: '1.8', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
          오프라인 반려동물 모임 생성 및 참여 관리 도메인입니다.
        </p>
        <p style={{ lineHeight: '1.8', color: 'var(--text-secondary)' }}>
          모임 생성, 참여자 관리, 최대 인원 제한, 위치 기반 검색 기능을 제공합니다.
        </p>
      </section>

          <section id="features" style={{ marginBottom: '3rem', scrollMarginTop: '2rem' }}>
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
            <h3 style={{ marginBottom: '0.5rem', color: 'var(--text-color)' }}>모임 생성</h3>
            <ul style={{ 
              listStyle: 'none', 
              padding: 0,
              color: 'var(--text-secondary)',
              lineHeight: '1.8'
            }}>
              <li>• 모임 제목, 설명, 장소, 일시</li>
              <li>• 최대 인원 설정</li>
              <li>• 주최자 정보</li>
              <li>• 위도/경도 좌표 저장</li>
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
              <li>• 모임 참여/취소</li>
              <li>• 현재 참여자 수 관리</li>
              <li>• 최대 인원 초과 방지</li>
              <li>• 중복 참여 방지 (Unique 제약)</li>
            </ul>
          </div>

          <div style={{
            padding: '1.5rem',
            backgroundColor: 'var(--card-bg)',
            borderRadius: '8px',
            border: '1px solid var(--nav-border)'
          }}>
            <h3 style={{ marginBottom: '0.5rem', color: 'var(--text-color)' }}>상태 관리</h3>
            <ul style={{ 
              listStyle: 'none', 
              padding: 0,
              color: 'var(--text-secondary)',
              lineHeight: '1.8'
            }}>
              <li>• RECRUITING (모집 중)</li>
              <li>• CONFIRMED (확정)</li>
              <li>• COMPLETED (완료)</li>
              <li>• CANCELLED (취소)</li>
            </ul>
          </div>

          <div style={{
            padding: '1.5rem',
            backgroundColor: 'var(--card-bg)',
            borderRadius: '8px',
            border: '1px solid var(--nav-border)'
          }}>
            <h3 style={{ marginBottom: '0.5rem', color: 'var(--text-color)' }}>동시성 제어</h3>
            <ul style={{ 
              listStyle: 'none', 
              padding: 0,
              color: 'var(--text-secondary)',
              lineHeight: '1.8'
            }}>
              <li>• 최대 인원 초과 방지</li>
              <li>• 낙관적/비관적 락 고려</li>
              <li>• UPDATE 쿼리 + 조건</li>
            </ul>
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

          <section id="business" style={{ marginBottom: '3rem', scrollMarginTop: '2rem' }}>
            <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>비즈니스 로직</h2>
        
        <div style={{
          padding: '1.5rem',
          backgroundColor: 'var(--card-bg)',
          borderRadius: '8px',
          border: '1px solid var(--nav-border)',
          marginBottom: '1rem'
        }}>
          <h3 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>모임 생애주기</h3>
          <div style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}>
            <div><strong style={{ color: 'var(--text-color)' }}>1. RECRUITING (모집 중)</strong></div>
            <div>• 모임 생성 시 기본 상태, 참여자 모집 중, 주최자가 수정/취소 가능</div>
            <div style={{ marginTop: '0.5rem' }}><strong style={{ color: 'var(--text-color)' }}>2. CONFIRMED (확정)</strong></div>
            <div>• 최소 인원 도달 시 자동 변경 또는 주최자가 수동 확정, 참여자 추가 가능 (최대 인원까지)</div>
            <div style={{ marginTop: '0.5rem' }}><strong style={{ color: 'var(--text-color)' }}>3. COMPLETED (완료)</strong></div>
            <div>• 모임 일시가 지나면 자동 완료 또는 주최자가 수동 완료, 더 이상 참여 불가</div>
            <div style={{ marginTop: '0.5rem' }}><strong style={{ color: 'var(--text-color)' }}>4. CANCELLED (취소)</strong></div>
            <div>• 주최자가 취소, 모든 참여자에게 알림 발송, 참여자 목록은 유지 (이력)</div>
          </div>
        </div>

        <div style={{
          padding: '1.5rem',
          backgroundColor: 'var(--card-bg)',
          borderRadius: '8px',
          border: '1px solid var(--nav-border)'
        }}>
          <h3 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>참여 규칙</h3>
          <ul style={{ 
            listStyle: 'none', 
            padding: 0,
            color: 'var(--text-secondary)',
            lineHeight: '1.8'
          }}>
            <li>• <strong style={{ color: 'var(--text-color)' }}>최대 인원 제한</strong>: currentParticipants&gt;= maxParticipants 시 참여 불가</li>
            <li>• <strong style={{ color: 'var(--text-color)' }}>중복 참여 방지</strong>: 같은 사용자가 같은 모임에 중복 참여 불가 (Unique 제약)</li>
            <li>• <strong style={{ color: 'var(--text-color)' }}>주최자 참여</strong>: 주최자는 자동으로 참여자 목록에 포함</li>
          </ul>
        </div>
      </section>

          <section id="concurrency" style={{ marginBottom: '3rem', scrollMarginTop: '2rem' }}>
            <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>동시성 제어</h2>
        
        <div style={{
          padding: '1.5rem',
          backgroundColor: 'var(--card-bg)',
          borderRadius: '8px',
          border: '1px solid var(--nav-border)'
        }}>
          <h3 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>최대 인원 초과 참여 방지</h3>
          <div style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}>
            <div style={{ marginBottom: '0.5rem' }}><strong style={{ color: 'var(--text-color)' }}>문제:</strong></div>
            <div>모임 최대 인원: 10명, 현재 인원: 9명일 때 사용자 A, B가 동시에 참여 시도 → 11명 (기대값: 10명)</div>
            <div style={{ marginTop: '1rem', marginBottom: '0.5rem' }}><strong style={{ color: 'var(--text-color)' }}>해결책 1: 비관적 락</strong></div>
            <div>@Lock(LockModeType.PESSIMISTIC_WRITE)로 모임 조회</div>
            <div style={{ marginTop: '0.5rem' }}><strong style={{ color: 'var(--text-color)' }}>해결책 2: 낙관적 락</strong></div>
            <div>@Version으로 버전 관리, OptimisticLockException 처리</div>
            <div style={{ marginTop: '0.5rem' }}><strong style={{ color: 'var(--text-color)' }}>해결책 3: UPDATE 쿼리 + 조건</strong></div>
            <div>UPDATE 쿼리에서 currentParticipants < maxParticipants 조건으로 원자적 연산></maxParticipants></div>
          </div>
        </div>
      </section>

          <section id="performance" style={{ marginBottom: '3rem', scrollMarginTop: '2rem' }}>
            <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>성능 최적화</h2>
        
        <div style={{
          padding: '1.5rem',
          backgroundColor: 'var(--card-bg)',
          borderRadius: '8px',
          border: '1px solid var(--nav-border)',
          marginBottom: '1rem'
        }}>
          <h3 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>인덱싱</h3>
          <ul style={{ 
            listStyle: 'none', 
            padding: 0,
            color: 'var(--text-secondary)',
            lineHeight: '1.8',
            fontFamily: 'monospace',
            fontSize: '0.9rem'
          }}>
            <li>• 모임 상태별 조회 인덱스</li>
            <li>• 주최자별 모임 인덱스</li>
            <li>• 위치 기반 검색 (Spatial Index)</li>
            <li>• 참여자 조회 인덱스</li>
            <li>• 중복 참여 방지 (Unique Index)</li>
          </ul>
        </div>

        <div style={{
          padding: '1.5rem',
          backgroundColor: 'var(--card-bg)',
          borderRadius: '8px',
          border: '1px solid var(--nav-border)'
        }}>
          <h3 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>N+1 문제 해결</h3>
          <ul style={{ 
            listStyle: 'none', 
            padding: 0,
            color: 'var(--text-secondary)',
            lineHeight: '1.8'
          }}>
            <li>• <strong style={{ color: 'var(--text-color)' }}>Fetch Join</strong>: 참여자와 사용자 정보를 함께 조회</li>
          </ul>
        </div>
      </section>

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
