# CONTENT.md

이 문서는 **채널5코리아 코퍼레이트 사이트의 모든 카피를 담는 단일 출처(Single Source of Truth)**입니다.

## 사용 규칙

1. **모든 카피는 이 문서에서만 가져옵니다.** Claude Code는 임의로 카피를 생성하지 않습니다.
2. **한글/영문은 같은 항목에 같이 정의됩니다.** 한쪽만 추가하지 않습니다.
3. **카피 변경 시 코드가 아닌 이 문서를 먼저 수정합니다.**
4. 이 문서의 키 구조는 그대로 `messages/ko.json`과 `messages/en.json`으로 변환됩니다.
5. 영문은 한국어 직역이 아닌 **글로벌 B2B 비즈니스 영어 톤**으로 재작성되어 있습니다.

---

# 0. 공통 영역

## 0-1. 사이트 메타데이터

### `site.name`
- **KO:** 채널5코리아
- **EN:** Channel5 Korea

### `site.legalName`
- **KO:** 주식회사 채널5코리아
- **EN:** Channel5 Korea Inc.

### `site.tagline`
- **KO:** 기술 기업과 엔지니어를 연결하는 전기전자 전문 미디어 플랫폼
- **EN:** Technology Media Platform for Engineers and Global Tech Companies

### `site.taglineSecondary`
- **KO:** 반도체·임베디드·AI·SDV 산업을 위한 B2B 기술 커뮤니케이션 파트너
- **EN:** B2B technology communication partner for the semiconductor, embedded, AI, and SDV industries

### `site.metaTitle.default`
- **KO:** 채널5코리아 | 기술 기업과 엔지니어를 연결하는 전기전자 전문 미디어 플랫폼
- **EN:** Channel5 Korea | Technology Media Platform for Engineers and Global Tech Companies

### `site.metaDescription.default`
- **KO:** 채널5코리아는 e4ds.com을 기반으로 뉴스, 웨비나, 컨퍼런스, 뉴스레터, 기술 콘테스트, 교육 사업을 운영하는 B2B 기술 미디어 플랫폼 기업입니다. 반도체·임베디드·AI·SDV 산업의 기술 커뮤니케이션을 지원합니다.
- **EN:** Channel5 Korea operates e4ds.com and runs an integrated technology media platform spanning news, webinars, conferences, newsletters, developer contests, and engineering education programs for the semiconductor, embedded, AI, and SDV industries.

## 0-2. 글로벌 내비게이션 (GNB)

### `nav.home`
- **KO:** 홈
- **EN:** Home

### `nav.about`
- **KO:** 회사 소개
- **EN:** About

### `nav.mediaPlatform`
- **KO:** 미디어 플랫폼
- **EN:** Media Platform

### `nav.services`
- **KO:** 서비스
- **EN:** Services

### `nav.programs`
- **KO:** 프로그램
- **EN:** Programs

### `nav.partners`
- **KO:** 파트너
- **EN:** Partners

### `nav.contact`
- **KO:** 문의
- **EN:** Contact

### `nav.cta.primary`
- **KO:** 제안 문의
- **EN:** Request a Proposal

### `nav.languageToggle`
- **KO:** EN
- **EN:** KO

## 0-3. 플로팅 CTA (전 페이지 상시)

### `floatingCTA.label`
- **KO:** 제안 문의하기
- **EN:** Request a Proposal

### `floatingCTA.secondaryLabel`
- **KO:** 미디어킷 요청
- **EN:** Request Media Kit

## 0-4. 풋터

### `footer.aboutHeading`
- **KO:** 채널5코리아
- **EN:** Channel5 Korea

### `footer.aboutDescription`
- **KO:** e4ds.com을 기반으로 전기전자·반도체·임베디드·AI·SDV 산업의 기술 커뮤니케이션을 운영하는 B2B 기술 미디어 플랫폼 기업입니다.
- **EN:** A B2B technology media platform company operating e4ds.com, supporting technology communication across the electronics, semiconductor, embedded, AI, and SDV industries.

### `footer.servicesHeading`
- **KO:** 서비스
- **EN:** Services

### `footer.servicesLinks`
| KEY | KO | EN |
|---|---|---|
| `footer.services.banner` | 배너 광고 | Banner Advertising |
| `footer.services.newsletter` | 뉴스레터 | Newsletter Marketing |
| `footer.services.webinar` | 웨비나 | Webinar |
| `footer.services.conference` | 컨퍼런스 | Conference |
| `footer.services.contest` | 기술 콘테스트 | Developer Contest |
| `footer.services.education` | 교육 지원 사업 | Education Program |

### `footer.companyHeading`
- **KO:** 회사
- **EN:** Company

### `footer.companyLinks`
| KEY | KO | EN |
|---|---|---|
| `footer.company.about` | 회사 소개 | About |
| `footer.company.mediaPlatform` | 미디어 플랫폼 | Media Platform |
| `footer.company.programs` | 프로그램 | Programs |
| `footer.company.partners` | 파트너 | Partners |
| `footer.company.careers` | 채용 | Careers |
| `footer.company.contact` | 문의 | Contact |

### `footer.platformsHeading`
- **KO:** 운영 플랫폼
- **EN:** Platforms

### `footer.platformsLinks`
| KEY | KO | EN | URL |
|---|---|---|---|
| `footer.platforms.e4ds` | e4ds.com | e4ds.com | https://www.e4ds.com |
| `footer.platforms.webinar` | e4ds Webinar | e4ds Webinar | https://webinar.e4ds.com |
| `footer.platforms.make` | Make.e4ds | Make.e4ds | https://make.e4ds.com |
| `footer.platforms.kmap` | KMAP | KMAP | (URL 확정 필요) |

### `footer.contactInfo`
- **KO:** 사업 제안 및 협업 문의
- **EN:** Business Inquiries

### `footer.email`
- **공통:** (회사 이메일 입력 필요)

### `footer.phone`
- **공통:** (대표 전화 입력 필요)

### `footer.address`
- **KO:** (도로명 주소 입력 필요)
- **EN:** (영문 주소 입력 필요)

### `footer.copyright`
- **KO:** © 2026 주식회사 채널5코리아. All rights reserved.
- **EN:** © 2026 Channel5 Korea Inc. All rights reserved.

### `footer.legalLinks`
| KEY | KO | EN |
|---|---|---|
| `footer.legal.privacy` | 개인정보처리방침 | Privacy Policy |
| `footer.legal.terms` | 이용약관 | Terms of Use |

## 0-5. 쿠키 동의 배너

### `cookieBanner.message`
- **KO:** 채널5코리아는 사이트 사용 통계 분석을 위해 쿠키를 사용합니다. 계속 이용하시면 쿠키 사용에 동의하는 것으로 간주됩니다.
- **EN:** Channel5 Korea uses cookies to analyze site usage. By continuing to use this site, you agree to our use of cookies.

### `cookieBanner.acceptLabel`
- **KO:** 동의
- **EN:** Accept

### `cookieBanner.rejectLabel`
- **KO:** 거부
- **EN:** Decline

### `cookieBanner.policyLink`
- **KO:** 자세히 보기
- **EN:** Learn More

---

# 1. Home (`/`)

## 1-1. 페이지 메타데이터

### `home.meta.title`
- **KO:** 채널5코리아 | 기술 기업과 엔지니어를 연결하는 전기전자 전문 미디어 플랫폼
- **EN:** Channel5 Korea | Technology Media Platform for Engineers and Global Tech Companies

