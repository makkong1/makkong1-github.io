import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import TableOfContents from '../../../components/Common/TableOfContents';

const sections = [
  { id: 'n-plus-one', title: 'N+1 성능 개선' },
  { id: 'concurrency', title: '동시성 제어' },
  { id: 'location', title: 'Location 최적화' },
  { id: 'security', title: '보안/인가 정리' },
  { id: 'notification-read', title: '알림 읽음 처리 최적화' },
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
    tableTitle: '대표 수치',
    rows: [
      ['도메인', 'Before', 'After', '효과'],
      ['Board', '301 queries / 745ms / 22.5MB', '3 queries / 30ms / 2MB', '쿼리 99% 감소'],
      ['Care', '~2,400 queries / 1,084ms / 21MB', '4~5 queries / 66ms / 6MB', '쿼리 99.8%, 시간 94% 감소'],
      ['Chat login', '21 queries / 305ms / 0.58MB', '4 queries / 55ms / 0.13MB', '시간 81.97% 단축'],
      ['MissingPet', '105 queries / 571ms / 11MB', '3 queries / 106ms / 3MB', '쿼리 97% 감소'],
    ],
    note:
      'Care 수치는 기존 비페이징 측정 기준입니다. 현재 페이징 경로는 @BatchSize와 배치 변환으로 N+1을 완화합니다.',
    verification: 'Hibernate Statistics와 성능 로그로 쿼리 수, 실행 시간, 메모리를 비교했습니다.',
    docs: [
      { to: '/domains/board/optimization', label: 'Board 성능 최적화' },
      { to: '/domains/care/optimization', label: 'Care 성능 최적화' },
      { to: '/domains/user/optimization', label: 'User 성능 최적화' },
      { to: '/domains/missing-pet/optimization', label: 'MissingPet 성능 최적화' },
      { to: '/domains/chat/optimization', label: 'Chat 성능 최적화' },
    ],
  },
  {
    id: 'concurrency',
    number: '02',
    title: '동시성 / Race Condition 해결',
    scope: 'Meetup · PetCoin · Care',
    summary:
      '동시 요청이 같은 행을 읽고 수정할 때 생기는 Lost Update와 비즈니스 제약 파괴를 도메인별로 다른 방식으로 막았습니다.',
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
      ['Meetup 참가', '최대 3명 제한인데 동시 요청으로 4명 참가 가능', '조건부 원자적 UPDATE'],
      ['PetCoin 잔액', '동시 충전 5건 기대 잔액 150, 실제 110 가능', 'findByIdForUpdate'],
      ['Care 거래 확정', '두 사용자 모두 확정했는데 OPEN에 머무는 stuck state', 'Conversation PESSIMISTIC_WRITE'],
    ],
    verification: '동시성 테스트로 예상 최종 상태와 실제 DB 상태를 비교했습니다.',
    docs: [
      { to: '/domains/meetup/optimization', label: 'Meetup 성능 최적화' },
      { to: '/domains/meetup/refactoring', label: 'Meetup 리팩토링' },
      { to: '/domains/care/refactoring', label: 'Care 리팩토링' },
    ],
  },
  {
    id: 'location',
    number: '03',
    title: 'Location 초기 로드 최적화',
    scope: 'Location',
    summary:
      '초기 로드 전체 조회를 제거했습니다. 현재 주변서비스 기본 조회, "내 위치", "이 지역" 검색은 사용자 위치 또는 지도 중심 기준 좌표+반경 검색을 사용합니다.',
    points: [
      {
        label: '문제',
        text:
          '사용자가 보는 데이터는 일부인데 초기 로드에서 전체 위치 서비스 데이터를 가져와 DB, 네트워크, 브라우저 메모리에 모두 부담이 있었습니다.',
      },
      {
        label: '원인',
        text:
          '검색 조건을 DB WHERE로 충분히 밀어 넣지 못했고, 사용자가 실제로 보는 지도 범위보다 훨씬 큰 데이터를 먼저 받은 뒤 브라우저에서 줄이는 구조였습니다.',
      },
      {
        label: '해결',
        text:
          '사용자 위치 또는 지도 중심 기준 반경 조회를 백엔드에서 수행해 전체 데이터 전송을 제거했습니다.',
      },
    ],
    tableTitle: '초기 로드 개선',
    rows: [
      ['항목', 'Before', 'After'],
      ['초기 조회 데이터', '22,699개', '약 1,026개'],
      ['네트워크 전송량', '약 22MB', '약 1MB'],
      ['프론트 전체 처리', '1,484ms', '약 700ms'],
      ['프론트 메모리', '78.90MB', '약 28.6MB'],
    ],
    note:
      '지역명 검색은 이후 여러 번 UX가 바뀐 영역이라 본문 성과에서 제외하고 참고 기록으로만 둡니다.',
    verification: '조회 데이터 수, DB 쿼리 시간, 네트워크 전송량, 프론트 메모리 사용량을 비교했습니다.',
    docs: [
      { to: '/domains/location/optimization', label: 'Location 성능 최적화' },
      { to: '/domains/location/refactoring', label: 'Location 리팩토링' },
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
      { to: '/domains/chat/refactoring', label: 'Chat 리팩토링' },
      { to: '/domains/care/refactoring', label: 'Care 리팩토링' },
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
              도메인별 작업 기록을 전부 나열하지 않고, 면접에서 문제·원인·해결·검증을
              설명하기 좋은 5개 사례만 선별했습니다.
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
                <Link to="/domains/recommendation/refactoring">Recommendation 리팩토링</Link>
                <Link to="/domains/recommendation/optimization">NLP 호출·부하 제어</Link>
              </div>
            </div>
          </section>
        </div>
        <TableOfContents sections={sections} />
      </div>
    </div>
  );
}
