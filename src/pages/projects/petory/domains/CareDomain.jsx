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
    { id: 'features', title: '주요 기능' },
    { id: 'service-logic', title: '핵심 서비스 로직' },
    { id: 'architecture', title: '아키텍처' },
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
            Care 도메인은 펫케어 요청/지원 시스템입니다. 단순 게시글이 아니라 요청 생성, 제공자 모집, 채팅 기반 거래 확정,
            에스크로 정산, 상태 전이, 리뷰, 댓글, 관리자 운영까지 연결되는 흐름이라 도메인 간 연동과 정합성 관리가 특히 중요했습니다.
          </p>

          <section id="intro" style={{ marginBottom: '3rem', scrollMarginTop: '2rem' }}>
            <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>도메인 개요</h2>
            <Card style={{ marginBottom: '1rem' }}>
              <p style={{ lineHeight: '1.8', color: 'var(--text-secondary)', marginBottom: '0.75rem' }}>
                `docs/domains/care.md` 기준으로 Care 도메인의 핵심은{" "}
                <strong style={{ color: 'var(--text-color)' }}>
                  요청자와 제공자를 안전하게 연결하고, 거래 확정 이후 상태 전이와 코인 정산을 한 번의 비즈니스 흐름으로 묶는 것
                </strong>
                입니다.
              </p>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, color: 'var(--text-secondary)', lineHeight: '1.8' }}>
                {li('요청 생성/수정/삭제, 지원, 댓글, 리뷰, 검색, 상태 변경을 제공합니다.')}
                {li('거래 확정은 채팅 도메인과 연결되고, 에스크로 생성·지급·환불은 Payment 도메인과 연동됩니다.')}
                {li('권한 규칙은 작성자, 승인된 제공자, SERVICE_PROVIDER 역할, 관리자 우회 여부까지 세분화돼 있습니다.')}
              </ul>
            </Card>

            <Card>
              <h3 style={{ marginBottom: '0.75rem', color: 'var(--text-color)', fontSize: '1rem' }}>핵심 성과</h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, color: 'var(--text-secondary)', lineHeight: '1.8' }}>
                <li>• 펫케어 요청 목록 조회: <strong style={{ color: 'var(--text-color)' }}>2400개 쿼리 → 4~5개 쿼리</strong></li>
                <li>• 실행 시간: <strong style={{ color: 'var(--text-color)' }}>1084ms → 66ms</strong></li>
                <li>• 메모리 사용량: <strong style={{ color: 'var(--text-color)' }}>21MB → 6MB</strong></li>
                <li>• 거래 확정 이후 `OPEN → IN_PROGRESS → COMPLETED/CANCELLED` 전이와 에스크로 반영을 서비스 레이어에서 일관되게 처리합니다.</li>
              </ul>
            </Card>
          </section>

          <section id="features" style={{ marginBottom: '3rem', scrollMarginTop: '2rem' }}>
            <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>주요 기능</h2>

            <Card style={{ marginBottom: '1rem' }}>
              <h3 style={{ marginBottom: '0.75rem', color: 'var(--text-color)', fontSize: '1rem' }}>1. 펫케어 요청 및 지원</h3>
              <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', marginBottom: '0.5rem' }}>
                요청자는 제목, 설명, 날짜, 펫 정보, 제시 코인(`offeredCoins`)을 포함해 요청을 생성하고, 여러 제공자가 지원할 수 있습니다.
              </p>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, color: 'var(--text-secondary)', lineHeight: '1.8' }}>
                {li('요청 생성 시 이메일 인증이 필요합니다.')}
                {li('요청 수정/삭제는 작성자만 가능하고, 관리자는 우회할 수 있습니다.')}
                {li('펫 연결 시 해당 펫이 요청자 소유인지 검사하고, `petIdx = null`로 연결 해제도 지원합니다.')}
              </ul>
            </Card>

            <Card style={{ marginBottom: '1rem' }}>
              <h3 style={{ marginBottom: '0.75rem', color: 'var(--text-color)', fontSize: '1rem' }}>2. 채팅 후 거래 확정 및 완료</h3>
              <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', marginBottom: '0.5rem' }}>
                제공자가 채팅을 시작한 뒤, 양쪽 모두 거래를 확정하면 CareApplication이 `ACCEPTED`가 되고 CareRequest가 `IN_PROGRESS`로 넘어갑니다.
              </p>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, color: 'var(--text-secondary)', lineHeight: '1.8' }}>
                {li('거래 확정 시 요청자 코인을 차감해 에스크로(HOLD)로 전환합니다.')}
                {li('서비스 완료 시 에스크로 코인을 제공자에게 지급합니다.')}
                {li('취소 시에는 요청자에게 환불합니다.')}
              </ul>
            </Card>

            <Card style={{ marginBottom: '1rem' }}>
              <h3 style={{ marginBottom: '0.75rem', color: 'var(--text-color)', fontSize: '1rem' }}>3. 리뷰와 댓글</h3>
              <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', marginBottom: '0.5rem' }}>
                리뷰는 요청자만 작성할 수 있고, 댓글은 `SERVICE_PROVIDER` 역할 사용자만 작성할 수 있습니다.
              </p>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, color: 'var(--text-secondary)', lineHeight: '1.8' }}>
                {li('리뷰는 `ACCEPTED`된 CareApplication에 대해서만 작성 가능합니다.')}
                {li('한 CareApplication당 리뷰는 1개만 허용합니다.')}
                {li('댓글 작성 시 요청자에게 `CARE_REQUEST_COMMENT` 알림을 발송하며, 첨부파일은 첫 번째 파일만 저장합니다.')}
              </ul>
            </Card>

            <Card>
              <h3 style={{ marginBottom: '0.75rem', color: 'var(--text-color)', fontSize: '1rem' }}>4. 요청 검색과 지도 조회</h3>
              <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', marginBottom: '0.5rem' }}>
                공개 검색 API는 페이징 검색을 사용하며, 제목·설명 LIKE 검색과 작성자 활성 상태 조건을 함께 적용합니다.
              </p>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, color: 'var(--text-secondary)', lineHeight: '1.8' }}>
                {li('`GET /api/care-requests/search`: `keyword`, `page`, `size` 기반 페이징')}
                {li('삭제되지 않은 요청 + 활성 작성자만 검색 결과에 포함')}
                {li('지도용 `getNearby()`는 반경과 limit를 받아 주변 요청을 조회합니다.')}
              </ul>
            </Card>
          </section>

          <section id="service-logic" style={{ marginBottom: '3rem', scrollMarginTop: '2rem' }}>
            <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>핵심 서비스 로직</h2>

            <Card style={{ marginBottom: '1rem' }}>
              <h3 style={{ marginBottom: '0.75rem', color: 'var(--text-color)', fontSize: '1rem' }}>
                거래 확정: 양쪽 모두 확인 시 자동 승인
              </h3>
              <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', marginBottom: '0.5rem' }}>
                `ConversationService.confirmCareDeal()`이 Care 거래 확정의 진입점입니다. 채팅방이 Care 관련인지 확인한 뒤,
                각 참여자의 확정 상태를 기록하고, 양쪽 모두 확정되면 지원 승인과 요청 상태 전이, 에스크로 생성까지 이어집니다.
              </p>
              <CodeBlock>{`if (allParticipantsConfirmed && careRequest.getStatus() == OPEN) {
  acceptOrCreateCareApplication(provider);
  careRequest.setStatus(IN_PROGRESS);
  createEscrowFromRequester(offeredCoins);
}`}</CodeBlock>
              <ul style={{ listStyle: 'none', padding: 0, marginTop: '0.75rem', color: 'var(--text-secondary)', lineHeight: '1.8' }}>
                {li('CareApplication 생성/관리는 Care 서비스가 아니라 채팅 도메인에서 트리거됩니다.')}
                {li('`OPEN` 상태일 때만 자동 승인/전이를 허용합니다.')}
                {li('에스크로 로직은 Payment 도메인과 연결됩니다.')}
              </ul>
            </Card>

            <Card style={{ marginBottom: '1rem' }}>
              <h3 style={{ marginBottom: '0.75rem', color: 'var(--text-color)', fontSize: '1rem' }}>
                상태 변경과 에스크로 지급/환불
              </h3>
              <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', marginBottom: '0.5rem' }}>
                `CareRequestService.updateStatus()`는 단순 상태 문자열 변경이 아니라 권한 확인과 정산까지 함께 책임집니다.
              </p>
              <CodeBlock>{`if (newStatus == COMPLETED) {
  escrow = petCoinEscrowService.findByCareRequestForUpdate(request);
  if (escrow.status == HOLD) {
    petCoinEscrowService.releaseToProvider(escrow);
  }
}

if (newStatus == CANCELLED) {
  escrow = petCoinEscrowService.findByCareRequestForUpdate(request);
  if (escrow.status == HOLD) {
    petCoinEscrowService.refundToRequester(escrow);
  }
}`}</CodeBlock>
              <ul style={{ listStyle: 'none', padding: 0, marginTop: '0.75rem', color: 'var(--text-secondary)', lineHeight: '1.8' }}>
                {li('소프트 삭제된 요청은 상태 변경 대상에서 제외합니다.')}
                {li('작성자 또는 승인된 제공자만 상태 변경이 가능하고, 관리자는 우회 가능합니다.')}
                {li('에스크로 조회는 `for update` 계열 경로를 사용해 정산 중복을 방지합니다.')}
              </ul>
            </Card>

            <Card style={{ marginBottom: '1rem' }}>
              <h3 style={{ marginBottom: '0.75rem', color: 'var(--text-color)', fontSize: '1rem' }}>
                날짜 지난 요청 자동 완료
              </h3>
              <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', marginBottom: '0.5rem' }}>
                `CareRequestScheduler.updateExpiredCareRequests()`는 매 시간 정각과 매일 자정에 돌면서 만료된 요청을 `COMPLETED`로 처리합니다.
              </p>
              <CodeBlock>{`@Scheduled(cron = "0 0 * * * ?")
@Scheduled(cron = "0 0 0 * * ?")
public void updateExpiredCareRequests() {
  careRequestService.updateStatus(idx, "COMPLETED", null);
}`}</CodeBlock>
              <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', marginTop: '0.75rem', marginBottom: 0 }}>
                이 경로도 결국 `updateStatus()`를 거치므로, 완료 시 `completedAt` 기록과 에스크로 지급 규칙을 동일하게 따릅니다.
              </p>
            </Card>

            <Card style={{ marginBottom: '1rem' }}>
              <h3 style={{ marginBottom: '0.75rem', color: 'var(--text-color)', fontSize: '1rem' }}>
                요청 수정/삭제와 권한 체크
              </h3>
              <CodeBlock>{`if (!isAdmin() && !request.getUser().getIdx().equals(currentUserId)) {
  throw CareForbiddenException.ownRequestOnly();
}

if (dto.getPetIdx() != null) {
  validatePetOwnership();
} else if (dto.getPetIdx() == null && request.getPet() != null) {
  request.setPet(null);
}`}</CodeBlock>
              <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', marginTop: '0.75rem', marginBottom: 0 }}>
                수정/삭제는 작성자 중심 권한 모델이고, 관리자는 별도 우회 경로를 갖습니다. 펫 연결은 소유자 검증이 핵심입니다.
              </p>
            </Card>

            <Card style={{ marginBottom: '1rem' }}>
              <h3 style={{ marginBottom: '0.75rem', color: 'var(--text-color)', fontSize: '1rem' }}>
                댓글 작성과 알림 조건
              </h3>
              <CodeBlock>{`if (!requestOwnerId.equals(user.getIdx())) {
  notificationService.createNotification(
    requestOwnerId,
    NotificationType.CARE_REQUEST_COMMENT,
    ...
  );
}`}</CodeBlock>
              <ul style={{ listStyle: 'none', padding: 0, marginTop: '0.75rem', color: 'var(--text-secondary)', lineHeight: '1.8' }}>
                {li('자기 요청에 자기가 댓글을 달면 알림을 보내지 않습니다.')}
                {li('댓글 작성은 `SERVICE_PROVIDER` 역할만 허용됩니다.')}
                {li('삭제는 Soft Delete 방식으로 처리합니다.')}
              </ul>
            </Card>

            <Card>
              <h3 style={{ marginBottom: '0.75rem', color: 'var(--text-color)', fontSize: '1rem' }}>
                리뷰 중복 방지
              </h3>
              <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', marginBottom: '0.5rem' }}>
                리뷰는 exists 체크만 믿지 않고, 저장 시 DB 유니크 위반까지 `CareConflictException.alreadyReviewed()`로 매핑합니다.
              </p>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, color: 'var(--text-secondary)', lineHeight: '1.8' }}>
                {li('요청자만 리뷰 작성 가능')}
                {li('`ACCEPTED`된 지원 건에 대해서만 리뷰 허용')}
                {li('중복 리뷰는 애플리케이션 레벨 + DB 레벨에서 모두 차단')}
              </ul>
            </Card>
          </section>

          <section id="architecture" style={{ marginBottom: '3rem', scrollMarginTop: '2rem' }}>
            <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>아키텍처</h2>

            <Card style={{ marginBottom: '1rem' }}>
              <h3 style={{ marginBottom: '0.75rem', color: 'var(--text-color)', fontSize: '1rem' }}>도메인 구조</h3>
              <CodeBlock>{`domain/care/
  controller/
    CareRequestController.java
    CareRequestCommentController.java
    CareReviewController.java
  service/
    CareRequestService.java
    CareRequestCommentService.java
    CareReviewService.java
    CareRequestScheduler.java
  entity/
    CareRequest.java
    CareApplication.java
    CareReview.java
    CareRequestComment.java
  repository/
    CareRequestRepository.java
    CareApplicationRepository.java
    CareReviewRepository.java
    CareRequestCommentRepository.java`}</CodeBlock>
              <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', marginTop: '0.75rem', marginBottom: 0 }}>
                `CareApplication` 생성과 거래 확정은 채팅 도메인 `ConversationService`와 연결되고, 관리자 요청은 `AdminCareRequestController`와
                `AdminCareAndMeetupFacade`를 통해 들어옵니다.
              </p>
            </Card>

            <Card style={{ marginBottom: '1rem' }}>
              <h3 style={{ marginBottom: '0.75rem', color: 'var(--text-color)', fontSize: '1rem' }}>주요 엔티티</h3>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid var(--nav-border)' }}>
                    <th style={{ padding: '0.65rem 0.75rem', textAlign: 'left', color: 'var(--text-color)' }}>엔티티</th>
                    <th style={{ padding: '0.65rem 0.75rem', textAlign: 'left', color: 'var(--text-color)' }}>역할</th>
                    <th style={{ padding: '0.65rem 0.75rem', textAlign: 'left', color: 'var(--text-color)' }}>핵심 필드</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['CareRequest', '펫케어 모집 게시물', 'title, description, date, offeredCoins, status, latitude, longitude, completedAt'],
                    ['CareApplication', '제공자의 지원 상태', 'provider, message, status(PENDING/ACCEPTED/REJECTED)'],
                    ['CareReview', '요청자가 제공자에게 남기는 리뷰', 'careApplication, reviewer, reviewee, rating, comment'],
                    ['CareRequestComment', '요청 댓글', 'user, content, isDeleted']
                  ].map(([name, role, fields], index, arr) => (
                    <tr key={name} style={{ borderBottom: index < arr.length - 1 ? '1px solid var(--nav-border)' : 'none' }}>
                      <td style={{ padding: '0.65rem 0.75rem', color: 'var(--text-color)' }}>{name}</td>
                      <td style={{ padding: '0.65rem 0.75rem' }}>{role}</td>
                      <td style={{ padding: '0.65rem 0.75rem' }}>{fields}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Card>

            <Card style={{ marginBottom: '1rem' }}>
              <h3 style={{ marginBottom: '0.75rem', color: 'var(--text-color)', fontSize: '1rem' }}>엔티티 관계도</h3>
              <MermaidDiagram chart={entityDiagram} />
            </Card>

            <Card style={{ marginBottom: '1rem' }}>
              <h3 style={{ marginBottom: '0.75rem', color: 'var(--text-color)', fontSize: '1rem' }}>주요 API</h3>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid var(--nav-border)' }}>
                    <th style={{ padding: '0.65rem 0.75rem', textAlign: 'left', color: 'var(--text-color)' }}>엔드포인트</th>
                    <th style={{ padding: '0.65rem 0.75rem', textAlign: 'left', color: 'var(--text-color)' }}>Method</th>
                    <th style={{ padding: '0.65rem 0.75rem', textAlign: 'left', color: 'var(--text-color)' }}>설명</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['/api/care-requests', 'GET', '요청 목록 조회 (status/location/page/size)'],
                    ['/api/care-requests/{id}', 'GET', '단일 요청 조회'],
                    ['/api/care-requests', 'POST', '요청 생성, 인증 필요'],
                    ['/api/care-requests/{id}', 'PUT', '요청 수정, 작성자만 가능'],
                    ['/api/care-requests/{id}', 'DELETE', '요청 삭제, 작성자만 가능'],
                    ['/api/care-requests/my-requests', 'GET', '내 요청 목록, 토큰 기준 userId 사용'],
                    ['/api/care-requests/{id}/status', 'PATCH', '상태 변경, 작성자/승인 제공자 가능'],
                    ['/api/care-requests/search', 'GET', '요청 검색 (페이징)'],
                    ['/api/care-requests/{careRequestId}/comments', 'GET/POST', '댓글 목록 / 댓글 작성'],
                    ['/api/chat/conversations/{conversationIdx}/confirm-deal', 'POST', '거래 확정, 양쪽 모두 확정 시 자동 승인·에스크로'],
                    ['/api/care-reviews', 'POST', '리뷰 작성']
                  ].map(([path, method, desc], index, arr) => (
                    <tr key={path + method} style={{ borderBottom: index < arr.length - 1 ? '1px solid var(--nav-border)' : 'none' }}>
                      <td style={{ padding: '0.65rem 0.75rem' }}>
                        <code style={{ backgroundColor: 'var(--bg-color)', padding: '0.15rem 0.35rem', borderRadius: '4px' }}>{path}</code>
                      </td>
                      <td style={{ padding: '0.65rem 0.75rem' }}>{method}</td>
                      <td style={{ padding: '0.65rem 0.75rem' }}>{desc}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', marginTop: '0.75rem', marginBottom: 0, fontSize: '0.9rem' }}>
                보안 측면에서 `/api/**`는 기본 인증이 필요하고, `GET /my-requests`는 쿼리 `userId`를 없애고 `SecurityContext`의 현재 사용자로만
                조회하도록 바꿔 IDOR 가능성을 줄였습니다.
              </p>
            </Card>

            <Card>
              <h3 style={{ marginBottom: '0.75rem', color: 'var(--text-color)', fontSize: '1rem' }}>권한 및 예외 정책</h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, color: 'var(--text-secondary)', lineHeight: '1.8' }}>
                {li('요청 생성: 이메일 인증 필요 (`EmailVerificationPurpose.PET_CARE`)')}
                {li('요청 수정/삭제: 작성자만 가능, 관리자는 우회')}
                {li('상태 변경: 작성자 또는 승인된 제공자만 가능, 관리자는 우회')}
                {li('댓글 작성: `SERVICE_PROVIDER` 역할만 허용')}
                {li('리뷰 작성: 요청자만 허용')}
                {li('대표 예외: `CareRequestNotFoundException`, `CareForbiddenException`, `CareValidationException`, `CareConflictException`, `CarePaymentException`')}
              </ul>
            </Card>
          </section>

          <section id="troubleshooting" style={{ marginBottom: '3rem', scrollMarginTop: '2rem' }}>
            <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>트러블슈팅</h2>

            <Card style={{ marginBottom: '1rem' }}>
              <h3 style={{ marginBottom: '0.75rem', color: 'var(--text-color)', fontSize: '1rem' }}>
                거래 확정 Race Condition
              </h3>
              <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', marginBottom: '0.75rem' }}>
                동시에 거래 확정을 누르면 각 트랜잭션이 상대방의 최신 상태를 못 보고, 둘 다 눌렀는데도 `OPEN`에 머무르는 Stuck 상황이 생길 수 있습니다.
              </p>
              <MermaidDiagram chart={raceConditionSequence} />
            </Card>

            <Card style={{ marginBottom: '1rem' }}>
              <h3 style={{ marginBottom: '0.75rem', color: 'var(--text-color)', fontSize: '1rem' }}>
                비관적 락으로 순차화
              </h3>
              <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', marginBottom: '0.75rem' }}>
                확정 대상 행을 `SELECT ... FOR UPDATE`로 잠가 한 트랜잭션씩 순차 처리하면, 두 번째 요청은 첫 번째 요청의 최신 상태를 본 뒤
                안전하게 `IN_PROGRESS` 전이를 수행할 수 있습니다.
              </p>
              <MermaidDiagram chart={lockSequence} />
            </Card>

            {[
              ['권한 누수 방지', '`my-requests`를 임의 userId로 조회할 수 있으면 타인 요청 목록을 볼 수 있습니다.', '컨트롤러가 현재 인증 사용자 ID만 서비스에 전달하도록 변경했습니다.'],
              ['리뷰 중복 작성', 'exists 체크만으로는 동시 요청 시 중복 리뷰가 저장될 수 있습니다.', 'DB 유니크 위반까지 `alreadyReviewed` 예외로 매핑해 막았습니다.'],
              ['댓글 알림 오발송', '자기 글에 자기가 댓글을 달아도 알림이 가면 노이즈가 됩니다.', '작성자와 요청자가 다를 때만 알림을 보내도록 조건을 뒀습니다.']
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

          <section id="performance" style={{ marginBottom: '3rem', scrollMarginTop: '2rem' }}>
            <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>성능 최적화</h2>

            <Card style={{ marginBottom: '1rem' }}>
              <h3 style={{ marginBottom: '0.75rem', color: 'var(--text-color)', fontSize: '1rem' }}>인덱스 전략</h3>
              <CodeBlock>{`CREATE INDEX fk_carerequest_pet ON carerequest(pet_idx);
CREATE INDEX user_idx ON carerequest(user_idx);
CREATE INDEX care_request_idx ON careapplication(care_request_idx);
CREATE INDEX provider_idx ON careapplication(provider_idx);
CREATE INDEX fk_care_request_comment_request ON carerequest_comment(care_request_idx);
CREATE INDEX fk_care_request_comment_user ON carerequest_comment(user_idx);
CREATE INDEX care_application_idx ON carereview(care_application_idx);
CREATE INDEX reviewee_idx ON carereview(reviewee_idx);
CREATE INDEX reviewer_idx ON carereview(reviewer_idx);`}</CodeBlock>
              <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', marginTop: '0.75rem', marginBottom: 0 }}>
                요청별, 사용자별, 지원별, 리뷰 대상별 조회처럼 실제 WHERE/JOIN 패턴에 맞춰 인덱스를 구성했습니다.
              </p>
            </Card>

            <Card style={{ marginBottom: '1rem' }}>
              <h3 style={{ marginBottom: '0.75rem', color: 'var(--text-color)', fontSize: '1rem' }}>N+1 해결</h3>
              <CodeBlock>{`@Query("SELECT cr FROM CareRequest cr " +
       "JOIN FETCH cr.user " +
       "LEFT JOIN FETCH cr.pet " +
       "WHERE cr.isDeleted = false")
List<CareRequest> findAllWithUserAndPet();`}</CodeBlock>
              <ul style={{ listStyle: 'none', padding: 0, marginTop: '0.75rem', color: 'var(--text-secondary)', lineHeight: '1.8' }}>
                {li('`findByIdWithApplications`, `findByIdWithUser`, `findAllActiveRequests` 같은 fetch 전략으로 요청·작성자·펫·지원을 한 번에 묶었습니다.')}
                {li('목록 조회에서 2400개 수준까지 늘던 쿼리를 4~5개로 줄였습니다.')}
                {li('평균 평점은 아직 별도 캐시 없이 계산하지만, 필요하면 `@Cacheable`로 확장 가능한 구조입니다.')}
              </ul>
            </Card>

            <Card>
              <h3 style={{ marginBottom: '0.75rem', color: 'var(--text-color)', fontSize: '1rem' }}>애플리케이션 레벨 최적화</h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, color: 'var(--text-secondary)', lineHeight: '1.8' }}>
                {li('조회 메서드는 `@Transactional(readOnly = true)`를 사용합니다.')}
                {li('자동 완료는 스케줄러를 통해 주기적으로 처리해 요청 경로 부담을 줄입니다.')}
                {li('정산은 에스크로 잠금 기반으로 처리해 동시성 안정성을 우선합니다.')}
              </ul>
            </Card>
          </section>

          <section id="summary" style={{ marginBottom: '3rem', scrollMarginTop: '2rem' }}>
            <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>핵심 포인트</h2>
            <Card>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, color: 'var(--text-secondary)', lineHeight: '1.8' }}>
                <li>• Care는 게시판형 CRUD가 아니라 채팅, Payment, 권한, 상태 전이가 얽힌 워크플로우 도메인입니다.</li>
                <li>• 거래 확정 동시성 제어와 에스크로 정산이 가장 중요한 데이터 정합성 포인트입니다.</li>
                <li>• 요청 수정/삭제, 상태 변경, 댓글, 리뷰가 각각 다른 권한 모델을 가져 서비스 단에서 명시적으로 검증합니다.</li>
                <li>• 목록 조회는 fetch 전략과 N+1 제거가 핵심이었고, 실제로 쿼리 수와 응답 시간을 크게 줄였습니다.</li>
                <li>• `my-requests` 토큰 기반 조회, 중복 리뷰 방지, 댓글 알림 조건 같은 운영 세부 정책도 함께 정리했습니다.</li>
              </ul>
            </Card>
          </section>

          <section id="docs" style={{ marginBottom: '3rem', scrollMarginTop: '2rem' }}>
            <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>관련 페이지</h2>
            <Card>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, color: 'var(--text-secondary)', lineHeight: '2' }}>
                <li>
                  •{' '}
                  <Link to="/domains/care/optimization" style={{ color: 'var(--link-color)', textDecoration: 'none' }}>
                    Care 도메인 성능 최적화
                  </Link>
                </li>
                <li>
                  •{' '}
                  <Link to="/domains/care/refactoring" style={{ color: 'var(--link-color)', textDecoration: 'none' }}>
                    Care 도메인 리팩토링
                  </Link>
                </li>
                <li>
                  •{' '}
                  <a
                    href="https://github.com/makkong1/makkong1-github.io/blob/main/docs/domains/payment.md"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: 'var(--link-color)', textDecoration: 'none' }}
                  >
                    Payment 도메인 문서
                  </a>
                </li>
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
