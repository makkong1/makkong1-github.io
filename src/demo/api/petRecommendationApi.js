import axios from 'axios';

/**
 * 주변서비스 추천 신호 (데모). 로그인 상태가 아니면 조용히 빈 값을 돌려준다 —
 * 수집 실패가 상세 조회·길찾기를 막으면 안 된다. 응답은 mockInterceptor 가 돌려준다.
 */
const api = axios.create({
  baseURL: 'http://localhost:8080/api/pet-recommend',
  headers: { 'Content-Type': 'application/json' },
});

const getToken = () =>
  localStorage.getItem('accessToken') || localStorage.getItem('token');

api.interceptors.request.use((config) => {
  const token = getToken();
  if (token && !config.headers.Authorization) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const petRecommendationApi = {
  getSignals: async () => {
    if (!getToken()) return [];
    try {
      const res = await api.get('/signals');
      return Array.isArray(res.data) ? res.data : [];
    } catch {
      return [];
    }
  },

  // 장소 행동 신호 적재. 인기 점수(최근 30일)의 유일한 입력이다.
  interact: async (locationIdx, type) => {
    if (!getToken() || !locationIdx) return;
    try {
      await api.post('/interact', null, { params: { locationIdx, type } });
    } catch {
      // 수집 실패가 화면 동작을 막지 않는다
    }
  },
};
