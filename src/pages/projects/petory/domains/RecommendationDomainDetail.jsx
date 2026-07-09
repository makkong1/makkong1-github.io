import { Link } from 'react-router-dom';
import TableOfContents from '../../../../components/Common/TableOfContents';

// Recommendation 도메인 상세 작업 로그 (아카이브)
// - 기존 RecommendationDomainOptimization(NLP 호출·부하 제어) + RecommendationDomainRefactoring(버그·리팩토링) 통합
const entryPoints = [
  ['게시글 작성', 'AFTER_COMMIT + @Async', '순간 몰림 시 대기열 관리'],
  ['케어 요청 작성', 'AFTER_COMMIT + @Async', '순간 몰림 시 대기열 관리'],
  ['주변서비스 검색', '@EventListener + @Async', '과호출 차단 정책 필요'],
  ['GET /api/pet-recommend', '동기 호출', '응답 지연·텍스트 길이 제한'],
];

const executorRows = [
  ['corePoolSize', '2', '평상시 처리 스레드'],
  ['maxPoolSize', '6', '대기열 포화 후 확장'],
  ['queueCapacity', '500', '대기열 무한 증가 방지'],
  ['reject 정책', 'DiscardWithWarnPolicy', '경고 로그 후 작업 폐기'],
];

const bugRows = [
  ['T1', '트랜잭션 롤백 시 dangling signal', '@Async listener가 commit 전 NLP·저장', 'Board/Care는 AFTER_COMMIT, LocationSearch는 @EventListener 유지'],
  ['T2', '변경 API 인가 미명시', '/signals·/interact에 @PreAuthorize 없음', '@PreAuthorize("isAuthenticated()") + null 방어'],
  ['T3', 'text 길이 무제한', '임의 길이 → NLP·URL 부하', '@Size(max=500) + @Validated'],
  ['T4', 'Python router 예외 미처리', 'classify 실패 시 FastAPI 기본 500', 'try/except + HTTPException + 로깅'],
  ['T5', 'interactionType 임의 문자열 저장', 'type=DROP_TABLE 등 그대로 저장', 'VIEW|NAVIGATE|FAVORITE enum 검증'],
];

const refactorRows = [
  ['R1', 'Controller → Service 레이어 정리 (Repository 직접 주입 제거)'],
  ['R2', 'findActiveByUser LIMIT 10 (만료 signal 전량 조회 방지)'],
  ['R3', '(userIdx, intentDomain) 유효 signal 있으면 저장 스킵'],
  ['R4', 'Object[] → LocationInteractionCount record (프로젝션 타입 안전)'],
  ['R5', 'NLP 응답 DTO @Data 제거 → @Getter (setter 노출 차단)'],
  ['R6', '(미적용) intent_tags.yml 로드하지만 사실상 미사용 — 정리 후보'],
  ['R7', 'petType 파라미터를 분류 로직에서 쓰지 않는다는 의도적 결정을 docstring으로 명시'],
  ['R8', '임베딩 모델 warmup (첫 요청 타임아웃 방지)'],
  ['R9', 'confidence 이중 threshold(Python 0.45 / Spring 0.60) 문서화'],
];

