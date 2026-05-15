import { getTranslations } from "next-intl/server";

import { Card } from "@/components/ui/Card";
import { SectionWrapper } from "@/components/shared/SectionWrapper";
import { DonutChart } from "./HomeMediaSnapshotChart";

export async function MediaPlatformAudience() {
  const t = await getTranslations("mediaPlatform.audience");
  const tHome = await getTranslations("home.mediaSnapshot");

  // Reuse placeholder distribution from Home snapshot — to be replaced by operations data
  const audienceData = [
    { name: tHome("audienceItems.rd"), value: 45 },
    { name: tHome("audienceItems.decision"), value: 20 },
    { name: tHome("audienceItems.marketing"), value: 15 },
    { name: tHome("audienceItems.academia"), value: 10 },
    { name: tHome("audienceItems.other"), value: 10 },
  ];
  const industryData = [
    { name: tHome("industryItems.semiconductor"), value: 30 },
    { name: tHome("industryItems.embedded"), value: 25 },
    { name: tHome("industryItems.automotive"), value: 20 },
    { name: tHome("industryItems.automation"), value: 15 },
    { name: tHome("industryItems.other"), value: 10 },
  ];

  return (
    <SectionWrapper
      tone="muted"
      eyebrow={t("eyebrow")}
      title={t("headline")}
      description={t("body")}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card variant="default">
          <h3 className="text-h5 text-foreground">{t("roleChartLabel")}</h3>
          <div className="mt-4">
            <DonutChart
              data={audienceData}
              ariaLabel={t("roleChartLabel")}
            />
          </div>
        </Card>
        <Card variant="default">
          <h3 className="text-h5 text-foreground">{t("industryChartLabel")}</h3>
          <div className="mt-4">
            <DonutChart
              data={industryData}
              ariaLabel={t("industryChartLabel")}
            />
          </div>
        </Card>
      </div>
      <p className="mt-6 text-caption text-foreground-muted">
        {t("disclaimer")}
      </p>
    </SectionWrapper>
  );
}
