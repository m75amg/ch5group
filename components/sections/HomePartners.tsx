import { getTranslations } from "next-intl/server";
import { ArrowUpRight } from "lucide-react";

import { Link } from "@/i18n/navigation";
import { SectionWrapper } from "@/components/shared/SectionWrapper";
import { getPublishedPartners } from "@/lib/site-data";

export async function HomePartners() {
  const t = await getTranslations("home.partnersBlock");
  const partners = await getPublishedPartners(8);

  return (
    <SectionWrapper tone="muted" eyebrow={t("eyebrow")} title={t("headline")}>
      {partners.length === 0 ? (
        <p className="text-body text-foreground-muted">
          등록된 파트너가 없습니다.
        </p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-px bg-border border border-border rounded-lg overflow-hidden">
          {partners.map((p) => (
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
                  className="max-h-12 max-w-32 object-contain"
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

      <div className="mt-10">
        <Link
          href="/partners"
          className="inline-flex items-center gap-1 text-button text-brand-accent hover:text-brand-accent-hover transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent focus-visible:ring-offset-2 rounded"
        >
          {t("cta")}
          <ArrowUpRight className="h-4 w-4" />
        </Link>
      </div>
    </SectionWrapper>
  );
}
