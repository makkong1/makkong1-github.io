import axios from 'axios';

/**
 * 케어 계약 체결 API (데모). 요청자가 제안하고 제공자가 수락·거절한다.
 *
 * 예전엔 채팅방 API 가 이 일을 했다(confirmCareDeal). 계약이 방에 묶여 있어서 방 타입이
 * 어긋나면 경로 전체가 조용히 멈췄고, 그래서 계약을 chat 에서 care 로 옮겼다.
 * 응답은 mockInterceptor 가 돌려준다 — 데모에는 백엔드가 없다.
 */
const api = axios.create({
  baseURL: 'http://localhost:8080/api/care-offers',
  headers: { 'Content-Type': 'application/json' },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken') || localStorage.getItem('token');
  if (token && !config.headers.Authorization) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const careOfferApi = {
  // 요청자 → 제공자 제안. 같은 제공자에게 두 번 보내면 기존 제안을 돌려준다.
  offer: (careRequestIdx, providerIdx) =>
    api.post('', null, { params: { careRequestIdx, providerIdx } }),

  accept: (offerIdx) => api.post(`/${offerIdx}/accept`),

  reject: (offerIdx) => api.post(`/${offerIdx}/reject`),

  // 상대와 나 사이에 살아 있는 제안. 채팅방은 계약을 모르므로 상대 사용자로 찾는다.
  between: (otherUserIdx) => api.get('/between', { params: { otherUserIdx } }),

  // 이 요청에 제안할 수 있는 제공자(요청자 전용).
  candidates: (careRequestIdx) => api.get('/candidates', { params: { careRequestIdx } }),
};
