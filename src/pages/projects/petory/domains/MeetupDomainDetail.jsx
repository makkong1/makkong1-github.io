import { Link } from 'react-router-dom';
import MermaidDiagram from '../../../../components/Common/MermaidDiagram';
import TableOfContents from '../../../../components/Common/TableOfContents';

// Meetup 도메인 상세 작업 로그 (아카이브)
// - 기존 MeetupDomainOptimization(동시성) + MeetupDomainRefactoring(쿼리 성능) 통합
function MeetupDomainDetail() {
  const sections = [
    { id: 'intro', title: '개요' },
    { id: 'concurrency', title: '동시성 — 인원 초과 방지' },
    { id: 'query-nearby', title: '반경 기반 모임 조회' },
    { id: 'query-n1', title: '참여자 조회 N+1' },
    { id: 'query-subquery', title: '서브쿼리 최적화' },
    { id: 'query-etc', title: 'Stream · 중복 쿼리 · AOP' },
    { id: 'summary', title: '요약' }
  ];

  const card = {
    padding: '1.5rem',
    backgroundColor: 'var(--card-bg)',
    borderRadius: '8px',
    border: '1px solid var(--nav-border)'
  };
  const pre = {
    padding: '1rem',
    backgroundColor: 'var(--bg-color)',
    borderRadius: '6px',
    overflow: 'auto',
    fontSize: '0.8rem',
    color: 'var(--text-secondary)'
  };

  const meetupJoinSequenceDiagram = `sequenceDiagram
    participant User1 as 사용자1
    participant User2 as 사용자2
    participant User3 as 사용자3
    participant MeetupService as MeetupService
    participant DB as MySQL

    Note over User1,User3: 동시에 3명이 참가 요청 (currentParticipants=1)
    par 사용자1
        MeetupService->>DB: findById() → 체크: 1 < 3 (통과)
    and 사용자2
        MeetupService->>DB: findById() → 체크: 1 < 3 (통과)
    and 사용자3
        MeetupService->>DB: findById() → 체크: 1 < 3 (통과)
    end
    par 사용자1
        MeetupService->>DB: save() (currentParticipants=2)
    and 사용자2
        MeetupService->>DB: save() (currentParticipants=2)
    and 사용자3
        MeetupService->>DB: save() (currentParticipants=2)
    end
    Note over DB: 최종 결과: currentParticipants=4 (최대 3명 초과!)`;

  const optimizedMeetupJoinSequenceDiagram = `sequenceDiagram
    participant User1 as 사용자1
    participant User2 as 사용자2
    participant User3 as 사용자3
    participant MeetupService as MeetupService
    participant DB as MySQL

    Note over User1,User3: 동시에 3명이 참가 요청
    par 사용자1
        MeetupService->>DB: UPDATE ... WHERE current < max → updated=1 (성공)
    and 사용자2
        MeetupService->>DB: UPDATE ... WHERE current < max → updated=1 (성공)
    and 사용자3
        MeetupService->>DB: UPDATE ... WHERE current < max → updated=0 (실패, 3명 도달)
    end
    Note over DB: 최종 결과: currentParticipants=3 (정상)`;

  return (
    <div className="domain-page-wrapper" style={{ padding: '2rem 0' }}>
      <div className="domain-page-container" style={{ display: 'flex', gap: '2rem', alignItems: 'flex-start' }}>
        <div className="domain-page-content" style={{ flex: 1 }}>
          <div style={{ marginBottom: '1rem' }}>
            <Link to="/domains/meetup" style={{ color: 'var(--link-color)', textDecoration: 'none', fontSize: '0.9rem' }}>
              ← Meetup 도메인으로 돌아가기
            </Link>
          </div>
          <h1 style={{ marginBottom: '0.5rem', color: 'var(--text-color)' }}>Meetup 도메인 — 성능 · 동시성 상세</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '2rem', lineHeight: 1.7 }}>
            대표 사례는 <Link to="/domains/refactoring#concurrency" style={{ color: 'var(--link-color)', textDecoration: 'none' }}>리팩토링 대표 사례</Link>에 큐레이션돼 있습니다.
            이 페이지는 Meetup 백엔드 작업의 <strong style={{ color: 'var(--text-secondary)' }}>상세 기록(작업 로그)</strong>으로,
            ① 동시성(인원 초과 방지) ② 쿼리 성능 최적화 두 축으로 정리했습니다.
          </p>

          {/* 1. 개요 */}
          <section id="intro" style={{ marginBottom: '3rem', scrollMarginTop: '2rem' }}>
            <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>개요</h2>
            <div className="section-card" style={card}>
              <p style={{ lineHeight: '1.8', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                Meetup 백엔드(Service·Repository·Controller·Converter·DTO 등 19개 파일)를 분석해 도출한 성능·동시성 작업입니다.
              </p>
              <div style={{ padding: '1rem', backgroundColor: 'var(--bg-color)', borderRadius: '6px', border: '1px solid var(--nav-border)' }}>
                <h3 style={{ marginBottom: '0.75rem', color: 'var(--text-color)', fontSize: '1rem' }}>핵심 축</h3>
                <ul style={{ listStyle: 'none', padding: 0, color: 'var(--text-secondary)', lineHeight: '1.8', fontSize: '0.9rem' }}>
                  <li>• <strong style={{ color: 'var(--text-color)' }}>동시성</strong>: 동시 참가 시 인원 초과(Race Condition)를 원자적 UPDATE로 차단</li>
                  <li>• <strong style={{ color: 'var(--text-color)' }}>쿼리 성능</strong>: 반경 조회 인덱스화, 참여자 N+1, 서브쿼리, Stream·중복 쿼리 정리</li>
                </ul>
              </div>
            </div>
          </section>

          {/* 2. 동시성 — 인원 초과 방지 */}
          <section id="concurrency" style={{ marginBottom: '3rem', scrollMarginTop: '2rem' }}>
            <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>동시성 — 인원 초과 방지 (Race Condition)</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1rem', lineHeight: 1.7 }}>
              성능이 아니라 <strong style={{ color: 'var(--text-secondary)' }}>데이터 정합성</strong> 문제입니다. "최대 3명인데 4명 참가" = 비즈니스 제약이 깨지는 잘못된 결과를 막는 작업.
            </p>

            <div className="section-card" style={{ ...card, marginBottom: '1rem' }}>
              <h3 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>문제 재현 (테스트 설계)</h3>
              <ul style={{ listStyle: 'none', padding: 0, color: 'var(--text-secondary)', lineHeight: '1.8', marginBottom: '1rem' }}>
                <li>• 모임 생성 (최대 3명, 모임장 1명 이미 참가)</li>
                <li>• 동시에 3명의 사용자가 참가 요청 (CountDownLatch)</li>
                <li>• 각 요청의 성공/실패와 최종 참가자 수 확인</li>
              </ul>
              <MermaidDiagram chart={meetupJoinSequenceDiagram} />
              <h4 style={{ margin: '1rem 0 0.5rem', color: 'var(--text-color)', fontSize: '0.95rem' }}>Before (문제 코드)</h4>
              <pre style={{ ...pre, fontSize: '0.85rem' }}>
{`// ⚠️ Race Condition 발생 지점
if (meetup.getCurrentParticipants() >=
    meetup.getMaxParticipants()) {
    throw new RuntimeException("모임 인원이 가득 찼습니다.");
}
// 여기서 다른 트랜잭션이 끼어들 수 있음!
meetup.setCurrentParticipants(
    meetup.getCurrentParticipants() + 1);
meetupRepository.save(meetup);`}
              </pre>
              <p style={{ lineHeight: '1.8', color: 'var(--text-secondary)', marginTop: '0.5rem', fontSize: '0.9rem' }}>
                <strong style={{ color: 'var(--text-color)' }}>재현 결과:</strong> 3명 동시 참가 → 모두 체크 통과 → 실제 4명 참가 (최대 3명 초과, Lost Update)
              </p>
            </div>

            <div className="section-card" style={{ ...card, marginBottom: '1rem' }}>
              <h3 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>해결</h3>
              <div style={{ marginBottom: '1.5rem' }}>
                <h4 style={{ marginBottom: '0.75rem', color: 'var(--text-color)', fontSize: '0.95rem' }}>1. 원자적 조건부 UPDATE</h4>
                <p style={{ lineHeight: '1.8', color: 'var(--text-secondary)', marginBottom: '0.75rem' }}>
                  DB 레벨에서 조건 체크와 증가를 원자적으로 처리하여 초과를 구조적으로 불가능하게 만듦
                </p>
                <pre style={{ ...pre, fontSize: '0.85rem' }}>
{`@Modifying
@Query("UPDATE Meetup m SET " +
       "m.currentParticipants = m.currentParticipants + 1 " +
       "WHERE m.idx = :meetupIdx " +
       "  AND m.currentParticipants < m.maxParticipants")
int incrementParticipantsIfAvailable(@Param("meetupIdx") Long meetupIdx);

// Service
int updated = meetupRepository.incrementParticipantsIfAvailable(meetupIdx);
if (updated == 0) {
    throw new RuntimeException("모임 인원이 가득 찼습니다.");
}`}
                </pre>
                <p style={{ lineHeight: '1.8', color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '0.5rem' }}>
                  <strong style={{ color: 'var(--text-color)' }}>선택 이유:</strong> 단순 조건부 증가라 DB 한 문장으로 원자화 가능. 락/데드락 관리 불필요, 코드 단순 (비관적 락은 비교 대상이며, 저경합 실측상 오히려 비관적 락이 빨랐음 — 선택 이유는 속도가 아니라 단순성).
                </p>
              </div>
              <div style={{ marginBottom: '1.5rem' }}>
                <h4 style={{ marginBottom: '0.75rem', color: 'var(--text-color)', fontSize: '0.95rem' }}>2. DB CHECK 제약 (이중 안전장치)</h4>
                <pre style={{ ...pre, fontSize: '0.85rem' }}>
{`ALTER TABLE meetup
ADD CONSTRAINT chk_participants
CHECK (current_participants <= max_participants);  -- MySQL 8.0.16+`}
                </pre>
                <p style={{ lineHeight: '1.8', color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '0.5rem' }}>
                  애플리케이션 로직을 우회하는 직접 SQL에도 데이터 무결성 보장
                </p>
              </div>
              <div style={{ marginBottom: '1.5rem' }}>
                <h4 style={{ marginBottom: '0.75rem', color: 'var(--text-color)', fontSize: '0.95rem' }}>3. 이벤트 기반 아키텍처 (핵심/파생 도메인 분리)</h4>
                <p style={{ lineHeight: '1.8', color: 'var(--text-secondary)', marginBottom: '0.75rem', fontSize: '0.9rem' }}>
                  <strong style={{ color: 'var(--text-color)' }}>원칙:</strong> 파생 도메인(채팅방 생성) 실패가 핵심 도메인(모임 생성)을 롤백하면 안 된다.
                </p>
                <pre style={{ ...pre, fontSize: '0.85rem' }}>
{`@Transactional
public MeetupDTO createMeetup(...) {
    Meetup saved = meetupRepository.save(meetup);
    eventPublisher.publishEvent(new MeetupCreatedEvent(...));  // 커밋 후 비동기
    return converter.toDTO(saved);
}

@EventListener @Async
@Transactional(propagation = Propagation.REQUIRES_NEW)
public void handleMeetupCreated(MeetupCreatedEvent event) {
    try { conversationService.createConversation(...); }
    catch (Exception e) { log.error("채팅방 생성 실패, 모임은 유지", e); }
}`}
                </pre>
              </div>
              <div>
                <h4 style={{ marginBottom: '0.75rem', color: 'var(--text-color)', fontSize: '0.95rem' }}>4. 중복 참여 방지</h4>
                <p style={{ lineHeight: '1.8', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                  <strong style={{ color: 'var(--text-color)' }}>Unique 제약</strong> (meetup_idx, user_idx)로 중복 참여 차단
                </p>
              </div>
            </div>

            <div className="section-card" style={card}>
              <h3 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>개선 결과</h3>
              <div style={{ overflowX: 'auto', marginBottom: '1rem' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                  <thead>
                    <tr style={{ borderBottom: '2px solid var(--nav-border)' }}>
                      <th style={{ padding: '0.75rem', textAlign: 'left', color: 'var(--text-color)' }}>항목</th>
                      <th style={{ padding: '0.75rem', textAlign: 'left', color: 'var(--text-color)' }}>Before</th>
                      <th style={{ padding: '0.75rem', textAlign: 'left', color: 'var(--text-color)' }}>After</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr style={{ borderBottom: '1px solid var(--nav-border)' }}>
                      <td style={{ padding: '0.75rem' }}>Lost Update</td>
                      <td style={{ padding: '0.75rem' }}>발생 (4명 참가)</td>
                      <td style={{ padding: '0.75rem', fontWeight: 'bold', color: 'var(--link-color)' }}>해결 (3명 참가)</td>
                    </tr>
                    <tr style={{ borderBottom: '1px solid var(--nav-border)' }}>
                      <td style={{ padding: '0.75rem' }}>인원 초과</td>
                      <td style={{ padding: '0.75rem' }}>발생</td>
                      <td style={{ padding: '0.75rem', fontWeight: 'bold', color: 'var(--link-color)' }}>해결</td>
                    </tr>
                    <tr>
                      <td style={{ padding: '0.75rem' }}>데이터 일치</td>
                      <td style={{ padding: '0.75rem' }}>불일치</td>
                      <td style={{ padding: '0.75rem', fontWeight: 'bold', color: 'var(--link-color)' }}>일치</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p style={{ lineHeight: '1.8', color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1rem' }}>
                <strong style={{ color: 'var(--text-color)' }}>테스트:</strong> Before 3명 성공→4명 참가(초과) / After 2명 성공·1명 실패→3명 참가(정상)
              </p>
              <MermaidDiagram chart={optimizedMeetupJoinSequenceDiagram} />
            </div>
          </section>

          {/* 3. 반경 기반 모임 조회 */}
          <section id="query-nearby" style={{ marginBottom: '3rem', scrollMarginTop: '2rem' }}>
            <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>반경 기반 모임 조회 최적화</h2>

            <div className="section-card" style={{ ...card, marginBottom: '1rem' }}>
              <h3 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>1단계 (Before) — 인메모리 필터링</h3>
              <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', marginBottom: '0.5rem' }}>전체 meetup 로드 후 Java에서 Haversine 거리 계산, Stream 필터링/정렬</p>
              <pre style={pre}>
{`List<Meetup> allMeetups = meetupRepository.findAllNotDeleted();
allMeetups.stream()
    .filter(m -> coordinates/date/status 체크)
    .map(m -> Haversine 거리 계산 → Entry<Meetup, Double>)
    .filter(entry -> entry.getValue() <= radiusKm)
    .sorted(거리순)
    .collect(Collectors.toList());`}
              </pre>
            </div>

            <div className="section-card" style={{ ...card, marginBottom: '1rem' }}>
              <h3 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>2단계 — DB 쿼리로 변경 (인덱스 미사용)</h3>
              <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', marginBottom: '0.5rem' }}>DB에서 Haversine 계산. 하지만 <code>IS NOT NULL</code> 조건 때문에 <code>idx_meetup_location</code> 미활용 → 전체 스캔 2958개</p>
              <pre style={pre}>
{`WHERE m.latitude IS NOT NULL AND m.longitude IS NOT NULL  -- 인덱스 사용 불가
  AND (6371 * acos(cos(radians(:lat)) * cos(radians(m.latitude)) * ...)) <= :radius
ORDER BY (6371 * acos(...)) ASC, m.date ASC`}
              </pre>
            </div>

            <div className="section-card" style={{ ...card, marginBottom: '1rem' }}>
              <h3 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>3단계 — Bounding Box로 인덱스 활용</h3>
              <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', marginBottom: '0.5rem' }}><code>IS NOT NULL</code> → <code>BETWEEN</code>으로 변경해 <code>idx_meetup_location</code> 활용. Bounding Box로 후보 축소 후 Haversine 정밀 필터</p>
              <pre style={pre}>
{`WHERE m.date > :currentDate AND ...
  AND m.latitude BETWEEN (:lat - :radius/111.0) AND (:lat + :radius/111.0)
  AND m.longitude BETWEEN (:lng - :radius/(111.0*cos(radians(:lat))))
                  AND (:lng + :radius/(111.0*cos(radians(:lat))))
  AND (6371 * acos(...)) <= :radius  -- Haversine 정밀 반경
ORDER BY (6371 * acos(...)) ASC, m.date ASC`}
              </pre>
            </div>

            <div className="section-card" style={{ ...card, marginBottom: '1rem' }}>
              <h3 style={{ marginBottom: '0.5rem', color: 'var(--text-color)' }}>개선 효과 <span style={{ fontSize: '0.85rem', fontWeight: 400, color: 'var(--text-muted)' }}>(3단계 Bounding Box 기준)</span></h3>
              <ul style={{ listStyle: 'none', padding: 0, color: 'var(--text-secondary)', lineHeight: '1.8', fontSize: '0.9rem' }}>
                <li>• 전체 실행 시간: 486ms → 273ms <strong style={{ color: 'var(--link-color)' }}>(43.8% ↓)</strong></li>
                <li>• DB 쿼리 시간: 241ms → 143ms <strong style={{ color: 'var(--link-color)' }}>(40.7% ↓)</strong></li>
                <li>• 메모리: 1.48MB → 0.21MB <strong style={{ color: 'var(--link-color)' }}>(85.8% ↓)</strong></li>
                <li>• 스캔 행 수: 2958개 → 117개 <strong style={{ color: 'var(--link-color)' }}>(96% ↓)</strong></li>
              </ul>
            </div>

            <div className="section-card" style={{ ...card, border: '1px solid var(--link-color)' }}>
              <h3 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>4단계 (현재 코드) — 공간 인덱스 ST_Within</h3>
              <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', marginBottom: '0.5rem' }}>
                <code>geo_point</code> POINT 컬럼(SRID 4326)에 공간 인덱스. <code>ST_Within</code>으로 후보 축소 → <code>ST_Distance_Sphere</code>로 미터 정밀 반경 필터 (마이그레이션 <code>meetup-spatial-location.sql</code>)
              </p>
              <pre style={pre}>
{`WHERE ST_Within(m.geo_point, ST_GeomFromText(CONCAT('POLYGON((...))'), 4326))  -- 공간 인덱스
  AND ST_Distance_Sphere(m.geo_point, :point) <= :radius * 1000  -- 정밀 반경(m)
ORDER BY ST_Distance_Sphere(m.geo_point, :point) ASC
LIMIT :limit`}
              </pre>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.75rem', marginBottom: 0, lineHeight: 1.6 }}>
                Bounding Box로 인덱스를 처음 태운 뒤, 같은 "후보 축소 → 정밀 필터" 구조를 공간 인덱스로 옮긴 리팩토링.
              </p>
            </div>
          </section>

          {/* 4. 참여자 조회 N+1 */}
          <section id="query-n1" style={{ marginBottom: '3rem', scrollMarginTop: '2rem' }}>
            <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>참여자 조회 N+1 해결</h2>
            <div className="section-card" style={{ ...card, marginBottom: '1rem' }}>
              <h3 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>대상: findByUserIdxOrderByJoinedAtDesc()</h3>
              <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', marginBottom: '0.5rem' }}>meetup·user Lazy 로딩으로 100개 참여 시 PrepareStatement 102개. JOIN FETCH로 한 번에 로드.</p>
              <pre style={pre}>
{`@Query("SELECT mp FROM MeetupParticipants mp " +
       "JOIN FETCH mp.meetup m " +
       "JOIN FETCH mp.user u " +
       "WHERE mp.user.idx = :userIdx " +
       "ORDER BY mp.joinedAt DESC")
List<MeetupParticipants> findByUserIdxOrderByJoinedAtDesc(@Param("userIdx") Long userIdx);`}
              </pre>
            </div>
            <div className="section-card" style={card}>
              <h3 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>개선 효과</h3>
              <ul style={{ listStyle: 'none', padding: 0, color: 'var(--text-secondary)', lineHeight: '1.8', fontSize: '0.9rem' }}>
                <li>• PrepareStatement: 102개 → 2개 <strong style={{ color: 'var(--link-color)' }}>(98% ↓)</strong></li>
                <li>• N+1 100% 제거, 네트워크 라운드트립 98% 감소</li>
                <li>• 실행 시간 102ms → 178ms (단일 쿼리 복잡도 ↑, but DB 부하·커넥션 풀 효율 향상)</li>
              </ul>
            </div>
          </section>

          {/* 5. 서브쿼리 최적화 */}
          <section id="query-subquery" style={{ marginBottom: '3rem', scrollMarginTop: '2rem' }}>
            <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>서브쿼리 최적화 (findAvailableMeetups)</h2>
            <div className="section-card" style={{ ...card, marginBottom: '1rem' }}>
              <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', marginBottom: '0.5rem' }}>참여 가능 모임 조회. 행마다 COUNT 서브쿼리 → LEFT JOIN + GROUP BY + HAVING으로 변경, 중간 결과 집합 제거.</p>
              <pre style={pre}>
{`@Query("SELECT m FROM Meetup m " +
       "LEFT JOIN m.participants p " +
       "WHERE m.date > :currentDate " +
       "AND (m.isDeleted = false OR m.isDeleted IS NULL) " +
       "GROUP BY m.idx " +
       "HAVING COUNT(p) < m.maxParticipants " +
       "ORDER BY m.date ASC")`}
              </pre>
            </div>
            <div className="section-card" style={card}>
              <h3 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>개선 효과</h3>
              <ul style={{ listStyle: 'none', padding: 0, color: 'var(--text-secondary)', lineHeight: '1.8', fontSize: '0.9rem' }}>
                <li>• 실행 시간: 156ms → 57ms <strong style={{ color: 'var(--link-color)' }}>(63.5% ↓)</strong></li>
                <li>• 메모리: 19.07MB → 2.00MB <strong style={{ color: 'var(--link-color)' }}>(89.5% ↓)</strong></li>
              </ul>
            </div>
          </section>

          {/* 6. Stream · 중복 쿼리 · AOP */}
          <section id="query-etc" style={{ marginBottom: '3rem', scrollMarginTop: '2rem' }}>
            <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>Stream 중복 제거 · 중복 쿼리 제거 · 측정 AOP</h2>
            <div className="section-card" style={{ ...card, marginBottom: '1rem' }}>
              <h3 style={{ marginBottom: '0.5rem', color: 'var(--text-color)' }}>Stream 연산 중복 제거</h3>
              <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}>동일 Stream 변환 로직이 7개 메서드에 반복 → <code>convertToDTOs()</code>, <code>convertToParticipantDTOs()</code> 공통 추출 (7 → 공통 2개)</p>
            </div>
            <div className="section-card" style={{ ...card, marginBottom: '1rem' }}>
              <h3 style={{ marginBottom: '0.5rem', color: 'var(--text-color)' }}>중복 DB 쿼리 제거 (joinMeetup)</h3>
              <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}>incrementParticipantsIfAvailable() 후 영속성 컨텍스트·DB 불일치로 findById 재조회 → <code>entityManager.refresh(meetup)</code>로 동기화 (중복 findById 제거)</p>
            </div>
            <div className="section-card" style={card}>
              <h3 style={{ marginBottom: '0.5rem', color: 'var(--text-color)' }}>성능 측정 AOP</h3>
              <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}><code>@Timed</code> + <code>PerformanceAspect</code>(<code>@Around("@annotation(Timed)")</code>)로 실행 시간·결과 건수 자동 측정. getNearbyMeetups, getAvailableMeetups 등에 적용.</p>
            </div>
          </section>

          {/* 7. 요약 */}
          <section id="summary" style={{ marginBottom: '3rem', scrollMarginTop: '2rem' }}>
            <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>요약</h2>
            <div className="section-card" style={{ ...card, marginBottom: '1.5rem' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid var(--nav-border)' }}>
                    <th style={{ padding: '0.75rem', textAlign: 'left', color: 'var(--text-color)' }}>항목</th>
                    <th style={{ padding: '0.75rem', textAlign: 'left', color: 'var(--text-color)' }}>개선 효과</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ borderBottom: '1px solid var(--nav-border)' }}>
                    <td style={{ padding: '0.75rem' }}>동시성 (인원 초과)</td>
                    <td style={{ padding: '0.75rem' }}>원자적 UPDATE + CHECK 제약 → 초과·Lost Update 제거</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid var(--nav-border)' }}>
                    <td style={{ padding: '0.75rem' }}>반경 기반 조회</td>
                    <td style={{ padding: '0.75rem' }}>43.8% 시간 ↓, 85.8% 메모리 ↓, 스캔 96% ↓ (→ 공간 인덱스)</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid var(--nav-border)' }}>
                    <td style={{ padding: '0.75rem' }}>참여자 N+1</td>
                    <td style={{ padding: '0.75rem' }}>PrepareStatement 102 → 2개 (98% ↓)</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid var(--nav-border)' }}>
                    <td style={{ padding: '0.75rem' }}>서브쿼리 최적화</td>
                    <td style={{ padding: '0.75rem' }}>63.5% 시간 ↓, 89.5% 메모리 ↓</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid var(--nav-border)' }}>
                    <td style={{ padding: '0.75rem' }}>Stream · 중복 쿼리 · AOP</td>
                    <td style={{ padding: '0.75rem' }}>공통 메서드 추출, refresh 동기화, @Timed 자동 측정</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="section-card" style={card}>
              <h3 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>추가 예정</h3>
              <ul style={{ listStyle: 'none', padding: 0, color: 'var(--text-secondary)', lineHeight: '1.8', fontSize: '0.9rem' }}>
                <li>• Admin 인메모리 필터링 → DB 쿼리 이동</li>
                <li>• getMeetupById 등 @Cacheable 캐싱</li>
                <li>• LIKE → FULLTEXT + MATCH...AGAINST 검토</li>
              </ul>
            </div>
          </section>
        </div>
        <TableOfContents sections={sections} />
      </div>
    </div>
  );
}

export default MeetupDomainDetail;
