import { getTranslations } from "next-intl/server";

import { SectionWrapper } from "@/components/shared/SectionWrapper";
import { getPublishedPartners, type SitePartner } from "@/lib/site-data";

const CATEGORY_ORDER = [
  "SEMICONDUCTOR",
  "DISTRIBUTION",
  "MEASUREMENT",
  "EMBEDDED",
  "EDUCATION",
] as const;

const CATEGORY_KEY: Record<string, string> = {
  SEMICONDUCTOR: "semiconductor",
  DISTRIBUTION: "distribution",
  MEASUREMENT: "measurement",
  EMBEDDED: "embedded",
  EDUCATION: "education",
};

export async function PartnersCategories() {
  const t = await getTranslations("partners.categories");
  const partners = await getPublishedPartners();

  const grouped = new Map<SitePartner["category"], SitePartner[]>();
  for (const c of CATEGORY_ORDER) grouped.set(c, []);
  for (const p of partners) grouped.get(p.category)?.push(p);

  return (
    <SectionWrapper tone="muted" eyebrow={t("eyebrow")}>
      <div className="flex flex-col gap-10">
        {CATEGORY_ORDER.map((cat) => {
          const items = grouped.get(cat) ?? [];
          return (
            <div key={cat}>
              <h3 className="text-h5 text-foreground">
                {t(`items.${CATEGORY_KEY[cat]}`)}
              </h3>
              {items.length === 0 ? (
                <p className="mt-4 text-body-sm text-foreground-muted italic">
                  등록된 파트너 없음
                </p>
              ) : (
                <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-px bg-border border border-border rounded-lg overflow-hidden">
                  {items.map((p) => (
                    <div
                      key={p.id}
                      aria-label={p.name}
                      className="aspect-[3/1] flex items-center justify-center bg-background"
                    >
                      {p.logoPath && !p.logoPath.includes("placeholder") ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={p.logoPath}
                          alt={p.name}
                          className="max-h-10 max-w-24 object-contain"
                        />
                      ) : (
                        <span className="text-caption uppercase tracking-[0.08em] text-neutral-400">
                          {p.name}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
      <p className="mt-8 text-caption text-foreground-muted">
        {t("disclaimer")}
      </p>
    </SectionWrapper>
  );
}
