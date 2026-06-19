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
const PETORY_SIGNAL_LISTENER =
  'https://github.com/makkong1/Petory/blob/main/backend/main/java/com/linkup/Petory/domain/petRecommendation/service/PetIntentSignalEventListener.java';
const PETORY_SIGNAL_SERVICE =
  'https://github.com/makkong1/Petory/blob/main/backend/main/java/com/linkup/Petory/domain/petRecommendation/service/UserPetIntentSignalService.java';
const PETORY_RECOMMENDATION_SERVICE =
  'https://github.com/makkong1/Petory/blob/main/backend/main/java/com/linkup/Petory/domain/petRecommendation/service/PetRecommendationService.java';
const PETORY_HEALTH_ALERT_HANDLER =
  'https://github.com/makkong1/Petory/blob/main/backend/main/java/com/linkup/Petory/domain/petRecommendation/service/PetHealthAlertNotificationHandler.java';
const PETORY_NLP_INTENT_ROUTER =
  'https://github.com/makkong1/Petory/blob/main/petory-nlp-server/app/api/pet_intent_router.py';
const PETORY_NLP_INTENT_CLASSIFIER =
  'https://github.com/makkong1/Petory/blob/main/petory-nlp-server/app/nlp/intent_classifier.py';
const PETORY_NLP_TAG_EXTRACTOR =
  'https://github.com/makkong1/Petory/blob/main/petory-nlp-server/app/nlp/tag_extractor.py';
const PETORY_RECOMMENDATION_DOC =
  'https://github.com/makkong1/Petory/blob/main/docs/domains/recommendation.md';
const PETORY_REFACTOR_DOC =
  'https://github.com/makkong1/Petory/blob/main/docs/refactoring/petRecommendation/pet-recommendation-refactoring-2026-05-31.md';
const PETORY_TRAFFIC_DOC =
  'https://github.com/makkong1/Petory/blob/main/docs/refactoring/petRecommendation/pet-recommendation-nlp-traffic-policy-2026-05-31.md';
