# Petory 포트폴리오 사이트 — 다크 프리미엄 리디자인 설계

- 작성일: 2026-07-07
- 대상 레포: `makkong1-github.io` (포트폴리오 사이트)
- 범위 밖: 실제 Petory 앱 / Live Demo (`github.com/makkong1/Petory`, `/demo`)

---

## 1. 배경과 목표

현재 사이트는 정보 구조와 콘텐츠는 탄탄하지만, 시각 완성도가 "정리 잘한 문서" 수준에 머문다. 구체적 문제:

- **브랜드 색이 테마마다 다름**: 라이트=주황(`#ff7e36`), 다크=보라(`#646cff`). 한 브랜드로 안 읽힘.
- **다크 대비 부족**: 배경 `#1a1a1a` vs 카드 `#2a2a2a`가 거의 안 떨어지고, `section-card > project-card` 카드-속-카드로 경계가 뭉개짐.
- **네비게이션 과밀**: 도메인 페이지에서 최상위 링크 13개가 같은 크기로 나열되어 스캔 불가.
- **히어로가 허전**: 옅은 회색 카드에 텍스트만. 임팩트 없음.
- **폰트가 완전 시스템 기본**: 개성 없음. 한글도 시스템 폰트.

**목표**: 전체 페이지를 **다크 전용 · Framer 프리미엄 · 웜 오렌지 시그니처**로 통일해, 채용담당자가 첫 화면에서 "설계된 사이트"로 인지하게 만든다. 정보 구조는 유지하되 시각·레이아웃 수준을 한 단계 끌어올린다.

## 2. 확정된 방향 (브레인스토밍 결과)

| 결정 | 값 | 근거 |
|---|---|---|
| 무드 | 다크 프리미엄 (Framer 감성) | 임팩트, 백엔드 포트폴리오와 어울림 |
| 테마 | **다크 전용** (라이트/토글 제거) | glow·글래스를 제대로 살리고 유지보수 절반 |
| 시그니처 색 | **웜 오렌지** (`#ff8a3c`) | 기존 브랜드 계승, 남들 다 쓰는 보라 회피 |
| 범위 | **전체 페이지** 꼼꼼히 | 공통 토큰으로 11개 도메인 페이지 자동 반영 + 앵커 페이지 레이아웃까지 |
| 네비 | `Domains ▾` 드롭다운으로 축약 | 13개 → 6개 수준 |
| 실제 앱/데모 | **이번 범위 제외, 독립 유지** | 소비자 제품과 마케팅 페이지는 관객이 다름. 공유하는 건 오렌지 색 + "Petory" 워드마크뿐 |

### 2.1 데모를 통일하지 않는 이유 (명시적 비적용)

- 포트폴리오 사이트 = *너를 파는 마케팅 페이지* (채용담당자 대상, 드라마틱 OK)
- Petory 앱 = *반려동물 보호자용 소비자 제품* (낮·야외·모바일, 따뜻함·가독성·신뢰 필요)
- 글래스·glow는 채팅/게시판/지도/결제 같은 리스트·폼 중심 화면의 사용성을 깎는다.
- 이미 `global.css`의 `[data-demo-container]`가 포트폴리오 변수를 리셋해 데모를 격리 중 → 이 격리는 **유지**한다.
- "일관성"은 같은 색을 쓰는 것이지 같은 화면을 만드는 게 아니다.

## 3. 디자인 시스템 (Phase 1의 산출물)

모든 페이지가 `global.css` 하나를 공유하므로, 토큰·유틸만 재정의하면 11개 도메인 페이지가 코드 수정 없이 새 룩을 입는다.

### 3.1 색 토큰 (다크 단일 세트)

```css
:root {
  /* 배경 3단 레이어 — 카드가 배경에 확실히 떨어지도록 */
  --bg:         #0e0d0c;   /* 최하단 페이지 배경 */
  --surface:    #1a1815;   /* 기본 카드 */
  --surface-2:  #242019;   /* 카드 위 카드 / 강조 카드 */
  --border:     rgba(255,255,255,.08);
  --border-strong: rgba(255,255,255,.14);

  /* 시그니처 — 웜 오렌지 */
  --accent:        #ff8a3c;
  --accent-strong: #ff6f2c;
  --accent-soft:   rgba(255,138,60,.14);   /* 배지·pill 배경 */
  --accent-glow:   rgba(255,120,50,.40);   /* radial glow */

  /* 텍스트 계단 */
  --text:      #ededf0;
  --text-dim:  #a7a7b0;
  --text-mute: #6f6f78;

  --link-color: var(--accent);
  --link-hover: var(--accent-strong);
}
```

