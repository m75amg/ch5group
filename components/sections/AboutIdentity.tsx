import { getTranslations } from "next-intl/server";

import { Container } from "@/components/shared/Container";
import { Eyebrow } from "@/components/shared/Eyebrow";

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <p className="text-display-2 lg:text-[3rem] font-semibold tracking-tight text-foreground-inverse">
        {value}
      </p>
      <p className="mt-2 text-body-sm text-neutral-400">{label}</p>
    </div>
  );
}

export async function AboutIdentity() {
  const t = await getTranslations("about.identity");

  return (
    <section className="bg-background-inverse text-foreground-inverse">
      <Container className="pt-20 pb-16 md:pt-24 md:pb-20 lg:pt-32 lg:pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          <div className="lg:col-span-7">
            <Eyebrow tone="inverse">{t("eyebrow")}</Eyebrow>
            <h1 className="mt-4 text-[2.25rem] leading-[1.15] tracking-[-0.02em] font-bold lg:text-display-2 whitespace-pre-line">
              {t("headline")}
            </h1>
            <p className="mt-6 text-body-lg text-neutral-300 max-w-2xl leading-relaxed">
              {t("body")}
            </p>
          </div>
          <div className="lg:col-span-5">
            <figure className="relative aspect-[4/3] rounded-xl overflow-hidden border border-white/10 bg-gradient-to-br from-neutral-800 via-neutral-900 to-background-inverse">
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(30,99,255,0.18),transparent_55%)]"
              />
              <figcaption className="absolute bottom-3 right-4 text-caption uppercase tracking-[0.08em] text-neutral-300">
                {t("imageCaption")}
              </figcaption>
            </figure>
          </div>
        </div>

        <div className="mt-16 lg:mt-20 grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-12 border-t border-white/10 pt-10 lg:pt-12">
          <Stat
            value={t("stats.yearsValue")}
            label={t("stats.yearsLabel")}
          />
          <Stat
            value={t("stats.audienceValue")}
            label={t("stats.audienceLabel")}
          />
          <Stat
            value={t("stats.partnersValue")}
            label={t("stats.partnersLabel")}
          />
          <Stat
            value={t("stats.eventsValue")}
            label={t("stats.eventsLabel")}
          />
        </div>
      </Container>
    </section>
  );
}
