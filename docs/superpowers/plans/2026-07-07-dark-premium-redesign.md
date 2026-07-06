# 다크 프리미엄 리디자인 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 포트폴리오 사이트 전체를 다크 전용 · Framer 프리미엄 · 웜 오렌지 시그니처로 통일한다.

**Architecture:** 모든 페이지가 공유하는 `src/styles/global.css`의 토큰·유틸을 다크 단일 세트로 재정의해 11개 도메인 페이지를 자동 반영시키고(Phase 1), 공통 크롬(네비/카드/TOC)과 앵커 페이지(홈·Petory) 레이아웃을 다듬은 뒤(Phase 2–3), 나머지 페이지를 마감한다(Phase 4). 실제 Petory 앱/데모(`/demo`, `[data-demo-container]`)는 격리를 유지하고 건드리지 않는다.

**Tech Stack:** React 19 + Vite 7, 순수 CSS(단일 `global.css`), react-router-dom, Pretendard(로컬 번들), Playwright-core(로컬 Chrome, 스크린샷 검증).

## Global Constraints

- **다크 전용**: 라이트 모드 토큰·토글을 제거한다. 사이트는 항상 `data-theme="dark"`.
- **시그니처 색**: 웜 오렌지 `--accent: #ff8a3c`, `--accent-strong: #ff6f2c`. 보라(`#646cff`) 잔재 전부 제거.
- **외부 네트워크 금지**: 폰트·에셋은 CDN 금지, 레포에 번들. 런타임 외부 요청 없음.
- **레거시 변수명 유지**: 도메인 페이지들이 `--card-bg`, `--nav-bg`, `--text-secondary`, `--text-muted`, `--code-bg`, `--nav-border`, `--link-color`, `--link-hover`, `--bg-color`, `--text-color` 등을 직접 참조한다. **변수명은 남기고 값만 새 토큰으로 교체**한다.
- **데모 격리 유지**: `[data-demo-container]`의 변수 리셋 규칙과 `/demo`(`DemoPage.jsx`)는 수정하지 않는다.
- **배포 base path**: `homepage`가 `/makkong1-github.io/`. 폰트 등 절대경로 에셋은 이 base를 고려한다(권장: `public/`에 두고 `/fonts/...` 참조 → Vite가 base를 붙임).
- **검증**: 각 태스크는 `npm run build` 성공 + Playwright 스크린샷 + 콘솔 에러 0으로 끝난다. 유닛테스트 프레임워크는 이 레포에 없다.

---

## 공용 검증 스크립트 (한 번 만들어 재사용)

여러 태스크에서 스크린샷 검증에 쓴다. Task 0에서 생성.

### Task 0: 스크린샷 검증 하네스

**Files:**
- Create: `scripts/shot.mjs`

**Interfaces:**
- Produces: `node scripts/shot.mjs <route> <outname> [route2 out2 ...]` — 실행 중인 dev 서버(`http://localhost:5173/makkong1-github.io`)의 경로들을 `scripts/_shots/<outname>.png`로 풀페이지 캡처. 콘솔 에러를 stderr로 출력.

- [ ] **Step 1: 스크립트 작성**

```javascript
// scripts/shot.mjs
import { chromium } from 'playwright-core';
import { mkdirSync } from 'fs';
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const BASE = 'http://localhost:5173/makkong1-github.io';
const OUT = new URL('./_shots/', import.meta.url).pathname;
mkdirSync(OUT, { recursive: true });
const args = process.argv.slice(2); // route out route out ...
const pairs = [];
for (let i = 0; i < args.length; i += 2) pairs.push([args[i], args[i + 1]]);
const browser = await chromium.launch({ executablePath: CHROME });
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 });
const page = await ctx.newPage();
const errors = [];
page.on('console', m => { if (m.type() === 'error') errors.push(m.text()); });
page.on('pageerror', e => errors.push(String(e)));
for (const [route, out] of pairs) {
  await page.goto(BASE + route, { waitUntil: 'networkidle' });
  await page.waitForTimeout(1200);
  await page.screenshot({ path: `${OUT}${out}.png`, fullPage: true });
  console.log('saved', out);
}
await browser.close();
if (errors.length) { console.error('CONSOLE ERRORS:\n' + errors.join('\n')); process.exit(2); }
```

- [ ] **Step 2: `.gitignore`에 산출물 무시 추가**

`scripts/_shots/` 한 줄을 `.gitignore`에 추가.

- [ ] **Step 3: 동작 확인 (현재 상태 베이스라인)**

