# DESIGN_SYSTEM.md

이 문서는 채널5코리아 코퍼레이트 사이트의 **디자인 토큰과 컴포넌트 규칙**을 정의합니다.

## 사용 규칙

1. **모든 컬러, 폰트, 간격, 반경, 그림자는 이 문서에 정의된 토큰만 사용합니다.**
2. Tailwind 기본 팔레트(예: `text-blue-500`) 직접 사용 금지. 정의된 시맨틱 토큰만 사용합니다.
3. 인라인 스타일 금지. 동적 값(차트 등)은 예외로 두되 토큰 변수를 참조합니다.
4. 새로운 토큰이 필요할 경우 **이 문서를 먼저 수정**한 뒤 코드에 반영합니다.
5. Figma와 코드의 토큰은 1:1 매핑되도록 유지합니다.

---

# 1. 디자인 철학

채널5코리아는 B2B 기술 미디어 플랫폼입니다. 디자인은 **세 가지 원칙**을 따릅니다.

**① 신뢰가 화려함보다 우선합니다.**
딥 네이비와 흰색을 중심으로 한 절제된 컬러 팔레트. 무광 톤. 그라데이션 최소화. 의사결정자가 "이 회사는 진지하다"고 느끼게 만드는 것이 목표입니다.

**② 정보 구조가 시각 효과보다 우선합니다.**
타이포그래피 계층, 여백, 표·차트의 정돈이 메인 무기입니다. 애니메이션과 인터랙션은 의미를 가질 때만 사용합니다.

**③ 기술 미디어의 정체성이 코퍼레이트의 보수성과 조화를 이룹니다.**
딱딱한 IBM·Oracle 스타일이 아니라, Stripe·Linear·Vercel·Segment 같은 모던 B2B SaaS의 절제된 시각 언어를 참고합니다.

---

# 2. 컬러 시스템

## 2-1. 컬러 토큰 정의

모든 컬러는 **CSS 변수**로 정의하고, **Tailwind 시맨틱 토큰**에서 참조합니다.

### Brand Colors

| 토큰명 | HEX | RGB | 용도 |
|---|---|---|---|
| `--color-brand-primary` | `#0B1B2B` | 11, 27, 43 | 메인 브랜드 컬러. Hero 배경, 헤더, 풋터. 채널5의 정체성. |
| `--color-brand-primary-foreground` | `#FFFFFF` | 255, 255, 255 | brand-primary 위 텍스트 |
| `--color-brand-accent` | `#1E63FF` | 30, 99, 255 | 액센트 컬러. CTA 버튼, 링크, 차트 강조. e4ds 계열 블루. |
| `--color-brand-accent-foreground` | `#FFFFFF` | 255, 255, 255 | brand-accent 위 텍스트 |
| `--color-brand-accent-hover` | `#1751D9` | 23, 81, 217 | brand-accent의 hover 상태 |

### Neutral Colors (Gray Scale)

| 토큰명 | HEX | 용도 |
|---|---|---|
| `--color-neutral-50` | `#F8FAFC` | 페이지 배경 (라이트 섹션) |
| `--color-neutral-100` | `#F1F5F9` | 카드·박스 배경 |
| `--color-neutral-200` | `#E2E8F0` | 디바이더, 경계선 |
| `--color-neutral-300` | `#CBD5E1` | 비활성 경계선 |
| `--color-neutral-400` | `#94A3B8` | 보조 아이콘, 비활성 텍스트 |
| `--color-neutral-500` | `#64748B` | 캡션, 메타 텍스트 |
| `--color-neutral-600` | `#475569` | 본문 보조 텍스트 |
| `--color-neutral-700` | `#334155` | 본문 텍스트 |
| `--color-neutral-800` | `#1E293B` | 강조 본문, 부제목 |
| `--color-neutral-900` | `#0F172A` | 헤드라인 텍스트 |

### Semantic Colors (시맨틱)

