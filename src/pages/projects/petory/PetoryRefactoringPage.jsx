import { Link } from 'react-router-dom';
import TableOfContents from '../../../components/Common/TableOfContents';

const TOC_SECTIONS = [
  { id: 'n-plus-one', title: 'N+1 성능 개선' },
  { id: 'concurrency', title: '동시성/Race Condition' },
  { id: 'location', title: 'Location 검색 최적화' },
  { id: 'security', title: '보안/인가 계약 정리' },
];

function SectionHeader({ children }) {
  return (
    <h2 style={{ marginBottom: '0.5rem', color: 'var(--text-color)' }}>{children}</h2>
  );
}

function Label({ children }) {
  return (
    <span
      style={{
        display: 'inline-block',
        fontSize: '0.75rem',
        fontWeight: 600,
        padding: '2px 8px',
        borderRadius: '4px',
        backgroundColor: 'var(--tag-bg, rgba(99,102,241,0.12))',
        color: 'var(--link-color)',
        marginBottom: '1rem',
      }}
    >
      {children}
    </span>
  );
}

function RefLink({ to, children }) {
  return (
    <Link to={to} style={{ color: 'var(--link-color)', textDecoration: 'none', fontSize: '0.85rem' }}>
      {children}
    </Link>
  );
}

function RefDocs({ items }) {
  return (
    <div
      style={{
        marginTop: '1.25rem',
        paddingTop: '1rem',
        borderTop: '1px solid var(--nav-border)',
      }}
    >
      <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginBottom: '0.4rem', fontWeight: 600 }}>
        근거 문서
      </p>
      <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
        {items.map(({ to, label }) => (
          <li key={to}>
            <RefLink to={to}>{label} →</RefLink>
          </li>
        ))}
      </ul>
    </div>
  );
}