function RecommendationDomainDetail() {
  const sections = [
    { id: 'intro', title: '개요' },
    { id: 'nlp-control', title: 'NLP 호출 · 부하 제어' },
    { id: 'instant-api', title: '즉시 추천 API · 건강 알림' },
    { id: 'bugs', title: '버그 · 보안 수정' },
    { id: 'backlog', title: '리팩토링 백로그' },
    { id: 'docs', title: '원문 문서' },
  ];

  const card = { padding: '1.5rem', backgroundColor: 'var(--card-bg)', borderRadius: '8px', border: '1px solid var(--nav-border)' };
  const pre = { padding: '1rem', backgroundColor: 'var(--bg-color)', borderRadius: '6px', overflow: 'auto', fontSize: '0.8rem', color: 'var(--text-secondary)', whiteSpace: 'pre-wrap' };
  const th = { padding: '0.55rem 0.75rem', textAlign: 'left', color: 'var(--text-color)' };
  const td = { padding: '0.55rem 0.75rem', verticalAlign: 'top' };
  const tdKey = { ...td, color: 'var(--text-color)', whiteSpace: 'nowrap' };

  return (
    <div className="domain-page-wrapper" style={{ padding: '2rem 0' }}>
      <div className="domain-page-container" style={{ display: 'flex', gap: '2rem', alignItems: 'flex-start' }}>
        <div className="domain-page-content" style={{ flex: 1 }}>
          <div style={{ marginBottom: '1rem' }}>
            <Link to="/domains/recommendation" style={{ color: 'var(--link-color)', textDecoration: 'none', fontSize: '0.9rem' }}>
              ← Recommendation 도메인으로 돌아가기
            </Link>
          </div>
          <h1 style={{ marginBottom: '0.5rem', color: 'var(--text-color)' }}>Recommendation 도메인 — NLP 연동 상세</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '2rem', lineHeight: 1.7 }}>
            느린 외부 NLP 의존성을 핵심 트랜잭션에서 분리하고, 과호출·순간 몰림을 제어한 작업입니다.
            아키텍처 전체는 <Link to="/domains/recommendation" style={{ color: 'var(--link-color)', textDecoration: 'none' }}>Recommendation 도메인</Link>에서 볼 수 있습니다. (2026-05-31 코드 리뷰 기준)
          </p>

          {/* 1. 개요 */}
          <section id="intro" style={{ marginBottom: '3rem', scrollMarginTop: '2rem' }}>
            <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>개요</h2>
            <div className="section-card" style={card}>
              <p style={{ lineHeight: '1.8', color: 'var(--text-secondary)', margin: '0 0 1rem' }}>
                모든 Python 호출은 <code>PetIntentClient.analyze()</code>로 모입니다. 추천 signal은 <strong style={{ color: 'var(--text-color)' }}>부가 기능</strong>이라, NLP가 실패·지연·폐기돼도 게시글 작성·케어 요청·주변서비스 검색은 성공해야 한다는 원칙으로 설계했습니다.
              </p>
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid var(--nav-border)' }}>
                      <th style={th}>진입점</th><th style={th}>처리</th><th style={th}>비용 성격</th>
                    </tr>
                  </thead>
                  <tbody>
                    {entryPoints.map(([a, b, c], i) => (
                      <tr key={a} style={{ borderBottom: i < entryPoints.length - 1 ? '1px solid var(--nav-border)' : 'none' }}>
                        <td style={{ ...td, color: 'var(--text-color)' }}>{a}</td><td style={td}>{b}</td><td style={td}>{c}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* 2. NLP 호출·부하 제어 */}
          <section id="nlp-control" style={{ marginBottom: '3rem', scrollMarginTop: '2rem' }}>
            <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>NLP 호출 · 부하 제어</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1rem', lineHeight: 1.7 }}>
              성능 수치보다, <strong style={{ color: 'var(--text-secondary)' }}>외부 의존성 격리</strong>가 핵심입니다. @Async는 응답을 Python 지연으로부터 보호할 뿐 호출 비용을 없애지 않아, "언제 부를지"와 "과부하 시 어떻게 버릴지"를 함께 설계했습니다.
            </p>

            <div className="section-card" style={{ ...card, marginBottom: '1rem' }}>
              <h3 style={{ marginBottom: '0.5rem', color: 'var(--text-color)' }}>Location 검색 — 2단 필터로 과호출 차단</h3>
              <p style={{ color: 'var(--text-secondary)', lineHeight: '1.75', fontSize: '0.9rem', marginBottom: '0.5rem' }}>
                카테고리·정렬·반경만 바꿔도 같은 검색어에 Python이 반복 호출됩니다. signal 중복 저장을 막아도 호출 비용은 이미 발생하므로, 호출 자체를 앞단에서 좁혔습니다.
              </p>
              <pre style={pre}>
{`LocationSearchPerformedEvent 수신
  → [필터 1] 자연어 휴리스틱: length >= 7 AND 공백 포함
  → [필터 2] Redis dedup: 같은 사용자+검색어 10분 이내 → 생략
  → [Redis 장애 시] 안전 쪽으로 차단(호출 생략, fail-closed)
  → 통과 시에만 PetIntentClient.analyze()`}
              </pre>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.84rem', marginTop: '0.5rem', marginBottom: 0 }}>MVP 한계: 공백 없는 자연어(`강아지가귀를긁어요`)는 필터 통과 불가 — 과호출 방지를 우선한 타협.</p>
              <p style={{ color: 'var(--text-muted)', lineHeight: '1.6', margin: '0.5rem 0 0', fontSize: '0.8rem' }}>
                이유: 대규모 트래픽 버스트가 아니라 검색 파라미터만 바꿔도 같은 검색 의도로 반복 호출되는 게 문제라, 트래픽 제한이 아니라 호출 자체를 앞단에서 걸러내는 정책(휴리스틱+dedup)을 택함.
              </p>
            </div>

            <div className="section-card" style={{ ...card, marginBottom: '1rem' }}>
              <h3 style={{ marginBottom: '0.5rem', color: 'var(--text-color)' }}>NLP 전용 실행 풀 (petIntentExecutor)</h3>
              <p style={{ color: 'var(--text-secondary)', lineHeight: '1.75', fontSize: '0.9rem', marginBottom: '0.5rem' }}>
                NLP를 전용 풀로 격리해 알림·채팅방 생성 등 다른 @Async와 자원을 분리했습니다. 대기열이 차면 signal 생성을 포기하는 게 허용된 설계상 타협입니다. (동작: 기본 2 → 대기열 500 → 최대 6 → 거부)
              </p>
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid var(--nav-border)' }}>
                      <th style={th}>설정</th><th style={th}>값</th><th style={th}>의도</th>
                    </tr>
                  </thead>
                  <tbody>
                    {executorRows.map(([a, b, c], i) => (
                      <tr key={a} style={{ borderBottom: i < executorRows.length - 1 ? '1px solid var(--nav-border)' : 'none' }}>
                        <td style={{ ...td, color: 'var(--text-color)' }}>{a}</td><td style={td}>{b}</td><td style={td}>{c}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p style={{ color: 'var(--text-muted)', lineHeight: '1.6', margin: '0.5rem 0 0', fontSize: '0.8rem' }}>
                이유: 기본 @Async executor를 그대로 쓰면 NLP 작업이 알림·채팅방 생성 같은 다른 비동기 작업과 스레드를 공유해 서로 밀어낼 수 있어, 전용 풀로 격리해 자원 경합을 없앰.
              </p>
            </div>

            <div className="section-card" style={card}>
              <h3 style={{ marginBottom: '0.5rem', color: 'var(--text-color)' }}>부가 기능 실패 시 본 기능 유지 (fail-closed)</h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, color: 'var(--text-secondary)', lineHeight: '1.8', fontSize: '0.9rem' }}>
                <li>• Python 3초 타임아웃 · 실패 시 <code>Optional.empty()</code> — 게시글 작성 등 signal 수집 흐름은 원 요청 무영향(즉시 추천 API는 빈 결과 대신 keyword fallback으로 대체, 아래 참고)</li>
                <li>• Redis 중복 방지 장애 → 분석 생략(안전 쪽 차단)</li>
                <li>• 실행 풀 거부 → 경고 로그, signal 미생성</li>
                <li>• confidence Python 0.45 / Spring 0.60 — 2단계 품질 필터</li>
                <li>• 서버 기동 시 임베딩 모델 선로딩 — 첫 요청 지연 완화</li>
              </ul>
              <p style={{ color: 'var(--text-muted)', lineHeight: '1.6', margin: '0.5rem 0 0', fontSize: '0.8rem' }}>
                이유(confidence 이중 threshold): Python 0.45 미만은 UNKNOWN으로 걸러내고, Spring은 그중에서도 0.60 이상만 저장 — 2-pass 필터로 낮은 신뢰도 signal이 쌓이는 걸 막음.
              </p>
            </div>
          </section>

          {/* 2.5. 즉시 추천 API · 건강 알림 */}
          <section id="instant-api" style={{ marginBottom: '3rem', scrollMarginTop: '2rem' }}>
            <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>즉시 추천 API · 건강 알림</h2>

            <div className="section-card" style={{ ...card, marginBottom: '1rem' }}>
              <h3 style={{ marginBottom: '0.5rem', color: 'var(--text-color)' }}>GET /api/pet-recommend — 동기 호출이라 실패해도 결과는 내려준다</h3>
              <p style={{ color: 'var(--text-secondary)', lineHeight: '1.75', fontSize: '0.9rem', marginBottom: '0.5rem' }}>
                다른 3개 진입점(게시글 작성·케어 요청·주변서비스 검색)은 signal 수집이 부가 기능이라 실패해도 빈 결과로 끝나면 되지만, 이 API는 사용자가 직접 호출해 응답을 기다리는 <strong style={{ color: 'var(--text-color)' }}>동기 API</strong>라 NLP가 실패해도 결과를 줘야 합니다.
              </p>
              <pre style={pre}>
{`1. PetIntentClient.analyze(text, petType) 호출
2. NLP 실패 시 fallbackRecommend() 실행
     → 점수 계산 없이 키워드 기반 category 추정 + 거리순 조회 결과를 그대로 반환
3. 분석 성공 시 recommendedCategories[0]을 primary category로 사용
4. LocationServiceRepository.findByRadius(..., category, "distance", 20)
5. 최근 30일 장소 상호작용으로 popularity score 계산
6. PetRecommendScoreCalculator로 점수화
7. 점수 내림차순 상위 10개 반환`}
              </pre>
              <p style={{ color: 'var(--text-muted)', lineHeight: '1.6', margin: '0.5rem 0 0', fontSize: '0.8rem' }}>
                이유: 즉시 추천 API는 사용자가 결과 화면을 기다리는 동기 호출이라 "빈 결과"를 줄 수 없음 — NLP 실패 시에도 키워드 기반 카테고리 추정 + 거리순 조회로 성능 저하 없이 대체 결과를 반환하도록 fallback 경로를 분리.
              </p>
              <div style={{ overflowX: 'auto', marginTop: '0.75rem' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid var(--nav-border)' }}>
                      <th style={th}>점수 항목</th><th style={th}>가중치</th><th style={th}>계산</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr style={{ borderBottom: '1px solid var(--nav-border)' }}><td style={{ ...td, color: 'var(--text-color)' }}>인기도</td><td style={td}>0.35</td><td style={td}>최근 30일 상호작용 건수를 로그 스케일로 0~1 정규화</td></tr>
                    <tr style={{ borderBottom: '1px solid var(--nav-border)' }}><td style={{ ...td, color: 'var(--text-color)' }}>태그 일치</td><td style={td}>0.30</td><td style={td}>intentTags 중 locationTags에 포함된 비율</td></tr>
                    <tr style={{ borderBottom: '1px solid var(--nav-border)' }}><td style={{ ...td, color: 'var(--text-color)' }}>거리</td><td style={td}>0.20</td><td style={td}>1 - distanceM / radiusM (반경 밖은 0)</td></tr>
                    <tr style={{ borderBottom: '1px solid var(--nav-border)' }}><td style={{ ...td, color: 'var(--text-color)' }}>평점</td><td style={td}>0.10</td><td style={td}>rating / 5.0</td></tr>
                    <tr><td style={{ ...td, color: 'var(--text-color)' }}>리뷰 수</td><td style={td}>0.05</td><td style={td}>log10(reviewCount+1) / log10(1001), 상한 1.0</td></tr>
                  </tbody>
                </table>
              </div>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.84rem', marginTop: '0.5rem', marginBottom: 0 }}>fallback 경로는 이 점수 계산을 건너뛰고 거리순 조회 결과를 그대로 반환합니다(정확도보다 응답 지속을 우선).</p>
            </div>

            <div className="section-card" style={card}>
              <h3 style={{ marginBottom: '0.5rem', color: 'var(--text-color)' }}>건강 알림 연동</h3>
              <p style={{ color: 'var(--text-secondary)', lineHeight: '1.75', fontSize: '0.9rem', marginBottom: '0.5rem' }}>
                signal 저장에 성공하면 <code>SignalSavedEvent</code>를 발행하고, <code>PetHealthAlertNotificationHandler</code>가 커밋 이후 비동기로 받아 <code>intentDomain=MEDICAL</code>이면서 <code>urgency=HIGH</code>인 경우에만 알림을 생성합니다.
              </p>
              <pre style={pre}>
{`type: PET_HEALTH_ALERT
title: 반려동물 건강 알림
content: 위급할 수 있어요. 가까운 동물병원에 바로 문의하세요.
relatedType: PET_INTENT_SIGNAL / relatedId: signal id`}
              </pre>
              <p style={{ color: 'var(--text-secondary)', lineHeight: '1.75', fontSize: '0.9rem', margin: '0.5rem 0 0' }}>
                알림은 Notification 도메인의 SSE로 전달됩니다. 프론트는 <code>PET_HEALTH_ALERT</code> 알림 클릭 시 주변서비스 탭을 열어 <code>동물병원</code> 카테고리로 바로 이동시킵니다.
              </p>
              <p style={{ color: 'var(--text-muted)', lineHeight: '1.6', margin: '0.5rem 0 0', fontSize: '0.8rem' }}>
                이유: 의료 관련 긴급 신호는 사용자가 추천 카드를 눌러보길 기다리지 않고 바로 알려야 의미가 있어, signal 저장과 별도 이벤트로 분리해 즉시 알림을 발행하고 클릭 시 행동(병원 찾기)까지 한 번에 연결.
              </p>
            </div>
          </section>

          {/* 3. 버그·보안 수정 */}
          <section id="bugs" style={{ marginBottom: '3rem', scrollMarginTop: '2rem' }}>
            <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>버그 · 보안 수정 (T1~T5)</h2>
            <div className="section-card" style={{ ...card, marginBottom: '1rem' }}>
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid var(--nav-border)' }}>
                      <th style={th}>ID</th><th style={th}>이슈</th><th style={th}>Before</th><th style={th}>After</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bugRows.map(([id, issue, before, after], i) => (
                      <tr key={id} style={{ borderBottom: i < bugRows.length - 1 ? '1px solid var(--nav-border)' : 'none' }}>
                        <td style={tdKey}>{id}</td><td style={{ ...td, color: 'var(--text-color)' }}>{issue}</td><td style={td}>{before}</td><td style={td}>{after}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="section-card" style={card}>
              <h3 style={{ marginBottom: '0.5rem', color: 'var(--text-color)' }}>대표: T1 — AFTER_COMMIT 이벤트 분리</h3>
              <p style={{ color: 'var(--text-secondary)', lineHeight: '1.75', fontSize: '0.9rem', marginBottom: '0.5rem' }}>
                Board/Care는 트랜잭션 안에서 <code>publishEvent()</code> 후 첨부·후처리 예외로 롤백될 수 있습니다. <code>@Async</code> 리스너가 커밋 전에 signal을 저장하면 <code>source_id</code>가 dangling 상태가 됩니다.
              </p>
              <pre style={pre}>
{`// Board / Care — 커밋 후에만 NLP
@TransactionalEventListener(phase = AFTER_COMMIT)
@Async("petIntentExecutor")
public void handle(CommunityPostCreatedEvent event) { ... }

// LocationSearch — 트랜잭션 없음 → @EventListener 유지
@EventListener @Async("petIntentExecutor")
public void handle(LocationSearchPerformedEvent event) { ... }`}
              </pre>
            </div>
          </section>

          {/* 4. 리팩토링 백로그 */}
          <section id="backlog" style={{ marginBottom: '3rem', scrollMarginTop: '2rem' }}>
            <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>리팩토링 백로그 (R1~R9)</h2>
            <div className="section-card" style={card}>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, color: 'var(--text-secondary)', lineHeight: '1.9', fontSize: '0.9rem' }}>
                {refactorRows.map(([id, desc]) => (
                  <li key={id}>• <strong style={{ color: 'var(--text-color)' }}>{id}</strong> {desc}</li>
                ))}
              </ul>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.84rem', marginTop: '0.75rem', marginBottom: 0 }}>R1~R9는 유지보수·확장 관점 정리 (일부 계획 항목 포함).</p>
            </div>
          </section>

          {/* 5. 원문 문서 */}
          <section id="docs" style={{ marginBottom: '3rem', scrollMarginTop: '2rem' }}>
            <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>원문 문서</h2>
            <div className="section-card" style={card}>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, color: 'var(--text-secondary)', lineHeight: '2' }}>
                <li>• <a href="https://github.com/makkong1/Petory/blob/main/docs/refactoring/petRecommendation/pet-recommendation-nlp-traffic-policy-2026-05-31.md" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--link-color)', textDecoration: 'none' }}>NLP 호출·부하 제어 정책 (전문)</a></li>
                <li>• <a href="https://github.com/makkong1/Petory/blob/main/docs/refactoring/petRecommendation/pet-recommendation-refactoring-2026-05-31.md" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--link-color)', textDecoration: 'none' }}>R1~R9 리팩토링 상세</a></li>
                <li>• <a href="https://github.com/makkong1/Petory/blob/main/docs/troubleshooting/petRecommendation/pet-recommendation-bugs-2026-05-31.md" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--link-color)', textDecoration: 'none' }}>T1~T5 버그·보안 시나리오</a></li>
              </ul>
            </div>
          </section>
        </div>
        <TableOfContents sections={sections} />
      </div>
    </div>
  );
}

export default RecommendationDomainDetail;
