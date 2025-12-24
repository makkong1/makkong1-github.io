import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import Layout from './components/Layout/Layout';
import HomePage from './pages/HomePage';
import ResumePage from './pages/ResumePage';
import PortfolioPage from './pages/PortfolioPage';
import PetoryProjectPage from './pages/projects/PetoryProjectPage';
import LinkupProjectPage from './pages/projects/LinkupProjectPage';
import PerformancePage from './pages/PerformancePage';
import MCPFilesPage from './pages/MCPFilesPage';
import DemoPage from './pages/DemoPage';
// 도메인 페이지들
import UserDomain from './pages/domains/UserDomain';
import BoardDomain from './pages/domains/BoardDomain';
import CareDomain from './pages/domains/CareDomain';
import MissingPetDomain from './pages/domains/MissingPetDomain';
import LocationDomain from './pages/domains/LocationDomain';
import MeetupDomain from './pages/domains/MeetupDomain';
import ChatDomain from './pages/domains/ChatDomain';
import './styles/global.css';

function App() {
  // 모킹은 main.jsx에서 이미 초기화됨

  return (
    <ThemeProvider>
      <BrowserRouter basename="/makkong1-github.io">
        <Layout>
          <Routes>
            {/* 메인 페이지 */}
            <Route path="/" element={<HomePage />} />
            
            {/* 이력서 페이지 */}
            <Route path="/resume" element={<ResumePage />} />
            
            {/* 포트폴리오 페이지 */}
            <Route path="/portfolio" element={<PortfolioPage />} />
            <Route path="/portfolio/petory" element={<PetoryProjectPage />} />
            <Route path="/portfolio/linkup" element={<LinkupProjectPage />} />
            
            {/* 라이브 데모 페이지 */}
            <Route path="/demo" element={<DemoPage />} />
            
            {/* 도메인 페이지들 */}
            <Route path="/domains/user" element={<UserDomain />} />
            <Route path="/domains/board" element={<BoardDomain />} />
            <Route path="/domains/care" element={<CareDomain />} />
            <Route path="/domains/missing-pet" element={<MissingPetDomain />} />
            <Route path="/domains/location" element={<LocationDomain />} />
            <Route path="/domains/meetup" element={<MeetupDomain />} />
            <Route path="/domains/chat" element={<ChatDomain />} />
            
            {/* 성능 개선 페이지 */}
            <Route path="/performance" element={<PerformancePage />} />
            
            {/* MCP 파일 링크 페이지 */}
            <Route path="/docs" element={<MCPFilesPage />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
