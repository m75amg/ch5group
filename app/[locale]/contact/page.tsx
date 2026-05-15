import { Suspense } from "react";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { Container } from "@/components/shared/Container";
import { ContactSidebar } from "@/components/sections/ContactSidebar";
import { ContactForm } from "@/components/sections/ContactForm";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contact.meta" });
  return { title: t("title"), description: t("description") };
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main className="bg-background">
      <div className="grid grid-cols-1 lg:grid-cols-12">
        <div className="lg:col-span-4 xl:col-span-3">
          <ContactSidebar />
        </div>
        <div className="lg:col-span-8 xl:col-span-9">
          <Container className="py-16 lg:py-20">
            <Suspense fallback={null}>
              <ContactForm />
            </Suspense>
          </Container>
        </div>
      </div>
    </main>
  );
}
