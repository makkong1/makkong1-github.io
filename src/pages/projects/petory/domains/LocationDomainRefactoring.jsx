import { Link } from "react-router-dom";
import TableOfContents from "../../../../components/Common/TableOfContents";

const badge = {
  done: {
    label: "✅ 완료",
    color: "#16a34a",
    bg: "rgba(22,163,74,0.1)",
  },
  verified: {
    label: "🔎 검증 완료",
    color: "#0f766e",
    bg: "rgba(15,118,110,0.12)",
  },
  monitor: {
    label: "⚠️ 모니터링",
    color: "#b45309",
    bg: "rgba(180,83,9,0.12)",
  },
  wip: {
    label: "🔄 진행 중",
    color: "#d97706",
    bg: "rgba(217,119,6,0.1)",
  },
  plan: {
    label: "📋 계획",
    color: "#6366f1",
    bg: "rgba(99,102,241,0.1)",
  },
};

const overviewRows = [
  {
    title: "위치 우선 검색 분기 재정의",
    status: "done",
    description: "keyword 우선 분기를 제거하고, 위치 → 지역 → FULLTEXT fallback → 전체 평점순으로 재정렬",
  },
  {
    title: "keyword/category SQL 필터 통합",
    status: "done",
    description: "Java 메모리 필터를 제거하고 모든 경로에서 DB WHERE로 일원화",
  },
  {
    title: "Top10 LIMIT·배치 트랜잭션 정합성",
    status: "done",
    description: "인기 조회 LIMIT 누락과 self-invocation 트랜잭션 문제를 정리",
  },
  {
    title: "반경 검색 쿼리 구조",
    status: "monitor",
    description: "POLYGON bbox + ST_Distance_Sphere 구조는 유지, 정확도 문제는 없고 성능 관점에서 모니터링",
  },
  {
    title: "거리 계산 중복 제거",
    status: "done",
    description: "백엔드가 거리 값을 DTO에 포함하고 프론트는 이를 우선 사용",
  },
  {
    title: "프론트 검색 상태 정리",
    status: "done",
    description: "다수의 useState를 reducer 단위로 묶고 지도 이동과 검색 확정 흐름을 분리",
  },
  {
    title: "FULLTEXT 검색 품질 검증",
    status: "verified",
    description: "name, description, category1~3 모두 인덱스와 쿼리가 일치하는지 확인",
  },
  {
    title: "후속 쿼리 리팩토링",
    status: "plan",
    description: "review_count 캐시 컬럼, 대표 카테고리 컬럼, sort별 쿼리 분리 검토",
  },
  {
    title: "지도 검색 워크플로우",
    status: "wip",
    description: "mapViewportCenter/searchCenter 분리와 '이 지역 검색' 액션 도입",
  },
];

const issueRows = [
  {
    issue: "카테고리 필터를 Java 메모리에서 처리",
    before: "지역/반경으로 많이 읽은 뒤 stream filter로 category1~3를 다시 비교",
    after: "모든 검색 쿼리에 category 조건을 넣어 DB에서 바로 걸러냄",
    status: "done",
  },
  {
    issue: "Top10 메서드명과 실제 쿼리 불일치",
    before: "findTop10... 이름과 달리 LIMIT 없이 전량 조회 가능",
    after: "네이티브 쿼리 + LIMIT 10으로 메서드명과 실제 동작을 맞춤",
    status: "done",
  },
  {
    issue: "배치 saveBatch 트랜잭션 경계 불명확",
    before: "private self-invocation으로 REQUIRES_NEW가 AOP 적용되지 않을 수 있었음",
    after: "LocationServiceBatchWriter 별도 빈으로 분리해 배치 단위 독립 트랜잭션 확보",
    status: "done",
  },
  {
    issue: "반경 검색 bbox 근사 구조",
    before: "ST_Within bbox + ST_Distance_Sphere 이중 필터",
    after: "구조는 유지하되 keyword/category만 통합, 정확도 이슈 재현 없음",
    status: "monitor",
  },
];

