import { getTranslations } from "next-intl/server";

import { Container } from "@/components/shared/Container";
import { Eyebrow } from "@/components/shared/Eyebrow";

export async function PartnersIntro() {
  const t = await getTranslations("partners.intro");

  return (
    <section className="bg-background-inverse text-foreground-inverse">
      <Container className="pt-20 pb-16 md:pt-24 md:pb-20 lg:pt-32 lg:pb-24">
        <div className="max-w-3xl">
          <Eyebrow tone="inverse">{t("eyebrow")}</Eyebrow>
          <h1 className="mt-4 text-[2.25rem] leading-[1.15] tracking-[-0.02em] font-bold lg:text-display-2">
            {t("headline")}
          </h1>
          <p className="mt-6 text-body-lg text-neutral-300 leading-relaxed">
            {t("body")}
          </p>
        </div>
      </Container>
    </section>
  );
}
