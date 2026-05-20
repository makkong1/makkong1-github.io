import TableOfContents from '../components/Common/TableOfContents';

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

function CodeBlock({ children }) {
  return (
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
        margin: '0.75rem 0 0',
      }}
    >
      {children}
    </pre>
  );
}

const PETORY_CI =
  'https://github.com/makkong1/Petory/blob/main/.github/workflows/ci.yml';
const PORTFOLIO_CD =
  'https://github.com/makkong1/makkong1-github.io/blob/main/.github/workflows/deploy.yml';
const PETORY_COMPOSE =
  'https://github.com/makkong1/Petory/blob/main/docker-compose.yml';

function InfraPage() {
  const sections = [
    { id: 'pillars', title: '구성 요소' },
    { id: 'docker', title: 'Docker Compose' },
    { id: 'ci', title: 'GitHub Actions CI' },
    { id: 'cd', title: 'GitHub Actions CD' },
    { id: 'next', title: '다음 단계' },
  ];

  const pillars = ['Docker Compose 개발 환경', 'GitHub Actions CI', 'GitHub Actions CD'];

  const li = (text) => <li style={{ marginBottom: '0.35rem' }}>• {text}</li>;

  return (
    <div className="domain-page-wrapper" style={{ padding: '2rem 0' }}>
      <div
        className="domain-page-container"
        style={{ display: 'flex', gap: '2rem', alignItems: 'flex-start' }}
      >
        <div className="domain-page-content" style={{ flex: 1 }}>
          <h1 style={{ marginBottom: '0.5rem', color: 'var(--text-color)' }}>
            배포 &amp; 인프라
          </h1>
          <p
            style={{
              color: 'var(--text-secondary)',
              lineHeight: '1.8',
              marginBottom: '0.85rem',
              fontSize: '0.95rem',
            }}
          >
            Petory와 pet-data-api의 로컬 개발 환경을 Docker Compose로 구성해
            의존 서비스를 명령어 하나로 실행할 수 있도록 했습니다. 또한 GitHub
            Actions로 Petory 빌드 자동화와 포트폴리오 사이트 자동 배포 파이프라인을
            구성했습니다.
          </p>

          <section
            id="pillars"
            style={{ marginBottom: '2rem', scrollMarginTop: '2rem' }}
          >
            <h2
              style={{
                marginBottom: '0.75rem',
                color: 'var(--text-color)',
                fontSize: '1.1rem',
              }}
            >
              구성 요소
            </h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {pillars.map((label) => (
                <span
                  key={label}
                  style={{
                    padding: '0.35rem 0.75rem',
                    borderRadius: '999px',
                    fontSize: '0.82rem',
                    fontWeight: 600,
                    color: 'var(--text-color)',
                    backgroundColor: 'var(--bg-color)',
                    border: '1px solid var(--nav-border)',
                  }}
                >
                  {label}
                </span>
              ))}
            </div>
          </section>

          <section
            id="docker"
            style={{ marginBottom: '3rem', scrollMarginTop: '2rem' }}
          >
            <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>
              Docker Compose — 개발 환경 통일
            </h2>

            <Card style={{ marginBottom: '1rem' }}>
              <h3
                style={{
                  marginBottom: '0.75rem',
                  color: 'var(--text-color)',
                  fontSize: '1rem',
                }}
              >
                Petory
              </h3>
              <ul
                style={{
                  listStyle: 'none',
                  padding: 0,
                  margin: 0,
                  color: 'var(--text-secondary)',
                  lineHeight: '1.8',
                }}
              >
                {li('의존 서비스: Redis 7')}
                {li('docker-compose up 한 번으로 로컬 Redis 실행 — 개별 설치 불필요')}
                {li('볼륨 마운트로 컨테이너 재시작 시 데이터 유지')}
              </ul>
              <CodeBlock>{`# Petory docker-compose.yml (핵심 서비스)
services:
  redis:
    image: redis:7-alpine
    container_name: petory-redis
    restart: unless-stopped
    command: redis-server --requirepass \${REDIS_PASSWORD}
    ports:
      - "6379:6379"
    volumes:
      - redis_data:/data
    healthcheck:
      test: ["CMD", "redis-cli", "-a", "\${REDIS_PASSWORD}", "ping"]
      interval: 10s
      timeout: 3s
      retries: 3`}</CodeBlock>
            </Card>

            <Card>
              <h3
                style={{
                  marginBottom: '0.75rem',
                  color: 'var(--text-color)',
                  fontSize: '1rem',
                }}
              >
                pet-data-api
              </h3>
              <ul
                style={{
                  listStyle: 'none',
                  padding: 0,
                  margin: 0,
                  color: 'var(--text-secondary)',
                  lineHeight: '1.8',
                }}
              >
                {li('의존 서비스: Redis + MySQL + RabbitMQ')}
                {li('Petory보다 의존 서비스가 많아 Docker Compose 없이 로컬 세팅이 번거로움')}
                {li('depends_on + healthcheck로 서비스 준비 완료 후 앱 시작 보장')}
              </ul>
              <CodeBlock>{`# pet-data-api docker-compose.yml (핵심 서비스)
services:
  redis:
    image: redis:7-alpine

  mysql:
    image: mysql:8.0
    healthcheck:
      test: ["CMD", "mysqladmin", "ping", "-h", "localhost"]
      interval: 10s
      retries: 5

  rabbitmq:
    image: rabbitmq:3-management-alpine
    ports:
      - "5672:5672"
      - "15672:15672"  # 관리 UI

  app:
    build: .
    depends_on:
      mysql:
        condition: service_healthy
      redis:
        condition: service_healthy`}</CodeBlock>
            </Card>
          </section>

          <section
            id="ci"
            style={{ marginBottom: '3rem', scrollMarginTop: '2rem' }}
          >
            <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>
              GitHub Actions CI — Petory 빌드 자동화
            </h2>

            <Card>
              <ul
                style={{
                  listStyle: 'none',
                  padding: 0,
                  margin: 0,
                  color: 'var(--text-secondary)',
                  lineHeight: '1.8',
                }}
              >
                {li('트리거: main·dev 브랜치 push 및 main PR')}
                {li('JDK 17 (temurin) 설치 → Gradle 의존성 캐시 → compileJava')}
                {li('캐시 키: build.gradle 해시 기반 — 의존성 변경 시에만 재다운로드')}
                {li('통합 테스트는 MySQL·Redis 서비스 컨테이너 세팅이 추가로 필요해 컴파일 확인으로 우선 적용')}
              </ul>
              <CodeBlock>{`# .github/workflows/ci.yml
name: CI

on:
  push:
    branches: [main, dev]
  pull_request:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Set up JDK 17
        uses: actions/setup-java@v4
        with:
          java-version: '17'
          distribution: 'temurin'

      - name: Cache Gradle packages
        uses: actions/cache@v3
        with:
          path: |
            ~/.gradle/caches
            ~/.gradle/wrapper
          key: \${{ runner.os }}-gradle-\${{ hashFiles('**/*.gradle*') }}

      - name: Build
        run: ./gradlew compileJava --no-daemon`}</CodeBlock>
            </Card>
          </section>

          <section
            id="cd"
            style={{ marginBottom: '3rem', scrollMarginTop: '2rem' }}
          >
            <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>
              GitHub Actions CD — 포트폴리오 사이트 자동 배포
            </h2>

            <Card>
              <ul
                style={{
                  listStyle: 'none',
                  padding: 0,
                  margin: 0,
                  color: 'var(--text-secondary)',
                  lineHeight: '1.8',
                }}
              >
                {li('트리거: main 브랜치 push')}
                {li('Node.js 20 설치 → node_modules 캐시 → npm ci → Vite 빌드 → GitHub Pages 배포')}
                {li('캐시 키: package-lock.json 해시 기반 — 의존성 변경 시에만 재설치')}
                {li('peaceiris/actions-gh-pages로 dist/ 디렉토리를 gh-pages 브랜치에 자동 퍼블리시')}
              </ul>
              <CodeBlock>{`# .github/workflows/deploy.yml
name: Deploy to GitHub Pages

on:
  push:
    branches: ["main"]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Use Node.js 20
        uses: actions/setup-node@v3
        with:
          node-version: 20.19.0

      - name: Cache node_modules
        uses: actions/cache@v3
        with:
          path: "**/node_modules"
          key: \${{ runner.os }}-node-\${{ hashFiles('**/package-lock.json') }}

      - name: Install dependencies
        run: npm ci

      - name: Build project
        run: npm run build

      - uses: peaceiris/actions-gh-pages@v4
        with:
          github_token: \${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist`}</CodeBlock>
            </Card>
          </section>

          <section
            id="next"
            style={{ marginBottom: '3rem', scrollMarginTop: '2rem' }}
          >
            <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>
              다음 단계
            </h2>
            <Card>
              <ul
                style={{
                  listStyle: 'none',
                  padding: 0,
                  margin: 0,
                  color: 'var(--text-secondary)',
                  lineHeight: '1.8',
                }}
              >
                {li(
                  'CI에 통합 테스트 추가: GitHub Actions 서비스 컨테이너로 MySQL·Redis 실행 후 ./gradlew test'
                )}
                {li(
                  '클라우드 배포: EC2 + RDS + ElastiCache 조합 또는 Railway/Render 등 PaaS 활용'
                )}
                {li(
                  'CD 파이프라인 확장: Petory 백엔드도 main push 시 자동 배포로 연결'
                )}
              </ul>
            </Card>
          </section>

          <section style={{ marginBottom: '3rem', scrollMarginTop: '2rem' }}>
            <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>
              관련 파일
            </h2>
            <Card>
              <ul
                style={{
                  listStyle: 'none',
                  padding: 0,
                  margin: 0,
                  color: 'var(--text-secondary)',
                  lineHeight: '2',
                }}
              >
                <li>
                  •{' '}
                  <a
                    href={PETORY_CI}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: 'var(--link-color)', textDecoration: 'none' }}
                  >
                    Petory CI 워크플로우
                  </a>
                  {' — .github/workflows/ci.yml'}
                </li>
                <li>
                  •{' '}
                  <a
                    href={PORTFOLIO_CD}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: 'var(--link-color)', textDecoration: 'none' }}
                  >
                    포트폴리오 CD 워크플로우
                  </a>
                  {' — .github/workflows/deploy.yml'}
                </li>
                <li>
                  •{' '}
                  <a
                    href={PETORY_COMPOSE}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: 'var(--link-color)', textDecoration: 'none' }}
                  >
                    Petory docker-compose.yml
                  </a>
                </li>
              </ul>
            </Card>
          </section>
        </div>

        <TableOfContents sections={sections} />
      </div>
    </div>
  );
}

export default InfraPage;
