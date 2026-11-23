import DemoBanner from '../components/Portfolio/DemoBanner';
import { setupMockInterceptor } from '../api/mockInterceptor';
import App from '../demo/App';

// 데모 App 이 렌더되기 전에 모든 axios 인스턴스에 인터셉터를 건다.
// 이 모듈은 /demo 라우트에서 lazy 로 받으므로, 다른 페이지에서는 실행되지 않는다.
setupMockInterceptor();

function DemoPage() {
  return (
    <>
      <DemoBanner />
      <App />
    </>
  );
}

export default DemoPage;
