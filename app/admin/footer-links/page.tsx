import { db } from "@/lib/db";
import { requireAdminSession } from "@/lib/admin";
import { AdminShell } from "@/components/admin/AdminShell";
import { PageHeader } from "@/components/admin/PageHeader";
import { FooterLinkRow } from "./FooterLinkRow";
import { NewFooterLinkForm } from "./NewFooterLinkForm";

export const dynamic = "force-dynamic";

export default async function FooterLinksAdminPage() {
  await requireAdminSession();

  const links = await db.footerLink.findMany({
    orderBy: { displayOrder: "asc" },
  });

  const nextOrder = links.length > 0
    ? Math.max(...links.map((l) => l.displayOrder)) + 1
    : 0;

  return (
    <AdminShell>
      <PageHeader
        eyebrow="회사 정보"
        title="운영 플랫폼 링크"
        description="Footer 운영 플랫폼 컬럼에 노출되는 외부 링크 목록입니다. e4ds.com / Webinar / Make / KMAP 등."
      />

      <div className="mt-8 space-y-4">
        {links.map((link) => (
          <FooterLinkRow
            key={link.id}
            link={{
              id: link.id,
              label: link.label,
              url: link.url,
              isExternal: link.isExternal,
              displayOrder: link.displayOrder,
            }}
          />
        ))}
        <NewFooterLinkForm nextOrder={nextOrder} />
      </div>
    </AdminShell>
  );
}