```bash
npm run dev  # 백그라운드로 실행
node scripts/shot.mjs /portfolio/petory baseline-petory /domains/board baseline-board
```
Expected: `saved baseline-petory`, `saved baseline-board` 출력, `scripts/_shots/`에 PNG 2장. (베이스라인 비교용)

- [ ] **Step 4: 커밋**

```bash
git add scripts/shot.mjs .gitignore
git commit -m "chore: add screenshot verification harness"
```

---

## Phase 1 — 디자인 시스템 기반

### Task 1: Pretendard 로컬 번들 + @font-face

**Files:**
- Create: `public/fonts/PretendardVariable.woff2`
- Modify: `src/styles/global.css` (최상단 `@font-face` + `:root { font-family }`)

**Interfaces:**
- Produces: 전역에서 `font-family: 'Pretendard', ...` 사용 가능.

- [ ] **Step 1: 폰트 파일 다운로드 (레포에 번들)**

```bash
mkdir -p public/fonts
curl -L -o public/fonts/PretendardVariable.woff2 \
  https://github.com/orioncactus/pretendard/raw/main/packages/pretendard/dist/web/variable/woff2/PretendardVariable.woff2
```
Expected: `public/fonts/PretendardVariable.woff2` 생성(약 1–2MB). 이 파일은 **빌드 시 번들**되며 런타임 외부 요청이 아니다(제약 준수).

- [ ] **Step 2: `global.css` 최상단에 @font-face 추가**

파일 맨 위(`* { margin:0 }`보다 위)에 삽입:

```css
@font-face {
  font-family: 'Pretendard';
  font-weight: 45 920;
  font-style: normal;
  font-display: swap;
  src: url('/fonts/PretendardVariable.woff2') format('woff2-variations');
}
```

- [ ] **Step 3: `:root`의 `font-family`를 Pretendard 우선으로 교체**

`global.css`에서 `:root { font-family: -apple-system, ... }` 블록을 찾아 스택 맨 앞에 `'Pretendard',`를 추가:

```css
:root {
  font-family: 'Pretendard', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    'Roboto', 'Helvetica Neue', sans-serif;
  /* 이하 기존 속성 유지 */
```

- [ ] **Step 4: 빌드 + 폰트 로드 확인**

```bash
npm run build
npm run dev  # 재시작
node scripts/shot.mjs /portfolio/petory font-check
```
Expected: 빌드 성공, 스크린샷의 한글 본문이 Pretendard(둥근 고딕)로 렌더, 콘솔 에러 0.

- [ ] **Step 5: 커밋**

```bash
git add public/fonts/PretendardVariable.woff2 src/styles/global.css
git commit -m "feat: bundle Pretendard font locally"
```

### Task 2: 색 토큰을 다크 단일 세트로 재정의

**Files:**
- Modify: `src/styles/global.css` (`:root` 색 변수, `[data-theme="dark"]` 블록)

**Interfaces:**
- Produces: 신규 토큰 `--bg --surface --surface-2 --border --border-strong --accent --accent-strong --accent-soft --accent-glow --text --text-dim --text-mute`. 레거시 변수명(`--bg-color --text-color --nav-bg --nav-border --link-color --link-hover --card-bg --code-bg --text-secondary --text-muted`)은 새 토큰에 매핑되어 유지.

- [ ] **Step 1: `:root` 색 변수 블록을 아래로 교체**

`global.css`의 `:root { ... --text-muted: #9e9e9e; }` 안의 **색 관련 변수들**을 다음으로 교체(폰트·타이포 속성은 유지):

```css
  /* === 다크 프리미엄 단일 토큰 === */
  --bg:            #0e0d0c;
  --surface:       #1a1815;
  --surface-2:     #242019;
  --border:        rgba(255,255,255,.08);
  --border-strong: rgba(255,255,255,.14);

  --accent:        #ff8a3c;
  --accent-strong: #ff6f2c;
  --accent-soft:   rgba(255,138,60,.14);
  --accent-glow:   rgba(255,120,50,.40);

  --text:      #ededf0;
  --text-dim:  #a7a7b0;
  --text-mute: #6f6f78;

  /* === 레거시 변수명 → 새 토큰 매핑 (도메인 페이지 호환) === */
  --bg-color:        var(--bg);
  --text-color:      var(--text);
  --nav-bg:          rgba(20,18,16,.72);
  --nav-border:      var(--border);
  --link-color:      var(--accent);
  --link-hover:      var(--accent-strong);
  --card-bg:         var(--surface);
  --code-bg:         #14120f;
  --text-secondary:  var(--text-dim);
  --text-muted:      var(--text-mute);
```

- [ ] **Step 2: `[data-theme="dark"]` 블록 제거(또는 무력화)**

