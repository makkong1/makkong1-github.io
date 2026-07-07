import { Link, useLocation } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';

const DOMAINS = [
  ['User', '/domains/user'],
  ['Board', '/domains/board'],
  ['Care', '/domains/care'],
  ['Missing Pet', '/domains/missing-pet'],
  ['Location', '/domains/location'],
  ['Recommendation', '/domains/recommendation'],
  ['Meetup', '/domains/meetup'],
  ['Chat', '/domains/chat'],
];

function Navigation() {
  const location = useLocation();
  const path = location.pathname;
  const [openDomains, setOpenDomains] = useState(false);
  const dropdownRef = useRef(null);

  const isHome = path === '/';
  const isPetoryProject = path === '/portfolio/petory';
  const isInfraPage = path === '/infra';
  const isFlowsPage = path === '/domains/flows';
  const isDomainPage = path.startsWith('/domains/') && !isFlowsPage;

  // 현재 보고 있는 도메인이 있으면 토글 라벨을 그 도메인명으로 표시
  const currentDomain = DOMAINS.find(
    ([, to]) => path === to || path.startsWith(`${to}/`),
  );
  const domainLabel = currentDomain ? currentDomain[0] : 'Domains';

  useEffect(() => {
    const onScroll = () =>
      document
        .querySelector('.nav')
        ?.classList.toggle('scrolled', window.scrollY > 8);
    window.addEventListener('scroll', onScroll);
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // 라우트 변경 시 드롭다운 닫기
  useEffect(() => {
    setOpenDomains(false);
  }, [path]);

  // 바깥 클릭 / ESC 시 드롭다운 닫기
  useEffect(() => {
    if (!openDomains) return;
    const onPointerDown = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpenDomains(false);
      }
    };
    const onKey = (e) => {
      if (e.key === 'Escape') setOpenDomains(false);
    };
    document.addEventListener('mousedown', onPointerDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onPointerDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [openDomains]);

  return (
    <nav className="nav">
      <div className="nav-container">
        <div className="nav-links-group">
          <Link to="/" className={`nav-link brand ${isHome ? 'active' : ''}`}>
            Home
          </Link>
          {isHome && (
            <>
              <a href="#about" className="nav-link">
                About
              </a>
              <a href="#portfolio" className="nav-link">
                Projects
              </a>
            </>
          )}
          <Link
            to="/portfolio/petory"
            className={`nav-link ${isPetoryProject ? 'active' : ''}`}
          >
            Petory
          </Link>
          <div className="nav-dropdown" ref={dropdownRef}>
            <button
              type="button"
              className={`nav-link nav-dropdown-toggle ${isDomainPage ? 'active' : ''}`}
              onClick={() => setOpenDomains((v) => !v)}
              aria-expanded={openDomains}
            >
              {domainLabel} ▾
            </button>
            {openDomains && (
              <div className="nav-dropdown-menu glass">
                {DOMAINS.map(([label, to]) => (
                  <Link
                    key={to}
                    to={to}
                    className={`nav-drop-item ${path.startsWith(to) ? 'active' : ''}`}
                    onClick={() => setOpenDomains(false)}
                  >
                    {label}
                  </Link>
                ))}
              </div>
            )}
          </div>
          <Link
            to="/domains/flows"
            className={`nav-link ${isFlowsPage ? 'active' : ''}`}
          >
            Flows
          </Link>
          <Link to="/infra" className={`nav-link ${isInfraPage ? 'active' : ''}`}>
            Infra
          </Link>
          <Link to="/demo" className="nav-link brand">
            🎮 Live Demo
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navigation;
