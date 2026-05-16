import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronLeft } from "lucide-react";

import { db } from "@/lib/db";
import { requireAdminSession } from "@/lib/admin";
import { AdminShell } from "@/components/admin/AdminShell";
import { PageHeader } from "@/components/admin/PageHeader";
import { CaseForm, type CaseFormData } from "../../CaseForm";

export const dynamic = "force-dynamic";

interface BiJson {
  ko?: string;
  en?: string;
}

export default async function EditCasePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await requireAdminSession();
  const { id } = await params;
  const record = await db.case.findUnique({ where: { id } });
  if (!record) notFound();

  const type = (record.type ?? {}) as BiJson;
  const title = (record.title ?? {}) as BiJson;
  const body = (record.body ?? {}) as BiJson;

  const defaults: CaseFormData = {
    id: record.id,
    partnerName: record.partnerName ?? "",
    typeKo: type.ko ?? "",
    typeEn: type.en ?? "",
    titleKo: title.ko ?? "",
    titleEn: title.en ?? "",
    bodyKo: body.ko ?? "",
    bodyEn: body.en ?? "",
    isPublished: record.isPublished,
    displayOrder: record.displayOrder,
  };

  return (
    <AdminShell>
      <Link
        href="/admin/cases"
        className="inline-flex items-center gap-1 text-button text-foreground-muted hover:text-foreground"
      >
        <ChevronLeft className="h-4 w-4" />
        사례 목록으로
      </Link>
      <PageHeader
        eyebrow="콘텐츠"
        title={defaults.titleKo || "(제목 없음)"}
        className="mt-3"
      />
      <div className="mt-8">
        <CaseForm mode="edit" defaults={defaults} />
      </div>
    </AdminShell>
  );
}
