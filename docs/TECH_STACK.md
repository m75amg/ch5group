# TECH_STACK.md

이 문서는 채널5코리아 코퍼레이트 사이트의 **기술 스택, 설정, 코드 규칙**을 정의합니다.
Claude Code는 이 문서를 기반으로 프로젝트를 초기화·구축하며, 임의로 라이브러리를 추가하거나 설정을 변경하지 않습니다.

## 사용 규칙

1. **이 문서에 정의되지 않은 라이브러리는 추가하지 않습니다.** 필요 시 사용자에게 먼저 보고합니다.
2. **버전은 명시된 메이저 버전을 따릅니다.** 패치 버전은 자동 업데이트 허용.
3. **환경변수는 모두 `.env.local`에 정의**하고, 절대 코드에 하드코딩하지 않습니다.
4. **새 기능 추가 전, 이 문서를 먼저 갱신**합니다.

---

# 1. 기술 스택 개요

| 영역 | 선택 | 버전 |
|---|---|---|
| 프레임워크 | Next.js (App Router) | 14.x |
| 런타임 | Node.js | 20.x LTS |
| 패키지 매니저 | pnpm | 9.x |
| 언어 | TypeScript (strict) | 5.x |
| 스타일링 | Tailwind CSS | 3.4.x |
| UI 컴포넌트 | shadcn/ui | latest |
| 다국어 | next-intl | 3.x |
| 폼 | React Hook Form + Zod | 7.x / 3.x |
| 차트 | Recharts | 2.x |
| 애니메이션 | Framer Motion | 11.x |
| 아이콘 | Lucide React | latest |
| 폰트 | Inter, Pretendard, JetBrains Mono | next/font + pretendard |
| 이메일 | Resend | latest |
| CMS | Sanity (또는 Notion API) | 추후 확정 |
| 분석 | GA4 + Microsoft Clarity | - |
| 호스팅 | Vercel | - |
| 도메인 | (운영팀 확정) | - |
| 코드 품질 | ESLint + Prettier + TypeScript strict | - |
| 테스트 | Vitest (선택, 2차) | - |
| Git Hooks | Husky + lint-staged | - |
| 보안 | reCAPTCHA v3 + honeypot | - |

---

# 2. 시스템 요구사항

개발 환경:
- **Node.js:** 20.x LTS 이상
- **pnpm:** 9.x 이상 (npm/yarn 사용 금지, lock 파일 일치 필요)
- **OS:** macOS / Windows / Linux 모두 가능
- **에디터:** VS Code 권장 (확장 프로그램은 6번 섹션 참조)

---

# 3. 프로젝트 초기화 명령어

처음 프로젝트를 만들 때 실행할 명령어 순서입니다.

```bash
# 1. Next.js 프로젝트 생성
pnpm create next-app@latest channel5-corporate \
  --typescript \
  --tailwind \
  --eslint \
  --app \
  --src-dir false \
  --import-alias "@/*"

cd channel5-corporate

# 2. 코어 의존성 설치
pnpm add next-intl
pnpm add react-hook-form @hookform/resolvers zod
pnpm add recharts
pnpm add framer-motion
pnpm add lucide-react
pnpm add clsx tailwind-merge
pnpm add resend
pnpm add pretendard

# 3. 개발 의존성 설치
pnpm add -D prettier prettier-plugin-tailwindcss
pnpm add -D @types/node @types/react @types/react-dom
pnpm add -D husky lint-staged
pnpm add -D eslint-config-prettier

# 4. shadcn/ui 초기화
pnpm dlx shadcn@latest init

# 5. shadcn 컴포넌트 추가 (필요한 것만)
pnpm dlx shadcn@latest add button
pnpm dlx shadcn@latest add input
pnpm dlx shadcn@latest add textarea
pnpm dlx shadcn@latest add checkbox
pnpm dlx shadcn@latest add label
pnpm dlx shadcn@latest add select
pnpm dlx shadcn@latest add toast
pnpm dlx shadcn@latest add dialog
pnpm dlx shadcn@latest add sheet
pnpm dlx shadcn@latest add accordion

# 6. Husky 설정
pnpm dlx husky init
```

**주의:** Claude Code는 위 명령어를 한 번에 실행하지 말고, **각 단계마다 결과를 확인**하며 진행합니다.

---

# 4. 폴더 구조

