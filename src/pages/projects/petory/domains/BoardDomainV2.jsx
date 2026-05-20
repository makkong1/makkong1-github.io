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

const PETORY_BOARD_DOMAIN_DOC =
  'https://github.com/makkong1/Petory/blob/main/docs/domains/board.md';
const PETORY_BOARD_PERF_DOC =
  'https://github.com/makkong1/Petory/blob/main/docs/troubleshooting/board/performance-optimization.md';

function BoardDomainV2() {
  const sections = [
    { id: 'pillars', title: '핵심 기능' },
    { id: 'intro', title: '도메인 개요' },
    { id: 'design', title: '기술 결정' },
    { id: 'limits', title: '한계 & 개선' },
    { id: 'docs', title: '관련 페이지' },
  ];

  const corePillars = [
    '목록 N+1 최적화',
    '반응 토글',
    '조회수 중복 방지',
    '인기글 스냅샷',
    'FULLTEXT 검색',
  ];

  const flowDiagram = `flowchart LR
    U["User\n사용자"]

    subgraph Board["Board 도메인 (domain/board)"]
        B["Board\n게시글"]
        C["Comment\n댓글"]
        R["Reaction\n게시글·댓글 반응"]
        V["BoardViewLog\n조회 로그"]
        P["BoardPopularitySnapshot\n인기글 스냅샷"]
    end

    subgraph Notif["Notification 도메인"]
        N["Notification\n알림"]
    end

    subgraph File["File 도메인"]
        F["AttachmentFile\n첨부파일"]
    end

    U --> B
    U --> C
    U --> R
    U --> V
    B --> P
    C --> N
    B --> F
    C --> F`;

  const li = (text) => <li style={{ marginBottom: '0.35rem' }}>• {text}</li>;

  return (
    <div className="domain-page-wrapper" style={{ padding: '2rem 0' }}>
      <div
        className="domain-page-container"
        style={{ display: 'flex', gap: '2rem', alignItems: 'flex-start' }}
      >
        <div className="domain-page-content" style={{ flex: 1 }}>
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
            Board 도메인은 Petory 사용자들이 일상, 정보, 질문, 자랑 글을 올리고
            소통하는 커뮤니티 영역입니다. 처음에는 일반적인 게시판 기능처럼
            보였지만, 실제 구현에서는 게시글 목록 조회 성능, 반응 데이터
            정합성, 조회 중복 제어, 인기글 집계 비용 같은 읽기 중심 문제를 먼저
            해결해야 했습니다. 저는 이 도메인을 구현하면서 단순 CRUD보다
            데이터가 많아졌을 때도 흐름이 무너지지 않도록 조회 구조를 다듬는 데
            집중했습니다.
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
                특히 게시글 목록과 댓글 목록은 반응 수와 첨부파일 정보가 함께
                필요해 N+1 문제가 쉽게 발생할 수 있었습니다. 작성자 정보는
                목록 조회 단계에서 함께 로딩되게 두고, 반응·첨부는 ID를 모아
                배치 집계하는 방식으로 서비스 로직을 재구성했습니다. 상세
                조회에서는{' '}
                <code
                  style={{
                    backgroundColor: 'var(--bg-color)',
                    padding: '0.1rem 0.3rem',
                    borderRadius: '4px',
                  }}
                >
                  viewerId
                </code>{' '}
                기준으로 사용자별 조회 로그를 관리해 중복 증가를 제어했고,
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
                {li('인기 점수 조회수: board.viewCount가 아닌 BoardViewLog 집계')}
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
  if (viewerId == null) return true;
  if (boardViewLogRepository.existsByBoardAndUser(board, viewer)) return false;
  boardViewLogRepository.save(log);
  return true;
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
                {li('인기글 대상: "자랑" 카테고리 중심')}
                {li('목록 페이징: Offset → 대용량 시 커서 검토')}
                {li('조회수: DB 로그 → 트래픽 증가 시 Redis TTL 검토')}
                {li(
                  '권한 검증: createBoard·addComment는 JWT principal 기반으로 전환, updateBoard·deleteBoard·updateComment·deleteComment에 assertBoardOwner / assertCommentOwner 소유권 검증 추가 완료'
                )}
                {li('관리자 조회: 최적화/레거시 흐름 공존, 정리 여지')}
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
                  <Link
                    to="/domains/board/optimization"
                    style={{ color: 'var(--link-color)', textDecoration: 'none' }}
                  >
                    Board 성능 최적화
                  </Link>
                  {' — N+1 상세, 인덱스, Before/After'}
                </li>
                <li>
                  •{' '}
                  <Link
                    to="/domains/board/refactoring"
                    style={{ color: 'var(--link-color)', textDecoration: 'none' }}
                  >
                    Board 리팩토링
                  </Link>
                  {' — 중복 제거, 코드 구조'}
                </li>
                <li>
                  •{' '}
                  <Link
                    to="/domains/missing-pet"
                    style={{ color: 'var(--link-color)', textDecoration: 'none' }}
                  >
                    Missing Pet 도메인
                  </Link>
                  {' — board 패키지 내 별도 도메인성'}
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
