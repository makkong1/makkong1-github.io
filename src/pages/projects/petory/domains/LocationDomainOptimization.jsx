import { Link } from 'react-router-dom';
import MermaidDiagram from '../../../../components/Common/MermaidDiagram';
import TableOfContents from '../../../../components/Common/TableOfContents';

function LocationDomainOptimization() {
  const sections = [
    { id: 'intro', title: '개요' },
    { id: 'test-design', title: '문제 재현 방식 (테스트 설계)' },
    { id: 'before', title: '성능 측정 결과 (개선 전)' },
    { id: 'optimization', title: '성능 최적화 및 동시성 제어' },
    { id: 'after', title: '성능 개선 결과 (개선 후)' }
  ];

  return (
    <div className="domain-page-wrapper" style={{ padding: '2rem 0' }}>
      <div className="domain-page-container" style={{ display: 'flex', gap: '2rem', alignItems: 'flex-start' }}>
        <div className="domain-page-content" style={{ flex: 1 }}>
          <div style={{ marginBottom: '1rem' }}>
            <Link 
              to="/domains/location" 
              style={{ 
                color: 'var(--link-color)', 
                textDecoration: 'none',
                fontSize: '0.9rem'
              }}
            >
              ← Location 도메인으로 돌아가기
            </Link>
          </div>
          <h1 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>Location 도메인 - 성능 최적화 상세</h1>
          
          {/* 1. 개요 */}
          <section id="intro" style={{ marginBottom: '3rem', scrollMarginTop: '2rem' }}>
            <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>개요</h2>
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
                <h3 style={{ marginBottom: '0.75rem', color: 'var(--text-color)', fontSize: '1rem' }}>주요 문제점</h3>
                <ul style={{
                  listStyle: 'none',
                  padding: 0,
                  color: 'var(--text-secondary)',
                  lineHeight: '1.8',
                  fontSize: '0.9rem'
                }}>
                  <li>• <strong style={{ color: 'var(--text-color)' }}>전체 데이터 조회</strong>: 초기 로드 시 모든 위치 서비스 데이터를 한 번에 조회 (약 22,699개)</li>
                  <li>• <strong style={{ color: 'var(--text-color)' }}>프론트엔드 필터링 오버헤드</strong>: 전체 데이터를 프론트엔드로 전송 후 클라이언트 사이드에서 필터링</li>
                  <li>• <strong style={{ color: 'var(--text-color)' }}>확장성 문제</strong>: 데이터가 증가할수록 로딩 시간이 선형적으로 증가</li>
                </ul>
              </div>
            </div>
          </section>

          {/* 2. 문제 재현 방식 (테스트 설계) */}
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

          {/* 3. 성능 측정 결과 (개선 전) */}
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

          {/* 4. 성능 최적화 및 동시성 제어 */}
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

          {/* 5. 성능 개선 결과 (개선 후) */}
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
        </div>
        <TableOfContents sections={sections} />
      </div>
    </div>
  );
}

export default LocationDomainOptimization;

