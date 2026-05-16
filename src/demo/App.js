import React, { useState, useEffect } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Navigation from './components/Layout/Navigation';
import HomePage from './components/Home/HomePage';
import UserList from './components/User/UserList';
import CommunityBoard from './components/Community/CommunityBoard';
import LoginForm from './components/Auth/LoginForm';
import RegisterForm from './components/Auth/RegisterForm';
import AuthLayout from './components/Auth/AuthLayout';
import OAuth2Callback from './components/Auth/OAuth2Callback';
import AdminPanel from './components/Admin/AdminPanel';
import PermissionDeniedModal from './components/Common/PermissionDeniedModal';
import ScrollToTopBottom from './components/Common/ScrollToTopBottom';
import MissingPetBoardPage from './components/MissingPet/MissingPetBoardPage';
import ActivityPage from './components/Activity/ActivityPage';
import UnifiedPetMapPage from './components/UnifiedMap/UnifiedPetMapPage';
import TrendCategoryPage from './components/Recommendation/TrendCategoryPage';
import ChatWidget from './components/Chat/ChatWidget';
import EmailVerificationPage from './components/Auth/EmailVerificationPage';
import EmailVerificationPrompt from './components/Common/EmailVerificationPrompt.js';

function AppContent() {
  const { user, loading, isAuthenticated } = useAuth();
  const [activeTab, setActiveTab] = useState('home');
  const [authMode, setAuthMode] = useState('login');
  const [redirectToLogin, setRedirectToLogin] = useState(false);
  const [showGlobalPermissionModal, setShowGlobalPermissionModal] = useState(false);
  const [showGlobalEmailVerificationPrompt, setShowGlobalEmailVerificationPrompt] = useState(false);
  const [emailVerificationPurpose, setEmailVerificationPurpose] = useState(null);

  useEffect(() => {
    if (redirectToLogin && !isAuthenticated) {
      setAuthMode('login');
      setRedirectToLogin(false);
    }
  }, [redirectToLogin, isAuthenticated]);

  useEffect(() => {
    window.redirectToLogin = () => { setRedirectToLogin(true); };
    return () => { delete window.redirectToLogin; };
  }, []);

  useEffect(() => {
    const handleShowPermissionModal = () => setShowGlobalPermissionModal(true);
    window.addEventListener('showPermissionModal', handleShowPermissionModal);
    return () => window.removeEventListener('showPermissionModal', handleShowPermissionModal);
  }, []);

  useEffect(() => {
    const handleEmailVerificationRequired = (event) => {
      const { purpose } = event.detail;
      setEmailVerificationPurpose(purpose);
      setShowGlobalEmailVerificationPrompt(true);
    };
    window.addEventListener('emailVerificationRequired', handleEmailVerificationRequired);
    return () => window.removeEventListener('emailVerificationRequired', handleEmailVerificationRequired);
  }, []);

  const handleEmailVerificationConfirm = () => {
    const currentUrl = window.location.pathname + window.location.search;
    const redirectUrl = `/email-verification?redirect=${encodeURIComponent(currentUrl)}${emailVerificationPurpose ? `&purpose=${emailVerificationPurpose}` : ''}`;
    window.location.href = redirectUrl;
  };

  const handleEmailVerificationCancel = () => {
    setShowGlobalEmailVerificationPrompt(false);
    setEmailVerificationPurpose(null);
  };

  useEffect(() => {
    window.setActiveTab = (tab) => setActiveTab(tab);
    return () => { delete window.setActiveTab; };
  }, []);

  const [isOAuth2Callback] = useState(() => {
    if (typeof window === 'undefined') return false;
    const urlParams = new URLSearchParams(window.location.search);
    return window.location.pathname.includes('oauth2/callback') ||
      urlParams.has('accessToken') || urlParams.has('error');
  });

  const [isEmailVerificationPage] = useState(() => {
    if (typeof window === 'undefined') return false;
    const urlParams = new URLSearchParams(window.location.search);
    return window.location.pathname.includes('email-verification') ||
      window.location.pathname.includes('email-verify') ||
      urlParams.has('token');
  });

  if (loading) {
    return <LoadingContainer>로딩 중...</LoadingContainer>;
  }

  if (isEmailVerificationPage) return <EmailVerificationPage />;
  if (isOAuth2Callback) return <OAuth2Callback />;

  if (!isAuthenticated) {
    return (
      <AuthContainer>
        <AuthLayout
          mode={authMode}
          loginContent={<LoginForm onSwitchToRegister={() => setAuthMode('register')} />}
          registerContent={
            <RegisterForm
              onRegisterSuccess={() => setAuthMode('login')}
              onSwitchToLogin={() => setAuthMode('login')}
            />
          }
        />
      </AuthContainer>
    );
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'community':    return <CommunityBoard />;
      case 'missing-pets': return <MissingPetBoardPage />;
      case 'unified-map':  return <UnifiedPetMapPage />;
      case 'trends':       return <TrendCategoryPage />;
      case 'users':        return <UserList />;
      case 'admin':        return <AdminPanel />;
      case 'activity':     return <ActivityPage />;
      case 'home':
      default:             return <HomePage setActiveTab={setActiveTab} user={user} />;
    }
  };

  return (
    <AppContainer>
      <PermissionDeniedModal
        isOpen={showGlobalPermissionModal}
        onClose={() => setShowGlobalPermissionModal(false)}
      />
      <EmailVerificationPrompt
        isOpen={showGlobalEmailVerificationPrompt}
        onConfirm={handleEmailVerificationConfirm}
        onCancel={handleEmailVerificationCancel}
        purpose={emailVerificationPurpose}
      />
      <AppLayout>
        <Navigation activeTab={activeTab} setActiveTab={setActiveTab} user={user} />
        <ContentArea>{renderContent()}</ContentArea>
      </AppLayout>
      <ScrollToTopBottom />
      <ChatWidget />
    </AppContainer>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <GlobalStyle />
        <AppContent />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;

const GlobalStyle = createGlobalStyle`
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    transition: background-color 0.3s ease, color 0.3s ease;
  }
  ::-webkit-scrollbar { width: 8px; }
  ::-webkit-scrollbar-track { background: ${props => props.theme?.colors?.surface || '#f1f1f1'}; }
  ::-webkit-scrollbar-thumb { background: ${props => props.theme?.colors?.border || '#c1c1c1'}; border-radius: 4px; }
  ::-webkit-scrollbar-thumb:hover { background: ${props => props.theme?.colors?.primary || '#FF7E36'}; }
`;

const AppContainer = styled.div`
  min-height: 100vh;
  background: ${props => props.theme.colors.background};
  color: ${props => props.theme.colors.text};
  transition: all 0.3s ease;
`;

const AppLayout = styled.div`
  display: flex;
  min-height: 100vh;
`;

const ContentArea = styled.main`
  flex: 1;
  min-height: 100vh;
  background: ${props => props.theme.colors.background};
  @media (min-width: 769px) {
    margin-left: 240px;
    min-height: 100vh;
  }
  @media (max-width: 768px) {
    padding-top: env(safe-area-inset-top, 0px);
    padding-bottom: calc(60px + env(safe-area-inset-bottom, 0px));
    min-height: 100dvh;
  }
`;

const AuthContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 2rem;
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  font-size: 1.2rem;
  color: ${props => props.theme.colors.text};
`;
