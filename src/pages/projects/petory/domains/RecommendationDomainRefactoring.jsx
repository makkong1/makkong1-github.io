import { Link } from 'react-router-dom';
import TableOfContents from '../../../../components/Common/TableOfContents';

const badge = {
  done: { label: '✅ 완료', color: '#16a34a', bg: 'rgba(22,163,74,0.1)' },
  plan: { label: '📋 계획', color: '#6366f1', bg: 'rgba(99,102,241,0.1)' },
};

const refactorRows = [
  {
    id: 'R1',
    title: 'Controller → Service 레이어 정리',
    status: 'done',
    description: 'UsersRepository 컨트롤러 직접 주입 제거, loginId 기반 조회를 Service로 통합',
  },
  {
    id: 'R2',
    title: 'findActiveByUser LIMIT 10',
    status: 'done',
    description: 'PageRequest.of(0, 10) — 만료 signal 전량 조회 방지',
  },
  {
    id: 'R3',
    title: 'intentDomain 중복 signal 방지',
    status: 'done',
    description: '같은 (userIdx, intentDomain) 유효 signal 있으면 저장 스킵',
  },
  {
    id: 'R4',
    title: 'Object[] → LocationInteractionCount record',
    status: 'done',
    description: 'PlaceInteractionLog 집계 프로젝션 타입 안전성',
  },
  {
    id: 'R5',
    title: 'PetIntentAnalyzeResponse @Data 제거',
    status: 'done',
    description: '@Getter + @NoArgsConstructor — NLP 결과 DTO setter 노출 제거',
  },
  {
    id: 'R6',
    title: 'intent_tags.yml 정리',
    status: 'plan',
    description: 'YAML 로드 대비 실사용은 _KO_TAG_MAP — 배포 전 Option A/B 검토',
  },
  {
    id: 'R7',
    title: 'petType MVP 미사용 명시',
    status: 'done',
    description: 'intent_classifier docstring에 의도적 결정 표기',
  },
  {
    id: 'R8',
    title: '임베딩 모델 warmup',
    status: 'done',
    description: 'main.py lifespan startup — 첫 요청 타임아웃 방지',
  },
  {
    id: 'R9',
    title: 'confidence 이중 threshold 문서화',
    status: 'done',
    description: 'Python 0.45 / Spring 0.60 2단계 필터 주석 추가',
  },
];

const bugRows = [
  {
    id: 'T1',
    issue: '트랜잭션 롤백 시 dangling signal',
    before: '@EventListener + @Async — commit 전 NLP·저장 가능',
    after: 'Board/Care는 @TransactionalEventListener(AFTER_COMMIT), LocationSearch는 @EventListener 유지',
    status: 'done',
  },
  {
    id: 'T2',
    issue: '변경 API 인가 미명시',
    before: '/signals · /interact에 @PreAuthorize 없음',
    after: '@PreAuthorize("isAuthenticated()") + null 방어 (R1과 함께 처리)',
    status: 'done',
  },
  {
    id: 'T3',
    issue: 'text 파라미터 길이 무제한',
    before: 'GET /api/pet-recommend?text=... 임의 길이 → NLP·URL 부하',
    after: '@Size(max=500) + @Validated',
    status: 'done',
  },
  {
    id: 'T4',
    issue: 'Python router 예외 미처리',
    before: 'classify 실패 시 FastAPI 기본 500',
    after: 'try/except + HTTPException + 로깅',
    status: 'done',
  },
  {
    id: 'T5',
    issue: 'interactionType 임의 문자열 저장',
    before: 'type=DROP_TABLE 등 그대로 DB 저장',
    after: 'VIEW | NAVIGATE | FAVORITE enum/Pattern 검증',
    status: 'done',
  },
];

const PETORY_REFACTOR_DOC =
  'https://github.com/makkong1/Petory/blob/main/docs/refactoring/petRecommendation/pet-recommendation-refactoring-2026-05-31.md';
const PETORY_BUGS_DOC =
  'https://github.com/makkong1/Petory/blob/main/docs/troubleshooting/petRecommendation/pet-recommendation-bugs-2026-05-31.md';

