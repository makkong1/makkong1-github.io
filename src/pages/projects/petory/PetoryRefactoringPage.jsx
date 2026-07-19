import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import TableOfContents from '../../../components/Common/TableOfContents';

const sections = [
  { id: 'n-plus-one', title: 'N+1 성능 개선' },
  { id: 'concurrency', title: '동시성 제어' },
  { id: 'location', title: 'Location 최적화' },
  { id: 'notification-read', title: '알림 읽음 처리 최적화' },
  { id: 'over-fetching', title: '목록 오버페칭 제거' },
  { id: 'spatial-index', title: '근처 검색 인덱스 튜닝' },
  { id: 'query-audit', title: '전체 쿼리 감사' },
  { id: 'deep-page', title: '깊은 페이지 페이징 판단' },
];

const cases = [
  {
    id: 'n-plus-one',
    number: '01',
    title: 'JPA N+1 성능 개선',
    scope: 'Board · Care · Chat · MissingPet · User',
    summary:
      '목록 조회에서 연관 데이터를 항목마다 개별 조회하던 구조를 배치 조회, Fetch Join, Map 기반 DTO 조립으로 정리했습니다.',
    points: [
      {
        label: '문제',
        text:
          '부모 엔티티 조회 뒤 작성자, 반응, 파일, 댓글 수, 지원자 수 같은 연관 데이터를 항목마다 가져와 쿼리 수가 레코드 수에 비례해 증가했습니다.',
      },
      {
        label: '원인',
        text:
          'JPA LAZY 로딩, Converter 내부 연관 접근, 루프 안 Repository 단건 호출이 섞여 있었습니다.',
      },
      {
        label: '해결',
        text:
          '목록에 필요한 ID를 먼저 수집하고 IN 절 배치 조회로 한 번에 가져온 뒤 Map으로 DTO 조립 시 매핑했습니다. 항상 필요한 ManyToOne은 Fetch Join으로 처리했습니다.',
      },
    ],
    tableTitle: '대표 수치 — git worktree로 실제 이전 커밋을 checkout해서 실측 (2026-07 재검증)',
    rows: [
      ['도메인', 'Before (실제 커밋 코드)', 'After (dev)', '효과'],
      ['Board', '301 queries / 787ms', '3 queries / 38ms', '쿼리 -99% · 약 20배 단축'],
      ['Care', '151 queries / 478ms', '4 queries / 210ms', '쿼리 -97.4%'],
      ['Chat', '41 queries / 167ms', '4 queries / 70ms', '쿼리 -90.2% · 시간 -58%'],
      ['MissingPet', '267 queries / 762ms', '4 queries / 88ms', '쿼리 -98.5% · 시간 -88%'],
    ],
    note:
      '수치는 추정이 아니라 git worktree로 각 이전 커밋(3a7a581d·7aca5882·496e121a·9c7e0d68)을 실제로 checkout해 그 시점 코드를 재구성 없이 실행한 실측입니다. 재현의 기준은 쿼리 수이고(절대 시간은 JIT·커넥션풀 워밍업 탓에 실행마다 달라집니다), Chat은 재검증 전까지 21→4로 과소집계돼 있었지만 실제 커밋에는 참여자 조회가 한 번 더 있어 41→4였습니다. Care의 "~2,400"은 @BatchSize 도입 이전 시점 값이라 현재 재현치(151→4)로 교체했습니다. 재검증 중 file 테이블에 (target_type, target_idx) 인덱스가 없어 첨부파일 조회가 매번 풀스캔하던 별도 이슈(Care·MissingPet 공통)를 발견해 복합 인덱스를 추가했고(조회 5~14배 단축, CI 스키마·회귀 테스트 반영), N+1과 인덱스는 별개 문제임을 확인했습니다. 이 프로젝트는 이전에(2026-04-14) Chat·Care API에서도 클라이언트가 보낸 userId 대신 JWT principal로 사용자를 식별하도록 같은 방식으로 인가 계약을 정리한 적이 있습니다(Chat 상세 참고).',
    verification:
      'git worktree로 실제 before 커밋을 checkout해 그 시점 코드를 직접 실행하고, dev(after) 코드와 동일 fixture로 비교했습니다. Hibernate Statistics API가 Spring Data 파생 쿼리·컬렉션 lazy 초기화를 누락해 실제 SQL의 절반만 보고하는 함정을 확인한 뒤로는 실제 SQL 로그(grep -c) 카운트를 최종 수치로 채택했고, 개별조회 vs 배치조회 각각의 실행계획(EXPLAIN ANALYZE)도 남겼습니다.',
    docs: [
      { to: '/domains/board/detail', label: 'Board 성능·구조 상세' },
      { to: '/domains/care/detail', label: 'Care 성능·결제 연동 상세' },
      { to: '/domains/user/detail', label: 'User 인증·성능 상세' },
      { to: '/domains/missing-pet/detail', label: 'MissingPet 성능·구조 상세' },
      { to: '/domains/chat/detail', label: 'Chat 성능·보안 상세' },
    ],
  },
  {
    id: 'concurrency',
    number: '02',
    title: '동시성 / Race Condition 해결',
    scope: 'Meetup · PetCoin · Care',
    summary:
      '동시 요청이 같은 행을 읽고 수정할 때 생기는 Lost Update와 비즈니스 제약 위반을 막았습니다. 핵심은 "현재 값 검증이 필요한가?"를 기준으로 시나리오마다 전략을 구분한 것입니다.',
    points: [
      {
        label: '문제',
        text:
          '여러 요청이 같은 이전 값을 기준으로 계산하면 잔액 변경이 덮어써지거나 최대 인원 제한을 초과할 수 있었습니다.',
      },
      {
        label: '원인',
        text:
          '현재 값 조회, 조건 확인, 값 변경, save 흐름이 하나의 원자적 연산이 아니었습니다.',
      },
      {
        label: '해결',
        text:
          '단순 카운터와 조건 검사는 DB 조건부 UPDATE로 처리했고, 잔액처럼 현재 값 검증이 필요한 영역은 SELECT FOR UPDATE 비관적 락으로 직렬화했습니다.',
      },
    ],
    tableTitle: '사례별 처리',
    rows: [
      ['사례', '문제', '해결'],
      ['Meetup 참가', '락 없던 최초 커밋(a549eb33)에선 동시 참가가 데드락으로 부당 실패(성공1/실패2). 인원 초과는 트랜잭션 우회 시에만 재현되는 이론적 위험', '락 없음 → 비관적 락 → 원자적 조건부 UPDATE (3단계 진화)'],
      ['PetCoin 잔액', '동시 충전 5건 기대 150, 실제 110 (4건 유실, 재검증 3/3 재현)', 'findByIdForUpdate 비관적 락'],
      ['Care 거래 확정', '두 사용자 모두 확정했는데 OPEN에 머무는 stuck state', 'Conversation PESSIMISTIC_WRITE'],
    ],
    note:
      '재검증에서 Meetup의 진짜 최초 버그 커밋(a549eb33, 락 없음)을 찾아 worktree로 3회 재현했더니, 예상한 인원 초과가 아니라 InnoDB 암묵적 행 잠금에 의한 데드락으로 정당한 참가 요청이 부당하게 실패(성공1/실패2)했습니다. 인원 초과는 트랜잭션 경계를 우회한 별도 테스트에서만 확인되는 이론적 위험이었고, 결함은 락 없음(a549eb33) → 비관적 락(a5943b18) → 원자적 UPDATE(bf32d155) 3단계로 개선됐습니다. 반면 PetCoin은 락이 없던 실제 커밋(60455169)에서 100→110 Lost Update가 3회 모두 결정론적으로 재현됐고 after(findByIdForUpdate)는 3회 모두 150으로 정상화돼, 동시성 버그는 재구성이 아닌 실제 코드 실행으로만 같은 신뢰도를 얻는다는 점을 확인했습니다.',
    verification:
      'git worktree로 각 사례의 실제 이전 커밋을 checkout해 그 시점 코드를 재구성 없이 직접 실행했습니다. PetCoin은 락 없는 코드에서 Lost Update(100→110)를 3/3 결정론적으로 재현하고 after는 3/3 모두 150으로 확인했으며, Meetup은 최초 버그 커밋(a549eb33)까지 거슬러 올라가 데드락에 의한 부당 실패를 3/3 재현했습니다. Care는 기존 CountDownLatch/ExecutorService 동시성 테스트를 로컬 MySQL에서 재실행(11개 통과)해 최종 상태(currentParticipants 3, stuck state 없음)를 확인했습니다.',
    docs: [
      { to: '/domains/meetup/detail', label: 'Meetup 성능·동시성 상세' },
      { to: '/domains/care/detail', label: 'Care 성능·결제 연동 상세' },
    ],
  },
  {
    id: 'location',
    number: '03',
    title: 'Location 초기 로드 최적화',
    scope: 'Location',
    summary:
      '초기 로드에서 전체 데이터를 조회하던 방식을 제거했습니다. 현재 주변서비스 기본 조회, "내 위치", "이 지역" 검색은 좌표+반경 검색을 쓰며, 아키텍처가 한 세대 더 진화해 공간 인덱스(R-Tree)와 결과 상한(DEFAULT_RADIUS_LIMIT=100)까지 도입돼 있습니다.',
    points: [
      {
        label: '문제',
        text:
          '사용자가 보는 데이터는 일부인데 초기 로드에서 전체 위치 서비스 데이터를 가져와 DB·네트워크·브라우저 메모리에 모두 부담을 줬습니다.',
      },
      {
        label: '원인',
        text:
          '검색 조건을 DB WHERE로 충분히 밀어 넣지 못했고, 사용자가 실제로 보는 지도 범위보다 훨씬 큰 데이터를 먼저 받은 뒤 브라우저에서 줄이는 구조였습니다.',
      },
      {
        label: '해결',
        text:
          '사용자 위치 또는 지도 중심 기준 반경 조회를 백엔드에서 수행하고, 공간 인덱스(R-Tree) + ST_Within/ST_Distance_Sphere로 후보를 좁혀 전체 데이터 전송을 제거했습니다.',
      },
    ],
    tableTitle: '초기 로드 개선 — worktree로 before 커밋 서버를 띄워 HTTP 실측 (2026-07 재검증)',
    rows: [
      ['항목', 'Before (5ef571d9, 무제한 전체조회)', 'After (반경조회)'],
      ['반환 건수', '22,905건(전체)', '100건 (DEFAULT_RADIUS_LIMIT)'],
      ['응답 바이트', '약 22.4MB', '약 100KB (-99.6%)'],
      ['평균 응답시간 (HTTP 15회)', '531.8ms', '50.9ms (-90%)'],
      ['DB 실행시간 (EXPLAIN)', '146ms (22,905행 순회)', '81.8ms (공간 인덱스 후보 축소)'],
    ],
    note:
      '옛 "무제한 전체조회" 시나리오는 현재 코드엔 없습니다 — size 파라미터가 필수화됐고 반경조회에 DEFAULT_RADIUS_LIMIT=100 상한이 새로 붙었습니다. 그래서 git worktree로 before 커밋(5ef571d9)을 실제로 띄워 파라미터 없는 진짜 무제한 조회를 측정했고, size=30000 트릭 재현치(22.3MB·602ms)와 오차 1% 안에서 일치함을 확인했습니다. 개선 후 반환이 100건인 것은 이 상한 때문이며, 상한을 풀면 반경 10km 안의 실제 건수는 2,499건입니다. 지역명 검색은 이후 UX가 여러 번 바뀐 영역이라 참고 기록으로만 둡니다.',
    verification:
      'before 커밋은 파라미터 없는 무제한 조회로, dev는 반경조회로 각각 별도 포트에 띄워 실측했습니다. 동일 서버·동일 DB(locationservice 22,905건)·동일 JWT에서 curl로 응답 바이트와 응답시간 15회 평균을 비교하고, 두 쿼리의 EXPLAIN ANALYZE(인덱스 전체 순회 vs 공간 R-Tree 인덱스)로 실행계획도 대조했습니다.',
    docs: [
      { to: '/domains/location/detail', label: 'Location 성능·검색 상세' },
    ],
  },
  {
    id: 'notification-read',
    number: '04',
    title: 'Notification 읽음 처리 최적화',
    scope: 'Notification · JPA',
    summary:
      '전체 읽음 요청에서 모든 미읽음 알림을 엔티티로 조회한 뒤 행별로 수정하던 구조를 JPQL bulk UPDATE 한 번으로 변경했습니다.',
    points: [
      {
        label: '문제',
        text:
          '미읽음 알림 N개를 전부 메모리에 올리고 각 엔티티의 isRead를 변경해, 사용자 조회 1회와 알림 조회 1회에 이어 UPDATE가 N번 발생했습니다.',
      },
      {
        label: '원인',
        text:
          'saveAll 호출 한 번을 SQL UPDATE 한 번으로 오해하기 쉽지만, JPA 변경 감지는 수정된 엔티티마다 UPDATE를 실행합니다. 조회 N+1이 아니라 일괄 변경을 엔티티 단위로 처리한 row-by-row UPDATE 문제입니다.',
      },
      {
        label: '해결',
        text:
          'userId와 isRead=false를 조건으로 JPQL bulk UPDATE를 실행하고, 목록·미읽음 목록·count 조회도 Users 엔티티를 먼저 조회하지 않고 userId로 직접 실행하도록 Repository 계약을 변경했습니다.',
      },
    ],
    tableTitle: '미읽음 알림 100개 기준',
    rows: [
      ['항목', 'Before', 'After'],
      ['사용자 조회', '1 SELECT', '0'],
      ['미읽음 알림 조회', '1 SELECT / 100개 로딩', '0'],
      ['읽음 상태 변경', '100 UPDATE', '1 bulk UPDATE'],
      ['Prepared statements', '102', '1'],
    ],
    note:
      'bulk UPDATE는 영속성 컨텍스트를 우회하므로 clearAutomatically와 flushAutomatically를 적용해 오래된 관리 엔티티가 남지 않도록 했습니다.',
    verification:
      'MySQL 임시 테이블과 Hibernate Statistics를 사용한 통합 테스트에서 기존 알고리즘 102 statements, 개선 후 1 statement를 측정했습니다.',
    docs: [
      {
        href:
          'https://github.com/makkong1/Petory/blob/main/docs/refactoring/notification/notification-read-performance-optimization.md',
        label: 'Notification 읽음 처리 성능 리팩토링',
      },
    ],
  },
  {
    id: 'over-fetching',
    number: '05',
    title: '목록·지도 오버페칭 제거 (Projection)',
    scope: 'PetCoin · User · Board · Care',
    summary:
      '목록/지도 API가 화면에서 쓰지 않는 컬럼·연관 엔티티까지 통째로 조회하던 오버페칭을, 목록 전용 read model + projection으로 제거했습니다. N+1(쿼리 수)과 별개로 "한 번에 가져오는 데이터의 폭"을 다룹니다.',
    points: [
      {
        label: '문제',
        text:
          '작성자(Users) 27컬럼을 화면은 username 정도만 쓰는데 전부 조회하고, socialUsers·applications 같은 안 쓰는 연관까지 @BatchSize로 추가 쿼리를 유발했습니다.',
      },
      {
        label: '원인',
        text:
          '엔티티당 단일 DTO/컨버터를 목록·상세가 공유해, 컨버터가 모든 연관을 항상 채우고 → 리포지토리가 목록에서도 전체 로딩을 강제당하는 구조였습니다. ("프로젝션 기술 부재"가 아니라 read model 미분리)',
      },
      {
        label: '해결',
        text:
          '공유 컨버터·상세 경로는 그대로 두고, 목록 전용 경량 read model(ListView DTO)을 새로 만들어 JPQL 생성자 표현식·네이티브 인터페이스 projection으로 필요한 컬럼만 조회했습니다.',
      },
    ],
    tableTitle: '전/후 실측 (git stash로 리팩토링만 토글)',
    rows: [
      ['엔드포인트', 'Before', 'After', '효과'],
      ['지도 근처 케어요청', '17,621B / 38.3ms', '7,421B / 9.9ms', '응답 58%, 시간 74% 감소'],
      ['관리자 사용자 목록', '8,647B / 2쿼리', '5,829B / 1쿼리', '응답 33% 감소'],
      ['게시글 목록', '끌어오는 폭 기준 / 61.3ms', '−56% / 46.0ms', '응답시간 25% 감소'],
    ],
    note:
      'Board는 응답 DTO가 불변이라 응답 바이트(9,351B)는 그대로고, 서버 내부(DB→앱) 오버페칭 제거가 응답시간으로 나타납니다. 오버페칭이 항상 응답 크기로 드러나는 건 아니라는 점을 DB 레벨·HTTP 레벨 두 가지 측정으로 확인했습니다.',
    verification:
      '동일 DB·JWT·요청에서 git stash로 리팩토링만 토글해 전/후를 측정(응답 바이트 + time_total 15회 평균)했고, 신규 경로마다 테스트(admin 6·board 3·care 2)로 런타임 검증했습니다.',
    docs: [
      { to: '/domains/refactoring/over-fetching', label: '오버페칭 제거 상세' },
      {
        href:
          'https://github.com/makkong1/Petory/blob/dev/docs/refactoring/fetch-optimization/column-projection-review.md',
        label: '컬럼·필드 과다조회 검토 문서',
      },
    ],
  },
  {
    id: 'spatial-index',
    number: '06',
    title: '근처 모임 검색 — 실행계획 기반 인덱스 튜닝',
    scope: 'Meetup · Location',
    summary:
      '전체 로드 후 애플리케이션에서 거리를 계산하던 근처 모임 조회를 EXPLAIN으로 단계마다 확인하며 4단계에 걸쳐 재구현했습니다. 마지막 단계는 "인덱스 추가 = 항상 더 빠름"이 아니라 옵티마이저의 비용 기반 선택까지 확인한 사례입니다.',
    points: [
      {
        label: '문제',
        text:
          '근처 모임 조회(1단계)가 전체 데이터를 불러온 뒤 애플리케이션에서 Haversine 공식으로 거리를 계산해 걸러냈고, 모임 수가 늘수록 스캔·메모리 부담이 선형으로 늘었습니다.',
      },
      {
        label: '원인',
        text:
          'DB 쿼리로만 바꾼 2단계도 반경 조건에 IS NOT NULL이 섞여 인덱스를 못 탔습니다. EXPLAIN으로 확인하니 type: ALL, key: NULL, rows: 2,958(풀스캔)이 그대로였습니다.',
      },
      {
        label: '해결',
        text:
          '3단계는 IS NOT NULL을 BETWEEN bounding box로 바꿔 복합 인덱스(idx_meetup_location)를 태웠습니다(스캔 96%↓). 4단계(현재)는 위경도를 좁히기만 하고 세로축은 사후 필터링하던 B-tree의 한계를 넘으려 geo_point 공간 컬럼 + 공간 인덱스(R-Tree)를 추가하고 ST_Within/ST_Distance_Sphere로 재구현했습니다. EXPLAIN ANALYZE로 실측하니 지금 데이터량에서는 date 조건 하나만으로도 후보가 거의 다 걸러져 옵티마이저가 공간 인덱스 대신 idx_meetup_date를 고르고, 공간 조건은 사후 필터로 처리됨을 확인했습니다.',
      },
    ],
    tableTitle: '단계별 실행계획 (1,000건 테스트 데이터 기준)',
    rows: [
      ['단계', '실행시간', '스캔 행 수', '인덱스 사용'],
      ['1단계 · 인메모리 필터링', '486ms', '2,958 (전체 로드)', '없음'],
      ['2단계 · DB 쿼리 전환', '301ms', '2,958 (미사용)', '없음'],
      ['3단계 · Bounding Box', '273ms', '117 (96%↓)', 'idx_meetup_location (B-tree)'],
    ],
    secondaryTableTitle:
      '종단 부하테스트 — legacy(인메모리) vs 현재(DB) before/after (k6, 2026-07)',
    secondaryRows: [
      ['시나리오', 'Before · 인메모리 legacy', 'After · DB 튜닝', '개선'],
      ['소규모 708건 · p95 지연 (20 VU)', '78.0ms', '37.4ms', '-52%'],
      ['대용량 5만건 · p95 지연 (5 VU)', '1.75s', '57.5ms', '~30배'],
      ['대용량 5만건 · 처리량', '2.11 req/s', '26.7 req/s', '~12.6배'],
    ],
    note:
      'EXPLAIN만 봐서는 4단계에서 추가한 공간 인덱스의 효과가 잘 보이지 않았습니다. 지금은 데이터가 적어서 "날짜가 미래인 모임"이라는 조건 하나만으로도 대상이 충분히 좁혀지다 보니, 옵티마이저가 공간 인덱스 대신 날짜 인덱스를 고르고 ST_Within/ST_Distance_Sphere는 그렇게 좁혀진 소수 행에 뒤늦게 적용되고 있었습니다(버그가 아니라 지금 데이터량에서 더 싼 방법을 고른 정상 동작). 그래서 EXPLAIN 대신 실제 요청을 보내 확인했습니다: 코드에 남아 있던 예전 방식(전체 데이터를 불러온 뒤 애플리케이션에서 거리를 계산)을 임시 엔드포인트로 되살려, 같은 데이터·같은 조건에서 새 방식과 k6로 직접 비교했습니다. 데이터가 적을 때(708건)는 p95 지연이 78ms에서 37.4ms로 줄었지만, 이때도 옵티마이저는 여전히 날짜 인덱스를 쓰고 있었으므로 이 개선은 공간 인덱스가 아니라 "전체 로드를 없앤 것" 자체의 효과였습니다. 반면 미래 모임을 5만 건으로 늘려 날짜 조건의 힘을 약하게 만들자 옵티마이저가 실제로 공간 인덱스로 갈아탔고, 예전 방식은 인덱스와 상관없이 매번 전체 데이터를 불러오므로 데이터가 커질수록 그대로 느려져 p95 격차가 1.75초에서 57.5ms, 약 30배까지 벌어졌습니다. 정리하면, 데이터가 적을 땐 공간 인덱스가 없어도 큰 차이가 없지만 데이터가 늘어나면 진짜 효과가 드러난다는 것을, "나중을 대비해 미리 넣어둔 설계"라는 애초 판단을 실측으로 확인한 것입니다.',
    verification:
      '단계마다 EXPLAIN(3단계까지)과 EXPLAIN ANALYZE(4단계)로 type·key·rows·선택된 인덱스를 직접 비교했고, k6 부하테스트로 legacy(인메모리)와 현재(DB)를 동일 데이터·동일 좌표에서 apples-to-apples로 측정했습니다(두 엔드포인트 결과셋 일치 확인). FORCE INDEX로 공간 경로를 강제해 옵티마이저 기본 선택과 실측 비용을 대조할 수도 있습니다.',
    docs: [
      { to: '/domains/meetup/detail', label: 'Meetup 성능·동시성 상세' },
      {
        href:
          'https://github.com/makkong1/Petory/blob/main/docs/refactoring/meetup/nearby-meetups/index-analysis.md',
        label: '근처 모임 인덱스 분석 (EXPLAIN)',
      },
      {
        href:
          'https://github.com/makkong1/Petory/blob/main/docs/performance/performance-testing/k6/nearby-loadtest-results.md',
        label: 'nearby k6 부하테스트 before/after 실측',
      },
    ],
  },
  {
    id: 'query-audit',
    number: '07',
    title: '전체 쿼리 감사 — 실제 API 호출 기반 재측정',
    scope: '12개 도메인 · 엔드포인트 62개 실호출',
    summary:
      '게시글 목록 쿼리를 튜닝하고 완료로 판단했는데, 나중에 실제 API를 호출해보니 Page<>가 목록 SELECT와 함께 날리는 COUNT 쿼리를 보지 못하고 있었습니다. 그 COUNT가 180,003행을 검사하며 141ms를 쓰고 있었고, 제가 고친 목록 SELECT(120행 / 4ms)보다 35배 비쌌습니다. 측정을 SQL만 손으로 실행해서 했던 것이 원인이라, 12개 도메인 62개 엔드포인트를 curl로 호출해 다시 측정했습니다.',
    points: [
      {
        label: '문제',
        text:
          '목록 조회 한 번에 애플리케이션은 쿼리를 두 개 실행하는데, 저는 그중 하나만 측정하고 있었습니다. Page<>는 목록 SELECT와 함께 전체 건수를 세는 COUNT를 실행합니다. 제가 튜닝한 목록 SELECT는 120행 검사 / 4ms까지 줄었지만, 그 옆에서 COUNT가 180,003행을 검사하며 141ms를 쓰고 있었습니다.',
      },
      {
        label: '원인',
        text:
          'SQL을 직접 실행해서 측정했기 때문입니다. 이 방식은 제가 작성한 쿼리만 보여줍니다. 제가 튜닝한 SELECT 자체는 애플리케이션이 실행하는 것과 같았지만, Hibernate가 Page<>에 자동으로 붙여 실행하는 COUNT나 지연 로딩으로 추가되는 쿼리는 애초에 측정 대상에 들어오지 않았습니다.',
      },
      {
        label: '해결',
        text:
          '애플리케이션을 띄우고 엔드포인트를 curl로 호출한 뒤 performance_schema digest를 세 가지 기준으로 조회했습니다. 검사행순(풀스캔·비싼 COUNT), 호출횟수순(N+1), 쓰기 쿼리(과잉 락)입니다. N+1은 개별 쿼리가 값싼 대신 수백 번 반복되기 때문에 검사행순으로 정렬하면 상위에 나타나지 않아 별도 기준이 필요했습니다. 의심되는 쿼리는 EXPLAIN ANALYZE로 예상 행수와 실제 행수를 비교했고, 수정 후에는 적용 → 제거 → 재적용 순으로 다시 측정해 원인을 확인했습니다.',
      },
    ],
    tableTitle:
      '처방 6건 — 실측 (로컬 MySQL 8.4, board 5만행 시드, 엔드포인트당 curl 1회, digest 초기화 후)',
    rows: [
      ['엔드포인트', 'Before', 'After', '효과'],
      ['care 검색 (공개 + 관리자)', 'HTTP 500 (항상 실패)', 'HTTP 200', '기능 복구'],
      ['관리자 케어요청 목록 (20건)', '66 queries', '7 queries', 'N+1 소멸'],
      ['펫 타입별 조회 (DOG)', '7,667건 / 155 queries / 331ms', '20건 / 5 queries / 37ms', '쿼리 -97%'],
      ['모임 검색', '500건 / 53 queries / 583ms', '20건 / 6 queries / 43ms', '13배 단축'],
      ['관리자 사용자 목록', '10,021행 + filesort', '20행', '스캔 -99.8%'],
      ['care 주변검색', '3,000행 풀스캔 (선택도 208배 오판)', '208행 (SPATIAL)', '스캔 -93%'],
    ],
    secondaryTableTitle:
      'N+1 판정은 쿼리 수 자체가 아니라 결과 건수에 비례하는지로 확인 — 관리자 케어요청 목록',
    secondaryRows: [
      ['page size', 'Before', 'After'],
      ['10', '36 queries', '7 queries'],
      ['20', '66 queries', '7 queries'],
      ['40', '127 queries', '8 queries'],
    ],
    note:
      '성능을 보려고 시작했는데 기능 버그가 먼저 나왔습니다. care 검색 API가 항상 HTTP 500이었고, 원인은 MATCH(title, description)을 쓰면서 carerequest에 FULLTEXT 인덱스를 만들지 않은 것이었습니다. MySQL은 FULLTEXT 인덱스가 없으면 MATCH...AGAINST를 실행 자체를 못 하기 때문에 데이터 양과 무관하게 항상 실패합니다. 공개 API와 관리자 API가 같은 쿼리를 쓰고 있어서 인덱스 하나로 둘 다 복구됐습니다. 반대로 N+1로 보였던 것은 N+1이 아니었습니다. 모임 검색에서 참가자 조회가 10회 나갔는데, 결과가 500건이고 @BatchSize가 50이므로 500 ÷ 50 = 10회가 맞는 동작이었습니다. 실제 원인은 검색에 페이징이 없어서 DB에서 500건을 전부 읽은 뒤 subList로 메모리에서 자르고 있던 것이었고, 여기서 N+1로 판단했다면 정상 동작하는 배치 로직을 건드렸을 겁니다. 실제 N+1은 관리자 API 한 곳에 있었는데, 공개 API에는 JOIN FETCH를 넣었지만 관리자 쪽 쿼리에는 빠져 있었습니다. 주변 검색은 B-tree 복합 인덱스로 시도했다가 효과가 없어 SPATIAL로 바꿨습니다. is_deleted는 전 행이 같은 값이라 선택도가 없고, B-tree는 범위 조건을 선두에서 하나만 쓸 수 있어 latitude 다음의 longitude가 인덱스로 걸러지지 않기 때문입니다. meetup·locationservice에서 쓰던 POINT 컬럼 + SPATIAL 인덱스 + 트리거 방식을 그대로 적용했습니다. 같은 감사 과정에서 GET /api/boards/my-posts·GET /api/activities/my가 클라이언트가 보낸 userId를 그대로 신뢰하던 인가 계약 문제(activities/my는 @PreAuthorize조차 없음)도 함께 드러나 JWT principal 기준으로 고쳤습니다(Board·User 상세 참고).',
    verification:
      '측정 도구 자체가 틀린 경우가 네 번 있었고, 그때마다 도구를 먼저 고치고 다시 측정했습니다. (1) 락을 SUM_LOCK_TIME으로 재려 했으나 MySQL의 LOCK_TIME은 테이블 락만 집계해서 InnoDB 행 락이 잡히지 않습니다. 전역 카운터에는 행 락 대기가 377회 기록돼 있었는데 digest의 SUM_LOCK_TIME은 전부 0이었습니다. (2) DIGEST_TEXT가 기본 1024자에서 잘려, 컬럼이 많은 SELECT는 FROM 절까지 도달하지 못합니다. 테이블명으로 필터링할 수 없고 FOR UPDATE도 잡히지 않아 max_digest_length를 4096으로 올렸습니다. (3) 회귀 테스트에서 Hibernate의 getQueryExecutionCount()가 지연 로딩 엔티티 조회를 집계하지 않아, 이 값만 보고 JOIN FETCH가 불필요하다고 판단해 되돌릴 뻔했습니다. getPrepareStatementCount()로 바꾸니 size 5에서 15개, size 40에서 85개로 차이가 드러났습니다. N+1 재검증(01번 사례) 때 겪은 Statistics API 문제와 같은 종류입니다. (4) DB 상태는 Gradle의 입력이 아니라서, 인덱스를 지우고 테스트를 돌려도 UP-TO-DATE로 건너뛰었습니다. 회귀 테스트 8건은 수정 전 상태에서 테스트가 실패하는지 먼저 확인한 뒤 수정 후 통과를 확인하는 순서로 검증했습니다. 이 순서를 지키지 않으면 아무것도 검증하지 않는 테스트가 통과 상태로 남습니다.',
    limits:
      '측정하지 못한 범위는 문제가 없는 것과 구분해 남겼습니다. countQuery를 명시하지 않으면 Hibernate가 본문 쿼리의 JOIN을 유지한 채 COUNT를 생성하는데, 이런 경우가 16건 남아 있습니다. care 목록은 SELECT를 3,060행에서 30행으로 줄였지만 함께 나가는 COUNT는 아직 6,000행을 검사합니다. board의 깊은 페이지(page=2500)는 100,000행을 검사하고 0행을 반환하는데, 인덱스는 정상적으로 사용하지만 OFFSET이 앞의 5만 행을 만들어 버리는 구조라 인덱스로 해결되지 않습니다. 키셋 페이징으로 바꾸면 COUNT까지 없앨 수 있지만 페이지 번호 이동을 포기해야 해서 성능 판단만으로 정할 수 없습니다. 락 경합은 이 방식으로는 관측할 수 없습니다. 요청을 하나씩 보내므로 경합이 발생하지 않기 때문이고, 관측 가능한 것은 필요 이상으로 많은 행을 잠그는지(요청 하나로도 확인 가능)까지입니다. 경합 자체는 동시성 부하 테스트가 필요합니다.',
    docs: [
      { to: '/domains/care/detail', label: 'Care 성능·결제 연동 상세' },
      { to: '/domains/board/detail', label: 'Board 성능·구조 상세' },
      {
        href:
          'https://github.com/makkong1/Petory/blob/dev/docs/analysis/query-audit/00-plan.md',
        label: '감사 방법론 (3-패스 스캔 · 측정 원칙)',
      },
      {
        href:
          'https://github.com/makkong1/Petory/blob/dev/docs/analysis/query-audit/99-summary.md',
        label: '전체 감사 결과 종합',
      },
      {
        href:
          'https://github.com/makkong1/Petory/blob/dev/docs/analysis/query-audit/fixes-2026-07-14.md',
        label: '처방 6건 + 회귀 테스트 (A/B/A 증명)',
      },
    ],
  },
  {
    id: 'deep-page',
    number: '08',
    title: 'board 깊은 페이지 페이징 — 지연 조인 + author_visible 비정규화',
    scope: 'Board',
    summary:
      '08번 감사에서 "성능 판단만으로 정할 수 없다"고 미뤄뒀던 board 깊은 페이지를 마저 판단했습니다. 이론적으로 가장 빠른 키셋 페이징을 채택하지 않은 이유가 핵심입니다 — 앱 전체 페이징이 총건수·번호점프·맨뒤에 의존하는 단일 공유 컴포넌트(12개 화면)로 통일돼 있었기 때문입니다.',
    points: [
      {
        label: '문제',
        text:
          'board 목록은 OFFSET 페이징이고, 공유 페이징 컴포넌트에 "맨 뒤" 버튼(showEdges)이 있어 사용자가 실제로 OFFSET 49,980에 도달합니다. OFFSET은 건너뛰기가 아니라 "만들고 버리기"라 비용이 O(offset)로 선형 증가하고(1페이지 1.5ms → 맨뒤 114~147ms), 작성자 필터(u.status)가 조인 건너편에 있어 board 인덱스만으론 offset을 셀 수 없습니다.',
      },
      {
        label: '원인',
        text:
          '목록이 board JOIN users 후 u.is_deleted=0 AND u.status=\'ACTIVE\'로 거르는데, 이 판정이 users에 있어서 board 인덱스로 5만 행을 훑는 매 행마다 users PK 조회가 5만 번 딸려 붙습니다. 같은 이유로 자동 COUNT도 users를 조인합니다.',
      },
      {
        label: '해결',
        text:
          '키셋(O(1)이지만 공유 PageNavigation의 번호점프·맨뒤를 못 지원) 대신 지연 조인을 채택했습니다. 다만 지연 조인 1단계가 커버링이 되려면 작성자 필터가 board 컬럼에 있어야 해서, author_visible(=미탈퇴 AND status≠BANNED, 정지는 보임) 컬럼을 비정규화하고 users AFTER UPDATE 트리거 하나로 동기화했습니다.',
      },
    ],
    tableTitle: '전/후 실측 (로컬 board 5만행, 스케줄러 끔)',
    rows: [
      ['측정', 'Before', 'After', '효과'],
      ['깊은 페이지 스캔 (구코드 board JOIN users)', '133ms', '24~32ms', '약 4~5배'],
      ['〃 (인덱스만 무시한 A/B)', '66~84ms', '24~32ms', '약 2.5배'],
      ['COUNT', '22~32ms · users 조인 · 46,000', '7~25ms · 단일 테이블 · 48,000', '조인 제거'],
      ['페이지 결손(비정규화 없이 skip)', '전체 2,500페이지 중 596페이지(23.8%)에 숨김 대상 유입', '결손 없음', '문제 자체 소멸'],
    ],
    secondaryTableTitle: 'k6 종단 (30s·20VU, 얕은/중간/맨뒤 혼합)',
    secondaryRows: [
      ['지표', '값'],
      ['요청 / 성공률', '15,555건 / 100% 200'],
      ['평균 / p90 / p95', '38.51ms / 57.94ms / 63.91ms'],
    ],
    note:
      'COUNT 반환값이 46,000 → 48,000으로 늘어난 것은 버그가 아니라 의도된 동작 변화입니다. 구코드의 u.status=\'ACTIVE\' 단일 조건은 일시 정지(SUSPENDED) 회원 글까지 실수로 가려버리는 부작용이 있었고, author_visible은 탈퇴·영구정지(BANNED)만 숨기므로 정지 회원 글(400명 × 평균 5글 = 2,000건)이 이제 목록에 보입니다. care 도메인이 이미 "정지는 읽기 필터, 영구정지만 행 변경"으로 다루는 원칙과 방향을 맞췄습니다. 동기화는 트리거 하나(geo_point 비정규화와 같은 패턴)이며, 엔티티는 @Column(updatable=false)로 매핑해 JPA UPDATE가 트리거 값을 되돌리지 못하게 막았습니다.',
    verification:
      'EXPLAIN ANALYZE로 커버링 인덱스 A/B(인덱스 강제 무시 → 스캔 복귀 → 재적용 → 소멸)를 확인해 인과를 확정했고, 구코드 형태(board JOIN users)도 별도로 재현해 대조했습니다. 페이지 결손 검증은 전체 2,500페이지를 윈도우 함수로 한 번에 검사했고, k6로 종단 처리량·지연을 확인했습니다.',
    limits:
      'ORDER BY created_at DESC에 동점(tie-break) 키가 없어 같은 밀리초에 여러 글이 생성되면 페이지 경계 순서가 안정적이지 않을 수 있습니다(선재 이슈, 이번 범위 밖). 측정치를 범위(24~32ms 등)로 기록한 것은 로컬 단일 실행 환경의 버퍼풀 상태 변동 때문이며, 방향성(순서·배율)은 재현마다 일관됐습니다. missing_pet·meetup·care는 현재 규모(수천~1만 행)에서 체감되지 않아 같은 처방을 보류했습니다.',
    docs: [
      { to: '/domains/refactoring/deep-page', label: '판단 여정 상세 (키셋 기각 이유 포함)' },
      { to: '/domains/board/detail', label: 'Board 성능·구조 상세' },
      {
        href:
          'https://github.com/makkong1/Petory/blob/dev/docs/analysis/board-deep-page-2026-07.md',
        label: '전/후 실측 증거 문서',
      },
      {
        href:
          'https://github.com/makkong1/Petory/blob/dev/docs/superpowers/specs/2026-07-15-board-deep-page-pagination-design.md',
        label: '설계 문서 (대안 검토 · 트리거 · 스키마)',
      },
    ],
  },
];