```
channel5-corporate/
├── app/
│   ├── [locale]/
│   │   ├── (home)/
│   │   │   └── page.tsx
│   │   ├── about/
│   │   │   └── page.tsx
│   │   ├── media-platform/
│   │   │   └── page.tsx
│   │   ├── services/
│   │   │   └── page.tsx
│   │   ├── programs/
│   │   │   └── page.tsx
│   │   ├── partners/
│   │   │   └── page.tsx
│   │   ├── contact/
│   │   │   └── page.tsx
│   │   ├── layout.tsx
│   │   └── not-found.tsx
│   ├── api/
│   │   ├── contact/
│   │   │   └── route.ts
│   │   └── media-kit/
│   │       └── route.ts
│   ├── sitemap.ts
│   ├── robots.ts
│   ├── globals.css
│   └── layout.tsx
│
├── components/
│   ├── ui/                          # shadcn/ui 프리미티브
│   │   ├── button.tsx
│   │   ├── input.tsx
│   │   └── ...
│   ├── layout/                      # 공통 레이아웃
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── FloatingCTA.tsx
│   │   ├── LanguageToggle.tsx
│   │   └── MobileNav.tsx
│   ├── sections/                    # 페이지별 섹션
│   │   ├── home/
│   │   │   ├── HeroSection.tsx
│   │   │   ├── WhatWeDoSection.tsx
│   │   │   ├── MediaSnapshotSection.tsx
│   │   │   ├── WhyChannel5Section.tsx
│   │   │   ├── FeaturedProgramsSection.tsx
│   │   │   ├── PartnersSection.tsx
│   │   │   └── ContactCTASection.tsx
│   │   ├── about/
│   │   ├── media-platform/
│   │   ├── services/
│   │   ├── programs/
│   │   ├── partners/
│   │   └── contact/
│   └── shared/                      # 여러 페이지 공통
│       ├── SectionWrapper.tsx
│       ├── StatCounter.tsx
│       ├── LogoGrid.tsx
│       ├── AudienceChart.tsx
│       ├── IndustryChart.tsx
│       └── CTAButton.tsx
│
├── content/                         # CONTENT.md를 옮긴 구조화 데이터
│   ├── ko/
│   │   ├── home.ts
│   │   ├── about.ts
│   │   ├── media-platform.ts
│   │   ├── services.ts
│   │   ├── programs.ts
│   │   ├── partners.ts
│   │   └── contact.ts
│   └── en/
│       └── (위와 동일 구조)
│
├── messages/                        # next-intl 번역 파일
│   ├── ko.json
│   └── en.json
│
├── lib/
│   ├── utils.ts                     # cn() 등 유틸
│   ├── constants.ts                 # 상수 (사이트 URL, 회사 정보 등)
│   ├── analytics.ts                 # GA4, Clarity 이벤트
│   ├── email.ts                     # Resend 래퍼
│   ├── validations/
│   │   └── contact.schema.ts        # Zod 스키마
│   └── i18n.ts                      # next-intl 설정
│
├── public/
│   ├── images/
│   │   ├── hero/
│   │   ├── programs/
│   │   ├── partners/
│   │   └── og/
│   ├── icons/
│   ├── media-kit/
│   │   ├── channel5-mediakit-ko.pdf
│   │   └── channel5-mediakit-en.pdf
│   ├── favicon.ico
│   └── robots.txt
│
├── docs/                            # 5개 핵심 문서
│   ├── CLAUDE.md → /CLAUDE.md (루트로 옮김)
│   ├── PROJECT_BRIEF.md
│   ├── SITEMAP.md
│   ├── CONTENT.md
│   ├── DESIGN_SYSTEM.md
│   └── TECH_STACK.md
│
├── types/
│   ├── content.ts
│   └── form.ts
│
├── .env.local                       # 환경변수 (커밋 금지)
├── .env.example                     # 환경변수 템플릿
├── .eslintrc.json
├── .prettierrc.json
├── .gitignore
├── CLAUDE.md                        # 프로젝트 루트에 위치
├── next.config.mjs
├── tailwind.config.ts
├── tsconfig.json
├── postcss.config.mjs
├── package.json
├── pnpm-lock.yaml
└── README.md
```

**규칙:**
- **새 폴더를 임의로 추가하지 않습니다.** 위 구조 안에서 작업.
- 폴더명: kebab-case (예: `media-platform`)
- 컴포넌트 파일명: PascalCase (예: `HeroSection.tsx`)
- 유틸·훅·설정 파일: camelCase (예: `analytics.ts`)
- 라우트 파일: Next.js 규칙 그대로 (`page.tsx`, `layout.tsx`, `route.ts`)

