import { Link } from 'react-router-dom';
import { useTheme } from '../../contexts/ThemeContext';

function Navigation() {
  const { theme, toggleTheme } = useTheme();

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
          <Link to="/" style={{ textDecoration: 'none', color: 'var(--text-color)', fontWeight: 'bold' }}>
            홈
          </Link>
          <Link to="/portfolio" style={{ textDecoration: 'none', color: 'var(--text-color)' }}>
            포트폴리오
          </Link>
          <Link to="/performance" style={{ textDecoration: 'none', color: 'var(--text-color)' }}>
            성능 개선
          </Link>
          <Link to="/docs" style={{ textDecoration: 'none', color: 'var(--text-color)' }}>
            문서
          </Link>
          <span style={{ color: 'var(--text-muted)' }}>|</span>
          <Link to="/domains/user" style={{ textDecoration: 'none', color: 'var(--text-secondary)' }}>
            유저 서비스
          </Link>
          <Link to="/domains/board" style={{ textDecoration: 'none', color: 'var(--text-secondary)' }}>
            게시판 서비스
          </Link>
          <Link to="/domains/care" style={{ textDecoration: 'none', color: 'var(--text-secondary)' }}>
            케어
          </Link>
          <Link to="/domains/missing-pet" style={{ textDecoration: 'none', color: 'var(--text-secondary)' }}>
            실종 제보 
          </Link>
          <Link to="/domains/location" style={{ textDecoration: 'none', color: 'var(--text-secondary)' }}>
            위치 기반 서비스
          </Link>
          <Link to="/domains/meetup" style={{ textDecoration: 'none', color: 'var(--text-secondary)' }}>
            만남 서비스
          </Link>
          <Link to="/domains/chat" style={{ textDecoration: 'none', color: 'var(--text-secondary)' }}>
            채팅 서비스
          </Link>
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

