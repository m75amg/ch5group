"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Menu, X } from "lucide-react";

import { Link, usePathname } from "@/i18n/navigation";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/shared/Container";
import { cn } from "@/lib/utils";
import { LanguageToggle } from "./LanguageToggle";
import { Logo } from "./Logo";

const NAV_ITEMS = [
  { key: "home", href: "/" },
  { key: "about", href: "/about" },
  { key: "mediaPlatform", href: "/media-platform" },
  { key: "services", href: "/services" },
  { key: "programs", href: "/programs" },
  { key: "partners", href: "/partners" },
  { key: "contact", href: "/contact" },
] as const;

export function Header() {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  // Close menu when route changes
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  // Lock body scroll when menu open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  // ESC to close
  useEffect(() => {
    if (!mobileOpen) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setMobileOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [mobileOpen]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
      <header className="sticky top-0 z-sticky w-full bg-background/95 backdrop-blur-md border-b border-border">
        <Container className="flex h-16 lg:h-18 items-center justify-between gap-6">
          <Link
            href="/"
            aria-label="Channel5 Korea — Home"
            className="flex items-center rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent focus-visible:ring-offset-2"
          >
            <Logo />
          </Link>

          <nav
            aria-label="Primary"
            className="hidden lg:flex items-center gap-1"
          >
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.key}
                href={item.href}
                aria-current={isActive(item.href) ? "page" : undefined}
                className={cn(
                  "px-3 py-2 rounded-md text-button transition-colors",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent",
                  isActive(item.href)
                    ? "text-brand-accent"
                    : "text-foreground-muted hover:text-foreground",
                )}
              >
                {t(item.key)}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <LanguageToggle className="hidden sm:inline-flex" />
            <Link href="/contact" className="hidden sm:block">
              <Button variant="primary" size="sm">
                {t("ctaPrimary")}
              </Button>
            </Link>
            <button
              type="button"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
              onClick={() => setMobileOpen((open) => !open)}
              className="lg:hidden inline-flex items-center justify-center h-10 w-10 rounded-md text-foreground hover:bg-neutral-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent focus-visible:ring-offset-2"
            >
              {mobileOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>
        </Container>
      </header>

      {mobileOpen ? (
        <div
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation"
          className="lg:hidden fixed inset-0 z-modal bg-background flex flex-col"
        >
          <Container className="flex h-16 items-center justify-between border-b border-border">
            <Logo />
            <button
              type="button"
              aria-label="Close menu"
              onClick={() => setMobileOpen(false)}
              className="inline-flex items-center justify-center h-10 w-10 rounded-md text-foreground hover:bg-neutral-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent focus-visible:ring-offset-2"
            >
              <X className="h-5 w-5" />
            </button>
          </Container>
          <nav
            aria-label="Mobile primary"
            className="flex-1 overflow-y-auto px-6 pt-4 pb-8"
          >
            <ul className="flex flex-col gap-1">
              {NAV_ITEMS.map((item) => (
                <li key={item.key}>
                  <Link
                    href={item.href}
                    aria-current={isActive(item.href) ? "page" : undefined}
                    className={cn(
                      "block px-3 py-3 rounded-md text-h4 transition-colors",
                      isActive(item.href)
                        ? "text-brand-accent"
                        : "text-foreground hover:bg-neutral-100",
                    )}
                  >
                    {t(item.key)}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-col gap-3">
              <LanguageToggle className="self-start" />
              <Link href="/contact" className="w-full">
                <Button variant="primary" size="lg" className="w-full">
                  {t("ctaPrimary")}
                </Button>
              </Link>
            </div>
          </nav>
        </div>
      ) : null}
    </>
  );
}