---

# 5. 환경변수

## `.env.example` (Git에 커밋)

```env
# === Site ===
NEXT_PUBLIC_SITE_URL=https://channel5korea.com
NEXT_PUBLIC_SITE_NAME=Channel5 Korea

# === Analytics ===
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
NEXT_PUBLIC_CLARITY_ID=XXXXXXXXXX

# === Form & Email ===
RESEND_API_KEY=
CONTACT_EMAIL_TO=
CONTACT_EMAIL_FROM=

# === reCAPTCHA ===
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=
RECAPTCHA_SECRET_KEY=

# === CMS (Sanity) ===
NEXT_PUBLIC_SANITY_PROJECT_ID=
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=

# === Optional ===
NEXT_PUBLIC_E4DS_URL=https://www.e4ds.com
NEXT_PUBLIC_WEBINAR_URL=https://webinar.e4ds.com
NEXT_PUBLIC_MAKE_URL=https://make.e4ds.com
```

## `.env.local` (Git에 커밋 금지)

`.env.example`을 복사해서 실제 값을 입력. **이 파일은 절대 커밋하지 않습니다.**

## `.gitignore`에 반드시 포함

```
.env.local
.env*.local
.next/
node_modules/
.vercel
```

---

# 6. VS Code 확장 프로그램 (권장)

`.vscode/extensions.json` 파일에 다음을 정의:

```json
{
  "recommendations": [
    "esbenp.prettier-vscode",
    "dbaeumer.vscode-eslint",
    "bradlc.vscode-tailwindcss",
    "biomejs.biome",
    "yoavbls.pretty-ts-errors",
    "PKief.material-icon-theme"
  ]
}
```

## `.vscode/settings.json`

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit"
  },
  "tailwindCSS.experimental.classRegex": [
    ["cva\\(([^)]*)\\)", "[\"'`]([^\"'`]*).*?[\"'`]"],
    ["cx\\(([^)]*)\\)", "(?:'|\"|`)([^']*)(?:'|\"|`)"]
  ],
  "typescript.tsdk": "node_modules/typescript/lib"
}
```

---

# 7. `package.json` 스크립트

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "lint:fix": "next lint --fix",
    "format": "prettier --write \"**/*.{ts,tsx,md,json}\"",
    "format:check": "prettier --check \"**/*.{ts,tsx,md,json}\"",
    "type-check": "tsc --noEmit",
    "prepare": "husky",
    "check-all": "pnpm lint && pnpm type-check && pnpm format:check"
  }
}
```

**작업 완료 전 항상 실행:** `pnpm check-all`

---

# 8. TypeScript 설정

## `tsconfig.json`

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": false,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": {
      "@/*": ["./*"]
    },
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "noImplicitReturns": true,
    "forceConsistentCasingInFileNames": true
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

**strict mode 필수. `any` 사용 금지.**
- 외부 라이브러리 타입이 없는 경우 `unknown`으로 받고 좁혀서 사용
- `// @ts-ignore` 금지 (불가피한 경우 `// @ts-expect-error` + 사유 주석)

---

# 9. ESLint 설정

## `.eslintrc.json`

```json
{
  "extends": ["next/core-web-vitals", "next/typescript", "prettier"],
  "rules": {
    "no-console": ["warn", { "allow": ["warn", "error"] }],
    "@typescript-eslint/no-unused-vars": ["error", { "argsIgnorePattern": "^_" }],
    "@typescript-eslint/no-explicit-any": "error",
    "react/jsx-key": "error",
    "react/no-unknown-property": "error",
    "react-hooks/exhaustive-deps": "warn"
  }
}
```

---

# 10. Prettier 설정

## `.prettierrc.json`

```json
{
  "semi": false,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "all",
  "printWidth": 100,
  "bracketSameLine": false,
  "arrowParens": "always",
  "plugins": ["prettier-plugin-tailwindcss"]
}
```

**Tailwind 클래스는 자동으로 권장 순서대로 정렬됩니다.**

---

# 11. Git Hooks (Husky + lint-staged)

## `.husky/pre-commit`

```bash
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

pnpm lint-staged
```

## `package.json`에 추가

```json
{
  "lint-staged": {
    "*.{ts,tsx}": [
      "eslint --fix",
      "prettier --write"
    ],
    "*.{json,md}": ["prettier --write"]
  }
}
```

