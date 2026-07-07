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
const PETORY_BOARD_PERF_DOC =
  'https://github.com/makkong1/Petory/blob/main/docs/troubleshooting/board/performance-optimization.md';

function BoardDomainV2() {
  const sections = [
    { id: 'pillars', title: '핵심 기능' },
    { id: 'intro', title: '도메인 개요' },
    { id: 'design', title: '기술 결정' },
    { id: 'docs', title: '관련 페이지' },
  ];

  const corePillars = [
    '목록 N+1 최적화',
    '댓글 배치 조회',
    '반응 토글',
    '조회수 중복 방지',
    '인기글 스냅샷',
    'FULLTEXT 검색',
  ];

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
            게시판이지만, 실제 핵심은 목록 조회 성능·반응 정합성·조회수 중복·인기글
            집계 같은 <strong>읽기 문제</strong>였습니다. 작성자 fetch join, 반응·첨부
            배치 조회, 조회 로그 <code>INSERT IGNORE</code>, 인기글 스냅샷으로
            목록·상세·인기글 비용을 분리했습니다.
          </p>

          </div>

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
                목록은 반응 수·첨부가 함께 필요해 N+1이 나기 쉬웠습니다.
                작성자는 목록 쿼리에서 함께 로딩하고, 반응·첨부는 ID를 모아
                배치 집계했습니다. 상세 조회에서는{' '}
                <code
                  style={{
                    backgroundColor: 'var(--bg-color)',
                    padding: '0.1rem 0.3rem',
                    borderRadius: '4px',
                  }}
                >
                  viewerId
                </code>{' '}
                기준으로 <code>board_view_log</code>에 <code>boardId + userId</code>{' '}
                조합을 <code>INSERT IGNORE</code>로 기록해 중복 증가를 제어했고,
                인기글은 스냅샷을 우선 조회하되 없으면 생성하거나 fallback하는
                방식으로 읽기 성능과 집계 비용을 분리했습니다.
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
                    <th
                      style={{
                        padding: '0.55rem 0.75rem',
                        textAlign: 'left',
                        color: 'var(--text-color)',
                      }}
                    >
                      지표
                    </th>
                    <th
                      style={{
                        padding: '0.55rem 0.75rem',
                        textAlign: 'left',
                        color: 'var(--text-color)',
                      }}
                    >
                      Before
                    </th>
                    <th
                      style={{
                        padding: '0.55rem 0.75rem',
                        textAlign: 'left',
                        color: 'var(--text-color)',
                      }}
                    >
                      After
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['목록 조회 쿼리 수', '301개', '3개'],
                    ['실행 시간', '745ms', '30ms'],
                    ['메모리', '22.50MB', '2MB'],
                  ].map(([label, before, after], i, arr) => (
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
                      <td style={{ padding: '0.55rem 0.75rem' }}>{before}</td>
                      <td
                        style={{
                          padding: '0.55rem 0.75rem',
                          color: 'var(--text-color)',
                          fontWeight: 600,
                        }}
                      >
                        {after}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p
                style={{
                  color: 'var(--text-secondary)',
                  fontSize: '0.88rem',
                  marginTop: '0.75rem',
                  marginBottom: 0,
                  lineHeight: '1.7',
                }}
              >
                100개 게시글 목록(작성자·반응·첨부 포함)·테스트 DB·
                <code
                  style={{
                    backgroundColor: 'var(--bg-color)',
                    padding: '0.1rem 0.3rem',
                    borderRadius: '4px',
                  }}
                >
                  entityManager.clear()
                </code>{' '}
                후 측정. 운영 수치는 환경에 따라 다를 수 있음.
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
                to="/domains/flows?tab=board"
                style={{
                  color: 'var(--link-color)',
                  fontWeight: 600,
                  textDecoration: 'none',
                }}
              >
                Board 시퀀스 보기 →
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
                A. 목록 N+1
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
                {li('작성자: 게시글 조회 쿼리에 JOIN FETCH')}
                {li('반응·첨부: 게시글 ID 목록 → IN + GROUP BY 배치 집계')}
              </ul>
              <CodeBlock>{`List<Long> boardIds = boards.stream().map(Board::getIdx).toList();

Map<Long, Map<ReactionType, Long>> reactionCountsMap =
    getReactionCountsBatch(boardIds);

Map<Long, List<FileDTO>> attachmentsMap =
    attachmentFileService.getAttachmentsBatch(FileTargetType.BOARD, boardIds);`}</CodeBlock>
            </Card>

            <Card style={{ marginBottom: '1rem' }}>
              <h3
                style={{
                  marginBottom: '0.75rem',
                  color: 'var(--text-color)',
                  fontSize: '1rem',
                }}
              >
                B. 댓글 N+1
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
                {li('댓글 ID 목록을 모아 반응 수·첨부파일 배치 조회')}
                {li(
                  <>
                    상세는{' '}
                    <Link
                      to="/domains/board/optimization"
                      style={{
                        color: 'var(--link-color)',
                        textDecoration: 'none',
                      }}
                    >
                      성능 최적화
                    </Link>{' '}
                    페이지 참고
                  </>
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
                C. 실시간 vs 배치
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
                {li('반응: likeCount / dislikeCount 필드 즉시 갱신')}
                {li('인기글: 스케줄러 스냅샷 우선, 없으면 on-demand 생성·fallback')}
                {li('인기 점수: likes * 3 + comments * 2 + views')}
                {li('인기 점수 조회수: board.viewCount가 아닌 BoardViewLog batch count 기준')}
              </ul>
              <CodeBlock>{`if (existing.isPresent() && sameReaction) {
  boardReactionRepository.delete(existing.get());   // 취소
} else if (existing.isPresent()) {
  existing.get().setReactionType(reactionType);    // LIKE ↔ DISLIKE
} else {
  boardReactionRepository.save(newReaction);       // 신규
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
                D. 조회수 품질
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
                {li('viewerId 있으면 BoardViewLog 기준 첫 조회만 증가')}
                {li('새로고침만으로는 중복 증가 없음 — 인기 점수도 BoardViewLog 집계 기준')}
              </ul>
              <CodeBlock>{`private boolean shouldIncrementView(Board board, Long viewerId) {
    if (viewerId == null) {
        return true;
    }
    Users viewer = usersRepository.findById(viewerId).orElse(null);
    if (viewer == null) {
        return true;
    }
    return boardViewLogRepository.insertIgnore(board.getIdx(), viewer.getIdx()) > 0;
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
                E. 검색
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
                {li('TITLE_CONTENT: FULLTEXT 인덱스 활용 (MATCH...AGAINST)')}
                {li('NICKNAME: JOIN 쿼리 1번으로 DB 레벨 페이징')}
                {li('두 경로 모두 Spring Pageable로 페이지 반환')}
              </ul>
              <CodeBlock>{`switch (searchType.toUpperCase()) {
  case "NICKNAME":
    boardPage = boardRepository
        .searchByNicknameWithPaging(keyword, pageable);
    break;
  case "TITLE_CONTENT":
  default:
    // FULLTEXT 인덱스 활용 (MATCH...AGAINST)
    boardPage = boardRepository
        .searchByKeywordWithPaging(keyword, pageable);
    break;
}`}</CodeBlock>
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
                  <Link
                    to="/domains/refactoring#n-plus-one"
                    style={{ color: 'var(--link-color)', textDecoration: 'none' }}
                  >
                    대표 개선 사례 보기
                  </Link>
                  {' — N+1 성능 개선 (Board · Care · Chat · MissingPet)'}
                </li>
                <li>
                  •{' '}
                  <a
                    href={PETORY_BOARD_ARCH_DOC}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: 'var(--link-color)', textDecoration: 'none' }}
                  >
                    커뮤니티 게시판 아키텍처
                  </a>
                </li>
                <li>
                  •{' '}
                  <a
                    href={PETORY_BOARD_DOMAIN_DOC}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: 'var(--link-color)', textDecoration: 'none' }}
                  >
                    Petory docs/domains/board.md
                  </a>
                </li>
                <li>
                  •{' '}
                  <a
                    href={PETORY_BOARD_PERF_DOC}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: 'var(--link-color)', textDecoration: 'none' }}
                  >
                    성능 비교 문서 (performance-optimization.md)
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
