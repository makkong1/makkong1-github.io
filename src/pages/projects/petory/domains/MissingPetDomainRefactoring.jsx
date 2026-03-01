import { Link } from 'react-router-dom';
import TableOfContents from '../../../../components/Common/TableOfContents';

function MissingPetDomainRefactoring() {
  const sections = [
    { id: 'intro', title: '리팩토링 개요' },
    { id: 'admin-paging', title: 'Admin 전체 메모리 로드 제거' },
    { id: 'delete-all-comments', title: 'deleteAllCommentsByBoard 배치 업데이트' },
    { id: 'update-status', title: 'updateStatus valueOf 예외 처리' },
    { id: 'start-chat', title: 'startMissingPetChat 경량 조회' },
    { id: 'restore', title: 'restoreMissingPet 구현' },
    { id: 'converter', title: 'MissingPetConverter toBoardDTOList 제거' },
    { id: 'find-by-id', title: 'updateBoard findByIdWithUser 통일' },
    { id: 'db-index', title: '데이터베이스 인덱스' },
    { id: 'summary', title: '리팩토링 요약' }
  ];

  return (
    <div className="domain-page-wrapper" style={{ padding: '2rem 0' }}>
      <div className="domain-page-container" style={{ display: 'flex', gap: '2rem', alignItems: 'flex-start' }}>
        <div className="domain-page-content" style={{ flex: 1 }}>
          <div style={{ marginBottom: '1rem' }}>
            <Link 
              to="/domains/missing-pet" 
              style={{ 
                color: 'var(--link-color)', 
                textDecoration: 'none',
                fontSize: '0.9rem'
              }}
            >
              ← Missing Pet 도메인으로 돌아가기
            </Link>
          </div>
          <h1 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>Missing Pet 도메인 리팩토링</h1>
          
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
                Missing Pet 도메인의 백엔드 코드 분석을 통해 발견된 성능 이슈 및 리팩토링 포인트를 정리합니다.
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
                  <li>• <strong style={{ color: 'var(--text-color)' }}>실종 제보 게시글</strong>: MissingPetBoard, MissingPetBoardService</li>
                  <li>• <strong style={{ color: 'var(--text-color)' }}>실종 제보 댓글</strong>: MissingPetComment, MissingPetCommentService</li>
                  <li>• <strong style={{ color: 'var(--text-color)' }}>관리자</strong>: AdminMissingPetController</li>
                </ul>
              </div>
            </div>
          </section>

          {/* 2. Admin 전체 메모리 로드 제거 */}
          <section id="admin-paging" style={{ marginBottom: '3rem', scrollMarginTop: '2rem' }}>
            <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>Admin 전체 메모리 로드 제거 ✅</h2>
            
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
                  <code>GET /api/admin/missing-pets</code>: <code>getBoards(status)</code> 호출 → <strong>전체 실종 제보 메모리 로드</strong>
                </p>
                <p style={{ marginBottom: '0.5rem' }}>
                  메모리에서 deleted, q 필터링 후 반환 → 실종 제보 1만 건 시 1만 건 전부 로드 후 필터링
                </p>
                <p style={{ marginBottom: '0.5rem' }}>
                  <code>getBoards()</code>는 isDeleted=false만 조회하므로, Admin에서 deleted=true 요청 시 삭제된 게시글이 조회되지 않음
                </p>
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
                <li>• <code>GET /api/admin/missing-pets</code> → <code>GET /api/admin/missing-pets/paging</code> 변경</li>
                <li>• <code>MissingPetBoardService.getAdminBoardsWithPaging()</code> 추가 (Specification + DB 페이징)</li>
                <li>• <code>SpringDataJpaMissingPetBoardRepository</code>에 JpaSpecificationExecutor 추가</li>
                <li>• 프론트엔드 listMissingPetsWithPaging API 및 페이징 UI 적용</li>
              </ul>
            </div>
          </section>

          {/* 3. deleteAllCommentsByBoard 배치 업데이트 */}
          <section id="delete-all-comments" style={{ marginBottom: '3rem', scrollMarginTop: '2rem' }}>
            <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>deleteAllCommentsByBoard 배치 업데이트 ✅</h2>
            
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
                  <code>deleteAllCommentsByBoard(board)</code>: 댓글 전체 조회 후 루프마다 <code>save()</code> 호출
                </p>
                <p style={{ marginBottom: '0.5rem' }}>
                  댓글 1000개 시 → 1 (SELECT) + 1000 (UPDATE) = 1001 쿼리
                </p>
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
                <li>• <code>softDeleteAllByBoardIdx</code> 메서드 추가 (@Modifying + @Query 배치 UPDATE)</li>
                <li>• <code>clearAutomatically = true</code> 적용 (PC 정합성 유지)</li>
                <li>• 1001 쿼리 → 1 쿼리 (댓글 1000개 기준)</li>
              </ul>
            </div>
          </section>

          {/* 4. updateStatus valueOf 예외 처리 */}
          <section id="update-status" style={{ marginBottom: '3rem', scrollMarginTop: '2rem' }}>
            <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>updateStatus valueOf 예외 처리 ✅</h2>
            
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
                  <code>MissingPetStatus.valueOf(statusValue)</code>: 잘못된 값 시 IllegalArgumentException 발생
                </p>
                <p style={{ marginBottom: '0.5rem' }}>
                  예외 메시지가 사용자 친화적이지 않음 (예: "No enum constant...")
                </p>
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
                <li>• MissingPetBoardController, AdminMissingPetController에 valueOf 예외 처리 추가</li>
                <li>• 사용자 친화적 에러 메시지 (MISSING, FOUND, RESOLVED 안내)</li>
              </ul>
            </div>
          </section>

          {/* 5. startMissingPetChat 경량 조회 */}
          <section id="start-chat" style={{ marginBottom: '3rem', scrollMarginTop: '2rem' }}>
            <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>startMissingPetChat 경량 조회 ✅</h2>
            
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
                  <code>getBoard(boardIdx, null, null)</code> 호출 → 게시글 전체 조회 (파일, 댓글 수 등)
                </p>
                <p style={{ marginBottom: '0.5rem' }}>
                  필요한 것은 reporterId(userId)만
                </p>
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
                <li>• <code>findUserIdByIdx</code> 메서드 추가 (프로젝션 쿼리)</li>
                <li>• <code>MissingPetBoardService.getUserIdByBoardIdx()</code> 추가</li>
                <li>• getBoard 전체 조회 대신 userId 프로젝션 1쿼리</li>
              </ul>
            </div>
          </section>

          {/* 6. restoreMissingPet 구현 */}
          <section id="restore" style={{ marginBottom: '3rem', scrollMarginTop: '2rem' }}>
            <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>restoreMissingPet 구현 ✅</h2>
            
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
                  <code>POST /api/admin/missing-pets/{'{id}'}/restore</code> → UnsupportedOperationException 발생
                </p>
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
                <li>• <code>MissingPetBoardService.restoreBoard(Long id)</code> 메서드 추가</li>
                <li>• isDeleted = false, deletedAt = null 설정</li>
              </ul>
            </div>
          </section>

          {/* 7. MissingPetConverter toBoardDTOList 제거 */}
          <section id="converter" style={{ marginBottom: '3rem', scrollMarginTop: '2rem' }}>
            <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>MissingPetConverter toBoardDTOList 제거 ✅</h2>
            
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
                  <code>toBoardDTOList()</code>가 <code>toBoardDTO()</code> 사용 → <code>board.getComments()</code> 접근 시 Lazy Loading → N+1 위험
                </p>
                <p style={{ marginBottom: '0.5rem' }}>사용처 없음 (dead code)</p>
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
                <li>• toBoardDTOList 메서드 제거</li>
                <li>• 주석으로 대체: 목록 조회 시 toBoardDTOWithoutComments 사용 안내</li>
              </ul>
            </div>
          </section>

          {/* 8. updateBoard findByIdWithUser 통일 */}
          <section id="find-by-id" style={{ marginBottom: '3rem', scrollMarginTop: '2rem' }}>
            <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>updateBoard findByIdWithUser 통일 ✅</h2>
            
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
                  <code>findById(id)</code> 사용 → User 조인 없음
                </p>
                <p style={{ marginBottom: '0.5rem' }}><code>board.getUser()</code> 호출 시 Lazy Loading 가능</p>
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
                <li>• <code>findByIdWithUser(id)</code> 사용으로 통일 (deleteBoard와 동일)</li>
              </ul>
            </div>
          </section>

          {/* 9. 데이터베이스 인덱스 */}
          <section id="db-index" style={{ marginBottom: '3rem', scrollMarginTop: '2rem' }}>
            <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>데이터베이스 인덱스</h2>
            
            <div className="section-card" style={{
              padding: '1.5rem',
              backgroundColor: 'var(--card-bg)',
              borderRadius: '8px',
              border: '1px solid var(--nav-border)'
            }}>
              <h3 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>적용된 인덱스</h3>
              <table style={{
                width: '100%',
                borderCollapse: 'collapse',
                color: 'var(--text-secondary)',
                fontSize: '0.9rem'
              }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid var(--nav-border)' }}>
                    <th style={{ padding: '0.75rem', textAlign: 'left', color: 'var(--text-color)' }}>테이블</th>
                    <th style={{ padding: '0.75rem', textAlign: 'left', color: 'var(--text-color)' }}>인덱스</th>
                    <th style={{ padding: '0.75rem', textAlign: 'left', color: 'var(--text-color)' }}>컬럼</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ borderBottom: '1px solid var(--nav-border)' }}>
                    <td style={{ padding: '0.75rem' }}>missing_pet_board</td>
                    <td style={{ padding: '0.75rem' }}>idx_missing_pet_status</td>
                    <td style={{ padding: '0.75rem' }}>status, is_deleted, created_at</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid var(--nav-border)' }}>
                    <td style={{ padding: '0.75rem' }}>missing_pet_board</td>
                    <td style={{ padding: '0.75rem' }}>idx_missing_pet_location</td>
                    <td style={{ padding: '0.75rem' }}>latitude, longitude</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid var(--nav-border)' }}>
                    <td style={{ padding: '0.75rem' }}>missing_pet_board</td>
                    <td style={{ padding: '0.75rem' }}>idx_missing_pet_user</td>
                    <td style={{ padding: '0.75rem' }}>user_idx, is_deleted, created_at</td>
                  </tr>
                  <tr>
                    <td style={{ padding: '0.75rem' }}>missing_pet_comment</td>
                    <td style={{ padding: '0.75rem' }}>idx_missing_pet_comment_board_is_deleted</td>
                    <td style={{ padding: '0.75rem' }}>board_idx, is_deleted</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* 10. 리팩토링 요약 */}
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
                    <td style={{ padding: '0.75rem' }}>Admin listMissingPets</td>
                    <td style={{ padding: '0.75rem' }}>DB 레벨 필터링 + 페이징</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid var(--nav-border)' }}>
                    <td style={{ padding: '0.75rem' }}>deleteAllCommentsByBoard</td>
                    <td style={{ padding: '0.75rem' }}>1001 쿼리 → 1 쿼리 (1000댓글 기준)</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid var(--nav-border)' }}>
                    <td style={{ padding: '0.75rem' }}>startMissingPetChat</td>
                    <td style={{ padding: '0.75rem' }}>getBoard 전체 조회 → userId 프로젝션 1쿼리</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid var(--nav-border)' }}>
                    <td style={{ padding: '0.75rem' }}>restoreMissingPet</td>
                    <td style={{ padding: '0.75rem' }}>미구현 → restoreBoard 구현</td>
                  </tr>
                  <tr>
                    <td style={{ padding: '0.75rem' }}>toBoardDTOList / findByIdWithUser</td>
                    <td style={{ padding: '0.75rem' }}>N+1 위험 제거, Lazy Loading 방지</td>
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
                <li>• <Link to="/domains/missing-pet" style={{ color: 'var(--link-color)', textDecoration: 'none' }}>Missing Pet 도메인 상세 페이지</Link></li>
                <li>• <Link to="/domains/missing-pet/optimization" style={{ color: 'var(--link-color)', textDecoration: 'none' }}>Missing Pet 도메인 성능 최적화 페이지</Link></li>
                <li>• <a href="https://github.com/makkong1/makkong1-github.io/blob/main/docs/refactoring/missing-pet/missing-pet-backend-performance-optimization.md" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--link-color)', textDecoration: 'none' }}>백엔드 성능 최적화 상세 문서</a></li>
              </ul>
            </div>
          </section>
        </div>
        <TableOfContents sections={sections} />
      </div>
    </div>
  );
}

export default MissingPetDomainRefactoring;
