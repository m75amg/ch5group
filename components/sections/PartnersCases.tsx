import { getLocale, getTranslations } from "next-intl/server";

import { Card } from "@/components/ui/Card";
import { SectionWrapper } from "@/components/shared/SectionWrapper";
import { getPublishedCases, type Locale } from "@/lib/site-data";

export async function PartnersCases() {
  const locale = (await getLocale()) as Locale;
  const t = await getTranslations("partners.cases");
  const items = await getPublishedCases(locale);

  return (
    <SectionWrapper tone="muted" eyebrow={t("eyebrow")} title={t("headline")}>
      {items.length === 0 ? (
        <p className="text-body text-foreground-muted">
          등록된 사례가 없습니다.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {items.map((c) => (
            <Card key={c.id} variant="default" className="!p-6">
              <p className="text-caption uppercase tracking-[0.08em] text-brand-accent font-mono">
                {c.type}
              </p>
              <p className="mt-3 text-h5 text-foreground">{c.title}</p>
              {c.partnerName ? (
                <p className="mt-2 text-body-sm text-foreground-muted">
                  {c.partnerName}
                </p>
              ) : null}
            </Card>
          ))}
        </div>
      )}
      <p className="mt-6 text-caption text-foreground-muted">
        {t("disclaimer")}
      </p>
    </SectionWrapper>
  );
}
