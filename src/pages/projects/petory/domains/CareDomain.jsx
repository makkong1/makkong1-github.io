import MermaidDiagram from '../../../../components/Common/MermaidDiagram';
import TableOfContents from '../../../../components/Common/TableOfContents';

function CareDomain() {
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
    Users ||--o{ CareRequest : "requests"
    Pet ||--o{ CareRequest : "related"
    CareRequest ||--o{ CareApplication : "has"
    CareRequest ||--o{ CareRequestComment : "has"
    CareRequest ||--|| CareReview : "has"
    Users ||--o{ CareApplication : "applies"
    Users ||--o{ CareRequestComment : "writes"
    Users ||--o{ CareReview : "writes"
    Users ||--o{ CareReview : "receives"
    
    CareRequest {
        Long idx PK
        Long user_idx FK
        Long pet_idx FK
        String title
        String description
        LocalDateTime date
        CareRequestStatus status
        LocalDateTime createdAt
        LocalDateTime updatedAt
        Boolean isDeleted
    }
    
    CareApplication {
        Long idx PK
        Long careRequest_idx FK
        Long applicant_idx FK
        String message
        CareApplicationStatus status
        LocalDateTime createdAt
        LocalDateTime updatedAt
    }
    
    CareRequestComment {
        Long idx PK
        Long careRequest_idx FK
        Long user_idx FK
        String content
        LocalDateTime createdAt
        Boolean isDeleted
    }
    
    CareReview {
        Long idx PK
        Long careRequest_idx FK
        Long reviewer_idx FK
        Long reviewee_idx FK
        Integer rating
        String content
        LocalDateTime createdAt
    }`;

  return (
    <div style={{ padding: '2rem 0' }}>
      <div style={{ display: 'flex', gap: '2rem', alignItems: 'flex-start' }}>
        <div style={{ flex: 1 }}>
          <h1 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>펫케어 도메인</h1>
          
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
                Care 도메인은 펫케어 요청/지원 시스템을 담당합니다.
              </p>
              <p style={{ lineHeight: '1.8', color: 'var(--text-secondary)' }}>
                반려동물 돌봄이 필요한 사용자와 돌봄을 제공할 수 있는 사용자를 연결합니다.
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
              <p style={{ lineHeight: '1.8', color: 'var(--text-secondary)', fontStyle: 'italic' }}>
                아직 구체적인 성능 최적화 작업을 진행하지 않았습니다. 향후 작업 예정입니다.
              </p>
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
              <p style={{ lineHeight: '1.8', color: 'var(--text-secondary)', fontStyle: 'italic' }}>
                아직 구체적인 성능 최적화 작업을 진행하지 않았습니다. 향후 작업 예정입니다.
              </p>
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
              <p style={{ lineHeight: '1.8', color: 'var(--text-secondary)', fontStyle: 'italic' }}>
                아직 구체적인 성능 최적화 작업을 진행하지 않았습니다. 향후 작업 예정입니다.
              </p>
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
              <h3 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>현재 구현된 최적화</h3>
              <ul style={{
                listStyle: 'none',
                padding: 0,
                color: 'var(--text-secondary)',
                lineHeight: '1.8'
              }}>
                <li>• <strong style={{ color: 'var(--text-color)' }}>Fetch Join</strong>: 요청자, 펫 정보를 함께 조회</li>
                <li>• <strong style={{ color: 'var(--text-color)' }}>배치 조회</strong>: 지원자 수를 배치로 조회 (IN 절)</li>
                <li>• <strong style={{ color: 'var(--text-color)' }}>캐싱</strong>: 사용자별 평균 평점 캐싱</li>
              </ul>
            </div>
            <div className="section-card" style={{
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
                <li>• <strong style={{ color: 'var(--text-color)' }}>지원 승인 동시 처리</strong>: 트랜잭션 + 상태 체크로 1명만 승인 보장</li>
                <li>• <strong style={{ color: 'var(--text-color)' }}>스케줄러 중복 실행 방지</strong>: ShedLock 사용 (분산 환경)</li>
              </ul>
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
              <p style={{ lineHeight: '1.8', color: 'var(--text-secondary)', fontStyle: 'italic' }}>
                아직 구체적인 성능 최적화 작업을 진행하지 않았습니다. 향후 작업 예정입니다.
              </p>
            </div>
          </section>

          {/* 7. 얻은 교훈 / 설계 인사이트 */}
          <section id="insights" style={{ marginBottom: '3rem', scrollMarginTop: '2rem' }}>
            <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>얻은 교훈 / 설계 인사이트</h2>
            <div className="section-card" style={{
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
            
            <div className="section-card" style={{
              padding: '1.5rem',
              backgroundColor: 'var(--card-bg)',
              borderRadius: '8px',
              border: '1px solid var(--nav-border)',
              marginBottom: '1.5rem'
            }}>
              <h3 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>펫케어 요청 및 지원</h3>
              <div style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}>
                <p style={{ marginBottom: '0.5rem' }}>사용자가 펫케어 요청을 생성하고, 다른 사용자들이 지원할 수 있습니다.</p>
                <p style={{ marginBottom: '0.5rem' }}><strong style={{ color: 'var(--text-color)' }}>주요 기능:</strong></p>
                <ul style={{ marginLeft: '1.5rem', marginBottom: '0.5rem' }}>
                  <li>펫케어 요청 생성 (제목, 설명, 날짜, 펫 정보)</li>
                  <li>상태 관리 (OPEN → IN_PROGRESS → COMPLETED)</li>
                  <li>여러 사용자가 지원 가능</li>
                  <li>요청자가 1명만 승인</li>
                  <li>승인 시 상태 변경 (OPEN → IN_PROGRESS)</li>
                  <li>날짜 지난 요청 자동 완료 (스케줄러)</li>
                </ul>
                <p style={{ marginBottom: '0.5rem' }}><strong style={{ color: 'var(--text-color)' }}>사용자 시나리오:</strong></p>
                <ol style={{ marginLeft: '1.5rem', marginBottom: '0.5rem' }}>
                  <li>펫케어 요청 생성 (제목, 설명, 날짜, 펫 정보)</li>
                  <li>여러 사용자가 지원</li>
                  <li>요청자가 1명만 승인</li>
                  <li>승인 시 상태 변경 (OPEN → IN_PROGRESS)</li>
                </ol>
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
              <h3 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>펫케어 리뷰 시스템</h3>
              <div style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}>
                <p style={{ marginBottom: '0.5rem' }}>펫케어 완료 후 요청자가 돌봄 제공자에게 리뷰를 작성할 수 있습니다.</p>
                <p style={{ marginBottom: '0.5rem' }}><strong style={{ color: 'var(--text-color)' }}>주요 기능:</strong></p>
                <ul style={{ marginLeft: '1.5rem', marginBottom: '0.5rem' }}>
                  <li>펫케어 완료 (COMPLETED 상태) 후 리뷰 작성</li>
                  <li>평점 및 후기 관리 (평점 1-5, 내용)</li>
                  <li>평균 평점 계산 및 표시</li>
                  <li>사용자별 평균 평점 캐싱</li>
                </ul>
                <p style={{ marginBottom: '0.5rem' }}><strong style={{ color: 'var(--text-color)' }}>사용자 시나리오:</strong></p>
                <ol style={{ marginLeft: '1.5rem', marginBottom: '0.5rem' }}>
                  <li>펫케어 완료 (COMPLETED 상태)</li>
                  <li>요청자가 리뷰 작성 (평점 1-5, 내용)</li>
                  <li>평균 평점 계산 및 표시</li>
                </ol>
                <p style={{ marginTop: '0.5rem', fontStyle: 'italic', color: 'var(--text-muted)' }}>스크린샷/영상: [추가 예정]</p>
              </div>
            </div>

            <div className="section-card" style={{
              padding: '1.5rem',
              backgroundColor: 'var(--card-bg)',
              borderRadius: '8px',
              border: '1px solid var(--nav-border)'
            }}>
              <h3 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>댓글 기반 채팅</h3>
              <div style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}>
                <p style={{ marginBottom: '0.5rem' }}>댓글 작성으로 지원 의사를 표현하고, 댓글에서 1:1 채팅을 시작할 수 있습니다.</p>
                <p style={{ marginBottom: '0.5rem' }}><strong style={{ color: 'var(--text-color)' }}>주요 기능:</strong></p>
                <ul style={{ marginLeft: '1.5rem', marginBottom: '0.5rem' }}>
                  <li>댓글 작성으로 지원 의사 표현</li>
                  <li>댓글에서 "채팅하기" 버튼으로 1:1 채팅 시작</li>
                  <li>기존 채팅방이 있으면 재사용</li>
                </ul>
                <p style={{ marginTop: '0.5rem', fontStyle: 'italic', color: 'var(--text-muted)' }}>스크린샷/영상: [추가 예정]</p>
              </div>
            </div>
      </section>

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

        <div className="section-card" style={{
          padding: '1.5rem',
          backgroundColor: 'var(--card-bg)',
          borderRadius: '8px',
          border: '1px solid var(--nav-border)',
          marginBottom: '1rem'
        }}>
          <h3 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>1. CareRequest (펫케어 요청)</h3>
          <div style={{ 
            color: 'var(--text-secondary)',
            lineHeight: '1.8',
            fontFamily: 'monospace',
            fontSize: '0.9rem'
          }}>
            <div style={{ marginBottom: '0.5rem' }}><strong style={{ color: 'var(--text-color)' }}>주요 필드:</strong></div>
            <div>• idx (PK), user (요청자), pet (관련 펫, Optional)</div>
            <div>• title, description, date (돌봄 필요 날짜)</div>
            <div>• status (OPEN/IN_PROGRESS/COMPLETED/CANCELLED)</div>
            <div>• createdAt, updatedAt, isDeleted</div>
            <div style={{ marginTop: '0.5rem' }}><strong style={{ color: 'var(--text-color)' }}>연관관계:</strong></div>
            <div>• ManyToOne → Users, Pet</div>
            <div>• OneToMany → CareApplication, CareRequestComment</div>
            <div>• OneToOne → CareReview</div>
          </div>
        </div>

        <div className="section-card" style={{
          padding: '1.5rem',
          backgroundColor: 'var(--card-bg)',
          borderRadius: '8px',
          border: '1px solid var(--nav-border)',
          marginBottom: '1rem'
        }}>
          <h3 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>2. CareApplication (펫케어 지원)</h3>
          <div style={{ 
            color: 'var(--text-secondary)',
            lineHeight: '1.8',
            fontFamily: 'monospace',
            fontSize: '0.9rem'
          }}>
            <div style={{ marginBottom: '0.5rem' }}><strong style={{ color: 'var(--text-color)' }}>주요 필드:</strong></div>
            <div>• idx (PK), careRequest (요청), applicant (지원자)</div>
            <div>• message (지원 메시지), status (PENDING/APPROVED/REJECTED)</div>
            <div>• createdAt, updatedAt</div>
            <div style={{ marginTop: '0.5rem' }}><strong style={{ color: 'var(--text-color)' }}>연관관계:</strong></div>
            <div>• ManyToOne → CareRequest, Users</div>
          </div>
        </div>

        <div className="section-card" style={{
          padding: '1.5rem',
          backgroundColor: 'var(--card-bg)',
          borderRadius: '8px',
          border: '1px solid var(--nav-border)',
          marginBottom: '1rem'
        }}>
          <h3 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>3. CareRequestComment (펫케어 댓글)</h3>
          <div style={{ 
            color: 'var(--text-secondary)',
            lineHeight: '1.8',
            fontFamily: 'monospace',
            fontSize: '0.9rem'
          }}>
            <div style={{ marginBottom: '0.5rem' }}><strong style={{ color: 'var(--text-color)' }}>주요 필드:</strong></div>
            <div>• idx (PK), careRequest (요청), user (작성자)</div>
            <div>• content, createdAt, isDeleted</div>
            <div style={{ marginTop: '0.5rem' }}><strong style={{ color: 'var(--text-color)' }}>연관관계:</strong></div>
            <div>• ManyToOne → CareRequest, Users</div>
          </div>
        </div>

        <div className="section-card" style={{
          padding: '1.5rem',
          backgroundColor: 'var(--card-bg)',
          borderRadius: '8px',
          border: '1px solid var(--nav-border)'
        }}>
          <h3 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>4. CareReview (펫케어 리뷰)</h3>
          <div style={{ 
            color: 'var(--text-secondary)',
            lineHeight: '1.8',
            fontFamily: 'monospace',
            fontSize: '0.9rem'
          }}>
            <div style={{ marginBottom: '0.5rem' }}><strong style={{ color: 'var(--text-color)' }}>주요 필드:</strong></div>
            <div>• idx (PK), careRequest (요청, OneToOne)</div>
            <div>• reviewer (리뷰 작성자, 요청자), reviewee (리뷰 대상, 돌봄 제공자)</div>
            <div>• rating (1-5점), content, createdAt</div>
            <div style={{ marginTop: '0.5rem' }}><strong style={{ color: 'var(--text-color)' }}>연관관계:</strong></div>
            <div>• OneToOne → CareRequest</div>
            <div>• ManyToOne → Users (리뷰 작성자 및 대상)</div>
          </div>
        </div>
      </section>

          <section id="services" style={{ marginBottom: '3rem', scrollMarginTop: '2rem' }}>
            <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>Service 주요 기능</h2>
        
        <div className="section-card" style={{
          padding: '1.5rem',
          backgroundColor: 'var(--card-bg)',
          borderRadius: '8px',
          border: '1px solid var(--nav-border)',
          marginBottom: '1rem'
        }}>
          <h3 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>CareRequestService</h3>
          <div style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}>
            <div style={{ marginBottom: '0.5rem' }}><strong style={{ color: 'var(--text-color)' }}>펫케어 요청 관리:</strong></div>
            <div>• createCareRequest() - 펫케어 요청 생성</div>
            <div>• getAllCareRequests() - 요청 목록 조회 (페이징, 상태 필터)</div>
            <div>• getCareRequest() - 요청 상세 조회</div>
            <div>• updateCareRequest() - 요청 수정</div>
            <div>• deleteCareRequest() - 요청 삭제</div>
            <div>• getMyCareRequests() - 내 펫케어 요청 조회</div>
            <div style={{ marginTop: '1rem', marginBottom: '0.5rem' }}><strong style={{ color: 'var(--text-color)' }}>펫케어 지원 관리:</strong></div>
            <div>• applyCareRequest() - 지원하기</div>
            <div>• cancelApplication() - 지원 취소</div>
            <div>• getApplications() - 지원자 목록 조회</div>
            <div>• approveApplication() - 지원 승인 (요청자만 가능, 1명만)</div>
            <div>• rejectApplication() - 지원 거절</div>
            <div style={{ marginTop: '1rem', marginBottom: '0.5rem' }}><strong style={{ color: 'var(--text-color)' }}>상태 관리:</strong></div>
            <div>• startCare() - 돌봄 시작 (IN_PROGRESS)</div>
            <div>• completeCare() - 돌봄 완료 (COMPLETED)</div>
            <div>• cancelRequest() - 요청 취소 (CANCELLED)</div>
          </div>
        </div>

        <div className="section-card" style={{
          padding: '1.5rem',
          backgroundColor: 'var(--card-bg)',
          borderRadius: '8px',
          border: '1px solid var(--nav-border)',
          marginBottom: '1rem'
        }}>
          <h3 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>CareRequestCommentService</h3>
          <div style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}>
            <div>• getComments() - 댓글 목록 조회</div>
            <div>• createComment() - 댓글 작성</div>
            <div>• updateComment() - 댓글 수정</div>
            <div>• deleteComment() - 댓글 삭제</div>
          </div>
        </div>

        <div className="section-card" style={{
          padding: '1.5rem',
          backgroundColor: 'var(--card-bg)',
          borderRadius: '8px',
          border: '1px solid var(--nav-border)'
        }}>
          <h3 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>CareReviewService</h3>
          <div style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}>
            <div>• createReview() - 리뷰 작성 (COMPLETED 상태에서만)</div>
            <div>• getReviewByRequest() - 요청별 리뷰 조회</div>
            <div>• getReviewsByUser() - 사용자별 리뷰 (받은 리뷰)</div>
            <div>• getAverageRating() - 평균 평점 조회 (캐싱)</div>
            <div>• updateReview() - 리뷰 수정</div>
            <div>• deleteReview() - 리뷰 삭제</div>
          </div>
        </div>
      </section>

          {/* 10. 보안 및 권한 체계 */}
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
                <li>• <strong style={{ color: 'var(--text-color)' }}>작성자만 수정/삭제 가능</strong>: 요청자만 본인 요청 수정/삭제 가능</li>
                <li>• <strong style={{ color: 'var(--text-color)' }}>승인 권한</strong>: 요청자만 지원 승인/거절 가능</li>
                <li>• <strong style={{ color: 'var(--text-color)' }}>리뷰 작성 권한</strong>: 요청자만 리뷰 작성 가능</li>
              </ul>
            </div>
          </section>

          <section id="relationships" style={{ marginBottom: '3rem', scrollMarginTop: '2rem' }}>
            <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>다른 도메인과의 연관관계</h2>
        
        <div className="section-card" style={{
          padding: '1.5rem',
          backgroundColor: 'var(--card-bg)',
          borderRadius: '8px',
          border: '1px solid var(--nav-border)'
        }}>
          <div style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}>
            <div style={{ marginBottom: '0.5rem' }}><strong style={{ color: 'var(--text-color)' }}>User 도메인:</strong></div>
            <div>• Users가 펫케어 요청 생성, 펫케어에 지원, 리뷰 작성/받음</div>
            <div style={{ marginTop: '1rem', marginBottom: '0.5rem' }}><strong style={{ color: 'var(--text-color)' }}>Pet 도메인:</strong></div>
            <div>• CareRequest에 Pet 연결 (어떤 반려동물을 돌봐줄지)</div>
            <div style={{ marginTop: '1rem', marginBottom: '0.5rem' }}><strong style={{ color: 'var(--text-color)' }}>File 도메인:</strong></div>
            <div>• CareRequest에 펫 사진 첨부</div>
            <div style={{ marginTop: '1rem', marginBottom: '0.5rem' }}><strong style={{ color: 'var(--text-color)' }}>Notification 도메인:</strong></div>
            <div>• 지원 시 요청자에게 알림, 승인/거절 시 지원자에게 알림, 리뷰 작성 시 대상자에게 알림</div>
            <div style={{ marginTop: '1rem', marginBottom: '0.5rem' }}><strong style={{ color: 'var(--text-color)' }}>Report 도메인:</strong></div>
            <div>• 부적절한 요청/댓글 신고</div>
            <div style={{ marginTop: '1rem', marginBottom: '0.5rem' }}><strong style={{ color: 'var(--text-color)' }}>Chat 도메인:</strong></div>
            <div>• 댓글에서 "채팅하기" 버튼으로 1:1 채팅 시작</div>
          </div>
        </div>
      </section>

          <section id="api" style={{ marginBottom: '3rem', scrollMarginTop: '2rem' }}>
            <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>API 엔드포인트</h2>
        
        <div className="section-card" style={{
          padding: '1.5rem',
          backgroundColor: 'var(--card-bg)',
          borderRadius: '8px',
          border: '1px solid var(--nav-border)',
          marginBottom: '1rem'
        }}>
          <h3 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>펫케어 요청 (/api/care/requests)</h3>
          <div style={{ 
            color: 'var(--text-secondary)',
            lineHeight: '1.8',
            fontFamily: 'monospace',
            fontSize: '0.9rem'
          }}>
            <div>• GET / - 요청 목록 (페이징, 상태 필터)</div>
            <div>• GET /{'{id}'} - 요청 상세</div>
            <div>• POST / - 요청 생성</div>
            <div>• PUT /{'{id}'} - 요청 수정</div>
            <div>• DELETE /{'{id}'} - 요청 삭제</div>
            <div>• GET /me - 내 요청 목록</div>
            <div>• GET /applied - 내가 지원한 요청</div>
          </div>
        </div>

        <div className="section-card" style={{
          padding: '1.5rem',
          backgroundColor: 'var(--card-bg)',
          borderRadius: '8px',
          border: '1px solid var(--nav-border)',
          marginBottom: '1rem'
        }}>
          <h3 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>펫케어 지원 (/api/care/requests/{'{requestId}'}/applications)</h3>
          <div style={{ 
            color: 'var(--text-secondary)',
            lineHeight: '1.8',
            fontFamily: 'monospace',
            fontSize: '0.9rem'
          }}>
            <div>• GET / - 지원자 목록</div>
            <div>• POST / - 지원하기</div>
            <div>• PUT /{'{applicationId}'}/approve - 승인</div>
            <div>• PUT /{'{applicationId}'}/reject - 거절</div>
            <div>• DELETE /{'{applicationId}'} - 지원 취소</div>
          </div>
        </div>

        <div className="section-card" style={{
          padding: '1.5rem',
          backgroundColor: 'var(--card-bg)',
          borderRadius: '8px',
          border: '1px solid var(--nav-border)',
          marginBottom: '1rem'
        }}>
          <h3 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>펫케어 상태 (/api/care/requests/{'{requestId}'}/status)</h3>
          <div style={{ 
            color: 'var(--text-secondary)',
            lineHeight: '1.8',
            fontFamily: 'monospace',
            fontSize: '0.9rem'
          }}>
            <div>• PUT /start - 돌봄 시작</div>
            <div>• PUT /complete - 돌봄 완료</div>
            <div>• PUT /cancel - 요청 취소</div>
          </div>
        </div>

        <div className="section-card" style={{
          padding: '1.5rem',
          backgroundColor: 'var(--card-bg)',
          borderRadius: '8px',
          border: '1px solid var(--nav-border)',
          marginBottom: '1rem'
        }}>
          <h3 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>펫케어 댓글 (/api/care/requests/{'{requestId}'}/comments)</h3>
          <div style={{ 
            color: 'var(--text-secondary)',
            lineHeight: '1.8',
            fontFamily: 'monospace',
            fontSize: '0.9rem'
          }}>
            <div>• GET / - 댓글 목록</div>
            <div>• POST / - 댓글 작성</div>
            <div>• PUT /{'{commentId}'} - 댓글 수정</div>
            <div>• DELETE /{'{commentId}'} - 댓글 삭제</div>
          </div>
        </div>

        <div className="section-card" style={{
          padding: '1.5rem',
          backgroundColor: 'var(--card-bg)',
          borderRadius: '8px',
          border: '1px solid var(--nav-border)'
        }}>
          <h3 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>펫케어 리뷰 (/api/care/reviews)</h3>
          <div style={{ 
            color: 'var(--text-secondary)',
            lineHeight: '1.8',
            fontFamily: 'monospace',
            fontSize: '0.9rem'
          }}>
            <div>• POST / - 리뷰 작성</div>
            <div>• GET /request/{'{requestId}'} - 요청별 리뷰</div>
            <div>• GET /user/{'{userId}'} - 사용자별 리뷰 (받은 리뷰)</div>
            <div>• GET /user/{'{userId}'}/rating - 평균 평점</div>
            <div>• PUT /{'{reviewId}'} - 리뷰 수정</div>
            <div>• DELETE /{'{reviewId}'} - 리뷰 삭제</div>
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
            href="https://github.com/makkong1/makkong1-github.io/blob/main/docs/domains/care.md" 
            target="_blank"
            rel="noopener noreferrer"
            style={{ 
              color: 'var(--link-color)',
              textDecoration: 'none'
            }}
          >
            → Care 도메인 상세 문서 보기
          </a>
        </div>
          </section>
        </div>
        <TableOfContents sections={sections} />
      </div>
    </div>
  );
}

export default CareDomain;
