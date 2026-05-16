import { db } from "@/lib/db";
import { requireAdminSession } from "@/lib/admin";
import { AdminShell } from "@/components/admin/AdminShell";
import { PageHeader } from "@/components/admin/PageHeader";
import { StatRow, type StatRowData } from "./StatRow";

export const dynamic = "force-dynamic";

interface LabelJson {
  ko?: string;
  en?: string;
}

export default async function StatsAdminPage() {
  await requireAdminSession();

  const stats = await db.stat.findMany({ orderBy: { displayOrder: "asc" } });

  const rows: StatRowData[] = stats.map((s) => {
    const label = (s.label ?? {}) as LabelJson;
    return {
      key: s.key,
      value: s.value,
      labelKo: label.ko ?? "",
      labelEn: label.en ?? "",
      displayOrder: s.displayOrder,
    };
  });

  return (
    <AdminShell>
      <PageHeader
        eyebrow="콘텐츠"
        title="통계 수치"
        description="Home Hero와 About Identity 섹션에 노출되는 4개 통계입니다. Key는 변경할 수 없으며 사이트 코드에서 참조됩니다."
      />

      <div className="mt-8 space-y-4">
        {rows.length === 0 ? (
          <p className="text-body text-foreground-muted">
            등록된 통계가 없습니다. `pnpm db:seed`를 실행해 초기 데이터를
            적재하세요.
          </p>
        ) : (
          rows.map((stat) => <StatRow key={stat.key} stat={stat} />)
        )}
      </div>
    </AdminShell>
  );
}
