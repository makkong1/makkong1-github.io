import { Link } from 'react-router-dom';
import TableOfContents from '../../../../components/Common/TableOfContents';

function Card({ children, style }) {
  return (
    <div
      className="section-card"
      style={{
        padding: '1.5rem',
        backgroundColor: 'var(--card-bg)',
        borderRadius: '8px',
        border: '1px solid var(--nav-border)',
        ...style,
      }}
    >
      {children}
    </div>
  );
}

function CodeBlock({ children }) {
  return (
    <pre
      style={{
        padding: '0.95rem 1rem',
        backgroundColor: 'var(--bg-color)',
        borderRadius: '6px',
        overflowX: 'auto',
        fontSize: '0.84rem',
        color: 'var(--text-secondary)',
        fontFamily: 'monospace',
        lineHeight: '1.65',
        margin: '0.75rem 0 0',
      }}
    >
      {children}
    </pre>
  );
}

const PETORY_MEETUP_ARCH_DOC =
  'https://github.com/makkong1/Petory/blob/main/docs/architecture/meetup/%EC%82%B0%EC%B1%85%20%26%20%EC%98%A4%ED%94%84%EB%9D%BC%EC%9D%B8%20%EB%AA%A8%EC%9E%84%20%EC%95%84%ED%82%A4%ED%85%8D%EC%B2%98.md';