`[data-theme="dark"] { ... }` 블록 전체를 삭제한다. 이제 `:root`가 곧 다크다. (`color-scheme: dark;`는 `:root`에 한 줄 추가: `color-scheme: dark;`)

- [ ] **Step 3: 보라 잔재 grep 제거**

```bash
grep -rn "#646cff\|#747bff" src/
```
나오는 하드코딩 보라색을 `var(--accent)` / `var(--accent-strong)`로 교체. Expected: grep 결과 0.

- [ ] **Step 4: 빌드 + 도메인 페이지 자동 반영 확인**

```bash
npm run build && npm run dev
node scripts/shot.mjs /portfolio/petory tok-petory /domains/board tok-board /domains/chat tok-chat
```
Expected: 세 페이지 모두 새 다크(딥 브라운-블랙 배경, 오렌지 강조)로 렌더. 도메인 페이지들을 **직접 수정하지 않았는데** 룩이 바뀌어야 함. 콘솔 에러 0.

- [ ] **Step 5: 커밋**

```bash
git add src/styles/global.css
git commit -m "feat: dark-only color tokens with warm orange signature"
```

### Task 3: 프리미엄 유틸리티 클래스 추가

**Files:**
- Modify: `src/styles/global.css` (신규 유틸 블록 추가)

**Interfaces:**
- Produces: `.glass`, `.glow-bg`, `.card-lift`, `.btn-primary`, `.btn-secondary` 클래스.

- [ ] **Step 1: `global.css` 하단에 유틸 블록 추가**

```css
/* ===== 프리미엄 유틸리티 ===== */
.glass {
  background: rgba(255,255,255,.05);
  border: 1px solid var(--border);
  -webkit-backdrop-filter: blur(10px);
  backdrop-filter: blur(10px);
  border-radius: 16px;
}
.glow-bg { position: relative; overflow: hidden; }
.glow-bg::before {
  content: ""; position: absolute; inset: 0; z-index: 0;
  background: radial-gradient(120% 130% at 12% -10%, var(--accent-glow) 0%, transparent 55%);
  pointer-events: none;
}
.glow-bg > * { position: relative; z-index: 1; }

.card-lift { transition: transform .2s ease, border-color .2s ease, box-shadow .2s ease; }
.card-lift:hover {
  transform: translateY(-2px);
  border-color: var(--border-strong);
  box-shadow: 0 8px 30px rgba(0,0,0,.35);
}

.btn-primary {
  display: inline-block; padding: .75rem 1.5rem; border-radius: 10px;
  background: linear-gradient(90deg, var(--accent), var(--accent-strong));
  color: #1a1008; font-weight: 700; border: none; cursor: pointer;
  box-shadow: 0 6px 24px var(--accent-glow); transition: filter .2s ease, transform .2s ease;
}
.btn-primary:hover { filter: brightness(1.06); transform: translateY(-1px); }
.btn-secondary {
  display: inline-block; padding: .75rem 1.5rem; border-radius: 10px;
  background: transparent; color: var(--text);
  border: 1px solid var(--border-strong); font-weight: 600; cursor: pointer;
  transition: border-color .2s ease, background .2s ease;
}
.btn-secondary:hover { border-color: var(--accent); background: var(--accent-soft); }
```

- [ ] **Step 2: 유틸 단독 렌더 확인용 임시 프로브(선택) — 건너뛰고 Task 8에서 실사용 확인**

- [ ] **Step 3: 빌드 확인**

```bash
npm run build
```
Expected: 성공.

- [ ] **Step 4: 커밋**

```bash
git add src/styles/global.css
git commit -m "feat: add glass/glow/card-lift/button utilities"
```

### Task 4: 타이포그래피 위계 재정비

**Files:**
- Modify: `src/styles/global.css` (`h1 h2 h3 p` 및 `.project-hero h1` 등)

**Interfaces:**
- Produces: 새 제목 크기 계단. eyebrow용 `.eyebrow` 클래스.

- [ ] **Step 1: 전역 heading 크기 교체**

`global.css`의 `h1 { font-size:2.5em ... }`, `h2 { font-size:2em ... }`, `h3 { font-size:1.5em ... }`를 다음으로 교체:

```css
h1 { font-size: clamp(2.2rem, 4.5vw, 3rem); line-height: 1.15; letter-spacing: -.02em; font-weight: 800; margin-bottom: .5em; }
h2 { font-size: 1.9rem; line-height: 1.25; letter-spacing: -.01em; font-weight: 750; margin-bottom: .5em; }
h3 { font-size: 1.15rem; line-height: 1.4; font-weight: 700; margin-bottom: .5em; }
p  { margin-bottom: 1em; line-height: 1.75; }
```

