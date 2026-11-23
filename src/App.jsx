import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import Layout from './components/Layout/Layout';
import HomePage from './pages/HomePage';
import PetoryProjectPage from './pages/projects/petory/PetoryProjectPage';
import PetoryFlowsPage from './pages/projects/petory/PetoryFlowsPage';
import PetoryCasesPage from './pages/projects/petory/PetoryCasesPage';
import './styles/global.css';

// 데모는 Petory 프론트 전체를 복사해 돌리는 것이라(axios · stomp · recharts · styled-components
// · 목 데이터) 메인 번들에 넣지 않는다. /demo 에 들어올 때만 받는다.
const DemoPage = lazy(() => import('./pages/DemoPage'));

function DemoFallback() {
  return (
    <div style={{ padding: '4rem 1rem', textAlign: 'center', color: 'var(--text-secondary)' }}>
      데모를 불러오는 중입니다…
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/portfolio/petory" element={<PetoryProjectPage />} />
            <Route path="/domains/cases" element={<PetoryCasesPage />} />
            <Route path="/domains/flows" element={<PetoryFlowsPage />} />
            <Route
              path="/demo"
              element={
                <Suspense fallback={<DemoFallback />}>
                  <DemoPage />
                </Suspense>
              }
            />
            {/* 도메인별 페이지·문서 허브·인프라 페이지는 대표 사례로 흡수하고 삭제했다.
                기존 URL 로 들어오면 사례 페이지로 보낸다.
                구 레포 경로(/makkong1-github.io/...)로 들어온 링크도 여기서 받는다. */}
            <Route path="/makkong1-github.io" element={<Navigate to="/" replace />} />
            <Route path="/makkong1-github.io/*" element={<Navigate to="/" replace />} />
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