const PETORY_NLP_ISSUES_DOC =
  'https://github.com/makkong1/Petory/blob/main/docs/troubleshooting/petRecommendation/nlp-server-issues-2026-06-09.md';

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
    '형태소 정밀 매칭',
    '원문 텍스트 미저장',
    '추천 카드 /signals',
    'Location 카테고리 연결',
    'NLP 호출·부하 제어',
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
            Recommendation 도메인은 커뮤니티 글·케어 요청·주변서비스 검색어처럼
            사용자의 최근 반려생활 입력을 분석해, 주변서비스 탭에 추천 카드를
            보여 주는 기능입니다. 장소 목록을 직접 내려주지 않고 「근처
            동물병원 보기」처럼 볼 카테고리만 제안한 뒤, 클릭 시 기존 Location
            검색으로 넘깁니다. 의도 수집 → Python NLP → signal 저장(원문
            미저장)은 이벤트와 `@Async`로 본 트랜잭션과 분리했고, 분석이
            늦거나 실패해도 글 작성·케어 요청·검색은 그대로 성공하도록
            설계했습니다.
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
                domain·urgency별 저장 기준을 넘으면{' '}
                <code>user_pet_intent_signal</code>에 저장합니다(원문 미저장,
                TTL 차등 적용). 주변서비스 탭은{' '}
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
                      'Python 0.45 하한 + domain·urgency별 Spring 저장 threshold, intentDomain 중복 생략, 조회 LIMIT 10',
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
                  'Board/Care: @TransactionalEventListener(AFTER_COMMIT) — rollback 후 dangling signal 방지',
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
                  'POST /api/pet-intent/analyze — intentDomain, intent, recommendedCategories, confidence, keywords, intentTags, urgency, message',
                )}
                {li(
                  '분류 경로 1 (rule): Kiwipiepy 형태소 분석 후 키워드 exact match → 1음절 한글은 형태소 exact match, 구문/3음절+는 raw substring',
                )}
                {li(
                  '분류 경로 2 (embedding): rule miss 시 jhgan/ko-sroberta-multitask 문장 임베딩 + intent centroid 코사인 유사도',
                )}
                {li(
                  '예: "강아지가 귀를 자꾸 긁어요" → MEDICAL_CONCERN · 동물병원 (rule hit, confidence 0.92)',
                )}
                {li(
                  'petType("DOG"|"CAT"|"OTHER") 수신 → classify(text, pet_type) 전달 — 현재 분류 로직 미사용, DOG/CAT 규칙 확장 예정',
                )}
                {li(
                  'lifespan: 서버 시작 시 임베딩 모델 로드 후 intent centroid warm-up — 첫 요청 지연 방지',
                )}
              </ul>
              <CodeBlock>{`// PetIntentClient — 실패 시 Optional.empty(), 본 요청 무영향
POST http://localhost:8000/api/pet-intent/analyze
{ "text": "강아지가 귀를 자꾸 긁어요", "petType": "DOG" }

// 응답 예시 (rule hit)
{
  "intentDomain": "MEDICAL",
  "intent": "MEDICAL_CONCERN",
  "recommendedCategories": ["동물병원", "동물약국"],
  "confidence": 0.92,
  "keywords": ["강아지", "귀", "긁"],
  "intentTags": ["ear", "scratch"],
  "urgency": "NORMAL",
  "message": "ear, scratch 불편 표현이 감지되었습니다. ..."
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
                {li(
                  'confidence 의미: rule hit → 0.88~0.92 고정 휴리스틱, embedding → 코사인 유사도 [-1,1]. 두 경로는 직접 비교하지 않음',
                )}
                {li(
                  '2단계 필터: Python 0.45 미만 UNKNOWN(embedding path 하한) → Spring 저장 단계에서 domain·urgency별 threshold 적용',
                )}
                {li(
                  '같은 (userIdx, intentDomain) 유효 signal 있으면 저장 생략 — 카드 중복 방지',
                )}
                {li('TTL: MEDICAL HIGH 1일, MEDICAL 3일, LODGING_TRAVEL 14일, 그 외 7일')}
                {li('/signals 조회 LIMIT 10, LOCATION_SEARCH source_id는 null')}
              </ul>
              <CodeBlock>{`// Spring 저장 threshold
MEDICAL + HIGH        -> 0.55
MEDICAL               -> 0.65
FOOD_SNACK/SUPPLIES
WALK_OUTING/CAFE_DINING -> 0.45
DEFAULT               -> 0.60

// TTL
MEDICAL + HIGH -> 1일
MEDICAL        -> 3일
LODGING_TRAVEL -> 14일
DEFAULT        -> 7일`}</CodeBlock>
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

            <Card style={{ marginBottom: '1rem' }}>
              <h3
                style={{
                  marginBottom: '0.75rem',
                  color: 'var(--text-color)',
                  fontSize: '1rem',
                }}
              >
                E. Location 검색 NLP 호출 정책
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
                  '카테고리·정렬·반경 변경만으로 같은 keyword Python 반복 호출 차단',
                )}
                {li(
                  '필터 1: length ≥ 7 AND 공백 포함 (자연어 MVP 휴리스틱)',
                )}
                {li('필터 2: Redis 사용자+검색어 10분 중복 방지 — 장애 시 분석 생략')}
              </ul>
              <CodeBlock>{`"동물병원" → 생략 | "강아지 귀 긁어요" → 분석 후보`}</CodeBlock>
              <p style={{ margin: '0.75rem 0 0', fontSize: '0.86rem' }}>
                <Link
                  to="/domains/recommendation/optimization"
                  style={{ color: 'var(--link-color)', fontWeight: 600, textDecoration: 'none' }}
                >
                  NLP 호출·부하 제어 상세 →
                </Link>
              </p>
            </Card>

            <Card style={{ marginBottom: '1rem' }}>
              <h3
                style={{
                  marginBottom: '0.75rem',
                  color: 'var(--text-color)',
                  fontSize: '1rem',
                }}
              >
                F. 점수 기반 장소 API (카드와 별도)
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
                  'GET /api/pet-recommend?lat&lng&text&radius&petType — PetRecommendScoreCalculator (거리·평점·리뷰·place score·tag match)',
                )}
                {li(
                  '현재 프론트 주 경로는 /signals 카드 — 점수 API는 백엔드 기능과 확장 포인트로 분리 설명',
                )}
                {li(
                  'place_score·tag_match는 태그·score 데이터가 쌓인 뒤 효과가 커짐 — 초기에는 거리·평점·리뷰 검증 중심',
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
                G. MEDICAL HIGH 건강 알림
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
                  'MEDICAL + HIGH signal 저장 후 SignalSavedEvent 발행 — 주변서비스 카드와 알림 연결',
                )}
                {li(
                  'PetHealthAlertNotificationHandler가 AFTER_COMMIT + @Async로 PET_HEALTH_ALERT 생성',
                )}
                {li('알림 실패는 signal 저장을 롤백하지 않음 — 추천 저장과 후속 알림 책임 분리')}
              </ul>
              <CodeBlock>{`if ("MEDICAL".equals(event.intentDomain())
    && "HIGH".equals(event.urgency())) {
    notificationService.createNotification(
        event.userIdx(), PET_HEALTH_ALERT, ...);
}`}</CodeBlock>
            </Card>

            <Card>
              <h3
                style={{
                  marginBottom: '0.75rem',
                  color: 'var(--text-color)',
                  fontSize: '1rem',
                }}
              >
                H. NLP 품질 개선 — 오탐 수정 & 계약 정합 (2026-06-09)
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
                  'N1: tag_extractor 부분 문자열 매칭 → Kiwi lemma exact match ("귀신"→ear, "눈사람"→eye 오탐 제거)',
                )}
                {li(
                  'N1: tokenizer VV-I/VA-I 추가 — ㅂ/ㅅ 불규칙 어간 미추출 수정 ("가렵"·"붓" 태그 정상화)',
                )}
                {li(
                  'N1: _classify_by_rule 하이브리드 매칭 — 1음절 한글은 형태소, 구문/3음절+는 raw substring ("아파트"→MEDICAL 오탐 방지)',
                )}
                {li(
                  'N2: buildCardMessage 4개 도메인 추가 — FOOD_SNACK, WALK_OUTING, DAYCARE_BOARDING, CULTURE_SPACE',
                )}
                {li(
                  'N5: pet_intent_router → classify(text, pet_type) 계약 연결',
                )}
                {li(
                  'N6: lifespan에서 get_model() 완료 후 warm_up() 순차 호출 — centroid preload로 첫 요청 지연 방지',
                )}
                {li(
                  '회귀 테스트 16개 추가 (tests/test_tag_extractor.py) — 오탐 방지 8개 + 정상 분류 8개',
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
                  'domain·urgency별 저장 기준 미달·만료 signal — 카드 미표시, 기본 주변서비스만',
                )}
                {li(
                  'GET /api/pet-recommend 즉시 시설 추천 API는 백엔드에 있으나 현재 프론트 API 래퍼는 /signals만 제공',
                )}
                {li(
                  'GET /api/pet-recommend는 메서드 @PreAuthorize가 없어도 SecurityConfig /api/** catch-all로 실제 접근은 인증 대상',
                )}
                {li('petType은 Python까지 전달되지만 현재 분류 로직에서는 아직 미사용')}
                {li(
                  'NLP recommendedCategories와 Location category 문자열 불일치 시 카드→검색 연결 품질 저하 가능',
                )}
                {li(
                  '공백 없는 자연어 검색어는 NLP 필터 통과 불가 — MVP 설계상 타협',
                )}
                {li(
                  'NLP 전용 실행 풀 대기열(500) 포화 시 일부 signal 생략 — 게시·케어는 정상',
                )}
                {li('Redis 장애 시 Location 검색 NLP 생략(안전 쪽으로 차단)')}
                {li(
                  'SignalInteractionLog 엔티티·레포는 준비되어 있지만 추천 카드 클릭 저장 로직은 아직 없음',
                )}
                {li(
                  'NLP confidence는 rule 경로와 embedding 경로의 의미가 달라 직접 비교하면 안 됨',
                )}
                {li('의료 관련 추천은 진단이 아니라 가까운 동물병원 문의 안내 수준')}
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
                    href={PETORY_SIGNAL_LISTENER}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: 'var(--link-color)', textDecoration: 'none' }}
                  >
                    PetIntentSignalEventListener.java
                  </a>
                  {' — 이벤트 기반 signal 수집'}
                </li>
                <li>
                  •{' '}
                  <a
                    href={PETORY_SIGNAL_SERVICE}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: 'var(--link-color)', textDecoration: 'none' }}
                  >
                    UserPetIntentSignalService.java
                  </a>
                  {' — threshold·TTL·중복 저장 방지'}
                </li>
                <li>
                  •{' '}
                  <a
                    href={PETORY_RECOMMENDATION_SERVICE}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: 'var(--link-color)', textDecoration: 'none' }}
                  >
                    PetRecommendationService.java
                  </a>
                  {' — 즉시 시설 추천·점수 계산'}
                </li>
                <li>
                  •{' '}
                  <a
                    href={PETORY_HEALTH_ALERT_HANDLER}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: 'var(--link-color)', textDecoration: 'none' }}
                  >
                    PetHealthAlertNotificationHandler.java
                  </a>
                  {' — MEDICAL HIGH 건강 알림'}
                </li>
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
                  {' — NLP 호출·타임아웃'}
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
                    href={PETORY_NLP_INTENT_CLASSIFIER}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: 'var(--link-color)', textDecoration: 'none' }}
                  >
                    intent_classifier.py
                  </a>
                  {' — rule first, embedding fallback'}
                </li>
                <li>
                  •{' '}
                  <a
                    href={PETORY_NLP_TAG_EXTRACTOR}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: 'var(--link-color)', textDecoration: 'none' }}
                  >
                    tag_extractor.py
                  </a>
                  {' — 형태소 기반 오탐 방지'}
                </li>
                <li>
                  •{' '}
                  <Link
                    to="/domains/recommendation/refactoring"
                    style={{ color: 'var(--link-color)', textDecoration: 'none' }}
                  >
                    Recommendation 리팩토링
                  </Link>
                  {' — R1~R9, T1~T5, N1~N6 코드·버그 수정'}
                </li>
                <li>
                  •{' '}
                  <Link
                    to="/domains/recommendation/optimization"
                    style={{ color: 'var(--link-color)', textDecoration: 'none' }}
                  >
                    NLP 호출·부하 제어
                  </Link>
                  {' — 전용 실행 풀, 중복 호출 방지, 과부하 유입 제한'}
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
                  <a
                    href={PETORY_REFACTOR_DOC}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: 'var(--link-color)', textDecoration: 'none' }}
                  >
                    pet-recommendation-refactoring-2026-05-31.md
                  </a>
                </li>
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
                </li>
                <li>
                  •{' '}
                  <a
                    href={PETORY_NLP_ISSUES_DOC}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: 'var(--link-color)', textDecoration: 'none' }}
                  >
                    nlp-server-issues-2026-06-09.md
                  </a>
                  {' — N1~N6 오탐·계약 이슈 트러블슈팅'}
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
