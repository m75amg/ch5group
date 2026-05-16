import Link from "next/link";
import { Plus, Pencil } from "lucide-react";

import { db } from "@/lib/db";
import { requireAdminSession } from "@/lib/admin";
import { AdminShell } from "@/components/admin/AdminShell";
import { PageHeader } from "@/components/admin/PageHeader";
import { Button } from "@/components/ui/Button";
import { DeletePartnerButton } from "./DeletePartnerButton";

export const dynamic = "force-dynamic";

const CATEGORY_LABEL: Record<string, string> = {
  SEMICONDUCTOR: "글로벌 반도체 기업",
  DISTRIBUTION: "전자부품 유통",
  MEASUREMENT: "계측·테스트",
  EMBEDDED: "임베디드 / 소프트웨어",
  EDUCATION: "교육 기관 / 협회",
};

export default async function PartnersAdminPage() {
  await requireAdminSession();
  const partners = await db.partner.findMany({
    orderBy: [{ category: "asc" }, { displayOrder: "asc" }],
  });

  return (
    <AdminShell>
      <PageHeader
        eyebrow="콘텐츠"
        title="파트너"
        description="Home Partners 섹션과 Partners 페이지의 카테고리별 로고 그리드에 노출됩니다. 공개 체크된 로고만 사이트에 나타납니다."
        actions={
          <Link href="/admin/partners/new">
            <Button size="sm">
              <Plus className="h-4 w-4 mr-1" />새 파트너
            </Button>
          </Link>
        }
      />

      <div className="mt-8 overflow-x-auto rounded-lg border border-border bg-background">
        <table className="min-w-full divide-y divide-border">
          <thead className="bg-background-muted">
            <tr>
              {["로고", "회사명", "카테고리", "순서", "공개", "동의일", "관리"].map(
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
            {partners.length === 0 ? (
              <tr>
                <td
                  colSpan={7}
                  className="px-4 py-12 text-center text-body-sm text-foreground-muted"
                >
                  등록된 파트너가 없습니다.
                </td>
              </tr>
            ) : (
              partners.map((p) => (
                <tr key={p.id} className="hover:bg-background-muted">
                  <td className="px-4 py-3">
                    <div className="h-10 w-20 rounded bg-background-muted border border-border overflow-hidden flex items-center justify-center">
                      {p.logoPath.includes("placeholder") ? (
                        <span className="text-caption text-foreground-muted">
                          ●
                        </span>
                      ) : (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={p.logoPath}
                          alt={p.name}
                          className="max-h-8 max-w-16 object-contain"
                        />
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-body-sm text-foreground">
                    {p.name}
                  </td>
                  <td className="px-4 py-3 text-body-sm text-foreground-muted">
                    {CATEGORY_LABEL[p.category]}
                  </td>
                  <td className="px-4 py-3 text-body-sm font-mono text-foreground-muted">
                    {p.displayOrder}
                  </td>
                  <td className="px-4 py-3 text-body-sm">
                    {p.isPublished ? (
                      <span className="text-success">●</span>
                    ) : (
                      <span className="text-neutral-300">○</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-caption font-mono text-foreground-muted">
                    {p.consentDate
                      ? new Date(p.consentDate).toLocaleDateString("ko-KR")
                      : "—"}
                  </td>
                  <td className="px-4 py-3 text-body-sm">
                    <div className="flex items-center gap-4">
                      <Link
                        href={`/admin/partners/${p.id}/edit`}
                        className="inline-flex items-center gap-1 text-brand-accent hover:underline"
                      >
                        <Pencil className="h-4 w-4" />
                        편집
                      </Link>
                      <DeletePartnerButton id={p.id} />
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </AdminShell>
  );
}
