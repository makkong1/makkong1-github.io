import { createContext, useContext, useEffect } from 'react';
import { SITE_THEME_SYNC } from '../themeSync';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const theme = 'dark';

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', 'dark');
    localStorage.setItem('theme', 'dark');
    window.dispatchEvent(new CustomEvent(SITE_THEME_SYNC, { detail: 'dark' }));
  }, []);

  const toggleTheme = () => {};

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

