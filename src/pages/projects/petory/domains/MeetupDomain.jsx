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
    { id: 'features', title: '주요 기능' },
    { id: 'service-logic', title: '핵심 서비스 로직' },
    { id: 'architecture', title: '아키텍처' },
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
            <Card style={{ marginBottom: '1rem' }}>
              <p style={{ lineHeight: '1.8', color: 'var(--text-secondary)', marginBottom: '0.75rem' }}>
                <code>docs/domains/meetup.md</code> 기준으로 Meetup 도메인의 중심은 모집형 게시글이 아니라,
                <strong style={{ color: 'var(--text-color)' }}> 실시간 참여 경쟁이 발생하는 모임 정원 관리와 그 이후의 채팅 연동</strong>입니다.
              </p>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, color: 'var(--text-secondary)', lineHeight: '1.8' }}>
                {li('모임 생성 시 주최자는 자동 참여하고 그룹 채팅방 생성 이벤트가 발행됩니다.')}
                {li('모임 참여는 원자적 UPDATE 쿼리로 인원 수를 늘려 Race Condition을 막습니다.')}
                {li('모임 참여와 채팅방 입장은 별도 API로 분리해 책임을 나눴습니다.')}
              </ul>
            </Card>

            <Card>
              <h3 style={{ marginBottom: '0.75rem', color: 'var(--text-color)', fontSize: '1rem' }}>핵심 성과</h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, color: 'var(--text-secondary)', lineHeight: '1.8' }}>
                <li>• 동시성 제어: <strong style={{ color: 'var(--text-color)' }}>Lost Update 해결</strong></li>
                <li>• 최대 인원 초과 방지: <strong style={{ color: 'var(--text-color)' }}>Race Condition 해결</strong></li>
                <li>• 데이터 일치성: <strong style={{ color: 'var(--text-color)' }}>참여자 수/참가 행 불일치 방지</strong></li>
                <li>
                  • 자세한 동시성 측정은{' '}
                  <Link to="/domains/meetup/optimization" style={{ color: 'var(--link-color)', textDecoration: 'none' }}>
                    성능 최적화
                  </Link>
                  , 코드 정리는{' '}
                  <Link to="/domains/meetup/refactoring" style={{ color: 'var(--link-color)', textDecoration: 'none' }}>
                    리팩토링
                  </Link>
                  에 분리했습니다.
                </li>
              </ul>
            </Card>
          </section>

          <section id="features" style={{ marginBottom: '3rem', scrollMarginTop: '2rem' }}>
            <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>주요 기능</h2>

            <Card style={{ marginBottom: '1rem' }}>
              <h3 style={{ marginBottom: '0.75rem', color: 'var(--text-color)', fontSize: '1rem' }}>1. 모임 생성 및 관리</h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, color: 'var(--text-secondary)', lineHeight: '1.8' }}>
                {li('제목, 설명, 장소, 위도/경도, 일시, 최대 인원을 입력해 모임을 생성합니다.')}
                {li('모임 생성과 참여에는 이메일 인증(`EmailVerificationPurpose.MEETUP`)이 필요합니다.')}
                {li('주최자는 자동 참여하며 `currentParticipants`는 생성 시 1로 시작합니다.')}
                {li('수정/삭제는 주최자 또는 `ADMIN`/`MASTER`만 가능합니다.')}
              </ul>
            </Card>

            <Card style={{ marginBottom: '1rem' }}>
              <h3 style={{ marginBottom: '0.75rem', color: 'var(--text-color)', fontSize: '1rem' }}>2. 참여 및 취소</h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, color: 'var(--text-secondary)', lineHeight: '1.8' }}>
                {li('중복 참여는 `existsByMeetupIdxAndUserIdx`와 `(meetup_idx, user_idx)` PK로 이중 방지합니다.')}
                {li('정원 증가는 DB 원자적 UPDATE로 처리해 초과 모집을 막습니다.')}
                {li('주최자는 참가 취소할 수 없습니다.')}
                {li('참가 취소 시 채팅방 나가기를 시도하지만, 채팅 실패가 취소를 막지는 않습니다.')}
              </ul>
            </Card>

            <Card style={{ marginBottom: '1rem' }}>
              <h3 style={{ marginBottom: '0.75rem', color: 'var(--text-color)', fontSize: '1rem' }}>3. 상태 관리</h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, color: 'var(--text-secondary)', lineHeight: '1.8' }}>
                {li('기본 상태는 `RECRUITING`입니다.')}
                {li('정원이 차면 `CLOSED`, 모임 시간이 지나면 `COMPLETED`로 스케줄러가 전이합니다.')}
                {li('근처 모임 조회에서는 `COMPLETED` 상태를 제외합니다.')}
              </ul>
            </Card>

            <Card>
              <h3 style={{ marginBottom: '0.75rem', color: 'var(--text-color)', fontSize: '1rem' }}>4. 위치 기반 검색과 채팅 연동</h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, color: 'var(--text-secondary)', lineHeight: '1.8' }}>
                {li('`/api/meetups/nearby`는 반경 기반 검색이며 `radius` 기본값은 5.0km입니다.')}
                {li('`/api/meetups/location`은 위도/경도 범위 기반 검색, `/api/meetups/search`는 제목·설명 LIKE 검색입니다.')}
                {li('모임 생성 시 채팅방은 자동 생성되지만, 일반 참가자의 채팅 입장은 Chat API를 별도로 호출해야 합니다.')}
              </ul>
            </Card>
          </section>

          <section id="service-logic" style={{ marginBottom: '3rem', scrollMarginTop: '2rem' }}>
            <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>핵심 서비스 로직</h2>

            <Card style={{ marginBottom: '1rem' }}>
              <h3 style={{ marginBottom: '0.75rem', color: 'var(--text-color)', fontSize: '1rem' }}>모임 생성과 채팅방 이벤트</h3>
              <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', marginBottom: '0.75rem' }}>
                `MeetupService.createMeetup()`은 모임 저장, 주최자 참가자 행 추가까지를 핵심 트랜잭션으로 처리하고,
                채팅방 생성은 커밋 이후 이벤트로 넘깁니다.
              </p>
              <MermaidDiagram chart={meetupCreateFlow} />
              <CodeBlock>{`Meetup savedMeetup = meetupRepository.save(meetup);
meetupParticipantsRepository.save(organizerParticipant);

TransactionSynchronizationManager.registerSynchronization(
  afterCommit -> eventPublisher.publishEvent(
    new MeetupCreatedEvent(...)
  )
);`}</CodeBlock>
              <ul style={{ listStyle: 'none', padding: 0, marginTop: '0.75rem', color: 'var(--text-secondary)', lineHeight: '1.8' }}>
                {li('채팅방 생성은 `@Async` + `REQUIRES_NEW`로 별도 트랜잭션에서 처리합니다.')}
                {li('채팅방 생성 실패가 모임 생성 롤백으로 이어지지 않도록 분리했습니다.')}
              </ul>
            </Card>

            <Card style={{ marginBottom: '1rem' }}>
              <h3 style={{ marginBottom: '0.75rem', color: 'var(--text-color)', fontSize: '1rem' }}>모임 참여: 원자적 인원 증가</h3>
              <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', marginBottom: '0.75rem' }}>
                `MeetupService.joinMeetup()`의 핵심은 `incrementParticipantsIfAvailable()`입니다. 모집 중이면서 정원이 남아 있을 때만
                DB에서 인원 수를 증가시켜 Race Condition을 막습니다.
              </p>
              <MermaidDiagram chart={joinFlow} />
              <CodeBlock>{`int updated = meetupRepository.incrementParticipantsIfAvailable(
  meetupIdx,
  MeetupStatus.RECRUITING
);

if (updated == 0) {
  if (meetup.getStatus() != MeetupStatus.RECRUITING) {
    throw MeetupConflictException.meetupNotRecruiting();
  }
  throw MeetupConflictException.fullCapacity();
}

entityManager.refresh(meetup);`}</CodeBlock>
              <ul style={{ listStyle: 'none', padding: 0, marginTop: '0.75rem', color: 'var(--text-secondary)', lineHeight: '1.8' }}>
                {li('중복 참여는 서비스 선검사 + DB PK로 모두 방어합니다.')}
                {li('주최자는 인원 증가 체크 대상에서 제외됩니다.')}
                {li('영속성 컨텍스트 동기화는 `entityManager.refresh()`로 처리합니다.')}
              </ul>
            </Card>

            <Card style={{ marginBottom: '1rem' }}>
              <h3 style={{ marginBottom: '0.75rem', color: 'var(--text-color)', fontSize: '1rem' }}>참여 취소와 채팅방 나가기</h3>
              <CodeBlock>{`meetupParticipantsRepository.delete(participant);
meetupRepository.decrementParticipantsIfPositive(meetupIdx);

try {
  conversationService.leaveMeetupChat(meetupIdx, userIdx);
} catch (ApiException e) {
  log.warn(...);
} catch (Exception e) {
  log.error(...);
}`}</CodeBlock>
              <ul style={{ listStyle: 'none', padding: 0, marginTop: '0.75rem', color: 'var(--text-secondary)', lineHeight: '1.8' }}>
                {li('주최자는 참가 취소할 수 없습니다.')}
                {li('인원 감소도 DB 원자적 UPDATE로 처리합니다.')}
                {li('채팅방 처리 실패는 부가 기능 실패로만 기록하고 모임 취소는 그대로 성공시킵니다.')}
              </ul>
            </Card>

            <Card style={{ marginBottom: '1rem' }}>
              <h3 style={{ marginBottom: '0.75rem', color: 'var(--text-color)', fontSize: '1rem' }}>반경 기반 근처 모임 조회</h3>
              <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', marginBottom: '0.5rem' }}>
                근처 검색은 전체 엔티티를 바로 읽지 않고, 먼저 ID만 거리순으로 뽑은 뒤 주최자 정보를 포함한 엔티티를 재조회합니다.
              </p>
              <CodeBlock>{`ids = meetupRepository.findNearbyMeetupIds(lat, lng, radiusKm, maxResults);
meetups = meetupRepository.findByIdxInWithOrganizer(ids);
// ID 순서를 유지해 DTO 변환`}</CodeBlock>
              <ul style={{ listStyle: 'none', padding: 0, marginTop: '0.75rem', color: 'var(--text-secondary)', lineHeight: '1.8' }}>
                {li('Bounding Box + Haversine으로 필터링합니다.')}
                {li('미래 날짜만 포함하고 `COMPLETED`는 제외합니다.')}
                {li('`maxResults`는 서비스에서 1~1000 범위로 클램프합니다.')}
              </ul>
            </Card>

            <Card>
              <h3 style={{ marginBottom: '0.75rem', color: 'var(--text-color)', fontSize: '1rem' }}>서비스 메서드 구조</h3>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid var(--nav-border)' }}>
                    <th style={{ padding: '0.65rem 0.75rem', textAlign: 'left', color: 'var(--text-color)' }}>메서드</th>
                    <th style={{ padding: '0.65rem 0.75rem', textAlign: 'left', color: 'var(--text-color)' }}>역할</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['createMeetup()', '모임 저장, 주최자 자동 참여, 커밋 후 이벤트 발행'],
                    ['updateMeetup()', '주최자 또는 관리자 권한 확인 후 수정'],
                    ['deleteMeetup()', 'Soft Delete'],
                    ['joinMeetup()', '이메일 인증, 중복/정원/상태 체크, 원자적 참가'],
                    ['cancelMeetupParticipation()', '주최자 보호, 원자적 감소, 채팅방 나가기 시도'],
                    ['getNearbyMeetups()', '근처 모임 조회, Haversine 기반'],
                    ['getAvailableMeetups(Pageable)', '참여 가능한 모임 Slice 조회'],
                    ['getMeetupsForAdmin()', '관리자 목록 조회'],
                  ].map(([name, role], index, arr) => (
                    <tr key={name} style={{ borderBottom: index < arr.length - 1 ? '1px solid var(--nav-border)' : 'none' }}>
                      <td style={{ padding: '0.65rem 0.75rem', color: 'var(--text-color)' }}>{name}</td>
                      <td style={{ padding: '0.65rem 0.75rem' }}>{role}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Card>
          </section>

          <section id="architecture" style={{ marginBottom: '3rem', scrollMarginTop: '2rem' }}>
            <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>아키텍처</h2>

            <Card style={{ marginBottom: '1rem' }}>
              <h3 style={{ marginBottom: '0.75rem', color: 'var(--text-color)', fontSize: '1rem' }}>도메인 구조</h3>
              <CodeBlock>{`domain/meetup/
  annotation/
    Timed.java
  aspect/
    PerformanceAspect.java
  controller/
    MeetupController.java
  service/
    MeetupService.java
    MeetupScheduler.java
    MeetupChatRoomEventListener.java
  entity/
    Meetup.java
    MeetupParticipants.java
    MeetupParticipantsId.java
    MeetupStatus.java
  event/
    MeetupCreatedEvent.java`}</CodeBlock>
              <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', marginTop: '0.75rem', marginBottom: 0 }}>
                관리자 경로는 `AdminMeetupController`가 `AdminCareAndMeetupFacade`를 경유해 호출합니다.
              </p>
            </Card>

            <Card style={{ marginBottom: '1rem' }}>
              <h3 style={{ marginBottom: '0.75rem', color: 'var(--text-color)', fontSize: '1rem' }}>주요 엔티티</h3>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid var(--nav-border)' }}>
                    <th style={{ padding: '0.65rem 0.75rem', textAlign: 'left', color: 'var(--text-color)' }}>엔티티</th>
                    <th style={{ padding: '0.65rem 0.75rem', textAlign: 'left', color: 'var(--text-color)' }}>역할</th>
                    <th style={{ padding: '0.65rem 0.75rem', textAlign: 'left', color: 'var(--text-color)' }}>특징</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['Meetup', '모임 본문', 'BaseTimeEntity 상속, Soft Delete, 상태(RECRUITING/CLOSED/COMPLETED), 참가자 목록 @BatchSize'],
                    ['MeetupParticipants', '모임 참여자', '복합 키 `(meetup, user)`, `@PrePersist joinedAt`'],
                    ['MeetupStatus', '모임 상태 enum', 'RECRUITING, CLOSED, COMPLETED'],
                  ].map(([name, role, feature], index, arr) => (
                    <tr key={name} style={{ borderBottom: index < arr.length - 1 ? '1px solid var(--nav-border)' : 'none' }}>
                      <td style={{ padding: '0.65rem 0.75rem', color: 'var(--text-color)' }}>{name}</td>
                      <td style={{ padding: '0.65rem 0.75rem' }}>{role}</td>
                      <td style={{ padding: '0.65rem 0.75rem' }}>{feature}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Card>

            <Card style={{ marginBottom: '1rem' }}>
              <h3 style={{ marginBottom: '0.75rem', color: 'var(--text-color)', fontSize: '1rem' }}>엔티티 관계도</h3>
              <MermaidDiagram chart={entityDiagram} />
            </Card>

            <Card style={{ marginBottom: '1rem' }}>
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
                    ['/api/meetups', 'POST', '모임 생성'],
                    ['/api/meetups/{meetupIdx}', 'PUT/DELETE/GET', '수정 / 소프트 삭제 / 상세 조회'],
                    ['/api/meetups', 'GET', '전체 모임 페이징 조회'],
                    ['/api/meetups/nearby', 'GET', '반경 기반 근처 모임 조회'],
                    ['/api/meetups/location', 'GET', '위도/경도 범위 조회'],
                    ['/api/meetups/search', 'GET', '키워드 검색'],
                    ['/api/meetups/available', 'GET', '참여 가능한 모임 Slice 조회'],
                    ['/api/meetups/{meetupIdx}/participants', 'GET/POST/DELETE', '참가자 목록 / 참가 / 참가 취소'],
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
              <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', marginTop: '0.75rem', marginBottom: 0, fontSize: '0.9rem' }}>
                `MeetupController`에는 클래스 단위 `@PreAuthorize("isAuthenticated()")`가 적용되어 `/api/meetups/**` 전체가 인증 필요입니다.
              </p>
            </Card>

            <Card>
              <h3 style={{ marginBottom: '0.75rem', color: 'var(--text-color)', fontSize: '1rem' }}>예외와 트랜잭션</h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, color: 'var(--text-secondary)', lineHeight: '1.8' }}>
                {li('대표 예외: `MeetupNotFoundException`, `MeetupConflictException`, `MeetupForbiddenException`, `MeetupValidationException`, `MeetupParticipantNotFoundException`')}
                {li('모임 생성/수정/삭제, 참여/취소는 `@Transactional`, 조회는 `@Transactional(readOnly = true)`를 사용합니다.')}
                {li('이메일 인증은 모임 생성과 참여 시점에서 확인합니다.')}
              </ul>
            </Card>
          </section>

          <section id="performance" style={{ marginBottom: '3rem', scrollMarginTop: '2rem' }}>
            <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>성능 최적화</h2>

            <Card style={{ marginBottom: '1rem' }}>
              <h3 style={{ marginBottom: '0.75rem', color: 'var(--text-color)', fontSize: '1rem' }}>인덱스 전략</h3>
              <CodeBlock>{`CREATE INDEX idx_meetup_date ON meetup(date);
CREATE INDEX idx_meetup_date_status ON meetup(date, status);
CREATE INDEX idx_meetup_location ON meetup(latitude, longitude);
CREATE INDEX idx_meetup_status ON meetup(status);
CREATE INDEX organizer_idx ON meetup(organizer_idx);

CREATE INDEX user_idx ON meetupparticipants(user_idx);
-- PRIMARY KEY (meetup_idx, user_idx)`}</CodeBlock>
              <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', marginTop: '0.75rem', marginBottom: 0 }}>
                상태·날짜·위치·주최자 조회와 중복 참여 방지를 기준으로 인덱스를 구성했습니다.
              </p>
            </Card>

            <Card style={{ marginBottom: '1rem' }}>
              <h3 style={{ marginBottom: '0.75rem', color: 'var(--text-color)', fontSize: '1rem' }}>근처 모임 검색 최적화</h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, color: 'var(--text-secondary)', lineHeight: '1.8' }}>
                {li('Bounding Box로 위치 인덱스를 먼저 활용하고, Haversine으로 정확한 거리를 계산합니다.')}
                {li('ID만 먼저 조회한 뒤 주최자 포함 엔티티를 재조회해 불필요한 로드를 줄입니다.')}
                {li('문서 기준으로 전체 시간 43.8%, DB 쿼리 40.7%, 메모리 85.8% 개선 효과를 얻었습니다.')}
              </ul>
            </Card>

            <Card>
              <h3 style={{ marginBottom: '0.75rem', color: 'var(--text-color)', fontSize: '1rem' }}>코드 품질 최적화</h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, color: 'var(--text-secondary)', lineHeight: '1.8' }}>
                {li('`convertToDTOs()`, `convertToParticipantDTOs()`로 Stream 변환 중복을 줄였습니다.')}
                {li('`@Timed` + `PerformanceAspect`로 주요 조회 메서드 실행 시간을 자동 측정합니다.')}
                {li('`joinMeetup()`에서 `findById()` 두 번 호출 대신 `entityManager.refresh()`로 중복 쿼리를 제거했습니다.')}
              </ul>
            </Card>
          </section>

          <section id="summary" style={{ marginBottom: '3rem', scrollMarginTop: '2rem' }}>
            <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>핵심 포인트</h2>
            <Card>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, color: 'var(--text-secondary)', lineHeight: '1.8' }}>
                <li>• Meetup의 핵심 문제는 정원 경쟁 상황에서의 동시성이고, 이를 원자적 UPDATE로 해결했습니다.</li>
                <li>• 모임 생성과 채팅방 생성은 이벤트로 분리해 핵심 트랜잭션을 보호했습니다.</li>
                <li>• 참여와 채팅 입장은 별도 API로 나눠 도메인 책임을 분리했습니다.</li>
                <li>• 상태는 `RECRUITING → CLOSED → COMPLETED` 흐름을 스케줄러가 관리합니다.</li>
                <li>• 반경 검색은 Bounding Box + Haversine, 관리자 목록은 DB 페이징, 참여 가능 목록은 Slice로 최적화했습니다.</li>
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
