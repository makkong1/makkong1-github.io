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

function CareDomainV2() {
  const sections = [
    { id: 'pillars', title: '핵심 기능' },
    { id: 'intro', title: '도메인 개요' },
    { id: 'design', title: '구현 포인트' },
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
          <div className="domain-hero">
            <span className="eyebrow">Care</span>
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

          </div>

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
                    ['목록 조회 쿼리 수', '151개', '4개 (-97.4%)'],
                    ['응답 시간', '478ms', '210ms'],
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
                케어 요청 목록 기준. <strong>추정이 아니라 <code>git worktree</code>로 실제 이전
                커밋을 checkout해 그 시점 코드를 그대로 실행한 실측</strong>입니다. 주 지표는 쿼리
                수이고, 절대 시간은 JIT·커넥션풀 워밍업 탓에 실행마다 달라지므로 보조로만 봅니다.
              </p>
              <p
                style={{
                  color: 'var(--text-muted)',
                  fontSize: '0.8rem',
                  marginTop: '0.5rem',
                  marginBottom: 0,
                  lineHeight: '1.7',
                }}
              >
                ※ 이전에 쓰던 <code>~2,400 → 4~5</code>는 <code>@BatchSize</code> 도입 <strong>이전 세대</strong>의
                값이라 재검증 후 위 재현치로 교체했습니다. 경위는{' '}
                <Link
                  to="/domains/cases?case=list-n-plus-one"
                  style={{ color: 'var(--link-color)', textDecoration: 'none' }}
                >
                  대표 개선 사례
                </Link>
                에 있습니다.
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
              구현 포인트
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
                {li('두 참여자 상태를 함께 판단하는 check-then-act라 원자적 UPDATE로 표현 불가 — Conversation 비관적 락으로 직렬화')}
                {li('동시 확정 시 서로의 미커밋 확정을 못 봐 stuck state에 머무르던 문제를 구조적으로 제거')}
              </ul>
              <p style={{ margin: '0.75rem 0 0', fontSize: '0.86rem' }}>
                <Link to="/domains/cases?case=concurrency-strategy" style={{ color: 'var(--link-color)', fontWeight: 600, textDecoration: 'none' }}>
                  대표사례에서 자세히 보기 →
                </Link>
              </p>
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
                      to="/domains/cases?case=list-n-plus-one"
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
                {li(
                  <>
                    <code>geo_point</code>(POINT, SRID 4326) + SPATIAL 인덱스 —{' '}
                    <code>ST_Within</code>으로 후보를 좁히고{' '}
                    <code>ST_Distance_Sphere</code>로 미터 정밀 반경 (meetup·locationservice와 같은 패턴)
                  </>
                )}
                {li(
                  <>
                    지도 레이어가 쓰는 컬럼만 담은 projection(<code>CareRequestListView</code>)을
                    그대로 반환 — 컨버터를 거치지 않아 작성자·펫·지원내역 오버페칭이 없음
                  </>
                )}
                {li('limit은 1~500 사이로 클램핑해 과부하 방지')}
              </ul>
              <CodeBlock>{`public List<CareRequestListView> getNearby(
        double lat, double lng, double radiusKm, int limit) {
    int effectiveLimit = Math.min(Math.max(limit, 1), 500);
    // projection 을 그대로 반환한다. 컨버터(toDTO)를 태우면 요청마다
    // 작성자·펫·첨부를 다시 조회해 N+1 이 된다.
    return careRequestRepository.findNearby(lat, lng, radiusKm, effectiveLimit);
}

// 쿼리 — SPATIAL 인덱스를 타는 ST_Within + 정밀 반경 ST_Distance_Sphere
WHERE cr.is_deleted = false
  AND ST_Within(cr.geo_point, ST_GeomFromText(CONCAT('POLYGON((' ... ')'), 4326))
  AND ST_Distance_Sphere(cr.geo_point, ST_GeomFromText(...)) <= :radius * 1000`}</CodeBlock>
              <p
                style={{
                  color: 'var(--text-muted)',
                  fontSize: '0.8rem',
                  lineHeight: 1.7,
                  margin: '0.6rem 0 0',
                }}
              >
                처음엔 <code>latitude</code>·<code>longitude</code>를 <code>BETWEEN</code>으로 거르는
                B-tree 복합 인덱스를 시도했지만 효과가 없었습니다 — B-tree는 범위 조건을 선두에서
                하나만 쓸 수 있어 <code>latitude</code> 다음의 <code>longitude</code>가 걸러지지
                않습니다. 측정·전환 과정은{' '}
                <Link
                  to="/domains/cases"
                  style={{ color: 'var(--link-color)', textDecoration: 'none' }}
                >
                  전체 쿼리 감사
                </Link>
                에 있습니다.
              </p>
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
                    to="/domains/cases"
                    style={{ color: 'var(--link-color)', textDecoration: 'none' }}
                  >
                    전체 쿼리 감사
                  </Link>
                  {' — care 검색이 HTTP 500이었던 것 · 관리자 목록 N+1 · 주변검색 SPATIAL 전환'}
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
