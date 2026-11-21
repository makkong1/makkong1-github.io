/**
 * Petory 대표 사례 — 셀렉터 페이지 데이터.
 *
 * 구성은 PDF 포트폴리오(docs/interview/이력서/범용/petory-포트폴리오-7p.md)와 1:1로 맞춘다.
 * 1번은 PDF L25·L87·L156·L175 에 흩어져 있던 "측정" 세 건을 한 장으로 묶은 것이고,
 * 2~7번이 PDF §1~§6 이다. 숫자를 바꿀 일이 생기면 PDF 와 이 파일을 같이 고친다.
 *
 * 작성 형식(고정): 헤드라인 한 줄 = [무엇을 어떻게] + [결과 수치], 그 아래 불릿 2~3개.
 *   서술형 문단(배경·문제·결정·검증)은 쓰지 않는다 — 스캔할 수 있어야 한다.
 *
 * ⚠️ COUNT 는 "56,001 → 50행" 으로 쓰지 않는다. 50행은 옆의 튜닝된 목록 SELECT 였다
 *    (_공부일지.md:525 정정). 수정 후에도 COUNT 는 매칭 행을 다 센다 — 줄어든 건 조인이다.
 *
 * @typedef {{
 *   id: string, label: string, domain: string,
 *   headline: string, bullets: string[],
 *   steps?: {tag: string, title: string, paras: string[]}[],
 *   bulletsTitle?: string,
 *   strategies?: string[][], code?: string, codeLang?: string,
 * }} PetoryCase
 */

