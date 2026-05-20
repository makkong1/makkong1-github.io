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

const PETORY_MISSING_PET_SERVICE =
  'https://github.com/makkong1/Petory/blob/main/backend/main/java/com/linkup/Petory/domain/board/service/MissingPetBoardService.java';
const PETORY_MISSING_PET_COMMENT_SERVICE =
  'https://github.com/makkong1/Petory/blob/main/backend/main/java/com/linkup/Petory/domain/board/service/MissingPetCommentService.java';

function MissingPetDomainV2() {
  const sections = [
    { id: 'pillars', title: '핵심 기능' },
    { id: 'intro', title: '도메인 개요' },
    { id: 'design', title: '기술 결정' },
    { id: 'limits', title: '한계 & 개선' },
    { id: 'docs', title: '관련 페이지' },
  ];

  const corePillars = [
    '조인 폭발 방지',
    '댓글 일괄삭제 최적화',
    '채팅 연결 경량화',
    '관리자 DB 필터링',
    '서비스 레이어 권한 검증',
  ];

  const flowDiagram = `flowchart LR
    RP["제보자"]
    WI["목격자"]

    subgraph MP["MissingPet 도메인 (domain/board)"]
        MB["MissingPetBoard\\n실종 제보"]
        MC["MissingPetComment\\n목격 댓글"]
    end

    subgraph Chat["Chat 도메인"]
        CH["Conversation\\n채팅방"]
    end

    subgraph Notif["Notification 도메인"]
        N["Notification\\n알림"]
    end

    subgraph File["File 도메인"]
        F["AttachmentFile\\n첨부파일"]
    end

    RP --> MB
    WI --> MC
    MC --> N
    MB --> F
    MC --> F
    WI -->|목격했어요| CH
    MB -->|작성자 ID 조회| CH`;

  const li = (text) => <li style={{ marginBottom: '0.35rem' }}>• {text}</li>;

  return (
    <div className="domain-page-wrapper" style={{ padding: '2rem 0' }}>
      <div
        className="domain-page-container"
        style={{ display: 'flex', gap: '2rem', alignItems: 'flex-start' }}
      >
        <div className="domain-page-content" style={{ flex: 1 }}>
          <h1 style={{ marginBottom: '0.5rem', color: 'var(--text-color)' }}>
            실종 제보 도메인
          </h1>
          <p
            style={{
              color: 'var(--text-secondary)',
              lineHeight: '1.8',
              marginBottom: '0.85rem',
              fontSize: '0.95rem',
            }}
          >
            Missing Pet 도메인은 실종 반려동물 제보와 목격 정보 공유를
            담당합니다. 일반 게시판과 달리 빠른 정보 전달과 제보자-목격자 간
            직접 연결이 핵심이라, 목록·상세·댓글 API를 분리해 조인 폭발을
            피하고, 채팅 연결 경로는 게시글 전체 조회 없이 작성자 ID만
            경량 조회하도록 설계했습니다. 이 도메인에서 추가로 서비스 레이어
            권한 검증 공백도 JWT 주체 기반으로 통일해 수정했습니다.
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
                실종 제보 목록은 빠르게 스캔되어야 하지만 댓글·파일을 함께
                붙이면 조인 비용이 급격히 커집니다. 그래서 목록에서는 댓글을
                제외하고 파일·댓글 수만 배치 IN 쿼리로 처리하도록
                분리했습니다. 댓글 일괄 삭제도 N번 루프 대신 배치 UPDATE 1회로
                전환해 1001개 쿼리를 1개로 줄였습니다. 제보자-목격자 채팅
                연결은 게시글 전체를 조회하지 않고 작성자 ID 프로젝션 1회로
                처리해 긴급 액션 경로를 가볍게 유지했습니다.
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
                    ['댓글 일괄 삭제 (1000개)', '1001개 쿼리', '1개 쿼리'],
                    ['채팅 연결 조회', '게시글 전체 DTO 조립', '작성자 ID 프로젝션 1회'],
                    ['관리자 목록 필터링', '전체 메모리 로드 후 필터', 'DB Specification + 페이징'],
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
                A. 목록·상세·댓글 API 분리
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
                {li('목록 조회: 댓글 제외 — 조인 폭발 방지')}
                {li('파일·댓글 수는 boardIds 묶음 배치 IN 쿼리로 처리')}
                {li('상세 조회: commentPage/commentSize 파라미터 있을 때만 댓글 페이징 조회')}
              </ul>
              <CodeBlock>{`Map<Long, List<FileDTO>> filesByBoardId =
    attachmentFileService.getAttachmentsBatch(
        FileTargetType.MISSING_PET, boardIds);

Map<Long, Integer> commentCountsByBoardId =
    missingPetCommentService.getCommentCountsBatch(boardIds);`}</CodeBlock>
            </Card>

            <Card style={{ marginBottom: '1rem' }}>
              <h3
                style={{
                  marginBottom: '0.75rem',
                  color: 'var(--text-color)',
                  fontSize: '1rem',
                }}
              >
                B. 댓글 일괄 삭제 최적화
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
                {li('게시글 삭제 시 하위 댓글 소프트 삭제: N번 루프 → 배치 UPDATE 1회')}
                {li('1000개 댓글 기준 1001 쿼리 → 1 쿼리')}
              </ul>
              <CodeBlock>{`// [리팩토링] N건 루프 save → 배치 UPDATE 1회
@Transactional
public void deleteAllCommentsByBoard(MissingPetBoard board) {
    commentRepository.softDeleteAllByBoardIdx(
        board.getIdx(), LocalDateTime.now());
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
                C. 채팅 연결 경량화
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
                {li('목격자 → "목격했어요" → 제보자와 채팅방 생성')}
                {li('제보자 ID: 게시글 전체 DTO 조립 없이 ID 프로젝션 1회 쿼리')}
                {li('목격자 ID: 요청 바디 아닌 JWT principal에서 확인')}
              </ul>
              <CodeBlock>{`// 작성자 ID만 프로젝션 조회 — 전체 DTO 불필요
public Long getUserIdByBoardIdx(Long boardIdx) {
    return missingPetBoardRepository.findUserIdByIdx(boardIdx)
        .orElseThrow(() -> new MissingPetBoardNotFoundException());
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
                D. 관리자 조회 DB 필터링 전환
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
                {li('이전: 전체 데이터 메모리 로드 후 status·키워드·삭제 여부 필터링')}
                {li('이후: JPA Specification + PageRequest — DB 레벨에서 필터·정렬·페이징 처리')}
                {li('데이터 증가 시에도 응답 크기가 size로 고정됨')}
              </ul>
            </Card>

            <Card>
              <h3
                style={{
                  marginBottom: '0.75rem',
                  color: 'var(--text-color)',
                  fontSize: '1rem',
                }}
              >
                E. 서비스 레이어 권한 검증
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
                {li('createBoard·addComment: 요청 바디 userId 신뢰 → JWT principal로 사용자 조회')}
                {li('updateBoard·updateStatus·deleteBoard·deleteComment: assertOwner로 소유권 검증 추가')}
                {li('관리자(ADMIN·MASTER)는 우회, 본인 아니면 403 MissingPetForbiddenException')}
                {li('deleteBoard의 이메일 인증 확인이 게시글 소유자 기준으로 올바르게 동작')}
              </ul>
              <CodeBlock>{`private void assertOwner(Users boardOwner) {
    Authentication auth =
        SecurityContextHolder.getContext().getAuthentication();
    if (!isAdmin() && !auth.getName().equals(boardOwner.getId()))
        throw MissingPetForbiddenException.boardOwnerOnly();
}

// createBoard: JWT principal → findActiveByIdString
String loginId = auth.getName();
Users user = usersRepository.findActiveByIdString(loginId)
    .orElseThrow(() -> new UserNotFoundException());`}</CodeBlock>
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
                {li('목격 댓글 위치 정보는 별도 지도 UI 없이 저장만 — 시각화 미구현')}
                {li('실종 제보 홈 추천 점수(recency·거리 가중합)는 메모리 계산 — 후보 50개 초과 시 정확도 저하')}
                {li('SecurityConfig /api/** catch-all로 인해 permitAll() 선언 API도 실제로 인증 필요 — 문서·클라이언트와 불일치 여지')}
                {li('제보자-목격자 채팅은 개별 1:1 방 생성 — 동일 제보에 목격자 수만큼 채팅방 증가')}
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
                    to="/domains/missing-pet/optimization"
                    style={{ color: 'var(--link-color)', textDecoration: 'none' }}
                  >
                    Missing Pet 성능 최적화
                  </Link>
                  {' — N+1 상세, Before/After'}
                </li>
                <li>
                  •{' '}
                  <Link
                    to="/domains/missing-pet/refactoring"
                    style={{ color: 'var(--link-color)', textDecoration: 'none' }}
                  >
                    Missing Pet 리팩토링
                  </Link>
                  {' — 배치 삭제, 경량화 근거'}
                </li>
                <li>
                  •{' '}
                  <Link
                    to="/domains/board/v2"
                    style={{ color: 'var(--link-color)', textDecoration: 'none' }}
                  >
                    Board 도메인
                  </Link>
                  {' — 같은 패키지 내 커뮤니티 게시판'}
                </li>
                <li>
                  •{' '}
                  <a
                    href={PETORY_MISSING_PET_SERVICE}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: 'var(--link-color)', textDecoration: 'none' }}
                  >
                    MissingPetBoardService.java
                  </a>
                </li>
                <li>
                  •{' '}
                  <a
                    href={PETORY_MISSING_PET_COMMENT_SERVICE}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: 'var(--link-color)', textDecoration: 'none' }}
                  >
                    MissingPetCommentService.java
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

export default MissingPetDomainV2;
