import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Inter, JetBrains_Mono } from "next/font/google";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { setRequestLocale, getTranslations } from "next-intl/server";

import { routing, type Locale } from "@/i18n/routing";
import { SITE_URL, SITE_NAME_EN, SITE_NAME_KO } from "@/lib/site";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Analytics } from "@/components/layout/Analytics";
import { CookieBanner } from "@/components/layout/CookieBanner";
import { FloatingCTA } from "@/components/layout/FloatingCTA";

import "../globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
  weight: ["400", "500"],
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "home.meta" });
  const siteName = locale === "ko" ? SITE_NAME_KO : SITE_NAME_EN;
  const ogLocale = locale === "ko" ? "ko_KR" : "en_US";
  const titleTemplate = locale === "ko"
    ? `%s | ${SITE_NAME_KO}`
    : `%s | ${SITE_NAME_EN}`;

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: t("title"),
      template: titleTemplate,
    },
    description: t("description"),
    alternates: {
      canonical: `${SITE_URL}/${locale}`,
      languages: {
        ko: `${SITE_URL}/ko`,
        en: `${SITE_URL}/en`,
        "x-default": `${SITE_URL}/ko`,
      },
    },
    openGraph: {
      type: "website",
      locale: ogLocale,
      alternateLocale: locale === "ko" ? ["en_US"] : ["ko_KR"],
      siteName,
      url: `${SITE_URL}/${locale}`,
      title: t("title"),
      description: t("description"),
      images: [
        {
          url: `${SITE_URL}/images/og/default.png`,
          width: 1200,
          height: 630,
          alt: siteName,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("description"),
      images: [`${SITE_URL}/images/og/default.png`],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
      },
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale as Locale);

  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: locale === "ko" ? SITE_NAME_KO : SITE_NAME_EN,
    legalName:
      locale === "ko" ? "주식회사 채널5코리아" : "Channel5 Korea, Inc.",
    url: SITE_URL,
    logo: `${SITE_URL}/images/og/default.png`,
    sameAs: [
      "https://www.e4ds.com",
      "https://webinar.e4ds.com",
      "https://make.e4ds.com",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      email: "partnership@channel5korea.com",
      contactType: "sales",
      availableLanguage: ["Korean", "English"],
    },
  };

  return (
    <html
      lang={locale}
      className={`${inter.variable} ${jetbrainsMono.variable}`}
    >
      <body className="flex min-h-screen flex-col">
        <NextIntlClientProvider>
          <Header />
          <div className="flex-1">{children}</div>
          <Footer />
          <FloatingCTA />
          <CookieBanner />
        </NextIntlClientProvider>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd),
          }}
        />
        <Analytics />
      </body>
    </html>
  );
}
