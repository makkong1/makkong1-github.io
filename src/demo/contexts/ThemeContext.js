import React, { createContext, useContext, useState, useEffect } from 'react';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { lightTheme, darkTheme } from '../styles/theme';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('petory-theme');
    return savedTheme === 'dark';
  });

  const toggleTheme = () => {
    setIsDarkMode(prevMode => {
      const newMode = !prevMode;
      localStorage.setItem('petory-theme', newMode ? 'dark' : 'light');
      return newMode;
    });
  };

  const theme = isDarkMode ? darkTheme : lightTheme;

  useEffect(() => {
    document.body.style.backgroundColor = theme.colors.background;
    document.body.style.color = theme.colors.text;
    // 전역 CSS 변수도 데모 테마와 동기화 (포트폴리오와 일치)
    document.documentElement.style.setProperty('--bg-color', theme.colors.background);
    document.documentElement.style.setProperty('--text-color', theme.colors.text);
    document.documentElement.style.setProperty('--nav-bg', theme.colors.navBg || theme.colors.surface);
    document.documentElement.style.setProperty('--nav-border', theme.colors.border);
    document.documentElement.style.setProperty('--card-bg', theme.colors.surface);
    document.documentElement.style.setProperty('--text-secondary', theme.colors.textSecondary);
    document.documentElement.style.setProperty('--text-muted', theme.colors.textLight);
    document.documentElement.style.setProperty('--link-color', theme.colors.primary);
    document.documentElement.style.setProperty('--link-hover', theme.colors.primaryDark);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme, theme }}>
      <StyledThemeProvider theme={theme}>
        {children}
      </StyledThemeProvider>
    </ThemeContext.Provider>
  );
};