| 토큰명 | HEX | 용도 |
|---|---|---|
| `--color-background` | `#FFFFFF` | 기본 페이지 배경 |
| `--color-background-muted` | `#F8FAFC` | 보조 섹션 배경 |
| `--color-background-inverse` | `#0B1B2B` | 다크 섹션 배경 (Hero, Contact CTA) |
| `--color-foreground` | `#0F172A` | 기본 텍스트 |
| `--color-foreground-muted` | `#64748B` | 보조 텍스트 |
| `--color-foreground-inverse` | `#FFFFFF` | 다크 배경 위 텍스트 |
| `--color-border` | `#E2E8F0` | 기본 경계선 |
| `--color-border-strong` | `#CBD5E1` | 강조 경계선 |
| `--color-ring` | `#1E63FF` | 포커스 링 |

### Feedback Colors

| 토큰명 | HEX | 용도 |
|---|---|---|
| `--color-success` | `#16A34A` | 성공 상태 (폼 제출 완료 등) |
| `--color-warning` | `#EAB308` | 경고 상태 |
| `--color-error` | `#DC2626` | 에러 상태 (폼 검증 실패) |
| `--color-info` | `#1E63FF` | 정보성 알림 (brand-accent와 동일) |

### Chart Colors

차트(독자 분포, 산업 분포 등)에 사용. **단일 brand-accent 계열의 명도 변주를 우선**으로 하고, 보조 컬러로 neutral을 사용합니다.

| 토큰명 | HEX | 용도 |
|---|---|---|
| `--color-chart-1` | `#1E63FF` | 1순위 데이터 (brand-accent) |
| `--color-chart-2` | `#5388FF` | 2순위 데이터 |
| `--color-chart-3` | `#88ADFF` | 3순위 데이터 |
| `--color-chart-4` | `#BDD2FF` | 4순위 데이터 |
| `--color-chart-5` | `#0B1B2B` | 강조 비교 데이터 (brand-primary) |
| `--color-chart-grid` | `#E2E8F0` | 차트 그리드선 |

## 2-2. 컬러 사용 규칙

- **본문 텍스트:** `text-foreground` (neutral-900) 기본, 보조는 `text-foreground-muted` (neutral-500/600)
- **헤드라인:** `text-foreground` 또는 다크 배경에서 `text-foreground-inverse`
- **CTA 버튼:** Primary는 `bg-brand-accent text-white`, Secondary는 `bg-transparent border border-border text-foreground`
- **링크:** `text-brand-accent`, hover 시 `text-brand-accent-hover` + underline
- **카드 배경:** `bg-background` 또는 `bg-background-muted`, 경계선은 `border-border`
- **다크 섹션:** `bg-background-inverse` (brand-primary와 동일) + `text-foreground-inverse`

## 2-3. 컬러 사용 금지 사항

- ❌ Tailwind 기본 팔레트 직접 사용: `text-blue-500`, `bg-slate-100` 같은 클래스 금지
- ❌ 임의 HEX 코드 직접 입력: `style={{ color: '#1234AB' }}` 금지
- ❌ 그라데이션 남용: 사용 시 정해진 토큰 조합으로만
- ❌ 액센트 컬러 다중 사용: 메인 액센트는 `brand-accent` 하나로만

---

# 3. 타이포그래피

## 3-1. 폰트 패밀리

### Primary (영문/숫자)
- **폰트:** Inter (variable)
- **로드:** `next/font/google`의 Inter
- **사용처:** 영문 헤드라인·본문, 모든 숫자, 모든 UI 라벨
- **Weight:** 400, 500, 600, 700

### Korean (국문)
- **폰트:** Pretendard Variable
- **로드:** Pretendard CDN 또는 `pretendard` npm 패키지
- **사용처:** 모든 국문 텍스트
- **Weight:** 400, 500, 600, 700

### Mono (코드·테크니컬 표기)
- **폰트:** JetBrains Mono
- **사용처:** 통계 수치 강조, 기술 키워드 강조
- **Weight:** 400, 500

### Font Stack
```css
--font-sans: 'Inter', 'Pretendard Variable', system-ui, -apple-system, sans-serif;
--font-mono: 'JetBrains Mono', 'Pretendard Variable', monospace;
```

## 3-2. 타이포 스케일

**모든 사이즈는 `rem` 기준. 1rem = 16px.**

### Display (Hero·대형 헤드라인)

