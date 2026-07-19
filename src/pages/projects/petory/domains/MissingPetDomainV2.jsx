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

const PETORY_MISSING_PET_DOC =
  'https://github.com/makkong1/Petory/blob/main/docs/domains/missingpet.md';
const PETORY_MISSING_PET_ARCH_DOC =
  'https://github.com/makkong1/Petory/blob/main/docs/architecture/missingpet/%EC%8B%A4%EC%A2%85%20%EC%A0%9C%EB%B3%B4%20%EC%95%84%ED%82%A4%ED%85%8D%EC%B2%98.md';

function MissingPetDomainV2() {
  const sections = [
    { id: 'pillars', title: '핵심 기능' },
    { id: 'intro', title: '도메인 개요' },
    { id: 'design', title: '기술 결정' },
    { id: 'docs', title: '관련 페이지' },
  ];

  const corePillars = [
    '조인 폭발 방지',
    '댓글 일괄삭제 최적화',
    '채팅 연결 경량화',
    '관리자 DB 필터링',
    '서비스 레이어 권한 검증',
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
            <span className="eyebrow">Missing Pet</span>
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
            실종 반려동물 제보와 목격 정보 공유를 담당합니다. 일반 게시판과 달리
            빠른 전달과 제보자-목격자 직접 연결이 핵심이라, 목록·상세·댓글 API를
            분리해 조인 폭발을 피하고, 채팅 연결은 게시글 전체 대신 작성자 ID만
            경량 조회합니다. 서비스 레이어 권한 검증 공백도 JWT 주체 기준으로
            통일했습니다.
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
                목록은 빠르게 스캔돼야 하는데 댓글·파일을 붙이면 조인 비용이
                커집니다. 그래서 목록에선 댓글을 빼고 파일·댓글 수만 배치 IN으로
                처리했습니다. 댓글 일괄 삭제도 N번 루프 대신 배치 UPDATE 1회로
                바꿔 댓글 수만큼 걸리던 개별 쿼리를 1개로 줄였습니다. 채팅 연결은 게시글 전체 대신
                작성자 ID 프로젝션 1회 + 인증 사용자 ID로 처리해 긴급 경로를
                가볍게 유지합니다.
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
                    ['댓글 일괄 삭제', '개별 loop save (N+1)', '배치 UPDATE 1쿼리'],
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
                시퀀스 다이어그램은 도메인별로 두지 않고 통합 페이지에만 있습니다. 제보·채팅 연결과 Chat
                인프라는 각각 다른 절에 있습니다.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', alignItems: 'flex-start' }}>
                <Link
                  to="/domains/flows?tab=missing-pet"
                  style={{
                    color: 'var(--link-color)',
                    fontWeight: 600,
                    textDecoration: 'none',
                  }}
                >
                  Missing Pet · 제보·댓글·채팅 시퀀스 →
                </Link>
                <Link
                  to="/domains/flows?tab=missing-pet&seq=chat"
                  style={{
                    color: 'var(--link-color)',
                    fontWeight: 600,
                    textDecoration: 'none',
                  }}
                >
                  Chat ↔ Missing Pet (방·메시지·읽음) 시퀀스 →
                </Link>
              </div>
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
                {li('개별 loop save(N+1) → 배치 UPDATE 1쿼리')}
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
                {li('자기 글 채팅 시작 차단 — createMissingPetChat()에서 제보자와 목격자 동일 여부 검증')}
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

            <Card style={{ marginBottom: '1rem' }}>
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
                {li('일반 사용자 deleteBoard의 이메일 인증 확인은 게시글 소유자 기준으로 동작')}
              </ul>
              <CodeBlock>{`private void assertOwner(Users boardOwner) {
    Authentication auth = SecurityContextHolder.getContext().getAuthentication();
    if (!(auth != null && auth.getPrincipal() instanceof CustomUserDetails ud)) {
        throw MissingPetForbiddenException.boardOwnerOnly();
    }
    if (!ud.isAdmin() && !ud.getLoginId().equals(boardOwner.getId())) {
        throw MissingPetForbiddenException.boardOwnerOnly();
    }
}

// createBoard: 컨트롤러가 @AuthenticationPrincipal에서 loginId를 꺼내 전달
public MissingPetBoardDTO createBoard(MissingPetBoardDTO dto, String currentUserLoginId) {
    Users user = usersRepository.findActiveByIdString(currentUserLoginId)
        .orElseThrow(UserNotFoundException::new);`}</CodeBlock>
            </Card>

            <Card>
              <h3
                style={{
                  marginBottom: '0.75rem',
                  color: 'var(--text-color)',
                  fontSize: '1rem',
                }}
              >
                F. 홈 추천 점수
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
                {li('좌표가 없으면 MISSING 상태 글을 lostDate DESC, createdAt DESC로 조회')}
                {li('좌표가 있으면 20km bounding box 후보를 DB에서 가져온 뒤 서비스에서 점수 계산')}
                {li('점수는 실종일 최신성 0.6 + Haversine 거리 0.4 조합, 부족분은 최신 제보로 보충')}
              </ul>
              <CodeBlock>{`recencyScore = max(0, 1 - daysSinceLost / 14)
distScore    = max(0, 1 - distKm / 20)
score        = 0.6 * recencyScore + 0.4 * distScore`}</CodeBlock>
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
                    to="/domains/cases?case=list-n-plus-one"
                    style={{ color: 'var(--link-color)', textDecoration: 'none' }}
                  >
                    대표 개선 사례 보기
                  </Link>
                  {' — N+1 성능 개선 (Board · Care · Chat · MissingPet)'}
                </li>
                <li>
                  •{' '}
                  <a
                    href={PETORY_MISSING_PET_DOC}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: 'var(--link-color)', textDecoration: 'none' }}
                  >
                    missingpet.md (Petory)
                  </a>
                </li>
                <li>
                  •{' '}
                  <a
                    href={PETORY_MISSING_PET_ARCH_DOC}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: 'var(--link-color)', textDecoration: 'none' }}
                  >
                    실종 제보 아키텍처
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
