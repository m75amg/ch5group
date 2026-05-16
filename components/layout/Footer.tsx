import { getLocale, getTranslations } from "next-intl/server";

import { Link } from "@/i18n/navigation";
import { Container } from "@/components/shared/Container";
import {
  getContactInfo,
  getFooterLinks,
  type Locale,
} from "@/lib/site-data";
import { Logo } from "./Logo";

interface FooterLink {
  label: string;
  href: string;
  external?: boolean;
}

interface ContactRow {
  label: string;
  value: string;
  href?: string;
}

const linkClass =
  "text-body-sm text-neutral-300 hover:text-foreground-inverse hover:underline underline-offset-4 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background-inverse rounded";

function FooterColumn({
  heading,
  items,
}: {
  heading: string;
  items: FooterLink[];
}) {
  return (
    <div>
      <h3 className="text-eyebrow uppercase text-neutral-400">{heading}</h3>
      <ul className="mt-4 space-y-3">
        {items.map((item) => (
          <li key={item.href + item.label}>
            {item.external ? (
              <a
                href={item.href}
                target="_blank"
                rel="noreferrer noopener"
                className={linkClass}
              >
                {item.label}
              </a>
            ) : (
              <Link href={item.href} className={linkClass}>
                {item.label}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export async function Footer() {
  const locale = (await getLocale()) as Locale;
  const tFooter = await getTranslations("footer");
  const tServices = await getTranslations("footer.servicesLinks");
  const tCompany = await getTranslations("nav");
  const tContact = await getTranslations("footer.contactInfo");
  const tLegal = await getTranslations("footer.legalLinks");

  const [platformsDb, contactDb] = await Promise.all([
    getFooterLinks(),
    getContactInfo(locale),
  ]);

  const services: FooterLink[] = [
    { label: tServices("banner"), href: "/services#banner" },
    { label: tServices("newsletter"), href: "/services#newsletter" },
    { label: tServices("webinar"), href: "/services#webinar" },
    { label: tServices("conference"), href: "/services#conference" },
    { label: tServices("contest"), href: "/services#contest" },
    { label: tServices("education"), href: "/services#education" },
  ];

  const company: FooterLink[] = [
    { label: tCompany("about"), href: "/about" },
    { label: tCompany("mediaPlatform"), href: "/media-platform" },
    { label: tCompany("programs"), href: "/programs" },
    { label: tCompany("partners"), href: "/partners" },
    { label: tCompany("contact"), href: "/contact" },
  ];

  const platforms: FooterLink[] = platformsDb.map((p) => ({
    label: p.label,
    href: p.url,
    external: p.isExternal,
  }));

  const contactRows: ContactRow[] = contactDb
    ? [
        { label: tContact("addressLabel"), value: contactDb.address },
        {
          label: tContact("emailLabel"),
          value: contactDb.email,
          href: `mailto:${contactDb.email}`,
        },
        {
          label: tContact("phoneLabel"),
          value: contactDb.phone,
          href: `tel:${contactDb.phone.replace(/[^+\d]/g, "")}`,
        },
        { label: tContact("hoursLabel"), value: contactDb.hours },
      ]
    : [];

  return (
    <footer className="bg-background-inverse text-foreground-inverse">
      <Container className="py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12">
          <div className="lg:col-span-4">
            <Logo tone="inverse" />
            <p className="mt-4 text-body-sm text-neutral-300 max-w-sm">
              {tFooter("aboutDescription")}
            </p>
          </div>

          <div className="lg:col-span-2">
            <FooterColumn
              heading={tFooter("servicesHeading")}
              items={services}
            />
          </div>
          <div className="lg:col-span-2">
            <FooterColumn
              heading={tFooter("companyHeading")}
              items={company}
            />
          </div>
          <div className="lg:col-span-2">
            <FooterColumn
              heading={tFooter("platformsHeading")}
              items={platforms}
            />
          </div>

          <div className="lg:col-span-2">
            <h3 className="text-eyebrow uppercase text-neutral-400">
              {tFooter("contactHeading")}
            </h3>
            <ul className="mt-4 space-y-3">
              {contactRows.map((row) => (
                <li key={row.label}>
                  <p className="text-caption uppercase tracking-[0.04em] text-neutral-500">
                    {row.label}
                  </p>
                  {row.href ? (
                    <a href={row.href} className={linkClass}>
                      {row.value}
                    </a>
                  ) : (
                    <p className="text-body-sm text-neutral-300 leading-relaxed">
                      {row.value}
                    </p>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>

      <div className="border-t border-white/10">
        <Container className="flex flex-col-reverse md:flex-row md:items-center md:justify-between gap-4 py-6">
          <p className="text-body-sm text-neutral-400">
            {tFooter("copyright")}
          </p>
          <ul className="flex flex-wrap items-center gap-4 md:gap-6">
            <li>
              <Link href="/privacy" className={linkClass}>
                {tLegal("privacy")}
              </Link>
            </li>
            <li aria-hidden="true" className="text-neutral-600">
              ·
            </li>
            <li>
              <Link href="/terms" className={linkClass}>
                {tLegal("terms")}
              </Link>
            </li>
          </ul>
        </Container>
      </div>
    </footer>
  );
}
