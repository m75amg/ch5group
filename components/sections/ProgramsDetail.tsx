import { getTranslations } from "next-intl/server";

import { SectionWrapper } from "@/components/shared/SectionWrapper";

const ITEMS = [
  "physicalAI",
  "techDay",
  "analogDay",
  "challenge",
  "education",
] as const;

export async function ProgramsDetail() {
  const t = await getTranslations("programs.items");

  return (
    <SectionWrapper tone="muted">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {ITEMS.map((key, idx) => (
          <article
            key={key}
            id={key}
            className="scroll-mt-24 flex flex-col rounded-lg overflow-hidden bg-background border border-border hover:border-border-strong transition-colors"
          >
            <div
              aria-hidden="true"
              className="aspect-[16/10] bg-gradient-to-br from-neutral-100 to-neutral-200 relative"
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_70%,rgba(30,99,255,0.16),transparent_55%)]" />
              <p className="absolute top-4 left-4 text-caption uppercase tracking-[0.08em] text-brand-accent font-mono">
                {String(idx + 1).padStart(2, "0")} · {t(`${key}.tag`)}
              </p>
            </div>
            <div className="flex flex-col grow p-6">
              <h2 className="text-h4 text-foreground">{t(`${key}.title`)}</h2>
              <p className="mt-2 text-body-sm text-brand-accent">
                {t(`${key}.tagline`)}
              </p>
              <p className="mt-4 text-body-sm text-foreground-muted leading-relaxed">
                {t(`${key}.body`)}
              </p>
            </div>
          </article>
        ))}
      </div>
    </SectionWrapper>
  );
}