- [ ] **Step 2: `.eyebrow` 유틸 추가**

```css
.eyebrow {
  display: inline-block; font-size: .72rem; font-weight: 700;
  letter-spacing: .16em; text-transform: uppercase; color: var(--accent);
  margin-bottom: .6rem;
}
```

- [ ] **Step 3: `.project-hero h1`의 그라데이션을 웜 오렌지로 정합**

`global.css`의 `.project-hero h1 { ... background: linear-gradient(135deg, var(--text-color) 0%, var(--link-color) 100%); ... }`는 이미 `--link-color`(=accent)를 쓰므로 값은 자동 정합. `font-size: 3.5rem`만 `clamp(2.6rem, 5vw, 3.4rem)`로 낮춘다.

- [ ] **Step 4: 빌드 + 스크린샷**

```bash
npm run build && npm run dev
node scripts/shot.mjs /portfolio/petory typo-petory
```
Expected: 제목이 과하지 않게 정돈, 콘솔 에러 0.

- [ ] **Step 5: 커밋**

```bash
git add src/styles/global.css
git commit -m "feat: refine typographic scale + eyebrow label"
```

### Task 5: 다크 고정 / 라이트 토글 제거

**Files:**
- Modify: `src/contexts/ThemeContext.jsx`
- Modify: `src/components/Layout/Navigation.jsx:172-178` (토글 버튼)
- Modify: `index.html` (첫 페인트 전 data-theme)
- Modify: `src/pages/projects/petory/PetoryProjectPage.jsx:8-18` (isDarkMode 관찰자)

**Interfaces:**
- Consumes: `useTheme()` (이제 `{ theme:'dark', toggleTheme: ()=>{} }` 반환).
- Produces: 문서 루트가 항상 `data-theme="dark"`. 데모 sync는 데모 방향으로만 유지.

- [ ] **Step 1: `index.html` head에 인라인 세팅 추가(FOUC 방지)**

`<head>` 안에 추가:

```html
<script>document.documentElement.setAttribute('data-theme','dark');</script>
```

- [ ] **Step 2: `ThemeContext`를 다크 고정으로 단순화**

`ThemeProvider`의 `theme` state를 항상 `'dark'`로 고정하고 `data-theme='dark'`를 세팅. 데모 sync를 깨지 않도록 `SITE_THEME_SYNC` dispatch는 `'dark'`로만 보낸다:

```javascript
export function ThemeProvider({ children }) {
  const theme = 'dark';
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', 'dark');
    localStorage.setItem('theme', 'dark');
    window.dispatchEvent(new CustomEvent(SITE_THEME_SYNC, { detail: 'dark' }));
  }, []);
  const toggleTheme = () => {};
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
```
(`readStoredSiteTheme`, 기존 sync 수신 useEffect는 삭제.)

- [ ] **Step 3: `Navigation.jsx`의 테마 토글 버튼 제거**

`<button onClick={toggleTheme} className="theme-toggle-btn" ...>...</button>` 블록(약 172–178행)을 삭제하고, `const { theme, toggleTheme } = useTheme();`도 미사용이면 제거.

- [ ] **Step 4: `PetoryProjectPage.jsx`의 isDarkMode 관찰자를 다크 상수로 단순화**

`useState`/`MutationObserver`(8–18행)를 제거하고 `const isDarkMode = true;`로 대체. `nodeStyles`가 `isDarkMode` 분기를 쓰므로 다크 분기만 남게 됨.

- [ ] **Step 5: 빌드 + 라이트 잔재 없음 확인**

```bash
npm run build && npm run dev
node scripts/shot.mjs / dark-home /portfolio/petory dark-petory
```
Expected: 토글 버튼 없음, 어디서도 라이트 배경 안 보임, 콘솔 에러 0.

- [ ] **Step 6: 커밋**

```bash
git add index.html src/contexts/ThemeContext.jsx src/components/Layout/Navigation.jsx src/pages/projects/petory/PetoryProjectPage.jsx
git commit -m "feat: lock dark theme, remove light toggle"
```

**Phase 1 완료 게이트**: `node scripts/shot.mjs / p1-home /portfolio/petory p1-petory /domains/user p1-user /domains/location p1-loc /infra p1-infra` 로 5장 캡처해 육안 회귀 확인.

---

## Phase 2 — 공통 크롬

### Task 6: 네비게이션 Domains 드롭다운 + 스크롤 글래스 헤더

**Files:**
- Modify: `src/components/Layout/Navigation.jsx` (전체 구조)
- Modify: `src/styles/global.css` (`.nav`, `.nav-link`, 신규 `.nav-dropdown` 등)