| 토큰 | 데스크탑 | 모바일 | line-height | letter-spacing | weight |
|---|---|---|---|---|---|
| `display-1` | 72px (4.5rem) | 40px (2.5rem) | 1.1 | -0.02em | 700 |
| `display-2` | 56px (3.5rem) | 36px (2.25rem) | 1.15 | -0.02em | 700 |

### Heading

| 토큰 | 데스크탑 | 모바일 | line-height | letter-spacing | weight |
|---|---|---|---|---|---|
| `h1` | 48px (3rem) | 32px (2rem) | 1.2 | -0.015em | 700 |
| `h2` | 36px (2.25rem) | 28px (1.75rem) | 1.25 | -0.01em | 600 |
| `h3` | 28px (1.75rem) | 24px (1.5rem) | 1.3 | -0.005em | 600 |
| `h4` | 22px (1.375rem) | 20px (1.25rem) | 1.35 | 0 | 600 |
| `h5` | 18px (1.125rem) | 17px (1.0625rem) | 1.4 | 0 | 600 |

### Body

| 토큰 | size | line-height | weight | 용도 |
|---|---|---|---|---|
| `body-lg` | 18px (1.125rem) | 1.6 | 400 | Hero 서브, 강조 본문 |
| `body` | 16px (1rem) | 1.6 | 400 | 기본 본문 |
| `body-sm` | 14px (0.875rem) | 1.55 | 400 | 보조 본문, 카드 설명 |
| `caption` | 12px (0.75rem) | 1.5 | 500 | 캡션, 메타 정보 |

### Label & UI

| 토큰 | size | weight | letter-spacing | 용도 |
|---|---|---|---|---|
| `eyebrow` | 13px (0.8125rem) | 500 | 0.08em (uppercase) | 섹션 상단 카테고리 라벨 |
| `label` | 14px (0.875rem) | 500 | 0 | 폼 라벨, 카드 제목 |
| `button` | 15px (0.9375rem) | 500 | 0 | 버튼 텍스트 |

## 3-3. 타이포 사용 규칙

### 헤드라인 패턴
- **Hero (Display-1):** 페이지당 1회. Home, About 등의 최상단 헤드라인.
- **Section (H2):** 각 섹션의 메인 헤드라인.
- **Subsection (H3):** 카드 제목, 서브 섹션 헤드라인.
- **헤딩 계층 건너뛰기 금지:** H1 → H3로 점프 금지.

### Eyebrow 패턴
모든 섹션은 `eyebrow` 라벨 → `H2 헤드라인` → `body-lg 설명` 의 3단 구조를 따릅니다.

```
[Eyebrow]    SERVICES
[H2]         하나의 독자 자산, 여섯 가지 활용 방식
[Body-lg]    채널5코리아의 서비스는 모두 동일한 독자 자산 위에서...
```

### 본문 규칙
- 본문은 `body` (16px) 기본. 모바일에서도 동일.
- Hero 서브 카피는 `body-lg` (18px).
- 카드 내 설명은 `body-sm` (14px).
- 캡션·메타 정보는 `caption` (12px).
- **본문 한 줄 최대 글자 수: 75자 이내.** `max-w-prose` 또는 `max-w-[65ch]` 사용.

### 영문/국문 혼합
영문 단어가 국문 안에 섞일 때(e4ds, AI, SDV 등):
- 폰트는 자동으로 fallback (Inter → Pretendard)
- 영문 단어 양옆에 공백 1칸씩
- 영문 약어는 대문자 유지 (AI, SDV, B2B)

---

# 4. 간격 시스템 (Spacing)

## 4-1. 간격 토큰

Tailwind 기본 spacing scale을 사용합니다. **임의의 픽셀값(예: `p-[17px]`) 사용 금지.**

| Tailwind | px | 사용 예 |
|---|---|---|
| `0.5` | 2px | 미세 간격 |
| `1` | 4px | 아이콘 옆 간격 |
| `2` | 8px | 인라인 요소 간격 |
| `3` | 12px | 폼 입력 패딩 |
| `4` | 16px | 카드 내부 패딩 |
| `6` | 24px | 컴포넌트 간 간격 |
| `8` | 32px | 카드 외부 마진 |
| `10` | 40px | 작은 섹션 간격 |
| `12` | 48px | 섹션 내부 그룹 간격 |
| `16` | 64px | 섹션 간 간격 (모바일) |
| `20` | 80px | 섹션 간 간격 (태블릿) |
| `24` | 96px | 섹션 간 간격 (데스크탑) |
| `32` | 128px | 큰 섹션 간 간격 (Hero ↔ 본문) |

