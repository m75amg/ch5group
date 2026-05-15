import { getTranslations } from "next-intl/server";

import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/shared/Container";

export async function ServicesCTA() {
  const t = await getTranslations("services.cta");

  return (
    <section className="bg-background-inverse text-foreground-inverse">
      <Container className="py-20 md:py-24 lg:py-28 text-center">
        <h2 className="text-h2 lg:text-[2.5rem] lg:leading-[1.2] tracking-tight max-w-3xl mx-auto whitespace-pre-line">
          {t("headline")}
        </h2>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <Link href="/contact">
            <Button variant="primary" size="lg">
              {t("ctaPrimary")}
            </Button>
          </Link>
          <Link href="/contact?action=media-kit">
            <Button variant="inverse" size="lg">
              {t("ctaSecondary")}
            </Button>
          </Link>
        </div>
      </Container>
    </section>
  );
}
