import { getTranslations } from "next-intl/server";

import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/shared/Container";

export async function HomeContactCTA() {
  const t = await getTranslations("home.contactCTA");

  return (
    <section className="bg-background-inverse text-foreground-inverse">
      <Container className="py-20 md:py-24 lg:py-32 text-center">
        <h2 className="text-h2 lg:text-[2.75rem] lg:leading-[1.2] tracking-tight max-w-3xl mx-auto">
          {t("headline")}
        </h2>
        <p className="mt-6 text-body-lg text-neutral-300 max-w-2xl mx-auto">
          {t("description")}
        </p>
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
