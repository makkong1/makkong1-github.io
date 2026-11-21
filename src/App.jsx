import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import Layout from './components/Layout/Layout';
import HomePage from './pages/HomePage';
import PetoryProjectPage from './pages/projects/petory/PetoryProjectPage';
import PetoryFlowsPage from './pages/projects/petory/PetoryFlowsPage';
import PetoryCasesPage from './pages/projects/petory/PetoryCasesPage';
import DemoPage from './pages/DemoPage';
import './styles/global.css';

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter basename="/makkong1-github.io">
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/portfolio/petory" element={<PetoryProjectPage />} />
            <Route path="/domains/cases" element={<PetoryCasesPage />} />
            <Route path="/domains/flows" element={<PetoryFlowsPage />} />
            <Route path="/demo" element={<DemoPage />} />
            {/* 도메인별 페이지·문서 허브·인프라 페이지는 대표 사례로 흡수하고 삭제했다.
                기존 URL 로 들어오면 사례 페이지로 보낸다. */}
            <Route path="/domains/*" element={<Navigate to="/domains/cases" replace />} />
            <Route path="/docs" element={<Navigate to="/portfolio/petory" replace />} />
            <Route path="/infra" element={<Navigate to="/portfolio/petory" replace />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
