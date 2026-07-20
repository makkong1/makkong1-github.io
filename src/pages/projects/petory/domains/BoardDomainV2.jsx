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

const PETORY_BOARD_DOMAIN_DOC =
  'https://github.com/makkong1/Petory/blob/main/docs/domains/board.md';
const PETORY_BOARD_ARCH_DOC =
  'https://github.com/makkong1/Petory/blob/main/docs/architecture/board/%EC%BB%A4%EB%AE%A4%EB%8B%88%ED%8B%B0%20%EA%B2%8C%EC%8B%9C%ED%8C%90%20%EC%95%84%ED%82%A4%ED%85%8D%EC%B2%98.md';

function BoardDomainV2() {
  const sections = [
    { id: 'pillars', title: '핵심 기능' },
    { id: 'intro', title: '도메인 개요' },
    { id: 'architecture', title: '아키텍처 · 흐름' },
    { id: 'why', title: '구현 포인트' },
    { id: 'docs', title: '관련 문서' },
  ];

  const corePillars = [
    '목록 N+1',
    '깊은 페이지 페이징',
    '조회수 정합성',
    '상세 캐시 정합성',
    '인기글 스냅샷',
    'FULLTEXT 검색',
    '반응 토글',
  ];

  const code = { backgroundColor: 'var(--bg-color)', padding: '0.1rem 0.3rem', borderRadius: '4px' };
  const li = (text) => <li style={{ marginBottom: '0.35rem' }}>• {text}</li>;

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
              무엇을, 왜 이렇게 구현했는지 정리한 것입니다. 깊은 사례는 대표사례 링크로.
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

          {/* 3. 구현 포인트 */}
          <section id="why" style={{ marginBottom: '3rem', scrollMarginTop: '2rem' }}>
            <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>구현 포인트</h2>

            {/* 3-1 */}
            <Card style={{ marginBottom: '1rem' }}>
              <h3 style={{ marginBottom: '0.75rem', color: 'var(--text-color)', fontSize: '1rem' }}>
                A. 목록 조회 — 조인 하나 + 배치 둘
              </h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, color: 'var(--text-secondary)', lineHeight: '1.8' }}>
                {li(<>작성자(<code style={code}>@ManyToOne</code>)는 JOIN FETCH로 목록과 함께 로딩</>)}
                {li(<>반응·첨부는 컬렉션이라 게시글 ID <code style={code}>IN</code> 배치로 따로 조회 후 <code style={code}>Map</code> 병합</>)}
                {li(<><code style={code}>Page.map</code> 대신 배치 변환기(<code style={code}>toDTOList</code>) 사용 — N+1 재발 방지</>)}
                {li('301쿼리(787ms) → 3쿼리(38ms), 쿼리 수는 데이터 규모와 무관하게 고정')}
              </ul>
              <p style={{ margin: '0.75rem 0 0', fontSize: '0.86rem' }}>
                <Link to="/domains/cases?case=list-n-plus-one" style={{ color: 'var(--link-color)', fontWeight: 600, textDecoration: 'none' }}>
                  대표사례에서 자세히 보기 →
                </Link>
              </p>
            </Card>

            {/* 3-2 */}
            <Card style={{ marginBottom: '1rem' }}>
              <h3 style={{ marginBottom: '0.75rem', color: 'var(--text-color)', fontSize: '1rem' }}>
                B. 깊은 페이지 — 지연조인 + 커버링 인덱스
              </h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, color: 'var(--text-secondary)', lineHeight: '1.8' }}>
                {li(<><code style={code}>author_visible</code> 컬럼 비정규화(트리거 동기화)로 users 조인 제거</>)}
                {li('1단계: idx만 커버링 인덱스로 깊은 skip, 2단계: 살아남은 20건만 작성자 조인')}
                {li('COUNT는 단일 테이블로 분리 조회')}
                {li('페이지 번호 점프 UI(PageNavigation) 유지를 위해 키셋 대신 지연조인 선택')}
                {li('깊은 페이지 133ms → 24~32ms, 페이지 결손 23.8% 검증')}
              </ul>
              <p style={{ margin: '0.75rem 0 0', fontSize: '0.86rem' }}>
                <Link to="/domains/cases?case=deep-paging" style={{ color: 'var(--link-color)', fontWeight: 600, textDecoration: 'none' }}>
                  대표사례에서 자세히 보기 →
                </Link>
              </p>
            </Card>

            {/* 3-3 */}
            <Card style={{ marginBottom: '1rem' }}>
              <h3 style={{ marginBottom: '0.75rem', color: 'var(--text-color)', fontSize: '1rem' }}>
                C. 조회수·내 글 목록 — 서버 인증 주체 기준
              </h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, color: 'var(--text-secondary)', lineHeight: '1.8' }}>
                {li(<>대상 유저는 항상 인증 주체(<code style={code}>CustomUserDetails</code>)에서 서버가 주입 — 클라이언트 파라미터 신뢰 안 함</>)}
                {li(<>중복 조회수 방지는 <code style={code}>board_view_log(board_id, user_id)</code> 유니크 제약 + <code style={code}>insertIgnore</code></>)}
                {li('insertIgnore가 1행 이상 삽입됐을 때만 조회수 증가')}
              </ul>
              <CodeBlock>{`private boolean shouldIncrementView(Board board, Long viewerId) {
    if (viewerId == null) return false;
    // board_view_log(board_id, user_id) UNIQUE — 첫 조회만 1 반환
    return boardViewLogRepository.insertIgnore(board.getIdx(), viewerId) > 0;
}`}</CodeBlock>
            </Card>

            {/* 3-4 */}
            <Card style={{ marginBottom: '1rem' }}>
              <h3 style={{ marginBottom: '0.75rem', color: 'var(--text-color)', fontSize: '1rem' }}>
                D. 게시글 상세 캐시 제거
              </h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, color: 'var(--text-secondary)', lineHeight: '1.8' }}>
                {li(<>Redis 상세 캐시(<code style={code}>@Cacheable</code>)가 히트되면 조회수 증가 로직도 같이 스킵되던 문제라 캐시를 완전히 제거</>)}
                {li('매 조회 실시간 DB 조회로 전환')}
                {li(<>N+1은 <code style={code}>findByIdWithUser</code>(fetch join)로 작성자까지 한 번에 로딩해 방지</>)}
              </ul>
            </Card>

            {/* 3-5 */}
            <Card style={{ marginBottom: '1rem' }}>
              <h3 style={{ marginBottom: '0.75rem', color: 'var(--text-color)', fontSize: '1rem' }}>
                E. 인기글 스냅샷 — 병렬 배치 집계
              </h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, color: 'var(--text-secondary)', lineHeight: '1.8' }}>
                {li(<>좋아요·댓글·조회수 3개 카운트를 <code style={code}>CompletableFuture.supplyAsync</code>로 병렬 실행 후 <code style={code}>allOf</code>로 통합</>)}
                {li('첨부는 스냅샷 ID IN 배치로 한 번에 조회')}
                {li(<>인기 점수 = <code style={code}>likes*3 + comments*2 + views</code></>)}
                {li('첨부 조회 31 → 2쿼리(스냅샷 30개 기준)')}
              </ul>
            </Card>

            {/* 3-6 */}
            <Card style={{ marginBottom: '1rem' }}>
              <h3 style={{ marginBottom: '0.75rem', color: 'var(--text-color)', fontSize: '1rem' }}>
                F. 검색 — FULLTEXT(ngram)
              </h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, color: 'var(--text-secondary)', lineHeight: '1.8' }}>
                {li(<>제목+내용은 FULLTEXT 인덱스(<code style={code}>WITH PARSER ngram</code> — 한글 단어 검색)로 <code style={code}>MATCH...AGAINST</code></>)}
                {li('닉네임 검색은 JOIN 1쿼리로 통합')}
                {li(<>관리자 검색의 CLOB <code style={code}>lower()</code>/<code style={code}>MATCH</code> SQL 오류는 <code style={code}>FunctionContributor</code>로 해결</>)}
                {li('닉네임 2 → 1쿼리, 관리자 검색 500 → 정상')}
              </ul>
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

            {/* 3-7 */}
            <Card>
              <h3 style={{ marginBottom: '0.75rem', color: 'var(--text-color)', fontSize: '1rem' }}>
                G. 반응(좋아요/싫어요) 처리
              </h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, color: 'var(--text-secondary)', lineHeight: '1.8' }}>
                {li(<><code style={code}>board_reaction(board_idx, user_idx)</code> 유니크 제약 기반</>)}
                {li(<>기존 반응 조회 후 분기 — 같은 타입이면 취소, 다른 타입이면 <code style={code}>changeReactionType</code>으로 전환(캡슐화), 없으면 <code style={code}>insertIgnore</code>로 신규</>)}
                {li(<><code style={code}>likeCount</code>/<code style={code}>dislikeCount</code>는 즉시 갱신(delta 반영, DB 재조회 없음)</>)}
              </ul>
              <CodeBlock>{`Optional<BoardReaction> existing =
    boardReactionRepository.findByBoardAndUser(board, user);

if (existing.isPresent() && existing.get().getReactionType() == reactionType) {
    boardReactionRepository.delete(existing.get());          // 같은 타입 → 취소
} else if (existing.isPresent()) {
    existing.get().changeReactionType(reactionType);         // 다른 타입 → 전환(캡슐화)
    boardReactionRepository.save(existing.get());
} else {
    boardReactionRepository.insertIgnore(boardId, userId, reactionType.name());  // 신규(UNIQUE)
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
