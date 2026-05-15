import { getTranslations } from "next-intl/server";

import { Card } from "@/components/ui/Card";
import { SectionWrapper } from "@/components/shared/SectionWrapper";

const CARDS = ["audience", "content", "execution", "partners"] as const;

export async function HomeWhy() {
  const t = await getTranslations("home.why");

  return (
    <SectionWrapper eyebrow={t("eyebrow")} title={t("headline")}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {CARDS.map((key) => (
          <Card key={key} variant="default">
            <h3 className="text-h5 text-foreground">
              {t(`cards.${key}.title`)}
            </h3>
            <p className="mt-3 text-body-sm text-foreground-muted leading-relaxed">
              {t(`cards.${key}.description`)}
            </p>
          </Card>
        ))}
      </div>
    </SectionWrapper>
  );
}