## 4-2. 섹션 패딩 규칙

각 페이지의 섹션은 다음 패턴을 따릅니다.

```css
/* Section 기본 패딩 */
py-16  /* 모바일: 64px */
md:py-20  /* 태블릿: 80px */
lg:py-24  /* 데스크탑: 96px */

/* Hero·CTA 섹션 (더 넉넉하게) */
py-20
md:py-24
lg:py-32
```

## 4-3. 컨테이너 최대 너비

```css
/* 본문 컨테이너 */
max-w-7xl mx-auto px-6 lg:px-8

/* 7xl = 1280px */
/* 좌우 패딩: 모바일 24px, 데스크탑 32px */
```

특수 경우:
- 본문 단락 (긴 텍스트): `max-w-prose` (≈65ch)
- 폼 컨테이너: `max-w-2xl` (672px)
- 좁은 카드 그리드: `max-w-5xl` (1024px)

---

# 5. 반응형 브레이크포인트

Tailwind 기본을 사용합니다.

| 토큰 | min-width | 디바이스 |
|---|---|---|
| (default) | 0 | 모바일 |
| `sm` | 640px | 큰 모바일 |
| `md` | 768px | 태블릿 |
| `lg` | 1024px | 작은 데스크탑 |
| `xl` | 1280px | 데스크탑 |
| `2xl` | 1536px | 큰 데스크탑 |

## 5-1. 반응형 작업 규칙

- **모바일 우선:** 기본 스타일은 모바일(375px 기준), 큰 화면은 `md:`, `lg:` 접두사로 확장
- 디자인 검증 기준 3가지: **375px (모바일), 768px (태블릿), 1280px (데스크탑)**
- 카드 그리드 패턴:
  - 모바일: 1열
  - 태블릿(`md:`): 2열
  - 데스크탑(`lg:`): 3열 또는 4열

---

# 6. Border Radius

| 토큰 | px | 용도 |
|---|---|---|
| `rounded-none` | 0 | 평면 박스 |
| `rounded-sm` | 4px | 작은 버튼, 칩 |
| `rounded-md` | 6px | 폼 입력 |
| `rounded-lg` | 8px | 카드 |
| `rounded-xl` | 12px | 큰 카드, 모달 |
| `rounded-2xl` | 16px | Hero 미디어 영역 |
| `rounded-full` | 9999px | 아바타, 원형 아이콘 |

**기본 카드 반경은 `rounded-lg` (8px). 너무 둥글게 만들면 코퍼레이트 톤이 무너집니다.**

---

# 7. 그림자 (Shadow)

그림자는 **절제해서 사용**합니다. Linear, Stripe 같은 사이트처럼 무광 위주.

| 토큰 | CSS | 용도 |
|---|---|---|
| `shadow-none` | none | 기본 카드 (경계선만 사용 권장) |
| `shadow-sm` | `0 1px 2px rgba(15, 23, 42, 0.05)` | 입력 필드 |
| `shadow-md` | `0 4px 12px rgba(15, 23, 42, 0.08)` | hover 시 카드 |
| `shadow-lg` | `0 8px 24px rgba(15, 23, 42, 0.10)` | 드롭다운, 모달 |
| `shadow-xl` | `0 16px 40px rgba(15, 23, 42, 0.12)` | 플로팅 CTA, 토스트 |

**기본은 그림자 없이 `border border-border`로 경계만 표현. hover 시 살짝 `shadow-md` 추가하는 패턴이 깔끔합니다.**

---

# 8. 모션 & 트랜지션

## 8-1. 기본 원칙

- **의미가 있는 모션만 사용.** 예뻐 보이려고 추가하지 않습니다.
- 대부분의 인터랙션은 **150~250ms** 사이가 적절합니다.
- 가속 곡선은 `ease-out` 또는 `cubic-bezier(0.16, 1, 0.3, 1)` 권장.

## 8-2. 트랜지션 토큰

```css
--transition-fast: 150ms ease-out;
--transition-base: 200ms ease-out;
--transition-slow: 300ms ease-out;
--transition-bounce: 300ms cubic-bezier(0.16, 1, 0.3, 1);
```

