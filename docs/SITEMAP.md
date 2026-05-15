# SITEMAP.md

이 문서는 채널5코리아 코퍼레이트 사이트의 **라우팅 구조, URL 규칙, 메뉴 계층, 페이지 연결 관계**를 정의합니다.

## 사용 규칙

1. **URL 구조와 라우트 파일 경로는 이 문서를 따릅니다.** 임의 변경 금지.
2. **새 페이지 추가 시 이 문서를 먼저 갱신**한 후 코드 작업.
3. 모든 페이지는 한/영 두 언어로 동시 운영됩니다.
4. 메뉴 계층은 GNB(상단 내비게이션) + Footer 양쪽에 반영됩니다.

---

# 1. 사이트 전체 구조 (트리)

```
채널5코리아 코퍼레이트 사이트
│
├─ Home                          /
│
├─ About                         /about
│   └─ (단일 페이지, 섹션 anchor 사용)
│       ├─ #identity
│       ├─ #vision
│       ├─ #expertise
│       └─ #history
│
├─ Media Platform                /media-platform
│   └─ (단일 페이지, 섹션 anchor 사용)
│       ├─ #intro
│       ├─ #audience
│       ├─ #content
│       └─ #journey
│
├─ Services                      /services
│   └─ (단일 페이지, 서비스별 anchor)
│       ├─ #banner
│       ├─ #newsletter
│       ├─ #webinar
│       ├─ #conference
│       ├─ #contest
│       └─ #education
│
├─ Programs                      /programs
│   └─ (단일 페이지, 프로그램별 anchor)
│       ├─ #physical-ai
│       ├─ #tech-day
│       ├─ #analog-day
│       ├─ #challenge
│       └─ #education
│
├─ Partners                      /partners
│   └─ (단일 페이지)
│
├─ Contact                       /contact
│
└─ Legal (Footer 전용)
    ├─ Privacy Policy           /privacy
    └─ Terms of Use             /terms
```

**1차 오픈 페이지 수: 9개** (Home + 6개 메인 + 2개 Legal)

---

# 2. URL 규칙

## 2-1. 다국어 URL 패턴

| 페이지 | 한국어 URL | 영문 URL |
|---|---|---|
| Home | `/ko` | `/en` |
| About | `/ko/about` | `/en/about` |
| Media Platform | `/ko/media-platform` | `/en/media-platform` |
| Services | `/ko/services` | `/en/services` |
| Programs | `/ko/programs` | `/en/programs` |
| Partners | `/ko/partners` | `/en/partners` |
| Contact | `/ko/contact` | `/en/contact` |
| Privacy | `/ko/privacy` | `/en/privacy` |
| Terms | `/ko/terms` | `/en/terms` |

**규칙:**
- 도메인 루트(`/`) 접근 시 브라우저 언어 감지 → `/ko` 또는 `/en`으로 리다이렉트
- 기본 언어는 `ko` (한국어)
- URL은 모두 소문자, kebab-case (`media-platform`, 띄어쓰기는 하이픈)
- 후행 슬래시 없음 (`/about/` 금지, `/about` 사용)
- 쿼리 파라미터는 분석·UTM 외 사용 금지

## 2-2. Next.js 라우트 매핑

`app/[locale]/` 동적 세그먼트 안에 각 페이지를 배치합니다.

```
app/
└── [locale]/
    ├── (home)/              # 라우트 그룹 (URL에 영향 없음)
    │   └── page.tsx         → /ko, /en
    ├── about/
    │   └── page.tsx         → /ko/about, /en/about
    ├── media-platform/
    │   └── page.tsx         → /ko/media-platform, /en/media-platform
    ├── services/
    │   └── page.tsx         → /ko/services, /en/services
    ├── programs/
    │   └── page.tsx         → /ko/programs, /en/programs
    ├── partners/
    │   └── page.tsx         → /ko/partners, /en/partners
    ├── contact/
    │   └── page.tsx         → /ko/contact, /en/contact
    ├── privacy/
    │   └── page.tsx         → /ko/privacy, /en/privacy
    ├── terms/
    │   └── page.tsx         → /ko/terms, /en/terms
    ├── layout.tsx
    └── not-found.tsx
```

## 2-3. 섹션 anchor URL

페이지 내 특정 섹션 이동 시 hash(`#`)를 사용합니다.