function StatusBadge({ type }) {
  const b = badge[type];
  return (
    <span
      style={{
        fontSize: '0.75rem',
        fontWeight: '600',
        padding: '0.2rem 0.6rem',
        borderRadius: '999px',
        color: b.color,
        backgroundColor: b.bg,
        marginLeft: '0.5rem',
        verticalAlign: 'middle',
      }}
    >
      {b.label}
    </span>
  );
}

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

function RecommendationDomainRefactoring() {
  const sections = [
    { id: 'intro', title: '개요' },
    { id: 'backlog', title: '리팩토링 백로그' },
    { id: 'bugs', title: '버그·보안 수정' },
    { id: 'highlights', title: '대표 수정' },
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
            Recommendation 도메인 리팩토링
          </h1>
          <p
            style={{
              color: 'var(--text-secondary)',
              lineHeight: '1.7',
              marginBottom: '2.5rem',
              fontSize: '0.95rem',
            }}
          >
            2026-05-31 코드 리뷰 2차 검증에서 도출된 petRecommendation 도메인 개선·버그 수정
            내역입니다. 아키텍처 전체는{' '}
            <Link to="/domains/recommendation" style={{ color: 'var(--link-color)' }}>
              Recommendation 도메인
            </Link>
            , NLP 호출·부하 제어는{' '}
            <Link
              to="/domains/recommendation/optimization"
              style={{ color: 'var(--link-color)' }}
            >
              NLP 호출 정책
            </Link>
            페이지와 함께 보세요.
          </p>

          <section id="intro" style={{ marginBottom: '3rem', scrollMarginTop: '2rem' }}>
            <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>개요</h2>
            <Card>
              <p
                style={{
                  lineHeight: '1.8',
                  color: 'var(--text-secondary)',
                  margin: 0,
                }}
              >
                Recommendation은 부가 기능(추천 signal)이므로, 레이어 정합성·데이터 무결성·DTO
                불변성·API 검증을 정리하면서도 핵심 트랜잭션(게시·케어·검색)을 건드리지 않는
                범위에서 수정했습니다. R1~R9는 유지보수·확장 관점, T1~T5는 실제 버그·보안
                이슈입니다.
              </p>
            </Card>
          </section>

          <section id="backlog" style={{ marginBottom: '3rem', scrollMarginTop: '2rem' }}>
            <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>
              리팩토링 백로그 (R1~R9)
            </h2>
            <Card>
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
                    {['ID', '항목', '상태'].map((h) => (
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
                  {refactorRows.map((row, i) => (
                    <tr
                      key={row.id}
                      style={{
                        borderBottom:
                          i < refactorRows.length - 1
                            ? '1px solid var(--nav-border)'
                            : 'none',
                      }}
                    >
                      <td
                        style={{
                          padding: '0.55rem 0.75rem',
                          color: 'var(--text-color)',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {row.id}
                      </td>
                      <td style={{ padding: '0.55rem 0.75rem' }}>
                        <strong style={{ color: 'var(--text-color)' }}>{row.title}</strong>
                        <div style={{ marginTop: '0.25rem', fontSize: '0.84rem' }}>
                          {row.description}
                        </div>
                      </td>
                      <td style={{ padding: '0.55rem 0.75rem', whiteSpace: 'nowrap' }}>
                        <StatusBadge type={row.status} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Card>
          </section>

          <section id="bugs" style={{ marginBottom: '3rem', scrollMarginTop: '2rem' }}>
            <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>
              버그·보안 수정 (T1~T5)
            </h2>
            <Card>
              <table
                style={{
                  width: '100%',
                  borderCollapse: 'collapse',
                  fontSize: '0.86rem',
                  color: 'var(--text-secondary)',
                }}
              >
                <thead>
                  <tr style={{ borderBottom: '1px solid var(--nav-border)' }}>
                    {['ID', '이슈', 'Before', 'After'].map((h) => (
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
                  {bugRows.map((row, i) => (
                    <tr
                      key={row.id}
                      style={{
                        borderBottom:
                          i < bugRows.length - 1 ? '1px solid var(--nav-border)' : 'none',
                      }}
                    >
                      <td
                        style={{
                          padding: '0.55rem 0.75rem',
                          color: 'var(--text-color)',
                          verticalAlign: 'top',
                        }}
                      >
                        {row.id}
                        <StatusBadge type={row.status} />
                      </td>
                      <td
                        style={{
                          padding: '0.55rem 0.75rem',
                          color: 'var(--text-color)',
                          verticalAlign: 'top',
                        }}
                      >
                        {row.issue}
                      </td>
                      <td style={{ padding: '0.55rem 0.75rem', verticalAlign: 'top' }}>
                        {row.before}
                      </td>
                      <td style={{ padding: '0.55rem 0.75rem', verticalAlign: 'top' }}>
                        {row.after}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Card>
          </section>

          <section id="highlights" style={{ marginBottom: '3rem', scrollMarginTop: '2rem' }}>
            <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>대표 수정</h2>

            <Card style={{ marginBottom: '1rem' }}>
              <h3
                style={{
                  marginBottom: '0.75rem',
                  color: 'var(--text-color)',
                  fontSize: '1rem',
                }}
              >
                T1 — AFTER_COMMIT 이벤트 분리
              </h3>
              <p
                style={{
                  color: 'var(--text-secondary)',
                  lineHeight: '1.75',
                  margin: '0 0 0.65rem',
                  fontSize: '0.9rem',
                }}
              >
                Board/Care는 트랜잭션 안에서 publishEvent() 후 첨부·후처리 예외로 rollback
                가능합니다. @Async listener가 commit 전 signal을 저장하면 source_id가 dangling
                상태가 됩니다.
              </p>
              <CodeBlock>{`// Board / Care — 커밋 후에만 NLP
@TransactionalEventListener(phase = AFTER_COMMIT)
@Async("petIntentExecutor")
public void handle(CommunityPostCreatedEvent event) { ... }

// LocationSearch — 트랜잭션 없음 → @EventListener 유지
@EventListener
@Async("petIntentExecutor")
public void handle(LocationSearchPerformedEvent event) { ... }`}</CodeBlock>
            </Card>

            <Card style={{ marginBottom: '1rem' }}>
              <h3
                style={{
                  marginBottom: '0.75rem',
                  color: 'var(--text-color)',
                  fontSize: '1rem',
                }}
              >
                R1 — Controller 레이어 정리
              </h3>
              <CodeBlock>{`// Before: Controller → UsersRepository 직접
Long userIdx = usersRepository.findActiveByIdString(...).orElseThrow().getIdx();

// After: Service가 loginId → userIdx 해석
return ResponseEntity.ok(signalService.getActiveSignals(userDetails.getUsername()));`}</CodeBlock>
            </Card>

            <Card>
              <h3
                style={{
                  marginBottom: '0.75rem',
                  color: 'var(--text-color)',
                  fontSize: '1rem',
                }}
              >
                R5 — NLP 응답 DTO 불변성
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
                {li('@Data는 public setter를 생성 — confidence·intentDomain 실수 변경 가능')}
                {li('@Getter + @NoArgsConstructor — Jackson 역직렬화는 유지, 앱 코드 mutate 차단')}
                {li('confidence 기준·도메인 중복 방지 판단값의 정합성 보호')}
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
                    href={PETORY_REFACTOR_DOC}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: 'var(--link-color)', textDecoration: 'none' }}
                  >
                    pet-recommendation-refactoring-2026-05-31.md
                  </a>
                  {' — R1~R9 상세 before/after'}
                </li>
                <li>
                  •{' '}
                  <a
                    href={PETORY_BUGS_DOC}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: 'var(--link-color)', textDecoration: 'none' }}
                  >
                    pet-recommendation-bugs-2026-05-31.md
                  </a>
                  {' — T1~T5 시나리오·수정안'}
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

export default RecommendationDomainRefactoring;
