import { createContext, useContext, useState, useEffect } from 'react';
import { SITE_THEME_SYNC } from '../themeSync';

const ThemeContext = createContext();

function readStoredSiteTheme() {
  const saved = localStorage.getItem('theme');
  if (saved === 'dark' || saved === 'light') return saved;
  if (localStorage.getItem('petory-theme') === 'dark') return 'dark';
  return 'light';
}

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(readStoredSiteTheme);

  useEffect(() => {
    localStorage.setItem('theme', theme);
    localStorage.setItem('petory-theme', theme);
    document.documentElement.setAttribute('data-theme', theme);
    window.dispatchEvent(new CustomEvent(SITE_THEME_SYNC, { detail: theme }));
  }, [theme]);

  useEffect(() => {
    const onSync = (e) => {
      const m = e.detail;
      if (m !== 'dark' && m !== 'light') return;
      setTheme((prev) => (prev === m ? prev : m));
    };
    window.addEventListener(SITE_THEME_SYNC, onSync);
    return () => window.removeEventListener(SITE_THEME_SYNC, onSync);
  }, []);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
}

