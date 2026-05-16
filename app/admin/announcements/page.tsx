import Link from "next/link";
import { Plus, Pencil } from "lucide-react";

import { db } from "@/lib/db";
import { requireAdminSession } from "@/lib/admin";
import { AdminShell } from "@/components/admin/AdminShell";
import { PageHeader } from "@/components/admin/PageHeader";
import { Button } from "@/components/ui/Button";
import { DeleteAnnouncementButton } from "./DeleteAnnouncementButton";

export const dynamic = "force-dynamic";

interface BiJson {
  ko?: string;
  en?: string;
}

function formatDateTime(d: Date | null): string {
  if (!d) return "—";
  return d.toLocaleString("ko-KR", {
    year: "2-digit",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default async function AnnouncementsAdminPage() {
  await requireAdminSession();
  const items = await db.announcement.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <AdminShell>
      <PageHeader
        eyebrow="콘텐츠"
        title="공지/배너"
        description="사이트 상단에 노출되는 공지 또는 캠페인 배너입니다. 활성 + 기간 조건 모두 만족할 때 표시됩니다."
        actions={
          <Link href="/admin/announcements/new">
            <Button size="sm">
              <Plus className="h-4 w-4 mr-1" />새 공지
            </Button>
          </Link>
        }
      />

      <div className="mt-8 overflow-x-auto rounded-lg border border-border bg-background">
        <table className="min-w-full divide-y divide-border">
          <thead className="bg-background-muted">
            <tr>
              {["메시지 (KO)", "링크", "시작", "종료", "활성", "관리"].map((h) => (
                <th
                  key={h}
                  className="px-4 py-3 text-left text-caption uppercase tracking-[0.08em] text-foreground-muted"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {items.length === 0 ? (
              <tr>
                <td
                  colSpan={6}
                  className="px-4 py-12 text-center text-body-sm text-foreground-muted"
                >
                  등록된 공지가 없습니다.
                </td>
              </tr>
            ) : (
              items.map((a) => {
                const msg = (a.message ?? {}) as BiJson;
                return (
                  <tr key={a.id} className="hover:bg-background-muted">
                    <td className="px-4 py-3 text-body-sm text-foreground truncate max-w-md">
                      {msg.ko ?? ""}
                    </td>
                    <td className="px-4 py-3 text-body-sm text-foreground-muted truncate max-w-xs">
                      {a.linkUrl ?? "—"}
                    </td>
                    <td className="px-4 py-3 text-caption font-mono text-foreground-muted">
                      {formatDateTime(a.startsAt)}
                    </td>
                    <td className="px-4 py-3 text-caption font-mono text-foreground-muted">
                      {formatDateTime(a.endsAt)}
                    </td>
                    <td className="px-4 py-3 text-body-sm">
                      {a.isActive ? (
                        <span className="text-success">●</span>
                      ) : (
                        <span className="text-neutral-300">○</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-body-sm">
                      <div className="flex items-center gap-4">
                        <Link
                          href={`/admin/announcements/${a.id}/edit`}
                          className="inline-flex items-center gap-1 text-brand-accent hover:underline"
                        >
                          <Pencil className="h-4 w-4" />
                          편집
                        </Link>
                        <DeleteAnnouncementButton id={a.id} />
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </AdminShell>
  );
}