예시:
- `/services#webinar` → Services 페이지의 웨비나 섹션으로 스크롤
- `/about#history` → About 페이지의 연혁 섹션으로 스크롤

**규칙:**
- 모든 메인 섹션에 `id` 속성 부여
- Anchor 이동 시 스무스 스크롤 (CSS `scroll-behavior: smooth`)
- 상단 GNB 높이만큼 offset (CSS `scroll-margin-top`)

---

# 3. GNB (상단 내비게이션) 구조

## 3-1. 데스크탑 GNB

```
[로고]    Home | About | Media Platform | Services | Programs | Partners | Contact    [언어] [제안 문의 CTA]
```

**구성:**
- 좌측: 로고 (클릭 시 Home으로)
- 중앙: 7개 메뉴 링크
- 우측: 언어 토글 (KO/EN), CTA 버튼

**높이:** 72px
**배경:** `bg-background/95 backdrop-blur-md`
**스크롤 동작:** 위로 스크롤 시 노출, 아래로 스크롤 시 숨김 (또는 항상 노출, 추후 결정)

## 3-2. 모바일 GNB

```
[로고]                                                                              [언어] [☰]
```

햄버거 메뉴 탭 시 풀스크린 오버레이로 전체 메뉴 노출:

```
┌─────────────────────────┐
│ [닫기 X]                │
│                         │
│ Home                    │
│ About                   │
│ Media Platform          │
│ Services                │
│ Programs                │
│ Partners                │
│ Contact                 │
│                         │
│ [언어 토글]             │
│ [제안 문의 CTA]         │
└─────────────────────────┘
```

**높이:** 64px (헤더만), 풀스크린 (메뉴 열림 시)

## 3-3. 메뉴 활성 상태

현재 페이지에 해당하는 GNB 메뉴는 시각적으로 활성 상태 표시:
- 텍스트 색상: `text-brand-accent` (또는 `text-foreground` + underline)
- 좌측 또는 하단에 액센트 컬러 인디케이터 (디자인 결정에 따라)

---

# 4. Footer 구조

## 4-1. Footer 4컬럼 레이아웃 (데스크탑)

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│  채널5코리아 (로고)                                             │
│  e4ds.com을 기반으로 전기전자·반도체·임베디드 산업의 기술       │
│  커뮤니케이션을 운영하는 B2B 기술 미디어 플랫폼 기업입니다.    │
│                                                                 │
│ ─────────────────────────────────────────────────────────────  │
│                                                                 │
│  서비스          회사            운영 플랫폼      연락처        │
│  ─────          ─────           ──────────       ─────         │
│  배너 광고      회사 소개       e4ds.com         이메일         │
│  뉴스레터       미디어 플랫폼   e4ds Webinar     전화           │
│  웨비나         프로그램        Make.e4ds        주소           │
│  컨퍼런스       파트너          KMAP             영업시간       │
│  기술 콘테스트  채용                                            │
│  교육 지원      문의                                            │
│                                                                 │
│ ─────────────────────────────────────────────────────────────  │
│                                                                 │
│  © 2026 주식회사 채널5코리아         개인정보처리방침 | 이용약관│
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

## 4-2. Footer 컬럼 정의

### 컬럼 1: 회사 소개
- 로고
- 회사 소개 짧은 문구 (`footer.aboutDescription`)

### 컬럼 2: 서비스 (Services 하위)
| 라벨 | URL |
|---|---|
| 배너 광고 | `/services#banner` |
| 뉴스레터 마케팅 | `/services#newsletter` |
| 웨비나 | `/services#webinar` |
| 컨퍼런스 | `/services#conference` |
| 기술 콘테스트 | `/services#contest` |
| 교육 지원 사업 | `/services#education` |

### 컬럼 3: 회사 (Company)
| 라벨 | URL |
|---|---|
| 회사 소개 | `/about` |
| 미디어 플랫폼 | `/media-platform` |
| 프로그램 | `/programs` |
| 파트너 | `/partners` |
| 채용 | `/careers` (2차 오픈, 1차에서는 숨김 또는 "준비 중") |
| 문의 | `/contact` |

