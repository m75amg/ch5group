import Link from "next/link";
import { Plus, Pencil } from "lucide-react";

import { db } from "@/lib/db";
import { requireAdminSession } from "@/lib/admin";
import { AdminShell } from "@/components/admin/AdminShell";
import { PageHeader } from "@/components/admin/PageHeader";
import { Button } from "@/components/ui/Button";
import { DeleteProgramButton } from "./DeleteProgramButton";

export const dynamic = "force-dynamic";

interface BiJson {
  ko?: string;
  en?: string;
}

export default async function ProgramsAdminPage() {
  await requireAdminSession();

  const programs = await db.program.findMany({
    orderBy: [{ isFeatured: "desc" }, { displayOrder: "asc" }],
  });

  return (
    <AdminShell>
      <PageHeader
        eyebrow="콘텐츠"
        title="프로그램"
        description="Home Featured Programs 섹션과 Programs 페이지에 노출되는 컨퍼런스/콘테스트/교육 프로그램입니다."
        actions={
          <Link href="/admin/programs/new">
            <Button size="sm">
              <Plus className="h-4 w-4 mr-1" />
              새 프로그램
            </Button>
          </Link>
        }
      />

      <div className="mt-8 overflow-x-auto rounded-lg border border-border bg-background">
        <table className="min-w-full divide-y divide-border">
          <thead className="bg-background-muted">
            <tr>
              {["순서", "Slug", "제목 (KO)", "태그", "Featured", "행사일", "관리"].map(
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
            {programs.length === 0 ? (
              <tr>
                <td
                  colSpan={7}
                  className="px-4 py-12 text-center text-body-sm text-foreground-muted"
                >
                  등록된 프로그램이 없습니다.
                </td>
              </tr>
            ) : (
              programs.map((p) => {
                const title = (p.title ?? {}) as BiJson;
                return (
                  <tr key={p.id} className="hover:bg-background-muted">
                    <td className="px-4 py-3 text-body-sm font-mono text-foreground-muted">
                      {p.displayOrder}
                    </td>
                    <td className="px-4 py-3 text-body-sm font-mono text-brand-accent">
                      {p.slug}
                    </td>
                    <td className="px-4 py-3 text-body-sm text-foreground">
                      {title.ko ?? ""}
                    </td>
                    <td className="px-4 py-3 text-caption uppercase tracking-[0.08em] text-foreground-muted">
                      {p.tag}
                    </td>
                    <td className="px-4 py-3 text-body-sm">
                      {p.isFeatured ? (
                        <span className="text-success">●</span>
                      ) : (
                        <span className="text-neutral-300">○</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-body-sm text-foreground-muted">
                      {p.eventDate
                        ? new Date(p.eventDate).toLocaleDateString("ko-KR")
                        : "—"}
                    </td>
                    <td className="px-4 py-3 text-body-sm">
                      <div className="flex items-center gap-4">
                        <Link
                          href={`/admin/programs/${p.id}/edit`}
                          className="inline-flex items-center gap-1 text-brand-accent hover:underline"
                        >
                          <Pencil className="h-4 w-4" />
                          편집
                        </Link>
                        <DeleteProgramButton id={p.id} />
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
