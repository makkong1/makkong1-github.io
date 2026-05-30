import { Link } from 'react-router-dom';
import TableOfContents from '../../../../components/Common/TableOfContents';

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

const PETORY_PET_RECOMMEND_CONTROLLER =
  'https://github.com/makkong1/Petory/blob/main/backend/main/java/com/linkup/Petory/domain/petRecommendation/controller/PetRecommendationController.java';
const PETORY_PET_INTENT_CLIENT =
  'https://github.com/makkong1/Petory/blob/main/backend/main/java/com/linkup/Petory/domain/petRecommendation/client/PetIntentClient.java';
const PETORY_INTENT_SIGNAL_ENTITY =
  'https://github.com/makkong1/Petory/blob/main/backend/main/java/com/linkup/Petory/domain/petRecommendation/entity/UserPetIntentSignal.java';
const PETORY_NLP_INTENT_ROUTER =
  'https://github.com/makkong1/Petory/blob/main/petory-nlp-server/app/api/pet_intent_router.py';
const PETORY_RECOMMENDATION_DOC =
  'https://github.com/makkong1/Petory/blob/main/docs/domains/recommendation.md';

function RecommendationDomainV2() {
  const sections = [
    { id: 'pillars', title: '핵심 기능' },
    { id: 'intro', title: '도메인 개요' },
    { id: 'design', title: '기술 결정' },
    { id: 'limits', title: '한계 & 개선' },
    { id: 'docs', title: '관련 페이지' },
  ];

  const corePillars = [
    '비동기 intent signal',
    'Python NLP 분석',
    '원문 텍스트 미저장',
    '추천 카드 /signals',
    'Location 카테고리 연결',
    '본 기능 무영향 장애 처리',
  ];

  const li = (text) => <li style={{ marginBottom: '0.35rem' }}>• {text}</li>;

  return (
    <div className="domain-page-wrapper" style={{ padding: '2rem 0' }}>
      <div
        className="domain-page-container"
        style={{ display: 'flex', gap: '2rem', alignItems: 'flex-start' }}
      >
        <div className="domain-page-content" style={{ flex: 1 }}>
          <h1 style={{ marginBottom: '0.5rem', color: 'var(--text-color)' }}>
            Recommendation 도메인
          </h1>
          <p
            style={{
              color: 'var(--text-secondary)',
              lineHeight: '1.8',
              marginBottom: '0.85rem',
              fontSize: '0.95rem',
            }}
          >
            Recommendation 도메인은 사용자의 최근 반려생활 입력을 보고 주변서비스
            탭에 추천 카드를 띄우는 기능입니다. 처음에는 별도 추천 엔진이나
            장소 목록 API가 필요하다고 보였지만, 실제로는 Location 검색에
            카테고리만 넘겨 주면 되는 구조였고, 커뮤니티·케어·검색어에서 의도를
            모으는 비동기 파이프라인, Python NLP 호출, 원문을 남기지 않는 signal
            저장까지 함께 다뤄야 했습니다. 저는 글·요청·검색이 본 기능을 막지
            않게 이벤트로 분석하고, 카드는 무엇을 볼지만 알려 주며 실제 장소
            조회는 Location 도메인에 맡기는 방향으로 설계했습니다.
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
              도메인 개요
            </h2>

            <Card style={{ marginBottom: '1rem' }}>
              <p
                style={{
                  lineHeight: '1.8',
                  color: 'var(--text-secondary)',
                  margin: 0,
                }}
              >
                새 장소 조회 시스템을 만들지 않고, 기존{' '}
                <code>/api/location-services/search</code>에{' '}
                <code>category</code> 필터를 넘기는 <strong>카테고리 진입점
                추천</strong>입니다. 커뮤니티 글·케어 요청·주변서비스 검색어가
                Spring 이벤트로 발행되면 <code>@Async</code> listener가 Python
                NLP(<code>POST /api/pet-intent/analyze</code>)를 호출하고,
                confidence 0.6 이상이면 <code>user_pet_intent_signal</code>에
                저장합니다(원문 미저장, TTL 7일). 주변서비스 탭은{' '}
                <code>GET /api/pet-recommend/signals</code>로 카드를 받고,
                클릭 시 <code>targetCategory</code>로 Location 검색을 다시
                실행합니다.
              </p>
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
                    {['단계', '담당', '비고'].map((h) => (
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
                      '입력 수집',
                      'Board / Care / LocationServiceService',
                      'CommunityPostCreated · CareRequestCreated · LocationSearchPerformed 이벤트',
                    ],
                    [
                      '의도 분석',
                      'petory-nlp-server',
                      'rule + embedding, recommendedCategories는 Location category와 정합',
                    ],
                    [
                      'signal 저장',
                      'UserPetIntentSignalService',
                      'confidence ≥ 0.6, source_type COMMUNITY | CARE | LOCATION_SEARCH',
                    ],
                    [
                      '카드 노출',
                      'LocationControls + petRecommendationApi',
                      'cardMessage / actionLabel / targetCategory',
                    ],
                    [
                      '장소 조회',
                      'LocationServiceService',
                      '지도 중심·반경·정렬은 프론트 상태 유지',
                    ],
                  ].map(([step, owner, note], i, arr) => (
                    <tr
                      key={step}
                      style={{
                        borderBottom:
                          i < arr.length - 1
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
                        {step}
                      </td>
                      <td style={{ padding: '0.55rem 0.75rem' }}>{owner}</td>
                      <td style={{ padding: '0.55rem 0.75rem' }}>{note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Card>

            <Card>
              <h3
                style={{
                  marginBottom: '0.65rem',
                  color: 'var(--text-color)',
                  fontSize: '1rem',
                }}
              >
                데이터 흐름
              </h3>
              <p
                style={{
                  color: 'var(--text-secondary)',
                  fontSize: '0.88rem',
                  lineHeight: '1.75',
                  margin: '0 0 0.65rem',
                }}
              >
                시퀀스 다이어그램은 도메인별로 두지 않고 통합 페이지에만 있습니다.
              </p>
              <Link
                to="/domains/flows?tab=recommendation"
                style={{
                  color: 'var(--link-color)',
                  fontWeight: 600,
                  textDecoration: 'none',
                }}
              >
                Recommendation 시퀀스 보기 →
              </Link>
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
                A. 이벤트 기반 수집 — 본 기능을 막지 않음
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
                {li('커뮤니티 게시글: 제목·본문 → CommunityPostCreatedEvent')}
                {li('케어 요청: 요청 내용 → CareRequestCreatedEvent')}
                {li(
                  '주변서비스 검색어: LocationServiceService.publishSearchEvent → LocationSearchPerformedEvent (로그인만)',
                )}
                {li(
                  'Python 분석 실패·타임아웃이어도 글 작성·케어 요청·검색 응답은 그대로 성공',
                )}
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
                B. Python NLP — PetIntentClient
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
                  'POST /api/pet-intent/analyze — intentDomain, intent, recommendedCategories, confidence, intentTags',
                )}
                {li(
                  '명확한 키워드는 rule 우선, 애매한 입력은 intent example 유사도(embedding fallback 포함)',
                )}
                {li(
                  '예: "강아지가 귀를 자꾸 긁어요" → MEDICAL · 동물병원 (confidence 0.88)',
                )}
              </ul>
              <CodeBlock>{`// PetIntentClient — 실패 시 Optional.empty(), 본 요청 무영향
POST http://localhost:8000/api/pet-intent/analyze
{
  "text": "강아지가 귀를 자꾸 긁어요",
  "petType": null
}`}</CodeBlock>
            </Card>

            <Card style={{ marginBottom: '1rem' }}>
              <h3
                style={{
                  marginBottom: '0.75rem',
                  color: 'var(--text-color)',
                  fontSize: '1rem',
                }}
              >
                C. Signal 저장 — 개인정보·TTL
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
                {li('저장: intent_domain, intent, recommended_categories(JSON), confidence, tags')}
                {li('미저장: 커뮤니티·케어·검색어 원문')}
                {li('saveIfConfident: confidence ≥ 0.6, expires_at 7일')}
                {li('LOCATION_SEARCH source_id는 null')}
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
                D. 프론트 카드 → Location 검색
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
                  '주변서비스 탭 활성 시 GET /api/pet-recommend/signals (비로그인·토큰 없으면 호출 안 함)',
                )}
                {li(
                  'LocationControls: cardMessage(이유) + actionLabel(CTA), 클릭 시 targetCategory → locationCategory',
                )}
                {li(
                  '추천 API는 장소 목록을 내리지 않음 — 지도 중심·반경·sort는 프론트가 Location search에 전달',
                )}
              </ul>
              <CodeBlock>{`GET /api/location-services/search
  ?latitude={lat}&longitude={lng}&radius={radius}
  &category=동물병원   // 카드 클릭 후`}</CodeBlock>
            </Card>

            <Card>
              <h3
                style={{
                  marginBottom: '0.75rem',
                  color: 'var(--text-color)',
                  fontSize: '1rem',
                }}
              >
                E. 점수 기반 장소 API (카드와 별도)
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
                  'GET /api/pet-recommend?lat&lng&text&radius — PetRecommendScoreCalculator (거리·평점·리뷰·place score·tag match)',
                )}
                {li(
                  '주변서비스 탭 카드는 §D 카테고리 진입점 추천이 중심 — 점수 API는 텍스트+좌표 기반 장소 순위용',
                )}
                {li(
                  'place_score·tag_match는 태그·score 데이터가 쌓인 뒤 효과가 커짐 — 초기에는 거리·평점·리뷰 검증 중심',
                )}
              </ul>
            </Card>
          </section>

          <section
            id="limits"
            style={{ marginBottom: '3rem', scrollMarginTop: '2rem' }}
          >
            <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>
              한계 &amp; 다음 개선
            </h2>
            <Card>
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
                  'Python NLP 서버 미기동 시 signal이 쌓이지 않아 카드 없음 — 검색·게시·케어는 정상',
                )}
                {li('비로그인: signal 저장·/signals 조회 없음')}
                {li(
                  'confidence 0.6 미만·만료 signal — 카드 미표시, 기본 주변서비스만',
                )}
                {li(
                  'NLP recommendedCategories와 Location category 문자열 불일치 시 카드→검색 연결 품질 저하 가능',
                )}
              </ul>
            </Card>
          </section>

          <section
            id="docs"
            style={{ marginBottom: '3rem', scrollMarginTop: '2rem' }}
          >
            <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>
              관련 페이지
            </h2>
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
                    href={PETORY_PET_RECOMMEND_CONTROLLER}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: 'var(--link-color)', textDecoration: 'none' }}
                  >
                    PetRecommendationController.java
                  </a>
                  {' — /signals · /pet-recommend'}
                </li>
                <li>
                  •{' '}
                  <a
                    href={PETORY_PET_INTENT_CLIENT}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: 'var(--link-color)', textDecoration: 'none' }}
                  >
                    PetIntentClient.java
                  </a>
                  {' — NLP 호출·timeout'}
                </li>
                <li>
                  •{' '}
                  <a
                    href={PETORY_INTENT_SIGNAL_ENTITY}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: 'var(--link-color)', textDecoration: 'none' }}
                  >
                    UserPetIntentSignal.java
                  </a>
                  {' — signal 엔티티'}
                </li>
                <li>
                  •{' '}
                  <a
                    href={PETORY_NLP_INTENT_ROUTER}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: 'var(--link-color)', textDecoration: 'none' }}
                  >
                    pet_intent_router.py
                  </a>
                  {' — petory-nlp-server'}
                </li>
                <li>
                  •{' '}
                  <a
                    href={PETORY_RECOMMENDATION_DOC}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: 'var(--link-color)', textDecoration: 'none' }}
                  >
                    recommendation.md (Petory)
                  </a>
                  {' — 흐름·API·프론트·로컬 실행'}
                </li>
                <li>
                  •{' '}
                  <Link
                    to="/domains/location"
                    style={{ color: 'var(--link-color)', textDecoration: 'none' }}
                  >
                    Location 도메인
                  </Link>
                  {' — 카드 클릭 후 category 검색·통합 지도'}
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

export default RecommendationDomainV2;