**Interfaces:**
- Consumes: `useLocation()` path.
- Produces: 최상위 `Home · Petory · Domains ▾ · Infra · Flows · Live Demo`; 스크롤 시 `.nav.scrolled` 클래스.

- [ ] **Step 1: 도메인 목록 상수 + 드롭다운 상태 도입**

`Navigation.jsx` 상단에 도메인 배열을 정의하고 `useState`로 열림 제어:

```javascript
const DOMAINS = [
  ['User','/domains/user'], ['Board','/domains/board'], ['Care','/domains/care'],
  ['Missing Pet','/domains/missing-pet'], ['Location','/domains/location'],
  ['Recommendation','/domains/recommendation'], ['Meetup','/domains/meetup'],
  ['Chat','/domains/chat'],
];
const [openDomains, setOpenDomains] = useState(false);
```

- [ ] **Step 2: 최상위 링크를 축약 구조로 렌더**

`renderPetoryNav`/`renderDomainNav`의 11개 나열을 대체하는 공통 렌더:

```jsx
<div className="nav-links-group">
  <Link to="/" className={`nav-link brand ${isHome?'active':''}`}>Home</Link>
  <Link to="/portfolio/petory" className={`nav-link ${isPetoryProject?'active':''}`}>Petory</Link>
  <div className="nav-dropdown" onMouseLeave={()=>setOpenDomains(false)}>
    <button className={`nav-link ${isDomainPage?'active':''}`} onClick={()=>setOpenDomains(v=>!v)}>Domains ▾</button>
    {openDomains && (
      <div className="nav-dropdown-menu glass">
        {DOMAINS.map(([label,to])=>(
          <Link key={to} to={to} className={`nav-drop-item ${path.startsWith(to)?'active':''}`} onClick={()=>setOpenDomains(false)}>{label}</Link>
        ))}
      </div>
    )}
  </div>
  <Link to="/domains/flows" className={`nav-link ${path==='/domains/flows'?'active':''}`}>Flows</Link>
  <Link to="/infra" className={`nav-link ${isInfraPage?'active':''}`}>Infra</Link>
  <Link to="/demo" className="nav-link brand">🎮 Live Demo</Link>
</div>
```
기존 `renderMainNav/renderPetoryNav/renderDomainNav/renderDefaultNav`와 경로 분기 렌더는 이 단일 구조로 대체. (홈에서 About/Projects 앵커가 필요하면 `isHome` 조건으로 유지.)

- [ ] **Step 3: 스크롤 시 `.scrolled` 클래스 토글**

```javascript
useEffect(() => {
  const onScroll = () => document.querySelector('.nav')?.classList.toggle('scrolled', window.scrollY > 8);
  window.addEventListener('scroll', onScroll); onScroll();
  return () => window.removeEventListener('scroll', onScroll);
}, []);
```

- [ ] **Step 4: `global.css`에 네비 스타일 추가/조정**

```css
.nav { position: sticky; top: 0; z-index: 50; background: transparent; transition: background .25s ease, backdrop-filter .25s ease, border-color .25s ease; border-bottom: 1px solid transparent; }
.nav.scrolled { background: var(--nav-bg); -webkit-backdrop-filter: blur(12px); backdrop-filter: blur(12px); border-bottom: 1px solid var(--border); }
.nav-dropdown { position: relative; display: inline-block; }
.nav-dropdown-menu { position: absolute; top: 120%; left: 0; display: grid; gap: 2px; padding: 8px; min-width: 190px; z-index: 60; }
.nav-drop-item { padding: 8px 12px; border-radius: 8px; color: var(--text-dim); }
.nav-drop-item:hover, .nav-drop-item.active { color: var(--text); background: var(--accent-soft); }
.nav-link.active { color: var(--accent); }
```

- [ ] **Step 5: 빌드 + 드롭다운/스크롤 확인**

```bash
npm run build && npm run dev
node scripts/shot.mjs /portfolio/petory nav-petory /domains/board nav-board
```
Expected: 최상위가 6개로 축약, Domains 클릭 시 메뉴, 스크롤 시 헤더 글래스, 콘솔 에러 0. (드롭다운 열림은 수동 확인 또는 shot 스크립트에 클릭 추가.)

- [ ] **Step 6: 커밋**

```bash
git add src/components/Layout/Navigation.jsx src/styles/global.css
git commit -m "feat: collapse nav into Domains dropdown + scroll glass header"
```

### Task 7: 카드-속-카드 정리 + TOC 글래스

**Files:**
- Modify: `src/styles/global.css` (`.section-card`, `.project-card`, `.content-card`, `.stat-item`, `.toc` 관련)
- Modify: `src/components/Common/TableOfContents.jsx` (className 확인)

