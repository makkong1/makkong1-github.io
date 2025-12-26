function MCPFilesPage() {
  const docsStructure = [
    {
      category: '아키텍처',
      path: 'architecture',
      files: [
        { name: '아키텍처 개요', file: 'overview.md' },
        { name: '도메인 간 연관관계', file: 'domain-relationships.md' },
        { name: '데이터베이스 ERD', file: 'erd.md' },
        { name: '채팅 시스템 설계', file: '채팅 시스템 설계.md' },
        { name: 'Redis 캐싱 전략', file: 'Redis_캐싱_전략.md' },
        { name: '위치서비스 공공데이터 CSV 배치 임포트', file: '위치서비스_공공데이터_CSV_배치_임포트_구현.md' },
        { name: '관리자 통계 시스템 전략', file: '# 관리자 통계 시스템 전략.md' },
        { name: '알림 시스템 전략 정리', file: '# 알림 시스템 전략 정리.md' },
        { name: '유저 제한 및 제재 시스템', file: '# 유저 제한 및 제재 시스템.md' }
      ]
    },
    {
      category: '도메인',
      path: 'domains',
      files: [
        { name: 'User 도메인', file: 'user.md' },
        { name: 'Board 도메인', file: 'board.md' },
        { name: 'Care 도메인', file: 'care.md' },
        { name: 'Missing Pet 도메인', file: 'missing-pet.md' },
        { name: 'Location 도메인', file: 'location.md' },
        { name: 'Meetup 도메인', file: 'meetup.md' },
        { name: 'Chat 도메인', file: 'chat.md' },
        { name: 'Notification 도메인', file: 'notification.md' },
        { name: 'Report 도메인', file: 'report.md' },
        { name: 'File 도메인', file: 'file.md' },
        { name: 'Activity 도메인', file: 'activity.md' },
        { name: 'Statistics 도메인', file: 'statistics.md' }
      ]
    },
    {
      category: '성능 최적화',
      path: 'performance',
      files: [
        { name: '쿼리 최적화', file: 'query-optimization.md' }
      ]
    },
    {
      category: '동시성 제어',
      path: 'concurrency',
      files: [
        { name: '동시성 제어 전략', file: 'control-strategies.md' },
        { name: '트랜잭션 동시성 케이스', file: 'transaction-concurrency-cases.md' }
      ]
    },
    {
      category: '기타 문서',
      path: 'md',
      files: [
        { name: '반려동물 기능 문서', file: '# 반려동물 기능 문서.md' },
        { name: '사용자 소프트 삭제 및 관리자 패널 개선', file: '# 사용자 소프트 삭제 및 관리자 패널 개선.md' },
        { name: '서버 사이드 페이징 구현 가이드', file: '# 서버 사이드 페이징 구현 가이드.md' },
        { name: '성능 테스트 및 문제 상황 재현 TODO', file: '# 성능 테스트 및 문제 상황 재현 TODO.md' },
        { name: '실시간 알림 시스템 구현 문서', file: '# 실시간 알림 시스템 구현 문서.md' },
        { name: '통계 집계 로직 구현 명세', file: '# 통계 집계 로직 구현 명세.md' },
        { name: '프론트엔드 게시글 데이터 구조 최적화', file: '# 프론트엔드 게시글 데이터 구조 최적화.md' },
        { name: '게시글 카운트 실시간 업데이트 구현', file: '게시글 카운트 실시간 업데이트 구현.md' },
        { name: '밴된 사용자 콘텐츠 필터링 구현', file: '밴된 사용자 콘텐츠 필터링 구현.md' },
        { name: '채팅 시스템 구현 차이점', file: '채팅_시스템_구현_차이점.md' },
        { name: '코드 흐름 가이드', file: '코드흐름가이드.md' },
        { name: 'md파일들 목록', file: 'md파일들 목록.md' }
      ]
    },
    {
      category: '루트 문서',
      path: '',
      files: [
        { name: 'README', file: 'README.md' },
        { name: '도메인별 컨텐츠 정리', file: '도메인별_컨텐츠_정리.md' },
        { name: 'GitHub Pages 구현 가이드', file: 'GitHub_Pages_구현_가이드.md' },
        { name: 'GitHub Pages 다음 단계 가이드', file: 'GitHub_Pages_다음_단계_가이드.md' },
        { name: 'GitHub Pages 포트폴리오 구현 계획', file: 'GitHub_Pages_포트폴리오_구현_계획.md' }
      ]
    }
  ];

  const getFileUrl = (categoryPath, fileName) => {
    const baseUrl = 'https://github.com/makkong1/makkong1-github.io/blob/main/docs';
    if (categoryPath) {
      return `${baseUrl}/${categoryPath}/${encodeURIComponent(fileName)}`;
    }
    return `${baseUrl}/${encodeURIComponent(fileName)}`;
  };

  return (
    <div style={{ padding: '2rem 0', maxWidth: '1200px', margin: '0 auto' }}>
      <h1 style={{ marginBottom: '2rem', color: 'var(--text-color)' }}>문서 목록</h1>
      
      {docsStructure.map((category, index) => (
        <div
        className="section-card"
          key={index}
          style={{
            marginBottom: '2rem',
            padding: '1.5rem',
            backgroundColor: 'var(--card-bg)',
            borderRadius: '8px',
            border: '1px solid var(--nav-border)'
          }}
        >
          <h2 style={{ 
            marginBottom: '1rem', 
            color: 'var(--text-color)',
            fontSize: '1.5rem'
          }}>
            {category.category}
          </h2>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '1rem'
          }}>
            {category.files.map((file, fileIndex) => (
              <a
                key={fileIndex}
                href={getFileUrl(category.path, file.file)}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'block',
                  padding: '1rem',
                  backgroundColor: 'var(--bg-color)',
                  borderRadius: '6px',
                  border: '1px solid var(--nav-border)',
                  textDecoration: 'none',
                  color: 'var(--text-color)',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--card-bg)';
                  e.currentTarget.style.borderColor = 'var(--link-color)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--bg-color)';
                  e.currentTarget.style.borderColor = 'var(--nav-border)';
                }}
              >
                <div style={{ fontWeight: '500', marginBottom: '0.25rem' }}>
                  {file.name}
                </div>
                <div style={{ 
                  fontSize: '0.85rem', 
                  color: 'var(--text-muted)',
                  fontFamily: 'monospace'
                }}>
                  {category.path ? `${category.path}/` : ''}{file.file}
                </div>
              </a>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default MCPFilesPage;