/** @type {PetoryCase[]} */
export const PETORY_CASES = [
  {
    id: 'measurement',
    label: '측정 방식 검증',
    domain: '측정',
    headline: '측정 방식의 오류를 발견하고 62개 엔드포인트를 다시 검증한 과정',
    steps: [
      {
        tag: '\u2460',
        title: '실제 실행되는 COUNT 쿼리를 확인하지 못했습니다',
        paras: [
          'Page<>를 반환하면 Spring Data JPA가 전체 페이지 수를 계산하기 위해 COUNT 쿼리를 별도로 실행합니다. 이 SQL은 Hibernate가 자동 생성하기 때문에 코드에 직접 작성되어 있지 않습니다.',
          '애플리케이션을 실행해 엔드포인트를 호출한 결과, COUNT 쿼리가 목록 조회 쿼리의 JOIN을 그대로 사용하면서 한 번의 요청에 56,001행(users 10,001 + 조인 통과 46,000)을 검사하고 있었습니다.',
          '기존에는 코드에 작성된 SELECT만 확인하고 있었습니다. 실제 요청에서 실행되는 SQL까지 확인하지 못한 것이 문제였습니다. 이후 curl로 API를 호출하면서 실제 발행되는 SQL을 확인하는 방식으로 바꾸고, 62개 엔드포인트를 다시 점검했습니다.',
        ],
      },
      {
        tag: '\u2461',
        title: 'N+1 측정 결과가 실제 SQL 실행 횟수와 달랐습니다',
        paras: [
          'N+1 회귀 테스트를 작성하던 중 JOIN FETCH를 제거해도 테스트가 실패하지 않는 문제를 발견했습니다.',
          'Hibernate Statistics의 getQueryExecutionCount()는 JPQL 실행 횟수와 실제 SQL 실행 횟수가 일치하지 않을 수 있었습니다. 같은 실행에서 Care 조회를 101건으로 집계했지만, JDBC에서 확인한 실제 SQL 실행 횟수는 303건이었습니다.',
          '이 측정값만 사용했다면 N+1 문제가 해결됐다고 잘못 판단할 수 있었습니다. 이후 JDBC의 getPrepareStatementCount()와 SQL 로그를 함께 확인하도록 측정 방식을 변경했습니다.',
        ],
      },
      {
        tag: '\u2462',
        title: '테스트가 통과했지만 실제로는 데드락이 발생했습니다',
        paras: [
          '경고 수가 유실되는 문제를 확인하던 중, 테스트의 검증 조건에도 문제가 있다는 것을 발견했습니다.',
          '기존 테스트는 경고 수와 기록 수를 비교했지만, 두 값을 같은 트랜잭션 안에서 확인하고 있었습니다. 이 때문에 실제로 문제가 발생해도 테스트가 통과할 수 있었습니다. 재검증 결과 5건 중 4건이 데드락으로 롤백되고 있었습니다.',
          '테스트의 검증 기준을 변경해 성공한 호출 수와 최종 DB에 반영된 경고 수를 비교하도록 수정했습니다.',
        ],
      },
    ],
    bulletsTitle: '측정 및 검증 방식 개선',
    bullets: [
      '수정 전 상태는 추측하지 않고 Git worktree로 수정 직전 커밋을 복원해 측정합니다.',
      '수정 후에는 적용 → 제거 → 재적용(A/B/A) 방식으로 변경 사항과 결과의 관계를 확인합니다.',
      "확인하지 못한 범위는 문제가 없다고 판단하지 않고 '미측정'으로 구분합니다.",
    ],
  },
  {
    id: 'board-list',
    label: '게시글 목록',
    domain: 'Board',
    headline: '비정규화 + 커버링 인덱스로 깊은 페이지 133ms → 24~32ms, COUNT 21.9~32.2ms → 7.5~25.2ms',
    bullets: [
      '뒤쪽 페이지가 느린 건 OFFSET이 아니었다 — users.status 히스토그램이 없어 옵티마이저가 선택도를 1%로 추정(실제 92%)하고 users를 드라이빙 테이블로 골라, 매 페이지 조인 결과 4.6만 행을 filesort 했다',
      'users 조건을 board.author_visible 컬럼으로 비정규화(트리거 동기화)해 조인을 없애고, 커버링 인덱스로 idx만 훑어 깊은 위치까지 skip → 추린 20건만 작성자 조인. 조인이 사라지자 COUNT도 board 단일 테이블 카운트가 됐다',
      '성능이 가장 좋은 키셋 페이징은 기각했다 — 앱 전역이 쓰는 공유 PageNavigation의 페이지 번호·"맨 뒤" 점프 UI를 "다음 페이지"만 되는 키셋으로는 지원할 수 없어서',
    ],
    codeLang: 'sql',
    code: `-- 1단계: 커버링 인덱스로 idx만 훑어 깊은 위치까지 skip (조인 없음)
SELECT idx FROM board
 WHERE is_deleted = 0 AND author_visible = 1   -- users 조인을 컬럼으로 대체
 ORDER BY created_at DESC, idx ASC LIMIT :size OFFSET :offset

-- 2단계: 살아남은 20건만 작성자 조인
SELECT ... FROM board b JOIN users u ON ... WHERE b.idx IN :ids`,
  },
  {
    id: 'list-n-plus-one',
    label: '목록 N+1',
    domain: 'Board',
    headline: 'JOIN FETCH + 배치 조회 분리로 목록 쿼리 303문 561ms → 3문 55ms (-99%)',
    bullets: [
      '작성자는 @ManyToOne이라 조인해도 행이 안 늘어 JOIN FETCH, 반응·첨부는 컬렉션이라 조인하면 카티전 곱으로 뻥튀기돼 게시글 ID를 IN으로 묶어 배치 조회 후 Map 병합',
      '느렸던 원인은 인덱스가 아니라 왕복 횟수였다 — 개별조회든 배치든 같은 인덱스를 타 실행계획은 이미 최적이었고, 303번 왕복 vs 3번 배치가 차이였다',
      '쿼리 수는 데이터 규모와 무관하게 3문 고정 (목록 100건, JDBC 문 수 기준)',
    ],
    codeLang: 'java',
    code: `List<Long> boardIds = boards.stream().map(Board::getIdx).toList();

Map<Long, Map<ReactionType, Long>> reactions =
    getReactionCountsBatch(boardIds);                 // IN + GROUP BY
Map<Long, List<FileDTO>> files =
    attachmentFileService.getAttachmentsBatch(FileTargetType.BOARD, boardIds);`,
  },
  {
    id: 'concurrency',
    label: '동시성',
    domain: 'User · Meetup · Payment · Care',
    headline: '락 획득 순서 교정으로 경고 동시 요청 데드락 제거 (1/5 → 5/5 성공, 데드락 0)',
    bullets: [
      'INSERT(FK→users 행 S락) → UPDATE(같은 행 X락) 순서라 동시 요청이 모두 S락을 쥔 채 X락 승격을 노려 순환 대기에 빠졌다 — UPDATE를 먼저 실행해 X락을 선점하니 순차 처리된다',
      '원자적 UPDATE는 증가 방식을 고치는 도구라 잠금 순서 문제에는 듣지 않는다. 같은 트랜잭션이라 순서만 바꿔도 정합성은 동일하다',
      '"동시성 = 무조건 락"이 아니라 현재 값 검증이 필요한가를 기준으로 도메인마다 전략을 나눴다',
    ],
    strategies: [
      ['모임 참가 · meetup', '비관적 락 + 조건부 원자 UPDATE', 'findByIdWithLock 으로 동시 참가 요청을 직렬화(TOCTOU 방지)한 뒤, 증원은 SET current=current+1 WHERE status=RECRUITING AND current<max 한 문장으로. 참가자 중복은 PK 제약이 받는다'],
      ['펫코인 차감 · payment', '비관적 락', '잔액 "부족" 분기를 태우려면 현재값을 읽어야 함 → 원자 UPDATE로 표현 불가 → findByIdForUpdate'],
      ['케어 수락 · care', '요청 행 비관적 락', 'findByIdForUpdate(요청) 으로 동시 수락을 직렬화한다. 제안 시점 금액(offeredCoins)을 요청의 현재 금액과 대조해, 금액이 바뀐 뒤의 수락을 offeredAmountChanged 로 막는다'],
    ],
    codeLang: 'java',
    code: `// 문제: INSERT(FK→users 행 S락) 후 UPDATE(같은 행 X락) → 순환 대기
sanctionRepository.save(warning);            // FK로 users 행 S락
usersRepository.incrementWarningCount(id);   // X락 승격 시도 → Deadlock

// 수정: UPDATE(X락)를 먼저 실행해 X락 선점 → 순차 처리
usersRepository.incrementWarningCount(id);   // X락 선점
sanctionRepository.save(warning);            // 이미 X 보유 → 안전`,
  },
  {
    id: 'petcoin',
    label: '펫코인 · 에스크로',
    domain: 'Payment',
    headline: '돈이 어긋나는 세 경우를 잠금 · DB 제약 · 상태 가드 세 층으로 나눠 막았습니다',
    bullets: [
      '코드를 짜기 전에 동시에 성립해야 하는 것 셋을 적었다 — ① 잔액이 음수가 되지 않을 것 ② 한 요청에 에스크로가 둘 붙지 않을 것 ③ 지급·환불이 두 번 일어나지 않을 것',
      '확정이 아니라 요청 등록 시점에 차감해 보관한다. 확정 시점에 차감하면 제공자가 신청하고 채팅까지 마친 뒤에야 잔액 부족이 드러난다 — 등록에서 잡아야 "올라와 있는 요청은 지급이 보증된다"가 성립한다',
      '모든 거래에 balanceBefore / balanceAfter를 남겨 사용자 행의 잔액과 거래 내역이 서로를 검증하게 했다. 지급 뒤 매출 집계는 AFTER_COMMIT으로 떼어냈다 — 같은 트랜잭션에 두면 집계 저장 실패가 코인 지급을 롤백한다',
    ],
    strategies: [
      ['① 잔액 음수', '비관적 락 (findByIdForUpdate)', '거래 내역에 차감 전 잔액을 남기려면 값을 읽어야 했다. 그 UPDATE도 행에 X락을 잡아 비용 차이가 작으므로 락 안에서 읽고 → 검사하고 → 차감하는 쪽을 골랐다'],
      ['② 보관 중복', 'DB UNIQUE (uk_care_request)', '지금 코드에선 일어나지 않는다(호출 지점이 하나). 그래도 코드가 아니라 DB가 "요청 하나에 에스크로 하나"를 보장하게 걸었다 — 두 번째 호출 경로가 생겨도 안 깨진다'],
      ['③ 이중 지급·환불', '엔티티 상태 가드 + 락 2겹', '가드를 서비스가 아니라 도메인 객체 안에 뒀다. 가드만으로는 두 트랜잭션이 동시에 HOLD를 읽는 경쟁을 못 막는다 — 락이 줄을 세우고, 가드가 두 번째를 튕겨낸다'],
    ],
    codeLang: 'java',
    code: `// PetCoinEscrow — 상태 전이는 엔티티가 스스로 막는다 (HOLD → RELEASED / REFUNDED)
public void release() {
    if (this.status != EscrowStatus.HOLD) throw new IllegalStateException("HOLD 상태만 지급 가능");
    this.status = EscrowStatus.RELEASED;
}
// PetCoinEscrowService — 잠근 뒤 다시 읽은 인스턴스에만 전이를 건다
escrow = escrowRepository.findByIdForUpdate(escrow.getIdx()).orElseThrow(...);
escrow.release();`,
  },
  {
    id: 'spatial-search',
    label: '지도 반경 검색',
    domain: 'Location',
    headline: '반경 조회 + 공간 인덱스로 지도 초기 로드 22.4MB 531.8ms → 100KB 50.9ms (-99.6%)',
    bullets: [
      'size(maxResults)를 그대로 LIMIT에 꽂는 구조라 반환 상한이 없어 2만여 건이 전건 전송되고 있었다',
      '1차 ST_Within(bounding box)으로 공간 인덱스를 태워 후보를 좁히고, 2차 ST_Distance_Sphere로 정확한 원형 거리 재필터 — 결과 수만 LIMIT으로 자르면 지도 중심에서 먼 데이터가 섞이고 지도를 옮길 때마다 결과가 흔들린다',
      'before 커밋(5ef571d9)을 git worktree로 실제 띄워 파라미터 없는 무제한 조회를 그대로 재현해 측정',
    ],
    codeLang: 'sql',
    code: `SELECT * FROM locationservice ls
 WHERE ST_Within(ls.location,                       -- 1차: bbox로 공간 인덱스
         ST_GeomFromText('POLYGON((...))', 4326))
   AND ST_Distance_Sphere(ls.location,              -- 2차: 정확한 원형 거리
         ST_GeomFromText('POINT(:lat :lng)', 4326)) <= :radiusInMeters
   AND ls.is_deleted = 0
 LIMIT :limit`,
  },
  {
    id: 'public-data-import',
    label: '공공데이터 임포트',
    domain: 'Location',
    headline: '2만 건 한 트랜잭션을 1,000건 배치로 쪼개 독립 커밋 — 17일 뒤 재실행에서 쓰기 0건',
    bullets: [
      '한 트랜잭션으로 묶으면 한 행 오류가 전체를 롤백하고 누적된 영속성 컨텍스트가 세션을 오염시킨다. 저장을 별도 빈(LocationServiceBatchWriter)에 위임해 1,000건 단위 REQUIRES_NEW로 커밋한다',
      '같은 클래스 안에서 메서드끼리 호출하면 AOP 프록시를 안 타 REQUIRES_NEW가 조용히 무시된다 — 처음엔 private 메서드라 프록시가 가로챌 수도 없는 이중 결함이었다. saveAll 실패 시엔 컨텍스트를 비우고 1건씩 재시도해 불량 1건 때문에 999건을 잃지 않게 했다',
      '응답 속도가 아니라 실패했을 때 얼마나 덜 잃는가로 평가한 작업이라 before/after 시간은 측정하지 않았다. 재시도 멱등키는 구현하지 않았다(관리자 전용 4경로, 실행 빈도 낮아 우선순위를 낮게 둠)',
    ],
    strategyHeaders: ['실행', '조회 · 신규 · 갱신', '비고'],
    strategies: [
      ['1회차 · 2026-07-21', '조회 70,650 · 신규 1,225 · 갱신 22,672', '스킵 46,753 · 실패 0 · 73s — 스킵은 API 응답에 같은 시설이 여러 번 들어 있어 실행 내 중복 제거로 걸러낸 몫(고유 23,897건)'],
      ['2회차 · 2026-08-07', '조회 70,650 · 신규 0 · 갱신 0', '스킵 70,650 · 실패 0 · 56s — 공개 필드 27개를 필드 단위로 비교해 달라진 게 없으면 UPDATE를 발행하지 않는다'],
    ],
  },
];

/** URL ?case=<id> 로 사례 선택. 없으면 첫 사례. */
export function resolvePetoryCaseSelection(searchParams) {
  const id = searchParams.get('case');
  return PETORY_CASES.find((c) => c.id === id) || PETORY_CASES[0];
}
