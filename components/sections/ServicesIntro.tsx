import { getTranslations } from "next-intl/server";

import { Container } from "@/components/shared/Container";
import { Eyebrow } from "@/components/shared/Eyebrow";

const ANCHOR_KEYS = [
  "banner",
  "newsletter",
  "webinar",
  "conference",
  "contest",
  "education",
] as const;

export async function ServicesIntro() {
  const t = await getTranslations("services");

  return (
    <section className="bg-background-inverse text-foreground-inverse">
      <Container className="pt-20 pb-16 md:pt-24 md:pb-20 lg:pt-32 lg:pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12">
          <div className="lg:col-span-8">
            <Eyebrow tone="inverse">{t("intro.eyebrow")}</Eyebrow>
            <h1 className="mt-4 text-[2.25rem] leading-[1.15] tracking-[-0.02em] font-bold lg:text-display-2">
              {t("intro.headline")}
            </h1>
            <p className="mt-6 text-body-lg text-neutral-300 max-w-2xl leading-relaxed">
              {t("intro.body")}
            </p>
          </div>
          <nav
            aria-label={t("intro.anchorLabel")}
            className="lg:col-span-4 lg:pt-4"
          >
            <p className="text-caption uppercase tracking-[0.08em] text-neutral-400">
              {t("intro.anchorLabel")}
            </p>
            <ul className="mt-3 flex flex-col gap-1">
              {ANCHOR_KEYS.map((key) => (
                <li key={key}>
                  <a
                    href={`#${key}`}
                    className="inline-flex items-center justify-between gap-3 w-full px-3 py-2 rounded-md text-button text-neutral-200 hover:text-foreground-inverse hover:bg-white/5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background-inverse"
                  >
                    <span>{t(`items.${key}.title`)}</span>
                    <span aria-hidden="true" className="text-neutral-500">
                      →
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </Container>
    </section>
  );
}
