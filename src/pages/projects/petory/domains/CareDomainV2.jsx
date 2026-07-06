import { Link } from 'react-router-dom';
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
        ...style,
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
        margin: '0.75rem 0 0',
      }}
    >
      {children}
    </pre>
  );
}

const PETORY_CARE_DOMAIN_DOC =
  'https://github.com/makkong1/Petory/blob/main/docs/domains/care.md';
const PETORY_CARE_ARCH_DOC =
  'https://github.com/makkong1/Petory/blob/main/docs/architecture/care/%ED%8E%AB%20%EC%BC%80%EC%96%B4%20%26%20%EB%A7%A4%EC%B9%AD%20%EC%95%84%ED%82%A4%ED%85%8D%EC%B2%98.md';
const PETORY_CARE_N1_DOC =
  'https://github.com/makkong1/Petory/blob/main/docs/troubleshooting/care/care-request-n-plus-one-analysis.md';
const PETORY_CARE_RACE_DOC =
  'https://github.com/makkong1/Petory/blob/main/docs/troubleshooting/care/care-deal-confirmation-race-condition.md';
const PETORY_CARE_SERVICE =
  'https://github.com/makkong1/Petory/blob/main/backend/main/java/com/linkup/Petory/domain/care/service/CareRequestService.java';
const PETORY_CONVERSATION_SERVICE =
  'https://github.com/makkong1/Petory/blob/main/backend/main/java/com/linkup/Petory/domain/chat/service/ConversationService.java';
const PETORY_ESCROW_SERVICE =
  'https://github.com/makkong1/Petory/blob/main/backend/main/java/com/linkup/Petory/domain/payment/service/PetCoinEscrowService.java';