### `home.meta.description`
- **KO:** e4ds.com을 기반으로 뉴스, 웨비나, 컨퍼런스, 뉴스레터, 콘테스트, 교육 사업을 운영하며 반도체·임베디드·AI·SDV 산업의 기술 커뮤니케이션을 지원합니다.
- **EN:** Channel5 Korea operates e4ds.com and runs an integrated platform of news, webinars, conferences, newsletters, contests, and education programs for the semiconductor, embedded, AI, and SDV industries.

## 1-2. Section 1 — Hero

### `home.hero.headline`
- **KO:** 기술 기업과 엔지니어를 연결하는 전기전자 전문 미디어 플랫폼
- **EN:** Connecting Technology Companies with Engineers

### `home.hero.subheadline`
- **KO:** 채널5코리아는 e4ds.com을 기반으로 뉴스, 웨비나, 컨퍼런스, 뉴스레터, 기술 콘테스트, 교육 사업을 운영하며 반도체·임베디드·AI·SDV 산업의 기술 커뮤니케이션을 지원합니다.
- **EN:** Channel5 Korea operates e4ds.com and runs an integrated technology media platform spanning news, webinars, conferences, newsletters, developer contests, and engineering education programs for the semiconductor, embedded, AI, and SDV industries.

### `home.hero.ctaPrimary`
- **KO:** 서비스 보기
- **EN:** Explore Services

### `home.hero.ctaSecondary`
- **KO:** 제안 문의하기
- **EN:** Request a Proposal

### `home.hero.stats`
공통 지표 3개. 운영자가 분기별로 갱신합니다. **수치는 운영팀이 확정해서 채워야 합니다.**

| KEY | KO 라벨 | EN 라벨 | 값(추후 입력) |
|---|---|---|---|
| `home.hero.stats.experience` | 미디어 운영 경력 | Years of Media Operation | 16+ |
| `home.hero.stats.readers` | 누적 기술 독자 | Technology Readers | (입력 필요) |
| `home.hero.stats.programs` | 운영 프로그램 | Programs Operated | (입력 필요) |

## 1-3. Section 2 — What We Do

### `home.whatWeDo.eyebrow`
- **KO:** 사업 영역
- **EN:** What We Do

### `home.whatWeDo.headline`
- **KO:** 하나의 미디어 자산, 여섯 가지 커뮤니케이션 방식
- **EN:** One media platform, six ways to reach engineers.

### `home.whatWeDo.description`
- **KO:** 채널5코리아의 서비스는 모두 동일한 독자 자산 위에서 운영됩니다. 기업의 기술 메시지를 어떤 형태로 전달할 것인지에 대한 선택지입니다.
- **EN:** All services are built on the same audience base. They are different ways to deliver your technology message — not separate products.

### `home.whatWeDo.cards`

**카드 1 — Technical Media**
- KEY: `home.whatWeDo.cards.media`
- 제목 (KO): 기술 미디어
- 제목 (EN): Technical Media
- 설명 (KO): e4ds.com을 기반으로 한 산업 뉴스, 인터뷰, 기술 분석 콘텐츠.
- 설명 (EN): Industry news, interviews, and technical analysis through e4ds.com.

**카드 2 — Webinar Platform**
- KEY: `home.whatWeDo.cards.webinar`
- 제목 (KO): 웨비나 플랫폼
- 제목 (EN): Webinar Platform
- 설명 (KO): 엔지니어 대상 온라인 기술 세미나 기획·모집·운영.
- 설명 (EN): Planning, registration, and operation of online technical seminars for engineers.

**카드 3 — Newsletter Marketing**
- KEY: `home.whatWeDo.cards.newsletter`
- 제목 (KO): 뉴스레터 마케팅
- 제목 (EN): Newsletter Marketing
- 설명 (KO): 구독 동의 기반 기술 독자에게 직접 도달하는 메일링.
- 설명 (EN): Opt-in newsletter delivery to a verified engineering audience.

**카드 4 — Technology Conference**
- KEY: `home.whatWeDo.cards.conference`
- 제목 (KO): 기술 컨퍼런스
- 제목 (EN): Technology Conference
- 설명 (KO): Physical AI, Tech Day, Analog Day 등 대형 기술 행사 기획·운영.
- 설명 (EN): Planning and operating large-scale events including Physical AI Conference, Tech Day, and Analog Day.

**카드 5 — Developer Contest**
- KEY: `home.whatWeDo.cards.contest`
- 제목 (KO): 개발자 콘테스트
- 제목 (EN): Developer Contest
- 설명 (KO): 엔지니어 참여형 챌린지 및 프로젝트 캠페인.
- 설명 (EN): Engineer-driven challenges and project-based campaigns.

**카드 6 — Education Program**
- KEY: `home.whatWeDo.cards.education`
- 제목 (KO): 교육 지원 사업
- 제목 (EN): Education Program
- 설명 (KO): 기업의 기술 교육·ESG 활동과 연계한 오프라인 교육.
- 설명 (EN): Offline technical education aligned with corporate training and ESG initiatives.

## 1-4. Section 3 — Media Platform Snapshot

### `home.mediaSnapshot.eyebrow`
- **KO:** 미디어 플랫폼
- **EN:** Media Platform

### `home.mediaSnapshot.headline`
- **KO:** e4ds.com은 한국 엔지니어 시장과 만나는 전문 접점입니다
- **EN:** e4ds.com is where global tech companies meet Korea's engineering audience.

### `home.mediaSnapshot.description`
- **KO:** 16년 이상 축적된 기술 콘텐츠와 엔지니어 독자 기반 위에서 뉴스·뉴스레터·웨비나·컨퍼런스가 하나의 독자 동선으로 연결되어 있습니다.
- **EN:** Built on more than 16 years of accumulated technical content, e4ds.com connects news, newsletter, webinars, and conferences into a single audience journey.

### `home.mediaSnapshot.audienceLabel`
- **KO:** 독자 직군 구성
- **EN:** Audience by Role

### `home.mediaSnapshot.industryLabel`
- **KO:** 독자 산업 분포
- **EN:** Audience by Industry

### `home.mediaSnapshot.cta`
- **KO:** 미디어 플랫폼 자세히 보기
- **EN:** Explore the Media Platform

## 1-5. Section 4 — Why Channel5

### `home.why.eyebrow`
- **KO:** 채널5코리아를 선택하는 이유
- **EN:** Why Channel5 Korea

### `home.why.headline`
- **KO:** 기술 메시지가 정확한 독자에게 도달하도록
- **EN:** Your technology message, delivered to the right audience.

### `home.why.cards`

**카드 1**
- KEY: `home.why.cards.audience`
- 제목 (KO): 전문 기술 독자
- 제목 (EN): Specialized Engineering Audience
- 설명 (KO): 전기전자·반도체·임베디드·자동차 전장 분야의 R&D 엔지니어와 기술 의사결정자 중심 독자.
- 설명 (EN): A reader base centered on R&D engineers and technical decision-makers across electronics, semiconductor, embedded, and automotive electronics.

**카드 2**
- KEY: `home.why.cards.content`
- 제목 (KO): 콘텐츠 기획력
- 제목 (EN): Editorial Capability
- 설명 (KO): 산업 트렌드를 해석해 기술 콘텐츠, 캠페인, 컨퍼런스 아젠다로 전환하는 기획 역량.
- 설명 (EN): The ability to interpret industry trends and translate them into editorial coverage, campaigns, and conference agendas.