**Interfaces:**
- Produces: 바깥 컨테이너는 배경 구획만, 안쪽 카드만 `.glass` 룩.

- [ ] **Step 1: 바깥/안쪽 카드 역할 분리**

```css
/* 바깥 섹션 컨테이너: 보더 제거, 배경 구획만 */
.section-card { background: transparent; border: none; padding: 0; }
/* 안쪽 카드: 글래스 규격 통일 */
.project-card, .content-card, .stat-item, .problem-summary-card {
  background: var(--surface); border: 1px solid var(--border); border-radius: 16px;
}
.project-card, .problem-summary-card { transition: transform .2s ease, border-color .2s ease, box-shadow .2s ease; }
.project-card:hover, .problem-summary-card:hover { transform: translateY(-2px); border-color: var(--border-strong); box-shadow: 0 8px 30px rgba(0,0,0,.35); }
```
(기존 `.section-card`가 `border: 2px solid var(--link-color)`인 성과 카드 등 개별 강조는 Task 9에서 재적용.)

- [ ] **Step 2: TOC 글래스 적용**

`TableOfContents.jsx`의 최상위 래퍼 className을 확인해 `global.css`에서 다음 적용(클래스명은 실제 코드에 맞춤, 예 `.toc`):

```css
.toc { background: rgba(255,255,255,.05); border: 1px solid var(--border); -webkit-backdrop-filter: blur(10px); backdrop-filter: blur(10px); border-radius: 14px; }
.toc a.active, .toc .active { color: var(--accent); }
```

- [ ] **Step 3: 빌드 + 스크린샷**

```bash
npm run build && npm run dev
node scripts/shot.mjs /portfolio/petory cards-petory /domains/care cards-care
```
Expected: 카드 경계가 배경과 명확히 구분(더 이상 뭉개지지 않음), TOC 글래스, 콘솔 에러 0.

- [ ] **Step 4: 커밋**

```bash
git add src/styles/global.css src/components/Common/TableOfContents.jsx
git commit -m "feat: unify card system + glass TOC"
```

---

## Phase 3 — 앵커 페이지 (홈 · Petory)

### Task 8: Petory 히어로 재설계 + 버튼 위계

**Files:**
- Modify: `src/pages/projects/petory/PetoryProjectPage.jsx:155-210` (hero + achievements 섹션)
- Modify: `src/styles/global.css` (`.project-hero`, `.stat-*`, `.buttons-wrapper`)

**Interfaces:**
- Consumes: `.glass`, `.glow-bg`, `.eyebrow`, `.btn-primary`, `.btn-secondary`.

- [ ] **Step 1: hero에 glow + eyebrow + 버튼 위계 적용**

`PetoryProjectPage.jsx`의 `.project-hero` 컨테이너에 `glow-bg` 추가, 데모/깃허브 링크 클래스를 교체:

```jsx
<div className="project-hero glow-bg">
  <span className="eyebrow">Backend Portfolio · 2025</span>
  <h1>Petory</h1>
  <p className="subtitle">반려동물 통합 플랫폼</p>
  <p className="description">{/* 기존 설명 유지 */}</p>
  <div className="buttons-wrapper">
    <Link to="/demo?project=petory" className="btn-primary">🎮 Live Demo</Link>
    <a href="https://github.com/makkong1/Petory" target="_blank" rel="noopener noreferrer" className="btn-secondary">GitHub 저장소 →</a>
  </div>
</div>
```
(기존 `.demo-link`, `.github-link` 클래스는 제거. `.demo-link`가 초록이던 규칙도 무효화.)

- [ ] **Step 2: 성과 지표를 히어로 하단 글래스 카드로 (achievements 섹션)**

`achievements` 섹션의 바깥 강조 카드를 `.glass`로 바꾸고 stat 그리드는 유지:

```jsx
<section id="achievements" ...>
  <span className="eyebrow">Achievements</span>
  <h2>핵심 성과</h2>
  <div className="glass" style={{ padding: '2rem', textAlign: 'center' }}>
    <div className="stat-grid"> {/* 기존 stat-item 3개 유지 */} </div>
    <p style={{ ... }}>📌 상세 근거는 아래 "문제 해결 사례" 섹션에서 확인 가능</p>
  </div>
</section>
```

- [ ] **Step 3: `global.css` 히어로/스탯 정리**

```css
.project-hero { background: var(--surface); border: 1px solid var(--border); text-align: center; padding: 4rem 2rem; border-radius: 20px; }
.stat-number { color: var(--accent); font-weight: 800; font-feature-settings: "tnum"; }
.buttons-wrapper { display: flex; gap: 1rem; justify-content: center; margin-top: 1.5rem; }
```

