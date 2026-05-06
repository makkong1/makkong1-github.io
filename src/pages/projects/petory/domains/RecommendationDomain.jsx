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
    { id: "api", title: "API 계약" },
    { id: "service-flow", title: "서비스 흐름" },
    { id: "client", title: "HTTP 클라이언트" },
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

          <section id="api" style={{ marginBottom: "3rem", scrollMarginTop: "2rem" }}>
            <h2 style={{ marginBottom: "1rem", color: "var(--text-color)" }}>API 계약</h2>
            <Card style={{ marginBottom: "1rem" }}>
              <h3 style={{ marginBottom: "0.75rem", color: "var(--text-color)", fontSize: "1rem" }}>
                `GET /api/recommend`
              </h3>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.9rem", color: "var(--text-secondary)" }}>
                <tbody>
                  {[
                    ["메서드", "GET"],
                    ["쿼리", "`lat`(필수), `lng`(필수), `context`(필수)"],
                    ["인증", "로그인 필수, `Authentication.getName()`을 userId로 사용"],
                    ["성공", "200 + `RecommendResponse` JSON"],
                    ["외부 API 실패", "`PetDataApiClient` 예외 전파, 일반적으로 5xx"],
                  ].map(([key, value], index, arr) => (
                    <tr key={key} style={{ borderBottom: index < arr.length - 1 ? "1px solid var(--nav-border)" : "none" }}>
                      <td style={{ padding: "0.65rem 0.75rem", color: "var(--text-color)", width: "9rem" }}>{key}</td>
                      <td style={{ padding: "0.65rem 0.75rem" }}>{value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Card>

            <Card>
              <h3 style={{ marginBottom: "0.75rem", color: "var(--text-color)", fontSize: "1rem" }}>
                응답 DTO `RecommendResponse`
              </h3>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, color: "var(--text-secondary)", lineHeight: "1.8" }}>
                {li("`context`: 외부 API가 echo할 수 있는 맥락 문자열")}
                {li("`facilities`: 시설 후보 목록 — `name`, `distance_m`, `address`, `lat`, `lng`")}
                {li("`trends`: 트렌드 목록 — `keyword`, `score`")}
                {li("`recommendation`: 자연어 추천 문구")}
                {li("`generated_at`: 생성 시각 문자열")}
              </ul>
            </Card>
          </section>

          <section id="service-flow" style={{ marginBottom: "3rem", scrollMarginTop: "2rem" }}>
            <h2 style={{ marginBottom: "1rem", color: "var(--text-color)" }}>서비스 흐름</h2>
            <Card style={{ marginBottom: "1rem" }}>
              <h3 style={{ marginBottom: "0.75rem", color: "var(--text-color)", fontSize: "1rem" }}>
                End-to-End 흐름
              </h3>
              <MermaidDiagram chart={flowDiagram} />
            </Card>

            <Card style={{ marginBottom: "1rem" }}>
              <h3 style={{ marginBottom: "0.75rem", color: "var(--text-color)", fontSize: "1rem" }}>
                `RecommendService` 처리 순서
              </h3>
              <ol style={{ margin: 0, paddingLeft: "1.2rem", color: "var(--text-secondary)", lineHeight: "1.8" }}>
                <li>`RecommendController`가 `userId`, `lat`, `lng`, `context`를 서비스에 전달합니다.</li>
                <li>`PetRepository.findByUserIdAndNotDeleted(userId)`로 반려동물 목록을 조회합니다.</li>
                <li>펫이 있으면 첫 번째 반려동물만 꺼내 `PetInfo`를 구성합니다.</li>
                <li>`RecommendRequest`를 만들 때 `radius_km=10.0`, `top_n=5`를 고정값으로 넣습니다.</li>
                <li>`PetDataApiClient.recommend(request)`로 외부 API에 POST 요청합니다.</li>
                <li>돌아온 `RecommendResponse`를 그대로 클라이언트에 반환합니다.</li>
              </ol>
            </Card>

            <Card>
              <h3 style={{ marginBottom: "0.75rem", color: "var(--text-color)", fontSize: "1rem" }}>
                외부 요청 DTO `RecommendRequest`
              </h3>
              <CodeBlock>{`{
  "lat": 37.5665,
  "lng": 126.9780,
  "context": "location_home",
  "radius_km": 10.0,
  "top_n": 5,
  "pet": {
    "type": "dog",
    "breed": "Pomeranian",
    "age_months": 18
  }
}`}</CodeBlock>
              <ul style={{ listStyle: "none", padding: 0, marginTop: "0.75rem", color: "var(--text-secondary)", lineHeight: "1.8" }}>
                {li("JSON은 스네이크 케이스를 사용합니다: `radius_km`, `top_n`, `age_months`.")}
                {li("`pet`이 없으면 `@JsonInclude(NON_NULL)` 기준으로 요청에서 생략 가능합니다.")}
                {li("반려동물 나이는 `birthDate`가 있을 때만 `ChronoUnit.MONTHS`로 계산합니다.")}
              </ul>
            </Card>
          </section>

          <section id="client" style={{ marginBottom: "3rem", scrollMarginTop: "2rem" }}>
            <h2 style={{ marginBottom: "1rem", color: "var(--text-color)" }}>HTTP 클라이언트</h2>
            <Card style={{ marginBottom: "1rem" }}>
              <h3 style={{ marginBottom: "0.75rem", color: "var(--text-color)", fontSize: "1rem" }}>
                `PetDataApiClient`
              </h3>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, color: "var(--text-secondary)", lineHeight: "1.8" }}>
                {li("`@Component`로 등록된 애플리케이션 빈입니다.")}
                {li("내부적으로 `RestClient.builder()`로 HTTP 클라이언트를 구성합니다.")}
                {li("`POST {baseUrl}/recommend`로 JSON body를 보내고 `X-API-Key` 헤더를 붙입니다.")}
                {li("실패 시 예외를 래핑해 `RuntimeException`으로 던집니다.")}
              </ul>
            </Card>

            <Card>
              <h3 style={{ marginBottom: "0.75rem", color: "var(--text-color)", fontSize: "1rem" }}>
                설정값
              </h3>
              <CodeBlock>{`app.pet-data-api.base-url=https://...
app.pet-data-api.api-key=...`}</CodeBlock>
              <p style={{ color: "var(--text-secondary)", lineHeight: "1.8", marginTop: "0.75rem", marginBottom: 0 }}>
                운영에서는 두 값이 사실상 필수입니다. base URL이 잘못되거나 API Key가 틀리면 Recommendation 경로 전체가 외부 서비스 예외로 실패합니다.
              </p>
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