**카드 3**
- KEY: `home.why.cards.execution`
- 제목 (KO): 실행 경험
- 제목 (EN): Operational Experience
- 설명 (KO): 웨비나, 컨퍼런스, 뉴스레터, 콘테스트, 교육 프로그램 운영을 통해 축적된 실행 역량.
- 설명 (EN): Hands-on experience operating webinars, conferences, newsletters, contests, and education programs.

**카드 4**
- KEY: `home.why.cards.partners`
- 제목 (KO): 파트너 네트워크
- 제목 (EN): Partner Network
- 설명 (KO): 글로벌 반도체·전자·임베디드 기업과의 장기 협업 기반.
- 설명 (EN): Long-term partnerships with global semiconductor, electronics, and embedded companies.

## 1-6. Section 5 — Featured Programs

### `home.programs.eyebrow`
- **KO:** 대표 프로그램
- **EN:** Featured Programs

### `home.programs.headline`
- **KO:** 산업 아젠다를 만드는 컨퍼런스와 프로그램
- **EN:** Conferences and programs that shape the industry agenda.

### `home.programs.description`
- **KO:** 매년 주요 기술 이슈를 중심으로 컨퍼런스, 콘테스트, 교육 프로그램을 기획합니다.
- **EN:** Each year, we plan conferences, contests, and education programs around the most relevant technology issues.

### `home.programs.cta`
- **KO:** 모든 프로그램 보기
- **EN:** View All Programs

### `home.programs.items`

| KEY | KO | EN |
|---|---|---|
| `home.programs.items.physicalAI` | Physical AI Conference | Physical AI Conference |
| `home.programs.items.techDay` | e4ds Tech Day | e4ds Tech Day |
| `home.programs.items.analogDay` | Analog Day | Analog Day |
| `home.programs.items.challenge` | Developer Challenge | Developer Challenge |

## 1-7. Section 6 — Partners

### `home.partners.eyebrow`
- **KO:** 파트너
- **EN:** Partners

### `home.partners.headline`
- **KO:** 글로벌 기술 기업들이 한국 엔지니어 시장에서 채널5코리아와 함께합니다
- **EN:** Global technology companies partner with Channel5 Korea to reach Korea's engineering market.

### `home.partners.cta`
- **KO:** 파트너 전체 보기
- **EN:** View All Partners

## 1-8. Section 7 — Contact CTA

### `home.contactCTA.headline`
- **KO:** 기술 캠페인, 웨비나, 컨퍼런스를 검토하고 계신가요?
- **EN:** Planning a technology campaign, webinar, or conference?

### `home.contactCTA.description`
- **KO:** 채널5코리아가 엔지니어에게 도달하는 적합한 방식을 제안드립니다. 관심 서비스를 선택하시면 담당자가 검토 후 회신드립니다.
- **EN:** We'll propose the most suitable way to reach engineers. Select your area of interest and our team will respond within 1–3 business days.

### `home.contactCTA.ctaPrimary`
- **KO:** 제안 문의하기
- **EN:** Request a Proposal

### `home.contactCTA.ctaSecondary`
- **KO:** 미디어킷 요청하기
- **EN:** Request Media Kit

---

# 2. About (`/about`)

## 2-1. 페이지 메타데이터

### `about.meta.title`
- **KO:** 회사 소개 | 채널5코리아
- **EN:** About | Channel5 Korea

### `about.meta.description`
- **KO:** 채널5코리아는 e4ds.com을 기반으로 16년 이상 전기전자·반도체·임베디드 산업의 기술 흐름을 해석해온 B2B 기술 미디어 플랫폼 기업입니다.
- **EN:** Channel5 Korea is a B2B technology media platform company with over 16 years of experience interpreting the electronics, semiconductor, and embedded industries through e4ds.com.

## 2-2. Section 1 — Identity

### `about.identity.eyebrow`
- **KO:** 회사 소개
- **EN:** About Channel5 Korea

### `about.identity.headline`
- **KO:** 기술 흐름을 해석하고, 기업과 엔지니어를 연결합니다
- **EN:** We interpret technology and connect companies with engineers.

### `about.identity.body`
- **KO:** 채널5코리아는 e4ds.com을 기반으로 전기전자·반도체·임베디드 산업의 기술 흐름을 해석하고, 이를 뉴스·웨비나·컨퍼런스·뉴스레터·콘테스트·교육 사업으로 연결하는 B2B 기술 미디어 플랫폼 기업입니다. 단기 광고 대행이 아닌, 기술 콘텐츠와 산업 커뮤니케이션을 함께 설계합니다.
- **EN:** Channel5 Korea is a B2B technology media platform company. Built around e4ds.com, we interpret the technology landscape of the electronics, semiconductor, and embedded industries, and translate it into news, webinars, conferences, newsletters, developer contests, and education programs. We design technology communication, not short-term advertising.

## 2-3. Section 2 — Vision

### `about.vision.eyebrow`
- **KO:** 비전
- **EN:** Vision

### `about.vision.headline`
- **KO:** 기술 메시지가 정확한 독자에게 도달하는 산업 커뮤니케이션 환경
- **EN:** An industry where technology messages reach the right audience.

### `about.vision.body`
- **KO:** 기업의 기술이 시장에 잘못 해석되거나 도달하지 못하면, 산업 전체의 발전 속도가 느려집니다. 채널5코리아는 기업의 기술 메시지가 엔지니어 독자에게 정확하게 도달하는 커뮤니케이션 환경을 만들기 위해 미디어, 콘텐츠, 행사, 교육을 통합 운영합니다.
- **EN:** When technology is misinterpreted or fails to reach its audience, the entire industry slows down. Channel5 Korea integrates media, content, events, and education to ensure that corporate technology messages reach engineers accurately and meaningfully.

## 2-4. Section 3 — Expertise

### `about.expertise.eyebrow`
- **KO:** 전문 분야
- **EN:** Areas of Expertise

### `about.expertise.headline`
- **KO:** 산업 전반의 기술 흐름을 다룹니다
- **EN:** We cover the technology landscape across the industry.

### `about.expertise.items`

| KEY | KO | EN |
|---|---|---|
| `about.expertise.items.semiconductor` | 반도체 설계 및 솔루션 | Semiconductor Design & Solutions |
| `about.expertise.items.embedded` | 임베디드 시스템 | Embedded Systems |
| `about.expertise.items.automotive` | 자동차 전장 / SDV | Automotive Electronics / SDV |
| `about.expertise.items.ai` | 산업용 AI | Industrial AI |
| `about.expertise.items.power` | 전력·아날로그 | Power & Analog |
| `about.expertise.items.automation` | 산업 자동화 | Industrial Automation |

## 2-5. Section 4 — History (Timeline)

### `about.history.eyebrow`
- **KO:** 연혁
- **EN:** History

### `about.history.headline`
- **KO:** 16년 이상의 운영 경험
- **EN:** More than 16 years of operation.

### `about.history.items`
**연혁은 운영팀이 확정해 입력합니다. 아래는 구조 예시입니다.**

| KEY | 연도 | KO 제목 | EN 제목 |
|---|---|---|---|
| `about.history.items.founding` | (연도 입력) | e4ds.com 창간 | Launch of e4ds.com |
| `about.history.items.webinar` | (연도 입력) | 웨비나 사업 시작 | Launch of Webinar Business |
| `about.history.items.techday` | (연도 입력) | e4ds Tech Day 출범 | First e4ds Tech Day |
| `about.history.items.analogDay` | (연도 입력) | Analog Day 출범 | First Analog Day |
| `about.history.items.physicalAI` | (연도 입력) | Physical AI Conference 출범 | First Physical AI Conference |
| `about.history.items.challenge` | (연도 입력) | Developer Challenge 운영 시작 | Launch of Developer Challenge |
| `about.history.items.education` | (연도 입력) | 오프라인 교육 사업 확장 | Expansion into Offline Education |