- [ ] **Step 4: 빌드 + 스크린샷**

```bash
npm run build && npm run dev
node scripts/shot.mjs /portfolio/petory hero-petory
```
Expected: 히어로에 웜 오렌지 glow, 성과 숫자 글래스 카드, Live Demo 오렌지/GitHub 외곽선. 콘솔 에러 0.

- [ ] **Step 5: 커밋**

```bash
git add src/pages/projects/petory/PetoryProjectPage.jsx src/styles/global.css
git commit -m "feat: redesign Petory hero with glow + glass stats + button hierarchy"
```

### Task 9: Petory 섹션 리듬 + 문제해결 카드 오렌지 번호

**Files:**
- Modify: `src/pages/projects/petory/PetoryProjectPage.jsx` (각 `<section>` 제목에 eyebrow)
- Modify: `src/styles/global.css` (`.problem-summary-card span`, 섹션 여백)

**Interfaces:**
- Consumes: `.eyebrow`.

- [ ] **Step 1: 주요 섹션 제목 위에 eyebrow 라벨 추가**

`why`, `architecture`, `problem-solving`, `features`, `tech-stack` 섹션 각 `<h2>` 앞에 `<span className="eyebrow">…</span>` 추가(영문 라벨: `WHY`, `ARCHITECTURE`, `PROBLEM SOLVING`, `FEATURES`, `TECH STACK`).

- [ ] **Step 2: 문제해결 카드 번호를 오렌지 모노로**

```css
.problem-summary-card span { font-family: 'Menlo', monospace; font-size: 1.4rem; font-weight: 700; color: var(--accent); }
.problem-summary-card strong { color: var(--accent); }
```
`PetoryProjectPage.jsx`의 문제해결 카드 `<p>` 안에 남아 있는 파란색 관련 인라인 스타일이 있으면 제거.

- [ ] **Step 3: 섹션 수직 여백 확대**

```css
.project-main-content section { scroll-margin-top: 2rem; }
.project-main-content > .project-main-content section, section[id] { margin-bottom: 4rem; }
```
(과하면 3rem로 조정.)

- [ ] **Step 4: 빌드 + 스크린샷**

```bash
npm run build && npm run dev
node scripts/shot.mjs /portfolio/petory rhythm-petory
```
Expected: 섹션마다 오렌지 eyebrow, 01–04 번호 오렌지, 여백 여유. 콘솔 에러 0.

- [ ] **Step 5: 커밋**

```bash
git add src/pages/projects/petory/PetoryProjectPage.jsx src/styles/global.css
git commit -m "feat: section rhythm + orange problem-card numbers"
```

### Task 10: 홈(이력서) 페이지 정합

**Files:**
- Modify: `src/pages/HomePage.jsx` (hero + 섹션)
- Modify: `src/styles/global.css` (홈 전용 클래스가 있으면)

**Interfaces:**
- Consumes: `.glow-bg`, `.eyebrow`, `.btn-primary/secondary`, `.glass`.

- [ ] **Step 1: 홈 hero에 glow + eyebrow + 버튼 위계 적용**

`HomePage.jsx`의 최상단 소개 영역에 `glow-bg`와 eyebrow(`BACKEND ENGINEER` 등), CTA 버튼을 `.btn-primary/.btn-secondary`로 정합. About/Projects 카드가 있으면 `.glass`로 통일.

- [ ] **Step 2: 빌드 + 스크린샷**

```bash
npm run build && npm run dev
node scripts/shot.mjs / home-final
```
Expected: 홈이 Petory와 동일한 디자인 언어(오렌지 glow, 글래스 카드). 콘솔 에러 0.

- [ ] **Step 3: 커밋**

```bash
git add src/pages/HomePage.jsx src/styles/global.css
git commit -m "feat: align home page with dark premium system"
```

---

## Phase 4 — 나머지 마감

### Task 11: 도메인 페이지 공통 헤더 패턴 통일

**Files:**
- Modify: 대표 도메인 페이지들의 최상단 헤더 (`src/pages/projects/petory/domains/*` 또는 실제 도메인 컴포넌트 경로 — Task 시작 시 `grep -rl "DomainV2" src/pages` 로 확정)
- Modify: `src/styles/global.css` (`.domain-hero` 신규)

**Interfaces:**
- Consumes: `.glow-bg`, `.eyebrow`.

- [ ] **Step 1: 도메인 컴포넌트 경로 확정**

```bash
grep -rl "DomainV2\|domain-hero\|도메인" src/pages | head -40
```
공통 헤더가 들어갈 실제 파일 목록을 확정.

- [ ] **Step 2: 공통 `.domain-hero` 스타일 추가**

