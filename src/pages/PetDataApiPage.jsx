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

function PetDataApiPage() {
  const sections = [
    { id: 'pillars', title: '핵심 기능' },
    { id: 'why', title: '왜 분리했는가' },
    { id: 'signals', title: '두 가지 신호' },
    { id: 'architecture', title: '아키텍처 흐름' },
    { id: 'tech', title: '기술 판단' },
    { id: 'api', title: 'API 엔드포인트' },
    { id: 'scope', title: '현재 범위' },
    // { id: 'learned', title: '얻은 점' }, // TODO: 직접 작성 후 활성화
  ];

  const corePillars = [
    '네이버 블로그 배치 수집',
    '형태소 분석 (kiwipiepy)',
    'freshness 스코어링',
    'Naver 로컬 위치 보강',
    'Redis 단일 저장소',
    'APScheduler 배치',
  ];

  const pipelineDiagram = `flowchart TD
    NAVER_BLOG["네이버 블로그 API\\n카테고리별 포스트 수집"]
    NAVER_LOCAL["네이버 로컬 API\\n상호 위치 보강"]
    SCHED["APScheduler\\n18:00 트렌드 / 18:10 인기"]
    ADMIN["POST /collect/trigger\\n관리자 X-API-Key"]

    SCHED -->|스케줄 실행| NAVER_BLOG
    ADMIN -->|수동 트리거| NAVER_BLOG

    NAVER_BLOG -->|"형태소 분석 · 빈도 집계"| REDIS_T[("Redis\\ntrends:{category}\\nTTL 25h")]
    NAVER_BLOG -->|"상호명 추출 · freshness 스코어"| REDIS_P[("Redis\\npopular:{context}\\nTTL 25h")]
    NAVER_LOCAL -->|위치 정보 보강| REDIS_P

    REDIS_T --> T_API["GET /trends/{category}\\n키워드 빈도 순위"]
    REDIS_P --> P_API["GET /popular/{context}\\n인기 상호 JSON 배열"]`;

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
            반려동물 인기도 인텔리전스 API — Python / FastAPI · Redis · APScheduler
          </p>
          <p
            style={{
              color: 'var(--text-secondary)',
              lineHeight: '1.8',
              marginBottom: '0.85rem',
              fontSize: '0.95rem',
            }}
          >
            네이버 블로그 언급을 주기적으로 수집해 형태소 분석과 freshness
            스코어링으로 정제한 뒤 Redis에 집계하고, <strong>트렌드 키워드</strong>와{' '}
            <strong>인기 상호</strong> 두 가지 신호를 REST API로 제공하는 서비스입니다.
            PostgreSQL 없이 Redis 단일 저장소만으로 배치 집계와 빠른 읽기 API를
            분리한 구조로, Petory 등 외부 서비스가 소비 가능한 블로그 기반 신호
            원천 API 역할을 합니다.
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
            <p
              style={{
                color: 'var(--text-secondary)',
                fontSize: '0.92rem',
                lineHeight: '1.75',
                marginTop: '-0.35rem',
                marginBottom: '1rem',
              }}
            >
              수집·집계 파이프라인과 사용자 응답 경로를 같은 서버에 두면 외부 API
              지연이 직접 사용자에게 번집니다. 세 축으로 분리했습니다.
            </p>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                gap: '1rem',
              }}
            >
              {[
                {
                  title: '배치와 서빙 분리',
                  desc: '네이버 블로그 수집과 형태소 집계는 배치 전용 경로에서만 실행됩니다. API 읽기 경로는 Redis 조회만 하므로 수집 실패나 네이버 API 지연이 읽기 응답에 영향을 주지 않습니다.',
                },
                {
                  title: '스택·생태계 분리',
                  desc: 'Petory(Spring/Java)와 배포·의존성 주기가 달라 한 레포에 묶기 어렵습니다. Python 파이프라인 생태계(kiwipiepy, httpx, APScheduler)를 그대로 활용합니다.',
                },
                {
                  title: '저장소 단순화',
                  desc: 'PostgreSQL 없이 Redis 단일 저장소만 사용합니다. 배치가 TTL 25h Redis 키를 갱신하고, API는 이를 읽기만 합니다. 키 누락 시 503을 반환해 "데이터 없음"을 명확히 표현합니다.',
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

          {/* 두 가지 신호 */}
          <section
            id="signals"
            style={{ marginBottom: '3rem', scrollMarginTop: '2rem' }}
          >
            <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>
              두 가지 신호
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
                    {['신호', '수집 방식', '정제', 'API'].map((h) => (
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
                      '네이버 블로그 카테고리별 포스트',
                      'kiwipiepy 형태소 분석 · 빈도 집계 · stopwords 제거',
                      'GET /trends/{category}',
                    ],
                    [
                      '인기 상호',
                      '네이버 블로그 언급 + 로컬 검색 위치 보강',
                      'PREFIX 노이즈 제거 · blocklist · freshness 스코어 정규화',
                      'GET /popular/{context}',
                    ],
                  ].map(([signal, collect, refine, api]) => (
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
                      <td style={{ padding: '0.55rem 0.75rem' }}>{collect}</td>
                      <td style={{ padding: '0.55rem 0.75rem' }}>{refine}</td>
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
                  title: 'freshness 스코어링',
                  desc: '게시물 작성 시점 기반으로 freshness_weight = max(0, 1 − age_days/180)를 mention_count에 곱해 raw_score를 산출하고 최댓값으로 정규화합니다. 오래된 언급이 많아도 최신 상호보다 높게 랭킹되지 않습니다.',
                },
                {
                  title: 'Redis TTL 25h — 배치 전용 쓰기',
                  desc: 'API 읽기 경로는 Redis 조회만 합니다. 배치가 TTL 25h로 키를 갱신하므로 하루 배치가 다소 늦어도 이전 데이터를 유지합니다. 키 자체가 없으면 503을 반환해 배치 미실행 상태를 명확히 드러냅니다.',
                },
                {
                  title: 'APScheduler max_instances=1',
                  desc: '18:00 트렌드, 18:10 인기 배치를 각각 실행합니다. max_instances=1로 이전 실행이 끝나기 전에 다음 실행이 겹치지 않도록 막아 Redis 쓰기 충돌을 예방합니다.',
                },
                {
                  title: '형태소 분석 노이즈 제거',
                  desc: 'kiwipiepy로 명사만 추출 후 stopwords 필터와 PREFIX 패턴 blocklist를 적용합니다. 블로그 특성상 광고성 단어나 업체명 패턴이 많아 쿼리 확장과 stopwords 강화를 반복 개선했습니다.',
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

          {/* API 엔드포인트 */}
          <section
            id="api"
            style={{ marginBottom: '3rem', scrollMarginTop: '2rem' }}
          >
            <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>
              API 엔드포인트
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
                    {['메서드', '경로', '인증', '설명'].map((h) => (
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
                    ['GET', '/healthz', '없음', 'Liveness'],
                    ['GET', '/readyz', '없음', 'Redis ping readiness'],
                    ['GET', '/trends/{category}', 'X-API-Key', '카테고리별 키워드 빈도 순위'],
                    ['GET', '/popular/{context}', 'X-API-Key', '컨텍스트별 인기 상호 JSON'],
                    ['POST', '/collect/trigger', '관리자 X-API-Key', '{"targets":["trends","popular"]} 수동 수집'],
                  ].map(([method, path, auth, desc]) => (
                    <tr
                      key={path}
                      style={{ borderBottom: '1px solid var(--nav-border)' }}
                    >
                      <td
                        style={{
                          padding: '0.55rem 0.75rem',
                          fontWeight: 600,
                          color: 'var(--text-color)',
                          fontFamily: 'monospace',
                          fontSize: '0.82rem',
                        }}
                      >
                        {method}
                      </td>
                      <td
                        style={{
                          padding: '0.55rem 0.75rem',
                          fontFamily: 'monospace',
                          fontSize: '0.82rem',
                        }}
                      >
                        {path}
                      </td>
                      <td style={{ padding: '0.55rem 0.75rem', fontSize: '0.85rem' }}>
                        {auth}
                      </td>
                      <td style={{ padding: '0.55rem 0.75rem' }}>{desc}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p
                style={{
                  marginTop: '1rem',
                  marginBottom: 0,
                  fontSize: '0.85rem',
                  color: 'var(--text-muted)',
                }}
              >
                인기 컨텍스트 9개: grooming · hospital · supplies · pharmacy · cafe ·
                pension · restaurant · boarding · hotel
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
                {li('추천 엔진이 아닙니다. 트렌드 키워드와 인기 상호 데이터를 제공하며, 이를 어떻게 활용할지는 Petory 등 이 API를 호출하는 쪽에서 결정합니다.')}
                {li('수집 주기는 하루 1회 배치입니다. 실시간 트렌드 변화는 반영되지 않습니다.')}
                {li('데이터 원천은 네이버 블로그 한정입니다. 블로그 특성상 광고성 포스트가 집계 결과를 왜곡할 수 있습니다.')}
                {li('배치 미실행 상태(Redis 키 없음)면 503을 반환합니다. 최초 API 호출 전에 수집이 먼저 필요합니다.')}
              </ul>
            </Card>
          </section>

          {/* 얻은 점 — TODO: 직접 작성 필요 (본인이 느낀 점으로 채울 것)
          <section
            id="learned"
            style={{ marginBottom: '3rem', scrollMarginTop: '2rem' }}
          >
            <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>
              얻은 점
            </h2>
            <Card>
              <ul style={{ margin: 0, paddingLeft: '0.5rem', listStyle: 'none' }}>
                {li('배치 전용 쓰기와 Redis 전용 읽기를 분리하면 수집 지연이 API 응답에 영향을 주지 않음을 실감했습니다.')}
                {li('형태소 분석 결과의 노이즈(광고성 단어, 업체명 패턴)는 단순 stopwords로 부족하고, 쿼리 확장과 blocklist 반복 개선이 필요했습니다.')}
                {li('freshness 스코어를 최댓값으로 정규화하지 않으면 컨텍스트마다 절대값이 달라 랭킹 비교가 무의미해집니다.')}
                {li('Redis TTL을 배치 주기보다 조금 길게 설정하면 배치가 늦어도 이전 데이터로 응답을 유지할 수 있습니다.')}
              </ul>
            </Card>
          </section>
          */}

          {/* 관련 링크 */}
          <section
            id="links"
            style={{ marginBottom: '3rem', scrollMarginTop: '2rem' }}
          >
            <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>
              관련 링크
            </h2>
            <Card>
              <ul
                style={{
                  margin: 0,
                  paddingLeft: '0.5rem',
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
                    → pet-data-api GitHub
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
