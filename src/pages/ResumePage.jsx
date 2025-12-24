import { Link } from 'react-router-dom';

function ResumePage() {
  return (
    <div style={{ padding: '2rem 0', maxWidth: '900px', margin: '0 auto' }}>
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
          이력서
        </h1>
        <p style={{
          fontSize: '1rem',
          color: 'var(--text-secondary)'
        }}>
          Resume
        </p>
      </div>

      {/* 개인 정보 섹션 */}
      <section style={{
        padding: '2rem',
        backgroundColor: 'var(--card-bg)',
        borderRadius: '8px',
        border: '1px solid var(--nav-border)',
        marginBottom: '2rem'
      }}>
        <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>개인 정보</h2>
        <p style={{ color: 'var(--text-secondary)' }}>
          내용을 입력해주세요
        </p>
      </section>

      {/* 경력 섹션 */}
      <section style={{
        padding: '2rem',
        backgroundColor: 'var(--card-bg)',
        borderRadius: '8px',
        border: '1px solid var(--nav-border)',
        marginBottom: '2rem'
      }}>
        <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>경력</h2>
        <p style={{ color: 'var(--text-secondary)' }}>
          내용을 입력해주세요
        </p>
      </section>

      {/* 기술 스택 섹션 */}
      <section style={{
        padding: '2rem',
        backgroundColor: 'var(--card-bg)',
        borderRadius: '8px',
        border: '1px solid var(--nav-border)',
        marginBottom: '2rem'
      }}>
        <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>기술 스택</h2>
        <p style={{ color: 'var(--text-secondary)' }}>
          내용을 입력해주세요
        </p>
      </section>

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
          to="/portfolio"
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
          포트폴리오 보기 →
        </Link>
      </div>
    </div>
  );
}

export default ResumePage;