```css
.domain-hero { position: relative; overflow: hidden; padding: 2.5rem 2rem; border-radius: 18px; background: var(--surface); border: 1px solid var(--border); margin-bottom: 2.5rem; }
.domain-hero::before { content:""; position:absolute; inset:0; background: radial-gradient(120% 130% at 12% -10%, var(--accent-glow) 0%, transparent 55%); pointer-events:none; }
.domain-hero > * { position: relative; }
```

- [ ] **Step 3: 각 도메인 헤더에 eyebrow(`DOMAIN`) + 도메인명 + 한줄 설명 패턴 적용**

각 도메인 페이지 최상단 제목 블록을 `.domain-hero`로 감싸고 eyebrow 추가. (도메인명은 기존 값 유지.)

- [ ] **Step 4: 빌드 + 대표 3개 스크린샷**

```bash
npm run build && npm run dev
node scripts/shot.mjs /domains/user dom-user /domains/location dom-loc /domains/chat dom-chat
```
Expected: 세 도메인 헤더가 동일 패턴(글래스+glow+eyebrow). 콘솔 에러 0.

- [ ] **Step 5: 커밋**

```bash
git add src/pages src/styles/global.css
git commit -m "feat: unify domain page header pattern"
```

### Task 12: Infra · Flows · Docs 점검 + Mermaid 다크 팔레트

**Files:**
- Modify: `src/pages/InfraPage.jsx`, `src/pages/projects/petory/PetoryFlowsPage.jsx`, `src/pages/MCPFilesPage.jsx` (필요 시)
- Modify: `src/components/Common/MermaidDiagram.jsx` (다크 팔레트 정합)

**Interfaces:**
- Consumes: 전역 토큰/유틸.

- [ ] **Step 1: Mermaid 노드 색을 새 토큰과 정합**

`MermaidDiagram.jsx`에서 다크 노드 스타일을 surface 배경 + 오렌지 강조로 조정(하드코딩 색이 있으면 새 팔레트로 교체). 여러 페이지의 인라인 `nodeStyles`(예 `PetoryProjectPage.jsx`)도 오렌지 계열로 통일.

- [ ] **Step 2: Infra/Flows/Docs 육안 점검 + 어긋난 하드코딩 색 교체**

```bash
grep -rn "#fff\|#000\|#1a1a1a\|#2a2a2a\|#ffffff" src/pages/InfraPage.jsx src/pages/projects/petory/PetoryFlowsPage.jsx src/pages/MCPFilesPage.jsx
```
새 토큰(`var(--surface)`, `var(--text)` 등)으로 교체.

- [ ] **Step 3: 빌드 + 스크린샷**

```bash
npm run build && npm run dev
node scripts/shot.mjs /infra fin-infra /domains/flows fin-flows /docs fin-docs
```
Expected: 세 페이지 다크 정합, Mermaid 다이어그램 가독성 OK, 콘솔 에러 0.

- [ ] **Step 4: 데모 격리 회귀 확인 (건드리지 않았는지)**

```bash
node scripts/shot.mjs /demo fin-demo
```
Expected: 데모는 기존 룩 유지(격리 정상).

- [ ] **Step 5: 커밋**

```bash
git add src/pages src/components/Common/MermaidDiagram.jsx
git commit -m "feat: finalize Infra/Flows/Docs + Mermaid dark palette"
```

**Phase 4 완료 게이트**: `npm run build` 성공 + 전 페이지 스크린샷 육안 회귀 + `/demo` 격리 확인.

---

## 자기점검 (계획 작성 후)

- **스펙 커버리지**: §3 토큰→T2, 유틸→T3, 타이포/Pretendard→T1·T4, §4.1 네비→T6, §4.2 테마→T5, §4.3 카드→T7·T9, §4.4 리듬/TOC→T7·T9, §4.5 히어로→T8·T10, §4.6 도메인헤더→T11, §4.7 Mermaid→T12. 데모 제외→T12 Step4 회귀. 전 항목 태스크 매핑됨.
- **플레이스홀더**: 실행 필요한 값(토큰·CSS·명령)은 모두 구체화. 도메인 컴포넌트 실제 경로만 T11 Step1에서 grep로 확정하도록 명시(레포 구조상 안전).
- **타입/이름 일관성**: `.glass/.glow-bg/.card-lift/.eyebrow/.btn-primary/.btn-secondary`, 토큰 변수명이 태스크 간 일치.
- **리스크 반영**: 테마 sync 디커플링(T5), Pretendard 번들(T1), 레거시 변수명(T2), Mermaid(T12), backdrop-filter 남용 자제(유틸을 카드 단위로만) 반영.
