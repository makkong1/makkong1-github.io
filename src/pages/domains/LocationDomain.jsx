import MermaidDiagram from '../../components/Common/MermaidDiagram';
import TableOfContents from '../../components/Common/TableOfContents';

function LocationDomain() {
  const sections = [
    { id: 'intro', title: '도메인 소개' },
    { id: 'features', title: '주요 기능' },
    { id: 'entities', title: 'Entity 구조' },
    { id: 'services', title: 'Service 주요 기능' },
    { id: 'business', title: '비즈니스 로직' },
    { id: 'performance', title: '성능 최적화' },
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
          
          <section id="intro" style={{ marginBottom: '3rem', scrollMarginTop: '2rem' }}>
            <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>도메인 소개</h2>
        <p style={{ lineHeight: '1.8', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
          위치 기반 서비스 (병원, 카페, 공원, 펫샵 등) 정보 제공 및 리뷰 관리 도메인입니다.
        </p>
        <p style={{ lineHeight: '1.8', color: 'var(--text-secondary)' }}>
          POI 검색, 리뷰 작성, 평점 관리, 위치 기반 검색 기능을 제공합니다.
        </p>
      </section>

          <section id="features" style={{ marginBottom: '3rem', scrollMarginTop: '2rem' }}>
            <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>주요 기능</h2>
        
        <div style={{ 
          display: 'grid', 
          gap: '1.5rem',
          gridTemplateColumns: 'repeat(2, 1fr)'
        }}>
          <div style={{
            padding: '1.5rem',
            backgroundColor: 'var(--card-bg)',
            borderRadius: '8px',
            border: '1px solid var(--nav-border)'
          }}>
            <h3 style={{ marginBottom: '0.5rem', color: 'var(--text-color)' }}>위치 서비스 정보</h3>
            <ul style={{ 
              listStyle: 'none', 
              padding: 0,
              color: 'var(--text-secondary)',
              lineHeight: '1.8'
            }}>
              <li>• 병원, 카페, 공원, 펫샵 등 POI 정보</li>
              <li>• 주소, 좌표, 영업시간, 전화번호</li>
              <li>• 반려동물 동반 가능 여부</li>
              <li>• 반려동물 정책 정보</li>
            </ul>
          </div>

          <div style={{
            padding: '1.5rem',
            backgroundColor: 'var(--card-bg)',
            borderRadius: '8px',
            border: '1px solid var(--nav-border)'
          }}>
            <h3 style={{ marginBottom: '0.5rem', color: 'var(--text-color)' }}>리뷰 시스템</h3>
            <ul style={{ 
              listStyle: 'none', 
              padding: 0,
              color: 'var(--text-secondary)',
              lineHeight: '1.8'
            }}>
              <li>• 평점 (1-5점) 및 후기 작성</li>
              <li>• 평균 평점 자동 계산</li>
              <li>• 리뷰 수 집계</li>
              <li>• 리뷰 작성 시 평균 평점 자동 업데이트</li>
            </ul>
          </div>

          <div style={{
            padding: '1.5rem',
            backgroundColor: 'var(--card-bg)',
            borderRadius: '8px',
            border: '1px solid var(--nav-border)'
          }}>
            <h3 style={{ marginBottom: '0.5rem', color: 'var(--text-color)' }}>지도 연동</h3>
            <ul style={{ 
              listStyle: 'none', 
              padding: 0,
              color: 'var(--text-secondary)',
              lineHeight: '1.8'
            }}>
              <li>• 위도/경도 기반 지도 표시</li>
              <li>• 주변 서비스 검색</li>
              <li>• Spatial Index 활용</li>
            </ul>
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

          <section id="business" style={{ marginBottom: '3rem', scrollMarginTop: '2rem' }}>
            <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>비즈니스 로직</h2>
        
        <div style={{
          padding: '1.5rem',
          backgroundColor: 'var(--card-bg)',
          borderRadius: '8px',
          border: '1px solid var(--nav-border)'
        }}>
          <h3 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>평균 평점 계산</h3>
          <div style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}>
            <div>리뷰 작성/수정/삭제 시 자동 업데이트</div>
            <div style={{ marginTop: '0.5rem' }}>AVG(rating) 쿼리로 계산</div>
            <div style={{ marginTop: '0.5rem' }}>LocationService의 rating 필드에 저장</div>
          </div>
        </div>
      </section>

          <section id="performance" style={{ marginBottom: '3rem', scrollMarginTop: '2rem' }}>
            <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>성능 최적화</h2>
        
        <div style={{
          padding: '1.5rem',
          backgroundColor: 'var(--card-bg)',
          borderRadius: '8px',
          border: '1px solid var(--nav-border)',
          marginBottom: '1rem'
        }}>
          <h3 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>인덱싱</h3>
          <ul style={{ 
            listStyle: 'none', 
            padding: 0,
            color: 'var(--text-secondary)',
            lineHeight: '1.8',
            fontFamily: 'monospace',
            fontSize: '0.9rem'
          }}>
            <li>• Spatial Index: 위치 기반 검색</li>
            <li>• 카테고리별 조회 인덱스</li>
            <li>• 평점 정렬 인덱스</li>
            <li>• 리뷰 조회 인덱스 (서비스별, 사용자별)</li>
          </ul>
        </div>

        <div style={{
          padding: '1.5rem',
          backgroundColor: 'var(--card-bg)',
          borderRadius: '8px',
          border: '1px solid var(--nav-border)',
          marginBottom: '1rem'
        }}>
          <h3 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>캐싱</h3>
          <ul style={{ 
            listStyle: 'none', 
            padding: 0,
            color: 'var(--text-secondary)',
            lineHeight: '1.8'
          }}>
            <li>• <strong style={{ color: 'var(--text-color)' }}>인기 위치 서비스 캐싱</strong>: 카테고리별 인기 서비스 목록</li>
          </ul>
        </div>

        <div style={{
          padding: '1.5rem',
          backgroundColor: 'var(--card-bg)',
          borderRadius: '8px',
          border: '1px solid var(--nav-border)'
        }}>
          <h3 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>N+1 문제 해결</h3>
          <ul style={{ 
            listStyle: 'none', 
            padding: 0,
            color: 'var(--text-secondary)',
            lineHeight: '1.8'
          }}>
            <li>• <strong style={{ color: 'var(--text-color)' }}>Fetch Join</strong>: 리뷰와 작성자 정보를 함께 조회</li>
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
