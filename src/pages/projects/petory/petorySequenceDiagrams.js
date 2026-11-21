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
    BD->>DB: 게시글 저장
    BD->>FI: Attachment 동기화
    BD-->>FE: DTO

    FE->>BD: GET 목록·상세
    BD->>DB: 반응·첨부 배치 집계 등
    alt 상세 조회 + 로그인 사용자
        BD->>DB: BoardViewLog insertIgnore 후 조회수 보정
    end

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
    defaultSeq: 'contract',
    sequences: [
      {
        seq: 'contract',
        pillLabel: '',
        heading: 'Care — 등록 시 코인 보관 → 제안 → 수락(제공자) → 정산',
        chart: `sequenceDiagram
    participant FE as 프론트엔드
    participant CR as CareRequestController
    participant CO as CareOfferController
    participant Pay as PetCoinEscrowService
    participant NF as Notification

    Note over FE,Pay: ① 등록 — 돈을 확정이 아니라 여기서 잡는다
    FE->>CR: POST /api/care-requests (요청자)
    CR->>Pay: holdForRequest(요청, 제시 금액)
    Pay->>Pay: 비관적 락 안에서 잔액 검사 → 차감 → HOLD
    Note over Pay: 확정 시점에 차감하면 채팅까지 마친 뒤에야 잔액 부족이 드러난다

    Note over FE,NF: ② 제안 — 요청자가 제공자를 지목 (offeredCoins 스냅샷)
    FE->>CO: POST /api/care-offers
    CO->>NF: CARE_OFFER_RECEIVED

    Note over FE,NF: ③ 수락 — 제공자가 받는다
    FE->>CO: POST /api/care-offers/{offerIdx}/accept (제공자)
    CO->>CO: findByIdForUpdate(요청) — 요청 행 비관적 락
    alt 제안 금액 ≠ 요청의 현재 금액
        CO-->>FE: offeredAmountChanged — 금액이 바뀐 뒤의 수락을 막는다
    else 일치
        CO->>CO: 제안 ACCEPTED · 같은 요청의 나머지 PENDING 제안 REJECTED
        CO->>CR: 요청 OPEN → IN_PROGRESS
        CO->>Pay: assignProvider(지급 대상 배정)
        CO->>NF: CARE_OFFER_ACCEPTED
    end

    Note over FE,Pay: ④ 종료 — 요청자·제공자가 각각 확인해야 정산
    FE->>CR: POST /api/care-requests/{id}/complete
    CR->>Pay: 양쪽 확인되면 releaseToProvider (HOLD → RELEASED)
    FE->>CR: 취소·삭제
    CR->>Pay: refundToRequester (HOLD → REFUNDED)

    Note over CO,NF: 제안이 끝나는 길을 셋으로 구분한다 — REJECTED(제공자 거절) ·<br/>WITHDRAWN(요청자 사정: 금액 변경·취소·삭제) · EXPIRED(아무도 안 움직임)`,
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
    participant FI as File 도메인
    participant NF as Notification 도메인
    participant Chat as Chat 도메인

    FE->>MP: 실종 게시글 작성 API(제보자, imageUrl)
    MP->>DB: MissingPet 저장
    MP->>FI: Attachment 동기화

    FE->>MP: 목격 댓글 API(목격자)
    MP->>DB: 댓글 저장
    MP->>FI: 댓글 이미지 Attachment 동기화(선택)
    MP->>NF: 제보자 알림 트리거

    FE->>MP: 제보자와 채팅 시작(목격자)
    MP->>DB: 작성자 ID만 경량 조회
    MP->>Chat: 1대1 채팅방 연결`,
      },
      {
        seq: 'chat',
        pillLabel: 'Chat 연계(인프라)',
        heading:
          'Chat — Missing Pet 연계(MISSING_PET_BOARD 후 메시지·읽음)',
        chart: `sequenceDiagram
    participant FE as 프론트엔드
    participant MP as MissingPet 도메인
    participant Chat as Chat 도메인
    participant DB as DB

    FE->>MP: 제보 작성·목격 채팅 시작 등(API)
    MP->>Chat: MISSING_PET_BOARD related로 방 생성 위임
    Chat->>Chat: REQUIRES_NEW·참여자 검증 DIRECT 재사용
    Chat->>DB: Conversation · Participant 저장
    DB-->>Chat: 방 식별자

    FE->>Chat: 메시지 전송
    Chat->>DB: 메시지 + unread 증가
    FE->>Chat: 목록·읽음 요청
    alt 일반 메시지 조회 재참여
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
    alt 일반 메시지 조회 재참여
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
    defaultSeq: 'board',
    sequences: [
      {
        seq: 'board',
        pillLabel: 'Board 연계',
        heading:
          'Recommendation — Board 연계(CommunityPostCreatedEvent → signal)',
        chart: `sequenceDiagram
    participant FE as 프론트엔드
    participant BD as Board 도메인
    participant REC as Recommendation 도메인
    participant NLP as petory-nlp-server
    participant DB as DB

    FE->>BD: POST 게시글(제목·내용)
    BD->>DB: 게시글 저장
    BD-->>FE: 200 OK
    BD->>REC: CommunityPostCreatedEvent

    REC->>REC: @Async EventListener
    REC->>NLP: POST /api/pet-intent/analyze
    NLP-->>REC: intentDomain·intent·categories·tags

    alt domain·urgency별 Spring threshold 통과
        REC->>DB: user_pet_intent_signal 저장(TTL 1/3/7/14일)
        DB-->>REC: 저장 OK
    else 신뢰도 낮음
        Note over REC: signal 저장 생략
    end

    Note over REC,NLP: NLP 실패해도 게시글 작성은 성공`,
      },
      {
        seq: 'care',
        pillLabel: 'Care 연계',
        heading:
          'Recommendation — Care 연계(CareRequestCreatedEvent → signal)',
        chart: `sequenceDiagram
    participant FE as 프론트엔드
    participant Care as Care 도메인
    participant REC as Recommendation 도메인
    participant NLP as petory-nlp-server
    participant DB as DB

    FE->>Care: POST 케어 요청(내용)
    Care->>DB: 요청 저장
    Care-->>FE: 200 OK
    Care->>REC: CareRequestCreatedEvent

    REC->>REC: @Async EventListener
    REC->>NLP: POST /api/pet-intent/analyze
    NLP-->>REC: intentDomain·intent·categories·tags

    alt domain·urgency별 Spring threshold 통과
        REC->>DB: user_pet_intent_signal 저장(TTL 1/3/7/14일)
        DB-->>REC: 저장 OK
    else 신뢰도 낮음
        Note over REC: signal 저장 생략
    end

    Note over REC,NLP: NLP 실패해도 케어 요청은 성공`,
      },
      {
        seq: 'location',
        pillLabel: 'Location 연계',
        heading:
          'Recommendation — Location 연계(LocationSearchPerformedEvent → signal)',
        chart: `sequenceDiagram
    participant FE as 프론트엔드
    participant LOC as Location 도메인
    participant REC as Recommendation 도메인
    participant NLP as petory-nlp-server
    participant DB as DB

    FE->>LOC: GET /api/location-services/search + keyword
    LOC->>DB: 반경·키워드 검색
    DB-->>LOC: 검색 결과
    LOC-->>FE: 목록 응답(본 요청 우선)
    LOC->>REC: LocationSearchPerformedEvent(로그인 사용자)

    REC->>REC: 자연어 필터(length≥7·공백) + Redis 10분 dedup
    alt 필터 통과
        REC->>REC: @Async EventListener
        REC->>NLP: POST /api/pet-intent/analyze
        NLP-->>REC: intentDomain·intent·categories·tags
        alt domain·urgency별 Spring threshold 통과
            REC->>DB: user_pet_intent_signal 저장(LOCATION_SEARCH)
            DB-->>REC: 저장 OK
        else 신뢰도 낮음
            Note over REC: signal 저장 생략
        end
    else 필터 실패 또는 Redis 장애
        Note over REC: NLP 호출·signal 저장 생략
    end

    Note over LOC,REC: 익명 검색은 이벤트·signal 대상 아님`,
      },
      {
        seq: 'card',
        pillLabel: '추천 카드',
        heading:
          'Recommendation — /signals · 카드 · Location category 검색',
        chart: `sequenceDiagram
    participant FE as 프론트엔드
    participant REC as Recommendation 도메인
    participant LOC as Location 도메인
    participant DB as DB

    FE->>FE: 주변서비스 탭 활성(로그인)
    FE->>REC: GET /api/pet-recommend/signals
    REC->>DB: 유효 signal 조회
    DB-->>REC: cardMessage·actionLabel·targetCategory
    REC-->>FE: 추천 카드 payload

    FE->>FE: LocationControls 카드 표시
    FE->>FE: 카드 클릭(targetCategory)
    FE->>LOC: GET search?category=… (+ lat·lng·radius)
    LOC->>DB: 반경·카테고리 WHERE
    DB-->>LOC: 시설 목록
    LOC-->>FE: 지도·목록 갱신

    Note over FE,LOC: 장소 목록은 REC가 아닌 Location 도메인이 조회`,
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
          'Chat — Care 연계(CARE_REQUEST 방 생성 후 메시지·unread·읽음)',
        chart: `sequenceDiagram
    participant FE as 프론트엔드
    participant Care as Care 도메인
    participant Chat as Chat 도메인
    participant DB as DB

    FE->>Care: 케어 비즈 요청(API, Chat과 별도 호출)
    FE->>Chat: POST /api/chat/conversations (relatedType=CARE_REQUEST)
    Note over Care,Chat: Care 백엔드는 Chat에 의존하지 않음 — 프론트가 두 API를 각각 호출
    Chat->>Chat: REQUIRES_NEW·기존 방 재사용 체크
    Chat->>DB: Conversation · Participant 저장
    DB-->>Chat: 방 식별자

    FE->>Chat: 메시지 전송
    Chat->>DB: 메시지 + unread 증가
    FE->>Chat: 목록·읽음 요청
    alt 일반 메시지 조회 재참여
        Chat->>DB: joinedAt 이후만
    else 읽음 처리
        Chat->>DB: unread 초기화 lastRead
    end`,
      },
      {
        seq: 'missingpet',
        pillLabel: 'Missing Pet 연계',
        heading:
          'Chat — Missing Pet 연계(MISSING_PET_BOARD 후 메시지·읽음)',
        chart: `sequenceDiagram
    participant FE as 프론트엔드
    participant MP as MissingPet 도메인
    participant Chat as Chat 도메인
    participant DB as DB

    FE->>MP: 제보 작성·목격 채팅 시작 등(API)
    MP->>Chat: MISSING_PET_BOARD related로 방 생성 위임
    Chat->>Chat: REQUIRES_NEW·참여자 검증 DIRECT 재사용
    Chat->>DB: Conversation · Participant 저장
    DB-->>Chat: 방 식별자

    FE->>Chat: 메시지 전송
    Chat->>DB: 메시지 + unread 증가
    FE->>Chat: 목록·읽음 요청
    alt 일반 메시지 조회 재참여
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
    alt 일반 메시지 조회 재참여
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

/** @param {string} tab */
export function getPetoryFlowGroupByTab(tab) {
  return PETORY_FLOW_GROUPS.find((g) => g.tab === tab) ?? null;
}
