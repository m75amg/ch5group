import Link from "next/link";
import { ChevronLeft } from "lucide-react";

import { db } from "@/lib/db";
import { requireAdminSession } from "@/lib/admin";
import { AdminShell } from "@/components/admin/AdminShell";
import { PageHeader } from "@/components/admin/PageHeader";
import { ProgramForm, type ProgramFormData } from "../ProgramForm";

export const dynamic = "force-dynamic";

export default async function NewProgramPage() {
  await requireAdminSession();

  const last = await db.program.findFirst({
    orderBy: { displayOrder: "desc" },
    select: { displayOrder: true },
  });

  const defaults: ProgramFormData = {
    slug: "",
    titleKo: "",
    titleEn: "",
    tag: "CONFERENCE",
    taglineKo: "",
    taglineEn: "",
    bodyKo: "",
    bodyEn: "",
    imagePath: "",
    externalUrl: "",
    eventDate: "",
    isFeatured: true,
    displayOrder: (last?.displayOrder ?? -1) + 1,
  };

  return (
    <AdminShell>
      <Link
        href="/admin/programs"
        className="inline-flex items-center gap-1 text-button text-foreground-muted hover:text-foreground"
      >
        <ChevronLeft className="h-4 w-4" />
        프로그램 목록으로
      </Link>
      <PageHeader
        eyebrow="콘텐츠"
        title="새 프로그램"
        description="새 컨퍼런스/콘테스트/교육 프로그램을 추가합니다."
        className="mt-3"
      />
      <div className="mt-8">
        <ProgramForm mode="create" defaults={defaults} />
      </div>
    </AdminShell>
  );
}
