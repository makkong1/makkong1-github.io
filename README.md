# 🐾 Petory Portfolio

반려동물 통합 플랫폼 **Petory** 프로젝트의 포트폴리오 사이트입니다.

> **Petory**는 게시판, 펫케어 요청, 실종 동물 찾기, 위치 기반 서비스, 오프라인 모임 등 다양한 기능을 제공하는 반려동물 커뮤니티 플랫폼입니다.

🌐 **Live Demo**: [https://makkong1.github.io/makkong1-github.io](https://makkong1.github.io/makkong1-github.io)

---

## 📊 핵심 성과

### 성능 최적화 하이라이트

#### 🎯 Board 도메인 (게시판)
- **쿼리 수**: 301개 → **3개** (99% 감소)
- **실행 시간**: 745ms → **30ms** (24.83배 개선)
- **메모리 사용량**: 22.50 MB → **2 MB** (91% 감소)
- **최적화 기법**: Fetch Join, 배치 조회, 인기글 스냅샷

#### 📍 Location 도메인 (위치 서비스)
- **조회 데이터 수**: 22,699개 → **1,026개** (95.5% 감소)
- **프론트엔드 처리 시간**: 1,484ms → **700ms** (52.8% 개선, 2.1배 빠름)
- **네트워크 전송량**: 22 MB → **1 MB** (95.5% 감소)
- **메모리 사용량**: 78.90 MB → **28.6 MB** (63.8% 감소)
- **최적화 기법**: 위치 기반 초기 로드, ST_Distance_Sphere 활용

---

## 🛠 기술 스택

### Frontend
- **Framework**: React 19.2.0
- **Build Tool**: Vite 7.2.4
- **Styling**: Styled Components 6.1.19
- **Routing**: React Router DOM 6.28.0
- **Charts**: Recharts 3.6.0
- **Diagram**: Mermaid 10.6.1

### Backend (참고)
- **Framework**: Spring Boot 3.x
- **Language**: Java 17+
- **ORM**: Spring Data JPA (Hibernate)
- **Database**: MySQL
- **Security**: Spring Security + JWT
- **Cache**: Spring Cache, Redis
- **Real-time**: WebSocket (STOMP), SSE

---

## 🎯 주요 기능

### 핵심 도메인

| 도메인 | 주요 기능 | 성능 최적화 |
|--------|----------|------------|
| **Board** | 커뮤니티 게시판, 댓글, 반응, 인기글 | N+1 문제 해결 (301→3 쿼리), 인기글 스냅샷 |
| **Location** | 위치 기반 서비스, 리뷰, 네이버맵 연동 | 위치 기반 초기 로드 (95.5% 데이터 감소) |
| **Care** | 펫케어 요청/지원, 매칭, 리뷰 | 트랜잭션 관리, 동시성 제어 |
| **Chat** | 실시간 채팅 (WebSocket/SSE) | 읽음 상태 최적화, 메시지 배치 처리 |
| **Meetup** | 오프라인 모임, 참여자 관리 | 동시성 제어 (Race Condition 해결) |
| **Missing Pet** | 실종 동물 신고 및 찾기 | 이미지 최적화, 검색 성능 향상 |
| **User** | 사용자 관리, 소셜 로그인, 제재 시스템 | JWT 인증, 소프트 삭제 |
| **Notification** | 실시간 알림 시스템 | Redis 기반 알림 큐, SSE 스트리밍 |

### 지원 기능
- **Report**: 신고 및 제재 시스템
- **Statistics**: 일별 통계 수집 및 대시보드
- **File**: 파일 업로드/다운로드 관리
- **Activity**: 사용자 활동 로그

---

## 🚀 시작하기

### 사전 요구사항
- Node.js 18+ 
- npm 또는 yarn

### 설치 및 실행

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev

# 프로덕션 빌드
npm run build

# 빌드 미리보기
npm run preview

# GitHub Pages 배포
npm run deploy
```

### 프로젝트 구조

```
Petory-Portfolio/
├── src/
│   ├── pages/              # 페이지 컴포넌트
│   │   ├── HomePage.jsx    # 메인 페이지
│   │   └── domains/        # 도메인별 상세 페이지
│   │       ├── BoardDomain.jsx
│   │       ├── LocationDomain.jsx
│   │       ├── ChatDomain.jsx
│   │       └── ...
│   ├── components/         # 공통 컴포넌트
│   │   └── Common/         # MermaidDiagram, TableOfContents 등
│   ├── api/                # API 클라이언트
│   └── utils/              # 유틸리티 함수
├── docs/                   # 상세 문서
│   ├── architecture/       # 아키텍처 문서
│   ├── domains/            # 도메인별 상세 문서
│   ├── troubleshooting/    # 문제 해결 사례
│   └── performance/        # 성능 최적화 문서
└── public/                 # 정적 파일
```

---

## 📈 성능 최적화 사례

### 1. Board 도메인: N+1 문제 해결

**문제**: 게시글 목록 조회 시 각 게시글마다 작성자, 반응 정보를 개별 쿼리로 조회

**해결**:
- Fetch Join으로 작성자 정보 함께 조회
- 배치 조회로 반응 정보 IN 절 집계
- 인기글 스냅샷 생성으로 복잡한 계산 최적화

**결과**:
- 쿼리 수: 301개 → 3개 (99% 감소)
- 실행 시간: 745ms → 30ms (24.83배 개선)

[상세 문서 보기](./docs/troubleshooting/board/performance-optimization.md)

### 2. Location 도메인: 초기 로드 성능 개선

**문제**: 초기 로드 시 전체 데이터(22,699개) 조회로 인한 성능 저하

**해결**:
- 사용자 위치 기반 10km 반경 검색으로 데이터 양 감소
- MySQL `ST_Distance_Sphere` 함수 활용
- 백엔드에서 위치 기반 필터링 수행

**결과**:
- 조회 데이터: 22,699개 → 1,026개 (95.5% 감소)
- 처리 시간: 1,484ms → 700ms (52.8% 개선)
- 네트워크 전송량: 22 MB → 1 MB (95.5% 감소)

[상세 문서 보기](./docs/troubleshooting/location/initial-load-performance.md)

### 3. Chat 도메인: 읽음 상태 성능 최적화

**문제**: 채팅방 목록 조회 시 읽음 상태를 개별 쿼리로 조회

**해결**:
- 배치 조회로 읽음 상태 정보 한 번에 조회
- Redis 캐싱 활용

[상세 문서 보기](./docs/troubleshooting/chat/read-status-performance.md)

---

## 🏗 아키텍처

### 레이어드 아키텍처
- **Controller Layer**: REST API, WebSocket, SSE 엔드포인트
- **Service Layer**: 비즈니스 로직 처리
- **Repository Layer**: 데이터 액세스 (JPA)
- **Entity Layer**: 도메인 모델

### 도메인 주도 설계 (DDD)
- 도메인별 패키지 구조로 응집도 향상
- 명확한 도메인 경계와 책임 분리

### 실시간 통신
- **WebSocket (STOMP)**: 실시간 채팅
- **Server-Sent Events (SSE)**: 실시간 알림

---

## 📚 문서

### 아키텍처 문서
- [전체 아키텍처 개요](./docs/architecture/overview.md)
- [도메인 간 연관관계](./docs/architecture/domain-relationships.md)
- [데이터베이스 ERD](./docs/architecture/erd.md)

### 도메인별 상세 문서
- [Board 도메인](./docs/domains/board.md)
- [Location 도메인](./docs/domains/location.md)
- [Chat 도메인](./docs/domains/chat.md)
- [Care 도메인](./docs/domains/care.md)
- [User 도메인](./docs/domains/user.md)
- [전체 도메인 목록](./docs/README.md)

### 문제 해결 사례
- [Board 성능 최적화](./docs/troubleshooting/board/performance-optimization.md)
- [Location 초기 로드 성능](./docs/troubleshooting/location/initial-load-performance.md)
- [Chat 읽음 상태 성능](./docs/troubleshooting/chat/read-status-performance.md)
- [Meetup 동시성 제어](./docs/troubleshooting/meetup/race-condition-participants.md)

---

## 🎨 주요 특징

### UX 설계 원칙
- **"지도는 상태를 바꾸지 않는다"**: 지도 이동 시 자동 API 호출 제거
- **InitialLoadSearch vs UserTriggeredSearch 분리**: 시스템 주도 vs 사용자 주도 검색 구분
- **빈 상태 UX 처리**: 검색 결과 0개, 위치 권한 거부 시 명확한 안내

### 성능 최적화 전략
- **Fetch Join**: N+1 문제 해결
- **배치 조회**: IN 절을 활용한 집계 쿼리
- **캐싱**: Spring Cache, Redis 활용
- **스냅샷**: 복잡한 계산 결과 미리 생성
- **인덱싱**: 복합 인덱스로 쿼리 성능 향상

### 동시성 제어
- **Unique 제약**: 중복 데이터 방지
- **트랜잭션 관리**: 원자적 연산 보장
- **락 전략**: 낙관적/비관적 락 적용

---

## 📦 배포

### GitHub Pages
이 프로젝트는 GitHub Pages를 통해 배포됩니다.

```bash
# 빌드 및 배포
npm run build
npm run deploy
```

**배포 주소**: [https://makkong1.github.io/makkong1-github.io](https://makkong1.github.io/makkong1-github.io)

---

## 🔗 관련 링크

- **포트폴리오 사이트**: [https://makkong1.github.io/makkong1-github.io](https://makkong1.github.io/makkong1-github.io)
- **상세 문서**: [docs/README.md](./docs/README.md)
- **아키텍처 문서**: [docs/architecture/](./docs/architecture/)

---

## 📝 라이선스

이 프로젝트는 포트폴리오 목적으로 제작되었습니다.

---

## 👨‍💻 작성자

**makkong1**

반려동물 커뮤니티 플랫폼 Petory 프로젝트의 포트폴리오 사이트입니다.

