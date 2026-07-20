/**
 * Petory 대표 리팩토링 사례 — 셀렉터 페이지 데이터.
 *
 * 정본은 Petory docs/portfolio-source/_cases.md (코드 대조 검증). 이 파일은 그 문서에서 뽑은 것.
 * 딥한 스토리는 여기 한 곳에만 — 도메인 페이지는 이 사례로 링크만 건다(중복 금지).
 * flows의 petorySequenceDiagrams.js와 같은 역할.
 *
 * @typedef {{
 *   id: string, label: string, domain: string, domainPath: string, title: string,
 *   context?: string, problem: string, alternatives?: string, decision: string,
 *   verify?: string, metrics?: string[][], code?: string, codeLang?: string,
 * }} PetoryCase
 */

/** @type {PetoryCase[]} */
export const PETORY_CASES = [
  {
    id: 'list-n-plus-one',
    label: '목록 N+1',
    domain: 'Board',
    domainPath: '/domains/board',
    title: '목록 N+1 — 조인 하나 + 배치 둘',
    context:
      '게시글 목록은 한 화면에 작성자·반응 수(좋아요/싫어요)·첨부를 함께 보여준다. 연관을 개별 로딩하면 N+1이 가장 나기 쉬운 대표 화면.',
    problem:
      '목록 100건 조회 시 작성자는 LAZY라 글마다 1번(N), 반응 수도 글마다 1번(N), 첨부도 글마다 1번(N) → 1 + 3N = 301쿼리(787ms).',
    decision:
      '관계 종류로 처리를 나눔. 작성자(@ManyToOne)는 조인해도 게시글 행이 안 늘어 JOIN FETCH, 반응·첨부는 컬렉션이라 조인하면 행이 뻥튀기(카티전 곱)돼 게시글 ID를 IN으로 묶어 배치 조회 후 서비스단(enrichBoardDTOs)에서 Map 병합. 핵심 통찰: 느렸던 원인은 인덱스가 아니라 왕복 횟수 — 개별조회든 배치든 같은 인덱스를 타 실행계획은 이미 최적이었고, 301번 왕복 vs 3번 배치가 차이였다(N+1과 인덱스는 다른 축).',
    verify:
      '게시글 100 / 반응 700개 fixture, entityManager.clear() 후 측정. 쿼리 수는 데이터 규모와 무관하게 3개로 고정.',
    metrics: [
      ['쿼리 수', '301개', '3개 (-99%, 규모 무관 고정)'],
      ['응답 시간', '787ms', '38ms'],
    ],
    codeLang: 'java',
    code: `List<Long> boardIds = boards.stream().map(Board::getIdx).toList();

Map<Long, Map<ReactionType, Long>> reactions =
    getReactionCountsBatch(boardIds);                 // IN + GROUP BY
Map<Long, List<FileDTO>> files =
    attachmentFileService.getAttachmentsBatch(FileTargetType.BOARD, boardIds);`,
  },
  {
    id: 'deep-paging',
    label: '깊은 페이지 페이징',
    domain: 'Board',
    domainPath: '/domains/board',
    title: '깊은 페이지 — 키셋이 아니라 지연조인',
    context:
      '게시글 5만 건을 OFFSET 페이징한다. 프론트는 페이지 번호·"맨 뒤" 버튼을 노출하는 공유 PageNavigation 컴포넌트를 앱 전체가 함께 쓴다.',
    problem:
      'OFFSET 페이징은 뒷페이지일수록 앞의 N행을 정렬해 버리고 시작한다(OFFSET 49,980 → 5만 행 정렬). 게다가 글 노출 판정에 users 조인이 필요해 board 인덱스만으로 끝나지 않아, 깊은 페이지가 133ms까지 느려졌다.',
    alternatives:
      '키셋(커서) 페이징도 검토했으나, 앱 전역이 페이지 번호·점프 UI(공유 PageNavigation)를 쓰고 있어 "다음 페이지"만 되는 키셋 방식으로는 이 UI를 지원할 수 없어 채택하지 않았다.',
    decision:
      '① users 상태를 board 쪽 author_visible 컬럼으로 비정규화(트리거로 동기화)해 조인 제거 → ② 커버링 인덱스로 board의 PK 컬럼인 idx만 훑어 깊은 위치까지 skip(작성자 조인 없이) → ③ 그렇게 추린 20건의 idx로만 작성자 조인, COUNT는 board 단일 테이블.',
    verify:
      'EXPLAIN + k6 부하로 전·후 응답시간 비교.',
    metrics: [['깊은 페이지', '133ms', '24~32ms']],
    codeLang: 'sql',
    code: `-- 1단계: 커버링 인덱스로 idx만 훑어 깊은 위치까지 skip (조인 없음)
SELECT idx FROM board
 WHERE is_deleted = 0 AND author_visible = 1   -- users 조인을 컬럼으로 대체
 ORDER BY created_at DESC
 LIMIT :size OFFSET :offset

-- 2단계: 살아남은 20건만 작성자 조인
SELECT ... FROM board b JOIN users u ON ...
 WHERE b.idx IN :ids
 ORDER BY b.created_at DESC`,
  },
  {
    id: 'concurrency-strategy',
    label: '동시성 전략 선택',
    domain: 'Meetup · Care',
    domainPath: '/domains/meetup',
    title: '동시성 — 원자적 UPDATE vs 비관적 락 (전략 선택)',
    context:
      '이 프로젝트엔 동시성 지점이 여러 곳(펫코인 잔액·모임 참가 인원·케어 거래 확정 등). 8개 시나리오에서 재현하고, 성격에 따라 전략을 나눴다.',
    problem:
      '동시성 지점이 성격별로 세 갈래였다. 모임 참가: 동시 3명이 각자 정원 미달(current < max)을 통과해 초과. 펫코인 차감: 여러 스레드가 잔액을 각자 읽고 덮어써 Lost Update. 케어 확정: 양측 동시 확정 시 서로의 미커밋 확정을 못 봐 둘 다 대기(Stuck State).',
    alternatives:
      '모든 지점에 비관적 락을 걸 수도 있었으나, 모임 참가처럼 조건부 증가 한 문장(WHERE current < max)으로 표현되는 연산까지 락을 걸면 불필요한 락 대기·데드락 관리 비용만 커진다. 그래서 "읽고 분기"가 꼭 필요한 연산(펫코인, 케어 확정)에만 락을 남겼다.',
    decision:
      '연산 성격별로 전략을 나눔. 모임 인원(단순 조건부 증가)은 원자적 UPDATE 한 문장(WHERE current < max) — 속도가 아니라 성격 기준. 펫코인 차감(잔액 부족 검증 필요)은 현재값을 읽고 분기해야 해 비관적 락. 케어 확정(두 참여자 상태를 함께 판단)은 원자적 UPDATE로 표현 불가라 상위 엔티티(Conversation) 락으로 직렬화.',
    verify:
      '동시 3·5스레드로 재현 → 해결 후 인원 ≤ 최대, 잔액·확정 정합성 유지 확인.',
    metrics: [['무결성', '초과·Lost Update·Stuck State', '구조적으로 불가능']],
    codeLang: 'sql',
    code: `UPDATE Meetup m
   SET m.currentParticipants = m.currentParticipants + 1
 WHERE m.idx = :idx
   AND m.currentParticipants < m.maxParticipants   -- 체크+증가를 한 문장으로`,
  },
  {
    id: 'spatial-search',
    label: '공간 검색',
    domain: 'Location',
    domainPath: '/domains/location',
    title: '초기 로드 22.4MB→100KB (반경 + 공간 인덱스)',
    context:
      '주변서비스·모임·펫케어를 한 화면에 얹는 통합 지도의 초기 로드.',
    problem:
      '초기 로드가 사실상 전체 조회에 가까워 응답이 22.4MB / 531.8ms. size(maxResults)를 그대로 LIMIT에 꽂는 구조라 큰 값이면 전부 반환.',
    alternatives:
      '결과 수만 LIMIT으로 잘라내는 방법도 있었으나, 반경 개념 없이 그냥 자르면 지도 중심에서 먼 데이터까지 섞여 나오고 지도를 옮길 때마다 반환 결과가 흔들린다. 그래서 위경도 기반 반경 조회로 후보 자체를 좁혔다.',
    decision:
      '위도/경도/반경 파라미터 기반 반경 조회로 전환 + DEFAULT_RADIUS_LIMIT 반환 상한. 반경은 1차 ST_Within(POLYGON bounding box)으로 공간 인덱스를 태워 후보를 좁히고, 2차 ST_Distance_Sphere로 정확한 원형 거리 재필터(이중 필터). 지도 이동 시 결과 흔들림 방지로 반환 수 고정 + stable 정렬.',
    verify:
      'git worktree로 before 커밋(5ef571d9)을 실제 띄워 파라미터 없는 무제한 조회를 그대로 재현·측정.',
    metrics: [
      ['응답 크기', '22.4MB', '100KB (-99.6%)'],
      ['응답 시간', '531.8ms', '50.9ms'],
    ],
    codeLang: 'sql',
    code: `SELECT * FROM locationservice ls
 WHERE ST_Within(ls.location,                       -- 1차: bounding box로 공간 인덱스 태움
         ST_GeomFromText('POLYGON((...))', 4326))
   AND ST_Distance_Sphere(ls.location,              -- 2차: 정확한 원형 거리로 재필터
         ST_GeomFromText('POINT(:lat :lng)', 4326)) <= :radiusInMeters
   AND ls.is_deleted = 0
 ORDER BY ...
 LIMIT :limit                                        -- 반환 상한 (초기 무제한 조회 차단)`,
  },
  {
    id: 'measurement-tool',
    label: '측정 도구 함정',
    domain: 'Chat',
    domainPath: '/domains/chat',
    title: '측정값이 아니라 측정 "도구"를 의심한 N+1',
    context:
      '로그인 직후 프론트가 부르는 채팅방 목록(getMyConversations). 참여자·상대 user 정보를 개별 로딩하면 N+1.',
    problem: 'N+1을 잡는데, 처음엔 Hibernate Statistics API로 "21→4"로 측정됐다.',
    decision:
      'Statistics API가 Spring Data 파생 쿼리·컬렉션 lazy 초기화를 누락해 실제 SQL의 절반만 집계하고 있었다. SQL 로그(grep -c)로 재검증하니 실제는 41개. 해결 자체는 JOIN FETCH로 참여자·상대 user를 한 번에 가져온 것 — 그보다 "측정값이 이상하면 측정 도구부터 의심한다"가 이 사례의 핵심이다.',
    verify:
      'git worktree로 before 커밋을 실제 checkout해 프로덕션 경로 그대로 호출 + SQL 로그 카운트.',
    metrics: [
      ['쿼리 수', '41개', '4개 (-90.2%)'],
      ['응답 시간', '167ms', '70ms'],
    ],
    codeLang: 'java',
    code: `// 해결: 참여자와 상대 user를 JOIN FETCH로 한 번에 (개별 lazy 로딩 제거)
@Query("SELECT p FROM ConversationParticipant p JOIN FETCH p.user u "
     + "WHERE p.conversation.idx = :conversationIdx AND p.status = :status "
     + "AND p.isDeleted = false AND u.isDeleted = false")
List<ConversationParticipant> findByConversationIdxAndStatus(...);

// 하지만 이 사례의 핵심은 코드가 아니라: Statistics API가 21→4로 착각하게 만든 것.
// SQL 로그(grep -c)로 재검증하니 실제는 41개였다.`,
  },
  {
    id: 'subquery-optimization',
    label: '서브쿼리 최적화',
    domain: 'Meetup',
    domainPath: '/domains/meetup',
    title: '서브쿼리 → LEFT JOIN + GROUP BY',
    context: '모임 목록에서 각 모임의 참가자 수를 정원과 비교해 "참여 가능" 여부를 함께 판정한다.',
    problem: '참가자 수 집계를 상관 서브쿼리로 처리해, 목록 행마다 서브쿼리가 재실행되며 느림.',
    decision: '상관 서브쿼리 → LEFT JOIN + GROUP BY + HAVING으로 한 번에 집계. 아래 실측은 이 전환 시점의 것이다. (현재 코드는 그 뒤 한 단계 더 나아가, currentParticipants 카운터 컬럼을 도입해 집계 자체를 없애고 WHERE 직접 비교로 단순화 — 이 사례는 "행별 재실행되는 상관 서브쿼리를 어떻게 걷어내나"의 실측 기록이다.)',
    verify: '리팩토링 전/후 EXPLAIN·실행시간·메모리 비교(전환 커밋 c93c81be).',
    metrics: [
      ['실행 시간', '156ms', '57ms (-63.5%)'],
      ['메모리', '19.07MB', '2.00MB (-89.5%)'],
    ],
    codeLang: 'sql',
    code: `-- Before: 상관 서브쿼리 (목록 행마다 재실행)
SELECT m FROM Meetup m
 WHERE m.maxParticipants > (
     SELECT COUNT(p) FROM MeetupParticipants p WHERE p.meetup.idx = m.idx
   )
   AND m.date > :now

-- After: LEFT JOIN + GROUP BY + HAVING (한 번에 집계)
SELECT m FROM Meetup m
  LEFT JOIN m.participants p
 WHERE m.date > :now
 GROUP BY m.idx
HAVING COUNT(p) < m.maxParticipants`,
  },
];

/** URL ?case=<id> 로 사례 선택. 없으면 첫 사례. */
export function resolvePetoryCaseSelection(searchParams) {
  const id = searchParams.get('case');
  return PETORY_CASES.find((c) => c.id === id) || PETORY_CASES[0];
}
