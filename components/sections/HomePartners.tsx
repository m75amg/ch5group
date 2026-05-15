import { getTranslations } from "next-intl/server";
import { ArrowUpRight } from "lucide-react";

import { Link } from "@/i18n/navigation";
import { SectionWrapper } from "@/components/shared/SectionWrapper";

// Placeholder partner identifiers — replace with real partner names/logo SVGs
// once supplied by the operations team.
const PARTNER_PLACEHOLDERS = Array.from({ length: 8 }, (_, i) => `partner-${i + 1}`);

export async function HomePartners() {
  const t = await getTranslations("home.partnersBlock");

  return (
    <SectionWrapper
      tone="muted"
      eyebrow={t("eyebrow")}
      title={t("headline")}
    >
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-px bg-border border border-border rounded-lg overflow-hidden">
        {PARTNER_PLACEHOLDERS.map((id) => (
          <div
            key={id}
            aria-label={`Partner placeholder ${id}`}
            className="aspect-[3/1] flex items-center justify-center bg-background"
          >
            <span className="text-caption uppercase tracking-[0.08em] text-neutral-400">
              Logo
            </span>
          </div>
        ))}
      </div>

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
