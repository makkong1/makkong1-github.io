import { Link } from 'react-router-dom';
import TableOfContents from '../../../../components/Common/TableOfContents';

function LocationDomainRefactoring() {
  const sections = [
    { id: 'intro', title: '리팩토링 개요' },
    { id: 'distance-calculation', title: '거리 계산 중복 제거' },
    { id: 'state-management', title: '상태 관리 개선' },
    { id: 'search-logic', title: '프론트엔드 검색 로직 단순화' },
    { id: 'hybrid-strategy', title: '하이브리드 전략 일관성 개선' },
    { id: 'keyword-search', title: '키워드 검색 품질 검증' },
    { id: 'summary', title: '리팩토링 요약' }
  ];

  return (
    <div className="domain-page-wrapper" style={{ padding: '2rem 0' }}>
      <div className="domain-page-container" style={{ display: 'flex', gap: '2rem', alignItems: 'flex-start' }}>
        <div className="domain-page-content" style={{ flex: 1 }}>
          <h1 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>Location 도메인 리팩토링</h1>
          
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
                Location 도메인에서 수행한 주요 리팩토링 작업들을 정리했습니다. 
                성능 개선, 코드 품질 향상, 일관성 확보를 목표로 진행되었습니다.
              </p>
              <div style={{
                padding: '1rem',
                backgroundColor: 'var(--bg-color)',
                borderRadius: '6px',
                marginTop: '1rem',
                border: '1px solid var(--nav-border)'
              }}>
                <h3 style={{ marginBottom: '0.75rem', color: 'var(--text-color)', fontSize: '1rem' }}>리팩토링 목표</h3>
                <ul style={{
                  listStyle: 'none',
                  padding: 0,
                  color: 'var(--text-secondary)',
                  lineHeight: '1.8',
                  fontSize: '0.9rem'
                }}>
                  <li>• <strong style={{ color: 'var(--text-color)' }}>성능 최적화</strong>: 중복 계산 제거, 불필요한 네트워크 요청 감소</li>
                  <li>• <strong style={{ color: 'var(--text-color)' }}>코드 품질 향상</strong>: 복잡한 함수 분리, 상태 관리 개선</li>
                  <li>• <strong style={{ color: 'var(--text-color)' }}>일관성 확보</strong>: 검색 결과의 일관성 보장</li>
                  <li>• <strong style={{ color: 'var(--text-color)' }}>유지보수성 향상</strong>: 코드 가독성 및 테스트 용이성 개선</li>
                </ul>
              </div>
            </div>
          </section>

          {/* 2. 거리 계산 중복 제거 */}
          <section id="distance-calculation" style={{ marginBottom: '3rem', scrollMarginTop: '2rem' }}>
            <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>거리 계산 중복 제거</h2>
            
            <div className="section-card" style={{
              padding: '1.5rem',
              backgroundColor: 'var(--card-bg)',
              borderRadius: '8px',
              border: '1px solid var(--nav-border)',
              marginBottom: '1.5rem'
            }}>
              <h3 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>문제점</h3>
              <div style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}>
                <p style={{ marginBottom: '0.5rem' }}>
                  <strong style={{ color: 'var(--text-color)' }}>이전 구현</strong>:
                </p>
                <ul style={{ marginLeft: '1.5rem', marginBottom: '0.5rem' }}>
                  <li>백엔드: <code>ST_Distance_Sphere</code>로 반경 필터링만 수행 (거리 값 미반환)</li>
                  <li>프론트엔드: <code>Haversine</code> 공식으로 거리 재계산</li>
                  <li>문제: 동일한 계산을 두 번 수행하여 성능 낭비</li>
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
              <h3 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>해결 방법</h3>
              <div style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}>
                <p style={{ marginBottom: '0.5rem' }}>
                  백엔드에서 거리 정보를 계산하여 DTO에 포함하여 반환하고, 
                  프론트엔드에서는 백엔드에서 받은 거리 정보를 우선 사용하도록 변경.
                </p>
                <div style={{
                  padding: '1rem',
                  backgroundColor: 'var(--bg-color)',
                  borderRadius: '6px',
                  marginTop: '1rem',
                  fontFamily: 'monospace',
                  fontSize: '0.9rem'
                }}>
                  <div style={{ marginBottom: '0.5rem', color: 'var(--text-color)' }}>백엔드 변경:</div>
                  <div>• DTO 변환 시 거리 계산 후 <code>distance</code> 필드 설정</div>
                  <div style={{ marginTop: '0.5rem', marginBottom: '0.5rem', color: 'var(--text-color)' }}>프론트엔드 변경:</div>
                  <div>• 백엔드에서 받은 <code>service.distance</code> 우선 사용</div>
                  <div>• 거리 정보가 없을 때만 프론트엔드에서 계산 (하위 호환성)</div>
                </div>
              </div>
            </div>

            <div className="section-card" style={{
              padding: '1.5rem',
              backgroundColor: 'var(--card-bg)',
              borderRadius: '8px',
              border: '1px solid var(--nav-border)'
            }}>
              <h3 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>개선 효과</h3>
              <ul style={{
                listStyle: 'none',
                padding: 0,
                color: 'var(--text-secondary)',
                lineHeight: '1.8',
                fontSize: '0.9rem'
              }}>
                <li>• <strong style={{ color: 'var(--text-color)' }}>프론트엔드 계산 제거</strong>: 대부분의 경우 프론트엔드에서 거리 계산 불필요</li>
                <li>• <strong style={{ color: 'var(--text-color)' }}>일관성 확보</strong>: 백엔드와 프론트엔드의 거리 계산 결과 일치</li>
                <li>• <strong style={{ color: 'var(--text-color)' }}>하위 호환성</strong>: 거리 정보가 없으면 프론트엔드에서 계산 (fallback)</li>
              </ul>
            </div>
          </section>

          {/* 3. 상태 관리 개선 */}
          <section id="state-management" style={{ marginBottom: '3rem', scrollMarginTop: '2rem' }}>
            <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>상태 관리 개선</h2>
            
            <div className="section-card" style={{
              padding: '1.5rem',
              backgroundColor: 'var(--card-bg)',
              borderRadius: '8px',
              border: '1px solid var(--nav-border)',
              marginBottom: '1.5rem'
            }}>
              <h3 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>문제점</h3>
              <div style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}>
                <p style={{ marginBottom: '0.5rem' }}>
                  <strong style={{ color: 'var(--text-color)' }}>상태 개수</strong>:
                </p>
                <ul style={{ marginLeft: '1.5rem', marginBottom: '0.5rem' }}>
                  <li><code>useState</code>: 약 24개</li>
                  <li><code>useRef</code>: 약 6개</li>
                  <li>총 30개의 상태 관리 훅 사용</li>
                </ul>
                <p style={{ marginBottom: '0.5rem' }}>
                  <strong style={{ color: 'var(--text-color)' }}>문제점</strong>:
                </p>
                <ul style={{ marginLeft: '1.5rem', marginBottom: '0.5rem' }}>
                  <li>상태가 많아 코드 가독성 저하</li>
                  <li>관련된 상태들이 분산되어 있어 관리 어려움</li>
                  <li>상태 업데이트 로직이 복잡함</li>
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
              <h3 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>해결 방법</h3>
              <div style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}>
                <p style={{ marginBottom: '0.5rem' }}>
                  관련된 상태들을 논리적으로 그룹화하여 <code>useReducer</code>로 통합.
                </p>
                <div style={{
                  padding: '1rem',
                  backgroundColor: 'var(--bg-color)',
                  borderRadius: '6px',
                  marginTop: '1rem',
                  fontSize: '0.9rem'
                }}>
                  <div style={{ marginBottom: '0.5rem', color: 'var(--text-color)' }}>그룹화된 상태:</div>
                  <div>• <strong>검색 상태</strong> (5개 → 1개 reducer): keyword, categoryType, searchMode 등</div>
                  <div>• <strong>지역 선택 상태</strong> (4개 → 1개 reducer): selectedSido, selectedSigungu 등</div>
                  <div>• <strong>UI 상태</strong> (8개 → 1개 reducer): loading, error, selectedService 등</div>
                </div>
              </div>
            </div>

            <div className="section-card" style={{
              padding: '1.5rem',
              backgroundColor: 'var(--card-bg)',
              borderRadius: '8px',
              border: '1px solid var(--nav-border)'
            }}>
              <h3 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>개선 효과</h3>
              <ul style={{
                listStyle: 'none',
                padding: 0,
                color: 'var(--text-secondary)',
                lineHeight: '1.8',
                fontSize: '0.9rem'
              }}>
                <li>• <strong style={{ color: 'var(--text-color)' }}>코드 가독성 향상</strong>: 24개의 개별 useState → 3개의 useReducer</li>
                <li>• <strong style={{ color: 'var(--text-color)' }}>상태 업데이트 로직 중앙화</strong>: 관련된 상태를 함께 관리</li>
                <li>• <strong style={{ color: 'var(--text-color)' }}>버그 감소</strong>: 상태 업데이트 로직이 명확해짐</li>
                <li>• <strong style={{ color: 'var(--text-color)' }}>유지보수성 향상</strong>: 상태 그룹별로 관리하여 수정 용이</li>
              </ul>
            </div>
          </section>

          {/* 4. 프론트엔드 검색 로직 단순화 */}
          <section id="search-logic" style={{ marginBottom: '3rem', scrollMarginTop: '2rem' }}>
            <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>프론트엔드 검색 로직 단순화</h2>
            
            <div className="section-card" style={{
              padding: '1.5rem',
              backgroundColor: 'var(--card-bg)',
              borderRadius: '8px',
              border: '1px solid var(--nav-border)',
              marginBottom: '1.5rem'
            }}>
              <h3 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>문제점</h3>
              <div style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}>
                <p style={{ marginBottom: '0.5rem' }}>
                  <strong style={{ color: 'var(--text-color)' }}>현재 상황</strong>:
                </p>
                <ul style={{ marginLeft: '1.5rem', marginBottom: '0.5rem' }}>
                  <li><code>fetchServices</code> 함수가 약 300줄</li>
                  <li>4가지 검색 전략이 하나의 함수에 혼재</li>
                  <li>여러 조건 분기가 중첩되어 예측하기 어려움</li>
                </ul>
                <p style={{ marginBottom: '0.5rem' }}>
                  <strong style={{ color: 'var(--text-color)' }}>검색 전략</strong>:
                </p>
                <ol style={{ marginLeft: '1.5rem', marginBottom: '0.5rem' }}>
                  <li>초기 로드 (<code>isInitialLoad</code>)</li>
                  <li>위치 기반 검색 (<code>latitude</code>, <code>longitude</code>, <code>radius</code>)</li>
                  <li>지역 검색 (<code>region</code>)</li>
                  <li>하이브리드 전략 (<code>allServices.length > 0</code>)</li>
                </ol>
              </div>
            </div>

            <div className="section-card" style={{
              padding: '1.5rem',
              backgroundColor: 'var(--card-bg)',
              borderRadius: '8px',
              border: '1px solid var(--nav-border)',
              marginBottom: '1.5rem'
            }}>
              <h3 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>해결 방법</h3>
              <div style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}>
                <p style={{ marginBottom: '0.5rem' }}>
                  각 검색 전략을 별도 함수로 분리하여 가독성과 유지보수성을 향상.
                </p>
                <div style={{
                  padding: '1rem',
                  backgroundColor: 'var(--bg-color)',
                  borderRadius: '6px',
                  marginTop: '1rem',
                  fontSize: '0.9rem'
                }}>
                  <div style={{ marginBottom: '0.5rem', color: 'var(--text-color)' }}>분리된 함수:</div>
                  <div>• <code>handleInitialLoad</code> - 초기 로드 전략 (약 80줄)</div>
                  <div>• <code>handleLocationBasedSearch</code> - 위치 기반 검색 전략 (약 50줄)</div>
                  <div>• <code>handleRegionSearch</code> - 지역 검색 전략 (약 40줄)</div>
                  <div>• <code>handleHybridSearch</code> - 하이브리드 전략 (약 50줄)</div>
                  <div style={{ marginTop: '0.5rem' }}>메인 함수: 약 300줄 → 약 80줄</div>
                </div>
              </div>
            </div>

            <div className="section-card" style={{
              padding: '1.5rem',
              backgroundColor: 'var(--card-bg)',
              borderRadius: '8px',
              border: '1px solid var(--nav-border)'
            }}>
              <h3 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>개선 효과</h3>
              <ul style={{
                listStyle: 'none',
                padding: 0,
                color: 'var(--text-secondary)',
                lineHeight: '1.8',
                fontSize: '0.9rem'
              }}>
                <li>• <strong style={{ color: 'var(--text-color)' }}>가독성 향상</strong>: 각 전략이 명확하게 분리됨</li>
                <li>• <strong style={{ color: 'var(--text-color)' }}>유지보수성 향상</strong>: 각 전략을 독립적으로 수정 가능</li>
                <li>• <strong style={{ color: 'var(--text-color)' }}>테스트 용이성 향상</strong>: 각 전략을 독립적으로 테스트 가능</li>
                <li>• <strong style={{ color: 'var(--text-color)' }}>조건 분기 깊이 감소</strong>: 4단계 중첩 → 1단계</li>
              </ul>
            </div>
          </section>

          {/* 5. 하이브리드 전략 일관성 개선 */}
          <section id="hybrid-strategy" style={{ marginBottom: '3rem', scrollMarginTop: '2rem' }}>
            <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>하이브리드 전략 일관성 개선</h2>
            
            <div className="section-card" style={{
              padding: '1.5rem',
              backgroundColor: 'var(--card-bg)',
              borderRadius: '8px',
              border: '1px solid var(--nav-border)',
              marginBottom: '1.5rem'
            }}>
              <h3 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>문제점</h3>
              <div style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}>
                <p style={{ marginBottom: '0.5rem' }}>
                  <strong style={{ color: 'var(--text-color)' }}>이전 구현</strong>:
                </p>
                <ul style={{ marginLeft: '1.5rem', marginBottom: '0.5rem' }}>
                  <li>초기 로드가 위치 기반(5km 반경)이면 <code>allServices</code>에 반경 내 데이터만 포함됨</li>
                  <li>이후 지역 선택 시 하이브리드 전략이 프론트엔드 필터링만 수행하면 반경 밖 서비스가 누락됨</li>
                  <li>문제: 같은 지역을 선택해도 초기 로드 방식에 따라 다른 결과가 나옴</li>
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
              <h3 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>해결 방법</h3>
              <div style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}>
                <p style={{ marginBottom: '0.5rem' }}>
                  지역 선택 시 항상 백엔드 재요청하도록 하이브리드 전략을 수정하여 일관성 확보.
                </p>
                <div style={{
                  padding: '1rem',
                  backgroundColor: 'var(--bg-color)',
                  borderRadius: '6px',
                  marginTop: '1rem',
                  fontSize: '0.9rem'
                }}>
                  <div style={{ marginBottom: '0.5rem', color: 'var(--text-color)' }}>개선 내용:</div>
                  <div>• 지역 선택이 있으면 항상 백엔드 재요청</div>
                  <div>• 초기 로드 방식과 무관하게 동일한 결과 제공</div>
                  <div>• 지역 선택이 없을 때는 기존 하이브리드 전략 유지 (성능 최적화)</div>
                </div>
              </div>
            </div>

            <div className="section-card" style={{
              padding: '1.5rem',
              backgroundColor: 'var(--card-bg)',
              borderRadius: '8px',
              border: '1px solid var(--nav-border)'
            }}>
              <h3 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>개선 효과</h3>
              <ul style={{
                listStyle: 'none',
                padding: 0,
                color: 'var(--text-secondary)',
                lineHeight: '1.8',
                fontSize: '0.9rem'
              }}>
                <li>• <strong style={{ color: 'var(--text-color)' }}>일관성 확보</strong>: 같은 지역 선택 시 항상 동일한 결과</li>
                <li>• <strong style={{ color: 'var(--text-color)' }}>사용자 경험 향상</strong>: 예측 가능한 동작</li>
                <li>• <strong style={{ color: 'var(--text-color)' }}>성능 최적화 유지</strong>: 지역 선택이 없을 때는 기존 하이브리드 전략 유지</li>
              </ul>
            </div>
          </section>

          {/* 6. 키워드 검색 품질 검증 */}
          <section id="keyword-search" style={{ marginBottom: '3rem', scrollMarginTop: '2rem' }}>
            <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>키워드 검색 품질 검증</h2>
            
            <div className="section-card" style={{
              padding: '1.5rem',
              backgroundColor: 'var(--card-bg)',
              borderRadius: '8px',
              border: '1px solid var(--nav-border)',
              marginBottom: '1.5rem'
            }}>
              <h3 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>검증 목적</h3>
              <div style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}>
                <p style={{ marginBottom: '0.5rem' }}>
                  FULLTEXT 인덱스가 실제로 name, description, category를 모두 검색하는지 확인.
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
              <h3 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>검증 결과</h3>
              <div style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}>
                <p style={{ marginBottom: '0.5rem' }}>
                  <strong style={{ color: 'var(--text-color)' }}>실제 DB 인덱스</strong>:
                </p>
                <div style={{
                  padding: '1rem',
                  backgroundColor: 'var(--bg-color)',
                  borderRadius: '6px',
                  marginTop: '1rem',
                  fontFamily: 'monospace',
                  fontSize: '0.9rem'
                }}>
                  <div>인덱스명: <code>ft_search</code></div>
                  <div>타입: FULLTEXT</div>
                  <div>포함 필드: name, description, category1, category2, category3</div>
                </div>
                <p style={{ marginTop: '1rem', marginBottom: '0.5rem' }}>
                  <strong style={{ color: 'var(--text-color)' }}>쿼리</strong>:
                </p>
                <div style={{
                  padding: '1rem',
                  backgroundColor: 'var(--bg-color)',
                  borderRadius: '6px',
                  fontFamily: 'monospace',
                  fontSize: '0.9rem'
                }}>
                  <div>MATCH(name, description, category1, category2, category3) AGAINST(...)</div>
                </div>
                <p style={{ marginTop: '1rem' }}>
                  <strong style={{ color: 'var(--text-color)' }}>결론</strong>: ✅ 쿼리와 인덱스가 완벽하게 일치하며, 
                  모든 필드에서 FULLTEXT 인덱스 사용 가능
                </p>
              </div>
            </div>
          </section>

          {/* 7. 리팩토링 요약 */}
          <section id="summary" style={{ marginBottom: '3rem', scrollMarginTop: '2rem' }}>
            <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>리팩토링 요약</h2>
            
            <div className="section-card" style={{
              padding: '1.5rem',
              backgroundColor: 'var(--card-bg)',
              borderRadius: '8px',
              border: '1px solid var(--nav-border)'
            }}>
              <h3 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>주요 개선 사항</h3>
              <table style={{
                width: '100%',
                borderCollapse: 'collapse',
                color: 'var(--text-secondary)',
                fontSize: '0.9rem'
              }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid var(--nav-border)' }}>
                    <th style={{ padding: '0.75rem', textAlign: 'left', color: 'var(--text-color)' }}>리팩토링 항목</th>
                    <th style={{ padding: '0.75rem', textAlign: 'left', color: 'var(--text-color)' }}>개선 효과</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ borderBottom: '1px solid var(--nav-border)' }}>
                    <td style={{ padding: '0.75rem' }}>거리 계산 중복 제거</td>
                    <td style={{ padding: '0.75rem' }}>프론트엔드 계산 제거, 일관성 확보</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid var(--nav-border)' }}>
                    <td style={{ padding: '0.75rem' }}>상태 관리 개선</td>
                    <td style={{ padding: '0.75rem' }}>24개 useState → 3개 useReducer, 가독성 향상</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid var(--nav-border)' }}>
                    <td style={{ padding: '0.75rem' }}>검색 로직 단순화</td>
                    <td style={{ padding: '0.75rem' }}>300줄 함수 → 80줄 + 4개 전략 함수, 유지보수성 향상</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid var(--nav-border)' }}>
                    <td style={{ padding: '0.75rem' }}>하이브리드 전략 개선</td>
                    <td style={{ padding: '0.75rem' }}>검색 결과 일관성 확보</td>
                  </tr>
                  <tr>
                    <td style={{ padding: '0.75rem' }}>키워드 검색 검증</td>
                    <td style={{ padding: '0.75rem' }}>FULLTEXT 인덱스 정상 작동 확인</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="section-card" style={{
              padding: '1.5rem',
              backgroundColor: 'var(--card-bg)',
              borderRadius: '8px',
              border: '1px solid var(--nav-border)',
              marginTop: '1.5rem'
            }}>
              <h3 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>관련 문서</h3>
              <ul style={{
                listStyle: 'none',
                padding: 0,
                color: 'var(--text-secondary)',
                lineHeight: '1.8'
              }}>
                <li>• <Link to="/domains/location" style={{ color: 'var(--link-color)', textDecoration: 'none' }}>Location 도메인 상세 페이지</Link></li>
                <li>• <Link to="/domains/location/optimization" style={{ color: 'var(--link-color)', textDecoration: 'none' }}>Location 도메인 성능 최적화 페이지</Link></li>
              </ul>
            </div>
          </section>
        </div>
        <TableOfContents sections={sections} />
      </div>
    </div>
  );
}

export default LocationDomainRefactoring;
