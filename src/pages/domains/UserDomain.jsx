function UserDomain() {
  return (
    <div style={{ padding: '2rem 0' }}>
      <h1 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>유저 도메인</h1>
      
      <section style={{ marginBottom: '3rem' }}>
        <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>도메인 소개</h2>
        <p style={{ lineHeight: '1.8', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
          사용자 관리, 인증/인가, 반려동물 등록, 제재 시스템을 담당하는 핵심 도메인입니다.
        </p>
        <p style={{ lineHeight: '1.8', color: 'var(--text-secondary)' }}>
          JWT 기반 인증, 소셜 로그인(OAuth2), 반려동물 프로필 관리, 사용자 제재 시스템을 제공합니다.
        </p>
      </section>

      <section style={{ marginBottom: '3rem' }}>
        <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>주요 기능</h2>
        
        <div style={{ 
          display: 'grid', 
          gap: '1.5rem',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))'
        }}>
          <div style={{
            padding: '1.5rem',
            backgroundColor: 'var(--card-bg)',
            borderRadius: '8px',
            border: '1px solid var(--nav-border)'
          }}>
            <h3 style={{ marginBottom: '0.5rem', color: 'var(--text-color)' }}>사용자 인증/인가</h3>
            <ul style={{ 
              listStyle: 'none', 
              padding: 0,
              color: 'var(--text-secondary)',
              lineHeight: '1.8'
            }}>
              <li>• JWT 토큰 기반 인증</li>
              <li>• 리프레시 토큰 관리</li>
              <li>• 소셜 로그인 (카카오, 구글, 네이버)</li>
              <li>• 비밀번호 암호화 (BCrypt)</li>
            </ul>
          </div>

          <div style={{
            padding: '1.5rem',
            backgroundColor: 'var(--card-bg)',
            borderRadius: '8px',
            border: '1px solid var(--nav-border)'
          }}>
            <h3 style={{ marginBottom: '0.5rem', color: 'var(--text-color)' }}>반려동물 관리</h3>
            <ul style={{ 
              listStyle: 'none', 
              padding: 0,
              color: 'var(--text-secondary)',
              lineHeight: '1.8'
            }}>
              <li>• 반려동물 등록/수정/삭제</li>
              <li>• 품종, 나이, 성별 정보 관리</li>
              <li>• 백신 접종 이력 관리</li>
              <li>• 프로필 이미지 업로드</li>
            </ul>
          </div>

          <div style={{
            padding: '1.5rem',
            backgroundColor: 'var(--card-bg)',
            borderRadius: '8px',
            border: '1px solid var(--nav-border)'
          }}>
            <h3 style={{ marginBottom: '0.5rem', color: 'var(--text-color)' }}>프로필 관리</h3>
            <ul style={{ 
              listStyle: 'none', 
              padding: 0,
              color: 'var(--text-secondary)',
              lineHeight: '1.8'
            }}>
              <li>• 사용자 정보 수정</li>
              <li>• 위치 정보 관리</li>
              <li>• 소프트 삭제 (데이터 보존)</li>
              <li>• 마지막 로그인 시간 추적</li>
            </ul>
          </div>

          <div style={{
            padding: '1.5rem',
            backgroundColor: 'var(--card-bg)',
            borderRadius: '8px',
            border: '1px solid var(--nav-border)'
          }}>
            <h3 style={{ marginBottom: '0.5rem', color: 'var(--text-color)' }}>사용자 제재 시스템</h3>
            <ul style={{ 
              listStyle: 'none', 
              padding: 0,
              color: 'var(--text-secondary)',
              lineHeight: '1.8'
            }}>
              <li>• 경고 횟수 관리 (3회 누적 시 자동 정지)</li>
              <li>• 일시 정지 (suspendedUntil)</li>
              <li>• 영구 차단 (BANNED)</li>
              <li>• 제재 이력 영구 보관</li>
            </ul>
          </div>
        </div>
      </section>

      <section style={{ marginBottom: '3rem' }}>
        <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>Entity 구조</h2>
        
        <div style={{
          padding: '1.5rem',
          backgroundColor: 'var(--card-bg)',
          borderRadius: '8px',
          border: '1px solid var(--nav-border)',
          marginBottom: '1rem'
        }}>
          <h3 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>1. Users (사용자)</h3>
          <div style={{ 
            color: 'var(--text-secondary)',
            lineHeight: '1.8',
            fontFamily: 'monospace',
            fontSize: '0.9rem'
          }}>
            <div style={{ marginBottom: '0.5rem' }}><strong style={{ color: 'var(--text-color)' }}>주요 필드:</strong></div>
            <div>• idx (PK), id, username, email, phone</div>
            <div>• password (암호화), role (USER/ADMIN)</div>
            <div>• location, petInfo, refreshToken</div>
            <div>• lastLoginAt, status, warningCount</div>
            <div>• suspendedUntil, isDeleted (소프트 삭제)</div>
            <div style={{ marginTop: '0.5rem' }}><strong style={{ color: 'var(--text-color)' }}>연관관계:</strong></div>
            <div>• OneToMany → SocialUser, UserSanction, Pet</div>
          </div>
        </div>

        <div style={{
          padding: '1.5rem',
          backgroundColor: 'var(--card-bg)',
          borderRadius: '8px',
          border: '1px solid var(--nav-border)',
          marginBottom: '1rem'
        }}>
          <h3 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>2. Pet (반려동물)</h3>
          <div style={{ 
            color: 'var(--text-secondary)',
            lineHeight: '1.8',
            fontFamily: 'monospace',
            fontSize: '0.9rem'
          }}>
            <div style={{ marginBottom: '0.5rem' }}><strong style={{ color: 'var(--text-color)' }}>주요 필드:</strong></div>
            <div>• idx (PK), user (소유자), name, species, breed</div>
            <div>• age, gender, imageUrl, description</div>
            <div style={{ marginTop: '0.5rem' }}><strong style={{ color: 'var(--text-color)' }}>연관관계:</strong></div>
            <div>• ManyToOne → Users</div>
            <div>• OneToMany → PetVaccination</div>
          </div>
        </div>

        <div style={{
          padding: '1.5rem',
          backgroundColor: 'var(--card-bg)',
          borderRadius: '8px',
          border: '1px solid var(--nav-border)',
          marginBottom: '1rem'
        }}>
          <h3 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>3. SocialUser (소셜 로그인)</h3>
          <div style={{ 
            color: 'var(--text-secondary)',
            lineHeight: '1.8',
            fontFamily: 'monospace',
            fontSize: '0.9rem'
          }}>
            <div style={{ marginBottom: '0.5rem' }}><strong style={{ color: 'var(--text-color)' }}>주요 필드:</strong></div>
            <div>• idx (PK), user (연결된 사용자)</div>
            <div>• provider (KAKAO/GOOGLE/NAVER), providerId</div>
            <div style={{ marginTop: '0.5rem' }}><strong style={{ color: 'var(--text-color)' }}>연관관계:</strong></div>
            <div>• ManyToOne → Users</div>
          </div>
        </div>

        <div style={{
          padding: '1.5rem',
          backgroundColor: 'var(--card-bg)',
          borderRadius: '8px',
          border: '1px solid var(--nav-border)',
          marginBottom: '1rem'
        }}>
          <h3 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>4. UserSanction (제재 이력)</h3>
          <div style={{ 
            color: 'var(--text-secondary)',
            lineHeight: '1.8',
            fontFamily: 'monospace',
            fontSize: '0.9rem'
          }}>
            <div style={{ marginBottom: '0.5rem' }}><strong style={{ color: 'var(--text-color)' }}>주요 필드:</strong></div>
            <div>• idx (PK), user (제재 대상)</div>
            <div>• type (WARNING/SUSPENSION/BAN), reason</div>
            <div>• startedAt, endedAt, sanctionedBy (제재 처리자)</div>
            <div style={{ marginTop: '0.5rem' }}><strong style={{ color: 'var(--text-color)' }}>연관관계:</strong></div>
            <div>• ManyToOne → Users (제재 대상 및 처리자)</div>
          </div>
        </div>

        <div style={{
          padding: '1.5rem',
          backgroundColor: 'var(--card-bg)',
          borderRadius: '8px',
          border: '1px solid var(--nav-border)'
        }}>
          <h3 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>5. PetVaccination (백신 접종 이력)</h3>
          <div style={{ 
            color: 'var(--text-secondary)',
            lineHeight: '1.8',
            fontFamily: 'monospace',
            fontSize: '0.9rem'
          }}>
            <div style={{ marginBottom: '0.5rem' }}><strong style={{ color: 'var(--text-color)' }}>주요 필드:</strong></div>
            <div>• idx (PK), pet (대상 반려동물)</div>
            <div>• vaccineName, vaccinationDate, nextDueDate</div>
            <div style={{ marginTop: '0.5rem' }}><strong style={{ color: 'var(--text-color)' }}>연관관계:</strong></div>
            <div>• ManyToOne → Pet</div>
          </div>
        </div>
      </section>

      <section style={{ marginBottom: '3rem' }}>
        <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>Service 주요 기능</h2>
        
        <div style={{
          padding: '1.5rem',
          backgroundColor: 'var(--card-bg)',
          borderRadius: '8px',
          border: '1px solid var(--nav-border)',
          marginBottom: '1rem'
        }}>
          <h3 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>UsersService</h3>
          <div style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}>
            <div style={{ marginBottom: '0.5rem' }}><strong style={{ color: 'var(--text-color)' }}>사용자 관리:</strong></div>
            <div>• registerUser() - 회원가입</div>
            <div>• login() - 로그인 (JWT 발급)</div>
            <div>• refreshToken() - 리프레시 토큰 갱신</div>
            <div>• getUserProfile() - 프로필 조회</div>
            <div>• updateUserProfile() - 프로필 수정</div>
            <div>• deleteUser() - 회원 탈퇴 (소프트 삭제)</div>
            <div style={{ marginTop: '1rem', marginBottom: '0.5rem' }}><strong style={{ color: 'var(--text-color)' }}>제재 관리:</strong></div>
            <div>• issueWarning() - 경고 부여</div>
            <div>• suspendUser() - 계정 정지</div>
            <div>• banUser() - 영구 차단</div>
            <div>• getSanctionHistory() - 제재 이력 조회</div>
            <div>• unsanctionUser() - 제재 해제</div>
            <div style={{ marginTop: '1rem', marginBottom: '0.5rem' }}><strong style={{ color: 'var(--text-color)' }}>통계:</strong></div>
            <div>• getActiveUserCount() - 활성 사용자 수</div>
            <div>• getNewUserCount() - 신규 가입자 수 (기간별)</div>
          </div>
        </div>

        <div style={{
          padding: '1.5rem',
          backgroundColor: 'var(--card-bg)',
          borderRadius: '8px',
          border: '1px solid var(--nav-border)',
          marginBottom: '1rem'
        }}>
          <h3 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>PetService</h3>
          <div style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}>
            <div style={{ marginBottom: '0.5rem' }}><strong style={{ color: 'var(--text-color)' }}>반려동물 관리:</strong></div>
            <div>• registerPet() - 반려동물 등록</div>
            <div>• getUserPets() - 반려동물 조회 (사용자별)</div>
            <div>• updatePet() - 반려동물 정보 수정</div>
            <div>• deletePet() - 반려동물 삭제</div>
            <div style={{ marginTop: '1rem', marginBottom: '0.5rem' }}><strong style={{ color: 'var(--text-color)' }}>백신 관리:</strong></div>
            <div>• addVaccination() - 백신 접종 기록 추가</div>
            <div>• getVaccinationHistory() - 백신 접종 이력 조회</div>
            <div>• getUpcomingVaccinations() - 다음 접종 예정 조회</div>
          </div>
        </div>

        <div style={{
          padding: '1.5rem',
          backgroundColor: 'var(--card-bg)',
          borderRadius: '8px',
          border: '1px solid var(--nav-border)'
        }}>
          <h3 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>AuthService</h3>
          <div style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}>
            <div style={{ marginBottom: '0.5rem' }}><strong style={{ color: 'var(--text-color)' }}>인증/인가:</strong></div>
            <div>• generateAccessToken() - JWT 토큰 생성</div>
            <div>• validateToken() - JWT 토큰 검증</div>
            <div>• getUserFromToken() - 토큰에서 사용자 정보 추출</div>
            <div>• saveRefreshToken() - 리프레시 토큰 저장</div>
            <div style={{ marginTop: '1rem', marginBottom: '0.5rem' }}><strong style={{ color: 'var(--text-color)' }}>소셜 로그인:</strong></div>
            <div>• kakaoLogin() - 카카오 로그인</div>
            <div>• googleLogin() - 구글 로그인</div>
            <div>• naverLogin() - 네이버 로그인</div>
            <div>• linkSocialAccount() - 소셜 계정 연결</div>
          </div>
        </div>
      </section>

      <section style={{ marginBottom: '3rem' }}>
        <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>보안 및 권한 체계</h2>
        
        <div style={{
          padding: '1.5rem',
          backgroundColor: 'var(--card-bg)',
          borderRadius: '8px',
          border: '1px solid var(--nav-border)',
          marginBottom: '1rem'
        }}>
          <h3 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>권한 체계 (Role)</h3>
          <div style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}>
            <div>• <strong style={{ color: 'var(--text-color)' }}>USER</strong> - 일반 사용자</div>
            <div>• <strong style={{ color: 'var(--text-color)' }}>ADMIN</strong> - 관리자</div>
          </div>
        </div>

        <div style={{
          padding: '1.5rem',
          backgroundColor: 'var(--card-bg)',
          borderRadius: '8px',
          border: '1px solid var(--nav-border)',
          marginBottom: '1rem'
        }}>
          <h3 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>계정 상태 (UserStatus)</h3>
          <div style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}>
            <div>• <strong style={{ color: 'var(--text-color)' }}>ACTIVE</strong> - 정상 활성</div>
            <div>• <strong style={{ color: 'var(--text-color)' }}>SUSPENDED</strong> - 일시 정지</div>
            <div>• <strong style={{ color: 'var(--text-color)' }}>BANNED</strong> - 영구 차단</div>
          </div>
        </div>

        <div style={{
          padding: '1.5rem',
          backgroundColor: 'var(--card-bg)',
          borderRadius: '8px',
          border: '1px solid var(--nav-border)',
          marginBottom: '1rem'
        }}>
          <h3 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>제재 유형 (SanctionType)</h3>
          <div style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}>
            <div>• <strong style={{ color: 'var(--text-color)' }}>WARNING</strong> - 경고 (3회 누적 시 자동 7일 정지)</div>
            <div>• <strong style={{ color: 'var(--text-color)' }}>SUSPENSION</strong> - 일시 정지 (정지 3회 시 영구 차단)</div>
            <div>• <strong style={{ color: 'var(--text-color)' }}>BAN</strong> - 영구 차단</div>
          </div>
        </div>

        <div style={{
          padding: '1.5rem',
          backgroundColor: 'var(--card-bg)',
          borderRadius: '8px',
          border: '1px solid var(--nav-border)'
        }}>
          <h3 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>보안 처리</h3>
          <ul style={{ 
            listStyle: 'none', 
            padding: 0,
            color: 'var(--text-secondary)',
            lineHeight: '1.8'
          }}>
            <li>• <strong style={{ color: 'var(--text-color)' }}>비밀번호 암호화</strong>: BCryptPasswordEncoder 사용, Salt 자동 생성</li>
            <li>• <strong style={{ color: 'var(--text-color)' }}>JWT 토큰</strong>: Access Token (1시간), Refresh Token (7일, DB 저장)</li>
            <li>• <strong style={{ color: 'var(--text-color)' }}>소프트 삭제</strong>: isDeleted 플래그로 논리 삭제, 데이터 보존 (복구 가능)</li>
            <li>• <strong style={{ color: 'var(--text-color)' }}>제재 시스템</strong>: 경고 3회 → 자동 7일 정지, 정지 3회 → 영구 차단</li>
          </ul>
        </div>
      </section>

      <section style={{ marginBottom: '3rem' }}>
        <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>성능 최적화 및 동시성 제어</h2>
        
        <div style={{
          padding: '1.5rem',
          backgroundColor: 'var(--card-bg)',
          borderRadius: '8px',
          border: '1px solid var(--nav-border)',
          marginBottom: '1rem'
        }}>
          <h3 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>쿼리 최적화</h3>
          <ul style={{ 
            listStyle: 'none', 
            padding: 0,
            color: 'var(--text-secondary)',
            lineHeight: '1.8'
          }}>
            <li>• <strong style={{ color: 'var(--text-color)' }}>인덱스</strong>: id, email, username에 UNIQUE 인덱스</li>
            <li>• <strong style={{ color: 'var(--text-color)' }}>복합 인덱스</strong>: (status, isDeleted) 조회 최적화</li>
            <li>• <strong style={{ color: 'var(--text-color)' }}>캐싱</strong>: 사용자 프로필 정보 캐싱, 권한 정보 캐싱</li>
            <li>• <strong style={{ color: 'var(--text-color)' }}>N+1 문제 해결</strong>: 소셜 계정 조회 시 Fetch Join, 펫 목록 조회 시 배치 쿼리</li>
          </ul>
        </div>

        <div style={{
          padding: '1.5rem',
          backgroundColor: 'var(--card-bg)',
          borderRadius: '8px',
          border: '1px solid var(--nav-border)'
        }}>
          <h3 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>동시성 제어</h3>
          <ul style={{ 
            listStyle: 'none', 
            padding: 0,
            color: 'var(--text-secondary)',
            lineHeight: '1.8'
          }}>
            <li>• <strong style={{ color: 'var(--text-color)' }}>리프레시 토큰 갱신</strong>: 낙관적 락 또는 @Version 사용</li>
            <li>• <strong style={{ color: 'var(--text-color)' }}>경고 횟수 증가</strong>: 원자적 연산으로 동시 경고 부여 시 카운트 오류 방지</li>
            <li>• <strong style={{ color: 'var(--text-color)' }}>계정 상태 변경</strong>: @Transactional + REPEATABLE_READ 격리 수준</li>
          </ul>
        </div>
      </section>

      <section style={{ marginBottom: '3rem' }}>
        <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>다른 도메인과의 연관관계</h2>
        
        <div style={{
          padding: '1.5rem',
          backgroundColor: 'var(--card-bg)',
          borderRadius: '8px',
          border: '1px solid var(--nav-border)'
        }}>
          <div style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}>
            <div style={{ marginBottom: '0.5rem' }}><strong style={{ color: 'var(--text-color)' }}>Board 도메인:</strong></div>
            <div>• Users가 게시글/댓글 작성, 좋아요/싫어요 반응, 게시글 신고</div>
            <div style={{ marginTop: '1rem', marginBottom: '0.5rem' }}><strong style={{ color: 'var(--text-color)' }}>Care 도메인:</strong></div>
            <div>• Users가 펫케어 요청 생성, 펫케어에 지원, 펫케어 리뷰 작성</div>
            <div style={{ marginTop: '1rem', marginBottom: '0.5rem' }}><strong style={{ color: 'var(--text-color)' }}>Report 도메인:</strong></div>
            <div>• Users가 신고 접수, Admin Users가 신고 처리, 신고 처리 결과로 Users에 제재 부여</div>
            <div style={{ marginTop: '1rem', marginBottom: '0.5rem' }}><strong style={{ color: 'var(--text-color)' }}>Notification 도메인:</strong></div>
            <div>• Users에게 알림 전송, Users가 알림 읽음 처리</div>
            <div style={{ marginTop: '1rem', marginBottom: '0.5rem' }}><strong style={{ color: 'var(--text-color)' }}>기타:</strong></div>
            <div>• Users가 실종 신고 작성, 모임 주최/참여, 위치 서비스 리뷰 작성</div>
          </div>
        </div>
      </section>

      <section style={{ marginBottom: '3rem' }}>
        <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>API 엔드포인트</h2>
        
        <div style={{
          padding: '1.5rem',
          backgroundColor: 'var(--card-bg)',
          borderRadius: '8px',
          border: '1px solid var(--nav-border)',
          marginBottom: '1rem'
        }}>
          <h3 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>인증 (/api/auth)</h3>
          <div style={{ 
            color: 'var(--text-secondary)',
            lineHeight: '1.8',
            fontFamily: 'monospace',
            fontSize: '0.9rem'
          }}>
            <div>• POST /register - 회원가입</div>
            <div>• POST /login - 로그인</div>
            <div>• POST /refresh - 토큰 갱신</div>
            <div>• POST /logout - 로그아웃</div>
            <div>• POST /social/{'{provider}'} - 소셜 로그인</div>
          </div>
        </div>

        <div style={{
          padding: '1.5rem',
          backgroundColor: 'var(--card-bg)',
          borderRadius: '8px',
          border: '1px solid var(--nav-border)',
          marginBottom: '1rem'
        }}>
          <h3 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>사용자 (/api/users)</h3>
          <div style={{ 
            color: 'var(--text-secondary)',
            lineHeight: '1.8',
            fontFamily: 'monospace',
            fontSize: '0.9rem'
          }}>
            <div>• GET /profile - 내 프로필 조회</div>
            <div>• PUT /profile - 프로필 수정</div>
            <div>• DELETE /account - 회원 탈퇴</div>
            <div>• GET /me/pets - 내 반려동물 목록</div>
            <div>• POST /me/pets - 반려동물 등록</div>
          </div>
        </div>

        <div style={{
          padding: '1.5rem',
          backgroundColor: 'var(--card-bg)',
          borderRadius: '8px',
          border: '1px solid var(--nav-border)'
        }}>
          <h3 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>관리자 (/api/admin/users)</h3>
          <div style={{ 
            color: 'var(--text-secondary)',
            lineHeight: '1.8',
            fontFamily: 'monospace',
            fontSize: '0.9rem'
          }}>
            <div>• GET / - 사용자 목록 (페이징)</div>
            <div>• GET /{'{userId}'} - 사용자 상세</div>
            <div>• POST /{'{userId}'}/warn - 경고 부여</div>
            <div>• POST /{'{userId}'}/suspend - 계정 정지</div>
            <div>• POST /{'{userId}'}/ban - 영구 차단</div>
            <div>• DELETE /{'{userId}'}/sanction - 제재 해제</div>
          </div>
        </div>
      </section>

      <section>
        <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>관련 문서</h2>
        <div style={{
          padding: '1rem',
          backgroundColor: 'var(--card-bg)',
          borderRadius: '8px',
          border: '1px solid var(--nav-border)'
        }}>
          <a 
            href="https://github.com/makkong1/Petory/blob/main/docs/domains/user.md" 
            target="_blank"
            rel="noopener noreferrer"
            style={{ 
              color: 'var(--link-color)',
              textDecoration: 'none'
            }}
          >
            → User 도메인 상세 문서 보기
          </a>
        </div>
      </section>
    </div>
  );
}

export default UserDomain;