- 기존 `[data-theme="dark"]` / 라이트 `:root` 두 벌 → **위 단일 세트로 통합**.
- `--card-bg`, `--nav-bg`, `--code-bg` 등 기존 변수명은 새 토큰으로 매핑해 하위 호환 유지(도메인 페이지들이 참조 중이므로 변수명은 남기고 값만 교체).

### 3.2 프리미엄 유틸리티 (신규)

```css
/* 반투명 글래스 카드 */
.glass {
  background: rgba(255,255,255,.05);
  border: 1px solid var(--border);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border-radius: 16px;
}

/* 웜 오렌지 radial glow — 히어로/섹션 상단에 딱 하나, 은은하게 */
.glow-bg { position: relative; overflow: hidden; }
.glow-bg::before {
  content:""; position:absolute; inset:0;
  background: radial-gradient(120% 130% at 12% -10%, var(--accent-glow) 0%, transparent 55%);
  pointer-events:none;
}

/* 카드 hover — 보더가 오렌지로 밝아지고 미세하게 떠오름 */
.card-lift { transition: transform .2s ease, border-color .2s ease, box-shadow .2s ease; }
.card-lift:hover {
  transform: translateY(-2px);
  border-color: var(--border-strong);
  box-shadow: 0 8px 30px rgba(0,0,0,.35);
}

/* 버튼 위계 */
.btn-primary {
  background: linear-gradient(90deg, var(--accent), var(--accent-strong));
  color:#1a1008; font-weight:700; border-radius:10px; padding:.75rem 1.5rem;
  box-shadow: 0 6px 24px var(--accent-glow);
}
.btn-secondary {
  background: transparent; color: var(--text);
  border:1px solid var(--border-strong); border-radius:10px; padding:.75rem 1.5rem; font-weight:600;
}
```

### 3.3 타이포그래피

- **Pretendard 로컬 번들** (한글 본문/제목). CSP·오프라인 안전을 위해 CDN 금지 → `public/fonts/`에 `.woff2` 서브셋을 두고 `@font-face`로 로드, `font-display: swap`.
- 영문/숫자는 Pretendard에 포함되지만, 성과 숫자 등 큰 수치는 `font-feature-settings: "tnum"` (tabular) 적용해 자릿수 정렬.
- 위계 재정비 (기존 h1 3.5rem/h2 2em이 과함):

| 요소 | 크기 | weight | letter-spacing |
|---|---|---|---|
| hero h1 | `clamp(2.6rem, 5vw, 3.4rem)` | 800 | -.02em |
| section h2 | `1.9rem` | 750 | -.01em |
| card h3 | `1.15rem` | 700 | 0 |
| eyebrow 라벨 | `.72rem` | 700 | .16em (uppercase) |
| body | `1rem`/`1.05rem` | 400 | 0, line-height 1.75 |

## 4. 구조·레이아웃 변경

### 4.1 네비게이션 (`Navigation.jsx`)
- 도메인 11개 나열 → **`Domains ▾` 드롭다운**으로 축약. 최상위: `Home · Petory · Domains ▾ · Infra · Flows · Live Demo`.
- 드롭다운은 CSS/간단한 상태로 구현(외부 의존성 없이), 현재 활성 도메인 하이라이트.
- 스크롤 시 헤더가 `.glass`로 고정되고 아래로 갈수록 배경이 살짝 진해짐(스크롤 위치 기반 클래스 토글).
- **테마 토글 버튼 제거** (다크 전용).

### 4.2 테마 시스템 정리 (주의 영역)
- `ThemeContext`는 항상 `theme='dark'`를 반환하도록 단순화, `data-theme="dark"`를 고정 세팅.
- 단, `SITE_THEME_SYNC` / `petory-theme` localStorage는 **데모 앱이 자체 테마와 동기화하는 통로**다. 포트폴리오를 다크 고정하되, 데모의 독립 토글을 깨지 않도록 sync 이벤트는 유지하거나 데모 방향으로만 흐르게 한다. `PetoryProjectPage.jsx`의 `data-theme` MutationObserver도 다크 고정에 맞춰 정리.
- `index.html`에 인라인 스크립트로 첫 페인트 전에 `data-theme="dark"` 세팅(FOUC 방지).

### 4.3 카드 시스템 통일
- `section-card > project-card` 카드-속-카드 → **바깥은 배경 구획(보더 없음) / 안쪽만 `.glass` 카드**.
- 성과 카드·도메인 카드·문제해결 카드·기술스택 카드 전부 동일 규격(`.glass` + `.card-lift`).
- 문제해결 카드 번호(01~04): 파란색 → **오렌지 모노스페이스 큰 숫자**.

### 4.4 섹션 리듬
- 섹션 간 수직 여백 확대(다크 프리미엄은 여백이 생명).
- 각 섹션 제목 위에 오렌지 eyebrow 라벨(예: `ACHIEVEMENTS`, `ARCHITECTURE`).
- TOC 사이드바(`TableOfContents.jsx`): `.glass`로 다듬고 활성 항목 오렌지.

