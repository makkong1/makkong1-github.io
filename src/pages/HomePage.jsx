import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <div className="layout-main">
      {/* 페이지 헤더 */}
      <div className="page-header">
        <h1>내사진</h1>
        <p>저는 <strong>선택한 방향을 끝까지 책임지는 백엔드 개발자</strong>입니다.</p>
      </div>

    <section id="about" className="section-card">
      <h2>About Me</h2>
      <div className="about-text-block">
        <p>
          저는 결과보다 선택에 대한 책임을 끝까지 지는 태도를 중요하게 생각하는 백엔드 개발자입니다.
          한 번 결정한 방향이라면, 중간에 흔들리더라도 끝까지 검증하고 완주하는 방식을 선호합니다.
        </p>

        <p>
          새로운 분야에 도전하는 과정에서 시행착오를 겪는 것은 자연스럽다고 생각합니다.
          다만 그 결과를 환경이나 상황 탓으로 돌리기보다, 스스로의 선택을 점검하며 개선해 나가는 태도를 유지해 왔습니다.
        </p>

        <p>
          현재는 백엔드 개발을 중심으로 CS, 데이터베이스, 서버 구조에 대한 이해를 쌓는 데 집중하고 있으며,
          단기적인 성과보다는 지속 가능한 설계와 안정적인 구현을 목표로 학습하고 있습니다.
        </p>

        <p>
          빠른 결과보다, 맡은 역할을 끝까지 책임지는 개발자로서
          팀과 함께 완성도를 높여가는 방향으로 성장하고자 합니다.
        </p>
      </div>
    </section>

      {/* 프로젝트 포트폴리오 섹션 */}
      <section id="portfolio" className="section-card">
        <h2>Projects</h2>
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
            to="/portfolio/linkup"
            className="project-card"
          >
            <h3>LinkUp</h3>
            <p className="project-description">
              게시판 + 노션 스타일 콘텐츠 + 실시간 알림 + 소셜 로그인을 지원하는 커뮤니티 플랫폼
            </p>
            <div className="tech-stack-wrapper">
              <span className="tech-badge">Spring Boot</span>
              <span className="tech-badge">Java 17</span>
              <span className="tech-badge">MySQL</span>
              <span className="tech-badge">Redis</span>
            </div>
          </Link>
        </div>
      </section>
      {/* 교육 섹션 */}
      <section id="education" className="section-card">
        <h2>Education</h2>

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

      </section>

      {/* 연락처 섹션 */}
      <section id="contact" className="section-card">
        <h2>Contact</h2>
        <p className="contact-info">
          Email: <a href="mailto:wowong123@naver.com">wowong123@naver.com</a><br />
          GitHub: <a href="https://github.com/makkong1" target="_blank" rel="noopener noreferrer" className="text-link">
            Makkong1
          </a>
        </p>
      </section>
    </div>
    
  );
}

export default HomePage;
