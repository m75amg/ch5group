/**
 * Seed script — adapts messages/ko.json & messages/en.json into DB rows so the
 * admin has a starting point. Re-runnable (upsert-based, except history/cases
 * which are replaced wholesale).
 *
 * Run:  pnpm db:seed
 */
import { PrismaClient, Prisma } from "@prisma/client";
import bcrypt from "bcryptjs";

import koRaw from "../messages/ko.json";
import enRaw from "../messages/en.json";

const ko = koRaw as unknown as Messages;
const en = enRaw as unknown as Messages;

interface Messages {
  home: {
    hero: {
      stats: {
        yearsLabel: string;
        yearsValue: string;
        audienceLabel: string;
        audienceValue: string;
        partnersLabel: string;
        partnersValue: string;
      };
    };
    mediaSnapshot: {
      audienceItems: Record<string, string>;
      industryItems: Record<string, string>;
    };
    programs: {
      items: Record<string, string>;
    };
  };
  about: {
    identity: {
      stats: {
        yearsLabel: string;
        yearsValue: string;
        audienceLabel: string;
        audienceValue: string;
        partnersLabel: string;
        partnersValue: string;
        eventsLabel: string;
        eventsValue: string;
      };
    };
    history: {
      items: Array<{ year: string; title: string; description: string }>;
    };
  };
  contact: {
    sidebar: {
      address: string;
      phone: string;
      email: string;
      hours: string;
    };
  };
  footer: {
    platformsLinks: Record<string, string>;
  };
  partners: {
    categories: { items: Record<string, string> };
  };
}

function bi(koValue: string, enValue: string): Prisma.InputJsonValue {
  return { ko: koValue, en: enValue };
}

const prisma = new PrismaClient();

async function seedAdmin() {
  const email = process.env.SEED_ADMIN_EMAIL ?? "admin@channel5korea.com";
  const password = process.env.SEED_ADMIN_PASSWORD ?? "ch5dev2026!";
  const hash = await bcrypt.hash(password, 10);

  const user = await prisma.user.upsert({
    where: { email },
    update: { passwordHash: hash, role: "ADMIN" },
    create: {
      email,
      passwordHash: hash,
      name: "Channel5 Admin",
      role: "ADMIN",
    },
  });
  console.log(`✓ admin: ${user.email}`);
}

async function seedStats() {
  // Use About identity stats (has 4 entries — superset of Home's 3)
  const k = ko.about.identity.stats;
  const e = en.about.identity.stats;

  const entries = [
    { key: "years", value: k.yearsValue, label: bi(k.yearsLabel, e.yearsLabel), displayOrder: 1 },
    { key: "audience", value: k.audienceValue, label: bi(k.audienceLabel, e.audienceLabel), displayOrder: 2 },
    { key: "partners", value: k.partnersValue, label: bi(k.partnersLabel, e.partnersLabel), displayOrder: 3 },
    { key: "events", value: k.eventsValue, label: bi(k.eventsLabel, e.eventsLabel), displayOrder: 4 },
  ];

  for (const entry of entries) {
    await prisma.stat.upsert({
      where: { key: entry.key },
      update: { value: entry.value, label: entry.label, displayOrder: entry.displayOrder },
      create: entry,
    });
  }
  console.log(`✓ stats: ${entries.length}`);
}

