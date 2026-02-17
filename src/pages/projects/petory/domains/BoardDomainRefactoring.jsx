import { Link } from 'react-router-dom';
import TableOfContents from '../../../../components/Common/TableOfContents';

function BoardDomainRefactoring() {
  const sections = [
    { id: 'intro', title: '리팩토링 개요' },
    { id: 'admin-memory-load', title: 'Admin 전체 게시글 메모리 로드 제거' },
    { id: 'admin-paging', title: 'Admin 페이징 DB 레벨 필터링' },
    { id: 'comment-count', title: 'MissingPetComment getCommentCount 최적화' },
    { id: 'comment-reaction-n1', title: 'CommentService 댓글 반응 N+1 해결' },
    { id: 'extract-primary-file', title: 'extractPrimaryFileUrl 공통화' },
    { id: 'summary', title: '리팩토링 요약' }
  ];

  return (
    <div className="domain-page-wrapper" style={{ padding: '2rem 0' }}>
      <div className="domain-page-container" style={{ display: 'flex', gap: '2rem', alignItems: 'flex-start' }}>
        <div className="domain-page-content" style={{ flex: 1 }}>
          <div style={{ marginBottom: '1rem' }}>
            <Link 
              to="/domains/board" 
              style={{ 
                color: 'var(--link-color)', 
                textDecoration: 'none',
                fontSize: '0.9rem'
              }}
            >
              ← Board 도메인으로 돌아가기
            </Link>
          </div>
          <h1 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>Board 도메인 리팩토링</h1>
          
          {/* 1. 리팩토링 개요 */}
          <section id="intro" style={{ marginBottom: '3rem', scrollMarginTop: '2rem' }}>
            <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>리팩토링 개요</h2>
            <div className="section-card" style={{
              padding: '1.5rem',
              backgroundColor: 'var(--card-bg)',
              borderRadius: '8px',
              border: '1px solid var(--nav-border)'
            }}>
              <p style={{ lineHeight: '1.8', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                Board 도메인의 백엔드 코드 분석을 통해 발견된 성능 이슈 및 리팩토링 포인트를 정리합니다.
              </p>
              <div style={{
                padding: '1rem',
                backgroundColor: 'var(--bg-color)',
                borderRadius: '6px',
                marginTop: '1rem',
                border: '1px solid var(--nav-border)'
              }}>
                <h3 style={{ marginBottom: '0.75rem', color: 'var(--text-color)', fontSize: '1rem' }}>대상 도메인</h3>
                <ul style={{
                  listStyle: 'none',
                  padding: 0,
                  color: 'var(--text-secondary)',
                  lineHeight: '1.8',
                  fontSize: '0.9rem'
                }}>
                  <li>• <strong style={{ color: 'var(--text-color)' }}>일반 게시글</strong>: Board, Comment, Reaction, BoardViewLog</li>
                  <li>• <strong style={{ color: 'var(--text-color)' }}>실종 제보</strong>: MissingPetBoard, MissingPetComment</li>
                  <li>• <strong style={{ color: 'var(--text-color)' }}>인기 게시글</strong>: BoardPopularitySnapshot</li>
                </ul>
              </div>
            </div>
          </section>

          {/* 2. Admin 전체 게시글 메모리 로드 제거 */}
          <section id="admin-memory-load" style={{ marginBottom: '3rem', scrollMarginTop: '2rem' }}>
            <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>Admin 전체 게시글 메모리 로드 제거</h2>
            
            <div className="section-card" style={{
              padding: '1.5rem',
              backgroundColor: 'var(--card-bg)',
              borderRadius: '8px',
              border: '1px solid var(--nav-border)',
              marginBottom: '1rem'
            }}>
              <h3 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>문제점</h3>
              <div style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}>
                <p style={{ marginBottom: '0.5rem' }}>
                  <code>GET /api/admin/boards</code> (페이징 없음): <code>getAllBoards(category)</code> 호출 → <strong>전체 게시글 메모리 로드</strong>
                </p>
                <p style={{ marginBottom: '0.5rem' }}>
                  <code>deleted=true</code> 요청 시: <code>getAllBoards(null)</code> <strong>2번 호출</strong> → 메모리 필터링으로 OOM/지연 위험
                </p>
              </div>
              <pre style={{
                padding: '1rem',
                backgroundColor: 'var(--bg-color)',
                borderRadius: '6px',
                overflow: 'auto',
                fontSize: '0.8rem',
                color: 'var(--text-secondary)',
                marginTop: '0.5rem'
              }}>
{`List<BoardDTO> all = boardService.getAllBoards(category);  // 전체 로드
if (Boolean.TRUE.equals(deleted)) {
    List<BoardDTO> allIncludingDeleted = boardService.getAllBoards(null);  // 또 전체 로드!
}
// 메모리에서 stream().filter() ...`}
              </pre>
            </div>

            <div className="section-card" style={{
              padding: '1.5rem',
              backgroundColor: 'var(--card-bg)',
              borderRadius: '8px',
              border: '1px solid var(--nav-border)'
            }}>
              <h3 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>적용 결과 ✅</h3>
              <ul style={{
                listStyle: 'none',
                padding: 0,
                color: 'var(--text-secondary)',
                lineHeight: '1.8',
                fontSize: '0.9rem'
              }}>
                <li>• <code>listBoards</code> (GET /api/admin/boards) 엔드포인트 제거</li>
                <li>• <code>GET /api/admin/boards/{id}</code> 단일 게시글 조회 API 추가</li>
                <li>• ReportDetailModal: 전체 로드 → 단건 조회로 변경</li>
              </ul>
            </div>
          </section>

          {/* 3. Admin 페이징 DB 레벨 필터링 */}
          <section id="admin-paging" style={{ marginBottom: '3rem', scrollMarginTop: '2rem' }}>
            <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>Admin 페이징 DB 레벨 필터링</h2>
            
            <div className="section-card" style={{
              padding: '1.5rem',
              backgroundColor: 'var(--card-bg)',
              borderRadius: '8px',
              border: '1px solid var(--nav-border)',
              marginBottom: '1rem'
            }}>
              <h3 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>문제점</h3>
              <div style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}>
                <p><code>getAdminBoardsWithPaging()</code>: 전체 게시글 조회 후 메모리에서 category, status, deleted, q 필터링 + <code>subList()</code>로 페이징</p>
                <p style={{ marginTop: '0.5rem' }}>게시글 1만 건 시 → 1만 건 전부 로드 후 20건만 반환</p>
              </div>
            </div>

            <div className="section-card" style={{
              padding: '1.5rem',
              backgroundColor: 'var(--card-bg)',
              borderRadius: '8px',
              border: '1px solid var(--nav-border)'
            }}>
              <h3 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>적용 결과 ✅</h3>
              <ul style={{
                listStyle: 'none',
                padding: 0,
                color: 'var(--text-secondary)',
                lineHeight: '1.8',
                fontSize: '0.9rem'
              }}>
                <li>• <code>getAdminBoardsWithPagingOptimized</code> 호출로 변경</li>
                <li>• Specification + DB 레벨 필터링 + 페이징 (메모리 필터링 제거)</li>
              </ul>
            </div>
          </section>

          {/* 4. MissingPetComment getCommentCount 최적화 */}
          <section id="comment-count" style={{ marginBottom: '3rem', scrollMarginTop: '2rem' }}>
            <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>MissingPetComment getCommentCount 최적화</h2>
            
            <div className="section-card" style={{
              padding: '1.5rem',
              backgroundColor: 'var(--card-bg)',
              borderRadius: '8px',
              border: '1px solid var(--nav-border)',
              marginBottom: '1rem'
            }}>
              <h3 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>문제점</h3>
              <div style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}>
                <p><code>getCommentCount()</code>: 댓글 <strong>전체 조회</strong> 후 <code>size()</code> 반환 → 댓글 1000개면 1000건 로드</p>
              </div>
              <pre style={{
                padding: '1rem',
                backgroundColor: 'var(--bg-color)',
                borderRadius: '6px',
                overflow: 'auto',
                fontSize: '0.8rem',
                color: 'var(--text-secondary)',
                marginTop: '0.5rem'
              }}>
{`List<MissingPetComment> comments = commentRepository
    .findByBoardAndIsDeletedFalseOrderByCreatedAtAsc(board);
return comments.size();  // N건 로드 후 개수만 반환`}
              </pre>
            </div>

            <div className="section-card" style={{
              padding: '1.5rem',
              backgroundColor: 'var(--card-bg)',
              borderRadius: '8px',
              border: '1px solid var(--nav-border)'
            }}>
              <h3 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>적용 결과 ✅</h3>
              <ul style={{
                listStyle: 'none',
                padding: 0,
                color: 'var(--text-secondary)',
                lineHeight: '1.8',
                fontSize: '0.9rem'
              }}>
                <li>• <code>countByBoardAndIsDeletedFalse</code> COUNT 쿼리 추가</li>
                <li>• N건 로드 → 1 COUNT 쿼리로 감소</li>
              </ul>
            </div>
          </section>

          {/* 5. CommentService 댓글 반응 N+1 해결 */}
          <section id="comment-reaction-n1" style={{ marginBottom: '3rem', scrollMarginTop: '2rem' }}>
            <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>CommentService 댓글 반응 N+1 해결</h2>
            
            <div className="section-card" style={{
              padding: '1.5rem',
              backgroundColor: 'var(--card-bg)',
              borderRadius: '8px',
              border: '1px solid var(--nav-border)',
              marginBottom: '1rem'
            }}>
              <h3 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>문제점</h3>
              <div style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}>
                <p><code>mapWithReactionCountsWithoutFiles()</code>: 댓글마다 <code>countByCommentAndReactionType</code> 2회 호출 (LIKE, DISLIKE)</p>
                <p style={{ marginTop: '0.5rem' }}>댓글 N개 시: 1 (댓글 페이징) + <strong>2N</strong> (반응 카운트) = N+1 유사 패턴</p>
              </div>
            </div>

            <div className="section-card" style={{
              padding: '1.5rem',
              backgroundColor: 'var(--card-bg)',
              borderRadius: '8px',
              border: '1px solid var(--nav-border)',
              marginBottom: '1rem'
            }}>
              <h3 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>해결 방법</h3>
              <pre style={{
                padding: '1rem',
                backgroundColor: 'var(--bg-color)',
                borderRadius: '6px',
                overflow: 'auto',
                fontSize: '0.8rem',
                color: 'var(--text-secondary)'
              }}>
{`@Query("SELECT cr.comment.idx as commentId, cr.reactionType, COUNT(cr) " +
       "FROM CommentReaction cr WHERE cr.comment.idx IN :commentIds " +
       "GROUP BY cr.comment.idx, cr.reactionType")
List<Object[]> countByCommentsGroupByReactionType(
    @Param("commentIds") List<Long> commentIds);`}
              </pre>
            </div>

            <div className="section-card" style={{
              padding: '1.5rem',
              backgroundColor: 'var(--card-bg)',
              borderRadius: '8px',
              border: '1px solid var(--nav-border)'
            }}>
              <h3 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>적용 결과 ✅</h3>
              <ul style={{
                listStyle: 'none',
                padding: 0,
                color: 'var(--text-secondary)',
                lineHeight: '1.8',
                fontSize: '0.9rem'
              }}>
                <li>• <code>countByCommentsGroupByReactionType</code> 배치 조회 메서드 추가</li>
                <li>• 댓글 N개 시 2N 쿼리 → 1~2 쿼리로 감소</li>
              </ul>
            </div>
          </section>

          {/* 6. extractPrimaryFileUrl 공통화 */}
          <section id="extract-primary-file" style={{ marginBottom: '3rem', scrollMarginTop: '2rem' }}>
            <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>extractPrimaryFileUrl 공통화</h2>
            
            <div className="section-card" style={{
              padding: '1.5rem',
              backgroundColor: 'var(--card-bg)',
              borderRadius: '8px',
              border: '1px solid var(--nav-border)',
              marginBottom: '1rem'
            }}>
              <h3 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>문제점</h3>
              <div style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}>
                <p>동일 로직이 BoardService, CommentService, MissingPetBoardService, MissingPetCommentService 4개 서비스에 중복 구현</p>
              </div>
            </div>

            <div className="section-card" style={{
              padding: '1.5rem',
              backgroundColor: 'var(--card-bg)',
              borderRadius: '8px',
              border: '1px solid var(--nav-border)'
            }}>
              <h3 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>적용 결과 ✅</h3>
              <ul style={{
                listStyle: 'none',
                padding: 0,
                color: 'var(--text-secondary)',
                lineHeight: '1.8',
                fontSize: '0.9rem'
              }}>
                <li>• <code>AttachmentFileService.extractPrimaryFileUrl()</code> 추가</li>
                <li>• 4개 서비스에서 중복 메서드 제거</li>
              </ul>
            </div>
          </section>

          {/* 7. 리팩토링 요약 */}
          <section id="summary" style={{ marginBottom: '3rem', scrollMarginTop: '2rem' }}>
            <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>리팩토링 요약</h2>
            
            <div className="section-card" style={{
              padding: '1.5rem',
              backgroundColor: 'var(--card-bg)',
              borderRadius: '8px',
              border: '1px solid var(--nav-border)',
              marginBottom: '1.5rem'
            }}>
              <h3 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>완료된 리팩토링</h3>
              <table style={{
                width: '100%',
                borderCollapse: 'collapse',
                color: 'var(--text-secondary)',
                fontSize: '0.9rem'
              }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid var(--nav-border)' }}>
                    <th style={{ padding: '0.75rem', textAlign: 'left', color: 'var(--text-color)' }}>항목</th>
                    <th style={{ padding: '0.75rem', textAlign: 'left', color: 'var(--text-color)' }}>개선 효과</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ borderBottom: '1px solid var(--nav-border)' }}>
                    <td style={{ padding: '0.75rem' }}>Admin listBoards</td>
                    <td style={{ padding: '0.75rem' }}>엔드포인트 제거, 단건 조회로 전환</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid var(--nav-border)' }}>
                    <td style={{ padding: '0.75rem' }}>Admin 페이징</td>
                    <td style={{ padding: '0.75rem' }}>DB 레벨 필터링 + 페이징</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid var(--nav-border)' }}>
                    <td style={{ padding: '0.75rem' }}>Comment 반응 N+1</td>
                    <td style={{ padding: '0.75rem' }}>2N 쿼리 → 1~2 쿼리</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid var(--nav-border)' }}>
                    <td style={{ padding: '0.75rem' }}>getCommentCount</td>
                    <td style={{ padding: '0.75rem' }}>N건 로드 → 1 COUNT 쿼리</td>
                  </tr>
                  <tr>
                    <td style={{ padding: '0.75rem' }}>extractPrimaryFileUrl</td>
                    <td style={{ padding: '0.75rem' }}>4개 서비스 → 공통 메서드 1개</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="section-card" style={{
              padding: '1.5rem',
              backgroundColor: 'var(--card-bg)',
              borderRadius: '8px',
              border: '1px solid var(--nav-border)'
            }}>
              <h3 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>관련 문서</h3>
              <ul style={{
                listStyle: 'none',
                padding: 0,
                color: 'var(--text-secondary)',
                lineHeight: '1.8'
              }}>
                <li>• <Link to="/domains/board" style={{ color: 'var(--link-color)', textDecoration: 'none' }}>Board 도메인 상세 페이지</Link></li>
                <li>• <Link to="/domains/board/optimization" style={{ color: 'var(--link-color)', textDecoration: 'none' }}>Board 도메인 성능 최적화 페이지</Link></li>
              </ul>
            </div>
          </section>
        </div>
        <TableOfContents sections={sections} />
      </div>
    </div>
  );
}

export default BoardDomainRefactoring;
