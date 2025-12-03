import Navigation from './Navigation';

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
    </div>
  );
}

export default Layout;

