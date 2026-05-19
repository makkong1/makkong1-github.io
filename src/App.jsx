import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import Layout from './components/Layout/Layout';
import HomePage from './pages/HomePage';
import PetoryProjectPage from './pages/projects/petory/PetoryProjectPage';
import LinkupProjectPage from './pages/projects/linkup/LinkupProjectPage';
import MCPFilesPage from './pages/MCPFilesPage';
import DemoPage from './pages/DemoPage';
// 도메인 페이지들 (V2 — 현재 기본)
// import UserDomain from './pages/projects/petory/domains/UserDomain';
import UserDomainV2 from './pages/projects/petory/domains/UserDomainV2';
import UserDomainOptimization from './pages/projects/petory/domains/UserDomainOptimization';
import UserDomainRefactoring from './pages/projects/petory/domains/UserDomainRefactoring';
// import BoardDomain from './pages/projects/petory/domains/BoardDomain';
import BoardDomainV2 from './pages/projects/petory/domains/BoardDomainV2';
import BoardDomainOptimization from './pages/projects/petory/domains/BoardDomainOptimization';
import BoardDomainRefactoring from './pages/projects/petory/domains/BoardDomainRefactoring';
// import CareDomain from './pages/projects/petory/domains/CareDomain';
import CareDomainV2 from './pages/projects/petory/domains/CareDomainV2';
import CareDomainOptimization from './pages/projects/petory/domains/CareDomainOptimization';
import CareDomainRefactoring from './pages/projects/petory/domains/CareDomainRefactoring';
// import MissingPetDomain from './pages/projects/petory/domains/MissingPetDomain';
import MissingPetDomainV2 from './pages/projects/petory/domains/MissingPetDomainV2';
import MissingPetDomainOptimization from './pages/projects/petory/domains/MissingPetDomainOptimization';
import MissingPetDomainRefactoring from './pages/projects/petory/domains/MissingPetDomainRefactoring';
// import LocationDomain from './pages/projects/petory/domains/LocationDomain';
import LocationDomainV2 from './pages/projects/petory/domains/LocationDomainV2';
import LocationDomainOptimization from './pages/projects/petory/domains/LocationDomainOptimization';
import LocationDomainRefactoring from './pages/projects/petory/domains/LocationDomainRefactoring';
// import RecommendationDomain from './pages/projects/petory/domains/RecommendationDomain';
// import MeetupDomain from './pages/projects/petory/domains/MeetupDomain';
import MeetupDomainV2 from './pages/projects/petory/domains/MeetupDomainV2';
import MeetupDomainOptimization from './pages/projects/petory/domains/MeetupDomainOptimization';
import MeetupDomainRefactoring from './pages/projects/petory/domains/MeetupDomainRefactoring';
// import ChatDomain from './pages/projects/petory/domains/ChatDomain';
import ChatDomainV2 from './pages/projects/petory/domains/ChatDomainV2';
import ChatDomainOptimization from './pages/projects/petory/domains/ChatDomainOptimization';
import ChatDomainRefactoring from './pages/projects/petory/domains/ChatDomainRefactoring';
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
            
            {/* 도메인 페이지들 (V2 기본) */}
            <Route path="/domains/user" element={<UserDomainV2 />} />
            {/* <Route path="/domains/user/v2" element={<UserDomainV2 />} /> */}
            <Route path="/domains/user/optimization" element={<UserDomainOptimization />} />
            <Route path="/domains/user/refactoring" element={<UserDomainRefactoring />} />
            <Route path="/domains/board" element={<BoardDomainV2 />} />
            {/* <Route path="/domains/board/v2" element={<BoardDomainV2 />} /> */}
            <Route path="/domains/board/optimization" element={<BoardDomainOptimization />} />
            <Route path="/domains/board/refactoring" element={<BoardDomainRefactoring />} />
            <Route path="/domains/care" element={<CareDomainV2 />} />
            {/* <Route path="/domains/care/v2" element={<CareDomainV2 />} /> */}
            <Route path="/domains/care/optimization" element={<CareDomainOptimization />} />
            <Route path="/domains/care/refactoring" element={<CareDomainRefactoring />} />
            <Route path="/domains/missing-pet" element={<MissingPetDomainV2 />} />
            {/* <Route path="/domains/missing-pet/v2" element={<MissingPetDomainV2 />} /> */}
            <Route path="/domains/missing-pet/optimization" element={<MissingPetDomainOptimization />} />
            <Route path="/domains/missing-pet/refactoring" element={<MissingPetDomainRefactoring />} />
            <Route path="/domains/location" element={<LocationDomainV2 />} />
            {/* <Route path="/domains/location/v2" element={<LocationDomainV2 />} /> */}
            <Route path="/domains/location/optimization" element={<LocationDomainOptimization />} />
            <Route path="/domains/location/refactoring" element={<LocationDomainRefactoring />} />
            {/* <Route path="/domains/recommendation" element={<RecommendationDomain />} /> */}
            <Route path="/domains/meetup" element={<MeetupDomainV2 />} />
            {/* <Route path="/domains/meetup/v2" element={<MeetupDomainV2 />} /> */}
            <Route path="/domains/meetup/optimization" element={<MeetupDomainOptimization />} />
            <Route path="/domains/meetup/refactoring" element={<MeetupDomainRefactoring />} />
            <Route path="/domains/chat" element={<ChatDomainV2 />} />
            {/* <Route path="/domains/chat/v2" element={<ChatDomainV2 />} /> */}
            <Route path="/domains/chat/optimization" element={<ChatDomainOptimization />} />
            <Route path="/domains/chat/refactoring" element={<ChatDomainRefactoring />} />
            
            {/* MCP 파일 링크 페이지 */}
            <Route path="/docs" element={<MCPFilesPage />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
