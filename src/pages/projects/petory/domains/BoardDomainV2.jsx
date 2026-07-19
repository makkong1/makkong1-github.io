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

// "왜 이 코드인가" 한 줄 필드 (문제 / 검토한 대안 / 결정 / 전·후 실측)
function Field({ label, children }) {
  return (
    <p
      style={{
        margin: '0 0 0.5rem',
        color: 'var(--text-secondary)',
        lineHeight: '1.75',
        fontSize: '0.9rem',
      }}
    >
      <strong style={{ color: 'var(--text-color)' }}>{label}</strong> — {children}
    </p>
  );
}

const PETORY_BOARD_DOMAIN_DOC =
  'https://github.com/makkong1/Petory/blob/main/docs/domains/board.md';
const PETORY_BOARD_ARCH_DOC =
  'https://github.com/makkong1/Petory/blob/main/docs/architecture/board/%EC%BB%A4%EB%AE%A4%EB%8B%88%ED%8B%B0%20%EA%B2%8C%EC%8B%9C%ED%8C%90%20%EC%95%84%ED%82%A4%ED%85%8D%EC%B2%98.md';

function BoardDomainV2() {
  const sections = [
    { id: 'pillars', title: '핵심 기능' },
    { id: 'intro', title: '도메인 개요' },
    { id: 'architecture', title: '아키텍처 · 흐름' },
    { id: 'why', title: '왜 이 코드인가' },
    { id: 'docs', title: '관련 문서' },
  ];

  const corePillars = [
    '목록 N+1',
    '깊은 페이지 페이징',
    '조회수 정합성',
    '상세 캐시 정합성',
    '인기글 스냅샷',
    'FULLTEXT 검색',
  ];

  const code = { backgroundColor: 'var(--bg-color)', padding: '0.1rem 0.3rem', borderRadius: '4px' };

  return (
    <div className="domain-page-wrapper" style={{ padding: '2rem 0' }}>
      <div
        className="domain-page-container"
        style={{ display: 'flex', gap: '2rem', alignItems: 'flex-start' }}
      >
        <div className="domain-page-content" style={{ flex: 1 }}>
          <div className="domain-hero">
            <span className="eyebrow">Board</span>
            <h1 style={{ marginBottom: '0.5rem', color: 'var(--text-color)' }}>
              게시판 도메인
            </h1>
            <p
              style={{
                color: 'var(--text-secondary)',
                lineHeight: '1.8',
                marginBottom: '0.85rem',
                fontSize: '0.95rem',
              }}
            >
              글·댓글·반응으로 소통하는 커뮤니티 도메인입니다. 겉보기엔 평범한
              게시판이지만 실제 핵심은 <strong>읽기 문제</strong>였습니다 — 목록
              조회 성능, 깊은 페이지 페이징, 조회수·캐시 정합성, 인기글 집계. 아래는
              "지금 코드가 왜 이렇게 됐는지"를 문제 → 결정 → 실측 순으로 정리한 것입니다.
            </p>
          </div>

          <section id="pillars" style={{ marginBottom: '2rem', scrollMarginTop: '2rem' }}>
            <h2 style={{ marginBottom: '0.75rem', color: 'var(--text-color)', fontSize: '1.1rem' }}>
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

          {/* 1. 개요 */}
          <section id="intro" style={{ marginBottom: '3rem', scrollMarginTop: '2rem' }}>
            <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>도메인 개요</h2>
            <Card>
              <p style={{ lineHeight: '1.8', color: 'var(--text-secondary)', margin: 0 }}>
                게시글 CRUD, 댓글, 반응(좋아요/싫어요), 조회수, 인기글 스냅샷,
                FULLTEXT 검색. 목록은 반응 수·첨부가 함께 필요해 N+1이 나기 쉬웠고,
                상세는 조회수 증가라는 부수효과 때문에 캐시와 충돌했습니다. 각 비용을
                분리하는 게 이 도메인의 핵심 작업이었습니다.
                <br />
                <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                  (실종동물 게시판은 코드상 같은 <code style={code}>domain/board</code>{' '}
                  패키지지만 별도 도메인으로 다룹니다.)
                </span>
              </p>
            </Card>
          </section>

          {/* 2. 아키텍처 · 흐름 */}
          <section id="architecture" style={{ marginBottom: '3rem', scrollMarginTop: '2rem' }}>
            <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>아키텍처 · 흐름</h2>
            <Card>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, color: 'var(--text-secondary)', lineHeight: '1.9', fontSize: '0.9rem' }}>
                <li>• <strong style={{ color: 'var(--text-color)' }}>레이어</strong>: Controller → Service → Repository(어댑터) → SpringDataJpa</li>
                <li>• <strong style={{ color: 'var(--text-color)' }}>핵심 엔티티</strong>: <code style={code}>Board</code> · <code style={code}>Comment</code> · <code style={code}>BoardReaction</code> · <code style={code}>BoardViewLog</code> · <code style={code}>BoardPopularitySnapshot</code></li>
                <li>• <strong style={{ color: 'var(--text-color)' }}>도메인 연동</strong>: File(첨부 배치) · Notification(댓글 알림) · Recommendation(글 작성 이벤트 → NLP)</li>
              </ul>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', lineHeight: '1.75', margin: '0.85rem 0 0.5rem' }}>
                데이터 흐름 시퀀스는 도메인마다 두지 않고 통합 페이지에만 둡니다.
              </p>
              <Link to="/domains/flows?tab=board" style={{ color: 'var(--link-color)', fontWeight: 600, textDecoration: 'none' }}>
                Board 시퀀스 보기 →
              </Link>
            </Card>
          </section>

          {/* 3. 왜 이 코드인가 */}
          <section id="why" style={{ marginBottom: '3rem', scrollMarginTop: '2rem' }}>
            <h2 style={{ marginBottom: '0.4rem', color: 'var(--text-color)' }}>왜 이 코드인가</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginBottom: '1rem', lineHeight: 1.7 }}>
              각 결정을 <strong>예전 문제 → 검토한 대안 → 결정 → 전·후 실측</strong> 순으로.
            </p>

            {/* 3-1 */}
            <Card style={{ marginBottom: '1rem' }}>
              <h3 style={{ marginBottom: '0.75rem', color: 'var(--text-color)', fontSize: '1rem' }}>
                A. 목록 조회를 "조인 하나 + 배치 둘"로 나눈 이유
              </h3>
              <Field label="문제">목록 100건에서 작성자는 LAZY라 글마다 1번(N), 반응·첨부도 각 N → <code style={code}>1 + 3N = 301쿼리</code> (787ms).</Field>
              <Field label="결정">작성자(<code style={code}>@ManyToOne</code>)는 조인해도 글 행이 안 늘어 <strong>JOIN</strong>. 반응·첨부는 컬렉션이라 조인하면 행이 뻥튀기 → <strong><code style={code}>IN</code> 배치 + <code style={code}>GROUP BY</code></strong>로 따로 뽑아 <code style={code}>Map</code> 병합. <code style={code}>Page.map</code>은 단건 변환기를 행마다 호출해 N+1이 재발하므로 배치 변환기 사용.</Field>
              <Field label="실측">301 → 3쿼리, 787 → 38ms (쿼리 수는 데이터 규모와 무관하게 고정).</Field>
              <CodeBlock>{`List<Long> boardIds = boards.stream().map(Board::getIdx).toList();

Map<Long, Map<ReactionType, Long>> reactionCountsMap =
    getReactionCountsBatch(boardIds);              // IN + GROUP BY

Map<Long, List<FileDTO>> attachmentsMap =
    attachmentFileService.getAttachmentsBatch(FileTargetType.BOARD, boardIds);`}</CodeBlock>
            </Card>

            {/* 3-2 */}
            <Card style={{ marginBottom: '1rem' }}>
              <h3 style={{ marginBottom: '0.75rem', color: 'var(--text-color)', fontSize: '1rem' }}>
                B. 깊은 페이지에서 키셋이 아니라 지연조인인 이유
              </h3>
              <Field label="문제"><code style={code}>OFFSET 49,980</code> 요청 시 <strong>10만 행을 검사하고 0행 반환</strong>(≈133ms). <code style={code}>LIMIT</code>은 정렬이 끝난 뒤 적용돼서, 1페이지든 뒷페이지든 정렬 비용이 같았습니다(딥페이징처럼 보이지만 실제 원인은 여기).</Field>
              <Field label="검토한 대안">키셋 페이징 vs 2단계 지연조인. <strong>키셋 탈락</strong> — 프론트 공용 <code style={code}>PageNavigation</code>이 "3페이지로 점프" 같은 페이지 번호 UI를 노출하는데, 키셋은 "다음/이전"만 가능해 이 UI를 못 지킴.</Field>
              <Field label="결정"><code style={code}>author_visible</code> 컬럼 비정규화(트리거 동기화)로 users 조인 제거 → 1단계 커버링 인덱스로 <code style={code}>idx</code>만 깊은 skip → 2단계 살아남은 20건만 작성자 조인 → COUNT는 단일 테이블로 분리.</Field>
              <Field label="실측">깊은 페이지 133ms → 24~32ms, 페이지 결손 23.8% 검증(EXPLAIN·COUNT·k6).</Field>
            </Card>

            {/* 3-3 */}
            <Card style={{ marginBottom: '1rem' }}>
              <h3 style={{ marginBottom: '0.75rem', color: 'var(--text-color)', fontSize: '1rem' }}>
                C. 조회수·내 글 목록을 클라이언트 값으로 판정하지 않는 이유
              </h3>
              <Field label="문제">조회수 증가를 클라가 보낸 <code style={code}>viewerId</code>로 판정 → 조작 가능. <code style={code}>my-posts</code>도 클라 <code style={code}>userId</code>를 신뢰해 남의 글을 반환.</Field>
              <Field label="결정">대상 유저는 항상 인증 주체(<code style={code}>CustomUserDetails</code>)에서 서버가 주입. 중복 조회수는 <code style={code}>board_view_log(board_id, user_id)</code> 유니크 제약 기반 <code style={code}>insertIgnore</code>로, 1행 이상 삽입됐을 때만 증가.</Field>
              <CodeBlock>{`private boolean shouldIncrementView(Board board, Long viewerId) {
    if (viewerId == null) return false;
    // board_view_log(board_id, user_id) UNIQUE — 첫 조회만 1 반환
    return boardViewLogRepository.insertIgnore(board.getIdx(), viewerId) > 0;
}`}</CodeBlock>
            </Card>

            {/* 3-4 */}
            <Card style={{ marginBottom: '1rem' }}>
              <h3 style={{ marginBottom: '0.75rem', color: 'var(--text-color)', fontSize: '1rem' }}>
                D. 게시글 상세 캐시를 뺀 이유
              </h3>
              <Field label="문제">Redis 상세 캐시(<code style={code}>@Cacheable</code>)가 히트되면 메서드 본문이 실행 안 되니 <strong>조회수 증가 로직도 같이 스킵</strong> → TTL 동안 조회수 정체(정합성 버그).</Field>
              <Field label="결정">캐시를 완전히 제거하고 매 조회 실시간 DB. 대신 N+1은 <code style={code}>findByIdWithUser</code>(fetch join)로 작성자까지 한 번에 가져와 방지. "성능(캐시)보다 조회수 정합성이 우선"이라는 판단.</Field>
            </Card>

            {/* 3-5 */}
            <Card style={{ marginBottom: '1rem' }}>
              <h3 style={{ marginBottom: '0.75rem', color: 'var(--text-color)', fontSize: '1rem' }}>
                E. 인기글 스냅샷을 병렬 배치로 뽑는 이유
              </h3>
              <Field label="문제">스냅샷 생성 시 좋아요·댓글·조회수 3개 배치를 순차 실행 + 스냅샷마다 첨부를 개별 조회 → 30개면 파일 조회만 31쿼리.</Field>
              <Field label="결정">3개 카운트를 <code style={code}>CompletableFuture.supplyAsync</code>로 병렬 실행 후 <code style={code}>allOf</code>로 통합, 첨부는 <code style={code}>IN</code> 배치로 30개 한 번에. 인기 점수 = <code style={code}>likes*3 + comments*2 + views</code>.</Field>
              <Field label="실측">첨부 조회 31 → 2쿼리(스냅샷 30개 기준).</Field>
            </Card>

            {/* 3-6 */}
            <Card>
              <h3 style={{ marginBottom: '0.75rem', color: 'var(--text-color)', fontSize: '1rem' }}>
                F. 검색을 LIKE가 아니라 FULLTEXT(ngram)로 짠 이유
              </h3>
              <Field label="문제">제목·내용 검색이 <code style={code}>LIKE '%kw%'</code>라 풀스캔. 닉네임 검색은 User·Board 2쿼리 분리. 관리자 검색은 CLOB에 <code style={code}>lower()</code>/<code style={code}>MATCH</code>가 SQL 오류로 HTTP 500.</Field>
              <Field label="결정">제목+내용은 FULLTEXT 인덱스(<code style={code}>WITH PARSER ngram</code> — 한글 단어 검색)로 <code style={code}>MATCH...AGAINST</code>, 닉네임은 JOIN 1쿼리, 관리자 500은 <code style={code}>FunctionContributor</code>로 해결.</Field>
              <Field label="실측">닉네임 2 → 1쿼리, 관리자 검색 500 → 정상.</Field>
              <CodeBlock>{`switch (searchType.toUpperCase()) {
  case "NICKNAME":
    boardPage = boardRepository.searchByNicknameWithPaging(keyword, pageable);
    break;
  case "TITLE_CONTENT":
  default:
    // FULLTEXT (ngram parser) — MATCH...AGAINST
    boardPage = boardRepository.searchByKeywordWithPaging(keyword, pageable);
    break;
}`}</CodeBlock>
            </Card>
          </section>

          {/* 4. 관련 문서 */}
          <section id="docs" style={{ marginBottom: '3rem', scrollMarginTop: '2rem' }}>
            <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>관련 문서</h2>
            <Card>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, color: 'var(--text-secondary)', lineHeight: '2' }}>
                <li>
                  •{' '}
                  <Link to="/domains/board/detail" style={{ color: 'var(--link-color)', textDecoration: 'none' }}>
                    성능 · 구조 상세 (작업 로그)
                  </Link>
                  {' — 코드 diff·시퀀스까지 포함한 깊은 기록'}
                </li>
                <li>
                  •{' '}
                  <a href={PETORY_BOARD_ARCH_DOC} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--link-color)', textDecoration: 'none' }}>
                    커뮤니티 게시판 아키텍처 (Petory docs)
                  </a>
                </li>
                <li>
                  •{' '}
                  <a href={PETORY_BOARD_DOMAIN_DOC} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--link-color)', textDecoration: 'none' }}>
                    Petory docs/domains/board.md
                  </a>
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

export default BoardDomainV2;
