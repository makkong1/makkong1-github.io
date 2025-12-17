// 인증 관련 더미데이터

export const loginResponse = {
  accessToken: 'demo_access_token_12345',
  refreshToken: 'demo_refresh_token_12345',
  user: {
    id: 1,
    username: 'demo_user',
    nickname: '데모 유저',
    email: 'demo@example.com',
    role: 'USER',
    profileImageUrl: null
  }
};

export const registerResponse = {
  success: true,
  message: '회원가입이 완료되었습니다.',
  user: {
    id: 2,
    username: 'new_user',
    nickname: '새 유저',
    email: 'new@example.com'
  }
};

export const validateResponse = {
  valid: true,
  user: {
    id: 1,
    username: 'demo_user',
    nickname: '데모 유저',
    email: 'demo@example.com',
    role: 'USER'
  }
};

export const refreshResponse = {
  accessToken: 'demo_access_token_new_12345',
  refreshToken: 'demo_refresh_token_new_12345'
};

