import { getTranslations } from "next-intl/server";
import { Mail, MapPin, Phone, Clock, FileDown } from "lucide-react";

import { Container } from "@/components/shared/Container";
import { Eyebrow } from "@/components/shared/Eyebrow";

interface InfoRow {
  icon: React.ReactNode;
  label: string;
  value: string;
  href?: string;
}

export async function ContactSidebar() {
  const t = await getTranslations("contact");
  const tSidebar = await getTranslations("contact.sidebar");
  const tMediaKit = await getTranslations("contact.mediaKit");

  const rows: InfoRow[] = [
    {
      icon: <MapPin className="h-4 w-4" />,
      label: tSidebar("addressLabel"),
      value: tSidebar("address"),
    },
    {
      icon: <Phone className="h-4 w-4" />,
      label: tSidebar("phoneLabel"),
      value: tSidebar("phone"),
      href: `tel:${tSidebar("phone").replace(/[^+\d]/g, "")}`,
    },
    {
      icon: <Mail className="h-4 w-4" />,
      label: tSidebar("emailLabel"),
      value: tSidebar("email"),
      href: `mailto:${tSidebar("email")}`,
    },
    {
      icon: <Clock className="h-4 w-4" />,
      label: tSidebar("hoursLabel"),
      value: tSidebar("hours"),
    },
  ];

  return (
    <aside className="bg-background-inverse text-foreground-inverse lg:sticky lg:top-18 lg:self-start lg:max-h-[calc(100vh-72px)] overflow-y-auto">
      <Container className="py-16 lg:py-20 lg:px-12 max-w-none">
        <Eyebrow tone="inverse">CONTACT</Eyebrow>
        <h1 className="mt-4 text-h2 lg:text-[2.5rem] lg:leading-[1.15] tracking-tight whitespace-pre-line">
          {t("headline")}
        </h1>
        <p className="mt-4 text-body-sm text-neutral-300 leading-relaxed">
          {t("description")}
        </p>

        <figure
          aria-hidden="true"
          className="mt-8 aspect-[16/10] rounded-lg overflow-hidden border border-white/10 bg-gradient-to-br from-neutral-800 via-neutral-900 to-background-inverse relative"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_60%_40%,rgba(30,99,255,0.18),transparent_55%)]" />
          <figcaption className="absolute bottom-3 left-4 text-caption uppercase tracking-[0.08em] text-neutral-300">
            {tSidebar("officeLabel")} · {tSidebar("officeValue")}
          </figcaption>
        </figure>

        <ul className="mt-8 space-y-4">
          {rows.map((row) => (
            <li key={row.label} className="flex items-start gap-3">
              <span className="mt-1 text-brand-accent">{row.icon}</span>
              <div className="flex-1">
                <p className="text-caption uppercase tracking-[0.08em] text-neutral-500">
                  {row.label}
                </p>
                {row.href ? (
                  <a
                    href={row.href}
                    className="text-body-sm text-neutral-200 hover:text-foreground-inverse hover:underline whitespace-pre-line"
                  >
                    {row.value}
                  </a>
                ) : (
                  <p className="text-body-sm text-neutral-200 whitespace-pre-line">
                    {row.value}
                  </p>
                )}
              </div>
            </li>
          ))}
        </ul>

        <div className="mt-10 rounded-lg border border-white/10 bg-white/5 p-5">
          <div className="flex items-start gap-3">
            <FileDown
              aria-hidden="true"
              className="h-5 w-5 text-brand-accent mt-0.5 shrink-0"
            />
            <div>
              <h2 className="text-h5 text-foreground-inverse">
                {tMediaKit("headline")}
              </h2>
              <p className="mt-2 text-body-sm text-neutral-300 leading-relaxed">
                {tMediaKit("body")}
              </p>
              <a
                href="#"
                aria-disabled="true"
                className="inline-flex items-center gap-1 mt-3 text-button text-brand-accent hover:text-brand-accent-hover transition-colors"
              >
                {tMediaKit("cta")} →
              </a>
            </div>
          </div>
        </div>
      </Container>
    </aside>
  );
}