## 8-3. 사용 가능한 모션

- **버튼 hover:** 배경색 변경 (`transition-colors 150ms`)
- **카드 hover:** 미세한 `translate-y-[-2px]` + `shadow-md` 추가 (200ms)
- **링크 hover:** underline 추가
- **섹션 진입:** `opacity-0 → opacity-100` + `translate-y-[16px] → 0` (Framer Motion, 400ms, 한 번만)
- **숫자 카운트업:** Hero 지표에만 사용, 1.5초 이내

## 8-4. 금지 모션

- ❌ Parallax 스크롤
- ❌ 이유 없는 회전, 스케일 애니메이션
- ❌ 연속 등장 staggered 애니메이션 (1초 이상 지연)
- ❌ 마우스 따라다니는 효과
- ❌ 배경 그라데이션 애니메이션

---

# 9. 컴포넌트 토큰

## 9-1. Button

### Variants

#### Primary
```
bg-brand-accent
text-brand-accent-foreground
hover:bg-brand-accent-hover
focus-visible:ring-2 ring-brand-accent ring-offset-2
```

#### Secondary
```
bg-transparent
text-foreground
border border-border-strong
hover:bg-neutral-100
```

#### Ghost
```
bg-transparent
text-foreground-muted
hover:bg-neutral-100
hover:text-foreground
```

#### Inverse (다크 배경용)
```
bg-white
text-foreground
hover:bg-neutral-100
```

### Sizes

| Size | Height | Padding (X) | Font |
|---|---|---|---|
| `sm` | 36px | 12px | 14px |
| `md` | 44px | 16px | 15px |
| `lg` | 52px | 20px | 16px |

기본은 `md`. Hero·CTA 섹션의 메인 버튼은 `lg`.

### 공통
- Border radius: `rounded-md`
- Weight: 500
- 키보드 focus 시 `ring-brand-accent ring-2 ring-offset-2`

## 9-2. Card

```
bg-background
border border-border
rounded-lg
p-6 lg:p-8
transition-all 200ms

hover (선택):
  border-border-strong
  shadow-md
  translate-y-[-2px]
```

## 9-3. Input / Textarea

```
height: 44px (Input), 120px+ (Textarea)
bg-background
border border-border
rounded-md
px-3 py-2
font: body (16px)
focus: ring-2 ring-brand-accent border-transparent
error: border-error
disabled: bg-neutral-100 text-neutral-400
```

## 9-4. Checkbox

```
size: 18px × 18px
border border-border-strong
rounded-sm
checked: bg-brand-accent border-brand-accent
focus: ring-2 ring-brand-accent ring-offset-2
```

## 9-5. Chip (Multi-select용)

```
height: 36px
px-3
rounded-full
border border-border
text-foreground
bg-background

selected:
  bg-brand-accent
  text-white
  border-brand-accent
```

Contact 페이지의 "관심 서비스 선택"에 사용.

## 9-6. Navigation Bar

- 높이: 72px (데스크탑), 64px (모바일)
- 배경: `bg-background/95 backdrop-blur-md` (스크롤 시 약간 투명 + 블러)
- 경계선: 하단에 `border-b border-border`
- 로고 위치: 좌측
- 메뉴 위치: 중앙 또는 우측
- CTA 버튼: 우측 끝
- 모바일: 햄버거 메뉴 + 풀스크린 오버레이

## 9-7. Footer

- 배경: `bg-background-inverse` (brand-primary)
- 텍스트: `text-foreground-inverse`
- 보조 텍스트: `text-neutral-400`
- 링크 hover: `text-white` + underline
- 패딩: `py-16 lg:py-20`
- 구조: 4컬럼 (회사 / 서비스 / 운영 플랫폼 / 연락처) → 모바일에서 1컬럼
- 하단 copyright: `border-t border-white/10`

## 9-8. Section Wrapper

모든 페이지 섹션은 다음 구조를 따릅니다.

