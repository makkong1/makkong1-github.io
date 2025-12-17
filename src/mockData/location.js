// 위치 서비스 더미데이터

const generateLocationServices = (count = 40) => {
  const serviceTypes = ['병원', '미용실', '카페', '호텔', '용품점'];
  
  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    name: `${serviceTypes[i % serviceTypes.length]} ${i + 1}`,
    description: `${serviceTypes[i % serviceTypes.length]} 설명 ${i + 1}`,
    type: serviceTypes[i % serviceTypes.length],
    address: `서울시 강남구 테헤란로 ${i + 1}번지`,
    latitude: 37.4979 + (Math.random() - 0.5) * 0.2,
    longitude: 127.0276 + (Math.random() - 0.5) * 0.2,
    phone: `02-${String(Math.floor(Math.random() * 10000)).padStart(4, '0')}-${String(Math.floor(Math.random() * 10000)).padStart(4, '0')}`,
    rating: (Math.random() * 2 + 3).toFixed(1), // 3.0 ~ 5.0
    reviewCount: Math.floor(Math.random() * 100),
    images: [],
    operatingHours: '09:00 - 18:00',
    createdAt: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000).toISOString()
  }));
};

const allLocationServices = generateLocationServices(200);

export const getLocationServicesList = (page = 0, size = 20) => {
  const start = page * size;
  const end = start + size;
  const services = allLocationServices.slice(start, end);
  
  return {
    content: services,
    page: {
      number: page,
      size: size,
      totalElements: allLocationServices.length,
      totalPages: Math.ceil(allLocationServices.length / size)
    }
  };
};

export const searchLocationServices = (params = {}) => {
  let filtered = [...allLocationServices];
  
  // 지역 필터링
  if (params.sido) {
    filtered = filtered.filter(s => s.address.includes(params.sido));
  }
  if (params.sigungu) {
    filtered = filtered.filter(s => s.address.includes(params.sigungu));
  }
  if (params.eupmyeondong) {
    filtered = filtered.filter(s => s.address.includes(params.eupmyeondong));
  }
  
  // 카테고리 필터링
  if (params.category) {
    filtered = filtered.filter(s => s.type === params.category);
  }
  
  const size = params.size || 500;
  const services = filtered.slice(0, size);
  
  // LocationServiceMap이 response.data?.services를 기대하므로
  return {
    services: services
  };
};

export const getLocationServiceDetail = (id) => {
  const service = allLocationServices.find(s => s.id === parseInt(id));
  if (!service) {
    return null;
  }
  
  return {
    ...service,
    reviews: Array.from({ length: 10 }, (_, i) => ({
      id: i + 1,
      author: {
        id: (i % 10) + 1,
        nickname: `리뷰어${i + 1}`,
        profileImageUrl: null
      },
      content: `리뷰 내용 ${i + 1}`,
      rating: Math.floor(Math.random() * 3) + 3, // 3 ~ 5
      createdAt: new Date(Date.now() - Math.random() * 90 * 24 * 60 * 60 * 1000).toISOString()
    }))
  };
};

