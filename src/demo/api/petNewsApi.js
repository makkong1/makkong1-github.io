import axios from 'axios';

/**
 * 반려동물 소식 (데모). 목록 API 는 없다 — 전용 화면 없이 알림·배너로만 보여준다.
 * 응답은 mockInterceptor 가 돌려준다.
 */
const api = axios.create({
  baseURL: 'http://localhost:8080/api/pet-news',
  headers: { 'Content-Type': 'application/json' },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken') || localStorage.getItem('token');
  if (token && !config.headers.Authorization) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const petNewsApi = {
  // 소식 1건. 알림에는 relatedId 만 있어서 원문 주소를 여기서 읽는다.
  get: (idx) => api.get(`/${idx}`),
};
