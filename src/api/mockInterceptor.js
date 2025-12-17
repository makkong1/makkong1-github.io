import axios from 'axios';
import { isMockMode, simulateDelay } from '../utils/apiMock';

// 더미데이터 매핑 (URL 패턴 -> 더미데이터 파일)
const mockDataMap = {
  // 인증
  'POST:/api/auth/login': () => import('../mockData/auth.js').then(m => m.loginResponse),
  'POST:/api/auth/register': () => import('../mockData/auth.js').then(m => m.registerResponse),
  'POST:/api/auth/validate': () => import('../mockData/auth.js').then(m => m.validateResponse),
  'POST:/api/auth/refresh': () => import('../mockData/auth.js').then(m => m.refreshResponse),
  'POST:/api/auth/logout': () => Promise.resolve({ success: true }),

  // 게시글
  'GET:/api/boards': (config) => {
    const page = config?.params?.page || 0;
    return import('../mockData/boards.js').then(m => m.getBoardsList(page));
  },
  'GET:/api/boards/popular': () => import('../mockData/boards.js').then(m => m.getPopularBoards()),
  'GET:/api/boards/search': (config) => {
    const keyword = config?.params?.keyword || '';
    const page = config?.params?.page || 0;
    return import('../mockData/boards.js').then(m => m.searchBoards(keyword, page));
  },
  // 게시글 상세 및 댓글 (동적 경로)
  'GET:/api/boards/': (config) => {
    const url = config.url || '';
    // 댓글 조회인 경우
    if (url.includes('/comments')) {
      const boardId = url.match(/\/boards\/(\d+)\/comments/)?.[1];
      return import('../mockData/boards.js').then(m => m.getComments(boardId));
    }
    // 게시글 상세 조회
    const id = url.split('/').pop();
    return import('../mockData/boards.js').then(m => m.getBoardDetail(id));
  },
  'POST:/api/boards': (config) => {
    const url = config.url || '';
    // 댓글 생성인 경우
    if (url.includes('/comments')) {
      return import('../mockData/boards.js').then(m => m.createCommentResponse());
    }
    // 게시글 생성
    return import('../mockData/boards.js').then(m => m.createBoardResponse());
  },
  'PUT:/api/boards/': (config) => {
    const url = config.url || '';
    const id = url.split('/').pop();
    return import('../mockData/boards.js').then(m => m.updateBoardResponse(id));
  },
  'DELETE:/api/boards/': () => Promise.resolve({ success: true }),

  // 유저
  'GET:/api/admin/users': (config) => {
    const page = config?.params?.page || 0;
    return import('../mockData/users.js').then(m => m.getUsersList(page));
  },
  'GET:/api/admin/users/paging': (config) => {
    const page = config?.params?.page || 0;
    return import('../mockData/users.js').then(m => m.getUsersList(page));
  },
  'GET:/api/admin/users/': (config) => {
    const url = config.url || '';
    const id = url.split('/').pop();
    return import('../mockData/users.js').then(m => m.getUserDetail(id));
  },

  // 펫케어 요청
  'GET:/api/care-requests': (config) => {
    const page = config?.params?.page || 0;
    return import('../mockData/careRequests.js').then(m => m.getCareRequestsList(page));
  },
  'GET:/api/care-requests/': (config) => {
    const url = config.url || '';
    const id = url.split('/').pop();
    return import('../mockData/careRequests.js').then(m => m.getCareRequestDetail(id));
  },

  // 위치 서비스
  'GET:/api/location-services': (config) => {
    const page = config?.params?.page || 0;
    return import('../mockData/location.js').then(m => m.getLocationServicesList(page));
  },
  'GET:/api/location-services/': (config) => {
    const url = config.url || '';
    const id = url.split('/').pop();
    return import('../mockData/location.js').then(m => m.getLocationServiceDetail(id));
  },

  // 채팅
  'GET:/api/chat/rooms': () => import('../mockData/chat.js').then(m => m.getChatRooms()),
  'GET:/api/chat/rooms/': (config) => {
    const url = config.url || '';
    if (url.includes('/messages')) {
      const roomId = url.match(/\/rooms\/(\d+)\/messages/)?.[1];
      return import('../mockData/chat.js').then(m => m.getMessages(roomId));
    }
    return null;
  },

  // 관리자
  'GET:/api/admin/statistics': () => import('../mockData/admin.js').then(m => m.getStatistics()),
  'GET:/api/admin/reports': (config) => {
    const page = config?.params?.page || 0;
    return import('../mockData/admin.js').then(m => m.getReports(page));
  },

  // 파일 업로드
  'POST:/api/upload': () => import('../mockData/files.js').then(m => m.uploadResponse()),
};

