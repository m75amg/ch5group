import { getTranslations } from "next-intl/server";

import { Card } from "@/components/ui/Card";
import { SectionWrapper } from "@/components/shared/SectionWrapper";

interface CaseItem {
  type: string;
  title: string;
}

export async function PartnersCases() {
  const t = await getTranslations("partners.cases");
  const items = t.raw("items") as CaseItem[];

  return (
    <SectionWrapper
      tone="muted"
      eyebrow={t("eyebrow")}
      title={t("headline")}
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {items.map((item, idx) => (
          <Card key={idx} variant="default" className="!p-6">
            <p className="text-caption uppercase tracking-[0.08em] text-brand-accent font-mono">
              {item.type}
            </p>
            <p className="mt-3 text-h5 text-foreground">{item.title}</p>
          </Card>
        ))}
      </div>
      <p className="mt-6 text-caption text-foreground-muted">
        {t("disclaimer")}
      </p>
    </SectionWrapper>
  );
}
