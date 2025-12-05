import Navigation from './Navigation';
import ScrollToTop from '../Common/ScrollToTop';

function Layout({ children }) {
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

