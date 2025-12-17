// 관리자 더미데이터

export const getStatistics = () => {
  return {
    totalUsers: 1234,
    activeUsers: 987,
    totalBoards: 5678,
    totalCareRequests: 234,
    completedCareRequests: 189,
    totalReports: 45,
    pendingReports: 12,
    dailyActiveUsers: Array.from({ length: 30 }, (_, i) => ({
      date: new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      count: Math.floor(Math.random() * 100) + 50
    })),
    boardStats: {
      today: Math.floor(Math.random() * 50),
      thisWeek: Math.floor(Math.random() * 300),
      thisMonth: Math.floor(Math.random() * 1200)
    },
    userStats: {
      today: Math.floor(Math.random() * 20),
      thisWeek: Math.floor(Math.random() * 150),
      thisMonth: Math.floor(Math.random() * 500)
    }
  };
};

export const getReports = (page = 0, size = 20) => {
  const reports = Array.from({ length: 50 }, (_, i) => ({
    id: i + 1,
    type: ['SPAM', 'ABUSE', 'INAPPROPRIATE', 'OTHER'][Math.floor(Math.random() * 4)],
    reason: `신고 사유 ${i + 1}`,
    reporter: {
      id: (i % 10) + 1,
      nickname: `신고자${(i % 10) + 1}`
    },
    reportedContent: {
      type: ['BOARD', 'COMMENT', 'USER'][Math.floor(Math.random() * 3)],
      id: Math.floor(Math.random() * 100) + 1
    },
    status: ['PENDING', 'REVIEWED', 'RESOLVED', 'DISMISSED'][Math.floor(Math.random() * 4)],
    createdAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString()
  }));
  
  const start = page * size;
  const end = start + size;
  
  return {
    content: reports.slice(start, end),
    page: {
      number: page,
      size: size,
      totalElements: reports.length,
      totalPages: Math.ceil(reports.length / size)
    }
  };
};

