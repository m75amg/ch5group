import { db } from "@/lib/db";
import { requireAdminSession } from "@/lib/admin";
import { AdminShell } from "@/components/admin/AdminShell";
import { PageHeader } from "@/components/admin/PageHeader";
import { AudienceRow, type AudienceRowData } from "./AudienceRow";
import { NewAudienceForm } from "./NewAudienceForm";

export const dynamic = "force-dynamic";

interface BiJson {
  ko?: string;
  en?: string;
}

function rowSum(rows: AudienceRowData[]): number {
  return rows.reduce((acc, r) => acc + r.value, 0);
}

export default async function AudienceChartAdminPage() {
  await requireAdminSession();

  const all = await db.audienceData.findMany({
    orderBy: [{ chartType: "asc" }, { displayOrder: "asc" }],
  });

  const toRowData = (records: typeof all): AudienceRowData[] =>
    records.map((r) => {
      const name = (r.name ?? {}) as BiJson;
      return {
        id: r.id,
        chartType: r.chartType,
        nameKo: name.ko ?? "",
        nameEn: name.en ?? "",
        value: r.value,
        displayOrder: r.displayOrder,
      };
    });

  const roleRows = toRowData(all.filter((r) => r.chartType === "ROLE"));
  const industryRows = toRowData(all.filter((r) => r.chartType === "INDUSTRY"));

  const sections = [
    {
      title: "독자 직군 분포 (ROLE)",
      rows: roleRows,
      chartType: "ROLE" as const,
    },
    {
      title: "독자 산업 분포 (INDUSTRY)",
      rows: industryRows,
      chartType: "INDUSTRY" as const,
    },
  ];

  return (
    <AdminShell>
      <PageHeader
        eyebrow="콘텐츠"
        title="독자 분포 차트"
        description="Home MediaSnapshot과 MediaPlatform Audience 섹션의 도넛 차트 데이터입니다. 각 그룹의 합계는 100%가 되도록 관리하세요."
      />

      <div className="mt-8 space-y-12">
        {sections.map((s) => {
          const sum = rowSum(s.rows);
          const nextOrder =
            s.rows.length > 0
              ? Math.max(...s.rows.map((r) => r.displayOrder)) + 1
              : 0;
          return (
            <section key={s.chartType}>
              <div className="flex items-end justify-between gap-4 pb-4 border-b border-border">
                <h2 className="text-h4 text-foreground">{s.title}</h2>
                <p
                  className={`text-caption font-mono ${
                    sum === 100 ? "text-success" : "text-warning"
                  }`}
                >
                  합계 {sum}%
                </p>
              </div>
              <div className="mt-4 space-y-3">
                {s.rows.length === 0 ? (
                  <p className="text-body-sm text-foreground-muted">
                    등록된 항목이 없습니다.
                  </p>
                ) : (
                  s.rows.map((row) => <AudienceRow key={row.id} row={row} />)
                )}
                <NewAudienceForm chartType={s.chartType} nextOrder={nextOrder} />
              </div>
            </section>
          );
        })}
      </div>
    </AdminShell>
  );
}
