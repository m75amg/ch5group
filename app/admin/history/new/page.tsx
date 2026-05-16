import Link from "next/link";
import { ChevronLeft } from "lucide-react";

import { db } from "@/lib/db";
import { requireAdminSession } from "@/lib/admin";
import { AdminShell } from "@/components/admin/AdminShell";
import { PageHeader } from "@/components/admin/PageHeader";
import { HistoryForm, type HistoryFormData } from "../HistoryForm";

export const dynamic = "force-dynamic";

export default async function NewHistoryPage() {
  await requireAdminSession();
  const last = await db.historyItem.findFirst({
    orderBy: { displayOrder: "desc" },
    select: { displayOrder: true },
  });
  const defaults: HistoryFormData = {
    year: "",
    titleKo: "",
    titleEn: "",
    descriptionKo: "",
    descriptionEn: "",
    displayOrder: (last?.displayOrder ?? -1) + 1,
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
      <PageHeader eyebrow="콘텐츠" title="새 사건" className="mt-3" />
      <div className="mt-8">
        <HistoryForm mode="create" defaults={defaults} />
      </div>
    </AdminShell>
  );
}
