/**
 * 데모 모드 배너 컴포넌트
 * 상단에 고정되어 데모 모드임을 명확히 표시
 */

function DemoBanner() {
  return (
    <div style={{
      position: 'sticky',
      top: 0,
      zIndex: 1000,
      backgroundColor: '#ff9800',
      color: '#fff',
      padding: '0.75rem 1rem',
      textAlign: 'center',
      fontSize: '0.9rem',
      fontWeight: 'bold',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      borderBottom: '2px solid #f57c00'
    }}>
      🎮 데모 모드 (더미 데이터) | 실제 백엔드 API는 GitHub 코드에서 확인 가능
    </div>
  );
}

export default DemoBanner;