### 컬럼 4: 운영 플랫폼 (외부 링크)
| 라벨 | URL | 동작 |
|---|---|---|
| e4ds.com | https://www.e4ds.com | 새 탭 |
| e4ds Webinar | https://webinar.e4ds.com | 새 탭 |
| Make.e4ds | https://make.e4ds.com | 새 탭 |
| KMAP | (URL 확정 필요) | 새 탭 |

### 컬럼 5: 연락처 (옵션)
- 이메일
- 대표 전화
- 주소 (한 줄 또는 두 줄)
- 영업 시간

레이아웃이 5컬럼으로 너무 좁아지면 컬럼 4와 5를 하나로 합치거나 연락처를 컬럼 1 하단으로 이동.

## 4-3. Footer 하단 (Bottom Bar)

```
좌측: © 2026 주식회사 채널5코리아. All rights reserved.
우측: 개인정보처리방침 | 이용약관
```

## 4-4. 모바일 Footer

데스크탑의 4~5컬럼이 모바일에서는 **Accordion(아코디언) 형태**로 접힘:

```
┌─────────────────────────┐
│ 채널5코리아 (로고)      │
│ 회사 설명...            │
│                         │
│ ▶ 서비스               │
│ ▶ 회사                 │
│ ▶ 운영 플랫폼          │
│ ▶ 연락처               │
│                         │
│ ─────────────────────  │
│ © 2026 Channel5 Korea  │
│ 개인정보처리방침       │
│ 이용약관               │
└─────────────────────────┘
```

---

# 5. 페이지 간 연결 관계

각 페이지에서 다른 페이지로의 주요 연결을 정리합니다.

## 5-1. Home에서 다른 페이지로

| 섹션 | 연결 페이지 | CTA 라벨 |
|---|---|---|
| Hero | `/services` | 서비스 보기 |
| Hero | `/contact` | 제안 문의하기 |
| What We Do (6개 카드) | `/services#{서비스명}` | (카드 클릭) |
| Media Snapshot | `/media-platform` | 미디어 플랫폼 자세히 보기 |
| Featured Programs | `/programs` | 모든 프로그램 보기 |
| Partners | `/partners` | 파트너 전체 보기 |
| Contact CTA | `/contact` | 제안 문의하기 |
| Contact CTA | `/contact?action=media-kit` | 미디어킷 요청하기 |

## 5-2. About에서 다른 페이지로

| 섹션 | 연결 페이지 | CTA 라벨 |
|---|---|---|
| 전문 분야 카드 | `/services` 또는 `/programs` 관련 섹션 | (anchor) |
| CTA | `/services` | 서비스 보기 |
| CTA | `/contact` | 협업 문의하기 |

## 5-3. Media Platform에서 다른 페이지로

| 섹션 | 연결 페이지 | CTA 라벨 |
|---|---|---|
| Intro | https://www.e4ds.com | e4ds.com 바로가기 (외부) |
| CTA | `/services` | 서비스 보기 |
| CTA | `/contact?action=media-kit` | 미디어킷 요청하기 |

## 5-4. Services에서 다른 페이지로

| 섹션 | 연결 페이지 | CTA 라벨 |
|---|---|---|
| 각 서비스 카드 | `/contact?service={서비스명}` | 서비스 문의하기 |
| CTA | `/contact` | 서비스 제안 문의하기 |
| CTA | `/contact?action=media-kit` | 미디어킷 요청하기 |

## 5-5. Programs에서 다른 페이지로

| 섹션 | 연결 페이지 | CTA 라벨 |
|---|---|---|
| 각 프로그램 카드 | (외부 행사 페이지 또는 e4ds.com 아카이브) | 자세히 보기 |
| 스폰서십 섹션 | `/contact?service=conference` | 스폰서십 문의하기 |
| CTA | https://www.e4ds.com | 지난 행사 보기 |

## 5-6. Partners에서 다른 페이지로

| 섹션 | 연결 페이지 | CTA 라벨 |
|---|---|---|
| 협업 유형 | `/services#{서비스명}` | (anchor 가능) |
| CTA | `/contact` | 협업 문의하기 |
| CTA | `/contact?action=media-kit` | 미디어킷 요청하기 |

## 5-7. Contact에서 다른 페이지로

- 문의 제출 후 성공 페이지에서 Home으로 돌아가는 링크
- 미디어킷 요청 박스에서 폼으로 anchor 이동

---

