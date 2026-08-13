# 🌤️ SkyCast Weather Intelligence (대한민국 17개 지역 실시간 기상 대시보드)

> **Vue 3 (Composition API) + Vite + Pinia + Vue Router + Axios + OpenWeatherMap 2.5 API + shadcn-vue + TailwindCSS v4**로 구축된 웹 기상 대시보드 애플리케이션입니다.
> 
> 🔗 **실시간 라이브 배포 주소**: [https://shin-3117.github.io/skala-vue3-22-3/](https://shin-3117.github.io/skala-vue3-22-3/)

---

## 📌 목차
1. [프로젝트 소개](#-프로젝트-소개)
2. [주요 기능](#-주요-기능)
3. [기술 스택 및 외부 UI 라이브러리](#-기술-스택-및-외부-ui-라이브러리)
4. [프로젝트 구조](#-프로젝트-구조)
5. [환경 변수 설정 (.env)](#-환경-변수-설정-env)
6. [설치 및 배포 방법 (GitHub Pages)](#-설치-및-배포-방법-github-pages)
7. [HandsOn 과제 요구사항 충족 평가](#-handson-과제-요구사항-충족-평가)

---

## 🌤️ 프로젝트 소개

**SkyCast Weather Intelligence**는 OpenWeatherMap 2.5 API를 기반으로 대한민국 17개 주요 행정구역(서울, 부산, 대구, 인천, 광주, 대전, 울산, 세종, 경기, 충북, 충남, 전북, 전남, 경북, 경남, 제주, 강원)의 기상 정보를 실시간으로 제공하는 웹 애플리케이션입니다.

외부 UI 라이브러리로 `shadcn-vue`를 도입하여 카드, 버튼, 뱃지, 스크롤 영역 컴포넌트를 구축하였으며, 반투명 유리 스타일의 Glassmorphism 디자인, 초성 검색(es-hangul), SVG 기반 인터랙티브 대한민국 지도, 섭씨(℃)/화씨(℉) 단위 전환, 다크 모드, 그리고 IP/Geolocation 기반 **사용자 접속 위치 자동 감지 기능**을 탑재하고 있습니다.

---

## 🚀 주요 기능

### 1. 🌐 대한민국 17개 주요 지역 실시간 API 연동
- OpenWeatherMap 2.5 `/weather` 엔드포인트를 통해 각 지역별 **실시간 기온, 체감 온도, 최저/최고 기온, 습도, 풍속, 기상 설명** 데이터를 병렬 처리(`Promise.allSettled`)로 수집합니다.
- Axios 요청 인터셉터(Request Interceptor)를 활용해 API 키(`appid`)가 모든 요청의 Query Parameter로 자동 포함됩니다.

### 2. 🧭 IP 및 Geolocation 기반 사용자 위치 자동 감지
- **1순위 (GPS / 기기 위치)**: 브라우저 `navigator.geolocation` API 활용
- **2순위 (IP 위치)**: `geojs` 및 `ip-api` 외부 Geolocation API를 통해 접속자의 위치 자동 추적
- Haversine 공식을 적용하여 감지된 좌표에서 가장 가까운 대한민국 17개 지역을 찾아 메인 대시보드 진입 시 **내 지역 날씨를 자동 선택 및 하이라이트**합니다.

### 3. 🗺️ 대한민국 SVG 인터랙티브 날씨 지도
- 클릭 가능한 커스텀 SVG 지도를 제공하며, 지도 클릭 시 해당 지역 선택 및 날씨 카드 목록과 양방향 동기화됩니다.
- 다크 모드 및 라이트 모드에 최적화된 네온 그림자 및 호버/활성 스타일을 제공합니다.

### 4. 🔍 한글 초성 검색 기능 (`es-hangul`)
- 'ㅅㅇ'(서울), 'ㅂㅅ'(부산) 등 초성만 입력해도 원하는 도시를 즉시 필터링하여 검색할 수 있습니다.

### 5. 🌡️ 온도 단위 전환 (℃ / ℉) 및 다크 모드 (Pinia Store)
- `configStore`를 통한 전역 상태 관리로 대시보드 및 상세 페이지 전체의 온도 단위(섭씨/화씨)와 테마(라이트/다크/시스템)를 원클릭으로 전환할 수 있습니다.

### 6. 📱 동적 상세 페이지 (Vue Router Programmatic Navigation)
- 도시별 상세보기 클릭 시 `/weather/:cityId` 동적 라우트로 이동하여 실시간 데이터 및 날씨 맞춤형 복장/우산 가이드를 제공합니다.

### 7. 🎨 외부 UI 라이브러리 적용 (`shadcn-vue`)
- **`shadcn-vue` 컴포넌트 시스템 구축**: `src/components/ui/` 폴더 내 `Card`, `Button`, `Badge`, `ScrollArea`, `Input`, `Label` 등 프리미엄 컴포넌트를 구성하여 사용합니다 (`components.json` 설정 기반).

---

## 🛠️ 기술 스택 및 외부 UI 라이브러리

| 분야 | 기술 / 라이브러리                                          |
| --- |------------------------------------------------------------|
| **Core Framework** | Vue 3 (Composition API, `<script setup>`), Vite 8          |
| **UI Library (외부)** | **`shadcn-vue`** (컴포넌트)                                |
| **State Management** | Pinia 3 (`configStore`, `weatherStore`)                    |
| **Routing** | Vue Router 5                                               |
| **HTTP Client** | Axios 1.19                         |
| **Styling & Design** | TailwindCSS v4          |
| **Icons & Utilities** | Lucide Vue, `es-hangul` (초성 검색)                        |
| **External APIs** | OpenWeatherMap 2.5 API, GeoJS / IP-API                     |
| **Deployment** | GitHub Pages (`gh-pages`, `.nojekyll`, 동적 `getAssetUrl`) |
| **Code Quality** | ESLint 10, Oxlint 1.60                                     |

---

## 📂 프로젝트 구조

```
skala-vue3-22-3/
├── .env                  # 환경 변수 (OpenWeather API URL 및 API Key)
├── components.json       # shadcn-vue 대시보드 설정 파일
├── eslint.config.js      # ESLint 설정
├── vite.config.js        # Vite 및 Alias 설정 (base: '/skala-vue3-22-3/', @ -> src)
├── HandsOn.md            # 과제 요구사항 명세서
├── README.md             # 프로젝트 설명서
├── public/
│   └── .nojekyll         # GitHub Pages Jekyll 빌드 방지 파일
└── src/
    ├── api/              # Axios 인스턴스 및 API 레이어
    │   ├── axios.js      # OpenWeather 2.5 전용 Axios 세팅 (appid interceptor)
    │   └── index.js      # 날씨 API 헬퍼 메서드
    ├── stores/           # Pinia 전역 스토어
    │   ├── configStore.js  # 온도 단위 (℃/℉) 및 테마 (Dark/Light) 관리
    │   └── weatherStore.js # 실시간 17개 지역 날씨 데이터 & 위치 감지 상태 관리
    ├── lib/              # 공통 유틸리티
    │   ├── location.js   # Haversine 거리 계산 & GPS/IP 위치 감지 모듈
    │   ├── search.js     # 초성 검색 유틸리티 (es-hangul)
    │   └── utils.js      # Tailwind 클래스 병합(clsx) 및 동적 에셋 URL(getAssetUrl) 유틸리티
    ├── data/
    │   └── weatherData.js # 17개 한국 지역 좌표 정보 및 API 파싱 함수
    ├── components/
    │   ├── ui/           # shadcn-vue 외부 UI 컴포넌트 폴더
    │   │   ├── button/   # shadcn-vue Button
    │   │   ├── card/     # shadcn-vue Card
    │   │   ├── badge/    # shadcn-vue Badge
    │   │   ├── scroll-area/ # shadcn-vue ScrollArea
    │   │   ├── input/    # shadcn-vue Input
    │   │   └── label/    # shadcn-vue Label
    │   └── exercise/     # 기상 대시보드 컴포넌트
    │       ├── HeaderNav.vue          # 상단 글로벌 내비게이션
    │       ├── HeroWeatherBanner.vue  # 메인 대표 기상 현황 하이라이트 배너
    │       ├── BaseDashboardCard.vue  # Slot 기반 공통 카운터 카드
    │       ├── SearchBar.vue          # 한글 초성 지원 검색 바
    │       ├── WeatherList.vue        # 도시별 날씨 카드 목록
    │       ├── WeatherCard.vue        # 개별 도시 날씨 카드
    │       ├── KoreaMap.vue           # 대한민국 인터랙티브 SVG 지도 (다크모드 지원)
    │       └── WeatherParent.vue      # 메인 날씨 대시보드 조립 부모 컴포넌트
    ├── views/            # 페이지 레벨 뷰 컴포넌트
    │   ├── WeatherView.vue        # 메인 경로 (/) 뷰
    │   ├── WeatherDetailView.vue  # 동적 상세 경로 (/weather/:cityId) 뷰
    │   └── NotFoundView.vue       # 404 페이지 (Catch-all)
    ├── router/
    │   └── index.js      # Vue Router 지연 로딩 및 스크롤 동작 설정
    ├── App.vue           # 루트 컴포넌트
    └── main.js           # 앱 엔트리 포인트 (Pinia, Router 등록)
```

---

## 🔑 환경 변수 설정 (.env)

프로젝트 루트 경로의 `.env` 파일에 아래와 같이 OpenWeatherMap API 정보를 설정합니다:

```env
VITE_API_OPEN_WEATHER_API_URL=https://api.openweathermap.org/data/2.5/weather
VITE_API_OPEN_WEATHER_API_KEY=your_open_weather_api_key_here
```

---

## 💻 설치 및 배포 방법 (GitHub Pages)

### 1. 패키지 설치
```bash
npm install
```

### 2. 개발 서버 실행
```bash
npm run dev
```

### 3. 코드 품질 검사 (Linter)
```bash
npm run lint
```

### 4. GitHub Pages 배포
```bash
npm run deploy
```

---

## 📋 HandsOn 과제 요구사항 충족 평가

`HandsOn.md`에 명시된 단계별 과제 요구사항에 대한 달성 여부 평가 결과입니다:

| 구분 | 요구사항 | 달성 여부 | 구현 상세 |
| --- | --- | :---: | --- |
| **1. Weather Mockup** | 배열 렌더링 (`v-for`, `:key`) | ✅ 완료 | `WeatherList.vue`, `KoreaMap.vue` 등에서 `item.id` 바인딩 적용 |
| | 조건부 렌더링 (`v-if`) | ✅ 완료 | 기온/기상 상태별 배지 및 탭 필터링 (`HeroWeatherBanner.vue`, `WeatherCard.vue`) |
| | 양방향 바인딩 & 한글 처리 | ✅ 완료 | `SearchBar.vue` 및 `es-hangul` 초성 검색 연동 |
| | 이벤트 & 상세보기 처리 | ✅ 완료 | 카드 클릭 선택 및 동적 라우터를 이용한 상세 페이지 이동 구현 |
| **2. Weather Composition** | 반응형 상태 관리 (`ref`, `computed`) | ✅ 완료 | `searchQuery`, `selectedCityInfo`, `weatherList` 반응형 관리 |
| | `computed` 필터링 | ✅ 완료 | `filteredWeatherList` (상태 필터 + 한글 초성 검색 결합) |
| | `watch`, `watchEffect` 감시 | ✅ 완료 | `selectedCityInfo` 감시 및 테마/지도 동기화 |
| **3. Weather Component** | 컴포넌트 4개 이상 분리 | ✅ 완료 | `WeatherParent`, `BaseDashboardCard` (`<slot>`), `SearchBar`, `WeatherCard`, `KoreaMap`, `HeroWeatherBanner` 등 분리 완료 |
| | 디자인 `<style scoped>` 분리 | ✅ 완료 | 모든 컴포넌트 스코프 스타일링 적용 |
| **4. Weather Router** | Vue Router 설정 & Lazy Loading | ✅ 완료 | `router/index.js` 지연 로딩 및 Catch-all Route (`NotFoundView.vue`) 적용 |
| **5. Weather Store** | `configStore.js` (온도 단위 토글) | ✅ 완료 | `unit` (celsius/fahrenheit), `unitSymbol` (`℃`/`℉`), `toggleUnit` 구현 완료 |
| | 테마 관리 & 추가 Store | ✅ 완료 | 다크 모드 스위칭 지원 및 `weatherStore.js` (Pinia) 추가 구현 |
| **6. Weather UI Library & API** | **외부 UI Library 적용** | ✅ 완료 | **`shadcn-vue`** (컴포넌트) & **`reka-ui`** (코어 엔진) 적용 및 Glassmorphism 디자인 구축 |
| | OpenWeatherMap API 연동 | ✅ 완료 | Axios 전용 인스턴스, 요청 인터셉터를 통해 `appid` 포함 17개 지역 실시간 데이터 수집 |
| | 외부 API 확장 | ✅ 완료 | IP/Geolocation 위치 자동 감지 API (`detectUserLocation`, `findNearestRegion`) 추가 구현 |
| **7. Weather Refinement** | 스타일 다듬기 & 품질 관리 | ✅ 완료 | TailwindCSS v4, 다크 모드 최적화, ESLint/Oxlint (0 Errors, 0 Warnings) 검증 완료 |
| **8. Build & Deployment** | 빌드 및 환경변수 격리 / 배포 | ✅ 완료 | GitHub Pages 주소([https://shin-3117.github.io/skala-vue3-22-3/](https://shin-3117.github.io/skala-vue3-22-3/)) 실시간 성공 배포 완료 |