function StatGrid({ rows }) {
  return (
    <div style={{ overflowX: 'auto', marginBottom: '1rem' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.88rem' }}>
        <thead>
          <tr style={{ borderBottom: '1px solid var(--nav-border)' }}>
            {rows[0].map((cell, i) => (
              <th
                key={i}
                style={{
                  textAlign: 'left',
                  padding: '0.4rem 0.75rem',
                  color: 'var(--text-secondary)',
                  fontWeight: 600,
                  whiteSpace: 'nowrap',
                }}
              >
                {cell}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.slice(1).map((row, ri) => (
            <tr key={ri} style={{ borderBottom: '1px solid var(--nav-border)' }}>
              {row.map((cell, ci) => (
                <td
                  key={ci}
                  style={{
                    padding: '0.45rem 0.75rem',
                    color: ci === 0 ? 'var(--text-color)' : 'var(--text-secondary)',
                    fontWeight: ci === 0 ? 600 : 400,
                    whiteSpace: 'nowrap',
                  }}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function PetoryRefactoringPage() {
  return (
    <div className="page-container">
      <TableOfContents sections={TOC_SECTIONS} />

      <div className="content-area">
        <div style={{ marginBottom: '2.5rem' }}>
          <Link
            to="/portfolio/petory"
            style={{ color: 'var(--link-color)', textDecoration: 'none', fontSize: '0.9rem' }}
          >
            ← Petory 프로젝트
          </Link>
          <h1 style={{ marginTop: '0.75rem', marginBottom: '0.5rem', color: 'var(--text-color)' }}>
            성능 개선 & 리팩토링 대표 사례
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.7, marginBottom: 0 }}>
            면접에서 문제·원인·해결·검증을 설명할 수 있는 사례 4개를 선별했습니다.
            도메인별 상세 기록은 각 섹션 하단 근거 문서에서 확인할 수 있습니다.
          </p>
        </div>

        {/* ── Section 1: N+1 ── */}
        <section id="n-plus-one" style={{ marginBottom: '3rem', scrollMarginTop: '5rem' }}>
          <SectionHeader>1. JPA N+1 성능 개선</SectionHeader>
          <Label>Board · Care · Chat · MissingPet · User</Label>
          <div className="content-card">
            <p style={{ fontSize: '0.93rem', lineHeight: 1.75, marginBottom: '1rem', color: 'var(--text-secondary)' }}>
              <strong style={{ color: 'var(--text-color)' }}>문제</strong>
              {'  '}목록 API에서 부모 엔티티를 조회한 뒤 작성자·반응·파일·댓글 수·지원자 수 같은
              연관 데이터를 항목마다 개별 쿼리로 가져와 쿼리 수가 레코드 수에 비례해 증가했다.
            </p>
            <p style={{ fontSize: '0.93rem', lineHeight: 1.75, marginBottom: '1rem', color: 'var(--text-secondary)' }}>
              <strong style={{ color: 'var(--text-color)' }}>원인</strong>
              {'  '}JPA LAZY 로딩과 Converter 내부 연관 접근, 루프 안 Repository 단건 호출이 섞여 있었다.
            </p>
            <p style={{ fontSize: '0.93rem', lineHeight: 1.75, marginBottom: '1.25rem', color: 'var(--text-secondary)' }}>
              <strong style={{ color: 'var(--text-color)' }}>해결</strong>
              {'  '}목록에 필요한 ID를 먼저 수집한 뒤 <code>IN</code> 절 배치 조회로 한 번에 가져오고,{' '}
              <code>{'Map<Long, ...>'}</code>으로 변환해 DTO 조립 시 메모리에서 매핑했다.
              항상 필요한 <code>@ManyToOne</code>은 Fetch Join으로 처리했다.
            </p>

            <StatGrid
              rows={[
                ['도메인', 'Before', 'After', '효과'],
                ['Board (게시글 100개)', '301 queries / 745ms / 22.5MB', '3 queries / 30ms / 2MB', '쿼리 99% 감소'],
                ['Care (기존 비페이징 측정)', '~2,400 queries / 1,084ms / 21MB', '4~5 queries / 66ms / 6MB', '쿼리 99.8%, 시간 94% 감소'],
                ['Chat login', '21 queries / 305ms / 0.58MB', '4 queries / 55ms / 0.13MB', '시간 81.97% 단축'],
                ['MissingPet (게시글 103개)', '105 queries / 571ms / 11MB', '3 queries / 106ms / 3MB', '쿼리 97% 감소'],
              ]}
            />

            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: 0 }}>
              검증: Hibernate Statistics와 성능 로그로 쿼리 수·실행 시간·메모리를 Before/After 비교
            </p>

            <RefDocs
              items={[
                { to: '/domains/board/optimization', label: 'Board 성능 최적화' },
                { to: '/domains/board/refactoring', label: 'Board 리팩토링' },
                { to: '/domains/care/optimization', label: 'Care 성능 최적화' },
                { to: '/domains/care/refactoring', label: 'Care 리팩토링' },
                { to: '/domains/user/optimization', label: 'User 성능 최적화' },
                { to: '/domains/missing-pet/optimization', label: 'MissingPet 성능 최적화' },
                { to: '/domains/missing-pet/refactoring', label: 'MissingPet 리팩토링' },
                { to: '/domains/chat/optimization', label: 'Chat 성능 최적화' },
              ]}
            />
          </div>
        </section>

        {/* ── Section 2: Concurrency ── */}
        <section id="concurrency" style={{ marginBottom: '3rem', scrollMarginTop: '5rem' }}>
          <SectionHeader>2. 동시성 / Race Condition 해결</SectionHeader>
          <Label>Meetup · PetCoin · Care(보조)</Label>
          <div className="content-card">
            <p style={{ fontSize: '0.93rem', lineHeight: 1.75, marginBottom: '1rem', color: 'var(--text-secondary)' }}>
              <strong style={{ color: 'var(--text-color)' }}>문제</strong>
              {'  '}동시에 여러 요청이 같은 행을 읽고 수정하면 이전 값을 기준으로 계산해 Lost Update가
              발생하거나, 둘 다 조건 검사를 통과해 비즈니스 제약이 깨질 수 있었다.
            </p>
            <p style={{ fontSize: '0.93rem', lineHeight: 1.75, marginBottom: '1rem', color: 'var(--text-secondary)' }}>
              <strong style={{ color: 'var(--text-color)' }}>원인</strong>
              {'  '}<code>현재 값 조회 → 조건 확인 → 값 변경 → save</code> 구조가 원자적이지 않았다.
              모임 참가에서는 최대 인원 체크와 증가가 분리되어 있었고,
              펫코인 잔액에서는 여러 트랜잭션이 같은 잔액을 읽고 덮어쓸 수 있었다.
            </p>
            <p style={{ fontSize: '0.93rem', lineHeight: 1.75, marginBottom: '1.25rem', color: 'var(--text-secondary)' }}>
              <strong style={{ color: 'var(--text-color)' }}>해결</strong>
              {'  '}단순 카운터·조건 검사는 DB 조건부 UPDATE 한 문장으로 처리했다.
              잔액처럼 현재 값 검증이 필요한 영역은 <code>SELECT ... FOR UPDATE</code> 비관적 락으로 직렬화했다.
            </p>

            <StatGrid
              rows={[
                ['사례', '문제', '해결'],
                ['Meetup 참가', '최대 3명 제한인데 동시 요청으로 4명 참가 가능', 'currentParticipants < maxParticipants 조건부 원자적 UPDATE'],
                ['PetCoin 잔액', '동시 충전 5건 기대 잔액 150, 실제 110 가능', 'findByIdForUpdate로 순차 반영'],
                ['Care 거래 확정 (보조)', '두 사용자 모두 확정했는데 OPEN에 머무는 stuck state', 'Conversation PESSIMISTIC_WRITE'],
              ]}
            />

            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: 0 }}>
              검증: 동시성 테스트로 예상 최종 상태와 실제 DB 상태를 비교
            </p>

            <RefDocs
              items={[
                { to: '/domains/meetup/optimization', label: 'Meetup 성능 최적화' },
                { to: '/domains/meetup/refactoring', label: 'Meetup 리팩토링' },
                { to: '/domains/care/refactoring', label: 'Care 리팩토링' },
              ]}
            />
          </div>
        </section>

        {/* ── Section 3: Location ── */}
        <section id="location" style={{ marginBottom: '3rem', scrollMarginTop: '5rem' }}>
          <SectionHeader>3. Location 검색 / 초기 로드 최적화</SectionHeader>
          <Label>Location</Label>
          <div className="content-card">
            <p style={{ fontSize: '0.93rem', lineHeight: 1.75, marginBottom: '1rem', color: 'var(--text-secondary)' }}>
              <strong style={{ color: 'var(--text-color)' }}>문제</strong>
              {'  '}사용자가 보는 데이터는 일부인데 초기 로드에서 전체 위치 서비스 데이터를 전송하고
              프론트에서 필터링·거리 계산을 수행해 DB·네트워크·브라우저 메모리에 모두 부담이 있었다.
            </p>
            <p style={{ fontSize: '0.93rem', lineHeight: 1.75, marginBottom: '1rem', color: 'var(--text-secondary)' }}>
              <strong style={{ color: 'var(--text-color)' }}>해결 1단계</strong>
              {'  '}사용자 위치 기준 10km 반경 조회를 백엔드에서 수행해 전체 데이터 전송을 제거했다.
            </p>
            <p style={{ fontSize: '0.93rem', lineHeight: 1.75, marginBottom: '1.25rem', color: 'var(--text-secondary)' }}>
              <strong style={{ color: 'var(--text-color)' }}>해결 2단계</strong>
              {'  '}지역명 검색어가 들어온 경우 좌표 반경 검색 대신 <code>sido</code>/<code>sigungu</code>{' '}
              파라미터로 DB 인덱스 기반 지역 검색을 타도록 우회 경로를 추가했다.
              통합 지도 기본 조회와 "이 지역" 버튼은 현재도 좌표+반경 검색을 사용한다.
            </p>

            <p style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>
              1단계: 전체 조회 제거
            </p>
            <StatGrid
              rows={[
                ['항목', 'Before', 'After'],
                ['초기 조회 데이터', '22,699개', '약 1,026개 (95.5% 감소)'],
                ['네트워크 전송량', '약 22MB', '약 1MB'],
                ['프론트 전체 처리', '1,484ms', '약 700ms'],
                ['프론트 메모리', '78.90MB', '약 28.6MB'],
              ]}
            />

            <p style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>
              2단계: 지역명 검색 우회 경로
            </p>
            <StatGrid
              rows={[
                ['항목', 'Before', 'After'],
                ['검색 기준', '위치 기반 거리 검색', '지역명 입력 시 시군구 기반 검색'],
                ['DB 쿼리 시간', '198~368ms', '36~53ms'],
                ['전체 처리 시간', '202~412ms', '49~68ms'],
              ]}
            />

            <RefDocs
              items={[
                { to: '/domains/location/optimization', label: 'Location 성능 최적화' },
                { to: '/domains/location/refactoring', label: 'Location 리팩토링' },
              ]}
            />
          </div>
        </section>

        {/* ── Section 4: Security ── */}
        <section id="security" style={{ marginBottom: '3rem', scrollMarginTop: '5rem' }}>
          <SectionHeader>4. 보안 / 인가 계약 정리</SectionHeader>
          <Label>Chat · Care</Label>
          <div className="content-card">
            <p style={{ fontSize: '0.93rem', lineHeight: 1.75, marginBottom: '1rem', color: 'var(--text-secondary)' }}>
              <strong style={{ color: 'var(--text-color)' }}>문제</strong>
              {'  '}인증된 사용자가 요청 파라미터의 사용자 ID를 바꾸거나, 참여자가 아닌 채팅방 ID를
              지정하면 메시지 조회·검색·상태 변경 대상에 영향을 줄 수 있는 API 계약이 있었다.
            </p>
            <p style={{ fontSize: '0.93rem', lineHeight: 1.75, marginBottom: '1rem', color: 'var(--text-secondary)' }}>
              <strong style={{ color: 'var(--text-color)' }}>원인</strong>
              {'  '}인증은 되어 있지만 리소스 소유자·참여자 여부를 확인하는 인가가 API별로 흩어져 있었다.
              Chat의 메시지 조회·검색·상태 변경 경로는 인증 여부와 채팅방 참여 여부가 분리되어 있었고,
              일부 API는 서버의 인증 주체보다 클라이언트가 넘긴 ID를 조회 기준으로 삼았다.
            </p>
            <p style={{ fontSize: '0.93rem', lineHeight: 1.75, marginBottom: '1.25rem', color: 'var(--text-secondary)' }}>
              <strong style={{ color: 'var(--text-color)' }}>해결</strong>
              {'  '}Chat에서는 사용자 식별을 JWT principal에서 가져오고, 서비스 진입 전에{' '}
              <code>requireActiveParticipant</code>로 채팅방 ACTIVE 참여자 여부를 검증했다.
              <code>getMessagesBefore</code>·<code>searchMessages</code>·<code>PATCH /status</code> 경로에 적용했다.
              Care <code>my-requests</code>는 클라이언트 <code>userId</code> 파라미터를 제거해 현재 사용자 기준 조회로 바꿨다.
            </p>

            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: 0 }}>
              핵심: "클라이언트가 넘긴 사용자 식별자를 신뢰하지 않고, 서버가 인증 주체와 리소스 관계를 기준으로 판단한다."
              이 사례는 수치 중심이 아닌 API 계약과 인가 경계 개선 사례다.
            </p>

            <RefDocs
              items={[
                { to: '/domains/chat/refactoring', label: 'Chat 리팩토링' },
                { to: '/domains/care/refactoring', label: 'Care 리팩토링' },
              ]}
            />
          </div>
        </section>

        {/* ── Optional: NLP ── */}
        <section style={{ marginBottom: '3rem' }}>
          <div
            style={{
              padding: '1.25rem 1.5rem',
              borderRadius: '8px',
              border: '1px dashed var(--nav-border)',
              backgroundColor: 'var(--card-bg)',
            }}
          >
            <p style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>
              선택 사례 — NLP/추천 포트폴리오 강조 시 포함
            </p>
            <h3 style={{ margin: '0 0 0.75rem', color: 'var(--text-color)', fontSize: '1rem' }}>
              Java-Python enum 계약 불일치 (petType 422 silent drop)
            </h3>
            <p style={{ fontSize: '0.9rem', lineHeight: 1.7, color: 'var(--text-secondary)', marginBottom: '0.75rem' }}>
              Java는 <code>BIRD</code>/<code>RABBIT</code>/<code>HAMSTER</code>/<code>ETC</code>를 전송했지만
              Python FastAPI 스키마는 <code>DOG</code>/<code>CAT</code>/<code>OTHER</code>만 허용해 422가 발생했다.
              클라이언트가 예외를 삼켜 신호가 무음 드롭됐다.
              Java-Python 경계에서 <code>DOG</code>/<code>CAT</code> 외 값을 <code>OTHER</code>로 정규화해 변경 범위를 최소화했다.
            </p>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <RefLink to="/domains/recommendation/refactoring">Recommendation 리팩토링 →</RefLink>
              <RefLink to="/domains/recommendation/optimization">NLP 호출·부하 제어 →</RefLink>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
