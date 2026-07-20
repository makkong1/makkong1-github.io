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
      '관계 종류로 처리를 나눔. 작성자(@ManyToOne, 글 1개=작성자 1명)는 조인해도 게시글 행이 안 늘어 JOIN FETCH로 함께. 반응·첨부는 컬렉션이라 조인하면 개수만큼 행이 뻥튀기(카티전 곱) → 게시글 ID를 IN 절로 묶어 반응은 타입별 GROUP BY 집계, 첨부는 IN 일괄 조회 → 서비스단(enrichBoardDTOs)에서 Map으로 사후 병합. 함정: Page.map(converter::toDTO)를 쓰면 단건 변환기가 행마다 호출돼 N+1이 재발하므로 배치 변환기(toDTOList) 사용. 핵심 통찰: 느렸던 진짜 원인은 인덱스 부재가 아니라 왕복 횟수 — 개별조회든 배치든 같은 인덱스(board_reaction UNIQUE)를 그대로 타고 실행계획은 이미 최적이었고, 301번 개별 왕복 vs 3번 배치가 차이였다(N+1과 인덱스는 다른 축).',
    verify:
      '게시글 100 / 작성자 10명 순환 / 반응 700개 fixture, entityManager.clear() 후 측정. 쿼리 수는 데이터 규모와 무관하게 3개로 고정.',
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
      'OFFSET은 "건너뛰기"가 아니라 "만들고 버리기"다. OFFSET 49,980을 알려면 정렬 순서대로 앞의 49,980행을 만들어 버린다(O(offset)). LIMIT은 정렬이 끝난 뒤 적용돼 1페이지든 뒷페이지든 정렬 비용이 같다. 게다가 가시성 판정에 users 조인이 필요해 board 인덱스만으로 커버되지도 않는다 → 뒷페이지가 10만 행 검사·0행 반환(≈133ms).',
    alternatives:
      '① 키셋 페이징 — O(1)이고 COUNT까지 소멸하지만, 페이지 번호·점프·"몇 건 중 몇 번째" UI를 포기해야 한다(무한스크롤/커서만). 페이징이 board 혼자가 아니라 공유 컴포넌트라, board만 키셋으로 바꾸면 앱 전체 페이징 정체성이 깨져 기각. ② 아무것도 안 함 — 비싼 건 사람이 잘 안 가는 깊은 페이지뿐이지만 "맨 뒤" 버튼이 유일한 실사용 트리거, COUNT 개선 이점을 포기하게 돼 탈락. ③ 지연조인 + author_visible 비정규화 — 스캔 완화 + COUNT 단일 테이블, 대가는 비정규화 컬럼 + 트리거 하나 → 채택.',
    decision:
      '지연조인만으로는 안 풀린다(함정). 1단계 커버링 인덱스가 board 컬럼만으로 성립해야 하는데 is_deleted만으로는 정지·삭제 회원 글이 새어 요청한 20건을 못 채우는 결손 페이지(size 미달)가 난다 → 가시성을 author_visible 컬럼으로 비정규화하고, users 상태 변경을 AFTER UPDATE 트리거 하나로 동기화(JPA가 되돌리지 못하게 갱신 소유권은 트리거만). 그 위에서 1단계 커버링 인덱스로 idx만 깊은 skip → 2단계 살아남은 20건만 작성자 조인 → COUNT는 board 단일 테이블.',
    verify:
      'EXPLAIN FORMAT=JSON으로 filesort/temporary table 소멸 확인, k6 부하로 응답시간 측정, 비정규화 없이 is_deleted만일 때의 페이지 결손 23.8% 검증.',
    metrics: [['깊은 페이지', '133ms', '24~32ms']],
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
      '성격이 세 갈래로 다르다. 모임 참가: 3명 동시 참가 시 셋 다 current(1) < max(3) 통과 → 4명 초과 예상, 재현하니 실제로는 데드락으로 1~2건만 커밋되는 반전. 펫코인 차감: 5개 스레드가 잔액 100을 각자 읽고 110으로 덮어씀 → Lost Update(40 분실). 케어 거래 확정: 양측 동시 확정 시 격리수준(REPEATABLE READ) 탓에 서로 상대의 미커밋 확정을 못 봐서 둘 다 allConfirmed=false로 후속 로직을 스킵 → 확정이 안 되는 Stuck State.',
    decision:
      '"동시성 = 무조건 락"이 아니라 연산 성격으로 나눔. 모임 인원(단순 조건부 증가)은 UPDATE ... WHERE current < max 원자적 한 문장 + DB CHECK 제약. 초과 방지는 비관적/낙관적/원자적 락 다 가능하지만 원자적 UPDATE는 락·데드락 관리 불필요 + 락을 참가자 INSERT까지 안 잡음이라 택함 — 속도 때문이 아니다(저경합에선 비관적 락이 오히려 빨랐다). 펫코인 차감(잔액 부족 검증 필수)은 원자적 UPDATE로 "부족" 분기를 못 태워 비관적 락. 케어 거래 확정(두 참여자 상태를 함께 판단하는 check-then-act)은 원자적 UPDATE로 표현 불가라 상위 엔티티(Conversation) 락으로 직렬화. 에스크로 락 쿼리엔 fetch join을 일부러 안 붙임(락 범위 확대 위험).',
    verify:
      'READ COMMITTED / 3명·5명 동시 / 트랜잭션 우회 직접 repo 호출(결정론적)로 재현 → 해결 후 인원 ≤ 최대, 잔액·확정 정합성 유지 확인.',
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
    decision:
      '위도/경도/반경 파라미터 기반 반경 조회로 전환 + DEFAULT_RADIUS_LIMIT 반환 상한. 반경은 1차 ST_Within(POLYGON bounding box)으로 공간 인덱스를 태워 후보를 좁히고, 2차 ST_Distance_Sphere로 정확한 원형 거리 재필터(이중 필터). 지도 이동 시 결과 흔들림 방지로 반환 수 고정 + stable 정렬.',
    verify:
      'git worktree로 실제 before 커밋(5ef571d9)을 띄워 파라미터 없이 자연 실행되는 진짜 무제한 조회를 측정. 현재 코드에 size=30000을 준 재현 트릭과 0.4% 오차로 교차확인.',
    metrics: [
      ['응답 크기', '22.4MB', '100KB (-99.6%)'],
      ['응답 시간', '531.8ms', '50.9ms'],
    ],
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
      'Statistics API가 Spring Data 파생 쿼리·컬렉션 lazy 초기화를 누락해 실제 SQL의 절반만 집계하고 있었다. SQL 로그 카운트(grep -c)로 재검증해 실제는 41개임을 확인. 해결 자체는 findByConversationIdxsAndStatus 등에서 JOIN FETCH로 한 번에. 이후 쿼리 수는 Statistics가 아니라 SQL 로그를 기준으로 잰다.',
    verify:
      'git worktree로 before 커밋(496e121a)을 실제 checkout해 프로덕션 코드 경로를 그대로 호출 + SQL 로그 카운트.',
    metrics: [
      ['쿼리 수', '41개', '4개 (-90.2%)'],
      ['응답 시간', '167ms', '70ms'],
    ],
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
