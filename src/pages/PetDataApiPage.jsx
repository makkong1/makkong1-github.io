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

function CodeBlock({ children }) {
  return (
    <pre
      style={{
        padding: '0.95rem 1rem',
        backgroundColor: 'var(--bg-color)',
        borderRadius: '6px',
        overflowX: 'auto',
        fontSize: '0.84rem',
        color: 'var(--text-secondary)',
        fontFamily: 'monospace',
        lineHeight: '1.65',
        margin: '0.75rem 0 0',
      }}
    >
      {children}
    </pre>
  );
}

const PET_DATA_API_GITHUB = 'https://github.com/makkong1/pet-data-api';
const PET_DATA_ARCH_DOC =
  'https://github.com/makkong1/pet-data-api/blob/main/docs/분석/ARCHITECTURE.md';

function PetDataApiPage() {
  const sections = [
    { id: 'pillars', title: '핵심 기능' },
    { id: 'intro', title: '서비스 개요' },
    { id: 'design', title: '기술 결정' },
    { id: 'limits', title: '한계 & 개선' },
    { id: 'docs', title: '관련 링크' },
  ];

  const corePillars = [
    '네이버 블로그 배치 수집',
    '형태소·인기 파이프라인',
    'Redis 단일 상태 저장',
    'FastAPI 읽기 전용',
    'CLI → JSON (Spring 적재)',
    'APScheduler / 수동 트리거',
  ];

  const dualPathDiagram = `flowchart TB
    subgraph W["배치 쓰기"]
      SCH["APScheduler\\n18:00 트렌드 / 18:10 인기"]
      ADM["POST /collect/trigger\\n관리자 키"]
      SCH --> RT["run_trend_collection"]
      SCH --> RP["run_popular_collection"]
      ADM --> RT
      ADM --> RP
      RT --> ZT[("Redis\\ntrends:{cat}:keywords")]
      RP --> JP[("Redis\\npopular:{ctx} JSON")]
    end

    subgraph A["경로 A — HTTP (Petory 등)"]
      JP --> GP["GET /popular/{context}"]
      ZT --> GT["GET /trends/{category}"]
      GP --> PC["PetDataApiClient"]
      GT --> PC
    end

    subgraph B["경로 B — CLI (DB 적재)"]
      CLI["cli.py popular --output ..."]
      CLI --> JSON["JSON 파일\\n(LocationImportDto 형태)"]
      JSON --> SPR["Spring LocationImportService\\n등록 레포 구현체"]
    end

    RP -.->|"같은 수집 로직 재사용"| CLI`;

  const li = (text) => (
    <li style={{ marginBottom: '0.35rem', listStyle: 'none' }}>• {text}</li>
  );

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
            반려 관련 블로그 신호 기반 트렌드·인기 API — Python / FastAPI · Redis
          </p>
          <p
            style={{
              color: 'var(--text-secondary)',
              lineHeight: '1.8',
              marginBottom: '0.85rem',
              fontSize: '0.95rem',
            }}
          >
            네이버 블로그 검색 결과를 배치에서만 처리해 Redis에 적재하고, HTTP
            레이어는 <strong>읽기·운영 헬스</strong>에 집중합니다. PostgreSQL 없이{' '}
            <strong>Redis + (선택) CLI 출력 파일</strong>만 상태를 가집니다. Petory{' '}
            <code>RecommendService</code>는 경로 A로 <code>/popular</code>·
            <code>/trends</code>를 소비하고, 구조화 시설을 DB에 넣는 흐름은 경로 B로
            분리할 수 있습니다(
            <a
              href={PET_DATA_ARCH_DOC}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: 'var(--link-color)' }}
            >
              ARCHITECTURE.md
            </a>
            와 동일한 그림).
          </p>

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

          <section
            id="intro"
            style={{ marginBottom: '3rem', scrollMarginTop: '2rem' }}
          >
            <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>
              서비스 개요
            </h2>

            <Card style={{ marginBottom: '1rem' }}>
              <h3
                style={{
                  marginBottom: '0.75rem',
                  color: 'var(--text-color)',
                  fontSize: '1rem',
                }}
              >
                제공 방식 (이원화)
              </h3>
              <ul
                style={{
                  listStyle: 'none',
                  padding: 0,
                  margin: 0,
                  color: 'var(--text-secondary)',
                  lineHeight: '1.8',
                }}
              >
                {li(
                  '경로 A — FastAPI: Petory recommendation 등이 GET /popular, GET /trends로 Redis 서빙만 받음 (배치가 키를 갱신).'
                )}
                {li(
                  '경로 B — python cli.py popular --output (파일경로): 같은 수집 로직으로 JSON 파일을 만들고 Spring 쪽에서 locationservice 형태로 import (Redis 쓰기 없음; 경로 A와 독립).'
                )}
              </ul>
            </Card>

            <Card style={{ marginBottom: '1rem' }}>
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
                    {['구분', '수집·저장', 'API'].map((h) => (
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
                      '트렌드 키워드',
                      '블로그 → kiwipiepy → Redis ZSET',
                      'GET /trends/{category}',
                    ],
                    [
                      '인기 상호',
                      '블로그(+위치 보강 등) → Redis JSON 문자열',
                      'GET /popular/{context}',
                    ],
                  ].map(([signal, path, api]) => (
                    <tr
                      key={signal}
                      style={{ borderBottom: '1px solid var(--nav-border)' }}
                    >
                      <td
                        style={{
                          padding: '0.55rem 0.75rem',
                          fontWeight: 500,
                          color: 'var(--text-color)',
                        }}
                      >
                        {signal}
                      </td>
                      <td style={{ padding: '0.55rem 0.75rem' }}>{path}</td>
                      <td
                        style={{
                          padding: '0.55rem 0.75rem',
                          fontFamily: 'monospace',
                          fontSize: '0.82rem',
                          color: 'var(--text-color)',
                        }}
                      >
                        {api}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Card>

            <Card style={{ marginBottom: '1rem' }}>
              <h3
                style={{
                  marginBottom: '0.75rem',
                  color: 'var(--text-color)',
                  fontSize: '1rem',
                }}
              >
                데이터 흐름
              </h3>
              <MermaidDiagram chart={dualPathDiagram} />
              <p
                style={{
                  color: 'var(--text-muted)',
                  fontSize: '0.85rem',
                  marginTop: '0.75rem',
                  marginBottom: 0,
                  lineHeight: '1.65',
                }}
              >
                점선은 “인기 수집 파이프라인을 CLI가 재사용한다”는 의미이며, 경로
                B는 Redis를 거치지 않습니다.
              </p>
            </Card>

            <Card>
              <h3
                style={{
                  marginBottom: '0.75rem',
                  color: 'var(--text-color)',
                  fontSize: '1rem',
                }}
              >
                Petory와의 역할 나눔 (요지)
              </h3>
              <ul
                style={{
                  listStyle: 'none',
                  padding: 0,
                  margin: 0,
                  color: 'var(--text-secondary)',
                  lineHeight: '1.8',
                }}
              >
                {li(
                  '시설 컨텍스트 8개(grooming … hotel): Petory DB에서 반경 후보, pet-data-api는 popularity/trends 신호만.'
                )}
                {li(
                  'supplies·snack·food·clothes: Petory는 PetDataApiClient.recommend() 조합 경로(내부에서 popular+trends).'
                )}
              </ul>
              <p style={{ margin: '0.75rem 0 0', fontSize: '0.85rem' }}>
                <Link
                  to="/domains/recommendation"
                  style={{ color: 'var(--link-color)', textDecoration: 'none' }}
                >
                  Recommendation 도메인 V2
                </Link>
                에서 Track A/B·merge 흐름을 같이 봅니다.
              </p>
            </Card>
          </section>

          <section
            id="design"
            style={{ marginBottom: '3rem', scrollMarginTop: '2rem' }}
          >
            <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>
              기술 결정
            </h2>

            <Card style={{ marginBottom: '1rem' }}>
              <h3
                style={{
                  marginBottom: '0.75rem',
                  color: 'var(--text-color)',
                  fontSize: '1rem',
                }}
              >
                A. 디렉터리 구조 (요약)
              </h3>
              <ul
                style={{
                  listStyle: 'none',
                  padding: 0,
                  margin: 0,
                  color: 'var(--text-secondary)',
                  lineHeight: '1.8',
                }}
              >
                {li('app/main.py — FastAPI 앱, lifespan에서 스케줄러 기동/종료')}
                {li('app/ingestion/* — naver, blog, runner, exporter, analyzer 등 수집')}
                {li('app/serving/api/* — popular, trends, collect 라우터')}
                {li(
                  'app/platform — config, auth, redis, scheduler/jobs, observability'
                )}
              </ul>
              <CodeBlock>{`pet-data-api/
├── cli.py                 # 배치 CLI (popular → JSON)
├── app/
│   ├── main.py            # lifespan: scheduler start/stop
│   ├── ingestion/
│   │   ├── runner.py      # run_popular_collection, run_trend_collection
│   │   ├── exporter.py    # CLI용 DTO 직렬화
│   │   └── analyzer/      # 형태소·트렌드 집계
│   ├── serving/api/       # popular, trends, collect
│   └── platform/
│       ├── cache/redis.py
│       ├── core/config.py, auth.py
│       └── scheduler/jobs.py`}</CodeBlock>
            </Card>

            <Card style={{ marginBottom: '1rem' }}>
              <h3
                style={{
                  marginBottom: '0.75rem',
                  color: 'var(--text-color)',
                  fontSize: '1rem',
                }}
              >
                B. Lifespan + APScheduler
              </h3>
              <ul
                style={{
                  listStyle: 'none',
                  padding: 0,
                  margin: 0,
                  color: 'var(--text-secondary)',
                  lineHeight: '1.8',
                }}
              >
                {li('uvicorn 기동 시 Redis ping·로깅 설정 후 스케줄러 등록')}
                {li('매일 18:00 트렌드, 18:10 인기 — max_instances=1로 겹침 방지')}
              </ul>
              <CodeBlock>{`scheduler.add_job(run_trend_collection, trigger="cron", hour=18, minute=0, max_instances=1)
scheduler.add_job(run_popular_collection, trigger="cron", hour=18, minute=10, max_instances=1)`}</CodeBlock>
            </Card>

            <Card style={{ marginBottom: '1rem' }}>
              <h3
                style={{
                  marginBottom: '0.75rem',
                  color: 'var(--text-color)',
                  fontSize: '1rem',
                }}
              >
                C. 배치 쓰기 vs API 읽기
              </h3>
              <ul
                style={{
                  listStyle: 'none',
                  padding: 0,
                  margin: 0,
                  color: 'var(--text-secondary)',
                  lineHeight: '1.8',
                }}
              >
                {li('수집·외부 네트워크는 runner 쪽만 — 읽기 API는 Redis 조회 위주')}
                {li('키 미존재·Redis 오류 시 503 — 집계 미실행 상태를 응답으로 드러냄')}
                {li('POST /collect/trigger 의 targets는 popular · trends 리터럴만')}
              </ul>
            </Card>

            <Card style={{ marginBottom: '1rem' }}>
              <h3
                style={{
                  marginBottom: '0.75rem',
                  color: 'var(--text-color)',
                  fontSize: '1rem',
                }}
              >
                D. 인증 (X-API-Key)
              </h3>
              <ul
                style={{
                  listStyle: 'none',
                  padding: 0,
                  margin: 0,
                  color: 'var(--text-secondary)',
                  lineHeight: '1.8',
                }}
              >
                {li('일반 라우터: SHA-256 hex가 API_KEY_HASH 또는 ADMIN 과 일치')}
                {li('POST /collect/trigger: ADMIN_API_KEY_HASH 만')}
                {li('평문 키는 저장하지 않음 — 헤더를 해시하여 비교')}
              </ul>
            </Card>

            <Card style={{ marginBottom: '1rem' }}>
              <h3
                style={{
                  marginBottom: '0.75rem',
                  color: 'var(--text-color)',
                  fontSize: '1rem',
                }}
              >
                E. Redis 키 (문서 계약)
              </h3>
              <ul
                style={{
                  listStyle: 'none',
                  padding: 0,
                  margin: 0,
                  color: 'var(--text-secondary)',
                  lineHeight: '1.8',
                }}
              >
                {li('popular:{context} — JSON 배열 (인기 엔트리)')}
                {li('trends:{category}:keywords — ZSET (키워드, 언급 스코어)')}
                {li('trends:{category}:updated_at — 문자열 타임스탬프')}
              </ul>
            </Card>

            <Card style={{ marginBottom: '1rem' }}>
              <h3
                style={{
                  marginBottom: '0.75rem',
                  color: 'var(--text-color)',
                  fontSize: '1rem',
                }}
              >
                F. CLI exporter 규칙 (Spring 행 간략 매핑)
              </h3>
              <ul
                style={{
                  listStyle: 'none',
                  padding: 0,
                  margin: 0,
                  color: 'var(--text-secondary)',
                  lineHeight: '1.8',
                }}
              >
                {li('map_y / map_x → lat / lng (1e7 스케일 float 변환 등 exporter 규칙)')}
                {li('주소 파싱 → sido, sigungu; road_address 우선')}
                {li('boarding · hotel 등은 runner에서 local_discovery 분기 가능')}
              </ul>
            </Card>

            <Card>
              <h3
                style={{
                  marginBottom: '0.75rem',
                  color: 'var(--text-color)',
                  fontSize: '1rem',
                }}
              >
                G. 운영·관측성
              </h3>
              <ul
                style={{
                  listStyle: 'none',
                  padding: 0,
                  margin: 0,
                  color: 'var(--text-secondary)',
                  lineHeight: '1.8',
                }}
              >
                {li('/healthz, /readyz, /metrics 및 X-Request-Id 미들웨어(observability)')}
                {li('헬스/메트릭 경로는 액세스 로그 최소화')}
              </ul>
            </Card>
          </section>

          <section
            id="limits"
            style={{ marginBottom: '3rem', scrollMarginTop: '2rem' }}
          >
            <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>
              한계 &amp; 개선
            </h2>
            <Card>
              <ul style={{ margin: 0, paddingLeft: 0, listStyle: 'none' }}>
                {li(
                  '원천은 네이버 블로그 중심 — 광고·노이즈 포스트가 집계를 왜곡할 수 있음 (blog.py blocklist 의존도 높음).'
                )}
                {li(
                  '일 배치 한 번 전제라 실시간 트렌드에는 맞지 않음; 지연 허용 시나리오에 적합.'
                )}
                {li(
                  '경로 A/B는 데이터 저장소 수준에서 분리 — 운영 시 어떤 쪽으로 시설 적재할지 레포 간 계약만 맞추면 됨.'
                )}
              </ul>
            </Card>
          </section>

          <section
            id="docs"
            style={{ marginBottom: '3rem', scrollMarginTop: '2rem' }}
          >
            <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>
              관련 링크
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
                <tbody>
                  {[
                    ['HTTP API', '/healthz, /readyz, /metrics, /popular/{context}, /trends/{category}, POST /collect/trigger'],
                    ['환경변수', 'API_KEY_HASH, ADMIN_API_KEY_HASH, NAVER_*, REDIS_URL, NAVER_TIMEOUT_MS (선택)'],
                  ].map(([k, v]) => (
                    <tr key={k} style={{ borderBottom: '1px solid var(--nav-border)' }}>
                      <td
                        style={{
                          padding: '0.55rem 0.75rem',
                          color: 'var(--text-color)',
                          fontWeight: 600,
                          width: '7.5rem',
                          verticalAlign: 'top',
                        }}
                      >
                        {k}
                      </td>
                      <td style={{ padding: '0.55rem 0.75rem', fontFamily: 'monospace', fontSize: '0.8rem' }}>
                        {v}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <ul
                style={{
                  margin: '1rem 0 0',
                  paddingLeft: 0,
                  listStyle: 'none',
                  lineHeight: '2',
                }}
              >
                <li>
                  <a
                    href={PET_DATA_API_GITHUB}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: 'var(--link-color)' }}
                  >
                    pet-data-api GitHub
                  </a>
                </li>
                <li>
                  <a
                    href={PET_DATA_ARCH_DOC}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: 'var(--link-color)' }}
                  >
                    docs/분석/ARCHITECTURE.md
                  </a>
                </li>
                <li>
                  <Link to="/domains/recommendation" style={{ color: 'var(--link-color)' }}>
                    Petory Recommendation 도메인
                  </Link>
                </li>
                <li>
                  <Link to="/domains/location" style={{ color: 'var(--link-color)' }}>
                    Petory Location 도메인
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

export default PetDataApiPage;
