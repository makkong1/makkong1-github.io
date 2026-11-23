import axios from 'axios';
import { isMockMode, simulateDelay } from '../utils/apiMock';

// 더미데이터 매핑 (URL 패턴 -> 더미데이터 파일)
const mockDataMap = {
  // 케어 계약 (제안 → 수락/거절). 2026-09 에 chat 의 confirmCareDeal 에서 care 로 옮겨왔다.
  'POST:/api/care-offers': (config) => {
    const url = config?.url || '';
    if (url.includes('/accept')) {
      return Promise.resolve({ idx: 1, status: 'ACCEPTED', message: '제안을 수락했습니다. 케어 요청이 진행 중으로 바뀝니다.' });
    }
    if (url.includes('/reject')) {
      return Promise.resolve({ idx: 1, status: 'REJECTED', message: '제안을 거절했습니다.' });
    }
    return Promise.resolve({ idx: 1, status: 'PENDING', offeredCoins: 3000, message: '제안을 보냈습니다.' });
  },
  'GET:/api/care-offers/between': () => Promise.resolve(null),
  'GET:/api/care-offers/candidates': () => Promise.resolve([]),

  // 반려동물 소식 — 목록 API 는 없고 알림·배너에서 1건씩 읽는다
  'GET:/api/pet-news/': (config) => {
    const idx = (config?.url || '').split('/').pop();
    return Promise.resolve({
      idx: Number(idx) || 1,
      title: '서울시 반려동물 동반 가능 시설 안내',
      link: 'https://news.seoul.go.kr/',
      publishedAt: '2026-11-20T09:00:00',
    });
  },

  // 프로필 · 반려동물 · 알림
  // 이 셋이 없어서 데모에서 "내 프로필" 모달에 빨간 에러 문구가 그대로 떴다.
  'GET:/api/users/me': () => import('../mockData/profile.js').then(m => m.myProfile),
  'GET:/api/pets': () => import('../mockData/profile.js').then(m => m.myPets),
  'GET:/api/notifications': () => import('../mockData/profile.js').then(m => m.myNotifications),

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
  'GET:/api/location-services/search': (config) => {
    // 검색 파라미터에 따라 필터링된 결과 반환
    return import('../mockData/location.js').then(m => m.searchLocationServices(config?.params || {}));
  },
  'GET:/api/location-services/': (config) => {
    const url = config.url || '';
    const id = url.split('/').pop();
    return import('../mockData/location.js').then(m => m.getLocationServiceDetail(id));
  },

  // 채팅
  // 채팅 엔드포인트가 /rooms 에서 /conversations 로 바뀌었는데 목 경로가 따라가지 않아
  // 데모에서 채팅방 목록이 비어 있었다.
  'GET:/api/chat/conversations': () => import('../mockData/chat.js').then(m => m.getChatRooms()),
  'GET:/api/chat/conversations/': (config) => {
    const url = config?.url || '';
    const id = url.match(/\/conversations\/(\d+)/)?.[1];
    return import('../mockData/chat.js').then(m => {
      const rooms = m.getChatRooms();
      const list = Array.isArray(rooms) ? rooms : (rooms?.content || []);
      return list.find(r => String(r.idx ?? r.id) === String(id)) || list[0] || null;
    });
  },
  'POST:/api/chat/conversations': () => Promise.resolve({ idx: 1, message: '데모에서는 채팅방을 새로 만들지 않습니다.' }),
  'GET:/api/chat/messages/': (config) => {
    const id = (config?.url || '').match(/\/conversation\/(\d+)/)?.[1];
    return import('../mockData/chat.js').then(m => m.getMessages(id));
  },
  'POST:/api/chat/messages': () => Promise.resolve({ idx: Date.now(), message: '전송됨' }),

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
    const patternPath = pattern.replace(/^[A-Z]+:/, '');
    
    // 정확한 경로 매칭 (예: /api/location-services/search)
    if (path === patternPath) {
      return handler;
    }
    
    // 동적 경로 매칭 (예: /api/boards/123)
    if (pattern.endsWith('/') && path.startsWith(patternPath.replace(/\/$/, ''))) {
      return handler;
    }
    
    // 부분 매칭 (예: /api/location-services/search)
    if (path.includes(patternPath) && !patternPath.includes('*')) {
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

  // 이미 생성된 모든 axios 인스턴스의 adapter도 설정
  // 이건 완벽하지 않지만, 최소한 새로 생성되는 인스턴스에는 적용됨
  const originalAdapter = axios.defaults.adapter || axios.getAdapter(['xhr', 'http']);
  
  const mockAdapter = async (config) => {
    if (!isMockMode()) {
      return originalAdapter(config);
    }

    const method = (config.method || 'get').toUpperCase();
    const url = config.url || '';
    const fullUrl = config.baseURL ? `${config.baseURL}${url}` : url;

    const handler = matchMockPattern(method, fullUrl);
    
    if (handler) {
      console.log('✅ 모킹 매칭 성공 (adapter):', { method, path: fullUrl });
      try {
        await simulateDelay(300);
        const mockData = await handler(config);
        if (mockData !== null) {
          return {
            data: mockData,
            status: 200,
            statusText: 'OK',
            headers: {},
            config: config
          };
        }
      } catch (error) {
        console.error('더미데이터 로드 실패:', error);
        throw error;
      }
    }
    
    // 매칭 실패 시 원본 adapter 사용하지 않고 에러 반환
    return Promise.reject(new Error(`데모 모드: ${method} ${fullUrl}에 대한 더미데이터가 없습니다.`));
  };

  axios.defaults.adapter = mockAdapter;
  
  // axios.create 오버라이드
  const originalCreate = axios.create;
  axios.create = function(config) {
    const instance = originalCreate.call(this, config);
    instance.defaults.adapter = mockAdapter;
    // 이미 생성된 인스턴스의 인터셉터도 추가
    instance.interceptors.request.use((config) => {
      config.adapter = mockAdapter;
      return config;
    });
    return instance;
  };
  
  // 이미 생성된 모든 axios 인스턴스 패치 (가능한 경우)
  // 이건 완벽하지 않지만, 최소한 시도는 함
  if (typeof window !== 'undefined') {
    // 전역에 저장된 axios 인스턴스가 있다면 패치
    // 하지만 이건 완벽하지 않음
  }

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
        console.log('✅ 모킹 매칭 성공:', { method, path: fullUrl });
        
        // adapter를 오버라이드하여 요청 완전히 차단
        config.adapter = async () => {
          await simulateDelay(300);
          const mockData = await handler(config);
          if (mockData !== null) {
            return {
              data: mockData,
              status: 200,
              statusText: 'OK',
              headers: {},
              config: config
            };
          }
          throw new Error('Mock data is null');
        };
      } else {
        console.warn('🔍 모킹 매칭 실패:', { method, url, baseURL: config.baseURL, fullUrl });
        // 매칭 실패 시 요청 차단
        config.adapter = async () => {
          throw new Error(`데모 모드: ${method} ${fullUrl}에 대한 더미데이터가 없습니다.`);
        };
      }

      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  
  // 모든 axios 인스턴스의 request 메서드도 오버라이드
  const originalRequest = axios.Axios.prototype.request;
  axios.Axios.prototype.request = function(config) {
    // 모킹 모드면 모든 요청을 가로채기
    if (isMockMode()) {
      // config 정규화 (axios 내부 로직과 동일)
      const method = (config.method || this.defaults.method || 'get').toUpperCase();
      const url = config.url || '';
      // baseURL은 config에 있거나 인스턴스의 defaults에 있음
      const baseURL = config.baseURL || this.defaults.baseURL || '';
      const fullUrl = baseURL ? `${baseURL}${url}` : url;
      
      // URL에서 경로만 추출 (프로토콜과 호스트 제거)
      let path = fullUrl;
      if (fullUrl.startsWith('http://') || fullUrl.startsWith('https://')) {
        try {
          const urlObj = new URL(fullUrl);
          path = urlObj.pathname;
        } catch (e) {
          // URL 파싱 실패 시 그대로 사용
        }
      }
      
      const handler = matchMockPattern(method, path);
      
      if (handler) {
        console.log('✅ 모킹 매칭 성공 (request override):', { method, path, fullUrl, baseURL, url });
        return (async () => {
          await simulateDelay(300);
          const mockData = await handler({ ...config, baseURL, url });
          if (mockData !== null) {
            return {
              data: mockData,
              status: 200,
              statusText: 'OK',
              headers: {},
              config: { ...config, baseURL, url }
            };
          }
          throw new Error('Mock data is null');
        })();
      } else {
        console.warn('🔍 모킹 매칭 실패 (request override):', { method, url, baseURL, fullUrl, path, instanceDefaults: this.defaults.baseURL });
        return Promise.reject(new Error(`데모 모드: ${method} ${path}에 대한 더미데이터가 없습니다.`));
      }
    }
    
    // 모킹 모드가 아니거나 adapter가 설정되어 있으면 원본 사용
    if (config?.adapter) {
      return config.adapter(config);
    }
    return originalRequest.call(this, config);
  };

  // 응답 인터셉터 - 더미데이터 반환
  const responseInterceptor = axios.interceptors.response.use(
    (response) => {
      // 실제 응답이 있으면 그대로 반환 (모킹이 아닌 경우)
      return response;
    },
    async (error) => {
      // 취소된 요청이고 더미데이터가 있으면 더미데이터 반환
      if (axios.isCancel(error) && error.config?._isMock) {
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
      if (isMockMode() && error.config && !error.config._triedMock) {
        error.config._triedMock = true;
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
