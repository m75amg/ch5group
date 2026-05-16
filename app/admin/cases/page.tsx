import Link from "next/link";
import { Plus, Pencil } from "lucide-react";

import { db } from "@/lib/db";
import { requireAdminSession } from "@/lib/admin";
import { AdminShell } from "@/components/admin/AdminShell";
import { PageHeader } from "@/components/admin/PageHeader";
import { Button } from "@/components/ui/Button";
import { DeleteCaseButton } from "./DeleteCaseButton";

export const dynamic = "force-dynamic";

interface BiJson {
  ko?: string;
  en?: string;
}

export default async function CasesAdminPage() {
  await requireAdminSession();
  const cases = await db.case.findMany({
    orderBy: { displayOrder: "asc" },
  });

  return (
    <AdminShell>
      <PageHeader
        eyebrow="콘텐츠"
        title="사례"
        description="Partners 페이지의 Selected Cases 섹션에 노출되는 실제 운영 사례입니다."
        actions={
          <Link href="/admin/cases/new">
            <Button size="sm">
              <Plus className="h-4 w-4 mr-1" />새 사례
            </Button>
          </Link>
        }
      />

      <div className="mt-8 overflow-x-auto rounded-lg border border-border bg-background">
        <table className="min-w-full divide-y divide-border">
          <thead className="bg-background-muted">
            <tr>
              {["순서", "파트너", "형태 (KO)", "제목 (KO)", "공개", "관리"].map(
                (h) => (
                  <th
                    key={h}
                    className="px-4 py-3 text-left text-caption uppercase tracking-[0.08em] text-foreground-muted"
                  >
                    {h}
                  </th>
                ),
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {cases.length === 0 ? (
              <tr>
                <td
                  colSpan={6}
                  className="px-4 py-12 text-center text-body-sm text-foreground-muted"
                >
                  등록된 사례가 없습니다.
                </td>
              </tr>
            ) : (
              cases.map((c) => {
                const type = (c.type ?? {}) as BiJson;
                const title = (c.title ?? {}) as BiJson;
                return (
                  <tr key={c.id} className="hover:bg-background-muted">
                    <td className="px-4 py-3 text-body-sm font-mono text-foreground-muted">
                      {c.displayOrder}
                    </td>
                    <td className="px-4 py-3 text-body-sm text-foreground-muted">
                      {c.partnerName ?? <span className="italic">익명</span>}
                    </td>
                    <td className="px-4 py-3 text-body-sm text-brand-accent">
                      {type.ko ?? ""}
                    </td>
                    <td className="px-4 py-3 text-body-sm text-foreground">
                      {title.ko ?? ""}
                    </td>
                    <td className="px-4 py-3 text-body-sm">
                      {c.isPublished ? (
                        <span className="text-success">●</span>
                      ) : (
                        <span className="text-neutral-300">○</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-body-sm">
                      <div className="flex items-center gap-4">
                        <Link
                          href={`/admin/cases/${c.id}/edit`}
                          className="inline-flex items-center gap-1 text-brand-accent hover:underline"
                        >
                          <Pencil className="h-4 w-4" />
                          편집
                        </Link>
                        <DeleteCaseButton id={c.id} />
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
