import { useState } from 'react';
import DemoBanner from '../components/Portfolio/DemoBanner';
import { AuthProvider } from '../demo/contexts/AuthContext';
import { ThemeProvider as DemoThemeProvider } from '../demo/contexts/ThemeContext';
import Navigation from '../demo/components/Layout/Navigation';
import HomePage from '../demo/components/Home/HomePage';
import LocationServiceMap from '../demo/components/LocationService/LocationServiceMap';
import CareRequestList from '../demo/components/CareRequest/CareRequestList';
import MissingPetBoardPage from '../demo/components/MissingPet/MissingPetBoardPage';
import MeetupPage from '../demo/components/Meetup/MeetupPage';
import CommunityBoard from '../demo/components/Community/CommunityBoard';
import ActivityPage from '../demo/components/Activity/ActivityPage';
import AdminPanel from '../demo/components/Admin/AdminPanel';

function DemoPage() {
  const [activeTab, setActiveTab] = useState('home');

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return <HomePage setActiveTab={setActiveTab} />;
      case 'location-services':
        return <LocationServiceMap />;
      case 'care-requests':
        return <CareRequestList />;
      case 'missing-pets':
        return <MissingPetBoardPage />;
      case 'meetup':
        return <MeetupPage />;
      case 'community':
        return <CommunityBoard />;
      case 'activity':
        return <ActivityPage />;
      case 'admin':
        return <AdminPanel />;
      default:
        return <HomePage setActiveTab={setActiveTab} />;
    }
  };

  return (
    <>
      <DemoBanner />
      <DemoThemeProvider>
        <AuthProvider>
          <div style={{ minHeight: '100vh', backgroundColor: 'var(--bg-color, #ffffff)' }}>
            <Navigation 
              activeTab={activeTab} 
              setActiveTab={setActiveTab}
              user={null}
              onNavigateToBoard={() => setActiveTab('community')}
            />
            <div style={{ paddingTop: '60px' }}>
              {renderContent()}
            </div>
          </div>
        </AuthProvider>
      </DemoThemeProvider>
    </>
  );
}

export default DemoPage;

