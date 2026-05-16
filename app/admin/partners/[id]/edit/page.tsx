import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronLeft } from "lucide-react";

import { db } from "@/lib/db";
import { requireAdminSession } from "@/lib/admin";
import { AdminShell } from "@/components/admin/AdminShell";
import { PageHeader } from "@/components/admin/PageHeader";
import { PartnerForm, type PartnerFormData } from "../../PartnerForm";

export const dynamic = "force-dynamic";

function toDateInput(d: Date | null): string {
  if (!d) return "";
  return d.toISOString().slice(0, 10);
}

export default async function EditPartnerPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await requireAdminSession();
  const { id } = await params;
  const partner = await db.partner.findUnique({ where: { id } });
  if (!partner) notFound();

  const defaults: PartnerFormData = {
    id: partner.id,
    name: partner.name,
    logoPath: partner.logoPath,
    category: partner.category,
    externalUrl: partner.externalUrl ?? "",
    consentDate: toDateInput(partner.consentDate),
    isPublished: partner.isPublished,
    displayOrder: partner.displayOrder,
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
      <PageHeader eyebrow="콘텐츠" title={defaults.name} className="mt-3" />
      <div className="mt-8">
        <PartnerForm mode="edit" defaults={defaults} />
      </div>
    </AdminShell>
  );
}
