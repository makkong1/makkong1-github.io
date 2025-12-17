// 유저 더미데이터

const generateUsers = (count = 50) => {
  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    username: `user${i + 1}`,
    nickname: `유저${i + 1}`,
    email: `user${i + 1}@example.com`,
    role: i === 0 ? 'ADMIN' : 'USER',
    status: ['ACTIVE', 'SUSPENDED', 'BANNED'][Math.floor(Math.random() * 3)],
    profileImageUrl: null,
    createdAt: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000).toISOString(),
    warningCount: Math.floor(Math.random() * 5),
    petCount: Math.floor(Math.random() * 3)
  }));
};

const allUsers = generateUsers(100);

export const getUsersList = (page = 0, size = 20) => {
  const start = page * size;
  const end = start + size;
  const users = allUsers.slice(start, end);
  
  return {
    content: users,
    page: {
      number: page,
      size: size,
      totalElements: allUsers.length,
      totalPages: Math.ceil(allUsers.length / size)
    }
  };
};

export const getUserDetail = (id) => {
  const user = allUsers.find(u => u.id === parseInt(id));
  if (!user) {
    return null;
  }
  
  return {
    ...user,
    pets: Array.from({ length: user.petCount }, (_, i) => ({
      id: i + 1,
      name: `반려동물${i + 1}`,
      species: ['강아지', '고양이', '햄스터'][Math.floor(Math.random() * 3)],
      breed: '믹스',
      profileImageUrl: null
    }))
  };
};