async function seedAudience() {
  await prisma.audienceData.deleteMany();

  const roleValues = [
    { key: "rd", value: 45 },
    { key: "decision", value: 20 },
    { key: "marketing", value: 15 },
    { key: "academia", value: 10 },
    { key: "other", value: 10 },
  ];
  const industryValues = [
    { key: "semiconductor", value: 30 },
    { key: "embedded", value: 25 },
    { key: "automotive", value: 20 },
    { key: "automation", value: 15 },
    { key: "other", value: 10 },
  ];

  for (let i = 0; i < roleValues.length; i++) {
    const k = roleValues[i].key;
    await prisma.audienceData.create({
      data: {
        chartType: "ROLE",
        name: bi(ko.home.mediaSnapshot.audienceItems[k], en.home.mediaSnapshot.audienceItems[k]),
        value: roleValues[i].value,
        displayOrder: i,
      },
    });
  }
  for (let i = 0; i < industryValues.length; i++) {
    const k = industryValues[i].key;
    await prisma.audienceData.create({
      data: {
        chartType: "INDUSTRY",
        name: bi(ko.home.mediaSnapshot.industryItems[k], en.home.mediaSnapshot.industryItems[k]),
        value: industryValues[i].value,
        displayOrder: i,
      },
    });
  }
  console.log(`✓ audience: ${roleValues.length + industryValues.length}`);
}

async function seedContactInfo() {
  await prisma.contactInfo.upsert({
    where: { id: 1 },
    update: {
      address: bi(ko.contact.sidebar.address, en.contact.sidebar.address),
      phone: ko.contact.sidebar.phone,
      email: ko.contact.sidebar.email,
      hours: bi(ko.contact.sidebar.hours, en.contact.sidebar.hours),
    },
    create: {
      id: 1,
      address: bi(ko.contact.sidebar.address, en.contact.sidebar.address),
      phone: ko.contact.sidebar.phone,
      email: ko.contact.sidebar.email,
      hours: bi(ko.contact.sidebar.hours, en.contact.sidebar.hours),
    },
  });
  console.log("✓ contactInfo");
}

async function seedEmailTemplates() {
  await prisma.emailTemplate.upsert({
    where: { key: "autoReply" },
    update: {},
    create: {
      key: "autoReply",
      subject: bi(
        "[채널5코리아] 문의가 접수되었습니다",
        "[Channel5 Korea] We've received your inquiry",
      ),
      body: bi(
        `안녕하세요, {name}님.

채널5코리아에 문의해주셔서 감사합니다. 담당자가 검토 후 1~3 영업일 이내 회신드리겠습니다.

[접수 내용]
- 회사명: {company}
- 관심 서비스: {interests}
- 희망 시기: {timeline}

채널5코리아 드림`,
        `Hello {name},

Thank you for contacting Channel5 Korea. Our team will follow up within 1–3 business days.

[Submission summary]
- Company: {company}
- Areas of interest: {interests}
- Timeline: {timeline}

Best regards,
Channel5 Korea`,
      ),
    },
  });

  await prisma.emailTemplate.upsert({
    where: { key: "notification" },
    update: {},
    create: {
      key: "notification",
      subject: bi(
        "[제안 문의] {company} - {interests}",
        "[Inquiry] {company} - {interests}",
      ),
      body: bi(
        `새 문의가 접수되었습니다.

[기업 정보]
- 회사명: {company}
- 이름: {name}
- 직책: {position}

[연락처]
- 이메일: {email}
- 전화: {phone}

[문의 내용]
- 관심 서비스: {interests}
- 희망 시기: {timeline}
- 미디어킷 함께 요청: {requestMediaKit}

[메시지]
{message}`,
        `New inquiry received.

[Company]
- Company: {company}
- Name: {name}
- Position: {position}

[Contact]
- Email: {email}
- Phone: {phone}

[Inquiry]
- Areas of interest: {interests}
- Timeline: {timeline}
- Media kit requested: {requestMediaKit}

[Message]
{message}`,
      ),
    },
  });
  console.log("✓ emailTemplates: 2");
}

async function seedHistory() {
  await prisma.historyItem.deleteMany();
  const koItems = ko.about.history.items;
  const enItems = en.about.history.items;
  for (let i = 0; i < koItems.length; i++) {
    await prisma.historyItem.create({
      data: {
        year: koItems[i].year,
        title: bi(koItems[i].title, enItems[i].title),
        description: bi(koItems[i].description, enItems[i].description),
        displayOrder: i,
      },
    });
  }
  console.log(`✓ history: ${koItems.length}`);
}

