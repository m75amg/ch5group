import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { AboutIdentity } from "@/components/sections/AboutIdentity";
import { AboutVision } from "@/components/sections/AboutVision";
import { AboutExpertise } from "@/components/sections/AboutExpertise";
import { AboutHistory } from "@/components/sections/AboutHistory";
import { AboutCTA } from "@/components/sections/AboutCTA";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about.meta" });
  return { title: t("title"), description: t("description") };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main>
      <AboutIdentity />
      <AboutVision />
      <AboutExpertise />
      <AboutHistory />
      <AboutCTA />
    </main>
  );
}
