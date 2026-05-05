import { Link } from "react-router-dom";
import TableOfContents from "../../../../components/Common/TableOfContents";

const badge = {
  done: {
    label: "✅ 완료",
    color: "#16a34a",
    bg: "rgba(22,163,74,0.1)",
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
    { id: "backend-search", title: "검색 분기 & SQL 필터" },
    { id: "distance-calculation", title: "거리 계산" },
    { id: "state-management", title: "상태 관리" },
    { id: "search-logic", title: "검색 로직 단순화" },
    { id: "hybrid-strategy", title: "하이브리드 전략" },
    { id: "sort-options", title: "반경 검색 정렬 옵션" },
    { id: "query-roadmap", title: "후속 쿼리 리팩토링" },
    { id: "map-workflow", title: "지도 검색 워크플로우" },
    { id: "summary", title: "요약" },
  ];

  const li = (text) => (
    <li style={{ marginBottom: "0.35rem" }}>• {text}</li>
  );

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
              style={{ color: "var(--link-color)", textDecoration: "none", fontSize: "0.9rem" }}
            >
              ← Location 도메인으로 돌아가기
            </Link>
          </div>
          <h1 style={{ marginBottom: "0.5rem", color: "var(--text-color)" }}>
            Location 도메인 리팩토링
          </h1>
          <p style={{ color: "var(--text-secondary)", lineHeight: "1.7", marginBottom: "2.5rem", fontSize: "0.95rem" }}>
            검색 정확도·성능·코드 구조 문제를 식별하고 개선한 작업 목록입니다.
            아키텍처·API 전체 구조는{" "}
            <Link to="/domains/location" style={{ color: "var(--link-color)" }}>
              Location 도메인
            </Link>
            , 초기 로드 수치는{" "}
            <Link to="/domains/location/optimization" style={{ color: "var(--link-color)" }}>
              성능 최적화
            </Link>{" "}
            페이지를 참고하세요.
          </p>

          {/* 1. 개요 */}
          <section id="intro" style={{ marginBottom: "3rem", scrollMarginTop: "2rem" }}>
            <h2 style={{ marginBottom: "1rem", color: "var(--text-color)" }}>개요</h2>
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
                    <th style={{ padding: "0.6rem 0.75rem", textAlign: "left", color: "var(--text-color)" }}>항목</th>
                    <th style={{ padding: "0.6rem 0.75rem", textAlign: "left", color: "var(--text-color)" }}>상태</th>
                    <th style={{ padding: "0.6rem 0.75rem", textAlign: "left", color: "var(--text-color)" }}>한 줄 요약</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["검색 분기 & SQL 필터", "done", "위치 우선 분기, keyword/category DB 처리, 빈 문자열 null 정규화"],
                    ["거리 계산", "done", "백엔드 Haversine → DTO, 프론트 중복 계산 제거"],
                    ["상태 관리", "done", "24개 useState → 3개 useReducer"],
                    ["검색 로직 단순화", "done", "300줄 함수 → 80줄 + 4개 전략 함수"],
                    ["하이브리드 전략", "done", "지역 선택 시 항상 백엔드 재요청, 결과 일관성 확보"],
                    ["반경 검색 정렬 옵션", "done", "기본값 rating → distance, 3가지 정렬 + 동순위 보정"],
                    ["후속 쿼리 리팩토링", "plan", "review_count 캐시 컬럼, 대표 카테고리 컬럼 도입"],
                    ["지도 검색 워크플로우", "wip", "mapViewportCenter/searchCenter 분리, '이 지역 검색' 버튼"],
                  ].map(([name, status, desc], i, arr) => (
                    <tr key={name} style={{ borderBottom: i < arr.length - 1 ? "1px solid var(--nav-border)" : "none" }}>
                      <td style={{ padding: "0.6rem 0.75rem", whiteSpace: "nowrap" }}>{name}</td>
                      <td style={{ padding: "0.6rem 0.75rem", whiteSpace: "nowrap" }}>
                        <StatusBadge type={status} />
                      </td>
                      <td style={{ padding: "0.6rem 0.75rem" }}>{desc}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Card>
          </section>

          {/* 2. 검색 분기 & SQL 필터 */}
          <section id="backend-search" style={{ marginBottom: "3rem", scrollMarginTop: "2rem" }}>
            <h2 style={{ marginBottom: "1rem", color: "var(--text-color)" }}>
              검색 분기 &amp; SQL 필터 <StatusBadge type="done" />
            </h2>
            <Card style={{ marginBottom: "1rem" }}>
              <p style={{ color: "var(--text-secondary)", lineHeight: "1.8", marginBottom: "0.75rem" }}>
                keyword가 있으면 위치·반경을 무시하는 구조에서,{" "}
                <strong style={{ color: "var(--text-color)" }}>위치(lat·lng) → 지역 계층 → keyword 전용 FULLTEXT → 전체 평점순</strong>{" "}
                우선순위로 분기를 재정의했습니다.
                keyword와 category는 각 경로의 SQL WHERE에서 직접 필터링하며, Java 후처리를 완전히 제거했습니다.
              </p>
              <CodeBlock>{`// LocationServiceService.searchLocationServices() 진입 시 정규화
keyword = normalize(keyword);   // "" → null, 공백 → null
category = normalize(category);
sido = normalize(sido); // 지역 파라미터 동일

// 분기 우선순위
if (hasLocation)  → findByRadius(lat, lng, radius, keyword, category, sort)
else if (hasRegion) → findBySido / findBySigungu / ...  (keyword·category SQL WHERE)
else if (hasKeyword) → findByNameContaining FULLTEXT (fallback)
else → findByOrderByRatingDesc (keyword·category SQL WHERE)`}</CodeBlock>
              <ul style={{ listStyle: "none", padding: 0, color: "var(--text-secondary)", lineHeight: "1.8", marginTop: "0.75rem", fontSize: "0.9rem" }}>
                {li("빈 문자열 normalize(): \"\" → null → SQL :keyword IS NULL 분기 정상 작동")}
                {li("카테고리 Java 필터 3개 메서드 제거 (applyCategoryFilter, matchesCategory, categoryFieldMatches)")}
                {li("인기 Top10: 메서드명과 실제 LIMIT이 불일치하던 쿼리에 LIMIT 10 추가")}
                {li("배치 임포트: private self-invocation @Transactional 미적용 → LocationServiceBatchWriter 별도 빈으로 분리")}
              </ul>
            </Card>
          </section>

          {/* 3. 거리 계산 */}
          <section id="distance-calculation" style={{ marginBottom: "3rem", scrollMarginTop: "2rem" }}>
            <h2 style={{ marginBottom: "1rem", color: "var(--text-color)" }}>
              거리 계산 <StatusBadge type="done" />
            </h2>
            <Card>
              <p style={{ color: "var(--text-secondary)", lineHeight: "1.8", marginBottom: "0.75rem" }}>
                백엔드에서 Haversine으로 거리(m)를 계산해 DTO에 포함하고, 프론트엔드는 이 값을 우선 사용합니다.
                DB의 <code style={{ backgroundColor: "var(--bg-color)", padding: "0.15rem 0.35rem", borderRadius: "4px" }}>ST_Distance_Sphere</code>는 반경 필터 전용으로만 사용하고, 표시용 거리는 서비스 레이어 Haversine이 담당합니다.
              </p>
              <ul style={{ listStyle: "none", padding: 0, color: "var(--text-secondary)", lineHeight: "1.8", fontSize: "0.9rem" }}>
                {li("프론트엔드 중복 계산 제거 — 동일 계산이 두 곳에서 실행되던 낭비 해소")}
                {li("백엔드와 프론트엔드 거리 수치 일치 보장")}
                {li("백엔드 distance 필드가 없을 때만 프론트엔드 fallback 계산 (하위 호환)")}
              </ul>
            </Card>
          </section>

          {/* 4. 상태 관리 */}
          <section id="state-management" style={{ marginBottom: "3rem", scrollMarginTop: "2rem" }}>
            <h2 style={{ marginBottom: "1rem", color: "var(--text-color)" }}>
              상태 관리 <StatusBadge type="done" />
            </h2>
            <Card>
              <p style={{ color: "var(--text-secondary)", lineHeight: "1.8", marginBottom: "0.75rem" }}>
                LocationServiceMap에 분산되어 있던 약 24개 useState·6개 useRef를 논리 단위 3개로 묶어 useReducer로 전환했습니다.
              </p>
              <CodeBlock>{`// searchReducer   — keyword, categoryType, searchMode, radius, sort
// regionReducer   — selectedSido, selectedSigungu, selectedEupmyeondong
// uiReducer       — loading, error, selectedService, showSearchButton, ...`}</CodeBlock>
              <ul style={{ listStyle: "none", padding: 0, color: "var(--text-secondary)", lineHeight: "1.8", marginTop: "0.75rem", fontSize: "0.9rem" }}>
                {li("상태 업데이트 로직이 reducer로 집중되어 의도치 않은 부분 갱신 제거")}
                {li("pendingSearchLocation / showSearchButton 패턴으로 지도 이동과 검색 트리거를 명시적으로 분리")}
              </ul>
            </Card>
          </section>

          {/* 5. 검색 로직 단순화 */}
          <section id="search-logic" style={{ marginBottom: "3rem", scrollMarginTop: "2rem" }}>
            <h2 style={{ marginBottom: "1rem", color: "var(--text-color)" }}>
              검색 로직 단순화 <StatusBadge type="done" />
            </h2>
            <Card>
              <p style={{ color: "var(--text-secondary)", lineHeight: "1.8", marginBottom: "0.75rem" }}>
                4가지 검색 전략이 하나의 300줄 함수에 중첩 분기로 뒤섞여 있었습니다.
                전략별 함수로 분리해 메인 함수를 80줄로 줄이고, 각 전략을 독립적으로 수정할 수 있게 했습니다.
              </p>
              <CodeBlock>{`fetchServices()         ~80줄  (전략 선택만 담당)
  handleInitialLoad()       — 초기 로드
  handleLocationSearch()    — 반경 검색
  handleRegionSearch()      — 지역 검색
  handleHybridSearch()      — 하이브리드`}</CodeBlock>
            </Card>
          </section>

          {/* 6. 하이브리드 전략 */}
          <section id="hybrid-strategy" style={{ marginBottom: "3rem", scrollMarginTop: "2rem" }}>
            <h2 style={{ marginBottom: "1rem", color: "var(--text-color)" }}>
              하이브리드 전략 <StatusBadge type="done" />
            </h2>
            <Card>
              <p style={{ color: "var(--text-secondary)", lineHeight: "1.8", marginBottom: "0.75rem" }}>
                초기 로드가 반경 기반이면 <code style={{ backgroundColor: "var(--bg-color)", padding: "0.15rem 0.35rem", borderRadius: "4px" }}>allServices</code>에 반경 내 데이터만 담기는데,
                이후 지역 선택 시 프론트엔드 필터만 수행하면 반경 밖 서비스가 누락되는 불일치가 있었습니다.
              </p>
              <ul style={{ listStyle: "none", padding: 0, color: "var(--text-secondary)", lineHeight: "1.8", fontSize: "0.9rem" }}>
                {li("지역 선택이 있으면 초기 로드 방식과 무관하게 항상 백엔드 재요청 (2026-02-04 일관성 픽스)")}
                {li("지역 선택이 없을 때는 기존 하이브리드 필터 유지 — 불필요한 API 호출 방지")}
              </ul>
            </Card>
          </section>

          {/* 7. 반경 검색 정렬 옵션 */}
          <section id="sort-options" style={{ marginBottom: "3rem", scrollMarginTop: "2rem" }}>
            <h2 style={{ marginBottom: "1rem", color: "var(--text-color)" }}>
              반경 검색 정렬 옵션 <StatusBadge type="done" />
            </h2>
            <Card style={{ marginBottom: "1rem" }}>
              <p style={{ color: "var(--text-secondary)", lineHeight: "1.8", marginBottom: "0.75rem" }}>
                반경 검색 기본 정렬이 <code style={{ backgroundColor: "var(--bg-color)", padding: "0.15rem 0.35rem", borderRadius: "4px" }}>rating DESC</code>로 고정돼 "내 주변" UX와 맞지 않았습니다.
                프론트에서 수신 후 재정렬하면 서버에서 잘린 후보 집합 안에서만 순서가 바뀌므로, 정렬을 쿼리 레이어로 내렸습니다.
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
                    <th style={{ padding: "0.6rem 0.75rem", textAlign: "left", color: "var(--text-color)" }}>sort</th>
                    <th style={{ padding: "0.6rem 0.75rem", textAlign: "left", color: "var(--text-color)" }}>1차</th>
                    <th style={{ padding: "0.6rem 0.75rem", textAlign: "left", color: "var(--text-color)" }}>동순위 보정</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["distance (기본)", "거리 오름차순", "rating DESC → idx ASC"],
                    ["rating", "평점 내림차순", "distance ASC → idx ASC"],
                    ["reviews", "리뷰 수 내림차순", "distance ASC → rating DESC → idx ASC"],
                  ].map(([s, p, t], i, arr) => (
                    <tr key={s} style={{ borderBottom: i < arr.length - 1 ? "1px solid var(--nav-border)" : "none" }}>
                      <td style={{ padding: "0.6rem 0.75rem" }}>
                        <code style={{ backgroundColor: "var(--bg-color)", padding: "0.15rem 0.35rem", borderRadius: "4px" }}>{s}</code>
                      </td>
                      <td style={{ padding: "0.6rem 0.75rem" }}>{p}</td>
                      <td style={{ padding: "0.6rem 0.75rem" }}>{t}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Card>
          </section>

          {/* 8. 후속 쿼리 리팩토링 */}
          <section id="query-roadmap" style={{ marginBottom: "3rem", scrollMarginTop: "2rem" }}>
            <h2 style={{ marginBottom: "1rem", color: "var(--text-color)" }}>
              후속 쿼리 리팩토링 <StatusBadge type="plan" />
            </h2>
            <Card style={{ marginBottom: "1rem" }}>
              <h3 style={{ marginBottom: "0.5rem", color: "var(--text-color)", fontSize: "1rem" }}>
                review_count 캐시 컬럼
              </h3>
              <p style={{ color: "var(--text-secondary)", lineHeight: "1.8", marginBottom: "0.75rem" }}>
                현재 <code style={{ backgroundColor: "var(--bg-color)", padding: "0.15rem 0.35rem", borderRadius: "4px" }}>reviews</code> 정렬은 후보 행마다 <code style={{ backgroundColor: "var(--bg-color)", padding: "0.15rem 0.35rem", borderRadius: "4px" }}>locationservicereview</code>를 다시 세는 상관 서브쿼리 구조입니다.
                트래픽이 늘면 가장 먼저 병목이 될 지점입니다.
              </p>
              <CodeBlock>{`-- 현재 (상관 서브쿼리)
ORDER BY (SELECT COUNT(*) FROM locationservicereview r
          WHERE r.service_idx = ls.idx
            AND (r.is_deleted IS NULL OR r.is_deleted = 0)) DESC

-- 개선 후 (review_count 캐시 컬럼)
ORDER BY review_count DESC, distance ASC, rating DESC, idx ASC`}</CodeBlock>
              <ul style={{ listStyle: "none", padding: 0, color: "var(--text-secondary)", lineHeight: "1.8", marginTop: "0.75rem", fontSize: "0.9rem" }}>
                {li("리뷰 생성·수정·삭제 시 평균 평점 갱신과 함께 review_count를 원자적으로 갱신")}
                {li("집계 계약: soft delete(is_deleted = 0 또는 NULL)를 제외한 리뷰만 카운트")}
                {li("마이그레이션: locationservice-add-review-count-column.sql")}
              </ul>
            </Card>
            <Card>
              <h3 style={{ marginBottom: "0.5rem", color: "var(--text-color)", fontSize: "1rem" }}>
                대표 카테고리 컬럼
              </h3>
              <p style={{ color: "var(--text-secondary)", lineHeight: "1.8", marginBottom: "0.75rem" }}>
                현재 카테고리 조건이 <code style={{ backgroundColor: "var(--bg-color)", padding: "0.15rem 0.35rem", borderRadius: "4px" }}>category1 OR category2 OR category3</code> 3개 컬럼 OR 분기라
                검색 쿼리 가독성이 낮습니다.
                <code style={{ backgroundColor: "var(--bg-color)", padding: "0.15rem 0.35rem", borderRadius: "4px" }}>category3 &gt; category2 &gt; category1</code> 우선순위로 대표 카테고리 컬럼을 추가해
                메인 검색은 단일 컬럼 비교로 단순화합니다. 원본 category1~3은 공공데이터 원형 보존 용도로 유지합니다.
              </p>
            </Card>
          </section>

          {/* 9. 지도 검색 워크플로우 */}
          <section id="map-workflow" style={{ marginBottom: "3rem", scrollMarginTop: "2rem" }}>
            <h2 style={{ marginBottom: "1rem", color: "var(--text-color)" }}>
              지도 검색 워크플로우 <StatusBadge type="wip" />
            </h2>
            <Card>
              <p style={{ color: "var(--text-secondary)", lineHeight: "1.8", marginBottom: "0.75rem" }}>
                <code style={{ backgroundColor: "var(--bg-color)", padding: "0.15rem 0.35rem", borderRadius: "4px" }}>UnifiedPetMapPage</code>는 지도 idle 이벤트마다 API를 재호출합니다.
                지도 뷰 상태와 검색 기준 상태가 섞여 있어, 사용자가 지도를 이동하기만 해도 불필요한 재검색이 발생합니다.
                <code style={{ backgroundColor: "var(--bg-color)", padding: "0.15rem 0.35rem", borderRadius: "4px" }}>docs/domains/location.md</code>에 명시한 <strong style={{ color: "var(--text-color)" }}>"지도는 상태를 바꾸지 않는다"</strong> 원칙과 어긋납니다.
              </p>
              <CodeBlock>{`// 현재 (문제)
onMapIdle → fetchActiveMapItems()  // 지도 이동마다 API 호출

// 개선 방향
onMapIdle → setMapViewportCenter(center)   // 뷰 상태만 갱신
onSearchButtonClick → {
  setSearchCenter(mapViewportCenter)        // 검색 기준 명시적 확정
  fetchActiveMapItems()
}`}</CodeBlock>
              <ul style={{ listStyle: "none", padding: 0, color: "var(--text-secondary)", lineHeight: "1.8", marginTop: "0.75rem", fontSize: "0.9rem" }}>
                {li("mapViewportCenter(뷰)와 searchCenter(검색 기준) 분리")}
                {li("location 탭 전용 pendingSearchArea 상태 — 지도 이동만으로는 재검색 없음")}
                {li("'이 지역 검색' 버튼으로 현재 지도 위치를 명시적으로 검색 기준으로 확정")}
              </ul>
            </Card>
          </section>

          {/* 10. 요약 */}
          <section id="summary" style={{ marginBottom: "3rem", scrollMarginTop: "2rem" }}>
            <h2 style={{ marginBottom: "1rem", color: "var(--text-color)" }}>요약</h2>
            <Card style={{ marginBottom: "1.5rem" }}>
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
                    <th style={{ padding: "0.6rem 0.75rem", textAlign: "left", color: "var(--text-color)" }}>리팩토링 항목</th>
                    <th style={{ padding: "0.6rem 0.75rem", textAlign: "left", color: "var(--text-color)" }}>개선 효과</th>
                    <th style={{ padding: "0.6rem 0.75rem", textAlign: "left", color: "var(--text-color)" }}>상태</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["검색 분기 & SQL 필터", "위치 우선 분기, Java 후처리 제거, 빈 문자열 정규화", "done"],
                    ["거리 계산", "프론트 중복 계산 제거, 백엔드-프론트 일치 보장", "done"],
                    ["상태 관리", "24개 useState → 3개 useReducer", "done"],
                    ["검색 로직 단순화", "300줄 함수 → 80줄 + 전략 함수 분리", "done"],
                    ["하이브리드 전략", "지역 선택 시 항상 백엔드 재요청, 결과 일관성", "done"],
                    ["반경 검색 정렬 옵션", "distance 기본값, 3가지 정렬 + 동순위 보정", "done"],
                    ["후속 쿼리 리팩토링", "review_count 캐시, 대표 카테고리 컬럼", "plan"],
                    ["지도 검색 워크플로우", "mapViewportCenter/searchCenter 분리, 이 지역 검색 버튼", "wip"],
                  ].map(([name, effect, status], i, arr) => (
                    <tr key={name} style={{ borderBottom: i < arr.length - 1 ? "1px solid var(--nav-border)" : "none" }}>
                      <td style={{ padding: "0.6rem 0.75rem" }}>{name}</td>
                      <td style={{ padding: "0.6rem 0.75rem" }}>{effect}</td>
                      <td style={{ padding: "0.6rem 0.75rem", whiteSpace: "nowrap" }}>
                        <StatusBadge type={status} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Card>

            <Card>
              <h3 style={{ marginBottom: "0.75rem", color: "var(--text-color)" }}>관련 페이지</h3>
              <ul style={{ listStyle: "none", padding: 0, color: "var(--text-secondary)", lineHeight: "2" }}>
                <li>
                  •{" "}
                  <Link to="/domains/location" style={{ color: "var(--link-color)", textDecoration: "none" }}>
                    Location 도메인 — 아키텍처·API 요약
                  </Link>
                </li>
                <li>
                  •{" "}
                  <Link to="/domains/location/optimization" style={{ color: "var(--link-color)", textDecoration: "none" }}>
                    Location 성능 최적화 — 초기 로드 수치·전후 측정
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