async function seedPrograms() {
  const slugs = ["physicalAI", "techDay", "analogDay", "challenge", "education"] as const;
  const tagMap: Record<string, "CONFERENCE" | "CONTEST" | "EDUCATION"> = {
    physicalAI: "CONFERENCE",
    techDay: "CONFERENCE",
    analogDay: "CONFERENCE",
    challenge: "CONTEST",
    education: "EDUCATION",
  };

  for (let i = 0; i < slugs.length; i++) {
    const slug = slugs[i];
    const koTitle = ko.home.programs.items[slug];
    const enTitle = en.home.programs.items[slug];
    await prisma.program.upsert({
      where: { slug },
      update: {},
      create: {
        slug,
        title: bi(koTitle, enTitle),
        tag: tagMap[slug],
        tagline: bi(`${koTitle} 태그라인 placeholder`, `${enTitle} tagline placeholder`),
        body: bi(`${koTitle} 본문 placeholder — 운영팀 확정 후 갱신.`, `${enTitle} body placeholder — to be confirmed.`),
        isFeatured: true,
        displayOrder: i,
      },
    });
  }
  console.log(`✓ programs: ${slugs.length}`);
}

async function seedCases() {
  await prisma.case.deleteMany();
  const placeholders = [
    { type: bi("웨비나 시리즈", "Webinar series"), title: bi("(사례 1 제목 — 운영팀 확정 예정)", "(Case 1 — to be confirmed by ops team)") },
    { type: bi("컨퍼런스 스폰서십", "Conference sponsorship"), title: bi("(사례 2 제목 — 운영팀 확정 예정)", "(Case 2 — to be confirmed by ops team)") },
    { type: bi("콘테스트 운영", "Contest operation"), title: bi("(사례 3 제목 — 운영팀 확정 예정)", "(Case 3 — to be confirmed by ops team)") },
  ];
  for (let i = 0; i < placeholders.length; i++) {
    await prisma.case.create({
      data: {
        type: placeholders[i].type,
        title: placeholders[i].title,
        isPublished: true,
        displayOrder: i,
      },
    });
  }
  console.log(`✓ cases: ${placeholders.length}`);
}

async function seedFooterLinks() {
  const platforms = ko.footer.platformsLinks;
  const links = [
    { label: platforms.e4ds, url: "https://www.e4ds.com" },
    { label: platforms.webinar, url: "https://webinar.e4ds.com" },
    { label: platforms.make, url: "https://make.e4ds.com" },
    { label: platforms.kmap, url: "#" },
  ];

  await prisma.footerLink.deleteMany();
  for (let i = 0; i < links.length; i++) {
    await prisma.footerLink.create({
      data: {
        label: links[i].label,
        url: links[i].url,
        isExternal: true,
        displayOrder: i,
      },
    });
  }
  console.log(`✓ footerLinks: ${links.length}`);
}

async function seedPartners() {
  await prisma.partner.deleteMany();
  const cats = ["SEMICONDUCTOR", "DISTRIBUTION", "MEASUREMENT", "EMBEDDED", "EDUCATION"] as const;
  for (let i = 0; i < 8; i++) {
    await prisma.partner.create({
      data: {
        name: `Partner ${i + 1} (placeholder)`,
        logoPath: "/uploads/partners/placeholder.svg",
        category: cats[i % cats.length],
        isPublished: false, // placeholder — admin will toggle on with real logo
        displayOrder: i,
      },
    });
  }
  console.log("✓ partners: 8 placeholders");
}

async function main() {
  console.log("Seeding…\n");
  await seedAdmin();
  await seedStats();
  await seedAudience();
  await seedContactInfo();
  await seedEmailTemplates();
  await seedHistory();
  await seedPrograms();
  await seedCases();
  await seedFooterLinks();
  await seedPartners();
  console.log("\nDone.");
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
