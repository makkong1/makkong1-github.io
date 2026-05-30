import { Link, useSearchParams } from "react-router-dom";
import { useEffect, useMemo } from "react";
import MermaidDiagram from "../../../components/Common/MermaidDiagram";
import {
  PETORY_FLOW_GROUPS,
  resolvePetoryFlowSelection,
} from "./petorySequenceDiagrams";

function Card({ children, style }) {
  return (
    <div
      className="section-card"
      style={{
        padding: "1.5rem",
        backgroundColor: "var(--card-bg)",
        borderRadius: "8px",
        border: "1px solid var(--nav-border)",
        ...style,
      }}
    >
      {children}
    </div>
  );
}

function SubTabBar({ sequences, seq, onPick }) {
  if (sequences.length < 2) return null;

  return (
    <div
      role="tablist"
      aria-label="시퀀스 종류 선택"
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "0.45rem",
        marginBottom: "0.85rem",
      }}
    >
      {sequences.map(({ seq: sid, pillLabel }) => {
        const selected = seq === sid;
        return (
          <button
            key={sid}
            type="button"
            role="tab"
            aria-selected={selected}
            onClick={() => onPick(sid)}
            style={{
              cursor: "pointer",
              padding: "0.35rem 0.85rem",
              borderRadius: "999px",
              fontSize: "0.82rem",
              fontWeight: 600,
              border: selected
                ? "1px solid var(--link-color)"
                : "1px solid var(--nav-border)",
              backgroundColor: selected ? "var(--bg-color)" : "transparent",
              color: selected ? "var(--link-color)" : "var(--text-color)",
            }}
          >
            {pillLabel}
          </button>
        );
      })}
    </div>
  );
}

function PetoryFlowsPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  const { group, seq, variant } = useMemo(
    () => resolvePetoryFlowSelection(searchParams),
    [searchParams],
  );

  const setDomainTab = (tab) => {
    const next = PETORY_FLOW_GROUPS.find((g) => g.tab === tab);
    if (!next) return;
    setSearchParams({ tab, seq: next.defaultSeq });
  };

  const setSubSeq = (nextSeq) => {
    setSearchParams({ tab: group.tab, seq: nextSeq });
  };

  const sequencesWithPills = group.sequences.filter((s) => s.pillLabel);

  const scrollToDiagram = () => {
    requestAnimationFrame(() => {
      document
        .getElementById("flow-diagram-anchor")
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  };

  const scrollIntro = () => {
    requestAnimationFrame(() => {
      document
        .getElementById("intro")
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  };

  useEffect(() => {
    if (!searchParams.toString()) return;
    scrollToDiagram();
  }, [group.tab, seq, searchParams]);

  return (
    <div className="domain-page-wrapper" style={{ padding: "2rem 0" }}>
      <div
        className="domain-page-container"
        style={{ display: "flex", gap: "2rem", alignItems: "flex-start" }}
      >
        <div className="domain-page-content" style={{ flex: 1 }}>
          <h1 style={{ marginBottom: "0.5rem", color: "var(--text-color)" }}>
            Petory 통합 데이터 흐름
          </h1>
          <p
            style={{
              color: "var(--text-secondary)",
              lineHeight: "1.8",
              marginBottom: "1rem",
              fontSize: "0.95rem",
            }}
          >
            시퀀스 정본은{" "}
            <code
              style={{
                padding: "0.1rem 0.35rem",
                borderRadius: "4px",
                fontSize: "0.82em",
                backgroundColor: "var(--bg-color)",
              }}
            >
              petorySequenceDiagrams.js
            </code>{" "}
            한 파일입니다. 상단 도메인 탭으로 큰 축을 고르고, Care·Missing
            Pet·Meetup처럼 플로우가 갈라지면 아래 pill로 전환합니다. URL{" "}
            <code style={{ fontSize: "0.82em" }}>?tab=&amp;seq=</code>로
            깊링크합니다.
          </p>
          <p style={{ marginBottom: "1.5rem", fontSize: "0.9rem" }}>
            <Link
              to="/portfolio/petory"
              style={{ color: "var(--link-color)", textDecoration: "none" }}
            >
              ← Petory 프로젝트 소개
            </Link>
          </p>

          <section
            id="intro"
            style={{ marginBottom: "2rem", scrollMarginTop: "2rem" }}
          >
            <Card>
              <h2
                style={{
                  margin: "0 0 0.5rem",
                  color: "var(--text-color)",
                  fontSize: "1rem",
                }}
              >
                개요
              </h2>
              <p
                style={{
                  color: "var(--text-secondary)",
                  fontSize: "0.88rem",
                  lineHeight: "1.75",
                  margin: 0,
                }}
              >
                도메인별 기술 결정과 표는 각 도메인 V2 페이지에 두고, 여기에서는
                시퀀스만 한 화면에 묶었습니다. Recommendation은 Board·Care·
                Location 연계(Signal)와 추천 카드 pill로 나뉩니다. Chat 탭에서는 Care·Missing
                Pet·Meetup 연계축별로 같은 인프라 패턴을 골라 볼 수 있습니다.
              </p>
            </Card>
          </section>

          <div
            id="flow-diagram-anchor"
            style={{ scrollMarginTop: "5rem", marginBottom: "1rem" }}
          >
            <Card>
              <h2
                style={{
                  margin: "0 0 0.75rem",
                  color: "var(--text-color)",
                  fontSize: "1rem",
                  fontWeight: 700,
                }}
              >
                도메인 선택
              </h2>
              <div
                role="tablist"
                aria-label="도메인별 데이터 흐름"
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "0.45rem",
                  marginBottom: "0.75rem",
                }}
              >
                {PETORY_FLOW_GROUPS.map(({ tab, tocLabel }) => {
                  const selected = group.tab === tab;
                  return (
                    <button
                      key={tab}
                      type="button"
                      role="tab"
                      aria-selected={selected}
                      onClick={() => setDomainTab(tab)}
                      style={{
                        cursor: "pointer",
                        padding: "0.35rem 0.85rem",
                        borderRadius: "999px",
                        fontSize: "0.82rem",
                        fontWeight: 600,
                        border: selected
                          ? "1px solid var(--link-color)"
                          : "1px solid var(--nav-border)",
                        backgroundColor: selected
                          ? "var(--bg-color)"
                          : "transparent",
                        color: selected
                          ? "var(--link-color)"
                          : "var(--text-color)",
                      }}
                    >
                      {tocLabel}
                    </button>
                  );
                })}
              </div>

              <SubTabBar
                sequences={sequencesWithPills}
                seq={seq}
                onPick={setSubSeq}
              />

              <h3
                style={{
                  margin: "0 0 0.65rem",
                  color: "var(--text-color)",
                  fontSize: "0.95rem",
                  fontWeight: 600,
                }}
              >
                {variant.heading}
              </h3>
              <MermaidDiagram
                key={`${group.tab}-${seq}-${variant.chart.slice(0, 48)}`}
                chart={variant.chart}
              />
            </Card>
          </div>
        </div>

        <div className="domain-page-toc sticky-toc-hidden-mobile">
          <div className="toc-sidebar">
            <h3 className="toc-title">목차</h3>
            <nav>
              <div
                role="button"
                tabIndex={0}
                className="toc-item"
                onClick={scrollIntro}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") scrollIntro();
                }}
              >
                개요
              </div>
              {PETORY_FLOW_GROUPS.map(({ tab, tocLabel }) => (
                <div
                  key={tab}
                  role="button"
                  tabIndex={0}
                  className={`toc-item ${group.tab === tab ? "active" : ""}`}
                  onClick={() => {
                    setDomainTab(tab);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") setDomainTab(tab);
                  }}
                >
                  {tocLabel}
                </div>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PetoryFlowsPage;
