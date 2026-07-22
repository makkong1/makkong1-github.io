import { Link, useSearchParams } from 'react-router-dom';
import { useMemo } from 'react';
import { PETORY_CASES, resolvePetoryCaseSelection } from './petoryCases';

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

function Field({ label, children }) {
  return (
    <p style={{ margin: '0 0 0.6rem', color: 'var(--text-secondary)', lineHeight: '1.75', fontSize: '0.92rem' }}>
      <strong style={{ color: 'var(--text-color)' }}>{label}</strong> — {children}
    </p>
  );
}

function MetricsTable({ rows }) {
  const th = { padding: '0.5rem 0.75rem', textAlign: 'left', color: 'var(--text-color)', fontSize: '0.85rem' };
  const td = { padding: '0.5rem 0.75rem', fontSize: '0.9rem' };
  return (
    <div style={{ overflowX: 'auto', margin: '0.5rem 0 0' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', color: 'var(--text-secondary)' }}>
        <thead>
          <tr style={{ borderBottom: '1px solid var(--nav-border)' }}>
            <th style={th}>지표</th>
            <th style={th}>Before</th>
            <th style={th}>After</th>
          </tr>
        </thead>
        <tbody>
          {rows.map(([label, before, after], i) => (
            <tr key={label} style={{ borderBottom: i < rows.length - 1 ? '1px solid var(--nav-border)' : 'none' }}>
              <td style={{ ...td, color: 'var(--text-color)' }}>{label}</td>
              <td style={td}>{before}</td>
              <td style={{ ...td, color: 'var(--text-color)', fontWeight: 600 }}>{after}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function StrategiesTable({ rows }) {
  const th = { padding: '0.5rem 0.75rem', textAlign: 'left', color: 'var(--text-color)', fontSize: '0.85rem' };
  const td = { padding: '0.5rem 0.75rem', fontSize: '0.88rem', verticalAlign: 'top' };
  return (
    <div style={{ overflowX: 'auto', margin: '0.5rem 0 0' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', color: 'var(--text-secondary)' }}>
        <thead>
          <tr style={{ borderBottom: '1px solid var(--nav-border)' }}>
            <th style={th}>도메인</th>
            <th style={th}>전략</th>
            <th style={th}>왜</th>
          </tr>
        </thead>
        <tbody>
          {rows.map(([domain, strategy, why], i) => (
            <tr key={domain} style={{ borderBottom: i < rows.length - 1 ? '1px solid var(--nav-border)' : 'none' }}>
              <td style={{ ...td, color: 'var(--text-color)', fontWeight: 600, whiteSpace: 'nowrap' }}>{domain}</td>
              <td style={{ ...td, color: 'var(--text-color)' }}>{strategy}</td>
              <td style={td}>{why}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function PetoryCasesPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const active = useMemo(() => resolvePetoryCaseSelection(searchParams), [searchParams]);

  const pick = (id) => setSearchParams({ case: id });

  return (
    <div className="domain-page-wrapper" style={{ padding: '2rem 0' }}>
      <div className="domain-page-container" style={{ display: 'flex', gap: '2rem', alignItems: 'flex-start' }}>
        <div className="domain-page-content" style={{ flex: 1 }}>
          <h1 style={{ marginBottom: '0.5rem', color: 'var(--text-color)' }}>대표 리팩토링 사례</h1>
          <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', marginBottom: '1rem', fontSize: '0.95rem' }}>
            프로젝트 전체에서 추린 대표 성능 개선·리팩토링 사례입니다. 각 사례는{' '}
            <strong>배경 → 문제 → 검토한 대안 → 결정 → 검증 → 결과</strong> 순. 칩을 눌러 전환하고, URL{' '}
            <code style={{ fontSize: '0.82em', backgroundColor: 'var(--bg-color)', padding: '0.1rem 0.35rem', borderRadius: '4px' }}>?case=</code>로 딥링크됩니다.
          </p>
          <p style={{ marginBottom: '1.25rem', fontSize: '0.9rem' }}>
            <Link to="/portfolio/petory" style={{ color: 'var(--link-color)', textDecoration: 'none' }}>
              ← Petory 프로젝트 소개
            </Link>
          </p>

          {/* 셀렉터 */}
          <div role="tablist" aria-label="대표 사례 선택" style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem', marginBottom: '1.25rem' }}>
            {PETORY_CASES.map((c) => {
              const selected = c.id === active.id;
              return (
                <button
                  key={c.id}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  onClick={() => pick(c.id)}
                  style={{
                    cursor: 'pointer',
                    padding: '0.35rem 0.85rem',
                    borderRadius: '999px',
                    fontSize: '0.82rem',
                    fontWeight: 600,
                    border: selected ? '1px solid var(--link-color)' : '1px solid var(--nav-border)',
                    backgroundColor: selected ? 'var(--bg-color)' : 'transparent',
                    color: selected ? 'var(--link-color)' : 'var(--text-color)',
                  }}
                >
                  {c.label}
                </button>
              );
            })}
          </div>

          {/* 선택된 사례 */}
          <Card>
            <span
              style={{
                display: 'inline-block',
                padding: '0.2rem 0.6rem',
                borderRadius: '999px',
                fontSize: '0.75rem',
                fontWeight: 700,
                color: 'var(--link-color)',
                border: '1px solid var(--nav-border)',
                marginBottom: '0.6rem',
              }}
            >
              {active.domain}
            </span>
            <h2 style={{ margin: '0 0 1rem', color: 'var(--text-color)', fontSize: '1.15rem' }}>{active.title}</h2>

            {active.context && <Field label="배경">{active.context}</Field>}
            <Field label="문제">{active.problem}</Field>
            {active.alternatives && <Field label="검토한 대안">{active.alternatives}</Field>}
            <Field label="결정">{active.decision}</Field>

            {active.strategies && (
              <>
                <p style={{ margin: '0.3rem 0 0', color: 'var(--text-color)', fontWeight: 600, fontSize: '0.9rem' }}>도메인별 전략</p>
                <StrategiesTable rows={active.strategies} />
              </>
            )}

            {active.verify && <Field label="검증">{active.verify}</Field>}

            {active.metrics && (
              <>
                <p style={{ margin: '0.9rem 0 0', color: 'var(--text-color)', fontWeight: 600, fontSize: '0.9rem' }}>결과</p>
                <MetricsTable rows={active.metrics} />
              </>
            )}

            {active.code && (
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
                  margin: '0.9rem 0 0',
                }}
              >
                {active.code}
              </pre>
            )}

            <p style={{ margin: '1.1rem 0 0', fontSize: '0.9rem' }}>
              <Link to={active.domainPath} style={{ color: 'var(--link-color)', fontWeight: 600, textDecoration: 'none' }}>
                {active.domain} 도메인 보기 →
              </Link>
            </p>
          </Card>
        </div>

        {/* 사이드 목차 */}
        <div className="domain-page-toc sticky-toc-hidden-mobile">
          <div className="toc-sidebar">
            <h3 className="toc-title">대표 사례</h3>
            <nav>
              {PETORY_CASES.map((c) => (
                <div
                  key={c.id}
                  role="button"
                  tabIndex={0}
                  className={`toc-item ${c.id === active.id ? 'active' : ''}`}
                  onClick={() => pick(c.id)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') pick(c.id);
                  }}
                >
                  {c.label}
                </div>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PetoryCasesPage;
