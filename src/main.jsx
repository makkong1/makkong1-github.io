import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// 모킹 인터셉터는 데모에서만 필요하다 → DemoPage 모듈에서 설정한다.
// 여기서 호출하면 axios · 목 데이터가 첫 화면 번들에 끌려 들어온다.

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