function MetricTable({ title, rows }) {
  return (
    <div className="metric-table-wrap">
      <p className="metric-table-title">{title}</p>
      <table className="metric-table">
        <thead>
          <tr>
            {rows[0].map((cell) => (
              <th key={cell}>{cell}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.slice(1).map((row) => (
            <tr key={row.join('|')}>
              {row.map((cell, index) => (
                <td key={`${cell}-${index}`}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function CaseSection({ item }) {
  return (
    <section id={item.id} className="refactoring-case">
      <div className="section-card refactoring-case-card">
        <div className="refactoring-case-header">
          <div>
            <span className="refactoring-case-number">{item.number}</span>
            <h2>{item.title}</h2>
            <p>{item.summary}</p>
          </div>
          <span className="refactoring-case-scope">{item.scope}</span>
        </div>

        <div className="refactoring-case-points">
          {item.points.map((point) => (
            <div key={point.label} className="refactoring-case-point">
              <strong>{point.label}</strong>
              <p>{point.text}</p>
            </div>
          ))}
        </div>

        {item.rows && <MetricTable title={item.tableTitle} rows={item.rows} />}
        {item.secondaryRows && (
          <MetricTable title={item.secondaryTableTitle} rows={item.secondaryRows} />
        )}

        {item.note && <p className="refactoring-note">{item.note}</p>}
        <p className="refactoring-verification">
          <strong>검증</strong>
          {item.verification}
        </p>
        {/* 미측정 범위를 "문제 없음"과 구분해 남긴다. 없는 사례는 렌더링되지 않는다. */}
        {item.limits && (
          <p className="refactoring-verification">
            <strong>한계 · 미측정</strong>
            {item.limits}
          </p>
        )}

        <div className="refactoring-docs">
          <span>근거 문서</span>
          <div>
            {item.docs.map((doc) => (
              doc.href ? (
                <a
                  key={doc.href}
                  href={doc.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {doc.label}
                </a>
              ) : (
                <Link key={doc.to} to={doc.to}>
                  {doc.label}
                </Link>
              )
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default function PetoryRefactoringPage() {
  const location = useLocation();

  useEffect(() => {
    if (!location.hash) {
      window.scrollTo({ top: 0 });
      return;
    }

    const id = decodeURIComponent(location.hash.slice(1));
    window.requestAnimationFrame(() => {
      const element = document.getElementById(id);
      if (!element) return;

      const top = element.getBoundingClientRect().top + window.pageYOffset - 80;
      window.scrollTo({ top });
    });
  }, [location.hash]);

  return (
    <div className="domain-page-wrapper refactoring-page">
      <div className="domain-page-container">
        <div className="domain-page-content">
          <div className="refactoring-page-hero">
            <Link to="/portfolio/petory" className="refactoring-back-link">
              Petory 프로젝트로 돌아가기
            </Link>
            <h1>성능 개선 & 리팩토링 대표 사례</h1>
            <p>
              도메인별 작업 기록을 전부 나열하지 않고, 문제·원인·해결·검증 과정이
              잘 분석된 8개 사례만 선별했습니다.
            </p>
            <div className="refactoring-quick-links">
              {sections.map((section) => (
                <a key={section.id} href={`#${section.id}`}>
                  {section.title}
                </a>
              ))}
            </div>
          </div>

          {cases.map((item) => (
            <CaseSection key={item.id} item={item} />
          ))}

          <section className="refactoring-optional-case">
            <p>선택 사례</p>
            <h2>Java-Python enum 계약 불일치</h2>
            <span>추천/NLP를 강조할 때만 본문에 포함</span>
            <div>
              <p>
                Java는 BIRD, RABBIT, HAMSTER, ETC를 전송했지만 Python FastAPI 스키마는
                DOG, CAT, OTHER만 허용해 422가 발생했습니다. 예외가 클라이언트에서
                삼켜져 signal이 무음 드롭됐고, Java-Python 경계에서 DOG, CAT 외 값을
                OTHER로 정규화해 변경 범위를 줄였습니다.
              </p>
              <div className="refactoring-docs compact">
                <Link to="/domains/recommendation/detail">Recommendation NLP 연동 상세</Link>
              </div>
            </div>
          </section>
        </div>
        <TableOfContents sections={sections} />
      </div>
    </div>
  );
}
