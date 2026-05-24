# pet-data-api 포트폴리오 페이지 계획

현재 레포(`dev` 브랜치) 기준으로 작성. 구버전(PostgreSQL·Kakao·LLM·`/recommend`) 내용은 완전히 제거됨.

---

## 1. 페이지가 말해야 할 한 가지

**"외부 서비스가 소비할 수 있는 반려동물 업종 인기도 인텔리전스를 어떻게 만들었는가"**

구체적으로: 네이버 블로그 언급을 형태소 분석·스코어링으로 정제하고, 배치 집계 결과를 Redis에 두어 빠른 읽기 API로 노출한 과정.

---

## 2. 프로젝트 한 줄 정의 (Hero)

> **네이버 블로그 기반 반려동물 서비스 트렌드·인기 상호 인텔리전스 API**  
> Popularity intelligence from blog mentions — Python/FastAPI · Redis · APScheduler

- "완성된 SaaS" 포장이 아니라 **신호 수집·집계 레이어** 로 명확히 표현한다.
- Petory(Java/Spring)가 소비 가능한 **외부 데이터 원천** 으로 포지셔닝한다.

---

## 3. 나의 역할 (정직하게)

이 레포는 기존 혼합 구조(Kakao·LLM·공공DB)를 **처음부터 재설계**한 버전이다. 아래 범위를 직접 구현했다.

| 레이어 | 내가 한 것 |
|--------|-----------|
| 수집 | Naver Blog Search API 비동기 호출, 카테고리별 쿼리 확장, 형태소(kiwipiepy) 분석 |
| 인기 스코어링 | `freshness_weight × mention_count` 정규화 공식, blocklist·PREFIX 노이즈 제거 |
| 위치 보강 | Naver 로컬 검색으로 인기 상호에 지역 정보 보강 |
| 서빙 | `GET /trends/{category}`, `GET /popular/{context}` Redis 읽기 API |
| 배치 | APScheduler 18:00/18:10 스케줄, `max_instances=1`, `POST /collect/trigger` 수동 트리거 |
| 인프라 | Redis TTL 설계, `X-API-Key` SHA-256 인증, `/readyz` Redis ping 헬스체크 |

---

## 4. 기술 흐름 (실제 코드 기준)

### 4.1 두 가지 신호 파이프라인

```
[네이버 블로그 API]
        │
        ├─→ 형태소 분석(kiwipiepy) ─→ 카테고리별 빈도 ─→ Redis `trends:{category}` ─→ GET /trends/{category}
        │
        └─→ 상호명 추출·스코어링 ────→ 컨텍스트별 랭킹 ─→ Redis `popular:{context}` ─→ GET /popular/{context}
                                              ↑
                                   Naver 로컬 검색 (위치 보강)
```

### 4.2 설계 포인트

- **배치(쓰기)만 외부 I/O**: 수집 배치만 네이버 API 호출. API 읽기는 Redis 조회만.
- **Redis 키 없으면 503**: 배치 전이면 데이터 없음을 명확히 반환.
- **freshness 공식**:
  ```
  freshness_weight = max(0, 1 - age_days / 180)
  raw_score = mention_count × avg_freshness
  score = raw_score / max(raw_score)
  ```
- **9개 context**: grooming, hospital, supplies, pharmacy, cafe, pension, restaurant, boarding, hotel  
  (snack/food/clothes → supplies 별칭)
- **운영 준비**: `/readyz`는 Redis ping만 검사 (DB 없음).

### 4.3 제거한 것 (재설계 맥락)

| 제거 | 이유 |
|------|------|
| PostgreSQL | Redis만으로 충분한 집계·TTL 관리 |
| Kakao Local API | Naver 로컬로 대체 |
| LLM (Ollama) | 요청 경로에서 분리, 응답 지연 제거 |
| `POST /recommend` | Petory 쪽이 위치 기반 시설 검색 담당 — 역할 분리 |

---

## 5. API 엔드포인트 (현재 버전 확정)

| 메서드 | 경로 | 인증 | 설명 |
|--------|------|------|------|
| GET | `/healthz` | 없음 | Liveness |
| GET | `/readyz` | 없음 | Redis ping readiness |
| GET | `/trends/{category}` | `X-API-Key` | 카테고리별 키워드 빈도 순위 |
| GET | `/popular/{context}` | `X-API-Key` | 컨텍스트별 인기 상호 JSON 배열 |
| POST | `/collect/trigger` | 관리자 `X-API-Key` | `{"targets":["trends","popular"]}` 수동 수집 |

---

## 6. 페이지 섹션 구성

| 섹션 | 내용 |
|------|------|
| Hero | 프로젝트 한 줄 정의 + 기술 배지 (Python / FastAPI / Redis / APScheduler) |
| 왜 분리했나 | 추천 로직과 신호 수집을 분리해야 하는 이유 (실패 영역·지연 시간 격리) |
| 두 신호 | 트렌드 키워드 vs 인기 상호 — 각각 무엇을 측정하는가 |
| 아키텍처 | 수집 파이프라인 → Redis → API 흐름도 |
| 설계 결정 | 배치 전용 쓰기, freshness 공식, 503 정책, APScheduler `max_instances=1` |
| 얻은 점 | 형태소 노이즈 제거, 스코어 정규화, 비동기 HTTP 클라이언트, Redis TTL 전략 |
| 링크 | GitHub 레포 + Swagger UI 스크린샷 |

---

## 7. 포트폴리오 / 이력서용 문구 후보

### 짧은 소개

> 네이버 블로그 언급을 비동기로 수집해 형태소 분석·freshness 스코어링으로 정제한 뒤 Redis에 집계, FastAPI로 반려동물 업종 트렌드·인기 상호 API를 제공하는 서비스를 설계·구현했다. 기존 혼합 구조(LLM·Kakao·PostgreSQL)를 Redis 단일 레이어로 재설계해 응답 지연과 운영 복잡도를 낮췄다.

### 이력서 한 줄

> 반려동물 인기도 인텔리전스: Naver 블로그 배치 수집·kiwipiepy 형태소·freshness 스코어 → Redis → FastAPI

---

## 8. 피해야 할 것

- "추천 엔진 구현" — 이 서버는 추천하지 않음. 신호만 제공.
- "LLM 활용" — 완전히 제거됨.
- "PostgreSQL 운영" — Redis만 사용.
- "Petory BFF 통합 구현" — 이 레포는 소비 API이지 BFF가 아님.
- "실시간 처리" — 배치 집계 방식이 핵심.

---

## 9. 체크리스트

- [ ] 다이어그램에 LLM·PostgreSQL·Kakao가 없는지 확인
- [ ] API 표에 `/recommend` 없는지 확인
- [ ] 두 신호(`/trends`, `/popular`) 역할을 명확히 구분해 설명
- [ ] `freshness_weight` 공식을 한 줄이라도 언급 (스코어링 설계 포인트)
- [ ] "배치 전용 쓰기, Redis 전용 읽기" 분리를 한 문장으로 표현
- [ ] GitHub 링크·Swagger 스크린샷 연결
