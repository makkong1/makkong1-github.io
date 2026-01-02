import { Link } from 'react-router-dom';
import MermaidDiagram from '../../../../components/Common/MermaidDiagram';
import TableOfContents from '../../../../components/Common/TableOfContents';

function UserDomain() {
  const sections = [
    { id: 'intro', title: '도메인 소개' },
    { id: 'features', title: '주요 기능' },
    { id: 'troubleshooting', title: '트러블슈팅' },
    { id: 'db-optimization', title: 'DB 최적화' },
    { id: 'entities', title: 'Entity 구조' },
    { id: 'security', title: '보안 및 권한 체계' },
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
    <div className="domain-page-wrapper" style={{ padding: '2rem 0' }}>
      <div className="domain-page-container" style={{ display: 'flex', gap: '2rem', alignItems: 'flex-start' }}>
        <div className="domain-page-content" style={{ flex: 1 }}>
          <h1 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>유저 도메인</h1>
          
          {/* 1. 도메인 소개 */}
          <section id="intro" style={{ marginBottom: '3rem', scrollMarginTop: '2rem' }}>
            <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>도메인 소개</h2>
            <div className="section-card" style={{
              padding: '1.5rem',
              backgroundColor: 'var(--card-bg)',
              borderRadius: '8px',
              border: '1px solid var(--nav-border)'
            }}>
              <p style={{ lineHeight: '1.8', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                User 도메인은 인증·인가 및 사용자 상태 관리, 반려동물 등록/관리를 담당합니다.
              </p>
              {/* <p style={{ lineHeight: '1.8', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                <strong style={{ color: 'var(--text-color)' }}>실서비스 환경에서 가장 빈번하게 호출되는 도메인 중 하나</strong>입니다.
              </p> */}
              <div style={{
                padding: '1rem',
                backgroundColor: 'var(--bg-color)',
                borderRadius: '6px',
                marginTop: '1rem',
                border: '1px solid var(--nav-border)'
              }}>
                <h3 style={{ marginBottom: '0.75rem', color: 'var(--text-color)', fontSize: '1rem' }}>주요 기능</h3>
                <ul style={{
                  listStyle: 'none',
                  padding: 0,
                  color: 'var(--text-secondary)',
                  lineHeight: '1.8',
                  fontSize: '0.9rem',
                  margin: 0
                }}>
                  <li>• 회원가입/로그인 (JWT 기반)</li>
                  <li>• 소셜 로그인 (Google, Naver) - OAuth2 기반</li>
                  <li>• 이메일 인증 시스템 (단일 통합 시스템, Redis 활용)</li>
                  <li>• 사용자 제재 시스템 (경고, 이용제한, 영구 차단)</li>
                  <li>• 반려동물 등록/관리</li>
                  <li>• 프로필 관리 및 리뷰 조회</li>
                  <li>• 비밀번호 찾기 및 변경</li>
                </ul>
              </div>
              <div style={{
                padding: '1rem',
                backgroundColor: 'var(--bg-color)',
                borderRadius: '6px',
                marginTop: '1rem',
                border: '1px solid var(--nav-border)'
              }}>
                <h3 style={{ marginBottom: '0.75rem', color: 'var(--text-color)', fontSize: '1rem' }}>핵심 성과</h3>
                <ul style={{
                  listStyle: 'none',
                  padding: 0,
                  color: 'var(--text-secondary)',
                  lineHeight: '1.8',
                  fontSize: '0.9rem'
                }}>
                  <li>• 로그인 쿼리: <strong style={{ color: 'var(--text-color)' }}>21개 → 4개</strong> (80.95% 감소)</li>
                  <li>• 실행 시간: <strong style={{ color: 'var(--text-color)' }}>305ms → 55ms</strong> (81.97% 감소)</li>
                  <li>• 메모리 사용량: <strong style={{ color: 'var(--text-color)' }}>0.58MB → 0.13MB</strong> (77.24% 감소)</li>
                </ul>
              </div>
            </div>
          </section>

          {/* 2. 주요 기능 */}
          <section id="features" style={{ marginBottom: '3rem', scrollMarginTop: '2rem' }}>
            <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>주요 기능</h2>
            
            <div className="section-card" style={{
              padding: '1.5rem',
              backgroundColor: 'var(--card-bg)',
              borderRadius: '8px',
              border: '1px solid var(--nav-border)',
              marginBottom: '1rem'
            }}>
              <h3 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>1. 회원가입 및 로그인 (JWT 기반)</h3>
              <div style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}>
                <p style={{ marginBottom: '0.5rem' }}>JWT 기반 인증 시스템으로 Access Token과 Refresh Token을 발급합니다.</p>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  <li>• 회원가입 (ID, 비밀번호, 닉네임, 이메일)</li>
                  <li>• 로그인 시 Access Token (15분) + Refresh Token (1일) 발급</li>
                  <li>• Refresh Token으로 Access Token 갱신</li>
                  <li>• 제재 상태 확인 (정지/차단 시 로그인 불가)</li>
                </ul>
              </div>
            </div>

            <div className="section-card" style={{
              padding: '1.5rem',
              backgroundColor: 'var(--card-bg)',
              borderRadius: '8px',
              border: '1px solid var(--nav-border)',
              marginBottom: '1rem'
            }}>
              <h3 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>2. 소셜 로그인 (Google, Naver)</h3>
              <div style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}>
                <p style={{ marginBottom: '0.5rem' }}>OAuth2 기반 소셜 로그인으로 Google/Naver 계정으로 간편 로그인 및 회원가입이 가능합니다.</p>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  <li>• 소셜 로그인 성공 시 일반 로그인과 동일하게 JWT 토큰 발급</li>
                  <li>• 기존 사용자: 자동 로그인 및 JWT 토큰 발급</li>
                  <li>• 신규 사용자: 자동 회원가입 후 로그인 및 JWT 토큰 발급</li>
                  <li>• 이메일이 동일한 기존 사용자: 소셜 계정 자동 연결</li>
                  <li>• 닉네임이 없는 경우: 닉네임 설정 페이지로 리다이렉트</li>
                  <li>• Provider별 사용자 정보 표준화 (Google: sub, Naver: id)</li>
                </ul>
              </div>
            </div>

            <div className="section-card" style={{
              padding: '1.5rem',
              backgroundColor: 'var(--card-bg)',
              borderRadius: '8px',
              border: '1px solid var(--nav-border)',
              marginBottom: '1rem'
            }}>
              <h3 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>3. 이메일 인증 시스템</h3>
              <div style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}>
                <p style={{ marginBottom: '0.5rem' }}>단일 이메일 인증 시스템으로 비밀번호 변경, 펫케어/모임 서비스 이용을 위한 인증을 제공합니다.</p>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  <li>• <strong style={{ color: 'var(--text-color)' }}>소셜 로그인</strong>: Google/Naver 로그인 시 자동으로 이메일 인증 완료</li>
                  <li>• <strong style={{ color: 'var(--text-color)' }}>일반 회원가입</strong>: 회원가입 전 이메일 인증 가능 (Redis에 임시 저장), 회원가입 시 이메일 인증 메일 발송</li>
                  <li>• <strong style={{ color: 'var(--text-color)' }}>비밀번호 변경</strong>: 비밀번호 재설정 전 이메일 인증 필수 확인</li>
                  <li>• <strong style={{ color: 'var(--text-color)' }}>펫케어/모임 서비스</strong>: 서비스 이용 시 이메일 인증 확인 → 미인증 시 예외 발생</li>
                  <li>• <strong style={{ color: 'var(--text-color)' }}>권한 제어</strong>: 인증 안 된 사용자는 주변 서비스, 커뮤니티만 조회 가능, 펫케어/모임은 이용 불가</li>
                </ul>
              </div>
            </div>

            <div className="section-card" style={{
              padding: '1.5rem',
              backgroundColor: 'var(--card-bg)',
              borderRadius: '8px',
              border: '1px solid var(--nav-border)',
              marginBottom: '1rem'
            }}>
              <h3 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>4. 사용자 제재 시스템</h3>
              <div style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}>
                <p style={{ marginBottom: '0.5rem' }}>관리자가 사용자에게 경고, 이용제한, 영구 차단을 부여할 수 있습니다.</p>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  <li>• 경고 3회 누적 시 자동 이용제한 3일 적용</li>
                  <li>• 이용제한 기간 만료 시 자동 해제 (스케줄러)</li>
                  <li>• 영구 차단 시 로그인 불가</li>
                  <li>• 동시성 문제 해결: DB 레벨에서 원자적 증가 쿼리 사용</li>
                </ul>
              </div>
            </div>

            <div className="section-card" style={{
              padding: '1.5rem',
              backgroundColor: 'var(--card-bg)',
              borderRadius: '8px',
              border: '1px solid var(--nav-border)'
            }}>
              <h3 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>5. 반려동물 등록 및 관리</h3>
              <div style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  <li>• 반려동물 등록 (이름, 종류, 품종, 성별, 나이 등)</li>
                  <li>• 프로필 이미지 업로드</li>
                  <li>• 반려동물 정보 수정/삭제</li>
                  <li>• 예방접종 기록 관리</li>
                </ul>
              </div>
            </div>
          </section>

          {/* 3. 문제 재현 방식 (테스트 설계)
          <section id="test-design" style={{ marginBottom: '3rem', scrollMarginTop: '2rem' }}>
            <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>문제 재현 방식 (테스트 설계)</h2>
            <div className="section-card" style={{
              padding: '1.5rem',
              backgroundColor: 'var(--card-bg)',
              borderRadius: '8px',
              border: '1px solid var(--nav-border)'
            }}>
              <p style={{ lineHeight: '1.8', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                다수 사용자가 동시에 접근하는 상황에서, 인증 과정 중 연관 엔티티 조회로 인해 N+1 문제가 발생했습니다.
              </p>
              <div style={{
                padding: '1rem',
                backgroundColor: 'var(--bg-color)',
                borderRadius: '6px',
                marginTop: '1rem'
              }}>
                <h3 style={{ marginBottom: '0.75rem', color: 'var(--text-color)', fontSize: '1rem' }}>테스트 구성</h3>
                <ul style={{
                  listStyle: 'none',
                  padding: 0,
                  color: 'var(--text-secondary)',
                  lineHeight: '1.8'
                }}>
                  <li>• <strong style={{ color: 'var(--text-color)' }}>동시 로그인 요청 시나리오</strong>: 다수 사용자 동시 접근 상황 시뮬레이션</li>
                  <li>• <strong style={{ color: 'var(--text-color)' }}>운영 환경과 유사한 더미 데이터</strong>: 채팅방 10개, 참여자 3명, 메시지 20개</li>
                  <li>• <strong style={{ color: 'var(--text-color)' }}>반복 호출 기반 부하 테스트</strong>: 실제 사용 패턴 반영</li>
                </ul>
              </div>
              <div style={{
                marginTop: '1rem',
                padding: '1rem',
                backgroundColor: 'var(--bg-color)',
                borderRadius: '6px',
                border: '1px solid var(--link-color)'
              }}>
                <Link
                  to="/domains/user/optimization"
                  style={{
                    color: 'var(--link-color)',
                    textDecoration: 'none',
                    fontWeight: 'bold',
                    display: 'inline-block'
                  }}
                >
                  → 성능 최적화 상세 페이지 보기
                </Link>
                <p style={{
                  fontSize: '0.85rem',
                  color: 'var(--text-secondary)',
                  marginTop: '0.5rem',
                  marginBottom: 0
                }}>
                  (시퀀스 다이어그램, 테스트 코드, 상세 최적화 과정 포함)
                </p>
              </div>
            </div>
          </section>

           4. 성능 최적화 및 동시성 제어 
          <section id="optimization" style={{ marginBottom: '3rem', scrollMarginTop: '2rem' }}>
            <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>성능 최적화 및 동시성 제어</h2>
            
            <div className="section-card" style={{
              padding: '1.5rem',
              backgroundColor: 'var(--card-bg)',
              borderRadius: '8px',
              border: '1px solid var(--nav-border)',
              marginBottom: '1rem'
            }}>
              <h3 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>핵심 최적화 방법</h3>
              <ul style={{
                listStyle: 'none',
                padding: 0,
                color: 'var(--text-secondary)',
                lineHeight: '1.8'
              }}>
                <li>• <strong style={{ color: 'var(--text-color)' }}>배치 조회 패턴</strong>: 채팅방 ID 목록을 IN 절로 한 번에 조회</li>
                <li>• <strong style={{ color: 'var(--text-color)' }}>Fetch Join 활용</strong>: 참여자 조회 시 Users 엔티티도 함께 조회하여 추가 쿼리 방지</li>
                <li>• <strong style={{ color: 'var(--text-color)' }}>최신 메시지만 조회</strong>: 모든 메시지 대신 최신 메시지만 조회하여 메모리 사용량 감소</li>
                <li>• <strong style={{ color: 'var(--text-color)' }}>메모리에서 매핑</strong>: 조회한 데이터를 Map으로 변환하여 빠르게 매핑</li>
              </ul>
              <div style={{
                marginTop: '1rem',
                padding: '1rem',
                backgroundColor: 'var(--bg-color)',
                borderRadius: '6px',
                border: '1px solid var(--link-color)'
              }}>
                <Link
                  to="/domains/user/optimization"
                  style={{
                    color: 'var(--link-color)',
                    textDecoration: 'none',
                    fontWeight: 'bold',
                    display: 'inline-block'
                  }}
                >
                  → 성능 최적화 상세 페이지 보기
                </Link>
                <p style={{
                  fontSize: '0.85rem',
                  color: 'var(--text-secondary)',
                  marginTop: '0.5rem',
                  marginBottom: 0
                }}>
                  (코드 예시, 단계별 설명, Before/After 비교 포함)
                </p>
              </div>
            </div>
          </section>

           5. 성능 개선 결과 
          <section id="after" style={{ marginBottom: '3rem', scrollMarginTop: '2rem' }}>
            <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>성능 개선 결과</h2>
            <div className="section-card" style={{
              padding: '1.5rem',
              backgroundColor: 'var(--card-bg)',
              borderRadius: '8px',
              border: '1px solid var(--nav-border)',
              marginBottom: '1rem'
            }}>
              <div style={{
                overflowX: 'auto'
              }}>
                <table style={{
                  width: '100%',
                  borderCollapse: 'collapse',
                  color: 'var(--text-secondary)'
                }}>
                  <thead>
                    <tr style={{
                      borderBottom: '2px solid var(--nav-border)'
                    }}>
                      <th style={{
                        padding: '0.75rem',
                        textAlign: 'left',
                        color: 'var(--text-color)',
                        fontWeight: 'bold'
                      }}>항목</th>
                      <th style={{
                        padding: '0.75rem',
                        textAlign: 'left',
                        color: 'var(--text-color)',
                        fontWeight: 'bold'
                      }}>개선 전</th>
                      <th style={{
                        padding: '0.75rem',
                        textAlign: 'left',
                        color: 'var(--text-color)',
                        fontWeight: 'bold'
                      }}>개선 후</th>
                      <th style={{
                        padding: '0.75rem',
                        textAlign: 'left',
                        color: 'var(--text-color)',
                        fontWeight: 'bold'
                      }}>개선율</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr style={{
                      borderBottom: '1px solid var(--nav-border)'
                    }}>
                      <td style={{ padding: '0.75rem' }}>쿼리 수</td>
                      <td style={{ padding: '0.75rem' }}>21개</td>
                      <td style={{ padding: '0.75rem', fontWeight: 'bold', color: 'var(--link-color)' }}>4개</td>
                      <td style={{ padding: '0.75rem', fontWeight: 'bold', color: 'var(--link-color)' }}>80.95% ↓</td>
                    </tr>
                    <tr style={{
                      borderBottom: '1px solid var(--nav-border)'
                    }}>
                      <td style={{ padding: '0.75rem' }}>평균 응답 시간</td>
                      <td style={{ padding: '0.75rem' }}>305ms</td>
                      <td style={{ padding: '0.75rem', fontWeight: 'bold', color: 'var(--link-color)' }}>55ms</td>
                      <td style={{ padding: '0.75rem', fontWeight: 'bold', color: 'var(--link-color)' }}>81.97% ↓</td>
                    </tr>
                    <tr>
                      <td style={{ padding: '0.75rem' }}>메모리 사용량</td>
                      <td style={{ padding: '0.75rem' }}>0.58MB</td>
                      <td style={{ padding: '0.75rem', fontWeight: 'bold', color: 'var(--link-color)' }}>0.13MB</td>
                      <td style={{ padding: '0.75rem', fontWeight: 'bold', color: 'var(--link-color)' }}>77.24% ↓</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </section> */}

          {/* 7. 트러블슈팅 */}
          <section id="troubleshooting" style={{ marginBottom: '3rem', scrollMarginTop: '2rem' }}>
            <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>트러블슈팅</h2>
            
            <div className="section-card" style={{
              padding: '1.5rem',
              backgroundColor: 'var(--card-bg)',
              borderRadius: '8px',
              border: '1px solid var(--nav-border)',
              marginBottom: '1rem'
            }}>
              <h3 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>1. 로그인 시 N+1 문제</h3>
              <div style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}>
                <p style={{ marginBottom: '0.5rem' }}><strong style={{ color: 'var(--text-color)' }}>문제:</strong> 로그인 시 채팅방 목록 조회 과정에서 N+1 문제 발생 (채팅방 N개 기준: 2N+1번 쿼리)</p>
                <p style={{ marginBottom: '0.5rem' }}><strong style={{ color: 'var(--text-color)' }}>해결:</strong> 배치 조회 패턴, Fetch Join, 최신 메시지만 조회, 메모리 매핑</p>
                <p style={{ marginBottom: '0.5rem' }}><strong style={{ color: 'var(--text-color)' }}>효과:</strong> 쿼리 수 21개 → 4개 (80.95% 감소), 실행 시간 305ms → 55ms (81.97% 단축)</p>
                <div style={{
                  marginTop: '1rem',
                  padding: '1rem',
                  backgroundColor: 'var(--bg-color)',
                  borderRadius: '6px',
                  border: '1px solid var(--link-color)'
                }}>
                  <Link
                    to="/domains/user/optimization"
                    style={{
                      color: 'var(--link-color)',
                      textDecoration: 'none',
                      fontWeight: 'bold',
                      display: 'inline-block'
                    }}
                  >
                    → N+1 문제 해결 상세 보기
                  </Link>
                </div>
              </div>
            </div>

            <div className="section-card" style={{
              padding: '1.5rem',
              backgroundColor: 'var(--card-bg)',
              borderRadius: '8px',
              border: '1px solid var(--nav-border)',
              marginBottom: '1rem'
            }}>
              <h3 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>2. 제재 시스템 동시성 문제</h3>
              <div style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}>
                <p style={{ marginBottom: '0.5rem' }}><strong style={{ color: 'var(--text-color)' }}>가정 상황:</strong> 여러 관리자가 동시에 같은 사용자에게 경고 부여</p>
                <p style={{ marginBottom: '0.5rem' }}><strong style={{ color: 'var(--text-color)' }}>문제:</strong></p>
                <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 1rem 0' }}>
                  <li>• 여러 스레드가 동시에 경고 횟수를 읽고 증가시키면 Lost Update 발생</li>
                  <li>• 경고 2회 상태에서 3명이 동시에 경고 부여 시, 예상값 5가 아닌 3~4로 누락 가능</li>
                  <li>• 경고 3회 도달 판단이 부정확해져 자동 이용제한이 누락되거나 중복 적용될 수 있음</li>
                </ul>
                <p style={{ marginBottom: '0.5rem' }}><strong style={{ color: 'var(--text-color)' }}>해결 방법:</strong> DB 레벨에서 원자적 증가 쿼리 사용</p>
                <pre style={{
                  padding: '1rem',
                  backgroundColor: 'var(--bg-color)',
                  borderRadius: '6px',
                  overflow: 'auto',
                  fontSize: '0.85rem',
                  color: 'var(--text-secondary)',
                  fontFamily: 'monospace',
                  lineHeight: '1.6',
                  marginTop: '0.5rem'
                }}>
{`// UsersRepository.java
@Modifying
@Query("UPDATE Users u SET u.warningCount = u.warningCount + 1 WHERE u.idx = :userId")
void incrementWarningCount(@Param("userId") Long userId);`}
                </pre>
                <p style={{ marginTop: '0.5rem', marginBottom: 0 }}><strong style={{ color: 'var(--text-color)' }}>효과:</strong> 동시 요청 시에도 경고 횟수가 정확하게 증가하며, 경고 3회 도달 시 자동 이용제한이 정확히 한 번만 적용됨</p>
              </div>
            </div>

            <div className="section-card" style={{
              padding: '1.5rem',
              backgroundColor: 'var(--card-bg)',
              borderRadius: '8px',
              border: '1px solid var(--nav-border)',
              marginBottom: '1rem'
            }}>
              <h3 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>3. 소셜 로그인 동시성 문제</h3>
              <div style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}>
                <p style={{ marginBottom: '0.5rem' }}><strong style={{ color: 'var(--text-color)' }}>가정 상황:</strong> 같은 소셜 계정(같은 provider + providerId 또는 같은 email)으로 동시에 여러 번 로그인 시도</p>
                <p style={{ marginBottom: '0.5rem' }}><strong style={{ color: 'var(--text-color)' }}>문제:</strong></p>
                <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 1rem 0' }}>
                  <li>• 여러 스레드가 동시에 조회 시 모두 null 반환</li>
                  <li>• 각 스레드가 신규 사용자로 판단하여 중복 계정 생성 가능 (Race Condition)</li>
                  <li>• 같은 이메일로 여러 Users 엔티티가 생성되거나, 같은 provider+providerId로 여러 SocialUser가 생성될 수 있음</li>
                </ul>
                <p style={{ marginBottom: '0.5rem' }}><strong style={{ color: 'var(--text-color)' }}>해결 방법:</strong> DB UNIQUE 제약조건 + 트랜잭션 격리 수준 활용</p>
                <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 1rem 0' }}>
                  <li>• <code style={{ backgroundColor: 'var(--bg-color)', padding: '0.2rem 0.4rem', borderRadius: '4px' }}>Users.email</code> UNIQUE 제약조건: 같은 이메일로 중복 계정 생성 방지</li>
                  <li>• <code style={{ backgroundColor: 'var(--bg-color)', padding: '0.2rem 0.4rem', borderRadius: '4px' }}>SocialUser.provider + providerId</code> UNIQUE 제약조건: 같은 소셜 계정으로 중복 SocialUser 생성 방지</li>
                  <li>• <code style={{ backgroundColor: 'var(--bg-color)', padding: '0.2rem 0.4rem', borderRadius: '4px' }}>@Transactional</code>: 트랜잭션 내에서 일관성 보장</li>
                  <li>• 중복 생성 시도 시 DB 제약조건 위반 예외 발생 → 트랜잭션 롤백</li>
                </ul>
                <p style={{ marginTop: '0.5rem', marginBottom: 0 }}><strong style={{ color: 'var(--text-color)' }}>효과:</strong> 동시 요청 시에도 하나의 사용자 계정만 생성되며, 기존 계정과의 연결도 정확하게 처리됨</p>
              </div>
            </div>

            <div className="section-card" style={{
              padding: '1.5rem',
              backgroundColor: 'var(--card-bg)',
              borderRadius: '8px',
              border: '1px solid var(--nav-border)'
            }}>
              <h3 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>4. 소셜 로그인 Provider별 데이터 표준화</h3>
              <div style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}>
                <p style={{ marginBottom: '0.5rem' }}><strong style={{ color: 'var(--text-color)' }}>문제:</strong> Google과 Naver의 OAuth2 응답 형식이 다름</p>
                <p style={{ marginBottom: '0.5rem' }}><strong style={{ color: 'var(--text-color)' }}>해결:</strong> Provider별 OAuth2UserService에서 표준화된 형태로 변환</p>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  <li>• <strong style={{ color: 'var(--text-color)' }}>Google</strong>: sub, email, name, picture, email_verified</li>
                  <li>• <strong style={{ color: 'var(--text-color)' }}>Naver</strong>: id, email, name, profile_image, birthyear, birthday, gender</li>
                  <li>• Naver는 커스텀 TokenResponseClient 사용 (표준 OAuth2와 다른 응답 형식)</li>
                  <li>• Google은 기본 클라이언트 사용</li>
                </ul>
              </div>
            </div>
          </section>

          {/* 8. DB 최적화 */}
          <section id="db-optimization" style={{ marginBottom: '3rem', scrollMarginTop: '2rem' }}>
            <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>DB 최적화</h2>
            
            <div className="section-card" style={{
              padding: '1.5rem',
              backgroundColor: 'var(--card-bg)',
              borderRadius: '8px',
              border: '1px solid var(--nav-border)',
              marginBottom: '1rem'
            }}>
              <h3 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>인덱스 전략</h3>
              <div style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}>
                <p style={{ marginBottom: '0.5rem' }}><strong style={{ color: 'var(--text-color)' }}>users 테이블:</strong></p>
                <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 1rem 0' }}>
                  <li>• 이메일 조회 (UNIQUE): <code style={{ backgroundColor: 'var(--bg-color)', padding: '0.2rem 0.4rem', borderRadius: '4px' }}>CREATE UNIQUE INDEX email ON users(email)</code></li>
                  <li>• 로그인용 ID 조회 (UNIQUE): <code style={{ backgroundColor: 'var(--bg-color)', padding: '0.2rem 0.4rem', borderRadius: '4px' }}>CREATE UNIQUE INDEX id ON users(id)</code></li>
                  <li>• 닉네임 조회 (UNIQUE): <code style={{ backgroundColor: 'var(--bg-color)', padding: '0.2rem 0.4rem', borderRadius: '4px' }}>CREATE UNIQUE INDEX uk_users_nickname ON users(nickname)</code></li>
                  <li>• 사용자명 조회 (UNIQUE): <code style={{ backgroundColor: 'var(--bg-color)', padding: '0.2rem 0.4rem', borderRadius: '4px' }}>CREATE UNIQUE INDEX username ON users(username)</code></li>
                </ul>
                <p style={{ marginBottom: '0.5rem' }}><strong style={{ color: 'var(--text-color)' }}>socialuser 테이블:</strong></p>
                <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 1rem 0' }}>
                  <li>• 사용자별 소셜 계정 조회: <code style={{ backgroundColor: 'var(--bg-color)', padding: '0.2rem 0.4rem', borderRadius: '4px' }}>CREATE INDEX users_idx ON socialuser(users_idx)</code></li>
                </ul>
                <p style={{ marginBottom: '0.5rem' }}><strong style={{ color: 'var(--text-color)' }}>user_sanctions 테이블:</strong></p>
                <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 1rem 0' }}>
                  <li>• 제재 종료일 조회 (만료된 제재 조회): <code style={{ backgroundColor: 'var(--bg-color)', padding: '0.2rem 0.4rem', borderRadius: '4px' }}>CREATE INDEX idx_ends_at ON user_sanctions(ends_at)</code></li>
                  <li>• 사용자별 제재 조회: <code style={{ backgroundColor: 'var(--bg-color)', padding: '0.2rem 0.4rem', borderRadius: '4px' }}>CREATE INDEX idx_user_idx ON user_sanctions(user_idx)</code></li>
                </ul>
                <p style={{ marginBottom: '0.5rem' }}><strong style={{ color: 'var(--text-color)' }}>선정 이유:</strong></p>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  <li>• 자주 조회되는 컬럼 (id, email, nickname, username)</li>
                  <li>• UNIQUE 제약조건으로 중복 방지</li>
                  <li>• JOIN에 사용되는 외래키 (user_idx, users_idx)</li>
                  <li>• 제재 만료일 조회 최적화</li>
                </ul>
              </div>
            </div>

            <div className="section-card" style={{
              padding: '1.5rem',
              backgroundColor: 'var(--card-bg)',
              borderRadius: '8px',
              border: '1px solid var(--nav-border)'
            }}>
              <h3 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>쿼리 최적화</h3>
              <div style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}>
                <p style={{ marginBottom: '0.5rem' }}><strong style={{ color: 'var(--text-color)' }}>Before:</strong> 비효율적인 쿼리 (N+1 문제)</p>
                <pre style={{
                  padding: '1rem',
                  backgroundColor: 'var(--bg-color)',
                  borderRadius: '6px',
                  overflow: 'auto',
                  fontSize: '0.85rem',
                  color: 'var(--text-secondary)',
                  fontFamily: 'monospace',
                  lineHeight: '1.6',
                  marginBottom: '1rem'
                }}>
{`SELECT * FROM users WHERE id = ?;
SELECT * FROM pet WHERE user_idx = ?;  -- N+1`}
                </pre>
                <p style={{ marginBottom: '0.5rem' }}><strong style={{ color: 'var(--text-color)' }}>After:</strong> 최적화된 쿼리 (Fetch Join)</p>
                <pre style={{
                  padding: '1rem',
                  backgroundColor: 'var(--bg-color)',
                  borderRadius: '6px',
                  overflow: 'auto',
                  fontSize: '0.85rem',
                  color: 'var(--text-secondary)',
                  fontFamily: 'monospace',
                  lineHeight: '1.6',
                  marginBottom: '1rem'
                }}>
{`SELECT u.*, p.* 
FROM users u 
LEFT JOIN pet p ON u.idx = p.user_idx 
WHERE u.id = ? AND u.is_deleted = false;`}
                </pre>
                <p style={{ marginBottom: '0.5rem' }}><strong style={{ color: 'var(--text-color)' }}>개선 포인트:</strong></p>
                <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 1rem 0' }}>
                  <li>• Fetch Join으로 N+1 문제 해결</li>
                  <li>• 소프트 삭제 필터링</li>
                </ul>
                <p style={{ marginBottom: 0 }}><strong style={{ color: 'var(--text-color)' }}>성능 측정:</strong> Before: 사용자 조회 + 펫 조회 = 2개 쿼리 → After: Fetch Join으로 1개 쿼리</p>
              </div>
            </div>
          </section>

        
          {/* 9. Entity 구조 */}
          <section id="entities" style={{ marginBottom: '3rem', scrollMarginTop: '2rem' }}>
            <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>Entity 구조</h2>
            <div className="section-card" style={{
              padding: '1.5rem',
              backgroundColor: 'var(--card-bg)',
              borderRadius: '8px',
              border: '1px solid var(--nav-border)'
            }}>
              <MermaidDiagram chart={entityDiagram} />
            </div>
          </section>

          {/* 10. 보안 및 권한 체계 */}
          <section id="security" style={{ marginBottom: '3rem', scrollMarginTop: '2rem' }}>
            <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>보안 및 권한 체계</h2>
            <div className="section-card" style={{
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
            <div className="section-card" style={{
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
                <li>• <strong style={{ color: 'var(--text-color)' }}>비밀번호 암호화</strong>: BCryptPasswordEncoder 사용</li>
                <li>• <strong style={{ color: 'var(--text-color)' }}>JWT 토큰</strong>: Access Token (15분), Refresh Token (1일)</li>
                <li>• <strong style={{ color: 'var(--text-color)' }}>소프트 삭제</strong>: isDeleted 플래그로 논리 삭제</li>
              </ul>
            </div>
          </section>

          {/* 13. 다른 도메인과의 연관관계 */}
          <section id="relationships" style={{ marginBottom: '3rem', scrollMarginTop: '2rem' }}>
            <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>다른 도메인과의 연관관계</h2>
            <div className="section-card" style={{
              padding: '1.5rem',
              backgroundColor: 'var(--card-bg)',
              borderRadius: '8px',
              border: '1px solid var(--nav-border)'
            }}>
              <div style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}>
                <div style={{ marginBottom: '0.5rem' }}><strong style={{ color: 'var(--text-color)' }}>Board 도메인:</strong></div>
                <div>• Users가 게시글/댓글 작성, 좋아요/싫어요 반응</div>
                <div style={{ marginTop: '1rem', marginBottom: '0.5rem' }}><strong style={{ color: 'var(--text-color)' }}>Care 도메인:</strong></div>
                <div>• Users가 펫케어 요청 생성, 펫케어에 지원, 펫케어 리뷰 작성</div>
                <div style={{ marginTop: '1rem', marginBottom: '0.5rem' }}><strong style={{ color: 'var(--text-color)' }}>Chat 도메인:</strong></div>
                <div>• Users가 채팅방 참여, 메시지 전송</div>
                <div style={{ marginTop: '1rem', marginBottom: '0.5rem' }}><strong style={{ color: 'var(--text-color)' }}>기타:</strong></div>
                <div>• Users가 실종 신고 작성, 모임 주최/참여, 위치 서비스 리뷰 작성</div>
              </div>
            </div>
          </section>

          {/* 11. API 엔드포인트 */}
          <section id="api" style={{ marginBottom: '3rem', scrollMarginTop: '2rem' }}>
            <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>API 엔드포인트</h2>
            
            <div className="section-card" style={{
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
                <div>• POST /validate - 토큰 검증</div>
                <div>• POST /forgot-password - 비밀번호 찾기 (비밀번호 재설정 이메일 발송)</div>
              </div>
            </div>

            <div className="section-card" style={{
              padding: '1.5rem',
              backgroundColor: 'var(--card-bg)',
              borderRadius: '8px',
              border: '1px solid var(--nav-border)',
              marginBottom: '1rem'
            }}>
              <h3 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>소셜 로그인 (/oauth2)</h3>
              <div style={{
                color: 'var(--text-secondary)',
                lineHeight: '1.8',
                fontFamily: 'monospace',
                fontSize: '0.9rem'
              }}>
                <div>• GET /authorization/google - Google 소셜 로그인 시작</div>
                <div>• GET /authorization/naver - Naver 소셜 로그인 시작</div>
                <div>• GET /callback - 소셜 로그인 콜백 (토큰 포함 리다이렉트)</div>
              </div>
              <div style={{
                marginTop: '1rem',
                padding: '1rem',
                backgroundColor: 'var(--bg-color)',
                borderRadius: '6px',
                fontSize: '0.85rem',
                color: 'var(--text-secondary)'
              }}>
                <strong style={{ color: 'var(--text-color)' }}>소셜 로그인 플로우:</strong>
                <ol style={{ margin: '0.5rem 0 0 1.5rem', padding: 0 }}>
                  <li>사용자가 /oauth2/authorization/{'{provider}'} 접근</li>
                  <li>Spring Security가 소셜 제공자로 리다이렉트</li>
                  <li>사용자가 소셜 제공자에서 인증 완료</li>
                  <li>소셜 제공자가 /oauth2/callback으로 리다이렉트</li>
                  <li>JWT 토큰 발급 후 프론트엔드로 리다이렉트 (쿼리 파라미터로 토큰 전달)</li>
                  <li>닉네임이 없으면 needsNickname=true 파라미터와 함께 리다이렉트</li>
                </ol>
              </div>
            </div>

            <div className="section-card" style={{
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
                <div>• GET /me - 내 프로필 조회 (리뷰 포함)</div>
                <div>• PUT /me - 프로필 수정</div>
                <div>• PATCH /me/password - 비밀번호 변경</div>
                <div>• PATCH /me/username - 닉네임 변경</div>
                <div>• POST /me/nickname - 닉네임 설정 (소셜 로그인 사용자용)</div>
                <div>• GET /{'{userId}'}/profile - 다른 사용자 프로필 조회 (리뷰 포함)</div>
                <div>• GET /{'{userId}'}/reviews - 특정 사용자의 리뷰 목록 조회</div>
                <div>• GET /id/check - 아이디 중복 검사</div>
                <div>• GET /nickname/check - 닉네임 중복 검사</div>
              </div>
            </div>

            <div className="section-card" style={{
              padding: '1.5rem',
              backgroundColor: 'var(--card-bg)',
              borderRadius: '8px',
              border: '1px solid var(--nav-border)',
              marginBottom: '1rem'
            }}>
              <h3 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>이메일 인증 (/api/users/email/verify)</h3>
              <div style={{
                color: 'var(--text-secondary)',
                lineHeight: '1.8',
                fontFamily: 'monospace',
                fontSize: '0.9rem'
              }}>
                <div>• POST /verify - 이메일 인증 메일 발송</div>
                <div>• POST /pre-registration - 회원가입 전 이메일 인증 메일 발송</div>
                <div>• GET /pre-registration/check - 회원가입 전 이메일 인증 완료 여부 확인</div>
                <div>• GET /{'{token}'} - 이메일 인증 처리</div>
              </div>
            </div>

            <div className="section-card" style={{
              padding: '1.5rem',
              backgroundColor: 'var(--card-bg)',
              borderRadius: '8px',
              border: '1px solid var(--nav-border)',
              marginBottom: '1rem'
            }}>
              <h3 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>반려동물 (/api/users/pets)</h3>
              <div style={{
                color: 'var(--text-secondary)',
                lineHeight: '1.8',
                fontFamily: 'monospace',
                fontSize: '0.9rem'
              }}>
                <div>• GET / - 내 반려동물 목록</div>
                <div>• POST / - 반려동물 등록</div>
                <div>• PUT /{'{petIdx}'} - 반려동물 수정</div>
                <div>• DELETE /{'{petIdx}'} - 반려동물 삭제</div>
              </div>
            </div>

            <div className="section-card" style={{
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
                <div>• POST /{'{id}'}/warn - 경고 부여</div>
                <div>• POST /{'{id}'}/suspend - 이용제한 부여</div>
                <div>• POST /{'{id}'}/ban - 영구 차단</div>
              </div>
            </div>
          </section>

          {/* 15. 관련 문서 */}
          <section id="docs" style={{ marginBottom: '3rem', scrollMarginTop: '2rem' }}>
            <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>관련 문서</h2>
            <div className="section-card" style={{
              padding: '1rem',
              backgroundColor: 'var(--card-bg)',
              borderRadius: '8px',
              border: '1px solid var(--nav-border)'
            }}>
              <a
                href="https://github.com/makkong1/makkong1-github.io/blob/main/docs/troubleshooting/users/login-n-plus-one-issue.md"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: 'var(--link-color)',
                  textDecoration: 'none',
                  display: 'block',
                  marginBottom: '0.5rem'
                }}
              >
                → 로그인 N+1 문제 해결 상세 문서
              </a>
              <a
                href="https://github.com/makkong1/makkong1-github.io/blob/main/docs/domains/user.md"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: 'var(--link-color)',
                  textDecoration: 'none',
                  display: 'block'
                }}
              >
                → User 도메인 상세 문서
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