## 2-6. Section 5 — CTA

### `about.cta.headline`
- **KO:** 어떤 사업을 운영하는지 자세히 확인해보세요
- **EN:** Explore what we operate.

### `about.cta.ctaPrimary`
- **KO:** 서비스 보기
- **EN:** View Services

### `about.cta.ctaSecondary`
- **KO:** 협업 문의하기
- **EN:** Get in Touch

---

# 3. Media Platform (`/media-platform`)

## 3-1. 페이지 메타데이터

### `mediaPlatform.meta.title`
- **KO:** 미디어 플랫폼 | 채널5코리아
- **EN:** Media Platform | Channel5 Korea

### `mediaPlatform.meta.description`
- **KO:** e4ds.com은 전기전자·반도체·임베디드·AI·SDV 분야 엔지니어를 위한 전문 기술 미디어이자, 기업이 한국 엔지니어 시장과 만나는 접점입니다.
- **EN:** e4ds.com is a technology media platform for engineers in the electronics, semiconductor, embedded, AI, and SDV industries — and a gateway for companies to reach Korea's engineering audience.

## 3-2. Section 1 — Intro

### `mediaPlatform.intro.eyebrow`
- **KO:** e4ds.com
- **EN:** e4ds.com

### `mediaPlatform.intro.headline`
- **KO:** 단순한 뉴스 사이트가 아닙니다
- **EN:** More than a news site.

### `mediaPlatform.intro.body`
- **KO:** e4ds.com은 전기전자·반도체·임베디드·AI·SDV 분야 엔지니어를 위한 전문 기술 미디어입니다. 산업 흐름을 해석하고, 기업의 기술 메시지가 정확한 독자에게 도달하도록 설계된 콘텐츠 플랫폼입니다.
- **EN:** e4ds.com is a dedicated technology media platform for engineers in the electronics, semiconductor, embedded, AI, and SDV industries. It is built to interpret industry shifts and ensure that corporate technology messages reach the right readers.

### `mediaPlatform.intro.cta`
- **KO:** e4ds.com 바로가기
- **EN:** Visit e4ds.com

## 3-3. Section 2 — Audience Structure

### `mediaPlatform.audience.eyebrow`
- **KO:** 독자 구조
- **EN:** Audience

### `mediaPlatform.audience.headline`
- **KO:** R&D 엔지니어와 기술 의사결정자 중심의 독자
- **EN:** A reader base built on R&D engineers and technical decision-makers.

### `mediaPlatform.audience.body`
- **KO:** 독자의 다수는 반도체, 임베디드, 자동차 전장, 산업 자동화 분야의 R&D 엔지니어와 기술 의사결정자입니다. 단순 트래픽이 아닌 직군의 정확도가 미디어의 가치입니다.
- **EN:** The majority of our readers are R&D engineers and technical decision-makers across semiconductor, embedded, automotive electronics, and industrial automation. Audience precision — not raw traffic — is the value of this platform.

### `mediaPlatform.audience.roleChartLabel`
- **KO:** 독자 직군 분포
- **EN:** Audience by Role

### `mediaPlatform.audience.industryChartLabel`
- **KO:** 독자 산업 분포
- **EN:** Audience by Industry

### `mediaPlatform.audience.disclaimer`
- **KO:** 위 수치는 사이트 통계 및 회원 데이터를 기반으로 정리한 자료이며, 분기별로 갱신됩니다.
- **EN:** Figures above are derived from site analytics and member data, updated quarterly.

## 3-4. Section 3 — Content Assets

### `mediaPlatform.content.eyebrow`
- **KO:** 콘텐츠 자산
- **EN:** Content Assets

### `mediaPlatform.content.headline`
- **KO:** 16년 이상 축적된 기술 콘텐츠
- **EN:** Over 16 years of technical content.

### `mediaPlatform.content.items`

| KEY | KO 제목 | EN 제목 | KO 설명 | EN 설명 |
|---|---|---|---|---|
| `mediaPlatform.content.items.news` | 산업 뉴스 | Industry News | 매일 업데이트되는 전기전자·반도체 산업 뉴스 | Daily updates on electronics and semiconductor industry news |
| `mediaPlatform.content.items.interview` | 인터뷰·연재 | Interviews & Series | 기술 리더와의 인터뷰, 산업 연재 기획 | Interviews with technology leaders and editorial series |
| `mediaPlatform.content.items.analysis` | 기술 분석 | Technical Analysis | 신기술과 산업 변화에 대한 분석 콘텐츠 | In-depth analysis of new technologies and industry trends |
| `mediaPlatform.content.items.webinarArchive` | 웨비나 아카이브 | Webinar Archive | 진행된 웨비나의 다시 보기 및 자료 | On-demand webinars and supporting materials |

## 3-5. Section 4 — Audience Journey

### `mediaPlatform.journey.eyebrow`
- **KO:** 독자 접점
- **EN:** Audience Journey

### `mediaPlatform.journey.headline`
- **KO:** 단일 독자 동선으로 연결된 접점
- **EN:** A unified audience journey.

### `mediaPlatform.journey.body`
- **KO:** 뉴스에서 시작된 관심이 뉴스레터·웨비나·컨퍼런스로 이어지는 단일 독자 동선을 통해, 기업의 기술 메시지가 단발성이 아닌 지속적 접점으로 전달됩니다.
- **EN:** Reader interest that begins with news flows through newsletters, webinars, and conferences. This unified journey turns one-time exposure into sustained engagement.

### `mediaPlatform.journey.steps`

| KEY | KO | EN |
|---|---|---|
| `mediaPlatform.journey.steps.site` | 사이트 | Site |
| `mediaPlatform.journey.steps.newsletter` | 뉴스레터 | Newsletter |
| `mediaPlatform.journey.steps.webinar` | 웨비나 | Webinar |
| `mediaPlatform.journey.steps.conference` | 컨퍼런스 | Conference |
| `mediaPlatform.journey.steps.make` | Make 플랫폼 | Make Platform |

## 3-6. Section 5 — CTA

### `mediaPlatform.cta.headline`
- **KO:** 미디어 자산을 어떻게 활용할 수 있는지 확인해보세요
- **EN:** See how to put this media platform to work.

### `mediaPlatform.cta.ctaPrimary`
- **KO:** 서비스 보기
- **EN:** View Services

### `mediaPlatform.cta.ctaSecondary`
- **KO:** 미디어킷 요청하기
- **EN:** Request Media Kit

---

# 4. Services (`/services`)

## 4-1. 페이지 메타데이터

### `services.meta.title`
- **KO:** 서비스 | 채널5코리아
- **EN:** Services | Channel5 Korea

### `services.meta.description`
- **KO:** 배너 광고, 뉴스레터, 웨비나, 컨퍼런스, 기술 콘테스트, 교육 지원 사업을 운영합니다. 기업의 목적에 맞는 미디어 활용 방식을 제안합니다.
- **EN:** Banner advertising, newsletter marketing, webinars, conferences, developer contests, and education programs — all built on the same engineering audience.

## 4-2. Section 1 — Intro

### `services.intro.eyebrow`
- **KO:** 서비스
- **EN:** Services

### `services.intro.headline`
- **KO:** 하나의 독자 자산, 여섯 가지 활용 방식
- **EN:** One audience, six ways to engage.

