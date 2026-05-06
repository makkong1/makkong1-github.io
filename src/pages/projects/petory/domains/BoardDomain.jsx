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

function BoardDomain() {
  const sections = [
    { id: 'intro', title: '도메인 개요' },
    { id: 'features', title: '주요 기능' },
    { id: 'service-logic', title: '핵심 서비스 로직' },
    { id: 'architecture', title: '아키텍처' },
    { id: 'troubleshooting', title: '트러블슈팅' },
    { id: 'performance', title: '성능 최적화' },
    { id: 'summary', title: '핵심 포인트' },
    { id: 'docs', title: '관련 페이지' }
  ];

  const entityDiagram = `erDiagram
    Users ||--o{ Board : "writes"
    Board ||--o{ Comment : "has"
    Board ||--o{ BoardReaction : "has"
    Board ||--o{ BoardViewLog : "has"
    Board ||--o{ BoardPopularitySnapshot : "has"
    Comment ||--o{ CommentReaction : "has"
    Users ||--o{ Comment : "writes"
    Users ||--o{ BoardReaction : "reacts"
    Users ||--o{ CommentReaction : "reacts"
    Users ||--o{ BoardViewLog : "views"
    Users ||--o{ MissingPetBoard : "writes"
    MissingPetBoard ||--o{ MissingPetComment : "has"
    Users ||--o{ MissingPetComment : "writes"

    Board {
        Long idx PK
        Long user_idx FK
        String title
        String content
        String category
        ContentStatus status
        Integer viewCount
        Integer likeCount
        Integer dislikeCount
        Integer commentCount
        LocalDateTime lastReactionAt
        Boolean isDeleted
    }

    Comment {
        Long idx PK
        Long board_idx FK
        Long user_idx FK
        String content
        ContentStatus status
        Boolean isDeleted
    }

    BoardReaction {
        Long idx PK
        Long board_idx FK
        Long user_idx FK
        ReactionType reactionType
    }

    BoardViewLog {
        Long id PK
        Long board_id FK
        Long user_id FK
        LocalDateTime viewedAt
    }

    BoardPopularitySnapshot {
        Long snapshotId PK
        Long board_id FK
        PopularityPeriodType periodType
        LocalDate periodStartDate
        LocalDate periodEndDate
        Integer ranking
        Integer popularityScore
    }`;

  const li = (text) => <li style={{ marginBottom: '0.35rem' }}>• {text}</li>;

  return (
    <div className="domain-page-wrapper" style={{ padding: '2rem 0' }}>
      <div className="domain-page-container" style={{ display: 'flex', gap: '2rem', alignItems: 'flex-start' }}>
        <div className="domain-page-content" style={{ flex: 1 }}>
          <h1 style={{ marginBottom: '0.5rem', color: 'var(--text-color)' }}>게시판 도메인</h1>
          <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', marginBottom: '2.5rem', fontSize: '0.95rem' }}>
            Board 도메인은 커뮤니티 게시판의 본체입니다. 게시글 CRUD, 댓글, 좋아요/싫어요 반응, 조회수 중복 방지,
            인기글 스냅샷, 검색, 관리자 운영 기능까지 한 도메인 안에서 다루며, 실서비스에서 조회 빈도가 높아 성능 최적화와
            데이터 정합성이 특히 중요했던 영역입니다.
          </p>

          <section id="intro" style={{ marginBottom: '3rem', scrollMarginTop: '2rem' }}>
            <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>도메인 개요</h2>
            <Card style={{ marginBottom: '1rem' }}>
              <p style={{ lineHeight: '1.8', color: 'var(--text-secondary)', marginBottom: '0.75rem' }}>
                `docs/domains/board.md` 기준으로 Board 도메인의 핵심은{" "}
                <strong style={{ color: 'var(--text-color)' }}>자주 읽히는 목록/상세 경로를 빠르게 유지하면서, 반응·댓글·조회수처럼
                동시성에 민감한 상태를 안정적으로 관리하는 것</strong>
                입니다.
              </p>
              <ul style={{ listStyle: 'none', padding: 0, color: 'var(--text-secondary)', lineHeight: '1.8', margin: 0 }}>
                {li('게시글 CRUD, 카테고리 필터링, 검색, 댓글, 반응, 인기글 스냅샷을 한 도메인에서 제공합니다.')}
                {li('조회수·좋아요·댓글 수는 읽기 성능을 위해 실시간 카운트 필드와 로그/반응 테이블을 함께 사용합니다.')}
                {li('관리자 API는 `domain/admin`의 `AdminBoardController`와 연결되어 블라인드, 삭제, 복구까지 지원합니다.')}
              </ul>
            </Card>

            <Card>
              <h3 style={{ marginBottom: '0.75rem', color: 'var(--text-color)', fontSize: '1rem' }}>핵심 성과</h3>
              <ul style={{ listStyle: 'none', padding: 0, color: 'var(--text-secondary)', lineHeight: '1.8', margin: 0 }}>
                <li>• 게시글 목록 조회: <strong style={{ color: 'var(--text-color)' }}>301개 쿼리 → 3개 쿼리</strong></li>
                <li>• 실행 시간: <strong style={{ color: 'var(--text-color)' }}>745ms → 30ms</strong></li>
                <li>• 메모리 사용량: <strong style={{ color: 'var(--text-color)' }}>22.50MB → 2MB</strong></li>
                <li>• 검색은 `TITLE_CONTENT`와 `NICKNAME` 두 경로로 단순화하고, 제목/내용 검색은 FULLTEXT 기준으로 정리했습니다.</li>
              </ul>
            </Card>
          </section>

          <section id="features" style={{ marginBottom: '3rem', scrollMarginTop: '2rem' }}>
            <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>주요 기능</h2>

            <Card style={{ marginBottom: '1rem' }}>
              <h3 style={{ marginBottom: '0.75rem', color: 'var(--text-color)', fontSize: '1rem' }}>1. 게시글 작성 및 조회</h3>
              <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', marginBottom: '0.5rem' }}>
                사용자는 게시글을 작성하고 카테고리별로 필터링된 목록을 페이지 단위로 조회할 수 있습니다.
              </p>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, color: 'var(--text-secondary)', lineHeight: '1.8' }}>
                {li('제목, 내용, 카테고리 기반 게시글 작성')}
                {li('이미지 첨부 지원')}
                {li('기본 20개 단위 페이징')}
                {li('내 게시글 조회, 관리자용 단일 조회/목록 조회 분리')}
              </ul>
            </Card>

            <Card style={{ marginBottom: '1rem' }}>
              <h3 style={{ marginBottom: '0.75rem', color: 'var(--text-color)', fontSize: '1rem' }}>2. 댓글 및 반응 시스템</h3>
              <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', marginBottom: '0.5rem' }}>
                댓글 작성, 삭제, 복구와 게시글/댓글 좋아요·싫어요 토글을 지원합니다.
              </p>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, color: 'var(--text-secondary)', lineHeight: '1.8' }}>
                {li('댓글 작성 시 게시글 작성자에게 `BOARD_COMMENT` 알림 발송')}
                {li('같은 반응 재클릭 시 취소, 다른 반응 클릭 시 타입 변경')}
                {li('댓글 삭제/복구 시 `commentCount`를 실시간 반영')}
                {li('댓글 수정 서비스는 구현돼 있지만 현재 컨트롤러 수정 엔드포인트는 열려 있지 않습니다.')}
              </ul>
            </Card>

            <Card style={{ marginBottom: '1rem' }}>
              <h3 style={{ marginBottom: '0.75rem', color: 'var(--text-color)', fontSize: '1rem' }}>3. 인기글 시스템</h3>
              <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', marginBottom: '0.5rem' }}>
                인기글은 실시간 집계가 아니라 스냅샷 기반으로 운영합니다.
              </p>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, color: 'var(--text-secondary)', lineHeight: '1.8' }}>
                {li('매일 18:30 주간 스냅샷, 매주 월요일 18:30 월간 스냅샷 생성')}
                {li('인기도 점수 = 좋아요 × 3 + 댓글 × 2 + 조회수')}
                {li('생성 대상은 기본적으로 "자랑" 카테고리 게시글')}
                {li('조회 시 정확한 날짜 매칭 → 겹치는 기간 → 최근 스냅샷 → 새 생성 순으로 fallback')}
              </ul>
            </Card>

            <Card>
              <h3 style={{ marginBottom: '0.75rem', color: 'var(--text-color)', fontSize: '1rem' }}>4. 게시글 검색</h3>
              <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', marginBottom: '0.5rem' }}>
                검색은 `searchType` 기준으로 `TITLE_CONTENT`와 `NICKNAME` 두 가지 모드로 정리했습니다.
              </p>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, color: 'var(--text-secondary)', lineHeight: '1.8' }}>
                {li('`TITLE_CONTENT`: 제목+내용 통합 검색, FULLTEXT 인덱스 활용')}
                {li('`NICKNAME`: 작성자 닉네임 검색, JOIN 쿼리 + DB 레벨 페이징')}
                {li('기본 검색 타입은 `TITLE_CONTENT`')}
              </ul>
            </Card>
          </section>

          <section id="service-logic" style={{ marginBottom: '3rem', scrollMarginTop: '2rem' }}>
            <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>핵심 서비스 로직</h2>

            <Card style={{ marginBottom: '1rem' }}>
              <h3 style={{ marginBottom: '0.75rem', color: 'var(--text-color)', fontSize: '1rem' }}>
                게시글 목록 조회: N+1을 배치 집계로 전환
              </h3>
              <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', marginBottom: '0.5rem' }}>
                목록 API는 게시글만 가져오고 끝나지 않습니다. 좋아요/싫어요 수, 첨부파일, 사용자 반응 여부까지 함께 보여줘야 해서
                가장 먼저 N+1 문제가 터지던 지점이었습니다.
              </p>
              <CodeBlock>{`List<Long> boardIds = boards.stream()
    .map(Board::getIdx)
    .collect(Collectors.toList());

Map<Long, Map<ReactionType, Long>> reactionCountsMap =
    getReactionCountsBatch(boardIds);   // 500개 단위 배치

Map<Long, List<FileDTO>> attachmentsMap =
    attachmentFileService.getAttachmentsBatch(FileTargetType.BOARD, boardIds);`}</CodeBlock>
              <ul style={{ listStyle: 'none', padding: 0, marginTop: '0.75rem', color: 'var(--text-secondary)', lineHeight: '1.8' }}>
                {li('반응 수는 `GROUP BY` 집계 쿼리로 한 번에 가져옵니다.')}
                {li('IN 절 크기를 고려해 500개 단위로 쪼개는 배치 전략을 사용합니다.')}
                {li('첨부파일도 배치 조회해 목록 DTO 매핑 단계에서 한 번에 붙입니다.')}
              </ul>
            </Card>

            <Card style={{ marginBottom: '1rem' }}>
              <h3 style={{ marginBottom: '0.75rem', color: 'var(--text-color)', fontSize: '1rem' }}>
                조회수 중복 방지: `BoardViewLog`
              </h3>
              <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', marginBottom: '0.5rem' }}>
                상세 조회는 단순히 `viewCount++`로 끝내면 새로고침만으로 왜곡됩니다. 로그인 사용자는 게시글-사용자 조합을 로그 테이블에 남겨
                같은 사용자의 반복 조회를 막습니다.
              </p>
              <CodeBlock>{`boolean alreadyViewed =
    boardViewLogRepository.existsByBoardAndUser(board, viewer);

if (!alreadyViewed) {
  boardViewLogRepository.save(log);
  board.setViewCount(board.getViewCount() + 1);
}`}</CodeBlock>
            </Card>

            <Card style={{ marginBottom: '1rem' }}>
              <h3 style={{ marginBottom: '0.75rem', color: 'var(--text-color)', fontSize: '1rem' }}>
                반응 토글과 실시간 카운트 필드
              </h3>
              <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', marginBottom: '0.5rem' }}>
                반응은 별도 테이블에 저장하지만, 조회 성능을 위해 `Board.likeCount`, `dislikeCount`, `lastReactionAt`을 실시간 갱신합니다.
              </p>
              <CodeBlock>{`if (existing.isPresent() && sameReaction) {
  boardReactionRepository.delete(existing.get());   // 토글 취소
} else if (existing.isPresent()) {
  existing.get().setReactionType(reactionType);     // LIKE ↔ DISLIKE 변경
  board.setLastReactionAt(LocalDateTime.now());
} else {
  boardReactionRepository.save(newReaction);        // 신규 반응
  board.setLastReactionAt(LocalDateTime.now());
}`}</CodeBlock>
              <ul style={{ listStyle: 'none', padding: 0, marginTop: '0.75rem', color: 'var(--text-secondary)', lineHeight: '1.8' }}>
                {li('`board_idx + user_idx` 유니크 제약으로 중복 저장 자체를 막습니다.')}
                {li('삭제 시에는 마지막 반응 시간을 유지하고, 추가/변경 시에만 `lastReactionAt`을 갱신합니다.')}
              </ul>
            </Card>

            <Card style={{ marginBottom: '1rem' }}>
              <h3 style={{ marginBottom: '0.75rem', color: 'var(--text-color)', fontSize: '1rem' }}>
                댓글 작성/삭제/복구와 이메일 인증
              </h3>
              <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', marginBottom: '0.5rem' }}>
                댓글과 게시글의 수정/삭제는 모두 이메일 인증 여부를 확인합니다. 인증이 안 된 사용자는
                `EmailVerificationRequiredException`으로 막고, 목적 코드로 `BOARD_EDIT` 또는 `COMMENT_EDIT`를 전달합니다.
              </p>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, color: 'var(--text-secondary)', lineHeight: '1.8' }}>
                {li('게시글 수정/삭제: `EmailVerificationPurpose.BOARD_EDIT`')}
                {li('댓글 수정/삭제: `EmailVerificationPurpose.COMMENT_EDIT`')}
                {li('댓글 삭제/복구 시 `commentCount`도 함께 증감해 목록/상세 조회 비용을 줄입니다.')}
              </ul>
            </Card>

            <Card>
              <h3 style={{ marginBottom: '0.75rem', color: 'var(--text-color)', fontSize: '1rem' }}>
                검색 타입 분기
              </h3>
              <CodeBlock>{`switch (searchType != null ? searchType.toUpperCase() : "TITLE_CONTENT") {
  case "NICKNAME":
    boardPage = boardRepository.searchByNicknameWithPaging(trimmedKeyword, pageable);
    break;
  case "TITLE_CONTENT":
  default:
    boardPage = boardRepository.searchByKeywordWithPaging(trimmedKeyword, pageable);
    break;
}`}</CodeBlock>
              <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', marginTop: '0.75rem', marginBottom: 0 }}>
                이전처럼 제목/내용/제목+내용을 각자 나누기보다, 실제 운영 경로를 `TITLE_CONTENT`와 `NICKNAME` 두 종류로 단순화해
                쿼리와 UX를 함께 정리한 구조입니다.
              </p>
            </Card>
          </section>

          <section id="architecture" style={{ marginBottom: '3rem', scrollMarginTop: '2rem' }}>
            <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>아키텍처</h2>

            <Card style={{ marginBottom: '1rem' }}>
              <h3 style={{ marginBottom: '0.75rem', color: 'var(--text-color)', fontSize: '1rem' }}>도메인 구조</h3>
              <CodeBlock>{`domain/board/
  controller/
    BoardController.java
    MissingPetBoardController.java
  service/
    BoardService.java
    CommentService.java
    ReactionService.java
    BoardPopularityService.java
    BoardPopularityScheduler.java
  repository/
    BoardRepository.java
    CommentRepository.java
    BoardReactionRepository.java
    CommentReactionRepository.java
    BoardViewLogRepository.java
    BoardPopularitySnapshotRepository.java
  entity/
    Board.java
    Comment.java
    BoardReaction.java
    CommentReaction.java
    BoardViewLog.java
    BoardPopularitySnapshot.java`}</CodeBlock>
              <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', marginTop: '0.75rem', marginBottom: 0 }}>
                Missing Pet 게시판도 같은 도메인 아래에 있지만, 포트폴리오 페이지와 API는 별도 흐름으로 관리합니다.
              </p>
            </Card>

            <Card style={{ marginBottom: '1rem' }}>
              <h3 style={{ marginBottom: '0.75rem', color: 'var(--text-color)', fontSize: '1rem' }}>주요 엔티티</h3>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid var(--nav-border)' }}>
                    <th style={{ padding: '0.65rem 0.75rem', textAlign: 'left', color: 'var(--text-color)' }}>엔티티</th>
                    <th style={{ padding: '0.65rem 0.75rem', textAlign: 'left', color: 'var(--text-color)' }}>역할</th>
                    <th style={{ padding: '0.65rem 0.75rem', textAlign: 'left', color: 'var(--text-color)' }}>핵심 필드</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['Board', '게시글 본문과 실시간 집계 필드 보유', 'category, status, viewCount, likeCount, dislikeCount, commentCount, lastReactionAt'],
                    ['Comment', '게시글 댓글과 상태 관리', 'content, status, isDeleted, deletedAt'],
                    ['BoardReaction', '게시글 좋아요/싫어요 반응', 'board_idx, user_idx, reactionType'],
                    ['BoardViewLog', '사용자별 조회 기록 저장', 'board_id, user_id, viewedAt'],
                    ['BoardPopularitySnapshot', '주간/월간 인기글 스냅샷', 'periodType, periodStartDate, periodEndDate, ranking, popularityScore']
                  ].map(([name, role, fields], index, arr) => (
                    <tr key={name} style={{ borderBottom: index < arr.length - 1 ? '1px solid var(--nav-border)' : 'none' }}>
                      <td style={{ padding: '0.65rem 0.75rem', color: 'var(--text-color)' }}>{name}</td>
                      <td style={{ padding: '0.65rem 0.75rem' }}>{role}</td>
                      <td style={{ padding: '0.65rem 0.75rem' }}>{fields}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Card>

            <Card style={{ marginBottom: '1rem' }}>
              <h3 style={{ marginBottom: '0.75rem', color: 'var(--text-color)', fontSize: '1rem' }}>엔티티 관계도</h3>
              <MermaidDiagram chart={entityDiagram} />
            </Card>

            <Card style={{ marginBottom: '1rem' }}>
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
                    ['/api/boards', 'GET', '게시글 목록 조회 (category, page, size)'],
                    ['/api/boards/{id}', 'GET', '게시글 상세 조회 (viewerId로 조회수 중복 방지)'],
                    ['/api/boards', 'POST', '게시글 작성'],
                    ['/api/boards/{id}', 'PUT', '게시글 수정'],
                    ['/api/boards/{id}', 'DELETE', '게시글 삭제'],
                    ['/api/boards/search', 'GET', '게시글 검색 (TITLE_CONTENT/NICKNAME)'],
                    ['/api/boards/popular', 'GET', '주간/월간 인기글 스냅샷 조회'],
                    ['/api/boards/{boardId}/comments', 'GET/POST', '댓글 목록 조회 / 댓글 작성'],
                    ['/api/boards/{boardId}/reactions', 'POST', '게시글 반응 토글'],
                    ['/api/boards/{boardId}/comments/{commentId}/reactions', 'POST', '댓글 반응 토글']
                  ].map(([path, method, desc], index, arr) => (
                    <tr key={path + method} style={{ borderBottom: index < arr.length - 1 ? '1px solid var(--nav-border)' : 'none' }}>
                      <td style={{ padding: '0.65rem 0.75rem' }}><code style={{ backgroundColor: 'var(--bg-color)', padding: '0.15rem 0.35rem', borderRadius: '4px' }}>{path}</code></td>
                      <td style={{ padding: '0.65rem 0.75rem' }}>{method}</td>
                      <td style={{ padding: '0.65rem 0.75rem' }}>{desc}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', marginTop: '0.75rem', marginBottom: 0, fontSize: '0.9rem' }}>
                보안 설정상 `/api/**`는 기본적으로 인증이 필요합니다. 따라서 일부 GET 메서드에 `permitAll()`이 있어도,
                공개 예외 경로를 따로 두지 않으면 게시판 조회 역시 로그인 사용자 기준으로 동작합니다.
              </p>
            </Card>

            <Card>
              <h3 style={{ marginBottom: '0.75rem', color: 'var(--text-color)', fontSize: '1rem' }}>다른 도메인과의 연관</h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, color: 'var(--text-secondary)', lineHeight: '1.8' }}>
                {li('User: 작성자, 반응 사용자, 조회 사용자, 이메일 인증 여부(`emailVerified`)')}
                {li('File: 게시글/댓글 첨부 이미지 (`AttachmentFile`, BOARD / COMMENT)')}
                {li('Notification: 댓글 작성 시 게시글 작성자에게 `BOARD_COMMENT` 알림')}
                {li('Report: 신고 결과에 따라 게시글/댓글 상태가 `BLINDED`, `DELETED`로 변경될 수 있음')}
                <li>
                  • Missing Pet: 같은 게시판 계열이지만 별도 UX와 API를 사용합니다.{" "}
                  <Link to="/domains/missing-pet" style={{ color: 'var(--link-color)', textDecoration: 'none' }}>
                    Missing Pet 도메인 보기
                  </Link>
                </li>
              </ul>
            </Card>
          </section>

          <section id="troubleshooting" style={{ marginBottom: '3rem', scrollMarginTop: '2rem' }}>
            <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>트러블슈팅</h2>

            {[
              ['N+1 문제 해결', '게시글 목록에서 반응 수를 게시글마다 따로 세면 조회량이 폭증합니다.', '반응 수·첨부파일을 배치 조회하고 DTO 매핑 단계에서 합쳐 2001개 쿼리를 3개로 줄였습니다.'],
              ['조회수 중복 방지', '같은 사용자의 새로고침이 조회수에 계속 반영될 수 있습니다.', 'BoardViewLog에 게시글-사용자 조합을 기록해 반복 증가를 막았습니다.'],
              ['반응 중복 방지', '동일 사용자의 동시 클릭은 중복 반응 저장 위험이 있습니다.', '유니크 제약과 토글 로직으로 하나의 반응만 유지합니다.'],
              ['인기글 스냅샷 조회 전략', '정확한 기간 스냅샷이 없으면 인기글 조회가 비게 될 수 있습니다.', '정확한 날짜 → 겹치는 기간 → 최근 스냅샷 → 새 생성 순으로 fallback 합니다.'],
              ['스냅샷 생성 시 동시성', '실시간 집계는 좋아요/댓글/조회수 카운트가 섞일 위험이 있습니다.', '배치 조회로 점수를 계산하고 상위 30개만 저장해 안정성을 확보했습니다.'],
              ['인기글 대상 카테고리', '모든 카테고리를 다 집계하면 비용이 커지고 의미도 흐려집니다.', '기본 대상은 "자랑"이며, 레거시 호환을 위해 실패 시 `PRIDE` 카테고리 재조회도 고려합니다.']
            ].map(([title, problem, solution]) => (
              <Card key={title} style={{ marginBottom: '1rem' }}>
                <h3 style={{ marginBottom: '0.75rem', color: 'var(--text-color)', fontSize: '1rem' }}>{title}</h3>
                <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', marginBottom: '0.4rem' }}>
                  <strong style={{ color: 'var(--text-color)' }}>문제:</strong> {problem}
                </p>
                <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', marginBottom: 0 }}>
                  <strong style={{ color: 'var(--text-color)' }}>해결:</strong> {solution}
                </p>
              </Card>
            ))}
          </section>

          <section id="performance" style={{ marginBottom: '3rem', scrollMarginTop: '2rem' }}>
            <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>성능 최적화</h2>

            <Card style={{ marginBottom: '1rem' }}>
              <h3 style={{ marginBottom: '0.75rem', color: 'var(--text-color)', fontSize: '1rem' }}>인덱스 전략</h3>
              <CodeBlock>{`CREATE INDEX idx_board_category_deleted_created ON board(category, is_deleted, created_at);
CREATE INDEX idx_board_deleted_created ON board(is_deleted, created_at);
CREATE INDEX idx_board_status ON board(status);
CREATE FULLTEXT INDEX idx_board_title_content ON board(title, content);
CREATE INDEX idx_board_user_deleted_created ON board(user_idx, is_deleted, created_at);

CREATE UNIQUE INDEX uk_board_view_log_board_user ON board_view_log(board_id, user_id);
CREATE UNIQUE INDEX uk_comment_reaction_comment_user ON comment_reaction(comment_idx, user_idx);
CREATE UNIQUE INDEX UKaymqx4hghgrqitkbplgp553u0 ON board_reaction(board_idx, user_idx);`}</CodeBlock>
              <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', marginTop: '0.75rem', marginBottom: 0 }}>
                카테고리/삭제 여부/생성일, 상태, 사용자별 조회 같은 실제 접근 패턴에 맞춰 인덱스를 구성했고, 반응·조회 로그는
                중복 방지를 위해 유니크 인덱스를 같이 둡니다.
              </p>
            </Card>

            <Card style={{ marginBottom: '1rem' }}>
              <h3 style={{ marginBottom: '0.75rem', color: 'var(--text-color)', fontSize: '1rem' }}>쿼리 최적화</h3>
              <CodeBlock>{`-- Before
SELECT * FROM board WHERE is_deleted = false;
SELECT COUNT(*) FROM board_reaction WHERE board_idx = ? AND reaction_type = 'LIKE';

-- After
SELECT * FROM board WHERE is_deleted = false ORDER BY created_at DESC LIMIT 20;
SELECT board_idx, reaction_type, COUNT(*)
FROM board_reaction
WHERE board_idx IN (?, ?, ..., ?)
GROUP BY board_idx, reaction_type;`}</CodeBlock>
              <ul style={{ listStyle: 'none', padding: 0, marginTop: '0.75rem', color: 'var(--text-secondary)', lineHeight: '1.8' }}>
                {li('배치 조회로 N+1 제거')}
                {li('IN + GROUP BY 집계로 목록 페이지의 부하 감소')}
                {li('검색은 FULLTEXT, 닉네임 검색은 JOIN으로 DB 레벨 페이징')}
              </ul>
            </Card>

            <Card style={{ marginBottom: '1rem' }}>
              <h3 style={{ marginBottom: '0.75rem', color: 'var(--text-color)', fontSize: '1rem' }}>애플리케이션 레벨 최적화</h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, color: 'var(--text-secondary)', lineHeight: '1.8' }}>
                {li('조회 메서드는 `@Transactional(readOnly = true)`로 읽기 최적화')}
                {li('인기글 스냅샷은 스케줄러로 생성해 사용자 요청 시 실시간 집계를 피함')}
                {li('반응 수 조회는 500개, 인기글 집계는 1000개 단위 배치 처리')}
                {li('캐시는 수정/삭제/댓글/반응 시 무효화되도록 설계했지만, 일부 경로는 조회수 실시간 반영 때문에 비활성화 상태를 유지합니다.')}
              </ul>
            </Card>

            <Card>
              <h3 style={{ marginBottom: '0.75rem', color: 'var(--text-color)', fontSize: '1rem' }}>최적화 효과</h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, color: 'var(--text-secondary)', lineHeight: '1.8' }}>
                <li>• N+1 제거로 게시글 목록 조회 성능을 크게 개선했습니다.</li>
                <li>• 인기글은 매 요청 집계 대신 스냅샷 조회로 바꿔 DB 부하를 낮췄습니다.</li>
                <li>• 실시간 카운트 필드와 로그/반응 테이블을 역할 분리해 읽기 성능과 정확도를 같이 챙겼습니다.</li>
              </ul>
            </Card>
          </section>

          <section id="summary" style={{ marginBottom: '3rem', scrollMarginTop: '2rem' }}>
            <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>핵심 포인트</h2>
            <Card>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, color: 'var(--text-secondary)', lineHeight: '1.8' }}>
                <li>• 조회 중심 도메인이기 때문에 N+1 제거와 배치 조회 전략이 가장 큰 성능 개선 포인트였습니다.</li>
                <li>• BoardViewLog, 유니크 제약, 실시간 카운트 필드로 조회수·반응·댓글 수의 정합성을 유지했습니다.</li>
                <li>• 인기글은 스냅샷 기반으로 운영하고 다단계 fallback 전략으로 데이터 공백을 막았습니다.</li>
                <li>• 검색은 `TITLE_CONTENT`와 `NICKNAME` 두 모드로 단순화해 성능과 UX를 함께 정리했습니다.</li>
                <li>• 게시글/댓글 수정·삭제는 이메일 인증을 필수로 두어 운영 책임을 명확히 했습니다.</li>
              </ul>
            </Card>
          </section>

          <section id="docs" style={{ marginBottom: '3rem', scrollMarginTop: '2rem' }}>
            <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>관련 페이지</h2>
            <Card>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, color: 'var(--text-secondary)', lineHeight: '2' }}>
                <li>
                  •{' '}
                  <Link to="/domains/board/optimization" style={{ color: 'var(--link-color)', textDecoration: 'none' }}>
                    Board 도메인 성능 최적화
                  </Link>
                </li>
                <li>
                  •{' '}
                  <Link to="/domains/board/refactoring" style={{ color: 'var(--link-color)', textDecoration: 'none' }}>
                    Board 도메인 리팩토링
                  </Link>
                </li>
                <li>
                  •{' '}
                  <Link to="/domains/missing-pet" style={{ color: 'var(--link-color)', textDecoration: 'none' }}>
                    Missing Pet 도메인
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

export default BoardDomain;
