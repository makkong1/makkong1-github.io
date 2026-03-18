# Petory 프론트엔드 → 포트폴리오 데모 반영 가이드

포트폴리오의 **데모 버전**을 Petory 프로젝트의 프론트엔드 소스로 수정/동기화할 때 참고하는 문서입니다.

---

## 1. 현재 데모 구조 (Petory-Portfolio 쪽)

| 위치 | 역할 |
|------|------|
| `src/demo/` | 데모 전용 코드 전체 (Petory UI + LinkUp 일부) |
| `src/demo/components/` | Home, LocationService, CareRequest, Community, Chat, Admin 등 |
| `src/demo/api/` | axios 호출 래퍼 (authApi, boardApi, careRequestApi 등) |
| `src/demo/contexts/` | AuthContext, ThemeContext (데모용) |
| `src/demo/styles/` | theme.js 등 |
| `src/pages/DemoPage.jsx` | 데모 진입점. 탭별로 `src/demo` 컴포넌트 렌더 |
| `src/api/mockInterceptor.js` | axios 요청 가로채서 mock 데이터 반환 |
| `src/mockData/` | auth.js, boards.js, careRequests.js 등 |

- **라우팅**: 데모는 **라우터 없이** `activeTab` 상태로 화면 전환 (home, location-services, care-requests, community 등).
- **API**: `main.jsx`에서 `setupMockInterceptor()`로 전역 적용 → 데모에서 백엔드 없이 동작.

---

## 2. 진행 순서 (요약)

1. Petory 프로젝트에서 **프론트엔드 폴더 위치** 확인  
   (예: `Petory/frontend/` 또는 `Petory/client/src/`)
2. 해당 소스를 **복사**해서 Portfolio의 `src/demo/`를 **교체**하거나, 별도 폴더에 넣고 DemoPage만 연결.
3. **연동 포인트**만 수정: import 경로, API baseURL(또는 mock 유지), 데모용 라우팅/탭 매핑.

---

## 3. 상세 진행 방법

### Step 1: Petory 프로젝트 프론트 구조 확인

Petory 저장소를 연 다음, 프론트 코드가 어디 있는지 확인합니다.

- 예: `Petory/frontend/` 또는 `Petory/client/` 또는 레포 루트가 React면 `Petory/src/`
- 확인할 파일: `package.json`, `src/App.jsx`(또는 `App.tsx`), 라우트 정의, API 클라이언트(baseURL 사용처).

### Step 2: 복사할 범위 정하기

**방법 A – 데모 전체 교체 (추천)**  
Petory 프론트 **전체**를 복사해서 `Petory-Portfolio/src/demo/` 내용을 **덮어쓰기**합니다.

- 복사: Petory의 `frontend/src/*` (또는 해당 경로) → `Petory-Portfolio/src/demo/`
- `demo/` 아래 구조가 Petory와 비슷하게 유지되면 기존 `DemoPage.jsx`의 import 경로를 최소한만 수정하면 됨.

**방법 B – 필요한 페이지만 선택**  
Petory에서 **페이지/기능 단위 컴포넌트만** 가져와서 기존 `src/demo/components/` 안에 넣거나 교체합니다.

- 예: Petory의 `BoardPage`, `CareRequestList` 등만 가져와서  
  `src/demo/components/Community/`, `src/demo/components/CareRequest/` 등에 넣기.
- 장점: 변경 범위 작음. 단점: import/의존성 정리할 게 많을 수 있음.

### Step 3: 반드시 맞춰야 할 것들

#### 3-1. import 경로

- Petory에서는 `@/components/...`, `@/api/...` 같은 alias를 쓸 수 있음.
- Portfolio에는 `src/demo/` 기준 상대 경로를 쓰고 있음.
- **조치**:  
  - Petory를 그대로 `demo/`로 복사했다면, Petory 쪽 alias를 `vite.config.js`에 추가하거나,  
  - `demo/` 안에서만 상대 경로로 통일하도록 import를 수정.

예시 (Vite alias):

```js
// vite.config.js
resolve: {
  alias: {
    '@': path.resolve(__dirname, 'src/demo'),  // 데모 내부에서 @ 사용 시
  },
},
```

#### 3-2. API (백엔드 / Mock)

- **데모는 지금 mock만 사용**: `src/api/mockInterceptor.js`가 axios를 가로채서 `src/mockData/`를 반환.
- Petory 프론트가 `axios.create({ baseURL: 'http://실서버' })`를 쓰더라도, **같은 axios 인스턴스**를 쓰면 `main.jsx`의 `setupMockInterceptor()`가 적용됨.
- **조치**:  
  - 데모에서는 **baseURL을 제거**하거나, mock용 빈 baseURL로 두면 됨.  
  - Petory API 경로가 다르면 `mockInterceptor.js`의 키(예: `GET:/api/boards`)를 Petory와 동일한 path로 맞춰 주기.

