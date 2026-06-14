import { Link } from "react-router-dom";
import TableOfContents from "../../../../components/Common/TableOfContents";

function Card({ children, style }) {
  return (
    <div
      className="section-card"
      style={{
        padding: "1.5rem",
        backgroundColor: "var(--card-bg)",
        borderRadius: "8px",
        border: "1px solid var(--nav-border)",
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
        padding: "0.95rem 1rem",
        backgroundColor: "var(--bg-color)",
        borderRadius: "6px",
        overflowX: "auto",
        fontSize: "0.84rem",
        color: "var(--text-secondary)",
        fontFamily: "monospace",
        lineHeight: "1.65",
        margin: "0.75rem 0 0",
      }}
    >
      {children}
    </pre>
  );
}

const PETORY_LOCATION_SERVICE =
  "https://github.com/makkong1/Petory/blob/main/backend/main/java/com/linkup/Petory/domain/location/service/LocationServiceService.java";
const PETORY_LOCATION_REPO =
  "https://github.com/makkong1/Petory/blob/main/backend/main/java/com/linkup/Petory/domain/location/repository/SpringDataJpaLocationServiceRepository.java";
const PETORY_LOCATION_DOC =
  "https://github.com/makkong1/Petory/blob/main/docs/domains/location.md";
const PETORY_LOCATION_ARCH =
  "https://github.com/makkong1/Petory/blob/main/docs/architecture/location/%EC%9C%84%EC%B9%98%20%EA%B8%B0%EB%B0%98%20%EC%84%9C%EB%B9%84%EC%8A%A4%20%EC%95%84%ED%82%A4%ED%85%8D%EC%B2%98.md";

