import MermaidDiagram from '../../../../components/Common/MermaidDiagram';
import TableOfContents from '../../../../components/Common/TableOfContents';

function LocationDomain() {
  const sections = [
    { id: 'intro', title: '도메인 소개' },
    { id: 'problem', title: '가정한 문제 상황' },
    { id: 'test-design', title: '문제 재현 방식' },
    { id: 'before', title: '성능 측정 결과 (개선 전)' },
    { id: 'optimization', title: '성능 최적화 및 동시성 제어' },
    { id: 'after', title: '성능 개선 결과 (개선 후)' },
    { id: 'features', title: '주요 기능' },
    { id: 'ux-principles', title: 'UX 설계 원칙' },
    { id: 'entities', title: 'Entity 구조' },
    { id: 'services', title: 'Service 주요 기능' },
    { id: 'security', title: '보안 및 권한 체계' },
    { id: 'relationships', title: '다른 도메인과의 연관관계' },
    { id: 'api', title: 'API 엔드포인트' },
    { id: 'docs', title: '관련 문서' }
  ];
  const entityDiagram = `erDiagram
    LocationService ||--o{ LocationServiceReview : "has"
    Users ||--o{ LocationServiceReview : "writes"
    
    LocationService {
        Long idx PK
        String name
        String category1
        String category2
        String category3
        String sido
        String sigungu
        String eupmyeondong
        String roadName
        String address
        Double latitude
        Double longitude
        Double rating
        String closedDay
        String operatingHours
        Boolean parkingAvailable
        String priceInfo
        Boolean petFriendly
        Boolean isPetOnly
        String petSize
        String petRestrictions
        String petExtraFee
        Boolean indoor
        Boolean outdoor
        String description
        String dataSource
    }
    
    LocationServiceReview {
        Long idx PK
        Long service_idx FK
        Long user_idx FK
        Integer rating
        String comment
        LocalDateTime createdAt
        LocalDateTime updatedAt
    }`;

  return (
    <div className="domain-page-wrapper" style={{ padding: '2rem 0' }}>
      <div className="domain-page-container" style={{ display: 'flex', gap: '2rem', alignItems: 'flex-start' }}>
        <div className="domain-page-content" style={{ flex: 1 }}>
          <h1 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>위치 서비스 도메인</h1>
          
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
                Location 도메인은 위치 기반 서비스 (병원, 카페, 공원, 펫샵 등) 정보 제공 및 리뷰 관리 도메인입니다. 
                지역 계층적 탐색, 위치 기반 검색, 거리 계산, 네이버맵 API 연동을 통해 사용자에게 위치 기반 서비스를 제공합니다.
              </p>
              <p style={{ lineHeight: '1.8', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                <strong style={{ color: 'var(--text-color)' }}>실서비스 환경에서 초기 로드 성능이 중요한 도메인</strong>입니다.
              </p>
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
                  <li>• 초기 로드 데이터: <strong style={{ color: 'var(--text-color)' }}>22,699개 → 1,026개</strong> (95.5% 감소)</li>
                  <li>• 프론트엔드 처리 시간: <strong style={{ color: 'var(--text-color)' }}>1,484ms → 700ms</strong> (52.8% 개선, 2.1배 빠름)</li>
                  <li>• 네트워크 전송량: <strong style={{ color: 'var(--text-color)' }}>22 MB → 1 MB</strong> (95.5% 감소)</li>
                  <li>• 메모리 사용량: <strong style={{ color: 'var(--text-color)' }}>78.90 MB → 28.6 MB</strong> (63.8% 감소)</li>
                </ul>
              </div>
              <div style={{ marginTop: '1rem' }}>
                <p style={{ marginBottom: '0.5rem', fontWeight: 'bold', color: 'var(--text-color)' }}>주요 기능:</p>
                <ul style={{ marginLeft: '1.5rem', color: 'var(--text-secondary)', lineHeight: '1.8' }}>
                  <li>지역 계층적 탐색 (시도 → 시군구 → 읍면동 → 도로명)</li>
                  <li>위치 기반 반경 검색 (ST_Distance_Sphere 사용, 기본 5km)</li>
                  <li>카테고리별 서비스 검색</li>
                  <li>거리 계산 (Haversine 공식)</li>
                  <li>하이브리드 데이터 로딩 전략 (초기 로드 + 클라이언트 필터링)</li>
                  <li>위치 서비스 리뷰 시스템</li>
                  <li>공공데이터 CSV 배치 임포트</li>
                  <li>네이버맵 API 연동 (지오코딩, 역지오코딩, 길찾기)</li>
                </ul>
              </div>
            </div>
          </section>

          {/* 2. 가정한 문제 상황 */}
          <section id="problem" style={{ marginBottom: '3rem', scrollMarginTop: '2rem' }}>
            <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>가정한 문제 상황</h2>
            <div className="section-card" style={{
              padding: '1.5rem',
              backgroundColor: 'var(--card-bg)',
              borderRadius: '8px',
              border: '1px solid var(--nav-border)'
            }}>
              <p style={{ lineHeight: '1.8', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                Location 도메인에서 <strong style={{ color: 'var(--text-color)' }}>심각한 초기 로드 성능 문제</strong>가 발생했습니다.
              </p>
              <div style={{
                padding: '1rem',
                backgroundColor: 'var(--bg-color)',
                borderRadius: '6px',
                marginTop: '1rem'
              }}>
                <h3 style={{ marginBottom: '0.75rem', color: 'var(--text-color)', fontSize: '1rem' }}>1. 전체 데이터 조회 문제</h3>
                <div style={{
                  overflowX: 'auto',
                  marginBottom: '0.5rem'
                }}>
                  <table style={{
                    width: '100%',
                    borderCollapse: 'collapse',
                    color: 'var(--text-secondary)',
                    fontSize: '0.9rem'
                  }}>
                    <tbody>
                      <tr style={{ borderBottom: '1px solid var(--nav-border)' }}>
                        <td style={{ padding: '0.5rem', fontWeight: 'bold', color: 'var(--text-color)' }}>문제</td>
                        <td style={{ padding: '0.5rem' }}>초기 로드 시 모든 위치 서비스 데이터를 한 번에 조회 (약 22,699개)</td>
                      </tr>
                      <tr style={{ borderBottom: '1px solid var(--nav-border)' }}>
                        <td style={{ padding: '0.5rem', fontWeight: 'bold', color: 'var(--text-color)' }}>영향</td>
                        <td style={{ padding: '0.5rem' }}>불필요한 데이터까지 네트워크로 전송하여 대역폭 낭비, 실제 표시되는 데이터는 최대 100개인데 전체를 로드</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div style={{
                padding: '1rem',
                backgroundColor: 'var(--bg-color)',
                borderRadius: '6px',
                marginTop: '1rem'
              }}>
                <h3 style={{ marginBottom: '0.75rem', color: 'var(--text-color)', fontSize: '1rem' }}>2. 프론트엔드 필터링 오버헤드</h3>
                <div style={{
                  overflowX: 'auto',
                  marginBottom: '0.5rem'
                }}>
                  <table style={{
                    width: '100%',
                    borderCollapse: 'collapse',
                    color: 'var(--text-secondary)',
                    fontSize: '0.9rem'
                  }}>
                    <tbody>
                      <tr style={{ borderBottom: '1px solid var(--nav-border)' }}>
                        <td style={{ padding: '0.5rem', fontWeight: 'bold', color: 'var(--text-color)' }}>문제</td>
                        <td style={{ padding: '0.5rem' }}>전체 데이터를 프론트엔드로 전송 후 클라이언트 사이드에서 필터링</td>
                      </tr>
                      <tr>
                        <td style={{ padding: '0.5rem', fontWeight: 'bold', color: 'var(--text-color)' }}>영향</td>
                        <td style={{ padding: '0.5rem' }}>약 22,000개 레코드에 대해 거리 계산 수행, 프론트엔드 CPU 사용량 증가</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div style={{
                padding: '1rem',
                backgroundColor: 'var(--bg-color)',
                borderRadius: '6px',
                marginTop: '1rem'
              }}>
                <h3 style={{ marginBottom: '0.75rem', color: 'var(--text-color)', fontSize: '1rem' }}>3. 확장성 문제</h3>
                <div style={{
                  overflowX: 'auto',
                  marginBottom: '0.5rem'
                }}>
                  <table style={{
                    width: '100%',
                    borderCollapse: 'collapse',
                    color: 'var(--text-secondary)',
                    fontSize: '0.9rem'
                  }}>
                    <tbody>
                      <tr style={{ borderBottom: '1px solid var(--nav-border)' }}>
                        <td style={{ padding: '0.5rem', fontWeight: 'bold', color: 'var(--text-color)' }}>문제</td>
                        <td style={{ padding: '0.5rem' }}>데이터가 증가할수록 로딩 시간이 선형적으로 증가</td>
                      </tr>
                      <tr>
                        <td style={{ padding: '0.5rem', fontWeight: 'bold', color: 'var(--text-color)' }}>영향</td>
                        <td style={{ padding: '0.5rem' }}>모바일 환경에서 더 큰 성능 저하 예상, 사용자 경험 저하</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </section>

          {/* 3. 문제 재현 방식 (테스트 설계) */}
          <section id="test-design" style={{ marginBottom: '3rem', scrollMarginTop: '2rem' }}>
            <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>문제 재현 방식 (테스트 설계)</h2>
            <div className="section-card" style={{
              padding: '1.5rem',
              backgroundColor: 'var(--card-bg)',
              borderRadius: '8px',
              border: '1px solid var(--nav-border)'
            }}>
              <p style={{ lineHeight: '1.8', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                초기 로드 성능 문제를 재현하고 측정하기 위한 테스트를 설계했습니다.
              </p>
              <div style={{
                padding: '1rem',
                backgroundColor: 'var(--bg-color)',
                borderRadius: '6px',
                marginTop: '1rem'
              }}>
                <h3 style={{ marginBottom: '0.75rem', color: 'var(--text-color)', fontSize: '1rem' }}>테스트 환경</h3>
                <div style={{
                  padding: '0.75rem',
                  backgroundColor: 'var(--card-bg)',
                  borderRadius: '4px',
                  fontSize: '0.9rem',
                  fontFamily: 'monospace',
                  color: 'var(--text-secondary)',
                  lineHeight: '1.8'
                }}>
                  {`📝 테스트 데이터 구성
├── 전체 위치 서비스 데이터: 약 22,699개
│   ├── 카테고리: 다양한 카테고리 (병원, 카페, 공원, 펫샵 등)
│   └── 위치 정보: 전국 각지에 분산
│
└── 초기 로드 시나리오
    ├── 사용자 위치: 있음 / 없음
    ├── 조회 방식: 전체 조회 vs 위치 기반 검색
    └── 실제 표시: 주변 10km 이내 최대 100개`}
                </div>
              </div>
              <div style={{
                padding: '1rem',
                backgroundColor: 'var(--bg-color)',
                borderRadius: '6px',
                marginTop: '1rem'
              }}>
                <h3 style={{ marginBottom: '0.75rem', color: 'var(--text-color)', fontSize: '1rem' }}>측정 항목</h3>
                <ul style={{
                  listStyle: 'none',
                  padding: 0,
                  color: 'var(--text-secondary)',
                  lineHeight: '1.8',
                  fontSize: '0.9rem'
                }}>
                  <li>• <strong style={{ color: 'var(--text-color)' }}>조회 데이터 수</strong>: 실제 조회된 레코드 수</li>
                  <li>• <strong style={{ color: 'var(--text-color)' }}>백엔드 처리 시간</strong>: DB 쿼리 실행 시간, DTO 변환 시간</li>
                  <li>• <strong style={{ color: 'var(--text-color)' }}>네트워크 전송량</strong>: 브라우저 네트워크 탭에서 측정</li>
                  <li>• <strong style={{ color: 'var(--text-color)' }}>프론트엔드 처리 시간</strong>: API 호출 시간, 거리 계산 시간, 필터링 시간</li>
                  <li>• <strong style={{ color: 'var(--text-color)' }}>메모리 사용량</strong>: 프론트엔드 메모리 사용량</li>
                </ul>
              </div>
            </div>
          </section>

          {/* 4. 성능 측정 결과 (개선 전) */}
          <section id="before" style={{ marginBottom: '3rem', scrollMarginTop: '2rem' }}>
            <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>성능 측정 결과 (개선 전)</h2>
            <div className="section-card" style={{
              padding: '1.5rem',
              backgroundColor: 'var(--card-bg)',
              borderRadius: '8px',
              border: '1px solid var(--nav-border)'
            }}>
              <p style={{ lineHeight: '1.8', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                실제 테스트 결과, 전체 데이터 조회로 인해 심각한 성능 문제가 발생했습니다.
              </p>
              <div style={{
                overflowX: 'auto',
                marginBottom: '1rem'
              }}>
                <table style={{
                  width: '100%',
                  borderCollapse: 'collapse',
                  color: 'var(--text-secondary)',
                  fontSize: '0.9rem'
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
                      }}>측정 항목</th>
                      <th style={{
                        padding: '0.75rem',
                        textAlign: 'left',
                        color: 'var(--text-color)',
                        fontWeight: 'bold'
                      }}>최적화 전</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr style={{
                      borderBottom: '1px solid var(--nav-border)'
                    }}>
                      <td style={{ padding: '0.75rem' }}>조회 데이터 수</td>
                      <td style={{ padding: '0.75rem', fontWeight: 'bold', color: '#e74c3c' }}>22,699개</td>
                    </tr>
                    <tr style={{
                      borderBottom: '1px solid var(--nav-border)'
                    }}>
                      <td style={{ padding: '0.75rem' }}>백엔드 DB 쿼리 실행 시간</td>
                      <td style={{ padding: '0.75rem', fontWeight: 'bold', color: '#e74c3c' }}>841ms (전체의 57%, 가장 큰 병목)</td>
                    </tr>
                    <tr style={{
                      borderBottom: '1px solid var(--nav-border)'
                    }}>
                      <td style={{ padding: '0.75rem' }}>백엔드 DTO 변환 시간</td>
                      <td style={{ padding: '0.75rem', fontWeight: 'bold', color: '#e74c3c' }}>43ms (전체의 3%)</td>
                    </tr>
                    <tr style={{
                      borderBottom: '1px solid var(--nav-border)'
                    }}>
                      <td style={{ padding: '0.75rem' }}>백엔드 전체 처리 시간</td>
                      <td style={{ padding: '0.75rem', fontWeight: 'bold', color: '#e74c3c' }}>885ms</td>
                    </tr>
                    <tr style={{
                      borderBottom: '1px solid var(--nav-border)'
                    }}>
                      <td style={{ padding: '0.75rem' }}>네트워크 전송 시간</td>
                      <td style={{ padding: '0.75rem', fontWeight: 'bold', color: '#e74c3c' }}>약 591ms (전체의 40%, 두 번째 병목)</td>
                    </tr>
                    <tr style={{
                      borderBottom: '1px solid var(--nav-border)'
                    }}>
                      <td style={{ padding: '0.75rem' }}>네트워크 전송량</td>
                      <td style={{ padding: '0.75rem', fontWeight: 'bold', color: '#e74c3c' }}>약 22 MB</td>
                    </tr>
                    <tr style={{
                      borderBottom: '1px solid var(--nav-border)'
                    }}>
                      <td style={{ padding: '0.75rem' }}>프론트엔드 API 호출 시간</td>
                      <td style={{ padding: '0.75rem', fontWeight: 'bold', color: '#e74c3c' }}>1,476ms</td>
                    </tr>
                    <tr style={{
                      borderBottom: '1px solid var(--nav-border)'
                    }}>
                      <td style={{ padding: '0.75rem' }}>프론트엔드 거리 계산 시간</td>
                      <td style={{ padding: '0.75rem', fontWeight: 'bold', color: '#e74c3c' }}>6.3ms (22,699개 레코드 처리)</td>
                    </tr>
                    <tr style={{
                      borderBottom: '1px solid var(--nav-border)'
                    }}>
                      <td style={{ padding: '0.75rem' }}>프론트엔드 필터링 시간</td>
                      <td style={{ padding: '0.75rem', fontWeight: 'bold', color: '#e74c3c' }}>1.0ms</td>
                    </tr>
                    <tr style={{
                      borderBottom: '1px solid var(--nav-border)'
                    }}>
                      <td style={{ padding: '0.75rem' }}>프론트엔드 전체 처리 시간</td>
                      <td style={{ padding: '0.75rem', fontWeight: 'bold', color: '#e74c3c' }}>1,484ms</td>
                    </tr>
                    <tr style={{
                      borderBottom: '1px solid var(--nav-border)'
                    }}>
                      <td style={{ padding: '0.75rem' }}>메모리 사용량 (프론트엔드)</td>
                      <td style={{ padding: '0.75rem', fontWeight: 'bold', color: '#e74c3c' }}>78.90 MB</td>
                    </tr>
                    <tr>
                      <td style={{ padding: '0.75rem' }}>실제 표시되는 데이터 수</td>
                      <td style={{ padding: '0.75rem', fontWeight: 'bold', color: '#e74c3c' }}>최대 100개 (주변 10km 이내만 표시)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div style={{
                padding: '1rem',
                backgroundColor: 'var(--bg-color)',
                borderRadius: '6px',
                marginTop: '1rem'
              }}>
                <h3 style={{ marginBottom: '0.75rem', color: 'var(--text-color)', fontSize: '1rem' }}>시간 분해 분석</h3>
                <ul style={{
                  listStyle: 'none',
                  padding: 0,
                  color: 'var(--text-secondary)',
                  lineHeight: '1.8',
                  fontSize: '0.9rem',
                  marginBottom: '1rem'
                }}>
                  <li>• <strong style={{ color: 'var(--text-color)' }}>백엔드: 885ms (60%)</strong></li>
                  <li style={{ marginLeft: '1rem' }}>  - DB 쿼리: 841ms (57%) ⚠️ <strong>가장 큰 병목</strong></li>
                  <li style={{ marginLeft: '1rem' }}>  - DTO 변환: 43ms (3%)</li>
                  <li>• <strong style={{ color: 'var(--text-color)' }}>네트워크 전송: 591ms (40%)</strong> ⚠️ <strong>두 번째 병목</strong> (22MB 전송)</li>
                  <li>• <strong style={{ color: 'var(--text-color)' }}>프론트엔드 처리: 7.3ms (0.5%)</strong> ✅ 매우 빠름</li>
                  <li style={{ marginLeft: '1rem' }}>  - 거리 계산: 6.3ms</li>
                  <li style={{ marginLeft: '1rem' }}>  - 필터링: 1.0ms</li>
                </ul>
                <p style={{ lineHeight: '1.8', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                  <strong style={{ color: 'var(--text-color)' }}>핵심 문제:</strong> DB 쿼리와 네트워크 전송이 병목입니다. 실제 필요한 데이터는 1,000개 정도인데 22,699개를 모두 조회하여 네트워크 대역폭과 메모리를 낭비하고 있습니다.
                </p>
              </div>
            </div>
          </section>

          {/* 5. 성능 최적화 및 동시성 제어 */}
          <section id="optimization" style={{ marginBottom: '3rem', scrollMarginTop: '2rem' }}>
            <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>성능 최적화 및 동시성 제어</h2>
            <div className="section-card" style={{
              padding: '1.5rem',
              backgroundColor: 'var(--card-bg)',
              borderRadius: '8px',
              border: '1px solid var(--nav-border)',
              marginBottom: '1rem'
            }}>
              <h3 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>1. 위치 기반 초기 로드 적용</h3>
              <p style={{ lineHeight: '1.8', color: 'var(--text-secondary)', marginBottom: '0.75rem' }}>
                사용자 위치를 기반으로 주변 서비스만 조회하여 불필요한 데이터 전송을 방지했습니다.
              </p>
              <p style={{ lineHeight: '1.8', color: 'var(--text-secondary)', marginBottom: '0.75rem', fontSize: '0.9rem' }}>
                <strong style={{ color: 'var(--text-color)' }}>해결 방법:</strong>
              </p>
              <ul style={{
                listStyle: 'none',
                padding: 0,
                color: 'var(--text-secondary)',
                lineHeight: '1.8',
                fontSize: '0.9rem',
                marginBottom: '0.75rem'
              }}>
                <li>• 사용자 위치가 있으면 주변 10km 반경 내 서비스만 조회</li>
                <li>• 백엔드에서 위치 기반 필터링 수행 (MySQL <code style={{ backgroundColor: 'var(--bg-color)', padding: '0.2rem 0.4rem', borderRadius: '4px' }}>ST_Distance_Sphere</code> 사용)</li>
                <li>• 프론트엔드에서 거리 계산 불필요 (백엔드에서 처리)</li>
              </ul>
              <p style={{ lineHeight: '1.8', color: 'var(--text-secondary)', marginBottom: '0.75rem', fontSize: '0.9rem' }}>
                <strong style={{ color: 'var(--text-color)' }}>Repository Layer:</strong>
              </p>
              <pre style={{
                padding: '0.75rem',
                backgroundColor: 'var(--bg-color)',
                borderRadius: '4px',
                overflow: 'auto',
                fontSize: '0.85rem',
                color: 'var(--text-secondary)',
                fontFamily: 'monospace',
                lineHeight: '1.6',
                margin: '0.5rem 0'
              }}>
{`// LocationServiceRepository.java
@Query(value = "SELECT * FROM locationservice WHERE " +
        "latitude IS NOT NULL AND longitude IS NOT NULL AND " +
        "ST_Distance_Sphere(POINT(longitude, latitude), POINT(?2, ?1)) <= ?3 " +
        "ORDER BY rating DESC", nativeQuery = true)
List<LocationService> findByRadius(
    @Param("latitude") Double latitude,
    @Param("longitude") Double longitude,
    @Param("radiusInMeters") Double radiusInMeters);`}
              </pre>
              <p style={{ lineHeight: '1.8', color: 'var(--text-secondary)', marginBottom: '0.75rem', fontSize: '0.9rem' }}>
                <strong style={{ color: 'var(--text-color)' }}>구현 요약:</strong>
              </p>
              <ul style={{
                listStyle: 'none',
                padding: 0,
                color: 'var(--text-secondary)',
                lineHeight: '1.8',
                fontSize: '0.9rem',
                marginBottom: '0.75rem'
              }}>
                <li>• Service Layer: 위치 정보가 있으면 <code style={{ backgroundColor: 'var(--bg-color)', padding: '0.2rem 0.4rem', borderRadius: '4px' }}>findByRadius()</code> 호출, 없으면 전체 조회</li>
                <li>• 프론트엔드: 초기 로드 시 사용자 위치 기반 10km 반경 검색 요청</li>
              </ul>
              <div style={{
                padding: '0.75rem',
                backgroundColor: 'var(--bg-color)',
                borderRadius: '4px',
                marginTop: '0.75rem'
              }}>
                <p style={{ lineHeight: '1.8', color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '0.5rem' }}>
                  <strong style={{ color: 'var(--text-color)' }}>성능 개선 효과:</strong>
                </p>
                <ul style={{
                  listStyle: 'none',
                  padding: 0,
                  color: 'var(--text-secondary)',
                  lineHeight: '1.8',
                  fontSize: '0.9rem'
                }}>
                  <li>• 조회 데이터 수: 22,699개 → <strong style={{ color: 'var(--text-color)' }}>1,026개</strong> (95.5% 감소)</li>
                  <li>• 네트워크 전송량: 22 MB → <strong style={{ color: 'var(--text-color)' }}>1 MB</strong> (95.5% 감소)</li>
                  <li>• 메모리 사용량: 78.90 MB → <strong style={{ color: 'var(--text-color)' }}>28.6 MB</strong> (63.8% 감소)</li>
                  <li>• 프론트엔드 처리 시간: 1,484ms → <strong style={{ color: 'var(--text-color)' }}>700ms</strong> (52.8% 개선)</li>
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
              <h3 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>2. 시군구 기반 검색 전략 적용</h3>
              <p style={{ lineHeight: '1.8', color: 'var(--text-secondary)', marginBottom: '0.75rem' }}>
                위치 기반 검색(ST_Distance_Sphere)의 한계를 발견하고 시군구 기반 검색으로 전환했습니다.
              </p>
              <p style={{ lineHeight: '1.8', color: 'var(--text-secondary)', marginBottom: '0.75rem', fontSize: '0.9rem' }}>
                <strong style={{ color: 'var(--text-color)' }}>문제점:</strong>
              </p>
              <ul style={{
                listStyle: 'none',
                padding: 0,
                color: 'var(--text-secondary)',
                lineHeight: '1.8',
                fontSize: '0.9rem',
                marginBottom: '0.75rem'
              }}>
                <li>• 지도 이동 시 검색 기준점이 바뀌어 이전에 본 서비스가 사라지는 일관성 문제</li>
                <li>• ST_Distance_Sphere 쿼리 성능 저하 (198-368ms 쿼리 시간)</li>
              </ul>
              <p style={{ lineHeight: '1.8', color: 'var(--text-secondary)', marginBottom: '0.75rem', fontSize: '0.9rem' }}>
                <strong style={{ color: 'var(--text-color)' }}>해결 방법:</strong>
              </p>
              <ul style={{
                listStyle: 'none',
                padding: 0,
                color: 'var(--text-secondary)',
                lineHeight: '1.8',
                fontSize: '0.9rem',
                marginBottom: '0.75rem'
              }}>
                <li>• 지도 중심 좌표를 역지오코딩하여 시도/시군구 추출</li>
                <li>• <code style={{ backgroundColor: 'var(--bg-color)', padding: '0.2rem 0.4rem', borderRadius: '4px' }}>WHERE sido=? AND sigungu=?</code> 조건으로 조회 (인덱스 활용)</li>
                <li>• 읍면동은 프론트엔드에서 클라이언트 사이드 필터링만 수행</li>
              </ul>
              <div style={{
                padding: '0.75rem',
                backgroundColor: 'var(--bg-color)',
                borderRadius: '4px',
                marginTop: '0.75rem',
                marginBottom: '0.75rem'
              }}>
                <p style={{ lineHeight: '1.8', color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '0.5rem' }}>
                  <strong style={{ color: 'var(--text-color)' }}>성능 개선 효과:</strong>
                </p>
                <ul style={{
                  listStyle: 'none',
                  padding: 0,
                  color: 'var(--text-secondary)',
                  lineHeight: '1.8',
                  fontSize: '0.9rem'
                }}>
                  <li>• DB 쿼리 시간: 198-368ms → <strong style={{ color: 'var(--text-color)' }}>36-53ms</strong> (약 5-6배 빠름)</li>
                  <li>• 전체 처리 시간: 202-408ms → <strong style={{ color: 'var(--text-color)' }}>45-66ms</strong> (약 5-6배 빠름)</li>
                  <li>• 검색 결과 일관성 확보 (시군구 단위로 확정되어 지도 이동 시에도 마커 유지)</li>
                  <li>• 구현 단순화 (복잡한 ST_Distance_Sphere 쿼리 제거, 단순 WHERE 조건 사용)</li>
                </ul>
              </div>
              <div style={{
                padding: '0.75rem',
                backgroundColor: 'var(--card-bg)',
                borderRadius: '4px',
                border: '1px solid var(--nav-border)',
                fontSize: '0.9rem'
              }}>
                <p style={{ lineHeight: '1.8', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>
                  <strong style={{ color: 'var(--text-color)' }}>관련 문서:</strong>
                </p>
                <a 
                  href="https://github.com/makkong1/makkong1-github.io/blob/main/docs/troubleshooting/location/search-strategy-comparison.md" 
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ 
                    color: 'var(--link-color)',
                    textDecoration: 'none'
                  }}
                >
                  → 검색 전략 개선 상세 분석 문서 보기
                </a>
              </div>
            </div>
          </section>

          {/* 6. 성능 개선 결과 (개선 후) */}
          <section id="after" style={{ marginBottom: '3rem', scrollMarginTop: '2rem' }}>
            <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>성능 개선 결과</h2>
            <div className="section-card" style={{
              padding: '1.5rem',
              backgroundColor: 'var(--card-bg)',
              borderRadius: '8px',
              border: '1px solid var(--nav-border)',
              marginBottom: '1.5rem'
            }}>
              <h3 style={{ marginBottom: '1rem', color: 'var(--text-color)', fontSize: '1.25rem' }}>1단계: 위치 기반 초기 로드 적용</h3>
              <p style={{ lineHeight: '1.8', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                전체 데이터 조회에서 위치 기반 검색으로 전환하여 초기 로드 성능을 대폭 개선했습니다.
              </p>
              <div style={{
                overflowX: 'auto',
                marginBottom: '1rem'
              }}>
                <table style={{
                  width: '100%',
                  borderCollapse: 'collapse',
                  color: 'var(--text-secondary)',
                  fontSize: '0.9rem'
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
                      <td style={{ padding: '0.75rem' }}>조회 데이터 수</td>
                      <td style={{ padding: '0.75rem', fontWeight: 'bold', color: '#e74c3c' }}>22,699개</td>
                      <td style={{ padding: '0.75rem', fontWeight: 'bold', color: '#27ae60' }}>1,026개</td>
                      <td style={{ padding: '0.75rem', fontWeight: 'bold', color: 'var(--link-color)' }}>95.5% 감소</td>
                    </tr>
                    <tr style={{
                      borderBottom: '1px solid var(--nav-border)'
                    }}>
                      <td style={{ padding: '0.75rem' }}>백엔드 DB 쿼리 실행 시간</td>
                      <td style={{ padding: '0.75rem', fontWeight: 'bold', color: '#e74c3c' }}>841ms</td>
                      <td style={{ padding: '0.75rem', fontWeight: 'bold', color: '#27ae60' }}>약 500ms</td>
                      <td style={{ padding: '0.75rem', fontWeight: 'bold', color: 'var(--link-color)' }}>40.4% 개선</td>
                    </tr>
                    <tr style={{
                      borderBottom: '1px solid var(--nav-border)'
                    }}>
                      <td style={{ padding: '0.75rem' }}>백엔드 전체 처리 시간</td>
                      <td style={{ padding: '0.75rem', fontWeight: 'bold', color: '#e74c3c' }}>885ms</td>
                      <td style={{ padding: '0.75rem', fontWeight: 'bold', color: '#27ae60' }}>약 530ms</td>
                      <td style={{ padding: '0.75rem', fontWeight: 'bold', color: 'var(--link-color)' }}>40.1% 개선</td>
                    </tr>
                    <tr style={{
                      borderBottom: '1px solid var(--nav-border)'
                    }}>
                      <td style={{ padding: '0.75rem' }}>프론트엔드 API 호출 시간</td>
                      <td style={{ padding: '0.75rem', fontWeight: 'bold', color: '#e74c3c' }}>1,476ms</td>
                      <td style={{ padding: '0.75rem', fontWeight: 'bold', color: '#27ae60' }}>약 700ms</td>
                      <td style={{ padding: '0.75rem', fontWeight: 'bold', color: 'var(--link-color)' }}>52.6% 개선</td>
                    </tr>
                    <tr style={{
                      borderBottom: '1px solid var(--nav-border)'
                    }}>
                      <td style={{ padding: '0.75rem' }}>프론트엔드 전체 처리 시간</td>
                      <td style={{ padding: '0.75rem', fontWeight: 'bold', color: '#e74c3c' }}>1,484ms</td>
                      <td style={{ padding: '0.75rem', fontWeight: 'bold', color: '#27ae60' }}>약 700ms</td>
                      <td style={{ padding: '0.75rem', fontWeight: 'bold', color: 'var(--link-color)' }}>52.8% 개선 (2.1배 빠름)</td>
                    </tr>
                    <tr style={{
                      borderBottom: '1px solid var(--nav-border)'
                    }}>
                      <td style={{ padding: '0.75rem' }}>네트워크 전송량</td>
                      <td style={{ padding: '0.75rem', fontWeight: 'bold', color: '#e74c3c' }}>22 MB</td>
                      <td style={{ padding: '0.75rem', fontWeight: 'bold', color: '#27ae60' }}>약 1 MB</td>
                      <td style={{ padding: '0.75rem', fontWeight: 'bold', color: 'var(--link-color)' }}>95.5% 감소</td>
                    </tr>
                    <tr>
                      <td style={{ padding: '0.75rem' }}>메모리 사용량 (프론트엔드)</td>
                      <td style={{ padding: '0.75rem', fontWeight: 'bold', color: '#e74c3c' }}>78.90 MB</td>
                      <td style={{ padding: '0.75rem', fontWeight: 'bold', color: '#27ae60' }}>약 28.6 MB</td>
                      <td style={{ padding: '0.75rem', fontWeight: 'bold', color: 'var(--link-color)' }}>63.8% 감소</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div style={{
                padding: '1rem',
                backgroundColor: 'var(--bg-color)',
                borderRadius: '6px',
                marginTop: '1rem'
              }}>
                <h3 style={{ marginBottom: '0.75rem', color: 'var(--text-color)', fontSize: '1rem' }}>시간 분해 분석 (개선 후)</h3>
                <ul style={{
                  listStyle: 'none',
                  padding: 0,
                  color: 'var(--text-secondary)',
                  lineHeight: '1.8',
                  fontSize: '0.9rem',
                  marginBottom: '1rem'
                }}>
                  <li>• <strong style={{ color: 'var(--text-color)' }}>백엔드: 530ms (76%)</strong></li>
                  <li style={{ marginLeft: '1rem' }}>  - DB 쿼리: 500ms (71%) ⚠️ 여전히 가장 큰 병목이지만 데이터 양 감소로 개선</li>
                  <li style={{ marginLeft: '1rem' }}>  - DTO 변환: 20ms (3%)</li>
                  <li>• <strong style={{ color: 'var(--text-color)' }}>네트워크 전송: 170ms (24%)</strong> ✅ <strong>대폭 개선</strong> (1MB 전송, 22MB → 1MB)</li>
                  <li>• <strong style={{ color: 'var(--text-color)' }}>프론트엔드 처리: 0.3ms (0.04%)</strong> ✅ 매우 빠름</li>
                  <li style={{ marginLeft: '1rem' }}>  - 필터링: 0.3ms (거리 계산 불필요, 백엔드에서 처리)</li>
                </ul>
              </div>
              <div style={{
                padding: '1rem',
                backgroundColor: 'var(--bg-color)',
                borderRadius: '6px',
                marginTop: '1rem'
              }}>
                <h3 style={{ marginBottom: '0.75rem', color: 'var(--text-color)', fontSize: '1rem' }}>결과 분석</h3>
                <ul style={{
                  listStyle: 'none',
                  padding: 0,
                  color: 'var(--text-secondary)',
                  lineHeight: '1.8',
                  fontSize: '0.9rem'
                }}>
                  <li>• ✅ <strong style={{ color: 'var(--text-color)' }}>초기 로딩 시간 2.1배 빠름</strong>: 1.5초 → 0.7초</li>
                  <li>• ✅ <strong style={{ color: 'var(--text-color)' }}>네트워크 대역폭 95.5% 절약</strong>: 22 MB → 1 MB</li>
                  <li>• ✅ <strong style={{ color: 'var(--text-color)' }}>메모리 사용량 63.8% 감소</strong>: 78.90 MB → 28.6 MB</li>
                  <li>• ✅ <strong style={{ color: 'var(--text-color)' }}>사용자 경험 대폭 개선</strong>: 불필요한 데이터 전송 제거</li>
                  <li>• ✅ <strong style={{ color: 'var(--text-color)' }}>확장성 확보</strong>: 데이터 증가 시에도 위치 기반 검색으로 성능 유지 가능</li>
                </ul>
              </div>
              <div style={{
                padding: '1rem',
                backgroundColor: 'var(--bg-color)',
                borderRadius: '6px',
                marginTop: '1rem',
                border: '1px solid var(--nav-border)'
              }}>
                <h3 style={{ marginBottom: '0.75rem', color: 'var(--text-color)', fontSize: '1rem' }}>📌 측정 정보</h3>
                <p style={{ lineHeight: '1.8', color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '0.5rem' }}>
                  <strong style={{ color: 'var(--text-color)' }}>측정 일시:</strong> 2025-12-21 (3회 측정 평균)
                </p>
                <p style={{ lineHeight: '1.8', color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '0.5rem' }}>
                  <strong style={{ color: 'var(--text-color)' }}>측정 조건:</strong> 사용자 위치 기반 10km 반경 검색
                </p>
              </div>
            </div>

            <div className="section-card" style={{
              padding: '1.5rem',
              backgroundColor: 'var(--card-bg)',
              borderRadius: '8px',
              border: '1px solid var(--nav-border)'
            }}>
              <h3 style={{ marginBottom: '1rem', color: 'var(--text-color)', fontSize: '1.25rem' }}>2단계: 시군구 기반 검색 전략 적용</h3>
              <p style={{ lineHeight: '1.8', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                위치 기반 검색의 한계를 해결하기 위해 시군구 기반 검색으로 전환하여 쿼리 성능과 일관성을 더욱 개선했습니다.
              </p>
              <div style={{
                overflowX: 'auto',
                marginBottom: '1rem'
              }}>
                <table style={{
                  width: '100%',
                  borderCollapse: 'collapse',
                  color: 'var(--text-secondary)',
                  fontSize: '0.9rem'
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
                      }}>위치 기반</th>
                      <th style={{
                        padding: '0.75rem',
                        textAlign: 'left',
                        color: 'var(--text-color)',
                        fontWeight: 'bold'
                      }}>시군구 기반</th>
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
                      <td style={{ padding: '0.75rem' }}>DB 쿼리 실행 시간</td>
                      <td style={{ padding: '0.75rem', fontWeight: 'bold', color: '#e74c3c' }}>198-368ms</td>
                      <td style={{ padding: '0.75rem', fontWeight: 'bold', color: '#27ae60' }}>36-53ms</td>
                      <td style={{ padding: '0.75rem', fontWeight: 'bold', color: 'var(--link-color)' }}>약 5-6배 빠름</td>
                    </tr>
                    <tr style={{
                      borderBottom: '1px solid var(--nav-border)'
                    }}>
                      <td style={{ padding: '0.75rem' }}>전체 처리 시간</td>
                      <td style={{ padding: '0.75rem', fontWeight: 'bold', color: '#e74c3c' }}>202-408ms</td>
                      <td style={{ padding: '0.75rem', fontWeight: 'bold', color: '#27ae60' }}>45-66ms</td>
                      <td style={{ padding: '0.75rem', fontWeight: 'bold', color: 'var(--link-color)' }}>약 5-6배 빠름</td>
                    </tr>
                    <tr style={{
                      borderBottom: '1px solid var(--nav-border)'
                    }}>
                      <td style={{ padding: '0.75rem' }}>조회 레코드 수</td>
                      <td style={{ padding: '0.75rem', fontWeight: 'bold', color: '#e74c3c' }}>약 295개 (반경 내)</td>
                      <td style={{ padding: '0.75rem', fontWeight: 'bold', color: '#27ae60' }}>142-170개 (시군구 단위)</td>
                      <td style={{ padding: '0.75rem', fontWeight: 'bold', color: 'var(--link-color)' }}>적절한 데이터 양</td>
                    </tr>
                    <tr>
                      <td style={{ padding: '0.75rem' }}>검색 기준점 일관성</td>
                      <td style={{ padding: '0.75rem', fontWeight: 'bold', color: '#e74c3c' }}>지도 이동 시 변경 (일관성 문제)</td>
                      <td style={{ padding: '0.75rem', fontWeight: 'bold', color: '#27ae60' }}>시군구로 확정 (일관성 확보)</td>
                      <td style={{ padding: '0.75rem', fontWeight: 'bold', color: 'var(--link-color)' }}>✅ 해결</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div style={{
                padding: '1rem',
                backgroundColor: 'var(--bg-color)',
                borderRadius: '6px',
                marginTop: '1rem'
              }}>
                <h3 style={{ marginBottom: '0.75rem', color: 'var(--text-color)', fontSize: '1rem' }}>2단계 개선 효과</h3>
                <ul style={{
                  listStyle: 'none',
                  padding: 0,
                  color: 'var(--text-secondary)',
                  lineHeight: '1.8',
                  fontSize: '0.9rem'
                }}>
                  <li>• ✅ <strong style={{ color: 'var(--text-color)' }}>쿼리 성능 약 5-6배 향상</strong>: 198-368ms → 36-53ms</li>
                  <li>• ✅ <strong style={{ color: 'var(--text-color)' }}>검색 결과 일관성 확보</strong>: 지도 이동 시에도 마커 유지</li>
                  <li>• ✅ <strong style={{ color: 'var(--text-color)' }}>구현 단순화</strong>: 복잡한 ST_Distance_Sphere 쿼리 제거, 단순 WHERE 조건 사용</li>
                  <li>• ✅ <strong style={{ color: 'var(--text-color)' }}>인덱스 활용</strong>: 시도/시군구 인덱스로 빠른 조회</li>
                </ul>
              </div>
              <div style={{
                padding: '1rem',
                backgroundColor: 'var(--bg-color)',
                borderRadius: '6px',
                marginTop: '1rem',
                border: '1px solid var(--nav-border)'
              }}>
                <h3 style={{ marginBottom: '0.75rem', color: 'var(--text-color)', fontSize: '1rem' }}>📌 측정 정보</h3>
                <p style={{ lineHeight: '1.8', color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '0.5rem' }}>
                  <strong style={{ color: 'var(--text-color)' }}>측정 일시:</strong> 2025-12-26
                </p>
                <p style={{ lineHeight: '1.8', color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '0.5rem' }}>
                  <strong style={{ color: 'var(--text-color)' }}>측정 조건:</strong> 시군구 단위 검색 (WHERE sido=? AND sigungu=?)
                </p>
              </div>
            </div>
          </section>

          {/* 7. 주요 기능 */}
          <section id="features" style={{ marginBottom: '3rem', scrollMarginTop: '2rem' }}>
            <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>주요 기능</h2>
            
            <div className="section-card" style={{
              padding: '1.5rem',
              backgroundColor: 'var(--card-bg)',
              borderRadius: '8px',
              border: '1px solid var(--nav-border)',
              marginBottom: '1.5rem'
            }}>
              <h3 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>지역 계층적 탐색</h3>
              <div style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}>
                <p style={{ marginBottom: '0.5rem' }}>지역을 계층적으로 선택하여 서비스를 검색합니다.</p>
                <p style={{ marginBottom: '0.5rem' }}><strong style={{ color: 'var(--text-color)' }}>탐색 프로세스:</strong></p>
                <ol style={{ marginLeft: '1.5rem', marginBottom: '0.5rem' }}>
                  <li>시도 선택 (전국 17개 시도)</li>
                  <li>시군구 선택 (선택된 시도의 시군구)</li>
                  <li>해당 지역의 서비스 목록 표시</li>
                </ol>
                <p style={{ marginBottom: '0.5rem' }}><strong style={{ color: 'var(--text-color)' }}>우선순위:</strong></p>
                <p style={{ fontFamily: 'monospace', fontSize: '0.9rem', marginLeft: '1.5rem' }}>
                  roadName &gt; eupmyeondong &gt; sigungu &gt; sido &gt; 전체
                </p>
              </div>
            </div>

            <div className="section-card" style={{
              padding: '1.5rem',
              backgroundColor: 'var(--card-bg)',
              borderRadius: '8px',
              border: '1px solid var(--nav-border)',
              marginBottom: '1.5rem'
            }}>
              <h3 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>위치 기반 반경 검색 (초기 로드용)</h3>
              <div style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}>
                <p style={{ marginBottom: '0.5rem' }}>사용자 위치를 기반으로 반경 내 서비스를 검색합니다.</p>
                <p style={{ marginBottom: '0.5rem' }}><strong style={{ color: 'var(--text-color)' }}>검색 프로세스:</strong></p>
                <ol style={{ marginLeft: '1.5rem', marginBottom: '0.5rem' }}>
                  <li>사용자 위치 확인 (GPS 또는 수동 입력)</li>
                  <li>반경 설정 (기본값: 5km)</li>
                  <li>ST_Distance_Sphere를 사용한 반경 내 서비스 조회</li>
                  <li>거리순 정렬 (선택적)</li>
                  <li>카테고리 필터링 (선택적)</li>
                </ol>
                <p style={{ marginBottom: '0.5rem' }}><strong style={{ color: 'var(--text-color)' }}>특징 (제한적 사용):</strong></p>
                <ul style={{ marginLeft: '1.5rem', marginBottom: '0.5rem' }}>
                  <li><strong>사용 시점</strong>: 앱 초기 진입 시 사용자 주변 정보 제공 목적으로만 사용</li>
                  <li><strong>DB 쿼리</strong>: MySQL의 <code>ST_Distance_Sphere</code> 함수 사용 (정확한 지구 곡률 반영)</li>
                  <li><strong>POINT 형식</strong>: <code>POINT(경도, 위도)</code> 순서 사용</li>
                  <li><strong>반경 단위</strong>: 미터 (m)</li>
                  <li><strong>한계</strong>: 지도 이동 시 검색 기준점이 계속 바뀌어 "아까 본 장소"가 사라지는 일관성 문제 발생</li>
                  <li><strong>대안</strong>: 지도 탐색 시에는 <strong>시도/시군구 기반 검색</strong>을 주 전략으로 사용</li>
                </ul>
              </div>
            </div>

            <div className="section-card" style={{
              padding: '1.5rem',
              backgroundColor: 'var(--card-bg)',
              borderRadius: '8px',
              border: '1px solid var(--nav-border)',
              marginBottom: '1.5rem'
            }}>
              <h3 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>하이브리드 데이터 로딩 전략 (개선됨)</h3>
              <div style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}>
                <p style={{ marginBottom: '0.5rem' }}><strong style={{ color: 'var(--text-color)' }}>전략 핵심:</strong></p>
                <p style={{ 
                  marginBottom: '0.75rem', 
                  padding: '0.75rem',
                  backgroundColor: 'var(--bg-color)',
                  borderRadius: '4px',
                  fontStyle: 'italic',
                  border: '1px solid var(--nav-border)'
                }}>"검색은 시군구 단위로"</p>
                <p style={{ marginBottom: '0.5rem' }}><strong style={{ color: 'var(--text-color)' }}>로딩 프로세스:</strong></p>
                <ol style={{ marginLeft: '1.5rem', marginBottom: '0.5rem' }}>
                  <li><strong>초기 진입</strong>: 사용자 위치 기반 5km 반경 검색 (빠른 초기 컨텍스트 제공)</li>
                  <li><strong>지도 이동/검색</strong>: 지도 중심 좌표를 역지오코딩하여 <strong>시도/시군구</strong> 추출 후 해당 지역 전체 데이터 로드</li>
                  <li><strong>읍면동 필터링</strong>: 로드된 데이터 내에서 <strong>클라이언트 사이드 필터링</strong> 수행</li>
                </ol>
                <p style={{ marginBottom: '0.5rem' }}><strong style={{ color: 'var(--text-color)' }}>장점:</strong></p>
                <ul style={{ marginLeft: '1.5rem', marginBottom: '0.5rem' }}>
                  <li><strong>데이터 일관성</strong>: 시군구 단위로 데이터를 가져오므로 지도 이동 시에도 마커가 유지됨</li>
                  <li><strong>성능 최적화</strong>: 인덱스가 잘 타는 <code>WHERE sido=? AND sigungu=?</code> 쿼리 사용으로 DB 부하 감소</li>
                </ul>
              </div>
            </div>

            <div className="section-card" style={{
              padding: '1.5rem',
              backgroundColor: 'var(--card-bg)',
              borderRadius: '8px',
              border: '1px solid var(--nav-border)',
              marginBottom: '1.5rem'
            }}>
              <h3 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>거리 계산 및 길찾기</h3>
              <div style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}>
                <p style={{ marginBottom: '0.5rem' }}>내 위치에서 각 서비스까지의 거리를 계산하고 네이버맵 길찾기로 연결합니다.</p>
                <p style={{ marginBottom: '0.5rem' }}><strong style={{ color: 'var(--text-color)' }}>거리 계산 프로세스:</strong></p>
                <ol style={{ marginLeft: '1.5rem', marginBottom: '0.5rem' }}>
                  <li>내 위치 확인 (GPS 또는 수동 입력)</li>
                  <li>각 서비스까지의 거리 계산 (Haversine 공식, 미터 단위)</li>
                  <li>거리 표시</li>
                  <li>길찾기 버튼 클릭 → 네이버맵 길찾기 연동</li>
                </ol>
                <p style={{ marginBottom: '0.5rem' }}><strong style={{ color: 'var(--text-color)' }}>네이버맵 API 연동:</strong></p>
                <ul style={{ marginLeft: '1.5rem', marginBottom: '0.5rem' }}>
                  <li>주소-좌표 변환 (Geocoding)</li>
                  <li>좌표-주소 변환 (역지오코딩)</li>
                  <li>길찾기 (Directions API)</li>
                </ul>
              </div>
            </div>

            <div className="section-card"   style={{
              padding: '1.5rem',
              backgroundColor: 'var(--card-bg)',
              borderRadius: '8px',
              border: '1px solid var(--nav-border)',
              marginBottom: '1.5rem'
            }}>
              <h3 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>카테고리별 검색</h3>
              <div style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}>
                <p style={{ marginBottom: '0.5rem' }}>카테고리 계층 구조를 활용한 유연한 검색 기능입니다.</p>
                <p style={{ marginBottom: '0.5rem' }}><strong style={{ color: 'var(--text-color)' }}>카테고리 필터링:</strong></p>
                <ul style={{ marginLeft: '1.5rem', marginBottom: '0.5rem' }}>
                  <li>category3 → category2 → category1 순서로 검색</li>
                  <li>대소문자 무시</li>
                  <li>최대 결과 수 제한 지원 (<code>maxResults</code> 파라미터)</li>
                </ul>
              </div>
            </div>

            <div className="section-card" style={{
              padding: '1.5rem',
              backgroundColor: 'var(--card-bg)',
              borderRadius: '8px',
              border: '1px solid var(--nav-border)'
            }}>
              <h3 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>위치 서비스 리뷰 시스템</h3>
              <div style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}>
                <p style={{ marginBottom: '0.5rem' }}>사용자가 위치 서비스에 대한 리뷰를 작성하고 평점을 관리할 수 있습니다.</p>
                <p style={{ marginBottom: '0.5rem' }}><strong style={{ color: 'var(--text-color)' }}>리뷰 작성 프로세스:</strong></p>
                <ol style={{ marginLeft: '1.5rem', marginBottom: '0.5rem' }}>
                  <li>위치 서비스 선택</li>
                  <li>리뷰 작성 (평점 1-5, 내용)</li>
                  <li>중복 리뷰 방지 (한 서비스당 1개의 리뷰만 작성 가능)</li>
                  <li>서비스 평점 자동 업데이트</li>
                </ol>
              </div>
            </div>
          </section>

          {/* 3. UX 설계 원칙 */}
          <section id="ux-principles" style={{ marginBottom: '3rem', scrollMarginTop: '2rem' }}>
            <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>UX 설계 원칙</h2>
            
            <div className="section-card" style={{
              padding: '1.5rem',
              backgroundColor: 'var(--card-bg)',
              borderRadius: '8px',
              border: '1px solid var(--nav-border)',
              marginBottom: '1.5rem'
            }}>
              <h3 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>원칙 1: "지도는 상태를 바꾸지 않는다"</h3>
              <div style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}>
                <p style={{ marginBottom: '0.5rem' }}>
                  <strong style={{ color: 'var(--text-color)' }}>핵심 문장:</strong> 지도는 상태를 직접 변경하지 않고, 상태 변경 "의사"만 만든다
                </p>
                <p style={{ marginBottom: '0.5rem' }}><strong style={{ color: 'var(--text-color)' }}>구현 방식:</strong></p>
                <ul style={{ marginLeft: '1.5rem', marginBottom: '0.5rem' }}>
                  <li>지도 이동 → "이 지역 검색" 버튼 표시 (상태 변경 의사만 표시)</li>
                  <li>사용자 확인 → 데이터 변경 (명시적 액션 후 실행)</li>
                  <li>지도는 탐색 UI일 뿐, 데이터를 제어하지 않음</li>
                </ul>
              </div>
            </div>

            <div className="section-card" style={{
              padding: '1.5rem',
              backgroundColor: 'var(--card-bg)',
              borderRadius: '8px',
              border: '1px solid var(--nav-border)',
              marginBottom: '1.5rem'
            }}>
              <h3 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>원칙 2: InitialLoadSearch vs UserTriggeredSearch 분리</h3>
              <div style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}>
                <p style={{ marginBottom: '0.5rem' }}><strong style={{ color: 'var(--text-color)' }}>개념 분리:</strong></p>
                <ul style={{ marginLeft: '1.5rem', marginBottom: '0.5rem' }}>
                  <li><strong>InitialLoadSearch</strong>: 시스템 주도, 페이지 진입 시 자동 실행, 사용자에게 초기 컨텍스트 제공</li>
                  <li><strong>UserTriggeredSearch</strong>: 사용자 주도, 명시적 검색 액션, 사용자가 원하는 지역 탐색</li>
                </ul>
                <p style={{ marginBottom: '0.5rem' }}><strong style={{ color: 'var(--text-color)' }}>구현 방식:</strong></p>
                <ul style={{ marginLeft: '1.5rem', marginBottom: '0.5rem' }}>
                  <li><code>InitialLoadSearch</code>: <code>isInitialLoad: true</code> 플래그로 구분, 자동 실행</li>
                  <li><code>UserTriggeredSearch</code>: "이 지역 검색" 버튼 클릭 시 실행, 지역 선택 상태 초기화</li>
                </ul>
              </div>
            </div>

            <div className="section-card" style={{
              padding: '1.5rem',
              backgroundColor: 'var(--card-bg)',
              borderRadius: '8px',
              border: '1px solid var(--nav-border)',
              marginBottom: '1.5rem'
            }}>
              <h3 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>원칙 3: 빈 상태 UX 처리</h3>
              <div style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}>
                <p style={{ marginBottom: '0.5rem' }}><strong style={{ color: 'var(--text-color)' }}>빈 상태 시나리오:</strong></p>
                <ul style={{ marginLeft: '1.5rem', marginBottom: '0.5rem' }}>
                  <li>검색 결과 0개</li>
                  <li>위치 권한 거부</li>
                  <li>너무 넓은 범위 (전국 단위)</li>
                </ul>
                <p style={{ marginBottom: '0.5rem' }}><strong style={{ color: 'var(--text-color)' }}>구현 방식:</strong></p>
                <ul style={{ marginLeft: '1.5rem', marginBottom: '0.5rem' }}>
                  <li>명확한 안내 메시지 표시</li>
                  <li>대안 제시 (다른 지역 검색, 카테고리 변경 등)</li>
                  <li>빈 상태도 하나의 "상태"로 인식</li>
                </ul>
              </div>
            </div>

            <div className="section-card" style={{
              padding: '1.5rem',
              backgroundColor: 'var(--card-bg)',
              borderRadius: '8px',
              border: '1px solid var(--nav-border)'
            }}>
              <h3 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>원칙 4: 개별 핀 마커 표시 및 마커-리스트 동기화</h3>
              <div style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}>
                <p style={{ marginBottom: '0.5rem' }}><strong style={{ color: 'var(--text-color)' }}>개별 핀 마커 표시:</strong></p>
                <ul style={{ marginLeft: '1.5rem', marginBottom: '0.5rem' }}>
                  <li>클러스터링을 제거하고 모든 장소를 개별 핀(Pin)으로 표시하여 직관성 확보</li>
                  <li>마커 개수 제한: 최대 20개 마커만 표시 (지도 복잡도 감소)</li>
                </ul>
                <p style={{ marginBottom: '0.5rem' }}><strong style={{ color: 'var(--text-color)' }}>마커-리스트 동기화:</strong></p>
                <ul style={{ marginLeft: '1.5rem', marginBottom: '0.5rem' }}>
                  <li>양방향 스크롤 및 하이라이트로 사용자 경험 향상</li>
                  <li>마커 클릭 시 리스트에서 해당 항목 스크롤</li>
                  <li>리스트 클릭 시 지도 이동 및 마커 하이라이트</li>
                </ul>
              </div>
            </div>
          </section>

          {/* 7. Entity 구조 */}
          <section id="entities" style={{ marginBottom: '3rem', scrollMarginTop: '2rem' }}>
            <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>Entity 구조</h2>
        
        <div className="section-card" style={{
          padding: '1.5rem',
          backgroundColor: 'var(--card-bg)',
          borderRadius: '8px',
          border: '1px solid var(--nav-border)',
          marginBottom: '1.5rem'
        }}>
          <MermaidDiagram chart={entityDiagram} />
        </div>

        <div className="section-card" style={{
          padding: '1.5rem',
          backgroundColor: 'var(--card-bg)',
          borderRadius: '8px',
          border: '1px solid var(--nav-border)',
          marginBottom: '1rem'
        }}>
          <h3 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>1. LocationService (위치 서비스)</h3>
          <div style={{ 
            color: 'var(--text-secondary)',
            lineHeight: '1.8',
            fontFamily: 'monospace',
            fontSize: '0.9rem'
          }}>
            <div style={{ marginBottom: '0.5rem' }}><strong style={{ color: 'var(--text-color)' }}>주요 필드:</strong></div>
            <div>• idx (PK), name</div>
            <div>• 카테고리 계층: category1, category2, category3</div>
            <div>• 지역 계층: sido, sigungu, eupmyeondong, roadName</div>
            <div>• address, zipCode, latitude, longitude</div>
            <div>• closedDay, operatingHours, parkingAvailable, priceInfo</div>
            <div>• petFriendly, isPetOnly, petSize, petRestrictions, petExtraFee</div>
            <div>• indoor, outdoor, description, rating, dataSource</div>
            <div style={{ marginTop: '0.5rem' }}><strong style={{ color: 'var(--text-color)' }}>특징:</strong></div>
            <div>• BaseTimeEntity를 상속하지 않음 (createdAt, updatedAt 없음)</div>
            <div>• 지역 계층 구조: sido → sigungu → eupmyeondong → roadName</div>
            <div>• 카테고리 계층 구조: category1 → category2 → category3</div>
            <div style={{ marginTop: '0.5rem' }}><strong style={{ color: 'var(--text-color)' }}>연관관계:</strong></div>
            <div>• OneToMany → LocationServiceReview</div>
          </div>
        </div>

        <div className="section-card" style={{
          padding: '1.5rem',
          backgroundColor: 'var(--card-bg)',
          borderRadius: '8px',
          border: '1px solid var(--nav-border)'
        }}>
          <h3 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>2. LocationServiceReview (위치 서비스 리뷰)</h3>
          <div style={{ 
            color: 'var(--text-secondary)',
            lineHeight: '1.8',
            fontFamily: 'monospace',
            fontSize: '0.9rem'
          }}>
            <div style={{ marginBottom: '0.5rem' }}><strong style={{ color: 'var(--text-color)' }}>주요 필드:</strong></div>
            <div>• idx (PK), service (서비스), user (작성자)</div>
            <div>• rating (1-5점), comment, createdAt, updatedAt</div>
            <div style={{ marginTop: '0.5rem' }}><strong style={{ color: 'var(--text-color)' }}>연관관계:</strong></div>
            <div>• ManyToOne → LocationService, Users</div>
          </div>
        </div>
      </section>

          <section id="services" style={{ marginBottom: '3rem', scrollMarginTop: '2rem' }}>
            <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>Service 주요 기능</h2>
        
        <div className="section-card" style={{
          padding: '1.5rem',
          backgroundColor: 'var(--card-bg)',
          borderRadius: '8px',
          border: '1px solid var(--nav-border)',
          marginBottom: '1rem'
        }}>
          <h3 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>LocationServiceService</h3>
          <div style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}>
            <div style={{ marginBottom: '0.5rem' }}><strong style={{ color: 'var(--text-color)' }}>지역 계층별 검색:</strong></div>
            <div>• searchLocationServicesByRegion() - 지역 계층별 서비스 검색 (우선순위 기반 조회, 카테고리 필터링, 최대 결과 수 제한, 성능 측정 로깅)</div>
            <div style={{ marginTop: '1rem', marginBottom: '0.5rem' }}><strong style={{ color: 'var(--text-color)' }}>위치 기반 검색:</strong></div>
            <div>• searchLocationServicesByLocation() - 위치 기반 반경 검색 (ST_Distance_Sphere 사용, 카테고리 필터링, 최대 결과 수 제한, 성능 측정 로깅)</div>
            <div style={{ marginTop: '1rem', marginBottom: '0.5rem' }}><strong style={{ color: 'var(--text-color)' }}>거리 계산:</strong></div>
            <div>• calculateDistance() - Haversine 공식 (미터 단위)</div>
            <div style={{ marginTop: '1rem', marginBottom: '0.5rem' }}><strong style={{ color: 'var(--text-color)' }}>인기 서비스:</strong></div>
            <div>• getPopularLocationServices() - 인기 서비스 조회 (카테고리별 상위 10개, @Cacheable 적용)</div>
          </div>
        </div>

        <div className="section-card" style={{
          padding: '1.5rem',
          backgroundColor: 'var(--card-bg)',
          borderRadius: '8px',
          border: '1px solid var(--nav-border)',
          marginBottom: '1rem'
        }}>
          <h3 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>NaverMapService</h3>
          <div style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}>
            <div>• addressToCoordinates() - 주소→좌표 변환 (네이버 Geocoding API 호출, 좌표 추출)</div>
            <div>• coordinatesToAddress() - 좌표→주소 변환 (네이버 역지오코딩 API 호출, 주소 조합)</div>
            <div>• getDirections() - 길찾기 (네이버 Directions API 호출, 경로 정보 반환)</div>
          </div>
        </div>

        <div className="section-card" style={{
          padding: '1.5rem',
          backgroundColor: 'var(--card-bg)',
          borderRadius: '8px',
          border: '1px solid var(--nav-border)'
        }}>
          <h3 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>LocationServiceReviewService</h3>
          <div style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}>
            <div>• createReview() - 리뷰 작성 (중복 체크, 이메일 인증 확인, 평점 업데이트)</div>
            <div>• updateReview() - 리뷰 수정 (이메일 인증 확인, 평점 업데이트)</div>
            <div>• deleteReview() - 리뷰 삭제 (이메일 인증 확인, 평점 업데이트)</div>
            <div>• getReviewsByService() - 서비스별 리뷰 목록 조회</div>
            <div>• getReviewsByUser() - 사용자별 리뷰 목록 조회</div>
            <div>• updateServiceRating() - 서비스 평점 업데이트 (평균 평점 계산 및 업데이트)</div>
          </div>
        </div>
      </section>

          {/* 보안 및 권한 체계 */}
          <section id="security" style={{ marginBottom: '3rem', scrollMarginTop: '2rem' }}>
            <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>보안 및 권한 체계</h2>
            <div className="section-card" style={{
              padding: '1.5rem',
              backgroundColor: 'var(--card-bg)',
              borderRadius: '8px',
              border: '1px solid var(--nav-border)'
            }}>
              <ul style={{
                listStyle: 'none',
                padding: 0,
                color: 'var(--text-secondary)',
                lineHeight: '1.8'
              }}>
                <li>• <strong style={{ color: 'var(--text-color)' }}>리뷰 작성 권한</strong>: 일반 사용자만 리뷰 작성 가능, 이메일 인증 필요</li>
                <li>• <strong style={{ color: 'var(--text-color)' }}>중복 리뷰 방지</strong>: 한 서비스당 1개의 리뷰만 작성 가능</li>
                <li>• <strong style={{ color: 'var(--text-color)' }}>트랜잭션 처리</strong>: 리뷰 작성/수정/삭제 시 트랜잭션으로 평점 업데이트를 원자적으로 처리</li>
              </ul>
            </div>
          </section>

          {/* 11. 다른 도메인과의 연관관계 */}
          <section id="relationships" style={{ marginBottom: '3rem', scrollMarginTop: '2rem' }}>
            <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>다른 도메인과의 연관관계</h2>
        
        <div className="section-card" style={{
          padding: '1.5rem',
          backgroundColor: 'var(--card-bg)',
          borderRadius: '8px',
          border: '1px solid var(--nav-border)'
        }}>
          <div style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}>
            <div style={{ marginBottom: '0.5rem' }}><strong style={{ color: 'var(--text-color)' }}>User 도메인:</strong></div>
            <div>• Users가 위치 서비스에 리뷰 작성, 사용자별 리뷰 이력 조회</div>
            <div style={{ marginTop: '1rem', marginBottom: '0.5rem' }}><strong style={{ color: 'var(--text-color)' }}>File 도메인:</strong></div>
            <div>• LocationService의 대표 이미지 저장, FileTargetType.LOCATION_SERVICE로 구분</div>
            <div style={{ marginTop: '1rem', marginBottom: '0.5rem' }}><strong style={{ color: 'var(--text-color)' }}>Report 도메인:</strong></div>
            <div>• 부적절한 위치 서비스 정보 신고, ReportTargetType.LOCATION_SERVICE로 구분</div>
            <div style={{ marginTop: '1rem', marginBottom: '0.5rem' }}><strong style={{ color: 'var(--text-color)' }}>Statistics 도메인:</strong></div>
            <div>• 일별 통계에 위치 서비스 수 포함, 리뷰 작성 수 집계</div>
          </div>
        </div>
      </section>

          <section id="api" style={{ marginBottom: '3rem', scrollMarginTop: '2rem' }}>
            <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>API 엔드포인트</h2>
        
        <div className="section-card" style={{
          padding: '1.5rem',
          backgroundColor: 'var(--card-bg)',
          borderRadius: '8px',
          border: '1px solid var(--nav-border)',
          marginBottom: '1rem'
        }}>
          <h3 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>위치 서비스 (/api/location-services/search)</h3>
          <div style={{ 
            color: 'var(--text-secondary)',
            lineHeight: '1.8',
            fontFamily: 'monospace',
            fontSize: '0.9rem'
          }}>
            <div>• GET /search - 위치 기반 검색 또는 지역 계층별 서비스 검색</div>
            <div style={{ marginLeft: '1rem', marginTop: '0.5rem', fontSize: '0.85rem' }}>
              파라미터: latitude, longitude, radius, sido, sigungu, eupmyeondong, roadName, category, size
            </div>
            <div style={{ marginTop: '1rem' }}>• GET /popular - 인기 서비스 조회 (category 파라미터)</div>
          </div>
        </div>

        <div className="section-card" style={{
          padding: '1.5rem',
          backgroundColor: 'var(--card-bg)',
          borderRadius: '8px',
          border: '1px solid var(--nav-border)',
          marginBottom: '1rem'
        }}>
          <h3 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>위치 서비스 리뷰 (/api/location-service-reviews)</h3>
          <div style={{ 
            color: 'var(--text-secondary)',
            lineHeight: '1.8',
            fontFamily: 'monospace',
            fontSize: '0.9rem'
          }}>
            <div>• POST / - 리뷰 작성 (인증 필요)</div>
            <div>• PUT /{'{reviewIdx}'} - 리뷰 수정 (인증 필요)</div>
            <div>• DELETE /{'{reviewIdx}'} - 리뷰 삭제 (인증 필요)</div>
            <div>• GET /service/{'{serviceIdx}'} - 서비스별 리뷰 목록 조회</div>
            <div>• GET /user/{'{userIdx}'} - 사용자별 리뷰 목록 조회</div>
          </div>
        </div>

        <div className="section-card" style={{ 
          padding: '1.5rem',
          backgroundColor: 'var(--card-bg)',
          borderRadius: '8px',
          border: '1px solid var(--nav-border)'
        }}>
          <h3 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>지오코딩 (/api/geocoding)</h3>
          <div style={{ 
            color: 'var(--text-secondary)',
            lineHeight: '1.8',
            fontFamily: 'monospace',
            fontSize: '0.9rem'
          }}>
            <div>• GET /address - 주소→좌표 변환 (address 파라미터, URL 디코딩 자동 처리)</div>
            <div>• GET /coordinates - 좌표→주소 변환 (lat, lng 파라미터)</div>
            <div>• GET /directions - 길찾기 (start, goal, option 파라미터, 경도,위도 순서)</div>
          </div>
        </div>
      </section>

          <section id="docs" style={{ marginBottom: '3rem', scrollMarginTop: '2rem' }}>
            <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>관련 문서</h2>
        <div className="section-card" style={{
          padding: '1rem',
          backgroundColor: 'var(--card-bg)',
          borderRadius: '8px',
          border: '1px solid var(--nav-border)'
        }}>
          <a 
            href="https://github.com/makkong1/makkong1-github.io/blob/main/docs/domains/location.md" 
            target="_blank"
            rel="noopener noreferrer"
            style={{ 
              color: 'var(--link-color)',
              textDecoration: 'none'
            }}
          >
            → Location 도메인 상세 문서 보기
          </a>
        </div>
          </section>
        </div>
        <TableOfContents sections={sections} />
      </div>
    </div>
  );
}

export default LocationDomain;