**커밋 시 자동으로 lint·format 실행. 오류 있으면 커밋 차단.**

---

# 12. 다국어 (next-intl) 설정

## 12-1. 라우팅 구조

- 기본 언어: 한국어 (`ko`)
- 지원 언어: `ko`, `en`
- URL 패턴: `/ko/services`, `/en/services`
- 루트 접근 시 브라우저 언어 감지 후 리다이렉트, 기본은 `/ko`

## 12-2. `lib/i18n.ts`

```ts
import { getRequestConfig } from 'next-intl/server'
import { notFound } from 'next/navigation'

export const locales = ['ko', 'en'] as const
export const defaultLocale = 'ko' as const

export type Locale = (typeof locales)[number]

export default getRequestConfig(async ({ locale }) => {
  if (!locales.includes(locale as Locale)) notFound()

  return {
    messages: (await import(`@/messages/${locale}.json`)).default,
  }
})
```

## 12-3. `middleware.ts`

```ts
import createMiddleware from 'next-intl/middleware'
import { locales, defaultLocale } from '@/lib/i18n'

export default createMiddleware({
  locales,
  defaultLocale,
  localePrefix: 'always',
})

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
}
```

## 12-4. 사용 규칙

- **컴포넌트 내 모든 텍스트는 `useTranslations()`로 가져옵니다.**
- 한글/영문 하드코딩 금지.
- 키 구조는 `CONTENT.md`와 동일하게.

```tsx
// ❌ 금지
<h2>기술 기업과 엔지니어를 연결합니다</h2>

// ✅ 올바름
const t = useTranslations('home.hero')
return <h2>{t('headline')}</h2>
```

---

# 13. 폼 & 이메일

## 13-1. Contact 폼 흐름

```
사용자가 폼 제출
  ↓
클라이언트 측 Zod 검증
  ↓
reCAPTCHA v3 토큰 발급
  ↓
POST /api/contact
  ↓
서버 측 Zod 재검증
  ↓
reCAPTCHA 토큰 검증
  ↓
honeypot 필드 확인
  ↓
Resend로 이메일 발송
  ├─ 운영팀 알림 메일
  └─ 사용자 자동 응답 메일
  ↓
(추후) CRM/노션 DB 저장
  ↓
성공 응답 반환
  ↓
사용자에게 성공 메시지 표시
```

## 13-2. Zod 스키마 (`lib/validations/contact.schema.ts`)

```ts
import { z } from 'zod'

export const contactFormSchema = z.object({
  company: z.string().min(1, 'required').max(100),
  name: z.string().min(1, 'required').max(50),
  position: z.string().max(50).optional(),
  email: z.string().email('invalidEmail').max(100),
  phone: z.string().max(20).optional(),
  interests: z.array(z.enum([
    'webinar',
    'newsletter',
    'banner',
    'conference',
    'contest',
    'education',
    'other'
  ])).min(1, 'interestsRequired'),
  timeline: z.string().max(100).optional(),
  message: z.string().min(10, 'messageMin').max(2000),
  requestMediaKit: z.boolean().default(false),
  privacyConsent: z.literal(true, {
    errorMap: () => ({ message: 'privacyRequired' }),
  }),
  recaptchaToken: z.string().min(1),
  honeypot: z.string().max(0), // 봇 차단용
})

export type ContactFormInput = z.infer<typeof contactFormSchema>
```

## 13-3. Resend 이메일 (`lib/email.ts`)

```ts
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function sendContactEmails(data: ContactFormInput) {
  // 1. 운영팀 알림
  await resend.emails.send({
    from: process.env.CONTACT_EMAIL_FROM!,
    to: process.env.CONTACT_EMAIL_TO!,
    subject: `[제안 문의] ${data.company} - ${data.interests.join(', ')}`,
    html: buildInternalNotification(data),
  })

  // 2. 사용자 자동 응답
  await resend.emails.send({
    from: process.env.CONTACT_EMAIL_FROM!,
    to: data.email,
    subject: '[채널5코리아] 문의가 접수되었습니다',
    html: buildAutoReply(data),
  })
}
```

자동 응답 본문은 `CONTENT.md`의 `email.autoReply.body` 참조.

---

# 14. 차트 (Recharts)

## 14-1. 사용 규칙

