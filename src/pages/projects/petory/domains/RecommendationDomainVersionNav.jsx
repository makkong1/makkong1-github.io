import { Link } from 'react-router-dom';

const linkStyle = (active) => ({
  padding: '0.35rem 0.75rem',
  borderRadius: '6px',
  fontSize: '0.82rem',
  fontWeight: 600,
  textDecoration: 'none',
  color: active ? 'var(--text-color)' : 'var(--text-secondary)',
  backgroundColor: active ? 'var(--card-bg)' : 'transparent',
  border: active ? '1px solid var(--nav-border)' : '1px solid transparent',
});

function RecommendationDomainVersionNav({ current = 'v2' }) {
  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        gap: '0.5rem',
        marginBottom: '1.25rem',
        padding: '0.65rem 0.85rem',
        borderRadius: '8px',
        backgroundColor: 'var(--bg-color)',
        border: '1px solid var(--nav-border)',
      }}
    >
      <span
        style={{
          fontSize: '0.78rem',
          fontWeight: 600,
          color: 'var(--text-secondary)',
          marginRight: '0.25rem',
        }}
      >
        Recommendation 도메인 페이지
      </span>
      <Link to="/domains/recommendation" style={linkStyle(current === 'v2')}>
        현재 버전
      </Link>
    </div>
  );
}

export default RecommendationDomainVersionNav;
