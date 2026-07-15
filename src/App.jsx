import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import Layout from './components/Layout/Layout';
import HomePage from './pages/HomePage';
import PetoryProjectPage from './pages/projects/petory/PetoryProjectPage';
import PetoryFlowsPage from './pages/projects/petory/PetoryFlowsPage';
import PetoryRefactoringPage from './pages/projects/petory/PetoryRefactoringPage';
import OverFetchingDetail from './pages/projects/petory/domains/OverFetchingDetail';
import DeepPagePaginationDetail from './pages/projects/petory/domains/DeepPagePaginationDetail';
import MCPFilesPage from './pages/MCPFilesPage';
import DemoPage from './pages/DemoPage';
import InfraPage from './pages/InfraPage';
// 도메인 페이지들 (V2 — 현재 기본)
// import UserDomain from './pages/projects/petory/domains/UserDomain';
import UserDomainV2 from './pages/projects/petory/domains/UserDomainV2';
import UserDomainDetail from './pages/projects/petory/domains/UserDomainDetail';
// import BoardDomain from './pages/projects/petory/domains/BoardDomain';
import BoardDomainV2 from './pages/projects/petory/domains/BoardDomainV2';
import BoardDomainDetail from './pages/projects/petory/domains/BoardDomainDetail';
// import CareDomain from './pages/projects/petory/domains/CareDomain';
import CareDomainV2 from './pages/projects/petory/domains/CareDomainV2';
import CareDomainDetail from './pages/projects/petory/domains/CareDomainDetail';
// import MissingPetDomain from './pages/projects/petory/domains/MissingPetDomain';
import MissingPetDomainV2 from './pages/projects/petory/domains/MissingPetDomainV2';
import MissingPetDomainDetail from './pages/projects/petory/domains/MissingPetDomainDetail';
// import LocationDomain from './pages/projects/petory/domains/LocationDomain';
import LocationDomainV2 from './pages/projects/petory/domains/LocationDomainV2';
import LocationDomainDetail from './pages/projects/petory/domains/LocationDomainDetail';
// import RecommendationDomain from './pages/projects/petory/domains/RecommendationDomain';
import RecommendationDomainV2 from './pages/projects/petory/domains/RecommendationDomainV2';
import RecommendationDomainDetail from './pages/projects/petory/domains/RecommendationDomainDetail';
// import MeetupDomain from './pages/projects/petory/domains/MeetupDomain';
import MeetupDomainV2 from './pages/projects/petory/domains/MeetupDomainV2';
import MeetupDomainDetail from './pages/projects/petory/domains/MeetupDomainDetail';
// import ChatDomain from './pages/projects/petory/domains/ChatDomain';
import ChatDomainV2 from './pages/projects/petory/domains/ChatDomainV2';
import ChatDomainDetail from './pages/projects/petory/domains/ChatDomainDetail';
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
            <Route path="/domains/flows" element={<PetoryFlowsPage />} />
            <Route path="/domains/refactoring" element={<PetoryRefactoringPage />} />
            <Route path="/domains/refactoring/over-fetching" element={<OverFetchingDetail />} />
            <Route path="/domains/refactoring/deep-page" element={<DeepPagePaginationDetail />} />
            {/* 라이브 데모 페이지 */}
            <Route path="/demo" element={<DemoPage />} />
            
            {/* 도메인 페이지들 (V2 기본) */}
            <Route path="/domains/user" element={<UserDomainV2 />} />
            <Route path="/domains/user/detail" element={<UserDomainDetail />} />
            {/* opt/refac 통합 → detail 로 리다이렉트 (기존 URL 보존) */}
            <Route path="/domains/user/optimization" element={<Navigate to="/domains/user/detail" replace />} />
            <Route path="/domains/user/refactoring" element={<Navigate to="/domains/user/detail" replace />} />
            <Route path="/domains/board" element={<BoardDomainV2 />} />
            <Route path="/domains/board/detail" element={<BoardDomainDetail />} />
            {/* opt/refac 통합 → detail 로 리다이렉트 (기존 URL 보존) */}
            <Route path="/domains/board/optimization" element={<Navigate to="/domains/board/detail" replace />} />
            <Route path="/domains/board/refactoring" element={<Navigate to="/domains/board/detail" replace />} />
            <Route path="/domains/care" element={<CareDomainV2 />} />
            <Route path="/domains/care/detail" element={<CareDomainDetail />} />
            {/* opt/refac 통합 → detail 로 리다이렉트 (기존 URL 보존) */}
            <Route path="/domains/care/optimization" element={<Navigate to="/domains/care/detail" replace />} />
            <Route path="/domains/care/refactoring" element={<Navigate to="/domains/care/detail" replace />} />
            <Route path="/domains/missing-pet" element={<MissingPetDomainV2 />} />
            <Route path="/domains/missing-pet/detail" element={<MissingPetDomainDetail />} />
            {/* opt/refac 통합 → detail 로 리다이렉트 (기존 URL 보존) */}
            <Route path="/domains/missing-pet/optimization" element={<Navigate to="/domains/missing-pet/detail" replace />} />
            <Route path="/domains/missing-pet/refactoring" element={<Navigate to="/domains/missing-pet/detail" replace />} />
            <Route path="/domains/location" element={<LocationDomainV2 />} />
            <Route path="/domains/location/detail" element={<LocationDomainDetail />} />
            {/* opt/refac 통합 → detail 로 리다이렉트 (기존 URL 보존) */}
            <Route path="/domains/location/optimization" element={<Navigate to="/domains/location/detail" replace />} />
            <Route path="/domains/location/refactoring" element={<Navigate to="/domains/location/detail" replace />} />
            <Route path="/domains/recommendation" element={<RecommendationDomainV2 />} />
            <Route path="/domains/recommendation/detail" element={<RecommendationDomainDetail />} />
            {/* opt/refac 통합 → detail 로 리다이렉트 (기존 URL 보존) */}
            <Route path="/domains/recommendation/optimization" element={<Navigate to="/domains/recommendation/detail" replace />} />
            <Route path="/domains/recommendation/refactoring" element={<Navigate to="/domains/recommendation/detail" replace />} />
            <Route path="/domains/meetup" element={<MeetupDomainV2 />} />
            <Route path="/domains/meetup/detail" element={<MeetupDomainDetail />} />
            {/* opt/refac 통합 → detail 로 리다이렉트 (기존 URL 보존) */}
            <Route path="/domains/meetup/optimization" element={<Navigate to="/domains/meetup/detail" replace />} />
            <Route path="/domains/meetup/refactoring" element={<Navigate to="/domains/meetup/detail" replace />} />
            <Route path="/domains/chat" element={<ChatDomainV2 />} />
            <Route path="/domains/chat/detail" element={<ChatDomainDetail />} />
            {/* opt/refac 통합 → detail 로 리다이렉트 (기존 URL 보존) */}
            <Route path="/domains/chat/optimization" element={<Navigate to="/domains/chat/detail" replace />} />
            <Route path="/domains/chat/refactoring" element={<Navigate to="/domains/chat/detail" replace />} />
            
            {/* 배포 & 인프라 페이지 */}
            <Route path="/infra" element={<InfraPage />} />

            {/* MCP 파일 링크 페이지 */}
            <Route path="/docs" element={<MCPFilesPage />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