- 컬러는 `--color-chart-1` ~ `--color-chart-5` 토큰만 사용
- 폰트: `font-sans`, 12~14px
- Tooltip 커스텀 컴포넌트 별도 제작 (디자인 토큰 적용)
- 애니메이션: `isAnimationActive={true}` + `animationDuration={800}` 한 번만

## 14-2. AudienceChart 예시 (`components/shared/AudienceChart.tsx`)

```tsx
'use client'

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts'

const CHART_COLORS = [
  'rgb(var(--color-chart-1))',
  'rgb(var(--color-chart-2))',
  'rgb(var(--color-chart-3))',
  'rgb(var(--color-chart-4))',
]

export function AudienceChart({ data }: { data: { name: string; value: number }[] }) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={data}
          dataKey="value"
          innerRadius={60}
          outerRadius={100}
          paddingAngle={2}
        >
          {data.map((_, i) => (
            <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  )
}
```

---

# 15. 분석 (Analytics)

## 15-1. GA4 (Google Analytics)

`app/layout.tsx`에 GA4 스크립트 삽입. 쿠키 동의 후에만 활성화.

## 15-2. Microsoft Clarity

세션 녹화 및 히트맵용. 쿠키 동의 후 활성화.

## 15-3. 추적 이벤트 (`lib/analytics.ts`)

```ts
type EventName =
  | 'cta_click'
  | 'contact_submit'
  | 'media_kit_request'
  | 'service_card_click'
  | 'language_change'
  | 'external_link_click'

export function trackEvent(name: EventName, params?: Record<string, unknown>) {
  if (typeof window === 'undefined') return
  if (typeof (window as any).gtag !== 'function') return

  ;(window as any).gtag('event', name, params)
}
```

**최소 추적 이벤트:**
- 페이지뷰 (자동)
- 주 CTA 버튼 클릭
- 부 CTA 버튼 클릭
- 문의 폼 제출 (성공/실패)
- 미디어킷 요청
- 언어 전환
- e4ds.com 외부 링크 클릭
- 서비스 카드 클릭

---

# 16. SEO 설정

## 16-1. `app/[locale]/layout.tsx` 메타데이터

각 페이지에 다음을 명시:

```tsx
import type { Metadata } from 'next'

export async function generateMetadata({ params }): Promise<Metadata> {
  const t = await getTranslations({ locale: params.locale, namespace: 'home.meta' })

  return {
    title: t('title'),
    description: t('description'),
    openGraph: {
      title: t('title'),
      description: t('description'),
      url: `https://channel5korea.com/${params.locale}`,
      siteName: 'Channel5 Korea',
      images: [{ url: '/images/og/default.png', width: 1200, height: 630 }],
      locale: params.locale === 'ko' ? 'ko_KR' : 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: t('title'),
      description: t('description'),
      images: ['/images/og/default.png'],
    },
    alternates: {
      languages: {
        ko: '/ko',
        en: '/en',
      },
    },
  }
}
```

## 16-2. `app/sitemap.ts`

```ts
import type { MetadataRoute } from 'next'

