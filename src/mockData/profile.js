// 프로필 · 반려동물 · 알림 더미데이터
//
// 실제 응답 형태를 따른다:
//   GET /api/users/me   → UserProfileWithReviewsDTO (user 안에 UsersDTO)
//   GET /api/pets       → List<PetDTO>
//   GET /api/notifications → List<NotificationDTO>
// 필드명은 Petory 백엔드 DTO 에서 그대로 가져왔다
// (UsersDTO / PetDTO / NotificationDTO). 없으면 데모에서 "더미데이터가 없습니다"
// 가 빨간 글씨로 화면에 그대로 떴다.

const iso = (daysAgo, hour = 10) => {
  const d = new Date();
  d.setDate(d.getDate() - daysAgo);
  d.setHours(hour, 0, 0, 0);
  return d.toISOString().slice(0, 19);
};

export const myPets = [
  {
    idx: 1,
    userIdx: 1,
    petName: '콩이',
    petType: 'DOG',
    breed: '포메라니안',
    gender: 'M',
    age: '3살',
    color: '크림',
    weight: 3.2,
    birthDate: '2023-04-11',
    isNeutered: true,
    healthInfo: '슬개골 1기 — 정기 검진 중',
    specialNotes: '낯선 사람에게 경계가 있어요',
    profileImageUrl: null,
    isDeleted: false,
    createdAt: iso(300),
    updatedAt: iso(12),
    vaccinations: [],
  },
  {
    idx: 2,
    userIdx: 1,
    petName: '나비',
    petType: 'CAT',
    breed: '코리안숏헤어',
    gender: 'F',
    age: '2살',
    color: '노랑',
    weight: 4.1,
    birthDate: '2024-06-02',
    isNeutered: true,
    healthInfo: null,
    specialNotes: '물을 잘 안 마셔서 습식 위주로 급여',
    profileImageUrl: null,
    isDeleted: false,
    createdAt: iso(210),
    updatedAt: iso(30),
    vaccinations: [],
  },
];

export const myProfile = {
  user: {
    idx: 1,
    id: 'demo_user',
    username: 'demo_user',
    nickname: '데모유저',
    email: 'demo@example.com',
    phone: '010-0000-0000',
    role: 'USER',
    location: '경기 성남시 분당구',
    regionSigungu: '성남시 분당구',
    petInfo: '강아지 1 · 고양이 1',
    socialUsers: [],
    pets: myPets,
    status: 'ACTIVE',
    warningCount: 0,
    suspendedUntil: null,
    petCoinBalance: 1000,
    emailVerified: true,
    isDeleted: false,
    deletedAt: null,
    isDormant: false,
    dormantAt: null,
  },
  reviews: [
    {
      idx: 1,
      careRequestIdx: 1,
      reviewerIdx: 2,
      reviewerNickname: '이웃집보호자',
      revieweeIdx: 1,
      rating: 5,
      content: '시간 약속을 정확히 지켜주셨고 산책 기록을 사진으로 보내주셨어요.',
      createdAt: iso(18),
    },
    {
      idx: 2,
      careRequestIdx: 2,
      reviewerIdx: 3,
      reviewerNickname: '분당집사',
      revieweeIdx: 1,
      rating: 4,
      content: '급여 방법을 꼼꼼히 물어보셔서 안심하고 맡겼습니다.',
      createdAt: iso(45),
    },
  ],
  careReviewMode: 'WRITTEN',
  locationServiceReviews: [],
  averageRating: 4.5,
  locationServiceAverageRating: null,
  reviewCount: 2,
  completedCareCount: 2,
  locationServiceReviewCount: 0,
  meetupHistories: [],
  meetupHistoryCount: 0,
  meetupLikedCount: 0,
};

export const myNotifications = [
  {
    idx: 1,
    userId: 1,
    type: 'CARE_APPLICATION',
    title: '케어 요청에 새 제안이 왔습니다',
    content: '「주말 산책 봐주실 분」에 제안 1건이 도착했어요.',
    relatedId: 1,
    relatedType: 'CARE_REQUEST',
    isRead: false,
    createdAt: iso(0, 9),
  },
  {
    idx: 2,
    userId: 1,
    type: 'COMMENT',
    title: '내 글에 댓글이 달렸습니다',
    content: '「강아지 슬개골 탈구 경험 있으신 분」에 댓글이 달렸어요.',
    relatedId: 12,
    relatedType: 'BOARD',
    isRead: false,
    createdAt: iso(1, 20),
  },
  {
    idx: 3,
    userId: 1,
    type: 'MEETUP',
    title: '모임 참여가 확정됐습니다',
    content: '「분당 중앙공원 아침 산책」 참여가 확정됐어요.',
    relatedId: 4,
    relatedType: 'MEETUP',
    isRead: true,
    createdAt: iso(3, 14),
  },
];
