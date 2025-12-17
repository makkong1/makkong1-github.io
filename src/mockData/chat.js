// 채팅 더미데이터

const generateChatRooms = () => {
  return Array.from({ length: 10 }, (_, i) => ({
    id: i + 1,
    name: `채팅방 ${i + 1}`,
    participants: [
      {
        id: 1,
        nickname: '데모 유저',
        profileImageUrl: null
      },
      {
        id: (i % 5) + 2,
        nickname: `유저${(i % 5) + 2}`,
        profileImageUrl: null
      }
    ],
    lastMessage: {
      content: `마지막 메시지 ${i + 1}`,
      senderId: (i % 2) === 0 ? 1 : (i % 5) + 2,
      createdAt: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString()
    },
    unreadCount: Math.floor(Math.random() * 10),
    createdAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString()
  }));
};

const allChatRooms = generateChatRooms();

export const getChatRooms = () => {
  return allChatRooms;
};

export const getMessages = (roomId) => {
  const room = allChatRooms.find(r => r.id === parseInt(roomId));
  if (!room) {
    return [];
  }
  
  return Array.from({ length: 20 }, (_, i) => ({
    id: i + 1,
    content: `메시지 내용 ${i + 1}`,
    senderId: (i % 2) === 0 ? room.participants[0].id : room.participants[1].id,
    sender: (i % 2) === 0 ? room.participants[0] : room.participants[1],
    createdAt: new Date(Date.now() - (20 - i) * 60 * 1000).toISOString(),
    read: i < 15 // 최근 5개는 안 읽음
  })).reverse(); // 최신 메시지가 마지막에
};

