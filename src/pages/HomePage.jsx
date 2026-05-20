import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <div className="layout-main">
      {/* 페이지 헤더 */}
      <div className="page-header">
        {/* <h1>내사진</h1> */}
        <p>안녕하세요! <strong>박영범</strong>입니다.</p>
      </div>

    {/* About Me 섹션 */}
    <section id="about" style={{ marginBottom: '3rem', scrollMarginTop: '2rem' }}>
      <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>About Me</h2>
      <div className="section-card">
        <div className="about-text-block">
        <p>문제를 재현하고 측정하며 개선하는 백엔드 개발자입니다.</p>

        <p>
          Spring Boot, JPA, MySQL 기반 프로젝트를 진행하며 기능 구현에 그치지 않고, 각 도메인에서
          발생할 수 있는 N+1 문제와 동시성 이슈를 직접 재현하고 쿼리 수·응답 시간·메모리 사용량으로
          개선 결과를 확인해 왔습니다.
        </p>

        <p>
          위치 기반 검색에서는 공간 쿼리와 거리 계산을 활용했고, 동시성 제어에서는 비관적 락과
          원자적 UPDATE 방식을 비교하며 상황에 맞는 적용 기준을 정리했습니다.
        </p>

        <p>
          새로운 분야를 배울 때의 시행착오는 당연하다고 봅니다. 어려운 상황에서도 결과를 회피하거나
          책임을 다른 데 두기보다, 내 판단과 실행을 차분히 검토하고 다음에 반영하려 합니다.
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
