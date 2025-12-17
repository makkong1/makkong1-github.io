// 펫케어 요청 더미데이터

const generateCareRequests = (count = 30) => {
  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    title: `펫케어 요청 ${i + 1}`,
    content: `펫케어 요청 내용 ${i + 1}입니다.`,
    requester: {
      id: (i % 10) + 1,
      nickname: `요청자${(i % 10) + 1}`,
      profileImageUrl: null
    },
    pet: {
      id: i + 1,
      name: `반려동물${i + 1}`,
      species: ['강아지', '고양이'][Math.floor(Math.random() * 2)],
      breed: '믹스'
    },
    startDate: new Date(Date.now() + Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
    endDate: new Date(Date.now() + (Math.random() * 30 + 1) * 24 * 60 * 60 * 1000).toISOString(),
    location: {
      address: `서울시 강남구 테헤란로 ${i + 1}번지`,
      latitude: 37.4979 + (Math.random() - 0.5) * 0.1,
      longitude: 127.0276 + (Math.random() - 0.5) * 0.1
    },
    status: ['PENDING', 'ACCEPTED', 'IN_PROGRESS', 'COMPLETED'][Math.floor(Math.random() * 4)],
    applicantCount: Math.floor(Math.random() * 10),
    createdAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString()
  }));
};

const allCareRequests = generateCareRequests(50);

export const getCareRequestsList = (page = 0, size = 20) => {
  const start = page * size;
  const end = start + size;
  const requests = allCareRequests.slice(start, end);
  
  return {
    content: requests,
    page: {
      number: page,
      size: size,
      totalElements: allCareRequests.length,
      totalPages: Math.ceil(allCareRequests.length / size)
    }
  };
};

export const getCareRequestDetail = (id) => {
  const request = allCareRequests.find(r => r.id === parseInt(id));
  if (!request) {
    return null;
  }
  
  return {
    ...request,
    applicants: Array.from({ length: request.applicantCount }, (_, i) => ({
      id: i + 1,
      applicant: {
        id: (i % 10) + 10,
        nickname: `지원자${i + 1}`,
        profileImageUrl: null
      },
      message: `지원 메시지 ${i + 1}`,
      status: ['PENDING', 'ACCEPTED', 'REJECTED'][Math.floor(Math.random() * 3)],
      createdAt: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString()
    })),
    reviews: []
  };
};

