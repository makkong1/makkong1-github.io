import { Link } from 'react-router-dom';
import TableOfContents from '../../../../components/Common/TableOfContents';

function UserDomainRefactoring() {
  const sections = [
    { id: 'intro', title: '리팩토링 개요' },
    { id: 'get-all-users', title: 'getAllUsers() 메모리 로드 제거' },
    { id: 'auth-duplicate', title: 'Auth 로그인 시 중복 DB 조회' },
    { id: 'admin-delete', title: 'Admin 삭제 시 불필요한 getUser 호출' },
    { id: 'social-users-n1', title: 'UsersConverter socialUsers N+1 해결' },
    { id: 'profile-review', title: '프로필+리뷰 중복 쿼리 통합' },
    { id: 'oauth-unique-id', title: 'OAuth2 고유 ID/Username 생성 최적화' },
    { id: 'signup-duplicate', title: '회원가입 중복 검사 쿼리 통합' },
    { id: 'summary', title: '리팩토링 요약' }
  ];

  return (
    <div className="domain-page-wrapper" style={{ padding: '2rem 0' }}>
      <div className="domain-page-container" style={{ display: 'flex', gap: '2rem', alignItems: 'flex-start' }}>
        <div className="domain-page-content" style={{ flex: 1 }}>
          <div style={{ marginBottom: '1rem' }}>
            <Link 
              to="/domains/user" 
              style={{ 
                color: 'var(--link-color)', 
                textDecoration: 'none',
                fontSize: '0.9rem'
              }}
            >
              ← User 도메인으로 돌아가기
            </Link>
          </div>
          <h1 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>User 도메인 리팩토링</h1>
          
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
                User 도메인의 백엔드 코드 분석을 통해 발견된 성능 이슈 및 리팩토링 포인트를 정리합니다.
              </p>
              <div style={{
                padding: '1rem',
                backgroundColor: 'var(--bg-color)',
                borderRadius: '6px',
                marginTop: '1rem',
                border: '1px solid var(--nav-border)'
              }}>
                <h3 style={{ marginBottom: '0.75rem', color: 'var(--text-color)', fontSize: '1rem' }}>문서 구조</h3>
                <ul style={{
                  listStyle: 'none',
                  padding: 0,
                  color: 'var(--text-secondary)',
                  lineHeight: '1.8',
                  fontSize: '0.9rem'
                }}>
                  <li>• <strong style={{ color: 'var(--text-color)' }}>리팩토링</strong>: auth-duplicate-query, admin-delete-optimization</li>
                  <li>• <strong style={{ color: 'var(--text-color)' }}>트러블슈팅</strong>: social-users-query (N+1 쿼리)</li>
                  <li>• <strong style={{ color: 'var(--text-color)' }}>기타</strong>: profile-with-pets, 페이징 등</li>
                </ul>
              </div>
            </div>
          </section>

          {/* 2. getAllUsers() 메모리 로드 제거 */}
          <section id="get-all-users" style={{ marginBottom: '3rem', scrollMarginTop: '2rem' }}>
            <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>getAllUsers() 메모리 로드 제거</h2>
            
            <div className="section-card" style={{
              padding: '1.5rem',
              backgroundColor: 'var(--card-bg)',
              borderRadius: '8px',
              border: '1px solid var(--nav-border)',
              marginBottom: '1rem'
            }}>
              <h3 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>문제점</h3>
              <div style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}>
                <p><code>findAll()</code>로 전체 사용자를 메모리에 로드 → 사용자 수가 많아질수록 메모리/응답 시간 증가</p>
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
                <li>• <code>getAllUsers()</code> 제거, <code>getAllUsersWithPaging()</code> 페이징만 사용</li>
                <li>• <code>GET /api/admin/users</code> 엔드포인트 제거</li>
              </ul>
            </div>
          </section>

          {/* 3. Auth 로그인 시 중복 DB 조회 */}
          <section id="auth-duplicate" style={{ marginBottom: '3rem', scrollMarginTop: '2rem' }}>
            <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>Auth 로그인 시 중복 DB 조회</h2>
            
            <div className="section-card" style={{
              padding: '1.5rem',
              backgroundColor: 'var(--card-bg)',
              borderRadius: '8px',
              border: '1px solid var(--nav-border)',
              marginBottom: '1rem'
            }}>
              <h3 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>문제점</h3>
              <div style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}>
                <p><code>login()</code>: <code>findByIdString</code> 1회 → <code>getUserById</code> (내부에서 또 <code>findByIdString</code> 1회) = <strong>동일 User 2번 조회</strong></p>
                <p style={{ marginTop: '0.5rem' }}><code>refreshAccessToken()</code>도 동일한 패턴</p>
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
{`Users user = usersRepository.findByIdString(id).orElseThrow(...);  // 1번
// ... save ...
UsersDTO userDTO = usersService.getUserById(id);  // 2번 - 내부에서 또 findByIdString`}
              </pre>
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
{`// 이미 로드한 User 엔티티를 DTO로 변환
UsersDTO userDTO = usersConverter.toDTO(user);
return new TokenResponse(accessToken, refreshToken, userDTO);`}
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
                <li>• <code>UsersConverter.toDTO(user)</code> 사용</li>
                <li>• AuthService에서 UsersService 의존성 제거</li>
                <li>• 로그인/Refresh 시 DB 쿼리 1회 감소</li>
              </ul>
            </div>
          </section>

          {/* 4. Admin 삭제 시 불필요한 getUser 호출 */}
          <section id="admin-delete" style={{ marginBottom: '3rem', scrollMarginTop: '2rem' }}>
            <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>Admin 삭제 시 불필요한 getUser 호출</h2>
            
            <div className="section-card" style={{
              padding: '1.5rem',
              backgroundColor: 'var(--card-bg)',
              borderRadius: '8px',
              border: '1px solid var(--nav-border)',
              marginBottom: '1rem'
            }}>
              <h3 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>문제점</h3>
              <div style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}>
                <p><code>deleteUser()</code> 호출 전 권한 검증을 위해 <code>getUser(id)</code> 호출</p>
                <p><code>getUser()</code> → <code>getUserWithPets()</code> → User 조회 + Pet 조회 (2+ 쿼리)</p>
                <p style={{ marginTop: '0.5rem' }}>삭제 API에서 삭제 대상의 전체 프로필이 꼭 필요하지 않음 (역할만 확인하면 됨)</p>
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
                <li>• <code>findRoleByIdx()</code> 쿼리 추가 (role 프로젝션만 SELECT)</li>
                <li>• <code>getUser()</code> → <code>getRoleById()</code> 변경</li>
                <li>• 권한 검증 시 DB 쿼리 2+ → 1회로 감소</li>
              </ul>
            </div>
          </section>

          {/* 5. UsersConverter socialUsers N+1 해결 */}
          <section id="social-users-n1" style={{ marginBottom: '3rem', scrollMarginTop: '2rem' }}>
            <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>UsersConverter socialUsers N+1 해결</h2>
            
            <div className="section-card" style={{
              padding: '1.5rem',
              backgroundColor: 'var(--card-bg)',
              borderRadius: '8px',
              border: '1px solid var(--nav-border)',
              marginBottom: '1rem'
            }}>
              <h3 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>문제점</h3>
              <div style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}>
                <p><code>toDTO()</code>에서 <code>user.getSocialUsers()</code> 접근 시 Lazy Loading 트리거</p>
                <p style={{ marginTop: '0.5rem' }}>N명 사용자 조회 시: 1 (Users) + N (SocialUser) = <strong>N+1 쿼리</strong></p>
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
                <li>• <code>Users.java</code>의 <code>socialUsers</code>에 <code>@BatchSize(size = 50)</code> 추가</li>
                <li>• 100명 시 101 쿼리 → 3 쿼리로 감소</li>
              </ul>
            </div>
          </section>

          {/* 6. 프로필+리뷰 중복 쿼리 통합 */}
          <section id="profile-review" style={{ marginBottom: '3rem', scrollMarginTop: '2rem' }}>
            <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>프로필+리뷰 중복 쿼리 통합</h2>
            
            <div className="section-card" style={{
              padding: '1.5rem',
              backgroundColor: 'var(--card-bg)',
              borderRadius: '8px',
              border: '1px solid var(--nav-border)',
              marginBottom: '1rem'
            }}>
              <h3 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>문제점</h3>
              <div style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}>
                <p><code>getMyProfile()</code>, <code>getUserProfile()</code>: <code>getReviewsByReviewee</code> + <code>getAverageRating</code> 2번 호출</p>
                <p style={{ marginTop: '0.5rem' }}><strong>동일 쿼리 2번 실행</strong></p>
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
                <li>• <code>ReviewSummaryDTO</code> 신규 생성</li>
                <li>• <code>getReviewsWithAverage()</code> 통합 메서드 추가</li>
                <li>• 리뷰 쿼리 2회 → 1회로 감소</li>
              </ul>
            </div>
          </section>

          {/* 7. OAuth2 고유 ID/Username 생성 최적화 */}
          <section id="oauth-unique-id" style={{ marginBottom: '3rem', scrollMarginTop: '2rem' }}>
            <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>OAuth2 고유 ID/Username 생성 최적화</h2>
            
            <div className="section-card" style={{
              padding: '1.5rem',
              backgroundColor: 'var(--card-bg)',
              borderRadius: '8px',
              border: '1px solid var(--nav-border)',
              marginBottom: '1rem'
            }}>
              <h3 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>문제점</h3>
              <div style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}>
                <p><code>generateUniqueId()</code>, <code>generateUniqueUsername()</code>: while 루프에서 매번 DB 조회</p>
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
                <li>• <code>baseId + "_" + UUID 8자리</code> 형식 → DB 조회 0회</li>
                <li>• 충돌 시 UUID 재생성 후 최대 3회 재시도</li>
              </ul>
            </div>
          </section>

          {/* 8. 회원가입 중복 검사 쿼리 통합 */}
          <section id="signup-duplicate" style={{ marginBottom: '3rem', scrollMarginTop: '2rem' }}>
            <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>회원가입 중복 검사 쿼리 통합</h2>
            
            <div className="section-card" style={{
              padding: '1.5rem',
              backgroundColor: 'var(--card-bg)',
              borderRadius: '8px',
              border: '1px solid var(--nav-border)',
              marginBottom: '1rem'
            }}>
              <h3 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>문제점</h3>
              <div style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}>
                <p><code>findByNickname</code>, <code>findByUsername</code>, <code>findByEmail</code> 각각 1회씩 = 3회 DB 조회</p>
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
                <li>• <code>findByNicknameOrUsernameOrEmail()</code> 단일 쿼리로 통합</li>
                <li>• 3 round-trip → 1 round-trip</li>
              </ul>
            </div>
          </section>

          {/* 9. 리팩토링 요약 */}
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
                    <td style={{ padding: '0.75rem' }}>getAllUsers</td>
                    <td style={{ padding: '0.75rem' }}>페이징만 사용</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid var(--nav-border)' }}>
                    <td style={{ padding: '0.75rem' }}>Auth 로그인/Refresh</td>
                    <td style={{ padding: '0.75rem' }}>User 2회 → 1회 조회</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid var(--nav-border)' }}>
                    <td style={{ padding: '0.75rem' }}>Admin 삭제</td>
                    <td style={{ padding: '0.75rem' }}>User+Pet 전체 → 역할만 조회</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid var(--nav-border)' }}>
                    <td style={{ padding: '0.75rem' }}>socialUsers N+1</td>
                    <td style={{ padding: '0.75rem' }}>101 쿼리 → 3 쿼리 (@BatchSize)</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid var(--nav-border)' }}>
                    <td style={{ padding: '0.75rem' }}>프로필+리뷰</td>
                    <td style={{ padding: '0.75rem' }}>리뷰 쿼리 2회 → 1회</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid var(--nav-border)' }}>
                    <td style={{ padding: '0.75rem' }}>OAuth2 ID/Username</td>
                    <td style={{ padding: '0.75rem' }}>while 루프 DB 조회 → UUID 0회</td>
                  </tr>
                  <tr>
                    <td style={{ padding: '0.75rem' }}>회원가입 중복 검사</td>
                    <td style={{ padding: '0.75rem' }}>3회 쿼리 → 1회 쿼리</td>
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
                <li>• <Link to="/domains/user" style={{ color: 'var(--link-color)', textDecoration: 'none' }}>User 도메인 상세 페이지</Link></li>
                <li>• <Link to="/domains/user/optimization" style={{ color: 'var(--link-color)', textDecoration: 'none' }}>User 도메인 성능 최적화 페이지</Link></li>
              </ul>
            </div>
          </section>
        </div>
        <TableOfContents sections={sections} />
      </div>
    </div>
  );
}

export default UserDomainRefactoring;
