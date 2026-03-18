/**
 * 데모 모드 여부 확인
 * VITE_DEMO_MODE=true 로 빌드 시 GitHub Pages 등 백엔드 없는 환경에서 동작
 */
export const isDemoMode = () =>
  import.meta.env.VITE_DEMO_MODE === 'true';