```tsx
<section className="py-16 md:py-20 lg:py-24">
  <div className="max-w-7xl mx-auto px-6 lg:px-8">
    <p className="eyebrow">SERVICES</p>
    <h2 className="h2 mt-3">섹션 헤드라인</h2>
    <p className="body-lg text-foreground-muted mt-4 max-w-prose">
      섹션 본문 설명
    </p>
    <div className="mt-12 lg:mt-16">
      {/* 섹션 콘텐츠 */}
    </div>
  </div>
</section>
```

## 9-9. Floating CTA

- 위치: `fixed bottom-6 right-6` (데스크탑), `bottom-4 right-4` (모바일)
- 배경: `bg-brand-accent text-white`
- 그림자: `shadow-xl`
- 모서리: `rounded-full`
- 패딩: `px-6 py-3`
- z-index: `z-40`
- Scroll Y > 600px 일 때 노출

---

# 10. 차트 디자인 규칙

차트는 Recharts로 구현. 다음 규칙을 따릅니다.

- 컬러: `--color-chart-1` ~ `--color-chart-5` 토큰만 사용
- 그리드: `--color-chart-grid` 사용, dashed
- 폰트: `font-sans`, size 12~14px, weight 500
- Tooltip: 흰 배경 + `border border-border` + `shadow-md` + `rounded-md`
- Legend: 차트 하단, 가로 배치 (단, 모바일에서는 수직)
- 애니메이션: 진입 시 1회만, 800ms
- 3D, 그라데이션 채움, 화려한 효과 금지

---

# 11. 이미지 & 미디어 규칙

## 11-1. 사용 규칙

- **스톡 이미지 금지.** 모든 이미지는 실제 채널5코리아가 보유한 행사·웨비나·컨퍼런스 사진을 사용합니다.
- 인물 사진: 흑백 또는 단색 톤 처리로 톤 통일
- 이미지 비율: Hero 16:9 또는 4:3, 카드 3:2, 인물 1:1 또는 4:5
- 모든 이미지는 `next/image` 사용. `alt` 속성 필수.

## 11-2. 이미지 톤 처리

```css
/* 인물·행사 사진에 일관된 톤 적용 */
filter: contrast(1.05) brightness(0.95) saturate(0.9);
```

또는 단색 톤 오버레이:
```css
mix-blend-mode: multiply;
background: var(--color-brand-primary);
opacity: 0.1;
```

## 11-3. 추상 비주얼

이미지가 없을 때 사용 가능한 추상 비주얼:
- 회로(circuit) 모티프, 그리드 패턴, 데이터 메시
- 단색 (brand-primary 또는 brand-accent)
- SVG로 제작 권장

---

# 12. 접근성 (Accessibility)

## 12-1. 컬러 대비

WCAG AA 기준 충족 필수.

| 조합 | 대비비율 | 통과 여부 |
|---|---|---|
| neutral-900 on white | 16.7:1 | ✅ AAA |
| neutral-700 on white | 9.7:1 | ✅ AAA |
| neutral-500 on white | 5.7:1 | ✅ AA |
| brand-accent on white | 4.6:1 | ✅ AA |
| white on brand-primary | 17.4:1 | ✅ AAA |

**neutral-400 이하 컬러는 본문 텍스트로 사용 금지.** (대비 부족)

## 12-2. 포커스 상태

모든 인터랙티브 요소는 키보드 포커스 시 명확한 시각 피드백:

```css
focus-visible:outline-none
focus-visible:ring-2
focus-visible:ring-brand-accent
focus-visible:ring-offset-2
```

## 12-3. 모션 감소 (prefers-reduced-motion)

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

# 13. Z-Index 계층

| 토큰 | 값 | 용도 |
|---|---|---|
| `z-base` | 0 | 기본 |
| `z-dropdown` | 10 | 드롭다운 메뉴 |
| `z-sticky` | 20 | 스티키 헤더 |
| `z-overlay` | 30 | 오버레이 (모달 배경) |
| `z-floating` | 40 | 플로팅 CTA |
| `z-modal` | 50 | 모달, 다이얼로그 |
| `z-toast` | 60 | 토스트 알림 |
| `z-tooltip` | 70 | 툴팁 |

---

# 14. Tailwind 설정 매핑

`tailwind.config.ts`에 다음과 같이 적용합니다.

