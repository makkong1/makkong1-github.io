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
const PET_DATA_API_RECOMMEND =
  'https://github.com/makkong1/pet-data-api/blob/main/app/serving/api/recommend.py';

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
    'pet-data-api 이중 파이프',
  ];

  const flowDiagram = `flowchart TD
    FE["Petory Frontend"]
    RC["RecommendController\\nGET /api/recommend\\nPOST /api/recommend/copy\\nPOST /api/recommend/events\\nGET /api/recommend/trends/..."]
    RS["RecommendService\\nJWT userId 확보\\n첫 번째 펫 조회\\nradiusKm=10.0 · topN=5 조립"]
    PR["PetRepository\\nfindByUserIdAndNotDeleted\\n(없으면 pet 생략)"]
    PC["PetDataApiClient\\nX-API-Key · X-Request-Id(UUID 16자)"]

    subgraph Clients["RestClient 분리"]
        RC1["recommendClient\\n3s timeout"]
        RC2["copyClient\\n35s timeout"]
    end

    subgraph PDA["pet-data-api"]
        CP["Context pipe\\nENRICHED_CONTEXTS 9개\\nNaver blog + Kakao POI\\n5-signal ranking\\nversion={ctx}-mvp-v1"]
        LP["Legacy pipe\\n공공DB top_n만\\nrule/LLM copy\\nversion=legacy"]
    end

    EV["POST /events\\n202 Accepted\\nfire-and-forget\\nuser_ref=petory-SHA256(12자)"]

    FE -->|lat·lng·context| RC
    RC --> RS
    RS --> PR
    RS --> PC
    PC --> RC1
    PC --> RC2
    RC1 -->|POST /recommend| CP & LP
    RC2 -->|POST /recommend/copy| PDA
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
                    ['시설 검색 · 랭킹', '❌', 'PostgreSQL + 5-signal 가중합'],
                    ['트렌드', '❌', 'Redis Naver 집계'],
                    ['추천 문구 생성', '❌', 'LLM → 규칙 기반 폴백'],
                    ['추천 결과 영속', '❌ (프록시만)', 'persist_log async 기록'],
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
                B. 이중 타임아웃 — UX와 장애 반경 분리
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
                {li('recommendClient (3s) — 본 추천: 시설·트렌드 응답, UX 블로킹 최소화')}
                {li('copyClient (35s) — LLM 추천 문구: 동기 대기를 분리해 본 추천 장애 전파 차단')}
                {li('/recommend/copy 호출 시 서버가 DB에서 펫 정보를 다시 조회 — 클라이언트 조작 방지')}
                {li('두 경로 타임아웃이 달라 LLM 지연이 시설 조회 응답에 영향을 주지 않음')}
              </ul>
              <CodeBlock>{`// PetDataApiClient — 이중 RestClient 초기화
public PetDataApiClient(
        @Value("\${app.pet-data-api.base-url}") String baseUrl,
        @Value("\${app.pet-data-api.api-key}") String apiKey,
        @Value("\${app.pet-data-api.timeout-ms:3000}") long timeoutMs,
        @Value("\${app.pet-data-api.copy-timeout-ms:35000}") long copyTimeoutMs) {

    this.recommendClient = buildClient(baseUrl, apiKey, timeoutMs);   // 3s
    this.copyClient      = buildClient(baseUrl, apiKey, copyTimeoutMs); // 35s
}

// /recommend/copy: 서버가 DB에서 펫 컨텍스트를 직접 재조립
public RecommendCopyResponse recommendCopy(String userId, RecommendCopyRequest body) {
    RecommendRequest.PetInfo petInfo = findPetInfo(userId); // 클라이언트 값 불신
    RecommendCopyRequest enriched = body.toBuilder().pet(petInfo).build();
    return copyClient.post().uri("/recommend/copy").body(enriched)...;
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
                E. pet-data-api 이중 파이프라인
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
                {li('Context pipe: GROOMING_MVP_ENABLED + ENRICHED_CONTEXTS 9개 — grooming·hospital·supplies 등')}
                {li('  공공DB 4배 여유 조회 → Naver 블로그 멘션 추출 → Kakao POI 보강 → 5-signal 2단계 랭킹')}
                {li('  5 signals: distance · mention_count · pet_match · trend_match · interaction_history 가중합')}
                {li('  version = "{context}-mvp-v1" (예: grooming-mvp-v1)')}
                {li('Legacy pipe: 공공DB top_n만 조회, rule/LLM 카피, version = "legacy"')}
                {li('/recommend/copy: LLM 생성 실패 시 규칙 기반 폴백, source 필드("llm"/"rule")로 구분')}
                {li('persist_recommendation_log: async 기록 — 실패해도 응답에 영향 없음')}
              </ul>
              <CodeBlock>{`# pet-data-api serving/api/recommend.py (요약)

ENRICHED_CONTEXTS = {
    "grooming","hospital","supplies","pharmacy",
    "cafe","pension","restaurant","boarding","hotel"
}

@router.post("/recommend")
async def recommend(req: RecommendRequest):
    if GROOMING_MVP_ENABLED and req.context in ENRICHED_CONTEXTS:
        # Context pipe — 5-signal ranking
        facilities = await get_nearby_facilities(req, top_n * 4)  # 4배 여유

        mentions  = await extract_context_mentions(...)   # Naver blog, 실패 시 []
        kakao_map = await search_kakao_places(...)        # Kakao POI, 실패 시 {}

        ranked = rank_grooming_facilities(facilities, mentions, kakao_map) # 1차
        ranked = rank_facilities(ranked, SignalContext(req, mentions, trends)) # 2차 (5-signal)

        copy    = build_context_copy(req.context, ranked, trends)
        version = f"{req.context}-mvp-v1"
    else:
        # Legacy pipe
        facilities = await get_nearby_facilities(req, req.top_n)
        copy    = build_copy_llm_or_rule(...)  # LLM → rule fallback
        version = "legacy"

    asyncio.create_task(persist_recommendation_log(...))  # 비동기, 실패 무관

    return RecommendResponse(
        request_id=req.request_id, recommend_version=version,
        facilities=ranked, trends=trends,
        recommendation=copy, generated_at=now()
    )`}</CodeBlock>
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
                  '외부 장애 = 사용자 5xx: 본 추천·카피 실패 시 Resilience4j 폴백 없음 — 서킷 브레이커 도입 여지'
                )}
                {li(
                  'context 문자열 계약: 프론트·pet-data-api·기획 간 ENRICHED_CONTEXTS 동기화 필요 — 타입 안전 계약 관리 필요'
                )}
                {li(
                  'Location 도메인 중복: "주변 서비스 추천" 목적이 겹침 — pet-data-api 안정화 후 Location 경로 통합 또는 제거 예정'
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
                    href={PET_DATA_API_RECOMMEND}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: 'var(--link-color)', textDecoration: 'none' }}
                  >
                    pet-data-api recommend.py
                  </a>
                  {' — Context pipe / Legacy pipe 이중 파이프라인'}
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
