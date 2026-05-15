import { getTranslations } from "next-intl/server";

import { Card } from "@/components/ui/Card";
import { SectionWrapper } from "@/components/shared/SectionWrapper";

const ITEMS = ["keynote", "session", "booth", "sponsor", "cohost"] as const;

export async function ProgramsSponsorship() {
  const t = await getTranslations("programs.sponsorship");

  return (
    <SectionWrapper eyebrow={t("eyebrow")} title={t("headline")}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        {ITEMS.map((key, idx) => (
          <Card key={key} variant="default" className="!p-6">
            <p className="text-caption font-mono text-brand-accent">
              {String(idx + 1).padStart(2, "0")}
            </p>
            <h3 className="text-h5 text-foreground mt-3">
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
