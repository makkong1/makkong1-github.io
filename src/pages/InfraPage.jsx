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
const PETORY_CD =
  'https://github.com/makkong1/Petory/blob/main/.github/workflows/cd.yml';
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
            Petory는 mysql·redis·petory-nlp-server·app·nginx 5개 컨테이너로
            구성된 Docker Compose 스택을 명령어 하나로 실행할 수 있도록
            구성했습니다. 별도 프로세스로 분리된 한국어 NLP 서버(FastAPI)까지
            depends_on·healthcheck로 기동 순서를 보장하며 통합했습니다. GitHub
            Actions로 빌드 자동화(CI)와, main에 관련 코드가 push되면 Docker
            이미지를 GitHub Container Registry에 자동으로 빌드·게시하는
            파이프라인(CD)까지 구성했습니다.
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
              Docker Compose — 로컬 개발 &amp; 배포 스택
            </h2>

            <Card style={{ marginBottom: '1rem' }}>
              <h3
                style={{
                  marginBottom: '0.75rem',
                  color: 'var(--text-color)',
                  fontSize: '1rem',
                }}
              >
                Petory — mysql · redis · petory-nlp-server · app · nginx 5개 컨테이너
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
                {li('의존 서비스: MySQL 8.0 + Redis 7 + petory-nlp-server(FastAPI), 여기에 app(Spring Boot)과 nginx까지 묶은 풀스택 Compose')}
                {li('mysql 최초 기동 시 baseline schema SQL이 자동 실행되어 전체 스키마 생성')}
                {li('app은 depends_on + healthcheck로 mysql·redis·nlp-server가 모두 준비된 뒤에만 기동')}
                {li('nginx가 frontend 정적 파일 서빙 + /api 리버스 프록시 + SSL 종료를 담당')}
              </ul>
              <CodeBlock>{`# Petory docker-compose.yml (핵심 서비스)
services:
  mysql:
    image: mysql:8.0
    container_name: petory-mysql
    volumes:
      - mysql_data:/var/lib/mysql
      - ./backend/main/resources/sql/migration:/docker-entrypoint-initdb.d:ro
    healthcheck:
      test: ["CMD", "mysqladmin", "ping", "-h", "localhost", "-u", "root", "-p\${DB_ROOT_PASSWORD}"]

  redis:
    image: redis:7-alpine
    container_name: petory-redis
    command: redis-server --requirepass \${REDIS_PASSWORD} --maxmemory 256mb --maxmemory-policy allkeys-lru

  nlp-server:
    build: { context: ./petory-nlp-server, dockerfile: Dockerfile }
    container_name: petory-nlp-server
    volumes:
      - nlp_model_cache:/home/nlp/.cache/huggingface
    healthcheck:
      test: ["CMD", "python", "-c", "import urllib.request; urllib.request.urlopen('http://localhost:8000/health')"]

  app:
    build: { context: ., dockerfile: Dockerfile }
    container_name: petory-app
    depends_on:
      mysql:
        condition: service_healthy
      redis:
        condition: service_healthy
      nlp-server:
        condition: service_healthy
    environment:
      SPRING_PROFILES_ACTIVE: prod
      PET_INTENT_BASE_URL: http://nlp-server:8000
    healthcheck:
      test: ["CMD", "wget", "-qO-", "http://localhost:8080/actuator/health"]

  nginx:
    image: nginx:alpine
    container_name: petory-nginx
    depends_on: [app]
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx/nginx.conf:/etc/nginx/nginx.conf:ro
      - ./frontend/build:/usr/share/nginx/html:ro`}</CodeBlock>
            </Card>

            <Card>
              <h3
                style={{
                  marginBottom: '0.75rem',
                  color: 'var(--text-color)',
                  fontSize: '1rem',
                }}
              >
                petory-nlp-server — 한국어 반려생활 의도 분석 (FastAPI)
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
                {li('Spring Boot 메인 앱과 완전히 분리된 프로세스 — kiwipiepy(형태소 분석) + sentence-transformers(임베딩)로 자연어 의도 분류')}
                {li('컨테이너 빌드 시 kiwipiepy C 확장 컴파일을 위해 build-essential 설치 필요 (Alpine 대신 python:3.9-slim + Debian 툴체인)')}
                {li('임베딩 모델은 최초 기동 시 HuggingFace에서 내려받아 named volume에 캐시 — 재기동 시 재다운로드 없음')}
                {li('Spring 쪽 PetIntentClient가 타임아웃·장애를 Optional.empty()로 흡수 — NLP 서버가 죽어도 게시/케어/추천 등 본 기능은 그대로 동작')}
                {li('non-root 유저로 실행, /health 헬스체크로 app의 기동 순서를 보장')}
              </ul>
              <CodeBlock>{`# petory-nlp-server/Dockerfile
FROM python:3.9-slim

RUN apt-get update && apt-get install -y --no-install-recommends \\
    build-essential && rm -rf /var/lib/apt/lists/*

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY app app

RUN useradd -r -m -d /home/nlp nlp \\
    && mkdir -p /home/nlp/.cache/huggingface \\
    && chown -R nlp:nlp /app /home/nlp
ENV HF_HOME=/home/nlp/.cache/huggingface
USER nlp

EXPOSE 8000
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]`}</CodeBlock>
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
              GitHub Actions CD — Docker 이미지 자동 빌드·게시
            </h2>

            <Card>
              <p
                style={{
                  color: 'var(--text-secondary)',
                  lineHeight: '1.8',
                  marginBottom: '0.75rem',
                  fontSize: '0.9rem',
                }}
              >
                &quot;코드를 main에 push하면 자동으로 최신 Docker 이미지가
                만들어져 레지스트리에 올라간다&quot;까지가 지금 구현된
                범위입니다. 그 이미지를 실제 서버가 내려받아 컨테이너를
                교체하는 마지막 단계는 배포할 서버가 아직 없어 연결되어 있지
                않습니다 (아래 &quot;다음 단계&quot; 참고).
              </p>
              <ul
                style={{
                  listStyle: 'none',
                  padding: 0,
                  margin: 0,
                  color: 'var(--text-secondary)',
                  lineHeight: '1.8',
                }}
              >
                {li('트리거: main 브랜치 push 중 Dockerfile·backend/**·petory-nlp-server/** 등 이미지에 영향 주는 경로만 (docs 등 무관한 push로 매번 무거운 이미지 재빌드가 도는 것 방지)')}
                {li('matrix로 petory-app, petory-nlp-server 두 이미지를 각자의 Dockerfile로 병렬 빌드')}
                {li('GitHub Container Registry(ghcr.io)에 :latest와 :커밋SHA 두 태그로 push — 인증은 GITHUB_TOKEN만으로, 별도 계정·시크릿 설정 불필요')}
                {li('workflow_dispatch로 main push 전에도 수동 실행해 검증 가능 (경로 필터 무시하고 항상 실행)')}
              </ul>
              <CodeBlock>{`# .github/workflows/cd.yml
name: CD (Build & Push Docker Images)

on:
  push:
    branches: [main]
    paths:
      - "Dockerfile"
      - "backend/**"
      - "petory-nlp-server/**"
      # ... build.gradle, gradle/**, gradlew 등
  workflow_dispatch: {}

permissions:
  contents: read
  packages: write

jobs:
  build-and-push:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        include:
          - image: petory-app
            context: .
            dockerfile: Dockerfile
          - image: petory-nlp-server
            context: ./petory-nlp-server
            dockerfile: petory-nlp-server/Dockerfile

    steps:
      - uses: actions/checkout@v4

      - name: Log in to GitHub Container Registry
        uses: docker/login-action@v3
        with:
          registry: ghcr.io
          username: \${{ github.actor }}
          password: \${{ secrets.GITHUB_TOKEN }}

      - name: Build and push \${{ matrix.image }}
        uses: docker/build-push-action@v6
        with:
          context: \${{ matrix.context }}
          file: \${{ matrix.dockerfile }}
          push: true
          tags: |
            ghcr.io/\${{ github.repository_owner }}/\${{ matrix.image }}:latest
            ghcr.io/\${{ github.repository_owner }}/\${{ matrix.image }}:\${{ github.sha }}`}</CodeBlock>
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
                  '배포 자동화 마무리: 실제 서버를 확보한 뒤, CD가 게시한 GHCR 이미지를 서버가 pull → docker compose up으로 교체하는 마지막 단계 연결'
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
                    href={PETORY_CD}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: 'var(--link-color)', textDecoration: 'none' }}
                  >
                    Petory CD 워크플로우
                  </a>
                  {' — .github/workflows/cd.yml'}
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
