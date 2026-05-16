import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronLeft } from "lucide-react";

import { db } from "@/lib/db";
import { requireAdminSession } from "@/lib/admin";
import { AdminShell } from "@/components/admin/AdminShell";
import { PageHeader } from "@/components/admin/PageHeader";
import { HistoryForm, type HistoryFormData } from "../../HistoryForm";

export const dynamic = "force-dynamic";

interface BiJson {
  ko?: string;
  en?: string;
}

export default async function EditHistoryPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await requireAdminSession();
  const { id } = await params;
  const record = await db.historyItem.findUnique({ where: { id } });
  if (!record) notFound();

  const title = (record.title ?? {}) as BiJson;
  const description = (record.description ?? {}) as BiJson;

  const defaults: HistoryFormData = {
    id: record.id,
    year: record.year,
    titleKo: title.ko ?? "",
    titleEn: title.en ?? "",
    descriptionKo: description.ko ?? "",
    descriptionEn: description.en ?? "",
    displayOrder: record.displayOrder,
  };

  return (
    <AdminShell>
      <Link
        href="/admin/history"
        className="inline-flex items-center gap-1 text-button text-foreground-muted hover:text-foreground"
      >
        <ChevronLeft className="h-4 w-4" />
        연혁 목록으로
      </Link>
      <PageHeader
        eyebrow="콘텐츠"
        title={`${defaults.year} · ${defaults.titleKo || "(제목 없음)"}`}
        className="mt-3"
      />
      <div className="mt-8">
        <HistoryForm mode="edit" defaults={defaults} />
      </div>
    </AdminShell>
  );
}
