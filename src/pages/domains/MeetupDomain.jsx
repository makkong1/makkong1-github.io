import MermaidDiagram from '../../components/Common/MermaidDiagram';
import TableOfContents from '../../components/Common/TableOfContents';

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
              <p style={{ lineHeight: '1.8', color: 'var(--text-secondary)', fontStyle: 'italic' }}>
                아직 구체적인 성능 최적화 작업을 진행하지 않았습니다. 향후 작업 예정입니다.
              </p>
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
              <p style={{ lineHeight: '1.8', color: 'var(--text-secondary)', fontStyle: 'italic' }}>
                아직 구체적인 성능 최적화 작업을 진행하지 않았습니다. 향후 작업 예정입니다.
              </p>
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
              <p style={{ lineHeight: '1.8', color: 'var(--text-secondary)', fontStyle: 'italic' }}>
                아직 구체적인 성능 최적화 작업을 진행하지 않았습니다. 향후 작업 예정입니다.
              </p>
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
              border: '1px solid var(--nav-border)'
            }}>
              <h3 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>동시성 제어</h3>
              <ul style={{
                listStyle: 'none',
                padding: 0,
                color: 'var(--text-secondary)',
                lineHeight: '1.8'
              }}>
                <li>• <strong style={{ color: 'var(--text-color)' }}>최대 인원 초과 참여 방지</strong>: 비관적 락 또는 UPDATE 쿼리 + 조건으로 원자적 연산</li>
                <li>• <strong style={{ color: 'var(--text-color)' }}>중복 참여 방지</strong>: Unique 제약 조건 (meetup_idx, user_idx)</li>
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
              <p style={{ lineHeight: '1.8', color: 'var(--text-secondary)', fontStyle: 'italic' }}>
                아직 구체적인 성능 최적화 작업을 진행하지 않았습니다. 향후 작업 예정입니다.
              </p>
            </div>
          </section>

          {/* 7. 얻은 교훈 / 설계 인사이트 */}
          <section id="insights" style={{ marginBottom: '3rem', scrollMarginTop: '2rem' }}>
            <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>얻은 교훈 / 설계 인사이트</h2>
            <div style={{
              padding: '1.5rem',
              backgroundColor: 'var(--card-bg)',
              borderRadius: '8px',
              border: '1px solid var(--nav-border)'
            }}>
              <p style={{ lineHeight: '1.8', color: 'var(--text-secondary)', fontStyle: 'italic' }}>
                아직 구체적인 성능 최적화 작업을 진행하지 않았습니다. 향후 작업 예정입니다.
              </p>
            </div>
          </section>

          {/* 8. Entity 구조 */}
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

          {/* 10. 보안 및 권한 체계 */}
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

          {/* 11. 다른 도메인과의 연관관계 */}
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