# 6. 쿼리 파라미터 규칙

Contact 페이지에서만 사용합니다.

## 6-1. 서비스 prefill

`/contact?service=webinar` 형태로 진입 시 폼의 "관심 서비스" 필드에 해당 서비스가 자동 체크됩니다.

| 값 | 매핑되는 관심 서비스 |
|---|---|
| `?service=webinar` | 웨비나 |
| `?service=newsletter` | 뉴스레터 |
| `?service=banner` | 배너 광고 |
| `?service=conference` | 컨퍼런스 |
| `?service=contest` | 기술 콘테스트 |
| `?service=education` | 교육 지원 사업 |

여러 서비스 동시 체크: `?service=webinar,conference`

## 6-2. 액션 prefill

`/contact?action=media-kit` 형태로 진입 시 "미디어킷도 함께 요청" 체크박스 자동 체크.

| 값 | 동작 |
|---|---|
| `?action=media-kit` | 미디어킷 요청 체크박스 자동 체크 |
| `?action=proposal` | 기본 문의 모드 (특별 동작 없음) |

## 6-3. UTM 파라미터

마케팅 캠페인 추적용 표준 UTM 파라미터 모두 허용:
- `utm_source`, `utm_medium`, `utm_campaign`, `utm_term`, `utm_content`

URL에 그대로 유지되며 GA4가 자동 추적합니다.

---

# 7. 404 페이지 (`not-found.tsx`)

존재하지 않는 URL 접근 시 404 페이지를 표시합니다.

**구성:**
- 큰 "404" 텍스트
- "페이지를 찾을 수 없습니다" 메시지
- 홈으로 돌아가기 버튼
- 주요 페이지 링크 (About / Services / Contact)

**위치:** `app/[locale]/not-found.tsx`

**카피:**

| 항목 | 한국어 | 영문 |
|---|---|---|
| 헤드라인 | 페이지를 찾을 수 없습니다 | Page Not Found |
| 본문 | 요청하신 페이지가 존재하지 않거나 이동되었을 수 있습니다. | The page you're looking for doesn't exist or has been moved. |
| CTA 1 | 홈으로 돌아가기 | Return Home |
| CTA 2 | 서비스 보기 | View Services |

---

# 8. 향후 추가 페이지 (2차 오픈 이후)

1차 오픈 범위에 포함되지 않지만 추후 추가 예정인 페이지들의 URL을 미리 예약합니다.

| 페이지 | 예약 URL | 시기 |
|---|---|---|
| 채용 | `/careers` | 2차 |
| 블로그/인사이트 | `/insights` | 2차 |
| 인사이트 상세 | `/insights/[slug]` | 2차 |
| 미디어킷 (전용 페이지) | `/media-kit` | 2차 |
| 케이스 스터디 | `/cases` | 2차 |
| 케이스 상세 | `/cases/[slug]` | 2차 |
| 서비스 상세 (분리 시) | `/services/[service]` | 2차 |
| 프로그램 상세 | `/programs/[program]` | 2차 |
| 보도자료 | `/press` | 3차 |
| FAQ | `/faq` | 2차 또는 통합 |

**규칙:** 위 URL은 1차 오픈에서 임시로 다른 곳에 사용하지 않습니다.

---

# 9. 페이지별 우선순위 & 작업 순서

## 9-1. 페이지 중요도 (영업 전환 기준)

| 우선순위 | 페이지 | 이유 |
|---|---|---|
| 1 | Home | 첫 인상, 모든 경로의 시작점 |
| 2 | Services | 영업의 핵심, 가장 많은 클릭 유발 |
| 3 | Contact | 전환 페이지, 모든 CTA의 종착점 |
| 4 | Media Platform | 차별화 요소, 신뢰 형성 |
| 5 | About | 회사 신뢰 확보 |
| 6 | Programs | 권위 형성, 스폰서십 영업 |
| 7 | Partners | 신뢰 보강 |
| 8 | Privacy / Terms | 법적 필수 |

## 9-2. 권장 작업 순서

`TECH_STACK.md`의 Phase 2~3 단계에서 페이지를 다음 순서로 작업합니다.

