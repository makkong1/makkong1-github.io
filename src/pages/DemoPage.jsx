import { useSearchParams } from 'react-router-dom';
import DemoBanner from '../components/Portfolio/DemoBanner';
import App from '../demo/App';
import LinkUpGallery from '../demo/components/LinkUp/LinkUpGallery';
import { ThemeProvider as DemoThemeProvider } from '../demo/contexts/ThemeContext';
import { AuthProvider } from '../demo/contexts/AuthContext';

function DemoPage() {
  const [searchParams] = useSearchParams();
  const currentProject = searchParams.get('project') === 'linkup' ? 'linkup' : 'petory';

  return (
    <>
      <DemoBanner />
      {currentProject === 'linkup' ? (
        <DemoThemeProvider>
          <AuthProvider>
            <LinkUpGallery />
          </AuthProvider>
        </DemoThemeProvider>
      ) : (
        <App />
      )}
    </>
  );
}

export default DemoPage;
