import { Link } from 'react-router-dom';
import MermaidDiagram from '../../../../components/Common/MermaidDiagram';
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
        ...style
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
        margin: '0.75rem 0 0'
      }}
    >
      {children}
    </pre>
  );
}

function MeetupDomain() {
  const sections = [
    { id: 'intro', title: '도메인 개요' },
    { id: 'design', title: '기능 & 아키텍처' },
    { id: 'performance', title: '성능 최적화' },
    { id: 'summary', title: '핵심 포인트' },
    { id: 'docs', title: '관련 페이지' }
  ];

  const entityDiagram = `erDiagram
    Users ||--o{ Meetup : "organizes"
    Meetup ||--o{ MeetupParticipants : "has"
    Users ||--o{ MeetupParticipants : "joins"

    Meetup {
        Long idx PK
        String title
        String description
        String location
        Double latitude
        Double longitude
        LocalDateTime date
        Long organizer_idx FK
        Integer maxParticipants
        Integer currentParticipants
        MeetupStatus status
        Boolean isDeleted
        LocalDateTime deletedAt
    }

    MeetupParticipants {
        Long meetup_idx PK
        Long user_idx PK
        LocalDateTime joinedAt
    }`;

  const meetupCreateFlow = `sequenceDiagram
    participant User as 주최자
    participant Service as MeetupService
    participant DB as MySQL
    participant Event as MeetupCreatedEvent
    participant Listener as MeetupChatRoomEventListener
    participant Chat as ConversationService

    User->>Service: createMeetup()
    Service->>DB: Meetup 저장
    Service->>DB: 주최자 MeetupParticipants 저장
    Service->>Event: afterCommit 이벤트 발행
    Event->>Listener: MeetupCreatedEvent
    Listener->>Chat: 그룹 채팅방 생성
    Listener->>Chat: 주최자 ADMIN 설정`;

  const joinFlow = `sequenceDiagram
    participant User as 참가자
    participant Service as MeetupService
    participant DB as MySQL

    User->>Service: joinMeetup()
    Service->>DB: 중복 참여 검사
    Service->>DB: incrementParticipantsIfAvailable()
    Note over DB: RECRUITING + 정원 미달<br/>조건 동시 체크 후 증가
    Service->>DB: MeetupParticipants 저장
    Service-->>User: 참가 성공
    Note over User: 채팅방 입장은 별도 API 호출`;

  const li = (text) => <li style={{ marginBottom: '0.35rem' }}>• {text}</li>;

  return (
    <div className="domain-page-wrapper" style={{ padding: '2rem 0' }}>
      <div className="domain-page-container" style={{ display: 'flex', gap: '2rem', alignItems: 'flex-start' }}>
        <div className="domain-page-content" style={{ flex: 1 }}>
          <h1 style={{ marginBottom: '0.5rem', color: 'var(--text-color)' }}>모임 도메인</h1>
          <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', marginBottom: '2.5rem', fontSize: '0.95rem' }}>
            Meetup 도메인은 오프라인 반려동물 모임의 생성, 참여, 취소, 검색, 상태 관리, 채팅방 연동을 담당합니다.
            핵심은 <strong style={{ color: 'var(--text-color)' }}>최대 인원 제한을 동시성 안전하게 처리하고, 모임과 채팅을 느슨하게 연결해 핵심 트랜잭션을 보호하는 것</strong>입니다.
          </p>

          <section id="intro" style={{ marginBottom: '3rem', scrollMarginTop: '2rem' }}>
            <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>도메인 개요</h2>
            <Card>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, color: 'var(--text-secondary)', lineHeight: '1.8' }}>
                <li>• 모임 생성 시 주최자는 자동 참여하고 그룹 채팅방 생성 이벤트가 트랜잭션 커밋 이후 발행됩니다.</li>
                <li>• 정원 증가는 DB 원자적 UPDATE 쿼리로 처리해 Race Condition을 방지합니다.</li>
                <li>• 모임 참여와 채팅방 입장은 별도 API로 분리해 도메인 책임을 나눴습니다.</li>
                <li>• 상태 흐름: <strong style={{ color: 'var(--text-color)' }}>RECRUITING → CLOSED</strong> (정원 마감, 스케줄러) → <strong style={{ color: 'var(--text-color)' }}>COMPLETED</strong> (모임 일시 경과, 스케줄러)</li>
              </ul>
            </Card>
          </section>

          <section id="design" style={{ marginBottom: '3rem', scrollMarginTop: '2rem' }}>
            <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>기능 & 아키텍처</h2>

            <Card style={{ marginBottom: '1rem' }}>
              <h3 style={{ marginBottom: '0.75rem', color: 'var(--text-color)', fontSize: '1rem' }}>모임 생성 & 채팅방 이벤트 연동</h3>
              <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', marginBottom: '0.75rem' }}>
                모임 저장과 주최자 자동 참여까지가 핵심 트랜잭션입니다. 채팅방 생성은 트랜잭션 커밋 후 이벤트로 분리해
                채팅 실패가 모임 생성 롤백으로 이어지지 않도록 했습니다.
              </p>
              <MermaidDiagram chart={meetupCreateFlow} />
              <CodeBlock>{`Meetup savedMeetup = meetupRepository.save(meetup);
meetupParticipantsRepository.save(organizerParticipant);

TransactionSynchronizationManager.registerSynchronization(
  afterCommit -> eventPublisher.publishEvent(
    new MeetupCreatedEvent(...)
  )
);
// MeetupChatRoomEventListener: @Async + REQUIRES_NEW → 별도 트랜잭션`}</CodeBlock>
              <ul style={{ listStyle: 'none', padding: 0, marginTop: '0.75rem', color: 'var(--text-secondary)', lineHeight: '1.8' }}>
                {li('모임 생성과 참여에는 이메일 인증(`EmailVerificationPurpose.MEETUP`)이 필요합니다.')}
                {li('주최자는 자동 참여하며 `currentParticipants`는 생성 시 1로 시작합니다.')}
              </ul>
            </Card>

            <Card style={{ marginBottom: '1rem' }}>
              <h3 style={{ marginBottom: '0.75rem', color: 'var(--text-color)', fontSize: '1rem' }}>원자적 인원 증가 & 참가 취소</h3>
              <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', marginBottom: '0.75rem' }}>
                `incrementParticipantsIfAvailable()`은 RECRUITING 상태이면서 정원이 남은 경우에만 DB에서 인원 수를 증가시킵니다.
                서비스 선검사 + DB PK로 중복 참여를 이중 방지합니다.
              </p>
              <MermaidDiagram chart={joinFlow} />
              <CodeBlock>{`int updated = meetupRepository.incrementParticipantsIfAvailable(
  meetupIdx, MeetupStatus.RECRUITING
);
if (updated == 0) {
  if (meetup.getStatus() != MeetupStatus.RECRUITING)
    throw MeetupConflictException.meetupNotRecruiting();
  throw MeetupConflictException.fullCapacity();
}
entityManager.refresh(meetup); // 영속성 컨텍스트 동기화

// 참가 취소: 채팅 실패는 부가 기능 실패로만 기록
meetupParticipantsRepository.delete(participant);
meetupRepository.decrementParticipantsIfPositive(meetupIdx);
try { conversationService.leaveMeetupChat(meetupIdx, userIdx); }
catch (Exception e) { log.warn(...); }`}</CodeBlock>
              <ul style={{ listStyle: 'none', padding: 0, marginTop: '0.75rem', color: 'var(--text-secondary)', lineHeight: '1.8' }}>
                {li('인원 감소도 원자적 UPDATE(`decrementParticipantsIfPositive`)로 처리합니다.')}
                {li('주최자는 참가 취소할 수 없습니다.')}
              </ul>
            </Card>

            <Card style={{ marginBottom: '1rem' }}>
              <h3 style={{ marginBottom: '0.75rem', color: 'var(--text-color)', fontSize: '1rem' }}>상태 자동 전이 스케줄러</h3>
              <CodeBlock>{`@Scheduled(cron = "0 0 * * * *")          // 매시 정각: 정원 마감 처리
void closeFullRecruitingMeetups() { ... }

@Scheduled(cron = "0 5 0 * * *")           // 매일 00:05: 종료 처리
void completePastMeetups() { ... }
// date < now → COMPLETED 전이`}</CodeBlock>
              <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', marginTop: '0.75rem', marginBottom: 0 }}>
                근처 모임 조회(`/api/meetups/nearby`)에서는 COMPLETED 상태를 제외하고 미래 날짜만 포함합니다.
              </p>
            </Card>

            <Card style={{ marginBottom: '1rem' }}>
              <h3 style={{ marginBottom: '0.75rem', color: 'var(--text-color)', fontSize: '1rem' }}>위치 기반 검색</h3>
              <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', marginBottom: '0.5rem' }}>
                전체 엔티티를 바로 읽지 않고, ID만 거리순으로 뽑은 뒤 주최자 정보를 포함한 엔티티를 재조회합니다.
              </p>
              <CodeBlock>{`ids = meetupRepository.findNearbyMeetupIds(lat, lng, radiusKm, maxResults);
meetups = meetupRepository.findByIdxInWithOrganizer(ids);
// Bounding Box 인덱스 활용 → Haversine 정밀 필터
// maxResults: 서비스에서 1~1000 클램프`}</CodeBlock>
              <ul style={{ listStyle: 'none', padding: 0, marginTop: '0.75rem', color: 'var(--text-secondary)', lineHeight: '1.8' }}>
                {li('`/api/meetups/location`: 위도/경도 범위 조회')}
                {li('`/api/meetups/search`: 제목·설명 LIKE 검색')}
                {li('`MeetupController`에 클래스 단위 `@PreAuthorize("isAuthenticated()")` 적용 — 전체 인증 필요')}
              </ul>
            </Card>

            <Card style={{ marginBottom: '1rem' }}>
              <h3 style={{ marginBottom: '0.75rem', color: 'var(--text-color)', fontSize: '1rem' }}>엔티티 관계도</h3>
              <MermaidDiagram chart={entityDiagram} />
              <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', marginTop: '0.75rem', marginBottom: 0, fontSize: '0.9rem' }}>
                `MeetupParticipants`는 복합 PK `(meetup_idx, user_idx)` — DB 레벨 중복 참여 방지.
                관리자 경로는 `AdminMeetupController` → `AdminCareAndMeetupFacade` 경유.
              </p>
            </Card>

            <Card>
              <h3 style={{ marginBottom: '0.75rem', color: 'var(--text-color)', fontSize: '1rem' }}>주요 API</h3>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid var(--nav-border)' }}>
                    <th style={{ padding: '0.65rem 0.75rem', textAlign: 'left', color: 'var(--text-color)' }}>엔드포인트</th>
                    <th style={{ padding: '0.65rem 0.75rem', textAlign: 'left', color: 'var(--text-color)' }}>Method</th>
                    <th style={{ padding: '0.65rem 0.75rem', textAlign: 'left', color: 'var(--text-color)' }}>설명</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['/api/meetups', 'POST', '모임 생성 (이메일 인증 필요)'],
                    ['/api/meetups/{meetupIdx}', 'PUT / DELETE / GET', '수정 / 소프트 삭제 / 상세 조회'],
                    ['/api/meetups', 'GET', '전체 모임 페이징 조회'],
                    ['/api/meetups/nearby', 'GET', '반경 기반 근처 모임 조회'],
                    ['/api/meetups/available', 'GET', '참여 가능 모임 Slice 조회'],
                    ['/api/meetups/search', 'GET', '키워드 LIKE 검색'],
                    ['/api/meetups/{meetupIdx}/participants', 'POST / DELETE / GET', '참가 / 취소 / 목록'],
                    ['/api/meetups/{meetupIdx}/participants/check', 'GET', '참여 여부 확인'],
                    ['/api/chat/conversations/meetup/{meetupIdx}/join', 'POST', '채팅방 입장 (별도 호출)'],
                  ].map(([path, method, desc], index, arr) => (
                    <tr key={path + method} style={{ borderBottom: index < arr.length - 1 ? '1px solid var(--nav-border)' : 'none' }}>
                      <td style={{ padding: '0.65rem 0.75rem' }}>
                        <code style={{ backgroundColor: 'var(--bg-color)', padding: '0.15rem 0.35rem', borderRadius: '4px' }}>{path}</code>
                      </td>
                      <td style={{ padding: '0.65rem 0.75rem' }}>{method}</td>
                      <td style={{ padding: '0.65rem 0.75rem' }}>{desc}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Card>
          </section>

          <section id="performance" style={{ marginBottom: '3rem', scrollMarginTop: '2rem' }}>
            <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>성능 최적화</h2>

            <Card style={{ marginBottom: '1rem' }}>
              <h3 style={{ marginBottom: '0.75rem', color: 'var(--text-color)', fontSize: '1rem' }}>인덱스 전략</h3>
              <CodeBlock>{`CREATE INDEX idx_meetup_date        ON meetup(date);
CREATE INDEX idx_meetup_date_status  ON meetup(date, status);
CREATE INDEX idx_meetup_location     ON meetup(latitude, longitude);
CREATE INDEX idx_meetup_status       ON meetup(status);
CREATE INDEX organizer_idx           ON meetup(organizer_idx);

CREATE INDEX user_idx ON meetupparticipants(user_idx);
-- PRIMARY KEY (meetup_idx, user_idx)`}</CodeBlock>
              <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', marginTop: '0.75rem', marginBottom: 0 }}>
                상태·날짜·위치·주최자 조회와 중복 참여 방지를 기준으로 인덱스를 구성했습니다.
              </p>
            </Card>

            <Card>
              <h3 style={{ marginBottom: '0.75rem', color: 'var(--text-color)', fontSize: '1rem' }}>근처 모임 검색 개선 결과</h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, color: 'var(--text-secondary)', lineHeight: '1.8' }}>
                {li('전체 처리 시간 43.8% 감소 / DB 쿼리 시간 40.7% 감소 / 메모리 85.8% 감소')}
                {li('Bounding Box로 위치 인덱스를 먼저 활용하고, Haversine으로 정확한 거리를 계산합니다.')}
                {li('ID만 먼저 조회한 뒤 주최자 포함 엔티티를 재조회해 불필요한 로드를 줄입니다.')}
                {li('`joinMeetup()`에서 `findById()` 두 번 호출 대신 `entityManager.refresh()`로 중복 쿼리 제거')}
              </ul>
            </Card>
          </section>

          <section id="summary" style={{ marginBottom: '3rem', scrollMarginTop: '2rem' }}>
            <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>핵심 포인트</h2>
            <Card>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, color: 'var(--text-secondary)', lineHeight: '1.8' }}>
                <li>• 정원 경쟁의 Race Condition은 원자적 UPDATE (`incrementParticipantsIfAvailable`)로 해결했습니다.</li>
                <li>• 채팅방 생성은 `afterCommit` 이벤트 + `@Async` + `REQUIRES_NEW`로 분리해 핵심 트랜잭션을 보호했습니다.</li>
                <li>• 참여와 채팅 입장은 별도 API로 나눠 도메인 책임을 분리했습니다.</li>
                <li>• 상태 전이(`RECRUITING → CLOSED → COMPLETED`)는 스케줄러가 주기적으로 관리합니다.</li>
                <li>• 반경 검색은 Bounding Box + Haversine 두 단계로 인덱스와 정확도를 모두 확보했습니다.</li>
              </ul>
            </Card>
          </section>

          <section id="docs" style={{ marginBottom: '3rem', scrollMarginTop: '2rem' }}>
            <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>관련 페이지</h2>
            <Card>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, color: 'var(--text-secondary)', lineHeight: '2' }}>
                <li>
                  •{' '}
                  <Link to="/domains/meetup/optimization" style={{ color: 'var(--link-color)', textDecoration: 'none' }}>
                    Meetup 성능 최적화
                  </Link>
                </li>
                <li>
                  •{' '}
                  <Link to="/domains/meetup/refactoring" style={{ color: 'var(--link-color)', textDecoration: 'none' }}>
                    Meetup 리팩토링
                  </Link>
                </li>
                <li>
                  •{' '}
                  <Link to="/domains/chat" style={{ color: 'var(--link-color)', textDecoration: 'none' }}>
                    Chat 도메인
                  </Link>
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

export default MeetupDomain;
