function HomePage() {
  return (
    <div style={{
      padding: '2rem 0',
      textAlign: 'center'
    }}>
      <h1 style={{
        fontSize: '3.5rem',
        marginBottom: '1rem',
        color: 'var(--text-color)'
      }}>
        Petory
      </h1>
      <p style={{
        fontSize: '1.25rem',
        color: 'var(--text-secondary)',
        marginBottom: '3rem'
      }}>
        반려동물 종합 서비스 플랫폼
      </p>
      
      <div style={{
        maxWidth: '800px',
        margin: '0 auto',
        padding: '2rem',
        backgroundColor: 'var(--card-bg)',
        borderRadius: '8px',
        textAlign: 'left',
        transition: 'background-color 0.3s ease'
      }}>
        <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>프로젝트 소개</h2>
        <p style={{ lineHeight: '1.8', color: 'var(--text-secondary)' }}>
          Petory는 반려동물을 키우는 사람들을 위한 종합 서비스 플랫폼입니다.
          {/* 나중에 더 자세한 컨텐츠 추가 */}
        </p>
      </div>
    </div>
  );
}

export default HomePage;

