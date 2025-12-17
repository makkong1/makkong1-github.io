// 게시글 더미데이터

const generateBoards = (count = 20) => {
  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    title: `게시글 제목 ${i + 1}`,
    content: `게시글 내용 ${i + 1}입니다. 이것은 데모용 더미 데이터입니다.`,
    author: {
      id: (i % 5) + 1,
      nickname: `유저${(i % 5) + 1}`,
      profileImageUrl: null
    },
    viewCount: Math.floor(Math.random() * 1000),
    likeCount: Math.floor(Math.random() * 100),
    dislikeCount: Math.floor(Math.random() * 10),
    commentCount: Math.floor(Math.random() * 50),
    createdAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
    images: []
  }));
};

const allBoards = generateBoards(100);

export const getBoardsList = (page = 0, size = 20) => {
  const start = page * size;
  const end = start + size;
  const boards = allBoards.slice(start, end);
  
  return {
    content: boards,
    page: {
      number: page,
      size: size,
      totalElements: allBoards.length,
      totalPages: Math.ceil(allBoards.length / size)
    }
  };
};

export const getPopularBoards = () => {
  return allBoards
    .sort((a, b) => (b.likeCount + b.viewCount) - (a.likeCount + a.viewCount))
    .slice(0, 10);
};

export const searchBoards = (keyword, page = 0, size = 20) => {
  const filtered = allBoards.filter(board => 
    board.title.includes(keyword) || board.content.includes(keyword)
  );
  const start = page * size;
  const end = start + size;
  
  return {
    content: filtered.slice(start, end),
    page: {
      number: page,
      size: size,
      totalElements: filtered.length,
      totalPages: Math.ceil(filtered.length / size)
    }
  };
};

export const getBoardDetail = (id) => {
  const board = allBoards.find(b => b.id === parseInt(id));
  if (!board) {
    return null;
  }
  
  return {
    ...board,
    comments: generateComments(parseInt(id))
  };
};

const generateComments = (boardId) => {
  return Array.from({ length: 10 }, (_, i) => ({
    id: i + 1,
    content: `댓글 내용 ${i + 1}입니다.`,
    author: {
      id: (i % 5) + 1,
      nickname: `유저${(i % 5) + 1}`,
      profileImageUrl: null
    },
    likeCount: Math.floor(Math.random() * 20),
    dislikeCount: Math.floor(Math.random() * 5),
    createdAt: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString()
  }));
};

export const getComments = (boardId) => {
  return generateComments(parseInt(boardId));
};

export const createBoardResponse = () => ({
  id: allBoards.length + 1,
  title: '새 게시글',
  content: '게시글 내용',
  author: {
    id: 1,
    nickname: '데모 유저',
    profileImageUrl: null
  },
  createdAt: new Date().toISOString()
});

export const updateBoardResponse = (id) => ({
  id: parseInt(id),
  title: '수정된 게시글',
  content: '수정된 내용',
  updatedAt: new Date().toISOString()
});

export const createCommentResponse = () => ({
  id: Math.floor(Math.random() * 1000),
  content: '새 댓글',
  author: {
    id: 1,
    nickname: '데모 유저',
    profileImageUrl: null
  },
  createdAt: new Date().toISOString()
});

