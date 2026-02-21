import { Link } from 'react-router-dom';
import MermaidDiagram from '../../../../components/Common/MermaidDiagram';
import TableOfContents from '../../../../components/Common/TableOfContents';

function CareDomain() {
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

  const raceConditionSequence = `sequenceDiagram
    participant UserA as 사용자 A
    participant UserB as 제공자 B
    participant Service as ConversationService
    participant DB as MySQL

    Note over UserA,UserB: 동시에 거래 확정 버튼 클릭

    par 동시 요청
        UserA->>Service: confirmCareDeal() (Tx A)
        UserB->>Service: confirmCareDeal() (Tx B)
    end

    Service->>DB: Tx A: 내 상태 '확정' 변경
    Service->>DB: Tx B: 내 상태 '확정' 변경

    Note over Service,DB: 격리 수준(Isolation)으로 인해<br/>상대방의 변경사항 안 보임

    Service->>DB: Tx A: 전체 확정 여부 확인? -> False (B 미확정)
    Service->>DB: Tx B: 전체 확정 여부 확인? -> False (A 미확정)

    Service-->>UserA: 완료 (상태 변경 없음)
    Service-->>UserB: 완료 (상태 변경 없음)

    Note over DB: 결과: 둘 다 확정했으나<br/>상태는 여전히 OPEN (Stuck)`;

  const pessimisticLockSequence = `sequenceDiagram
    participant UserA as 사용자 A
    participant UserB as 제공자 B
    participant Service as ConversationService
    participant DB as MySQL

    Note over UserA,UserB: 동시에 거래 확정 버튼 클릭

    UserA->>Service: confirmCareDeal() (Tx A)
    Service->>DB: SELECT ... FOR UPDATE (Lock 획득)
    
    UserB->>Service: confirmCareDeal() (Tx B)
    Service->>DB: SELECT ... FOR UPDATE (Lock 대기)
    
    Note over Service,DB: Tx A 먼저 수행
    Service->>DB: Tx A: 내 상태 '확정' 변경
    Service->>DB: Tx A: 전체 확정 여부 확인? -> False
    Service->>DB: Tx A: 커밋 & Lock 반납
    
    Note over Service,DB: Tx B 수행 (대기 해제)
    Service->>DB: Tx B: Lock 획득 (최신 데이터 조회)
    Service->>DB: Tx B: 내 상태 '확정' 변경
    Service->>DB: Tx B: 전체 확정 여부 확인? -> True (A 확정 보임)
    
    Service->>DB: Tx B: CareRequest 상태 IN_PROGRESS 변경
    Service-->>UserB: 완료 및 상태 변경 성공`;

  return (
    <div className="domain-page-wrapper" style={{ padding: '2rem 0' }}>
      <div className="domain-page-container" style={{ display: 'flex', gap: '2rem', alignItems: 'flex-start' }}>
        <div className="domain-page-content" style={{ flex: 1 }}>
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
                  <li>• 펫케어 요청 목록 조회: <strong style={{ color: 'var(--text-color)' }}>2400개 쿼리 → 4-5개 쿼리</strong> (99.8% 감소)</li>
                  <li>• 실행 시간: <strong style={{ color: 'var(--text-color)' }}>1084ms → 66ms</strong> (94% 감소)</li>
                  <li>• 메모리 사용량: <strong style={{ color: 'var(--text-color)' }}>21MB → 6MB</strong> (71% 감소)</li>
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
              <h3 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>1. 펫케어 요청 및 지원</h3>
              <div style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}>
                <p style={{ marginBottom: '0.5rem' }}>사용자가 펫케어 요청을 생성하고, 다른 사용자들이 지원할 수 있습니다.</p>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  <li>• 펫케어 요청 생성 (제목, 설명, 날짜, 펫 정보) - 이메일 인증 필요</li>
                  <li>• 여러 사용자가 지원 가능</li>
                  <li>• 요청자가 1명만 승인</li>
                  <li>• 승인 시 상태 변경 (OPEN → IN_PROGRESS)</li>
                  <li>• 날짜 지난 요청 자동 완료 (스케줄러)</li>
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
              <h3 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>2. 채팅 후 거래 확정 및 완료</h3>
              <div style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}>
                <p style={{ marginBottom: '0.5rem' }}>펫케어 요청자가 서비스 제공자와 채팅을 시작한 후, 양쪽 모두 거래를 확정하면 펫케어 서비스가 시작됩니다.</p>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  <li>• 서비스 제공자가 "채팅하기" 버튼 클릭하여 채팅방 생성</li>
                  <li>• 채팅방에서 가격, 시간, 서비스 내용 등 조건 협의</li>
                  <li>• 양쪽 모두 "거래 확정" 버튼 클릭 시 자동으로 CareApplication 생성 및 ACCEPTED 상태로 설정</li>
                  <li>• CareRequest 상태 변경 (OPEN → IN_PROGRESS)</li>
                  <li>• <strong style={{ color: 'var(--text-color)' }}>펫코인 차감 및 에스크로 생성</strong>: 요청자가 설정한 코인만큼 차감되어 에스크로에 임시 보관</li>
                  <li>• 서비스 완료 후 채팅방에서 "서비스 완료" 버튼 클릭</li>
                  <li>• <strong style={{ color: 'var(--text-color)' }}>펫코인 지급</strong>: 에스크로에 보관된 코인이 제공자에게 지급됨</li>
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
              <h3 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>3. 펫코인 결제 시스템</h3>
              <div style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}>
                <p style={{ marginBottom: '0.5rem' }}>펫케어 거래를 위한 내부 결제 단위인 '펫코인'을 사용하여 안전한 거래를 보장합니다.</p>
                
                <div style={{
                  padding: '1rem',
                  backgroundColor: 'var(--bg-color)',
                  borderRadius: '6px',
                  marginBottom: '1rem'
                }}>
                  <h4 style={{ marginBottom: '0.75rem', color: 'var(--text-color)', fontSize: '0.95rem' }}>펫코인 거래 흐름</h4>
                  <ol style={{
                    listStyle: 'none',
                    padding: 0,
                    margin: 0,
                    fontSize: '0.9rem',
                    lineHeight: '1.8',
                    counterReset: 'step-counter'
                  }}>
                    <li style={{ counterIncrement: 'step-counter', marginBottom: '0.5rem' }}>
                      <strong style={{ color: 'var(--text-color)' }}>1. 코인 충전:</strong> 요청자(보호자)가 펫코인을 충전
                    </li>
                    <li style={{ counterIncrement: 'step-counter', marginBottom: '0.5rem' }}>
                      <strong style={{ color: 'var(--text-color)' }}>2. 요청 생성:</strong> 보호자가 펫케어 요청 작성 시 제시할 코인 가격 설정 (최소 코인 제한 적용)
                    </li>
                    <li style={{ counterIncrement: 'step-counter', marginBottom: '0.5rem' }}>
                      <strong style={{ color: 'var(--text-color)' }}>3. 거래 확정:</strong> 양쪽 모두 거래 확정 시 요청자 코인 차감 → 에스크로(임시 보관) 상태로 전환
                    </li>
                    <li style={{ counterIncrement: 'step-counter', marginBottom: '0.5rem' }}>
                      <strong style={{ color: 'var(--text-color)' }}>4. 서비스 진행:</strong> IN_PROGRESS 상태로 실제 펫케어 서비스 진행
                    </li>
                    <li style={{ counterIncrement: 'step-counter', marginBottom: '0.5rem' }}>
                      <strong style={{ color: 'var(--text-color)' }}>5. 거래 완료:</strong> 날짜 경과 또는 수동 완료 처리 시 에스크로된 코인을 제공자에게 지급
                    </li>
                  </ol>
                </div>

                <div style={{
                  padding: '1rem',
                  backgroundColor: 'var(--bg-color)',
                  borderRadius: '6px',
                  marginBottom: '1rem'
                }}>
                  <h4 style={{ marginBottom: '0.75rem', color: 'var(--text-color)', fontSize: '0.95rem' }}>가격 정책</h4>
                  <ul style={{
                    listStyle: 'none',
                    padding: 0,
                    margin: 0,
                    fontSize: '0.9rem',
                    lineHeight: '1.8'
                  }}>
                    <li>• <strong style={{ color: 'var(--text-color)' }}>자유 시장 구조:</strong> 보호자가 직접 코인 가격 입력 (강제 고정 가격 없음)</li>
                    <li>• <strong style={{ color: 'var(--text-color)' }}>최소 코인 제한:</strong> 시간당 최소 코인 설정으로 비정상적으로 낮은 가격 방지</li>
                    <li>• <strong style={{ color: 'var(--text-color)' }}>가격 가이드라인:</strong> 조건 기반 추천 범위 노출 (돌봄 시간, 펫 종류/크기, 지역 기준)</li>
                    <li>• <strong style={{ color: 'var(--text-color)' }}>가격 수정 제한:</strong> 요청 등록 후 N시간 내 1회 수정 가능, 지원자가 1명 이상 발생하면 수정 불가</li>
                  </ul>
                </div>

                <div style={{
                  padding: '1rem',
                  backgroundColor: 'var(--bg-color)',
                  borderRadius: '6px',
                  border: '1px solid var(--link-color)'
                }}>
                  <a
                    href="https://github.com/makkong1/makkong1-github.io/blob/main/docs/architecture/펫케어 코인 관련 흐름.md"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      color: 'var(--link-color)',
                      textDecoration: 'none',
                      fontWeight: 'bold',
                      display: 'inline-block'
                    }}
                  >
                    → 펫코인 거래 흐름 상세 문서 보기
                  </a>
                </div>
              </div>
            </div>

            <div className="section-card" style={{
              padding: '1.5rem',
              backgroundColor: 'var(--card-bg)',
              borderRadius: '8px',
              border: '1px solid var(--nav-border)',
              marginBottom: '1rem'
            }}>
              <h3 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>4. 펫케어 리뷰 시스템</h3>
              <div style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}>
                <p style={{ marginBottom: '0.5rem' }}>펫케어 지원이 승인된 후 요청자가 돌봄 제공자에게 리뷰를 작성할 수 있습니다.</p>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  <li>• 펫케어 지원 승인 (CareApplication 상태가 ACCEPTED)</li>
                  <li>• 요청자가 리뷰 작성 (평점 1-5, 내용)</li>
                  <li>• 중복 리뷰 방지 (한 CareApplication당 1개의 리뷰만 작성 가능)</li>
                  <li>• 평균 평점 계산 및 표시</li>
                </ul>
              </div>
            </div>

            <div className="section-card" style={{
              padding: '1.5rem',
              backgroundColor: 'var(--card-bg)',
              borderRadius: '8px',
              border: '1px solid var(--nav-border)'
            }}>
              <h3 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>5. 펫케어 요청 댓글</h3>
              <div style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}>
                <p style={{ marginBottom: '0.5rem' }}>SERVICE_PROVIDER 역할의 사용자만 펫케어 요청에 댓글을 작성할 수 있습니다.</p>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  <li>• SERVICE_PROVIDER 역할 사용자가 펫케어 요청 확인</li>
                  <li>• 댓글 작성 (파일 첨부 가능 - 첫 번째 파일만 저장됨)</li>
                  <li>• 댓글 작성 시 요청자에게 알림 발송 (단, 작성자가 요청자가 아닌 경우에만)</li>
                  <li>• 댓글 삭제 시 Soft Delete 적용</li>
                </ul>
              </div>
            </div>
          </section>

          {/* 3. 트러블슈팅 */}
          <section id="troubleshooting" style={{ marginBottom: '3rem', scrollMarginTop: '2rem' }}>
            <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>트러블슈팅</h2>
            
            {/* Part 1. 펫케어 거래 확정 동시성 문제 */}
            <div className="section-card" style={{
              padding: '1.5rem',
              backgroundColor: 'var(--card-bg)',
              borderRadius: '8px',
              border: '1px solid var(--nav-border)',
              marginBottom: '1rem'
            }}>
              <h3 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>Part 1. [Data Integrity] 거래 확정 동시성 문제 (Race Condition)</h3>
              <div style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}>
                <p style={{ marginBottom: '0.5rem' }}>
                  <strong style={{ color: 'var(--text-color)' }}>문제:</strong> <code>confirmCareDeal()</code> 동시 호출 시 상태 변경이 누락되는 <strong>Stuck State</strong> 발생 (데이터 정합성 이슈)
                </p>
                <div style={{ marginBottom: '1.5rem' }}>
                  <MermaidDiagram chart={raceConditionSequence} />
                </div>

                <h4 style={{ color: 'var(--text-color)', fontSize: '1rem', marginTop: '1.5rem', marginBottom: '1rem' }}>해결: 비관적 락 (Pessimistic Lock)</h4>
                <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 1rem 0' }}>
                  <li>• DB단에서 <code>SELECT ... FOR UPDATE</code>로 순차 처리 강제</li>
                  <li>• 데이터 정합성을 최우선으로 확보하기 위해 적용</li>
                </ul>
                <div style={{ marginBottom: '1rem' }}>
                  <MermaidDiagram chart={pessimisticLockSequence} />
                </div>
              </div>
            </div>

            {/* Part 2. 펫케어 요청 목록 조회 최적화 */}
            <div className="section-card" style={{
              padding: '1.5rem',
              backgroundColor: 'var(--card-bg)',
              borderRadius: '8px',
              border: '1px solid var(--nav-border)',
              marginBottom: '1rem'
            }}>
              <h3 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>Part 2. [Performance] 요청 목록 조회 최적화 (N+1)</h3>
              <div style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}>
                <p style={{ marginBottom: '0.5rem' }}><strong style={{ color: 'var(--text-color)' }}>상황:</strong> 데이터 정합성 확보 후, 대량 조회 시 발생하는 성능 저하 해결</p>
                <ul style={{ listStyle: 'none', padding: 0, margin: '0.5rem 0' }}>
                  <li>• <strong>문제:</strong> 목록 조회 1회에 연관 데이터 조회 2400회 발생 (N+1)</li>
                  <li>• <strong>해결:</strong> <code>Fetch Join</code>(Entity) 및 <code>Batch Size</code>(Collection) 적용</li>
                  <li>• <strong>성과:</strong> 쿼리 2400개 → 5개 (99.8% 감소), 응답속도 94% 개선</li>
                </ul>
                <div style={{
                  marginTop: '1rem',
                  padding: '1rem',
                  backgroundColor: 'var(--bg-color)',
                  borderRadius: '6px',
                  border: '1px solid var(--link-color)'
                }}>
                  <Link
                    to="/domains/care/optimization"
                    style={{
                      color: 'var(--link-color)',
                      textDecoration: 'none',
                      fontWeight: 'bold',
                      display: 'inline-block'
                    }}
                  >
                    → [Performance] 최적화 과정 상세 보기
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
                <p style={{ marginBottom: '0.5rem' }}><strong style={{ color: 'var(--text-color)' }}>carerequest 테이블:</strong></p>
                <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 1rem 0' }}>
                  <li>• 외래키 (pet_idx): <code style={{ backgroundColor: 'var(--bg-color)', padding: '0.2rem 0.4rem', borderRadius: '4px' }}>CREATE INDEX fk_carerequest_pet ON carerequest(pet_idx)</code></li>
                  <li>• 사용자별 조회: <code style={{ backgroundColor: 'var(--bg-color)', padding: '0.2rem 0.4rem', borderRadius: '4px' }}>CREATE INDEX user_idx ON carerequest(user_idx)</code></li>
                </ul>
                <p style={{ marginBottom: '0.5rem' }}><strong style={{ color: 'var(--text-color)' }}>careapplication 테이블:</strong></p>
                <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 1rem 0' }}>
                  <li>• 펫케어 요청별 지원 조회: <code style={{ backgroundColor: 'var(--bg-color)', padding: '0.2rem 0.4rem', borderRadius: '4px' }}>CREATE INDEX care_request_idx ON careapplication(care_request_idx)</code></li>
                  <li>• 제공자별 지원 조회: <code style={{ backgroundColor: 'var(--bg-color)', padding: '0.2rem 0.4rem', borderRadius: '4px' }}>CREATE INDEX provider_idx ON careapplication(provider_idx)</code></li>
                </ul>
                <p style={{ marginBottom: '0.5rem' }}><strong style={{ color: 'var(--text-color)' }}>선정 이유:</strong></p>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  <li>• WHERE 절에서 자주 사용되는 조건</li>
                  <li>• JOIN에 사용되는 외래키 (user_idx, care_request_idx, provider_idx 등)</li>
                  <li>• 사용자별, 요청별 조회 최적화</li>
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
{`@Query("SELECT cr FROM CareRequest cr " +
       "JOIN FETCH cr.user " +
       "LEFT JOIN FETCH cr.pet " +
       "WHERE cr.isDeleted = false")
List<CareRequest> findAllWithUserAndPet();`}
                </pre>
                <p style={{ marginBottom: '0.5rem' }}><strong style={{ color: 'var(--text-color)' }}>개선 포인트:</strong></p>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  <li>• Fetch Join으로 N+1 문제 해결</li>
                  <li>• User와 Pet 정보를 한 번에 조회</li>
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
              <h3 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>Payment 도메인 DTO → record 리팩토링</h3>
              <div style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}>
                <p style={{ marginBottom: '0.75rem' }}>
                  Payment 도메인(PetCoin)의 DTO 중 record 적용에 적합한 항목을 선별하여 리팩토링했습니다.
                </p>
                
                <div style={{
                  padding: '1rem',
                  backgroundColor: 'var(--bg-color)',
                  borderRadius: '6px',
                  marginBottom: '1rem'
                }}>
                  <h4 style={{ marginBottom: '0.75rem', color: 'var(--text-color)', fontSize: '0.95rem' }}>record로 전환한 DTO (2개)</h4>
                  <ul style={{
                    listStyle: 'none',
                    padding: 0,
                    margin: 0,
                    fontSize: '0.9rem',
                    lineHeight: '1.8'
                  }}>
                    <li>• <strong style={{ color: 'var(--text-color)' }}>PetCoinBalanceResponse</strong> - 코인 잔액 응답 (2개 필드: userId, balance)</li>
                    <li>• <strong style={{ color: 'var(--text-color)' }}>PetCoinChargeRequest</strong> - 코인 충전 요청 (3개 필드: userId, amount, description)</li>
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
                    <li>• <strong style={{ color: 'var(--text-color)' }}>PetCoinTransactionDTO</strong> - 필드 12개로 생성자 길어짐, Response 전용이지만 필드 수가 많아 builder 유지가 가독성에 유리</li>
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
                    <li>• <code style={{ backgroundColor: 'var(--card-bg)', padding: '0.2rem 0.4rem', borderRadius: '4px' }}>PetCoinBalanceResponse.java</code> - class → record</li>
                    <li>• <code style={{ backgroundColor: 'var(--card-bg)', padding: '0.2rem 0.4rem', borderRadius: '4px' }}>PetCoinChargeRequest.java</code> - class → record</li>
                    <li>• <code style={{ backgroundColor: 'var(--card-bg)', padding: '0.2rem 0.4rem', borderRadius: '4px' }}>PetCoinController.java</code> - builder → 생성자, getter → accessor</li>
                    <li>• <code style={{ backgroundColor: 'var(--card-bg)', padding: '0.2rem 0.4rem', borderRadius: '4px' }}>AdminPaymentController.java</code> - builder → 생성자, getter → accessor</li>
                  </ul>
                </div>

                <div style={{
                  padding: '1rem',
                  backgroundColor: 'var(--bg-color)',
                  borderRadius: '6px',
                  border: '1px solid var(--link-color)',
                  marginBottom: '1rem'
                }}>
                  <a
                    href="https://github.com/makkong1/makkong1-github.io/blob/main/docs/refactoring/recordType/payment/dto-record-refactoring.md"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      color: 'var(--link-color)',
                      textDecoration: 'none',
                      fontWeight: 'bold',
                      display: 'inline-block'
                    }}
                  >
                    → Payment 도메인 DTO → record 리팩토링 상세 문서 보기
                  </a>
                </div>

                <div style={{
                  padding: '1rem',
                  backgroundColor: 'var(--bg-color)',
                  borderRadius: '6px',
                  border: '1px solid var(--link-color)'
                }}>
                  <Link
                    to="/domains/care/refactoring"
                    style={{
                      color: 'var(--link-color)',
                      textDecoration: 'none',
                      fontWeight: 'bold',
                      display: 'inline-block'
                    }}
                  >
                    → Care·Payment 리팩토링 상세 페이지 보기
                  </Link>
                </div>
              </div>
            </div>
          </section>

          {/* 6. Entity 구조 */}
          <section id="entities" style={{ marginBottom: '3rem', scrollMarginTop: '2rem' }}>
            <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>Entity 구조</h2>
            
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

          {/* 6. 보안 및 권한 체계 */}
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
            <div>• 댓글에서 "채팅하기" 버튼으로 1:1 채팅 시작, 거래 확정 시 CareApplication 생성 및 상태 변경</div>
            <div style={{ marginTop: '1rem', marginBottom: '0.5rem' }}><strong style={{ color: 'var(--text-color)' }}>Payment 도메인:</strong></div>
            <div>• 펫코인 차감 및 에스크로 생성 (거래 확정 시), 펫코인 지급 (서비스 완료 시)</div>
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
            href="https://github.com/makkong1/makkong1-github.io/blob/main/docs/troubleshooting/care/care-domain-technical-analysis.md" 
            target="_blank"
            rel="noopener noreferrer"
            style={{ 
              color: 'var(--link-color)',
              textDecoration: 'none',
              display: 'block',
              marginBottom: '0.5rem'
            }}
          >
            → Care 도메인 기술 심층 분석 보고서 (통합 문서)
          </a>
          <a 
            href="https://github.com/makkong1/makkong1-github.io/blob/main/docs/domains/care.md" 
            target="_blank"
            rel="noopener noreferrer"
            style={{ 
              color: 'var(--link-color)',
              textDecoration: 'none',
              display: 'block'
            }}
          >
            → Care 도메인 상세 문서
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
