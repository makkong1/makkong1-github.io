import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navigation from './Navigation';
import ScrollToTop from '../Common/ScrollToTop';

function Layout({ children }) {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div>
      <Navigation />
      <main style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '2rem 1rem'
      }}>
        {children}
      </main>
      <ScrollToTop />
    </div>
  );
}

export default Layout;

