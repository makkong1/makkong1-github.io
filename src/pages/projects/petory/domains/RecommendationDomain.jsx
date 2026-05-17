import { Link } from "react-router-dom";
import MermaidDiagram from "../../../../components/Common/MermaidDiagram";
import TableOfContents from "../../../../components/Common/TableOfContents";

const GH = "https://github.com/makkong1/makkong1-github.io/blob/main";

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

function RecommendationDomain() {
  const sections = [
    { id: "intro", title: "도메인 개요" },
    { id: "design", title: "흐름 & 설계" },
    { id: "ops", title: "운영 포인트" },
    { id: "summary", title: "핵심 포인트" },
    { id: "docs", title: "관련 문서" },
  ];

  const flowDiagram = `sequenceDiagram
    participant FE as Frontend
    participant RC as RecommendController
    participant RS as RecommendService
    participant PR as PetRepository
    participant PC as PetDataApiClient
    participant API as Pet Data API

    FE->>RC: GET /api/recommend?lat&lng&context
    RC->>RS: recommend(userId, lat, lng, context)
    RS->>PR: findByUserIdAndNotDeleted(userId)
    PR-->>RS: pets
    RS->>RS: RecommendRequest 조립
    RS->>PC: recommend(request)
    PC->>API: POST /recommend + X-API-Key
    API-->>PC: RecommendResponse JSON
    PC-->>RS: RecommendResponse
    RS-->>RC: 그대로 반환
    RC-->>FE: 200 OK`;

  const li = (text) => <li style={{ marginBottom: "0.35rem" }}>• {text}</li>;

  return (
    <div className="domain-page-wrapper" style={{ padding: "2rem 0" }}>
      <div
        className="domain-page-container"
        style={{ display: "flex", gap: "2rem", alignItems: "flex-start" }}
      >
        <div className="domain-page-content" style={{ flex: 1, maxWidth: "56rem" }}>
          <h1 style={{ marginBottom: "0.5rem", color: "var(--text-color)" }}>
            Recommendation 도메인
          </h1>
          <p
            style={{
              color: "var(--text-secondary)",
              lineHeight: "1.8",
              marginBottom: "2.5rem",
              fontSize: "0.95rem",
            }}
          >
            Recommendation 도메인은 Petory 내부에서 추천 점수나 트렌드를 직접 계산하지 않습니다.
            핵심은 <strong style={{ color: "var(--text-color)" }}>로그인 사용자와 반려동물 정보를 최소한으로 조립해 외부 Pet Data API에 전달하고, 그 응답을 그대로 내려주는 BFF</strong> 역할입니다.
          </p>

          <section id="intro" style={{ marginBottom: "3rem", scrollMarginTop: "2rem" }}>
            <h2 style={{ marginBottom: "1rem", color: "var(--text-color)" }}>도메인 개요</h2>
            <Card style={{ marginBottom: "1rem" }}>
              <p style={{ color: "var(--text-secondary)", lineHeight: "1.8", marginBottom: "0.75rem" }}>
                <code>docs/domains/recommendation.md</code> 기준으로 Recommendation 도메인의 정체성은 추천 엔진이 아니라
                <strong style={{ color: "var(--text-color)" }}> 외부 Python/FastAPI 서비스 앞단에서 요청 계약을 맞추는 프록시 계층</strong>
                입니다.
              </p>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, color: "var(--text-secondary)", lineHeight: "1.8" }}>
                {li("Petory 백엔드는 추천 결과를 MySQL에 저장하지 않습니다.")}
                {li("반려동물 정보는 User 도메인의 `Pet`에서 조회해 외부 요청 DTO에만 넣습니다.")}
                {li("외부 Pet Data API가 실제 추천 점수, 트렌드, 추천 문구를 생성합니다.")}
              </ul>
            </Card>

            <Card>
              <h3 style={{ marginBottom: "0.75rem", color: "var(--text-color)", fontSize: "1rem" }}>
                Location 추천과의 차이
              </h3>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.9rem", color: "var(--text-secondary)" }}>
                <thead>
                  <tr style={{ borderBottom: "1px solid var(--nav-border)" }}>
                    <th style={{ padding: "0.65rem 0.75rem", textAlign: "left", color: "var(--text-color)" }}>구분</th>
                    <th style={{ padding: "0.65rem 0.75rem", textAlign: "left", color: "var(--text-color)" }}>Recommendation</th>
                    <th style={{ padding: "0.65rem 0.75rem", textAlign: "left", color: "var(--text-color)" }}>Location AI 추천</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    [
                      "경로",
                      "GET /api/recommend",
                      "GET /api/location-services/recommend",
                    ],
                    [
                      "데이터 소스",
                      "외부 Pet Data API",
                      "Petory MySQL + LocationRecommendAgentService",
                    ],
                    [
                      "역할",
                      "프록시/BFF",
                      "주변 시설 후보 검색 후 AI enrich",
                    ],
                  ].map(([label, left, right], index, arr) => (
                    <tr key={label} style={{ borderBottom: index < arr.length - 1 ? "1px solid var(--nav-border)" : "none" }}>
                      <td style={{ padding: "0.65rem 0.75rem", color: "var(--text-color)" }}>{label}</td>
                      <td style={{ padding: "0.65rem 0.75rem" }}>{left}</td>
                      <td style={{ padding: "0.65rem 0.75rem" }}>{right}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p style={{ color: "var(--text-secondary)", lineHeight: "1.8", marginTop: "0.75rem", marginBottom: 0 }}>
                장기적으로는 두 경로가 사용자 관점에서 목적이 겹치기 때문에, Pet Data API 계약이 안정화되면 하나로 통합하거나 Location 쪽 AI 추천을 정리하는 로드맵이 문서에 남아 있습니다.
              </p>
            </Card>
          </section>

          {/* ── 흐름 & 설계 ── */}
          <section id="design" style={{ marginBottom: "3rem", scrollMarginTop: "2rem" }}>
            <h2 style={{ marginBottom: "1rem", color: "var(--text-color)" }}>흐름 & 설계</h2>

            {/* E2E 흐름 */}
            <Card style={{ marginBottom: "1rem" }}>
              <h3 style={{ marginBottom: "0.75rem", color: "var(--text-color)", fontSize: "1rem" }}>End-to-End 흐름</h3>
              <MermaidDiagram chart={flowDiagram} />
              <ol style={{ margin: "0.75rem 0 0", paddingLeft: "1.2rem", color: "var(--text-secondary)", lineHeight: "1.8" }}>
                <li>Controller가 userId/lat/lng/context를 서비스에 전달합니다.</li>
                <li>PetRepository에서 사용자 반려동물 목록 조회 → 첫 번째 Pet으로 PetInfo 구성.</li>
                <li>RecommendRequest 조립: <code style={{ backgroundColor: "var(--bg-color)", padding: "0.1rem 0.3rem", borderRadius: "4px" }}>radius_km=10.0</code>, <code style={{ backgroundColor: "var(--bg-color)", padding: "0.1rem 0.3rem", borderRadius: "4px" }}>top_n=5</code> 고정.</li>
                <li>PetDataApiClient → <code style={{ backgroundColor: "var(--bg-color)", padding: "0.1rem 0.3rem", borderRadius: "4px" }}>POST {"{baseUrl}"}/recommend</code> (헤더: X-API-Key).</li>
                <li>응답을 그대로 클라이언트에 반환합니다.</li>
              </ol>
            </Card>

            {/* 요청/응답 계약 */}
            <Card style={{ marginBottom: "1rem" }}>
              <h3 style={{ marginBottom: "0.75rem", color: "var(--text-color)", fontSize: "1rem" }}>요청 / 응답 계약</h3>
              <p style={{ color: "var(--text-secondary)", lineHeight: "1.8", marginBottom: "0.4rem" }}>
                <strong style={{ color: "var(--text-color)" }}>GET /api/recommend</strong> — lat·lng·context 쿼리 필수, 로그인 필수. pet이 없으면 pet 필드 생략.
              </p>
              <CodeBlock>{`// 외부 요청 DTO (스네이크 케이스)
{
  "lat": 37.5665, "lng": 126.9780,
  "context": "grooming",   // grooming | hospital | snack | food | clothes
  "radius_km": 10.0, "top_n": 5,
  "pet": { "type": "dog", "breed": "Pomeranian", "age_months": 18 }
}

// 응답 DTO
{
  "context": "grooming",
  "facilities": [{ "name": "...", "distance_m": 320, "lat": ..., "lng": ... }],
  "trends":    [{ "keyword": "미용", "score": 0.92 }],
  "recommendation": "근처 그루밍샵 3곳을 추천합니다...",
  "generated_at": "2026-05-17T14:00:00"
}`}</CodeBlock>
            </Card>

            {/* HTTP 클라이언트 */}
            <Card>
              <h3 style={{ marginBottom: "0.75rem", color: "var(--text-color)", fontSize: "1rem" }}>PetDataApiClient</h3>
              <ul style={{ listStyle: "none", padding: 0, marginBottom: "0.75rem", color: "var(--text-secondary)", lineHeight: "1.8" }}>
                {li("@Component — RestClient.builder()로 구성. 실패 시 RuntimeException으로 래핑해 전파.")}
                {li("설정: app.pet-data-api.base-url / app.pet-data-api.api-key (운영 필수).")}
              </ul>
              <CodeBlock>{`app.pet-data-api.base-url=https://...
app.pet-data-api.api-key=your-key`}</CodeBlock>
            </Card>
          </section>

          <section id="ops" style={{ marginBottom: "3rem", scrollMarginTop: "2rem" }}>
            <h2 style={{ marginBottom: "1rem", color: "var(--text-color)" }}>운영 포인트</h2>
            <Card style={{ marginBottom: "1rem" }}>
              <h3 style={{ marginBottom: "0.75rem", color: "var(--text-color)", fontSize: "1rem" }}>
                데이터베이스
              </h3>
              <p style={{ color: "var(--text-secondary)", lineHeight: "1.8", margin: 0 }}>
                Recommendation 도메인 전용 테이블은 없습니다. Petory 쪽 DB에서는 User 도메인의 `PetRepository`를 통해 반려동물 정보를 읽기만 하고, 추천 결과는 영속화하지 않습니다.
              </p>
            </Card>

            <Card style={{ marginBottom: "1rem" }}>
              <h3 style={{ marginBottom: "0.75rem", color: "var(--text-color)", fontSize: "1rem" }}>
                운영 체크리스트
              </h3>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, color: "var(--text-secondary)", lineHeight: "1.8" }}>
                {li("`app.pet-data-api.base-url`, `app.pet-data-api.api-key`가 환경별로 올바르게 주입돼야 합니다.")}
                {li("Pet Data API가 내려가면 이 도메인은 5xx로 실패하므로, 모니터링과 재시도 정책이 별도로 필요합니다.")}
                {li("`context`는 프론트와 Pet Data API가 합의한 자유 형식 문자열이라 계약 관리가 중요합니다.")}
              </ul>
            </Card>

            <Card>
              <h3 style={{ marginBottom: "0.75rem", color: "var(--text-color)", fontSize: "1rem" }}>
                관련 코드
              </h3>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.9rem", color: "var(--text-secondary)" }}>
                <tbody>
                  {[
                    ["REST", "RecommendController"],
                    ["애플리케이션 서비스", "RecommendService"],
                    ["HTTP 클라이언트", "PetDataApiClient"],
                    ["DTO", "RecommendRequest, RecommendResponse"],
                  ].map(([role, name], index, arr) => (
                    <tr key={role} style={{ borderBottom: index < arr.length - 1 ? "1px solid var(--nav-border)" : "none" }}>
                      <td style={{ padding: "0.65rem 0.75rem", color: "var(--text-color)", width: "10rem" }}>{role}</td>
                      <td style={{ padding: "0.65rem 0.75rem" }}>{name}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Card>
          </section>

          <section id="summary" style={{ marginBottom: "3rem", scrollMarginTop: "2rem" }}>
            <h2 style={{ marginBottom: "1rem", color: "var(--text-color)" }}>핵심 포인트</h2>
            <Card>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, color: "var(--text-secondary)", lineHeight: "1.8" }}>
                <li>• Recommendation 도메인은 추천 엔진이 아니라 Pet Data API 앞단의 BFF입니다.</li>
                <li>• 로그인 사용자의 첫 번째 반려동물 정보만 외부 요청 DTO에 붙입니다.</li>
                <li>• 추천 결과는 Petory DB에 저장하지 않고 외부 응답을 그대로 반환합니다.</li>
                <li>• 현재 Location AI 추천과 목적이 겹치며, 장기적으로는 한쪽으로 통합하는 로드맵이 있습니다.</li>
                <li>• 운영상 가장 중요한 리스크는 외부 API 의존성과 설정(base URL, API Key)입니다.</li>
              </ul>
            </Card>
          </section>

          <section id="docs" style={{ marginBottom: "3rem", scrollMarginTop: "2rem" }}>
            <h2 style={{ marginBottom: "1rem", color: "var(--text-color)" }}>관련 문서</h2>
            <Card>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, color: "var(--text-secondary)", lineHeight: "2" }}>
                <li>
                  •{" "}
                  <a
                    href={`${GH}/docs/domains/recommendation.md`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: "var(--link-color)", textDecoration: "none" }}
                  >
                    recommendation.md
                  </a>
                </li>
                <li>
                  •{" "}
                  <a
                    href={`${GH}/docs/architecture/pet-data-api%20architecture.md`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: "var(--link-color)", textDecoration: "none" }}
                  >
                    Pet Data API 통합 아키텍처
                  </a>
                </li>
                <li>
                  •{" "}
                  <Link to="/domains/location" style={{ color: "var(--link-color)", textDecoration: "none" }}>
                    Location 도메인
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

export default RecommendationDomain;
