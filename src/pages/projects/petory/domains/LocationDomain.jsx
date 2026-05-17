import { Link } from "react-router-dom";
import MermaidDiagram from "../../../../components/Common/MermaidDiagram";
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
        whiteSpace: "pre-wrap",
      }}
    >
      {children}
    </pre>
  );
}

function LocationDomain() {
  const sections = [
    { id: "intro", title: "도메인 개요" },
    { id: "design", title: "기능 & 아키텍처" },
    { id: "performance", title: "성능 최적화" },
    { id: "summary", title: "핵심 포인트" },
    { id: "docs", title: "관련 페이지" },
  ];

  const entityDiagram = `erDiagram
    LocationService ||--o{ LocationServiceReview : "has"
    Users ||--o{ LocationServiceReview : "writes"

    LocationService {
        Long idx PK
        String name
        String category1
        String category2
        String category3
        String sido
        String sigungu
        String eupmyeondong
        String roadName
        String address
        Double latitude
        Double longitude
        Double rating
        Integer reviewCount
        Double score
        Boolean isDeleted
        LocalDateTime deletedAt
    }

    LocationServiceReview {
        Long idx PK
        Long service_idx FK
        Long user_idx FK
        Integer rating
        String comment
        Boolean isDeleted
        LocalDateTime deletedAt
    }`;

  const unifiedMapFlow = `flowchart LR
  subgraph FE["Frontend"]
    U[UnifiedPetMapPage]
    UM[unifiedMapApi.fetchActiveMapItems]
    LS[locationServiceApi]
    MC[MapContainer]
  end
  subgraph BE["Backend APIs"]
    LAPI["/api/location-services/search"]
    GAPI["/api/geocoding/*"]
  end
  U --> UM
  UM -->|location 탭| LS --> LAPI
  U --> MC
  U --> GAPI`;

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
              marginBottom: "2.5rem",
              fontSize: "0.95rem",
            }}
          >
            Location 도메인은 병원·카페·공원·펫샵 같은 위치 기반 서비스를 검색하고,
            리뷰·지도 탐색·네이버맵 연동·공공데이터 임포트까지 담당합니다. 핵심은{" "}
            <strong style={{ color: "var(--text-color)" }}>
              위치·지역·키워드를 하나의 일관된 검색 규칙으로 묶고, 통합 지도 UX와
              맞물리도록 API와 프론트 흐름을 정리하는 것
            </strong>
            입니다.
          </p>

          {/* ── 도메인 개요 ── */}
          <section id="intro" style={{ marginBottom: "3rem", scrollMarginTop: "2rem" }}>
            <h2 style={{ marginBottom: "1rem", color: "var(--text-color)" }}>도메인 개요</h2>
            <Card style={{ marginBottom: "1rem" }}>
              <p style={{ lineHeight: "1.8", color: "var(--text-secondary)", marginBottom: "0.75rem" }}>
                Location 도메인은 단순 장소 목록이 아니라{" "}
                <strong style={{ color: "var(--text-color)" }}>
                  통합 검색 엔트리, 지도 탐색 UX, 리뷰 캐시, 네이버맵 외부 연동, 공공데이터 적재
                </strong>
                를 한 흐름으로 다루는 도메인입니다.
              </p>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, color: "var(--text-secondary)", lineHeight: "1.8" }}>
                {li("위치(lat/lng) 우선 검색, 지역 계층 검색, 키워드 단독 FULLTEXT fallback을 하나의 `/search` 엔드포인트로 통합했습니다.")}
                {li("프론트는 통합 지도(`UnifiedPetMapPage`)를 기준으로 반경·키워드·카테고리 상태를 조합해 검색합니다.")}
                {li("리뷰는 Soft Delete와 `review_count` 캐시를 포함해 평점 일관성을 유지합니다.")}
                {li("AI 추천(`LocationRecommendAgentService` / Spring AI)은 pet-data-api의 `GET /api/recommend`로 통합·대체됐습니다.")}
              </ul>
            </Card>

            <Card>
              <h3 style={{ marginBottom: "0.75rem", color: "var(--text-color)", fontSize: "1rem" }}>
                핵심 성과
              </h3>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, color: "var(--text-secondary)", lineHeight: "1.8" }}>
                <li>
                  • 초기 로드 데이터: <strong style={{ color: "var(--text-color)" }}>22,699개 → 1,026개</strong>
                </li>
                <li>
                  • 위치 기반 검색은 거리 계산을 DTO에 포함시켜 프론트 재계산을 줄였습니다.
                </li>
                <li>
                  • 반경 검색 정렬은 `distance` 기본, `rating`, `reviews`까지 확장했습니다.
                </li>
                <li>
                  • 자세한 수치와 전후 비교는{" "}
                  <Link
                    to="/domains/location/optimization"
                    style={{ color: "var(--link-color)", textDecoration: "none" }}
                  >
                    성능 최적화
                  </Link>
                  , 검색/쿼리 구조 변경은{" "}
                  <Link
                    to="/domains/location/refactoring"
                    style={{ color: "var(--link-color)", textDecoration: "none" }}
                  >
                    리팩토링
                  </Link>
                  에 분리했습니다.
                </li>
              </ul>
            </Card>
          </section>

          {/* ── 기능 & 아키텍처 ── */}
          <section id="design" style={{ marginBottom: "3rem", scrollMarginTop: "2rem" }}>
            <h2 style={{ marginBottom: "1rem", color: "var(--text-color)" }}>기능 & 아키텍처</h2>

            {/* 통합 검색 규칙 */}
            <Card style={{ marginBottom: "1rem" }}>
              <h3 style={{ marginBottom: "0.75rem", color: "var(--text-color)", fontSize: "1rem" }}>
                통합 검색 규칙 (위치 우선)
              </h3>
              <p style={{ color: "var(--text-secondary)", lineHeight: "1.8", marginBottom: "0.5rem" }}>
                `LocationServiceService.searchLocationServices()`의 단일 진입점 기준.{" "}
                <strong style={{ color: "var(--text-color)" }}>위치가 항상 1순위</strong>
                이며, 파라미터 유무에 따라 경로가 자동 분기됩니다.
              </p>
              <CodeBlock>{`keyword      = normalize(keyword);   // "" → null
category     = normalize(category);

if (hasLocation) {
  return searchByLocation(...);    // ST_Within + Haversine, radius 기본 10,000m
}
if (hasRegion) {
  return searchByRegion(...);      // roadName > eupmyeondong > sigungu > sido
}
if (hasKeyword) {
  return searchByKeyword(...);     // FULLTEXT MATCH ... AGAINST (Boolean Mode)
}
return searchByRegion(null, ..., maxResults);  // 전체 평점순 fallback`}</CodeBlock>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.88rem", color: "var(--text-secondary)", marginTop: "0.75rem" }}>
                <thead>
                  <tr style={{ borderBottom: "1px solid var(--nav-border)" }}>
                    <th style={{ padding: "0.55rem 0.75rem", textAlign: "left", color: "var(--text-color)" }}>경로</th>
                    <th style={{ padding: "0.55rem 0.75rem", textAlign: "left", color: "var(--text-color)" }}>키워드 처리</th>
                    <th style={{ padding: "0.55rem 0.75rem", textAlign: "left", color: "var(--text-color)" }}>카테고리</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["반경 검색", "이름 LIKE '%keyword%'", "SQL WHERE category1~3"],
                    ["지역 검색", "이름 LIKE '%keyword%'", "SQL WHERE category1~3"],
                    ["키워드 단독", "FULLTEXT MATCH ... AGAINST", "SQL WHERE category1~3"],
                    ["전체 평점순", "키워드 없음", "SQL WHERE category1~3"],
                  ].map(([mode, kw, cat], i, arr) => (
                    <tr key={mode} style={{ borderBottom: i < arr.length - 1 ? "1px solid var(--nav-border)" : "none" }}>
                      <td style={{ padding: "0.55rem 0.75rem", color: "var(--text-color)" }}>{mode}</td>
                      <td style={{ padding: "0.55rem 0.75rem" }}>{kw}</td>
                      <td style={{ padding: "0.55rem 0.75rem" }}>{cat}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Card>

            {/* 반경 검색 */}
            <Card style={{ marginBottom: "1rem" }}>
              <h3 style={{ marginBottom: "0.75rem", color: "var(--text-color)", fontSize: "1rem" }}>
                반경 검색 쿼리
              </h3>
              <ul style={{ listStyle: "none", padding: 0, marginBottom: "0.5rem", color: "var(--text-secondary)", lineHeight: "1.8" }}>
                {li("DB 공간 인덱스(ST_Within POLYGON)로 1차 후보를 추리고, ST_Distance_Sphere로 2차 필터링합니다.")}
                {li("서비스 레이어에서 Haversine으로 표시용 거리(m)를 DTO에 부착합니다 (반경 필터 자체는 DB 담당).")}
                {li("반경 미입력·0이하 → 10,000m 기본. 정렬: distance(기본) / rating / reviews.")}
              </ul>
              <CodeBlock>{`WHERE ST_Within(location, POLYGON(...))
  AND ST_Distance_Sphere(location, POINT(:lng, :lat)) <= :radiusInMeters
  AND (:keyword IS NULL OR name LIKE CONCAT('%', :keyword, '%'))
  AND (:category IS NULL OR category3=:category
                         OR category2=:category
                         OR category1=:category)`}</CodeBlock>
            </Card>

            {/* 리뷰 & 평점 */}
            <Card style={{ marginBottom: "1rem" }}>
              <h3 style={{ marginBottom: "0.75rem", color: "var(--text-color)", fontSize: "1rem" }}>
                리뷰 & 평점 관리
              </h3>
              <ul style={{ listStyle: "none", padding: 0, marginBottom: "0.5rem", color: "var(--text-secondary)", lineHeight: "1.8" }}>
                {li("서비스당 사용자 1개 리뷰. 작성·수정·삭제 전 이메일 인증 필수 (LOCATION_REVIEW).")}
                {li("삭제는 Soft Delete → updateReviewStats()로 rating·review_count 원자 갱신.")}
                {li("평점 갱신 쿼리는 inline view로 MySQL 동일 테이블 서브쿼리 제한을 우회해 Lost Update를 방지합니다.")}
              </ul>
              <CodeBlock>{`UPDATE locationservice SET rating = (
  SELECT avg_rating FROM (
    SELECT COALESCE(AVG(r.rating), 0.0) AS avg_rating
    FROM locationservicereview r
    WHERE r.service_idx = :serviceIdx AND r.is_deleted = 0
  ) t
) WHERE idx = :serviceIdx`}</CodeBlock>
            </Card>

            {/* 지오코딩 */}
            <Card style={{ marginBottom: "1rem" }}>
              <h3 style={{ marginBottom: "0.75rem", color: "var(--text-color)", fontSize: "1rem" }}>
                지오코딩 (NaverMapService)
              </h3>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, color: "var(--text-secondary)", lineHeight: "1.8" }}>
                {li("주소 → 좌표(`/api/geocoding/address`), 좌표 → 주소(`/api/geocoding/coordinates`), 길찾기(`/api/geocoding/directions`) 세 엔드포인트를 제공합니다.")}
                {li("Naver Cloud Platform Maps API를 서버에서 호출 — API Key는 서버 설정에만 보관하고 프론트에 노출하지 않습니다.")}
                {li("길찾기 start/goal 파라미터 형식: `경도,위도` 순 문자열.")}
                {li("`/api/geocoding/**`는 SecurityConfig에서 permitAll() 처리됩니다.")}
              </ul>
            </Card>

            {/* 통합 지도 흐름 */}
            <Card style={{ marginBottom: "1rem" }}>
              <h3 style={{ marginBottom: "0.75rem", color: "var(--text-color)", fontSize: "1rem" }}>
                통합 지도 흐름 (UnifiedPetMapPage)
              </h3>
              <MermaidDiagram chart={unifiedMapFlow} />
              <ul style={{ listStyle: "none", padding: 0, marginTop: "0.75rem", margin: 0, color: "var(--text-secondary)", lineHeight: "1.8" }}>
                {li("통합 지도는 주변서비스·모임·펫케어 탭을 가지며, 활성 탭에 대해서만 각 도메인 API를 호출합니다.")}
                {li("프론트에서 km 단위 반경을 받아 `radius * 1000`으로 m 변환 후 백엔드에 전달합니다.")}
                {li("지도 idle 후 중심 좌표가 바뀌면 디바운스 뒤 API를 재호출합니다.")}
              </ul>
            </Card>

            {/* 도메인 구조 */}
            <Card style={{ marginBottom: "1rem" }}>
              <h3 style={{ marginBottom: "0.75rem", color: "var(--text-color)", fontSize: "1rem" }}>
                도메인 구조
              </h3>
              <CodeBlock>{`domain/location/
  controller/
    LocationServiceController.java       GET /api/location-services/search
    LocationServiceReviewController.java /api/location-service-reviews
    GeocodingController.java             /api/geocoding/*
  service/
    LocationServiceService.java          통합 검색 진입점
    LocationServiceReviewService.java    리뷰 CRUD + 평점 갱신
    LocationServiceScoreScheduler.java   매일 자정 복합 스코어 재계산
    PublicDataLocationService.java       CSV 배치 임포트
    LocationServiceBatchWriter.java      REQUIRES_NEW 배치 저장
    NaverMapService.java                 지오코딩·길찾기
  entity/
    LocationService.java
    LocationServiceReview.java

domain/admin/controller/
  AdminLocationController.java  /api/admin/location-services (공공데이터 임포트)`}</CodeBlock>
            </Card>

            {/* 엔티티 관계도 */}
            <Card style={{ marginBottom: "1rem" }}>
              <h3 style={{ marginBottom: "0.75rem", color: "var(--text-color)", fontSize: "1rem" }}>
                엔티티 관계도
              </h3>
              <MermaidDiagram chart={entityDiagram} />
              <p style={{ color: "var(--text-secondary)", lineHeight: "1.7", marginTop: "0.75rem", marginBottom: 0, fontSize: "0.88rem" }}>
                DB에는 반경 검색용{" "}
                <code style={{ backgroundColor: "var(--bg-color)", padding: "0.1rem 0.3rem", borderRadius: "4px" }}>
                  POINT location
                </code>{" "}
                컬럼(공간 인덱스)이 있지만, JPA 엔티티에는 latitude/longitude만 매핑하고 공간 함수는 Native 쿼리에서만 사용합니다.
              </p>
            </Card>

            {/* 주요 API */}
            <Card>
              <h3 style={{ marginBottom: "0.75rem", color: "var(--text-color)", fontSize: "1rem" }}>
                주요 API
              </h3>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.88rem", color: "var(--text-secondary)" }}>
                <thead>
                  <tr style={{ borderBottom: "1px solid var(--nav-border)" }}>
                    <th style={{ padding: "0.55rem 0.75rem", textAlign: "left", color: "var(--text-color)" }}>엔드포인트</th>
                    <th style={{ padding: "0.55rem 0.75rem", textAlign: "left", color: "var(--text-color)" }}>Method</th>
                    <th style={{ padding: "0.55rem 0.75rem", textAlign: "left", color: "var(--text-color)" }}>설명</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["/api/location-services/search", "GET", "통합 검색 (위치 → 지역 → FULLTEXT → 평점순)"],
                    ["/api/location-service-reviews", "POST", "리뷰 작성 (이메일 인증 필수)"],
                    ["/api/location-service-reviews/{idx}", "PUT/DELETE", "리뷰 수정 / Soft Delete"],
                    ["/api/location-service-reviews/service/{idx}", "GET", "서비스별 리뷰 목록"],
                    ["/api/geocoding/address", "GET", "주소 → 좌표 (permitAll)"],
                    ["/api/geocoding/coordinates", "GET", "좌표 → 주소 (permitAll)"],
                    ["/api/geocoding/directions", "GET", "길찾기 (permitAll)"],
                    ["/api/admin/location-services", "GET/POST", "관리자 목록 · 공공데이터 CSV 임포트"],
                  ].map(([path, method, desc], i, arr) => (
                    <tr key={path + method} style={{ borderBottom: i < arr.length - 1 ? "1px solid var(--nav-border)" : "none" }}>
                      <td style={{ padding: "0.55rem 0.75rem" }}>
                        <code style={{ backgroundColor: "var(--bg-color)", padding: "0.1rem 0.3rem", borderRadius: "4px", fontSize: "0.82rem" }}>{path}</code>
                      </td>
                      <td style={{ padding: "0.55rem 0.75rem" }}>{method}</td>
                      <td style={{ padding: "0.55rem 0.75rem" }}>{desc}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p style={{ color: "var(--text-secondary)", lineHeight: "1.8", marginTop: "0.75rem", marginBottom: 0, fontSize: "0.88rem" }}>
                `/api/location-services/**`와 리뷰 API는 인증 필요. `/api/geocoding/**`는 permitAll().
              </p>
            </Card>
          </section>

          {/* ── 성능 최적화 ── */}
          <section id="performance" style={{ marginBottom: "3rem", scrollMarginTop: "2rem" }}>
            <h2 style={{ marginBottom: "1rem", color: "var(--text-color)" }}>성능 최적화</h2>

            <Card style={{ marginBottom: "1rem" }}>
              <h3 style={{ marginBottom: "0.75rem", color: "var(--text-color)", fontSize: "1rem" }}>
                인덱스 전략
              </h3>
              <CodeBlock>{`-- 위치 기반 반경 검색
CREATE SPATIAL INDEX idx_location_coords ON locationservice(location);

-- 전문 검색 (FULLTEXT fallback 경로)
CREATE FULLTEXT INDEX ft_search
ON locationservice(name, description, category1, category2, category3);

-- 지역 검색 + 정렬
CREATE INDEX idx_sigungu ON locationservice(sigungu);
CREATE INDEX idx_rating_desc ON locationservice(rating);

-- 리뷰 조회
CREATE INDEX idx_review_service ON locationservicereview(service_idx);
CREATE INDEX idx_review_user   ON locationservicereview(user_idx);`}</CodeBlock>
            </Card>

            <Card style={{ marginBottom: "1rem" }}>
              <h3 style={{ marginBottom: "0.75rem", color: "var(--text-color)", fontSize: "1rem" }}>
                캐시 & 스코어 배치
              </h3>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, color: "var(--text-secondary)", lineHeight: "1.8" }}>
                {li("인기 서비스 `getPopularLocationServices()`는 @Cacheable(Redis, TTL 30분)을 사용합니다.")}
                {li("`LocationServiceScoreScheduler`: 매일 자정 전체 서비스의 복합 스코어를 재계산합니다. score = 0.5 × rating × log10(reviewCount+1) + 0.2 × petFriendly")}
                {li("검색 경로에서는 DB 쿼리 시간·DTO 변환 시간·전체 처리 시간을 @DebugLog로 측정합니다.")}
              </ul>
            </Card>

            <Card>
              <h3 style={{ marginBottom: "0.75rem", color: "var(--text-color)", fontSize: "1rem" }}>
                최적화 포인트
              </h3>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, color: "var(--text-secondary)", lineHeight: "1.8" }}>
                {li("반경 검색은 공간 함수 비용이 커서 인덱스 전략과 후보 수 제어가 중요합니다.")}
                {li("`review_count` 캐시 컬럼을 도입해 리뷰 정렬 비용과 평점 계산 부담을 낮췄습니다.")}
                {li("공공데이터 CSV 임포트는 1,000건 단위 배치·REQUIRES_NEW 분리 트랜잭션으로 부분 실패 시에도 다른 배치를 정상 저장합니다.")}
              </ul>
            </Card>
          </section>

          {/* ── 핵심 포인트 ── */}
          <section id="summary" style={{ marginBottom: "3rem", scrollMarginTop: "2rem" }}>
            <h2 style={{ marginBottom: "1rem", color: "var(--text-color)" }}>핵심 포인트</h2>
            <Card>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, color: "var(--text-secondary)", lineHeight: "1.8" }}>
                <li>• 검색 규칙의 기준은 <strong style={{ color: "var(--text-color)" }}>위치 → 지역 → 키워드 단독 FULLTEXT → 평점순</strong>. 파라미터가 없어도 항상 결과를 반환합니다.</li>
                <li>• 반경 검색 키워드·카테고리는 SQL WHERE에서 직접 처리하고, 거리 값은 DTO에 포함해 프론트 재계산을 없앴습니다.</li>
                <li>• 평점 갱신은 inline view + @Modifying Native UPDATE 단일 쿼리로 Lost Update를 방지합니다.</li>
                <li>• AI 추천은 JVM 내 Spring AI/Ollama 구현을 제거하고 <strong style={{ color: "var(--text-color)" }}>pet-data-api `GET /api/recommend`</strong>로 통합했습니다.</li>
                <li>• 공공데이터 7만건 적재, 복합 스코어 배치 재계산, Redis 캐시까지 운영 측면도 설계에 포함돼 있습니다.</li>
              </ul>
            </Card>
          </section>

          {/* ── 관련 페이지 ── */}
          <section id="docs" style={{ marginBottom: "3rem", scrollMarginTop: "2rem" }}>
            <h2 style={{ marginBottom: "1rem", color: "var(--text-color)" }}>관련 페이지</h2>
            <Card>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, color: "var(--text-secondary)", lineHeight: "2" }}>
                <li>
                  •{" "}
                  <Link
                    to="/domains/location/optimization"
                    style={{ color: "var(--link-color)", textDecoration: "none" }}
                  >
                    Location 성능 최적화
                  </Link>
                </li>
                <li>
                  •{" "}
                  <Link
                    to="/domains/location/refactoring"
                    style={{ color: "var(--link-color)", textDecoration: "none" }}
                  >
                    Location 리팩토링
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

export default LocationDomain;