// URL 패턴 매칭
const matchMockPattern = (method, url) => {
  // baseURL 제거하고 경로만 추출
  let path = url;
  if (url.startsWith('http://') || url.startsWith('https://')) {
    try {
      const urlObj = new URL(url);
      path = urlObj.pathname;
    } catch (e) {
      // URL 파싱 실패 시 그대로 사용
    }
  }

  // 정확한 매칭 먼저 시도
  const exactKey = `${method}:${path}`;
  if (mockDataMap[exactKey]) {
    return mockDataMap[exactKey];
  }

  // 동적 경로 매칭 (예: /api/boards/123)
  for (const [pattern, handler] of Object.entries(mockDataMap)) {
    if (pattern.endsWith('/') && path.startsWith(pattern.replace(/\/$/, ''))) {
      return handler;
    }
  }

  return null;
};

// axios 인터셉터 설정
export const setupMockInterceptor = () => {
  if (!isMockMode()) {
    console.log('🔌 실제 API 모드 (모킹 비활성화)');
    return;
  }

  console.log('🎮 데모 모드 활성화 (더미 데이터 사용)');

  // 요청 인터셉터 - 모든 요청을 가로채서 더미데이터 반환
  const requestInterceptor = axios.interceptors.request.use(
    async (config) => {
      // 모킹 모드가 아니면 실제 요청 진행
      if (!isMockMode()) {
        return config;
      }

      const method = (config.method || 'get').toUpperCase();
      const url = config.url || '';
      const fullUrl = config.baseURL ? `${config.baseURL}${url}` : url;

      // 더미데이터 핸들러 찾기
      const handler = matchMockPattern(method, fullUrl);

      if (handler) {
        // 더미데이터 반환하도록 요청 취소
        const CancelToken = axios.CancelToken;
        const source = CancelToken.source();
        config.cancelToken = source.token;

        // 비동기로 더미데이터 로드
        handler(config)
          .then(mockData => {
            if (mockData !== null) {
              config._mockData = mockData;
            }
          })
          .catch(error => {
            console.error('더미데이터 로드 실패:', error);
            config._mockError = error;
          });
      }

      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // 응답 인터셉터 - 더미데이터 반환
  const responseInterceptor = axios.interceptors.response.use(
    (response) => {
      // 실제 응답이 있으면 그대로 반환
      return response;
    },
    async (error) => {
      // 취소된 요청이고 더미데이터가 있으면 더미데이터 반환
      if (axios.isCancel(error)) {
        const config = error.config;
        if (config?._mockData !== undefined) {
          await simulateDelay(300);
          return Promise.resolve({
            data: config._mockData,
            status: 200,
            statusText: 'OK',
            headers: {},
            config: config
          });
        }
        if (config?._mockError) {
          await simulateDelay(300);
          return Promise.reject(config._mockError);
        }
      }

      // 네트워크 에러나 다른 에러인 경우에도 더미데이터 시도
      if (isMockMode() && error.config) {
        const method = (error.config.method || 'get').toUpperCase();
        const url = error.config.url || '';
        const fullUrl = error.config.baseURL ? `${error.config.baseURL}${url}` : url;

        const handler = matchMockPattern(method, fullUrl);
        if (handler) {
          try {
            await simulateDelay(300);
            const mockData = await handler(error.config);
            if (mockData !== null) {
              return Promise.resolve({
                data: mockData,
                status: 200,
                statusText: 'OK',
                headers: {},
                config: error.config
              });
            }
          } catch (mockError) {
            console.error('더미데이터 로드 실패:', mockError);
            return Promise.reject(mockError);
          }
        }
      }

      return Promise.reject(error);
    }
  );

  // 인터셉터 ID 반환 (필요시 제거용)
  return { requestInterceptor, responseInterceptor };
};
