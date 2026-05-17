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
        ...style
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
        margin: '0.75rem 0 0'
      }}
    >
      {children}
    </pre>
  );
}

function MissingPetDomain() {
  const sections = [
    { id: 'intro', title: '도메인 개요' },
    { id: 'design', title: '기능 & 아키텍처' },
    { id: 'performance', title: '성능 최적화' },
    { id: 'summary', title: '핵심 포인트' },
    { id: 'docs', title: '관련 페이지' }
  ];

  const entityDiagram = `erDiagram
    Users ||--o{ MissingPetBoard : "writes"
    MissingPetBoard ||--o{ MissingPetComment : "has"
    Users ||--o{ MissingPetComment : "writes"

    MissingPetBoard {
        Long idx PK
        Long user_idx FK
        String title
        String content
        String petName
        String species
        String breed
        MissingPetGender gender
        LocalDate lostDate
        String lostLocation
        BigDecimal latitude
        BigDecimal longitude
        MissingPetStatus status
        Boolean isDeleted
        LocalDateTime deletedAt
    }

    MissingPetComment {
        Long idx PK
        Long board_idx FK
        Long user_idx FK
        String content
        String address
        BigDecimal latitude
        BigDecimal longitude
        Boolean isDeleted
        LocalDateTime deletedAt
    }`;

  const listFlow = `flowchart LR
    A[GET /api/missing-pets] --> B[MissingPetBoardService.getBoardsWithPaging]
    B --> C[게시글+작성자 조회]
    B --> D[첨부파일 배치 조회]
    B --> E[댓글 수 배치 조회]
    C --> F[toBoardDTOWithoutComments]
    D --> F
    E --> F
    F --> G[MissingPetBoardPageResponseDTO]`;

  const li = (text) => <li style={{ marginBottom: '0.35rem' }}>• {text}</li>;

  return (
    <div className="domain-page-wrapper" style={{ padding: '2rem 0' }}>
      <div className="domain-page-container" style={{ display: 'flex', gap: '2rem', alignItems: 'flex-start' }}>
        <div className="domain-page-content" style={{ flex: 1 }}>
          <h1 style={{ marginBottom: '0.5rem', color: 'var(--text-color)' }}>실종 제보 도메인</h1>
          <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', marginBottom: '2.5rem', fontSize: '0.95rem' }}>
            실종 반려동물 제보·목격 정보 공유를 담당합니다. <code style={{ backgroundColor: 'var(--bg-color)', padding: '0.1rem 0.3rem', borderRadius: '4px' }}>domain/board/</code> 내부에 위치하지만
            API·서비스는 독립적으로 분리되어 있으며, 댓글에서 채팅으로 바로 연결되는 흐름이 특징입니다.
          </p>

          {/* ── 도메인 개요 ── */}
          <section id="intro" style={{ marginBottom: '3rem', scrollMarginTop: '2rem' }}>
            <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>도메인 개요</h2>
            <Card style={{ marginBottom: '1rem' }}>
              <p style={{ lineHeight: '1.8', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                MissingPet 도메인의 핵심은{' '}
                <strong style={{ color: 'var(--text-color)' }}>
                  실종 제보 게시글·목격 댓글·채팅 연동을 Board 도메인 내부에서 독립 흐름으로 분리하고,
                  목록 조회 시 댓글을 분리해 N+1과 조인 폭발을 방지하는 것
                </strong>
                입니다.
              </p>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid var(--nav-border)' }}>
                    <th style={{ padding: '0.55rem 0.75rem', textAlign: 'left', color: 'var(--text-color)' }}>지표</th>
                    <th style={{ padding: '0.55rem 0.75rem', textAlign: 'left', color: 'var(--text-color)' }}>Before</th>
                    <th style={{ padding: '0.55rem 0.75rem', textAlign: 'left', color: 'var(--text-color)' }}>After</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['목록 쿼리 수', '105개', '3개 (↓97%)'],
                    ['응답 시간', '571ms', '106ms'],
                    ['메모리', '11MB', '3MB']
                  ].map(([label, before, after], i, arr) => (
                    <tr key={label} style={{ borderBottom: i < arr.length - 1 ? '1px solid var(--nav-border)' : 'none' }}>
                      <td style={{ padding: '0.55rem 0.75rem', color: 'var(--text-color)' }}>{label}</td>
                      <td style={{ padding: '0.55rem 0.75rem' }}>{before}</td>
                      <td style={{ padding: '0.55rem 0.75rem', color: 'var(--text-color)', fontWeight: 600 }}>{after}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', marginTop: '0.75rem', marginBottom: 0 }}>
                상세 측정 →{' '}
                <Link to="/domains/missing-pet/optimization" style={{ color: 'var(--link-color)', textDecoration: 'none' }}>성능 최적화</Link>
                {' / '}
                <Link to="/domains/missing-pet/refactoring" style={{ color: 'var(--link-color)', textDecoration: 'none' }}>리팩토링</Link>
              </p>
            </Card>
          </section>

          {/* ── 기능 & 아키텍처 ── */}
          <section id="design" style={{ marginBottom: '3rem', scrollMarginTop: '2rem' }}>
            <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>기능 & 아키텍처</h2>

            {/* 게시글 CRUD & 이메일 인증 */}
            <Card style={{ marginBottom: '1rem' }}>
              <h3 style={{ marginBottom: '0.75rem', color: 'var(--text-color)', fontSize: '1rem' }}>게시글 CRUD & 이메일 인증</h3>
              <ul style={{ listStyle: 'none', padding: 0, marginBottom: '0.75rem', color: 'var(--text-secondary)', lineHeight: '1.8' }}>
                {li('제목·내용·반려동물 정보(이름/종/품종/성별/나이/색상)·실종일·실종 위치(주소+좌표) 저장.')}
                {li('작성/수정/삭제 전 이메일 인증 필수 (EmailVerificationPurpose.MISSING_PET).')}
                {li('이미지는 FileTargetType.MISSING_PET, 첫 번째 파일만 저장.')}
                {li('상태: MISSING(기본) → FOUND → RESOLVED.')}
              </ul>
              <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', marginBottom: '0.3rem' }}>
                게시글 삭제 시 댓글도 배치 UPDATE로 일괄 Soft Delete:
              </p>
              <CodeBlock>{`board.setIsDeleted(true);
board.setDeletedAt(now);
commentService.softDeleteAllByBoardIdx(board.getIdx()); // @Modifying 배치 UPDATE`}</CodeBlock>
            </Card>

            {/* 목록 조회 배치 최적화 */}
            <Card style={{ marginBottom: '1rem' }}>
              <h3 style={{ marginBottom: '0.75rem', color: 'var(--text-color)', fontSize: '1rem' }}>목록 조회 — 게시글/댓글 분리 + 배치</h3>
              <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', marginBottom: '0.75rem' }}>
                목록 API는 댓글 내용을 즉시 가져오지 않습니다. 게시글+작성자, 파일, 댓글 수만 각각 최적화된 경로로 읽고,
                DTO에서는 댓글 접근을 차단해 LAZY 로딩을 피합니다.
              </p>
              <MermaidDiagram chart={listFlow} />
              <CodeBlock>{`attachmentsMap = attachmentFileService.getAttachmentsBatch(MISSING_PET, boardIds);
commentCounts  = missingPetCommentService.getCommentCountsBatch(boardIds);
dtos = converter.toBoardDTOWithoutComments(boards);`}</CodeBlock>
            </Card>

            {/* 댓글 & 알림 & 채팅 */}
            <Card style={{ marginBottom: '1rem' }}>
              <h3 style={{ marginBottom: '0.75rem', color: 'var(--text-color)', fontSize: '1rem' }}>목격 댓글 & 채팅 연동</h3>
              <ul style={{ listStyle: 'none', padding: 0, marginBottom: '0.75rem', color: 'var(--text-secondary)', lineHeight: '1.8' }}>
                {li('댓글에 목격 위치(주소+좌표) 저장. 이미지는 FileTargetType.MISSING_PET_COMMENT.')}
                {li('"목격했어요" 버튼 → POST /api/missing-pets/{boardIdx}/start-chat → ConversationService.createMissingPetChat().')}
                {li('목격자 ID는 JWT principal에서 추출 (쿼리 파라미터 X — IDOR 방지).')}
                {li('채팅 시작은 게시글 전체가 아니라 작성자 ID만 프로젝션으로 조회해 오버헤드를 줄입니다.')}
              </ul>
              <CodeBlock>{`// 자기 게시글에 자기 댓글이면 알림 미발송
if (!board.getUser().getIdx().equals(commentWriter.getIdx())) {
  sendMissingPetCommentNotificationAsync(...);
}`}</CodeBlock>
            </Card>

            {/* 엔티티 & API */}
            <Card style={{ marginBottom: '1rem' }}>
              <h3 style={{ marginBottom: '0.75rem', color: 'var(--text-color)', fontSize: '1rem' }}>엔티티 관계도</h3>
              <MermaidDiagram chart={entityDiagram} />
            </Card>

            <Card>
              <h3 style={{ marginBottom: '0.75rem', color: 'var(--text-color)', fontSize: '1rem' }}>주요 API</h3>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid var(--nav-border)' }}>
                    <th style={{ padding: '0.55rem 0.75rem', textAlign: 'left', color: 'var(--text-color)' }}>엔드포인트</th>
                    <th style={{ padding: '0.55rem 0.75rem', textAlign: 'left', color: 'var(--text-color)' }}>Method</th>
                    <th style={{ padding: '0.55rem 0.75rem', textAlign: 'left', color: 'var(--text-color)' }}>설명</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['/api/missing-pets', 'GET/POST', '목록(페이징·status) / 게시글 작성'],
                    ['/api/missing-pets/{id}', 'GET/PUT/DELETE', '상세(commentPage/commentSize) · 수정 · 삭제'],
                    ['/api/missing-pets/{id}/status', 'PATCH', '상태 변경 (MISSING→FOUND→RESOLVED)'],
                    ['/api/missing-pets/{id}/comments', 'GET/POST', '댓글 목록 / 댓글 작성'],
                    ['/api/missing-pets/{id}/comments/{cid}', 'DELETE', '댓글 Soft Delete'],
                    ['/api/missing-pets/{boardIdx}/start-chat', 'POST', '목격자-제보자 채팅 시작 (JWT 기반)'],
                    ['/api/admin/missing-pets/paging', 'GET', '관리자 목록 (status/deleted/q)'],
                    ['/api/admin/missing-pets/{id}/restore', 'POST', '관리자 복구']
                  ].map(([path, method, desc], i, arr) => (
                    <tr key={path + method} style={{ borderBottom: i < arr.length - 1 ? '1px solid var(--nav-border)' : 'none' }}>
                      <td style={{ padding: '0.55rem 0.75rem' }}>
                        <code style={{ backgroundColor: 'var(--bg-color)', padding: '0.1rem 0.3rem', borderRadius: '4px', fontSize: '0.82rem' }}>{path}</code>
                      </td>
                      <td style={{ padding: '0.55rem 0.75rem' }}>{method}</td>
                      <td style={{ padding: '0.55rem 0.75rem' }}>{desc}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Card>
          </section>

          {/* ── 성능 최적화 ── */}
          <section id="performance" style={{ marginBottom: '3rem', scrollMarginTop: '2rem' }}>
            <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>성능 최적화</h2>

            <Card style={{ marginBottom: '1rem' }}>
              <h3 style={{ marginBottom: '0.75rem', color: 'var(--text-color)', fontSize: '1rem' }}>핵심 최적화 포인트</h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, color: 'var(--text-secondary)', lineHeight: '1.8' }}>
                {li('첨부파일: getAttachmentsBatch() — IN 배치 조회.')}
                {li('댓글 수: countCommentsByBoardIds — 배치 COUNT 집계.')}
                {li('게시글 삭제 시 댓글: softDeleteAllByBoardIdx — 루프 save 대신 @Modifying 배치 UPDATE.')}
                {li('채팅 시작: getUserIdByBoardIdx() 프로젝션으로 게시글 전체 로딩 없이 작성자 ID만 조회.')}
                {li('관리자 목록: Specification + DB 페이징으로 메모리 필터링 제거.')}
              </ul>
            </Card>

            <Card>
              <h3 style={{ marginBottom: '0.75rem', color: 'var(--text-color)', fontSize: '1rem' }}>인덱스 전략</h3>
              <CodeBlock>{`CREATE INDEX idx_missing_pet_user   ON missing_pet_board(user_idx, is_deleted, created_at);
CREATE INDEX idx_missing_pet_status ON missing_pet_board(status, is_deleted, created_at);
CREATE INDEX idx_missing_pet_location ON missing_pet_board(latitude, longitude);
CREATE INDEX idx_comment_board      ON missing_pet_comment(board_idx);
CREATE INDEX idx_comment_user       ON missing_pet_comment(user_idx);`}</CodeBlock>
              <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', marginTop: '0.75rem', marginBottom: 0 }}>
                상태·삭제 여부·생성일, 작성자, 좌표, 게시글별 댓글 조회가 주요 접근 패턴입니다.
              </p>
            </Card>
          </section>

          {/* ── 핵심 포인트 ── */}
          <section id="summary" style={{ marginBottom: '3rem', scrollMarginTop: '2rem' }}>
            <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>핵심 포인트</h2>
            <Card>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, color: 'var(--text-secondary)', lineHeight: '1.8' }}>
                <li>• Board 패키지 내부이지만 API·서비스·DTO는 완전히 분리된 독립 흐름입니다.</li>
                <li>• 목록 조회는 게시글과 댓글을 분리하고 파일·댓글 수를 배치 조회하는 구조가 핵심 — 105개 쿼리를 3개로 압축했습니다.</li>
                <li>• 작성/수정/삭제는 이메일 인증, 삭제는 배치 Soft Delete, 댓글 알림은 비동기 조건부 발송입니다.</li>
                <li>• 채팅 연동은 JWT 기반 목격자 식별 + 작성자 ID 경량 조회로 IDOR와 오버헤드를 동시에 줄였습니다.</li>
              </ul>
            </Card>
          </section>

          {/* ── 관련 페이지 ── */}
          <section id="docs" style={{ marginBottom: '3rem', scrollMarginTop: '2rem' }}>
            <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>관련 페이지</h2>
            <Card>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, color: 'var(--text-secondary)', lineHeight: '2' }}>
                <li>• <Link to="/domains/missing-pet/optimization" style={{ color: 'var(--link-color)', textDecoration: 'none' }}>Missing Pet 성능 최적화</Link></li>
                <li>• <Link to="/domains/missing-pet/refactoring" style={{ color: 'var(--link-color)', textDecoration: 'none' }}>Missing Pet 리팩토링</Link></li>
                <li>• <Link to="/domains/board" style={{ color: 'var(--link-color)', textDecoration: 'none' }}>Board 도메인</Link></li>
              </ul>
            </Card>
          </section>
        </div>

        <TableOfContents sections={sections} />
      </div>
    </div>
  );
}

export default MissingPetDomain;
