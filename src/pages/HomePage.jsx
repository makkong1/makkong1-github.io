import { Link } from "react-router-dom";

/**
 * 홈 — URL 로 제출하는 포트폴리오의 첫 화면.
 *
 * About Me 는 제출용 자소서 단축안(docs/interview/이력서/범용/제출용_자소서-단축안_humanized.md)과
 * 같은 본문을 쓴다. 사람인·잡코리아 자소서 칸에 넣는 글과 사이트가 어긋나면 안 된다.
 *
 * "수치를 잰 방법" 4줄과 1인·미배포·Claude Code 고지는 PDF 포트폴리오 표지에 있던 것을 옮겼다.
 * 사이트가 단독 제출물이 되면서 PDF 표지가 지고 있던 역할을 여기가 받는다.
 *
 * 수치는 전부 PDF(petory-포트폴리오-7p.md)와 같은 값이다. 여기서 새로 잰 값은 없다.
 */
function HomePage() {
  return (
    <div className="layout-main">
      {/* 히어로 */}
      <section
        className="project-hero glow-bg"
        style={{ marginBottom: "2.5rem" }}
      >
        <span className="eyebrow">Backend Developer</span>
        <h1>박영범</h1>
        <p className="subtitle">
          문제를 재현하고 측정하며 개선하는 백엔드 개발자
        </p>
        <p className="description">
          Spring Boot · JPA · MySQL 기반으로 N+1·동시성·검색 성능 병목을 테스트로
          재현하고, 쿼리 수·응답 시간·응답 크기를 기준으로{" "}
          <strong>측정 → 개선 → 재검증</strong>합니다.
        </p>
        <div className="buttons-wrapper">
          <Link to="/portfolio/petory" className="btn-primary">
            Petory 프로젝트 →
          </Link>
          <a
            href="https://github.com/makkong1"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary"
          >
            GitHub
          </a>
        </div>
      </section>

      {/* 대표 성과 — 20초 훑는 사람이 먼저 보는 자리 */}
      <section
        id="achievements"
        style={{ marginBottom: "3rem", scrollMarginTop: "2rem" }}
      >
        <span className="eyebrow">Achievements</span>
        <h2 style={{ marginBottom: "1rem", color: "var(--text-color)" }}>
          대표 성과
        </h2>
        <div className="stat-grid">
          <Link
            to="/domains/cases?case=list-n-plus-one"
            className="stat-item"
            style={{ textDecoration: "none", display: "block" }}
          >
            <div className="stat-number">303문 → 3문</div>
            <div className="stat-label">목록 N+1 쿼리 수</div>
            <div className="stat-sub">
              Board 목록 100건 · 561ms → 55ms · JDBC 문 수 기준
            </div>
          </Link>
          <Link
            to="/domains/cases?case=spatial-search"
            className="stat-item"
            style={{ textDecoration: "none", display: "block" }}
          >
            <div className="stat-number">22.4MB → 100KB</div>
            <div className="stat-label">지도 초기 응답 크기</div>
            <div className="stat-sub">
              반경 조회 + 공간 인덱스 · 531.8ms → 50.9ms
            </div>
          </Link>
          <Link
            to="/domains/cases?case=concurrency"
            className="stat-item"
            style={{ textDecoration: "none", display: "block" }}
          >
            <div className="stat-number">1/5 → 5/5</div>
            <div className="stat-label">경고 동시 5요청 성공</div>
            <div className="stat-sub">
              락 획득 순서 교정 · 데드락 0 · 4건 롤백 해소
            </div>
          </Link>
        </div>
        <p
          style={{
            fontSize: "0.9rem",
            color: "var(--text-muted)",
            fontStyle: "italic",
            marginTop: "1rem",
            marginBottom: 0,
          }}
        >
          📌 카드를 누르면 각 사례의 전/후 실측 근거로 이동합니다.{" "}
          <Link
            to="/domains/cases"
            style={{
              color: "var(--link-color)",
              fontWeight: 600,
              textDecoration: "none",
              fontStyle: "normal",
            }}
          >
            대표 사례 7건 전체 보기 →
          </Link>
        </p>
      </section>

      {/* About Me — 제출용 자소서 단축안과 같은 본문 */}
      <section
        id="about"
        style={{ marginBottom: "3rem", scrollMarginTop: "2rem" }}
      >
        <span className="eyebrow">소개</span>
        <h2 style={{ marginBottom: "1rem", color: "var(--text-color)" }}>
          About Me
        </h2>
        <div className="section-card">
          <div className="about-text-block">
            <p>
              코드를 수정한 것과 문제가 해결된 것은 다릅니다. 그래서 개선 작업
              뒤에는 실제 API 요청과 DB 실행 결과로 다시 확인합니다.
            </p>

            <p>
              개인 프로젝트 Petory에서 게시글 목록 성능을 개선하던 중, 수정한
              조회 쿼리 외에 별도의 COUNT 쿼리가 한 번의 요청으로 5만 6천 행을
              읽는 문제를 발견했습니다. 조인된 테이블에 있던 작성자 조건을
              게시글 테이블 컬럼으로 옮겨 불필요한 조인을 제거했습니다.
            </p>

            <p>
              측정 결과 자체가 잘못된 경험도 있습니다. 실제로는 쿼리가 303개
              나갔는데 기존 집계는 101개로 보고했습니다. 집계를 JDBC 단위로
              세도록 바꿔 303개를 확인하고, 그 쿼리를 3개까지 줄였습니다.
              검증하지 못한 항목은 문제가 없다고 단정하지 않고 미측정으로
              남겼습니다.
            </p>

            <p>
              운영 환경에 서비스를 배포한 경험은 없습니다. 하지만 테스트와 실제
              API 호출로 문제를 재현하고 개선 결과를 직접 확인하는 과정을
              반복해 왔습니다.
            </p>
          </div>
        </div>
      </section>

      {/* 수치를 잰 방법 + 작업 방식 고지 */}
      <section
        id="method"
        style={{ marginBottom: "3rem", scrollMarginTop: "2rem" }}
      >
        <span className="eyebrow">Method</span>
        <h2 style={{ marginBottom: "1rem", color: "var(--text-color)" }}>
          수치를 잰 방법
        </h2>
        <div className="section-card">
          <p
            style={{
              color: "var(--text-secondary)",
              lineHeight: 1.8,
              fontSize: "0.92rem",
              marginTop: 0,
              marginBottom: "0.75rem",
            }}
          >
            이 사이트의 모든 숫자는 아래 규칙으로 잰 값입니다.
          </p>
          <ul
            className="about-text-block"
            style={{ paddingLeft: "1.1rem", marginBottom: "1rem" }}
          >
            <li>
              콘솔에서 손으로 쓴 SQL이 아니라, 앱을 띄워 <code>curl</code>로
              호출해 <strong>앱이 실제 발행한 쿼리</strong>를 봅니다(엔드포인트
              62개).
            </li>
            <li>
              Before는 추정하지 않고 <code>git worktree</code>로{" "}
              <strong>수정 직전 커밋을 꺼내 기동해</strong> 잽니다.
            </li>
            <li>
              고친 뒤에는 <strong>적용 → 제거 → 재적용(A/B/A)</strong>으로
              인과를 확인합니다.
            </li>
            <li>
              못 잰 범위는 「문제 없음」이 아니라 <strong>「미측정」</strong>으로
              적습니다.
            </li>
            <li>
              측정 도구 자체도 검증 대상이었습니다 —{" "}
              <strong>잘못 보고하던 도구 5개</strong>를 교체·보정했습니다.
            </li>
          </ul>
          <p
            style={{
              color: "var(--text-secondary)",
              lineHeight: 1.8,
              fontSize: "0.92rem",
              marginBottom: 0,
              paddingTop: "0.9rem",
              borderTop: "1px solid var(--border-strong)",
            }}
          >
            Petory·LinkUp은 <strong>1인 개인 프로젝트</strong>이고{" "}
            <strong>미배포</strong>(로컬 실행)입니다. 결제는 펫코인
            시뮬레이션으로, PG는 연동하지 않았습니다.
            <br />
            개발 전 과정에서 <strong>Claude Code</strong>를 페어 프로그래밍
            도구로 썼습니다. 측정과 원인 분석은 Claude Code와 함께 했고, 무엇을
            고칠지·무엇을 안 고칠지·어떻게 검증할지는 제가 정했습니다.
          </p>
        </div>
      </section>

      {/* Projects 섹션 */}
      <section
        id="portfolio"
        style={{ marginBottom: "3rem", scrollMarginTop: "2rem" }}
      >
        <span className="eyebrow">포트폴리오</span>
        <h2 style={{ marginBottom: "1rem", color: "var(--text-color)" }}>
          Projects
        </h2>

        <div className="portfolio-grid" style={{ marginBottom: "1.25rem" }}>
          <Link to="/portfolio/petory" className="project-card">
            <h3>Petory</h3>
            <p className="project-description">
              반려동물 통합 플랫폼 · 1인 · 2025
              <br />
              <span className="project-sub">
                업무 도메인 11개를 4-레이어로 반복 구성. 커뮤니티·케어·검색어
                intent 분석 후 주변서비스 추천. N+1·동시성·공간 검색 병목을
                테스트로 재현하고 측정 → 개선 → 재검증했습니다.
              </span>
            </p>
            <div className="tech-stack-wrapper">
              <span className="tech-badge">Spring Boot 3.5.7</span>
              <span className="tech-badge">Java 17</span>
              <span className="tech-badge">MySQL 8.4</span>
              <span className="tech-badge">Redis</span>
              <span className="tech-badge">React 19</span>
              <span className="tech-badge">FastAPI</span>
            </div>
          </Link>

          <a
            href="https://github.com/makkong1/LinkUpProject"
            target="_blank"
            rel="noopener noreferrer"
            className="project-card"
          >
            <h3>LinkUp</h3>
            <p className="project-description">
              커뮤니티 웹 · 1인 · Petory 직전 프로젝트
              <br />
              <span className="project-sub">
                거의 바뀌지 않는 공지 목록이 요청마다 DB를 치고 있었습니다.
                Redis 캐싱으로 평균 응답 <strong>608 → 137ms</strong>, 처리량
                144.8 → 457.7/sec(JMeter, 100명 동시 × 10회). 좋아요는 Redis{" "}
                <code>INCR</code> 후 5분 배치로 DB 반영.
              </span>
            </p>
            <div className="tech-stack-wrapper">
              <span className="tech-badge">Spring Boot</span>
              <span className="tech-badge">JPA</span>
              <span className="tech-badge">MySQL</span>
              <span className="tech-badge">Redis</span>
              <span className="tech-badge">SSE</span>
            </div>
          </a>
        </div>

        {/* LinkUp 한계 — Petory 에서 바꾼 이유 */}
        <div className="content-card" style={{ marginBottom: "1.25rem" }}>
          <h3 style={{ marginTop: 0 }}>LinkUp의 한계 — Petory에서 바꾼 이유</h3>
          <ul
            className="about-text-block"
            style={{ paddingLeft: "1.1rem", marginBottom: 0 }}
          >
            <li>
              좋아요 카운트를 5분 동안 Redis에만 들고 있어서, 그 사이 서버가
              죽으면 반영 안 된 증가분이 사라집니다. 정확도보다 응답 속도를 택해
              감수한 손실입니다. <strong>Petory에서는</strong> 같은 성격의
              카운터(경고 횟수·모임 인원)를 캐시가 아니라 DB 레벨 원자적
              UPDATE로 처리했습니다 — 돈·제재와 엮이면 감수할 수 없는 손실이기
              때문입니다.
            </li>
            <li>
              세션 기반 인증이라 서버를 늘리면 세션 공유가 필요해지는 구조였고,
              Petory에서는 <strong>JWT + Refresh Token</strong>으로 바꿨습니다.
            </li>
            <li>
              JMeter 스크립트를 보존하지 않아 위 수치는{" "}
              <strong>지금 재현할 수 없습니다</strong>. Petory에서 측정 조건과
              커밋을 함께 적기 시작한 건 이 경험 때문입니다.
            </li>
          </ul>
        </div>

        {/* 협업 프로젝트 2건 */}
        <div className="content-card">
          <h3 style={{ marginTop: 0 }}>협업 프로젝트 2건 — 4인 팀, 2024년</h3>
          <p
            style={{
              color: "var(--text-secondary)",
              lineHeight: 1.75,
              fontSize: "0.92rem",
              marginBottom: "1rem",
            }}
          >
            Petory·LinkUp은 1인 프로젝트입니다. 팀으로 한 작업은 이 둘입니다.
          </p>

          <div className="portfolio-grid" style={{ marginBottom: "1rem" }}>
            <a
              href="https://github.com/makkong1/NetflixMall"
              target="_blank"
              rel="noopener noreferrer"
              className="project-card"
            >
              <h3>NetflixMall</h3>
              <p className="project-description">
                Netflix를 모델로 한 이커머스 웹 · 4인 · 2024.07~08
                <br />
                <span className="project-sub">
                  <strong>관리자 페이지 전담.</strong> 유저·상품·주문 목록/상세
                  조회, 이메일·상품명 검색, 판매자 승인까지 엔드포인트 13개.
                  차단은 행을 지우지 않고 플래그와 차단 사유를 함께 남겨, 해제할
                  때 사유를 지우고 되돌립니다.
                </span>
              </p>
              <div className="tech-stack-wrapper">
                <span className="tech-badge">Java</span>
                <span className="tech-badge">Spring (XML)</span>
                <span className="tech-badge">MyBatis</span>
                <span className="tech-badge">JSP</span>
                <span className="tech-badge">Oracle 11g</span>
              </div>
            </a>

            <a
              href="https://github.com/makkong1/NetflixCloneCoding"
              target="_blank"
              rel="noopener noreferrer"
              className="project-card"
            >
              <h3>Netflix Clone Coding</h3>
              <p className="project-description">
                TMDB API 기반 영화 소개 웹 · 4인 · 2024.06~07
                <br />
                <span className="project-sub">
                  <strong>서버 인증 + 프론트 접근 제어 담당.</strong>{" "}
                  회원가입·로그인·정보수정, BCrypt 비밀번호 해싱, 이메일 중복
                  확인, 임시 비밀번호 메일 발송 → 검증 → 변경 3단계. 인증 상태를
                  브라우저 저장소에 두는 수준이었고, 같은 축을 LinkUp에서 세션,
                  Petory에서 JWT로 다시 만들었습니다.
                </span>
              </p>
              <div className="tech-stack-wrapper">
                <span className="tech-badge">Spring Boot</span>
                <span className="tech-badge">Spring Security</span>
                <span className="tech-badge">JPA</span>
                <span className="tech-badge">Oracle 11g</span>
                <span className="tech-badge">React · TS</span>
              </div>
            </a>
          </div>

          <p
            style={{
              color: "var(--text-muted)",
              lineHeight: 1.75,
              fontSize: "0.88rem",
              marginBottom: 0,
            }}
          >
            <strong>적는 기준</strong> — 두 프로젝트 모두 통짜 1커밋으로 올라가
            있어 커밋 이력으로는 기여를 확인할 수 없습니다. 레포를 다시 클론해
            담당 역할에 해당하는 파일 실물을 읽고 확인한 것만 적었습니다.
          </p>
        </div>
      </section>

      {/* Education 섹션 */}
      <section
        id="education"
        style={{ marginBottom: "3rem", scrollMarginTop: "2rem" }}
      >
        <span className="eyebrow">학력</span>
        <h2 style={{ marginBottom: "1rem", color: "var(--text-color)" }}>
          Education
        </h2>
        <div className="section-card">
          <p className="contact-info">
            <strong>인덕대학교</strong>
            <br />
            건설안전공학과
            <br />
            2017.02 - 2022.02(졸업)
          </p>

          <p className="contact-info">
            <strong>KH 정보교육원</strong>
            <br />
            Java 기반 공공데이터융합 개발자 양성 프로그램
            <br />
            2024.02 - 2024.08
          </p>
        </div>
      </section>

      {/* Contact 섹션 */}
      <section
        id="contact"
        style={{ marginBottom: "1rem", scrollMarginTop: "1rem" }}
      >
        <span className="eyebrow">연락처</span>
        <h2 style={{ marginBottom: "1rem", color: "var(--text-color)" }}>
          Contact
        </h2>
        <div className="section-card">
          <p className="contact-info" style={{ marginBottom: "0" }}>
            Email: <a href="mailto:wowong123@naver.com">wowong123@naver.com</a>
            <br />
            GitHub:{" "}
            <a
              href="https://github.com/makkong1"
              target="_blank"
              rel="noopener noreferrer"
              className="text-link"
            >
              Makkong1
            </a>
            <br />
            Repo:{" "}
            <a
              href="https://github.com/makkong1/Petory"
              target="_blank"
              rel="noopener noreferrer"
              className="text-link"
            >
              github.com/makkong1/Petory
            </a>
          </p>
        </div>
      </section>
    </div>
  );
}

export default HomePage;
