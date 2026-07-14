import { Link } from 'react-router-dom';
import MermaidDiagram from '../../../../components/Common/MermaidDiagram';
import TableOfContents from '../../../../components/Common/TableOfContents';

// Care 도메인 상세 작업 로그 (아카이브)
// - 기존 CareDomainOptimization(요청 목록 N+1) + CareDomainRefactoring(펫코인 결제 연동) 통합
function CareDomainDetail() {
  const sections = [
    { id: 'intro', title: '개요' },
    { id: 'list-n1', title: '요청 목록 N+1 (대표)' },
    { id: 'payment', title: '펫코인 결제 연동 정리' },
    { id: 'known', title: '페이징 경로 N+1' },
    { id: 'audit', title: '쿼리 감사에서 다시 나온 것' },
    { id: 'summary', title: '요약' }
  ];

  const card = { padding: '1.5rem', backgroundColor: 'var(--card-bg)', borderRadius: '8px', border: '1px solid var(--nav-border)' };
  const pre = { padding: '1rem', backgroundColor: 'var(--bg-color)', borderRadius: '6px', overflow: 'auto', fontSize: '0.8rem', color: 'var(--text-secondary)' };
  const th = { padding: '0.75rem', textAlign: 'left', color: 'var(--text-color)', fontWeight: 'bold' };
  const td = { padding: '0.75rem' };

  const beforeSeq = `sequenceDiagram
    participant Service as CareRequestService
    participant DB as MySQL
    Service->>DB: 메인 쿼리 (CareRequest, User, Pet) (1)
    Note over Service,DB: N+1 — 쿼리가 결과 건수에 비례
    loop 요청마다
        Service->>DB: getApplications() 개별 조회
    end
    loop 펫마다
        Service->>DB: 첨부파일 개별 조회
        Service->>DB: 예방접종 개별 조회
    end
    Note over Service,DB: 총 151개 쿼리 (worktree 실측)`;

  const afterSeq = `sequenceDiagram
    participant Service as CareRequestService
    participant DB as MySQL
    Service->>DB: CareRequest + User + Pet + Application (JOIN FETCH) (1)
    Service->>DB: 첨부파일 배치 조회 (IN 절) (2)
    Service->>DB: 예방접종 @BatchSize 배치 (3~4)
    Note over Service,DB: 총 4개 쿼리 (97.4% 감소)`;

  return (
    <div className="domain-page-wrapper" style={{ padding: '2rem 0' }}>
      <div className="domain-page-container" style={{ display: 'flex', gap: '2rem', alignItems: 'flex-start' }}>
        <div className="domain-page-content" style={{ flex: 1 }}>
          <div style={{ marginBottom: '1rem' }}>
            <Link to="/domains/care" style={{ color: 'var(--link-color)', textDecoration: 'none', fontSize: '0.9rem' }}>
              ← Care 도메인으로 돌아가기
            </Link>
          </div>
          <h1 style={{ marginBottom: '0.5rem', color: 'var(--text-color)' }}>Care 도메인 — 성능 · 결제 연동 상세</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '2rem', lineHeight: 1.7 }}>
            펫케어 요청 목록의 N+1 해결과, Care와 맞물린 펫코인(결제) 연동 리팩토링을 정리했습니다.
            거래 확정 동시성(Race Condition)은 <Link to="/domains/refactoring#concurrency" style={{ color: 'var(--link-color)', textDecoration: 'none' }}>리팩토링 대표 사례</Link>에서 다룹니다.
          </p>

          {/* 1. 개요 */}
          <section id="intro" style={{ marginBottom: '3rem', scrollMarginTop: '2rem' }}>
            <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>개요</h2>
            <div className="section-card" style={card}>
              <p style={{ lineHeight: '1.8', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                Care 도메인은 펫케어 요청·지원과 펫코인 결제(에스크로 생성·지급·환불)가 맞물려 있습니다.
                목록 조회 성능과 결제 연동 코드 품질을 함께 정리했습니다.
              </p>
              <div style={{ padding: '1rem', backgroundColor: 'var(--bg-color)', borderRadius: '6px', border: '1px solid var(--nav-border)' }}>
                <h3 style={{ marginBottom: '0.75rem', color: 'var(--text-color)', fontSize: '1rem' }}>핵심 성과 (요청 목록 · worktree 실측)</h3>
                <ul style={{ listStyle: 'none', padding: 0, color: 'var(--text-secondary)', lineHeight: '1.8', fontSize: '0.9rem' }}>
                  <li>• 쿼리 수: <strong style={{ color: 'var(--text-color)' }}>151개 → 4개</strong> (97.4% 감소)</li>
                  <li>• 백엔드 실행 시간: <strong style={{ color: 'var(--text-color)' }}>478ms → 210ms</strong> (보조 지표)</li>
                </ul>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.82rem', marginTop: '0.5rem', marginBottom: 0, lineHeight: 1.7 }}>
                  ※ <code>git worktree</code>로 실제 이전 커밋을 checkout해 그 시점 코드를 재구성 없이 실행한 실측입니다.
                  주 지표는 쿼리 수이고, 절대 시간은 JIT·커넥션풀 워밍업 탓에 실행마다 달라지므로 보조로만 씁니다.
                </p>
              </div>
            </div>
          </section>

          {/* 2. 요청 목록 N+1 (대표) */}
          <section id="list-n1" style={{ marginBottom: '3rem', scrollMarginTop: '2rem' }}>
            <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>요청 목록 N+1 (대표)</h2>

            <div className="section-card" style={{ ...card, marginBottom: '1rem' }}>
              <h3 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>문제 — 쿼리 151개 (결과 건수에 비례)</h3>
              <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', marginBottom: '0.75rem', fontSize: '0.9rem' }}>
                요청 목록을 조회한 뒤 요청마다 지원 내역(CareApplication)을, 펫마다 첨부파일·예방접종을 개별 조회했습니다.
              </p>
              <p style={{ color: 'var(--text-muted)', lineHeight: '1.6', marginBottom: '0.75rem', fontSize: '0.8rem' }}>
                ※ 이전에는 이 자리에 <code>~2,400 → 4~5 (99.8% 감소)</code>를 적어뒀습니다. 그 값은 <code>@BatchSize</code> 도입
                <strong style={{ color: 'var(--text-color)' }}> 이전 세대</strong>의 재구성 테스트 수치였고, 재검증 때
                <code> git worktree</code>로 실제 커밋을 checkout해 다시 재보니 <strong style={{ color: 'var(--text-color)' }}>151 → 4</strong>였습니다.
                낡은 쪽이 더 극적이지만 재현되지 않으므로 교체했습니다.
              </p>
              <MermaidDiagram chart={beforeSeq} />
            </div>

            <div className="section-card" style={{ ...card, marginBottom: '1rem' }}>
              <h3 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>해결 — 연관별로 다른 전략</h3>
              <ul style={{ listStyle: 'none', padding: 0, color: 'var(--text-secondary)', lineHeight: '1.8', fontSize: '0.9rem', marginBottom: '0.5rem' }}>
                <li>• <strong style={{ color: 'var(--text-color)' }}>지원 내역</strong>: 메인 쿼리에 <code>LEFT JOIN FETCH</code> → 1000회 조회 제거</li>
                <li>• <strong style={{ color: 'var(--text-color)' }}>첨부파일</strong>: Pet ID 모아 <code>IN</code> 절 배치 조회 → ~700회 → 1회</li>
                <li>• <strong style={{ color: 'var(--text-color)' }}>예방접종</strong>: 컬렉션이라 Fetch Join 시 카테시안 곱 위험 → <code>@BatchSize(50)</code>로 ~700회 → 1~2회</li>
              </ul>
              <pre style={pre}>
{`@Query("SELECT DISTINCT cr FROM CareRequest cr " +
       "JOIN FETCH cr.user LEFT JOIN FETCH cr.pet " +
       "LEFT JOIN FETCH cr.applications " +
       "WHERE cr.isDeleted = false")
List<CareRequest> findAllActiveRequests();

// 첨부파일 배치 (IN 절)
Map<Long, List<FileDTO>> filesByPet =
    attachmentFileService.getAttachmentsBatch(FileTargetType.PET, petIds);

// 예방접종은 컬렉션 → @BatchSize
@BatchSize(size = 50) @OneToMany(mappedBy = "pet") List<PetVaccination> vaccinations;`}
              </pre>
              <p style={{ color: 'var(--text-muted)', lineHeight: '1.6', margin: '0.4rem 0 0', fontSize: '0.8rem' }}>
                이유(지원 내역): Hibernate는 한 쿼리에서 컬렉션(OneToMany) Fetch Join을 1개까지만 안전하게 허용 — applications는 요청의 직접 컬렉션이라 메인 쿼리에서 Fetch Join(중복 행은 DISTINCT로 제거)하고, 예방접종까지 같이 fetch join하면 두 컬렉션이 곱해져 폭발하므로 BatchSize로 분리.
              </p>
              <p style={{ color: 'var(--text-muted)', lineHeight: '1.6', margin: '0.3rem 0 0', fontSize: '0.8rem' }}>
                이유(첨부파일): File이 Pet과 JPA 연관관계가 없는 별도 도메인 소속 엔티티라 Fetch Join 자체가 불가능 → 서비스 간 IN절 배치 조회로 해결.
              </p>
            </div>

            <div className="section-card" style={{ ...card, marginBottom: '1rem' }}>
              <h3 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>결과</h3>
              <div style={{ overflowX: 'auto', marginBottom: '1rem' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                  <thead>
                    <tr style={{ borderBottom: '2px solid var(--nav-border)' }}>
                      <th style={th}>항목</th><th style={th}>개선 전</th><th style={th}>개선 후</th><th style={th}>개선율</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr style={{ borderBottom: '1px solid var(--nav-border)' }}>
                      <td style={td}>쿼리 수 <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>(주 지표)</span></td>
                      <td style={td}>151개</td>
                      <td style={{ ...td, color: 'var(--link-color)', fontWeight: 'bold' }}>4개</td>
                      <td style={{ ...td, color: 'var(--link-color)', fontWeight: 'bold' }}>97.4% ↓</td>
                    </tr>
                    <tr>
                      <td style={td}>백엔드 실행 시간 <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>(보조)</span></td>
                      <td style={td}>478ms</td>
                      <td style={{ ...td, color: 'var(--link-color)', fontWeight: 'bold' }}>210ms</td>
                      <td style={td}>—</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <MermaidDiagram chart={afterSeq} />
            </div>
          </section>

          {/* 3. 펫코인 결제 연동 정리 */}
          <section id="payment" style={{ marginBottom: '3rem', scrollMarginTop: '2rem' }}>
            <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>펫코인 결제 연동 정리</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1rem', lineHeight: 1.7 }}>
              거래 확정 시 에스크로 생성·지급·환불이 <code>PetCoinService</code>를 통해 처리됩니다. 연동 코드의 정합성·성능·일관성을 정리했습니다.
            </p>

            <div className="section-card" style={{ ...card, marginBottom: '1rem' }}>
              <h3 style={{ marginBottom: '0.5rem', color: 'var(--text-color)' }}>잔액 변경 Race Condition</h3>
              <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', marginBottom: '0.5rem', fontSize: '0.9rem' }}>
                <code>chargeCoins/payoutCoins/refundCoins</code>가 락 없는 <code>findById</code>를 써서 동시 요청 시 Lost Update·Deadlock(예: 동시 충전 5건→예상 150, 실제 110). → <code>findByIdForUpdate</code>(<code>SELECT … FOR UPDATE</code>)로 행 락 걸어 순차 처리. (<code>PetCoinServiceRaceConditionTest</code>로 검증)
              </p>
              <p style={{ color: 'var(--text-muted)', lineHeight: '1.6', margin: '0.4rem 0 0', fontSize: '0.8rem' }}>
                이유: 상대방이 커밋한 최신 잔액을 읽어야 순차 처리가 성립하므로, 충돌만 사후 감지하는 낙관적 락이 아니라 대기 후 최신값을 재조회하는 비관적 락을 선택.
              </p>
            </div>

            <div className="section-card" style={{ ...card, marginBottom: '1rem' }}>
              <h3 style={{ marginBottom: '0.5rem', color: 'var(--text-color)' }}>거래 내역 조회 정리</h3>
              <ul style={{ listStyle: 'none', padding: 0, color: 'var(--text-secondary)', lineHeight: '1.8', fontSize: '0.9rem' }}>
                <li>• <strong style={{ color: 'var(--text-color)' }}>메모리 페이징 제거</strong>: 전체 로드 후 <code>subList</code> → <code>Pageable</code> DB 페이징(응답도 Spring <code>Page</code>)</li>
                <li>• <strong style={{ color: 'var(--text-color)' }}>Converter N+1</strong>: <code>getUser()</code> Lazy로 1+N → <code>@EntityGraph("user")</code>로 1회</li>
                <li>• <strong style={{ color: 'var(--text-color)' }}>Fetch 전략</strong>: 단건 상세는 Fetch Join, 페이징 목록은 EntityGraph/BatchSize 규칙 적용</li>
              </ul>
            </div>

            <div className="section-card" style={card}>
              <h3 style={{ marginBottom: '0.5rem', color: 'var(--text-color)' }}>중복 조회 · 패턴 일관성</h3>
              <ul style={{ listStyle: 'none', padding: 0, color: 'var(--text-secondary)', lineHeight: '1.8', fontSize: '0.9rem' }}>
                <li>• <code>getCurrentUserId()</code> + 각 메서드 <code>findById</code>로 User 2회 조회 → <code>getCurrentUser()</code>로 1회만 조회해 전달</li>
                <li>• <code>getBalance()</code>가 user를 또 <code>findById</code> → <code>user.getPetCoinBalance()</code> 직접 반환</li>
                <li>• Admin 컨트롤러가 JPA 인터페이스 직접 주입 → 도메인 Repository 인터페이스로 통일(Adapter 경유)</li>
              </ul>
            </div>
          </section>

          {/* 4. 페이징 경로 N+1 */}
          <section id="known" style={{ marginBottom: '3rem', scrollMarginTop: '2rem' }}>
            <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>페이징 경로 N+1 (해결)</h2>
            <div className="section-card" style={card}>
              <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', marginBottom: '0.5rem', fontSize: '0.9rem' }}>
                비페이징 경로는 <code>LEFT JOIN FETCH cr.applications</code>로 최적화됐지만, 초기엔 <strong style={{ color: 'var(--text-color)' }}>페이징 쿼리</strong>엔 해당 fetch가 빠져 페이지당 20건 조회 시 지원 내역 lazy load가 재발하는 문제가 있었습니다.
              </p>
              <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', marginBottom: '0.5rem', fontSize: '0.9rem' }}>
                → 페이징 쿼리는 fetch join을 추가하는 대신 <code>CareRequest.applications</code>에 <code>@BatchSize(50)</code>을 적용해 해결했습니다.
              </p>
              <p style={{ color: 'var(--text-muted)', lineHeight: '1.6', margin: '0.4rem 0 0', fontSize: '0.8rem' }}>
                이유: 페이징 쿼리에 컬렉션 fetch join을 추가하면 DISTINCT와 함께 메모리 페이징(전체 로드 후 자르기)으로 빠지기 쉬워, DB 레벨 페이징을 유지한 채 @BatchSize로 지원 내역만 배치 조회하도록 분리.
              </p>
            </div>
          </section>

          {/* 5. 쿼리 감사에서 다시 나온 것 */}
          <section id="audit" style={{ marginBottom: '3rem', scrollMarginTop: '2rem' }}>
            <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>쿼리 감사에서 다시 나온 것 (2026-07)</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1rem', lineHeight: 1.7 }}>
              위 항목들을 고치고 나서 Care의 N+1은 정리됐다고 생각했습니다. 이후{' '}
              <Link to="/domains/refactoring#query-audit" style={{ color: 'var(--link-color)', textDecoration: 'none' }}>
                전체 쿼리 감사
              </Link>
              에서 62개 엔드포인트를 <code>curl</code>로 직접 호출해보니, Care에서만 네 가지가 더 나왔습니다.
              <strong style={{ color: 'var(--text-color)' }}> 그중 하나는 성능 문제가 아니라 기능이 통째로 죽어 있던 것</strong>이었습니다.
            </p>

            <div className="section-card" style={{ ...card, marginBottom: '1rem' }}>
              <h3 style={{ marginBottom: '0.5rem', color: 'var(--text-color)' }}>① 검색 API가 항상 HTTP 500이었다</h3>
              <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', marginBottom: '0.5rem', fontSize: '0.9rem' }}>
                <code>GET /api/care-requests/search</code>는 <code>MATCH(title, description) AGAINST(...)</code>를 쓰는데
                <code>carerequest</code>에 <strong style={{ color: 'var(--text-color)' }}>FULLTEXT 인덱스가 없었습니다.</strong>{' '}
                MySQL은 FULLTEXT 인덱스 없이 <code>MATCH … AGAINST</code>를 실행하지 못합니다 — 느린 게 아니라 에러라서,
                데이터가 0건이든 100만 건이든 항상 500입니다. <code>board</code>는 같은 형태의 인덱스를 처음부터 갖고 있었고 care만 빠져 있었습니다.
              </p>
              <pre style={pre}>
{`-- V2__care_search_fulltext_index.sql
ALTER TABLE carerequest
    ADD FULLTEXT INDEX idx_carerequest_title_desc (title, description);`}
              </pre>
              <p style={{ color: 'var(--text-muted)', lineHeight: '1.6', margin: '0.4rem 0 0', fontSize: '0.8rem' }}>
                인덱스를 빼면 다시 500이 되고 넣으면 200이 되는 것까지 확인해(A/B/A) 인과를 확정했습니다.
                공개 API와 관리자 API(<code>/api/admin/care-requests?q=</code>)가 같은 쿼리를 쓰고 있어 인덱스 하나로 둘 다 살아났습니다.
              </p>
            </div>

            <div className="section-card" style={{ ...card, marginBottom: '1rem' }}>
              <h3 style={{ marginBottom: '0.5rem', color: 'var(--text-color)' }}>② 관리자 목록에 N+1이 그대로 남아 있었다</h3>
              <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', marginBottom: '0.5rem', fontSize: '0.9rem' }}>
                <code>/api/admin/care-requests</code>가 목록 20건에 <strong style={{ color: 'var(--text-color)' }}>쿼리 66개</strong>를 날리고 있었습니다.
                원인이 둘이었고, 둘 다 이 페이지 위쪽에서 이미 고쳤다고 적어둔 문제였습니다 — <strong style={{ color: 'var(--text-color)' }}>공개 API 경로만 고치고 관리자 경로를 빠뜨린 것</strong>입니다.
              </p>
              <ul style={{ listStyle: 'none', padding: 0, color: 'var(--text-secondary)', lineHeight: '1.8', fontSize: '0.9rem', marginBottom: '0.5rem' }}>
                <li>• <code>findAllForAdmin</code>에 <code>JOIN FETCH</code>가 없어 user·pet이 행마다 지연로딩</li>
                <li>• Facade가 <code>Page.map(converter::toDTO)</code>로 <strong style={{ color: 'var(--text-color)' }}>단건 변환기를 행마다 호출</strong>해 첨부를 개별 조회</li>
              </ul>
              <pre style={pre}>
{`@Query(value = "SELECT r FROM CareRequest r JOIN FETCH r.user LEFT JOIN FETCH r.pet WHERE ...",
       countQuery = "SELECT COUNT(r) FROM CareRequest r WHERE ...")   // ← 필수`}
              </pre>
              <p style={{ color: 'var(--text-muted)', lineHeight: '1.6', margin: '0.4rem 0 0', fontSize: '0.8rem' }}>
                <code>Page&lt;&gt;</code> + <code>JOIN FETCH</code>는 <code>countQuery</code>를 반드시 명시해야 합니다 —
                안 그러면 Hibernate가 fetch join을 물고 COUNT를 만듭니다.
              </p>
              <div style={{ overflowX: 'auto', marginTop: '0.75rem' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                  <thead>
                    <tr style={{ borderBottom: '2px solid var(--nav-border)' }}>
                      <th style={th}>size</th><th style={th}>10</th><th style={th}>20</th><th style={th}>40</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr style={{ borderBottom: '1px solid var(--nav-border)' }}>
                      <td style={td}>개선 전</td><td style={td}>36</td><td style={td}>66</td><td style={td}>127</td>
                    </tr>
                    <tr>
                      <td style={td}>개선 후</td>
                      <td style={{ ...td, color: 'var(--link-color)', fontWeight: 'bold' }}>7</td>
                      <td style={{ ...td, color: 'var(--link-color)', fontWeight: 'bold' }}>7</td>
                      <td style={{ ...td, color: 'var(--link-color)', fontWeight: 'bold' }}>8</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p style={{ color: 'var(--text-muted)', lineHeight: '1.6', margin: '0.5rem 0 0', fontSize: '0.8rem' }}>
                N+1이 사라졌다는 증거는 "줄었다"가 아니라 <strong style={{ color: 'var(--text-color)' }}>"결과 건수에 비례하지 않는다"</strong>입니다.
                size를 4배로 키워도 7 → 8입니다. 회귀 테스트도 상한값이 아니라 이 비례성을 검증합니다.
              </p>
            </div>

            <div className="section-card" style={{ ...card, marginBottom: '1rem' }}>
              <h3 style={{ marginBottom: '0.5rem', color: 'var(--text-color)' }}>③ 목록·주변검색 인덱스</h3>
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                  <thead>
                    <tr style={{ borderBottom: '2px solid var(--nav-border)' }}>
                      <th style={th}>엔드포인트</th><th style={th}>개선 전</th><th style={th}>개선 후</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr style={{ borderBottom: '1px solid var(--nav-border)' }}>
                      <td style={td}><code>/api/care-requests</code> (목록)</td>
                      <td style={td}>3,060행 검사 · filesort</td>
                      <td style={{ ...td, color: 'var(--link-color)', fontWeight: 'bold' }}>30행 · filesort 없음</td>
                    </tr>
                    <tr>
                      <td style={td}><code>/api/care-requests/nearby</code></td>
                      <td style={td}>3,000행 풀스캔 · 선택도 208배 오판</td>
                      <td style={{ ...td, color: 'var(--link-color)', fontWeight: 'bold' }}>208행 SPATIAL · 추정 정확</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p style={{ color: 'var(--text-muted)', lineHeight: '1.6', margin: '0.6rem 0 0', fontSize: '0.8rem' }}>
                주변검색은 <code>(is_deleted, latitude, longitude)</code> B-tree 복합 인덱스로 먼저 시도했다가 <strong style={{ color: 'var(--text-color)' }}>아무 효과가 없었습니다.</strong>{' '}
                <code>is_deleted</code>는 전 행이 같은 값이라 선택도가 0이고, B-tree는 범위 조건을 선두에서 하나만 쓸 수 있어
                <code>latitude BETWEEN</code> 다음의 <code>longitude BETWEEN</code>은 인덱스로 걸러지지 않기 때문입니다.
                meetup·locationservice가 이미 쓰던 <code>geo_point</code> POINT + SPATIAL 인덱스 + 트리거 방식을 그대로 따랐고,
                쿼리도 <code>ST_Within</code> + <code>ST_Distance_Sphere</code>로 바꿨습니다 — 인덱스만 만들고 쿼리를 안 바꾸면 무용지물입니다.
              </p>
            </div>

            <div className="section-card" style={{ ...card, border: '1px dashed var(--nav-border)' }}>
              <h3 style={{ marginBottom: '0.5rem', color: 'var(--text-color)' }}>아직 남은 것 (정직하게)</h3>
              <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', margin: 0, fontSize: '0.9rem' }}>
                목록 SELECT는 30행으로 고쳤지만, <code>Page&lt;&gt;</code>가 <strong style={{ color: 'var(--text-color)' }}>함께 날리는 COUNT 쿼리는 아직 6,000행</strong>을 검사합니다.
                목록 SELECT와 COUNT는 서로 다른 쿼리이고, 이 감사의 출발점이 바로 "목록만 보고 COUNT를 놓친 것"이었기 때문에 이번엔 숨기지 않고 남겨둡니다.
                프로젝트 전체에 같은 형태의 자동생성 COUNT가 16개 있어 별도 과제로 분리했습니다.
              </p>
            </div>
          </section>

          {/* 6. 요약 */}
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
                    <td style={td}>요청 목록 N+1 (대표)</td><td style={td}>151개 → 4개 (97.4% ↓), 478ms → 210ms · worktree 실측</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid var(--nav-border)' }}>
                    <td style={td}>펫코인 잔액 Race Condition</td><td style={td}>findByIdForUpdate로 잔액 일관성 보장</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid var(--nav-border)' }}>
                    <td style={td}>거래 내역 조회</td><td style={td}>DB 페이징 + @EntityGraph N+1 제거</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid var(--nav-border)' }}>
                    <td style={td}>중복 조회 · 패턴</td><td style={td}>User 2~3회 → 1회, 도메인 Repository 인터페이스 통일</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid var(--nav-border)' }}>
                    <td style={td}>페이징 경로 N+1</td><td style={td}>@BatchSize(50) 적용으로 해결</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid var(--nav-border)' }}>
                    <td style={td}>검색 API (쿼리 감사)</td><td style={td}>HTTP 500 → 200 — FULLTEXT 인덱스 부재로 기능이 죽어 있었음</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid var(--nav-border)' }}>
                    <td style={td}>관리자 목록 N+1 (쿼리 감사)</td><td style={td}>66개 → 7개, size를 4배로 늘려도 7 → 8 (비례 소멸)</td>
                  </tr>
                  <tr>
                    <td style={td}>목록 · 주변검색 인덱스 (쿼리 감사)</td><td style={td}>3,060행 → 30행 (filesort 제거) · 3,000행 풀스캔 → 208행 (SPATIAL)</td>
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

export default CareDomainDetail;
