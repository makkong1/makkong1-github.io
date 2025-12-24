import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../../contexts/ThemeContext';

function Navigation() {
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const path = location.pathname;

  // 경로별 네비게이션 결정
  const isHome = path === '/';
  const isPortfolio = path === '/portfolio';
  const isPetoryProject = path === '/portfolio/petory';
  const isLinkupProject = path === '/portfolio/linkup';
  const isDomainPage = path.startsWith('/domains/');
  const isDemoPage = path === '/demo';
  const isDocsPage = path === '/docs';

  // 메인 네비게이션 (항상 표시)
  // 메인 페이지(/)가 이력서이므로 홈에서는 이력서 링크 숨김
  const renderMainNav = () => (
    <>
      <Link to="/" style={{ textDecoration: 'none', color: 'var(--text-color)', fontWeight: 'bold' }}>
        홈 
      </Link>
      {!isHome && !isPortfolio && !isPetoryProject && !isLinkupProject && (
        <Link to="/portfolio" style={{ textDecoration: 'none', color: 'var(--text-color)', fontWeight: 'bold' }}>
          포트폴리오
        </Link>
      )}
      {isHome && (
        <>
          <span style={{ color: 'var(--text-muted)' }}>|</span>
          <a href="#personal-info" style={{ textDecoration: 'none', color: 'var(--text-secondary)' }}>
            개인 정보
          </a>
          <a href="#portfolio" style={{ textDecoration: 'none', color: 'var(--text-secondary)' }}>
            포트폴리오
          </a>
        </>
      )}
    </>
  );

  // 펫토리 프로젝트 네비게이션
  const renderPetoryNav = () => (
    <>
      <Link to="/portfolio" style={{ textDecoration: 'none', color: 'var(--text-color)', fontWeight: 'bold' }}>
        ← 포트폴리오
      </Link>
      <span style={{ color: 'var(--text-muted)' }}>|</span>
      <span style={{ color: 'var(--text-color)', fontWeight: 'bold' }}>Petory</span>
      <span style={{ color: 'var(--text-muted)' }}>|</span>
      <Link to="/domains/user" style={{ textDecoration: 'none', color: 'var(--text-secondary)' }}>
        유저
      </Link>
      <Link to="/domains/board" style={{ textDecoration: 'none', color: 'var(--text-secondary)' }}>
        게시판
      </Link>
      <Link to="/domains/care" style={{ textDecoration: 'none', color: 'var(--text-secondary)' }}>
        펫케어
      </Link>
      <Link to="/domains/missing-pet" style={{ textDecoration: 'none', color: 'var(--text-secondary)' }}>
        실종 신고
      </Link>
      <Link to="/domains/location" style={{ textDecoration: 'none', color: 'var(--text-secondary)' }}>
        위치 서비스
      </Link>
      <Link to="/domains/meetup" style={{ textDecoration: 'none', color: 'var(--text-secondary)' }}>
        모임
      </Link>
      <Link to="/domains/chat" style={{ textDecoration: 'none', color: 'var(--text-secondary)' }}>
        채팅
      </Link>
      <span style={{ color: 'var(--text-muted)' }}>|</span>
      <Link to="/demo" style={{ textDecoration: 'none', color: 'var(--text-color)' }}>
        🎮 라이브 데모
      </Link>
      <Link to="/docs" style={{ textDecoration: 'none', color: 'var(--text-color)' }}>
        문서
      </Link>
    </>
  );

  // 링크업 프로젝트 네비게이션
  const renderLinkupNav = () => (
    <>
      <Link to="/portfolio" style={{ textDecoration: 'none', color: 'var(--text-color)', fontWeight: 'bold' }}>
        ← 포트폴리오
      </Link>
      <span style={{ color: 'var(--text-muted)' }}>|</span>
      <span style={{ color: 'var(--text-color)', fontWeight: 'bold' }}>LinkUp</span>
    </>
  );

  // 도메인 페이지 네비게이션
  const renderDomainNav = () => (
    <>
      <Link to="/portfolio/petory" style={{ textDecoration: 'none', color: 'var(--text-color)', fontWeight: 'bold' }}>
        ← Petory
      </Link>
      <span style={{ color: 'var(--text-muted)' }}>|</span>
      <Link to="/domains/user" style={{ textDecoration: 'none', color: path === '/domains/user' ? 'var(--link-color)' : 'var(--text-secondary)' }}>
        유저
      </Link>
      <Link to="/domains/board" style={{ textDecoration: 'none', color: path === '/domains/board' ? 'var(--link-color)' : 'var(--text-secondary)' }}>
        게시판
      </Link>
      <Link to="/domains/care" style={{ textDecoration: 'none', color: path === '/domains/care' ? 'var(--link-color)' : 'var(--text-secondary)' }}>
        펫케어
      </Link>
      <Link to="/domains/missing-pet" style={{ textDecoration: 'none', color: path === '/domains/missing-pet' ? 'var(--link-color)' : 'var(--text-secondary)' }}>
        실종 신고
      </Link>
      <Link to="/domains/location" style={{ textDecoration: 'none', color: path === '/domains/location' ? 'var(--link-color)' : 'var(--text-secondary)' }}>
        위치 서비스
      </Link>
      <Link to="/domains/meetup" style={{ textDecoration: 'none', color: path === '/domains/meetup' ? 'var(--link-color)' : 'var(--text-secondary)' }}>
        모임
      </Link>
      <Link to="/domains/chat" style={{ textDecoration: 'none', color: path === '/domains/chat' ? 'var(--link-color)' : 'var(--text-secondary)' }}>
        채팅
      </Link>
      <span style={{ color: 'var(--text-muted)' }}>|</span>
      <Link to="/demo" style={{ textDecoration: 'none', color: 'var(--text-color)' }}>
        🎮 라이브 데모
      </Link>
      <Link to="/docs" style={{ textDecoration: 'none', color: 'var(--text-color)' }}>
        문서
      </Link>
    </>
  );

  // 기본 네비게이션 (데모, 문서 등)
  const renderDefaultNav = () => (
    <>
      <Link to="/demo" style={{ textDecoration: 'none', color: 'var(--text-color)' }}>
        🎮 라이브 데모
      </Link>
      <Link to="/docs" style={{ textDecoration: 'none', color: 'var(--text-color)' }}>
        문서
      </Link>
    </>
  );

  return (
    <nav style={{
      padding: '1rem',
      backgroundColor: 'var(--nav-bg)',
      borderBottom: '1px solid var(--nav-border)',
      transition: 'background-color 0.3s ease, border-color 0.3s ease'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'flex',
        gap: '1.5rem', 
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
          {renderMainNav()}
          {isPortfolio && (
            <>
              <span style={{ color: 'var(--text-muted)' }}>|</span>
              {renderDefaultNav()}
            </>
          )}
          {isPetoryProject && (
            <>
              <span style={{ color: 'var(--text-muted)' }}>|</span>
              {renderPetoryNav()}
            </>
          )}
          {isLinkupProject && (
            <>
              <span style={{ color: 'var(--text-muted)' }}>|</span>
              {renderLinkupNav()}
            </>
          )}
          {isDomainPage && (
            <>
              <span style={{ color: 'var(--text-muted)' }}>|</span>
              {renderDomainNav()}
            </>
          )}
          {(isDemoPage || isDocsPage) && (
            <>
              <span style={{ color: 'var(--text-muted)' }}>|</span>
              {renderDefaultNav()}
            </>
          )}
        </div>
        <button
          onClick={toggleTheme}
          style={{
            padding: '0.5rem 1rem',
            border: '1px solid var(--nav-border)',
            borderRadius: '6px',
            backgroundColor: 'var(--card-bg)',
            color: 'var(--text-color)',
            cursor: 'pointer',
            fontSize: '0.9rem',
            transition: 'all 0.3s ease'
          }}
          title={theme === 'light' ? '다크 모드로 전환' : '라이트 모드로 전환'}
        >
          {theme === 'light' ? '🌙' : '☀️'}
        </button>
      </div>
    </nav>
  );
}

export default Navigation;