### `services.intro.body`
- **KO:** 채널5코리아의 서비스는 모두 동일한 독자 자산 위에서 운영됩니다. 배너, 뉴스레터, 웨비나, 컨퍼런스, 콘테스트, 교육 지원 사업은 기업의 기술 메시지를 어떤 형태로 전달할 것인지에 대한 선택지입니다.
- **EN:** All services run on the same engineering audience. Banner, newsletter, webinar, conference, contest, and education programs are different formats for delivering your technology message — not separate audiences.

## 4-3. Section 2 — Service Details (6개)

### Service 1 — Banner Advertising

- **KEY:** `services.banner`
- **제목 (KO):** 배너 광고
- **제목 (EN):** Banner Advertising
- **한 줄 설명 (KO):** e4ds.com 기술 독자를 대상으로 한 브랜드 및 캠페인 노출
- **한 줄 설명 (EN):** Brand and campaign exposure across e4ds.com's engineering audience
- **본문 (KO):** 기술 독자가 콘텐츠를 소비하는 흐름 안에서 브랜드와 캠페인을 노출하여, 단순 도달이 아닌 맥락 있는 접점을 만듭니다. 메인, 카테고리, 콘텐츠 상세 등 다양한 위치에서 운영 가능합니다.
- **본문 (EN):** Place your brand and campaigns within the engineer's reading flow. Available across the homepage, category pages, and article detail pages — designed to create contextual exposure, not just impressions.
- **효과 (KO):** 기술 독자 대상 정밀 도달, 캠페인 기간 동안 지속적 노출
- **효과 (EN):** Precise reach to a technical audience, sustained exposure across the campaign period

### Service 2 — Newsletter Marketing

- **KEY:** `services.newsletter`
- **제목 (KO):** 뉴스레터 마케팅
- **제목 (EN):** Newsletter Marketing
- **한 줄 설명 (KO):** 구독 동의 기반 기술 독자에게 직접 도달하는 메일링
- **한 줄 설명 (EN):** Opt-in newsletter delivery to a verified engineering audience
- **본문 (KO):** 구독 동의를 기반으로 한 독자에게 직접 도달하여, 기업의 기술 메시지가 받은편지함 수준의 접점으로 전달됩니다. 정기 뉴스레터, 단독 발송, 콘텐츠형 광고 등 다양한 포맷을 운영합니다.
- **본문 (EN):** Deliver your message directly to verified, opted-in readers. Available as integration into the regular newsletter, standalone dedicated send, or sponsored content format.
- **효과 (KO):** 광고 차단의 영향 없이 받은편지함 도달, 콘텐츠형 노출 가능
- **효과 (EN):** Direct inbox delivery unaffected by ad blockers, content-style placements available

### Service 3 — Webinar

- **KEY:** `services.webinar`
- **제목 (KO):** 웨비나
- **제목 (EN):** Webinar
- **한 줄 설명 (KO):** 엔지니어 대상 온라인 기술 세미나 기획·모집·운영
- **한 줄 설명 (EN):** Planning, registration, and operation of online technical seminars for engineers
- **본문 (KO):** 참여 등록 단계에서 잠재 고객 정보를 확보하고, 발표·시연·Q&A를 통해 제품과 기술의 깊이를 전달합니다. 단발성 웨비나부터 시리즈형 캠페인까지 운영 가능합니다.
- **본문 (EN):** Capture qualified leads at the registration stage, and deliver technical depth through presentation, demo, and Q&A. Available as standalone sessions or as multi-part campaign series.
- **효과 (KO):** 잠재 고객 리드 확보, 기술 신뢰도 형성, 영업 연계 가능
- **효과 (EN):** Qualified lead generation, technical credibility, and direct sales follow-up

### Service 4 — Conference

- **KEY:** `services.conference`
- **제목 (KO):** 컨퍼런스
- **제목 (EN):** Conference
- **한 줄 설명 (KO):** Physical AI, Tech Day, Analog Day 등 대형 기술 행사
- **한 줄 설명 (EN):** Large-scale industry events including Physical AI, Tech Day, and Analog Day
- **본문 (KO):** 주요 산업 아젠다 안에서 발표·부스·세션을 통해 시장 내 포지셔닝을 강화합니다. 단일 기업 전용 행사 기획부터, 공동 주최, 스폰서십 참여까지 다양한 형태로 협업합니다.
- **본문 (EN):** Strengthen market positioning through keynotes, booths, and sessions within established industry agendas. Available as dedicated single-company events, co-hosted formats, or sponsorship participation.
- **효과 (KO):** 시장 내 포지셔닝, 대면 네트워킹, 산업 영향력 강화
- **효과 (EN):** Market positioning, face-to-face engagement, and industry visibility

### Service 5 — Developer Contest

- **KEY:** `services.contest`
- **제목 (KO):** 기술 콘테스트
- **제목 (EN):** Developer Contest
- **한 줄 설명 (KO):** 엔지니어 참여형 챌린지 및 프로젝트 캠페인
- **한 줄 설명 (EN):** Engineer-driven challenges and project-based campaigns
- **본문 (KO):** 엔지니어의 직접 참여를 통해 기업의 개발 도구, 플랫폼, 제품을 실제 사용 경험으로 확산시킵니다. 출제, 모집, 운영, 시상, 결과 콘텐츠 제작까지 통합 운영합니다.
- **본문 (EN):** Drive real adoption by inviting engineers to build with your tools, platforms, or products. End-to-end operation: challenge design, recruitment, judging, awards, and post-event content.
- **효과 (KO):** 실제 사용 경험 확산, 개발자 커뮤니티 형성, 사례 콘텐츠 확보
- **효과 (EN):** Real-world product adoption, developer community building, and case content

### Service 6 — Education Program

- **KEY:** `services.education`
- **제목 (KO):** 교육 지원 사업
- **제목 (EN):** Education Program
- **한 줄 설명 (KO):** 기업의 기술 교육·ESG 활동과 연계한 오프라인 교육
- **한 줄 설명 (EN):** Offline technical education aligned with corporate training and ESG initiatives
- **본문 (KO):** 오프라인 교육과 ESG 활동을 결합해 장기적 기술 생태계 기여 활동으로 연결합니다. 대학·연구기관·산업 협회와의 협업을 통해 교육 콘텐츠와 운영을 함께 설계합니다.
- **본문 (EN):** Combine offline education and ESG activity to contribute to the long-term technology ecosystem. Designed and operated in partnership with universities, research institutes, and industry associations.
- **효과 (KO):** 장기 ESG 활동, 산업 생태계 기여, 미래 엔지니어 풀과의 접점
- **효과 (EN):** Long-term ESG contribution, ecosystem engagement, and access to the future engineering talent pool

## 4-4. Section 3 — Integrated Campaign

### `services.integrated.eyebrow`
- **KO:** 통합 캠페인
- **EN:** Integrated Campaign

### `services.integrated.headline`
- **KO:** 여러 서비스를 결합하면 더 강한 도달이 만들어집니다
- **EN:** Combine services for stronger reach.

### `services.integrated.body`
- **KO:** 단일 서비스보다 여러 채널을 결합한 통합 캠페인이 도달 효율과 인지 효과를 함께 만듭니다. 신제품 출시 시점에는 뉴스레터·웨비나·배너를, 시장 포지셔닝 단계에서는 컨퍼런스와 콘테스트를 결합한 캠페인 설계가 가능합니다.
- **EN:** Combining channels delivers stronger reach and recognition than any single placement. Product launches typically combine newsletter, webinar, and banner; market positioning combines conference and contest. We design the right mix for your stage.