function CareDomainV2() {
  const sections = [
    { id: 'pillars', title: '핵심 기능' },
    { id: 'intro', title: '도메인 개요' },
    { id: 'design', title: '기술 결정' },
    { id: 'docs', title: '관련 페이지' },
  ];

  const corePillars = [
    'Race Condition 제어',
    'N+1 최적화',
    '에스크로 연동',
    '처리 경로 일원화',
    '위치 기반 조회',
  ];

  const li = (text) => <li style={{ marginBottom: '0.35rem' }}>• {text}</li>;

  return (
    <div className="domain-page-wrapper" style={{ padding: '2rem 0' }}>
      <div
        className="domain-page-container"
        style={{ display: 'flex', gap: '2rem', alignItems: 'flex-start' }}
      >
        <div className="domain-page-content" style={{ flex: 1 }}>
          <h1 style={{ marginBottom: '0.5rem', color: 'var(--text-color)' }}>
            Care 도메인
          </h1>
          <p
            style={{
              color: 'var(--text-secondary)',
              lineHeight: '1.8',
              marginBottom: '0.85rem',
              fontSize: '0.95rem',
            }}
          >
            돌봄이 필요한 보호자와 제공자를 잇는 매칭 도메인입니다. 핵심은 요청
            등록보다, 채팅·케어 상태·펫코인 에스크로가 맞물리는 <strong>거래 확정
            흐름</strong>이었습니다. 두 사용자가 동시에 확정할 때의 Race Condition은
            Conversation 비관적 락으로 막고, 확정되면 지원 승인·상태 전이·에스크로
            생성을 연결합니다. 목록 조회의 N+1(요청자·반려동물·지원자 수·파일)은
            fetch join과 배치로 줄였습니다.
          </p>

          <section
            id="pillars"
            style={{ marginBottom: '2rem', scrollMarginTop: '2rem' }}
          >
            <h2
              style={{
                marginBottom: '0.75rem',
                color: 'var(--text-color)',
                fontSize: '1.1rem',
              }}
            >
              핵심 기능
            </h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {corePillars.map((label) => (
                <span
                  key={label}
                  style={{
                    padding: '0.35rem 0.75rem',
                    borderRadius: '999px',
                    fontSize: '0.82rem',
                    fontWeight: 600,
                    color: 'var(--text-color)',
                    backgroundColor: 'var(--bg-color)',
                    border: '1px solid var(--nav-border)',
                  }}
                >
                  {label}
                </span>
              ))}
            </div>
          </section>

          <section
            id="intro"
            style={{ marginBottom: '3rem', scrollMarginTop: '2rem' }}
          >
            <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>
              도메인 개요
            </h2>

            <Card style={{ marginBottom: '1rem' }}>
              <p
                style={{
                  lineHeight: '1.8',
                  color: 'var(--text-secondary)',
                  margin: 0,
                }}
              >
                거래 확정 흐름은 Chat·Payment·Care 세 도메인이 얽히는 지점입니다.{' '}
                <code
                  style={{
                    backgroundColor: 'var(--bg-color)',
                    padding: '0.1rem 0.3rem',
                    borderRadius: '4px',
                  }}
                >
                  confirmCareDeal()
                </code>
                에서는{' '}
                <code
                  style={{
                    backgroundColor: 'var(--bg-color)',
                    padding: '0.1rem 0.3rem',
                    borderRadius: '4px',
                  }}
                >
                  Conversation
                </code>
                에 비관적 락을 걸어 동시성 문제를 막고, 기존{' '}
                <code
                  style={{
                    backgroundColor: 'var(--bg-color)',
                    padding: '0.1rem 0.3rem',
                    borderRadius: '4px',
                  }}
                >
                  CareApplication
                </code>
                이 있으면 승인하고 없으면 즉시 생성합니다. 단 이후 에스크로
                생성이 실패해도 상태 전이는 롤백되지 않아 원자성은 보장되지
                않습니다. 목록 조회는 요청·지원자 수·반려동물·파일이 얽혀 쿼리가
                폭증하므로 Fetch Join과 배치 집계를 함께 씁니다.
              </p>
            </Card>

            <Card style={{ marginBottom: '1rem' }}>
              <table
                style={{
                  width: '100%',
                  borderCollapse: 'collapse',
                  fontSize: '0.9rem',
                  color: 'var(--text-secondary)',
                }}
              >
                <thead>
                  <tr style={{ borderBottom: '1px solid var(--nav-border)' }}>
                    <th
                      style={{
                        padding: '0.55rem 0.75rem',
                        textAlign: 'left',
                        color: 'var(--text-color)',
                      }}
                    >
                      지표
                    </th>
                    <th
                      style={{
                        padding: '0.55rem 0.75rem',
                        textAlign: 'left',
                        color: 'var(--text-color)',
                      }}
                    >
                      Before
                    </th>
                    <th
                      style={{
                        padding: '0.55rem 0.75rem',
                        textAlign: 'left',
                        color: 'var(--text-color)',
                      }}
                    >
                      After
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['목록 조회 쿼리 수', '~2,400개', '4~5개'],
                    ['응답 시간', '1,084ms', '66ms'],
                    ['메모리', '21MB', '6MB'],
                  ].map(([label, before, after], i, arr) => (
                    <tr
                      key={label}
                      style={{
                        borderBottom:
                          i < arr.length - 1
                            ? '1px solid var(--nav-border)'
                            : 'none',
                      }}
                    >
                      <td
                        style={{
                          padding: '0.55rem 0.75rem',
                          color: 'var(--text-color)',
                        }}
                      >
                        {label}
                      </td>
                      <td style={{ padding: '0.55rem 0.75rem' }}>{before}</td>
                      <td
                        style={{
                          padding: '0.55rem 0.75rem',
                          color: 'var(--text-color)',
                          fontWeight: 600,
                        }}
                      >
                        {after}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p
                style={{
                  color: 'var(--text-secondary)',
                  fontSize: '0.88rem',
                  marginTop: '0.75rem',
                  marginBottom: 0,
                  lineHeight: '1.7',
                }}
              >
                케어 요청 목록 기준·테스트 DB·
                <code
                  style={{
                    backgroundColor: 'var(--bg-color)',
                    padding: '0.1rem 0.3rem',
                    borderRadius: '4px',
                  }}
                >
                  entityManager.clear()
                </code>{' '}
                후 측정. 운영 수치는 환경에 따라 다를 수 있음.
              </p>
            </Card>

            <Card>
              <h3
                style={{
                  marginBottom: '0.65rem',
                  color: 'var(--text-color)',
                  fontSize: '1rem',
                }}
              >
                데이터 흐름
              </h3>
              <p
                style={{
                  color: 'var(--text-secondary)',
                  fontSize: '0.88rem',
                  lineHeight: '1.75',
                  margin: '0 0 0.65rem',
                }}
              >
                시퀀스 다이어그램은 도메인별로 두지 않고 통합 페이지에만 있습니다. Care 비즈 플로우와
                Chat 인프라(방 생성 후 메시지)는 각각 다른 절에 있습니다.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', alignItems: 'flex-start' }}>
                <Link
                  to="/domains/flows?tab=care"
                  style={{
                    color: 'var(--link-color)',
                    fontWeight: 600,
                    textDecoration: 'none',
                  }}
                >
                  Care · 요청·채팅·결제 시퀀스 →
                </Link>
                <Link
                  to="/domains/flows?tab=care&seq=chat"
                  style={{
                    color: 'var(--link-color)',
                    fontWeight: 600,
                    textDecoration: 'none',
                  }}
                >
                  Chat ↔ Care (방·메시지·읽음) 시퀀스 →
                </Link>
              </div>
            </Card>
          </section>

          <section
            id="design"
            style={{ marginBottom: '3rem', scrollMarginTop: '2rem' }}
          >
            <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>
              기술 결정
            </h2>

            <Card style={{ marginBottom: '1rem' }}>
              <h3
                style={{
                  marginBottom: '0.75rem',
                  color: 'var(--text-color)',
                  fontSize: '1rem',
                }}
              >
                A. 거래 확정 Race Condition
              </h3>
              <ul
                style={{
                  listStyle: 'none',
                  padding: 0,
                  margin: 0,
                  color: 'var(--text-secondary)',
                  lineHeight: '1.8',
                }}
              >
                {li('두 사용자 동시 확정 → 상태 전이 누락 위험 (stuck state)')}
                {li('Conversation 조회에 비관적 락 적용 → 확정 로직 순차 처리')}
                {li('기존 CareApplication 있으면 ACCEPTED, 없으면 그 자리에서 생성')}
                {li('에스크로 생성은 상태 전이 이후 별도 후속 처리로 분리')}
              </ul>
              <CodeBlock>{`// Conversation에 비관적 락 획득
Conversation conv = conversationRepository
    .findByIdWithLock(conversationId)
    .orElseThrow(...);

// 양측 모두 확정됐을 때만 상태 전환
if (bothConfirmed(conv)) {
    careApp = findOrCreate(careRequest, provider); // ACCEPTED
    careRequest.setStatus(CareRequestStatus.IN_PROGRESS);
    // 에스크로 생성 시도 — 실패해도 거래 확정은 유지
    try { petCoinEscrowService.createEscrow(...); }
    catch (Exception e) { log.warn("에스크로 생성 실패: {}", e.getMessage()); }
}`}</CodeBlock>
            </Card>

            <Card style={{ marginBottom: '1rem' }}>
              <h3
                style={{
                  marginBottom: '0.75rem',
                  color: 'var(--text-color)',
                  fontSize: '1rem',
                }}
              >
                B. 목록 N+1 최적화
              </h3>
              <ul
                style={{
                  listStyle: 'none',
                  padding: 0,
                  margin: 0,
                  color: 'var(--text-secondary)',
                  lineHeight: '1.8',
                }}
              >
                {li('요청자·반려동물: JOIN FETCH로 목록 쿼리에 포함')}
                {li('지원자 수·파일: ID 목록 → IN + GROUP BY 배치 집계')}
                {li('페이징 목록은 Page + OneToMany fetch join 제약 때문에 batch 전략 병행')}
                {li(
                  <>
                    상세는{' '}
                    <Link
                      to="/domains/refactoring#n-plus-one"
                      style={{
                        color: 'var(--link-color)',
                        textDecoration: 'none',
                      }}
                    >
                      대표 개선 사례
                    </Link>{' '}
                    참고
                  </>
                )}
              </ul>
              <CodeBlock>{`// 1단계: JOIN FETCH로 핵심 연관 함께 로딩
List<CareRequest> list = careRequestRepository.findAllActiveRequests();

// 2단계: 나머지 연관은 ID 배치 조회
List<Long> ids = list.stream().map(CareRequest::getIdx).toList();
// applicationCount, files 등 IN 쿼리
// 4~5개 수렴 수치는 기존 비페이징 N+1 측정 맥락`}</CodeBlock>
            </Card>

            <Card style={{ marginBottom: '1rem' }}>
              <h3
                style={{
                  marginBottom: '0.75rem',
                  color: 'var(--text-color)',
                  fontSize: '1rem',
                }}
              >
                C. 완료/취소 처리 일원화
              </h3>
              <ul
                style={{
                  listStyle: 'none',
                  padding: 0,
                  margin: 0,
                  color: 'var(--text-secondary)',
                  lineHeight: '1.8',
                }}
              >
                {li('수동 완료·스케줄러 완료·취소 — 세 경로 모두 updateStatus() 한 메서드')}
                {li('COMPLETED: 완료 시각 기록 + 에스크로 지급')}
                {li('CANCELLED: 에스크로 환불')}
              </ul>
              <CodeBlock>{`// COMPLETED 전환 시
if (oldStatus != COMPLETED && newStatus == COMPLETED) {
    request.setCompletedAt(LocalDateTime.now());
    PetCoinEscrow escrow = petCoinEscrowService.findByCareRequest(request);
    if (escrow != null && escrow.getStatus() == EscrowStatus.HOLD)
        petCoinEscrowService.releaseToProvider(escrow);
}
// CANCELLED 전환 시
if (newStatus == CANCELLED) {
    PetCoinEscrow escrow = petCoinEscrowService.findByCareRequest(request);
    if (escrow != null && escrow.getStatus() == EscrowStatus.HOLD)
        petCoinEscrowService.refundToRequester(escrow);
}`}</CodeBlock>
            </Card>

            <Card style={{ marginBottom: '1rem' }}>
              <h3
                style={{
                  marginBottom: '0.75rem',
                  color: 'var(--text-color)',
                  fontSize: '1rem',
                }}
              >
                D. 서비스 레벨 권한 검증
              </h3>
              <ul
                style={{
                  listStyle: 'none',
                  padding: 0,
                  margin: 0,
                  color: 'var(--text-secondary)',
                  lineHeight: '1.8',
                }}
              >
                {li('수정/삭제: 요청자 또는 관리자만 — 서비스 내부에서 검증')}
                {li('상태 변경: 요청자 또는 승인된 제공자로 제한')}
                {li('연결 가능한 반려동물: 요청자 본인 소유 펫만 허용')}
                {li('createCareRequest는 body userId가 아니라 인증 사용자 PK를 컨트롤러에서 DTO에 주입')}
              </ul>
              <CodeBlock>{`// createCareRequest — 인증 사용자 PK 주입 후 서비스로 전달
Long currentUserIdx = authenticatedUserIdResolver.requireCurrentUserIdx();
dto.setUserId(currentUserIdx);

// updateStatus — 요청자 또는 승인된 제공자만 가능
boolean isRequester = request.getUser().getIdx().equals(currentUserId);
boolean isAcceptedProvider = request.getApplications().stream()
    .anyMatch(app -> app.getStatus() == CareApplicationStatus.ACCEPTED
              && app.getProvider().getIdx().equals(currentUserId));

if (!isRequester && !isAcceptedProvider)
    throw CareForbiddenException.ownerOrApprovedProvider();`}</CodeBlock>
            </Card>

            <Card>
              <h3
                style={{
                  marginBottom: '0.75rem',
                  color: 'var(--text-color)',
                  fontSize: '1rem',
                }}
              >
                E. 위치 기반 조회
              </h3>
              <ul
                style={{
                  listStyle: 'none',
                  padding: 0,
                  margin: 0,
                  color: 'var(--text-secondary)',
                  lineHeight: '1.8',
                }}
              >
                {li('지도 표출용: 위도·경도·반경(km)·건수 제한으로 주변 요청 조회')}
                {li('Haversine 공식 네이티브 쿼리 → 거리 계산 DB 위임')}
                {li('limit은 1~500 사이로 클램핑해 과부하 방지')}
              </ul>
              <CodeBlock>{`public List<CareRequestDTO> getNearby(
        double lat, double lng, double radiusKm, int limit) {
    int effectiveLimit = Math.min(Math.max(limit, 1), 500);
    return careRequestRepository
        .findNearby(lat, lng, radiusKm, effectiveLimit)
        .stream()
        .map(careRequestConverter::toDTO)
        .toList();
}`}</CodeBlock>
            </Card>
          </section>
          <section
            id="docs"
            style={{ marginBottom: '3rem', scrollMarginTop: '2rem' }}
          >
            <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>
              관련 페이지
            </h2>
            <Card>
              <ul
                style={{
                  listStyle: 'none',
                  padding: 0,
                  margin: 0,
                  color: 'var(--text-secondary)',
                  lineHeight: '2',
                }}
              >
                <li>
                  •{' '}
                  <Link
                    to="/domains/refactoring#n-plus-one"
                    style={{ color: 'var(--link-color)', textDecoration: 'none' }}
                  >
                    대표 개선 사례 보기
                  </Link>
                  {' — N+1 성능 개선 · 동시성/Race Condition'}
                </li>
                <li>
                  •{' '}
                  <Link
                    to="/domains/chat"
                    style={{ color: 'var(--link-color)', textDecoration: 'none' }}
                  >
                    Chat 도메인
                  </Link>
                  {' — 거래 확정 진입점'}
                </li>
                <li>
                  •{' '}
                  <a
                    href={PETORY_CARE_ARCH_DOC}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: 'var(--link-color)', textDecoration: 'none' }}
                  >
                    펫 케어 & 매칭 아키텍처
                  </a>
                </li>
                <li>
                  •{' '}
                  <a
                    href={PETORY_CARE_DOMAIN_DOC}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: 'var(--link-color)', textDecoration: 'none' }}
                  >
                    Petory docs/domains/care.md
                  </a>
                </li>
                <li>
                  •{' '}
                  <a
                    href={PETORY_CARE_N1_DOC}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: 'var(--link-color)', textDecoration: 'none' }}
                  >
                    N+1 분석 문서 (care-request-n-plus-one-analysis.md)
                  </a>
                </li>
                <li>
                  •{' '}
                  <a
                    href={PETORY_CARE_RACE_DOC}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: 'var(--link-color)', textDecoration: 'none' }}
                  >
                    Race Condition 분석 문서 (care-deal-confirmation-race-condition.md)
                  </a>
                </li>
                <li>
                  •{' '}
                  <a
                    href={PETORY_CARE_SERVICE}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: 'var(--link-color)', textDecoration: 'none' }}
                  >
                    CareRequestService.java
                  </a>
                </li>
                <li>
                  •{' '}
                  <a
                    href={PETORY_CONVERSATION_SERVICE}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: 'var(--link-color)', textDecoration: 'none' }}
                  >
                    ConversationService.java
                  </a>
                </li>
                <li>
                  •{' '}
                  <a
                    href={PETORY_ESCROW_SERVICE}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: 'var(--link-color)', textDecoration: 'none' }}
                  >
                    PetCoinEscrowService.java
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

export default CareDomainV2;
