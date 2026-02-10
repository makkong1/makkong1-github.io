import { Link } from 'react-router-dom';
import TableOfContents from '../../../../components/Common/TableOfContents';

function MeetupDomainRefactoring() {
  const sections = [
    { id: 'intro', title: '리팩토링 개요' },
    { id: 'backend-nearby', title: '반경 기반 모임 조회 최적화' },
    { id: 'backend-n1', title: '참여자 조회 N+1 해결' },
    { id: 'backend-subquery', title: '서브쿼리 최적화' },
    { id: 'backend-stream', title: 'Stream 연산 중복 제거' },
    { id: 'backend-duplicate-query', title: '중복 DB 쿼리 제거' },
    { id: 'backend-timed-aop', title: '성능 측정 AOP' },
    { id: 'backend-pending', title: '추가 예정 리팩토링' },
    { id: 'summary', title: '리팩토링 요약' }
  ];

  return (
    <div className="domain-page-wrapper" style={{ padding: '2rem 0' }}>
      <div className="domain-page-container" style={{ display: 'flex', gap: '2rem', alignItems: 'flex-start' }}>
        <div className="domain-page-content" style={{ flex: 1 }}>
          <h1 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>Meetup 도메인 리팩토링</h1>
          
          {/* 1. 리팩토링 개요
           - docs/refactoring/meetup/refactoring-summary.md */}
          <section id="intro" style={{ marginBottom: '3rem', scrollMarginTop: '2rem' }}>
            <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>리팩토링 개요</h2>
            <div className="section-card" style={{
              padding: '1.5rem',
              backgroundColor: 'var(--card-bg)',
              borderRadius: '8px',
              border: '1px solid var(--nav-border)'
            }}>
              <p style={{ lineHeight: '1.8', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                Meetup 도메인의 백엔드(19개 파일)를 분석하여 도출한 리팩토링 포인트입니다.
                Critical/High/Medium/Low 우선순위별로 분류하여 진행되었습니다.
              </p>
              <div style={{
                padding: '1rem',
                backgroundColor: 'var(--bg-color)',
                borderRadius: '6px',
                marginTop: '1rem',
                border: '1px solid var(--nav-border)'
              }}>
                <h3 style={{ marginBottom: '0.75rem', color: 'var(--text-color)', fontSize: '1rem' }}>분석 대상</h3>
                <ul style={{
                  listStyle: 'none',
                  padding: 0,
                  color: 'var(--text-secondary)',
                  lineHeight: '1.8',
                  fontSize: '0.9rem'
                }}>
                  <li>• <strong style={{ color: 'var(--text-color)' }}>Backend</strong>: MeetupService, Repository, Controller, Converter, DTO 등 19개</li>
                </ul>
              </div>
            </div>
          </section>

          {/* 2. 반경 기반 모임 조회 최적화 - docs/refactoring/meetup/backend-performance-optimization.md, nearby-meetups/performance-comparison.md, nearby-meetups/index-analysis.md */}
          <section id="backend-nearby" style={{ marginBottom: '3rem', scrollMarginTop: '2rem' }}>
            <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>반경 기반 모임 조회 최적화</h2>
            
            <div className="section-card" style={{
              padding: '1.5rem',
              backgroundColor: 'var(--card-bg)',
              borderRadius: '8px',
              border: '1px solid var(--nav-border)',
              marginBottom: '1rem'
            }}>
              <h3 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>1단계 (Before) - 인메모리 필터링</h3>
              <div style={{ color: 'var(--text-secondary)', lineHeight: '1.8', marginBottom: '0.5rem' }}>
                <p>전체 meetup 로드 후 Java에서 Haversine 거리 계산, Stream 필터링/정렬 수행</p>
              </div>
              <pre style={{
                padding: '1rem',
                backgroundColor: 'var(--bg-color)',
                borderRadius: '6px',
                overflow: 'auto',
                fontSize: '0.8rem',
                color: 'var(--text-secondary)'
              }}>
{`List<Meetup> allMeetups = meetupRepository.findAllNotDeleted();
allMeetups.stream()
    .filter(m -> coordinates/date/status 체크)
    .map(m -> Haversine 거리 계산 → Entry<Meetup, Double>)
    .filter(entry -> entry.getValue() <= radiusKm)
    .sorted(거리순)
    .collect(Collectors.toList());`}
              </pre>
            </div>

            <div className="section-card" style={{
              padding: '1.5rem',
              backgroundColor: 'var(--card-bg)',
              borderRadius: '8px',
              border: '1px solid var(--nav-border)',
              marginBottom: '1rem'
            }}>
              <h3 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>2단계 - DB 쿼리로 변경 (인덱스 미사용)</h3>
              <div style={{ color: 'var(--text-secondary)', lineHeight: '1.8', marginBottom: '0.5rem' }}>
                <p>인메모리 필터링 제거, DB에서 Haversine 계산. 하지만 <code>IS NOT NULL</code> 조건 때문에 <code>idx_meetup_location</code> 인덱스 미활용 → 전체 스캔 2958개</p>
              </div>
              <pre style={{
                padding: '1rem',
                backgroundColor: 'var(--bg-color)',
                borderRadius: '6px',
                overflow: 'auto',
                fontSize: '0.8rem',
                color: 'var(--text-secondary)'
              }}>
{`-- Service: findNearbyMeetups(lat, lng, radius, now) 호출
WHERE m.latitude IS NOT NULL AND m.longitude IS NOT NULL  -- 인덱스 사용 불가
  AND (6371 * acos(cos(radians(:lat)) * cos(radians(m.latitude)) * ...
  )) <= :radius
ORDER BY (6371 * acos(...)) ASC, m.date ASC`}
              </pre>
            </div>

            <div className="section-card" style={{
              padding: '1.5rem',
              backgroundColor: 'var(--card-bg)',
              borderRadius: '8px',
              border: '1px solid var(--nav-border)',
              marginBottom: '1rem'
            }}>
              <h3 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>3단계 - Bounding Box로 인덱스 활용</h3>
              <div style={{ color: 'var(--text-secondary)', lineHeight: '1.8', marginBottom: '0.5rem' }}>
                <p><code>IS NOT NULL</code> → <code>BETWEEN</code>으로 변경하여 <code>idx_meetup_location</code> 인덱스 활용 가능. 1차로 Bounding Box 내 행만 스캔 후, Haversine으로 정확한 반경 필터링</p>
              </div>
              <pre style={{
                padding: '1rem',
                backgroundColor: 'var(--bg-color)',
                borderRadius: '6px',
                overflow: 'auto',
                fontSize: '0.8rem',
                color: 'var(--text-secondary)'
              }}>
{`-- Bounding Box: 위도 1도≈111km, 경도 1도≈111km×cos(위도)
-- 반경 5km → 위도 ±0.045도, 경도 ±0.045/cos(위도)도
WHERE m.date > :currentDate AND ...
  AND m.latitude BETWEEN (:lat - :radius/111.0) AND (:lat + :radius/111.0)
  AND m.longitude BETWEEN (:lng - :radius/(111.0*cos(radians(:lat))))
                  AND (:lng + :radius/(111.0*cos(radians(:lat))))
  AND (6371 * acos(...)) <= :radius  -- Haversine 정확한 반경 필터
ORDER BY (6371 * acos(...)) ASC, m.date ASC`}
              </pre>
              <div style={{ marginTop: '0.75rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                <strong style={{ color: 'var(--text-color)' }}>Haversine:</strong> 6371(km) × acos(cos(rad(lat1))*cos(rad(lat2))*cos(rad(lng2)-rad(lng1)) + sin(rad(lat1))*sin(rad(lat2)))
              </div>
            </div>

            <div className="section-card" style={{
              padding: '1.5rem',
              backgroundColor: 'var(--card-bg)',
              borderRadius: '8px',
              border: '1px solid var(--nav-border)'
            }}>
              <h3 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>개선 효과</h3>
              <ul style={{
                listStyle: 'none',
                padding: 0,
                color: 'var(--text-secondary)',
                lineHeight: '1.8',
                fontSize: '0.9rem'
              }}>
                <li>• 전체 실행 시간: 486ms → 273ms <strong style={{ color: 'var(--link-color)' }}>(43.8% 감소)</strong></li>
                <li>• DB 쿼리 시간: 241ms → 143ms <strong style={{ color: 'var(--link-color)' }}>(40.7% 감소)</strong></li>
                <li>• 메모리 사용량: 1.48MB → 0.21MB <strong style={{ color: 'var(--link-color)' }}>(85.8% 감소)</strong></li>
                <li>• 스캔 행 수: 2958개 → 117개 <strong style={{ color: 'var(--link-color)' }}>(96% 감소)</strong></li>
                <li>• 필터링/정렬 시간: 20ms → 0ms <strong style={{ color: 'var(--link-color)' }}>(100% 제거)</strong></li>
              </ul>
            </div>
          </section>

          {/* 3. 참여자 조회 N+1 해결 - docs/refactoring/meetup/backend-performance-optimization.md, participants-query/performance-comparison-participants.md */}
          <section id="backend-n1" style={{ marginBottom: '3rem', scrollMarginTop: '2rem' }}>
            <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>참여자 조회 N+1 해결</h2>
            
            <div className="section-card" style={{
              padding: '1.5rem',
              backgroundColor: 'var(--card-bg)',
              borderRadius: '8px',
              border: '1px solid var(--nav-border)',
              marginBottom: '1rem'
            }}>
              <h3 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>대상: findByUserIdxOrderByJoinedAtDesc()</h3>
              <div style={{ color: 'var(--text-secondary)', lineHeight: '1.8', marginBottom: '0.5rem' }}>
                <p>사용자별 참여 모임 조회. meetup, user 접근 시 Lazy 로딩으로 추가 쿼리 발생 → 100개 참여 시 PrepareStatement 102개</p>
              </div>
              <pre style={{
                padding: '1rem',
                backgroundColor: 'var(--bg-color)',
                borderRadius: '6px',
                overflow: 'auto',
                fontSize: '0.8rem',
                color: 'var(--text-secondary)'
              }}>
{`-- Before: 메인 1개 + meetup Lazy 100개 + user Lazy 1개 = 102개
SELECT mp FROM MeetupParticipants mp 
WHERE mp.user.idx = :userIdx 
ORDER BY mp.joinedAt DESC`}
              </pre>
            </div>

            <div className="section-card" style={{
              padding: '1.5rem',
              backgroundColor: 'var(--card-bg)',
              borderRadius: '8px',
              border: '1px solid var(--nav-border)',
              marginBottom: '1rem'
            }}>
              <h3 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>After: JOIN FETCH 적용</h3>
              <div style={{ color: 'var(--text-secondary)', lineHeight: '1.8', marginBottom: '0.5rem' }}>
                <p>연관 엔티티를 한 번에 로드하여 N+1 제거</p>
              </div>
              <pre style={{
                padding: '1rem',
                backgroundColor: 'var(--bg-color)',
                borderRadius: '6px',
                overflow: 'auto',
                fontSize: '0.8rem',
                color: 'var(--text-secondary)'
              }}>
{`@Query("SELECT mp FROM MeetupParticipants mp " +
       "JOIN FETCH mp.meetup m " +
       "JOIN FETCH mp.user u " +
       "WHERE mp.user.idx = :userIdx " +
       "ORDER BY mp.joinedAt DESC")
List<MeetupParticipants> findByUserIdxOrderByJoinedAtDesc(@Param("userIdx") Long userIdx);`}
              </pre>
            </div>

            <div className="section-card" style={{
              padding: '1.5rem',
              backgroundColor: 'var(--card-bg)',
              borderRadius: '8px',
              border: '1px solid var(--nav-border)'
            }}>
              <h3 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>개선 효과</h3>
              <ul style={{
                listStyle: 'none',
                padding: 0,
                color: 'var(--text-secondary)',
                lineHeight: '1.8',
                fontSize: '0.9rem'
              }}>
                <li>• PrepareStatement: 102개 → 2개 <strong style={{ color: 'var(--link-color)' }}>(98% 감소)</strong></li>
                <li>• N+1 쿼리 100% 제거, 네트워크 라운드트립 98% 감소</li>
                <li>• 실행 시간 102ms → 178ms (단일 쿼리 복잡도 증가, but DB 부하/연결 풀 사용 효율 대폭 향상)</li>
              </ul>
            </div>
          </section>

          {/* 4. 서브쿼리 최적화 - docs/refactoring/meetup/backend-performance-optimization.md, subquery-optimization/서브쿼리 최적화.md, subquery-optimization/performance-comparison.md */}
          <section id="backend-subquery" style={{ marginBottom: '3rem', scrollMarginTop: '2rem' }}>
            <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>서브쿼리 최적화</h2>
            
            <div className="section-card" style={{
              padding: '1.5rem',
              backgroundColor: 'var(--card-bg)',
              borderRadius: '8px',
              border: '1px solid var(--nav-border)',
              marginBottom: '1rem'
            }}>
              <h3 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>대상: findAvailableMeetups()</h3>
              <div style={{ color: 'var(--text-secondary)', lineHeight: '1.8', marginBottom: '0.5rem' }}>
                <p>참여 가능 모임(인원 미달) 조회. 서브쿼리 사용 시 실행 계획 비효율, 중간 결과 집합으로 메모리 19MB 사용</p>
              </div>
              <pre style={{
                padding: '1rem',
                backgroundColor: 'var(--bg-color)',
                borderRadius: '6px',
                overflow: 'auto',
                fontSize: '0.8rem',
                color: 'var(--text-secondary)'
              }}>
{`-- Before: 서브쿼리 (각 meetup 행마다 COUNT 실행)
SELECT m.* FROM meetup m
WHERE m.max_participants > (
    SELECT COUNT(p.meetup_idx) FROM meetupparticipants p 
    WHERE p.meetup_idx = m.idx
)
AND m.date > :currentDate AND (m.is_deleted = false OR m.is_deleted IS NULL)
ORDER BY m.date ASC`}
              </pre>
            </div>

            <div className="section-card" style={{
              padding: '1.5rem',
              backgroundColor: 'var(--card-bg)',
              borderRadius: '8px',
              border: '1px solid var(--nav-border)',
              marginBottom: '1rem'
            }}>
              <h3 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>After: LEFT JOIN + GROUP BY + HAVING</h3>
              <div style={{ color: 'var(--text-secondary)', lineHeight: '1.8', marginBottom: '0.5rem' }}>
                <p>한 번에 JOIN 후 그룹화하여 참여자 수 비교. 실행 계획 최적화, 중간 결과 집합 제거</p>
              </div>
              <pre style={{
                padding: '1rem',
                backgroundColor: 'var(--bg-color)',
                borderRadius: '6px',
                overflow: 'auto',
                fontSize: '0.8rem',
                color: 'var(--text-secondary)'
              }}>
{`-- JPQL
@Query("SELECT m FROM Meetup m " +
       "LEFT JOIN m.participants p " +
       "WHERE m.date > :currentDate " +
       "AND (m.isDeleted = false OR m.isDeleted IS NULL) " +
       "GROUP BY m.idx " +
       "HAVING COUNT(p) < m.maxParticipants " +
       "ORDER BY m.date ASC")

-- 생성 SQL (Hibernate)
SELECT m.* FROM meetup m
LEFT JOIN meetupparticipants p ON m.idx = p.meetup_idx
WHERE m.date > ? AND (m.is_deleted = 0 OR m.is_deleted IS NULL)
GROUP BY m.idx
HAVING COUNT(p) < m.max_participants  -- (실제: CASE WHEN p IS NOT NULL THEN 1...)
ORDER BY m.date ASC`}
              </pre>
            </div>

            <div className="section-card" style={{
              padding: '1.5rem',
              backgroundColor: 'var(--card-bg)',
              borderRadius: '8px',
              border: '1px solid var(--nav-border)'
            }}>
              <h3 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>개선 효과</h3>
              <ul style={{
                listStyle: 'none',
                padding: 0,
                color: 'var(--text-secondary)',
                lineHeight: '1.8',
                fontSize: '0.9rem'
              }}>
                <li>• 실행 시간: 156ms → 57ms <strong style={{ color: 'var(--link-color)' }}>(63.5% 감소)</strong></li>
                <li>• 메모리 사용량: 19.07MB → 2.00MB <strong style={{ color: 'var(--link-color)' }}>(89.5% 감소)</strong></li>
              </ul>
            </div>
          </section>

          {/* 5. Stream 연산 중복 제거 - docs/refactoring/meetup/stream-operation-refactoring.md */}
          <section id="backend-stream" style={{ marginBottom: '3rem', scrollMarginTop: '2rem' }}>
            <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>Stream 연산 중복 제거</h2>
            
            <div className="section-card" style={{
              padding: '1.5rem',
              backgroundColor: 'var(--card-bg)',
              borderRadius: '8px',
              border: '1px solid var(--nav-border)',
              marginBottom: '1rem'
            }}>
              <h3 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>문제</h3>
              <div style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}>
                <p>동일한 Stream 변환 로직이 7개 메서드에서 반복: getAllMeetups, getNearbyMeetups, getMeetupsByLocation, searchMeetupsByKeyword, getAvailableMeetups, getMeetupsByOrganizer, getMeetupParticipants</p>
              </div>
            </div>

            <div className="section-card" style={{
              padding: '1.5rem',
              backgroundColor: 'var(--card-bg)',
              borderRadius: '8px',
              border: '1px solid var(--nav-border)'
            }}>
              <h3 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>해결 및 효과</h3>
              <div style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}>
                <p><code>convertToDTOs()</code>, <code>convertToParticipantDTOs()</code> 공통 메서드 추출 → 7개 메서드 → 공통 메서드 2개, 유지보수성·가독성 향상</p>
              </div>
            </div>
          </section>

          {/* 6. 중복 DB 쿼리 제거 - docs/refactoring/meetup/duplicate-query-removal.md */}
          <section id="backend-duplicate-query" style={{ marginBottom: '3rem', scrollMarginTop: '2rem' }}>
            <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>중복 DB 쿼리 제거</h2>
            
            <div className="section-card" style={{
              padding: '1.5rem',
              backgroundColor: 'var(--card-bg)',
              borderRadius: '8px',
              border: '1px solid var(--nav-border)',
              marginBottom: '1rem'
            }}>
              <h3 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>대상: joinMeetup()</h3>
              <div style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}>
                <p><strong style={{ color: 'var(--text-color)' }}>문제:</strong> incrementParticipantsIfAvailable() 실행 후 영속성 컨텍스트와 DB 상태 불일치 → 두 번째 findById()로 재조회</p>
                <p style={{ marginTop: '0.5rem' }}><strong style={{ color: 'var(--text-color)' }}>해결:</strong> <code>entityManager.refresh(meetup)</code>로 영속성 컨텍스트 동기화 (중복 findById 제거)</p>
              </div>
            </div>
          </section>

          {/* 7. 성능 측정 AOP - docs/domains/meetup.md, docs/refactoring/meetup/backend-performance-optimization.md */}
          <section id="backend-timed-aop" style={{ marginBottom: '3rem', scrollMarginTop: '2rem' }}>
            <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>성능 측정 AOP</h2>
            
            <div className="section-card" style={{
              padding: '1.5rem',
              backgroundColor: 'var(--card-bg)',
              borderRadius: '8px',
              border: '1px solid var(--nav-border)',
              marginBottom: '1rem'
            }}>
              <h3 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>구현 내용</h3>
              <div style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}>
                <p><code>@Timed</code> 어노테이션과 <code>PerformanceAspect</code>로 중복 성능 측정 코드를 AOP로 추출했습니다.</p>
                <ul style={{ marginLeft: '1.5rem', marginTop: '0.5rem' }}>
                  <li><code>annotation/Timed.java</code> - 커스텀 어노테이션</li>
                  <li><code>aspect/PerformanceAspect.java</code> - <code>@Around("@annotation(Timed)")</code>로 실행 시간 자동 측정</li>
                  <li>List 결과인 경우 결과 건수도 함께 로깅</li>
                </ul>
              </div>
            </div>

            <div className="section-card" style={{
              padding: '1.5rem',
              backgroundColor: 'var(--card-bg)',
              borderRadius: '8px',
              border: '1px solid var(--nav-border)'
            }}>
              <h3 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>적용 메서드</h3>
              <div style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}>
                <p>getAllMeetups(), getNearbyMeetups(), getMeetupsByLocation(), searchMeetupsByKeyword(), getAvailableMeetups()</p>
              </div>
            </div>
          </section>

          {/* 8. 추가 예정 리팩토링 - docs/refactoring/meetup/backend-performance-optimization.md */}
          <section id="backend-pending" style={{ marginBottom: '3rem', scrollMarginTop: '2rem' }}>
            <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>추가 예정 리팩토링</h2>
            
            <div className="section-card" style={{
              padding: '1.5rem',
              backgroundColor: 'var(--card-bg)',
              borderRadius: '8px',
              border: '1px solid var(--nav-border)'
            }}>
              <ul style={{
                listStyle: 'none',
                padding: 0,
                color: 'var(--text-secondary)',
                lineHeight: '1.8',
                fontSize: '0.9rem'
              }}>
                <li>• <strong style={{ color: 'var(--text-color)' }}>Admin 컨트롤러</strong>: 인메모리 필터링 → findByStatusAndKeyword 등 DB 쿼리로 이동</li>
                <li>• <strong style={{ color: 'var(--text-color)' }}>캐싱</strong>: getMeetupById, getAllMeetups 등 @Cacheable 적용</li>
                <li>• <strong style={{ color: 'var(--text-color)' }}>LIKE 쿼리</strong>: FULLTEXT 인덱스 + MATCH...AGAINST 검토</li>
              </ul>
            </div>
          </section>

          {/* 9. 리팩토링 요약 - 위 각 섹션 통합 */}
          <section id="summary" style={{ marginBottom: '3rem', scrollMarginTop: '2rem' }}>
            <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>리팩토링 요약</h2>
            
            <div className="section-card" style={{
              padding: '1.5rem',
              backgroundColor: 'var(--card-bg)',
              borderRadius: '8px',
              border: '1px solid var(--nav-border)',
              marginBottom: '1.5rem'
            }}>
              <h3 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>완료된 백엔드 리팩토링</h3>
              <table style={{
                width: '100%',
                borderCollapse: 'collapse',
                color: 'var(--text-secondary)',
                fontSize: '0.9rem'
              }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid var(--nav-border)' }}>
                    <th style={{ padding: '0.75rem', textAlign: 'left', color: 'var(--text-color)' }}>항목</th>
                    <th style={{ padding: '0.75rem', textAlign: 'left', color: 'var(--text-color)' }}>개선 효과</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ borderBottom: '1px solid var(--nav-border)' }}>
                    <td style={{ padding: '0.75rem' }}>반경 기반 모임 조회</td>
                    <td style={{ padding: '0.75rem' }}>43.8% 시간 ↓, 85.8% 메모리 ↓, 스캔 96% ↓</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid var(--nav-border)' }}>
                    <td style={{ padding: '0.75rem' }}>참여자 N+1 해결</td>
                    <td style={{ padding: '0.75rem' }}>PrepareStatement 102→2개 (98% ↓)</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid var(--nav-border)' }}>
                    <td style={{ padding: '0.75rem' }}>서브쿼리 최적화</td>
                    <td style={{ padding: '0.75rem' }}>63.5% 시간 ↓, 89.5% 메모리 ↓</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid var(--nav-border)' }}>
                    <td style={{ padding: '0.75rem' }}>Stream 중복 제거</td>
                    <td style={{ padding: '0.75rem' }}>7개 메서드 → 공통 2개</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid var(--nav-border)' }}>
                    <td style={{ padding: '0.75rem' }}>중복 쿼리 제거</td>
                    <td style={{ padding: '0.75rem' }}>entityManager.refresh 적용</td>
                  </tr>
                  <tr>
                    <td style={{ padding: '0.75rem' }}>성능 측정 AOP</td>
                    <td style={{ padding: '0.75rem' }}>@Timed + PerformanceAspect로 자동 측정</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="section-card" style={{
              padding: '1.5rem',
              backgroundColor: 'var(--card-bg)',
              borderRadius: '8px',
              border: '1px solid var(--nav-border)'
            }}>
              <h3 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>관련 문서</h3>
              <ul style={{
                listStyle: 'none',
                padding: 0,
                color: 'var(--text-secondary)',
                lineHeight: '1.8'
              }}>
                <li>• <Link to="/domains/meetup" style={{ color: 'var(--link-color)', textDecoration: 'none' }}>Meetup 도메인 상세 페이지</Link></li>
                <li>• <Link to="/domains/meetup/optimization" style={{ color: 'var(--link-color)', textDecoration: 'none' }}>Meetup 도메인 성능 최적화 페이지</Link></li>
              </ul>
            </div>
          </section>
        </div>
        <TableOfContents sections={sections} />
      </div>
    </div>
  );
}

export default MeetupDomainRefactoring;
