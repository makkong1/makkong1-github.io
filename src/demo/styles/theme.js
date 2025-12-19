// 당근마켓 스타일 테마
export const lightTheme = {
  colors: {
    primary: '#FF7E36', // 당근 주황색
    primaryDark: '#E86B2A',
    primaryLight: '#FF9558',
    secondary: '#4A90E2',
    background: '#FFFFFF',
    surface: '#FAFAFA', // 약간 더 부드러운 회색
    surfaceHover: '#F5F5F5', // 호버 시 약간 더 진한 회색
    navBg: '#FAFAFA',
    text: '#1A1A1A', // 약간 더 부드러운 검정 (가독성 향상)
    textSecondary: '#6B6B6B', // 더 읽기 쉬운 회색
    textLight: '#9E9E9E',
    border: '#E5E5E5', // 더 부드러운 테두리
    borderLight: '#F0F0F0',
    success: '#4CAF50',
    warning: '#FF9800',
    error: '#F44336',
    shadow: 'rgba(0, 0, 0, 0.08)', // 더 부드러운 그림자
    shadowHover: 'rgba(0, 0, 0, 0.12)',
    gradient: 'linear-gradient(135deg, #FF7E36 0%, #FF9558 100%)',
  },
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '12px',
    lg: '16px',
    xl: '20px',
    xxl: '30px',
  },
  borderRadius: {
    sm: '4px',
    md: '6px',
    lg: '8px',
    xl: '12px',
    full: '50%',
  },
  typography: {
    h1: { fontSize: '20px', fontWeight: '700' },
    h2: { fontSize: '18px', fontWeight: '600' },
    h3: { fontSize: '16px', fontWeight: '600' },
    h4: { fontSize: '14px', fontWeight: '500' },
    body1: { fontSize: '13px', fontWeight: '400' },
    body2: { fontSize: '12px', fontWeight: '400' },
    caption: { fontSize: '10px', fontWeight: '400' },
  },
};

export const darkTheme = {
  colors: {
    primary: '#FF7E36',
    primaryDark: '#E86B2A',
    primaryLight: '#FF9558',
    secondary: '#64B5F6',
    background: '#1A1A1A', // 더 밝게
    surface: '#2D2D2D', // 더 밝게
    surfaceHover: '#3A3A3A', // 더 밝게
    navBg: '#242424',
    text: '#F5F5F5', // 더 밝게
    textSecondary: '#C5C5C5', // 더 밝게
    textLight: '#A0A0A0', // 더 밝게
    border: '#404040', // 더 밝게
    borderLight: '#363636', // 더 밝게
    success: '#66BB6A',
    warning: '#FFB74D',
    error: '#EF5350',
    shadow: 'rgba(0, 0, 0, 0.4)',
    shadowHover: 'rgba(0, 0, 0, 0.5)',
    gradient: 'linear-gradient(135deg, #FF7E36 0%, #FF9558 100%)',
  },
  spacing: lightTheme.spacing,
  borderRadius: lightTheme.borderRadius,
  typography: lightTheme.typography,
};
