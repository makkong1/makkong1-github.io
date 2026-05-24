import { Link } from 'react-router-dom';
import MermaidDiagram from '../../../../components/Common/MermaidDiagram';
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

const PETORY_RECOMMEND_SERVICE =
  'https://github.com/makkong1/Petory/blob/main/backend/main/java/com/linkup/Petory/domain/recommendation/service/RecommendService.java';
const PETORY_RECOMMEND_CLIENT =
  'https://github.com/makkong1/Petory/blob/main/backend/main/java/com/linkup/Petory/domain/recommendation/client/PetDataApiClient.java';
const PET_DATA_API_POPULAR =
  'https://github.com/makkong1/pet-data-api/blob/main/app/serving/api/popular.py';
const PET_DATA_API_TRENDS =
  'https://github.com/makkong1/pet-data-api/blob/main/app/serving/api/trends.py';

function RecommendationDomainV2() {
  const sections = [
    { id: 'pillars', title: '핵심 기능' },
    { id: 'intro', title: '도메인 개요' },
    { id: 'design', title: '기술 결정' },
    { id: 'limits', title: '한계 & 개선' },
    { id: 'docs', title: '관련 페이지' },
  ];

  const corePillars = [
    'Petory BFF 역할 분리',
    '이중 타임아웃 설계',
    'request_id 세션 추적',
    'user_ref 익명화',
    'pet-data-api 인기도 집계 API',
  ];

  const flowDiagram = `flowchart TD
    FE["Petory Frontend"]
    RC["RecommendController\\nGET /api/recommend\\nPOST /api/recommend/events"]
    RS["RecommendService\\nJWT userId 확보\\n첫 번째 펫 조회\\nradiusKm=10.0 · topN=5 조립"]
    PR["PetRepository\\nfindByUserIdAndNotDeleted\\n(없으면 pet 생략)"]
    PC["PetDataApiClient\\nX-API-Key · X-Request-Id(UUID 16자)\\n3s timeout"]

    subgraph PDA["pet-data-api (인기도 집계 API)"]
        POPULAR["GET /popular/:context\\nRedis 인기 상호\\nfreshness 스코어"]
        TRENDS["GET /trends/:category\\nRedis 키워드 빈도"]
    end

    EV["POST /events\\n202 Accepted\\nfire-and-forget\\nuser_ref=petory-SHA256(12자)"]

    FE -->|lat·lng·context| RC
    RC --> RS
    RS --> PR
    RS --> PC
    PC -->|GET /popular/:context| POPULAR
    PC -->|GET /trends/:category| TRENDS
    RS -->|recordEvents| EV`;

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
            Recommendation 도메인은 Petory 안에서 추천 점수를 계산하지 않습니다.
            로그인 사용자의 위치와 화면 맥락, 그리고 필요하면 반려동물 프로필만
            조립해 별도의 Pet Data API로 넘기고, 그 JSON 응답을 클라이언트에
            그대로 전달하는 BFF입니다. 저는 이 경계에서 계약 정렬과 타임아웃
            분리, 추천 세션 추적을 위한 부가 API, 그리고 개인정보 최소화를 위한
            user_ref 익명화까지 함께 다뤘습니다.
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
                "추천 기능 붙였다"는 설명만으로는 경계가 안 보입니다. 어디까지가
                메인 앱 책임이고 어디부터가 데이터 서버 책임인지, 한 번의 추천을
                두 가지 타임아웃으로 나눈 이유는 무엇인지, 추천 결과를 메인 DB에
                저장하지 않을 때 품질 피드백 루프를 어떻게 남기는지를 명확히
                보여주는 도메인입니다. Petory는 추천 엔진 없이도 멀티스택
                포트폴리오에서 역할이 명확히 나뉜 통합 플로우를 보여 줍니다.
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
                    {['책임', 'Petory (BFF)', 'pet-data-api'].map((h) => (
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
                    ['인증 · 사용자 식별', 'JWT → userId', 'API Key (X-API-Key)'],
                    ['반려 프로필 출처', 'MySQL Pet 테이블', '요청 JSON의 pet 필드'],
                    ['트렌드 키워드', '❌', 'GET /trends — Redis Naver 블로그 집계'],
                    ['인기 상호 랭킹', '❌', 'GET /popular — freshness 스코어 정규화'],
                    ['추천 조립 · 응답', 'Petory BFF가 직접 담당', '데이터 제공만'],
                  ].map(([label, petory, api], i, arr) => (
                    <tr
                      key={label}
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
                        {label}
                      </td>
                      <td style={{ padding: '0.55rem 0.75rem' }}>{petory}</td>
                      <td
                        style={{
                          padding: '0.55rem 0.75rem',
                          color: 'var(--text-color)',
                          fontWeight: 600,
                        }}
                      >
                        {api}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Card>

            <Card>
              <h3
                style={{
                  marginBottom: '0.75rem',
                  color: 'var(--text-color)',
                  fontSize: '1rem',
                }}
              >
                데이터 흐름
              </h3>
              <MermaidDiagram chart={flowDiagram} />
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
                A. Petory BFF — 맥락 조립과 프록시
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
                {li('GET /api/recommend — JWT 기반 userId 확보, lat·lng·context 쿼리 파라미터')}
                {li('PetRepository.findByUserIdAndNotDeleted → 첫 번째 펫만 PetInfo로 매핑 (없으면 pet 필드 생략)')}
                {li('radiusKm=10.0, topN=5 서버 고정값 — 프론트가 조작 불가')}
                {li('추천 점수·랭킹·시설 검색은 모두 pet-data-api 책임 — Petory는 결과를 그대로 반환')}
              </ul>
              <CodeBlock>{`// RecommendService.recommend
public RecommendResponse recommend(String userId, double lat, double lng, String context) {
    // 1. 첫 번째 펫 조립 (없으면 null)
    RecommendRequest.PetInfo petInfo = findPetInfo(userId);

    // 2. 고정값 radiusKm / topN 포함 요청 조립
    RecommendRequest request = RecommendRequest.builder()
        .lat(lat).lng(lng).context(context)
        .radiusKm(10.0).topN(5)
        .pet(petInfo).build();

    // 3. pet-data-api로 위임 — 추천 로직 없음
    return petDataApiClient.recommend(request);
}

private RecommendRequest.PetInfo findPetInfo(String userId) {
    List<Pet> pets = petRepository.findByUserIdAndNotDeleted(userId);
    if (pets.isEmpty()) return null;
    Pet pet = pets.get(0);               // 첫 번째 펫만 사용
    return RecommendRequest.PetInfo.builder()
        .species(pet.getSpecies()).breed(pet.getBreed())
        .age(pet.getAge()).name(pet.getName()).build();
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
                B. 타임아웃 설계 — 외부 API 장애 반경 제한
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
                {li('signalClient (3s) — pet-data-api 데이터 읽기(GET /popular, GET /trends)는 Redis 조회이므로 짧은 타임아웃으로 충분')}
                {li('타임아웃 초과 시 사용자에게 5xx가 바로 전달됨 — Resilience4j 폴백 도입 여지')}
                {li('pet-data-api가 Redis 미연결로 503을 반환하면 Petory도 5xx — readyz 체크 선행 필요')}
              </ul>
              <CodeBlock>{`// PetDataApiClient — 단일 RestClient (인기도 집계 API는 Redis 조회로 빠름)
public PetDataApiClient(
        @Value("\${app.pet-data-api.base-url}") String baseUrl,
        @Value("\${app.pet-data-api.api-key}") String apiKey,
        @Value("\${app.pet-data-api.timeout-ms:3000}") long timeoutMs) {

    this.signalClient = buildClient(baseUrl, apiKey, timeoutMs); // 3s
}

public PopularResponse getPopular(String context, int limit) {
    return signalClient.get()
        .uri("/popular/{context}?limit={limit}", context, limit)
        .header("X-API-Key", apiKey)
        .header("X-Request-Id", newRequestId())
        .retrieve()
        .body(PopularResponse.class);
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
                C. request_id 세션 추적 + 이벤트 fire-and-forget
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
                {li('X-Request-Id = UUID 32자 중 앞 16자 — 모든 호출에 전송')}
                {li('본 추천 응답의 request_id를 /copy·/events 재사용 → pet-data-api에서 한 세션으로 로그 묶기')}
                {li('POST /events → 202 Accepted, sendEvents 내부 예외는 모두 삼킴 — 사용자 차단 없음')}
                {li('pet-data-api persist_recommendation_log도 async non-blocking — 응답 지연 없음')}
              </ul>
              <CodeBlock>{`// PetDataApiClient.recommend — X-Request-Id 생성 및 전송
private String newRequestId() {
    return UUID.randomUUID().toString().replace("-", "").substring(0, 16);
}

// 응답 request_id를 /copy · /events에서 재사용 (한 추천 세션 = 한 request_id)

// sendEvents — fire-and-forget
public void sendEvents(RecommendEventRequest req) {
    try {
        recommendClient.post().uri("/events/recommendation").body(req)...;
    } catch (Exception e) {
        log.warn("[PetDataApiClient/events] 실패(무시): {}", e.getMessage());
        // 사용자 응답 차단 안 함
    }
}

// RecommendController — POST /events → 202 Accepted
@PostMapping("/events")
public ResponseEntity<Void> recordEvents(...) {
    recommendService.recordEvents(userId, body);
    return ResponseEntity.accepted().build(); // 202
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
                D. user_ref 익명화 — 개인정보 최소화
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
                {li('이벤트 전송 시 원본 userId를 외부 로그에 그대로 남기지 않음')}
                {li('user_ref = "petory-" + SHA-256(userId).hex의 앞 12자 → 외부 서비스 식별은 가능, 역추적 불가')}
                {li('클라이언트가 user_ref를 넘기지 않은 경우에만 서버가 채움 — 선택적 적용')}
              </ul>
              <CodeBlock>{`// RecommendService.hashUserId
private static String hashUserId(String userId) {
    try {
        MessageDigest md = MessageDigest.getInstance("SHA-256");
        byte[] hash = md.digest(userId.getBytes(StandardCharsets.UTF_8));
        // "petory-" + hex 앞 12자 → 외부 로그 식별용, 역추적 불가
        return "petory-" + HexFormat.of().formatHex(hash).substring(0, 12);
    } catch (NoSuchAlgorithmException e) {
        return "petory-unknown";
    }
}

// recordEvents — user_ref가 없을 때만 서버가 채움
public void recordEvents(String userId, RecommendEventRequest body) {
    String userRef = (body.userRef() != null && !body.userRef().isBlank())
        ? body.userRef()
        : hashUserId(userId);
    RecommendEventRequest enriched = body.toBuilder().userRef(userRef).build();
    petDataApiClient.sendEvents(enriched);
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
                E. pet-data-api — 인기도 집계 API 설계
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
                {li('PostgreSQL·LLM·Kakao를 제거하고 Redis 단일 저장소로 재설계. 추천 엔진이 아닌 인기도 집계 API.')}
                {li('GET /trends/{category}: 네이버 블로그 포스트를 kiwipiepy 형태소 분석 후 키워드 빈도를 Redis에 집계.')}
                {li('GET /popular/{context}: 블로그 언급 상호명에 freshness 스코어(mention_count × max(0, 1 − age_days/180))를 적용해 정규화 후 Redis 적재.')}
                {li('컨텍스트 9개: grooming · hospital · supplies · pharmacy · cafe · pension · restaurant · boarding · hotel')}
                {li('APScheduler 18:00 트렌드 / 18:10 인기 배치. max_instances=1로 동시 실행 방지.')}
                {li('키 누락(배치 미실행) 시 503 반환 — "데이터 없음"을 명확히 표현.')}
              </ul>
              <CodeBlock>{`# pet-data-api serving/api/popular.py (요약)

VALID_CONTEXTS = {
    "grooming","hospital","supplies","pharmacy",
    "cafe","pension","restaurant","boarding","hotel"
}

@router.get("/popular/{context}")
async def get_popular(context: str, limit: int = 10, redis=Depends(get_redis)):
    # 별칭 매핑: snack/food/clothes → supplies
    resolved = ALIAS_MAP.get(context, context)
    if resolved not in VALID_CONTEXTS:
        raise HTTPException(status_code=422)

    raw = await redis.get(f"popular:{resolved}")
    if raw is None:
        raise HTTPException(status_code=503, detail="batch not run yet")

    items = json.loads(raw)
    return items[:limit]

# freshness 스코어 (ingestion/blog.py)
freshness_weight = max(0, 1 - age_days / 180)
raw_score = mention_count * avg_freshness
score = raw_score / max(raw_scores)  # 최댓값 정규화`}</CodeBlock>
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
                  '단일 펫만 매핑: 다반려 가구는 항상 첫 번째 펫만 반영 — 선택 UI + 백엔드 계약 확장 여지'
                )}
                {li(
                  '외부 장애 = 사용자 5xx: pet-data-api 호출 실패 시 Resilience4j 폴백 없음 — 서킷 브레이커 도입 여지'
                )}
                {li(
                  'context 문자열 계약: 프론트·pet-data-api의 VALID_CONTEXTS 9개를 동기화해야 함 — 타입 안전 계약 관리 필요'
                )}
                {li(
                  'pet-data-api는 집계 데이터만 제공: 추천 조립(시설 선택, 메시지 생성)은 Petory BFF가 직접 담당해야 함'
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
                    href={PETORY_RECOMMEND_SERVICE}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: 'var(--link-color)', textDecoration: 'none' }}
                  >
                    RecommendService.java
                  </a>
                  {' — BFF 맥락 조립, user_ref 해싱'}
                </li>
                <li>
                  •{' '}
                  <a
                    href={PETORY_RECOMMEND_CLIENT}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: 'var(--link-color)', textDecoration: 'none' }}
                  >
                    PetDataApiClient.java
                  </a>
                  {' — 이중 타임아웃 RestClient, fire-and-forget'}
                </li>
                <li>
                  •{' '}
                  <a
                    href={PET_DATA_API_POPULAR}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: 'var(--link-color)', textDecoration: 'none' }}
                  >
                    pet-data-api popular.py
                  </a>
                  {' — GET /popular/{context} freshness 스코어링'}
                </li>
                <li>
                  •{' '}
                  <a
                    href={PET_DATA_API_TRENDS}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: 'var(--link-color)', textDecoration: 'none' }}
                  >
                    pet-data-api trends.py
                  </a>
                  {' — GET /trends/{category} Redis 키워드 조회'}
                </li>
                <li>
                  •{' '}
                  <Link
                    to="/domains/recommendation/pet-data-api"
                    style={{ color: 'var(--link-color)', textDecoration: 'none' }}
                  >
                    pet-data-api 포트폴리오 페이지
                  </Link>
                  {' — 수집 파이프라인·아키텍처·기술 판단 상세'}
                </li>
                <li>
                  •{' '}
                  <Link
                    to="/domains/location"
                    style={{ color: 'var(--link-color)', textDecoration: 'none' }}
                  >
                    Location 도메인
                  </Link>
                  {' — 주변 시설 검색 (Recommendation과 목적 중복, 통합 예정)'}
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