## 4-5. Section 4 — CTA

### `services.cta.headline`
- **KO:** 어떤 서비스가 적합한지 함께 검토하겠습니다
- **EN:** Let's find the right mix for your goals.

### `services.cta.ctaPrimary`
- **KO:** 서비스 제안 문의하기
- **EN:** Request a Proposal

### `services.cta.ctaSecondary`
- **KO:** 미디어킷 요청하기
- **EN:** Request Media Kit

---

# 5. Programs (`/programs`)

## 5-1. 페이지 메타데이터

### `programs.meta.title`
- **KO:** 프로그램 | 채널5코리아
- **EN:** Programs | Channel5 Korea

### `programs.meta.description`
- **KO:** Physical AI Conference, e4ds Tech Day, Analog Day, Developer Challenge, 교육 프로그램 등 산업 아젠다 중심의 행사와 프로그램을 운영합니다.
- **EN:** Physical AI Conference, e4ds Tech Day, Analog Day, Developer Challenge, and education programs — built around the most relevant industry agendas.

## 5-2. Section 1 — Intro

### `programs.intro.eyebrow`
- **KO:** 프로그램
- **EN:** Programs

### `programs.intro.headline`
- **KO:** 산업 아젠다를 함께 만드는 작업
- **EN:** Shaping the industry agenda.

### `programs.intro.body`
- **KO:** 채널5코리아는 산업의 기술 변화 흐름에 따라 매년 컨퍼런스와 프로그램의 주제를 새롭게 정의합니다. 단순 행사 운영이 아닌, 기업과 엔지니어가 기술 변화의 방향을 함께 검토하는 장을 만드는 작업으로 접근합니다.
- **EN:** Each year, we redefine the themes of our conferences and programs based on where the industry is moving. We don't just run events — we create the spaces where companies and engineers think through technology change together.

## 5-3. Section 2 — Featured Programs (5개)

### Program 1 — Physical AI Conference

- **KEY:** `programs.physicalAI`
- **제목 (KO):** Physical AI Conference
- **제목 (EN):** Physical AI Conference
- **태그라인 (KO):** AI와 물리 세계의 결합
- **태그라인 (EN):** Where AI meets the physical world
- **본문 (KO):** AI가 물리 세계와 결합되는 흐름을 중심으로, 반도체·로보틱스·SDV·산업 자동화 분야의 기술과 비즈니스를 함께 다룹니다. 키노트, 트랙 세션, 전시 부스로 구성됩니다.
- **본문 (EN):** Focused on how AI is being embedded into the physical world — across semiconductor, robotics, SDV, and industrial automation. Structured around keynotes, parallel tracks, and an exhibition area.

### Program 2 — e4ds Tech Day

- **KEY:** `programs.techDay`
- **제목 (KO):** e4ds Tech Day
- **제목 (EN):** e4ds Tech Day
- **태그라인 (KO):** 매년 새로운 기술 주제를 정의하는 컨퍼런스
- **태그라인 (EN):** A flagship conference that redefines its theme each year
- **본문 (KO):** 전기전자·반도체 산업의 핵심 기술을 매년 새로운 주제로 정의하고, 기업의 신기술과 솔루션을 엔지니어 청중과 연결합니다. 채널5코리아의 대표 컨퍼런스 중 하나입니다.
- **본문 (EN):** Each year, e4ds Tech Day defines a new theme at the center of the electronics and semiconductor industry, and connects corporate technology and solutions with an engineering audience. One of our flagship conferences.

### Program 3 — Analog Day

- **KEY:** `programs.analogDay`
- **제목 (KO):** Analog Day
- **제목 (EN):** Analog Day
- **태그라인 (KO):** 디지털 시대에도 중요한 아날로그·전력 기술
- **태그라인 (EN):** Analog and power technology in a digital era
- **본문 (KO):** 디지털 중심의 기술 흐름 안에서도 여전히 중요한 아날로그·전력 분야의 기술을 깊이 다루는 단일 트랙 컨퍼런스입니다. 전력 반도체, 신호 처리, 센서, 측정 기술이 중심 주제입니다.
- **본문 (EN):** A single-track conference dedicated to analog and power technologies — areas that remain critical even as the industry digitalizes. Power semiconductors, signal processing, sensors, and measurement are at the core.

### Program 4 — Developer Challenge

- **KEY:** `programs.challenge`
- **제목 (KO):** Developer Challenge
- **제목 (EN):** Developer Challenge
- **태그라인 (KO):** 엔지니어가 직접 만드는 기술 캠페인
- **태그라인 (EN):** Engineers building, not just attending
- **본문 (KO):** 엔지니어의 직접 참여를 통해 기업의 기술과 플랫폼을 실제 프로젝트 경험으로 확산시킵니다. Industrial Edge AI Solution Challenge 등 산업 주제별 챌린지를 운영합니다.
- **본문 (EN):** Drive real adoption through engineer-built projects. We operate challenges around specific industry themes, including the Industrial Edge AI Solution Challenge.

### Program 5 — Education Program

- **KEY:** `programs.education`
- **제목 (KO):** Education Program
- **제목 (EN):** Education Program
- **태그라인 (KO):** 오프라인 기술 교육과 ESG의 결합
- **태그라인 (EN):** Offline technical education with ESG impact
- **본문 (KO):** 기업과 교육기관, 협회와 함께 오프라인 기술 교육을 설계하고 운영합니다. 교육 콘텐츠 기획, 강사 매칭, 현장 운영, 결과 보고까지 통합 지원합니다.
- **본문 (EN):** We design and operate offline technical education programs in partnership with companies, educational institutions, and associations. End-to-end support: curriculum design, instructor matching, on-site operation, and reporting.

## 5-4. Section 3 — Sponsorship

### `programs.sponsorship.eyebrow`
- **KO:** 참여 방식
- **EN:** Ways to Participate

### `programs.sponsorship.headline`
- **KO:** 컨퍼런스와 프로그램에 다양한 형태로 참여하실 수 있습니다
- **EN:** Multiple ways to participate in our programs.

### `programs.sponsorship.items`

| KEY | KO 제목 | EN 제목 | KO 설명 | EN 설명 |
|---|---|---|---|---|
| `programs.sponsorship.items.keynote` | 키노트 발표 | Keynote Presentation | 산업 아젠다 안에서 기업의 비전과 기술 메시지 전달 | Share corporate vision and technology message within the industry agenda |
| `programs.sponsorship.items.session` | 트랙 세션 | Track Session | 특정 트랙에서 기술 발표 및 시연 진행 | Deliver technical presentations and demos within specific tracks |
| `programs.sponsorship.items.booth` | 부스 참여 | Exhibition Booth | 컨퍼런스 부스 운영을 통한 직접 데모와 미팅 | On-site booth for live demos and customer meetings |
| `programs.sponsorship.items.sponsor` | 스폰서십 | Sponsorship | 컨퍼런스·콘테스트 후원을 통한 브랜드 노출 | Brand exposure through conference and contest sponsorship |
| `programs.sponsorship.items.cohost` | 공동 주최 | Co-hosting | 채널5코리아와 함께 행사를 공동 기획·운영 | Co-plan and co-operate events with Channel5 Korea |

## 5-5. Section 4 — CTA

### `programs.cta.headline`
- **KO:** 다음 행사에 참여하고 싶으신가요?
- **EN:** Interested in our upcoming programs?