```ts
import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: 'rgb(var(--color-brand-primary) / <alpha-value>)',
          'primary-foreground': 'rgb(var(--color-brand-primary-foreground) / <alpha-value>)',
          accent: 'rgb(var(--color-brand-accent) / <alpha-value>)',
          'accent-foreground': 'rgb(var(--color-brand-accent-foreground) / <alpha-value>)',
          'accent-hover': 'rgb(var(--color-brand-accent-hover) / <alpha-value>)',
        },
        neutral: {
          50: 'rgb(var(--color-neutral-50) / <alpha-value>)',
          // ... 100~900
        },
        background: 'rgb(var(--color-background) / <alpha-value>)',
        'background-muted': 'rgb(var(--color-background-muted) / <alpha-value>)',
        'background-inverse': 'rgb(var(--color-background-inverse) / <alpha-value>)',
        foreground: 'rgb(var(--color-foreground) / <alpha-value>)',
        'foreground-muted': 'rgb(var(--color-foreground-muted) / <alpha-value>)',
        'foreground-inverse': 'rgb(var(--color-foreground-inverse) / <alpha-value>)',
        border: 'rgb(var(--color-border) / <alpha-value>)',
        'border-strong': 'rgb(var(--color-border-strong) / <alpha-value>)',
        success: 'rgb(var(--color-success) / <alpha-value>)',
        warning: 'rgb(var(--color-warning) / <alpha-value>)',
        error: 'rgb(var(--color-error) / <alpha-value>)',
        info: 'rgb(var(--color-info) / <alpha-value>)',
        chart: {
          1: 'rgb(var(--color-chart-1) / <alpha-value>)',
          2: 'rgb(var(--color-chart-2) / <alpha-value>)',
          3: 'rgb(var(--color-chart-3) / <alpha-value>)',
          4: 'rgb(var(--color-chart-4) / <alpha-value>)',
          5: 'rgb(var(--color-chart-5) / <alpha-value>)',
          grid: 'rgb(var(--color-chart-grid) / <alpha-value>)',
        },
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },
      fontSize: {
        'display-1': ['4.5rem', { lineHeight: '1.1', letterSpacing: '-0.02em', fontWeight: '700' }],
        'display-2': ['3.5rem', { lineHeight: '1.15', letterSpacing: '-0.02em', fontWeight: '700' }],
        // ... h1 ~ h5, body 등
      },
      borderRadius: {
        sm: '4px',
        md: '6px',
        lg: '8px',
        xl: '12px',
        '2xl': '16px',
      },
      boxShadow: {
        sm: '0 1px 2px rgba(15, 23, 42, 0.05)',
        md: '0 4px 12px rgba(15, 23, 42, 0.08)',
        lg: '0 8px 24px rgba(15, 23, 42, 0.10)',
        xl: '0 16px 40px rgba(15, 23, 42, 0.12)',
      },
      transitionDuration: {
        fast: '150ms',
        base: '200ms',
        slow: '300ms',
      },
      zIndex: {
        base: '0',
        dropdown: '10',
        sticky: '20',
        overlay: '30',
        floating: '40',
        modal: '50',
        toast: '60',
        tooltip: '70',
      },
    },
  },
}

export default config
```

## CSS 변수 정의 (`app/globals.css`)

```css
@layer base {
  :root {
    /* Brand */
    --color-brand-primary: 11 27 43;
    --color-brand-primary-foreground: 255 255 255;
    --color-brand-accent: 30 99 255;
    --color-brand-accent-foreground: 255 255 255;
    --color-brand-accent-hover: 23 81 217;

    /* Neutral */
    --color-neutral-50: 248 250 252;
    --color-neutral-100: 241 245 249;
    --color-neutral-200: 226 232 240;
    --color-neutral-300: 203 213 225;
    --color-neutral-400: 148 163 184;
    --color-neutral-500: 100 116 139;
    --color-neutral-600: 71 85 105;
    --color-neutral-700: 51 65 85;
    --color-neutral-800: 30 41 59;
    --color-neutral-900: 15 23 42;

    /* Semantic */
    --color-background: 255 255 255;
    --color-background-muted: 248 250 252;
    --color-background-inverse: 11 27 43;
    --color-foreground: 15 23 42;
    --color-foreground-muted: 100 116 139;
    --color-foreground-inverse: 255 255 255;
    --color-border: 226 232 240;
    --color-border-strong: 203 213 225;
    --color-ring: 30 99 255;

    /* Feedback */
    --color-success: 22 163 74;
    --color-warning: 234 179 8;
    --color-error: 220 38 38;
    --color-info: 30 99 255;

    /* Chart */
    --color-chart-1: 30 99 255;
    --color-chart-2: 83 136 255;
    --color-chart-3: 136 173 255;
    --color-chart-4: 189 210 255;
    --color-chart-5: 11 27 43;
    --color-chart-grid: 226 232 240;
  }

  body {
    @apply bg-background text-foreground font-sans antialiased;
  }
}
```

