import { getTranslations } from "next-intl/server";

import { SectionWrapper } from "@/components/shared/SectionWrapper";

const CATEGORIES = [
  "semiconductor",
  "distribution",
  "measurement",
  "embedded",
  "education",
] as const;

export async function PartnersCategories() {
  const t = await getTranslations("partners.categories");

  return (
    <SectionWrapper tone="muted" eyebrow={t("eyebrow")}>
      <div className="flex flex-col gap-10">
        {CATEGORIES.map((key) => (
          <div key={key}>
            <h3 className="text-h5 text-foreground">{t(`items.${key}`)}</h3>
            <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-px bg-border border border-border rounded-lg overflow-hidden">
              {Array.from({ length: 6 }, (_, i) => (
                <div
                  key={i}
                  aria-label={`${t(`items.${key}`)} ${t("logoPlaceholder")}`}
                  className="aspect-[3/1] flex items-center justify-center bg-background"
                >
                  <span className="text-caption uppercase tracking-[0.08em] text-neutral-400">
                    {t("logoPlaceholder")}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <p className="mt-8 text-caption text-foreground-muted">
        {t("disclaimer")}
      </p>
    </SectionWrapper>
  );
}
