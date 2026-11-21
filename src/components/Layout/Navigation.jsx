import { Link, useLocation } from 'react-router-dom';

function Navigation() {
  const location = useLocation();
  const path = location.pathname;

  const isHome = path === '/';
  const isPetoryProject = path === '/portfolio/petory';
  const isCasesPage = path === '/domains/cases';
  const isFlowsPage = path === '/domains/flows';

  return (
    <nav className="nav">
      <div className="nav-container">
        <div className="nav-links-group">
          <Link to="/" className={`nav-link brand ${isHome ? 'active' : ''}`}>
            Home
          </Link>
          {isHome ? (
            <>
              <a href="#about" className="nav-link">
                About
              </a>
              <a href="#portfolio" className="nav-link">
                Projects
              </a>
            </>
          ) : (
            <>
              <Link
                to="/portfolio/petory"
                className={`nav-link ${isPetoryProject ? 'active' : ''}`}
              >
                Petory
              </Link>
              <Link
                to="/domains/cases"
                className={`nav-link ${isCasesPage ? 'active' : ''}`}
              >
                대표 사례
              </Link>
              <Link
                to="/domains/flows"
                className={`nav-link ${isFlowsPage ? 'active' : ''}`}
              >
                Flows
              </Link>
            </>
          )}
          <Link to="/demo" className="nav-link brand">
            🎮 Live Demo
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navigation;
