import { getTranslations } from "next-intl/server";

import { Container } from "@/components/shared/Container";
import { Eyebrow } from "@/components/shared/Eyebrow";

export async function AboutVision() {
  const t = await getTranslations("about.vision");

  return (
    <section className="py-16 md:py-20 lg:py-24">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-5">
            <Eyebrow>{t("eyebrow")}</Eyebrow>
            <h2 className="mt-3 text-h2 tracking-tight text-foreground whitespace-pre-line">
              {t("headline")}
            </h2>
          </div>
          <div className="lg:col-span-7">
            <p className="text-body-lg text-foreground-muted leading-relaxed max-w-prose">
              {t("body")}
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
