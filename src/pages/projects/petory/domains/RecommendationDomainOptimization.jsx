import { Link } from 'react-router-dom';
import TableOfContents from '../../../../components/Common/TableOfContents';

const entryPoints = [
  ['게시글 작성', 'AFTER_COMMIT + @Async', '순간 몰림 시 대기열 관리'],
  ['케어 요청 작성', 'AFTER_COMMIT + @Async', '순간 몰림 시 대기열 관리'],
  ['주변서비스 검색', '@EventListener + @Async', '호출 정책 부족 — 과호출 차단'],
  ['GET /api/pet-recommend', '동기 호출', '응답 지연·텍스트 길이 제한'],
];

const locationPolicyRows = [
  ['검색어 없음', '분석 안 함'],
  ['길이 7자 미만 또는 공백 없음', '분석 안 함 (MVP 휴리스틱)'],
  ['같은 사용자 + 검색어 10분 이내', 'Redis 중복 방지 → 분석 생략'],
  ['Redis 장애', '안전 쪽으로 차단 — Python 호출 생략'],
  ['자연어로 판단된 검색어', 'Python 분석 후보'],
];

const executorRows = [
  ['corePoolSize', '2', '평상시 처리 스레드'],
  ['maxPoolSize', '6', '대기열 포화 후 스레드 확장'],
  ['queueCapacity', '500', '대기열 무한 증가 방지'],
  ['reject 정책', 'DiscardWithWarnPolicy', '경고 로그 후 작업 폐기'],
  ['thread prefix', 'pet-intent-', '스레드 덤프 추적'],
];

const PETORY_TRAFFIC_DOC =
  'https://github.com/makkong1/Petory/blob/main/docs/refactoring/petRecommendation/pet-recommendation-nlp-traffic-policy-2026-05-31.md';

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
        padding: '0.85rem 1rem',
        backgroundColor: 'var(--bg-color)',
        borderRadius: '6px',
        fontSize: '0.82rem',
        fontFamily: 'monospace',
        lineHeight: '1.65',
        color: 'var(--text-secondary)',
        overflowX: 'auto',
        margin: '0.75rem 0 0',
        whiteSpace: 'pre-wrap',
        wordBreak: 'break-word',
      }}
    >
      {children}
    </pre>
  );
}

