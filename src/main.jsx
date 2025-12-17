import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { setupMockInterceptor } from './api/mockInterceptor'
import './index.css'
import App from './App.jsx'

// 가장 먼저 모킹 인터셉터 설정 (모든 axios 인스턴스에 적용)
setupMockInterceptor();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
