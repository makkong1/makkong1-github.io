import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <div style={{
      padding: '2rem 0',
      maxWidth: '1200px',
      margin: '0 auto'
    }}>
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h1 style={{
          fontSize: '3.5rem',
          marginBottom: '1rem',
          color: 'var(--text-color)'
        }}>
          Petory
        </h1>
        <p style={{
          fontSize: '1.25rem',
          color: 'var(--text-secondary)',
          marginBottom: '2rem'
        }}>
          반려동물 커뮤니티 플랫폼
        </p>
      </div>
      
      <div style={{
        padding: '2rem',
        backgroundColor: 'var(--card-bg)',
        borderRadius: '8px',
        border: '1px solid var(--nav-border)',
        marginBottom: '2rem'
      }}>
        <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>프로젝트 개요</h2>
        <p style={{ lineHeight: '1.8', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
          <strong style={{ color: 'var(--text-color)' }}>Petory</strong>는 반려동물 종합 플랫폼으로, 게시판, 펫케어 요청, 실종 동물 찾기, 오프라인 모임 등 다양한 기능을 제공합니다.
        </p>
        
        <h3 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>기술 스택</h3>
        <ul style={{ 
          listStyle: 'none', 
          padding: 0,
          color: 'var(--text-secondary)',
          lineHeight: '1.8',
          marginBottom: '1.5rem'
        }}>
          <li>• <strong style={{ color: 'var(--text-color)' }}>Framework</strong>: Spring Boot 3.x</li>
          <li>• <strong style={{ color: 'var(--text-color)' }}>Language</strong>: Java 17+</li>
          <li>• <strong style={{ color: 'var(--text-color)' }}>ORM</strong>: Spring Data JPA (Hibernate)</li>
          <li>• <strong style={{ color: 'var(--text-color)' }}>Database</strong>: MySQL 8.0</li>
          <li>• <strong style={{ color: 'var(--text-color)' }}>Security</strong>: Spring Security + JWT</li>
          <li>• <strong style={{ color: 'var(--text-color)' }}>Cache</strong>: Redis(Spring Cache 연동)</li>
          <li>• <strong style={{ color: 'var(--text-color)' }}>Scheduling</strong>: Spring Scheduler</li>
        </ul>

        <h3 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>핵심 기능</h3>
        <ul style={{ 
          listStyle: 'none', 
          padding: 0,
          color: 'var(--text-secondary)',
          lineHeight: '1.8'
        }}>
          <li>• 게시판 (커뮤니티, 인기글 스냅샷)</li>
          <li>• 펫케어 요청/지원 시스템</li>
          <li>• 실종 동물 신고 및 찾기</li>
          <li>• 공공데이터 기반 위치 서비스 (병원, 카페 등)</li>
          <li>• 오프라인 모임</li>
          <li>• 사용자 신고 및 제재 시스템</li>
          <li>• 알림 시스템</li>
          <li>• 통계 수집</li>
        </ul>
      </div>

      <div style={{
        padding: '2rem',
        backgroundColor: 'var(--card-bg)',
        borderRadius: '8px',
        border: '1px solid var(--nav-border)',
        marginBottom: '2rem'
      }}>
        <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>도메인별 상세 문서</h2>
        
        <h3 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>핵심 도메인</h3>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '1rem',
          marginBottom: '2rem'
        }}>
          <Link
            to="/domains/user"
            style={{
              display: 'block',
              padding: '1rem',
              backgroundColor: 'var(--bg-color)',
              borderRadius: '6px',
              border: '1px solid var(--nav-border)',
              textDecoration: 'none',
              color: 'inherit',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--card-bg)';
              e.currentTarget.style.borderColor = 'var(--link-color)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--bg-color)';
              e.currentTarget.style.borderColor = 'var(--nav-border)';
            }}
          >
            <strong style={{ color: 'var(--text-color)' }}>User</strong>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginTop: '0.9rem' }}>
              사용자, 반려동물, 소셜 로그인, 제재 관리
            </p>
          </Link>
          <Link
            to="/domains/board"
            style={{
              display: 'block',
              padding: '1rem',
              backgroundColor: 'var(--bg-color)',
              borderRadius: '6px',
              border: '1px solid var(--nav-border)',
              textDecoration: 'none',
              color: 'inherit',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--card-bg)';
              e.currentTarget.style.borderColor = 'var(--link-color)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--bg-color)';
              e.currentTarget.style.borderColor = 'var(--nav-border)';
            }}
          >
            <strong style={{ color: 'var(--text-color)' }}>Board</strong>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginTop: '0.9rem' }}>
              커뮤니티 게시판, 댓글, 반응, 인기글
            </p>
          </Link>
          <Link
            to="/domains/care"
            style={{
              display: 'block',
              padding: '1rem',
              backgroundColor: 'var(--bg-color)',
              borderRadius: '6px',
              border: '1px solid var(--nav-border)',
              textDecoration: 'none',
              color: 'inherit',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--card-bg)';
              e.currentTarget.style.borderColor = 'var(--link-color)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--bg-color)';
              e.currentTarget.style.borderColor = 'var(--nav-border)';
            }}
          >
            <strong style={{ color: 'var(--text-color)' }}>Care</strong>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginTop: '0.9rem' }}>
              펫케어 요청, 지원, 댓글, 리뷰
            </p>
          </Link>
          <Link
            to="/domains/missing-pet"
            style={{
              display: 'block',
              padding: '1rem',
              backgroundColor: 'var(--bg-color)',
              borderRadius: '6px',
              border: '1px solid var(--nav-border)',
              textDecoration: 'none',
              color: 'inherit',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--card-bg)';
              e.currentTarget.style.borderColor = 'var(--link-color)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--bg-color)';
              e.currentTarget.style.borderColor = 'var(--nav-border)';
            }}
          >
            <strong style={{ color: 'var(--text-color)' }}>Missing Pet</strong>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginTop: '0.9rem' }}>
              실종 동물 신고 및 관리
            </p>
          </Link>
          <Link
            to="/domains/location"
            style={{
              display: 'block',
              padding: '1rem',
              backgroundColor: 'var(--bg-color)',
              borderRadius: '6px',
              border: '1px solid var(--nav-border)',
              textDecoration: 'none',
              color: 'inherit',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--card-bg)';
              e.currentTarget.style.borderColor = 'var(--link-color)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--bg-color)';
              e.currentTarget.style.borderColor = 'var(--nav-border)';
            }}
          >
            <strong style={{ color: 'var(--text-color)' }}>Location</strong>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginTop: '0.9rem' }}>
              공공데이터 기반 위치 서비스
            </p>
          </Link>
          <Link
            to="/domains/meetup"
            style={{
              display: 'block',
              padding: '1rem',
              backgroundColor: 'var(--bg-color)',
              borderRadius: '6px',
              border: '1px solid var(--nav-border)',
              textDecoration: 'none',
              color: 'inherit',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--card-bg)';
              e.currentTarget.style.borderColor = 'var(--link-color)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--bg-color)';
              e.currentTarget.style.borderColor = 'var(--nav-border)';
            }}
          >
            <strong style={{ color: 'var(--text-color)' }}>Meetup</strong>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginTop: '0.9rem' }}>
              오프라인 모임
            </p>
          </Link>
          <Link
            to="/domains/chat"
            style={{
              display: 'block',
              padding: '1rem',
              backgroundColor: 'var(--bg-color)',
              borderRadius: '6px',
              border: '1px solid var(--nav-border)',
              textDecoration: 'none',
              color: 'inherit',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--card-bg)';
              e.currentTarget.style.borderColor = 'var(--link-color)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--bg-color)';
              e.currentTarget.style.borderColor = 'var(--nav-border)';
            }}
          >
            <strong style={{ color: 'var(--text-color)' }}>Chat</strong>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginTop: '0.9rem' }}>
              실시간 채팅 시스템
            </p>
          </Link>
        </div>

        <h3 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>지원 도메인</h3>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '1rem'
        }}>
          <div style={{
            padding: '1rem',
            backgroundColor: 'var(--bg-color)',
            borderRadius: '6px',
            border: '1px solid var(--nav-border)'
          }}>
            <strong style={{ color: 'var(--text-color)' }}>Notification</strong>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginTop: '0.9rem' }}>
              알림 시스템
            </p>
          </div>
          <div style={{
            padding: '1rem',
            backgroundColor: 'var(--bg-color)',
            borderRadius: '6px',
            border: '1px solid var(--nav-border)'
          }}>
            <strong style={{ color: 'var(--text-color)' }}>Report</strong>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginTop: '0.9rem' }}>
              신고 및 제재 시스템
            </p>
          </div>
          <div style={{
            padding: '1rem',
            backgroundColor: 'var(--bg-color)',
            borderRadius: '6px',
            border: '1px solid var(--nav-border)'
          }}>
            <strong style={{ color: 'var(--text-color)' }}>File</strong>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginTop: '0.9rem' }}>
              파일 업로드/다운로드
            </p>
          </div>
          <div style={{
            padding: '1rem',
            backgroundColor: 'var(--bg-color)',
            borderRadius: '6px',
            border: '1px solid var(--nav-border)'
          }}>
            <strong style={{ color: 'var(--text-color)' }}>Activity</strong>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginTop: '0.9rem' }}>
              사용자 활동 로그
            </p>
          </div>
          <div style={{
            padding: '1rem',
            backgroundColor: 'var(--bg-color)',
            borderRadius: '6px',
            border: '1px solid var(--nav-border)'
          }}>
            <strong style={{ color: 'var(--text-color)' }}>Statistics</strong>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginTop: '0.9rem' }}>
              일별 통계 수집
            </p>
          </div>
        </div>
      </div>

      <div style={{
        padding: '2rem',
        backgroundColor: 'var(--card-bg)',
        borderRadius: '8px',
        border: '1px solid var(--nav-border)'
      }}>
        <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>아키텍처 특징</h2>
        
        <div style={{ marginBottom: '1.5rem' }}>
          <h3 style={{ marginBottom: '0.5rem', color: 'var(--text-color)' }}>1. 레이어드 아키텍처</h3>
          <ul style={{ 
            listStyle: 'none', 
            padding: 0,
            color: 'var(--text-secondary)',
            lineHeight: '1.8'
          }}>
            <li>• <strong style={{ color: 'var(--text-color)' }}>Controller</strong>: REST API 엔드포인트</li>
            <li>• <strong style={{ color: 'var(--text-color)' }}>Service</strong>: 비즈니스 로직</li>
            <li>• <strong style={{ color: 'var(--text-color)' }}>Repository</strong>: 데이터 액세스</li>
            <li>• <strong style={{ color: 'var(--text-color)' }}>Entity</strong>: JPA 엔티티</li>
            <li>• <strong style={{ color: 'var(--text-color)' }}>DTO</strong>: 데이터 전송 객체</li>
            <li>• <strong style={{ color: 'var(--text-color)' }}>Converter</strong>: Entity ↔ DTO 변환</li>
          </ul>
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <h3 style={{ marginBottom: '0.5rem', color: 'var(--text-color)' }}>2. 도메인 주도 설계 (DDD)</h3>
          <ul style={{ 
            listStyle: 'none', 
            padding: 0,
            color: 'var(--text-secondary)',
            lineHeight: '1.8'
          }}>
            <li>• 도메인별 패키지 구조로 응집도 향상</li>
            <li>• 명확한 도메인 경계와 책임 분리</li>
          </ul>
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <h3 style={{ marginBottom: '0.5rem', color: 'var(--text-color)' }}>3. 성능 최적화 전략</h3>
          <ul style={{ 
            listStyle: 'none', 
            padding: 0,
            color: 'var(--text-secondary)',
            lineHeight: '1.8'
          }}>
            <li>• <strong style={{ color: 'var(--text-color)' }}>캐싱</strong>: Spring Cache를 활용한 조회 성능 향상</li>
            <li>• <strong style={{ color: 'var(--text-color)' }}>배치 쿼리</strong>: N+1 문제 해결을 위한 IN 절 배치 조회</li>
            <li>• <strong style={{ color: 'var(--text-color)' }}>비동기 처리</strong>: @EnableAsync를 통한 비동기 작업</li>
            <li>• <strong style={{ color: 'var(--text-color)' }}>스케줄링</strong>: 주기적 작업 자동화</li>
          </ul>
        </div>

        <div>
          <h3 style={{ marginBottom: '0.5rem', color: 'var(--text-color)' }}>4. 보안</h3>
          <ul style={{ 
            listStyle: 'none', 
            padding: 0,
            color: 'var(--text-secondary)',
            lineHeight: '1.8'
          }}>
            <li>• JWT 기반 인증/인가</li>
            <li>• Spring Security 통합</li>
            <li>• 소프트 삭제를 통한 데이터 보존</li>
            <li>• 사용자 제재 시스템</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default HomePage;