function MeetupDomainV2() {
  const sections = [
    { id: 'pillars', title: '핵심 기능' },
    { id: 'intro', title: '도메인 개요' },
    { id: 'design', title: '기술 결정' },
    { id: 'docs', title: '관련 페이지' },
  ];

  const corePillars = [
    '참가 동시성 제어',
    '이벤트 기반 채팅방 분리',
    '근처 모임 2단계 조회',
    '히스토리 N+1 제거',
    '참여 가능 목록 단순화',
  ];

  const li = (text) => <li style={{ marginBottom: '0.35rem' }}>• {text}</li>;

  return (
    <div className="domain-page-wrapper" style={{ padding: '2rem 0' }}>
      <div
        className="domain-page-container"
        style={{ display: 'flex', gap: '2rem', alignItems: 'flex-start' }}
      >
        <div className="domain-page-content" style={{ flex: 1 }}>
          <div className="domain-hero">
            <span className="eyebrow">Meetup</span>
          <h1 style={{ marginBottom: '0.5rem', color: 'var(--text-color)' }}>
            모임 도메인
          </h1>
          <p
            style={{
              color: 'var(--text-secondary)',
              lineHeight: '1.8',
              marginBottom: '0.85rem',
              fontSize: '0.95rem',
            }}
          >
            반려동물 산책·오프라인 모임을 만들고 참여를 관리하는 도메인입니다.
            집중한 건 단순 등록보다, <strong>동시 참가에도 최대 인원을 정확히
            지키는 구조</strong>였습니다. 모임 생성 직후 채팅방은 커밋 이후
            이벤트로 분리하고 재시도·복구 스케줄러로 보강해 실패 전파를
            줄였습니다. 근처 검색은 공간 조건으로 ID만 먼저 뽑는 2단계로 메모리
            부담을 낮췄습니다.
          </p>

          </div>

          <section
            id="pillars"
            style={{ marginBottom: '2rem', scrollMarginTop: '2rem' }}
          >
            <h2
              style={{
                marginBottom: '0.75rem',
                color: 'var(--text-color)',
                fontSize: '1.1rem',
              }}
            >
              핵심 기능
            </h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {corePillars.map((label) => (
                <span
                  key={label}
                  style={{
                    padding: '0.35rem 0.75rem',
                    borderRadius: '999px',
                    fontSize: '0.82rem',
                    fontWeight: 600,
                    color: 'var(--text-color)',
                    backgroundColor: 'var(--bg-color)',
                    border: '1px solid var(--nav-border)',
                  }}
                >
                  {label}
                </span>
              ))}
            </div>
          </section>

          <section
            id="intro"
            style={{ marginBottom: '3rem', scrollMarginTop: '2rem' }}
          >
            <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>
              도메인 개요
            </h2>

            <Card style={{ marginBottom: '1rem' }}>
              <p
                style={{
                  lineHeight: '1.8',
                  color: 'var(--text-secondary)',
                  margin: 0,
                }}
              >
                오프라인 모임은 인원 수가 곧 사용자 경험과 직결됩니다. 동시에
                여러 사람이 참가 버튼을 눌러도 최대 인원을 넘기지 않도록
                비관적 락 + 원자적 UPDATE + PK 충돌 복구 흐름을 조합했습니다.
                채팅방은 모임 생성 트랜잭션 커밋 이후{' '}
                <code
                  style={{
                    backgroundColor: 'var(--bg-color)',
                    padding: '0.1rem 0.3rem',
                    borderRadius: '4px',
                  }}
                >
                  MeetupCreatedEvent
                </code>
                로 비동기 생성해, 채팅방 장애가 모임 생성을 롤백하지 않도록
                분리했습니다. 상태 전이는 스케줄러가 매시 정각 일괄 처리하며,
                참여 가능 목록은 복잡한 서브쿼리 없이{' '}
                <code
                  style={{
                    backgroundColor: 'var(--bg-color)',
                    padding: '0.1rem 0.3rem',
                    borderRadius: '4px',
                  }}
                >
                  currentParticipants &lt; maxParticipants
                </code>{' '}
                직접 비교로 단순화했습니다.
              </p>
            </Card>

            <Card style={{ marginBottom: '1rem' }}>
              <table
                style={{
                  width: '100%',
                  borderCollapse: 'collapse',
                  fontSize: '0.9rem',
                  color: 'var(--text-secondary)',
                }}
              >
                <thead>
                  <tr style={{ borderBottom: '1px solid var(--nav-border)' }}>
                    {['지표', 'Before', 'After'].map((h) => (
                      <th
                        key={h}
                        style={{
                          padding: '0.55rem 0.75rem',
                          textAlign: 'left',
                          color: 'var(--text-color)',
                        }}
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['근처 모임 전체 실행 시간', '486ms', '273ms'],
                    ['근처 모임 DB 쿼리 시간', '241ms', '143ms'],
                    ['근처 모임 메모리 사용량', '1.48MB', '0.21MB'],
                    ['히스토리 PrepareStatement 수', '102개', '2개'],
                  ].map(([label, before, after], i, arr) => (
                    <tr
                      key={label}
                      style={{
                        borderBottom:
                          i < arr.length - 1
                            ? '1px solid var(--nav-border)'
                            : 'none',
                      }}
                    >
                      <td
                        style={{
                          padding: '0.55rem 0.75rem',
                          color: 'var(--text-color)',
                        }}
                      >
                        {label}
                      </td>
                      <td style={{ padding: '0.55rem 0.75rem' }}>{before}</td>
                      <td
                        style={{
                          padding: '0.55rem 0.75rem',
                          color: 'var(--text-color)',
                          fontWeight: 600,
                        }}
                      >
                        {after}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p
                style={{
                  color: 'var(--text-secondary)',
                  fontSize: '0.88rem',
                  marginTop: '0.75rem',
                  marginBottom: 0,
                  lineHeight: '1.7',
                }}
              >
                테스트 데이터 1,000건 기준 리팩토링 비교값 · 인메모리 필터링
                → DB 반경 필터링 → 공간 조건 최적화 3단계 비교 · 현재 운영
                경로 절대 성능과 동일시하면 안 됨.
              </p>
            </Card>

            <Card>
              <h3
                style={{
                  marginBottom: '0.65rem',
                  color: 'var(--text-color)',
                  fontSize: '1rem',
                }}
              >
                데이터 흐름
              </h3>
              <p
                style={{
                  color: 'var(--text-secondary)',
                  fontSize: '0.88rem',
                  lineHeight: '1.75',
                  margin: '0 0 0.65rem',
                }}
              >
                시퀀스 다이어그램은 도메인별로 두지 않고 통합 페이지에만 있습니다. 모임·참가와 Chat
                인프라는 각각 다른 절에 있습니다.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', alignItems: 'flex-start' }}>
                <Link
                  to="/domains/flows?tab=meetup"
                  style={{
                    color: 'var(--link-color)',
                    fontWeight: 600,
                    textDecoration: 'none',
                  }}
                >
                  Meetup · 모임·그룹방·참가 시퀀스 →
                </Link>
                <Link
                  to="/domains/flows?tab=meetup&seq=chat"
                  style={{
                    color: 'var(--link-color)',
                    fontWeight: 600,
                    textDecoration: 'none',
                  }}
                >
                  Chat ↔ Meetup (그룹·메시지·읽음) 시퀀스 →
                </Link>
              </div>
            </Card>
          </section>

          <section
            id="design"
            style={{ marginBottom: '3rem', scrollMarginTop: '2rem' }}
          >
            <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>
              기술 결정
            </h2>

            <Card style={{ marginBottom: '1rem' }}>
              <h3
                style={{
                  marginBottom: '0.75rem',
                  color: 'var(--text-color)',
                  fontSize: '1rem',
                }}
              >
                A. 참가 동시성 제어
              </h3>
              <ul
                style={{
                  listStyle: 'none',
                  padding: 0,
                  margin: 0,
                  color: 'var(--text-secondary)',
                  lineHeight: '1.8',
                }}
              >
                {li('findByIdWithLock — PESSIMISTIC_WRITE로 동시 참가 요청 직렬화')}
                {li('incrementParticipantsIfAvailable — RECRUITING 상태 + 인원 미달 조건을 UPDATE 한 번에 체크')}
                {li('DataIntegrityViolationException(PK 충돌) → decrementParticipantsIfPositive + alreadyJoined 복구')}
                {li('취소 시 decrementParticipantsIfPositive — read-modify-write 제거, 음수 방지 조건 포함')}
              </ul>
              <CodeBlock>{`// 비관적 락으로 직렬화
Meetup meetup = meetupRepository.findByIdWithLock(meetupIdx)
    .orElseThrow(MeetupNotFoundException::new);

// 원자적 조건부 증가 (RECRUITING + 인원 미달 동시 체크)
int updated = meetupRepository
    .incrementParticipantsIfAvailable(meetupIdx, MeetupStatus.RECRUITING);
if (updated == 0) throw MeetupConflictException.fullCapacity();

// PK 충돌 → 증가 롤백 후 중복 예외
} catch (DataIntegrityViolationException e) {
    meetupRepository.decrementParticipantsIfPositive(meetupIdx);
    throw MeetupConflictException.alreadyJoined();
}`}</CodeBlock>
            </Card>

            <Card style={{ marginBottom: '1rem' }}>
              <h3
                style={{
                  marginBottom: '0.75rem',
                  color: 'var(--text-color)',
                  fontSize: '1rem',
                }}
              >
                B. 이벤트 기반 채팅방 분리
              </h3>
              <ul
                style={{
                  listStyle: 'none',
                  padding: 0,
                  margin: 0,
                  color: 'var(--text-secondary)',
                  lineHeight: '1.8',
                }}
              >
                {li('모임 생성 트랜잭션 내 TransactionSynchronization.afterCommit() 등록')}
                {li('커밋 성공 후에만 MeetupCreatedEvent 발행 — 롤백 시 이벤트 미발행')}
                {li('@Async @EventListener — 채팅방 생성 실패가 모임 생성을 롤백하지 않음')}
                {li('@Retryable 3회 재시도 + 5분 복구 스케줄러로 누락된 그룹방 보정')}
                {li('joinMeetup()은 모임 참가만 처리 — 채팅방 참가는 Chat API에서 별도 처리')}
              </ul>
              <CodeBlock>{`// 커밋 후 이벤트 발행 (트랜잭션 분리)
TransactionSynchronizationManager.registerSynchronization(
    new TransactionSynchronization() {
        @Override
        public void afterCommit() {
            eventPublisher.publishEvent(
                new MeetupCreatedEvent(this, savedMeetup.getIdx(),
                    organizer.getIdx(), savedMeetup.getTitle()));
        }
    });

// 이벤트 리스너 — 별도 트랜잭션, 비동기
@EventListener
@Async
public void handleMeetupCreated(MeetupCreatedEvent event) {
    meetupChatRoomCreationService.createChatRoom(...);
}

// 생성 실패 보강: 3회 재시도 + 5분 복구 스케줄러
@Retryable(retryFor = Exception.class, maxAttempts = 3,
    backoff = @Backoff(delay = 1000, multiplier = 2))
public void createChatRoom(Long meetupIdx, Long organizerIdx, String title) {
    conversationCreatorService.createConversation(...);
}`}</CodeBlock>
            </Card>

            <Card style={{ marginBottom: '1rem' }}>
              <h3
                style={{
                  marginBottom: '0.75rem',
                  color: 'var(--text-color)',
                  fontSize: '1rem',
                }}
              >
                C. 근처 모임 2단계 조회
              </h3>
              <ul
                style={{
                  listStyle: 'none',
                  padding: 0,
                  margin: 0,
                  color: 'var(--text-secondary)',
                  lineHeight: '1.8',
                }}
              >
                {li('1단계: findNearbyMeetupIds — ST_Within + ST_Distance_Sphere로 ID + 거리 정렬 + LIMIT만 조회')}
                {li('2단계: findByIdxInWithOrganizer — IN + JOIN FETCH로 organizer N+1 방지')}
                {li('응답 DTO의 distance는 서비스에서 미터 단위로 다시 계산해 세팅')}
                {li('nearby는 지도 마커용 미래 모임 조회 — RECRUITING 정원 미달 목록은 /available과 구분')}
              </ul>
              <CodeBlock>{`// 1단계: ID·정렬·LIMIT만 네이티브 쿼리로
List<Long> ids = meetupRepository.findNearbyMeetupIds(
    lat, lng, radiusKm, now, limit);   // ST_Within + ST_Distance_Sphere

// 2단계: organizer JOIN FETCH로 N+1 방지
List<Meetup> loaded = meetupRepository.findByIdxInWithOrganizer(ids);

// 정렬 순서 보존 (ID 기준 Map → ids 순 재정렬)
Map<Long, Meetup> byId = loaded.stream()
    .collect(Collectors.toMap(Meetup::getIdx, m -> m));
return ids.stream().map(byId::get).filter(Objects::nonNull)
    .map(meetup -> {
        MeetupDTO dto = converter.toDTO(meetup);
        dto.setDistance(calculateDistanceMeters(lat, lng,
            meetup.getLatitude(), meetup.getLongitude()));
        return dto;
    }).collect(Collectors.toList());`}</CodeBlock>
            </Card>

            <Card style={{ marginBottom: '1rem' }}>
              <h3
                style={{
                  marginBottom: '0.75rem',
                  color: 'var(--text-color)',
                  fontSize: '1rem',
                }}
              >
                D. 히스토리 N+1 제거
              </h3>
              <ul
                style={{
                  listStyle: 'none',
                  padding: 0,
                  margin: 0,
                  color: 'var(--text-secondary)',
                  lineHeight: '1.8',
                }}
              >
                {li('MeetupParticipants → Meetup → organizer + user: 3단계 연관 탐색')}
                {li('JOIN FETCH mp.meetup m JOIN FETCH m.organizer JOIN FETCH mp.user — 1회 쿼리로 해결')}
                {li('PrepareStatement 수: 102개 → 2개 (히스토리 목록 + 카운트)')}
              </ul>
              <CodeBlock>{`-- 히스토리 Fetch Join (participants→meetup→organizer→user 1회)
SELECT mp FROM MeetupParticipants mp
JOIN FETCH mp.meetup m
JOIN FETCH m.organizer o
JOIN FETCH mp.user u
WHERE mp.user.idx = :userIdx
ORDER BY mp.joinedAt DESC`}</CodeBlock>
            </Card>

            <Card>
              <h3
                style={{
                  marginBottom: '0.75rem',
                  color: 'var(--text-color)',
                  fontSize: '1rem',
                }}
              >
                E. 참여 가능 목록 단순화
              </h3>
              <ul
                style={{
                  listStyle: 'none',
                  padding: 0,
                  margin: 0,
                  color: 'var(--text-secondary)',
                  lineHeight: '1.8',
                }}
              >
                {li('이전: 서브쿼리 또는 LEFT JOIN + GROUP BY + HAVING 구조')}
                {li('현재: currentParticipants < maxParticipants 직접 비교 — 상태·인원 조건 단순 WHERE절')}
                {li('Pageable로 DB LIMIT/OFFSET 처리 — 메모리 페이징 위험 해소')}
              </ul>
              <CodeBlock>{`-- 참여 가능 모임 (currentParticipants 직접 비교)
SELECT m FROM Meetup m JOIN FETCH m.organizer
WHERE m.date > :currentDate
  AND m.currentParticipants < m.maxParticipants
  AND m.status = :recruiting
  AND (m.isDeleted = false OR m.isDeleted IS NULL)
ORDER BY m.date ASC
-- Pageable → DB LIMIT/OFFSET 자동 적용`}</CodeBlock>
            </Card>
          </section>
          <section
            id="docs"
            style={{ marginBottom: '3rem', scrollMarginTop: '2rem' }}
          >
            <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>
              관련 페이지
            </h2>
            <Card>
              <ul
                style={{
                  listStyle: 'none',
                  padding: 0,
                  margin: 0,
                  color: 'var(--text-secondary)',
                  lineHeight: '2',
                }}
              >
                <li>
                  •{' '}
                  <Link
                    to="/domains/cases?case=concurrency-strategy"
                    style={{ color: 'var(--link-color)', textDecoration: 'none' }}
                  >
                    대표 개선 사례 보기
                  </Link>
                  {' — 동시성/Race Condition 해결'}
                </li>
                <li>
                  •{' '}
                  <Link
                    to="/domains/cases"
                    style={{ color: 'var(--link-color)', textDecoration: 'none' }}
                  >
                    전체 쿼리 감사
                  </Link>
                  {' — 검색이 500건을 읽고 메모리에서 자르던 것 · N+1 오진을 피한 과정'}
                </li>
                <li>
                  •{' '}
                  <a
                    href={PETORY_MEETUP_ARCH_DOC}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: 'var(--link-color)', textDecoration: 'none' }}
                  >
                    산책 &amp; 오프라인 모임 아키텍처
                  </a>
                </li>
              </ul>
            </Card>
          </section>
        </div>

        <TableOfContents sections={sections} />
      </div>
    </div>
  );
}

export default MeetupDomainV2;
