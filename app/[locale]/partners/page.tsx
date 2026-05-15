import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { PartnersIntro } from "@/components/sections/PartnersIntro";
import { PartnersCategories } from "@/components/sections/PartnersCategories";
import { PartnersCollaboration } from "@/components/sections/PartnersCollaboration";
import { PartnersCases } from "@/components/sections/PartnersCases";
import { PartnersCTA } from "@/components/sections/PartnersCTA";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "partners.meta" });
  return { title: t("title"), description: t("description") };
}

export default async function PartnersPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main>
      <PartnersIntro />
      <PartnersCategories />
      <PartnersCollaboration />
      <PartnersCases />
      <PartnersCTA />
    </main>
  );
}
