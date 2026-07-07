import { Link } from 'react-router-dom';
import TableOfContents from '../../../../components/Common/TableOfContents';

// Location 도메인 상세 작업 로그 (아카이브)
// - 기존 LocationDomainOptimization(초기 로드) + LocationDomainRefactoring(검색 분기 정리) 통합
function LocationDomainDetail() {
  const sections = [
    { id: 'intro', title: '개요' },
    { id: 'initial-load', title: '초기 로드 최적화 (대표)' },
    { id: 'search-branch', title: '백엔드 검색 분기 정리' },
    { id: 'roadmap', title: '후속 로드맵 · 모니터링' },
    { id: 'summary', title: '요약' }
  ];

  const card = { padding: '1.5rem', backgroundColor: 'var(--card-bg)', borderRadius: '8px', border: '1px solid var(--nav-border)' };
  const pre = { padding: '1rem', backgroundColor: 'var(--bg-color)', borderRadius: '6px', overflow: 'auto', fontSize: '0.8rem', color: 'var(--text-secondary)', whiteSpace: 'pre-wrap' };
  const th = { padding: '0.75rem', textAlign: 'left', color: 'var(--text-color)', fontWeight: 'bold' };
  const td = { padding: '0.75rem' };
  const bad = { ...td, color: '#e74c3c', fontWeight: 'bold' };
  const good = { ...td, color: '#27ae60', fontWeight: 'bold' };
  const rate = { ...td, color: 'var(--link-color)', fontWeight: 'bold' };

  return (
    <div className="domain-page-wrapper" style={{ padding: '2rem 0' }}>
      <div className="domain-page-container" style={{ display: 'flex', gap: '2rem', alignItems: 'flex-start' }}>
        <div className="domain-page-content" style={{ flex: 1 }}>
          <div style={{ marginBottom: '1rem' }}>
            <Link to="/domains/location" style={{ color: 'var(--link-color)', textDecoration: 'none', fontSize: '0.9rem' }}>
              ← Location 도메인으로 돌아가기
            </Link>
          </div>
          <h1 style={{ marginBottom: '0.5rem', color: 'var(--text-color)' }}>Location 도메인 — 성능 · 검색 상세</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '2rem', lineHeight: 1.7 }}>
            초기 로드 성능 개선(대표)과, 그 뒤 백엔드 검색 분기를 정리한 작업을 함께 담았습니다.
            대표 요약은 <Link to="/domains/refactoring#location" style={{ color: 'var(--link-color)', textDecoration: 'none' }}>리팩토링 대표 사례</Link>에 있습니다.
          </p>

          {/* 1. 개요 */}
          <section id="intro" style={{ marginBottom: '3rem', scrollMarginTop: '2rem' }}>
            <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>개요</h2>
            <div className="section-card" style={card}>
              <p style={{ lineHeight: '1.8', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                초기 로드에서 전체 위치 데이터(약 22,699개)를 받아 프론트에서 거르던 구조를 위치 기반 조회로 바꾸고,
                이후 검색 경로(위치·지역·FULLTEXT)를 DB WHERE 기준으로 일원화했습니다.
              </p>
              <div style={{ padding: '1rem', backgroundColor: 'var(--bg-color)', borderRadius: '6px', border: '1px solid var(--nav-border)' }}>
                <h3 style={{ marginBottom: '0.75rem', color: 'var(--text-color)', fontSize: '1rem' }}>핵심 성과 (초기 로드)</h3>
                <ul style={{ listStyle: 'none', padding: 0, color: 'var(--text-secondary)', lineHeight: '1.8', fontSize: '0.9rem' }}>
                  <li>• 초기 조회 데이터: <strong style={{ color: 'var(--text-color)' }}>22,699개 → 약 1,026개</strong> (95.5% 감소)</li>
                  <li>• 네트워크 전송량: <strong style={{ color: 'var(--text-color)' }}>약 22MB → 약 1MB</strong> (95.5% 감소)</li>
                  <li>• 프론트 전체 처리: <strong style={{ color: 'var(--text-color)' }}>1,484ms → 약 700ms</strong> (2.1배)</li>
                </ul>
              </div>
            </div>
          </section>

          {/* 2. 초기 로드 최적화 (대표) */}
          <section id="initial-load" style={{ marginBottom: '3rem', scrollMarginTop: '2rem' }}>
            <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>초기 로드 최적화 (대표)</h2>

            <div className="section-card" style={{ ...card, marginBottom: '1rem' }}>
              <h3 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>문제 — 전체 데이터 조회 후 프론트 필터링</h3>
              <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', marginBottom: '0.5rem', fontSize: '0.9rem' }}>
                사용자가 실제로 보는 건 주변 일부(최대 100개)인데, 초기 로드에서 전국 데이터 <strong style={{ color: 'var(--text-color)' }}>22,699개</strong>를 모두 조회·전송했습니다.
                병목은 DB 쿼리(841ms)와 22MB 네트워크 전송이었고, 프론트 거리 계산은 오히려 미미했습니다.
              </p>
            </div>

            <div className="section-card" style={{ ...card, marginBottom: '1rem' }}>
              <h3 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>1단계 — 위치 기반 반경 조회</h3>
              <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', marginBottom: '0.5rem', fontSize: '0.9rem' }}>
                사용자 위치가 있으면 주변 10km 반경만 백엔드에서 <code>ST_Distance_Sphere</code>로 조회 → 전체 전송 제거, 프론트 거리 계산 불필요.
              </p>
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                  <thead>
                    <tr style={{ borderBottom: '2px solid var(--nav-border)' }}>
                      <th style={th}>항목</th><th style={th}>개선 전</th><th style={th}>개선 후</th><th style={th}>개선율</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr style={{ borderBottom: '1px solid var(--nav-border)' }}>
                      <td style={td}>조회 데이터 수</td><td style={bad}>22,699개</td><td style={good}>약 1,026개</td><td style={rate}>95.5% ↓</td>
                    </tr>
                    <tr style={{ borderBottom: '1px solid var(--nav-border)' }}>
                      <td style={td}>네트워크 전송량</td><td style={bad}>약 22MB</td><td style={good}>약 1MB</td><td style={rate}>95.5% ↓</td>
                    </tr>
                    <tr style={{ borderBottom: '1px solid var(--nav-border)' }}>
                      <td style={td}>프론트 전체 처리</td><td style={bad}>1,484ms</td><td style={good}>약 700ms</td><td style={rate}>52.8% ↓ (2.1배)</td>
                    </tr>
                    <tr>
                      <td style={td}>프론트 메모리</td><td style={bad}>78.90MB</td><td style={good}>약 28.6MB</td><td style={rate}>63.8% ↓</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.82rem', marginTop: '0.5rem', marginBottom: 0 }}>※ 2025-12-21, 3회 측정 평균 / 10km 반경 조건</p>
            </div>

            <div className="section-card" style={card}>
              <h3 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>2단계 — 지역명 검색은 시군구 조회로 우회</h3>
              <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', marginBottom: '0.5rem', fontSize: '0.9rem' }}>
                좌표 반경 검색은 지도 이동 시 기준점이 바뀌어 마커가 사라지는 일관성 문제와 쿼리 지연(198~368ms)이 있었습니다.
                지역명이 들어오면 <code>WHERE sido=? AND sigungu=?</code> 인덱스 조회로 우회(읍면동은 프론트 필터).
              </p>
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                  <thead>
                    <tr style={{ borderBottom: '2px solid var(--nav-border)' }}>
                      <th style={th}>항목</th><th style={th}>위치 기반</th><th style={th}>시군구 기반</th><th style={th}>개선</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr style={{ borderBottom: '1px solid var(--nav-border)' }}>
                      <td style={td}>DB 쿼리 시간</td><td style={bad}>198~368ms</td><td style={good}>36~53ms</td><td style={rate}>약 5~6배</td>
                    </tr>
                    <tr style={{ borderBottom: '1px solid var(--nav-border)' }}>
                      <td style={td}>전체 처리 시간</td><td style={bad}>202~408ms</td><td style={good}>45~66ms</td><td style={rate}>약 5~6배</td>
                    </tr>
                    <tr>
                      <td style={td}>기준점 일관성</td><td style={bad}>지도 이동 시 변경</td><td style={good}>시군구로 확정</td><td style={rate}>해결</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* 3. 백엔드 검색 분기 정리 */}
          <section id="search-branch" style={{ marginBottom: '3rem', scrollMarginTop: '2rem' }}>
            <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>백엔드 검색 분기 정리</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1rem', lineHeight: 1.7 }}>
              keyword 우선 분기를 걷어내고, <strong style={{ color: 'var(--text-secondary)' }}>위치 → 지역 → FULLTEXT fallback → 전체 평점순</strong> 순서로 재정렬하며 필터를 DB로 내렸습니다.
            </p>

            <div className="section-card" style={{ ...card, marginBottom: '1rem' }}>
              <h3 style={{ marginBottom: '0.5rem', color: 'var(--text-color)' }}>keyword · category를 DB WHERE로 일원화</h3>
              <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', fontSize: '0.9rem' }}>
                지역/반경으로 많이 읽은 뒤 Java <code>stream().filter()</code>로 category1~3를 다시 비교하던 걸, 모든 검색 쿼리에 keyword·category 조건을 넣어 DB에서 바로 거르도록 통합. 반경 검색은 <code>ST_Within(bbox)</code> + <code>ST_Distance_Sphere</code> 이중 필터 구조를 유지(공간 인덱스 활용).
              </p>
              <pre style={pre}>
{`ST_Within(location, ST_GeomFromText('POLYGON((...))', 4326))       -- 공간 인덱스로 후보 축소
AND ST_Distance_Sphere(location, POINT(:lng, :lat)) <= :radiusM    -- 정밀 반경
AND (:keyword IS NULL OR name LIKE CONCAT('%', :keyword, '%'))     -- keyword DB 필터
AND (:category IS NULL OR category3 = :category
     OR category2 = :category OR category1 = :category)            -- category DB 필터
ORDER BY ... (sort 파라미터 분기)`}
              </pre>
            </div>

            <div className="section-card" style={{ ...card, marginBottom: '1rem' }}>
              <h3 style={{ marginBottom: '0.5rem', color: 'var(--text-color)' }}>Top10 LIMIT · 배치 트랜잭션 정합성</h3>
              <ul style={{ listStyle: 'none', padding: 0, color: 'var(--text-secondary)', lineHeight: '1.8', fontSize: '0.9rem' }}>
                <li>• <code>findTop10…</code>이 이름과 달리 LIMIT 없이 전량 조회 가능 → 네이티브 쿼리 + <code>LIMIT 10</code>으로 메서드명과 동작 일치</li>
                <li>• 배치 <code>saveBatch</code>가 private self-invocation이라 <code>REQUIRES_NEW</code> AOP 미적용 가능 → <code>LocationServiceBatchWriter</code> 별도 빈으로 분리해 배치 단위 독립 트랜잭션 확보</li>
              </ul>
            </div>

            <div className="section-card" style={card}>
              <h3 style={{ marginBottom: '0.5rem', color: 'var(--text-color)' }}>거리 계산 중복 제거 · FULLTEXT 검증</h3>
              <ul style={{ listStyle: 'none', padding: 0, color: 'var(--text-secondary)', lineHeight: '1.8', fontSize: '0.9rem' }}>
                <li>• 백엔드가 거리 값을 DTO에 담아 내려주고 프론트는 이를 우선 사용(중복 계산 제거)</li>
                <li>• FULLTEXT 인덱스 <code>ft_search</code>가 <code>name·description·category1~3</code>을 모두 포함하는지, <code>MATCH … AGAINST</code> 대상 컬럼과 정확히 일치하는지 검증</li>
                <li>• 프론트 검색 상태: 다수 <code>useState</code> → reducer 단위로 묶고 지도 이동과 검색 확정 흐름을 분리</li>
              </ul>
            </div>
          </section>

          {/* 4. 후속 로드맵 · 모니터링 */}
          <section id="roadmap" style={{ marginBottom: '3rem', scrollMarginTop: '2rem' }}>
            <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>후속 로드맵 · 모니터링</h2>
            <div className="section-card" style={card}>
              <ul style={{ listStyle: 'none', padding: 0, color: 'var(--text-secondary)', lineHeight: '1.8', fontSize: '0.9rem' }}>
                <li>• <strong style={{ color: 'var(--text-color)' }}>review_count 캐시 컬럼</strong>(계획): reviews 정렬의 상관 서브쿼리를 단순화</li>
                <li>• <strong style={{ color: 'var(--text-color)' }}>대표 카테고리 컬럼</strong>(계획): <code>category3 &gt; 2 &gt; 1</code> 우선순위 단일 컬럼으로 OR 조건 축소</li>
                <li>• <strong style={{ color: 'var(--text-color)' }}>sort별 쿼리 분리</strong>(계획): distance/rating/reviews 정렬을 전용 쿼리로 분리해 실행 계획 예측성 향상</li>
                <li>• <strong style={{ color: 'var(--text-color)' }}>반경 검색 bbox</strong>(모니터링): 정확도 이슈는 재현되지 않았고 성능 관점에서만 관찰</li>
                <li>• <strong style={{ color: 'var(--text-color)' }}>지도 검색 확정 UX</strong>(진행 중): 지도 뷰 상태와 검색 상태를 분리, "이 지역 검색" 명시 확정</li>
              </ul>
            </div>
          </section>

          {/* 5. 요약 */}
          <section id="summary" style={{ marginBottom: '3rem', scrollMarginTop: '2rem' }}>
            <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>요약</h2>
            <div className="section-card" style={card}>
              <table style={{ width: '100%', borderCollapse: 'collapse', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid var(--nav-border)' }}>
                    <th style={th}>항목</th><th style={th}>개선 효과</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ borderBottom: '1px solid var(--nav-border)' }}>
                    <td style={td}>초기 로드 (대표)</td><td style={td}>조회 22,699 → 1,026개 (95.5% ↓), 전송 22MB → 1MB, 처리 2.1배</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid var(--nav-border)' }}>
                    <td style={td}>지역명 검색 우회</td><td style={td}>시군구 인덱스 조회로 쿼리 5~6배, 기준점 일관성 확보</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid var(--nav-border)' }}>
                    <td style={td}>검색 분기 정리</td><td style={td}>keyword·category DB WHERE 일원화, Top10 LIMIT, 배치 트랜잭션 분리</td>
                  </tr>
                  <tr>
                    <td style={td}>거리 계산 · FULLTEXT</td><td style={td}>중복 계산 제거, 인덱스·쿼리 일치 검증</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>
        </div>
        <TableOfContents sections={sections} />
      </div>
    </div>
  );
}

export default LocationDomainDetail;
