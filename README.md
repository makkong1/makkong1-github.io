# 박영범 포트폴리오 · Petory 아키텍처/데모

이 저장소는 박영범의 포트폴리오 사이트이자, 반려동물 통합 플랫폼 **Petory**의 아키텍처 문서, 도메인 분석, 트러블슈팅 기록, 프론트 데모를 함께 정리한 저장소입니다.

- 이력서형 홈 페이지
- Petory 프로젝트 소개 페이지
- 도메인별 상세 페이지
- 더미 데이터 기반 라이브 데모
- 백엔드 아키텍처/성능/동시성 문서 허브

## Live

- Portfolio: [https://makkong1.github.io/makkong1-github.io](https://makkong1.github.io/makkong1-github.io)
- Petory backend repo: [https://github.com/makkong1/Petory](https://github.com/makkong1/Petory)

## What This Repo Contains

이 저장소에는 **실행 가능한 포트폴리오 프론트엔드**와 **Petory 백엔드 문서 자산**이 함께 들어 있습니다.

1. `src/`
   React + Vite 기반 포트폴리오 사이트 본체입니다.
2. `src/demo/`
   Petory 주요 기능을 브라우저에서 볼 수 있도록 만든 데모 앱입니다.
3. `src/mockData/`, `src/api/mockInterceptor.js`
   백엔드 없이도 데모를 동작시키는 mock 계층입니다.
4. `docs/`
   아키텍처, 도메인 설명, 성능 최적화, 동시성, 리팩토링, SQL 문서를 모아둔 폴더입니다.

## Site Routes

- `/` : 이력서형 홈
- `/portfolio/petory` : Petory 프로젝트 소개
- `/demo` : mock 기반 라이브 데모
- `/domains/*` : User, Board, Care, Location, Recommendation, Meetup, Chat 등 도메인 상세
- `/docs` : 문서 링크 허브

## Tech Stack

### Frontend in this repo

- React 19
- Vite 7
- React Router DOM
- Styled Components
- Recharts
- Mermaid
- Axios

### Backend stack referenced by docs

- Spring Boot
- Spring Data JPA
- MySQL
- Redis
- JWT / Spring Security
- WebSocket / SSE

> 이 저장소는 백엔드 구현 저장소 자체라기보다, Petory 백엔드 설계와 문제 해결 과정을 포트폴리오 형식으로 보여주는 용도에 가깝습니다.

## Local Development

### Requirements

- Node.js `^20.19.0` or `>=22.12.0`
- npm

### Install

```bash
npm install
```

### Run

```bash
npm run dev
```

### Build

```bash
npm run build
npm run preview
```

## Environment Variables

필수는 아니지만 아래 값들을 상황에 따라 설정할 수 있습니다.

```env
VITE_USE_MOCK=true
VITE_API_BASE_URL=http://localhost:8080/api
VITE_NAVER_MAPS_KEY_ID=
```

- `VITE_USE_MOCK`
  - 기본 동작은 mock 사용입니다.
  - GitHub Pages 배포 환경에서는 mock 데이터로 동작합니다.
  - 실제 백엔드 연동 테스트를 하려면 `false`로 내려야 합니다.
- `VITE_API_BASE_URL`
  - 데모 일부 API 모듈에서 실제 백엔드 주소를 바라볼 때 사용합니다.
- `VITE_NAVER_MAPS_KEY_ID`
  - 지도 기능을 로컬에서 정상 확인하려면 필요합니다.

## Project Structure

```text
src/
├── components/                 # 공통 레이아웃, 네비게이션, Mermaid, TOC
├── contexts/                   # 포트폴리오 사이트 테마 상태
├── pages/
│   ├── HomePage.jsx
│   ├── DemoPage.jsx
│   ├── MCPFilesPage.jsx
│   └── projects/petory/domains/
├── demo/                       # 데모 앱 본체
├── mockData/                   # 데모용 더미 데이터
├── api/                        # axios mock interceptor
├── assets/                     # ERD 이미지 등
└── styles/

docs/
├── architecture/               # 전체 구조, ERD, 캐싱, 알림, 이메일 인증 등
├── domains/                    # 도메인별 상세 문서
├── troubleshooting/            # 성능/버그 분석
├── refactoring/                # 리팩토링 기록
├── concurrency/                # 동시성 제어 문서
├── migration/                  # SQL 마이그레이션
└── pet-data-api-docs/          # 추천/트렌드용 별도 API 문서
```

## Documentation Entry Points

- [docs/README.md](./docs/README.md) : 문서 인덱스
- [docs/architecture/overview.md](./docs/architecture/overview.md) : 전체 아키텍처 개요
- [docs/domains/location.md](./docs/domains/location.md) : 위치 서비스 설계와 UX 원칙
- [docs/troubleshooting/location/initial-load-performance.md](./docs/troubleshooting/location/initial-load-performance.md) : 대표 성능 개선 사례
- [docs/refactoring/fetch-optimization/README.md](./docs/refactoring/fetch-optimization/README.md) : Fetch 전략 기준 문서

## Notable Topics

- Board: 배치 조회 기반 N+1 문제 해결
- Location: 초기 로드 전략, 지역 탐색 UX, 네이버맵 연동
- Care/Meetup/Payment: 동시성 제어와 트랜잭션 설계
- Chat/Notification: 실시간 통신과 읽음 상태/알림 처리
- Recommendation: 별도 pet-data-api와 연결되는 추천 흐름

## Deployment

이 프로젝트는 GitHub Pages 기준으로 배포됩니다.

```bash
npm run build
npm run deploy
```

- `build` 시 `dist/index.html`을 `dist/404.html`로 복사해 SPA 라우팅 fallback을 맞춥니다.
- `main` 브랜치 푸시 시 GitHub Actions로도 자동 배포됩니다.

## Notes

- 데모는 mock 중심으로 설계되어 있어 실제 백엔드 저장소 없이도 주요 흐름을 확인할 수 있습니다.
- 문서 일부는 Petory 본 저장소 링크와 현재 포트폴리오 저장소 링크가 함께 섞여 있습니다.
- 추천 기능 관련 세부 문서는 `docs/pet-data-api-docs/`에 별도로 정리되어 있습니다.

## License

포트폴리오 용도로 작성된 저장소입니다.