function LocationDomainV2() {
  const PETORY_RECOMMENDATION_DOC =
    "https://github.com/makkong1/Petory/blob/main/docs/domains/recommendation.md";

  const sections = [
    { id: "pillars", title: "핵심 기능" },
    { id: "intro", title: "도메인 개요" },
    { id: "design", title: "기술 결정" },
    { id: "limits", title: "한계 & 개선" },
    { id: "docs", title: "관련 페이지" },
  ];

  const corePillars = [
    "위치 우선 검색 분기",
    "sort=stable 추천순",
    "반경·size=300",
    "지도 「이 지역」",
    "JSON·CSV 적재",
    "목록/추천 API 분리",
  ];

  const li = (text) => <li style={{ marginBottom: "0.35rem" }}>• {text}</li>;

  return (
    <div className="domain-page-wrapper" style={{ padding: "2rem 0" }}>
      <div
        className="domain-page-container"
        style={{ display: "flex", gap: "2rem", alignItems: "flex-start" }}
      >
        <div className="domain-page-content" style={{ flex: 1 }}>
          <h1 style={{ marginBottom: "0.5rem", color: "var(--text-color)" }}>
            위치 서비스 도메인
          </h1>
          <p
            style={{
              color: "var(--text-secondary)",
              lineHeight: "1.8",
              marginBottom: "0.85rem",
              fontSize: "0.95rem",
            }}
          >
            위치 서비스 도메인은 지도에서 반려 동반 시설을 찾고 리뷰까지 이어
            주는 Petory의 탐색·검색 기능입니다. 처음에는 지도와 검색만 맞물리면
            된다고 보였지만, 실제 구현에서는 키워드·위치·지역이 겹칠 때도 위치를
            먼저 볼 검색 분기, 통합 지도에서 주변 목록 검색과 맞춤 추천 API를
            나누는 정리, 지도를 옮길 때 결과가 매번 덮이는 재조회, pet-data-api
            JSON과 공공 CSV로 시설을 채우는 적재까지 함께 다뤄야 했습니다. 저는
            검색 분기를 서비스 한곳에서 위치 → 지역 → FULLTEXT → 평점순으로
            묶고, 주변 목록은 검색 API만 쓰며 추천 읽기는 Recommendation
            도메인으로 모으며, 지도만 움직였을 때는 자동 조회 대신 「이
            지역」으로 검색 시점을 사용자에게 맡기는 방향으로 설계했습니다.
          </p>

          <section
            id="pillars"
            style={{ marginBottom: "2rem", scrollMarginTop: "2rem" }}
          >
            <h2
              style={{
                marginBottom: "0.75rem",
                color: "var(--text-color)",
                fontSize: "1.1rem",
              }}
            >
              핵심 기능
            </h2>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
              {corePillars.map((label) => (
                <span
                  key={label}
                  style={{
                    padding: "0.35rem 0.75rem",
                    borderRadius: "999px",
                    fontSize: "0.82rem",
                    fontWeight: 600,
                    color: "var(--text-color)",
                    backgroundColor: "var(--bg-color)",
                    border: "1px solid var(--nav-border)",
                  }}
                >
                  {label}
                </span>
              ))}
            </div>
          </section>

          <section
            id="intro"
            style={{ marginBottom: "3rem", scrollMarginTop: "2rem" }}
          >
            <h2 style={{ marginBottom: "1rem", color: "var(--text-color)" }}>
              도메인 개요
            </h2>

            <Card style={{ marginBottom: "1rem" }}>
              <p
                style={{
                  lineHeight: "1.8",
                  color: "var(--text-secondary)",
                  margin: 0,
                }}
              >
                백엔드 검색은{" "}
                <code>LocationServiceService.searchLocationServices</code> 한
                곳에서만 갈립니다. 좌표가 있으면 반경 검색을 먼저 타고, 같은
                요청에 키워드가 붙어 있어도 우선순위는 바뀌지 않습니다. 이
                경로에서는 키워드를 <strong>시설명에 포함되는지</strong>로만
                좁히며, 설명·카테고리까지 도는 전국 FULLTEXT 검색은 좌표·지역이
                없을 때만 씁니다. 좌표가 없으면 지역 계층 → 키워드만 있을 때
                FULLTEXT → 조건이 없으면 평점순입니다. 통합 지도 주변서비스 탭은
                위치·반경(기본 5km), 카테고리, 추천순(
                <code>sort=stable</code>)으로{" "}
                <code>/api/location-services/search</code>를 호출하고, 응답은
                최대 <code>size=300</code>건입니다. 지도에서는 뷰포트 중심(
                <code>mapViewportCenter</code>)과 실제 검색 중심(
                <code>searchCenter</code>)을 나눠, 드래그만으로는 목록이
                갱신되지 않고 「이 지역」을 눌렀을 때만 다시 조회합니다. 맞춤
                추천은 <code>RecommendCard</code>가 <code>/api/recommend</code>
                를 따로 부르고, 돌아온 시설을 목록의 <code>idx</code>와 맞춰
                강조할 뿐입니다. 카테고리·키워드· 정렬은 프론트에서 걸러내지
                않고 DB 쿼리에서 처리합니다.
              </p>
            </Card>

            <Card style={{ marginBottom: "1rem" }}>
              <table
                style={{
                  width: "100%",
                  borderCollapse: "collapse",
                  fontSize: "0.9rem",
                  color: "var(--text-secondary)",
                }}
              >
                <thead>
                  <tr style={{ borderBottom: "1px solid var(--nav-border)" }}>
                    {["지표", "Before", "After"].map((h) => (
                      <th
                        key={h}
                        style={{
                          padding: "0.55rem 0.75rem",
                          textAlign: "left",
                          color: "var(--text-color)",
                        }}
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["초기 로드 데이터 수", "22,699건", "1,026건"],
                    ["프론트 전체 처리 시간", "1,484ms", "약 700ms"],
                    ["메모리 사용량", "78.90MB", "약 28.6MB"],
                  ].map(([label, before, after], i, arr) => (
                    <tr
                      key={label}
                      style={{
                        borderBottom:
                          i < arr.length - 1
                            ? "1px solid var(--nav-border)"
                            : "none",
                      }}
                    >
                      <td
                        style={{
                          padding: "0.55rem 0.75rem",
                          color: "var(--text-color)",
                        }}
                      >
                        {label}
                      </td>
                      <td style={{ padding: "0.55rem 0.75rem" }}>{before}</td>
                      <td
                        style={{
                          padding: "0.55rem 0.75rem",
                          color: "var(--text-color)",
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
                  color: "var(--text-secondary)",
                  fontSize: "0.88rem",
                  marginTop: "0.75rem",
                  marginBottom: 0,
                  lineHeight: "1.7",
                }}
              >
                테스트 DB 기준 · 반경 검색 비교 시 백엔드는 생략 또는 0 이하{" "}
                <code
                  style={{
                    backgroundColor: "var(--bg-color)",
                    padding: "0.1rem 0.3rem",
                    borderRadius: "4px",
                  }}
                >
                  radius
                </code>
                를 <strong>10000m</strong>로 처리합니다(location.md 1.1절)·{" "}
                <code
                  style={{
                    backgroundColor: "var(--bg-color)",
                    padding: "0.1rem 0.3rem",
                    borderRadius: "4px",
                  }}
                >
                  size
                </code>{" "}
                제한 없이 전체 조회하던 초기 구조 vs 위치 기반 10km 반경 검색
                비교. 현재 컨트롤러 기본값은{" "}
                <code
                  style={{
                    backgroundColor: "var(--bg-color)",
                    padding: "0.1rem 0.3rem",
                    borderRadius: "4px",
                  }}
                >
                  size=100
                </code>
                . 통합 지도는 UI 반경 기본 <strong>5km</strong>(km→m 변환 후
                전달), 요청 <code>size=300</code> 고정(
                <code>LOCATION_RESULT_LIMIT</code>). 백엔드 <code>radius</code>{" "}
                생략·0 이하 시 서비스 기본은 10km.
              </p>
            </Card>

            <Card>
              <h3
                style={{
                  marginBottom: "0.65rem",
                  color: "var(--text-color)",
                  fontSize: "1rem",
                }}
              >
                데이터 흐름
              </h3>
              <p
                style={{
                  color: "var(--text-secondary)",
                  fontSize: "0.88rem",
                  lineHeight: "1.75",
                  margin: "0 0 0.65rem",
                }}
              >
                시퀀스 다이어그램은 도메인별로 두지 않고 통합 페이지에만
                있습니다.
              </p>
              <Link
                to="/domains/flows?tab=location"
                style={{
                  color: "var(--link-color)",
                  fontWeight: 600,
                  textDecoration: "none",
                }}
              >
                Location 시퀀스 보기 →
              </Link>
            </Card>
          </section>

          <section
            id="design"
            style={{ marginBottom: "3rem", scrollMarginTop: "2rem" }}
          >
            <h2 style={{ marginBottom: "1rem", color: "var(--text-color)" }}>
              기술 결정
            </h2>

            <Card style={{ marginBottom: "1rem" }}>
              <h3
                style={{
                  marginBottom: "0.75rem",
                  color: "var(--text-color)",
                  fontSize: "1rem",
                }}
              >
                A. 검색 분기 우선순위
              </h3>
              <ul
                style={{
                  listStyle: "none",
                  padding: 0,
                  margin: 0,
                  color: "var(--text-secondary)",
                  lineHeight: "1.8",
                }}
              >
                {li(
                  "lat/lng 있으면 → 반경 검색 (통합 지도·초기 로드 기본). keyword·category는 동일 쿼리 WHERE",
                )}
                {li("lat/lng 없고 지역 있으면 → road > eup > sigungu > sido")}
                {li(
                  "위치·지역 없고 keyword만 → FULLTEXT(이름·설명·카테고리). 반경·지역에서는 시설명 포함 여부만",
                )}
                {li("조건 없음 → 전체 평점순")}
                {li(
                  "sort=stable: rating·review_count·거리 tie-break — LocationControls·초기 locationSort 기본값",
                )}
              </ul>
              <CodeBlock>{`boolean hasLocation = latitude != null && longitude != null;
boolean hasRegion   = hasText(sido) || hasText(sigungu) || ...;
boolean hasKeyword  = hasText(keyword);

if (hasLocation)      results = searchLocationServicesByLocation(...);
else if (hasRegion)   results = searchLocationServicesByRegion(...);
else if (hasKeyword) results = searchLocationServicesByKeyword(...);  // FULLTEXT
else                  results = searchLocationServicesByRegion(
    null, null, null, null, null, category, maxResults);  // 전체 평점순 목록`}</CodeBlock>
            </Card>

            <Card style={{ marginBottom: "1rem" }}>
              <h3
                style={{
                  marginBottom: "0.75rem",
                  color: "var(--text-color)",
                  fontSize: "1rem",
                }}
              >
                B. 초기 로드 최적화
              </h3>
              <ul
                style={{
                  listStyle: "none",
                  padding: 0,
                  margin: 0,
                  color: "var(--text-secondary)",
                  lineHeight: "1.8",
                }}
              >
                {li(
                  "이전: size 제한 없이 전체 22,699건 로드 → 전송량·메모리 병목",
                )}
                {li(
                  "이후: 반경 검색 + 통합 지도 size=300 고정(meetup/care만 줌별 limit)",
                )}
                {li(
                  "컨트롤러 기본값 size=100, size≤0이면 상한 없음(관리자·배치용)",
                )}
              </ul>
              <CodeBlock>{`// unifiedMapApi.js (Petory) — location 탭만 고정 상한
const LOCATION_RESULT_LIMIT = 300;

locationServiceApi.searchPlaces({
  latitude: lat,
  longitude: lng,
  radius: radiusKm * 1000,  // UI km → API m
  sort,  // stable | distance | rating | reviews
  size: LOCATION_RESULT_LIMIT,
});`}</CodeBlock>
            </Card>

            <Card style={{ marginBottom: "1rem" }}>
              <h3
                style={{
                  marginBottom: "0.75rem",
                  color: "var(--text-color)",
                  fontSize: "1rem",
                }}
              >
                C. 지도 이동과 재조회 분리
              </h3>
              <ul
                style={{
                  listStyle: "none",
                  padding: 0,
                  margin: 0,
                  color: "var(--text-secondary)",
                  lineHeight: "1.8",
                }}
              >
                {li("mapViewportCenter — 지도 뷰포트 이동 시 즉시 갱신")}
                {li("searchCenter — 실제 API 호출 기준점, 버튼 클릭 시만 갱신")}
                {li(
                  "주변서비스 탭에서만 적용 — meetup/care는 mapViewportCenter 기준 nearby",
                )}
                {li(
                  "「이 지역」 클릭 → searchCenter 확정 → fetchActiveMapItems 재호출",
                )}
                {li(
                  "isSameCenter 기준으로 hasPendingAreaChange — 뷰포트가 검색 중심과 충분히 다를 때만 버튼 노출",
                )}
              </ul>
              <CodeBlock>{`// mapViewportCenter vs searchCenter 분리
const [mapViewportCenter, setMapViewportCenter] = useState(null);
const [searchCenter, setSearchCenter]           = useState(null);

const commitLocationSearch = useCallback((center) => {
  setSearchCenter({ ...center });       // 검색 기준 확정
  setHasPendingAreaChange(false);       // 버튼 숨김
}, []);

// LocationControls: hasPendingAreaChange → 「이 지역」 버튼
onSearchThisArea={() => commitLocationSearch(mapViewportCenter)}`}</CodeBlock>
            </Card>

            <Card style={{ marginBottom: "1rem" }}>
              <h3
                style={{
                  marginBottom: "0.75rem",
                  color: "var(--text-color)",
                  fontSize: "1rem",
                }}
              >
                D. 검색 분기별 서버 SQL 통합
              </h3>
              <ul
                style={{
                  listStyle: "none",
                  padding: 0,
                  margin: 0,
                  color: "var(--text-secondary)",
                  lineHeight: "1.8",
                }}
              >
                {li(
                  "반경 검색: ST_Within 공간 조건 + keyword(LIKE) + category + sort",
                )}
                {li(
                  "지역 검색: idx_sigungu_deleted_rating 인덱스 + keyword(LIKE) + category",
                )}
                {li(
                  "키워드 단독: MATCH(name, description, category1~3) FULLTEXT — 반경/지역 없을 때만",
                )}
                {li(
                  "클라이언트가 재필터링하지 않고 서버 SQL에서 일관되게 처리",
                )}
              </ul>
              <CodeBlock>{`-- 반경 검색: ST_Within bbox pre-filter → ST_Distance_Sphere 정밀 필터 → LIKE keyword
SELECT * FROM locationservice ls
WHERE ST_Within(
    ls.location,                      -- ① bbox 안에 있는 후보 추림 (SPATIAL 인덱스)
    ST_GeomFromText(CONCAT('POLYGON((',
      :lat - :r/111000, ' ', :lng - :r/(111000*COS(RADIANS(:lat))), ','
      -- ... bbox 4꼭짓점 ...
    '))'), 4326)
  )
  AND ST_Distance_Sphere(ls.location,
        ST_GeomFromText(CONCAT('POINT(',:lat,' ',:lng,')'), 4326)
      ) <= :radiusInMeters             -- ② 정확한 원형 필터
  AND (:keyword IS NULL
       OR ls.name LIKE CONCAT('%', :keyword, '%'))  -- ③ LIKE (SPATIAL 이후 적용)
ORDER BY
  CASE WHEN :sort = 'stable'   THEN ls.rating END DESC,
  CASE WHEN :sort = 'stable'   THEN ls.review_count END DESC,
  CASE WHEN :sort = 'reviews'  THEN ls.review_count END DESC,
  CASE WHEN :sort = 'rating'   THEN ls.rating END DESC,
  ST_Distance_Sphere(...) ASC
-- FULLTEXT(ft_search)는 keyword 단독 경로(위치·지역 없을 때)에서만 사용`}</CodeBlock>
            </Card>

            <Card style={{ marginBottom: "1rem" }}>
              <h3
                style={{
                  marginBottom: "0.75rem",
                  color: "var(--text-color)",
                  fontSize: "1rem",
                }}
              >
                E. 시설 적재 — JSON·CSV 이중 경로
              </h3>
              <ul
                style={{
                  listStyle: "none",
                  padding: 0,
                  margin: 0,
                  color: "var(--text-secondary)",
                  lineHeight: "1.8",
                }}
              >
                {li(
                  "JSON: pet-data-api CLI → pet-locations-*.json → LocationImportService (data_source=BATCH_IMPORT)",
                )}
                {li(
                  "관리자 /api/admin/location — sync·import·collect·import-files (LocationServiceAdminController)",
                )}
                {li(
                  "CSV: /api/admin/location-services/import-public-data (AdminLocationController, MASTER)",
                )}
                {li(
                  "FacilitySyncScheduler 01:00 — app.location.import.file-path 설정 시 자동 import",
                )}
              </ul>
            </Card>

            <Card>
              <h3
                style={{
                  marginBottom: "0.75rem",
                  color: "var(--text-color)",
                  fontSize: "1rem",
                }}
              >
                F. 지역 계층 검색 (백엔드 지원)
              </h3>
              <ul
                style={{
                  listStyle: "none",
                  padding: 0,
                  margin: 0,
                  color: "var(--text-secondary)",
                  lineHeight: "1.8",
                }}
              >
                {li(
                  "우선순위: roadName → eupmyeondong → sigungu → sido → 전체",
                )}
                {li("각 계층별 인덱스 활용 — 반경 검색 대비 응답 속도 우위")}
                {li(
                  "현재 메인 UI는 lat/lng 반경 검색 경로 사용 — 지역 검색은 추후 확장 경로",
                )}
              </ul>
              <CodeBlock>{`// 지역 계층 우선순위 (LocationServiceService)
if      (hasText(roadName))     return findByRoadName(roadName, ...);
else if (hasText(eupmyeondong)) return findByEupmyeondong(eupmyeondong, ...);
else if (hasText(sigungu))      return findBySigungu(sigungu, ...);
else if (hasText(sido))         return findBySido(sido, ...);
else                            return findByOrderByRatingDesc(keyword, category);`}</CodeBlock>
            </Card>
          </section>

          <section
            id="limits"
            style={{ marginBottom: "3rem", scrollMarginTop: "2rem" }}
          >
            <h2 style={{ marginBottom: "1rem", color: "var(--text-color)" }}>
              한계 &amp; 다음 개선
            </h2>
            <Card>
              <ul
                style={{
                  listStyle: "none",
                  padding: 0,
                  margin: 0,
                  color: "var(--text-secondary)",
                  lineHeight: "1.8",
                }}
              >
                {li(
                  "메인 지도 기본 경로는 lat/lng 반경 검색 중심 — 백엔드 지역 계층 검색은 현재 주 사용자 경로에서 적극적으로 쓰이지 않음",
                )}
                {li(
                  "초기 로드 성능 수치는 size 제한 없던 초기 구조 기준 — 현재 통합 지도는 size=300 고정",
                )}
                {li(
                  "/api/location-services와 리뷰 API는 로그인 사용자 전용 — SecurityConfig /api/** authenticated() 적용",
                )}
                {li(
                  "score 정렬은 DB 쿼리가 아닌 서비스 레이어 post-sort — 대용량 시 전체 정렬 비용 발생",
                )}
                {li(
                  "반경 내 전부가 아닌 최대 300건만 반환 — UI 반경(기본 5km)과 백엔드 radius 미전달 시 10km 기본은 별개",
                )}
                {li(
                  "레거시 GET /api/location-services/recommend(Spring AI) 제거 — 맞춤 추천은 Recommendation 도메인만",
                )}
              </ul>
            </Card>
          </section>

          <section
            id="docs"
            style={{ marginBottom: "3rem", scrollMarginTop: "2rem" }}
          >
            <h2 style={{ marginBottom: "1rem", color: "var(--text-color)" }}>
              관련 페이지
            </h2>
            <Card>
              <ul
                style={{
                  listStyle: "none",
                  padding: 0,
                  margin: 0,
                  color: "var(--text-secondary)",
                  lineHeight: "2",
                }}
              >
                <li>
                  •{" "}
                  <a
                    href={PETORY_LOCATION_ARCH}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      color: "var(--link-color)",
                      textDecoration: "none",
                    }}
                  >
                    위치·추천 아키텍처 (Petory)
                  </a>
                  {" — 프론트·백엔드 API 대조·통합 지도"}
                </li>
                <li>
                  •{" "}
                  <a
                    href={PETORY_LOCATION_DOC}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      color: "var(--link-color)",
                      textDecoration: "none",
                    }}
                  >
                    location.md (Petory)
                  </a>
                  {" — 통합 검색 §1.1·리뷰·관리자 API"}
                </li>
                <li>
                  •{" "}
                  <Link
                    to="/domains/recommendation"
                    style={{
                      color: "var(--link-color)",
                      textDecoration: "none",
                    }}
                  >
                    Recommendation 도메인
                  </Link>
                  {
                    " — 주변 추천 진입(GET /api/recommend), Location /recommend 제거와 정합"
                  }
                </li>
                <li>
                  •{" "}
                  <Link
                    to="/domains/location/optimization"
                    style={{
                      color: "var(--link-color)",
                      textDecoration: "none",
                    }}
                  >
                    Location 성능 최적화
                  </Link>
                  {" — 초기 로드 Before/After, 인덱스"}
                </li>
                <li>
                  •{" "}
                  <Link
                    to="/domains/location/refactoring"
                    style={{
                      color: "var(--link-color)",
                      textDecoration: "none",
                    }}
                  >
                    Location 리팩토링
                  </Link>
                  {" — 검색 분기 구조, 워크플로우 정리"}
                </li>
                <li>
                  •{" "}
                  <a
                    href={PETORY_LOCATION_SERVICE}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      color: "var(--link-color)",
                      textDecoration: "none",
                    }}
                  >
                    LocationServiceService.java
                  </a>
                </li>
                <li>
                  •{" "}
                  <a
                    href={PETORY_LOCATION_REPO}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      color: "var(--link-color)",
                      textDecoration: "none",
                    }}
                  >
                    SpringDataJpaLocationServiceRepository.java
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

export default LocationDomainV2;
