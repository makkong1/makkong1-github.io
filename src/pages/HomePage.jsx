import { Link } from "react-router-dom";

function HomePage() {
  return (
    <div className="layout-main">
      {/* 히어로 */}
      <section
        className="project-hero glow-bg"
        style={{ marginBottom: "3rem" }}
      >
        <span className="eyebrow">Backend Engineer</span>
        <h1>박영범</h1>
        <p className="subtitle">문제를 재현하고 측정하며 개선하는 백엔드 개발자</p>
        <p className="description">
          Spring Boot · JPA · MySQL 기반으로 N+1·동시성·검색 성능 병목을 테스트로
          재현하고, 쿼리 수·응답 시간·메모리를 기준으로{" "}
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

      {/* About Me 섹션 */}
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
              문제를 재현하고, 측정하고, 개선하는 과정을 중요하게 생각하는
              백엔드 개발자입니다.
            </p>

            <p>
              Spring Boot, JPA, MySQL 기반 프로젝트를 진행하며 기능 구현에만
              머무르지 않고, 각 도메인에서 발생할 수 있는 N+1 문제와 동시성
              이슈를 직접 재현한 뒤 쿼리 수, 응답 시간, 메모리 사용량을 기준으로
              개선 결과를 검증해 왔습니다.
            </p>

            <p>
              위치 기반 검색에서는 공간 인덱스와 거리 계산을 활용해 조회
              성능을 개선했고, 동시성 제어에서는 비관적 락과 원자적 UPDATE
              방식을 비교하며 상황에 맞는 적용 기준을 정리했습니다. NLP 호출이
              순간적으로 몰리거나 불필요하게 반복되는 상황을 가정해, Spring
              이벤트·전용 실행 풀로 분석을 본 트랜잭션과 분리하고 호출 조건을
              좁혔습니다.
            </p>

            <p>
              새로운 기술을 익히는 과정에서 시행착오는 자연스럽다고
              생각합니다. 문제를 피하지 않고 원인을 끝까지 확인하고, 선택의
              근거와 결과를 점검해 다음 개선으로 연결하는 개발자가 되고자
              합니다.
            </p>
          </div>
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
        <div className="portfolio-grid">
          <Link to="/portfolio/petory" className="project-card">
            <h3>Petory</h3>
            <p className="project-description">
              반려동물 통합 플랫폼
              <br />
              <span className="project-sub">
                User·Board·Care·Location·Recommendation 등 8도메인 — 커뮤니티·케어·검색어
                intent 분석 후 주변서비스 추천 카드. N+1·동시성·NLP 부하를 테스트로
                재현하고 측정 → 개선 → 재검증.
              </span>
            </p>
            <div className="tech-stack-wrapper">
              <span className="tech-badge">Spring Boot</span>
              <span className="tech-badge">React</span>
              <span className="tech-badge">MySQL</span>
              <span className="tech-badge">Redis</span>
              <span className="tech-badge">FastAPI</span>
              <span className="tech-badge">Capacitor</span>
            </div>
          </Link>
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
          </p>
        </div>
      </section>
    </div>
  );
}

export default HomePage;
