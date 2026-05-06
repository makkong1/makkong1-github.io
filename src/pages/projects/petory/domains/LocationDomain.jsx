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
    { id: "search-rules", title: "통합 검색 규칙" },
    { id: "features", title: "주요 기능" },
    { id: "backend-logic", title: "백엔드 로직" },
    { id: "frontend", title: "프론트 로직" },
    { id: "architecture", title: "아키텍처" },
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
    RAPI["/api/location-services/recommend"]
    GAPI["/api/geocoding/*"]
  end
  U --> UM
  UM -->|location| LS --> LAPI
  UM -->|AI 추천| LS --> RAPI
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
            Location 도메인은 병원, 카페, 공원, 펫샵 같은 위치 기반 서비스를 검색하고,
            리뷰와 지도 탐색, 네이버맵 연동, 공공데이터 임포트까지 담당합니다. 핵심은{" "}
            <strong style={{ color: "var(--text-color)" }}>
              위치·지역·키워드를 하나의 일관된 검색 규칙으로 묶고, 통합 지도 UX와 맞물리도록
              API와 프론트 흐름을 정리하는 것
            </strong>
            입니다.
          </p>

          <section id="intro" style={{ marginBottom: "3rem", scrollMarginTop: "2rem" }}>
            <h2 style={{ marginBottom: "1rem", color: "var(--text-color)" }}>도메인 개요</h2>
            <Card style={{ marginBottom: "1rem" }}>
              <p style={{ lineHeight: "1.8", color: "var(--text-secondary)", marginBottom: "0.75rem" }}>
                `docs/domains/location.md` 기준으로 현재 Location 도메인은 단순 장소 목록이 아니라,
                <strong style={{ color: "var(--text-color)" }}> 통합 검색 엔트리, 지도 탐색 UX, 리뷰 캐시, 네이버맵 외부 연동, 공공데이터 적재</strong>를
                한 흐름으로 다루는 도메인입니다.
              </p>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, color: "var(--text-secondary)", lineHeight: "1.8" }}>
                {li("위치(lat/lng) 우선 검색, 지역 계층 검색, 키워드 단독 FULLTEXT fallback을 하나의 `/search` 엔드포인트로 통합했습니다.")}
                {li("프론트는 통합 지도(`UnifiedPetMapPage`)를 기준으로 반경·키워드·카테고리 상태를 조합해 검색합니다.")}
                {li("리뷰는 Soft Delete와 `review_count` 캐시를 포함해 평점 일관성을 유지합니다.")}
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

          <section id="search-rules" style={{ marginBottom: "3rem", scrollMarginTop: "2rem" }}>
            <h2 style={{ marginBottom: "1rem", color: "var(--text-color)" }}>통합 검색 규칙</h2>
            <Card style={{ marginBottom: "1rem" }}>
              <p style={{ color: "var(--text-secondary)", lineHeight: "1.8", marginBottom: "0.75rem" }}>
                현재 백엔드의 단일 기준은 `LocationServiceService.searchLocationServices()`입니다.
                예전 문서의 "키워드 우선"과 달리, 지금은{" "}
                <strong style={{ color: "var(--text-color)" }}>위치가 항상 1순위</strong>
                입니다.
              </p>
              <CodeBlock>{`keyword      = normalize(keyword);
category     = normalize(category);
sido         = normalize(sido);
sigungu      = normalize(sigungu);
eupmyeondong = normalize(eupmyeondong);
roadName     = normalize(roadName);

if (hasLocation) {
  return searchLocationServicesByLocation(...);   // radius default 10000m
}
if (hasRegion) {
  return searchLocationServicesByRegion(...);
}
if (hasKeyword) {
  return searchLocationServicesByKeyword(...);    // FULLTEXT fallback
}
return searchLocationServicesByRegion(null, null, null, null, null, category, maxResults);`}</CodeBlock>
              <ul style={{ listStyle: "none", padding: 0, marginTop: "0.75rem", color: "var(--text-secondary)", lineHeight: "1.8" }}>
                {li("위치(`latitude`, `longitude`)가 있으면 키워드가 함께 와도 반경 검색이 먼저입니다.")}
                {li("지역 파라미터는 `roadName > eupmyeondong > sigungu > sido > 전체` 우선순위를 따릅니다.")}
                {li("빈 문자열은 `null`로 정규화해 SQL `:param IS NULL` 분기가 의도대로 동작하게 합니다.")}
              </ul>
            </Card>

            <Card>
              <h3 style={{ marginBottom: "0.75rem", color: "var(--text-color)", fontSize: "1rem" }}>
                검색 경로별 차이
              </h3>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.9rem", color: "var(--text-secondary)" }}>
                <thead>
                  <tr style={{ borderBottom: "1px solid var(--nav-border)" }}>
                    <th style={{ padding: "0.65rem 0.75rem", textAlign: "left", color: "var(--text-color)" }}>경로</th>
                    <th style={{ padding: "0.65rem 0.75rem", textAlign: "left", color: "var(--text-color)" }}>키워드 처리</th>
                    <th style={{ padding: "0.65rem 0.75rem", textAlign: "left", color: "var(--text-color)" }}>카테고리 처리</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["반경 검색", "이름 `LIKE '%keyword%'`", "SQL WHERE에서 `category1~3` 비교"],
                    ["지역 검색", "이름 `LIKE '%keyword%'`", "SQL WHERE에서 `category1~3` 비교"],
                    ["키워드 단독 검색", "FULLTEXT `MATCH ... AGAINST`", "SQL WHERE에서 `category1~3` 비교"],
                    ["전체 평점순", "키워드 없음", "SQL WHERE에서 `category1~3` 비교"],
                  ].map(([mode, keyword, category], index, arr) => (
                    <tr key={mode} style={{ borderBottom: index < arr.length - 1 ? "1px solid var(--nav-border)" : "none" }}>
                      <td style={{ padding: "0.65rem 0.75rem", color: "var(--text-color)" }}>{mode}</td>
                      <td style={{ padding: "0.65rem 0.75rem" }}>{keyword}</td>
                      <td style={{ padding: "0.65rem 0.75rem" }}>{category}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Card>
          </section>

          <section id="features" style={{ marginBottom: "3rem", scrollMarginTop: "2rem" }}>
            <h2 style={{ marginBottom: "1rem", color: "var(--text-color)" }}>주요 기능</h2>

            <Card style={{ marginBottom: "1rem" }}>
              <h3 style={{ marginBottom: "0.75rem", color: "var(--text-color)", fontSize: "1rem" }}>
                1. 지역 계층 탐색과 반경 검색
              </h3>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, color: "var(--text-secondary)", lineHeight: "1.8" }}>
                {li("시도 → 시군구 → 읍면동 → 도로명으로 지역을 점점 좁히는 계층 탐색을 지원합니다.")}
                {li("좌표가 있으면 `findByRadius`로 반경 검색을 수행하고, `radius`가 없거나 0 이하이면 10000m를 기본값으로 사용합니다.")}
                {li("반경 검색 정렬은 `distance`, `rating`, `reviews`를 지원하며 기본값은 `distance`입니다.")}
              </ul>
            </Card>

            <Card style={{ marginBottom: "1rem" }}>
              <h3 style={{ marginBottom: "0.75rem", color: "var(--text-color)", fontSize: "1rem" }}>
                2. 키워드/카테고리 검색
              </h3>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, color: "var(--text-secondary)", lineHeight: "1.8" }}>
                {li("위치·지역 검색 안에서는 keyword를 이름 `LIKE`로 처리해 후보군 내부만 좁힙니다.")}
                {li("위치와 지역이 모두 없을 때만 FULLTEXT 인덱스 `ft_search`를 사용합니다.")}
                {li("카테고리는 Java 메모리 필터가 아니라 SQL WHERE에서 바로 처리합니다.")}
              </ul>
            </Card>

            <Card style={{ marginBottom: "1rem" }}>
              <h3 style={{ marginBottom: "0.75rem", color: "var(--text-color)", fontSize: "1rem" }}>
                3. 리뷰와 평점 관리
              </h3>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, color: "var(--text-secondary)", lineHeight: "1.8" }}>
                {li("한 서비스당 한 사용자 리뷰 1개만 허용합니다.")}
                {li("리뷰 작성/수정/삭제 시 이메일 인증이 필요합니다.")}
                {li("평점(`rating`)과 리뷰 수(`review_count`)는 Soft Delete 제외 기준으로 함께 갱신합니다.")}
              </ul>
            </Card>

            <Card>
              <h3 style={{ marginBottom: "0.75rem", color: "var(--text-color)", fontSize: "1rem" }}>
                4. 네이버맵 API 연동
              </h3>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, color: "var(--text-secondary)", lineHeight: "1.8" }}>
                {li("주소 → 좌표 변환(Geocoding), 좌표 → 주소 변환(역지오코딩), 길찾기(Directions)를 제공합니다.")}
                {li("길찾기는 `start=경도,위도`, `goal=경도,위도` 형식을 사용하고 기본 옵션은 `traoptimal`입니다.")}
                {li("추천 엔드포인트(`/recommend`)는 검색 결과 후보를 LLM으로 재정렬하고 1줄 추천 이유를 붙입니다.")}
              </ul>
            </Card>
          </section>

          <section id="backend-logic" style={{ marginBottom: "3rem", scrollMarginTop: "2rem" }}>
            <h2 style={{ marginBottom: "1rem", color: "var(--text-color)" }}>백엔드 로직</h2>

            <Card style={{ marginBottom: "1rem" }}>
              <h3 style={{ marginBottom: "0.75rem", color: "var(--text-color)", fontSize: "1rem" }}>
                반경 검색과 거리 계산
              </h3>
              <p style={{ color: "var(--text-secondary)", lineHeight: "1.8", marginBottom: "0.5rem" }}>
                반경 검색은 네이티브 쿼리 `findByRadius`에서 `ST_Within` 근사 bbox와 `ST_Distance_Sphere`를 함께 사용합니다.
                DTO로 변환할 때는 Haversine 거리(m)를 계산해 응답에 포함합니다.
              </p>
              <CodeBlock>{`SELECT ...
WHERE ST_Within(location, POLYGON(...))
  AND ST_Distance_Sphere(location, POINT(...)) <= :radiusInMeters
  AND (:keyword IS NULL OR name LIKE CONCAT('%', :keyword, '%'))
  AND (:category IS NULL OR category3 = :category OR category2 = :category OR category1 = :category)`}</CodeBlock>
              <ul style={{ listStyle: "none", padding: 0, marginTop: "0.75rem", color: "var(--text-secondary)", lineHeight: "1.8" }}>
                {li("DB는 반경 후보를 추리고, 서비스 레이어는 DTO에 표시용 거리 값을 넣습니다.")}
                {li("프론트는 `service.distance`를 우선 사용하고, 없을 때만 fallback 계산을 합니다.")}
              </ul>
            </Card>

            <Card style={{ marginBottom: "1rem" }}>
              <h3 style={{ marginBottom: "0.75rem", color: "var(--text-color)", fontSize: "1rem" }}>
                리뷰 작성/삭제와 통계 갱신
              </h3>
              <p style={{ color: "var(--text-secondary)", lineHeight: "1.8", marginBottom: "0.5rem" }}>
                리뷰는 JWT 사용자 기준으로 작성자를 식별하고, 작성/수정/삭제 때마다 `updateServiceReviewStats()`를 호출해
                서비스 평점과 리뷰 수를 원자적으로 갱신합니다.
              </p>
              <CodeBlock>{`review.setIsDeleted(true);
review.setDeletedAt(LocalDateTime.now());
reviewRepository.save(review);

serviceRepository.updateReviewStats(serviceIdx);`}</CodeBlock>
              <ul style={{ listStyle: "none", padding: 0, marginTop: "0.75rem", color: "var(--text-secondary)", lineHeight: "1.8" }}>
                {li("타인 리뷰 삭제는 `LocationServiceReviewForbiddenException`으로 막습니다.")}
                {li("이미 삭제된 리뷰는 재삭제를 막고, Soft Delete 데이터는 평점 계산에서 제외합니다.")}
              </ul>
            </Card>

            <Card>
              <h3 style={{ marginBottom: "0.75rem", color: "var(--text-color)", fontSize: "1rem" }}>
                서비스 메서드 구조
              </h3>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.9rem", color: "var(--text-secondary)" }}>
                <thead>
                  <tr style={{ borderBottom: "1px solid var(--nav-border)" }}>
                    <th style={{ padding: "0.65rem 0.75rem", textAlign: "left", color: "var(--text-color)" }}>서비스</th>
                    <th style={{ padding: "0.65rem 0.75rem", textAlign: "left", color: "var(--text-color)" }}>역할</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["LocationServiceService", "통합 검색 엔트리, 지역/반경/키워드 분기, 거리 계산, 인기 서비스 캐시"],
                    ["LocationRecommendAgentService", "검색 결과 후보를 LLM으로 재정렬해 추천 이유 부여"],
                    ["NaverMapService", "지오코딩, 역지오코딩, 길찾기 API 연동"],
                    ["LocationServiceReviewService", "리뷰 CRUD, 소유권/이메일 인증 검증, 평점·리뷰수 갱신"],
                  ].map(([name, role], index, arr) => (
                    <tr key={name} style={{ borderBottom: index < arr.length - 1 ? "1px solid var(--nav-border)" : "none" }}>
                      <td style={{ padding: "0.65rem 0.75rem", color: "var(--text-color)" }}>{name}</td>
                      <td style={{ padding: "0.65rem 0.75rem" }}>{role}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Card>
          </section>

          <section id="frontend" style={{ marginBottom: "3rem", scrollMarginTop: "2rem" }}>
            <h2 style={{ marginBottom: "1rem", color: "var(--text-color)" }}>프론트 로직</h2>

            <Card style={{ marginBottom: "1rem" }}>
              <h3 style={{ marginBottom: "0.75rem", color: "var(--text-color)", fontSize: "1rem" }}>
                제품 원칙과 현재 동작
              </h3>
              <p style={{ color: "var(--text-secondary)", lineHeight: "1.8", marginBottom: "0.5rem" }}>
                문서에는 "지도는 상태를 바꾸지 않는다"는 이상적인 UX 원칙이 정리되어 있지만,
                현행 통합 지도(`UnifiedPetMapPage`)는 `mapCenter`, `radius`, `keyword`, `category`가 바뀌면 재조회하는 구조입니다.
              </p>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, color: "var(--text-secondary)", lineHeight: "1.8" }}>
                {li("제품 방향: 사용자가 '이 지역 검색' 같은 명시적 액션으로 검색 기준을 확정한다.")}
                {li("현행: 지도 idle 후 중심 좌표가 바뀌면 디바운스 뒤 API를 다시 호출한다.")}
                {li("이 차이는 리팩토링 문서에서 별도로 추적 중입니다.")}
              </ul>
            </Card>

            <Card style={{ marginBottom: "1rem" }}>
              <h3 style={{ marginBottom: "0.75rem", color: "var(--text-color)", fontSize: "1rem" }}>
                통합 지도 흐름
              </h3>
              <MermaidDiagram chart={unifiedMapFlow} />
            </Card>

            <Card style={{ marginBottom: "1rem" }}>
              <h3 style={{ marginBottom: "0.75rem", color: "var(--text-color)", fontSize: "1rem" }}>
                하이브리드 데이터 로딩
              </h3>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, color: "var(--text-secondary)", lineHeight: "1.8" }}>
                {li("초기 진입은 위치 기반 반경 검색 또는 전체/지역 로드를 사용합니다.")}
                {li("현재 데이터 범위 안에서 카테고리/지역을 다시 좁힐 때는 프론트 필터링을 활용하고, 범위를 벗어나면 백엔드 재요청을 합니다.")}
                {li("2026-02 개선 이후 지역 선택 시에는 초기 로드 방식과 무관하게 결과 일관성을 위해 백엔드 재요청을 우선합니다.")}
              </ul>
            </Card>

            <Card>
              <h3 style={{ marginBottom: "0.75rem", color: "var(--text-color)", fontSize: "1rem" }}>
                지도 연동 세부 사항
              </h3>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, color: "var(--text-secondary)", lineHeight: "1.8" }}>
                {li("`MapContainer`는 네이버맵 `ncpKeyId`를 사용하고, 클러스터링 없이 개별 핀 중심으로 표시합니다.")}
                {li("마커 클릭과 리스트 클릭은 양방향으로 스크롤/이동을 동기화합니다.")}
                {li("길찾기 화면에서는 역지오코딩으로 출발지 주소를 표시하고, 방향 전용 뷰를 관리합니다.")}
              </ul>
            </Card>
          </section>

          <section id="architecture" style={{ marginBottom: "3rem", scrollMarginTop: "2rem" }}>
            <h2 style={{ marginBottom: "1rem", color: "var(--text-color)" }}>아키텍처</h2>

            <Card style={{ marginBottom: "1rem" }}>
              <h3 style={{ marginBottom: "0.75rem", color: "var(--text-color)", fontSize: "1rem" }}>
                도메인 구조
              </h3>
              <CodeBlock>{`domain/location/
  controller/
    LocationServiceController.java
    LocationServiceReviewController.java
    GeocodingController.java
  service/
    LocationServiceService.java
    LocationServiceReviewService.java
    LocationRecommendAgentService.java
    PublicDataLocationService.java
    LocationServiceBatchWriter.java
    NaverMapService.java
  entity/
    LocationService.java
    LocationServiceReview.java`}</CodeBlock>
              <p style={{ color: "var(--text-secondary)", lineHeight: "1.8", marginTop: "0.75rem", marginBottom: 0 }}>
                관리자 기능은 `AdminLocationController`에서 `/api/admin/location-services` 경로로 분리돼 있습니다.
              </p>
            </Card>

            <Card style={{ marginBottom: "1rem" }}>
              <h3 style={{ marginBottom: "0.75rem", color: "var(--text-color)", fontSize: "1rem" }}>
                주요 엔티티
              </h3>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.9rem", color: "var(--text-secondary)" }}>
                <thead>
                  <tr style={{ borderBottom: "1px solid var(--nav-border)" }}>
                    <th style={{ padding: "0.65rem 0.75rem", textAlign: "left", color: "var(--text-color)" }}>엔티티</th>
                    <th style={{ padding: "0.65rem 0.75rem", textAlign: "left", color: "var(--text-color)" }}>역할</th>
                    <th style={{ padding: "0.65rem 0.75rem", textAlign: "left", color: "var(--text-color)" }}>특징</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["LocationService", "위치 서비스 본문", "지역/카테고리 계층, 반려 정책, 평점, `review_count`, Soft Delete"],
                    ["LocationServiceReview", "위치 서비스 리뷰", "BaseTimeEntity 상속, Soft Delete, 평점 계산 참여"],
                  ].map(([name, role, feature], index, arr) => (
                    <tr key={name} style={{ borderBottom: index < arr.length - 1 ? "1px solid var(--nav-border)" : "none" }}>
                      <td style={{ padding: "0.65rem 0.75rem", color: "var(--text-color)" }}>{name}</td>
                      <td style={{ padding: "0.65rem 0.75rem" }}>{role}</td>
                      <td style={{ padding: "0.65rem 0.75rem" }}>{feature}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p style={{ color: "var(--text-secondary)", lineHeight: "1.8", marginTop: "0.75rem", marginBottom: 0, fontSize: "0.9rem" }}>
                DB에는 반경 검색용 `POINT location` 컬럼이 있지만, JPA 엔티티에는 `latitude`/`longitude`만 매핑하고 공간 함수는 네이티브 쿼리에서만 사용합니다.
              </p>
            </Card>

            <Card style={{ marginBottom: "1rem" }}>
              <h3 style={{ marginBottom: "0.75rem", color: "var(--text-color)", fontSize: "1rem" }}>
                엔티티 관계도
              </h3>
              <MermaidDiagram chart={entityDiagram} />
            </Card>

            <Card style={{ marginBottom: "1rem" }}>
              <h3 style={{ marginBottom: "0.75rem", color: "var(--text-color)", fontSize: "1rem" }}>
                주요 API
              </h3>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.9rem", color: "var(--text-secondary)" }}>
                <thead>
                  <tr style={{ borderBottom: "1px solid var(--nav-border)" }}>
                    <th style={{ padding: "0.65rem 0.75rem", textAlign: "left", color: "var(--text-color)" }}>엔드포인트</th>
                    <th style={{ padding: "0.65rem 0.75rem", textAlign: "left", color: "var(--text-color)" }}>Method</th>
                    <th style={{ padding: "0.65rem 0.75rem", textAlign: "left", color: "var(--text-color)" }}>설명</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["/api/location-services/search", "GET", "통합 검색 엔트리, 위치 → 지역 → 키워드 단독 FULLTEXT → 평점순"],
                    ["/api/location-services/recommend", "GET", "검색 결과 후보를 AI로 재정렬"],
                    ["/api/location-services/{serviceIdx}", "DELETE", "서비스 Soft Delete, 관리자 전용"],
                    ["/api/location-service-reviews", "POST", "리뷰 작성"],
                    ["/api/location-service-reviews/{reviewIdx}", "PUT/DELETE", "리뷰 수정 / Soft Delete"],
                    ["/api/location-service-reviews/service/{serviceIdx}", "GET", "서비스별 리뷰 목록"],
                    ["/api/location-service-reviews/user/{userIdx}", "GET", "사용자별 리뷰 목록"],
                    ["/api/geocoding/address", "GET", "주소 → 좌표"],
                    ["/api/geocoding/coordinates", "GET", "좌표 → 주소"],
                    ["/api/geocoding/directions", "GET", "길찾기"],
                  ].map(([path, method, desc], index, arr) => (
                    <tr key={path + method} style={{ borderBottom: index < arr.length - 1 ? "1px solid var(--nav-border)" : "none" }}>
                      <td style={{ padding: "0.65rem 0.75rem" }}>
                        <code style={{ backgroundColor: "var(--bg-color)", padding: "0.15rem 0.35rem", borderRadius: "4px" }}>{path}</code>
                      </td>
                      <td style={{ padding: "0.65rem 0.75rem" }}>{method}</td>
                      <td style={{ padding: "0.65rem 0.75rem" }}>{desc}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p style={{ color: "var(--text-secondary)", lineHeight: "1.8", marginTop: "0.75rem", marginBottom: 0, fontSize: "0.9rem" }}>
                보안 정책상 `/api/geocoding/**`는 `permitAll()`이고, `/api/location-services/**`와 리뷰 API는 `/api/**` 기본 규칙에 따라 인증이 필요합니다.
              </p>
            </Card>

            <Card>
              <h3 style={{ marginBottom: "0.75rem", color: "var(--text-color)", fontSize: "1rem" }}>
                예외와 트랜잭션
              </h3>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, color: "var(--text-secondary)", lineHeight: "1.8" }}>
                {li("리뷰 작성/수정/삭제와 서비스 삭제는 `@Transactional`로 처리합니다.")}
                {li("대표 예외는 `LocationServiceNotFoundException`, `LocationReviewDuplicateException`, `LocationServiceReviewForbiddenException`, `EmailVerificationRequiredException`입니다.")}
                {li("Soft Delete 대상은 서비스와 리뷰 모두이며, 모든 조회 쿼리에서 삭제 데이터를 제외합니다.")}
              </ul>
            </Card>
          </section>

          <section id="performance" style={{ marginBottom: "3rem", scrollMarginTop: "2rem" }}>
            <h2 style={{ marginBottom: "1rem", color: "var(--text-color)" }}>성능 최적화</h2>

            <Card style={{ marginBottom: "1rem" }}>
              <h3 style={{ marginBottom: "0.75rem", color: "var(--text-color)", fontSize: "1rem" }}>
                인덱스 전략
              </h3>
              <CodeBlock>{`CREATE FULLTEXT INDEX ft_search
ON locationservice(name, description, category1, category2, category3);

CREATE INDEX idx_address ON locationservice(address);
CREATE INDEX idx_lat_lng ON locationservice(latitude, longitude);
CREATE INDEX idx_name_address ON locationservice(name, address);
CREATE INDEX idx_rating_desc ON locationservice(rating);

CREATE INDEX service_idx ON locationservicereview(service_idx);
CREATE INDEX user_idx ON locationservicereview(user_idx);`}</CodeBlock>
              <p style={{ color: "var(--text-secondary)", lineHeight: "1.8", marginTop: "0.75rem", marginBottom: 0 }}>
                지역·평점·위치·FULLTEXT 경로에 맞춰 인덱스를 분리했고, 리뷰 조회는 서비스별/사용자별 접근 경로에 맞춰 구성했습니다.
              </p>
            </Card>

            <Card style={{ marginBottom: "1rem" }}>
              <h3 style={{ marginBottom: "0.75rem", color: "var(--text-color)", fontSize: "1rem" }}>
                캐시와 측정 로깅
              </h3>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, color: "var(--text-secondary)", lineHeight: "1.8" }}>
                {li("인기 서비스 `getPopularLocationServices()`는 `@Cacheable`을 사용합니다.")}
                {li("검색 경로에서는 DB 쿼리 시간, DTO 변환 시간, 전체 처리 시간을 로그로 남깁니다.")}
                {li("프론트는 통합 지도에서 디바운스와 캐시 키를 사용해 중복 호출을 줄입니다.")}
              </ul>
            </Card>

            <Card>
              <h3 style={{ marginBottom: "0.75rem", color: "var(--text-color)", fontSize: "1rem" }}>
                최적화 포인트
              </h3>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, color: "var(--text-secondary)", lineHeight: "1.8" }}>
                {li("반경 검색은 공간 함수 비용이 커서 인덱스 전략과 후보 수 제어가 중요합니다.")}
                {li("`review_count` 캐시를 도입해 `reviews` 정렬 비용과 평점/리뷰 수 계산 부담을 낮췄습니다.")}
                {li("하이브리드 데이터 로딩으로 지도 탐색 UX와 재조회 비용 사이 균형을 맞추고 있습니다.")}
              </ul>
            </Card>
          </section>

          <section id="summary" style={{ marginBottom: "3rem", scrollMarginTop: "2rem" }}>
            <h2 style={{ marginBottom: "1rem", color: "var(--text-color)" }}>핵심 포인트</h2>
            <Card>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, color: "var(--text-secondary)", lineHeight: "1.8" }}>
                <li>• 백엔드 검색 규칙의 기준은 `위치 → 지역 → 키워드 단독 FULLTEXT → 평점순`입니다.</li>
                <li>• 반경 검색에서는 keyword와 category를 SQL WHERE에서 직접 처리하고, 거리 값은 DTO에 포함합니다.</li>
                <li>• 프론트는 통합 지도 중심으로 동작하며, 제품 원칙과 현행 구현 사이 차이를 리팩토링 과제로 관리하고 있습니다.</li>
                <li>• 리뷰는 Soft Delete, 이메일 인증, 평점/리뷰 수 원자 갱신까지 포함한 정합성 모델을 갖습니다.</li>
                <li>• 이 도메인의 성능 병목은 공간 검색과 대량 초기 로드였고, 현재는 데이터량·쿼리 비용·UX를 함께 조정하는 구조로 정리돼 있습니다.</li>
              </ul>
            </Card>
          </section>

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
