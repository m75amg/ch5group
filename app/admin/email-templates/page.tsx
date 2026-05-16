import { db } from "@/lib/db";
import { requireAdminSession } from "@/lib/admin";
import { AdminShell } from "@/components/admin/AdminShell";
import { PageHeader } from "@/components/admin/PageHeader";
import {
  EmailTemplateCard,
  type EmailTemplateData,
} from "./EmailTemplateCard";

export const dynamic = "force-dynamic";

interface BiJson {
  ko?: string;
  en?: string;
}

const KEYS = ["autoReply", "notification"] as const;

export default async function EmailTemplatesAdminPage() {
  await requireAdminSession();

  const templates = await db.emailTemplate.findMany({
    where: { key: { in: KEYS as unknown as string[] } },
  });

  const byKey = new Map(templates.map((t) => [t.key, t]));

  const cards: EmailTemplateData[] = KEYS.map((key) => {
    const t = byKey.get(key);
    const subject = (t?.subject ?? {}) as BiJson;
    const body = (t?.body ?? {}) as BiJson;
    return {
      key,
      subjectKo: subject.ko ?? "",
      subjectEn: subject.en ?? "",
      bodyKo: body.ko ?? "",
      bodyEn: body.en ?? "",
    };
  });

  return (
    <AdminShell>
      <PageHeader
        eyebrow="회사 정보"
        title="이메일 템플릿"
        description="Contact 폼 제출 시 발송되는 자동 응답 / 운영팀 알림 메일의 본문 템플릿입니다. 변수는 중괄호 표기({name}, {company} 등)로 사용합니다."
      />
      <div className="mt-8 space-y-8">
        {cards.map((data) => (
          <EmailTemplateCard key={data.key} data={data} />
        ))}
      </div>
    </AdminShell>
  );
}
