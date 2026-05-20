import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <div className="layout-main">
      {/* 페이지 헤더 */}
      <div className="page-header">
        {/* <h1>내사진</h1> */}
        <p>안녕하세요! 저는 <strong>문제를 재현하고 측정하며 개선하는 백엔드 개발자</strong> 박영범입니다.</p>
      </div>

    {/* About Me 섹션 */}
    <section id="about" style={{ marginBottom: '3rem', scrollMarginTop: '2rem' }}>
      <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>About Me</h2>
      <div className="section-card">
        <div className="about-text-block">
        <p>
          저는 결과보다 선택에 대한 책임을 끝까지 지는 태도를 중요하게 생각합니다.
          개발 과정에서 처음 선택한 방식이 항상 정답은 아니었지만, 문제가 발생했을 때
          이를 환경이나 상황 탓으로 돌리기보다 선택의 근거와 결과를 다시 점검하려고 노력했습니다.
        </p>

        <p>
          Petory 프로젝트에서도 단순히 기능을 구현하는 데 그치지 않고, 조회 성능 저하와
          N+1 문제처럼 실제 서비스에서 발생할 수 있는 문제를 직접 재현하고 측정했습니다.
          이후 쿼리 수, 응답 시간, 메모리 사용량을 기준으로 개선 전후를 비교하며
          적용한 해결 방식이 실제로 효과가 있는지 확인했습니다.
        </p>

        <p>
          앞으로도 빠른 결과에만 집중하기보다, 문제를 정확히 이해하고 근거 있는 선택으로
          안정적인 서비스를 만드는 개발자로 성장하고자 합니다.
        </p>
        </div>
      </div>
    </section>

      {/* Projects 섹션 */}
      <section id="portfolio" style={{ marginBottom: '3rem', scrollMarginTop: '2rem' }}>
        <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>Projects</h2>
          <div className="portfolio-grid">
          <Link
            to="/portfolio/petory"
            className="project-card"
          >
            <h3>Petory</h3>
            <p className="project-description">
              반려동물 통합 플랫폼<br />
              <span className="project-sub">
                위치서비스, 채팅, 알림, 커뮤니티 기능 중심의 백엔드 설계 및 구현
              </span>
            </p>
            <div className="tech-stack-wrapper">
              <span className="tech-badge">Spring Boot</span>
              <span className="tech-badge">React</span>
              <span className="tech-badge">MySQL</span>
              <span className="tech-badge">Redis</span>
            </div>
          </Link>
          <Link
            to="/infra"
            className="project-card"
          >
            <h3>배포 &amp; 인프라</h3>
            <p className="project-description">
              Docker Compose 개발 환경 구성 및 GitHub Actions CI/CD 파이프라인
            </p>
            <div className="tech-stack-wrapper">
              <span className="tech-badge">Docker</span>
              <span className="tech-badge">GitHub Actions</span>
              <span className="tech-badge">CI/CD</span>
            </div>
          </Link>
          </div>
      </section>

      {/* Education 섹션 */}
      <section id="education" style={{ marginBottom: '3rem', scrollMarginTop: '2rem' }}>
        <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>Education</h2>
        <div className="section-card">
          <p className="contact-info">
          <strong>인덕대학교</strong><br />
          건설안전공학과<br />
          2017.02 - 2022.02(졸업)
        </p>

        <p className="contact-info">
          <strong>KH 정보교육원</strong><br />
          Java 기반 공공데이터융합 개발자 양성 프로그램<br />
          2024.02 - 2024.08
          </p>
        </div>
      </section>

      {/* Contact 섹션 */}
      <section id="contact" style={{ marginBottom: '1rem', scrollMarginTop: '1rem' }}>
        <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>Contact</h2>
        <div className="section-card">
          <p className="contact-info" style={{ marginBottom: '0' }}>
          Email: <a href="mailto:wowong123@naver.com">wowong123@naver.com</a><br />
          GitHub: <a href="https://github.com/makkong1" target="_blank" rel="noopener noreferrer" className="text-link">
            Makkong1
          </a>
          </p>
        </div>
      </section>
    </div>
    
  );
}

export default HomePage;