1. **Home** (가장 먼저, 디자인 패턴이 확립됨)
2. **About** (구조가 단순, 패턴 적용 연습)
3. **Services** (영업 핵심, 시간 충분히 투입)
4. **Media Platform** (차트 컴포넌트 필요)
5. **Programs** (콘텐츠 풍부, 카드 패턴)
6. **Partners** (로고 그리드 + 카드)
7. **Contact** (폼 + API 연동, 가장 마지막에 충분히 검증)
8. **Privacy / Terms** (운영팀이 본문 확정 후)
9. **404 페이지** (마지막에 마무리)

---

# 10. 사이트맵 SEO 파일

## 10-1. `sitemap.xml` 생성

`app/sitemap.ts`가 자동 생성합니다. (`TECH_STACK.md` 16-2 참조)

생성되는 URL:
- `/ko`, `/en` (priority 1.0)
- `/ko/about`, `/en/about` (priority 0.8)
- `/ko/media-platform`, `/en/media-platform` (priority 0.8)
- `/ko/services`, `/en/services` (priority 0.8)
- `/ko/programs`, `/en/programs` (priority 0.8)
- `/ko/partners`, `/en/partners` (priority 0.8)
- `/ko/contact`, `/en/contact` (priority 0.7)
- `/ko/privacy`, `/en/privacy` (priority 0.3)
- `/ko/terms`, `/en/terms` (priority 0.3)

## 10-2. `robots.txt`

`app/robots.ts`가 자동 생성합니다.

```
User-agent: *
Allow: /
Sitemap: https://channel5korea.com/sitemap.xml
```

## 10-3. hreflang 태그

각 페이지의 `<head>`에 한/영 양쪽 URL을 hreflang으로 명시 (`generateMetadata`에서 자동 처리):

```html
<link rel="alternate" hreflang="ko" href="https://channel5korea.com/ko/about" />
<link rel="alternate" hreflang="en" href="https://channel5korea.com/en/about" />
<link rel="alternate" hreflang="x-default" href="https://channel5korea.com/ko/about" />
```

---

# 11. 페이지별 메타데이터 요약

각 페이지의 title과 description은 `CONTENT.md`의 `{page}.meta.title`, `{page}.meta.description`에 정의되어 있습니다.

| 페이지 | meta.title 키 |
|---|---|
| Home | `home.meta.title` |
| About | `about.meta.title` |
| Media Platform | `mediaPlatform.meta.title` |
| Services | `services.meta.title` |
| Programs | `programs.meta.title` |
| Partners | `partners.meta.title` |
| Contact | `contact.meta.title` |

OG 이미지는 페이지별로 다음 경로에 준비:
- `/images/og/default.png` (Home, 공통)
- `/images/og/about.png`
- `/images/og/media-platform.png`
- `/images/og/services.png`
- `/images/og/programs.png`
- `/images/og/partners.png`
- `/images/og/contact.png`

OG 이미지 규격: 1200 × 630px, PNG

---

# 12. 사이트맵 시각 다이어그램 (요약)

```
                            ┌──────┐
                            │ Home │
                            └───┬──┘
                                │
        ┌──────┬──────┬─────────┼─────────┬──────┬──────┐
        │      │      │         │         │      │      │
     ┌──▼──┐ ┌─▼──┐ ┌─▼──┐  ┌──▼──┐  ┌──▼──┐ ┌─▼──┐ ┌─▼──┐
     │About│ │Med.│ │Srv.│  │Prog.│  │Part.│ │Cont│ │Lgl.│
     └─────┘ │Plf.│ └────┘  └─────┘  └─────┘ └────┘ └────┘
             └────┘
              │
              ▼ (외부)
         e4ds.com 등
```

모든 페이지는 Home에서 1-depth로 접근 가능합니다. 사이트 깊이가 얕아 사용자 탐색이 단순합니다.

---

# 13. 운영 메모

- **메뉴 라벨이 변경되면 `CONTENT.md`의 `nav.*` 키를 먼저 수정**한 뒤 코드 반영
- **URL이 변경되면 sitemap, 풋터, 내부 링크를 모두 동기화**
- **삭제되는 페이지가 있을 경우 301 리다이렉트 설정** (`next.config.mjs`의 `redirects()`)
- **A/B 테스트는 1차 오픈 범위에 포함하지 않음**

---

**문서 버전:** 1.0
**최종 업데이트:** 2026-05-12
**관리자:** (담당자 입력)