### 4.5 히어로 재설계 (홈 + Petory)
- `.glow-bg` 웜 오렌지 배경 + 성과 지표를 히어로 안 `.glass` 카드로 끌어올림(3초 안에 핵심 숫자).
- 버튼 위계: Live Demo = `.btn-primary`(오렌지 채움) / GitHub = `.btn-secondary`(외곽선). 기존 초록+주황 혼용 제거.

### 4.6 도메인 페이지 공통 헤더
- 11개 도메인 페이지가 구조가 유사 → 공통 헤더 패턴(도메인명 + eyebrow + 한줄 설명 + `.glow-bg`)으로 일관성 확보.

### 4.7 Mermaid 다이어그램
- `MermaidDiagram.jsx`가 `isDarkMode`로 노드 색을 분기 중. 다크 고정에 맞춰 팔레트를 새 토큰(오렌지 계열 강조 + surface 배경)과 정합.

## 5. 영향 받는 페이지 인벤토리

| 페이지 | 경로 | Phase |
|---|---|---|
| 홈(이력서) | `/` (`HomePage.jsx`) | 3 |
| Petory 메인 | `/portfolio/petory` (`PetoryProjectPage.jsx`) | 3 |
| 도메인 11개 (+optimization/refactoring 변형) | `/domains/*` | 1(자동)→4(마감) |
| Flows | `/domains/flows` (`PetoryFlowsPage.jsx`) | 4 |
| Infra | `/infra` (`InfraPage.jsx`) | 4 |
| Docs | `/docs` (`MCPFilesPage.jsx`) | 4 |
| Demo | `/demo` (`DemoPage.jsx`) | **제외(격리 유지)** |

## 6. 단계 (구현 순서)

- **Phase 1 — 디자인 시스템 기반**: `global.css` 다크 단일 토큰 재정의 + `.glass`/`.glow-bg`/`.card-lift`/버튼 유틸 + Pretendard 번들 + 타이포 위계 + 라이트/토글 제거 + 데모 격리 유지. **완료 기준: 11개 도메인 페이지가 코드 수정 없이 새 다크 룩으로 전환됨(스크린샷 확인).**
- **Phase 2 — 공통 크롬**: 네비 `Domains ▾` 드롭다운 + 스크롤 글래스 헤더 + 카드-속-카드 정리 + TOC 글래스.
- **Phase 3 — 앵커 페이지**: 홈·Petory 히어로 재설계(glow + 성과 글래스 + 버튼 위계) + eyebrow 라벨 + 여백 리듬 + 문제해결 카드 오렌지 번호.
- **Phase 4 — 나머지 마감**: 도메인 공통 헤더 통일 + Infra·Flows·Docs 개별 점검 + Mermaid 다크 팔레트 정합.

각 Phase 종료 시 실제 페이지 스크린샷(라이트/다크가 아니라 다크 단일)으로 회귀 확인.

## 7. 비목표 (YAGNI)

- 라이트 모드 유지/재도입 — 하지 않음.
- 실제 Petory 앱/데모 리스타일 — 하지 않음.
- 콘텐츠·정보 구조 변경 — 하지 않음(문구 교정은 별건).
- 애니메이션 라이브러리 도입 — 하지 않음. CSS transition 수준으로 충분.
- 반응형 재설계 — 기존 반응형 유지, 다크 토큰만 반영(회귀만 점검).

## 8. 리스크 / 주의 영역

1. **테마 sync 디커플링**: `SITE_THEME_SYNC`·`petory-theme`가 데모와 얽혀 있어, 다크 고정이 데모 토글을 깨지 않는지 확인 필요(§4.2).
2. **Pretendard 번들**: CDN 금지. 서브셋 `.woff2` 용량·라이선스(OFL) 확인, `font-display: swap`.
3. **하위 호환 변수명**: 도메인 페이지들이 `--card-bg` 등 기존 변수명을 직접 참조 → 변수명 유지하고 값만 교체(대량 grep 필요).
4. **Mermaid 다크 정합**: 다이어그램 노드 색이 새 토큰과 충돌하지 않는지.
5. **backdrop-filter 성능**: 글래스 카드 남발 시 스크롤 성능 저하. 큰 컨테이너엔 blur 자제, 카드 단위로만.
6. **GitHub Pages 배포**: 폰트 경로가 `homepage` base(`/makkong1-github.io/`)와 맞는지.

## 9. 검증

- Phase별 `npm run dev` + Playwright(로컬 Chrome)로 홈·Petory·대표 도메인 2~3개·Infra 스크린샷.
- 콘솔 에러 0, 폰트 로드 확인, 스크롤 헤더/드롭다운 동작 확인.
- `npm run build` 성공 + 폰트·에셋 경로 정상.
