import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronLeft } from "lucide-react";

import { db } from "@/lib/db";
import { requireAdminSession } from "@/lib/admin";
import { AdminShell } from "@/components/admin/AdminShell";
import { PageHeader } from "@/components/admin/PageHeader";
import { AnnouncementForm, type AnnouncementFormData } from "../../AnnouncementForm";

export const dynamic = "force-dynamic";

interface BiJson {
  ko?: string;
  en?: string;
}

function toDateTimeInput(d: Date | null): string {
  if (!d) return "";
  // YYYY-MM-DDTHH:mm — matches <input type="datetime-local">
  const iso = d.toISOString();
  return iso.slice(0, 16);
}

export default async function EditAnnouncementPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await requireAdminSession();
  const { id } = await params;
  const record = await db.announcement.findUnique({ where: { id } });
  if (!record) notFound();

  const message = (record.message ?? {}) as BiJson;
  const defaults: AnnouncementFormData = {
    id: record.id,
    messageKo: message.ko ?? "",
    messageEn: message.en ?? "",
    linkUrl: record.linkUrl ?? "",
    startsAt: toDateTimeInput(record.startsAt),
    endsAt: toDateTimeInput(record.endsAt),
    isActive: record.isActive,
  };

  return (
    <AdminShell>
      <Link
        href="/admin/announcements"
        className="inline-flex items-center gap-1 text-button text-foreground-muted hover:text-foreground"
      >
        <ChevronLeft className="h-4 w-4" />
        공지 목록으로
      </Link>
      <PageHeader
        eyebrow="콘텐츠"
        title={defaults.messageKo.slice(0, 40) + (defaults.messageKo.length > 40 ? "…" : "")}
        className="mt-3"
      />
      <div className="mt-8">
        <AnnouncementForm mode="edit" defaults={defaults} />
      </div>
    </AdminShell>
  );
}
