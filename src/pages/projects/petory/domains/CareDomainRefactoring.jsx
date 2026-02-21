import { Link } from 'react-router-dom';
import TableOfContents from '../../../../components/Common/TableOfContents';

function CareDomainRefactoring() {
  const sections = [
    { id: 'intro', title: '리팩토링 개요' },
    { id: 'payment-transaction-paging', title: '거래 내역 메모리 페이징 → DB 페이징' },
    { id: 'payment-race-condition', title: 'PetCoinService Race Condition 해결' },
    { id: 'payment-n1', title: 'PetCoinTransactionConverter N+1 해결' },
    { id: 'payment-user-duplicate', title: 'PetCoinController User 중복 조회 제거' },
    { id: 'payment-repo-pattern', title: 'AdminPaymentController Repository 패턴 일관성' },
    { id: 'payment-getbalance', title: 'PetCoinService.getBalance User 재조회 제거' },
    { id: 'payment-dto-record', title: 'Payment DTO → record 리팩토링' },
    { id: 'summary', title: '리팩토링 요약' }
  ];

  return (
    <div className="domain-page-wrapper" style={{ padding: '2rem 0' }}>
      <div className="domain-page-container" style={{ display: 'flex', gap: '2rem', alignItems: 'flex-start' }}>
        <div className="domain-page-content" style={{ flex: 1 }}>
          <div style={{ marginBottom: '1rem' }}>
            <Link
              to="/domains/care"
              style={{
                color: 'var(--link-color)',
                textDecoration: 'none',
                fontSize: '0.9rem'
              }}
            >
              ← Care 도메인으로 돌아가기
            </Link>
          </div>
          <h1 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>Care 도메인 리팩토링</h1>

          {/* 1. 리팩토링 개요 */}
          <section id="intro" style={{ marginBottom: '3rem', scrollMarginTop: '2rem' }}>
            <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>리팩토링 개요</h2>
            <div className="section-card" style={{
              padding: '1.5rem',
              backgroundColor: 'var(--card-bg)',
              borderRadius: '8px',
              border: '1px solid var(--nav-border)'
            }}>
              <p style={{ lineHeight: '1.8', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                Care 도메인은 펫케어 요청/지원과 <strong style={{ color: 'var(--text-color)' }}>Payment(PetCoin)</strong>가 연동됩니다.
                펫케어 거래 확정 시 에스크로 생성/지급/환불이 PetCoinService를 통해 처리됩니다.
                본 페이지에서는 Care와 연동된 Payment(PetCoin) 도메인의 백엔드 리팩토링 내역을 정리합니다.
              </p>
              <div style={{
                padding: '1rem',
                backgroundColor: 'var(--bg-color)',
                borderRadius: '6px',
                marginTop: '1rem',
                border: '1px solid var(--nav-border)'
              }}>
                <h3 style={{ marginBottom: '0.75rem', color: 'var(--text-color)', fontSize: '1rem' }}>대상 도메인</h3>
                <ul style={{
                  listStyle: 'none',
                  padding: 0,
                  color: 'var(--text-secondary)',
                  lineHeight: '1.8',
                  fontSize: '0.9rem'
                }}>
                  <li>• <strong style={{ color: 'var(--text-color)' }}>펫코인</strong>: PetCoinTransaction, PetCoinEscrow, PetCoinService, PetCoinEscrowService</li>
                  <li>• <strong style={{ color: 'var(--text-color)' }}>연동</strong>: CareRequestService, ConversationService (에스크로 생성/지급/환불)</li>
                </ul>
              </div>
            </div>
          </section>

          {/* 2. 거래 내역 메모리 페이징 → DB 페이징 */}
          <section id="payment-transaction-paging" style={{ marginBottom: '3rem', scrollMarginTop: '2rem' }}>
            <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>거래 내역 메모리 페이징 → DB 페이징</h2>

            <div className="section-card" style={{
              padding: '1.5rem',
              backgroundColor: 'var(--card-bg)',
              borderRadius: '8px',
              border: '1px solid var(--nav-border)',
              marginBottom: '1rem'
            }}>
              <h3 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>문제점</h3>
              <div style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}>
                <p><code>GET /api/payment/transactions</code>: <code>findByUserOrderByCreatedAtDesc(user)</code> <strong>전체 조회</strong> 후 <code>subList</code>로 메모리 페이징</p>
                <p style={{ marginTop: '0.5rem' }}>거래 내역 1만 건 시 → 1만 건 전부 로드 후 20건만 반환</p>
              </div>
            </div>

            <div className="section-card" style={{
              padding: '1.5rem',
              backgroundColor: 'var(--card-bg)',
              borderRadius: '8px',
              border: '1px solid var(--nav-border)'
            }}>
              <h3 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>적용 결과 ✅</h3>
              <ul style={{
                listStyle: 'none',
                padding: 0,
                color: 'var(--text-secondary)',
                lineHeight: '1.8',
                fontSize: '0.9rem'
              }}>
                <li>• <code>findByUserOrderByCreatedAtDesc(user, pageable)</code> Page 메서드 추가</li>
                <li>• PetCoinController에서 <code>@PageableDefault(size = 20)</code> 사용</li>
                <li>• API 응답: List → Spring Page (<code>content</code>, <code>totalElements</code>, <code>totalPages</code>)</li>
              </ul>
            </div>
          </section>

          {/* 3. PetCoinService Race Condition 해결 */}
          <section id="payment-race-condition" style={{ marginBottom: '3rem', scrollMarginTop: '2rem' }}>
            <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>PetCoinService Race Condition 해결</h2>

            <div className="section-card" style={{
              padding: '1.5rem',
              backgroundColor: 'var(--card-bg)',
              borderRadius: '8px',
              border: '1px solid var(--nav-border)',
              marginBottom: '1rem'
            }}>
              <h3 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>문제점</h3>
              <div style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}>
                <p><code>chargeCoins</code>, <code>payoutCoins</code>, <code>refundCoins</code>: <code>findById</code> 사용 → 동시 요청 시 Lost Update + Deadlock, 잔액 불일치</p>
                <p style={{ marginTop: '0.5rem' }}>예: 동시 충전 5건 × 10 → 예상 150, 실제 110 (1~2건만 반영)</p>
              </div>
            </div>

            <div className="section-card" style={{
              padding: '1.5rem',
              backgroundColor: 'var(--card-bg)',
              borderRadius: '8px',
              border: '1px solid var(--nav-border)'
            }}>
              <h3 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>적용 결과 ✅</h3>
              <ul style={{
                listStyle: 'none',
                padding: 0,
                color: 'var(--text-secondary)',
                lineHeight: '1.8',
                fontSize: '0.9rem'
              }}>
                <li>• <code>findById</code> → <code>findByIdForUpdate</code> 변경 (<code>SELECT ... FOR UPDATE</code>)</li>
                <li>• 해당 User 행 락 유지 → 순차 처리 → 잔액 일관성 보장</li>
                <li>• <code>PetCoinServiceRaceConditionTest</code> 추가</li>
              </ul>
            </div>
          </section>

          {/* 4. PetCoinTransactionConverter N+1 해결 */}
          <section id="payment-n1" style={{ marginBottom: '3rem', scrollMarginTop: '2rem' }}>
            <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>PetCoinTransactionConverter N+1 해결</h2>

            <div className="section-card" style={{
              padding: '1.5rem',
              backgroundColor: 'var(--card-bg)',
              borderRadius: '8px',
              border: '1px solid var(--nav-border)',
              marginBottom: '1rem'
            }}>
              <h3 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>문제점</h3>
              <div style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}>
                <p><code>toDTO()</code>에서 <code>transaction.getUser().getIdx()</code> 접근 시 Lazy Loading → 거래 N건 조회 시 1 + N 쿼리</p>
              </div>
            </div>

            <div className="section-card" style={{
              padding: '1.5rem',
              backgroundColor: 'var(--card-bg)',
              borderRadius: '8px',
              border: '1px solid var(--nav-border)'
            }}>
              <h3 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>적용 결과 ✅</h3>
              <ul style={{
                listStyle: 'none',
                padding: 0,
                color: 'var(--text-secondary)',
                lineHeight: '1.8',
                fontSize: '0.9rem'
              }}>
                <li>• <code>@EntityGraph(attributePaths = "user")</code> 추가 → JOIN FETCH로 1회 조회</li>
                <li>• N+1 쿼리 제거</li>
              </ul>
            </div>
          </section>

          {/* 5. PetCoinController User 중복 조회 제거 */}
          <section id="payment-user-duplicate" style={{ marginBottom: '3rem', scrollMarginTop: '2rem' }}>
            <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>PetCoinController User 중복 조회 제거</h2>

            <div className="section-card" style={{
              padding: '1.5rem',
              backgroundColor: 'var(--card-bg)',
              borderRadius: '8px',
              border: '1px solid var(--nav-border)',
              marginBottom: '1rem'
            }}>
              <h3 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>문제점</h3>
              <div style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}>
                <p><code>getCurrentUserId()</code> 1회 + 각 메서드에서 <code>findById</code> 1회 → 동일 요청 내 User 2회 조회</p>
              </div>
            </div>

            <div className="section-card" style={{
              padding: '1.5rem',
              backgroundColor: 'var(--card-bg)',
              borderRadius: '8px',
              border: '1px solid var(--nav-border)'
            }}>
              <h3 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>적용 결과 ✅</h3>
              <ul style={{
                listStyle: 'none',
                padding: 0,
                color: 'var(--text-secondary)',
                lineHeight: '1.8',
                fontSize: '0.9rem'
              }}>
                <li>• <code>getCurrentUserId()</code> → <code>getCurrentUser()</code>로 변경</li>
                <li>• User 엔티티 1회만 조회 후 <code>getMyBalance</code>, <code>getMyTransactions</code>, <code>chargeCoins</code>에 전달</li>
                <li>• 요청당 User 조회 2회 → 1회로 감소</li>
              </ul>
            </div>
          </section>

          {/* 6. AdminPaymentController Repository 패턴 일관성 */}
          <section id="payment-repo-pattern" style={{ marginBottom: '3rem', scrollMarginTop: '2rem' }}>
            <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>AdminPaymentController Repository 패턴 일관성</h2>

            <div className="section-card" style={{
              padding: '1.5rem',
              backgroundColor: 'var(--card-bg)',
              borderRadius: '8px',
              border: '1px solid var(--nav-border)',
              marginBottom: '1rem'
            }}>
              <h3 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>문제점</h3>
              <div style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}>
                <p><code>SpringDataJpaPetCoinTransactionRepository</code> 직접 주입 → PetCoinController와 Repository 패턴 불일치</p>
              </div>
            </div>

            <div className="section-card" style={{
              padding: '1.5rem',
              backgroundColor: 'var(--card-bg)',
              borderRadius: '8px',
              border: '1px solid var(--nav-border)'
            }}>
              <h3 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>적용 결과 ✅</h3>
              <ul style={{
                listStyle: 'none',
                padding: 0,
                color: 'var(--text-secondary)',
                lineHeight: '1.8',
                fontSize: '0.9rem'
              }}>
                <li>• <code>PetCoinTransactionRepository</code> (도메인 인터페이스) 사용으로 변경</li>
                <li>• JPA 인터페이스는 Adapter 내부에서만 사용</li>
              </ul>
            </div>
          </section>

          {/* 7. PetCoinService.getBalance User 재조회 제거 */}
          <section id="payment-getbalance" style={{ marginBottom: '3rem', scrollMarginTop: '2rem' }}>
            <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>PetCoinService.getBalance User 재조회 제거</h2>

            <div className="section-card" style={{
              padding: '1.5rem',
              backgroundColor: 'var(--card-bg)',
              borderRadius: '8px',
              border: '1px solid var(--nav-border)',
              marginBottom: '1rem'
            }}>
              <h3 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>문제점</h3>
              <div style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}>
                <p><code>getBalance(Users user)</code>에서 <code>findById</code> 재조회 → Controller에서 user 전달해도 2회 쿼리</p>
              </div>
            </div>

            <div className="section-card" style={{
              padding: '1.5rem',
              backgroundColor: 'var(--card-bg)',
              borderRadius: '8px',
              border: '1px solid var(--nav-border)'
            }}>
              <h3 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>적용 결과 ✅</h3>
              <ul style={{
                listStyle: 'none',
                padding: 0,
                color: 'var(--text-secondary)',
                lineHeight: '1.8',
                fontSize: '0.9rem'
              }}>
                <li>• <code>user.getPetCoinBalance()</code> 직접 반환</li>
                <li>• Controller의 <code>getCurrentUser()</code>로 조회한 user 전달 시 추가 쿼리 없음</li>
              </ul>
            </div>
          </section>

          {/* 8. Payment DTO → record 리팩토링 */}
          <section id="payment-dto-record" style={{ marginBottom: '3rem', scrollMarginTop: '2rem' }}>
            <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>Payment DTO → record 리팩토링</h2>

            <div className="section-card" style={{
              padding: '1.5rem',
              backgroundColor: 'var(--card-bg)',
              borderRadius: '8px',
              border: '1px solid var(--nav-border)',
              marginBottom: '1rem'
            }}>
              <h3 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>record로 전환한 DTO</h3>
              <ul style={{
                listStyle: 'none',
                padding: 0,
                color: 'var(--text-secondary)',
                lineHeight: '1.8',
                fontSize: '0.9rem'
              }}>
                <li>• <strong style={{ color: 'var(--text-color)' }}>PetCoinBalanceResponse</strong> - 코인 잔액 응답 (2개 필드)</li>
                <li>• <strong style={{ color: 'var(--text-color)' }}>PetCoinChargeRequest</strong> - 코인 충전 요청 (3개 필드)</li>
              </ul>
            </div>

            <div className="section-card" style={{
              padding: '1rem',
              backgroundColor: 'var(--bg-color)',
              borderRadius: '6px',
              border: '1px solid var(--link-color)'
            }}>
              <a
                href="https://github.com/makkong1/makkong1-github.io/blob/main/docs/refactoring/recordType/payment/dto-record-refactoring.md"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: 'var(--link-color)', textDecoration: 'none', fontWeight: 'bold' }}
              >
                → Payment DTO record 리팩토링 상세 문서 보기
              </a>
            </div>
          </section>

          {/* 9. 리팩토링 요약 */}
          <section id="summary" style={{ marginBottom: '3rem', scrollMarginTop: '2rem' }}>
            <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>리팩토링 요약</h2>

            <div className="section-card" style={{
              padding: '1.5rem',
              backgroundColor: 'var(--card-bg)',
              borderRadius: '8px',
              border: '1px solid var(--nav-border)',
              marginBottom: '1.5rem'
            }}>
              <h3 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>완료된 Payment(PetCoin) 리팩토링</h3>
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
                    <td style={{ padding: '0.75rem' }}>거래 내역 페이징</td>
                    <td style={{ padding: '0.75rem' }}>메모리 전체 로드 → DB 페이징</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid var(--nav-border)' }}>
                    <td style={{ padding: '0.75rem' }}>Race Condition</td>
                    <td style={{ padding: '0.75rem' }}>findByIdForUpdate로 잔액 일관성 보장</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid var(--nav-border)' }}>
                    <td style={{ padding: '0.75rem' }}>Transaction N+1</td>
                    <td style={{ padding: '0.75rem' }}>@EntityGraph로 1 쿼리</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid var(--nav-border)' }}>
                    <td style={{ padding: '0.75rem' }}>User 중복 조회</td>
                    <td style={{ padding: '0.75rem' }}>2~3회 → 1회</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid var(--nav-border)' }}>
                    <td style={{ padding: '0.75rem' }}>Repository 패턴</td>
                    <td style={{ padding: '0.75rem' }}>AdminPaymentController 도메인 인터페이스 사용</td>
                  </tr>
                  <tr>
                    <td style={{ padding: '0.75rem' }}>getBalance 재조회</td>
                    <td style={{ padding: '0.75rem' }}>user.getPetCoinBalance() 직접 반환</td>
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
                <li>• <Link to="/domains/care" style={{ color: 'var(--link-color)', textDecoration: 'none' }}>Care 도메인 상세 페이지</Link></li>
                <li>• <Link to="/domains/care/optimization" style={{ color: 'var(--link-color)', textDecoration: 'none' }}>Care 도메인 성능 최적화 페이지</Link></li>
              </ul>
            </div>
          </section>
        </div>
        <TableOfContents sections={sections} />
      </div>
    </div>
  );
}

export default CareDomainRefactoring;
