import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import TableOfContents from '../../../components/Common/TableOfContents';

const sections = [
  { id: 'n-plus-one', title: 'N+1 성능 개선' },
  { id: 'concurrency', title: '동시성 제어' },
  { id: 'location', title: 'Location 최적화' },
  { id: 'security', title: '보안/인가 정리' },
  { id: 'notification-read', title: '알림 읽음 처리 최적화' },
  { id: 'over-fetching', title: '목록 오버페칭 제거' },
  { id: 'spatial-index', title: '근처 검색 인덱스 튜닝' },
  { id: 'query-audit', title: '전체 쿼리 감사' },
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
      '수치는 추정이 아니라 git worktree로 각 이전 커밋(3a7a581d·7aca5882·496e121a·9c7e0d68)을 실제로 checkout해 그 시점 코드를 재구성 없이 실행한 실측입니다. 재현의 기준은 쿼리 수이고(절대 시간은 JIT·커넥션풀 워밍업 탓에 실행마다 달라집니다), Chat은 재검증 전까지 21→4로 과소집계돼 있었지만 실제 커밋에는 참여자 조회가 한 번 더 있어 41→4였습니다. Care의 "~2,400"은 @BatchSize 도입 이전 시점 값이라 현재 재현치(151→4)로 교체했습니다. 재검증 중 file 테이블에 (target_type, target_idx) 인덱스가 없어 첨부파일 조회가 매번 풀스캔하던 별도 이슈(Care·MissingPet 공통)를 발견해 복합 인덱스를 추가했고(조회 5~14배 단축, CI 스키마·회귀 테스트 반영), N+1과 인덱스는 별개 문제임을 확인했습니다.',
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
    id: 'security',
    number: '04',
    title: '보안 / 인가 계약 정리',
    scope: 'Chat · Care',
    summary:
      '클라이언트가 넘긴 사용자 식별자를 신뢰하던 API 계약을 JWT principal과 리소스 관계 검증 기준으로 바꿨습니다.',
    points: [
      {
        label: '문제',
        text:
          '인증된 사용자가 요청 파라미터의 userId를 바꾸거나 참여자가 아닌 채팅방 ID를 지정하면 메시지 조회, 검색, 상태 변경 대상에 영향을 줄 수 있었습니다.',
      },
      {
        label: '원인',
        text:
          '인증은 되어 있지만 리소스 소유자나 참여자 여부를 확인하는 인가가 API별로 흩어져 있었습니다.',
      },
      {
        label: '해결',
        text:
          'Chat은 JWT principal에서 사용자를 식별하고 requireActiveParticipant로 ACTIVE 참여자 여부를 확인했습니다. Care my-requests는 userId 쿼리 파라미터를 제거했습니다.',
      },
    ],
    note:
      '이 사례는 수치 중심 성과가 아니라 API 계약과 인가 경계 개선 사례입니다.',
    verification: '메시지 조회, 검색, 상태 변경 경로가 참여자 검증을 거치도록 점검했습니다.',
    docs: [
      { to: '/domains/chat/detail', label: 'Chat 성능·보안 상세' },
      { to: '/domains/care/detail', label: 'Care 성능·결제 연동 상세' },
    ],
  },
  {
    id: 'notification-read',
    number: '05',
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
    number: '06',
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
    number: '07',
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
      'EXPLAIN만으로는 4단계 공간 인덱스의 효과가 잘 드러나지 않았습니다 — 현재 데이터량에선 date 조건의 선택도가 더 높아 옵티마이저가 idx_meetup_date를 고르고 ST_Within/ST_Distance_Sphere는 post-filter로 평가되기 때문입니다(버그가 아니라 비용 기반 정상 판단). 그래서 코드에 남아 있던 인메모리 로직을 임시 legacy 엔드포인트(/api/meetups/nearby-legacy)로 되살려 같은 데이터·같은 좌표에서 k6로 종단 before/after를 실측했습니다. 소규모(708건)에선 p95 -52%로 개선폭이 modest하고, 이 개선의 본질은 공간 인덱스가 아니라 전건 로드 제거였습니다. 하지만 미래 날짜 모임을 5만건으로 늘려 date 선택도를 떨어뜨리자 옵티마이저가 공간 R-Tree 인덱스로 전환했고, legacy는 결과 건수와 무관하게 매 요청 전건 로드+Haversine이라 p95 격차가 ~30배(1.75s → 57.5ms)로 폭증했습니다. "확장성을 대비한 선제적 결정"이 실측으로 확인된 셈입니다.',
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
    number: '08',
    title: '전체 쿼리 감사 — 고쳤다고 믿은 것을 다시 재다',
    scope: '12개 도메인 · 엔드포인트 62개 실호출',
    summary:
      '게시글 목록 쿼리를 튜닝하고 다 고쳤다고 판단했지만, 실제 API를 호출해보니 Page<>가 함께 날리는 COUNT 쿼리(180,003행 / 141ms)를 통째로 놓치고 있었습니다. SQL을 손으로 던져 측정했기 때문입니다. 그래서 12개 도메인 62개 엔드포인트를 curl로 실제 호출해 전수 감사했습니다.',
    points: [
      {
        label: '문제',
        text:
          '"내가 짠 SQL"과 "앱이 실제로 날리는 쿼리"가 달랐습니다. Page<>는 목록 SELECT와 COUNT 두 개를 날리는데 하나만 보고 있었고, 그 COUNT(180,003행 / 141ms)가 제가 고친 목록 SELECT(120행 / 4ms)보다 35배 비쌌습니다.',
      },
      {
        label: '원인',
        text:
          'API를 한 번도 호출하지 않고 측정했습니다. 손으로 쓴 SQL은 ORM이 생성하는 쿼리도, 그 옆에 붙어 나가는 COUNT도, 지연로딩으로 추가되는 쿼리도 보여주지 않습니다.',
      },
      {
        label: '해결',
        text:
          '앱을 띄우고 엔드포인트를 curl로 호출한 뒤 performance_schema digest를 세 기준으로 스캔했습니다 — 검사행순(풀스캔·비싼 COUNT), 호출횟수순(N+1), 쓰기 경로(과잉 락). N+1은 개별 쿼리가 값싸고 수백 번 반복되므로 검사행순으로는 상위권에 뜨지 않습니다. 의심 쿼리는 EXPLAIN ANALYZE로 예상 행수와 실제 행수를 대조하고, 고친 뒤에는 A/B/A(적용 → 제거 → 재적용)로 인과를 증명했습니다.',
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
      'N+1 여부는 "쿼리가 줄었나"가 아니라 "결과 수에 비례하나"로 판정 — 관리자 케어요청 목록',
    secondaryRows: [
      ['page size', 'Before', 'After'],
      ['10', '36 queries', '7 queries'],
      ['20', '66 queries', '7 queries'],
      ['40', '127 queries', '8 queries'],
    ],
    note:
      '성능 감사를 하다 기능 버그를 찾았습니다. care 검색이 항상 HTTP 500이었는데, MATCH(title, description)을 쓰면서 FULLTEXT 인덱스가 없었기 때문입니다 — MySQL은 FULLTEXT 없이 MATCH...AGAINST를 실행하지 못합니다(느린 게 아니라 에러라, 데이터가 몇 건이든 항상 실패합니다). 인덱스 하나로 공개·관리자 두 엔드포인트가 함께 살아났습니다. 반대로 N+1이라 확신했던 것은 N+1이 아니었습니다. 모임 검색에서 참가자 쿼리가 10회 나왔는데, 숫자를 맞춰보니 결과 500건 ÷ @BatchSize(50) = 정확히 10이었습니다. 배칭은 정상이었고 진짜 원인은 결과가 500건이라는 것 자체(검색에 페이징이 없어 DB가 전량을 읽은 뒤 subList로 메모리에서 잘랐습니다)였습니다. 신호에 바로 이름을 붙였다면 이미 잘 짜인 배칭 코드를 건드릴 뻔했습니다. 진짜 N+1은 관리자 API에 딱 하나 있었고(공개 쪽은 JOIN FETCH를 넣었는데 관리자 쪽만 빠져 있었습니다), 지리 검색은 B-tree 복합 인덱스로는 고쳐지지 않아 — is_deleted는 선택도가 0이고 B-tree는 범위 조건을 선두에서 하나만 쓸 수 있어 longitude가 걸러지지 않습니다 — meetup과 동일하게 POINT + SPATIAL + 트리거로 갔습니다.',
    verification:
      '감사 도중 측정 도구가 네 번 고장났고, 그때마다 계기판부터 고쳤습니다. (1) SUM_LOCK_TIME으로 락을 재려 했으나 MySQL의 LOCK_TIME은 테이블 락 전용이라 InnoDB 행 락이 들어오지 않습니다(전역 카운터엔 행 락 대기가 377번 있었는데 digest는 전부 0이었습니다). (2) DIGEST_TEXT는 1024자에서 잘려 컬럼이 많은 SELECT는 FROM 절까지 도달하지 못합니다 — 테이블명은 물론 FOR UPDATE도 못 잡습니다. (3) 회귀 테스트에서 Hibernate getQueryExecutionCount()가 지연로딩 엔티티 로드를 세지 않아, 이 지표를 믿고 JOIN FETCH를 "불필요하다"고 판단해 맞는 수정을 되돌릴 뻔했습니다(getPrepareStatementCount()로 교체하니 잡혔습니다). 이건 N+1 재검증 때 겪은 함정과 같은 것이 다른 얼굴로 다시 나온 셈입니다. (4) DB 상태는 Gradle의 입력이 아니라 인덱스를 지워도 test가 UP-TO-DATE로 스킵됐습니다. 회귀 테스트 8건은 전부 2단계로 검증했습니다 — 수정 전 상태에서 테스트가 실제로 빨간불이 되는지 먼저 확인한 뒤 초록불을 확인했습니다. 이 절차가 없으면 아무것도 검증하지 않는 테스트가 초록불만 켜고 있게 됩니다.',
    limits:
      '미측정 범위를 "문제 없음"과 구분해 남겼습니다. 자동생성 COUNT 16건(countQuery를 명시하지 않으면 Hibernate가 본문 쿼리의 JOIN을 그대로 물고 COUNT를 만듭니다 — care 목록은 SELECT를 30행으로 고쳤지만 그 옆의 COUNT는 아직 6,000행입니다), board 깊은 페이지(page=2500에서 100,000행 검사 / 0행 반환 — 인덱스는 정상적으로 타지만 OFFSET 자체가 문제라 인덱스로는 못 고칩니다. 키셋 페이징이면 COUNT까지 사라지지만 "N페이지 점프"를 포기해야 해서 성능이 아니라 제품 결정입니다), 그리고 락 경합은 이 감사로 원리적으로 관측할 수 없습니다 — curl을 하나씩 던지므로 경합할 상대가 없습니다. 관측 가능한 건 과잉 락(요청 1개로도 보입니다)이고 경합 자체는 동시성 부하 테스트가 필요합니다.',
    docs: [
      { to: '/domains/care/detail', label: 'Care 성능·결제 연동 상세' },
      { to: '/domains/board/detail', label: 'Board 성능·구조 상세' },
      {
        href:
          'https://github.com/makkong1/Petory/blob/main/docs/analysis/query-audit/00-plan.md',
        label: '감사 방법론 (3-패스 스캔 · 측정 원칙)',
      },
      {
        href:
          'https://github.com/makkong1/Petory/blob/main/docs/analysis/query-audit/99-summary.md',
        label: '전체 감사 결과 종합',
      },
      {
        href:
          'https://github.com/makkong1/Petory/blob/main/docs/analysis/query-audit/fixes-2026-07-14.md',
        label: '처방 6건 + 회귀 테스트 (A/B/A 증명)',
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
              잘 분석된 7개 사례만 선별했습니다.
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