function RecommendationDomainOptimization() {
  const sections = [
    { id: 'intro', title: '개요' },
    { id: 'two-problems', title: '두 가지 문제' },
    { id: 'location-policy', title: 'Location 검색 정책' },
    { id: 'executor', title: 'NLP 전용 실행 풀' },
    { id: 'degradation', title: '본 기능 우선' },
    { id: 'docs', title: '원문 문서' },
  ];

  const li = (text) => <li style={{ marginBottom: '0.35rem' }}>• {text}</li>;

  return (
    <div className="domain-page-wrapper" style={{ padding: '2rem 0' }}>
      <div
        className="domain-page-container"
        style={{ display: 'flex', gap: '2rem', alignItems: 'flex-start' }}
      >
        <div className="domain-page-content" style={{ flex: 1 }}>
          <div style={{ marginBottom: '1rem' }}>
            <Link
              to="/domains/recommendation"
              style={{
                color: 'var(--link-color)',
                textDecoration: 'none',
                fontSize: '0.9rem',
              }}
            >
              ← Recommendation 도메인으로 돌아가기
            </Link>
          </div>

          <h1 style={{ marginBottom: '0.5rem', color: 'var(--text-color)' }}>
            Recommendation — NLP 호출·부하 제어
          </h1>
          <p
            style={{
              color: 'var(--text-secondary)',
              lineHeight: '1.7',
              marginBottom: '2.5rem',
              fontSize: '0.95rem',
            }}
          >
            Location 도메인의 초기 로드 최적화와 달리, Recommendation의 핵심 과제는{' '}
            <strong style={{ color: 'var(--text-color)' }}>
              느린 외부 NLP 의존성을 핵심 트랜잭션과 분리
            </strong>
            하고, 불필요한 Python 호출과 순간 몰림 때 쌓이는 대기 작업을 제어하는 것입니다. 코드
            품질·버그 수정은{' '}
            <Link
              to="/domains/recommendation/refactoring"
              style={{ color: 'var(--link-color)' }}
            >
              리팩토링
            </Link>
            페이지를 참고하세요.
          </p>

          <section id="intro" style={{ marginBottom: '3rem', scrollMarginTop: '2rem' }}>
            <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>개요</h2>
            <Card>
              <p
                style={{
                  lineHeight: '1.8',
                  color: 'var(--text-secondary)',
                  margin: '0 0 1rem',
                }}
              >
                모든 Python 호출은 <code>PetIntentClient.analyze()</code>로 모입니다. Spring은
                게시·케어·검색 이벤트와 동기 추천 API에서 NLP를 호출하지만, 추천 signal은
                부가 기능이므로 실패·지연·폐기해도 게시글 작성·케어 요청·주변서비스 검색은
                성공해야 합니다.
              </p>
              <table
                style={{
                  width: '100%',
                  borderCollapse: 'collapse',
                  fontSize: '0.88rem',
                  color: 'var(--text-secondary)',
                }}
              >
                <thead>
                  <tr style={{ borderBottom: '1px solid var(--nav-border)' }}>
                    {['진입점', '처리', '비용 성격'].map((h) => (
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
                  {entryPoints.map(([entry, proc, cost], i) => (
                    <tr
                      key={entry}
                      style={{
                        borderBottom:
                          i < entryPoints.length - 1
                            ? '1px solid var(--nav-border)'
                            : 'none',
                      }}
                    >
                      <td
                        style={{
                          padding: '0.55rem 0.75rem',
                          color: 'var(--text-color)',
                        }}
                      >
                        {entry}
                      </td>
                      <td style={{ padding: '0.55rem 0.75rem' }}>{proc}</td>
                      <td style={{ padding: '0.55rem 0.75rem' }}>{cost}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Card>
          </section>

          <section
            id="two-problems"
            style={{ marginBottom: '3rem', scrollMarginTop: '2rem' }}
          >
            <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>
              두 가지 문제는 성격이 다름
            </h2>
            <Card style={{ marginBottom: '1rem' }}>
              <h3
                style={{
                  marginBottom: '0.65rem',
                  color: 'var(--text-color)',
                  fontSize: '1rem',
                }}
              >
                Location 검색 = 호출 정책 부족
              </h3>
              <p
                style={{
                  color: 'var(--text-secondary)',
                  lineHeight: '1.75',
                  margin: 0,
                  fontSize: '0.9rem',
                }}
              >
                대규모 트래픽이 아니어도 카테고리·정렬·반경 변경만으로 같은 검색어에 Python이
                반복 호출될 수 있습니다. signal 중복 저장을 막아도 호출 비용은 이미
                발생합니다. → <strong>언제 분석할지</strong>를 먼저 좁혀야 합니다.
              </p>
            </Card>
            <Card>
              <h3
                style={{
                  marginBottom: '0.65rem',
                  color: 'var(--text-color)',
                  fontSize: '1rem',
                }}
              >
                게시글/케어 = 순간 몰림·대기열 관리
              </h3>
              <p
                style={{
                  color: 'var(--text-secondary)',
                  lineHeight: '1.75',
                  margin: 0,
                  fontSize: '0.9rem',
                }}
              >
                @Async는 사용자 응답을 Python 지연으로부터 보호할 뿐, 호출 비용을 없애지
                않습니다. 순간 몰림 시 NLP 작업이 대기열에 쌓이면 지연·타임아웃·다른 @Async
                작업 간섭이 생깁니다. → <strong>전용 실행 풀 + 거부 정책</strong>으로
                과부하 시 새 작업 유입을 막도록 설계합니다.
              </p>
              <CodeBlock>{`비동기 = 게시글/케어 작성 응답을 Python 지연으로부터 보호
비동기 ≠ Python 호출 비용 제거`}</CodeBlock>
            </Card>
          </section>

          <section
            id="location-policy"
            style={{ marginBottom: '3rem', scrollMarginTop: '2rem' }}
          >
            <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>
              Location 검색 — 2단 필터
            </h2>
            <Card>
              <CodeBlock>{`LocationSearchPerformedEvent 수신
  → [필터 1] 자연어: length >= 7 AND 공백 포함
  → [필터 2] Redis: 사용자 + 검색어 10분 중복 방지
  → 통과 시에만 PetIntentClient.analyze()`}</CodeBlock>
              <table
                style={{
                  width: '100%',
                  borderCollapse: 'collapse',
                  fontSize: '0.88rem',
                  color: 'var(--text-secondary)',
                  marginTop: '1rem',
                }}
              >
                <thead>
                  <tr style={{ borderBottom: '1px solid var(--nav-border)' }}>
                    {['조건', '처리'].map((h) => (
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
                  {locationPolicyRows.map(([cond, action], i) => (
                    <tr
                      key={cond}
                      style={{
                        borderBottom:
                          i < locationPolicyRows.length - 1
                            ? '1px solid var(--nav-border)'
                            : 'none',
                      }}
                    >
                      <td
                        style={{
                          padding: '0.55rem 0.75rem',
                          color: 'var(--text-color)',
                        }}
                      >
                        {cond}
                      </td>
                      <td style={{ padding: '0.55rem 0.75rem' }}>{action}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p
                style={{
                  color: 'var(--text-secondary)',
                  fontSize: '0.86rem',
                  lineHeight: '1.7',
                  marginTop: '1rem',
                  marginBottom: 0,
                }}
              >
                MVP 한계: 공백 없는 자연어(`강아지가귀를긁어요`)는 필터 통과 불가 — 과호출
                방지를 우선한 설계상 타협입니다.
              </p>
            </Card>
          </section>

          <section id="executor" style={{ marginBottom: '3rem', scrollMarginTop: '2rem' }}>
            <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>
              NLP 전용 실행 풀 (petIntentExecutor)
            </h2>
            <Card>
              <p
                style={{
                  color: 'var(--text-secondary)',
                  lineHeight: '1.75',
                  margin: '0 0 1rem',
                  fontSize: '0.9rem',
                }}
              >
                NLP 분석을 <code>petIntentExecutor</code> 전용 실행 풀로 격리해 알림·채팅방
                생성 등 다른 @Async와 자원을 분리합니다. 대기열이 가득 차면 일부 signal
                생성을 포기하는 것이 허용된 설계상 타협입니다.
              </p>
              <CodeBlock>{`동작 순서: 기본 스레드(2) → 대기열(500) → 최대 스레드(6) → 거부`}</CodeBlock>
              <table
                style={{
                  width: '100%',
                  borderCollapse: 'collapse',
                  fontSize: '0.88rem',
                  color: 'var(--text-secondary)',
                  marginTop: '1rem',
                }}
              >
                <thead>
                  <tr style={{ borderBottom: '1px solid var(--nav-border)' }}>
                    {['설정', '값', '의도'].map((h) => (
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
                  {executorRows.map(([key, val, intent], i) => (
                    <tr
                      key={key}
                      style={{
                        borderBottom:
                          i < executorRows.length - 1
                            ? '1px solid var(--nav-border)'
                            : 'none',
                      }}
                    >
                      <td
                        style={{
                          padding: '0.55rem 0.75rem',
                          color: 'var(--text-color)',
                        }}
                      >
                        {key}
                      </td>
                      <td style={{ padding: '0.55rem 0.75rem' }}>{val}</td>
                      <td style={{ padding: '0.55rem 0.75rem' }}>{intent}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Card>
          </section>

          <section
            id="degradation"
            style={{ marginBottom: '3rem', scrollMarginTop: '2rem' }}
          >
            <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>
              부가 기능 실패 시 본 기능 유지
            </h2>
            <Card>
              <p
                style={{
                  color: 'var(--text-secondary)',
                  lineHeight: '1.75',
                  margin: '0 0 0.75rem',
                  fontSize: '0.9rem',
                }}
              >
                추천 signal은 부가 기능이므로, NLP·Redis·실행 풀 쪽 문제가 있어도 게시글
                작성·케어 요청·주변서비스 검색은 성공 상태를 유지합니다.
              </p>
              <ul
                style={{
                  listStyle: 'none',
                  padding: 0,
                  margin: 0,
                  color: 'var(--text-secondary)',
                  lineHeight: '1.8',
                }}
              >
                {li('Python 3초 타임아웃 · 실패 시 빈 결과 — 본 요청 무영향')}
                {li('Redis 중복 방지 장애 → 분석 생략(안전 쪽으로 차단)')}
                {li('실행 풀 거부 → 경고 로그, signal 미생성')}
                {li('confidence Python 0.45 / Spring 0.60 — 2단계 품질 필터')}
                {li('서버 기동 시 임베딩 모델 선로딩 — 첫 요청 지연 완화 (R8)')}
              </ul>
            </Card>
          </section>

          <section id="docs" style={{ marginBottom: '3rem', scrollMarginTop: '2rem' }}>
            <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>원문 문서</h2>
            <Card>
              <ul
                style={{
                  listStyle: 'none',
                  padding: 0,
                  margin: 0,
                  color: 'var(--text-secondary)',
                  lineHeight: '2',
                }}
              >
                <li>
                  •{' '}
                  <a
                    href={PETORY_TRAFFIC_DOC}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: 'var(--link-color)', textDecoration: 'none' }}
                  >
                    pet-recommendation-nlp-traffic-policy-2026-05-31.md
                  </a>
                  {' — 용어·병목 계층·우선순위 전체'}
                </li>
                <li>
                  •{' '}
                  <Link
                    to="/domains/recommendation"
                    style={{ color: 'var(--link-color)', textDecoration: 'none' }}
                  >
                    Recommendation 도메인
                  </Link>
                  {' — §8 장애 처리·signal 저장 조건'}
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

export default RecommendationDomainOptimization;
