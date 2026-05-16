import Link from "next/link";
import { ChevronLeft } from "lucide-react";

import { db } from "@/lib/db";
import { requireAdminSession } from "@/lib/admin";
import { AdminShell } from "@/components/admin/AdminShell";
import { PageHeader } from "@/components/admin/PageHeader";
import { PartnerForm, type PartnerFormData } from "../PartnerForm";

export const dynamic = "force-dynamic";

export default async function NewPartnerPage() {
  await requireAdminSession();
  const last = await db.partner.findFirst({
    orderBy: { displayOrder: "desc" },
    select: { displayOrder: true },
  });
  const defaults: PartnerFormData = {
    name: "",
    logoPath: "",
    category: "SEMICONDUCTOR",
    externalUrl: "",
    consentDate: "",
    isPublished: false,
    displayOrder: (last?.displayOrder ?? -1) + 1,
  };

  return (
    <AdminShell>
      <Link
        href="/admin/partners"
        className="inline-flex items-center gap-1 text-button text-foreground-muted hover:text-foreground"
      >
        <ChevronLeft className="h-4 w-4" />
        파트너 목록으로
      </Link>
      <PageHeader eyebrow="콘텐츠" title="새 파트너" className="mt-3" />
      <div className="mt-8">
        <PartnerForm mode="create" defaults={defaults} />
      </div>
    </AdminShell>
  );
}
