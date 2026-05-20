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
const PETORY_CARE_N1_DOC =
  'https://github.com/makkong1/Petory/blob/main/docs/troubleshooting/care/care-request-n-plus-one-analysis.md';
const PETORY_CARE_RACE_DOC =
  'https://github.com/makkong1/Petory/blob/main/docs/troubleshooting/care/care-deal-confirmation-race-condition.md';

function CareDomainV2() {
  const sections = [
    { id: 'pillars', title: '핵심 기능' },
    { id: 'intro', title: '도메인 개요' },
    { id: 'design', title: '기술 결정' },
    { id: 'limits', title: '한계 & 개선' },
    { id: 'docs', title: '관련 페이지' },
  ];

  const corePillars = [
    'Race Condition 제어',
    'N+1 최적화',
    '에스크로 연동',
    '처리 경로 일원화',
    '위치 기반 조회',
  ];

  const flowDiagram = `flowchart LR
    U1["요청자"]
    U2["제공자"]

    subgraph Care["Care 도메인"]
        CR["CareRequest\n케어 요청"]
        CA["CareApplication\n지원 승인 또는 생성"]
        CP["COMPLETED·CANCELLED\n완료·취소 상태"]
        RV["CareReview\n리뷰 (ACCEPTED 기준)"]
    end

    subgraph Chat["Chat 도메인"]
        CH["Conversation\n채팅방"]
        DC["거래 확정\n비관적 락"]
    end

    subgraph Payment["Payment 도메인"]
        ES["PetCoinEscrow\n에스크로 생성 시도"]
        PAY["지급·환불\n코인 이동"]
    end

    U1 --> CR
    U2 --> CH
    CR --> CH
    CH --> DC
    DC --> CA
    DC --> ES
    CA --> RV
    ES --> CP
    CP --> PAY`;

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
            Care 도메인은 반려동물 돌봄이 필요한 사용자와 돌봄 제공자를 연결하는 Petory의
            매칭 기능입니다. 처음에는 요청 등록·매칭처럼 보였지만, 실제 구현에서는 두
            사용자가 동시에 거래를 확정할 때 발생하는 Race Condition, 상태 변경과
            에스크로 결제의 연계, 목록 조회 N+1 같은 정합성·성능 문제를 함께 다뤄야
            했습니다. 저는 채팅, 케어 요청, 결제가 하나의 흐름으로 얽히는 구간에서
            데이터가 어떻게 깨질 수 있는지를 중심으로 설계했습니다.
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
                이 있으면 승인하고 없으면 그 자리에서 생성합니다. 이후 에스크로
                생성을 시도하지만, 실패 시 상태 전이가 롤백되지 않아 원자성은
                보장되지 않습니다. 목록 조회에서는 요청·지원자 수·반려동물·파일이
                얽혀 naive 구현 시 쿼리 수가 폭증하기 때문에 Fetch Join과 배치
                집계를 함께 적용했습니다.
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
                  marginBottom: '0.75rem',
                  color: 'var(--text-color)',
                  fontSize: '1rem',
                }}
              >
                데이터 흐름
              </h3>
              <MermaidDiagram chart={flowDiagram} />
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
                {li('에스크로는 시도 — 실패 시 IN_PROGRESS 유지, 로그만 남김 (한계)')}
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
                {li(
                  <>
                    상세는{' '}
                    <Link
                      to="/domains/care/optimization"
                      style={{
                        color: 'var(--link-color)',
                        textDecoration: 'none',
                      }}
                    >
                      성능 최적화
                    </Link>{' '}
                    페이지 참고
                  </>
                )}
              </ul>
              <CodeBlock>{`// 1단계: JOIN FETCH로 핵심 연관 함께 로딩
List<CareRequest> list = careRequestRepository.findAllActiveRequests();

// 2단계: 나머지 연관은 ID 배치 조회
List<Long> ids = list.stream().map(CareRequest::getIdx).toList();
// applicationCount, files 등 IN 쿼리 — 총 4~5개로 수렴`}</CodeBlock>
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
              </ul>
              <CodeBlock>{`// updateStatus — 요청자 또는 승인된 제공자만 가능
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
            id="limits"
            style={{ marginBottom: '3rem', scrollMarginTop: '2rem' }}
          >
            <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>
              한계 &amp; 다음 개선
            </h2>
            <Card>
              <p
                style={{
                  color: 'var(--text-secondary)',
                  fontSize: '0.9rem',
                  lineHeight: '1.7',
                  marginTop: 0,
                  marginBottom: '0.75rem',
                }}
              >
                결제 원자성과 권한 정책까지 완전히 닫힌 완성형이라기보다, 핵심 병목과
                정합성 이슈를 단계적으로 다듬어 온 사례에 더 가깝습니다.
              </p>
              <ul
                style={{
                  listStyle: 'none',
                  padding: 0,
                  margin: 0,
                  color: 'var(--text-secondary)',
                  lineHeight: '1.8',
                }}
              >
                {li(
                  '에스크로 원자성: IN_PROGRESS 저장 후 에스크로 생성 실패를 로그로만 남겨 상태 전이와 결제가 원자적으로 묶이지 않음'
                )}
                {li(
                  '리뷰 시점: COMPLETED가 아닌 CareApplicationStatus.ACCEPTED 기준으로 리뷰 작성 가능'
                )}
                {li(
                  '권한 검증: createCareRequest·댓글·리뷰 작성은 요청 바디 userId를 신뢰하고, 댓글 삭제는 작성자·관리자 확인 없음'
                )}
                {li(
                  'API 인증: 컨트롤러상 공개 GET처럼 보이는 목록·상세·검색도 실제로는 SecurityConfig /api/** 때문에 인증 전제'
                )}
                {li(
                  '상태 전이: updateStatus()의 null currentUserId 예외 경로(스케줄러용)는 권한 검증이 통째로 생략됨'
                )}
              </ul>
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
                    to="/domains/care/optimization"
                    style={{ color: 'var(--link-color)', textDecoration: 'none' }}
                  >
                    Care 성능 최적화
                  </Link>
                  {' — N+1 상세, Fetch Join 전략, Before/After'}
                </li>
                <li>
                  •{' '}
                  <Link
                    to="/domains/care/refactoring"
                    style={{ color: 'var(--link-color)', textDecoration: 'none' }}
                  >
                    Care 리팩토링
                  </Link>
                  {' — 코드 구조, 중복 제거'}
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