#### 3-3. 라우팅 → 탭으로 대체

- Petory 본편은 `React Router`로 `/boards`, `/care-requests` 등 URL이 있을 수 있음.
- 포트폴리오 데모는 **URL 없이** `DemoPage.jsx`의 `activeTab`으로만 전환함.

**조치**:  
- Petory의 **페이지 컴포넌트만** 가져와서, 기존처럼 `DemoPage.jsx`의 `renderPetoryContent()` 안에서 `switch(activeTab)`으로 매핑.
- 예: Petory의 `BoardPage` → `case 'community': return <BoardPage />;`
- Petory 내부에서 `useNavigate()`로 다른 페이지로 가는 부분은, 데모에서는 `setActiveTab('community')` 같은 콜백으로 바꾸거나, 데모용 래퍼를 둬서 탭 전환으로 대체.

#### 3-4. Provider / Context

- 데모는 이미 `DemoPage.jsx`에서 `DemoThemeProvider`, `AuthProvider`로 감싸고 있음.
- Petory 프론트에 자체 `ThemeProvider`/`AuthProvider`가 있으면:
  - **옵션 1**: Petory 컴포넌트만 가져오고, Provider는 Portfolio 쪽 것만 사용 (권장).
  - **옵션 2**: Petory Provider도 가져와서 `demo/` 안에서만 사용하되, 포트폴리오 테마와 충돌하지 않게 범위 제한.

#### 3-5. 스타일(테마)

- `src/demo/styles/theme.js`, `src/demo/contexts/ThemeContext.js`가 데모 전용 테마/다크모드 제공.
- Petory 프론트가 다른 theme 구조를 쓰면, 데모용으로 통일하거나 기존 데모 theme을 그대로 쓰도록 컴포넌트만 바꿔도 됨.

### Step 4: DemoPage.jsx 연결 확인

- `renderPetoryContent()`의 `activeTab` 케이스와, Petory에서 가져온 컴포넌트 이름을 맞춥니다.
- 탭 키는 현재: `home`, `location-services`, `care-requests`, `missing-pets`, `meetup`, `community`, `activity`, `admin`.
- Petory 쪽 컴포넌트가 하나로 합쳐져 있으면 (예: 한 페이지에서 서브 탭으로 처리) 그 컴포넌트 하나만 import 해서 해당 case에 넣으면 됨.

### Step 5: 네비게이션(탭)과 동기화

- `src/demo/components/Layout/Navigation.js`가 상단 탭/메뉴를 담당하고, `setActiveTab`을 받음.
- Petory 프론트의 네비를 그대로 쓰려면, Petory의 네비 컴포넌트가 **탭 문자열**을 받아서 `setActiveTab` 호출하도록 props만 맞추면 됨.
- 아니면 기존 Navigation을 유지하고, **내용만** Petory 컴포넌트로 교체해도 됨.

---

## 4. 체크리스트 (한 번에 할 일 정리)

- [ ] Petory 레포에서 프론트 폴더 위치 확인
- [ ] `src/demo/` 교체 또는 필요한 컴포넌트만 복사
- [ ] `demo/` 내 import 경로 수정 (alias 또는 상대 경로)
- [ ] API: baseURL 제거 또는 mock 유지, 필요 시 `mockInterceptor.js` 경로 추가
- [ ] `DemoPage.jsx`의 `renderPetoryContent()`에 Petory 페이지 컴포넌트 매핑
- [ ] Petory 내부 라우팅(useNavigate 등) → 데모에서는 탭 전환으로 대체 여부 결정
- [ ] Provider/Context는 포트폴리오 쪽 유지할지, 데모 전용으로 통일할지 결정
- [ ] `npm run dev`로 데모 탭 전환·로그인·목록 등 한 번씩 확인

---

## 5. 이후 업데이트 (Petory 프론트가 수정될 때)

- **방법 1**: Petory에서 수정한 뒤, 해당 파일/폴더만 다시 복사해서 `src/demo/`에 덮어쓰기.
- **방법 2**: `src/demo/`를 Petory frontend와 동일한 구조로 두고, 복사 스크립트를 만들어 두기.  
  예: `scripts/sync-demo-from-petory.js` (Petory 경로를 인자로 받아서 `src/demo/`로 rsync 또는 copy).

Petory 레포 경로가 정해지면 (예: `D:/Petory`), 그 경로를 스크립트에 넣어 두면 동기화가 편해집니다.
