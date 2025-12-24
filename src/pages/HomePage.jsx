import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <div style={{ padding: '2rem 0', maxWidth: '900px', margin: '0 auto' }}>
      {/* 페이지 헤더 */}
      <div className="page-header">
        <h1>이력서</h1>
        <p>Resume</p>
      </div>

      {/* 개인 정보 섹션 */}
      <section id="personal-info" className="section-card">
        <h2>개인 정보</h2>
        <p>내용을 입력해주세요</p>
      </section>

      {/* 프로젝트 포트폴리오 섹션 */}
      <section id="portfolio" className="section-card">
        <h2>프로젝트</h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '1.5rem',
          marginTop: '1.5rem'
        }}>
          <Link
            to="/portfolio/petory"
            className="project-card"
          >
            <h3>Petory</h3>
            <p className="project-description">
              반려동물 통합 플랫폼
            </p>
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '0.5rem'
            }}>
              <span className="tech-badge">Spring Boot</span>
              <span className="tech-badge">React</span>
              <span className="tech-badge">MySQL</span>
              <span className="tech-badge">Redis</span>
            </div>
          </Link>
          <Link
            to="/portfolio/linkup"
            className="project-card"
          >
            <h3>LinkUp</h3>
            <p className="project-description">
              게시판 + 노션 스타일 콘텐츠 + 실시간 알림 + 소셜 로그인을 지원하는 커뮤니티 플랫폼
            </p>
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '0.5rem'
            }}>
              <span className="tech-badge">Spring Boot</span>
              <span className="tech-badge">Java 17</span>
              <span className="tech-badge">MySQL</span>
              <span className="tech-badge">Redis</span>
            </div>
          </Link>
        </div>
      </section>
    </div>
  );
}

export default HomePage;
