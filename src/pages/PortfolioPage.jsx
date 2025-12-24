import { Link } from 'react-router-dom';

function PortfolioPage() {
  const projects = [
    {
      id: 'petory',
      name: 'Petory',
      description: '반려동물 통합 플랫폼',
      link: '/portfolio/petory',
      techStack: ['Spring Boot', 'React', 'MySQL', 'Redis']
    },
    {
      id: 'linkup',
      name: 'LinkUp',
      description: '프로젝트 설명을 입력해주세요',
      link: '/portfolio/linkup',
      techStack: ['기술 스택을 입력해주세요']
    }
  ];

  return (
    <div style={{ padding: '2rem 0', maxWidth: '1200px', margin: '0 auto' }}>
      {/* 페이지 헤더 */}
      <div className="page-header">
        <h1>포트폴리오</h1>
        <p>Portfolio</p>
      </div>

      {/* 프로젝트 목록 */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '2rem',
        marginTop: '3rem'
      }}>
        {projects.map((project) => (
          <Link
            key={project.id}
            to={project.link}
            className="project-card"
          >
            <h2>{project.name}</h2>
            <p className="project-description">
              {project.description}
            </p>
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '0.5rem'
            }}>
              {project.techStack.map((tech, idx) => (
                <span key={idx} className="tech-badge">
                  {tech}
                </span>
              ))}
            </div>
          </Link>
        ))}
      </div>

      {/* 네비게이션 링크 */}
      <div style={{
        textAlign: 'center',
        marginTop: '3rem',
        paddingTop: '2rem',
        borderTop: '2px solid var(--nav-border)',
        display: 'flex',
        gap: '1rem',
        justifyContent: 'center',
        flexWrap: 'wrap'
      }}>
        <Link to="/" className="primary-button">
          ← 홈으로
        </Link>
      </div>
    </div>
  );
}

export default PortfolioPage;

