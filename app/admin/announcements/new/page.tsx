import Link from "next/link";
import { ChevronLeft } from "lucide-react";

import { requireAdminSession } from "@/lib/admin";
import { AdminShell } from "@/components/admin/AdminShell";
import { PageHeader } from "@/components/admin/PageHeader";
import { AnnouncementForm, type AnnouncementFormData } from "../AnnouncementForm";

export const dynamic = "force-dynamic";

export default async function NewAnnouncementPage() {
  await requireAdminSession();
  const defaults: AnnouncementFormData = {
    messageKo: "",
    messageEn: "",
    linkUrl: "",
    startsAt: "",
    endsAt: "",
    isActive: true,
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
      <PageHeader eyebrow="콘텐츠" title="새 공지" className="mt-3" />
      <div className="mt-8">
        <AnnouncementForm mode="create" defaults={defaults} />
      </div>
    </AdminShell>
  );
}