### `programs.cta.ctaPrimary`
- **KO:** 스폰서십 문의하기
- **EN:** Inquire About Sponsorship

### `programs.cta.ctaSecondary`
- **KO:** 지난 행사 보기 (e4ds.com)
- **EN:** View Past Events (e4ds.com)

---

# 6. Partners (`/partners`)

## 6-1. 페이지 메타데이터

### `partners.meta.title`
- **KO:** 파트너 | 채널5코리아
- **EN:** Partners | Channel5 Korea

### `partners.meta.description`
- **KO:** 글로벌 반도체·전자·임베디드 기업이 한국 엔지니어 시장과 소통하기 위해 채널5코리아와 함께해왔습니다.
- **EN:** Global semiconductor, electronics, and embedded companies partner with Channel5 Korea to reach Korea's engineering market.

## 6-2. Section 1 — Intro

### `partners.intro.eyebrow`
- **KO:** 파트너
- **EN:** Partners

### `partners.intro.headline`
- **KO:** 한국 엔지니어 시장을 함께 만나는 회사들
- **EN:** Reaching Korea's engineers, together.

### `partners.intro.body`
- **KO:** 글로벌 기술 기업들이 한국 엔지니어 시장과 소통하기 위해 채널5코리아와 함께해왔습니다. 일회성 광고가 아닌 장기적 기술 커뮤니케이션 관점에서 협업이 이루어지고 있습니다.
- **EN:** Global technology companies have partnered with Channel5 Korea to reach Korea's engineering audience. Our partnerships are built on long-term technology communication, not one-off campaigns.

## 6-3. Section 2 — Partner Categories

### `partners.categories.eyebrow`
- **KO:** 협업 기업
- **EN:** Partner Companies

### `partners.categories.items`

| KEY | KO | EN |
|---|---|---|
| `partners.categories.items.semiconductor` | 글로벌 반도체 기업 | Global Semiconductor Companies |
| `partners.categories.items.distribution` | 전자부품 유통 | Electronics Distribution |
| `partners.categories.items.measurement` | 계측·테스트 | Measurement & Test |
| `partners.categories.items.embedded` | 임베디드 / 소프트웨어 | Embedded & Software |
| `partners.categories.items.education` | 교육 기관 / 협회 | Educational Institutions & Associations |

### `partners.categories.disclaimer`
- **KO:** 로고는 공개 동의를 받은 기업에 한해 노출됩니다.
- **EN:** Logos are displayed only with permission from the respective companies.

## 6-4. Section 3 — Collaboration Types

### `partners.collaboration.eyebrow`
- **KO:** 협업 유형
- **EN:** Types of Collaboration

### `partners.collaboration.headline`
- **KO:** 기업의 목적과 시장 단계에 따라 협업 형태가 달라집니다
- **EN:** The right collaboration depends on your stage and goals.

### `partners.collaboration.body`
- **KO:** 신제품 출시 시점에는 웨비나와 뉴스레터를, 시장 포지셔닝 단계에서는 컨퍼런스와 콘테스트를, 장기 생태계 기여 활동에서는 교육 사업을 활용합니다.
- **EN:** Product launches lean on webinar and newsletter. Market positioning leans on conference and contest. Long-term ecosystem engagement leans on education.

### `partners.collaboration.items`

| KEY | KO 제목 | EN 제목 | KO 설명 | EN 설명 |
|---|---|---|---|---|
| `partners.collaboration.items.webinar` | 웨비나 | Webinar | 신제품·기술 세미나 운영 | Product and technology seminars |
| `partners.collaboration.items.newsletter` | 뉴스레터 | Newsletter | 기술 콘텐츠 및 캠페인 확산 | Content distribution and campaign amplification |
| `partners.collaboration.items.conference` | 컨퍼런스 | Conference | 세션 발표, 부스, 스폰서십 | Sessions, booths, and sponsorship |
| `partners.collaboration.items.contest` | 콘테스트 | Contest | 개발자 참여형 기술 캠페인 | Engineer-driven technology campaigns |
| `partners.collaboration.items.education` | 교육 | Education | 오프라인 기술 교육 지원 | Offline technical education support |

## 6-5. Section 4 — Case Studies

### `partners.cases.eyebrow`
- **KO:** 대표 사례
- **EN:** Selected Cases

### `partners.cases.headline`
- **KO:** 실제 운영된 사례
- **EN:** What we've delivered.

### `partners.cases.disclaimer`
- **KO:** 사례는 공개 동의를 받은 항목에 한해 게재되며, 일부는 익명으로 표기됩니다.
- **EN:** Cases are published only with partner consent. Some are presented anonymously.

### `partners.cases.items`
**사례는 운영팀이 확정해 입력합니다. 구조 예시:**

| KEY | KO 제목 | EN 제목 | KO 형태 | EN 형태 |
|---|---|---|---|---|
| `partners.cases.items.case1` | (사례 1 제목) | (Case 1 Title) | 웨비나 시리즈 | Webinar series |
| `partners.cases.items.case2` | (사례 2 제목) | (Case 2 Title) | 컨퍼런스 스폰서십 | Conference sponsorship |
| `partners.cases.items.case3` | (사례 3 제목) | (Case 3 Title) | 콘테스트 운영 | Contest operation |

## 6-6. Section 5 — CTA

### `partners.cta.headline`
- **KO:** 채널5코리아와의 협업을 검토 중이신가요?
- **EN:** Considering a partnership with Channel5 Korea?

### `partners.cta.ctaPrimary`
- **KO:** 협업 문의하기
- **EN:** Get in Touch

### `partners.cta.ctaSecondary`
- **KO:** 미디어킷 요청하기
- **EN:** Request Media Kit

---

# 7. Contact (`/contact`)

## 7-1. 페이지 메타데이터

### `contact.meta.title`
- **KO:** 문의 | 채널5코리아
- **EN:** Contact | Channel5 Korea

### `contact.meta.description`
- **KO:** 광고, 웨비나, 컨퍼런스, 뉴스레터, 기술 콘테스트, 교육 지원 사업 문의를 남겨주세요. 1~3 영업일 이내 회신드립니다.
- **EN:** Inquire about advertising, webinars, conferences, newsletters, developer contests, and education programs. We respond within 1–3 business days.

## 7-2. Section 1 — Intro

### `contact.intro.eyebrow`
- **KO:** 문의
- **EN:** Contact

### `contact.intro.headline`
- **KO:** 관심 서비스를 선택하시면 담당자가 검토 후 회신드립니다
- **EN:** Select your area of interest. Our team will respond within 1–3 business days.

### `contact.intro.body`
- **KO:** 채널5코리아는 광고, 웨비나, 컨퍼런스, 뉴스레터, 기술 콘테스트, 교육 지원 사업을 운영합니다. 관심 있는 서비스를 선택하시면 담당자가 검토 후 회신드립니다.
- **EN:** Channel5 Korea operates advertising, webinars, conferences, newsletters, developer contests, and education programs. Tell us which area you're interested in and we'll follow up.

## 7-3. Section 2 — Form

### Form Field Labels