const ROUTES = ['', '/about', '/media-platform', '/services', '/programs', '/partners', '/contact']

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://channel5korea.com'

  return ROUTES.flatMap((route) => [
    { url: `${base}/ko${route}`, changeFrequency: 'weekly', priority: route === '' ? 1.0 : 0.8 },
    { url: `${base}/en${route}`, changeFrequency: 'weekly', priority: route === '' ? 1.0 : 0.8 },
  ])
}
```

## 16-3. `app/robots.ts`

```ts
import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: 'https://channel5korea.com/sitemap.xml',
  }
}
```

## 16-4. 구조화 데이터 (JSON-LD)

`Organization` 스키마를 `app/layout.tsx`에 삽입:

```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Channel5 Korea",
  "alternateName": "채널5코리아",
  "url": "https://channel5korea.com",
  "logo": "https://channel5korea.com/images/logo.png",
  "description": "B2B technology media platform for the semiconductor, embedded, AI, and SDV industries",
  "address": { "@type": "PostalAddress", "addressCountry": "KR" },
  "sameAs": ["https://www.e4ds.com"]
}
```

---

# 17. 성능 목표

| 지표 | 목표 |
|---|---|
| Lighthouse Performance | 90+ |
| Lighthouse Accessibility | 95+ |
| Lighthouse Best Practices | 95+ |
| Lighthouse SEO | 100 |
| LCP (Largest Contentful Paint) | < 2.5s |
| CLS (Cumulative Layout Shift) | < 0.1 |
| INP (Interaction to Next Paint) | < 200ms |
| First Load JS | < 200KB |

## 17-1. 최적화 규칙

- 모든 이미지는 `next/image`. Hero 이미지는 `priority` 속성.
- 폰트는 `next/font/google`로 self-host. FOUT/FOIT 방지.
- 큰 라이브러리는 dynamic import (`next/dynamic`).
- `'use client'` 컴포넌트는 가능한 작게.
- 차트, 폼 같은 인터랙티브 컴포넌트만 클라이언트, 나머지는 서버 컴포넌트.

---

# 18. 보안

## 18-1. HTTP 보안 헤더

`next.config.mjs`에 추가:

```js
const securityHeaders = [
  { key: 'X-DNS-Prefetch-Control', value: 'on' },
  { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
]

export default {
  async headers() {
    return [{ source: '/:path*', headers: securityHeaders }]
  },
}
```

## 18-2. API 보호

- Contact API: rate limit (분당 5회), reCAPTCHA, honeypot
- 환경변수: 절대 클라이언트에 노출 금지 (`NEXT_PUBLIC_` 접두사 없는 것)
- 폼 검증: 서버 측에서 재검증

## 18-3. 개인정보 처리

- 폼 데이터 보관 기간 명시 (정책에 따라)
- 개인정보처리방침 페이지 별도 작성 (운영팀)
- 쿠키 동의 배너 (GDPR + 한국 개인정보보호법 대응)

---

# 19. CMS 연동 (2차 확장)

1차 오픈에서는 콘텐츠를 `/content` 폴더의 TS 파일로 관리합니다.
2차 확장에서 Sanity 또는 Notion API를 연결합니다.

## 19-1. Sanity 옵션

장점: 미디어 관리, 다국어 지원, 협업 UI
설치: `pnpm add @sanity/client next-sanity`

## 19-2. Notion API 옵션

장점: 운영팀이 익숙한 UI에서 직접 편집
설치: `pnpm add @notionhq/client`

**결정은 운영팀과 협의 후 확정.** 1차 오픈에는 영향 없음.

---

# 20. 배포 (Vercel)

## 20-1. 배포 설정

- 메인 브랜치: `main` → Production
- 개발 브랜치: `develop` → Preview
- Pull Request: 자동 Preview 배포

## 20-2. Vercel 환경변수

`.env.local`의 변수를 Vercel 대시보드에 동일하게 입력. Production / Preview / Development 환경 분리.

## 20-3. 도메인

- Production: `channel5korea.com` (또는 운영팀이 확정한 도메인)
- Preview: Vercel 자동 부여 URL
- HTTPS: Vercel 자동 적용

## 20-4. 빌드 명령어 (자동 인식)

```bash
Build Command: pnpm build
Output Directory: .next
Install Command: pnpm install
Development Command: pnpm dev
```

---

# 21. Git 브랜치 전략

- `main`: 프로덕션 (보호 브랜치)
- `develop`: 개발 통합
- `feature/[작업명]`: 기능 브랜치 (예: `feature/home-hero`)
- `fix/[버그명]`: 버그 수정 브랜치

## 21-1. 커밋 메시지 규칙

`CLAUDE.md` 13번 섹션의 규칙을 따릅니다.

```
[feat] Home Hero 섹션 컴포넌트 추가
[fix] Contact 폼 이메일 검증 오류 수정
[style] Header 모바일 반응형 보완
[content] Services 페이지 카피 갱신
[chore] Husky 설정 추가
```

## 21-2. PR (Pull Request) 규칙

- 제목: 커밋 메시지와 동일 형식
- 본문: 변경 내역, 스크린샷(필요 시), 테스트 결과
- 머지 전 체크: `pnpm check-all` 통과

---

# 22. 의존성 관리 규칙

## 22-1. 새 라이브러리 추가 절차

1. 정말 필요한지 검토 (기존 라이브러리로 해결 가능한가?)
2. 번들 사이즈 확인 ([bundlephobia.com](https://bundlephobia.com))
3. 최근 업데이트, 이슈, 다운로드 수 확인
4. **사용자에게 보고하고 승인받기**
5. 이 문서(`TECH_STACK.md`)에 추가
6. 설치 후 `pnpm-lock.yaml` 커밋

## 22-2. 금지 라이브러리

다음은 추가 금지 (대체재 명시):

| 금지 | 이유 | 대체 |
|---|---|---|
| Moment.js | 번들 큼, deprecated | `date-fns` 또는 `Intl` |
| Axios | Next.js fetch로 충분 | `fetch` |
| jQuery | React와 충돌 | (필요 없음) |
| Bootstrap | Tailwind와 중복 | Tailwind |
| Lodash 전체 | 번들 큼 | 개별 함수 import 또는 직접 구현 |
| Material UI / Chakra UI | shadcn/ui와 중복 | shadcn/ui |

## 22-3. 정기 업데이트

- 매월 1회 `pnpm outdated` 확인
- 메이저 버전 업데이트는 사용자 승인 후 진행
- 보안 패치는 즉시 적용

---

# 23. 테스트 (선택, 2차)

1차 오픈에서는 테스트를 생략하고, 2차에서 도입합니다.

도입 시:
- 유닛 테스트: Vitest
- 컴포넌트 테스트: Testing Library
- E2E 테스트: Playwright (Contact 폼 등 핵심 플로우만)

---

# 24. 운영 시 체크리스트

## 24-1. 매 작업 후

- [ ] `pnpm type-check` 통과
- [ ] `pnpm lint` 통과
- [ ] `pnpm format:check` 통과
- [ ] 브라우저에서 실제 동작 확인 (모바일/태블릿/데스크탑)
- [ ] 콘솔 에러 없음
- [ ] Lighthouse 점수 유지

## 24-2. 배포 전

- [ ] `pnpm build` 성공
- [ ] Preview 환경에서 전체 페이지 검수
- [ ] Contact 폼 실제 제출 테스트
- [ ] 한/영 양쪽 언어 검수
- [ ] OG 이미지 확인 ([opengraph.xyz](https://www.opengraph.xyz/))
- [ ] sitemap.xml 정상 생성 확인
- [ ] robots.txt 정상 응답 확인
- [ ] 분석 도구 작동 확인

---

# 25. 향후 확장 항목 (참고용)

이번 1차 오픈 범위에는 포함되지 않지만, 추후 검토할 항목:

- [ ] 블로그/인사이트 페이지 (CMS 연동 필요)
- [ ] 채용 페이지
- [ ] 다크 모드
- [ ] PWA (오프라인 지원)
- [ ] AMP (선택, SEO 효과 미미)
- [ ] 라이브 챗 (Intercom, Crisp 등)
- [ ] 뉴스레터 구독 폼 (회사 사이트에서 e4ds 뉴스레터 구독 유도)
- [ ] 미디어킷 자동 발송 시스템

---

# 26. 첫 작업 권장 순서

Claude Code가 프로젝트를 시작할 때 다음 순서로 진행합니다.

## Phase 1 — 기반 구축 (Day 1~3)

1. `pnpm create next-app` 으로 프로젝트 초기화
2. 폴더 구조 생성
3. `tailwind.config.ts` + `globals.css`에 디자인 토큰 주입
4. `next-intl` 설정 + `messages/ko.json`, `messages/en.json` 빈 파일 생성
5. 폰트 (Inter, Pretendard) 로드
6. 공통 레이아웃: Header, Footer, FloatingCTA
7. UI 프리미티브: Button, Input, Textarea, Checkbox
8. SectionWrapper 컴포넌트

## Phase 2 — 페이지 골격 (Day 4~6)

9. 7개 페이지의 빈 라우트 생성
10. 각 페이지의 섹션 컴포넌트 골격 (placeholder)
11. 메타데이터 generateMetadata 적용
12. sitemap, robots 설정

## Phase 3 — 콘텐츠 주입 (Day 7~10)

13. `CONTENT.md` → `messages/ko.json`, `messages/en.json` 변환
14. Home 페이지 카피 적용
15. About → Services → Media Platform → Programs → Partners 순으로 진행
16. Contact 페이지 폼 구현

## Phase 4 — 기능 (Day 11~13)

17. Contact API 라우트 + Resend 연동
18. reCAPTCHA 적용
19. 분석 (GA4, Clarity) 연동
20. 차트 컴포넌트 구현

## Phase 5 — 다듬기 (Day 14~16)

21. 반응형 전체 점검
22. 접근성 점검
23. 성능 최적화
24. Lighthouse 검사
25. 운영팀 검수
26. Production 배포

---

**문서 버전:** 1.0
**최종 업데이트:** 2026-05-12
**관리자:** (담당자 입력)
