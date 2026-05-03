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
    Users ||--o{ CareRequest : "요청"
    Pet ||--o{ CareRequest : "관련 펫"
    CareRequest ||--o{ CareApplication : "지원"
    CareRequest ||--o{ CareRequestComment : "댓글"
    CareApplication ||--o| CareReview : "리뷰"
    Users ||--o{ CareApplication : "제공자"
    Users ||--o{ CareRequestComment : "댓글작성"
    Users ||--o{ CareReview : "reviewer"
    Users ||--o{ CareReview : "reviewee"
    
    CareRequest {
        Long idx PK
        Long user_idx FK
        Long pet_idx FK
        String title
        String description
        LocalDateTime date
        Integer offered_coins
        CareRequestStatus status
        LocalDateTime createdAt
        LocalDateTime updatedAt
        Boolean isDeleted
    }
    
    CareApplication {
        Long idx PK
        Long care_request_idx FK
        Long provider_idx FK
        String message
        CareApplicationStatus status
        LocalDateTime createdAt
        LocalDateTime updatedAt
    }
    
    CareRequestComment {
        Long idx PK
        Long care_request_idx FK
        Long user_idx FK
        String content
        LocalDateTime createdAt
        Boolean isDeleted
    }
    
    CareReview {
        Long idx PK
        Long care_application_idx FK
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
                    → [Performance] 최적화 과정 상세 보기 (Part 2·3 포함)
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
                  단건 상세 → Fetch Join / 페이징 목록 → Batch Size 규칙에 따라 Care·Payment 도메인 Fetch 전략을 개선했습니다.
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
                        <th style={{ padding: '0.75rem', textAlign: 'left', color: 'var(--text-color)' }}>도메인</th>
                        <th style={{ padding: '0.75rem', textAlign: 'left', color: 'var(--text-color)' }}>대상</th>
                        <th style={{ padding: '0.75rem', textAlign: 'left', color: 'var(--text-color)' }}>전략</th>
                        <th style={{ padding: '0.75rem', textAlign: 'left', color: 'var(--text-color)' }}>상태</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr style={{ borderBottom: '1px solid var(--nav-border)' }}>
                        <td style={{ padding: '0.75rem' }}>Care</td>
                        <td style={{ padding: '0.75rem' }}>CareRequest 단건/페이징, CareApplication, CareRequestComment</td>
                        <td style={{ padding: '0.75rem' }}>Fetch Join / Batch Size</td>
                        <td style={{ padding: '0.75rem' }}>✅ 적용됨</td>
                      </tr>
                      <tr>
                        <td style={{ padding: '0.75rem' }}>Payment</td>
                        <td style={{ padding: '0.75rem' }}>PetCoinTransaction, PetCoinEscrow</td>
                        <td style={{ padding: '0.75rem' }}>EntityGraph / Fetch Join</td>
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
                    href="https://github.com/makkong1/makkong1-github.io/blob/main/docs/refactoring/fetch-optimization/care/Fetch%20%EC%A0%84%EB%9E%B5%20%EA%B0%9C%EC%84%A0%20(Fetch%20Join%20vs%20Batch%20Size).md"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      color: 'var(--link-color)',
                      textDecoration: 'none',
                      fontWeight: 'bold',
                      display: 'inline-block'
                    }}
                  >
                    → Care Fetch 전략 개선 상세 문서 보기
                  </a>
                </div>
                <div style={{
                  padding: '1rem',
                  backgroundColor: 'var(--bg-color)',
                  borderRadius: '6px',
                  border: '1px solid var(--link-color)',
                  marginTop: '0.5rem'
                }}>
                  <a
                    href="https://github.com/makkong1/makkong1-github.io/blob/main/docs/refactoring/fetch-optimization/payment/Fetch%20%EC%A0%84%EB%9E%B5%20%EA%B0%9C%EC%84%A0%20(Fetch%20Join%20vs%20Batch%20Size).md"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      color: 'var(--link-color)',
                      textDecoration: 'none',
                      fontWeight: 'bold',
                      display: 'inline-block'
                    }}
                  >
                    → Payment Fetch 전략 개선 상세 문서 보기
                  </a>
                </div>
              </div>
            </div>
          </section>

          <section id="entities" style={{ marginBottom: '3rem', scrollMarginTop: '2rem' }}>
            <h2 style={{ marginBottom: '0.75rem', color: 'var(--text-color)' }}>Entity 구조</h2>
            <p style={{ marginBottom: '1rem', color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: '1.6' }}>
              ERD·필드 요약은 <strong style={{ color: 'var(--text-color)' }}>docs/domains/care.md</strong> 엔티티 절과 동일한 관계·용어를 사용합니다.
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
          <h3 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>1. CareRequest (펫케어 요청)</h3>
          <div style={{ 
            color: 'var(--text-secondary)',
            lineHeight: '1.8',
            fontFamily: 'monospace',
            fontSize: '0.9rem'
          }}>
            <div style={{ marginBottom: '0.5rem' }}><strong style={{ color: 'var(--text-color)' }}>주요 필드:</strong></div>
            <div>• idx (PK), user (요청자), pet (관련 펫, Optional)</div>
            <div>• title, description, date (돌봄 필요 날짜), offeredCoins (제시 코인)</div>
            <div>• status (OPEN/IN_PROGRESS/COMPLETED/CANCELLED), completedAt (완료 시각)</div>
            <div>• 위도/경도/주소 (지도·nearby 등, Optional)</div>
            <div>• createdAt, updatedAt, isDeleted, deletedAt</div>
            <div style={{ marginTop: '0.5rem' }}><strong style={{ color: 'var(--text-color)' }}>연관관계:</strong></div>
            <div>• ManyToOne → Users, Pet</div>
            <div>• OneToMany → CareApplication, CareRequestComment</div>
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
            <div>• idx (PK), careRequest (요청), provider (케어 제공자)</div>
            <div>• message (지원 메시지), status (PENDING/ACCEPTED/REJECTED)</div>
            <div>• createdAt, updatedAt</div>
            <div style={{ marginTop: '0.5rem' }}><strong style={{ color: 'var(--text-color)' }}>연관관계:</strong></div>
            <div>• ManyToOne → CareRequest, Users(provider)</div>
            <div>• CareApplication당 리뷰 최대 1건 (CareReview, Optional)</div>
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
            <div>• idx (PK), careApplication (승인된 지원, 1:1)</div>
            <div>• reviewer (요청자), reviewee (제공자)</div>
            <div>• rating (1-5), comment(내용), createdAt, updatedAt</div>
            <div style={{ marginTop: '0.5rem' }}><strong style={{ color: 'var(--text-color)' }}>연관관계:</strong></div>
            <div>• ManyToOne → CareApplication, Users(reviewer), Users(reviewee)</div>
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
                <li>• <strong style={{ color: 'var(--text-color)' }}>요청 수정/삭제</strong>: 작성자만 (관리자는 우회 가능)</li>
                <li>• <strong style={{ color: 'var(--text-color)' }}>상태 변경</strong>: 작성자 또는 ACCEPTED 제공자만 (관리자 우회). 소프트 삭제된 요청은 변경 불가</li>
                <li>• <strong style={{ color: 'var(--text-color)' }}>댓글 작성</strong>: SERVICE_PROVIDER 역할만, 파일 첨부 시 첫 파일만 저장</li>
                <li>• <strong style={{ color: 'var(--text-color)' }}>리뷰 작성</strong>: 요청자만, CareApplication당 1건</li>
                <li>• <strong style={{ color: 'var(--text-color)' }}>인증</strong>: 변경·삭제·POST·PATCH 및 내 요청 조회는 인증 필요 (<code style={{ backgroundColor: 'var(--bg-color)', padding: '0.15rem 0.35rem', borderRadius: '4px' }}>@PreAuthorize</code> 등, care.md 보안 절 참고)</li>
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
            <div>• 펫케어 요청 댓글에 파일 첨부 (<code style={{ backgroundColor: 'var(--bg-color)', padding: '0.15rem 0.35rem', borderRadius: '4px' }}>FileTargetType.CARE_COMMENT</code> 등, care.md 참고)</div>
            <div style={{ marginTop: '1rem', marginBottom: '0.5rem' }}><strong style={{ color: 'var(--text-color)' }}>Notification 도메인:</strong></div>
            <div>• 예: 펫케어 요청 댓글 작성 시 요청자에게 알림(작성자가 요청자가 아닐 때만)</div>
            <div style={{ marginTop: '1rem', marginBottom: '0.5rem' }}><strong style={{ color: 'var(--text-color)' }}>Report 도메인:</strong></div>
            <div>• 부적절한 요청/댓글 신고</div>
            <div style={{ marginTop: '1rem', marginBottom: '0.5rem' }}><strong style={{ color: 'var(--text-color)' }}>Chat 도메인:</strong></div>
            <div>• 댓글에서 "채팅하기" 버튼으로 1:1 채팅 시작, 거래 확정 시 CareApplication 생성 및 상태 변경</div>
            <div style={{ marginTop: '1rem', marginBottom: '0.5rem' }}><strong style={{ color: 'var(--text-color)' }}>Payment 도메인:</strong></div>
            <div>• 거래 확정 시 요청자 코인 차감·에스크로(HOLD), 완료 시 제공자 지급(RELEASED), 취소 시 요청자 환불(REFUNDED) — payment.md·ConversationService·CareRequestService 연동</div>
          </div>
        </div>
      </section>

          <section id="api" style={{ marginBottom: '3rem', scrollMarginTop: '2rem' }}>
            <p style={{ marginBottom: '1rem', color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: '1.6' }}>
              경로는 <strong style={{ color: 'var(--text-color)' }}>docs/domains/care.md</strong> · <strong style={{ color: 'var(--text-color)' }}>docs/domains/payment.md</strong>의 API 표와 동일합니다. 지원 생성·거래 확정은 채팅 API를 통해 처리됩니다.
            </p>
            <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>API 엔드포인트</h2>

            <div className="section-card" style={{
              padding: '1.5rem',
              backgroundColor: 'var(--card-bg)',
              borderRadius: '8px',
              border: '1px solid var(--nav-border)',
              marginBottom: '1rem'
            }}>
              <h3 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>펫케어 요청 (/api/care-requests)</h3>
              <div style={{
                color: 'var(--text-secondary)',
                lineHeight: '1.8',
                fontFamily: 'monospace',
                fontSize: '0.9rem'
              }}>
                <div>• GET /api/care-requests — 목록 (페이징, status·location 등)</div>
                <div>• GET /api/care-requests/{'{id}'} — 단건</div>
                <div>• POST /api/care-requests — 생성 (이메일 인증)</div>
                <div>• PUT /api/care-requests/{'{id}'} — 수정</div>
                <div>• DELETE /api/care-requests/{'{id}'} — 삭제 (Soft Delete)</div>
                <div>• GET /api/care-requests/my-requests — 내 요청 (쿼리 userId 없음)</div>
                <div>• PATCH /api/care-requests/{'{id}'}/status — 상태 변경 (OPEN/IN_PROGRESS/COMPLETED/CANCELLED)</div>
                <div>• GET /api/care-requests/search — 키워드 검색 (페이징, keyword·page·size)</div>
              </div>
            </div>

            <div className="section-card" style={{
              padding: '1.5rem',
              backgroundColor: 'var(--card-bg)',
              borderRadius: '8px',
              border: '1px solid var(--nav-border)',
              marginBottom: '1rem'
            }}>
              <h3 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>펫케어 댓글 (/api/care-requests/{'{careRequestId}'}/comments)</h3>
              <div style={{
                color: 'var(--text-secondary)',
                lineHeight: '1.8',
                fontFamily: 'monospace',
                fontSize: '0.9rem'
              }}>
                <div>• GET …/comments — 목록</div>
                <div>• POST …/comments — 작성 (SERVICE_PROVIDER, 첫 첨부 파일만 저장)</div>
                <div>• DELETE …/comments/{'{commentId}'} — Soft Delete</div>
              </div>
            </div>

            <div className="section-card" style={{
              padding: '1.5rem',
              backgroundColor: 'var(--card-bg)',
              borderRadius: '8px',
              border: '1px solid var(--nav-border)',
              marginBottom: '1rem'
            }}>
              <h3 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>채팅 · 거래 확정 (Chat)</h3>
              <div style={{
                color: 'var(--text-secondary)',
                lineHeight: '1.8',
                fontFamily: 'monospace',
                fontSize: '0.9rem'
              }}>
                <div>• POST /api/chat/conversations/{'{conversationIdx}'}/confirm-deal?userId=… — 거래 확정 (양쪽 확정 시 CareApplication·상태·에스크로, chat.md 참고)</div>
              </div>
            </div>

            <div className="section-card" style={{
              padding: '1.5rem',
              backgroundColor: 'var(--card-bg)',
              borderRadius: '8px',
              border: '1px solid var(--nav-border)',
              marginBottom: '1rem'
            }}>
              <h3 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>펫케어 리뷰 (/api/care-reviews)</h3>
              <div style={{
                color: 'var(--text-secondary)',
                lineHeight: '1.8',
                fontFamily: 'monospace',
                fontSize: '0.9rem'
              }}>
                <div>• POST /api/care-reviews</div>
                <div>• GET /api/care-reviews/reviewee/{'{revieweeIdx}'}</div>
                <div>• GET /api/care-reviews/reviewer/{'{reviewerIdx}'}</div>
                <div>• GET /api/care-reviews/average-rating/{'{revieweeIdx}'}</div>
              </div>
            </div>

            <div className="section-card" style={{
              padding: '1.5rem',
              backgroundColor: 'var(--card-bg)',
              borderRadius: '8px',
              border: '1px solid var(--nav-border)',
              marginBottom: '1rem'
            }}>
              <h3 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>펫코인 (Payment, /api/payment)</h3>
              <div style={{
                color: 'var(--text-secondary)',
                lineHeight: '1.8',
                fontFamily: 'monospace',
                fontSize: '0.9rem'
              }}>
                <div>• GET /api/payment/balance</div>
                <div>• GET /api/payment/transactions — 페이징 (기본 size 20)</div>
                <div>• GET /api/payment/transactions/{'{id}'} — 상세 (본인 거래만)</div>
                <div>• POST /api/payment/charge — 충전 (시뮬레이션)</div>
                <div style={{ marginTop: '0.75rem', fontFamily: 'inherit', fontSize: '0.85rem' }}>관리자 지급·조회는 AdminPaymentController — payment.md 8.4절 참고.</div>
              </div>
            </div>

            <div className="section-card" style={{
              padding: '1rem',
              backgroundColor: 'var(--bg-color)',
              borderRadius: '8px',
              border: '1px solid var(--nav-border)',
              fontSize: '0.85rem',
              color: 'var(--text-secondary)',
              lineHeight: '1.7'
            }}>
              관리자용 Care API(<code style={{ backgroundColor: 'var(--card-bg)', padding: '0.15rem 0.35rem', borderRadius: '4px' }}>/api/admin/care-requests/...</code>)는 care.md의 AdminCareRequestController 표를 따릅니다.
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
              display: 'block',
              marginBottom: '0.5rem'
            }}
          >
            → Care 도메인 상세 문서
          </a>
          <a 
            href="https://github.com/makkong1/makkong1-github.io/blob/main/docs/domains/payment.md" 
            target="_blank"
            rel="noopener noreferrer"
            style={{ 
              color: 'var(--link-color)',
              textDecoration: 'none',
              display: 'block'
            }}
          >
            → Payment 도메인 상세 문서 (PetCoin·에스크로)
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