---

# 15. Figma 설정 가이드

디자이너가 Figma에서 작업할 때 다음을 그대로 적용합니다.

## 15-1. Color Styles

Figma의 Color Styles로 위 토큰을 모두 등록합니다.
- 폴더 구조: `Brand/`, `Neutral/`, `Semantic/`, `Feedback/`, `Chart/`
- 이름은 코드의 토큰명과 동일하게 (`brand/primary`, `neutral/700` 등)

## 15-2. Text Styles

타이포 스케일 14종을 모두 Text Styles로 등록.
- `display/display-1`, `display/display-2`
- `heading/h1` ~ `heading/h5`
- `body/body-lg`, `body/body`, `body/body-sm`, `body/caption`
- `label/eyebrow`, `label/label`, `label/button`

## 15-3. Effect Styles

Shadow 5종을 Effect Styles로 등록.
- `shadow/sm`, `shadow/md`, `shadow/lg`, `shadow/xl`

## 15-4. Grid System

Figma 페이지에 다음 Layout Grid 적용:
- Desktop (1440px): 12 columns, gutter 24px, margin 32px
- Tablet (768px): 8 columns, gutter 20px, margin 24px
- Mobile (375px): 4 columns, gutter 16px, margin 16px

## 15-5. Components 라이브러리

다음 컴포넌트를 우선 제작:
1. Button (Primary / Secondary / Ghost / Inverse × sm/md/lg)
2. Input, Textarea, Checkbox
3. Card (기본 + hover)
4. Navigation Bar (데스크탑 + 모바일)
5. Footer
6. Section Wrapper (eyebrow + headline + description)
7. Stat Counter (Hero 지표용)
8. Logo Grid
9. Chart (도넛 + 바)

---

# 16. 사용 예시 — Section 1개 완성형

다음은 Home 페이지 "Why Channel5" 섹션의 완성형 마크업 예시입니다.

```tsx
<section className="py-16 md:py-20 lg:py-24 bg-background-muted">
  <div className="max-w-7xl mx-auto px-6 lg:px-8">
    {/* Eyebrow + Headline */}
    <div className="max-w-3xl">
      <p className="text-[13px] font-medium tracking-[0.08em] uppercase text-brand-accent">
        Why Channel5 Korea
      </p>
      <h2 className="mt-3 text-3xl md:text-4xl lg:text-[2.25rem] font-semibold text-foreground tracking-tight">
        기술 메시지가 정확한 독자에게 도달하도록
      </h2>
    </div>

    {/* Cards */}
    <div className="mt-12 lg:mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {cards.map((card) => (
        <article
          key={card.key}
          className="bg-background border border-border rounded-lg p-6 lg:p-8 transition-all duration-200 hover:border-border-strong hover:shadow-md"
        >
          <h3 className="text-lg font-semibold text-foreground">
            {card.title}
          </h3>
          <p className="mt-3 text-sm text-foreground-muted leading-relaxed">
            {card.description}
          </p>
        </article>
      ))}
    </div>
  </div>
</section>
```

---

# 17. 변경 관리

이 문서가 수정될 때마다:
1. **버전 번호를 올립니다.**
2. 변경 내역을 하단에 기록합니다.
3. `tailwind.config.ts`와 `globals.css`를 동기화합니다.
4. Figma의 토큰을 함께 갱신합니다.

## 변경 이력

| 버전 | 일자 | 변경 내역 |
|---|---|---|
| 1.0 | 2026-05-12 | 초기 작성 |

---

**문서 버전:** 1.0
**최종 업데이트:** 2026-05-12
**관리자:** (담당자 입력)
