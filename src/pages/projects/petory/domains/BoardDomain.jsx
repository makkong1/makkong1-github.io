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
    { id: 'design', title: '기능 & 아키텍처' },
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

          {/* ── 기능 & 아키텍처 ── */}
          <section id="design" style={{ marginBottom: '3rem', scrollMarginTop: '2rem' }}>
            <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>기능 & 아키텍처</h2>

            {/* 게시글 CRUD & 검색 */}
            <Card style={{ marginBottom: '1rem' }}>
              <h3 style={{ marginBottom: '0.75rem', color: 'var(--text-color)', fontSize: '1rem' }}>게시글 CRUD & 검색</h3>
              <ul style={{ listStyle: 'none', padding: 0, marginBottom: '0.75rem', color: 'var(--text-secondary)', lineHeight: '1.8' }}>
                {li('카테고리 필터·페이지(기본 20개) 목록, 이미지 첨부 지원.')}
                {li('게시글·댓글 수정/삭제 전 이메일 인증 확인 (BOARD_EDIT / COMMENT_EDIT).')}
                {li('댓글 수정 서비스는 구현돼 있지만 컨트롤러 수정 엔드포인트는 현재 미노출.')}
              </ul>
              <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', marginBottom: '0.3rem' }}>
                검색은 두 경로로 단순화:
              </p>
              <CodeBlock>{`switch (searchType != null ? searchType.toUpperCase() : "TITLE_CONTENT") {
  case "NICKNAME":
    boardPage = boardRepository.searchByNicknameWithPaging(keyword, pageable);
    break;
  case "TITLE_CONTENT":
  default:
    boardPage = boardRepository.searchByKeywordWithPaging(keyword, pageable); // FULLTEXT
    break;
}`}</CodeBlock>
            </Card>

            {/* 반응 & 조회수 */}
            <Card style={{ marginBottom: '1rem' }}>
              <h3 style={{ marginBottom: '0.75rem', color: 'var(--text-color)', fontSize: '1rem' }}>반응 & 조회수</h3>
              <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', marginBottom: '0.5rem' }}>
                조회수는 <code style={{ backgroundColor: 'var(--bg-color)', padding: '0.1rem 0.3rem', borderRadius: '4px' }}>BoardViewLog</code>로 중복을 막고,
                반응은 LIKE/DISLIKE 테이블로 관리하되 조회 성능을 위해 <code style={{ backgroundColor: 'var(--bg-color)', padding: '0.1rem 0.3rem', borderRadius: '4px' }}>likeCount</code> · <code style={{ backgroundColor: 'var(--bg-color)', padding: '0.1rem 0.3rem', borderRadius: '4px' }}>dislikeCount</code>를 실시간 동기화합니다.
              </p>
              <CodeBlock>{`// 조회수 중복 방지
boolean alreadyViewed = boardViewLogRepository.existsByBoardAndUser(board, viewer);
if (!alreadyViewed) { boardViewLogRepository.save(log); board.setViewCount(...+1); }

// 반응 토글 (board_idx + user_idx UNIQUE)
if (existing.isPresent() && sameReaction) {
  boardReactionRepository.delete(existing.get());        // 취소
} else if (existing.isPresent()) {
  existing.get().setReactionType(reactionType);          // LIKE ↔ DISLIKE
} else {
  boardReactionRepository.save(newReaction);             // 신규
}`}</CodeBlock>
            </Card>

            {/* 인기글 스냅샷 */}
            <Card style={{ marginBottom: '1rem' }}>
              <h3 style={{ marginBottom: '0.75rem', color: 'var(--text-color)', fontSize: '1rem' }}>인기글 스냅샷</h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, color: 'var(--text-secondary)', lineHeight: '1.8' }}>
                {li('실시간 집계 대신 스케줄러 기반: 매일 18:30 주간 스냅샷, 매주 월요일 18:30 월간 스냅샷.')}
                {li('점수 = 좋아요 × 3 + 댓글 × 2 + 조회수. 기본 대상: "자랑" 카테고리.')}
                {li('조회 fallback: 정확한 날짜 → 겹치는 기간 → 최근 스냅샷 → 새 생성.')}
              </ul>
            </Card>

            {/* 목록 N+1 배치 조회 */}
            <Card style={{ marginBottom: '1rem' }}>
              <h3 style={{ marginBottom: '0.75rem', color: 'var(--text-color)', fontSize: '1rem' }}>목록 조회 — 배치 집계</h3>
              <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', marginBottom: '0.5rem' }}>
                반응 수·첨부파일을 게시글마다 개별 조회하면 N+1이 폭증합니다. 게시글 ID 목록을 먼저 모아 500개 단위 배치로 IN 집계합니다.
              </p>
              <CodeBlock>{`List<Long> boardIds = boards.stream().map(Board::getIdx).toList();

Map<Long, Map<ReactionType, Long>> reactionCountsMap =
    getReactionCountsBatch(boardIds);   // GROUP BY 집계, 500개 단위

Map<Long, List<FileDTO>> attachmentsMap =
    attachmentFileService.getAttachmentsBatch(FileTargetType.BOARD, boardIds);`}</CodeBlock>
            </Card>

            {/* 엔티티 관계도 */}
            <Card style={{ marginBottom: '1rem' }}>
              <h3 style={{ marginBottom: '0.75rem', color: 'var(--text-color)', fontSize: '1rem' }}>엔티티 관계도</h3>
              <MermaidDiagram chart={entityDiagram} />
            </Card>

            {/* 주요 API */}
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
                    ['/api/boards', 'GET/POST', '목록 조회 / 게시글 작성'],
                    ['/api/boards/{id}', 'GET/PUT/DELETE', '상세 · 수정 · 삭제'],
                    ['/api/boards/search', 'GET', '검색 (TITLE_CONTENT / NICKNAME)'],
                    ['/api/boards/popular', 'GET', '주간·월간 인기글 스냅샷'],
                    ['/api/boards/{id}/comments', 'GET/POST', '댓글 목록 / 작성'],
                    ['/api/boards/{id}/reactions', 'POST', '게시글 반응 토글'],
                    ['/api/boards/{id}/comments/{cid}/reactions', 'POST', '댓글 반응 토글'],
                    ['/api/admin/boards/...', 'GET/POST', '관리자 블라인드 · 삭제 · 복구']
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
              <p style={{ color: 'var(--text-secondary)', lineHeight: '1.7', marginTop: '0.75rem', marginBottom: 0, fontSize: '0.88rem' }}>
                SecurityConfig <code style={{ backgroundColor: 'var(--bg-color)', padding: '0.1rem 0.3rem', borderRadius: '4px' }}>/api/**</code> catch-all로 인해 GET에 <code style={{ backgroundColor: 'var(--bg-color)', padding: '0.1rem 0.3rem', borderRadius: '4px' }}>permitAll()</code>이 있어도 실제로는 인증이 필요합니다.
              </p>
            </Card>
          </section>

          <section id="troubleshooting" style={{ marginBottom: '3rem', scrollMarginTop: '2rem' }}>
            <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>트러블슈팅</h2>

            <Card style={{ marginBottom: '1rem' }}>
              <h3 style={{ marginBottom: '0.75rem', color: 'var(--text-color)', fontSize: '1rem' }}>목록 N+1 (301 queries → 3)</h3>
              <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', marginBottom: '0.4rem' }}>
                <strong style={{ color: 'var(--text-color)' }}>문제:</strong> 목록 조회 시 반응 수·첨부파일을 게시글마다 개별 쿼리로 가져와 301개 쿼리·745ms 발생.
              </p>
              <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', marginBottom: '0.75rem' }}>
                <strong style={{ color: 'var(--text-color)' }}>해결:</strong> ID 목록 선조회 후 500개 단위 IN + GROUP BY 배치 집계. 쿼리 3개·30ms로 단축.
              </p>
              <Link to="/domains/board/optimization" style={{ color: 'var(--link-color)', textDecoration: 'none', fontWeight: 600 }}>
                → 성능 최적화 상세
              </Link>
            </Card>

            {[
              [
                '인기글 스냅샷 조회 공백',
                '요청 시점에 해당 기간 스냅샷이 없으면 인기글 목록이 비어 사용자에게 빈 화면이 표시됩니다.',
                '정확한 날짜 → 겹치는 기간 → 최근 스냅샷 → 즉시 생성 순으로 fallback 처리해 항상 결과를 반환합니다.'
              ],
              [
                '스냅샷 생성 중 집계 경합',
                '실시간 좋아요/댓글/조회수 업데이트 중에 스냅샷을 생성하면 카운트가 섞일 수 있습니다.',
                '스케줄러 실행 시점에 배치 조회로 일관된 상태를 읽고 상위 30개만 저장해 안정성을 확보했습니다.'
              ],
              [
                'SecurityConfig catch-all 충돌',
                'GET /api/boards에 @PreAuthorize("permitAll()")을 붙였지만 /api/** catch-all로 인해 실제로는 인증이 필요했습니다.',
                '공개 접근이 필요한 경로는 SecurityConfig의 requestMatchers 예외 목록에 명시적으로 추가해야 합니다.'
              ]
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
