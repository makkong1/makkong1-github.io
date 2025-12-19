import MermaidDiagram from '../../components/Common/MermaidDiagram';
import TableOfContents from '../../components/Common/TableOfContents';

function LocationDomain() {
  const sections = [
    { id: 'intro', title: '도메인 소개' },
    { id: 'problem', title: '가정한 문제 상황' },
    { id: 'test-design', title: '문제 재현 방식' },
    { id: 'before', title: '성능 측정 결과 (개선 전)' },
    { id: 'optimization', title: '성능 최적화 및 동시성 제어' },
    { id: 'after', title: '성능 개선 결과 (개선 후)' },
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
        String category
        String address
        String detailAddress
        Double latitude
        Double longitude
        Double rating
        String phone
        LocalTime openingTime
        LocalTime closingTime
        String imageUrl
        String website
        String description
        Boolean petFriendly
        String petPolicy
        LocalDateTime createdAt
        LocalDateTime updatedAt
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
    <div style={{ padding: '2rem 0' }}>
      <div style={{ display: 'flex', gap: '2rem', alignItems: 'flex-start' }}>
        <div style={{ flex: 1 }}>
          <h1 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>위치 서비스 도메인</h1>
          
          {/* 1. 도메인 소개 */}
          <section id="intro" style={{ marginBottom: '3rem', scrollMarginTop: '2rem' }}>
            <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>도메인 소개</h2>
            <div style={{
              padding: '1.5rem',
              backgroundColor: 'var(--card-bg)',
              borderRadius: '8px',
              border: '1px solid var(--nav-border)'
            }}>
              <p style={{ lineHeight: '1.8', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                Location 도메인은 위치 기반 서비스 정보 제공 및 리뷰 관리를 담당합니다.
              </p>
              <p style={{ lineHeight: '1.8', color: 'var(--text-secondary)' }}>
                병원, 카페, 공원, 펫샵 등 다양한 위치 서비스 정보를 제공합니다.
              </p>
            </div>
          </section>

          {/* 2. 가정한 문제 상황 */}
          <section id="problem" style={{ marginBottom: '3rem', scrollMarginTop: '2rem' }}>
            <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>가정한 문제 상황</h2>
            <div style={{
              padding: '1.5rem',
              backgroundColor: 'var(--card-bg)',
              borderRadius: '8px',
              border: '1px solid var(--nav-border)'
            }}>
              <p style={{ lineHeight: '1.8', color: 'var(--text-secondary)', fontStyle: 'italic' }}>
                아직 구체적인 성능 최적화 작업을 진행하지 않았습니다. 향후 작업 예정입니다.
              </p>
            </div>
          </section>

          {/* 3. 문제 재현 방식 (테스트 설계) */}
          <section id="test-design" style={{ marginBottom: '3rem', scrollMarginTop: '2rem' }}>
            <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>문제 재현 방식 (테스트 설계)</h2>
            <div style={{
              padding: '1.5rem',
              backgroundColor: 'var(--card-bg)',
              borderRadius: '8px',
              border: '1px solid var(--nav-border)'
            }}>
              <p style={{ lineHeight: '1.8', color: 'var(--text-secondary)', fontStyle: 'italic' }}>
                아직 구체적인 성능 최적화 작업을 진행하지 않았습니다. 향후 작업 예정입니다.
              </p>
            </div>
          </section>

          {/* 4. 성능 측정 결과 (개선 전) */}
          <section id="before" style={{ marginBottom: '3rem', scrollMarginTop: '2rem' }}>
            <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>성능 측정 결과 (개선 전)</h2>
            <div style={{
              padding: '1.5rem',
              backgroundColor: 'var(--card-bg)',
              borderRadius: '8px',
              border: '1px solid var(--nav-border)'
            }}>
              <p style={{ lineHeight: '1.8', color: 'var(--text-secondary)', fontStyle: 'italic' }}>
                아직 구체적인 성능 최적화 작업을 진행하지 않았습니다. 향후 작업 예정입니다.
              </p>
            </div>
          </section>

          {/* 5. 성능 최적화 및 동시성 제어 */}
          <section id="optimization" style={{ marginBottom: '3rem', scrollMarginTop: '2rem' }}>
            <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>성능 최적화 및 동시성 제어</h2>
            <div style={{
              padding: '1.5rem',
              backgroundColor: 'var(--card-bg)',
              borderRadius: '8px',
              border: '1px solid var(--nav-border)',
              marginBottom: '1rem'
            }}>
              <h3 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>현재 구현된 최적화</h3>
              <ul style={{
                listStyle: 'none',
                padding: 0,
                color: 'var(--text-secondary)',
                lineHeight: '1.8'
              }}>
                <li>• <strong style={{ color: 'var(--text-color)' }}>인덱싱</strong>: Spatial Index, 카테고리별 조회 인덱스, 평점 정렬 인덱스</li>
                <li>• <strong style={{ color: 'var(--text-color)' }}>Fetch Join</strong>: 리뷰와 작성자 정보를 함께 조회</li>
                <li>• <strong style={{ color: 'var(--text-color)' }}>캐싱</strong>: 인기 위치 서비스 캐싱</li>
              </ul>
            </div>
          </section>

          {/* 6. 성능 개선 결과 (개선 후) */}
          <section id="after" style={{ marginBottom: '3rem', scrollMarginTop: '2rem' }}>
            <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>성능 개선 결과 (개선 후)</h2>
            <div style={{
              padding: '1.5rem',
              backgroundColor: 'var(--card-bg)',
              borderRadius: '8px',
              border: '1px solid var(--nav-border)'
            }}>
              <p style={{ lineHeight: '1.8', color: 'var(--text-secondary)', fontStyle: 'italic' }}>
                아직 구체적인 성능 최적화 작업을 진행하지 않았습니다. 향후 작업 예정입니다.
              </p>
            </div>
          </section>

          {/* 7. 얻은 교훈 / 설계 인사이트 */}
          <section id="insights" style={{ marginBottom: '3rem', scrollMarginTop: '2rem' }}>
            <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>얻은 교훈 / 설계 인사이트</h2>
            <div style={{
              padding: '1.5rem',
              backgroundColor: 'var(--card-bg)',
              borderRadius: '8px',
              border: '1px solid var(--nav-border)'
            }}>
              <p style={{ lineHeight: '1.8', color: 'var(--text-secondary)', fontStyle: 'italic' }}>
                아직 구체적인 성능 최적화 작업을 진행하지 않았습니다. 향후 작업 예정입니다.
              </p>
            </div>
          </section>

          {/* 8. Entity 구조 */}
          <section id="entities" style={{ marginBottom: '3rem', scrollMarginTop: '2rem' }}>
            <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>주요 기능</h2>
            
            <div style={{
              padding: '1.5rem',
              backgroundColor: 'var(--card-bg)',
              borderRadius: '8px',
              border: '1px solid var(--nav-border)',
              marginBottom: '1.5rem'
            }}>
              <h3 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>지역 계층적 탐색</h3>
              <div style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}>
                <p style={{ marginBottom: '0.5rem' }}>지역을 계층적으로 선택하여 서비스를 검색합니다.</p>
                <p style={{ marginBottom: '0.5rem' }}><strong style={{ color: 'var(--text-color)' }}>주요 기능:</strong></p>
                <ul style={{ marginLeft: '1.5rem', marginBottom: '0.5rem' }}>
                  <li>시도 선택 (전국 17개 시도)</li>
                  <li>시군구 선택 (선택된 시도의 시군구)</li>
                  <li>읍면동 선택 (선택된 시군구의 읍면동)</li>
                  <li>도로명 선택 (선택된 읍면동의 도로명)</li>
                  <li>해당 지역의 서비스 목록 표시</li>
                </ul>
                <p style={{ marginBottom: '0.5rem' }}><strong style={{ color: 'var(--text-color)' }}>사용자 시나리오:</strong></p>
                <ol style={{ marginLeft: '1.5rem', marginBottom: '0.5rem' }}>
                  <li>시도 선택 (전국 17개 시도)</li>
                  <li>시군구 선택 (선택된 시도의 시군구)</li>
                  <li>읍면동 선택 (선택된 시군구의 읍면동)</li>
                  <li>도로명 선택 (선택된 읍면동의 도로명)</li>
                  <li>해당 지역의 서비스 목록 표시</li>
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
              <h3 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>거리 계산 및 길찾기</h3>
              <div style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}>
                <p style={{ marginBottom: '0.5rem' }}>내 위치에서 각 서비스까지의 거리를 계산하고 네이버맵 길찾기로 연결합니다.</p>
                <p style={{ marginBottom: '0.5rem' }}><strong style={{ color: 'var(--text-color)' }}>주요 기능:</strong></p>
                <ul style={{ marginLeft: '1.5rem', marginBottom: '0.5rem' }}>
                  <li>내 위치 확인 (GPS 또는 수동 입력)</li>
                  <li>각 서비스까지의 거리 표시 (Haversine 공식)</li>
                  <li>길찾기 버튼 클릭 → 네이버맵 길찾기 연동</li>
                  <li>위도/경도 기반 지도 표시</li>
                  <li>주변 서비스 검색 (반경 내)</li>
                </ul>
                <p style={{ marginBottom: '0.5rem' }}><strong style={{ color: 'var(--text-color)' }}>사용자 시나리오:</strong></p>
                <ol style={{ marginLeft: '1.5rem', marginBottom: '0.5rem' }}>
                  <li>내 위치 확인 (GPS 또는 수동 입력)</li>
                  <li>각 서비스까지의 거리 표시 (Haversine 공식)</li>
                  <li>길찾기 버튼 클릭 → 네이버맵 길찾기 연동</li>
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
              <h3 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>위치 서비스 정보</h3>
              <div style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}>
                <p style={{ marginBottom: '0.5rem' }}>병원, 카페, 공원, 펫샵 등 다양한 위치 서비스 정보를 제공합니다.</p>
                <p style={{ marginBottom: '0.5rem' }}><strong style={{ color: 'var(--text-color)' }}>주요 기능:</strong></p>
                <ul style={{ marginLeft: '1.5rem', marginBottom: '0.5rem' }}>
                  <li>병원, 카페, 공원, 펫샵 등 POI 정보</li>
                  <li>주소, 좌표, 영업시간, 전화번호</li>
                  <li>반려동물 동반 가능 여부</li>
                  <li>반려동물 정책 정보</li>
                  <li>카테고리별 서비스 검색</li>
                </ul>
                <p style={{ marginTop: '0.5rem', fontStyle: 'italic', color: 'var(--text-muted)' }}>스크린샷/영상: [추가 예정]</p>
              </div>
            </div>

            <div style={{
              padding: '1.5rem',
              backgroundColor: 'var(--card-bg)',
              borderRadius: '8px',
              border: '1px solid var(--nav-border)'
            }}>
              <h3 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>위치 서비스 리뷰 시스템</h3>
              <div style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}>
                <p style={{ marginBottom: '0.5rem' }}>사용자가 위치 서비스에 대한 리뷰를 작성하고 평점을 관리할 수 있습니다.</p>
                <p style={{ marginBottom: '0.5rem' }}><strong style={{ color: 'var(--text-color)' }}>주요 기능:</strong></p>
                <ul style={{ marginLeft: '1.5rem', marginBottom: '0.5rem' }}>
                  <li>평점 (1-5점) 및 후기 작성</li>
                  <li>평균 평점 자동 계산</li>
                  <li>리뷰 수 집계</li>
                  <li>리뷰 작성 시 평균 평점 자동 업데이트</li>
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
          border: '1px solid var(--nav-border)',
          marginBottom: '1.5rem'
        }}>
          <MermaidDiagram chart={entityDiagram} />
        </div>

        <div style={{
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
            <div>• idx (PK), name, category (병원/카페/공원/펫샵 등)</div>
            <div>• address, detailAddress, latitude, longitude</div>
            <div>• rating (평균 평점), phone, openingTime, closingTime</div>
            <div>• imageUrl, website, description</div>
            <div>• petFriendly, petPolicy</div>
            <div style={{ marginTop: '0.5rem' }}><strong style={{ color: 'var(--text-color)' }}>연관관계:</strong></div>
            <div>• OneToMany → LocationServiceReview</div>
            <div>• 폴리모픽 → AttachmentFile (FileTargetType.LOCATION_SERVICE)</div>
          </div>
        </div>

        <div style={{
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
        
        <div style={{
          padding: '1.5rem',
          backgroundColor: 'var(--card-bg)',
          borderRadius: '8px',
          border: '1px solid var(--nav-border)',
          marginBottom: '1rem'
        }}>
          <h3 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>LocationServiceService</h3>
          <div style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}>
            <div style={{ marginBottom: '0.5rem' }}><strong style={{ color: 'var(--text-color)' }}>위치 서비스 관리:</strong></div>
            <div>• createLocationService() - 위치 서비스 생성</div>
            <div>• getAllLocationServices() - 목록 조회 (페이징, 카테고리 필터)</div>
            <div>• searchByLocation() - 위치 기반 검색 (반경 내)</div>
            <div>• getLocationService() - 상세 조회</div>
            <div>• updateLocationService() - 수정</div>
            <div>• deleteLocationService() - 삭제</div>
            <div style={{ marginTop: '1rem', marginBottom: '0.5rem' }}><strong style={{ color: 'var(--text-color)' }}>위치 기반 검색:</strong></div>
            <div>• calculateDistance() - Haversine 공식으로 거리 계산</div>
            <div>• findWithinRadius() - 반경 내 서비스 조회</div>
          </div>
        </div>

        <div style={{
          padding: '1.5rem',
          backgroundColor: 'var(--card-bg)',
          borderRadius: '8px',
          border: '1px solid var(--nav-border)'
        }}>
          <h3 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>LocationServiceReviewService</h3>
          <div style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}>
            <div>• createReview() - 리뷰 작성</div>
            <div>• getReviewsByService() - 리뷰 목록 조회 (서비스별)</div>
            <div>• getReviewsByUser() - 리뷰 목록 조회 (사용자별)</div>
            <div>• updateReview() - 리뷰 수정</div>
            <div>• deleteReview() - 리뷰 삭제</div>
            <div>• updateServiceRating() - 평균 평점 계산 및 업데이트</div>
          </div>
        </div>
      </section>

          {/* 10. 보안 및 권한 체계 */}
          <section id="security" style={{ marginBottom: '3rem', scrollMarginTop: '2rem' }}>
            <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>보안 및 권한 체계</h2>
            <div style={{
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
                <li>• <strong style={{ color: 'var(--text-color)' }}>리뷰 작성 권한</strong>: 일반 사용자만 리뷰 작성 가능</li>
                <li>• <strong style={{ color: 'var(--text-color)' }}>서비스 관리 권한</strong>: 관리자만 위치 서비스 생성/수정/삭제 가능</li>
              </ul>
            </div>
          </section>

          {/* 11. 다른 도메인과의 연관관계 */}
          <section id="relationships" style={{ marginBottom: '3rem', scrollMarginTop: '2rem' }}>
            <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>다른 도메인과의 연관관계</h2>
        
        <div style={{
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
        
        <div style={{
          padding: '1.5rem',
          backgroundColor: 'var(--card-bg)',
          borderRadius: '8px',
          border: '1px solid var(--nav-border)',
          marginBottom: '1rem'
        }}>
          <h3 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>위치 서비스 (/api/location/services)</h3>
          <div style={{ 
            color: 'var(--text-secondary)',
            lineHeight: '1.8',
            fontFamily: 'monospace',
            fontSize: '0.9rem'
          }}>
            <div>• GET / - 목록 조회 (페이징, 카테고리 필터)</div>
            <div>• GET /{'{id}'} - 상세 조회</div>
            <div>• POST / - 생성 (관리자)</div>
            <div>• PUT /{'{id}'} - 수정 (관리자)</div>
            <div>• DELETE /{'{id}'} - 삭제 (관리자)</div>
            <div>• GET /nearby - 위치 기반 검색 (반경 내)</div>
            <div>• GET /popular - 인기 서비스 (평점 기준)</div>
          </div>
        </div>

        <div style={{
          padding: '1.5rem',
          backgroundColor: 'var(--card-bg)',
          borderRadius: '8px',
          border: '1px solid var(--nav-border)'
        }}>
          <h3 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>위치 서비스 리뷰 (/api/location/services/{'{serviceId}'}/reviews)</h3>
          <div style={{ 
            color: 'var(--text-secondary)',
            lineHeight: '1.8',
            fontFamily: 'monospace',
            fontSize: '0.9rem'
          }}>
            <div>• GET / - 리뷰 목록</div>
            <div>• POST / - 리뷰 작성</div>
            <div>• PUT /{'{reviewId}'} - 리뷰 수정</div>
            <div>• DELETE /{'{reviewId}'} - 리뷰 삭제</div>
            <div>• GET /me - 내 리뷰 목록</div>
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