const keywordChecks = [
  "FULLTEXT 인덱스 `ft_search`가 `name`, `description`, `category1`, `category2`, `category3`를 모두 포함하는지 확인",
  "검색 쿼리의 `MATCH(...) AGAINST(...)` 대상 컬럼이 실제 인덱스 구성과 정확히 일치하는지 검증",
  "위치가 없을 때만 FULLTEXT fallback을 사용하고, 위치/지역 검색에서는 `name LIKE`로 후보군 내부만 좁히도록 정책 정리",
];

const roadmapRows = [
  {
    title: "review_count 캐시 컬럼",
    status: "plan",
    description: "reviews 정렬의 상관 서브쿼리를 `review_count DESC, distance ASC, rating DESC, idx ASC`로 단순화",
  },
  {
    title: "대표 카테고리 컬럼",
    status: "plan",
    description: "`category3 > category2 > category1` 우선순위로 검색용 단일 컬럼을 도입해 OR 조건을 축소",
  },
  {
    title: "sort별 쿼리 분리",
    status: "plan",
    description: "`distance`, `rating`, `reviews` 정렬을 전용 네이티브 쿼리로 분리해 가독성과 실행 계획 예측성을 높임",
  },
  {
    title: "지도 검색 확정 UX",
    status: "wip",
    description: "지도 뷰 상태와 실제 검색 상태를 분리하고, 사용자가 명시적으로 현재 화면을 검색 기준으로 확정하도록 변경",
  },
];

function StatusBadge({ type }) {
  const b = badge[type];
  return (
    <span
      style={{
        fontSize: "0.75rem",
        fontWeight: "600",
        padding: "0.2rem 0.6rem",
        borderRadius: "999px",
        color: b.color,
        backgroundColor: b.bg,
        marginLeft: "0.6rem",
        verticalAlign: "middle",
      }}
    >
      {b.label}
    </span>
  );
}

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
        padding: "0.85rem 1rem",
        backgroundColor: "var(--bg-color)",
        borderRadius: "6px",
        fontSize: "0.82rem",
        fontFamily: "monospace",
        lineHeight: "1.65",
        color: "var(--text-secondary)",
        overflowX: "auto",
        margin: "0.75rem 0 0",
        whiteSpace: "pre-wrap",
        wordBreak: "break-word",
      }}
    >
      {children}
    </pre>
  );
}

