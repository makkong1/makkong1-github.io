import axios from 'axios';

const api = axios.create({ baseURL: 'http://localhost:8080/api' });

const mockResolve = (data) => Promise.resolve({ data });

const MOCK_TREND_POINTS = (() => {
  const keywords = ['강아지간식', '고양이사료', '치즈볼', '연어트릿', '닭가슴살'];
  const points = [];
  for (let d = 13; d >= 0; d--) {
    const date = new Date();
    date.setDate(date.getDate() - d);
    const dateStr = date.toISOString().slice(0, 10);
    keywords.forEach((kw) => {
      points.push({ date: dateStr, keyword: kw, count: Math.floor(Math.random() * 80 + 20) });
    });
  }
  return points;
})();

export const recommendApi = {
  getRecommendation: ({ lat, lng, context }) => {
    return mockResolve({ facilities: [], request_id: 'demo-req-1', context });
  },

  getCopy: ({ requestId, context, facilities, trends }) => {
    return mockResolve({ copy: '데모 모드에서는 AI 추천 텍스트가 제공되지 않습니다.' });
  },

  getTrendTimeseries: ({ category, days = 14, topKeywords = 10 }) => {
    return mockResolve({ category, days, points: MOCK_TREND_POINTS });
  },

  sendEvents: ({ requestId, events }) => Promise.resolve({ data: { ok: true } }),
};
