import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { ServicesIntro } from "@/components/sections/ServicesIntro";
import { ServicesDetail } from "@/components/sections/ServicesDetail";
import { ServicesIntegrated } from "@/components/sections/ServicesIntegrated";
import { ServicesCTA } from "@/components/sections/ServicesCTA";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "services.meta" });
  return { title: t("title"), description: t("description") };
}

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main>
      <ServicesIntro />
      <ServicesDetail />
      <ServicesIntegrated />
      <ServicesCTA />
    </main>
  );
}
