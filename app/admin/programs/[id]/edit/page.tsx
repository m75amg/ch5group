import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronLeft } from "lucide-react";

import { db } from "@/lib/db";
import { requireAdminSession } from "@/lib/admin";
import { AdminShell } from "@/components/admin/AdminShell";
import { PageHeader } from "@/components/admin/PageHeader";
import { ProgramForm, type ProgramFormData } from "../../ProgramForm";

export const dynamic = "force-dynamic";

interface BiJson {
  ko?: string;
  en?: string;
}

function toDateInput(d: Date | null): string {
  if (!d) return "";
  return d.toISOString().slice(0, 10);
}

export default async function EditProgramPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await requireAdminSession();
  const { id } = await params;

  const program = await db.program.findUnique({ where: { id } });
  if (!program) notFound();

  const title = (program.title ?? {}) as BiJson;
  const tagline = (program.tagline ?? {}) as BiJson;
  const body = (program.body ?? {}) as BiJson;

  const defaults: ProgramFormData = {
    id: program.id,
    slug: program.slug,
    titleKo: title.ko ?? "",
    titleEn: title.en ?? "",
    tag: program.tag,
    taglineKo: tagline.ko ?? "",
    taglineEn: tagline.en ?? "",
    bodyKo: body.ko ?? "",
    bodyEn: body.en ?? "",
    imagePath: program.imagePath ?? "",
    externalUrl: program.externalUrl ?? "",
    eventDate: toDateInput(program.eventDate),
    isFeatured: program.isFeatured,
    displayOrder: program.displayOrder,
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
        title={defaults.titleKo || program.slug}
        description={`Slug: ${program.slug}`}
        className="mt-3"
      />
      <div className="mt-8">
        <ProgramForm mode="edit" defaults={defaults} />
      </div>
    </AdminShell>
  );
}
