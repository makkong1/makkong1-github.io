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
      <div style={{
        textAlign: 'center',
        marginBottom: '3rem',
        paddingBottom: '2rem',
        borderBottom: '2px solid var(--nav-border)'
      }}>
        <h1 style={{
          fontSize: '2.5rem',
          marginBottom: '0.5rem',
          color: 'var(--text-color)',
          fontWeight: 'bold'
        }}>
          포트폴리오
        </h1>
        <p style={{
          fontSize: '1rem',
          color: 'var(--text-secondary)'
        }}>
          Portfolio
        </p>
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
            style={{
              display: 'block',
              padding: '2rem',
              backgroundColor: 'var(--card-bg)',
              borderRadius: '12px',
              border: '1px solid var(--nav-border)',
              textDecoration: 'none',
              color: 'inherit',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'var(--link-color)';
              e.currentTarget.style.transform = 'translateY(-4px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'var(--nav-border)';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            <h2 style={{
              marginBottom: '1rem',
              color: 'var(--text-color)',
              fontSize: '1.5rem'
            }}>
              {project.name}
            </h2>
            <p style={{
              fontSize: '1rem',
              color: 'var(--text-secondary)',
              marginBottom: '1.5rem',
              lineHeight: '1.6'
            }}>
              {project.description}
            </p>
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '0.5rem'
            }}>
              {project.techStack.map((tech, idx) => (
                <span
                  key={idx}
                  style={{
                    padding: '0.25rem 0.75rem',
                    backgroundColor: 'var(--bg-color)',
                    borderRadius: '12px',
                    fontSize: '0.85rem',
                    color: 'var(--text-secondary)'
                  }}
                >
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
        <Link
          to="/"
          style={{
            display: 'inline-block',
            padding: '0.75rem 1.5rem',
            backgroundColor: 'var(--card-bg)',
            color: 'var(--text-color)',
            borderRadius: '8px',
            textDecoration: 'none',
            fontSize: '0.9rem',
            fontWeight: '500',
            border: '1px solid var(--nav-border)',
            transition: 'all 0.2s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = 'var(--link-color)';
            e.currentTarget.style.transform = 'translateY(-2px)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = 'var(--nav-border)';
            e.currentTarget.style.transform = 'translateY(0)';
          }}
        >
          ← 홈으로
        </Link>
        <Link
          to="/resume"
          style={{
            display: 'inline-block',
            padding: '0.75rem 1.5rem',
            backgroundColor: 'var(--link-color)',
            color: 'white',
            borderRadius: '8px',
            textDecoration: 'none',
            fontSize: '0.9rem',
            fontWeight: '500',
            transition: 'all 0.2s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.opacity = '0.9';
            e.currentTarget.style.transform = 'translateY(-2px)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.opacity = '1';
            e.currentTarget.style.transform = 'translateY(0)';
          }}
        >
          이력서 보기 →
        </Link>
      </div>
    </div>
  );
}

export default PortfolioPage;

