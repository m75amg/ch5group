import { getTranslations } from "next-intl/server";

import { Card } from "@/components/ui/Card";
import { SectionWrapper } from "@/components/shared/SectionWrapper";

const ITEMS = [
  "semiconductor",
  "embedded",
  "automotive",
  "ai",
  "power",
  "automation",
] as const;

export async function AboutExpertise() {
  const t = await getTranslations("about.expertise");

  return (
    <SectionWrapper
      tone="muted"
      eyebrow={t("eyebrow")}
      title={t("headline")}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {ITEMS.map((key) => (
          <Card key={key} variant="default">
            <h3 className="text-h5 text-foreground">
              {t(`items.${key}.title`)}
            </h3>
            <p className="mt-3 text-body-sm text-foreground-muted leading-relaxed">
              {t(`items.${key}.description`)}
            </p>
          </Card>
        ))}
      </div>
    </SectionWrapper>
  );
}
