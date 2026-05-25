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

const PETORY_RECOMMEND_SERVICE =
  'https://github.com/makkong1/Petory/blob/main/backend/main/java/com/linkup/Petory/domain/recommendation/service/RecommendService.java';
const PETORY_LOCATION_REPO =
  'https://github.com/makkong1/Petory/blob/main/backend/main/java/com/linkup/Petory/domain/location/repository/SpringDataJpaLocationServiceRepository.java';
const PETORY_LOCATION_IMPORT =
  'https://github.com/makkong1/Petory/blob/main/backend/main/java/com/linkup/Petory/domain/location/service/LocationImportService.java';
const PETORY_RECOMMENDATION_DOC =
  'https://github.com/makkong1/Petory/blob/main/docs/domains/recommendation.md';
const PET_DATA_API_LOCAL_DISCOVERY =
  'https://github.com/makkong1/pet-data-api/blob/main/app/ingestion/local_discovery.py';
const PET_DATA_API_BLOG =
  'https://github.com/makkong1/pet-data-api/blob/main/app/ingestion/blog.py';

function RecommendationDomainV2() {
  const sections = [
    { id: 'pillars', title: '핵심 기능' },
    { id: 'intro', title: '도메인 개요' },
    { id: 'design', title: '기술 결정' },
    { id: 'limits', title: '한계 & 개선' },
    { id: 'docs', title: '관련 페이지' },
  ];

  const corePillars = [
    'GET /api/recommend 단일 진입',
    'Track A — Petory nearby + popular/trends',
    'Track B — 레거시 recommend()',
    '반경 검색 재사용 (LocationService)',
    '시설 적재 — CLI JSON → LocationImportService',
    'Location AI 추천 제거·통합',
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
            Recommendation 도메인
          </h1>
          <p
            style={{
              color: 'var(--text-secondary)',
              lineHeight: '1.8',
              marginBottom: '0.85rem',
              fontSize: '0.95rem',
            }}
          >
            Recommendation 도메인은 근처 시설 정보와 인기·트렌드 신호를 한 응답으로
            묶어 사용자에게 내려 주는 맞춤 추천 흐름을 Petory 안에서 책임지는 기능입니다.
            처음에는 외부에서 받은 값만 이어 보여 주면 된다고 보았지만, 실제 구현에서는
            DB 후보와 블로그 신호 이름이 조금만 달라져도 결과가 통째로 비는 순간, 로그인·
            Pet 선택 등 조건이 섞였을 때 응답을 나누는 일, 화면에 줄 문구까지 한 덩어리로
            묶는 일까지 함께 다뤄야 했습니다. 저는 합치는 규칙을 정하고, 추천 읽기
            입구를 한 경로로만 두며, 근처 시설 검색은 위치 도메인과 역할을 나누는
            방향으로 설계했습니다.
          </p>

          {/* 핵심 기능 */}
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

          {/* 도메인 개요 */}
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
                과거에는 <code>RecommendService</code>가 시설 검색까지 외부{' '}
                <code>recommend()</code>에 몰아 넣었지만, 현재 Track A에서는{' '}
                <code>searchLocationServicesByLocation</code>으로 반경 후보를 받고{' '}
                <code>fetchPopular</code>·<code>fetchTrends</code>로 인기·트렌드 신호만
                붙입니다. 최종 merge·정렬·<code>RecommendResponse</code> 조립은
                모두 Petory입니다. 추가로 <code>/api/recommend/copy</code>·{' '}
                <code>/events</code>·시계열 API 등 상세 계약은 recommendation.md 제2절과
                같습니다.
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
                    {['책임', 'Petory', 'pet-data-api'].map((h) => (
                      <th
                        key={h}
                        style={{
                          padding: '0.55rem 0.75rem',
                          textAlign: 'left',
                          color: 'var(--text-color)',
                        }}
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    [
                      'nearby 후보 (Track A 8컨텍스트)',
                      '✅ LocationService + findByRadius',
                      '❌',
                    ],
                    [
                      '인기 · 트렌드 신호',
                      '❌',
                      '✅ GET /popular · GET /trends',
                    ],
                    ['최종 정렬 · 응답 조립', '✅ RecommendService', '❌'],
                    [
                      '구조화 시설 적재(BATCH)',
                      '✅ LocationImportService 등 (location.md)',
                      '✅ cli.py popular 등 → JSON 원천',
                    ],
                    ['Redis TTL 서빙', '❌', '✅ (pet-data-api)'],
                    [
                      'Track B (supplies 등)',
                      '✅ recommend() 호출 · PetDataApiClient 내부 조합',
                      '✅ GET /popular · GET /trends 서빙',
                    ],
                  ].map(([label, petory, api], i, arr) => (
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
                      <td style={{ padding: '0.55rem 0.75rem' }}>{petory}</td>
                      <td
                        style={{
                          padding: '0.55rem 0.75rem',
                          color: 'var(--text-color)',
                          fontWeight: 600,
                        }}
                      >
                        {api}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
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
                시퀀스 다이어그램은 도메인별로 두지 않고 통합 페이지에만 있습니다.
              </p>
              <Link
                to="/domains/flows?tab=recommendation"
                style={{
                  color: 'var(--link-color)',
                  fontWeight: 600,
                  textDecoration: 'none',
                }}
              >
                Recommendation 시퀀스 보기 →
              </Link>
            </Card>
          </section>

          {/* 기술 결정 */}
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
                A. pet-data-api 역할 — 인기·트렌드 신호 (추천 서버 아님)
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
                {li(
                  '추천 읽기 API는 단일 진입점 GET /api/recommend — Location 쪽 LocationRecommendAgentService·/location-services/recommend는 제거됨.'
                )}
                {li(
                  'Track A에서 pet-data-api가 주는 것은 HTTP 기준으로 GET /popular·GET /trends(및 Redis 서빙)이며, 시설 DB 적재 원천은 문서상 CLI JSON → LocationImportService 경로가 기준입니다.'
                )}
                {li(
                  '외부 POST /recommend 같은 “통합 추천 서버”에는 의존하지 않고, Track A는 Petory가 후보와 신호를 직접 조합합니다.'
                )}
              </ul>
              <CodeBlock>{`// RecommendService — 컨텍스트 분기 (요지)
boolean petoryOwned = PETORY_OWNED_CONTEXTS.contains(normalizeContext(context));
return petoryOwned
    ? recommendWithPetoryCandidates(lat, lng, context, petInfo)  // Track A
    : recommendWithLegacyProxy(lat, lng, context, petInfo);       // Track B → client.recommend()

// pet-data-api (Track A 소비 — 읽기)
// GET /popular/{context}, GET /trends/{category}`}</CodeBlock>
            </Card>

            <Card style={{ marginBottom: '1rem' }}>
              <h3
                style={{
                  marginBottom: '0.75rem',
                  color: 'var(--text-color)',
                  fontSize: '1rem',
                }}
              >
                B. Petory owner 전환 — findByRadius 재사용
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
                {li(
                  'Petory에는 이미 MySQL ST_Within + ST_Distance_Sphere 기반 findByRadius가 구현되어 있었고 LocationServiceController 경로에서 실제 운영 중이었습니다.'
                )}
                {li(
                  'RecommendService가 LocationServiceService를 주입해 searchLocationServicesByLocation(lat, lng, radius, … category, "distance", topN)를 호출합니다.'
                )}
                {li(
                  'Track A에서는 반경 후보(NEARBY_CANDIDATE_LIMIT)·fetchPopular·fetchTrends를 이름 정규화로 join하고 recommend_version은 petory-nearby-v1.'
                )}
              </ul>
              <CodeBlock>{`// SpringDataJpaLocationServiceRepository — 이미 운영 중 (공간 인덱스 정상 작동 확인)
@Query(value = "SELECT * FROM locationservice ls WHERE " +
    "ST_Within(ls.location, ST_GeomFromText(:polygon, 4326)) AND " +
    "ST_Distance_Sphere(ls.location, ST_GeomFromText(:point, 4326)) <= :radiusInMeters AND " +
    "ls.is_deleted = 0 " +
    "ORDER BY ST_Distance_Sphere(...) ASC, ls.rating DESC")
List<LocationService> findByRadius(
    @Param("latitude") Double lat, @Param("longitude") Double lng,
    @Param("radiusInMeters") Double radiusM, ...);

// RecommendService 방향 (Track A 발췌)
List<LocationServiceDTO> nearby =
    locationServiceService.searchLocationServicesByLocation(...);
var popular = petDataApiClient.fetchPopular(context, limit, requestId);
var trends  = petDataApiClient.fetchTrends(context, limit, requestId);
// → mergeNearbyCandidates(...) → RecommendResponse recommend_version petory-nearby-v1`}</CodeBlock>
            </Card>

            <Card style={{ marginBottom: '1rem' }}>
              <h3
                style={{
                  marginBottom: '0.75rem',
                  color: 'var(--text-color)',
                  fontSize: '1rem',
                }}
              >
                C. Track A / Track B 분리 — 시설 소유 vs 레거시 프록시
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
                {li(
                  'Track A: grooming · hospital · pharmacy · cafe · restaurant · pension · boarding · hotel — Petory DB에서 반경 후보를 가져오고 인기 신호만 pet-data-api에서 받습니다.'
                )}
                {li(
                  'boarding·hotel 포함 8컨텍스트 시설 행은 locationservice 마스터가 있어야 하며, bulk 적재 스토리는 recommendation.md·location.md의 배치 JSON·Import 흐름과 맞춥니다.'
                )}
                {li(
                  'Track B: supplies · snack · food · clothes 등 구조화 시설 마스터가 없거나 레거시 경로 유지 대상은 recommend() 한 방으로 처리합니다(lat/lng는 내부에서 사실상 미사용).'
                )}
                {li(
                  'popular 수집 파이프라인은 컨텍스트별로 runner에서 갈림(local_discovery 등)일 수 있으나, Petory 입장에서는 “Track A면 nearby + 신호 조합”으로 동일하게 취급합니다.'
                )}
              </ul>
              <CodeBlock>{`// RecommendService.java (발췌)
private static final Set<String> PETORY_OWNED_CONTEXTS = Set.of(
    "grooming", "hospital", "pharmacy", "cafe", "restaurant", "pension",
    "boarding", "hotel");

// Track B
private RecommendResponse recommendWithLegacyProxy(...) {
    RecommendRequest request = RecommendRequest.builder()...build();
    return petDataApiClient.recommend(request);  // 내부에서 popular + trends
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
                D. 구조화 시설 적재 (Location 도메인과 연결)
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
                {li(
                  'recommendation.md 1.1·location.md 로직 요약과 같이 pet-data-api CLI 출력 JSON을 Spring LocationImportService가 upsert 하는 경로가 시설 적재 서사입니다.'
                )}
                {li(
                  '스케줄·파일 트리거(FacilitySyncScheduler 01:00·app.location.import.file-path) 또는 POST /api/admin/location/import 등은 location.md 참고.'
                )}
                {li(
                  '레포에 FacilitySyncService·HTTP 시설 fetch가 따로 붙어 있더라도 RecommendService Track A 근처 후보 원천은 위 LocationService 레이어가 담당한다는 서술과 모순되지 않게 두었습니다.'
                )}
              </ul>
            </Card>

            <Card>
              <h3
                style={{
                  marginBottom: '0.75rem',
                  color: 'var(--text-color)',
                  fontSize: '1rem',
                }}
              >
                E. blog.py regex 시스템의 한계 인식
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
                {li(
                  'blog.py의 blocklist/regex 기반 상호명 추출은 시설·인기 수집 컨텍스트마다 PREFIX 패턴, suffix 제거, stopword를 별도로 관리합니다.'
                )}
                {li(
                  '_BLOCKLIST_EXACT 100+개, _BLOCKLIST_CONTAINS 30+개, 지역명 80+개가 이미 누적되어 있습니다. "한계에 도달할 것"이 아니라 이미 도달한 상태입니다.'
                )}
                {li(
                  '장기적으로 NER(개체명 인식) 또는 외부 카탈로그 매칭으로 교체해야 유지비가 낮아집니다. 당장은 유지하되 확장을 멈추는 방향을 결정했습니다.'
                )}
              </ul>
            </Card>
          </section>

          {/* 한계 & 다음 개선 */}
          <section
            id="limits"
            style={{ marginBottom: '3rem', scrollMarginTop: '2rem' }}
          >
            <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>
              한계 &amp; 다음 개선
            </h2>
            <Card>
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
                  'popularity 이름 매칭: Track A에서 findByRadius 후보와 GET /popular 명칭 정규화 불일치 시 신호가 빠질 수 있으며, 매칭률은 아직 계측하지 않았습니다.'
                )}
                {li(
                  'pet-data-api 쪽 enrich·regex 유지비: 블록리스트 증식은 이미 한계에 도달한 상태이므로 장기적으로 NER·카탈로그 매칭 등 후속 과제입니다.'
                )}
                {li(
                  'supplies 등 Track B는 여전히 Petory 영구 저장 없이 PetDataApiClient 내부 popular+trends 조합 응답에 의존 — 도메인 데이터가 생기면 Track A 패턴 검토 가능.'
                )}
              </ul>
            </Card>
          </section>

          {/* 관련 페이지 */}
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
                  <a
                    href={PETORY_RECOMMEND_SERVICE}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: 'var(--link-color)', textDecoration: 'none' }}
                  >
                    RecommendService.java
                  </a>
                  {' — Track A nearby merge · Track B recommend()'}
                </li>
                <li>
                  •{' '}
                  <a
                    href={PETORY_LOCATION_REPO}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: 'var(--link-color)', textDecoration: 'none' }}
                  >
                    SpringDataJpaLocationServiceRepository.java
                  </a>
                  {' — findByRadius (ST_Within · ST_Distance_Sphere)'}
                </li>
                <li>
                  •{' '}
                  <a
                    href={PETORY_LOCATION_IMPORT}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: 'var(--link-color)', textDecoration: 'none' }}
                  >
                    LocationImportService.java
                  </a>
                  {' — Python 배치 JSON → DB 적재(location.md와 정합)'}
                </li>
                <li>
                  •{' '}
                  <a
                    href={PETORY_RECOMMENDATION_DOC}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: 'var(--link-color)', textDecoration: 'none' }}
                  >
                    recommendation.md (Petory)
                  </a>
                  {' — API·Track A/B·DTO'}
                </li>
                <li>
                  •{' '}
                  <a
                    href={PET_DATA_API_LOCAL_DISCOVERY}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: 'var(--link-color)', textDecoration: 'none' }}
                  >
                    local_discovery.py
                  </a>
                  {' — popular 수집(컨텍스트별)·참고'}
                </li>
                <li>
                  •{' '}
                  <a
                    href={PET_DATA_API_BLOG}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: 'var(--link-color)', textDecoration: 'none' }}
                  >
                    blog.py
                  </a>
                  {' — Track A 인기 데이터 수집 · regex 시스템'}
                </li>
                <li>
                  •{' '}
                  <Link
                    to="/domains/recommendation/pet-data-api"
                    style={{ color: 'var(--link-color)', textDecoration: 'none' }}
                  >
                    pet-data-api 포트폴리오
                  </Link>
                  {' — 수집 파이프라인 · Redis 설계 · API 엔드포인트'}
                </li>
                <li>
                  •{' '}
                  <Link
                    to="/domains/location"
                    style={{ color: 'var(--link-color)', textDecoration: 'none' }}
                  >
                    Location 도메인
                  </Link>
                  {' — LocationServiceService.findByRadius() 운영 경로'}
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

export default RecommendationDomainV2;
