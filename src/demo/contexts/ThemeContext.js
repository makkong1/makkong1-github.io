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
    // 데모 컨테이너 내부에서만 CSS 변수 설정 (전역 CSS 변수는 수정하지 않음)
    const demoContainer = document.querySelector('[data-demo-container]');
    if (demoContainer) {
      // 데모 컨테이너 내부에서만 CSS 변수 설정
      demoContainer.style.setProperty('--demo-bg-color', theme.colors.background);
      demoContainer.style.setProperty('--demo-text-color', theme.colors.text);
      demoContainer.style.setProperty('--demo-nav-bg', theme.colors.navBg || theme.colors.surface);
      demoContainer.style.setProperty('--demo-nav-border', theme.colors.border);
      demoContainer.style.setProperty('--demo-card-bg', theme.colors.surface);
      demoContainer.style.setProperty('--demo-text-secondary', theme.colors.textSecondary);
      demoContainer.style.setProperty('--demo-text-muted', theme.colors.textLight);
      demoContainer.style.setProperty('--demo-link-color', theme.colors.primary);
      demoContainer.style.setProperty('--demo-link-hover', theme.colors.primaryDark);
      
      // 배경색과 텍스트 색상도 직접 설정
      demoContainer.style.backgroundColor = theme.colors.background;
      demoContainer.style.color = theme.colors.text;
    }
    
    // cleanup 함수: 언마운트 시 원래 상태로 복원
    return () => {
      if (demoContainer) {
        // CSS 변수 제거
        demoContainer.style.removeProperty('--demo-bg-color');
        demoContainer.style.removeProperty('--demo-text-color');
        demoContainer.style.removeProperty('--demo-nav-bg');
        demoContainer.style.removeProperty('--demo-nav-border');
        demoContainer.style.removeProperty('--demo-card-bg');
        demoContainer.style.removeProperty('--demo-text-secondary');
        demoContainer.style.removeProperty('--demo-text-muted');
        demoContainer.style.removeProperty('--demo-link-color');
        demoContainer.style.removeProperty('--demo-link-hover');
        
        // 인라인 스타일 제거
        demoContainer.style.backgroundColor = '';
        demoContainer.style.color = '';
      }
    };
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme, theme }}>
      <StyledThemeProvider theme={theme}>
        {children}
      </StyledThemeProvider>
    </ThemeContext.Provider>
  );
};
