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

function LocationDomainV2() {
  const PETORY_LOCATION_RECOMMEND_API =
    "https://github.com/makkong1/Petory/blob/main/docs/domains/recommendation.md";

  const sections = [
    { id: "pillars", title: "핵심 기능" },
    { id: "intro", title: "도메인 개요" },
    { id: "design", title: "기술 결정" },
    { id: "limits", title: "한계 & 개선" },
    { id: "docs", title: "관련 페이지" },
  ];

  const corePillars = [
    "검색 분기 설계",
    "초기 로드 최적화",
    "지도 이동·재조회 분리",
    "서버 필터 통합",
    "지역 계층 검색",
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
            위치 서비스 도메인은 지도에서 반려 동반 시설을 찾고 리뷰까지 이어 주는
            Petory의 탐색·검색 기능입니다. 처음에는 지도와 검색만 맞물리면 된다고
            보였지만, 실제 구현에서는 키워드·위치·지역이 겹칠 때 처리 순서, 통합
            검색 분기, 지도를 옮길 때 결과가 매번 덮이는 재조회, 추천 읽기는
            Recommendation 도메인으로 모으는 정리까지 함께 다뤄야 했습니다. 저는
            검색 우선순위를 한곳에서 정하고, 지도만 움직였을 때 자동으로 조회되지
            않게 해 결과가 통째로 사라지지 않도록 하는 방향으로 설계했습니다.
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
                검색 로직을 위치 우선, 지역 우선, 키워드 단독 FULLTEXT로 명확히
                분기하고, 초기 로드에서는 사용자 주변 데이터를 줄여 가져오도록
                구조를 바꿨습니다. 메인 지도에서는{" "}
                <code
                  style={{
                    backgroundColor: "var(--bg-color)",
                    padding: "0.1rem 0.3rem",
                    borderRadius: "4px",
                  }}
                >
                  mapViewportCenter
                </code>
                와{" "}
                <code
                  style={{
                    backgroundColor: "var(--bg-color)",
                    padding: "0.1rem 0.3rem",
                    borderRadius: "4px",
                  }}
                >
                  searchCenter
                </code>
                를 분리해, 지도를 움직여도 "이 지역 검색" 버튼을 누르기 전까지
                결과가 바뀌지 않습니다. 각 검색 분기의 키워드·카테고리·정렬
                필터는 클라이언트가 아닌 서버 SQL에서 처리합니다.
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
                , 메인 지도 UI는 줌 레벨별{" "}
                <code
                  style={{
                    backgroundColor: "var(--bg-color)",
                    padding: "0.1rem 0.3rem",
                    borderRadius: "4px",
                  }}
                >
                  30~500
                </code>
                개 제한을 함께 전송.
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
                시퀀스 다이어그램은 도메인별로 두지 않고 통합 페이지에만 있습니다.
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
                {li("lat/lng 있으면 → 반경 검색 (현재 메인 UI 기본 경로)")}
                {li("lat/lng 없고 지역 있으면 → 지역 계층 검색")}
                {li(
                  "위치 반경 분기에서는 이름 검색 조건이 LIKE이다. FULLTEXT는 위치·지역이 모두 없고 키워드만 있을 때(location.md 1.1·2.4).",
                )}
                {li("아무 조건 없으면 → 전체 평점순")}
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
                  "이후: 사용자 위치 기반 반경 검색 + 줌 레벨별 size 30~500 제한",
                )}
                {li("컨트롤러 기본값 size=100, size=0이면 전체 조회(관리자용)")}
              </ul>
              <CodeBlock>{`// unifiedMapApi.js — 줌 레벨별 반환 개수 상한
const ZOOM_LIMIT_TABLE = {
  location: { 4: 30, 5: 50, 6: 100, 7: 150, 8: 250, 9: 400, default: 500 },
};

// fetchActiveMapItems — 항상 size 파라미터 포함
size: getLimitForLevel('location', mapLevel)`}</CodeBlock>
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
                  '"이 지역 검색" 클릭 → commitLocationSearch(mapViewportCenter) → searchCenter 확정 → 반경 검색 재실행',
                )}
                {li(
                  '두 값이 다르면 "이 지역 검색" 버튼 표시 → 사용자가 재조회 시점을 직접 선택',
                )}
              </ul>
              <CodeBlock>{`// mapViewportCenter vs searchCenter 분리
const [mapViewportCenter, setMapViewportCenter] = useState(null);
const [searchCenter, setSearchCenter]           = useState(null);

const commitLocationSearch = useCallback((center) => {
  setSearchCenter({ ...center });       // 검색 기준 확정
  setHasPendingAreaChange(false);       // 버튼 숨김
}, []);

// "이 지역 검색" 버튼 → 현재 뷰포트 중심으로 반경 검색 재실행
const handleSearchThisArea = () =>
  commitLocationSearch(mapViewportCenter);`}</CodeBlock>
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
  CASE WHEN :sort = 'reviews'  THEN ls.review_count END DESC,
  CASE WHEN :sort = 'rating'   THEN ls.rating END DESC,
  ST_Distance_Sphere(...) ASC
-- FULLTEXT(ft_search)는 keyword 단독 경로(위치·지역 없을 때)에서만 사용`}</CodeBlock>
            </Card>

            <Card>
              <h3
                style={{
                  marginBottom: "0.75rem",
                  color: "var(--text-color)",
                  fontSize: "1rem",
                }}
              >
                E. 지역 계층 검색 (백엔드 지원)
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
                  "초기 로드 성능 수치는 size 제한 없던 초기 구조 기준 — 현재 기본 UI는 줌 레벨별 30~500개 제한을 항상 전송",
                )}
                {li(
                  "/api/location-services와 리뷰 API는 로그인 사용자 전용 — SecurityConfig /api/** authenticated() 적용",
                )}
                {li(
                  "score 정렬은 DB 쿼리가 아닌 서비스 레이어 post-sort — 대용량 시 전체 정렬 비용 발생",
                )}
                {li(
                  "반경 검색 결과는 size 상한이 있어 반경 내 일부만 반환 — 정확한 전체 목록이 필요한 경우 한계",
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
                  {" — 통합 검색 1.1·API 4.4"}
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
