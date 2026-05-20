import { Link } from 'react-router-dom';
import MermaidDiagram from '../components/Common/MermaidDiagram';
import TableOfContents from '../components/Common/TableOfContents';

function Card({ children, style }) {
  return (
    <div
      className="section-card"
      style={{
        padding: '1.5rem',
        backgroundColor: 'var(--card-bg)',
        borderRadius: '8px',
        border: '1px solid var(--nav-border)',
        ...style,
      }}
    >
      {children}
    </div>
  );
}

const PET_DATA_API_GITHUB = 'https://github.com/makkong1/pet-data-api';
const PETORY_RECOMMEND_CLIENT =
  'https://github.com/makkong1/Petory/blob/main/backend/main/java/com/linkup/Petory/domain/recommendation/client/PetDataApiClient.java';

function PetDataApiPage() {
  const sections = [
    { id: 'pillars', title: '핵심 기능' },
    { id: 'why', title: '왜 분리했는가' },
    { id: 'data', title: '어떤 데이터를' },
    { id: 'architecture', title: '아키텍처 흐름' },
    { id: 'tech', title: '기술 판단' },
    { id: 'integration', title: 'Petory 연동' },
    { id: 'scope', title: '현재 범위' },
    { id: 'learned', title: '얻은 점' },
  ];

  const corePillars = [
    '공공데이터 수집 파이프라인',
    '네이버 블로그 트렌드 집계',
    'LLM 추천 문구 생성',
    'Petory BFF 연동',
    '지오코딩 보강',
    'Redis 트렌드 캐시',
  ];

  const pipelineDiagram = `flowchart TD
    OPEN["행안부 공공 API\\n반려동물 시설 데이터"] -->|수집| COL1["수집기\\nFastAPI background task"]
    COL1 -->|좌표 없는 시설 지오코딩| POSTGRES[(PostgreSQL\\n시설 테이블)]

    NAVER["네이버 블로그 API\\n카테고리별 포스트"] -->|수집| COL2["수집기 + 형태소 분석"]
    COL2 -->|키워드 빈도 적재| REDIS[(Redis\\nSorted Set)]

    subgraph Serving["API 서빙"]
        API["POST /recommend"]
        API --> Q1["시설 조회\\nHaversine 반경 검색"]
        API --> Q2["트렌드 조회\\nSorted Set top-k"]
        Q1 & Q2 --> GUARD{"주변 시설\\n있음?"}
        GUARD -->|없음| SKIP["LLM 생략\\n빈 추천 반환"]
        GUARD -->|있음| LLM["Ollama\\n추천 문구 생성"]
        LLM --> RESP["추천 JSON 응답"]
    end

    POSTGRES --> Q1
    REDIS --> Q2
    PETORY["Petory Backend\\nRecommendService"] -->|"위치 · 펫 정보 · context"| API
    RESP --> PETORY`;

  const integrationDiagram = `sequenceDiagram
    participant FE as Petory Frontend
    participant BE as Petory Backend
    participant PDA as pet-data-api

    FE->>BE: GET /api/recommend (lat, lng, context)
    BE->>BE: JWT에서 userId 확보, 첫 번째 펫 조회
    BE->>PDA: POST /recommend (위치·펫·context 조립)
    PDA->>PDA: 시설 조회 + 트렌드 + LLM
    PDA-->>BE: 추천 JSON (시설 후보, 트렌드, 문구)
    BE-->>FE: 추천 응답 전달`;

  const li = (text) => <li style={{ marginBottom: '0.35rem' }}>• {text}</li>;

  return (
    <div className="domain-page-wrapper" style={{ padding: '2rem 0' }}>
      <div
        className="domain-page-container"
        style={{ display: 'flex', gap: '2rem', alignItems: 'flex-start' }}
      >
        <div className="domain-page-content" style={{ flex: 1 }}>
          <h1 style={{ marginBottom: '0.5rem', color: 'var(--text-color)' }}>
            pet-data-api
          </h1>
          <p
            style={{
              color: 'var(--text-muted)',
              fontSize: '0.86rem',
              marginBottom: '0.6rem',
            }}
          >
            <Link
              to="/portfolio/petory"
              style={{ color: 'var(--link-color)', textDecoration: 'none' }}
            >
              Petory
            </Link>
            {' › '}
            <Link
              to="/domains/recommendation"
              style={{ color: 'var(--link-color)', textDecoration: 'none' }}
            >
              Recommendation
            </Link>
            {' › '}데이터·추천 파이프 요약 페이지
          </p>
          <p
            style={{
              color: 'var(--text-secondary)',
              lineHeight: '1.8',
              marginBottom: '0.85rem',
              fontSize: '0.95rem',
            }}
          >
            Petory의 위치·콘텐츠 데이터를 보강하기 위해 분리한 Python 기반
            수집·추천 서버입니다. Java 서비스 서버와 Python 데이터 파이프라인을
            같은 리포에서 관리하기 어렵다는 현실적인 이유로 분리했고, 수집
            실패나 외부 API 지연이 Petory 응답에 영향을 주지 않는 구조를
            목표로 했습니다. 현재는 공공데이터 수집·조회·추천 파이프라인의
            가능성을 검증한 단계입니다.
          </p>

          {/* 핵심 기능 */}
          <section
            id="pillars"
            style={{ marginBottom: '2rem', scrollMarginTop: '2rem' }}
          >
            <h2
              style={{
                marginBottom: '0.75rem',
                color: 'var(--text-color)',
                fontSize: '1.1rem',
              }}
            >
              핵심 기능
            </h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {corePillars.map((label) => (
                <span
                  key={label}
                  style={{
                    padding: '0.35rem 0.75rem',
                    borderRadius: '999px',
                    fontSize: '0.82rem',
                    fontWeight: 600,
                    color: 'var(--text-color)',
                    backgroundColor: 'var(--bg-color)',
                    border: '1px solid var(--nav-border)',
                  }}
                >
                  {label}
                </span>
              ))}
            </div>
          </section>

          {/* 왜 분리했는가 */}
          <section
            id="why"
            style={{ marginBottom: '3rem', scrollMarginTop: '2rem' }}
          >
            <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>
              왜 분리했는가
            </h2>
            <div
              style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}
            >
              {[
                {
                  title: '언어 분리',
                  desc:
                    'Java Spring Boot 서버에 Python 코드를 함께 두면 빌드·의존성·IDE 설정이 복잡해집니다. 언어별로 리포를 나눠 각자의 생태계에서 관리하는 방향을 선택했습니다.',
                },
                {
                  title: '수집 파이프라인 격리',
                  desc:
                    '배치 수집 작업이 실패하거나 외부 API(공공데이터, 네이버)가 느려져도 Petory 서비스 응답에 영향이 없어야 합니다. 수집 책임을 별도 서버로 격리했습니다.',
                },
                {
                  title: '저장소 분리',
                  desc:
                    '수집 데이터는 PostgreSQL에 적재하고 Petory MySQL과 분리합니다. 데이터 정제 후 읽기 API에서만 활용해 서비스 DB에 직접 쓰는 부담을 없앴습니다.',
                },
              ].map((item) => (
                <Card key={item.title}>
                  <p
                    style={{
                      fontWeight: 600,
                      color: 'var(--text-color)',
                      marginBottom: '0.5rem',
                      margin: '0 0 0.5rem',
                    }}
                  >
                    {item.title}
                  </p>
                  <p
                    style={{
                      color: 'var(--text-secondary)',
                      lineHeight: '1.7',
                      margin: 0,
                      fontSize: '0.9rem',
                    }}
                  >
                    {item.desc}
                  </p>
                </Card>
              ))}
            </div>
          </section>

          {/* 어떤 데이터를 묶었는가 */}
          <section
            id="data"
            style={{ marginBottom: '3rem', scrollMarginTop: '2rem' }}
          >
            <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>
              어떤 데이터를 묶었는가
            </h2>
            <Card>
              <table
                style={{
                  width: '100%',
                  borderCollapse: 'collapse',
                  fontSize: '0.9rem',
                  color: 'var(--text-secondary)',
                }}
              >
                <thead>
                  <tr style={{ borderBottom: '1px solid var(--nav-border)' }}>
                    {['데이터 원천', '처리 방식', '역할'].map((h) => (
                      <th
                        key={h}
                        style={{
                          padding: '0.55rem 0.75rem',
                          textAlign: 'left',
                          color: 'var(--text-color)',
                        }}
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    [
                      '행안부 공공 API',
                      '수집 → 지오코딩 → PostgreSQL 적재',
                      '전국 반려동물 관련 시설 정보',
                    ],
                    [
                      '네이버 블로그 API',
                      '수집 → 형태소 분석 → Redis Sorted Set',
                      '카테고리별 트렌드 키워드 집계',
                    ],
                    [
                      'Ollama (로컬 LLM)',
                      '시설 후보 + 트렌드 + 위치 조합 → 문구 생성',
                      '사용자 맞춤 추천 문구',
                    ],
                  ].map(([src, proc, role]) => (
                    <tr
                      key={src}
                      style={{ borderBottom: '1px solid var(--nav-border)' }}
                    >
                      <td style={{ padding: '0.55rem 0.75rem', fontWeight: 500, color: 'var(--text-color)' }}>
                        {src}
                      </td>
                      <td style={{ padding: '0.55rem 0.75rem' }}>{proc}</td>
                      <td style={{ padding: '0.55rem 0.75rem' }}>{role}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Card>
          </section>

          {/* 아키텍처 흐름 */}
          <section
            id="architecture"
            style={{ marginBottom: '3rem', scrollMarginTop: '2rem' }}
          >
            <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>
              아키텍처 흐름
            </h2>
            <Card>
              <MermaidDiagram chart={pipelineDiagram} />
            </Card>
          </section>

          {/* 기술 판단 */}
          <section
            id="tech"
            style={{ marginBottom: '3rem', scrollMarginTop: '2rem' }}
          >
            <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>
              기술 판단
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {[
                {
                  title: 'Redis Sorted Set — 트렌드 캐시',
                  desc:
                    '네이버 블로그 키워드 빈도를 매번 집계하지 않고, 수집 시 Sorted Set에 score로 적재합니다. ZREVRANGE로 top-k를 O(log n)에 꺼낼 수 있어 API 응답 지연을 줄였습니다.',
                },
                {
                  title: 'Haversine 반경 검색',
                  desc:
                    '사용자 위치에서 반경 N km 내 시설을 필터링할 때 지구 곡률을 반영한 Haversine 공식을 사용합니다. PostgreSQL 쿼리 레벨에서 계산해 앱 레이어 필터링을 없앴습니다.',
                },
                {
                  title: 'LLM 호출 가드',
                  desc:
                    '주변 시설이 하나도 없으면 LLM을 호출하지 않고 빈 추천을 바로 반환합니다. 의미 없는 LLM 호출 비용을 줄이고 응답 시간을 단축합니다.',
                },
                {
                  title: '지오코딩 보강',
                  desc:
                    '공공데이터 중 좌표 정보가 없는 시설은 수집 시점에 지오코딩 API를 통해 좌표를 보강합니다. 조회 시점이 아닌 적재 시점에 처리해 서빙 레이턴시를 고정합니다.',
                },
              ].map((item) => (
                <Card key={item.title}>
                  <p
                    style={{
                      fontWeight: 600,
                      color: 'var(--text-color)',
                      margin: '0 0 0.4rem',
                    }}
                  >
                    {item.title}
                  </p>
                  <p
                    style={{
                      color: 'var(--text-secondary)',
                      lineHeight: '1.7',
                      margin: 0,
                      fontSize: '0.9rem',
                    }}
                  >
                    {item.desc}
                  </p>
                </Card>
              ))}
            </div>
          </section>

          {/* Petory 연동 방식 */}
          <section
            id="integration"
            style={{ marginBottom: '3rem', scrollMarginTop: '2rem' }}
          >
            <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>
              Petory 연동 방식
            </h2>
            <Card style={{ marginBottom: '1rem' }}>
              <MermaidDiagram chart={integrationDiagram} />
            </Card>
            <Card>
              <ul style={{ margin: 0, paddingLeft: '0.5rem', listStyle: 'none' }}>
                {li('Petory Frontend에서 현재 위치(lat/lng)와 화면 context를 Backend로 전달합니다.')}
                {li('Petory Backend의 RecommendService가 JWT에서 userId를 확보하고 첫 번째 펫 정보를 조회한 뒤, pet-data-api에 추천 요청을 조립합니다.')}
                {li('pet-data-api는 시설 후보, 트렌드 키워드, 추천 문구를 JSON으로 반환합니다.')}
                {li('Petory Backend는 이 응답을 그대로 클라이언트에 전달합니다 (BFF 패턴).')}
              </ul>
              <p style={{ marginTop: '0.75rem', marginBottom: 0 }}>
                <a
                  href={PETORY_RECOMMEND_CLIENT}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: 'var(--link-color)', fontSize: '0.88rem' }}
                >
                  → PetDataApiClient.java 코드 보기
                </a>
              </p>
            </Card>
          </section>

          {/* 현재 범위와 한계 */}
          <section
            id="scope"
            style={{ marginBottom: '3rem', scrollMarginTop: '2rem' }}
          >
            <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>
              현재 범위와 한계
            </h2>
            <Card>
              <ul style={{ margin: 0, paddingLeft: '0.5rem', listStyle: 'none' }}>
                {li('운영 서버 완전 연동보다는 데이터 적재·조회·추천 파이프라인의 가능성을 검증하는 단계입니다.')}
                {li('공공데이터 소스 특성상 일부 카테고리는 좌표 누락이 많아 지오코딩 보강 커버리지에 한계가 있습니다.')}
                {li('LLM 추천 품질은 Ollama 모델 성능 외에도 입력 신호(시설 후보 수, 트렌드 키워드 질)의 영향을 크게 받습니다.')}
                {li('현재 트렌드 데이터는 네이버 블로그만 사용하며, 추가 소스 연동은 검토 단계입니다.')}
              </ul>
            </Card>
          </section>

          {/* 얻은 점 */}
          <section
            id="learned"
            style={{ marginBottom: '3rem', scrollMarginTop: '2rem' }}
          >
            <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>
              얻은 점
            </h2>
            <Card>
              <ul style={{ margin: 0, paddingLeft: '0.5rem', listStyle: 'none' }}>
                {li('서비스 언어(Java)와 데이터 파이프라인 언어(Python)를 분리할 때 각자의 생태계를 살릴 수 있다는 점을 실감했습니다.')}
                {li('배치 수집과 API 서빙은 실패 양상과 응답 시간 특성이 달라, 같은 서버에 두면 서로의 부하가 영향을 줍니다.')}
                {li('추천 품질은 모델 자체보다 입력 신호 설계와 폴백 전략(시설 없을 때 LLM 생략)이 실용적으로 더 중요했습니다.')}
                {li('데이터를 수집 즉시 서빙에 쓰기보다 적재 후 정제해서 읽기 API에서만 활용하면 서빙 레이턴시가 일정하게 유지됩니다.')}
              </ul>
            </Card>
          </section>

          {/* 관련 링크 */}
          <section
            id="links"
            style={{ marginBottom: '3rem', scrollMarginTop: '2rem' }}
          >
            <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>
              관련 링크
            </h2>
            <Card>
              <ul style={{ margin: 0, paddingLeft: '0.5rem', listStyle: 'none', lineHeight: '2' }}>
                <li>
                  <a
                    href={PET_DATA_API_GITHUB}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: 'var(--link-color)' }}
                  >
                    → pet-data-api GitHub
                  </a>
                </li>
                <li>
                  <a
                    href={PETORY_RECOMMEND_CLIENT}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: 'var(--link-color)' }}
                  >
                    → Petory PetDataApiClient.java
                  </a>
                </li>
              </ul>
            </Card>
          </section>
        </div>

        {/* 목차 */}
        <TableOfContents sections={sections} />
      </div>
    </div>
  );
}

export default PetDataApiPage;
