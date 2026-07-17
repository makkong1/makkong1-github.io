import { Link } from 'react-router-dom';
import MermaidDiagram from '../../../../components/Common/MermaidDiagram';
import TableOfContents from '../../../../components/Common/TableOfContents';

// Board 도메인 상세 작업 로그 (아카이브)
// - 기존 BoardDomainOptimization(N+1 목록) + BoardDomainRefactoring(Admin·댓글·공통화) 통합
function BoardDomainDetail() {
  const sections = [
    { id: 'intro', title: '개요' },
    { id: 'list-n1', title: '게시글 목록 N+1 (대표)' },
    { id: 'search-popular', title: '검색 · 인기글 · 동시성' },
    { id: 'cleanup', title: '부가 성능 · 구조 정리' },
    { id: 'audit', title: '쿼리 감사 — 아직 남은 것' },
    { id: 'summary', title: '요약' }
  ];

  const card = {
    padding: '1.5rem',
    backgroundColor: 'var(--card-bg)',
    borderRadius: '8px',
    border: '1px solid var(--nav-border)'
  };
  const pre = {
    padding: '1rem',
    backgroundColor: 'var(--bg-color)',
    borderRadius: '6px',
    overflow: 'auto',
    fontSize: '0.8rem',
    color: 'var(--text-secondary)'
  };
  const th = { padding: '0.75rem', textAlign: 'left', color: 'var(--text-color)', fontWeight: 'bold' };
  const td = { padding: '0.75rem' };

  const beforeSeq = `sequenceDiagram
    participant Service as BoardService
    participant DB as MySQL
    Service->>DB: SELECT board ... (1)
    Note over Service,DB: N+1 발생
    loop 각 게시글마다
        Service->>DB: 작성자 LAZY 조회
        Service->>DB: 좋아요 COUNT
        Service->>DB: 싫어요 COUNT
        Service->>DB: 첨부파일 조회
    end
    Note over Service,DB: 100개 기준 1+10+100+100+100 ≈ 301개 쿼리`;

  const afterSeq = `sequenceDiagram
    participant Service as BoardService
    participant DB as MySQL
    Service->>DB: 게시글 + 작성자 (JOIN FETCH) (1)
    Service->>DB: 반응 배치 조회 (IN 절 GROUP BY) (2)
    Service->>DB: 첨부파일 배치 조회 (3)
    Note over Service,DB: 게시글 수 무관 3개 쿼리로 고정`;

  return (
    <div className="domain-page-wrapper" style={{ padding: '2rem 0' }}>
      <div className="domain-page-container" style={{ display: 'flex', gap: '2rem', alignItems: 'flex-start' }}>
        <div className="domain-page-content" style={{ flex: 1 }}>
          <div style={{ marginBottom: '1rem' }}>
            <Link to="/domains/board" style={{ color: 'var(--link-color)', textDecoration: 'none', fontSize: '0.9rem' }}>
              ← Board 도메인으로 돌아가기
            </Link>
          </div>
          <h1 style={{ marginBottom: '0.5rem', color: 'var(--text-color)' }}>Board 도메인 — 성능 · 구조 상세</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '2rem', lineHeight: 1.7 }}>
            대표 사례(N+1)는 <Link to="/domains/refactoring#n-plus-one" style={{ color: 'var(--link-color)', textDecoration: 'none' }}>리팩토링 대표 사례</Link>에 큐레이션돼 있습니다.
            이 페이지는 Board 백엔드 작업의 <strong style={{ color: 'var(--text-secondary)' }}>상세 기록(작업 로그)</strong>입니다.
          </p>

          {/* 1. 개요 */}
          <section id="intro" style={{ marginBottom: '3rem', scrollMarginTop: '2rem' }}>
            <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>개요</h2>
            <div className="section-card" style={card}>
              <p style={{ lineHeight: '1.8', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                게시글 목록 조회의 <strong style={{ color: 'var(--text-color)' }}>N+1</strong> 해결이 핵심이고, 검색·인기글·Admin·댓글 등 부가 성능/구조 작업을 함께 정리했습니다.
                (대상: Board·Comment·Reaction·BoardViewLog / MissingPet 게시판 / BoardPopularitySnapshot)
              </p>
              <div style={{ padding: '1rem', backgroundColor: 'var(--bg-color)', borderRadius: '6px', border: '1px solid var(--nav-border)' }}>
                <h3 style={{ marginBottom: '0.75rem', color: 'var(--text-color)', fontSize: '1rem' }}>핵심 성과 (목록 조회 · worktree 실측)</h3>
                <ul style={{ listStyle: 'none', padding: 0, color: 'var(--text-secondary)', lineHeight: '1.8', fontSize: '0.9rem' }}>
                  <li>• 쿼리 수: <strong style={{ color: 'var(--text-color)' }}>301개 → 3개</strong> (99% 감소, 게시글 수와 무관하게 고정)</li>
                  <li>• 실행 시간: <strong style={{ color: 'var(--text-color)' }}>787ms → 38ms</strong> (약 20배, 보조 지표)</li>
                </ul>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.82rem', marginTop: '0.5rem', marginBottom: 0, lineHeight: 1.7 }}>
                  ※ <code>git worktree</code>로 실제 이전 커밋을 checkout해 재측정한 값입니다. 주 지표는 쿼리 수이고,
                  절대 시간은 JIT·커넥션풀 워밍업 탓에 실행마다 달라지므로 보조로만 씁니다.
                </p>
              </div>
            </div>
          </section>

          {/* 2. 게시글 목록 N+1 (대표) */}
          <section id="list-n1" style={{ marginBottom: '3rem', scrollMarginTop: '2rem' }}>
            <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>게시글 목록 N+1 (대표)</h2>

            <div className="section-card" style={{ ...card, marginBottom: '1rem' }}>
              <h3 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>문제 — 301개 쿼리 (100개 게시글)</h3>
              <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', marginBottom: '0.75rem', fontSize: '0.9rem' }}>
                부모 게시글 조회 후 작성자·좋아요·싫어요·첨부파일을 <strong style={{ color: 'var(--text-color)' }}>항목마다 개별 조회</strong>. 측정: <code>BoardPerformanceComparisonTest</code> + Hibernate Statistics (게시글 100 / 작성자 10명 순환 / 반응 700개).
              </p>
              <ul style={{ listStyle: 'none', padding: 0, color: 'var(--text-secondary)', lineHeight: '1.8', fontSize: '0.9rem', marginBottom: '0.75rem' }}>
                <li>• 게시글 1 + 작성자 LAZY 10 + 좋아요 100 + 싫어요 100 + 첨부 100 ≈ <strong style={{ color: 'var(--text-color)' }}>301개</strong></li>
              </ul>
              <MermaidDiagram chart={beforeSeq} />
            </div>

            <div className="section-card" style={{ ...card, marginBottom: '1rem' }}>
              <h3 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>해결 — 배치 조회 + Fetch Join</h3>
              <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', marginBottom: '0.5rem', fontSize: '0.9rem' }}>
                <strong style={{ color: 'var(--text-color)' }}>① 작성자</strong>: 항상 필요한 ManyToOne → <code>JOIN FETCH</code>로 함께 조회
              </p>
              <pre style={pre}>
{`@Query("SELECT b FROM Board b JOIN FETCH b.user u " +
       "WHERE b.isDeleted = false AND u.isDeleted = false AND u.status = 'ACTIVE' " +
       "ORDER BY b.createdAt DESC")
List<Board> findAllByIsDeletedFalseOrderByCreatedAtDesc();`}
              </pre>
              <p style={{ color: 'var(--text-muted)', lineHeight: '1.6', margin: '0.4rem 0 0', fontSize: '0.8rem' }}>
                이유: ManyToOne(다대일)이라 Fetch Join해도 중복 행이 생기지 않아 바로 적용.
              </p>

              <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', margin: '0.75rem 0 0.5rem', fontSize: '0.9rem' }}>
                <strong style={{ color: 'var(--text-color)' }}>② 반응</strong>: 게시글 ID 모아 <code>IN</code> 절 GROUP BY 배치 조회 → <code>Map</code>으로 매핑 (500개 단위 배치)
              </p>
              <pre style={pre}>
{`// Repository: 반응 배치 집계
@Query("SELECT br.board.idx, br.reactionType, COUNT(br) " +
       "FROM BoardReaction br WHERE br.board.idx IN :boardIds " +
       "GROUP BY br.board.idx, br.reactionType")
List<Object[]> countByBoardsGroupByReactionType(@Param("boardIds") List<Long> boardIds);

// Service: ID 수집 → 배치 조회 → Map 매핑
List<Long> boardIds = boards.stream().map(Board::getIdx).toList();
Map<Long, Map<ReactionType, Long>> reactionCounts = getReactionCountsBatch(boardIds); // 500개 단위
// board별 dto.setLikes/ setDislikes 를 메모리에서 매핑`}
              </pre>
              <p style={{ color: 'var(--text-muted)', lineHeight: '1.6', margin: '0.4rem 0 0', fontSize: '0.8rem' }}>
                이유: OneToMany 집계라 Fetch Join 시 카티션 곱으로 중복 행이 생김 → IN절 배치 + Map 매핑으로 우회.
              </p>

              <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', margin: '0.75rem 0 0.5rem', fontSize: '0.9rem' }}>
                <strong style={{ color: 'var(--text-color)' }}>③ 첨부파일</strong>: File 도메인의 <code>getAttachmentsBatch()</code>로 게시글 ID들을 한 번에 조회 → <code>targetIdx</code>별 그룹핑
              </p>
              <pre style={pre}>
{`// FileService: 배치 조회 + targetIdx별 그룹핑
public Map<Long, List<FileDTO>> getAttachmentsBatch(FileTargetType targetType, List<Long> targetIndices) {
    List<AttachmentFile> files = attachmentFileRepository
        .findByTargetTypeAndTargetIdxIn(targetType, targetIndices);
    return files.stream()
        .collect(Collectors.groupingBy(AttachmentFile::getTargetIdx, /* -> FileDTO 변환 + 다운로드 URL 부여 */));
}

// Service: 게시글 ID 리스트로 한 번에 조회 → board별 dto.setAttachments 매핑`}
              </pre>
              <p style={{ color: 'var(--text-muted)', lineHeight: '1.6', margin: '0.4rem 0 0', fontSize: '0.8rem' }}>
                이유: 첨부파일은 Board와 JPA 연관관계가 없는 File 도메인 소속 엔티티라 Fetch Join 자체가 불가능 → 도메인 간 배치 조회로 해결.
              </p>
            </div>

            <div className="section-card" style={{ ...card, marginBottom: '1rem' }}>
              <h3 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>결과</h3>
              <div style={{ overflowX: 'auto', marginBottom: '1rem' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                  <thead>
                    <tr style={{ borderBottom: '2px solid var(--nav-border)' }}>
                      <th style={th}>항목</th><th style={th}>개선 전</th><th style={th}>개선 후</th><th style={th}>개선율</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr style={{ borderBottom: '1px solid var(--nav-border)' }}>
                      <td style={td}>목록 조회</td>
                      <td style={{ ...td, color: '#e74c3c', fontWeight: 'bold' }}>301개 / 787ms</td>
                      <td style={{ ...td, color: '#27ae60', fontWeight: 'bold' }}>3개 / 38ms</td>
                      <td style={{ ...td, color: 'var(--link-color)', fontWeight: 'bold' }}>99% ↓, 약 20배</td>
                    </tr>
                    <tr>
                      <td style={td}>반응만 조회 (100개)</td>
                      <td style={{ ...td, color: '#e74c3c', fontWeight: 'bold' }}>201개 / 244ms / 8MB</td>
                      <td style={{ ...td, color: '#27ae60', fontWeight: 'bold' }}>2개 / ~0ms / 0.5MB</td>
                      <td style={{ ...td, color: 'var(--link-color)', fontWeight: 'bold' }}>99% ↓, 93.8% ↓</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1rem' }}>
                <strong style={{ color: 'var(--text-color)' }}>확장성:</strong> 게시글이 100개든 1000개든 쿼리 수는 <strong style={{ color: 'var(--text-color)' }}>3개로 고정</strong>.
              </p>
              <MermaidDiagram chart={afterSeq} />
            </div>
          </section>

          {/* 3. 검색 · 인기글 · 동시성 */}
          <section id="search-popular" style={{ marginBottom: '3rem', scrollMarginTop: '2rem' }}>
            <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>검색 · 인기글 · 동시성</h2>
            <div className="section-card" style={{ ...card, marginBottom: '1rem' }}>
              <h3 style={{ marginBottom: '0.5rem', color: 'var(--text-color)' }}>인기글 스냅샷 (실시간 계산 → 사전 생성)</h3>
              <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', marginBottom: '0.5rem' }}>스케줄러로 인기글 스냅샷을 미리 생성·저장하고, 조회 시 스냅샷에서 바로 반환 → 데이터 증가에도 즉시 응답.</p>
              <pre style={pre}>
{`@Scheduled(cron = "0 30 18 * * ?")  // 매일 18:30
@Transactional
public void generateWeeklyPopularitySnapshots() {
    boardPopularityService.generateSnapshots(PopularityPeriodType.WEEKLY);
}`}
              </pre>
            </div>
            <div className="section-card" style={{ ...card, marginBottom: '1rem' }}>
              <h3 style={{ marginBottom: '0.5rem', color: 'var(--text-color)' }}>FULLTEXT 검색</h3>
              <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', marginBottom: '0.5rem' }}>LIKE 검색(풀스캔) → ngram FULLTEXT 인덱스로 전환</p>
              <pre style={pre}>{`CREATE FULLTEXT INDEX idx_board_title_content ON board(title, content) WITH PARSER ngram;`}</pre>
            </div>
            <div className="section-card" style={card}>
              <h3 style={{ marginBottom: '0.5rem', color: 'var(--text-color)' }}>동시성 제어</h3>
              <ul style={{ listStyle: 'none', padding: 0, color: 'var(--text-secondary)', lineHeight: '1.8', fontSize: '0.9rem' }}>
                <li>• <strong style={{ color: 'var(--text-color)' }}>반응 중복 방지</strong>: Unique 제약 (board_idx, user_idx)</li>
                <li>• <strong style={{ color: 'var(--text-color)' }}>댓글 수</strong>: 원자적 UPDATE로 직접 증가 (Lost Update 방지)</li>
              </ul>
            </div>
          </section>

          {/* 4. 부가 성능 · 구조 정리 (refactoring) */}
          <section id="cleanup" style={{ marginBottom: '3rem', scrollMarginTop: '2rem' }}>
            <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>부가 성능 · 구조 정리</h2>

            <div className="section-card" style={{ ...card, marginBottom: '1rem' }}>
              <h3 style={{ marginBottom: '0.5rem', color: 'var(--text-color)' }}>Admin 전체 메모리 로드 제거</h3>
              <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', marginBottom: '0.5rem' }}>
                <code>GET /api/admin/boards</code>가 전체 게시글을 메모리 로드( <code>deleted=true</code>면 2번 호출)해 OOM/지연 위험. → 목록 엔드포인트 제거, <strong style={{ color: 'var(--text-color)' }}>단건 조회 API</strong>로 전환(ReportDetailModal도 단건 조회).
              </p>
            </div>

            <div className="section-card" style={{ ...card, marginBottom: '1rem' }}>
              <h3 style={{ marginBottom: '0.5rem', color: 'var(--text-color)' }}>Admin 페이징 DB 레벨 필터링</h3>
              <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', marginBottom: '0.5rem' }}>
                전체 조회 후 메모리 필터 + <code>subList()</code> 페이징(1만 건 로드 후 20건 반환) → <strong style={{ color: 'var(--text-color)' }}>Specification + DB 레벨 필터링·페이징</strong>.
              </p>
            </div>

            <div className="section-card" style={{ ...card, marginBottom: '1rem' }}>
              <h3 style={{ marginBottom: '0.5rem', color: 'var(--text-color)' }}>댓글 수 · 댓글 반응 N+1</h3>
              <ul style={{ listStyle: 'none', padding: 0, color: 'var(--text-secondary)', lineHeight: '1.8', fontSize: '0.9rem' }}>
                <li>• <code>getCommentCount()</code>: 댓글 전체 로드 후 <code>size()</code> → <code>countByBoardAndIsDeletedFalse</code> COUNT 쿼리 (N건 로드 → 1 COUNT)</li>
                <li>• 댓글 반응: 댓글마다 LIKE/DISLIKE 2회 조회(2N) → <code>countByCommentsGroupByReactionType</code> IN 절 배치 (2N → 1~2)</li>
              </ul>
            </div>

            <div className="section-card" style={card}>
              <h3 style={{ marginBottom: '0.5rem', color: 'var(--text-color)' }}>중복 코드 공통화</h3>
              <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}>
                <code>extractPrimaryFileUrl</code> 로직이 4개 서비스에 중복 → <code>AttachmentFileService.extractPrimaryFileUrl()</code>로 추출.
              </p>
            </div>
          </section>

          {/* 5. 요약 */}
          <section id="audit" style={{ marginBottom: '3rem', scrollMarginTop: '2rem' }}>
            <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>쿼리 감사 — 아직 남은 것 (2026-07)</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1rem', lineHeight: 1.7 }}>
              <Link to="/domains/refactoring#query-audit" style={{ color: 'var(--link-color)', textDecoration: 'none' }}>
                전체 쿼리 감사
              </Link>
              는 <strong style={{ color: 'var(--text-color)' }}>이 페이지의 게시글 목록 튜닝을 "완료"로 판단했다가 틀렸다는 걸 깨달으면서 시작됐습니다.</strong>{' '}
              고친 건 목록 SELECT였고, <code>Page&lt;&gt;</code>가 그 옆에서 함께 날리던 COUNT 쿼리는 보고 있지도 않았습니다.
              감사에서 board에 대해 나온 것 중 아직 안 고친 것들을 적어둡니다.
            </p>

            <div className="section-card" style={{ ...card, border: '1px dashed var(--nav-border)' }}>
              <ul style={{ listStyle: 'none', padding: 0, color: 'var(--text-secondary)', lineHeight: '1.9', fontSize: '0.9rem', margin: 0 }}>
                <li>
                  • <strong style={{ color: 'var(--text-color)' }}>깊은 페이지 OFFSET</strong> — 뒤쪽 페이지를 요청하면
                  <strong style={{ color: 'var(--text-color)' }}> 100,000행을 검사하고 0행을 반환</strong>합니다(129ms).
                  키셋 페이징과 지연 조인 중 무엇을 쓸지는 <strong style={{ color: 'var(--text-color)' }}>UI가 "다음 페이지"만 쓸지 페이지 번호를 노출할지에 달려</strong> 있어서, 그 결정 전에는 고르지 않았습니다.
                </li>
                <li>
                  • <strong style={{ color: 'var(--text-color)' }}>자동생성 COUNT</strong> — <code>countQuery</code>를 명시하지 않으면
                  Hibernate가 본문 쿼리의 JOIN을 물고 COUNT를 만듭니다. board 목록은 호출마다 <strong style={{ color: 'var(--text-color)' }}>60,001행</strong>을 검사합니다.
                  프로젝트 전체에 같은 형태가 <strong style={{ color: 'var(--text-color)' }}>16개</strong> 있어 별도 과제로 뺐습니다.
                </li>
              </ul>
            </div>

            <div className="section-card" style={{ ...card, marginTop: '1rem' }}>
              <h3 style={{ marginBottom: '0.5rem', color: 'var(--text-color)' }}>✅ <code>/api/boards/my-posts</code> IDOR — 고쳤습니다</h3>
              <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', marginBottom: '0.5rem', fontSize: '0.9rem' }}>
                감사에서 <code>my-posts</code>가 대상 사용자를 <code>@RequestParam("userId")</code>로 받고 있는 걸 발견했습니다.
                <code>@PreAuthorize("isAuthenticated()")</code>는 <strong style={{ color: 'var(--text-color)' }}>"로그인했는가"만 보고 "그게 너인가"는 보지 않습니다.</strong>{' '}
                로그인만 하면 남의 <code>userId</code>를 넣어 그 사람 글을 읽을 수 있었습니다.
              </p>
              <div style={{ overflowX: 'auto', margin: '0.75rem 0' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
                  <thead>
                    <tr style={{ borderBottom: '2px solid var(--nav-border)' }}>
                      <th style={th}>호출 (seed_user_1 = idx 1662 로 로그인)</th><th style={th}>수정 전</th><th style={th}>수정 후</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr style={{ borderBottom: '1px solid var(--nav-border)' }}>
                      <td style={td}><code>/my-posts</code></td>
                      <td style={{ ...td, color: '#e74c3c' }}>HTTP 500</td>
                      <td style={{ ...td, color: 'var(--link-color)', fontWeight: 'bold' }}>200 · 본인(1662) 글</td>
                    </tr>
                    <tr>
                      <td style={td}><code>/my-posts?userId=1663</code></td>
                      <td style={{ ...td, color: '#e74c3c', fontWeight: 'bold' }}>200 · 남의(1663) 글 5건</td>
                      <td style={{ ...td, color: 'var(--link-color)', fontWeight: 'bold' }}>200 · 본인 글 (파라미터 무시)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p style={{ color: 'var(--text-muted)', lineHeight: '1.6', margin: 0, fontSize: '0.8rem' }}>
                대상을 <code>@AuthenticationPrincipal</code>에서 가져오도록 바꿨습니다 — 같은 컨트롤러의 <code>createBoard</code>·<code>addComment</code>가 이미 쓰던 방식입니다.
                고친 뒤 <strong style={{ color: 'var(--text-color)' }}>같은 패턴을 전 컨트롤러에서 스윕했더니 <code>/api/activities/my</code>에서 하나 더 나왔습니다</strong> —
                거기는 <code>@PreAuthorize</code>조차 없었습니다. 경위는{' '}
                <Link to="/domains/refactoring#query-audit" style={{ color: 'var(--link-color)', textDecoration: 'none' }}>
                  전체 쿼리 감사
                </Link>
                에 있습니다.
              </p>
            </div>
          </section>

          <section id="summary" style={{ marginBottom: '3rem', scrollMarginTop: '2rem' }}>
            <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>요약</h2>
            <div className="section-card" style={card}>
              <table style={{ width: '100%', borderCollapse: 'collapse', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid var(--nav-border)' }}>
                    <th style={th}>항목</th><th style={th}>개선 효과</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ borderBottom: '1px solid var(--nav-border)' }}>
                    <td style={td}>게시글 목록 N+1 (대표)</td><td style={td}>301개 → 3개 (99% ↓), 787ms → 38ms, 게시글 수 무관 3개 고정</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid var(--nav-border)' }}>
                    <td style={td}>인기글 · 검색</td><td style={td}>스냅샷 사전 생성(즉시 응답), FULLTEXT 검색</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid var(--nav-border)' }}>
                    <td style={td}>Admin 조회</td><td style={td}>전체 메모리 로드 제거, DB 레벨 필터·페이징</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid var(--nav-border)' }}>
                    <td style={td}>댓글 수 · 반응</td><td style={td}>N건 로드 → COUNT, 2N → 1~2 배치</td>
                  </tr>
                  <tr>
                    <td style={td}>구조 정리</td><td style={td}>extractPrimaryFileUrl 4개 → 공통 1개</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>
        </div>
        <TableOfContents sections={sections} />
      </div>
    </div>
  );
}

export default BoardDomainDetail;
