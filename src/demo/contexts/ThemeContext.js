import React, { createContext, useContext, useState, useEffect } from 'react';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { lightTheme, darkTheme } from '../styles/theme';
import { SITE_THEME_SYNC } from '../../themeSync';

const ThemeContext = createContext();

function readStoredDarkMode() {
  const t = localStorage.getItem('theme');
  if (t === 'dark' || t === 'light') return t === 'dark';
  return localStorage.getItem('petory-theme') === 'dark';
}

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(readStoredDarkMode);

  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
  };

  const theme = isDarkMode ? darkTheme : lightTheme;

  useEffect(() => {
    const mode = isDarkMode ? 'dark' : 'light';
    localStorage.setItem('theme', mode);
    localStorage.setItem('petory-theme', mode);
    document.documentElement.setAttribute('data-theme', mode);
    window.dispatchEvent(new CustomEvent(SITE_THEME_SYNC, { detail: mode }));
  }, [isDarkMode]);

  useEffect(() => {
    const onSync = (e) => {
      const m = e.detail;
      if (m !== 'dark' && m !== 'light') return;
      const dark = m === 'dark';
      setIsDarkMode((prev) => (prev === dark ? prev : dark));
    };
    window.addEventListener(SITE_THEME_SYNC, onSync);
    return () => window.removeEventListener(SITE_THEME_SYNC, onSync);
  }, []);

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme, theme }}>
      <StyledThemeProvider theme={theme}>
        {children}
      </StyledThemeProvider>
    </ThemeContext.Provider>
  );
};
