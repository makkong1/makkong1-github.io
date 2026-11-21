import { useSearchParams } from 'react-router-dom';
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

function StrategiesTable({ rows, headers = ['도메인', '전략', '왜'] }) {
  const th = { padding: '0.5rem 0.75rem', textAlign: 'left', color: 'var(--text-color)', fontSize: '0.85rem' };
  const td = { padding: '0.5rem 0.75rem', fontSize: '0.88rem', verticalAlign: 'top' };
  return (
    <div style={{ overflowX: 'auto', margin: '1rem 0 0' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', color: 'var(--text-secondary)' }}>
        <thead>
          <tr style={{ borderBottom: '1px solid var(--nav-border)' }}>
            {headers.map((h) => (
              <th key={h} style={th}>{h}</th>
            ))}
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

function Steps({ rows }) {
  return (
    <div style={{ margin: '0 0 1.4rem' }}>
      {rows.map(({ tag, title, paras }) => (
        <div
          key={tag}
          style={{
            borderLeft: '2px solid var(--link-color)',
            padding: '0.1rem 0 0.1rem 0.9rem',
            margin: '0 0 1.2rem',
          }}
        >
          <p style={{ margin: '0 0 0.45rem', fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-color)' }}>
            <span style={{ color: 'var(--link-color)', marginRight: '0.4rem' }}>{tag}</span>
            {title}
          </p>
          {paras.map((text) => (
            <p key={text} style={{ margin: '0 0 0.5rem', color: 'var(--text-secondary)', lineHeight: '1.8', fontSize: '0.91rem' }}>
              {text}
            </p>
          ))}
        </div>
      ))}
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
          <h1 style={{ marginBottom: '0.5rem', color: 'var(--text-color)' }}>대표 사례</h1>
          <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', marginBottom: '1.25rem', fontSize: '0.95rem' }}>
            측정 방식 1건 + 고친 사례 6건. 칩을 눌러 전환합니다.
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
                marginBottom: '0.75rem',
              }}
            >
              {active.domain}
            </span>

            {/* 헤드라인 = [무엇을 어떻게] + [결과 수치] */}
            <h2 style={{ margin: '0 0 1rem', color: 'var(--text-color)', fontSize: '1.35rem', lineHeight: '1.45' }}>
              {active.headline}
            </h2>

            {active.steps && <Steps rows={active.steps} />}

            {active.paras?.map((text) => (
              <p
                key={text}
                style={{ margin: '0 0 0.7rem', color: 'var(--text-secondary)', lineHeight: '1.85', fontSize: '0.93rem' }}
              >
                {text}
              </p>
            ))}

            {active.bulletsTitle && (
              <p style={{ margin: '0 0 0.5rem', color: 'var(--text-color)', fontWeight: 700, fontSize: '0.95rem' }}>
                {active.bulletsTitle}
              </p>
            )}

            {active.bullets && (
            <ul style={{ margin: 0, paddingLeft: '1.1rem', color: 'var(--text-secondary)', lineHeight: '1.8', fontSize: '0.93rem' }}>
              {active.bullets.map((b) => (
                <li key={b} style={{ marginBottom: '0.45rem' }}>{b}</li>
              ))}
            </ul>
            )}

            {active.strategies && <StrategiesTable rows={active.strategies} headers={active.strategyHeaders} />}

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
                  margin: '1rem 0 0',
                }}
              >
                {active.code}
              </pre>
            )}

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
