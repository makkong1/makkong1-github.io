import { Link } from "react-router-dom";

const GH = "https://github.com/makkong1/makkong1-github.io/blob/main";

function RecommendationDomain() {
  return (
    <div className="domain-page-wrapper" style={{ padding: "2rem 0" }}>
      <div className="domain-page-container">
        <div className="domain-page-content" style={{ maxWidth: "42rem" }}>
          <h1 style={{ marginBottom: "0.75rem", color: "var(--text-color)" }}>
            Recommendation (Pet Data API 연동)
          </h1>
          <p
            style={{
              color: "var(--text-secondary)",
              fontSize: "0.9rem",
              marginBottom: "1.5rem",
              lineHeight: 1.6,
            }}
          >
            Python 서비스 내부(수집·모델·DB)는 문서로 두고,{" "}
            <strong style={{ color: "var(--text-color)" }}>Petory에서 외부 API를
            어떻게 부르는지</strong>만 짧게 적어 둔다.
          </p>

          <div
            className="section-card"
            style={{
              padding: "1.25rem 1.5rem",
              backgroundColor: "var(--card-bg)",
              borderRadius: "8px",
              border: "1px solid var(--nav-border)",
              marginBottom: "1rem",
            }}
          >
            <h2
              style={{
                fontSize: "1.05rem",
                marginBottom: "0.75rem",
                color: "var(--text-color)",
              }}
            >
              대략 이런 그림
            </h2>
            <p
              style={{
                color: "var(--text-secondary)",
                lineHeight: 1.85,
                fontSize: "0.9rem",
                margin: 0,
              }}
            >
              앱이 <code>GET /api/recommend</code>(위도·경도·맥락 문자열)를 치면 →{" "}
              Petory는 로그인한 사용자 기준으로 반려동물 정보를 조금 붙이고 →{" "}
              별도로 돌아가는 <strong style={{ color: "var(--text-color)" }}>Pet
              Data API</strong>(파이썬/FastAPI 쪽)에 HTTP로 한 번 더 요청하고 →
              돌아온 JSON을 <strong style={{ color: "var(--text-color)" }}>그대로
              </strong> 내려준다. 추천 로직·DB는 Java가 아니라 그쪽 서비스에 있다.
            </p>
          </div>

          <div
            className="section-card"
            style={{
              padding: "1.25rem 1.5rem",
              backgroundColor: "var(--card-bg)",
              borderRadius: "8px",
              border: "1px solid var(--nav-border)",
              marginBottom: "1rem",
            }}
          >
            <h2
              style={{
                fontSize: "1.05rem",
                marginBottom: "0.75rem",
                color: "var(--text-color)",
              }}
            >
              Location 쪽 추천이랑 다른 점 (한 줄)
            </h2>
            <p
              style={{
                color: "var(--text-secondary)",
                lineHeight: 1.85,
                fontSize: "0.9rem",
                margin: 0,
              }}
            >
              <Link to="/domains/location" style={{ color: "var(--link-color)" }}>
                Location
              </Link>
              은 우리 DB에서 시설 찾고 에이전트로 이유 붙이는 경로가 따로 있고, 여기는{" "}
              <strong style={{ color: "var(--text-color)" }}>외부 API 한 통</strong>
              이다. 장기적으로는 한쪽으로 합칠 수 있다는 로드맵만 문서에 있다.
            </p>
          </div>

          <div
            style={{
              padding: "1rem 0 0",
              color: "var(--text-secondary)",
              fontSize: "0.88rem",
              lineHeight: 1.8,
            }}
          >
            <div style={{ marginBottom: "0.5rem" }}>
              <strong style={{ color: "var(--text-color)" }}>표·시퀀스</strong>
              가 필요하면 프로젝트 문서 쪽이 맞다.{" "}
              <code>docs/performance</code>에는 이 주제 파일은 없고, 그림은 아래
              정도.
            </div>
            <ul style={{ margin: "0.25rem 0 0", paddingLeft: "1.2rem" }}>
              <li style={{ marginBottom: "0.35rem" }}>
                <a
                  href={`${GH}/docs/architecture/pet-data-api%20architecture.md`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "var(--link-color)" }}
                >
                  pet-data-api 통합 아키텍처
                </a>{" "}
                — E2E 한 장 요약
              </li>
              <li>
                <a
                  href={`${GH}/docs/domains/recommendation.md`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "var(--link-color)" }}
                >
                  recommendation.md
                </a>{" "}
                — API 표·DTO
              </li>
            </ul>
          </div>

          <p style={{ marginTop: "1.5rem", fontSize: "0.85rem", color: "var(--text-secondary)" }}>
            <Link to="/portfolio/petory" style={{ color: "var(--link-color)" }}>
              ← Petory 프로젝트
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default RecommendationDomain;
