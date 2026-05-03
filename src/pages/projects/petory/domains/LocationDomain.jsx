import { Link } from "react-router-dom";
import MermaidDiagram from "../../../../components/Common/MermaidDiagram";
import TableOfContents from "../../../../components/Common/TableOfContents";

const GH = "https://github.com/makkong1/makkong1-github.io/blob/main";

function LocationDomain() {
  const sections = [
    { id: "intro", title: "도메인 소개" },
    { id: "architecture", title: "아키텍처 (프론트·백엔드)" },
    { id: "features", title: "주요 기능" },
    { id: "performance-context", title: "성능·리팩토링·DB (맥락)" },
    { id: "entities", title: "Entity 구조" },
    { id: "security", title: "보안 및 권한 체계" },
    { id: "relationships", title: "다른 도메인과의 연관관계" },
    { id: "api", title: "API 엔드포인트" },
    { id: "docs", title: "관련 문서" },
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
        String closedDay
        String operatingHours
        Boolean parkingAvailable
        String priceInfo
        Boolean petFriendly
        Boolean isPetOnly
        String petSize
        String petRestrictions
        String petExtraFee
        Boolean indoor
        Boolean outdoor
        String description
        String dataSource
    }
    
    LocationServiceReview {
        Long idx PK
        Long service_idx FK
        Long user_idx FK
        Integer rating
        String comment
        LocalDateTime createdAt
        LocalDateTime updatedAt
    }`;

  const unifiedMapFlow = `flowchart LR
  subgraph FE["Frontend"]
    U[UnifiedPetMapPage]
    UM[unifiedMapApi.fetchActiveMapItems]
    LS[locationServiceApi]
    MU[meetupApi]
    CR[careRequestApi]
    MC[MapContainer]
  end
  subgraph BE["Backend APIs"]
    LAPI["/api/location-services/search"]
    MAPI["/api/meetups/nearby"]
    CAPI["/api/care-requests/nearby"]
  end
  U --> UM
  UM -->|location| LS --> LAPI
  UM -->|meetup| MU --> MAPI
  UM -->|care| CR --> CAPI
  UM --> MC`;

  return (
    <div className="domain-page-wrapper" style={{ padding: "2rem 0" }}>
      <div
        className="domain-page-container"
        style={{ display: "flex", gap: "2rem", alignItems: "flex-start" }}
      >
        <div className="domain-page-content" style={{ flex: 1 }}>
          <h1 style={{ marginBottom: "1rem", color: "var(--text-color)" }}>
            위치 서비스 도메인
          </h1>

          <section
            id="intro"
            style={{ marginBottom: "3rem", scrollMarginTop: "2rem" }}
          >
            <h2 style={{ marginBottom: "1rem", color: "var(--text-color)" }}>
              도메인 소개
            </h2>
            <div
              className="section-card"
              style={{
                padding: "1.5rem",
                backgroundColor: "var(--card-bg)",
                borderRadius: "8px",
                border: "1px solid var(--nav-border)",
              }}
            >
              <p
                style={{
                  lineHeight: "1.8",
                  color: "var(--text-secondary)",
                  marginBottom: "1rem",
                }}
              >
                위치 기반 POI(병원·카페 등) 검색·리뷰·지오코딩·공공데이터
                임포트를 담당한다.{" "}
                <strong style={{ color: "var(--text-color)" }}>
                  동작·API·분기 순서의 단일 기준
                </strong>
                은 저장소{" "}
                <a
                  href={`${GH}/docs/domains/location.md`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "var(--link-color)" }}
                >
                  <code>docs/domains/location.md</code>
                </a>{" "}
                §1.1이다. 이 페이지는 그 요약이며, 수치·사례·히스토리는 아래
                링크와 하위 페이지로 분리했다.
              </p>
              <p
                style={{
                  lineHeight: "1.8",
                  color: "var(--text-secondary)",
                  marginBottom: "1rem",
                }}
              >
                <strong style={{ color: "var(--text-color)" }}>
                  실서비스에서 초기 로드·검색 부하가 민감한 도메인
                </strong>
                이다.
              </p>
              <div
                style={{
                  padding: "1rem",
                  backgroundColor: "var(--bg-color)",
                  borderRadius: "6px",
                  border: "1px solid var(--nav-border)",
                }}
              >
                <h3
                  style={{
                    marginBottom: "0.75rem",
                    color: "var(--text-color)",
                    fontSize: "1rem",
                  }}
                >
                  핵심 성과 (요약)
                </h3>
                <ul
                  style={{
                    listStyle: "none",
                    padding: 0,
                    color: "var(--text-secondary)",
                    lineHeight: "1.8",
                    fontSize: "0.9rem",
                  }}
                >
                  <li>
                    • 초기 로드 데이터:{" "}
                    <strong style={{ color: "var(--text-color)" }}>
                      22,699개 → 1,026개
                    </strong>{" "}
                    (95.5% 감소)
                  </li>
                  <li>
                    • 프론트 처리·네트워크·메모리 개선 — 상세는{" "}
                    <Link
                      to="/domains/location/optimization"
                      style={{
                        color: "var(--link-color)",
                        textDecoration: "none",
                      }}
                    >
                      성능 최적화
                    </Link>
                  </li>
                </ul>
              </div>
              <div
                style={{
                  marginTop: "1.25rem",
                  padding: "1rem",
                  backgroundColor: "var(--bg-color)",
                  borderRadius: "6px",
                  border: "1px solid var(--nav-border)",
                }}
              >
                <h3
                  style={{
                    marginBottom: "0.75rem",
                    color: "var(--text-color)",
                    fontSize: "1rem",
                  }}
                >
                  제품 UX 원칙 (<code>location.md</code> §1)
                </h3>
                <ul
                  style={{
                    marginLeft: "1.25rem",
                    color: "var(--text-secondary)",
                    lineHeight: "1.85",
                    fontSize: "0.9rem",
                    paddingLeft: "0.5rem",
                  }}
                >
                  <li>
                    지도 이동만으로는 API를 호출하지 않고, 「이 지역 검색」 등 사용자
                    확인 후 실행
                  </li>
                  <li>
                    InitialLoadSearch(시스템 주도)와 UserTriggeredSearch(사용자
                    주도) 분리
                  </li>
                  <li>
                    결과 0건·위치 권한 거부·범위 과다 등 빈 상태 안내와 대안
                  </li>
                  <li>클러스터 제거, 개별 핀으로 장소 표시</li>
                  <li>마커와 리스트 양방향 스크롤·하이라이트 동기화</li>
                </ul>
              </div>
            </div>
          </section>

          <section
            id="architecture"
            style={{ marginBottom: "3rem", scrollMarginTop: "2rem" }}
          >
            <h2 style={{ marginBottom: "1rem", color: "var(--text-color)" }}>
              아키텍처 (프론트·백엔드)
            </h2>
            <p
              style={{
                lineHeight: "1.8",
                color: "var(--text-secondary)",
                marginBottom: "1rem",
                fontSize: "0.95rem",
              }}
            >
              사용자 기능·화면은{" "}
              <strong style={{ color: "var(--text-color)" }}>주요 기능</strong>{" "}
              절. 여기서는 경계·통합 검색·통합 지도 흐름만 정리한다.
            </p>

            <div
              className="section-card"
              style={{
                padding: "1.5rem",
                backgroundColor: "var(--card-bg)",
                borderRadius: "8px",
                border: "1px solid var(--nav-border)",
                marginBottom: "1.5rem",
              }}
            >
              <h3
                style={{
                  marginBottom: "0.75rem",
                  color: "var(--text-color)",
                  fontSize: "1rem",
                }}
              >
                문서 역할
              </h3>
              <div style={{ overflowX: "auto" }}>
                <table
                  style={{
                    width: "100%",
                    borderCollapse: "collapse",
                    fontSize: "0.85rem",
                    color: "var(--text-secondary)",
                  }}
                >
                  <thead>
                    <tr style={{ borderBottom: "1px solid var(--nav-border)" }}>
                      <th
                        style={{
                          padding: "0.4rem",
                          textAlign: "left",
                          color: "var(--text-color)",
                        }}
                      >
                        문서
                      </th>
                      <th
                        style={{
                          padding: "0.4rem",
                          textAlign: "left",
                          color: "var(--text-color)",
                        }}
                      >
                        역할
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr style={{ borderBottom: "1px solid var(--nav-border)" }}>
                      <td style={{ padding: "0.4rem", verticalAlign: "top" }}>
                        <code>docs/domains/location.md</code>
                      </td>
                      <td style={{ padding: "0.4rem" }}>
                        통합 스펙 — §1.1 분기·§4 엔티티·API·§7 성능·§8 요약·§9
                        리팩 문서 목록
                      </td>
                    </tr>
                    <tr style={{ borderBottom: "1px solid var(--nav-border)" }}>
                      <td style={{ padding: "0.4rem", verticalAlign: "top" }}>
                        위치 기반 서비스 아키텍처
                      </td>
                      <td style={{ padding: "0.4rem" }}>
                        프론트 모듈 ↔ 백엔드 엔드포인트 대조
                      </td>
                    </tr>
                    <tr>
                      <td style={{ padding: "0.4rem", verticalAlign: "top" }}>
                        현행 vs 설계안 비교
                      </td>
                      <td style={{ padding: "0.4rem" }}>
                        리팩 전후 대조 —{" "}
                        <strong style={{ color: "var(--text-color)" }}>
                          현재 동작은 §1.1·본 문서 우선
                        </strong>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div
              className="section-card"
              style={{
                padding: "1.5rem",
                backgroundColor: "var(--card-bg)",
                borderRadius: "8px",
                border: "1px solid var(--nav-border)",
                marginBottom: "1.5rem",
              }}
            >
              <h3 style={{ marginBottom: "1rem", color: "var(--text-color)" }}>
                통합 검색 <code>GET /api/location-services/search</code> (§1.1)
              </h3>
              <p
                style={{
                  color: "var(--text-secondary)",
                  lineHeight: "1.8",
                  marginBottom: "0.75rem",
                  fontSize: "0.9rem",
                }}
              >
                단일 진입점{" "}
                <code>LocationServiceService.searchLocationServices</code>.
                레거시 문서의 「키워드 최우선」 서술이 남아 있어도{" "}
                <strong style={{ color: "var(--text-color)" }}>
                  아래 순서
                </strong>
                가 맞다.
              </p>
              <ol
                style={{
                  marginLeft: "1.25rem",
                  color: "var(--text-secondary)",
                  lineHeight: "1.85",
                  fontSize: "0.9rem",
                }}
              >
                <li>
                  <strong style={{ color: "var(--text-color)" }}>
                    위도·경도 둘 다 있음
                  </strong>{" "}
                  → 반경 검색. <code>radius</code>(m) 생략·<code>null</code>·≤0
                  이면 서비스에서 <strong>10000m</strong>. 이 분기에서{" "}
                  <code>keyword</code>·<code>category</code>는 SQL{" "}
                  <code>WHERE</code>(이름 <code>LIKE</code> 등, FULLTEXT 아님).
                </li>
                <li>
                  <strong style={{ color: "var(--text-color)" }}>
                    위치 없고
                  </strong>{" "}
                  <code>sido</code>/<code>sigungu</code>/
                  <code>eupmyeondong</code>/<code>roadName</code> 중 하나라도
                  있음 → 지역 계층 검색. <code>keyword</code>·
                  <code>category</code>도 SQL.
                </li>
                <li>
                  <strong style={{ color: "var(--text-color)" }}>
                    위치·지역 모두 없고 <code>keyword</code>만
                  </strong>{" "}
                  → FULLTEXT 전국 검색.
                </li>
                <li>
                  <strong style={{ color: "var(--text-color)" }}>
                    조건 없음
                  </strong>{" "}
                  → 전체 평점순.
                </li>
              </ol>
              <p
                style={{
                  color: "var(--text-secondary)",
                  lineHeight: "1.8",
                  marginTop: "0.75rem",
                  fontSize: "0.9rem",
                }}
              >
                <strong style={{ color: "var(--text-color)" }}>정규화</strong>:{" "}
                <code>keyword</code>, <code>category</code>, 지역 문자열은 빈
                값·공백 → <code>null</code>.{" "}
                <strong style={{ color: "var(--text-color)" }}>
                  <code>size</code>
                </strong>
                : 컨트롤러에서 <code>null</code> → 100, ≤0 → 상한 없음(서비스에{" "}
                <code>null</code>).
              </p>
            </div>

            <div
              className="section-card"
              style={{
                padding: "1.5rem",
                backgroundColor: "var(--card-bg)",
                borderRadius: "8px",
                border: "1px solid var(--nav-border)",
                marginBottom: "1.5rem",
              }}
            >
              <h3 style={{ marginBottom: "1rem", color: "var(--text-color)" }}>
                범위
              </h3>
              <div style={{ overflowX: "auto" }}>
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
                      <th
                        style={{
                          padding: "0.5rem",
                          textAlign: "left",
                          color: "var(--text-color)",
                        }}
                      >
                        구분
                      </th>
                      <th
                        style={{
                          padding: "0.5rem",
                          textAlign: "left",
                          color: "var(--text-color)",
                        }}
                      >
                        설명
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr style={{ borderBottom: "1px solid var(--nav-border)" }}>
                      <td style={{ padding: "0.5rem" }}>Location</td>
                      <td style={{ padding: "0.5rem" }}>
                        POI 통합 검색, 카테고리·키워드, 주변 AI 추천{" "}
                        <code>GET /api/location-services/recommend</code>
                        (Petory DB 후보 +{" "}
                        <code>LocationRecommendAgentService</code> /
                        Ollama). Pet Data API 프록시 추천은 별도{" "}
                        <Link
                          to="/domains/recommendation"
                          style={{ color: "var(--link-color)" }}
                        >
                          Recommendation 도메인
                        </Link>{" "}
                        (<code>GET /api/recommend</code>).
                      </td>
                    </tr>
                    <tr style={{ borderBottom: "1px solid var(--nav-border)" }}>
                      <td style={{ padding: "0.5rem" }}>Geocoding</td>
                      <td style={{ padding: "0.5rem" }}>
                        주소↔좌표, 길찾기 (<code>NaverMapService</code>)
                      </td>
                    </tr>
                    <tr style={{ borderBottom: "1px solid var(--nav-border)" }}>
                      <td style={{ padding: "0.5rem" }}>Review</td>
                      <td style={{ padding: "0.5rem" }}>
                        리뷰 CRUD, 시설 <code>rating</code> 집계
                      </td>
                    </tr>
                    <tr>
                      <td style={{ padding: "0.5rem" }}>통합 탐색</td>
                      <td style={{ padding: "0.5rem" }}>
                        <code>UnifiedPetMapPage</code> — 탭별 REST 조합(BFF
                        없음)
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div
              className="section-card"
              style={{
                padding: "1.5rem",
                backgroundColor: "var(--card-bg)",
                borderRadius: "8px",
                border: "1px solid var(--nav-border)",
                marginBottom: "1.5rem",
              }}
            >
              <h3 style={{ marginBottom: "1rem", color: "var(--text-color)" }}>
                통합 탐색 지도
              </h3>
              <p
                style={{
                  color: "var(--text-secondary)",
                  lineHeight: "1.8",
                  marginBottom: "1rem",
                  fontSize: "0.9rem",
                }}
              >
                활성 탭만 API 호출. 위치 탭은 <code>searchPlaces</code> →{" "}
                <code>/search</code>(반경 m, UI는 km×1000).
              </p>
              <MermaidDiagram chart={unifiedMapFlow} />
              <p
                style={{
                  color: "var(--text-secondary)",
                  lineHeight: "1.75",
                  marginTop: "1rem",
                  fontSize: "0.88rem",
                }}
              >
                <strong style={{ color: "var(--text-color)" }}>
                  §8.9 (통합 지도 현행)
                </strong>
                : <code>UnifiedPetMapPage</code>는 중심·반경·키워드·카테고리
                변경 시 재조회, 지도 idle 시 중심 변경에도 디바운스 후 호출 등 —
                과거 주변서비스 전용 화면의「이동해도 API 안 함」원칙과는 다르게
                동작할 수 있다. 상세는 <code>location.md</code> §8.3 vs §8.9.
              </p>
            </div>

            <div
              className="section-card"
              style={{
                padding: "1.5rem",
                backgroundColor: "var(--card-bg)",
                borderRadius: "8px",
                border: "1px solid var(--nav-border)",
              }}
            >
              <h3 style={{ marginBottom: "1rem", color: "var(--text-color)" }}>
                운영·보안 (요약)
              </h3>
              <ul
                style={{
                  listStyle: "none",
                  padding: 0,
                  color: "var(--text-secondary)",
                  lineHeight: "1.8",
                  fontSize: "0.9rem",
                }}
              >
                <li>
                  • <code>size</code> 무제한 시 대량 응답 가능 — 클라이언트 상한
                  검토
                </li>
                <li>• 외부 지도 API 키는 서버에만</li>
              </ul>
            </div>
          </section>

          <section
            id="features"
            style={{ marginBottom: "3rem", scrollMarginTop: "2rem" }}
          >
            <h2 style={{ marginBottom: "1rem", color: "var(--text-color)" }}>
              주요 기능
            </h2>
            <p
              style={{
                lineHeight: "1.8",
                color: "var(--text-secondary)",
                marginBottom: "1rem",
                fontSize: "0.95rem",
              }}
            >
              §2 요약. 검색 분기·파라미터는 위{" "}
              <strong style={{ color: "var(--text-color)" }}>아키텍처</strong>{" "}
              §1.1과 동일하다.
            </p>

            <div
              className="section-card"
              style={{
                padding: "1.5rem",
                backgroundColor: "var(--card-bg)",
                borderRadius: "8px",
                border: "1px solid var(--nav-border)",
                marginBottom: "1.5rem",
              }}
            >
              <h3 style={{ marginBottom: "1rem", color: "var(--text-color)" }}>
                지역 계층 (§2.1)
              </h3>
              <p
                style={{
                  color: "var(--text-secondary)",
                  lineHeight: "1.8",
                  fontSize: "0.9rem",
                }}
              >
                시도 → 시군구 → 목록. 쿼리 우선순위: <code>roadName</code> &gt;{" "}
                <code>eupmyeondong</code> &gt; <code>sigungu</code> &gt;{" "}
                <code>sido</code> &gt; 전체.
              </p>
            </div>

            <div
              className="section-card"
              style={{
                padding: "1.5rem",
                backgroundColor: "var(--card-bg)",
                borderRadius: "8px",
                border: "1px solid var(--nav-border)",
                marginBottom: "1.5rem",
              }}
            >
              <h3 style={{ marginBottom: "1rem", color: "var(--text-color)" }}>
                반경 검색 (§2.2)
              </h3>
              <ul
                style={{
                  marginLeft: "1.25rem",
                  color: "var(--text-secondary)",
                  lineHeight: "1.85",
                  fontSize: "0.9rem",
                }}
              >
                <li>
                  <code>ST_Within</code>(근사 박스) +{" "}
                  <code>ST_Distance_Sphere</code>, DTO에 거리(m)
                </li>
                <li>
                  초기 진입·주변 컨텍스트용으로 쓰는 편이며, 지도만 계속 움직일
                  때는 시군구 전략과 병행하는 설명은 §2.3·§8.3 참고
                </li>
              </ul>
            </div>

            <div
              className="section-card"
              style={{
                padding: "1.5rem",
                backgroundColor: "var(--card-bg)",
                borderRadius: "8px",
                border: "1px solid var(--nav-border)",
                marginBottom: "1.5rem",
              }}
            >
              <h3 style={{ marginBottom: "1rem", color: "var(--text-color)" }}>
                하이브리드·지역 UX (§2.3 / §8.3)
              </h3>
              <p
                style={{
                  color: "var(--text-secondary)",
                  lineHeight: "1.8",
                  fontSize: "0.9rem",
                }}
              >
                「시군구 단위 로드 + 읍면동 클라이언트 필터」·2026-02 지역 선택
                시 재요청 등은{" "}
                <strong style={{ color: "var(--text-color)" }}>
                  제품/과거 전용 화면
                </strong>{" "}
                맥락에서 기술한다. 통합 지도의 실제 재조회·디바운스는 §8.9.
              </p>
            </div>

            <div
              className="section-card"
              style={{
                padding: "1.5rem",
                backgroundColor: "var(--card-bg)",
                borderRadius: "8px",
                border: "1px solid var(--nav-border)",
                marginBottom: "1.5rem",
              }}
            >
              <h3 style={{ marginBottom: "1rem", color: "var(--text-color)" }}>
                카테고리·키워드 (§2.4)
              </h3>
              <p
                style={{
                  color: "var(--text-secondary)",
                  lineHeight: "1.8",
                  fontSize: "0.9rem",
                }}
              >
                카테고리는 SQL <code>WHERE</code>. 위치·지역 경로의 키워드는
                이름 <code>LIKE</code>; 위치·지역 없이 키워드만 있을 때
                FULLTEXT(<code>ft_search</code>).
              </p>
            </div>

            <div
              className="section-card"
              style={{
                padding: "1.5rem",
                backgroundColor: "var(--card-bg)",
                borderRadius: "8px",
                border: "1px solid var(--nav-border)",
                marginBottom: "1.5rem",
              }}
            >
              <h3 style={{ marginBottom: "1rem", color: "var(--text-color)" }}>
                거리·길찾기 (§2.5)
              </h3>
              <p
                style={{
                  color: "var(--text-secondary)",
                  lineHeight: "1.8",
                  fontSize: "0.9rem",
                }}
              >
                표시 거리는 백엔드 DTO 우선(Haversine). 길찾기는 네이버
                Directions(경도,위도 순서 등은 API 절).
              </p>
            </div>

            <div
              className="section-card"
              style={{
                padding: "1.5rem",
                backgroundColor: "var(--card-bg)",
                borderRadius: "8px",
                border: "1px solid var(--nav-border)",
              }}
            >
              <h3 style={{ marginBottom: "1rem", color: "var(--text-color)" }}>
                리뷰 (§2.6)
              </h3>
              <p
                style={{
                  color: "var(--text-secondary)",
                  lineHeight: "1.8",
                  fontSize: "0.9rem",
                }}
              >
                1인 1리뷰, 이메일 인증, 평점 집계, Soft Delete — 세부는
                Entity·보안 절.
              </p>
            </div>
          </section>

          <section
            id="performance-context"
            style={{ marginBottom: "3rem", scrollMarginTop: "2rem" }}
          >
            <h2 style={{ marginBottom: "1rem", color: "var(--text-color)" }}>
              성능·리팩토링·DB (맥락)
            </h2>
            <p
              style={{
                lineHeight: "1.8",
                color: "var(--text-secondary)",
                marginBottom: "1rem",
                fontSize: "0.95rem",
              }}
            >
              이 절은{" "}
              <strong style={{ color: "var(--text-color)" }}>
                중복을 피하기 위해
              </strong>{" "}
              한 곳에만 둔다. 자세한 수치·재현·전후 비교는 하위 페이지,
              인덱스·캐시·로깅 상세는 <code>location.md</code> §7을 본다.
            </p>
            <div
              className="section-card"
              style={{
                padding: "1.5rem",
                backgroundColor: "var(--card-bg)",
                borderRadius: "8px",
                border: "1px solid var(--nav-border)",
                marginBottom: "1rem",
              }}
            >
              <h3
                style={{
                  marginBottom: "0.75rem",
                  color: "var(--text-color)",
                  fontSize: "1rem",
                }}
              >
                초기 로드·성능
              </h3>
              <p
                style={{
                  color: "var(--text-secondary)",
                  lineHeight: "1.8",
                  fontSize: "0.9rem",
                  marginBottom: "0.75rem",
                }}
              >
                과거 전체 조회·프론트 필터 부담을 반경·지역 전략 등으로 줄인
                사례 — 핵심 성과 숫자는 도입 절과{" "}
                <Link
                  to="/domains/location/optimization"
                  style={{
                    color: "var(--link-color)",
                    textDecoration: "none",
                    fontWeight: 600,
                  }}
                >
                  성능 최적화 페이지
                </Link>
                .
              </p>
            </div>
            <div
              className="section-card"
              style={{
                padding: "1.5rem",
                backgroundColor: "var(--card-bg)",
                borderRadius: "8px",
                border: "1px solid var(--nav-border)",
                marginBottom: "1rem",
              }}
            >
              <h3
                style={{
                  marginBottom: "0.75rem",
                  color: "var(--text-color)",
                  fontSize: "1rem",
                }}
              >
                리팩토링·히스토리
              </h3>
              <p
                style={{
                  color: "var(--text-secondary)",
                  lineHeight: "1.8",
                  fontSize: "0.9rem",
                  marginBottom: "0.75rem",
                }}
              >
                백엔드 분기·정규화·프론트 구조 개선 등 — 스토리형 서술은{" "}
                <Link
                  to="/domains/location/refactoring"
                  style={{
                    color: "var(--link-color)",
                    textDecoration: "none",
                    fontWeight: 600,
                  }}
                >
                  리팩토링 페이지
                </Link>{" "}
                및{" "}
                <a
                  href={`${GH}/docs/domains/location.md`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "var(--link-color)" }}
                >
                  <code>location.md</code> §9
                </a>
                .
              </p>
            </div>
            <div
              className="section-card"
              style={{
                padding: "1.5rem",
                backgroundColor: "var(--card-bg)",
                borderRadius: "8px",
                border: "1px solid var(--nav-border)",
              }}
            >
              <h3
                style={{
                  marginBottom: "0.75rem",
                  color: "var(--text-color)",
                  fontSize: "1rem",
                }}
              >
                DB·인덱스
              </h3>
              <p
                style={{
                  color: "var(--text-secondary)",
                  lineHeight: "1.8",
                  fontSize: "0.9rem",
                }}
              >
                <code>ft_search</code>, 지역·좌표 인덱스, 리뷰 FK 등 — 전체 표는{" "}
                <code>location.md</code> §7.1.
              </p>
            </div>
            <div
              className="section-card"
              style={{
                marginTop: "1rem",
                padding: "1.25rem",
                backgroundColor: "var(--card-bg)",
                borderRadius: "8px",
                border: "1px solid var(--nav-border)",
              }}
            >
              <h3
                style={{
                  marginBottom: "0.65rem",
                  color: "var(--text-color)",
                  fontSize: "1rem",
                }}
              >
                추천 API 로드맵 (<code>location.md</code> §4.4 /{" "}
                <Link
                  to="/domains/recommendation"
                  style={{ color: "var(--link-color)" }}
                >
                  recommendation.md §1.4
                </Link>
                )
              </h3>
              <p
                style={{
                  color: "var(--text-secondary)",
                  lineHeight: "1.8",
                  fontSize: "0.9rem",
                  margin: 0,
                }}
              >
                사용자 관점에서 주변 시설 추천은{" "}
                <code>/api/location-services/recommend</code>와{" "}
                <code>/api/recommend</code>(Pet Data API BFF)가 같은 목적 영역에서
                겹친다. Pet Data API가 기대 동작으로 안정 검증된 뒤 Location 쪽
                엔드포인트·에이전트·통합 지도 AI 모드를 한쪽 계약으로 합치고
                제거할 예정이며, 당분간 두 경로를 모두 유지한다.
              </p>
            </div>
          </section>

          <section
            id="entities"
            style={{ marginBottom: "3rem", scrollMarginTop: "2rem" }}
          >
            <h2 style={{ marginBottom: "1rem", color: "var(--text-color)" }}>
              Entity 구조
            </h2>
            <div
              className="section-card"
              style={{
                padding: "1.5rem",
                backgroundColor: "var(--card-bg)",
                borderRadius: "8px",
                border: "1px solid var(--nav-border)",
                marginBottom: "1.5rem",
              }}
            >
              <MermaidDiagram chart={entityDiagram} />
            </div>
            <div
              className="section-card"
              style={{
                padding: "1.5rem",
                backgroundColor: "var(--card-bg)",
                borderRadius: "8px",
                border: "1px solid var(--nav-border)",
                marginBottom: "1rem",
              }}
            >
              <h3 style={{ marginBottom: "1rem", color: "var(--text-color)" }}>
                LocationService
              </h3>
              <div
                style={{
                  color: "var(--text-secondary)",
                  lineHeight: "1.8",
                  fontSize: "0.88rem",
                }}
              >
                <p style={{ marginBottom: "0.5rem" }}>
                  카테고리·지역 계층·<code>latitude</code>/
                  <code>longitude</code>·<code>rating</code>·반려·운영·Soft
                  Delete·<code>dataSource</code> 등 — 필드 표는{" "}
                  <code>location.md</code> §4.1.
                </p>
                <p style={{ marginBottom: 0 }}>
                  <strong style={{ color: "var(--text-color)" }}>DB</strong>:
                  반경용 <code>POINT</code>(SRID 4326) 컬럼은 네이티브 쿼리용,
                  JPA에는 위도·경도 필드만 매핑.
                </p>
              </div>
            </div>
            <div
              className="section-card"
              style={{
                padding: "1.5rem",
                backgroundColor: "var(--card-bg)",
                borderRadius: "8px",
                border: "1px solid var(--nav-border)",
              }}
            >
              <h3 style={{ marginBottom: "1rem", color: "var(--text-color)" }}>
                LocationServiceReview
              </h3>
              <p
                style={{
                  color: "var(--text-secondary)",
                  lineHeight: "1.8",
                  fontSize: "0.88rem",
                  marginBottom: 0,
                }}
              >
                <code>BaseTimeEntity</code>, Soft Delete, 서비스·유저 연관 —
                §4.1.
              </p>
            </div>
          </section>

          <section
            id="security"
            style={{ marginBottom: "3rem", scrollMarginTop: "2rem" }}
          >
            <h2 style={{ marginBottom: "1rem", color: "var(--text-color)" }}>
              보안 및 권한 체계
            </h2>
            <div
              className="section-card"
              style={{
                padding: "1.5rem",
                backgroundColor: "var(--card-bg)",
                borderRadius: "8px",
                border: "1px solid var(--nav-border)",
              }}
            >
              <ul
                style={{
                  listStyle: "none",
                  padding: 0,
                  color: "var(--text-secondary)",
                  lineHeight: "1.8",
                  fontSize: "0.9rem",
                }}
              >
                <li>• 리뷰: 인증·이메일 인증·중복 방지·트랜잭션 평점 갱신</li>
                <li>• Soft Delete 시 조회·평점에서 제외</li>
              </ul>
            </div>
          </section>

          <section
            id="relationships"
            style={{ marginBottom: "3rem", scrollMarginTop: "2rem" }}
          >
            <h2 style={{ marginBottom: "1rem", color: "var(--text-color)" }}>
              다른 도메인과의 연관관계
            </h2>
            <div
              className="section-card"
              style={{
                padding: "1.5rem",
                backgroundColor: "var(--card-bg)",
                borderRadius: "8px",
                border: "1px solid var(--nav-border)",
              }}
            >
              <div
                style={{
                  color: "var(--text-secondary)",
                  lineHeight: "1.8",
                  fontSize: "0.9rem",
                }}
              >
                <div style={{ marginBottom: "0.5rem" }}>
                  <strong style={{ color: "var(--text-color)" }}>User</strong> —
                  리뷰 작성
                </div>
                <div style={{ marginBottom: "0.5rem" }}>
                  <strong style={{ color: "var(--text-color)" }}>
                    File / Report / Statistics
                  </strong>{" "}
                  — 시설 이미지·신고·집계
                </div>
                <div style={{ marginBottom: "0.5rem" }}>
                  <strong style={{ color: "var(--text-color)" }}>
                    Meetup / Care
                  </strong>{" "}
                  — 통합 지도 탭만 공유, 별도 API·엔티티
                </div>
                <div>
                  <strong style={{ color: "var(--text-color)" }}>
                    Recommendation
                  </strong>{" "}
                  —{" "}
                  <Link
                    to="/domains/recommendation"
                    style={{ color: "var(--link-color)" }}
                  >
                    <code>GET /api/recommend</code>
                  </Link>
                  는 외부 Pet Data API 프록시; Location의{" "}
                  <code>/location-services/recommend</code>와 목적이 겹치며
                  로드맵상 통합 검토 중(
                  <code>recommendation.md</code> §1.4).
                </div>
              </div>
            </div>
          </section>

          <section
            id="api"
            style={{ marginBottom: "3rem", scrollMarginTop: "2rem" }}
          >
            <h2 style={{ marginBottom: "1rem", color: "var(--text-color)" }}>
              API 엔드포인트
            </h2>
            <p
              style={{
                color: "var(--text-secondary)",
                lineHeight: "1.8",
                marginBottom: "1rem",
                fontSize: "0.9rem",
              }}
            >
              전체 표·예시 HTTP는 <code>location.md</code> §4.4.
            </p>
            <div
              className="section-card"
              style={{
                padding: "1.5rem",
                backgroundColor: "var(--card-bg)",
                borderRadius: "8px",
                border: "1px solid var(--nav-border)",
                marginBottom: "1rem",
              }}
            >
              <h3
                style={{
                  marginBottom: "0.75rem",
                  color: "var(--text-color)",
                  fontSize: "1rem",
                }}
              >
                <code>/api/location-services</code>
              </h3>
              <div
                style={{
                  color: "var(--text-secondary)",
                  lineHeight: "1.75",
                  fontSize: "0.88rem",
                  fontFamily: "monospace",
                }}
              >
                <div>GET /search — 분기 §1.1</div>
                <div>GET /popular — 인기, LIMIT 10, 캐시</div>
                <div>
                  GET /recommend — <code>/api/**</code> 인증. 검색 분기는
                  /search와 동일, 후보 최대 30건 → LLM으로 최대 10건+이유(
                  <code>LocationRecommendAgentService</code>, Spring AI / Ollama).
                  실패 시 원본 상위 유지. Pet Data 연동 추천은{" "}
                  <Link
                    to="/domains/recommendation"
                    style={{ color: "var(--link-color)" }}
                  >
                    Recommendation
                  </Link>
                  .
                </div>
                <div>DELETE /{"{serviceIdx}"} — Soft Delete</div>
              </div>
            </div>
            <div
              className="section-card"
              style={{
                padding: "1.5rem",
                backgroundColor: "var(--card-bg)",
                borderRadius: "8px",
                border: "1px solid var(--nav-border)",
                marginBottom: "1rem",
              }}
            >
              <h3
                style={{
                  marginBottom: "0.75rem",
                  color: "var(--text-color)",
                  fontSize: "1rem",
                }}
              >
                <code>/api/admin/location-services</code>
              </h3>
              <p
                style={{
                  color: "var(--text-secondary)",
                  fontSize: "0.88rem",
                  margin: 0,
                }}
              >
                목록·임포트·초기 로드 — 권한·<code>q</code> 처리는 §4.4.
              </p>
            </div>
            <div
              className="section-card"
              style={{
                padding: "1.5rem",
                backgroundColor: "var(--card-bg)",
                borderRadius: "8px",
                border: "1px solid var(--nav-border)",
                marginBottom: "1rem",
              }}
            >
              <h3
                style={{
                  marginBottom: "0.75rem",
                  color: "var(--text-color)",
                  fontSize: "1rem",
                }}
              >
                <code>/api/location-service-reviews</code>
              </h3>
              <p
                style={{
                  color: "var(--text-secondary)",
                  fontSize: "0.88rem",
                  margin: 0,
                }}
              >
                CRUD·서비스별/사용자별 목록 — 인증·§4.4.
              </p>
            </div>
            <div
              className="section-card"
              style={{
                padding: "1.5rem",
                backgroundColor: "var(--card-bg)",
                borderRadius: "8px",
                border: "1px solid var(--nav-border)",
              }}
            >
              <h3
                style={{
                  marginBottom: "0.75rem",
                  color: "var(--text-color)",
                  fontSize: "1rem",
                }}
              >
                <code>/api/geocoding</code>
              </h3>
              <p
                style={{
                  color: "var(--text-secondary)",
                  fontSize: "0.88rem",
                  margin: 0,
                }}
              >
                address / coordinates / directions
              </p>
            </div>
          </section>

          <section
            id="docs"
            style={{ marginBottom: "3rem", scrollMarginTop: "2rem" }}
          >
            <h2 style={{ marginBottom: "1rem", color: "var(--text-color)" }}>
              관련 문서
            </h2>
            <div
              className="section-card"
              style={{
                padding: "1.25rem",
                backgroundColor: "var(--card-bg)",
                borderRadius: "8px",
                border: "1px solid var(--nav-border)",
              }}
            >
              <p
                style={{
                  color: "var(--text-secondary)",
                  lineHeight: "1.8",
                  marginBottom: "1rem",
                  fontSize: "0.9rem",
                }}
              >
                <strong style={{ color: "var(--text-color)" }}>
                  §9 (리팩토링 문서 역할)
                </strong>{" "}
                — 현재 동작·분기는 §1.1·본문 우선. 아래는 설계안·대조·이슈
                트래킹용.
              </p>
              <ul
                style={{
                  listStyle: "none",
                  padding: 0,
                  margin: 0,
                  color: "var(--text-secondary)",
                  lineHeight: "1.9",
                  fontSize: "0.9rem",
                }}
              >
                <li style={{ marginBottom: "0.5rem" }}>
                  <a
                    href={`${GH}/docs/domains/location.md`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      color: "var(--link-color)",
                      fontWeight: 600,
                      textDecoration: "none",
                    }}
                  >
                    docs/domains/location.md
                  </a>{" "}
                  — 통합 스펙
                </li>
                <li style={{ marginBottom: "0.5rem" }}>
                  <Link
                    to="/domains/recommendation"
                    style={{
                      color: "var(--link-color)",
                      fontWeight: 600,
                      textDecoration: "none",
                    }}
                  >
                    Recommendation 도메인 페이지
                  </Link>{" "}
                  —{" "}
                  <a
                    href={`${GH}/docs/domains/recommendation.md`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: "var(--link-color)", textDecoration: "none" }}
                  >
                    recommendation.md
                  </a>
                </li>
                <li style={{ marginBottom: "0.5rem" }}>
                  <a
                    href={`${GH}/docs/architecture/%EC%9C%84%EC%B9%98%20%EA%B8%B0%EB%B0%98%20%EC%84%9C%EB%B9%84%EC%8A%A4%20%EC%95%84%ED%82%A4%ED%85%8D%EC%B2%98.md`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      color: "var(--link-color)",
                      textDecoration: "none",
                    }}
                  >
                    위치 기반 서비스 아키텍처
                  </a>
                </li>
                <li style={{ marginBottom: "0.5rem" }}>
                  <a
                    href={`${GH}/docs/refactoring/location/%EC%A3%BC%EB%B3%80%EC%84%9C%EB%B9%84%EC%8A%A4-%EC%95%8C%EA%B3%A0%EB%A6%AC%EC%A6%98-%EC%84%A4%EA%B3%84%EC%95%88.md`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      color: "var(--link-color)",
                      textDecoration: "none",
                    }}
                  >
                    주변서비스 알고리즘 설계안
                  </a>
                </li>
                <li style={{ marginBottom: "0.5rem" }}>
                  <a
                    href={`${GH}/docs/refactoring/location/%EC%A3%BC%EB%B3%80%EC%84%9C%EB%B9%84%EC%8A%A4-%ED%98%84%ED%96%89vs%EC%84%A4%EA%B3%84%EC%95%88-%EB%B9%84%EA%B5%90.md`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      color: "var(--link-color)",
                      textDecoration: "none",
                    }}
                  >
                    주변서비스 현행 vs 설계안 비교
                  </a>
                </li>
                <li style={{ marginBottom: "0.5rem" }}>
                  <a
                    href={`${GH}/docs/refactoring/location/location-domain-potential-issues-refactoring.md`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      color: "var(--link-color)",
                      textDecoration: "none",
                    }}
                  >
                    location-domain-potential-issues
                  </a>
                </li>
                <li>
                  <a
                    href={`${GH}/docs/refactoring/location/location-portfolio-pages-source-map.md`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      color: "var(--link-color)",
                      textDecoration: "none",
                    }}
                  >
                    포트폴리오 페이지 ↔ 문서 매핑
                  </a>
                </li>
              </ul>
            </div>
          </section>
        </div>
        <TableOfContents sections={sections} />
      </div>
    </div>
  );
}

export default LocationDomain;
