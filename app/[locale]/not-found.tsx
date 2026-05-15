import { getTranslations } from "next-intl/server";

import { Button } from "@/components/ui/Button";
import { Container } from "@/components/shared/Container";

export default async function NotFoundPage() {
  const t = await getTranslations("notFound");

  return (
    <main className="bg-background-inverse text-foreground-inverse min-h-screen flex items-center">
      <Container className="py-24 lg:py-32">
        <p className="text-display-2 text-brand-accent font-mono">404</p>
        <h1 className="text-h1 mt-6 tracking-tight">{t("headline")}</h1>
        <p className="text-body-lg text-neutral-300 mt-4 max-w-prose">
          {t("description")}
        </p>
        <div className="mt-10 flex flex-wrap gap-3">
          <Button variant="primary" size="lg">
            {t("ctaPrimary")}
          </Button>
          <Button variant="inverse" size="lg">
            {t("ctaSecondary")}
          </Button>
        </div>
      </Container>
    </main>
  );
}
