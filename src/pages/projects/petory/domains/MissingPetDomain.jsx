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
    { id: 'features', title: '주요 기능' },
    { id: 'service-logic', title: '핵심 서비스 로직' },
    { id: 'architecture', title: '아키텍처' },
    { id: 'relationships', title: '도메인 연관관계' },
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
            MissingPet 도메인은 실종 반려동물 제보와 목격 정보 공유를 담당합니다. 사용자가 실종 제보를 올리고,
            다른 사용자는 댓글로 목격 정보를 남기며, 필요하면 제보자와 목격자가 1:1 채팅으로 바로 연결될 수 있도록 설계했습니다.
          </p>

          <section id="intro" style={{ marginBottom: '3rem', scrollMarginTop: '2rem' }}>
            <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>도메인 개요</h2>
            <Card style={{ marginBottom: '1rem' }}>
              <p style={{ lineHeight: '1.8', color: 'var(--text-secondary)', marginBottom: '0.75rem' }}>
                <code>docs/domains/missingpet.md</code> 기준으로 MissingPet 도메인의 핵심은{' '}
                <strong style={{ color: 'var(--text-color)' }}>
                  실종 제보 게시글, 목격 댓글, 제보자-목격자 채팅 시작, 이메일 인증, 관리자 운영 기능을
                  Board 도메인 내부에서 별도 흐름으로 분리해 다루는 것
                </strong>
                입니다.
              </p>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, color: 'var(--text-secondary)', lineHeight: '1.8' }}>
                {li('코드는 별도 domain/missingpet가 아니라 `domain/board/` 내부에 위치합니다.')}
                {li('게시글 목록과 댓글 목록을 분리해 조인 폭발과 N+1 문제를 줄였습니다.')}
                {li('실종 제보 작성/수정/삭제는 이메일 인증을 요구하고, 게시글/댓글 모두 Soft Delete를 사용합니다.')}
              </ul>
            </Card>

            <Card>
              <h3 style={{ marginBottom: '0.75rem', color: 'var(--text-color)', fontSize: '1rem' }}>핵심 성과</h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, color: 'var(--text-secondary)', lineHeight: '1.8' }}>
                <li>• 게시글 목록 조회 쿼리: <strong style={{ color: 'var(--text-color)' }}>105개 → 3개</strong></li>
                <li>• 백엔드 응답 시간: <strong style={{ color: 'var(--text-color)' }}>571ms → 106ms</strong></li>
                <li>• 메모리 사용량: <strong style={{ color: 'var(--text-color)' }}>11MB → 3MB</strong></li>
                <li>
                  • 자세한 전후 측정은{' '}
                  <Link to="/domains/missing-pet/optimization" style={{ color: 'var(--link-color)', textDecoration: 'none' }}>
                    성능 최적화
                  </Link>
                  , 코드 정리는{' '}
                  <Link to="/domains/missing-pet/refactoring" style={{ color: 'var(--link-color)', textDecoration: 'none' }}>
                    리팩토링
                  </Link>
                  에 분리했습니다.
                </li>
              </ul>
            </Card>
          </section>

          <section id="features" style={{ marginBottom: '3rem', scrollMarginTop: '2rem' }}>
            <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>주요 기능</h2>

            <Card style={{ marginBottom: '1rem' }}>
              <h3 style={{ marginBottom: '0.75rem', color: 'var(--text-color)', fontSize: '1rem' }}>1. 실종 제보 게시글</h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, color: 'var(--text-secondary)', lineHeight: '1.8' }}>
                {li('제목, 내용, 반려동물 이름, 종류, 품종, 성별, 나이, 색상, 실종일, 실종 위치, 좌표를 저장합니다.')}
                {li('작성/수정/삭제 시 이메일 인증(`EmailVerificationPurpose.MISSING_PET`)이 필요합니다.')}
                {li('이미지는 `FileTargetType.MISSING_PET`로 첨부하고 첫 번째 파일만 저장합니다.')}
              </ul>
            </Card>

            <Card style={{ marginBottom: '1rem' }}>
              <h3 style={{ marginBottom: '0.75rem', color: 'var(--text-color)', fontSize: '1rem' }}>2. 상태 관리</h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, color: 'var(--text-secondary)', lineHeight: '1.8' }}>
                {li('기본 상태는 `MISSING`입니다.')}
                {li('이후 `FOUND`, `RESOLVED`로 상태를 변경할 수 있습니다.')}
                {li('공개 API와 관리자 API 모두 상태 변경 엔드포인트를 갖지만, 잘못된 값 처리 방식은 서로 다릅니다.')}
              </ul>
            </Card>

            <Card style={{ marginBottom: '1rem' }}>
              <h3 style={{ marginBottom: '0.75rem', color: 'var(--text-color)', fontSize: '1rem' }}>3. 목격 댓글</h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, color: 'var(--text-secondary)', lineHeight: '1.8' }}>
                {li('목격 위치 주소와 좌표를 함께 남길 수 있습니다.')}
                {li('이미지는 `FileTargetType.MISSING_PET_COMMENT`로 첨부합니다.')}
                {li('댓글 작성자가 게시글 작성자와 다를 때만 비동기 알림을 발송합니다.')}
                {li('댓글 목록은 별도 API로 조회해 게시글 목록과 댓글을 분리합니다.')}
              </ul>
            </Card>

            <Card>
              <h3 style={{ marginBottom: '0.75rem', color: 'var(--text-color)', fontSize: '1rem' }}>4. 채팅 연동</h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, color: 'var(--text-secondary)', lineHeight: '1.8' }}>
                {li('"목격했어요" 버튼은 `POST /api/missing-pets/{boardIdx}/start-chat`을 호출합니다.')}
                {li('목격자 ID는 쿼리 파라미터가 아니라 JWT principal에서 가져옵니다.')}
                {li('서비스는 게시글 전체를 읽지 않고 `getUserIdByBoardIdx()`로 제보자 ID만 조회한 뒤 채팅방을 생성합니다.')}
              </ul>
            </Card>
          </section>

          <section id="service-logic" style={{ marginBottom: '3rem', scrollMarginTop: '2rem' }}>
            <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>핵심 서비스 로직</h2>

            <Card style={{ marginBottom: '1rem' }}>
              <h3 style={{ marginBottom: '0.75rem', color: 'var(--text-color)', fontSize: '1rem' }}>
                목록 조회: 게시글/댓글 분리 + 배치 조회
              </h3>
              <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', marginBottom: '0.75rem' }}>
                목록 API는 댓글을 즉시 가져오지 않습니다. 게시글+작성자, 파일, 댓글 수만 각각 최적화된 경로로 읽고
                DTO에서는 댓글 접근을 아예 차단해 LAZY 로딩을 피합니다.
              </p>
              <MermaidDiagram chart={listFlow} />
              <CodeBlock>{`boards = repository.findAllByOrderByCreatedAtDesc(pageable);
attachmentsMap = attachmentFileService.getAttachmentsBatch(MISSING_PET, boardIds);
commentCounts = missingPetCommentService.getCommentCountsBatch(boardIds);
dtos = converter.toBoardDTOWithoutComments(boards);`}</CodeBlock>
            </Card>

            <Card style={{ marginBottom: '1rem' }}>
              <h3 style={{ marginBottom: '0.75rem', color: 'var(--text-color)', fontSize: '1rem' }}>
                상세 조회와 댓글 페이징
              </h3>
              <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', marginBottom: '0.5rem' }}>
                상세는 `findByIdWithUser(id)`로 게시글을 가져오고, 댓글은 `commentPage`, `commentSize` 파라미터로 별도 조회합니다.
                `commentSize=0`이면 상세 응답에서 댓글 목록을 아예 제외할 수 있습니다.
              </p>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, color: 'var(--text-secondary)', lineHeight: '1.8' }}>
                {li('삭제된 게시글은 조회 시 예외 처리합니다.')}
                {li('댓글 수는 `countByBoardAndIsDeletedFalse` COUNT 쿼리로 별도 집계합니다.')}
              </ul>
            </Card>

            <Card style={{ marginBottom: '1rem' }}>
              <h3 style={{ marginBottom: '0.75rem', color: 'var(--text-color)', fontSize: '1rem' }}>
                작성/수정/삭제와 이메일 인증
              </h3>
              <CodeBlock>{`board = repository.findByIdWithUser(id).orElseThrow(...);
if (!user.getEmailVerified()) {
  throw new EmailVerificationRequiredException(...MISSING_PET);
}

board.setIsDeleted(true);
board.setDeletedAt(now);
commentService.deleteAllCommentsByBoard(board);`}</CodeBlock>
              <ul style={{ listStyle: 'none', padding: 0, marginTop: '0.75rem', color: 'var(--text-secondary)', lineHeight: '1.8' }}>
                {li('작성/수정/삭제 모두 이메일 인증이 선행 조건입니다.')}
                {li('게시글 삭제 시 관련 댓글도 함께 Soft Delete 됩니다.')}
                {li('댓글 일괄 삭제는 루프 save가 아니라 배치 UPDATE로 최적화했습니다.')}
              </ul>
            </Card>

            <Card style={{ marginBottom: '1rem' }}>
              <h3 style={{ marginBottom: '0.75rem', color: 'var(--text-color)', fontSize: '1rem' }}>
                댓글 작성/삭제와 알림
              </h3>
              <CodeBlock>{`if (!board.getUser().getIdx().equals(commentWriter.getIdx())) {
  sendMissingPetCommentNotificationAsync(...);
}`}</CodeBlock>
              <ul style={{ listStyle: 'none', padding: 0, marginTop: '0.75rem', color: 'var(--text-secondary)', lineHeight: '1.8' }}>
                {li('댓글 작성은 게시글/사용자 존재 확인 후 저장합니다.')}
                {li('자기 글에 자기 댓글이면 알림을 보내지 않습니다.')}
                {li('댓글 삭제는 소속 게시글 검증 후 Soft Delete 합니다.')}
              </ul>
            </Card>

            <Card>
              <h3 style={{ marginBottom: '0.75rem', color: 'var(--text-color)', fontSize: '1rem' }}>
                관리자 조회와 경량 채팅 시작
              </h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, color: 'var(--text-secondary)', lineHeight: '1.8' }}>
                {li('관리자 목록은 `Specification + DB 페이징`으로 status/deleted/q 필터를 DB에서 처리합니다.')}
                {li('채팅 시작은 게시글 전체를 읽지 않고 작성자 ID만 프로젝션으로 조회합니다.')}
                {li('공개 API 상태 변경은 `BoardValidationException`, 관리자 API는 `IllegalArgumentException`을 사용해 현재 예외 타입이 다릅니다.')}
              </ul>
            </Card>
          </section>

          <section id="architecture" style={{ marginBottom: '3rem', scrollMarginTop: '2rem' }}>
            <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>아키텍처</h2>

            <Card style={{ marginBottom: '1rem' }}>
              <h3 style={{ marginBottom: '0.75rem', color: 'var(--text-color)', fontSize: '1rem' }}>도메인 구조</h3>
              <CodeBlock>{`domain/board/
  controller/
    MissingPetBoardController.java
  service/
    MissingPetBoardService.java
    MissingPetCommentService.java
  entity/
    MissingPetBoard.java
    MissingPetComment.java
    MissingPetStatus.java
    MissingPetGender.java
  repository/
    MissingPetBoardRepository.java
    MissingPetCommentRepository.java
  dto/
    MissingPetBoardDTO.java
    MissingPetBoardPageResponseDTO.java
    MissingPetCommentDTO.java
    MissingPetCommentPageResponseDTO.java

domain/admin/
  controller/
    AdminMissingPetController.java`}</CodeBlock>
              <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', marginTop: '0.75rem', marginBottom: 0 }}>
                MissingPet은 별도 최상위 도메인이 아니라 Board 도메인 하위 기능이지만, API와 서비스는 독립적으로 분리돼 있습니다.
              </p>
            </Card>

            <Card style={{ marginBottom: '1rem' }}>
              <h3 style={{ marginBottom: '0.75rem', color: 'var(--text-color)', fontSize: '1rem' }}>주요 엔티티</h3>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid var(--nav-border)' }}>
                    <th style={{ padding: '0.65rem 0.75rem', textAlign: 'left', color: 'var(--text-color)' }}>엔티티</th>
                    <th style={{ padding: '0.65rem 0.75rem', textAlign: 'left', color: 'var(--text-color)' }}>역할</th>
                    <th style={{ padding: '0.65rem 0.75rem', textAlign: 'left', color: 'var(--text-color)' }}>특징</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['MissingPetBoard', '실종 제보 게시글', 'BaseTimeEntity 상속, 상태(MISSING/FOUND/RESOLVED), Soft Delete, 실종 위치/좌표 저장'],
                    ['MissingPetComment', '목격 댓글', 'BaseTimeEntity 미사용, `@PrePersist` createdAt, 주소/좌표, Soft Delete'],
                  ].map(([name, role, feature], index, arr) => (
                    <tr key={name} style={{ borderBottom: index < arr.length - 1 ? '1px solid var(--nav-border)' : 'none' }}>
                      <td style={{ padding: '0.65rem 0.75rem', color: 'var(--text-color)' }}>{name}</td>
                      <td style={{ padding: '0.65rem 0.75rem' }}>{role}</td>
                      <td style={{ padding: '0.65rem 0.75rem' }}>{feature}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Card>

            <Card style={{ marginBottom: '1rem' }}>
              <h3 style={{ marginBottom: '0.75rem', color: 'var(--text-color)', fontSize: '1rem' }}>엔티티 관계도</h3>
              <MermaidDiagram chart={entityDiagram} />
            </Card>

            <Card>
              <h3 style={{ marginBottom: '0.75rem', color: 'var(--text-color)', fontSize: '1rem' }}>주요 API</h3>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid var(--nav-border)' }}>
                    <th style={{ padding: '0.65rem 0.75rem', textAlign: 'left', color: 'var(--text-color)' }}>엔드포인트</th>
                    <th style={{ padding: '0.65rem 0.75rem', textAlign: 'left', color: 'var(--text-color)' }}>Method</th>
                    <th style={{ padding: '0.65rem 0.75rem', textAlign: 'left', color: 'var(--text-color)' }}>설명</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['/api/missing-pets', 'GET', '목록 조회 (페이징, status, page/size)'],
                    ['/api/missing-pets/{id}', 'GET', '상세 조회 (`commentPage`, `commentSize`)'],
                    ['/api/missing-pets', 'POST', '작성, 이메일 인증 필요'],
                    ['/api/missing-pets/{id}', 'PUT', '수정, 이메일 인증 필요'],
                    ['/api/missing-pets/{id}/status', 'PATCH', '상태 변경, body `status` 필요'],
                    ['/api/missing-pets/{id}', 'DELETE', '게시글 Soft Delete + 댓글 일괄 Soft Delete'],
                    ['/api/missing-pets/{id}/comments', 'GET/POST', '댓글 목록 / 댓글 작성'],
                    ['/api/missing-pets/{boardId}/comments/{commentId}', 'DELETE', '댓글 Soft Delete'],
                    ['/api/missing-pets/{boardIdx}/start-chat', 'POST', 'JWT 기반 목격자-제보자 채팅 시작'],
                    ['/api/admin/missing-pets/paging', 'GET', '관리자 목록 (status/deleted/q/page/size)'],
                    ['/api/admin/missing-pets/{id}/restore', 'POST', '관리자 복구'],
                  ].map(([path, method, desc], index, arr) => (
                    <tr key={path + method} style={{ borderBottom: index < arr.length - 1 ? '1px solid var(--nav-border)' : 'none' }}>
                      <td style={{ padding: '0.65rem 0.75rem' }}>
                        <code style={{ backgroundColor: 'var(--bg-color)', padding: '0.15rem 0.35rem', borderRadius: '4px' }}>{path}</code>
                      </td>
                      <td style={{ padding: '0.65rem 0.75rem' }}>{method}</td>
                      <td style={{ padding: '0.65rem 0.75rem' }}>{desc}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Card>
          </section>

          <section id="relationships" style={{ marginBottom: '3rem', scrollMarginTop: '2rem' }}>
            <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>도메인 연관관계</h2>
            <Card>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, color: 'var(--text-secondary)', lineHeight: '1.8' }}>
                {li('User: 게시글/댓글 작성자, 이메일 인증(MISSING_PET)')}
                {li('File: 게시글 이미지(`MISSING_PET`), 댓글 이미지(`MISSING_PET_COMMENT`)')}
                {li('Chat: `ConversationService.createMissingPetChat()`로 제보자-목격자 1:1 채팅 시작')}
                {li('Notification: 댓글 작성 시 제보자에게 `MISSING_PET_COMMENT` 알림')}
                {li('Report: 실종 제보 신고 대상과 연결')}
              </ul>
            </Card>
          </section>

          <section id="performance" style={{ marginBottom: '3rem', scrollMarginTop: '2rem' }}>
            <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>성능 최적화</h2>

            <Card style={{ marginBottom: '1rem' }}>
              <h3 style={{ marginBottom: '0.75rem', color: 'var(--text-color)', fontSize: '1rem' }}>핵심 최적화 포인트</h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, color: 'var(--text-secondary)', lineHeight: '1.8' }}>
                {li('첨부파일은 `getAttachmentsBatch()`로 한 번에 조회합니다.')}
                {li('댓글 수는 `getCommentCountsBatch()`와 `countCommentsByBoardIds`로 배치 집계합니다.')}
                {li('게시글 삭제 시 댓글은 `softDeleteAllByBoardIdx` 배치 UPDATE로 처리합니다.')}
                {li('채팅 시작은 게시글 전체가 아니라 작성자 ID만 프로젝션으로 읽습니다.')}
                {li('관리자 목록은 Specification + DB 페이징으로 메모리 필터링을 제거했습니다.')}
              </ul>
            </Card>

            <Card>
              <h3 style={{ marginBottom: '0.75rem', color: 'var(--text-color)', fontSize: '1rem' }}>인덱스 전략</h3>
              <CodeBlock>{`CREATE INDEX idx_missing_pet_user ON missing_pet_board(user_idx, is_deleted, created_at);
CREATE INDEX idx_missing_pet_location ON missing_pet_board(latitude, longitude);
CREATE INDEX idx_missing_pet_status ON missing_pet_board(status, is_deleted, created_at);

CREATE INDEX FKe3sca61815j9cxi608oxmrfjt ON missing_pet_comment(user_idx);
CREATE INDEX FKpodx5stuchr73mrjgffir72ii ON missing_pet_comment(board_idx);`}</CodeBlock>
              <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', marginTop: '0.75rem', marginBottom: 0 }}>
                실종 제보는 상태·삭제 여부·생성일, 작성자, 좌표, 게시글별 댓글 조회가 주요 접근 패턴이라 그 조합에 맞춰 인덱스를 두고 있습니다.
              </p>
            </Card>
          </section>

          <section id="summary" style={{ marginBottom: '3rem', scrollMarginTop: '2rem' }}>
            <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>핵심 포인트</h2>
            <Card>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, color: 'var(--text-secondary)', lineHeight: '1.8' }}>
                <li>• MissingPet은 Board 도메인 내부에 있지만, 게시글/댓글/채팅/관리자 API 흐름은 독립적으로 분리돼 있습니다.</li>
                <li>• 목록 조회는 게시글과 댓글을 분리하고 파일/댓글 수를 배치 조회하는 구조가 핵심입니다.</li>
                <li>• 작성/수정/삭제는 이메일 인증, 삭제는 Soft Delete, 댓글 알림은 비동기 조건부 발송이라는 정책을 가집니다.</li>
                <li>• 채팅 시작은 JWT 기반으로 목격자를 식별하고, 작성자 ID만 경량 조회해 오버헤드를 줄입니다.</li>
                <li>• 관리자 경로는 DB 페이징과 복구 기능을 포함하지만, 공개 API와 예외 처리 방식이 일부 다릅니다.</li>
              </ul>
            </Card>
          </section>

          <section id="docs" style={{ marginBottom: '3rem', scrollMarginTop: '2rem' }}>
            <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>관련 페이지</h2>
            <Card>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, color: 'var(--text-secondary)', lineHeight: '2' }}>
                <li>
                  •{' '}
                  <Link to="/domains/missing-pet/optimization" style={{ color: 'var(--link-color)', textDecoration: 'none' }}>
                    Missing Pet 성능 최적화
                  </Link>
                </li>
                <li>
                  •{' '}
                  <Link to="/domains/missing-pet/refactoring" style={{ color: 'var(--link-color)', textDecoration: 'none' }}>
                    Missing Pet 리팩토링
                  </Link>
                </li>
                <li>
                  •{' '}
                  <Link to="/domains/board" style={{ color: 'var(--link-color)', textDecoration: 'none' }}>
                    Board 도메인
                  </Link>
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

export default MissingPetDomain;