| KEY | KO 라벨 | EN 라벨 | 필수 |
|---|---|---|---|
| `contact.form.company` | 회사명 | Company Name | 필수 |
| `contact.form.name` | 이름 | Name | 필수 |
| `contact.form.position` | 직책 | Position | 선택 |
| `contact.form.email` | 이메일 | Email | 필수 |
| `contact.form.phone` | 연락처 | Phone | 선택 |
| `contact.form.interests` | 관심 서비스 (복수 선택) | Areas of Interest (multiple) | 필수 |
| `contact.form.timeline` | 희망 진행 시기 | Preferred Timeline | 선택 |
| `contact.form.message` | 문의 내용 | Message | 필수 |
| `contact.form.requestMediaKit` | 미디어킷도 함께 요청 | Also send me the Media Kit | 선택 |
| `contact.form.privacyConsent` | 개인정보 수집·이용에 동의합니다 | I agree to the collection and use of personal information | 필수 |
| `contact.form.submit` | 문의 제출하기 | Submit Inquiry | — |

### Form Interest Options (multi-select chips)

| KEY | KO | EN |
|---|---|---|
| `contact.form.interestOptions.webinar` | 웨비나 | Webinar |
| `contact.form.interestOptions.newsletter` | 뉴스레터 | Newsletter |
| `contact.form.interestOptions.banner` | 배너 광고 | Banner Advertising |
| `contact.form.interestOptions.conference` | 컨퍼런스 | Conference |
| `contact.form.interestOptions.contest` | 기술 콘테스트 | Developer Contest |
| `contact.form.interestOptions.education` | 교육 지원 사업 | Education Program |
| `contact.form.interestOptions.other` | 기타 | Other |

### Form Placeholder Texts

| KEY | KO | EN |
|---|---|---|
| `contact.form.placeholders.company` | 예: ABC반도체 | e.g. ABC Semiconductor |
| `contact.form.placeholders.name` | 이름을 입력해주세요 | Enter your name |
| `contact.form.placeholders.email` | name@company.com | name@company.com |
| `contact.form.placeholders.phone` | 010-0000-0000 | +82 10 0000 0000 |
| `contact.form.placeholders.timeline` | 예: 2026년 2분기 | e.g. Q2 2026 |
| `contact.form.placeholders.message` | 검토 중인 서비스, 시기, 규모, 목적 등을 자유롭게 적어주세요 | Tell us about the service you're considering, timeline, scale, and goals |

### Form Validation Messages

| KEY | KO | EN |
|---|---|---|
| `contact.form.errors.required` | 필수 항목입니다 | This field is required |
| `contact.form.errors.email` | 올바른 이메일 형식이 아닙니다 | Please enter a valid email |
| `contact.form.errors.phone` | 올바른 연락처 형식이 아닙니다 | Please enter a valid phone number |
| `contact.form.errors.interests` | 관심 서비스를 하나 이상 선택해주세요 | Please select at least one area |
| `contact.form.errors.privacy` | 개인정보 수집·이용에 동의해주세요 | Please agree to the privacy terms |
| `contact.form.errors.submit` | 제출 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요. | Submission failed. Please try again shortly. |

### Form Success Message

#### `contact.form.success.headline`
- **KO:** 문의가 접수되었습니다
- **EN:** Your inquiry has been received

#### `contact.form.success.body`
- **KO:** 담당자가 검토 후 1~3 영업일 이내 연락드립니다. 채널5코리아 미디어킷이 필요하신 경우 별도로 전달드리겠습니다.
- **EN:** Our team will get back to you within 1–3 business days. If you requested the Media Kit, we'll send it separately.

## 7-4. Section 3 — Media Kit Request Box

### `contact.mediaKit.headline`
- **KO:** 미디어킷만 요청하기
- **EN:** Request Media Kit Only

### `contact.mediaKit.body`
- **KO:** 독자 구성, 서비스 단가, 운영 사례를 정리한 미디어킷이 필요하신 경우 별도로 요청하실 수 있습니다.
- **EN:** A media kit covering audience composition, service rates, and case examples is available on request.

### `contact.mediaKit.cta`
- **KO:** 미디어킷 요청하기
- **EN:** Request Media Kit

## 7-5. Section 4 — Company Info

### `contact.companyInfo.headline`
- **KO:** 회사 정보
- **EN:** Company Information

### Company Info Fields

| KEY | KO 라벨 | EN 라벨 | 값(입력 필요) |
|---|---|---|---|
| `contact.companyInfo.legalName` | 회사명 | Company Name | 주식회사 채널5코리아 / Channel5 Korea Inc. |
| `contact.companyInfo.address` | 주소 | Address | (입력 필요) |
| `contact.companyInfo.phone` | 대표 전화 | Phone | (입력 필요) |
| `contact.companyInfo.email` | 이메일 | Email | (입력 필요) |
| `contact.companyInfo.hours` | 영업 시간 | Business Hours | 평일 09:00–18:00 (KST) / Mon–Fri 09:00–18:00 (KST) |

## 7-6. Section 5 — FAQ (선택, 2차 오픈)

### `contact.faq.eyebrow`
- **KO:** 자주 묻는 질문
- **EN:** FAQ

**FAQ 항목은 1차 오픈 이후 실제 문의 데이터를 기반으로 추가합니다.**

---

# 8. 운영 시 메모 (개발용)

## 8-1. 자동 응답 메일

문의 제출 시 자동 발송되는 메일 본문입니다.

### `email.autoReply.subject`
- **KO:** [채널5코리아] 문의가 접수되었습니다
- **EN:** [Channel5 Korea] We've received your inquiry

### `email.autoReply.body`
- **KO:**
```
안녕하세요, {name}님.

채널5코리아에 문의해주셔서 감사합니다.
문의 내용을 확인했으며, 담당자가 검토 후 1~3 영업일 이내 회신드리겠습니다.

[접수된 문의 내용]
- 회사명: {company}
- 관심 서비스: {interests}
- 희망 진행 시기: {timeline}

추가로 필요하신 사항이 있으시면 본 메일에 회신 부탁드립니다.

채널5코리아 드림
https://(회사 사이트 URL)
```

- **EN:**
```
Hello {name},

Thank you for contacting Channel5 Korea.
We've received your inquiry and our team will get back to you within 1–3 business days.

[Inquiry Details]
- Company: {company}
- Areas of Interest: {interests}
- Preferred Timeline: {timeline}

If you have any additional information to share, please reply to this email.

Best regards,
Channel5 Korea
https://(corporate site URL)
```

## 8-2. 운영팀 알림 메일

### `email.notification.subject`
- 형식: `[제안 문의] {company} - {interests}`
- 예시: `[제안 문의] ABC반도체 - 웨비나, 뉴스레터`

## 8-3. 미디어킷 요청 시 처리

- 미디어킷은 PDF 파일로 별도 보관
- 운영팀이 수동 발송 또는 자동 메일에 첨부 발송
- 다운로드 트래킹: GA4 이벤트 `media_kit_request`

---

# 9. 추후 추가 필요 항목 (운영팀 확정 사항)

다음 항목은 운영팀이 확정해 이 문서에 채워야 합니다.

- [ ] Hero 영역 핵심 지표 3개의 정확한 수치
- [ ] e4ds.com 독자 직군 분포 데이터
- [ ] e4ds.com 독자 산업 분포 데이터
- [ ] 누적 콘텐츠 수치 (뉴스, 웨비나, 인터뷰 등)
- [ ] 연혁(History) 각 항목의 정확한 연도
- [ ] 파트너 로고와 사용 동의 여부
- [ ] 공개 가능한 대표 사례 3개 (Partners 페이지)
- [ ] 회사 정식 주소, 대표 전화, 사업 문의 이메일
- [ ] 영업 시간 (시차 안내 포함)
- [ ] 회사 사이트 정식 URL
- [ ] 개인정보처리방침, 이용약관 본문

---

**문서 버전:** 1.0
**최종 업데이트:** 2026-05-12
**관리자:** (담당자 입력)
