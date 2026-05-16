import Link from "next/link";
import { ChevronLeft } from "lucide-react";

import { db } from "@/lib/db";
import { requireAdminSession } from "@/lib/admin";
import { AdminShell } from "@/components/admin/AdminShell";
import { PageHeader } from "@/components/admin/PageHeader";
import { CaseForm, type CaseFormData } from "../CaseForm";

export const dynamic = "force-dynamic";

export default async function NewCasePage() {
  await requireAdminSession();
  const last = await db.case.findFirst({
    orderBy: { displayOrder: "desc" },
    select: { displayOrder: true },
  });
  const defaults: CaseFormData = {
    partnerName: "",
    typeKo: "",
    typeEn: "",
    titleKo: "",
    titleEn: "",
    bodyKo: "",
    bodyEn: "",
    isPublished: true,
    displayOrder: (last?.displayOrder ?? -1) + 1,
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
        title="새 사례"
        description="Partners 페이지에 노출될 신규 사례를 추가합니다."
        className="mt-3"
      />
      <div className="mt-8">
        <CaseForm mode="create" defaults={defaults} />
      </div>
    </AdminShell>
  );
}
