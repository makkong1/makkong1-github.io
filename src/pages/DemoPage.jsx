import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import DemoBanner from '../components/Portfolio/DemoBanner';
import { AuthProvider } from '../demo/contexts/AuthContext';
import { ThemeProvider as DemoThemeProvider } from '../demo/contexts/ThemeContext';
import Navigation from '../demo/components/Layout/Navigation';

// Petory Components
import HomePage from '../demo/components/Home/HomePage';
import LocationServiceMap from '../demo/components/LocationService/LocationServiceMap';
import CareRequestList from '../demo/components/CareRequest/CareRequestList';
import MissingPetBoardPage from '../demo/components/MissingPet/MissingPetBoardPage';
import MeetupPage from '../demo/components/Meetup/MeetupPage';
import CommunityBoard from '../demo/components/Community/CommunityBoard';
import ActivityPage from '../demo/components/Activity/ActivityPage';
import AdminPanel from '../demo/components/Admin/AdminPanel';

// LinkUp Components
import LinkUpGallery from '../demo/components/LinkUp/LinkUpGallery';

function DemoPage() {
  const [searchParams] = useSearchParams();
  const currentProject = searchParams.get('project') === 'linkup' ? 'linkup' : 'petory';
  const [activeTab, setActiveTab] = useState('home');

  // 데모 페이지 마운트 시 포트폴리오 테마 상태 저장
  useEffect(() => {
    // 포트폴리오의 data-theme 속성 저장
    const portfolioTheme = document.documentElement.getAttribute('data-theme');
    sessionStorage.setItem('portfolio-theme-backup', portfolioTheme || 'light');
    
    // cleanup: 언마운트 시 포트폴리오 테마 복원
    return () => {
      const savedTheme = sessionStorage.getItem('portfolio-theme-backup');
      if (savedTheme) {
        document.documentElement.setAttribute('data-theme', savedTheme);
        sessionStorage.removeItem('portfolio-theme-backup');
      }
    };
  }, []);

  // 탭 변경 시 스크롤 상단으로
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activeTab]);

  const renderPetoryContent = () => {
    switch (activeTab) {
      case 'home': return <HomePage setActiveTab={setActiveTab} />;
      case 'location-services': return <LocationServiceMap />;
      case 'care-requests': return <CareRequestList />;
      case 'missing-pets': return <MissingPetBoardPage />;
      case 'meetup': return <MeetupPage />;
      case 'community': return <CommunityBoard />;
      case 'activity': return <ActivityPage />;
      case 'admin': return <AdminPanel />;
      default: return <HomePage setActiveTab={setActiveTab} />;
    }
  };

  const renderLinkUpContent = () => {
    // LinkUp은 탭 구분 없이 갤러리 하나만 보여줍니다.
    return <LinkUpGallery />;
  };

  return (
    <>
      <DemoBanner />
      <DemoThemeProvider>
        <AuthProvider>
          <div 
            data-demo-container
            style={{ 
              minHeight: '100vh',
              isolation: 'isolate' // 데모 컨테이너를 별도 스택킹 컨텍스트로 분리
            }}
          >
            <Navigation 
              activeTab={activeTab} 
              setActiveTab={setActiveTab}
              user={null}
              onNavigateToBoard={() => setActiveTab('community')}
              currentProject={currentProject}
            />
            <div style={{ paddingTop: '60px' }}>
              {currentProject === 'linkup' ? renderLinkUpContent() : renderPetoryContent()}
            </div>
          </div>
        </AuthProvider>
      </DemoThemeProvider>
    </>
  );
}

export default DemoPage;

