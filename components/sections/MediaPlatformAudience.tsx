import { getLocale, getTranslations } from "next-intl/server";

import { Card } from "@/components/ui/Card";
import { SectionWrapper } from "@/components/shared/SectionWrapper";
import { getAudienceData, type Locale } from "@/lib/site-data";
import { DonutChart } from "./HomeMediaSnapshotChart";

export async function MediaPlatformAudience() {
  const locale = (await getLocale()) as Locale;
  const t = await getTranslations("mediaPlatform.audience");
  const { role: audienceData, industry: industryData } =
    await getAudienceData(locale);

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
