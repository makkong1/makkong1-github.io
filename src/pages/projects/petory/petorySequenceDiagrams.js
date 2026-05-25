/**
 * 통합 플로우 페이지용 시퀀스 정본. 각 그룹(tab)은 상단 도메인 탭에 대응하며,
 * sequences가 2개 이상이면 Care 도메인과 같은 pill 형태 서브 탭(seq)으로 전환합니다.
 */

/** @typedef {{ seq: string, pillLabel: string, heading: string, chart: string }} PetoryFlowSequenceVariant */

/** @typedef {{
 *   tab: string,
 *   tocLabel: string,
 *   defaultSeq: string,
 *   sequences: PetoryFlowSequenceVariant[],
 * }} PetoryFlowGroup */

/** @type {PetoryFlowGroup[]} */
export const PETORY_FLOW_GROUPS = [
  {
    tab: 'user',
    tocLabel: 'User',
    defaultSeq: 'main',
    sequences: [
      {
        seq: 'main',
        pillLabel: '',
        heading: 'User — JWT·프로필·보호 API',
        chart: `sequenceDiagram
    participant FE as 프론트엔드
    participant JF as JwtAuthenticationFilter
    participant UD as User 도메인
    participant DB as DB

    FE->>JF: 요청 Bearer JWT
    JF->>JF: 토큰 검증 후 principal
    JF->>UD: 인증 통과 후 컨트롤러

    UD->>DB: 회원·반려·소셜·제재
    DB-->>UD: 엔티티
    UD-->>FE: HTTP 응답

    Note over FE,UD: 공개 로그인 경로에서만 User 도메인이 인증(Auth·OAuth) 후 JWT 발급`,
      },
    ],
  },
  {
    tab: 'board',
    tocLabel: 'Board',
    defaultSeq: 'main',
    sequences: [
      {
        seq: 'main',
        pillLabel: '',
        heading: 'Board — 글·댓글·파일·알림·인기',
        chart: `sequenceDiagram
    participant FE as 프론트엔드
    participant BD as Board 도메인
    participant NF as Notification 도메인
    participant FI as File 도메인
    participant DB as DB

    FE->>BD: POST 글 작성
    BD->>FI: Attachment 연동
    BD->>DB: 게시글·조회 로그 적재 등
    BD-->>FE: DTO

    FE->>BD: GET 목록·상세 등
    BD->>DB: 반응·첨부 배치 집계 등

    FE->>BD: POST 댓글
    BD->>DB: 코멘트
    BD->>NF: 수신 알림 적재 또는 푸시

    BD->>DB: 인기 스냅샷 갱신(배치 경로 포함)`,
      },
    ],
  },
  {
    tab: 'care',
    tocLabel: 'Care',
    defaultSeq: 'biz',
    sequences: [
      {
        seq: 'biz',
        pillLabel: '케어·결제·매칭',
        heading: 'Care — 요청·채팅 매칭·거래 확정·에스크로',
        chart: `sequenceDiagram
    participant FE as 프론트엔드
    participant Care as Care 도메인
    participant Chat as Chat 도메인
    participant Pay as Payment 도메인

    FE->>Care: POST 케어 요청(요청자 세션)
    FE->>Chat: 채팅 진입 등(제공자 세션)
    Care->>Chat: 같은 related로 방 연결
    Chat->>Care: 거래 확정(비관적 락 검증)

    Care->>Pay: PetCoinEscrow 생성·적립 시도
    Pay-->>Care: 에스크로 상태
    Care->>Care: 신청·완료 전이
    Note over Pay: 완료 시 Payment 도메인에서 지급·환불`,
      },
      {
        seq: 'chat',
        pillLabel: 'Chat 연계(인프라)',
        heading:
          'Chat — Care 연계(RELATED_CARE 후 메시지·unread·읽음)',
        chart: `sequenceDiagram
    participant FE as 프론트엔드
    participant Care as Care 도메인
    participant Chat as Chat 도메인
    participant DB as DB

    FE->>Care: 케어 비즈 요청(API)
    Care->>Chat: RELATED_CARE_REQUEST 등으로 방 생성 위임
    Chat->>Chat: REQUIRES_NEW·참여자 검증 DIRECT 재사용
    Chat->>DB: Conversation · Participant 저장
    DB-->>Chat: 방 식별자

    FE->>Chat: 메시지 전송
    Chat->>DB: 메시지 + unread 증가
    FE->>Chat: 목록·읽음 요청
    alt 재참여 조회
        Chat->>DB: joinedAt 이후만
    else 읽음 처리
        Chat->>DB: unread 초기화 lastRead
    end`,
      },
    ],
  },
  {
    tab: 'missing-pet',
    tocLabel: 'Missing Pet',
    defaultSeq: 'biz',
    sequences: [
      {
        seq: 'biz',
        pillLabel: '제보·댓글',
        heading: 'Missing Pet — 제보·댓글·알림·채팅 연결',
        chart: `sequenceDiagram
    participant FE as 프론트엔드
    participant MP as MissingPet 도메인
    participant DB as DB
    participant NF as Notification 도메인
    participant Chat as Chat 도메인

    FE->>MP: 실종 게시글 작성 API(제보자)
    MP->>DB: MissingPet 저장
    FE->>MP: 파일 첨부 API(제보자)
    MP->>DB: Attachment 링크

    FE->>MP: 목격 댓글 API(목격자)
    MP->>DB: 댓글 저장
    MP->>NF: 제보자 알림 트리거

    FE->>MP: 제보자와 채팅 시작(목격자)
    MP->>DB: 작성자 ID만 경량 조회
    MP->>Chat: 1대1 채팅방 연결`,
      },
      {
        seq: 'chat',
        pillLabel: 'Chat 연계(인프라)',
        heading:
          'Chat — Missing Pet 연계(RELATED_MISSING_PET 후 메시지·읽음)',
        chart: `sequenceDiagram
    participant FE as 프론트엔드
    participant MP as MissingPet 도메인
    participant Chat as Chat 도메인
    participant DB as DB

    FE->>MP: 제보 작성·목격 채팅 시작 등(API)
    MP->>Chat: RELATED_MISSING_PET 등으로 방 생성 위임
    Chat->>Chat: REQUIRES_NEW·참여자 검증 DIRECT 재사용
    Chat->>DB: Conversation · Participant 저장
    DB-->>Chat: 방 식별자

    FE->>Chat: 메시지 전송
    Chat->>DB: 메시지 + unread 증가
    FE->>Chat: 목록·읽음 요청
    alt 재참여 조회
        Chat->>DB: joinedAt 이후만
    else 읽음 처리
        Chat->>DB: unread 초기화 lastRead
    end`,
      },
    ],
  },
  {
    tab: 'meetup',
    tocLabel: 'Meetup',
    defaultSeq: 'biz',
    sequences: [
      {
        seq: 'biz',
        pillLabel: '모임·참가',
        heading: 'Meetup — 모임 생성·이벤트·그룹 채팅·참가',
        chart: `sequenceDiagram
    participant FE as 프론트엔드
    participant Meet as Meetup 도메인
    participant Chat as Chat 도메인
    participant DB as DB

    FE->>Meet: 모임 생성 요청
    Meet->>DB: 트랜잭션 커밋
    Meet->>Meet: 커밋 후 MeetupCreatedEvent
    Meet->>Chat: 비동기 이벤트로 그룹방 생성 요청
    Chat->>DB: 그룹 채팅방 저장

    FE->>Meet: 참가 요청
    Meet->>DB: 비관적 락·원자 증원
    alt 성공
        DB-->>Meet: 업데이트 OK
        Meet-->>FE: 참여 완료
    else PK 충돌 등
        Meet->>DB: 증원 롤백 처리
        Meet-->>FE: 이미 참여 등
    end`,
      },
      {
        seq: 'chat',
        pillLabel: 'Chat 연계(인프라)',
        heading:
          'Chat — Meetup 연계(커밋 후 이벤트로 그룹방·메시지)',
        chart: `sequenceDiagram
    participant FE as 프론트엔드
    participant Meet as Meetup 도메인
    participant Chat as Chat 도메인
    participant DB as DB

    FE->>Meet: 모임 생성(API)
    Meet->>DB: 모임 저장·커밋
    Meet->>Chat: 트랜잭션 커밋 후 이벤트로 그룹방 생성 위임
    Chat->>DB: Conversation · Participant(그룹)
    DB-->>Chat: 방 식별자

    FE->>Chat: 그룹 메시지 또는 목록
    Chat->>DB: 메시지 + unread 증가
    FE->>Chat: 재참여·읽음 요청
    alt 재참여 조회
        Chat->>DB: joinedAt 이후만
    else 읽음 처리
        Chat->>DB: unread 초기화 lastRead
    end`,
      },
    ],
  },
  {
    tab: 'location',
    tocLabel: 'Location',
    defaultSeq: 'main',
    sequences: [
      {
        seq: 'main',
        pillLabel: '',
        heading: 'Location — 지도 UX·통합 검색 분기',
        chart: `sequenceDiagram
    participant FE as 프론트엔드
    participant LOC as Location 도메인
    participant DB as DB

    FE->>FE: 지도 이동(클라이언트만 갱신)
    Note over FE: 검색 API 호출 없음

    FE->>FE: 이 지역 검색 버튼
    FE->>LOC: GET 등 검색 요청(lat·lng 또는 지역·키워드)

    alt lat·lng 반경 검색
        LOC->>DB: ST_Within + 거리 순
        DB-->>LOC: 반경 결과
    else 지역 계층만
        LOC->>DB: sido·sigungu 등 인덱스
        DB-->>LOC: 지역 결과
    else keyword만 FULLTEXT
        LOC->>DB: MATCH·score
        DB-->>LOC: 키워드 결과
    else 조건 없음
        LOC->>DB: 전체 평점순
        DB-->>LOC: 목록
    end

    LOC-->>FE: HTTP 응답`,
      },
    ],
  },
  {
    tab: 'recommendation',
    tocLabel: 'Recommendation',
    defaultSeq: 'main',
    sequences: [
      {
        seq: 'main',
        pillLabel: '',
        heading: 'Recommendation — pet-data-api 신호 합류',
        chart: `sequenceDiagram
    participant FE as 프론트엔드
    participant REC as Recommendation 도메인
    participant LOC as Location 도메인
    participant API as "pet-data-api (외부)"

    FE->>REC: GET /api/recommend
    REC->>REC: 컨텍스트 분기

    alt 시설 8종 Track A
        REC->>LOC: 반경 후보
        LOC-->>REC: 후보 목록
        REC->>API: GET /popular · /trends (PetDataApiClient)
        API-->>REC: 신호 JSON
        Note over REC: 병합·정렬
    else Track B
        REC->>API: recommend() 일괄 (PetDataApiClient)
        API-->>REC: RecommendResponse JSON
    end

    REC-->>FE: 200 OK`,
      },
    ],
  },
  {
    tab: 'chat',
    tocLabel: 'Chat',
    defaultSeq: 'care',
    sequences: [
      {
        seq: 'care',
        pillLabel: 'Care 연계',
        heading:
          'Chat — Care 연계(RELATED_CARE 후 메시지·unread·읽음)',
        chart: `sequenceDiagram
    participant FE as 프론트엔드
    participant Care as Care 도메인
    participant Chat as Chat 도메인
    participant DB as DB

    FE->>Care: 케어 비즈 요청(API)
    Care->>Chat: RELATED_CARE_REQUEST 등으로 방 생성 위임
    Chat->>Chat: REQUIRES_NEW·참여자 검증 DIRECT 재사용
    Chat->>DB: Conversation · Participant 저장
    DB-->>Chat: 방 식별자

    FE->>Chat: 메시지 전송
    Chat->>DB: 메시지 + unread 증가
    FE->>Chat: 목록·읽음 요청
    alt 재참여 조회
        Chat->>DB: joinedAt 이후만
    else 읽음 처리
        Chat->>DB: unread 초기화 lastRead
    end`,
      },
      {
        seq: 'missingpet',
        pillLabel: 'Missing Pet 연계',
        heading:
          'Chat — Missing Pet 연계(RELATED_MISSING_PET 후 메시지·읽음)',
        chart: `sequenceDiagram
    participant FE as 프론트엔드
    participant MP as MissingPet 도메인
    participant Chat as Chat 도메인
    participant DB as DB

    FE->>MP: 제보 작성·목격 채팅 시작 등(API)
    MP->>Chat: RELATED_MISSING_PET 등으로 방 생성 위임
    Chat->>Chat: REQUIRES_NEW·참여자 검증 DIRECT 재사용
    Chat->>DB: Conversation · Participant 저장
    DB-->>Chat: 방 식별자

    FE->>Chat: 메시지 전송
    Chat->>DB: 메시지 + unread 증가
    FE->>Chat: 목록·읽음 요청
    alt 재참여 조회
        Chat->>DB: joinedAt 이후만
    else 읽음 처리
        Chat->>DB: unread 초기화 lastRead
    end`,
      },
      {
        seq: 'meetup',
        pillLabel: 'Meetup 연계',
        heading:
          'Chat — Meetup 연계(커밋 후 이벤트로 그룹방·메시지)',
        chart: `sequenceDiagram
    participant FE as 프론트엔드
    participant Meet as Meetup 도메인
    participant Chat as Chat 도메인
    participant DB as DB

    FE->>Meet: 모임 생성(API)
    Meet->>DB: 모임 저장·커밋
    Meet->>Chat: 트랜잭션 커밋 후 이벤트로 그룹방 생성 위임
    Chat->>DB: Conversation · Participant(그룹)
    DB-->>Chat: 방 식별자

    FE->>Chat: 그룹 메시지 또는 목록
    Chat->>DB: 메시지 + unread 증가
    FE->>Chat: 재참여·읽음 요청
    alt 재참여 조회
        Chat->>DB: joinedAt 이후만
    else 읽음 처리
        Chat->>DB: unread 초기화 lastRead
    end`,
      },
    ],
  },
];

/** @param {{ get: (key: string) => string | null }} searchParams */
export function resolvePetoryFlowSelection(searchParams) {
  const rawTab = searchParams.get('tab');
  const rawSeq = searchParams.get('seq');

  const group =
    PETORY_FLOW_GROUPS.find((g) => g.tab === rawTab) ?? PETORY_FLOW_GROUPS[0];

  const hasSeq = group.sequences.some((s) => s.seq === rawSeq);
  const seq = hasSeq ? rawSeq : group.defaultSeq;

  const variant =
    group.sequences.find((s) => s.seq === seq) ?? group.sequences[0];

  return { group, seq, variant };
}
