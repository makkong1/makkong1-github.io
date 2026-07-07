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
    { id: 'known', title: '알려진 개선 과제' },
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
    Note over Service,DB: N+1 발생
    loop CareRequest 1004개
        Service->>DB: getApplications() 개별 조회
    end
    loop Pet ~700개
        Service->>DB: 첨부파일 개별 조회
        Service->>DB: 예방접종 개별 조회
    end
    Note over Service,DB: 총 ~2400개 쿼리`;

  const afterSeq = `sequenceDiagram
    participant Service as CareRequestService
    participant DB as MySQL
    Service->>DB: CareRequest + User + Pet + Application (JOIN FETCH) (1)
    Service->>DB: 첨부파일 배치 조회 (IN 절) (2)
    Service->>DB: 예방접종 @BatchSize 배치 (3~4)
    Note over Service,DB: 총 4~5개 쿼리 (99.8% 감소)`;

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
                <h3 style={{ marginBottom: '0.75rem', color: 'var(--text-color)', fontSize: '1rem' }}>핵심 성과 (요청 목록, 전체 조회 1004개 기준)</h3>
                <ul style={{ listStyle: 'none', padding: 0, color: 'var(--text-secondary)', lineHeight: '1.8', fontSize: '0.9rem' }}>
                  <li>• 쿼리 수: <strong style={{ color: 'var(--text-color)' }}>~2400개 → 4~5개</strong> (99.8% 감소)</li>
                  <li>• 백엔드 실행 시간: <strong style={{ color: 'var(--text-color)' }}>1084ms → 66ms</strong> (94% 감소)</li>
                  <li>• 메모리: <strong style={{ color: 'var(--text-color)' }}>21MB → 6MB</strong> (71% 감소)</li>
                </ul>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.82rem', marginTop: '0.5rem', marginBottom: 0 }}>※ 홈 화면 숫자 카드의 근거 수치입니다. (기존 비페이징 측정 기준)</p>
              </div>
            </div>
          </section>

          {/* 2. 요청 목록 N+1 (대표) */}
          <section id="list-n1" style={{ marginBottom: '3rem', scrollMarginTop: '2rem' }}>
            <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>요청 목록 N+1 (대표)</h2>

            <div className="section-card" style={{ ...card, marginBottom: '1rem' }}>
              <h3 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>문제 — 약 2400개 쿼리 (1004개 요청)</h3>
              <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', marginBottom: '0.75rem', fontSize: '0.9rem' }}>
                요청 목록을 조회한 뒤 요청마다 지원 내역(CareApplication)을, 펫마다 첨부파일·예방접종을 개별 조회했습니다. (테스트: CareRequest 1004 / Pet ~700 / Application ~1000)
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
{`@Query("SELECT cr FROM CareRequest cr " +
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
                      <td style={td}>쿼리 수 (전체 조회)</td><td style={td}>~2400개</td>
                      <td style={{ ...td, color: 'var(--link-color)', fontWeight: 'bold' }}>4~5개</td>
                      <td style={{ ...td, color: 'var(--link-color)', fontWeight: 'bold' }}>99.8% ↓</td>
                    </tr>
                    <tr style={{ borderBottom: '1px solid var(--nav-border)' }}>
                      <td style={td}>백엔드 실행 시간</td><td style={td}>1084ms</td>
                      <td style={{ ...td, color: 'var(--link-color)', fontWeight: 'bold' }}>66ms</td>
                      <td style={{ ...td, color: 'var(--link-color)', fontWeight: 'bold' }}>94% ↓</td>
                    </tr>
                    <tr>
                      <td style={td}>메모리 (백엔드)</td><td style={td}>21MB</td>
                      <td style={{ ...td, color: 'var(--link-color)', fontWeight: 'bold' }}>6MB</td>
                      <td style={{ ...td, color: 'var(--link-color)', fontWeight: 'bold' }}>71% ↓</td>
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

          {/* 4. 알려진 개선 과제 */}
          <section id="known" style={{ marginBottom: '3rem', scrollMarginTop: '2rem' }}>
            <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>알려진 개선 과제</h2>
            <div className="section-card" style={card}>
              <h3 style={{ marginBottom: '0.5rem', color: 'var(--text-color)' }}>페이징 경로 N+1 (미적용)</h3>
              <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', marginBottom: '0.5rem', fontSize: '0.9rem' }}>
                비페이징 경로는 <code>LEFT JOIN FETCH cr.applications</code>로 최적화됐지만, <strong style={{ color: 'var(--text-color)' }}>페이징 쿼리</strong>엔 해당 fetch가 빠져 페이지당 20건 조회 시 지원 내역 lazy load가 재발합니다.
              </p>
              <ul style={{ listStyle: 'none', padding: 0, color: 'var(--text-secondary)', lineHeight: '1.8', fontSize: '0.9rem' }}>
                <li>• 검토 방안: CareRequest에 <code>@BatchSize</code> 적용 / 페이징 쿼리에 fetch join + <code>DISTINCT</code> / 목록용 DTO 분리(지원 수만 배치 계산)</li>
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
                    <td style={td}>요청 목록 N+1 (대표)</td><td style={td}>~2400개 → 4~5개 (99.8% ↓), 1084ms → 66ms</td>
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
                  <tr>
                    <td style={td}>개선 과제</td><td style={td}>페이징 경로 N+1 (검토 중)</td>
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
