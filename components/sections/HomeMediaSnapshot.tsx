import { getLocale, getTranslations } from "next-intl/server";
import { ArrowUpRight } from "lucide-react";

import { Link } from "@/i18n/navigation";
import { Card } from "@/components/ui/Card";
import { SectionWrapper } from "@/components/shared/SectionWrapper";
import { getAudienceData, type Locale } from "@/lib/site-data";
import { DonutChart } from "./HomeMediaSnapshotChart";

export async function HomeMediaSnapshot() {
  const locale = (await getLocale()) as Locale;
  const t = await getTranslations("home.mediaSnapshot");
  const { role: audienceData, industry: industryData } =
    await getAudienceData(locale);

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
