import { Link } from "react-router-dom";
import MermaidDiagram from "../../../../components/Common/MermaidDiagram";
import TableOfContents from "../../../../components/Common/TableOfContents";

// 목록/지도 조회 오버페칭(Over-fetching) 제거 상세 작업 로그
// - 컬럼/연관을 필요 이상으로 조회하던 목록·지도 API를 목록 전용 read model + projection으로 정리
function OverFetchingDetail() {
  const sections = [
    { id: "intro", title: "개요" },
    { id: "model", title: "두 구간 · 두 낭비 모델" },
    { id: "root-cause", title: "근본 원인 재정의" },
    { id: "cases", title: "케이스별 처리" },

    { id: "verify", title: "전/후 실측" },
    { id: "consumer-check", title: "문서 대신 소비처 검증" },
    { id: "summary", title: "요약" },
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

  const flow = `flowchart LR
    DB[("MySQL")] -->|"구간1: SELECT로 끌어옴"| APP["Spring 앱 / JPA"]
    APP -->|"DTO 변환: 안 쓰는 필드 버림"| JSON["JSON 응답"]
    JSON -->|"구간2"| CLIENT["클라이언트"]`;

  return (
    <div className="domain-page-wrapper" style={{ padding: "2rem 0" }}>
      <div
        className="domain-page-container"
        style={{ display: "flex", gap: "2rem", alignItems: "flex-start" }}
      >
        <div className="domain-page-content" style={{ flex: 1 }}>
          <div style={{ marginBottom: "1rem" }}>
            <Link
              to="/domains/refactoring#over-fetching"
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
            목록·지도 오버페칭 제거 — Read Model + Projection
          </h1>
          <p
            style={{
              color: "var(--text-muted)",
              fontSize: "0.9rem",
              marginBottom: "2rem",
              lineHeight: 1.7,
            }}
          >
            목록/지도 API가 화면에서 쓰지 않는{" "}
            <strong style={{ color: "var(--text-color)" }}>
              컬럼·연관 엔티티까지 통째로 조회
            </strong>
            하던 오버페칭을, 목록 전용 경량 read model + projection으로
            제거했습니다. N+1(쿼리 수) 축과 별개로 "한 번에 가져오는 데이터의{" "}
            <strong style={{ color: "var(--text-color)" }}>폭</strong>"을
            다룹니다.
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
                <code>Users</code> 엔티티(28필드)가 가장 큰데,
                Board·CareRequest·Users 목록이 공통으로 이 엔티티를 통째로
                로딩했습니다. 화면은 작성자 <code>username</code> 정도만 쓰는데
                27개 컬럼(+토큰·비밀번호·Lob)을 전부 끌어오고, 일부 경로는 안
                쓰는 연관 컬렉션(<code>socialUsers</code>,{" "}
                <code>applications</code>)까지 <code>@BatchSize</code>{" "}
                지연로딩으로 추가 쿼리를 유발했습니다.
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
                  핵심 성과 (실데이터 전/후 실측)
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
                    • 지도 근처 케어요청: 응답{" "}
                    <strong style={{ color: "var(--text-color)" }}>
                      17,621B → 7,421B
                    </strong>{" "}
                    (58% ↓),{" "}
                    <strong style={{ color: "var(--text-color)" }}>
                      38.3ms → 9.9ms
                    </strong>{" "}
                    (74% ↓)
                  </li>
                  <li>
                    • 관리자 사용자 목록: 응답{" "}
                    <strong style={{ color: "var(--text-color)" }}>
                      8,647B → 5,829B
                    </strong>{" "}
                    (33% ↓), 쿼리{" "}
                    <strong style={{ color: "var(--text-color)" }}>
                      2 → 1
                    </strong>
                  </li>
                  <li>
                    • 게시글 목록: 서버가 끌어오는 폭{" "}
                    <strong style={{ color: "var(--text-color)" }}>−56%</strong>
                    (작성자 27→3컬럼), 응답시간{" "}
                    <strong style={{ color: "var(--text-color)" }}>
                      61ms → 46ms
                    </strong>{" "}
                    (25% ↓)
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* 2. 두 구간 · 두 낭비 모델 */}
          <section
            id="model"
            style={{ marginBottom: "3rem", scrollMarginTop: "2rem" }}
          >
            <h2 style={{ marginBottom: "1rem", color: "var(--text-color)" }}>
              두 구간 · 두 낭비 모델
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
                데이터는 두 구간을 흐르고,{" "}
                <strong style={{ color: "var(--text-color)" }}>
                  오버페칭은 그 두 구간 중 어디서든 생길 수 있습니다.
                </strong>{" "}
                그래서 한 가지 측정만으로는 전체 낭비가 안 잡힙니다.
              </p>
              <MermaidDiagram chart={flow} />
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
                      <th style={th}>구간</th>
                      <th style={th}>낭비 형태</th>
                      <th style={th}>클라이언트까지 가나</th>
                      <th style={th}>측정</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr style={{ borderBottom: "1px solid var(--nav-border)" }}>
                      <td style={{ ...td, color: "var(--text-color)" }}>
                        구간1 (DB→앱)
                      </td>
                      <td style={td}>안 쓰는 컬럼·연관까지 SELECT/로딩</td>
                      <td style={td}>✗ (DTO에서 버려짐)</td>
                      <td style={td}>
                        DB레벨 바이트 ·{" "}
                        <strong style={{ color: "var(--text-color)" }}>
                          응답시간
                        </strong>
                        으로도 나타남
                      </td>
                    </tr>
                    <tr>
                      <td style={{ ...td, color: "var(--text-color)" }}>
                        구간2 (앱→클라이언트)
                      </td>
                      <td style={td}>
                        DTO에 안 쓰는 필드가 있어 응답 JSON이 큼
                      </td>
                      <td style={td}>✓</td>
                      <td style={td}>HTTP 응답 바이트</td>
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
                이유: 오버페칭이 항상 "응답 크기"로 보이는 게 아니다 — 낭비가
                구간1에 있으면 응답 바이트는 그대로고{" "}
                <strong style={{ color: "var(--text-color)" }}>지연시간</strong>
                으로만 새어나온다. 두 레벨을 함께 봐야 전체 지도가 완성됨.
              </p>
            </div>
          </section>

          {/* 3. 근본 원인 재정의 */}
          <section
            id="root-cause"
            style={{ marginBottom: "3rem", scrollMarginTop: "2rem" }}
          >
            <h2 style={{ marginBottom: "1rem", color: "var(--text-color)" }}>
              근본 원인 재정의 — "프로젝션 부재"가 아니라 "read model 미분리"
            </h2>
            <div className="section-card" style={card}>
              <p
                style={{
                  color: "var(--text-secondary)",
                  lineHeight: "1.8",
                  fontSize: "0.9rem",
                  marginBottom: "0.5rem",
                }}
              >
                처음엔 "프로젝트에 DTO Projection 기술이 없어서 항상 엔티티
                전체를 가져온다"고 봤지만, 재검증 결과{" "}
                <strong style={{ color: "var(--text-color)" }}>
                  스칼라 프로젝션이 이미 코드베이스에 존재
                </strong>
                (<code>findRoleByIdx</code>, <code>findIdxByIdString</code>{" "}
                등)했습니다. 진짜 원인은{" "}
                <strong style={{ color: "var(--text-color)" }}>
                  엔티티당 단일 DTO/컨버터를 목록·상세가 공유
                </strong>
                하는 구조였습니다.
              </p>
              <p
                style={{
                  color: "var(--text-secondary)",
                  lineHeight: "1.8",
                  fontSize: "0.9rem",
                  marginBottom: "0.5rem",
                }}
              >
                하나의 <code>CareRequestConverter</code>가 목록·상세·생성·수정
                응답 11곳을 담당하며 목록에서도 항상 <code>applications</code>를
                채우고, <code>UsersConverter</code>는 20곳에서 공유되며 항상{" "}
                <code>socialUsers</code>를 채웠습니다.{" "}
                <strong style={{ color: "var(--text-color)" }}>
                  컨버터가 모든 연관을 항상 채우니, 리포지토리가 목록에서도 그
                  연관을 공급하도록 강제
                </strong>
                됐습니다.
              </p>
              <p
                style={{
                  color: "var(--text-muted)",
                  lineHeight: "1.6",
                  margin: "0.5rem 0 0",
                  fontSize: "0.8rem",
                }}
              >
                해결 원칙: 기존 공유 DTO/컨버터(로그인·상세 경로)는 그대로 두고,{" "}
                <strong style={{ color: "var(--text-color)" }}>
                  목록 전용 경량 read model을 새로 만들어 projection으로만
                  채운다
                </strong>{" "}
                → 회귀 없이 목록만 경량화.
              </p>
            </div>
          </section>

          {/* 4. 케이스별 처리 */}
          <section
            id="cases"
            style={{ marginBottom: "3rem", scrollMarginTop: "2rem" }}
          >
            <h2 style={{ marginBottom: "1rem", color: "var(--text-color)" }}>
              케이스별 처리
            </h2>
            <div
              className="section-card"
              style={{ ...card, marginBottom: "1rem" }}
            >
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
                      <th style={th}>케이스</th>
                      <th style={th}>오버페칭</th>
                      <th style={th}>해결</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr style={{ borderBottom: "1px solid var(--nav-border)" }}>
                      <td style={{ ...td, color: "var(--text-color)" }}>
                        PetCoinTransaction
                      </td>
                      <td style={td}>
                        파라미터로 이미 받은 <code>user</code>를{" "}
                        <code>@EntityGraph</code>로 다시 즉시 로딩(컨버터는{" "}
                        <code>getIdx()</code>만 사용)
                      </td>
                      <td style={good}>
                        어노테이션 한 줄 제거 (projection 불필요)
                      </td>
                    </tr>
                    <tr style={{ borderBottom: "1px solid var(--nav-border)" }}>
                      <td style={{ ...td, color: "var(--text-color)" }}>
                        Users(관리자)
                      </td>
                      <td style={td}>
                        27컬럼 전체 + <code>socialUsers</code> 배치(2쿼리)
                      </td>
                      <td style={good}>
                        <code>AdminUserListDTO</code>(12필드) JPQL 생성자
                        projection, 단일 쿼리
                      </td>
                    </tr>
                    <tr style={{ borderBottom: "1px solid var(--nav-border)" }}>
                      <td style={{ ...td, color: "var(--text-color)" }}>
                        Board
                      </td>
                      <td style={td}>
                        목록마다 <code>JOIN FETCH</code>로 작성자 27컬럼 전체
                      </td>
                      <td style={good}>
                        <code>BoardListItemDTO</code> projection (작성자
                        27→3컬럼)
                      </td>
                    </tr>
                    <tr>
                      <td style={{ ...td, color: "var(--text-color)" }}>
                        CareRequest(지도)
                      </td>
                      <td style={td}>
                        중첩 <code>PetDTO</code>(파일조회) +{" "}
                        <code>applications</code> 배치 + 작성자 전체
                      </td>
                      <td style={good}>
                        native 인터페이스 projection{" "}
                        <code>CareRequestListView</code>(14컬럼)
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="section-card" style={card}>
              <h3 style={{ marginBottom: "1rem", color: "var(--text-color)" }}>
                예시 — Board 목록 projection (AS-IS → TO-BE)
              </h3>
              <p
                style={{
                  color: "var(--text-secondary)",
                  lineHeight: "1.8",
                  marginBottom: "0.5rem",
                  fontSize: "0.9rem",
                }}
              >
                <code>JOIN FETCH b.user</code>로 작성자 전체를 로딩하던 목록
                쿼리를, 화면이 쓰는 3컬럼만 SELECT 하는 생성자 표현식으로 교체.
                리액션·첨부는 서비스가 배치로 사후 주입하므로 projection에는
                담지 않습니다.
              </p>
              <pre style={pre}>
                {`@Query("SELECT new ...BoardListItemDTO(" +
       "  b.idx, b.title, b.content, b.category, b.status, b.createdAt, " +
       "  b.isDeleted, b.deletedAt, b.commentCount, b.likeCount, b.dislikeCount, " +
       "  b.viewCount, b.lastReactionAt, " +
       "  u.idx, u.username, u.location) " +   // 작성자 27컬럼 → 3컬럼
       "FROM Board b JOIN b.user u " +
       "WHERE b.isDeleted = false AND u.isDeleted = false AND u.status = 'ACTIVE' " +
       "ORDER BY b.createdAt DESC")
Page<BoardListItemDTO> findBoardListItems(Pageable pageable);`}
              </pre>
            </div>
          </section>

          {/* 5. 전/후 실측 */}
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
              통제 실험 — 동일 DB·JWT·요청·포트,{" "}
              <strong style={{ color: "var(--text-color)" }}>
                유일 변수 = git stash로 토글한 리팩토링 코드
              </strong>
              . BEFORE(리팩토링 전) 앱 기동 후 측정 → stash pop으로 AFTER 적용
              후 동일 측정.
            </p>

            <div
              className="section-card"
              style={{ ...card, marginBottom: "1rem" }}
            >
              <h3 style={{ marginBottom: "1rem", color: "var(--text-color)" }}>
                DB레벨 — 서버가 끌어오는 폭 (구간1)
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
                      <th style={th}>케이스</th>
                      <th style={th}>개선 전</th>
                      <th style={th}>개선 후</th>
                      <th style={th}>개선율</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr style={{ borderBottom: "1px solid var(--nav-border)" }}>
                      <td style={td}>Board 행 페이로드(20행)</td>
                      <td style={td}>7,698 B</td>
                      <td style={good}>3,386 B</td>
                      <td style={good}>56% ↓</td>
                    </tr>
                    <tr style={{ borderBottom: "1px solid var(--nav-border)" }}>
                      <td style={td}>└ 작성자 컬럼만 (27→3)</td>
                      <td style={td}>5,065 B</td>
                      <td style={good}>753 B</td>
                      <td style={good}>85% ↓</td>
                    </tr>
                    <tr>
                      <td style={td}>Users 관리자 컬럼(27→12)</td>
                      <td style={td}>3,622 B</td>
                      <td style={good}>2,403 B</td>
                      <td style={good}>33.7% ↓</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div
              className="section-card"
              style={{ ...card, marginBottom: "1rem" }}
            >
              <h3 style={{ marginBottom: "1rem", color: "var(--text-color)" }}>
                HTTP레벨 — 엔드포인트 응답 (구간1+2)
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
                      <th style={th}>엔드포인트</th>
                      <th style={th}>응답 바이트 (전→후)</th>
                      <th style={th}>응답시간 (전→후)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr style={{ borderBottom: "1px solid var(--nav-border)" }}>
                      <td style={td}>GET /api/boards</td>
                      <td style={td}>
                        9,351 → 9,351 B{" "}
                        <strong style={{ color: "var(--text-color)" }}>
                          (0%)
                        </strong>
                      </td>
                      <td style={good}>61.3 → 46.0 ms (25% ↓)</td>
                    </tr>
                    <tr style={{ borderBottom: "1px solid var(--nav-border)" }}>
                      <td style={td}>GET /api/admin/users/paging</td>
                      <td style={good}>8,647 → 5,829 B (33% ↓)</td>
                      <td style={good}>30.2 → 25.8 ms (15% ↓)</td>
                    </tr>
                    <tr>
                      <td style={td}>GET /api/care-requests/nearby</td>
                      <td style={good}>17,621 → 7,421 B (58% ↓)</td>
                      <td style={good}>38.3 → 9.9 ms (74% ↓)</td>
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
                <strong style={{ color: "var(--text-color)" }}>
                  Board는 응답 바이트가 그대로(0%)다.
                </strong>{" "}
                낭비가 구간1(DB→앱)에만 있어 응답 DTO가 불변 → 클라이언트로 가는
                바이트는 원래부터 3필드뿐이고, 개선은{" "}
                <strong style={{ color: "var(--text-color)" }}>
                  응답시간(−25%)
                </strong>
                으로 나타난다. HTTP 바이트만 봤다면 "개선 0%"라고 잘못 결론 냈을
                것 — 그래서 DB레벨 측정이 필요하다.
              </p>
              <p
                style={{
                  color: "var(--text-muted)",
                  lineHeight: "1.6",
                  margin: "0.4rem 0 0",
                  fontSize: "0.8rem",
                }}
              >
                측정 한계: localhost 왕복이라 응답시간은 상대 개선폭 지표. care
                nearby는 좌표+OPEN 데이터가 부족해 20건 시드 후 측정·즉시
                삭제(합성 데이터, 전/후 비율로 해석).
              </p>
            </div>
          </section>

          {/* 6. 문서 대신 소비처 검증 */}
          <section
            id="consumer-check"
            style={{ marginBottom: "3rem", scrollMarginTop: "2rem" }}
          >
            <h2 style={{ marginBottom: "1rem", color: "var(--text-color)" }}>
              문서(계획)를 그대로 믿지 않고 소비처를 전수 검증
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
                착수 전 검토 문서의 계획을 그대로 실행하지 않고, 프론트
                화면·모달·지도 레이어가{" "}
                <strong style={{ color: "var(--text-color)" }}>
                  실제로 읽는 필드
                </strong>
                를 전수 확인했습니다. 그 결과 계획 두 곳을 바로잡았습니다.
              </p>
              <ul
                style={{
                  listStyle: "none",
                  padding: 0,
                  color: "var(--text-secondary)",
                  lineHeight: "1.9",
                  fontSize: "0.9rem",
                }}
              >
                <li>
                  •{" "}
                  <strong style={{ color: "var(--text-color)" }}>
                    Users는 9필드가 아니라 12필드
                  </strong>
                  : 목록 표는 9필드만 쓰지만, 목록 행 객체가{" "}
                  <strong style={{ color: "var(--text-color)" }}>
                    상태관리 모달로 재사용
                  </strong>
                  되며 <code>status·warningCount·suspendedUntil</code>을 폼
                  초기값으로 읽었다. 9필드로 줄였다면 모달이 실제값 대신
                  기본값을 보여주는 회귀가 발생.
                </li>
                <li
                  style={{
                    color: "var(--text-muted)",
                    fontSize: "0.8rem",
                    marginBottom: "0.5rem",
                  }}
                >
                  &nbsp;&nbsp;이유: "화면이 쓰는 필드"는 목록 렌더만이 아니라,
                  그 데이터를 재사용하는 모달까지 포함해서 봐야 한다.
                </li>
                <li>
                  •{" "}
                  <strong style={{ color: "var(--text-color)" }}>
                    CareRequest는 대상 엔드포인트 자체가 틀렸다
                  </strong>
                  : 문서가 지목한 페이징 <code>GET /api/care-requests</code>는
                  프론트 소비처가 전혀 없는 死엔드포인트였고, 실제 핫패스는
                  지도의 <code>/nearby</code>(native 쿼리)였다. "실제 낭비를
                  줄인다"는 목표에 맞춰 최적화 대상을 지도 경로로 바로잡음.
                </li>
                <li
                  style={{
                    color: "var(--text-muted)",
                    fontSize: "0.8rem",
                    marginBottom: "0.5rem",
                  }}
                >
                  &nbsp;&nbsp;덤: 프론트가 읽던 평면 <code>raw.petName</code>과
                  DTO의 중첩 <code>pet.name</code> 불일치도 projection이{" "}
                  <code>petName</code>을 평면 제공하며 해소.
                </li>
              </ul>
            </div>
          </section>

          {/* 7. 요약 */}
          <section
            id="summary"
            style={{ marginBottom: "3rem", scrollMarginTop: "2rem" }}
          >
            <h2 style={{ marginBottom: "1rem", color: "var(--text-color)" }}>
              요약
            </h2>
            <div className="section-card" style={card}>
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
                    <th style={th}>케이스</th>
                    <th style={th}>기법</th>
                    <th style={th}>효과</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ borderBottom: "1px solid var(--nav-border)" }}>
                    <td style={td}>PetCoinTransaction</td>
                    <td style={td}>@EntityGraph 제거</td>
                    <td style={td}>불필요한 user 재로딩 제거</td>
                  </tr>
                  <tr style={{ borderBottom: "1px solid var(--nav-border)" }}>
                    <td style={td}>Users(관리자)</td>
                    <td style={td}>JPQL 생성자 projection(12필드)</td>
                    <td style={td}>
                      27컬럼+배치(2쿼리) → 12컬럼 1쿼리, 응답 33% ↓
                    </td>
                  </tr>
                  <tr style={{ borderBottom: "1px solid var(--nav-border)" }}>
                    <td style={td}>Board</td>
                    <td style={td}>JPQL 생성자 projection</td>
                    <td style={td}>끌어오는 폭 56% ↓, 응답시간 25% ↓</td>
                  </tr>
                  <tr>
                    <td style={td}>CareRequest(지도)</td>
                    <td style={td}>native 인터페이스 projection(14필드)</td>
                    <td style={td}>응답 58% ↓, 응답시간 74% ↓</td>
                  </tr>
                </tbody>
              </table>
              <p
                style={{
                  color: "var(--text-muted)",
                  lineHeight: "1.6",
                  margin: "0.75rem 0 0",
                  fontSize: "0.8rem",
                }}
              >
                공유 컨버터(<code>UsersConverter</code> 20곳·
                <code>CareRequestConverter</code> 11곳)와 상세·로그인 경로는
                불변으로 유지해 회귀를 차단하고, 신규 경로마다 테스트(admin
                6·board 3·care 2)로 런타임 검증했습니다.
              </p>
            </div>
          </section>
        </div>
        <TableOfContents sections={sections} />
      </div>
    </div>
  );
}

export default OverFetchingDetail;
