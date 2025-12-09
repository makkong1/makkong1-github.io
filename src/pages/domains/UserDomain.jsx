import MermaidDiagram from '../../components/Common/MermaidDiagram';
import TableOfContents from '../../components/Common/TableOfContents';

function UserDomain() {
  const sections = [
    { id: 'intro', title: '도메인 소개' },
    { id: 'features', title: '주요 기능' },
    { id: 'entities', title: 'Entity 구조' },
    { id: 'services', title: 'Service 주요 기능' },
    { id: 'security', title: '보안 및 권한 체계' },
    { id: 'performance', title: '성능 최적화 및 동시성 제어' },
    { id: 'relationships', title: '다른 도메인과의 연관관계' },
    { id: 'api', title: 'API 엔드포인트' },
    { id: 'docs', title: '관련 문서' }
  ];

  const entityDiagram = `erDiagram
    Users ||--o{ SocialUser : "has"
    Users ||--o{ UserSanction : "has"
    Users ||--o{ Pet : "owns"
    Pet ||--o{ PetVaccination : "has"
    
    Users {
        Long idx PK
        String id
        String username
        String email
        String phone
        String password
        Role role
        String location
        String petInfo
        String refreshToken
        LocalDateTime lastLoginAt
        UserStatus status
        Integer warningCount
        LocalDateTime suspendedUntil
        Boolean isDeleted
    }
    
    Pet {
        Long idx PK
        Long user_idx FK
        String name
        String species
        String breed
        Integer age
        String gender
        String imageUrl
        String description
    }
    
    SocialUser {
        Long idx PK
        Long user_idx FK
        String provider
        String providerId
    }
    
    UserSanction {
        Long idx PK
        Long user_idx FK
        Long sanctionedBy_idx FK
        SanctionType type
        String reason
        LocalDateTime startedAt
        LocalDateTime endedAt
    }
    
    PetVaccination {
        Long idx PK
        Long pet_idx FK
        String vaccineName
        LocalDate vaccinationDate
        LocalDate nextDueDate
    }`;

  return (
    <div style={{ padding: '2rem 0' }}>
      <div style={{ display: 'flex', gap: '2rem', alignItems: 'flex-start' }}>
        <div style={{ flex: 1 }}>
          <h1 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>유저 도메인</h1>
          
          <section id="intro" style={{ marginBottom: '3rem', scrollMarginTop: '2rem' }}>
            <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>도메인 소개</h2>
            <p style={{ lineHeight: '1.8', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
              사용자 인증/인가, 프로필 관리, 반려동물 등록, 사용자 제재 시스템을 담당하는 핵심 도메인입니다.
            </p>
            <p style={{ lineHeight: '1.8', color: 'var(--text-secondary)' }}>
              회원가입/로그인 (JWT 기반), 프로필 관리 (닉네임, 이메일, 전화번호, 위치), 반려동물 등록/관리, 사용자 제재 시스템 (경고, 이용제한, 영구 차단), 소프트 삭제 (회원 탈퇴) 기능을 제공합니다.
            </p>
          </section>

          <section id="features" style={{ marginBottom: '3rem', scrollMarginTop: '2rem' }}>
            <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>주요 기능</h2>
            
            <div style={{
              padding: '1.5rem',
              backgroundColor: 'var(--card-bg)',
              borderRadius: '8px',
              border: '1px solid var(--nav-border)',
              marginBottom: '1.5rem'
            }}>
              <h3 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>회원가입 및 로그인</h3>
              <div style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}>
                <p style={{ marginBottom: '0.5rem' }}>JWT 기반 인증 시스템으로 Access Token과 Refresh Token을 발급합니다.</p>
                <p style={{ marginBottom: '0.5rem' }}><strong style={{ color: 'var(--text-color)' }}>주요 기능:</strong></p>
                <ul style={{ marginLeft: '1.5rem', marginBottom: '0.5rem' }}>
                  <li>회원가입 (ID, 비밀번호, 닉네임, 이메일)</li>
                  <li>로그인 시 Access Token (15분) + Refresh Token (1일) 발급</li>
                  <li>Refresh Token으로 Access Token 갱신</li>
                  <li>제재 상태 확인 (정지/차단 시 로그인 불가)</li>
                  <li>소셜 로그인 (카카오, 구글, 네이버)</li>
                  <li>비밀번호 암호화 (BCrypt)</li>
                </ul>
                <p style={{ marginBottom: '0.5rem' }}><strong style={{ color: 'var(--text-color)' }}>사용자 시나리오:</strong></p>
                <ol style={{ marginLeft: '1.5rem', marginBottom: '0.5rem' }}>
                  <li>회원가입 (ID, 비밀번호, 닉네임, 이메일)</li>
                  <li>로그인 시 Access Token (15분) + Refresh Token (1일) 발급</li>
                  <li>Refresh Token으로 Access Token 갱신</li>
                  <li>제재 상태 확인 (정지/차단 시 로그인 불가)</li>
                </ol>
                <p style={{ marginTop: '0.5rem', fontStyle: 'italic', color: 'var(--text-muted)' }}>스크린샷/영상: [추가 예정]</p>
              </div>
            </div>

            <div style={{
              padding: '1.5rem',
              backgroundColor: 'var(--card-bg)',
              borderRadius: '8px',
              border: '1px solid var(--nav-border)',
              marginBottom: '1.5rem'
            }}>
              <h3 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>반려동물 등록</h3>
              <div style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}>
                <p style={{ marginBottom: '0.5rem' }}>사용자가 반려동물 정보를 등록하고 관리할 수 있습니다.</p>
                <p style={{ marginBottom: '0.5rem' }}><strong style={{ color: 'var(--text-color)' }}>주요 기능:</strong></p>
                <ul style={{ marginLeft: '1.5rem', marginBottom: '0.5rem' }}>
                  <li>반려동물 등록 (이름, 종류, 품종, 성별, 나이 등)</li>
                  <li>프로필 이미지 업로드</li>
                  <li>반려동물 정보 수정/삭제</li>
                  <li>백신 접종 이력 관리</li>
                </ul>
                <p style={{ marginBottom: '0.5rem' }}><strong style={{ color: 'var(--text-color)' }}>사용자 시나리오:</strong></p>
                <ol style={{ marginLeft: '1.5rem', marginBottom: '0.5rem' }}>
                  <li>반려동물 등록 (이름, 종류, 품종, 성별, 나이 등)</li>
                  <li>프로필 이미지 업로드</li>
                  <li>반려동물 정보 수정/삭제</li>
                </ol>
                <p style={{ marginTop: '0.5rem', fontStyle: 'italic', color: 'var(--text-muted)' }}>스크린샷/영상: [추가 예정]</p>
              </div>
            </div>

            <div style={{
              padding: '1.5rem',
              backgroundColor: 'var(--card-bg)',
              borderRadius: '8px',
              border: '1px solid var(--nav-border)',
              marginBottom: '1.5rem'
            }}>
              <h3 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>사용자 제재 시스템</h3>
              <div style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}>
                <p style={{ marginBottom: '0.5rem' }}>관리자가 사용자에게 경고, 이용제한, 영구 차단을 부여할 수 있습니다.</p>
                <p style={{ marginBottom: '0.5rem' }}><strong style={{ color: 'var(--text-color)' }}>주요 기능:</strong></p>
                <ul style={{ marginLeft: '1.5rem', marginBottom: '0.5rem' }}>
                  <li>경고 부여 (3회 누적 시 자동 이용제한 3일 적용)</li>
                  <li>이용제한 기간 만료 시 자동 해제 (스케줄러)</li>
                  <li>영구 차단 시 로그인 불가</li>
                  <li>제재 이력 영구 보관</li>
                </ul>
                <p style={{ marginBottom: '0.5rem' }}><strong style={{ color: 'var(--text-color)' }}>사용자 시나리오:</strong></p>
                <ol style={{ marginLeft: '1.5rem', marginBottom: '0.5rem' }}>
                  <li>경고 3회 누적 시 자동 이용제한 3일 적용</li>
                  <li>이용제한 기간 만료 시 자동 해제 (스케줄러)</li>
                  <li>영구 차단 시 로그인 불가</li>
                </ol>
                <p style={{ marginTop: '0.5rem', fontStyle: 'italic', color: 'var(--text-muted)' }}>스크린샷/영상: [추가 예정]</p>
              </div>
            </div>

            <div style={{
              padding: '1.5rem',
              backgroundColor: 'var(--card-bg)',
              borderRadius: '8px',
              border: '1px solid var(--nav-border)'
            }}>
              <h3 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>프로필 관리</h3>
              <div style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}>
                <p style={{ marginBottom: '0.5rem' }}>사용자 정보를 수정하고 관리할 수 있습니다.</p>
                <p style={{ marginBottom: '0.5rem' }}><strong style={{ color: 'var(--text-color)' }}>주요 기능:</strong></p>
                <ul style={{ marginLeft: '1.5rem', marginBottom: '0.5rem' }}>
                  <li>프로필 관리 (닉네임, 이메일, 전화번호, 위치)</li>
                  <li>사용자 정보 수정</li>
                  <li>소프트 삭제 (회원 탈퇴, 데이터 보존)</li>
                  <li>마지막 로그인 시간 추적</li>
                </ul>
                <p style={{ marginTop: '0.5rem', fontStyle: 'italic', color: 'var(--text-muted)' }}>스크린샷/영상: [추가 예정]</p>
              </div>
            </div>
      </section>

          <section id="entities" style={{ marginBottom: '3rem', scrollMarginTop: '2rem' }}>
            <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>Entity 구조</h2>
        
        <div style={{
          padding: '1.5rem',
          backgroundColor: 'var(--card-bg)',
          borderRadius: '8px',
          border: '1px solid var(--nav-border)'
        }}>
          <MermaidDiagram chart={entityDiagram} />
        </div>
      </section>

          <section id="services" style={{ marginBottom: '3rem', scrollMarginTop: '2rem' }}>
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

          <section id="security" style={{ marginBottom: '3rem', scrollMarginTop: '2rem' }}>
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

          <section id="performance" style={{ marginBottom: '3rem', scrollMarginTop: '2rem' }}>
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

          <section id="relationships" style={{ marginBottom: '3rem', scrollMarginTop: '2rem' }}>
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

          <section id="api" style={{ marginBottom: '3rem', scrollMarginTop: '2rem' }}>
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

          <section id="docs" style={{ marginBottom: '3rem', scrollMarginTop: '2rem' }}>
            <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>관련 문서</h2>
        <div style={{
          padding: '1rem',
          backgroundColor: 'var(--card-bg)',
          borderRadius: '8px',
          border: '1px solid var(--nav-border)'
        }}>
          <a 
            href="https://github.com/makkong1/makkong1-github.io/blob/main/docs/domains/user.md" 
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
        <TableOfContents sections={sections} />
      </div>
    </div>
  );
}

export default UserDomain;

