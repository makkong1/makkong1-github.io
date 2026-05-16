import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import DemoBanner from '../components/Portfolio/DemoBanner';
import App from '../demo/App';
import LinkUpGallery from '../demo/components/LinkUp/LinkUpGallery';
import { ThemeProvider as DemoThemeProvider } from '../demo/contexts/ThemeContext';
import { AuthProvider } from '../demo/contexts/AuthContext';

function DemoPage() {
  const [searchParams] = useSearchParams();
  const currentProject = searchParams.get('project') === 'linkup' ? 'linkup' : 'petory';

  // 언마운트 시 포트폴리오 테마 복원
  useEffect(() => {
    const portfolioTheme = document.documentElement.getAttribute('data-theme');
    sessionStorage.setItem('portfolio-theme-backup', portfolioTheme || 'light');
    return () => {
      const savedTheme = sessionStorage.getItem('portfolio-theme-backup');
      if (savedTheme) {
        document.documentElement.setAttribute('data-theme', savedTheme);
        sessionStorage.removeItem('portfolio-theme-backup');
      }
    };
  }, []);

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
