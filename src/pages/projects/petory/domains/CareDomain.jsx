import { Link } from 'react-router-dom';
import MermaidDiagram from '../../../../components/Common/MermaidDiagram';
import TableOfContents from '../../../../components/Common/TableOfContents';

function Card({ children, style }) {
  return (
    <div
      className="section-card"
      style={{
        padding: '1.5rem',
        backgroundColor: 'var(--card-bg)',
        borderRadius: '8px',
        border: '1px solid var(--nav-border)',
        ...style
      }}
    >
      {children}
    </div>
  );
}

function CodeBlock({ children }) {
  return (
    <pre
      style={{
        padding: '0.95rem 1rem',
        backgroundColor: 'var(--bg-color)',
        borderRadius: '6px',
        overflowX: 'auto',
        fontSize: '0.84rem',
        color: 'var(--text-secondary)',
        fontFamily: 'monospace',
        lineHeight: '1.65',
        margin: '0.75rem 0 0'
      }}
    >
      {children}
    </pre>
  );
}

function CareDomain() {
  const sections = [
    { id: 'intro', title: '도메인 개요' },
    { id: 'design', title: '기능 & 아키텍처' },
    { id: 'troubleshooting', title: '트러블슈팅' },
    { id: 'performance', title: '성능 최적화' },
    { id: 'summary', title: '핵심 포인트' },
    { id: 'docs', title: '관련 페이지' }
  ];

  const entityDiagram = `erDiagram
    Users ||--o{ CareRequest : "requests"
    Pet ||--o{ CareRequest : "belongs_to"
    CareRequest ||--o{ CareApplication : "has"
    CareRequest ||--o{ CareRequestComment : "has"
    CareApplication ||--o| CareReview : "reviewed_by"
    Users ||--o{ CareApplication : "applies"
    Users ||--o{ CareRequestComment : "writes"
    Users ||--o{ CareReview : "reviewer"
    Users ||--o{ CareReview : "reviewee"

    CareRequest {
        Long idx PK
        Long user_idx FK
        Long pet_idx FK
        String title
        String description
        LocalDateTime date
        Integer offeredCoins
        CareRequestStatus status
        Double latitude
        Double longitude
        Boolean isDeleted
        LocalDateTime completedAt
    }

    CareApplication {
        Long idx PK
        Long care_request_idx FK
        Long provider_idx FK
        String message
        CareApplicationStatus status
    }

    CareRequestComment {
        Long idx PK
        Long care_request_idx FK
        Long user_idx FK
        String content
        Boolean isDeleted
    }

    CareReview {
        Long idx PK
        Long care_application_idx FK
        Long reviewer_idx FK
        Long reviewee_idx FK
        Integer rating
        String comment
    }`;

  const raceConditionSequence = `sequenceDiagram
    participant UserA as 요청자
    participant UserB as 제공자
    participant Service as ConversationService
    participant DB as MySQL

    Note over UserA,UserB: 동시에 거래 확정 클릭

    par 동시 요청
        UserA->>Service: confirmCareDeal() (Tx A)
        UserB->>Service: confirmCareDeal() (Tx B)
    end

    Service->>DB: Tx A: 내 확정 상태 저장
    Service->>DB: Tx B: 내 확정 상태 저장

    Service->>DB: Tx A: 둘 다 확정? false
    Service->>DB: Tx B: 둘 다 확정? false

    Note over DB: 결과: 둘 다 눌렀지만<br/>CareRequest는 OPEN에 머묾`;

  const lockSequence = `sequenceDiagram
    participant UserA as 요청자
    participant UserB as 제공자
    participant Service as ConversationService
    participant DB as MySQL

    UserA->>Service: confirmCareDeal() (Tx A)
    Service->>DB: SELECT ... FOR UPDATE

    UserB->>Service: confirmCareDeal() (Tx B)
    Service->>DB: SELECT ... FOR UPDATE 대기

    Service->>DB: Tx A 커밋
    Service->>DB: Tx B 재개, 최신 데이터 확인
    Service->>DB: 둘 다 확정 확인
    Service->>DB: CareApplication ACCEPTED
    Service->>DB: CareRequest IN_PROGRESS
    Note over DB: 순차 처리로 Stuck 방지`;

  const li = (text) => <li style={{ marginBottom: '0.35rem' }}>• {text}</li>;

  return (
    <div className="domain-page-wrapper" style={{ padding: '2rem 0' }}>
      <div className="domain-page-container" style={{ display: 'flex', gap: '2rem', alignItems: 'flex-start' }}>
        <div className="domain-page-content" style={{ flex: 1 }}>
          <h1 style={{ marginBottom: '0.5rem', color: 'var(--text-color)' }}>펫케어 도메인</h1>
          <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', marginBottom: '2.5rem', fontSize: '0.95rem' }}>
            요청 생성, 제공자 모집, 채팅 기반 거래 확정, 에스크로 정산, 상태 전이, 리뷰까지 연결되는 워크플로우 도메인입니다.
            단순 CRUD가 아니라 도메인 간 연동과 동시성 정합성이 핵심 과제였습니다.
          </p>

          {/* ── 도메인 개요 ── */}
          <section id="intro" style={{ marginBottom: '3rem', scrollMarginTop: '2rem' }}>
            <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>도메인 개요</h2>
            <Card style={{ marginBottom: '1rem' }}>
              <p style={{ lineHeight: '1.8', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                Care 도메인의 핵심은{' '}
                <strong style={{ color: 'var(--text-color)' }}>
                  요청자와 제공자를 안전하게 연결하고, 거래 확정 이후 상태 전이·코인 정산을 한 번의 비즈니스 흐름으로 묶는 것
                </strong>
                입니다.
              </p>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid var(--nav-border)' }}>
                    <th style={{ padding: '0.55rem 0.75rem', textAlign: 'left', color: 'var(--text-color)' }}>지표</th>
                    <th style={{ padding: '0.55rem 0.75rem', textAlign: 'left', color: 'var(--text-color)' }}>Before</th>
                    <th style={{ padding: '0.55rem 0.75rem', textAlign: 'left', color: 'var(--text-color)' }}>After</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['목록 쿼리 수', '2,400개', '4~5개 (↓99%)'],
                    ['실행 시간', '1,084ms', '66ms'],
                    ['메모리', '21MB', '6MB']
                  ].map(([label, before, after], i, arr) => (
                    <tr key={label} style={{ borderBottom: i < arr.length - 1 ? '1px solid var(--nav-border)' : 'none' }}>
                      <td style={{ padding: '0.55rem 0.75rem', color: 'var(--text-color)' }}>{label}</td>
                      <td style={{ padding: '0.55rem 0.75rem' }}>{before}</td>
                      <td style={{ padding: '0.55rem 0.75rem', color: 'var(--text-color)', fontWeight: 600 }}>{after}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Card>

            <Card>
              <h3 style={{ marginBottom: '0.75rem', color: 'var(--text-color)', fontSize: '1rem' }}>상태 전이 흐름</h3>
              <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', marginBottom: 0 }}>
                <code style={{ backgroundColor: 'var(--bg-color)', padding: '0.1rem 0.3rem', borderRadius: '4px' }}>OPEN</code>
                {' → '}
                <code style={{ backgroundColor: 'var(--bg-color)', padding: '0.1rem 0.3rem', borderRadius: '4px' }}>IN_PROGRESS</code>
                {' → '}
                <code style={{ backgroundColor: 'var(--bg-color)', padding: '0.1rem 0.3rem', borderRadius: '4px' }}>COMPLETED</code>
                {' / '}
                <code style={{ backgroundColor: 'var(--bg-color)', padding: '0.1rem 0.3rem', borderRadius: '4px' }}>CANCELLED</code>
                . 거래 확정 시 에스크로 HOLD, 완료 시 제공자에게 지급, 취소 시 요청자에게 환불합니다.
              </p>
            </Card>
          </section>

          {/* ── 기능 & 아키텍처 ── */}
          <section id="design" style={{ marginBottom: '3rem', scrollMarginTop: '2rem' }}>
            <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>기능 & 아키텍처</h2>

            {/* 요청 & 권한 */}
            <Card style={{ marginBottom: '1rem' }}>
              <h3 style={{ marginBottom: '0.75rem', color: 'var(--text-color)', fontSize: '1rem' }}>요청 생성 & 권한 모델</h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, color: 'var(--text-secondary)', lineHeight: '1.8' }}>
                {li('작성 전 이메일 인증 필수 (EmailVerificationPurpose.PET_CARE).')}
                {li('수정/삭제: 작성자만 가능. 관리자는 우회.')}
                {li('상태 변경: 작성자 또는 승인된 제공자(ACCEPTED application 보유)만 가능. 관리자 우회.')}
                {li('댓글: SERVICE_PROVIDER 역할만 작성. 리뷰: 요청자만, ACCEPTED 지원 건에 한해 1개.')}
                {li('my-requests: 쿼리 userId 제거 → SecurityContext 기반으로 IDOR 차단.')}
              </ul>
            </Card>

            {/* 거래 확정 */}
            <Card style={{ marginBottom: '1rem' }}>
              <h3 style={{ marginBottom: '0.75rem', color: 'var(--text-color)', fontSize: '1rem' }}>채팅 거래 확정 (confirmCareDeal)</h3>
              <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', marginBottom: '0.5rem' }}>
                Chat 도메인의 <code style={{ backgroundColor: 'var(--bg-color)', padding: '0.1rem 0.3rem', borderRadius: '4px' }}>ConversationService.confirmCareDeal()</code>이 진입점입니다.
                양쪽 모두 확정하면 CareApplication 승인 + CareRequest 상태 전이 + 에스크로 생성이 한 트랜잭션에서 실행됩니다.
              </p>
              <CodeBlock>{`if (allParticipantsConfirmed && careRequest.getStatus() == OPEN) {
  acceptOrCreateCareApplication(provider);   // CareApplication ACCEPTED
  careRequest.setStatus(IN_PROGRESS);
  createEscrowFromRequester(offeredCoins);    // 에스크로 HOLD
}`}</CodeBlock>
              <p style={{ color: 'var(--text-secondary)', lineHeight: '1.7', marginTop: '0.75rem', marginBottom: 0, fontSize: '0.88rem' }}>
                에스크로 생성 실패는 현재 로그만 남기고 상태 전이를 유지합니다 (운영 정책에 따라 롤백 여부 재검토 여지).
              </p>
            </Card>

            {/* 상태 변경 & 에스크로 */}
            <Card style={{ marginBottom: '1rem' }}>
              <h3 style={{ marginBottom: '0.75rem', color: 'var(--text-color)', fontSize: '1rem' }}>상태 변경 & 에스크로 정산</h3>
              <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', marginBottom: '0.5rem' }}>
                <code style={{ backgroundColor: 'var(--bg-color)', padding: '0.1rem 0.3rem', borderRadius: '4px' }}>updateStatus()</code>는 권한 확인 + 에스크로 지급/환불까지 책임집니다.
                에스크로 조회는 <code style={{ backgroundColor: 'var(--bg-color)', padding: '0.1rem 0.3rem', borderRadius: '4px' }}>findByCareRequestForUpdate</code>(비관적 락)로 정산 중복을 방지합니다.
              </p>
              <CodeBlock>{`if (newStatus == COMPLETED) {
  escrow = petCoinEscrowService.findByCareRequestForUpdate(request);
  if (escrow.status == HOLD) petCoinEscrowService.releaseToProvider(escrow);
}
if (newStatus == CANCELLED) {
  escrow = petCoinEscrowService.findByCareRequestForUpdate(request);
  if (escrow.status == HOLD) petCoinEscrowService.refundToRequester(escrow);
}`}</CodeBlock>
            </Card>

            {/* 자동 완료 스케줄러 */}
            <Card style={{ marginBottom: '1rem' }}>
              <h3 style={{ marginBottom: '0.75rem', color: 'var(--text-color)', fontSize: '1rem' }}>자동 완료 스케줄러</h3>
              <CodeBlock>{`@Scheduled(cron = "0 0 * * * ?")   // 매 시간
@Scheduled(cron = "0 0 0 * * ?")   // 매일 자정
public void updateExpiredCareRequests() {
  careRequestService.updateStatus(idx, "COMPLETED", null);
}`}</CodeBlock>
              <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', marginTop: '0.75rem', marginBottom: 0 }}>
                스케줄러도 동일한 <code style={{ backgroundColor: 'var(--bg-color)', padding: '0.1rem 0.3rem', borderRadius: '4px' }}>updateStatus()</code>를 호출하므로 에스크로 지급 규칙이 동일하게 적용됩니다.
              </p>
            </Card>

            {/* 엔티티 & API */}
            <Card style={{ marginBottom: '1rem' }}>
              <h3 style={{ marginBottom: '0.75rem', color: 'var(--text-color)', fontSize: '1rem' }}>엔티티 관계도</h3>
              <MermaidDiagram chart={entityDiagram} />
            </Card>

            <Card>
              <h3 style={{ marginBottom: '0.75rem', color: 'var(--text-color)', fontSize: '1rem' }}>주요 API</h3>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid var(--nav-border)' }}>
                    <th style={{ padding: '0.55rem 0.75rem', textAlign: 'left', color: 'var(--text-color)' }}>엔드포인트</th>
                    <th style={{ padding: '0.55rem 0.75rem', textAlign: 'left', color: 'var(--text-color)' }}>Method</th>
                    <th style={{ padding: '0.55rem 0.75rem', textAlign: 'left', color: 'var(--text-color)' }}>설명</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['/api/care-requests', 'GET/POST', '목록 조회 / 요청 생성'],
                    ['/api/care-requests/{id}', 'GET/PUT/DELETE', '단일 조회 · 수정 · 삭제'],
                    ['/api/care-requests/{id}/status', 'PATCH', '상태 변경 (COMPLETED / CANCELLED)'],
                    ['/api/care-requests/my-requests', 'GET', '내 요청 목록 (토큰 기준)'],
                    ['/api/care-requests/search', 'GET', '키워드 페이징 검색'],
                    ['/api/care-requests/nearby', 'GET', '지도 주변 요청 (lat/lng/radius)'],
                    ['/api/care-requests/{id}/comments', 'GET/POST', '댓글 목록 / 작성'],
                    ['/api/chat/conversations/{id}/confirm-deal', 'POST', '거래 확정 → 에스크로 생성'],
                    ['/api/care-reviews', 'POST', '리뷰 작성']
                  ].map(([path, method, desc], i, arr) => (
                    <tr key={path + method} style={{ borderBottom: i < arr.length - 1 ? '1px solid var(--nav-border)' : 'none' }}>
                      <td style={{ padding: '0.55rem 0.75rem' }}>
                        <code style={{ backgroundColor: 'var(--bg-color)', padding: '0.1rem 0.3rem', borderRadius: '4px', fontSize: '0.82rem' }}>{path}</code>
                      </td>
                      <td style={{ padding: '0.55rem 0.75rem' }}>{method}</td>
                      <td style={{ padding: '0.55rem 0.75rem' }}>{desc}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Card>
          </section>

          {/* ── 트러블슈팅 ── */}
          <section id="troubleshooting" style={{ marginBottom: '3rem', scrollMarginTop: '2rem' }}>
            <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>트러블슈팅</h2>

            <Card style={{ marginBottom: '1rem' }}>
              <h3 style={{ marginBottom: '0.75rem', color: 'var(--text-color)', fontSize: '1rem' }}>거래 확정 Race Condition</h3>
              <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', marginBottom: '0.75rem' }}>
                양쪽이 동시에 확정 버튼을 누르면 각 트랜잭션이 상대방의 최신 상태를 못 보고, 둘 다 눌렀는데도 <code style={{ backgroundColor: 'var(--bg-color)', padding: '0.1rem 0.3rem', borderRadius: '4px' }}>OPEN</code>에 머무르는 Stuck이 발생합니다.
              </p>
              <MermaidDiagram chart={raceConditionSequence} />
            </Card>

            <Card style={{ marginBottom: '1rem' }}>
              <h3 style={{ marginBottom: '0.75rem', color: 'var(--text-color)', fontSize: '1rem' }}>비관적 락으로 순차화</h3>
              <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', marginBottom: '0.75rem' }}>
                확정 대상 행을 <code style={{ backgroundColor: 'var(--bg-color)', padding: '0.1rem 0.3rem', borderRadius: '4px' }}>SELECT ... FOR UPDATE</code>로 잠가 한 트랜잭션씩 처리합니다. 두 번째 요청은 첫 번째가 커밋된 뒤 최신 상태를 보고 안전하게 상태를 전이합니다.
              </p>
              <MermaidDiagram chart={lockSequence} />
            </Card>

            {[
              ['목록 N+1 (2,400 → 4~5)', '요청마다 작성자·펫·지원 정보를 개별 조회하면 쿼리가 폭증합니다.', 'Fetch Join(findAllWithUserAndPet) + IN 배치 조회로 쿼리를 4~5개로 압축했습니다.'],
              ['리뷰 중복 작성', 'exists 체크만으로는 동시 요청 시 중복 리뷰가 저장될 수 있습니다.', '애플리케이션 체크 + DB 유니크 위반을 CareConflictException.alreadyReviewed()로 매핑해 이중으로 차단했습니다.'],
              ['권한 누수 (IDOR)', 'my-requests에 임의 userId를 전달하면 타인 목록을 조회할 수 있었습니다.', '컨트롤러가 SecurityContext 기반 현재 사용자 ID만 서비스에 전달하도록 수정했습니다.']
            ].map(([title, problem, solution]) => (
              <Card key={title} style={{ marginBottom: '1rem' }}>
                <h3 style={{ marginBottom: '0.75rem', color: 'var(--text-color)', fontSize: '1rem' }}>{title}</h3>
                <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', marginBottom: '0.4rem' }}>
                  <strong style={{ color: 'var(--text-color)' }}>문제:</strong> {problem}
                </p>
                <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', marginBottom: 0 }}>
                  <strong style={{ color: 'var(--text-color)' }}>해결:</strong> {solution}
                </p>
              </Card>
            ))}
          </section>

          {/* ── 성능 최적화 ── */}
          <section id="performance" style={{ marginBottom: '3rem', scrollMarginTop: '2rem' }}>
            <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>성능 최적화</h2>

            <Card style={{ marginBottom: '1rem' }}>
              <h3 style={{ marginBottom: '0.75rem', color: 'var(--text-color)', fontSize: '1rem' }}>인덱스 전략</h3>
              <CodeBlock>{`CREATE INDEX user_idx ON carerequest(user_idx);
CREATE INDEX fk_carerequest_pet ON carerequest(pet_idx);
CREATE INDEX care_request_idx ON careapplication(care_request_idx);
CREATE INDEX provider_idx ON careapplication(provider_idx);
CREATE INDEX care_application_idx ON carereview(care_application_idx);
CREATE INDEX reviewee_idx ON carereview(reviewee_idx);`}</CodeBlock>
              <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', marginTop: '0.75rem', marginBottom: 0 }}>
                요청별·사용자별·지원별·리뷰 대상별 조회 패턴에 맞춰 인덱스를 구성했습니다.
              </p>
            </Card>

            <Card>
              <h3 style={{ marginBottom: '0.75rem', color: 'var(--text-color)', fontSize: '1rem' }}>N+1 제거 쿼리</h3>
              <CodeBlock>{`@Query("SELECT cr FROM CareRequest cr " +
       "JOIN FETCH cr.user " +
       "LEFT JOIN FETCH cr.pet " +
       "WHERE cr.isDeleted = false")
List<CareRequest> findAllWithUserAndPet();`}</CodeBlock>
              <ul style={{ listStyle: 'none', padding: 0, marginTop: '0.75rem', color: 'var(--text-secondary)', lineHeight: '1.8' }}>
                {li('findByIdWithApplications, findByIdWithUser 등 fetch 전략별 전용 쿼리로 조회 경로를 분리했습니다.')}
                {li('조회 메서드는 @Transactional(readOnly = true), 자동 완료는 스케줄러로 분리해 요청 경로 부담을 낮췄습니다.')}
              </ul>
            </Card>
          </section>

          {/* ── 핵심 포인트 ── */}
          <section id="summary" style={{ marginBottom: '3rem', scrollMarginTop: '2rem' }}>
            <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>핵심 포인트</h2>
            <Card>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, color: 'var(--text-secondary)', lineHeight: '1.8' }}>
                <li>• Care는 채팅·Payment·권한·상태 전이가 얽힌 워크플로우 도메인 — 거래 확정 동시성이 가장 중요한 정합성 포인트입니다.</li>
                <li>• 에스크로 비관적 락과 confirmCareDeal 순차화로 코인 정산 이중 처리를 방지했습니다.</li>
                <li>• 수정/삭제/상태 변경/댓글/리뷰가 각각 다른 권한 모델을 가져 서비스 단에서 명시적으로 검증합니다.</li>
                <li>• Fetch Join + 전용 쿼리로 목록 조회 쿼리를 2,400개에서 4~5개로 압축했습니다.</li>
              </ul>
            </Card>
          </section>

          {/* ── 관련 페이지 ── */}
          <section id="docs" style={{ marginBottom: '3rem', scrollMarginTop: '2rem' }}>
            <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>관련 페이지</h2>
            <Card>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, color: 'var(--text-secondary)', lineHeight: '2' }}>
                <li>• <Link to="/domains/care/optimization" style={{ color: 'var(--link-color)', textDecoration: 'none' }}>Care 도메인 성능 최적화</Link></li>
                <li>• <Link to="/domains/care/refactoring" style={{ color: 'var(--link-color)', textDecoration: 'none' }}>Care 도메인 리팩토링</Link></li>
                <li>• <Link to="/domains/chat" style={{ color: 'var(--link-color)', textDecoration: 'none' }}>Chat 도메인 (거래 확정 진입점)</Link></li>
              </ul>
            </Card>
          </section>
        </div>

        <TableOfContents sections={sections} />
      </div>
    </div>
  );
}

export default CareDomain;
