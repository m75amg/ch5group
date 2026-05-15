import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { ProgramsIntro } from "@/components/sections/ProgramsIntro";
import { ProgramsDetail } from "@/components/sections/ProgramsDetail";
import { ProgramsSponsorship } from "@/components/sections/ProgramsSponsorship";
import { ProgramsCTA } from "@/components/sections/ProgramsCTA";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "programs.meta" });
  return { title: t("title"), description: t("description") };
}

export default async function ProgramsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main>
      <ProgramsIntro />
      <ProgramsDetail />
      <ProgramsSponsorship />
      <ProgramsCTA />
    </main>
  );
}