function LocationDomainRefactoring() {
  const sections = [
    { id: "intro", title: "개요" },
    { id: "resolved-issues", title: "핵심 이슈 정리" },
    { id: "search-rules", title: "검색 규칙 재정의" },
    { id: "radius-distance", title: "반경 검색 & 거리 처리" },
    { id: "frontend", title: "프론트 구조 정리" },
    { id: "keyword-validation", title: "FULLTEXT 검증" },
    { id: "roadmap", title: "남은 과제" },
    { id: "summary", title: "요약" },
  ];

  const li = (text) => <li style={{ marginBottom: "0.35rem" }}>• {text}</li>;

  return (
    <div className="domain-page-wrapper" style={{ padding: "2rem 0" }}>
      <div
        className="domain-page-container"
        style={{ display: "flex", gap: "2rem", alignItems: "flex-start" }}
      >
        <div className="domain-page-content" style={{ flex: 1 }}>
          <div style={{ marginBottom: "1rem" }}>
            <Link
              to="/domains/location"
              style={{
                color: "var(--link-color)",
                textDecoration: "none",
                fontSize: "0.9rem",
              }}
            >
              ← Location 도메인으로 돌아가기
            </Link>
          </div>

          <h1 style={{ marginBottom: "0.5rem", color: "var(--text-color)" }}>
            Location 도메인 리팩토링
          </h1>
          <p
            style={{
              color: "var(--text-secondary)",
              lineHeight: "1.7",
              marginBottom: "2.5rem",
              fontSize: "0.95rem",
            }}
          >
            이 페이지는 <code>docs/refactoring/location</code>에 정리된 문서를 기준으로,
            Location 도메인에서 실제로 해결한 문제와 아직 남아 있는 설계 과제를 포트폴리오용으로
            다시 구성한 내용입니다. 아키텍처 전체는{" "}
            <Link to="/domains/location" style={{ color: "var(--link-color)" }}>
              Location 도메인
            </Link>
            , 성능 측정은{" "}
            <Link to="/domains/location/optimization" style={{ color: "var(--link-color)" }}>
              성능 최적화
            </Link>{" "}
            페이지와 함께 보는 흐름으로 정리했습니다.
          </p>

          <section id="intro" style={{ marginBottom: "3rem", scrollMarginTop: "2rem" }}>
            <h2 style={{ marginBottom: "1rem", color: "var(--text-color)" }}>개요</h2>
            <Card style={{ marginBottom: "1rem" }}>
              <p style={{ color: "var(--text-secondary)", lineHeight: "1.8", marginBottom: "0.75rem" }}>
                이번 리팩토링의 중심은 기능을 새로 붙이는 것이 아니라,{" "}
                <strong style={{ color: "var(--text-color)" }}>
                  주변 서비스 검색이 실제 사용자 기대와 같은 방식으로 동작하도록 검색 정책과 쿼리 구조를 다시 정리하는 것
                </strong>
                이었습니다.
              </p>
              <ul
                style={{
                  listStyle: "none",
                  padding: 0,
                  color: "var(--text-secondary)",
                  lineHeight: "1.8",
                  margin: 0,
                  fontSize: "0.9rem",
                }}
              >
                {li("위치가 있으면 항상 위치를 우선 기준으로 삼고, keyword와 category는 그 안에서 좁히는 구조로 바꿨습니다.")}
                {li("카테고리·키워드 필터를 Java 후처리에서 SQL WHERE로 내리면서 결과 일관성과 성능을 함께 개선했습니다.")}
                {li("프론트엔드도 지도 이동 상태와 실제 검색 상태를 분리하는 방향으로 다시 정리했습니다.")}
              </ul>
            </Card>

            <Card>
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
                    <th style={{ padding: "0.6rem 0.75rem", textAlign: "left", color: "var(--text-color)" }}>
                      정리 축
                    </th>
                    <th style={{ padding: "0.6rem 0.75rem", textAlign: "left", color: "var(--text-color)" }}>
                      상태
                    </th>
                    <th style={{ padding: "0.6rem 0.75rem", textAlign: "left", color: "var(--text-color)" }}>
                      내용
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {overviewRows.map((row, index) => (
                    <tr
                      key={row.title}
                      style={{
                        borderBottom:
                          index < overviewRows.length - 1 ? "1px solid var(--nav-border)" : "none",
                      }}
                    >
                      <td style={{ padding: "0.6rem 0.75rem", whiteSpace: "nowrap" }}>{row.title}</td>
                      <td style={{ padding: "0.6rem 0.75rem", whiteSpace: "nowrap" }}>
                        <StatusBadge type={row.status} />
                      </td>
                      <td style={{ padding: "0.6rem 0.75rem" }}>{row.description}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Card>
          </section>

          <section id="resolved-issues" style={{ marginBottom: "3rem", scrollMarginTop: "2rem" }}>
            <h2 style={{ marginBottom: "1rem", color: "var(--text-color)" }}>핵심 이슈 정리</h2>
            <Card>
              <p style={{ color: "var(--text-secondary)", lineHeight: "1.8", marginBottom: "1rem" }}>
                `location-domain-potential-issues-refactoring.md` 문서를 기준으로 보면, 이번 리팩토링은
                단순한 코드 정리가 아니라 실제 운영 리스크가 있던 지점을 우선순위대로 걷어내는 작업이었습니다.
              </p>
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
                    <th style={{ padding: "0.6rem 0.75rem", textAlign: "left", color: "var(--text-color)" }}>
                      이슈
                    </th>
                    <th style={{ padding: "0.6rem 0.75rem", textAlign: "left", color: "var(--text-color)" }}>
                      기존 문제
                    </th>
                    <th style={{ padding: "0.6rem 0.75rem", textAlign: "left", color: "var(--text-color)" }}>
                      정리 결과
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {issueRows.map((row, index) => (
                    <tr
                      key={row.issue}
                      style={{
                        borderBottom:
                          index < issueRows.length - 1 ? "1px solid var(--nav-border)" : "none",
                      }}
                    >
                      <td style={{ padding: "0.6rem 0.75rem", verticalAlign: "top" }}>
                        <div style={{ color: "var(--text-color)", marginBottom: "0.35rem" }}>{row.issue}</div>
                        <StatusBadge type={row.status} />
                      </td>
                      <td style={{ padding: "0.6rem 0.75rem", verticalAlign: "top" }}>{row.before}</td>
                      <td style={{ padding: "0.6rem 0.75rem", verticalAlign: "top" }}>{row.after}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Card>
          </section>

          <section id="search-rules" style={{ marginBottom: "3rem", scrollMarginTop: "2rem" }}>
            <h2 style={{ marginBottom: "1rem", color: "var(--text-color)" }}>
              검색 규칙 재정의 <StatusBadge type="done" />
            </h2>
            <Card style={{ marginBottom: "1rem" }}>
              <p style={{ color: "var(--text-secondary)", lineHeight: "1.8", marginBottom: "0.75rem" }}>
                가장 큰 변화는 검색 우선순위입니다. 예전에는 keyword가 들어오면 좌표와 반경이 함께 있어도 전국
                FULLTEXT로 바로 빠졌는데, 지금은{" "}
                <strong style={{ color: "var(--text-color)" }}>위치가 있으면 위치가 먼저</strong>라는
                도메인 정책으로 정리했습니다.
              </p>
              <CodeBlock>{`// public 메서드 진입 시 공통 정규화
keyword      = normalize(keyword);      // "" / 공백 → null
category     = normalize(category);
sido         = normalize(sido);
sigungu      = normalize(sigungu);
eupmyeondong = normalize(eupmyeondong);
roadName     = normalize(roadName);

// 현재 검색 분기
if (hasLocation) {
  return radiusSearch(keyword, category, latitude, longitude, radius);
}
if (hasRegion) {
  return regionSearch(keyword, category, sido, sigungu, eupmyeondong, roadName);
}
if (hasKeyword) {
  return fullTextSearch(keyword, category); // 위치가 없을 때만 fallback
}
return findAllByRating(keyword, category);`}</CodeBlock>
              <ul
                style={{
                  listStyle: "none",
                  padding: 0,
                  color: "var(--text-secondary)",
                  lineHeight: "1.8",
                  marginTop: "0.75rem",
                  fontSize: "0.9rem",
                }}
              >
                {li("빈 문자열을 null로 정규화해 `keyword=\"\"` 가 전체 이름 매칭으로 오작동하던 문제를 막았습니다.")}
                {li("반경·지역 검색에서는 keyword를 `name LIKE '%keyword%'` 로 적용해 위치 후보군 안에서만 결과를 좁힙니다.")}
                {li("위치가 없을 때만 FULLTEXT를 fallback으로 사용해 '주변 서비스'라는 제품 맥락과 검색 동작을 맞췄습니다.")}
              </ul>
            </Card>

            <Card>
              <p style={{ color: "var(--text-secondary)", lineHeight: "1.8", marginBottom: "0.75rem" }}>
                카테고리 필터도 같은 원칙으로 재정리했습니다. 이전에는 조회 후 Java 스트림으로 category1~3를
                다시 비교했지만, 지금은 모든 검색 쿼리에서 동일한 SQL 조건을 사용합니다.
              </p>
              <CodeBlock>{`AND (:keyword IS NULL OR name LIKE CONCAT('%', :keyword, '%'))
AND (:category IS NULL
     OR category3 = :category
     OR category2 = :category
     OR category1 = :category)`}</CodeBlock>
              <ul
                style={{
                  listStyle: "none",
                  padding: 0,
                  color: "var(--text-secondary)",
                  lineHeight: "1.8",
                  marginTop: "0.75rem",
                  fontSize: "0.9rem",
                }}
              >
                {li("검색 경로마다 카테고리 동작이 달라질 수 있던 위험을 없앴습니다.")}
                {li("불필요한 힙 로드와 stream filter를 제거해 지역·반경 검색의 낭비를 줄였습니다.")}
                {li("`findByRoadName`도 네이티브 쿼리로 맞춰 `road_name` 컬럼 기준으로 동일한 필터 정책을 적용했습니다.")}
              </ul>
            </Card>
          </section>

          <section id="radius-distance" style={{ marginBottom: "3rem", scrollMarginTop: "2rem" }}>
            <h2 style={{ marginBottom: "1rem", color: "var(--text-color)" }}>
              반경 검색 &amp; 거리 처리
            </h2>
            <Card style={{ marginBottom: "1rem" }}>
              <h3 style={{ marginBottom: "0.5rem", color: "var(--text-color)", fontSize: "1rem" }}>
                반경 검색 쿼리 구조 <StatusBadge type="monitor" />
              </h3>
              <p style={{ color: "var(--text-secondary)", lineHeight: "1.8", marginBottom: "0.75rem" }}>
                설계 문서에서는 `ST_Distance_Sphere` 단일 조건으로 더 단순하게 가는 방향도 검토했지만, 실제 구현은
                공간 인덱스 활용을 위해 <code style={{ backgroundColor: "var(--bg-color)", padding: "0.15rem 0.35rem", borderRadius: "4px" }}>ST_Within</code> bbox와{" "}
                <code style={{ backgroundColor: "var(--bg-color)", padding: "0.15rem 0.35rem", borderRadius: "4px" }}>ST_Distance_Sphere</code>를 함께 유지했습니다.
              </p>
              <CodeBlock>{`WHERE ST_Within(location, POLYGON(...bbox...))
  AND ST_Distance_Sphere(location, POINT(:lat :lng)) <= :radiusInMeters
  AND is_deleted = 0
  AND (:keyword IS NULL OR name LIKE CONCAT('%', :keyword, '%'))
  AND (:category IS NULL OR category3 = :category OR category2 = :category OR category1 = :category)`}</CodeBlock>
              <ul
                style={{
                  listStyle: "none",
                  padding: 0,
                  color: "var(--text-secondary)",
                  lineHeight: "1.8",
                  marginTop: "0.75rem",
                  fontSize: "0.9rem",
                }}
              >
                {li("정확도 문제는 후단 거리 필터가 보장하고 있고, 운영 데이터 기준으로 누락 사례는 재현되지 않았습니다.")}
                {li("따라서 현재는 구조를 바꾸기보다 EXPLAIN과 운영 모니터링을 기준으로 유지하는 판단을 했습니다.")}
                {li("대신 이 경로에 keyword/category SQL 필터를 추가해 실제 사용 패턴에 맞는 검색으로 보강했습니다.")}
              </ul>
            </Card>

            <Card>
              <h3 style={{ marginBottom: "0.5rem", color: "var(--text-color)", fontSize: "1rem" }}>
                거리 계산 중복 제거 <StatusBadge type="done" />
              </h3>
              <p style={{ color: "var(--text-secondary)", lineHeight: "1.8", marginBottom: "0.75rem" }}>
                거리 계산은 DB가 반경 필터를 담당하고, 서비스 레이어가 DTO에 표시용 거리 값을 넣는 방식으로 정리했습니다.
                프론트엔드는 이 값을 우선 사용하고, 구버전 응답에서만 fallback 계산을 합니다.
              </p>
              <ul
                style={{
                  listStyle: "none",
                  padding: 0,
                  color: "var(--text-secondary)",
                  lineHeight: "1.8",
                  margin: 0,
                  fontSize: "0.9rem",
                }}
              >
                {li("백엔드와 프론트가 서로 다른 계산식을 따로 돌리던 중복을 제거했습니다.")}
                {li("표시되는 거리와 서버가 반경 판단에 사용한 좌표 기준이 더 자연스럽게 맞물리도록 정리했습니다.")}
                {li("프론트는 `service.distance`가 없을 때만 Haversine으로 fallback 하도록 하위 호환을 남겼습니다.")}
              </ul>
            </Card>
          </section>

          <section id="frontend" style={{ marginBottom: "3rem", scrollMarginTop: "2rem" }}>
            <h2 style={{ marginBottom: "1rem", color: "var(--text-color)" }}>
              프론트 구조 정리 <StatusBadge type="done" />
            </h2>
            <Card style={{ marginBottom: "1rem" }}>
              <p style={{ color: "var(--text-secondary)", lineHeight: "1.8", marginBottom: "0.75rem" }}>
                프론트엔드는 검색 정책이 복잡해질수록 상태 구조부터 정리할 필요가 있었습니다. 흩어져 있던 다수의 상태를
                reducer 단위로 묶어 검색 조건, 지역 선택, UI 상태를 분리했습니다.
              </p>
              <CodeBlock>{`searchReducer // keyword, categoryType, searchMode, radius, sort
regionReducer // selectedSido, selectedSigungu, selectedEupmyeondong
uiReducer     // loading, error, selectedService, showSearchButton, ...`}</CodeBlock>
              <ul
                style={{
                  listStyle: "none",
                  padding: 0,
                  color: "var(--text-secondary)",
                  lineHeight: "1.8",
                  marginTop: "0.75rem",
                  fontSize: "0.9rem",
                }}
              >
                {li("관련 상태를 한 곳에서 업데이트할 수 있게 되어 검색 조건 변경의 의도가 더 명확해졌습니다.")}
                {li("반경 정렬 옵션도 `distance`, `rating`, `reviews` 세 가지로 확장하고 기본값을 `distance`로 바꿨습니다.")}
                {li("정렬은 프론트 재정렬이 아니라 백엔드 응답 순서를 바꾸는 방식으로 처리해 실제 반경 검색 의미를 유지했습니다.")}
              </ul>
            </Card>

            <Card>
              <h3 style={{ marginBottom: "0.5rem", color: "var(--text-color)", fontSize: "1rem" }}>
                지도 이동과 검색 확정 분리
              </h3>
              <p style={{ color: "var(--text-secondary)", lineHeight: "1.8", marginBottom: "0.75rem" }}>
                `UnifiedPetMapPage` 쪽에서는 "지도를 본다"와 "이 위치로 검색한다"를 같은 상태로 다루고 있었기 때문에,
                이동만 해도 API가 다시 호출되는 흐름이 생겼습니다. 이 부분은 검색 UX 정리의 연장선으로 다루고 있습니다.
              </p>
              <CodeBlock>{`onMapIdle -> setMapViewportCenter(center)   // 뷰 상태만 변경

onSearchButtonClick -> {
  setSearchCenter(mapViewportCenter)       // 검색 기준 확정
  fetchActiveMapItems()
}`}</CodeBlock>
            </Card>
          </section>

          <section id="keyword-validation" style={{ marginBottom: "3rem", scrollMarginTop: "2rem" }}>
            <h2 style={{ marginBottom: "1rem", color: "var(--text-color)" }}>
              FULLTEXT 검증 <StatusBadge type="verified" />
            </h2>
            <Card>
              <p style={{ color: "var(--text-secondary)", lineHeight: "1.8", marginBottom: "0.75rem" }}>
                키워드 검색은 로직을 고치는 것만으로 끝내지 않고, 실제 FULLTEXT 인덱스와 쿼리 대상 필드가 일치하는지도
                별도 문서로 검증했습니다. 즉, 위치가 없을 때 사용하는 fallback 검색이 무엇을 검색하는지 명확히 확인한 셈입니다.
              </p>
              <CodeBlock>{`MATCH(name, description, category1, category2, category3)
AGAINST(CONCAT(:keyword, '*') IN BOOLEAN MODE)`}</CodeBlock>
              <ul
                style={{
                  listStyle: "none",
                  padding: 0,
                  color: "var(--text-secondary)",
                  lineHeight: "1.8",
                  marginTop: "0.75rem",
                  fontSize: "0.9rem",
                }}
              >
                {keywordChecks.map((text) => li(text))}
              </ul>
            </Card>
          </section>

          <section id="roadmap" style={{ marginBottom: "3rem", scrollMarginTop: "2rem" }}>
            <h2 style={{ marginBottom: "1rem", color: "var(--text-color)" }}>남은 과제</h2>
            <Card style={{ marginBottom: "1rem" }}>
              <p style={{ color: "var(--text-secondary)", lineHeight: "1.8", marginBottom: "1rem" }}>
                현재 문서 기준으로 다음 단계는 검색 규칙 자체보다, 그 규칙을 더 싸고 단순하게 실행할 수 있는 쿼리 구조를
                만드는 쪽에 가깝습니다.
              </p>
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
                    <th style={{ padding: "0.6rem 0.75rem", textAlign: "left", color: "var(--text-color)" }}>
                      과제
                    </th>
                    <th style={{ padding: "0.6rem 0.75rem", textAlign: "left", color: "var(--text-color)" }}>
                      상태
                    </th>
                    <th style={{ padding: "0.6rem 0.75rem", textAlign: "left", color: "var(--text-color)" }}>
                      다음 단계
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {roadmapRows.map((row, index) => (
                    <tr
                      key={row.title}
                      style={{
                        borderBottom:
                          index < roadmapRows.length - 1 ? "1px solid var(--nav-border)" : "none",
                      }}
                    >
                      <td style={{ padding: "0.6rem 0.75rem" }}>{row.title}</td>
                      <td style={{ padding: "0.6rem 0.75rem", whiteSpace: "nowrap" }}>
                        <StatusBadge type={row.status} />
                      </td>
                      <td style={{ padding: "0.6rem 0.75rem" }}>{row.description}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Card>

            <Card>
              <h3 style={{ marginBottom: "0.5rem", color: "var(--text-color)", fontSize: "1rem" }}>
                지도 검색 워크플로우 <StatusBadge type="wip" />
              </h3>
              <p style={{ color: "var(--text-secondary)", lineHeight: "1.8", marginBottom: "0.75rem" }}>
                이 작업은 단순 UI 수정이 아니라, Location 도메인 문서에 적어둔{" "}
                <strong style={{ color: "var(--text-color)" }}>"지도는 상태를 바꾸지 않는다"</strong> 원칙을
                프론트 동작과 맞추는 단계입니다.
              </p>
              <ul
                style={{
                  listStyle: "none",
                  padding: 0,
                  color: "var(--text-secondary)",
                  lineHeight: "1.8",
                  margin: 0,
                  fontSize: "0.9rem",
                }}
              >
                {li("location 탭에서는 지도 이동만으로는 재검색하지 않습니다.")}
                {li("현재 화면 기준으로 검색하려면 사용자가 '이 지역 검색' 액션을 명시적으로 누르도록 합니다.")}
                {li("키워드·카테고리 검색도 같은 searchCenter를 기준으로 묶어 일관된 검색 경험을 만드는 것이 목표입니다.")}
              </ul>
            </Card>
          </section>

          <section id="summary" style={{ marginBottom: "3rem", scrollMarginTop: "2rem" }}>
            <h2 style={{ marginBottom: "1rem", color: "var(--text-color)" }}>요약</h2>
            <Card style={{ marginBottom: "1.5rem" }}>
              <p style={{ color: "var(--text-secondary)", lineHeight: "1.8", marginBottom: "0.75rem" }}>
                정리하면, 이번 Location 리팩토링은 검색 정확도를 높이기 위해 위치 우선 정책을 다시 세우고,
                그 정책이 실제로 일관되게 실행되도록 쿼리와 프론트 상태 구조를 함께 정돈한 작업입니다.
              </p>
              <ul
                style={{
                  listStyle: "none",
                  padding: 0,
                  color: "var(--text-secondary)",
                  lineHeight: "1.8",
                  margin: 0,
                  fontSize: "0.9rem",
                }}
              >
                {li("검색 분기, 카테고리 필터, Top10 조회, 배치 트랜잭션처럼 결과 일관성과 운영 안정성에 직접 연결되는 이슈를 우선 해결했습니다.")}
                {li("반경 검색과 거리 처리, 정렬 옵션, FULLTEXT 검증까지 포함해 '주변 검색'이 실제 사용자 기대와 맞게 동작하도록 다듬었습니다.")}
                {li("다음 단계는 review_count·대표 카테고리처럼 쿼리 자체를 더 단순하고 저렴하게 만드는 작업입니다.")}
              </ul>
            </Card>

            <Card>
              <h3 style={{ marginBottom: "0.75rem", color: "var(--text-color)" }}>관련 페이지</h3>
              <ul style={{ listStyle: "none", padding: 0, color: "var(--text-secondary)", lineHeight: "2" }}>
                <li>
                  •{" "}
                  <Link to="/domains/location" style={{ color: "var(--link-color)", textDecoration: "none" }}>
                    Location 도메인 — 아키텍처·API·검색 흐름
                  </Link>
                </li>
                <li>
                  •{" "}
                  <Link
                    to="/domains/location/optimization"
                    style={{ color: "var(--link-color)", textDecoration: "none" }}
                  >
                    Location 성능 최적화 — 초기 로드 측정과 개선 결과
                  </Link>
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

export default LocationDomainRefactoring;
