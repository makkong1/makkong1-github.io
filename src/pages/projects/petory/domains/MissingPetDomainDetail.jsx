import { Link } from 'react-router-dom';
import MermaidDiagram from '../../../../components/Common/MermaidDiagram';
import TableOfContents from '../../../../components/Common/TableOfContents';

// Missing Pet 도메인 상세 작업 로그 (아카이브)
// - 기존 MissingPetDomainOptimization(목록 N+1) + MissingPetDomainRefactoring(부가 정리) 통합
function MissingPetDomainDetail() {
  const sections = [
    { id: 'intro', title: '개요' },
    { id: 'list-n1', title: '목록 조회 N+1 (대표)' },
    { id: 'cleanup', title: '부가 성능 · 구조 정리' },
    { id: 'index', title: '데이터베이스 인덱스' },
    { id: 'summary', title: '요약' }
  ];

  const card = { padding: '1.5rem', backgroundColor: 'var(--card-bg)', borderRadius: '8px', border: '1px solid var(--nav-border)' };
  const pre = { padding: '1rem', backgroundColor: 'var(--bg-color)', borderRadius: '6px', overflow: 'auto', fontSize: '0.8rem', color: 'var(--text-secondary)' };
  const th = { padding: '0.75rem', textAlign: 'left', color: 'var(--text-color)', fontWeight: 'bold' };
  const td = { padding: '0.75rem' };

  const beforeSeq = `sequenceDiagram
    participant Service as MissingPetBoardService
    participant Converter as MissingPetConverter
    participant DB as MySQL
    Service->>DB: 게시글 + 작성자 조회 (1)
    Service->>Converter: toBoardDTO(board)
    Note over Converter: board.getComments() 접근 → LAZY 트리거
    loop 게시글마다
        Converter->>DB: 댓글 조회 (사용도 안 하는데!)
        Converter->>DB: 파일 개별 조회
    end
    Note over Service,DB: 총 267개 쿼리 (worktree 실측, 게시글 133개 기준: 1 + 133 + 133)`;

  const afterSeq = `sequenceDiagram
    participant Service as MissingPetBoardService
    participant Converter as MissingPetConverter
    participant DB as MySQL
    Service->>DB: 게시글 + 작성자 (JOIN FETCH) (1)
    Service->>DB: 페이지네이션 COUNT (2)
    Service->>DB: 파일 배치 조회 (IN 절) (3)
    Service->>DB: 댓글 수 배치 조회 (IN 절 GROUP BY) (4)
    Service->>Converter: toBoardDTOWithoutComments(board)
    Note over Converter: 댓글 미접근 → LAZY 트리거 없음
    Note over Service,DB: 총 4개 쿼리 (댓글 목록 0개)`;

  return (
    <div className="domain-page-wrapper" style={{ padding: '2rem 0' }}>
      <div className="domain-page-container" style={{ display: 'flex', gap: '2rem', alignItems: 'flex-start' }}>
        <div className="domain-page-content" style={{ flex: 1 }}>
          <div style={{ marginBottom: '1rem' }}>
            <Link to="/domains/missing-pet" style={{ color: 'var(--link-color)', textDecoration: 'none', fontSize: '0.9rem' }}>
              ← Missing Pet 도메인으로 돌아가기
            </Link>
          </div>
          <h1 style={{ marginBottom: '0.5rem', color: 'var(--text-color)' }}>Missing Pet 도메인 — 성능 · 구조 상세</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '2rem', lineHeight: 1.7 }}>
            실종 제보 목록의 N+1 해결(대표)과 Admin·삭제·조회 경로의 부가 정리를 담았습니다.
            대표 사례(N+1)는 <Link to="/domains/refactoring#n-plus-one" style={{ color: 'var(--link-color)', textDecoration: 'none' }}>리팩토링 대표 사례</Link>에도 있습니다.
          </p>

          {/* 1. 개요 */}
          <section id="intro" style={{ marginBottom: '3rem', scrollMarginTop: '2rem' }}>
            <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>개요</h2>
            <div className="section-card" style={card}>
              <p style={{ lineHeight: '1.8', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                목록 조회 시 Converter가 <code>board.getComments()</code>에 접근해 게시글마다 댓글 LAZY 로딩이 터졌습니다. 사용하지도 않는 댓글을 조회한 것이라, Converter 분리로 근본 해결했습니다.
              </p>
              <div style={{ padding: '1rem', backgroundColor: 'var(--bg-color)', borderRadius: '6px', border: '1px solid var(--nav-border)' }}>
                <h3 style={{ marginBottom: '0.75rem', color: 'var(--text-color)', fontSize: '1rem' }}>핵심 성과 (목록 조회 · worktree 실측)</h3>
                <ul style={{ listStyle: 'none', padding: 0, color: 'var(--text-secondary)', lineHeight: '1.8', fontSize: '0.9rem' }}>
                  <li>• 쿼리 수: <strong style={{ color: 'var(--text-color)' }}>267개 → 4개</strong> (98.5% 감소)</li>
                  <li>• 백엔드 응답 시간: <strong style={{ color: 'var(--text-color)' }}>762ms → 88ms</strong> (88% 개선, 보조 지표)</li>
                </ul>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.82rem', marginTop: '0.5rem', marginBottom: 0, lineHeight: 1.7 }}>
                  ※ <code>git worktree</code>로 실제 이전 커밋을 checkout해 재측정한 값입니다. 이전에 쓰던
                  <code> 105 → 3 / 571ms → 106ms</code>는 재구성 테스트 기반이라 재현되지 않아 교체했습니다.
                  주 지표는 쿼리 수이고, 절대 시간은 실행마다 달라지므로 보조로만 씁니다.
                </p>
              </div>
            </div>
          </section>

          {/* 2. 목록 조회 N+1 (대표) */}
          <section id="list-n1" style={{ marginBottom: '3rem', scrollMarginTop: '2rem' }}>
            <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>목록 조회 N+1 (대표)</h2>

            <div className="section-card" style={{ ...card, marginBottom: '1rem' }}>
              <h3 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>문제 — 사용하지 않는 댓글까지 LAZY 조회</h3>
              <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', marginBottom: '0.75rem', fontSize: '0.9rem' }}>
                <code>toBoardDTO()</code>가 <code>board.getComments()</code>에 접근해 <strong style={{ color: 'var(--text-color)' }}>게시글마다</strong> 댓글 조회가 실행됐습니다. 목록에선 댓글 목록이 필요 없고 <strong style={{ color: 'var(--text-color)' }}>댓글 수</strong>만 표시하면 됐습니다.
              </p>
              <MermaidDiagram chart={beforeSeq} />
            </div>

            <div className="section-card" style={{ ...card, marginBottom: '1rem' }}>
              <h3 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>해결 — Fetch Join + 배치 조회 2종 + 댓글 미접근 Converter</h3>

              <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', marginBottom: '0.5rem', fontSize: '0.9rem' }}>
                <strong style={{ color: 'var(--text-color)' }}>① 작성자</strong>: 항상 필요한 ManyToOne → <code>JOIN FETCH</code>로 함께 조회
              </p>
              <pre style={pre}>
{`SELECT mpb FROM MissingPetBoard mpb JOIN FETCH mpb.user u
WHERE mpb.isDeleted = false AND u.isDeleted = false AND u.status = 'ACTIVE'
ORDER BY mpb.createdAt DESC`}
              </pre>
              <p style={{ color: 'var(--text-muted)', lineHeight: '1.6', margin: '0.4rem 0 0', fontSize: '0.8rem' }}>
                이유: ManyToOne(다대일)이라 Fetch Join해도 중복 행이 생기지 않아 바로 적용.
              </p>

              <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', margin: '0.75rem 0 0.5rem', fontSize: '0.9rem' }}>
                <strong style={{ color: 'var(--text-color)' }}>② 첨부파일</strong>: File 도메인의 <code>getAttachmentsBatch()</code>로 게시글 ID들을 한 번에 조회
              </p>
              <pre style={pre}>
{`List<Long> boardIds = boards.stream().map(MissingPetBoard::getIdx).toList();
Map<Long, List<FileDTO>> filesByBoardId =
    attachmentFileService.getAttachmentsBatch(FileTargetType.MISSING_PET, boardIds);
// board별 dto.setAttachments / setImageUrl 을 메모리에서 매핑`}
              </pre>
              <p style={{ color: 'var(--text-muted)', lineHeight: '1.6', margin: '0.4rem 0 0', fontSize: '0.8rem' }}>
                이유: 첨부파일은 MissingPetBoard와 JPA 연관관계가 없는 File 도메인 소속 엔티티라 Fetch Join 자체가 불가능 → 도메인 간 배치 조회로 해결.
              </p>

              <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', margin: '0.75rem 0 0.5rem', fontSize: '0.9rem' }}>
                <strong style={{ color: 'var(--text-color)' }}>③ 댓글 수</strong>: 목록에는 개수만 필요 → 댓글을 아예 건드리지 않는 <code>toBoardDTOWithoutComments()</code>를 분리하고, 개수는 <code>IN</code> 절 GROUP BY 배치로 조회
              </p>
              <pre style={pre}>
{`// 목록용 Converter — 댓글 미접근 (LAZY 트리거 없음)
public MissingPetBoardDTO toBoardDTOWithoutComments(MissingPetBoard board) {
    return MissingPetBoardDTO.builder()
        .idx(board.getIdx()).userId(board.getUser().getIdx())
        .comments(Collections.emptyList()).commentCount(0)
        .build();
}

// 댓글 수 배치 (IN 절 + GROUP BY)
@Query("SELECT c.board.idx, COUNT(c.idx) FROM MissingPetComment c " +
       "WHERE c.board.idx IN :boardIds AND c.isDeleted = false GROUP BY c.board.idx")
List<CommentCountResult> countCommentsByBoardIds(@Param("boardIds") List<Long> boardIds);`}
              </pre>
              <p style={{ color: 'var(--text-muted)', lineHeight: '1.6', margin: '0.4rem 0 0', fontSize: '0.8rem' }}>
                이유: 댓글은 OneToMany 컬렉션이라 Fetch Join 시 카티션 곱으로 중복 행이 생기고, 목록에선 개수만 필요해 접근 자체를 없애고 IN절 배치로 우회.
              </p>
              <ul style={{ listStyle: 'none', padding: 0, color: 'var(--text-secondary)', lineHeight: '1.8', fontSize: '0.9rem', marginTop: '0.75rem' }}>
                <li>• 댓글 목록 조회: 게시글마다 1회 → <strong style={{ color: 'var(--text-color)' }}>0개</strong> (아예 접근 안 함) · 댓글 수: 게시글마다 1회 → 1개 (배치)</li>
                <li>• 댓글이 필요하면 별도 API(<code>GET /missing-pets/{'{id}'}/comments</code>)로 조회 → 무한 스크롤도 가능</li>
              </ul>
            </div>

            <div className="section-card" style={card}>
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
                      <td style={td}>총 쿼리 수 <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>(주 지표)</span></td>
                      <td style={td}>267개</td>
                      <td style={{ ...td, color: 'var(--link-color)', fontWeight: 'bold' }}>4개</td>
                      <td style={{ ...td, color: 'var(--link-color)', fontWeight: 'bold' }}>98.5% ↓</td>
                    </tr>
                    <tr>
                      <td style={td}>백엔드 응답 시간 <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>(보조)</span></td>
                      <td style={td}>762ms</td>
                      <td style={{ ...td, color: 'var(--link-color)', fontWeight: 'bold' }}>88ms</td>
                      <td style={{ ...td, color: 'var(--link-color)', fontWeight: 'bold' }}>88% ↓</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <MermaidDiagram chart={afterSeq} />
            </div>
          </section>

          {/* 3. 부가 성능 · 구조 정리 */}
          <section id="cleanup" style={{ marginBottom: '3rem', scrollMarginTop: '2rem' }}>
            <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>부가 성능 · 구조 정리</h2>
            <div className="section-card" style={{ ...card, marginBottom: '1rem' }}>
              <ul style={{ listStyle: 'none', padding: 0, color: 'var(--text-secondary)', lineHeight: '1.9', fontSize: '0.9rem' }}>
                <li>• <strong style={{ color: 'var(--text-color)' }}>Admin 목록</strong>: 전체 메모리 로드 → <code>Specification</code> + DB 페이징(삭제글 조회도 정상화)</li>
                <li>• <strong style={{ color: 'var(--text-color)' }}>댓글 일괄 삭제</strong>: 조회 후 루프 <code>save()</code>(댓글 수만큼 개별 쿼리) → <code>@Modifying</code> 배치 UPDATE 1쿼리(<code>clearAutomatically</code>로 PC 정합성)</li>
                <li>• <strong style={{ color: 'var(--text-color)' }}>채팅 시작</strong>: 게시글 전체 조회 → 필요한 <code>reporterId</code>만 프로젝션 1쿼리</li>
                <li>• <strong style={{ color: 'var(--text-color)' }}>상태 변경</strong>: <code>valueOf</code> 실패 시 원시 예외 → 사용자 친화 메시지(MISSING/FOUND/RESOLVED 안내)</li>
                <li>• <strong style={{ color: 'var(--text-color)' }}>복구 API</strong>: 미구현(<code>UnsupportedOperationException</code>) → <code>restoreBoard()</code> 구현</li>
                <li>• <strong style={{ color: 'var(--text-color)' }}>구조 정리</strong>: dead code <code>toBoardDTOList</code> 제거, <code>updateBoard</code>도 <code>findByIdWithUser</code>로 통일(Lazy 방지)</li>
              </ul>
            </div>
          </section>

          {/* 4. 인덱스 */}
          <section id="index" style={{ marginBottom: '3rem', scrollMarginTop: '2rem' }}>
            <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>데이터베이스 인덱스</h2>
            <div className="section-card" style={card}>
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid var(--nav-border)' }}>
                      <th style={th}>테이블</th><th style={th}>인덱스</th><th style={th}>컬럼</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr style={{ borderBottom: '1px solid var(--nav-border)' }}>
                      <td style={td}>missing_pet_board</td><td style={td}>idx_missing_pet_status</td><td style={td}>status, is_deleted, created_at</td>
                    </tr>
                    <tr style={{ borderBottom: '1px solid var(--nav-border)' }}>
                      <td style={td}>missing_pet_board</td><td style={td}>idx_missing_pet_location</td><td style={td}>latitude, longitude</td>
                    </tr>
                    <tr style={{ borderBottom: '1px solid var(--nav-border)' }}>
                      <td style={td}>missing_pet_board</td><td style={td}>idx_missing_pet_user</td><td style={td}>user_idx, is_deleted, created_at</td>
                    </tr>
                    <tr>
                      <td style={td}>missing_pet_comment</td><td style={td}>idx_..._board_is_deleted</td><td style={td}>board_idx, is_deleted</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* 5. 요약 */}
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
                    <td style={td}>목록 N+1 (대표)</td><td style={td}>267개 → 4개 (98.5% ↓), 762ms → 88ms · worktree 실측</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid var(--nav-border)' }}>
                    <td style={td}>댓글 일괄 삭제</td><td style={td}>개별 loop save → 1쿼리 (배치 UPDATE)</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid var(--nav-border)' }}>
                    <td style={td}>Admin · 채팅 시작</td><td style={td}>DB 페이징, 전체 조회 → userId 프로젝션</td>
                  </tr>
                  <tr>
                    <td style={td}>구조 · 예외</td><td style={td}>dead code 제거, findByIdWithUser 통일, valueOf 예외 정리</td>
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

export default MissingPetDomainDetail;
