import { Link } from "react-router-dom";
import MermaidDiagram from "../../../../components/Common/MermaidDiagram";
import TableOfContents from "../../../../components/Common/TableOfContents";

// board 깊은 페이지 페이징 — 판단 여정 상세 로그
// - OFFSET의 O(offset) 비용 발견 → 대안 3개 검토 → 공유 PageNavigation과의 일관성 판단
//   → 지연 조인 + author_visible 비정규화 채택 → 트리거 동기화 → 전/후 실측
function DeepPagePaginationDetail() {
  const sections = [
    { id: "intro", title: "개요" },
    { id: "why-slow", title: "왜 느린가 — 만들고 버리기" },
    { id: "alternatives", title: "대안 3개 검토" },
    { id: "shared-component", title: "공유 컴포넌트와 일관성 판단" },
    { id: "trap", title: "함정과 트리거" },
    { id: "verify", title: "전/후 실측" },
    { id: "summary", title: "요약과 남은 것" },
  ];

  const card = {
    padding: "1.5rem",
    backgroundColor: "var(--card-bg)",
    borderRadius: "8px",
    border: "1px solid var(--nav-border)",
  };
  const pre = {
    padding: "1rem",
    backgroundColor: "var(--bg-color)",
    borderRadius: "6px",
    overflow: "auto",
    fontSize: "0.8rem",
    color: "var(--text-secondary)",
  };
  const th = {
    padding: "0.75rem",
    textAlign: "left",
    color: "var(--text-color)",
    fontWeight: "bold",
  };
  const td = { padding: "0.75rem" };
  const good = { ...td, color: "var(--link-color)", fontWeight: "bold" };

  const offsetFlow = `flowchart LR
    Q["SELECT ... ORDER BY created_at DESC\nLIMIT 20 OFFSET 49980"] --> M["인덱스로 49,980행을\n정렬 순서대로 만든다"]
    M --> D["앞 49,980행은\n그대로 버린다"]
    D --> R["20행만 반환"]`;

  const lazyJoinFlow = `flowchart LR
    S1["1단계 (native)\nboard 커버링 인덱스만 스캔\nis_deleted·author_visible·created_at"] -->|"살아남은 idx 20개"| S2["2단계 (JPQL)\nb.idx IN (:ids) JOIN b.user\n20건만 작성자 채움"]
    S2 --> R["PageImpl 조립"]
    C["COUNT: board 단일 테이블\nusers 조인 없음"] -->|"병행"| R`;

  return (
    <div className="domain-page-wrapper" style={{ padding: "2rem 0" }}>
      <div
        className="domain-page-container"
        style={{ display: "flex", gap: "2rem", alignItems: "flex-start" }}
      >
        <div className="domain-page-content" style={{ flex: 1 }}>
          <div style={{ marginBottom: "1rem" }}>
            <Link
              to="/domains/refactoring#deep-page"
              style={{
                color: "var(--link-color)",
                textDecoration: "none",
                fontSize: "0.9rem",
              }}
            >
              ← 리팩토링 대표 사례로 돌아가기
            </Link>
          </div>
          <h1 style={{ marginBottom: "0.5rem", color: "var(--text-color)" }}>
            board 깊은 페이지 페이징 — 지연 조인 + author_visible 비정규화
          </h1>
          <p
            style={{
              color: "var(--text-muted)",
              fontSize: "0.9rem",
              marginBottom: "2rem",
              lineHeight: 1.7,
            }}
          >
            게시글 목록은 OFFSET 페이징이고, 공유 페이징 컴포넌트에는{" "}
            <strong style={{ color: "var(--text-color)" }}>
              "맨 뒤" 버튼
            </strong>
            이 있습니다. 사용자가 실제로 그 버튼을 누르면 OFFSET 49,980에
            도달합니다. 이 페이지는 "느리다"를 확인한 다음이 아니라,{" "}
            <strong style={{ color: "var(--text-color)" }}>
              무엇으로 고칠지 판단한 과정
            </strong>
            을 기록합니다 — 키셋이 이론적으로 가장 빠른데도 왜 채택하지
            않았는지가 핵심입니다.
          </p>

          {/* 1. 개요 */}
          <section
            id="intro"
            style={{ marginBottom: "3rem", scrollMarginTop: "2rem" }}
          >
            <h2 style={{ marginBottom: "1rem", color: "var(--text-color)" }}>
              개요
            </h2>
            <div className="section-card" style={card}>
              <p
                style={{
                  lineHeight: "1.8",
                  color: "var(--text-secondary)",
                  marginBottom: "1rem",
                }}
              >
                전체 쿼리 감사(케이스 08)에서 board 깊은 페이지를 "측정하지
                못한 범위"로 남겼습니다. 인덱스는 이미 정상적으로 타는데도
                OFFSET이 앞의 5만 행을 만들어 버리는 구조라 인덱스만으로는
                풀리지 않고, 키셋 페이징으로 바꾸면 되지만 페이지 번호 이동을
                포기해야 해서{" "}
                <strong style={{ color: "var(--text-color)" }}>
                  성능 판단만으로 정할 수 없다
                </strong>
                고 적어뒀던 부분입니다. 이 케이스는 그 판단을 마저 내린
                기록입니다.
              </p>
              <div
                style={{
                  padding: "1rem",
                  backgroundColor: "var(--bg-color)",
                  borderRadius: "6px",
                  border: "1px solid var(--nav-border)",
                }}
              >
                <h3
                  style={{
                    marginBottom: "0.75rem",
                    color: "var(--text-color)",
                    fontSize: "1rem",
                  }}
                >
                  핵심 성과 (실데이터 전/후 실측, board 50,000행)
                </h3>
                <ul
                  style={{
                    listStyle: "none",
                    padding: 0,
                    color: "var(--text-secondary)",
                    lineHeight: "1.8",
                    fontSize: "0.9rem",
                  }}
                >
                  <li>
                    • 깊은 페이지 스캔(OFFSET 49,980): 구코드 형태(
                    <code>board JOIN users</code>){" "}
                    <strong style={{ color: "var(--text-color)" }}>
                      133ms → 24~32ms
                    </strong>{" "}
                    (약 4~5배)
                  </li>
                  <li>
                    • COUNT: users 조인{" "}
                    <strong style={{ color: "var(--text-color)" }}>
                      22~32ms → 7~25ms
                    </strong>{" "}
                    (단일 테이블), 조인 테이블 수 2 → 1
                  </li>
                  <li>
                    • 너덜너덜 증명: 비정규화 없이 순진하게 skip 하면 전체
                    2,500페이지 중{" "}
                    <strong style={{ color: "var(--text-color)" }}>
                      596페이지(23.8%)
                    </strong>
                    에 숨김 대상 글이 섞임 — 비정규화로 이 문제 자체가 사라짐
                  </li>
                  <li>
                    • k6 종단(30초·20VU, 얕은/중간/맨뒤 혼합): 15,555 요청{" "}
                    <strong style={{ color: "var(--text-color)" }}>
                      100% 200, p95 63.91ms
                    </strong>{" "}
                    — 페이지 깊이와 무관하게 평탄
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* 2. 왜 느린가 */}
          <section
            id="why-slow"
            style={{ marginBottom: "3rem", scrollMarginTop: "2rem" }}
          >
            <h2 style={{ marginBottom: "1rem", color: "var(--text-color)" }}>
              왜 느린가 — OFFSET은 "건너뛰기"가 아니라 "만들고 버리기"
            </h2>
            <div
              className="section-card"
              style={{ ...card, marginBottom: "1rem" }}
            >
              <p
                style={{
                  color: "var(--text-secondary)",
                  lineHeight: "1.8",
                  marginBottom: "1rem",
                  fontSize: "0.9rem",
                }}
              >
                OFFSET 49,980번째 행을 알려면 정렬 순서대로 앞의 49,980개를
                실제로 만들어야 합니다. 비용은{" "}
                <strong style={{ color: "var(--text-color)" }}>
                  O(offset)
                </strong>
                로 오프셋에 선형 비례합니다.
              </p>
              <MermaidDiagram chart={offsetFlow} />
              <div style={{ overflowX: "auto", marginTop: "1rem" }}>
                <table
                  style={{
                    width: "100%",
                    borderCollapse: "collapse",
                    color: "var(--text-secondary)",
                    fontSize: "0.85rem",
                  }}
                >
                  <thead>
                    <tr style={{ borderBottom: "2px solid var(--nav-border)" }}>
                      <th style={th}>OFFSET (페이지)</th>
                      <th style={th}>실행시간</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr style={{ borderBottom: "1px solid var(--nav-border)" }}>
                      <td style={td}>0 (1페이지)</td>
                      <td style={td}>1.5ms</td>
                    </tr>
                    <tr style={{ borderBottom: "1px solid var(--nav-border)" }}>
                      <td style={td}>10,000 (500페이지)</td>
                      <td style={td}>51ms</td>
                    </tr>
                    <tr style={{ borderBottom: "1px solid var(--nav-border)" }}>
                      <td style={td}>25,000</td>
                      <td style={td}>68ms</td>
                    </tr>
                    <tr style={{ borderBottom: "1px solid var(--nav-border)" }}>
                      <td style={td}>40,000</td>
                      <td style={td}>87ms</td>
                    </tr>
                    <tr>
                      <td style={{ ...td, color: "var(--text-color)" }}>
                        49,980 (맨 뒤, 2,500페이지)
                      </td>
                      <td style={{ ...td, color: "var(--text-color)" }}>
                        114~147ms
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p
                style={{
                  color: "var(--text-muted)",
                  lineHeight: "1.6",
                  margin: "0.75rem 0 0",
                  fontSize: "0.8rem",
                }}
              >
                원인은 두 겹입니다. ① OFFSET 자체가 앞부분을 만들고 버리는
                구조라는 것. ② 목록이 <code>board JOIN users</code> 후{" "}
                <code>u.is_deleted=0 AND u.status='ACTIVE'</code>로 거르는데,
                이 필터가{" "}
                <strong style={{ color: "var(--text-color)" }}>
                  조인 건너편(users)에 있어서
                </strong>{" "}
                board 인덱스만으로는 "몇 번째가 offset 49,980인지"를 셀 수
                없다는 것 — 그래서 board 인덱스로 5만 행을 훑는 매 행마다{" "}
                <code>users</code> PK 조회가 5만 번 딸려 붙습니다(구코드 재현{" "}
                <strong style={{ color: "var(--text-color)" }}>133ms</strong>
                ). 곁가지로 자동 COUNT도 같은 이유로 users를 조인합니다.
              </p>
            </div>
          </section>

          {/* 3. 대안 3개 검토 */}
          <section
            id="alternatives"
            style={{ marginBottom: "3rem", scrollMarginTop: "2rem" }}
          >
            <h2 style={{ marginBottom: "1rem", color: "var(--text-color)" }}>
              대안 3개 검토
            </h2>
            <div className="section-card" style={card}>
              <div style={{ overflowX: "auto" }}>
                <table
                  style={{
                    width: "100%",
                    borderCollapse: "collapse",
                    color: "var(--text-secondary)",
                    fontSize: "0.85rem",
                  }}
                >
                  <thead>
                    <tr style={{ borderBottom: "2px solid var(--nav-border)" }}>
                      <th style={th}>대안</th>
                      <th style={th}>성능</th>
                      <th style={th}>대가</th>
                      <th style={th}>판단</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr style={{ borderBottom: "1px solid var(--nav-border)" }}>
                      <td style={{ ...td, color: "var(--text-color)" }}>
                        키셋 페이징
                      </td>
                      <td style={td}>O(1), COUNT까지 소멸</td>
                      <td style={td}>
                        페이지 번호·점프·"몇 건 중 몇 번째" UI를 포기해야
                        (무한스크롤/커서만 가능)
                      </td>
                      <td style={td}>
                        기각 — 이유는 아래 4번(공유 컴포넌트)
                      </td>
                    </tr>
                    <tr style={{ borderBottom: "1px solid var(--nav-border)" }}>
                      <td style={{ ...td, color: "var(--text-color)" }}>
                        아무것도 안 함
                      </td>
                      <td style={td}>변화 없음</td>
                      <td style={td}>
                        비싼 구간은 사람이 실제로 잘 안 가는 깊은 페이지뿐 —
                        단 "맨 뒤" 버튼이 유일한 실사용 트리거
                      </td>
                      <td style={td}>
                        후보였으나 COUNT까지 함께 고치는 이점을 포기하게 됨
                      </td>
                    </tr>
                    <tr>
                      <td style={{ ...td, color: "var(--text-color)" }}>
                        지연 조인 + author_visible 비정규화
                      </td>
                      <td style={td}>스캔 완화(수십 ms), COUNT 단일 테이블</td>
                      <td style={td}>
                        비정규화 컬럼 + 동기화 트리거 하나 추가
                      </td>
                      <td style={good}>채택</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p
                style={{
                  color: "var(--text-muted)",
                  lineHeight: "1.6",
                  margin: "0.75rem 0 0",
                  fontSize: "0.8rem",
                }}
              >
                셋 중 성능만 보면 키셋이 이깁니다. 채택하지 않은 이유는 이
                프로젝트의 페이징이 board 혼자 쓰는 게 아니라는 점에서
                나옵니다.
              </p>
            </div>
          </section>

          {/* 4. 공유 컴포넌트와 일관성 판단 */}
          <section
            id="shared-component"
            style={{ marginBottom: "3rem", scrollMarginTop: "2rem" }}
          >
            <h2 style={{ marginBottom: "1rem", color: "var(--text-color)" }}>
              결정적 발견 — 앱 전체 페이징이 단일 공유 컴포넌트
            </h2>
            <div className="section-card" style={card}>
              <p
                style={{
                  color: "var(--text-secondary)",
                  lineHeight: "1.8",
                  fontSize: "0.9rem",
                  marginBottom: "0.75rem",
                }}
              >
                <code>components/Common/PageNavigation.js</code> 하나가{" "}
                <strong style={{ color: "var(--text-color)" }}>
                  12개 화면
                </strong>
                (게시판, 신고, 유저·모임·케어요청·실종동물 관리자 목록, 결제
                내역 등)에서 페이징을 담당합니다. props는{" "}
                <code>totalCount</code>, <code>pageSize</code>,{" "}
                <code>onPageChange</code>, <code>showTotal</code>,{" "}
                <code>showEdges</code> — 총 건수를 표시하고, 페이지 번호를
                직접 입력해 점프할 수 있고, "맨 뒤" 버튼으로 마지막 페이지로
                바로 이동합니다.
              </p>
              <p
                style={{
                  color: "var(--text-secondary)",
                  lineHeight: "1.8",
                  fontSize: "0.9rem",
                  marginBottom: "0.75rem",
                }}
              >
                키셋 페이징은{" "}
                <strong style={{ color: "var(--text-color)" }}>
                  이 세 가지(총 건수, 번호 점프, 맨 뒤) 중 어느 것도 원리적으로
                  제공하지 못합니다
                </strong>
                . "다음 커서"만 알 수 있을 뿐, "전체 몇 건 중 몇 번째"라는
                개념 자체가 없습니다. board만 키셋(무한스크롤)으로 바꾸면{" "}
                <strong style={{ color: "var(--text-color)" }}>
                  12개 화면 중 board 하나만 다른 페이징 패러다임
                </strong>
                이 되어 컴포넌트를 분기하거나 board 전용 UI를 새로 만들어야
                합니다.
              </p>
              <p
                style={{
                  color: "var(--text-muted)",
                  lineHeight: "1.6",
                  margin: "0.5rem 0 0",
                  fontSize: "0.8rem",
                }}
              >
                판단: 성능만 보면 키셋이지만, 앱의 페이징 정체성을 board 하나
                때문에 쪼개는 비용이 더 큽니다. 그래서 번호 UI(공유
                컴포넌트)는 그대로 두고, 쿼리 쪽에서 스캔을 완화하는{" "}
                <strong style={{ color: "var(--text-color)" }}>
                  지연 조인
                </strong>
                을 택했습니다.
              </p>
            </div>
          </section>

          {/* 5. 함정과 트리거 */}
          <section
            id="trap"
            style={{ marginBottom: "3rem", scrollMarginTop: "2rem" }}
          >
            <h2 style={{ marginBottom: "1rem", color: "var(--text-color)" }}>
              함정 — 지연 조인만으로는 안 풀린다
            </h2>
            <div
              className="section-card"
              style={{ ...card, marginBottom: "1rem" }}
            >
              <p
                style={{
                  color: "var(--text-secondary)",
                  lineHeight: "1.8",
                  fontSize: "0.9rem",
                  marginBottom: "0.75rem",
                }}
              >
                지연 조인의 1단계는{" "}
                <strong style={{ color: "var(--text-color)" }}>
                  board 컬럼만으로 커버링 인덱스가 되어야
                </strong>{" "}
                의미가 있습니다. 그런데 "보여도 되는 작성자인가" 필터는{" "}
                <code>users.status</code>에 있습니다. board 컬럼만으로 판단할
                방법이 없으면 users를 다시 조인해야 하고, 애초에 지연 조인을
                하는 이유가 없어집니다.
              </p>
              <p
                style={{
                  color: "var(--text-secondary)",
                  lineHeight: "1.8",
                  fontSize: "0.9rem",
                  marginBottom: "0.75rem",
                }}
              >
                더 나쁜 경로도 있었습니다.{" "}
                <code>is_deleted</code>만으로 board를 skip하고 작성자 필터는
                뒤에서(애플리케이션 레벨) 거른다면 — 걸러낸 만큼 그 페이지는
                20건을 못 채우고 비게 됩니다("너덜너덜"). 실측으로 확인한
                결과, 전체 2,500페이지 중{" "}
                <strong style={{ color: "var(--text-color)" }}>
                  596페이지(23.8%)
                </strong>
                에 숨김 대상 글이 하나 이상 섞입니다 — 4분의 1에 가까운
                페이지가 영향권입니다.
              </p>
              <p
                style={{
                  color: "var(--text-secondary)",
                  lineHeight: "1.8",
                  fontSize: "0.9rem",
                  marginBottom: "0",
                }}
              >
                해결은{" "}
                <code>author_visible</code>{" "}
                비정규화입니다 — "미탈퇴 AND status ≠ BANNED"를 board 컬럼에
                저장합니다. <strong style={{ color: "var(--text-color)" }}>
                  정지(SUSPENDED)는 숨기지 않습니다
                </strong>
                . 정지는 일시적인 상태라, care 도메인이 이미 채택한 원칙(정지는
                읽기 필터, 영구정지만 행 변경)과 방향을 맞췄습니다.
              </p>
            </div>

            <div
              className="section-card"
              style={{ ...card, marginBottom: "1rem" }}
            >
              <h3 style={{ marginBottom: "1rem", color: "var(--text-color)" }}>
                동작 변화 — 정직하게: 성능만이 아니라 의미도 바뀌었다
              </h3>
              <p
                style={{
                  color: "var(--text-secondary)",
                  lineHeight: "1.8",
                  fontSize: "0.9rem",
                }}
              >
                구코드는 <code>u.status = 'ACTIVE'</code> 단일 조건이라{" "}
                <strong style={{ color: "var(--text-color)" }}>
                  정지 회원 글까지 실수로 가려버리는 부작용
                </strong>
                이 있었습니다. <code>author_visible</code>은 영구 상태(탈퇴·영구정지)만
                숨기므로, 정지 회원 글이 이제 목록에 보입니다. COUNT 반환값이
                46,000 → 48,000으로 늘어난 것도 이 2,000건(SUSPENDED 400명 ×
                평균 5글) 때문입니다 — 버그가 아니라 의도된 동작 변화입니다.
              </p>
            </div>

            <div className="section-card" style={card}>
              <h3 style={{ marginBottom: "1rem", color: "var(--text-color)" }}>
                동기화 — users AFTER UPDATE 트리거 하나
              </h3>
              <p
                style={{
                  color: "var(--text-secondary)",
                  lineHeight: "1.8",
                  fontSize: "0.9rem",
                  marginBottom: "0.75rem",
                }}
              >
                회원 상태를 바꾸는 경로는 여럿입니다 — 관리자 밴/언밴, 제재
                서비스, 탈퇴, 로그인 재활성화. 이벤트 리스너로 경로마다
                배선하면 하나를 빠뜨리기 쉽습니다. 모두 결국{" "}
                <code>users</code> 행을 UPDATE하므로, 트리거 하나가 모든
                경로를 잡습니다 — 이 저장소가 이미 <code>geo_point</code>{" "}
                비정규화에 쓰던 패턴과 일관됩니다.
              </p>
              <pre style={pre}>
                {`CREATE TRIGGER trg_board_author_visible AFTER UPDATE ON users
FOR EACH ROW
  IF (OLD.is_deleted <> NEW.is_deleted)
     OR ((OLD.status = 'BANNED') <> (NEW.status = 'BANNED')) THEN
    UPDATE board SET author_visible =
      IF(NEW.is_deleted = 0 AND NEW.status <> 'BANNED', 1, 0)
    WHERE user_idx = NEW.idx;
  END IF;

-- 인덱스 (Flyway V6)
ALTER TABLE board ADD INDEX idx_board_visible_created
  (is_deleted, author_visible, created_at DESC);
ALTER TABLE board ADD INDEX idx_board_cat_visible_created
  (category, is_deleted, author_visible, created_at DESC);`}
              </pre>
              <p
                style={{
                  color: "var(--text-muted)",
                  lineHeight: "1.6",
                  margin: "0.75rem 0 0",
                  fontSize: "0.8rem",
                }}
              >
                <code>is_deleted</code> 또는 BANNED 경계가 바뀔 때만 발동
                — <code>last_login_at</code> 갱신 같은 흔한 UPDATE엔 안
                걸립니다. SUSPENDED↔ACTIVE 전환은 BANNED 경계가 안 바뀌므로
                board를 건드리지 않습니다(정지 회원 글이 계속 보이는 이유).
                엔티티는 <code>@Column(updatable = false)</code>로 매핑해
                JPA가 UPDATE 시 트리거가 써둔 값을 되돌리지 못하게
                막았습니다 — 갱신 소유권은 트리거 하나뿐입니다.
              </p>
            </div>
          </section>

          {/* 6. 전/후 실측 */}
          <section
            id="verify"
            style={{ marginBottom: "3rem", scrollMarginTop: "2rem" }}
          >
            <h2 style={{ marginBottom: "1rem", color: "var(--text-color)" }}>
              전/후 실측
            </h2>
            <p
              style={{
                color: "var(--text-muted)",
                fontSize: "0.9rem",
                marginBottom: "1rem",
                lineHeight: 1.7,
              }}
            >
              로컬 <code>petory</code> (board 50,000행, 그중{" "}
              <code>author_visible=0</code> 2,000행 — 밴/탈퇴 회원 글).
              스케줄러는 껐습니다(<code>--petory.scheduling.enabled=false</code>
              ).
            </p>
            <MermaidDiagram chart={lazyJoinFlow} />

            <div
              className="section-card"
              style={{ ...card, margin: "1rem 0" }}
            >
              <h3 style={{ marginBottom: "1rem", color: "var(--text-color)" }}>
                ① 깊은 페이지 스캔 A/B — OFFSET 49,980
              </h3>
              <div style={{ overflowX: "auto" }}>
                <table
                  style={{
                    width: "100%",
                    borderCollapse: "collapse",
                    color: "var(--text-secondary)",
                    fontSize: "0.9rem",
                  }}
                >
                  <thead>
                    <tr style={{ borderBottom: "2px solid var(--nav-border)" }}>
                      <th style={th}>측정</th>
                      <th style={th}>결과</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr style={{ borderBottom: "1px solid var(--nav-border)" }}>
                      <td style={td}>
                        구코드 형태 재현(<code>board JOIN users</code>,
                        nested loop 5만회)
                      </td>
                      <td style={td}>133ms</td>
                    </tr>
                    <tr style={{ borderBottom: "1px solid var(--nav-border)" }}>
                      <td style={td}>
                        A/B — <code>idx_board_visible_created</code> 강제
                        무시(비커버링, 필터 후행)
                      </td>
                      <td style={td}>66~84ms</td>
                    </tr>
                    <tr>
                      <td style={{ ...td, color: "var(--text-color)" }}>
                        지연 조인 + 커버링 인덱스 (수정 후)
                      </td>
                      <td style={good}>24~32ms</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p
                style={{
                  color: "var(--text-muted)",
                  lineHeight: "1.6",
                  margin: "0.75rem 0 0",
                  fontSize: "0.8rem",
                }}
              >
                구코드 대비 약 4~5배, 인덱스만 지운 A/B 대비 약 2.5배 — 인덱스
                유무를 껐다 켜 스캔이 그대로 복귀·소멸하는 것으로 인과를
                확정했습니다.
              </p>
            </div>

            <div
              className="section-card"
              style={{ ...card, marginBottom: "1rem" }}
            >
              <h3 style={{ marginBottom: "1rem", color: "var(--text-color)" }}>
                ② COUNT — 반환값도 함께 바뀐다
              </h3>
              <div style={{ overflowX: "auto" }}>
                <table
                  style={{
                    width: "100%",
                    borderCollapse: "collapse",
                    color: "var(--text-secondary)",
                    fontSize: "0.9rem",
                  }}
                >
                  <thead>
                    <tr style={{ borderBottom: "2px solid var(--nav-border)" }}>
                      <th style={th}></th>
                      <th style={th}>시간</th>
                      <th style={th}>반환값</th>
                      <th style={th}>검사 테이블</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr style={{ borderBottom: "1px solid var(--nav-border)" }}>
                      <td style={td}>수정 전 (users 조인)</td>
                      <td style={td}>22~32ms</td>
                      <td style={td}>46,000</td>
                      <td style={td}>2 (users + board)</td>
                    </tr>
                    <tr>
                      <td style={{ ...td, color: "var(--text-color)" }}>
                        수정 후 (단일 테이블)
                      </td>
                      <td style={good}>7~25ms</td>
                      <td style={good}>48,000</td>
                      <td style={good}>1 (board)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p
                style={{
                  color: "var(--text-muted)",
                  lineHeight: "1.6",
                  margin: "0.75rem 0 0",
                  fontSize: "0.8rem",
                }}
              >
                차이 2,000은 앞서 §5에서 설명한 SUSPENDED 회원 글(400명 × 평균
                5글)입니다 — 성능만이 아니라 의미도 바뀐 것으로 정직하게
                기록합니다.
              </p>
            </div>

            <div
              className="section-card"
              style={{ ...card, marginBottom: "1rem" }}
            >
              <h3 style={{ marginBottom: "1rem", color: "var(--text-color)" }}>
                ③ 너덜너덜 증명 — 비정규화 없이 순진하게 skip하면
              </h3>
              <p
                style={{
                  color: "var(--text-secondary)",
                  lineHeight: "1.8",
                  fontSize: "0.9rem",
                }}
              >
                <code>is_deleted</code>만으로 board를 skip하고 작성자 필터는
                뒤에서 거르는 순진한 지연 조인을{" "}
                <strong style={{ color: "var(--text-color)" }}>
                  전체 2,500페이지
                </strong>
                에 대해 검사했습니다.
              </p>
              <div
                style={{
                  marginTop: "0.75rem",
                  padding: "1rem",
                  backgroundColor: "var(--bg-color)",
                  borderRadius: "6px",
                  border: "1px solid var(--nav-border)",
                  color: "var(--text-secondary)",
                  fontSize: "0.9rem",
                  lineHeight: 1.8,
                }}
              >
                total_pages: 2,500 · total_hidden_rows: 2,000 ·{" "}
                <strong style={{ color: "var(--text-color)" }}>
                  pages_with_leak: 596 (23.8%)
                </strong>
              </div>
              <p
                style={{
                  color: "var(--text-muted)",
                  lineHeight: "1.6",
                  margin: "0.75rem 0 0",
                  fontSize: "0.8rem",
                }}
              >
                전체 페이지의 4분의 1 가까이가 영향권 — 페이지당 평균
                0.8건이지만 몰리는 곳은 한 페이지에 4건까지 섞입니다.{" "}
                <code>author_visible</code> 비정규화는 DB가 처음부터 숨김
                대상을 인덱스에서 제외하므로 이 문제 자체가 사라집니다.
              </p>
            </div>

            <div className="section-card" style={card}>
              <h3 style={{ marginBottom: "1rem", color: "var(--text-color)" }}>
                ④ k6 종단 측정
              </h3>
              <p
                style={{
                  color: "var(--text-secondary)",
                  lineHeight: "1.8",
                  fontSize: "0.9rem",
                  marginBottom: "0.75rem",
                }}
              >
                30초·20VU, 얕은(0)/중간(1000,2000)/맨뒤(2499) 페이지를 무작위로
                섞어 요청.
              </p>
              <pre style={pre}>
                {`checks_succeeded...: 100.00% 15555 out of 15555
✓ 200

http_req_duration: avg=38.51ms min=9.96ms med=36.27ms
                    max=174.85ms p(90)=57.94ms p(95)=63.91ms
http_req_failed..: 0.00%
http_reqs........: 15555   518.04/s`}
              </pre>
              <p
                style={{
                  color: "var(--text-muted)",
                  lineHeight: "1.6",
                  margin: "0.75rem 0 0",
                  fontSize: "0.8rem",
                }}
              >
                15,555건 전부 200, 실패 0건, p95 63.91ms. 페이지가 0이든
                2499(맨뒤)든 같은 분포 안에서 섞여 응답했습니다 — 깊이에 따른
                급격한 열화가 없다는 뜻입니다. 개별 페이지별 분리 측정은 하지
                않았고, ①의 EXPLAIN A/B가 그 인과를 이미 증명했으므로 여기서는
                종단 처리량·지연만 확인했습니다.
              </p>
            </div>
          </section>

          {/* 7. 요약과 남은 것 */}
          <section
            id="summary"
            style={{ marginBottom: "3rem", scrollMarginTop: "2rem" }}
          >
            <h2 style={{ marginBottom: "1rem", color: "var(--text-color)" }}>
              요약과 남은 것
            </h2>
            <div
              className="section-card"
              style={{ ...card, marginBottom: "1rem" }}
            >
              <table
                style={{
                  width: "100%",
                  borderCollapse: "collapse",
                  color: "var(--text-secondary)",
                  fontSize: "0.9rem",
                }}
              >
                <thead>
                  <tr style={{ borderBottom: "1px solid var(--nav-border)" }}>
                    <th style={th}>판단</th>
                    <th style={th}>내용</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ borderBottom: "1px solid var(--nav-border)" }}>
                    <td style={td}>키셋을 기각한 이유</td>
                    <td style={td}>
                      성능은 최고지만 공유 <code>PageNavigation</code>(12개
                      화면)이 총건수·번호점프·맨뒤에 의존 — board만 다른
                      패러다임이 되면 앱의 페이징 정체성이 쪼개짐
                    </td>
                  </tr>
                  <tr style={{ borderBottom: "1px solid var(--nav-border)" }}>
                    <td style={td}>지연 조인을 택한 이유</td>
                    <td style={td}>
                      번호 UI를 유지하면서 스캔을 완화, COUNT까지 함께 고침
                    </td>
                  </tr>
                  <tr>
                    <td style={td}>비정규화가 필요했던 이유</td>
                    <td style={td}>
                      지연 조인 1단계가 커버링이 되려면 필터가 board 컬럼에
                      있어야 함 — 스캔·너덜너덜·COUNT 셋을 한 번에 해결
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="section-card" style={card}>
              <h3 style={{ marginBottom: "1rem", color: "var(--text-color)" }}>
                다른 도메인엔 같은 처방을 안 쓴 이유
              </h3>
              <p
                style={{
                  color: "var(--text-secondary)",
                  lineHeight: "1.8",
                  fontSize: "0.9rem",
                  marginBottom: "0.75rem",
                }}
              >
                board만 실익이 있습니다 — 페이지 번호로 깊이 파고드는 소셜
                피드형 UI이고, 규모(5만 행)에서 offset이 실제로 아픕니다.
                missing_pet·meetup·care는 현재 행 수 규모(수천~1만 대)에서
                체감되지 않아 보류했습니다. 관리자 목록은 "몇 번째 글, 전체 몇
                건"이 업무 요구사항이라 정확한 총계를 유지해야 해서 키셋
                대상이 아니고, chat은 목록 페이징 자체가 해당 없습니다(대화방
                단위).
              </p>
              <p
                style={{
                  color: "var(--text-muted)",
                  lineHeight: "1.6",
                  margin: "0",
                  fontSize: "0.8rem",
                }}
              >
                범위 밖으로 남긴 것: <code>ORDER BY created_at DESC</code>에
                동점(tie-break) 키가 없어 같은 밀리초에 여러 글이 생성되면
                페이지 경계 순서가 안정적이지 않을 수 있습니다(선재 이슈, 이번
                범위 밖). §① 측정치를 범위(24~32ms 등)로 기록한 것도 로컬
                단일 실행 환경이라 버퍼풀 상태에 따라 흔들리기 때문이며, 방향성
                (순서·배율)은 재현할 때마다 일관됐습니다.
              </p>
            </div>
          </section>
        </div>
        <TableOfContents sections={sections} />
      </div>
    </div>
  );
}

export default DeepPagePaginationDetail;
