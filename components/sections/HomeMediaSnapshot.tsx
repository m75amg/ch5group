import { getTranslations } from "next-intl/server";
import { ArrowUpRight } from "lucide-react";

import { Link } from "@/i18n/navigation";
import { Card } from "@/components/ui/Card";
import { SectionWrapper } from "@/components/shared/SectionWrapper";
import { DonutChart } from "./HomeMediaSnapshotChart";

export async function HomeMediaSnapshot() {
  const t = await getTranslations("home.mediaSnapshot");

  // Placeholder distribution — replace with operations-team data
  const audienceData = [
    { name: t("audienceItems.rd"), value: 45 },
    { name: t("audienceItems.decision"), value: 20 },
    { name: t("audienceItems.marketing"), value: 15 },
    { name: t("audienceItems.academia"), value: 10 },
    { name: t("audienceItems.other"), value: 10 },
  ];
  const industryData = [
    { name: t("industryItems.semiconductor"), value: 30 },
    { name: t("industryItems.embedded"), value: 25 },
    { name: t("industryItems.automotive"), value: 20 },
    { name: t("industryItems.automation"), value: 15 },
    { name: t("industryItems.other"), value: 10 },
  ];

  return (
    <SectionWrapper
      eyebrow={t("eyebrow")}
      title={t("headline")}
      description={t("description")}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card variant="muted">
          <h3 className="text-h5 text-foreground">{t("audienceLabel")}</h3>
          <div className="mt-4">
            <DonutChart data={audienceData} ariaLabel={t("audienceLabel")} />
          </div>
        </Card>
        <Card variant="muted">
          <h3 className="text-h5 text-foreground">{t("industryLabel")}</h3>
          <div className="mt-4">
            <DonutChart data={industryData} ariaLabel={t("industryLabel")} />
          </div>
        </Card>
      </div>

      <p className="mt-6 text-caption text-foreground-muted">
        {t("placeholderNote")}
      </p>

      <div className="mt-8">
        <Link
          href="/media-platform"
          className="inline-flex items-center gap-1 text-button text-brand-accent hover:text-brand-accent-hover transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent focus-visible:ring-offset-2 rounded"
        >
          {t("cta")}
          <ArrowUpRight className="h-4 w-4" />
        </Link>
      </div>
    </SectionWrapper>
  );
}
