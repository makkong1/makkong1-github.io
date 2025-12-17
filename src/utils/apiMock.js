/**
 * API 모킹 유틸리티
 * 환경 변수로 모킹 모드 on/off 제어
 */

// 모킹 모드 활성화 여부 (기본값: true - 데모 모드)
export const isMockMode = () => {
  // 환경 변수로 제어 가능
  if (import.meta.env.VITE_USE_MOCK === 'false') {
    return false;
  }
  // 배포 환경에서는 항상 모킹 모드
  if (import.meta.env.PROD) {
    return true;
  }
  // 개발 환경에서는 기본적으로 모킹 모드
  return true;
};

// 지연 시뮬레이션 (실제 네트워크 지연처럼 보이게)
export const simulateDelay = (ms = 300) => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

