import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { MediaPlatformIntro } from "@/components/sections/MediaPlatformIntro";
import { MediaPlatformAudience } from "@/components/sections/MediaPlatformAudience";
import { MediaPlatformContent } from "@/components/sections/MediaPlatformContent";
import { MediaPlatformJourney } from "@/components/sections/MediaPlatformJourney";
import { MediaPlatformCTA } from "@/components/sections/MediaPlatformCTA";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "mediaPlatform.meta" });
  return { title: t("title"), description: t("description") };
}

export default async function MediaPlatformPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main>
      <MediaPlatformIntro />
      <MediaPlatformAudience />
      <MediaPlatformContent />
      <MediaPlatformJourney />
      <MediaPlatformCTA />
    </main>
  );
}
