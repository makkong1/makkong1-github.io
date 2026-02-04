import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import Layout from './components/Layout/Layout';
import HomePage from './pages/HomePage';
import PetoryProjectPage from './pages/projects/petory/PetoryProjectPage';
import LinkupProjectPage from './pages/projects/linkup/LinkupProjectPage';
import MCPFilesPage from './pages/MCPFilesPage';
import DemoPage from './pages/DemoPage';
// 도메인 페이지들
import UserDomain from './pages/projects/petory/domains/UserDomain';
import UserDomainOptimization from './pages/projects/petory/domains/UserDomainOptimization';
import BoardDomain from './pages/projects/petory/domains/BoardDomain';
import BoardDomainOptimization from './pages/projects/petory/domains/BoardDomainOptimization';
import CareDomain from './pages/projects/petory/domains/CareDomain';
import CareDomainOptimization from './pages/projects/petory/domains/CareDomainOptimization';
import MissingPetDomain from './pages/projects/petory/domains/MissingPetDomain';
import MissingPetDomainOptimization from './pages/projects/petory/domains/MissingPetDomainOptimization';
import LocationDomain from './pages/projects/petory/domains/LocationDomain';
import LocationDomainOptimization from './pages/projects/petory/domains/LocationDomainOptimization';
import LocationDomainRefactoring from './pages/projects/petory/domains/LocationDomainRefactoring';
import MeetupDomain from './pages/projects/petory/domains/MeetupDomain';
import MeetupDomainOptimization from './pages/projects/petory/domains/MeetupDomainOptimization';
import ChatDomain from './pages/projects/petory/domains/ChatDomain';
import ChatDomainOptimization from './pages/projects/petory/domains/ChatDomainOptimization';
import './styles/global.css';

function App() {
  // 모킹은 main.jsx에서 이미 초기화됨

  return (
    <ThemeProvider>
      <BrowserRouter basename="/makkong1-github.io">
        <Layout>
          <Routes>
            {/* 메인 페이지 (이력서) */}
            <Route path="/" element={<HomePage />} />
            
            {/* 포트폴리오 페이지 */}
            <Route path="/portfolio/petory" element={<PetoryProjectPage />} />
            <Route path="/portfolio/linkup" element={<LinkupProjectPage />} />
            
            {/* 라이브 데모 페이지 */}
            <Route path="/demo" element={<DemoPage />} />
            
            {/* 도메인 페이지들 */}
            <Route path="/domains/user" element={<UserDomain />} />
            <Route path="/domains/user/optimization" element={<UserDomainOptimization />} />
            <Route path="/domains/board" element={<BoardDomain />} />
            <Route path="/domains/board/optimization" element={<BoardDomainOptimization />} />
            <Route path="/domains/care" element={<CareDomain />} />
            <Route path="/domains/care/optimization" element={<CareDomainOptimization />} />
            <Route path="/domains/missing-pet" element={<MissingPetDomain />} />
            <Route path="/domains/missing-pet/optimization" element={<MissingPetDomainOptimization />} />
            <Route path="/domains/location" element={<LocationDomain />} />
            <Route path="/domains/location/optimization" element={<LocationDomainOptimization />} />
            <Route path="/domains/location/refactoring" element={<LocationDomainRefactoring />} />
            <Route path="/domains/meetup" element={<MeetupDomain />} />
            <Route path="/domains/meetup/optimization" element={<MeetupDomainOptimization />} />
            <Route path="/domains/chat" element={<ChatDomain />} />
            <Route path="/domains/chat/optimization" element={<ChatDomainOptimization />} />
            
            {/* MCP 파일 링크 페이지 */}
            <Route path="/docs" element={<MCPFilesPage />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
