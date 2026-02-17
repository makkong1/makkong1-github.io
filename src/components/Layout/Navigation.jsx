import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../../contexts/ThemeContext';

function Navigation() {
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const path = location.pathname;

  // 경로별 네비게이션 결정
  const isHome = path === '/';
  const isPetoryProject = path === '/portfolio/petory';
  const isLinkupProject = path === '/portfolio/linkup';
  const isDomainPage = path.startsWith('/domains/');
  const isDemoPage = path === '/demo';
  const isDocsPage = path === '/docs';

  // 메인 네비게이션 (항상 표시)
  // 메인 페이지(/)가 이력서이므로 홈에서는 이력서 링크 숨김
  const renderMainNav = () => (
    <>
      <Link to="/" className={`nav-link brand ${isHome ? 'active' : ''}`}>
        Home
      </Link>
      {isHome && (
        <>
          <span className="nav-separator">|</span>
          <a href="#about" className="nav-link">
            About Me
          </a>
          <a href="#portfolio" className="nav-link">
            Projects
          </a>
        </>
      )}
    </>
  );

  // 기본 네비게이션 (데모, 문서)
  const renderDefaultNav = () => (
    <>
      <Link to="/demo" className="nav-link brand">
        🎮 Live Demo
      </Link>
      {/* <Link to="/docs" className="nav-link brand">
        Docs
      </Link> */}
    </>
  );

  // 펫토리 프로젝트 네비게이션
  const renderPetoryNav = () => (
    <>
      <span className="nav-link brand">Petory</span>
      <span className="nav-arrow">→</span>
      <Link to="/domains/user" className="nav-link">
        User
      </Link>
      <Link to="/domains/board" className="nav-link">
        Board
      </Link>
      <Link to="/domains/care" className="nav-link">
        Care
      </Link>
      <Link to="/domains/missing-pet" className="nav-link">
        Missing Pet
      </Link>
      <Link to="/domains/location" className="nav-link">
        Location
      </Link>
      <Link to="/domains/meetup" className="nav-link">
        Meetup
      </Link>
      <Link to="/domains/chat" className="nav-link">
        Chat
      </Link>
      <span className="nav-separator">|</span>
      {renderDefaultNav()}
    </>
  );

  // 링크업 프로젝트 네비게이션
  const renderLinkupNav = () => (
    <>
      <span className="nav-link brand">LinkUp</span>
    </>
  );

  // 도메인 페이지 네비게이션
  const renderDomainNav = () => (
    <>
      <Link to="/portfolio/petory" className="nav-link brand">
        ← Petory
      </Link>
      <span className="nav-separator">|</span>
      <Link to="/domains/user" className={`nav-link ${path === '/domains/user' ? 'active' : ''}`}>
        User
      </Link>
      <Link to="/domains/board" className={`nav-link ${path === '/domains/board' || path.startsWith('/domains/board/') ? 'active' : ''}`}>
        Board
      </Link>
      <Link to="/domains/care" className={`nav-link ${path === '/domains/care' ? 'active' : ''}`}>
        Care
      </Link>
      <Link to="/domains/missing-pet" className={`nav-link ${path === '/domains/missing-pet' ? 'active' : ''}`}>
        Missing Pet
      </Link>
      <Link to="/domains/location" className={`nav-link ${path === '/domains/location' ? 'active' : ''}`}>
        Location
      </Link>
      <Link to="/domains/meetup" className={`nav-link ${path === '/domains/meetup' ? 'active' : ''}`}>
        Meetup
      </Link>
      <Link to="/domains/chat" className={`nav-link ${path === '/domains/chat' ? 'active' : ''}`}>
        Chat
      </Link>
      <span className="nav-separator">|</span>
      {renderDefaultNav()}
    </>
  );

  return (
    <nav className="nav">
      <div className="nav-container">
        <div className="nav-links-group">
          {renderMainNav()}
          {isPetoryProject && (
            <>
              <span className="nav-separator">|</span>
              {renderPetoryNav()}
            </>
          )}
          {isLinkupProject && (
            <>
              <span className="nav-separator">|</span>
              {renderLinkupNav()}
            </>
          )}
          {isDomainPage && (
            <>
              <span className="nav-separator">|</span>
              {renderDomainNav()}
            </>
          )}
          {(isDemoPage || isDocsPage) && (
            <>
              <span className="nav-separator">|</span>
              {renderDefaultNav()}
            </>
          )}
        </div>
        <button
          onClick={toggleTheme}
          className="theme-toggle-btn"
          title={theme === 'light' ? '다크 모드로 전환' : '라이트 모드로 전환'}
        >
          {theme === 'light' ? '🌙' : '☀️'}
        </button>
      </div>
    </nav>
  );
}

export default Navigation;