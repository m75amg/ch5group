import Link from "next/link";
import { Plus, Pencil } from "lucide-react";

import { db } from "@/lib/db";
import { requireAdminSession } from "@/lib/admin";
import { AdminShell } from "@/components/admin/AdminShell";
import { PageHeader } from "@/components/admin/PageHeader";
import { Button } from "@/components/ui/Button";
import { DeleteHistoryButton } from "./DeleteHistoryButton";

export const dynamic = "force-dynamic";

interface BiJson {
  ko?: string;
  en?: string;
}

export default async function HistoryAdminPage() {
  await requireAdminSession();
  const items = await db.historyItem.findMany({
    orderBy: { displayOrder: "asc" },
  });

  return (
    <AdminShell>
      <PageHeader
        eyebrow="콘텐츠"
        title="연혁"
        description="About 페이지 History 타임라인에 노출되는 회사 주요 사건 목록입니다."
        actions={
          <Link href="/admin/history/new">
            <Button size="sm">
              <Plus className="h-4 w-4 mr-1" />새 사건
            </Button>
          </Link>
        }
      />

      <div className="mt-8 overflow-x-auto rounded-lg border border-border bg-background">
        <table className="min-w-full divide-y divide-border">
          <thead className="bg-background-muted">
            <tr>
              {["순서", "연도", "제목 (KO)", "설명 미리보기", "관리"].map((h) => (
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
                  colSpan={5}
                  className="px-4 py-12 text-center text-body-sm text-foreground-muted"
                >
                  등록된 연혁이 없습니다.
                </td>
              </tr>
            ) : (
              items.map((item) => {
                const title = (item.title ?? {}) as BiJson;
                const desc = (item.description ?? {}) as BiJson;
                const preview = desc.ko ?? "";
                return (
                  <tr key={item.id} className="hover:bg-background-muted">
                    <td className="px-4 py-3 text-body-sm font-mono text-foreground-muted">
                      {item.displayOrder}
                    </td>
                    <td className="px-4 py-3 text-body-sm font-mono text-brand-accent">
                      {item.year}
                    </td>
                    <td className="px-4 py-3 text-body-sm text-foreground">
                      {title.ko ?? ""}
                    </td>
                    <td className="px-4 py-3 text-body-sm text-foreground-muted truncate max-w-md">
                      {preview.length > 80 ? `${preview.slice(0, 80)}…` : preview}
                    </td>
                    <td className="px-4 py-3 text-body-sm">
                      <div className="flex items-center gap-4">
                        <Link
                          href={`/admin/history/${item.id}/edit`}
                          className="inline-flex items-center gap-1 text-brand-accent hover:underline"
                        >
                          <Pencil className="h-4 w-4" />
                          편집
                        </Link>
                        <DeleteHistoryButton id={item.id} />
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
