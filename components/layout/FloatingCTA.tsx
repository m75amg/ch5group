"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { MessageSquare } from "lucide-react";

import { Link, usePathname } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

const SHOW_AFTER_PX = 600;

export function FloatingCTA() {
  const t = useTranslations("floatingCTA");
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function onScroll() {
      setVisible(window.scrollY > SHOW_AFTER_PX);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Hide on Contact page itself — user already in the form
  if (pathname === "/contact" || pathname.startsWith("/contact")) return null;

  return (
    <Link
      href="/contact"
      className={cn(
        "fixed bottom-4 right-4 md:bottom-6 md:right-6 z-floating",
        "inline-flex items-center gap-2 rounded-full bg-brand-accent text-brand-accent-foreground",
        "px-5 py-3 text-button shadow-xl hover:bg-brand-accent-hover transition-all duration-base",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent focus-visible:ring-offset-2",
        visible
          ? "opacity-100 translate-y-0 pointer-events-auto"
          : "opacity-0 translate-y-4 pointer-events-none",
      )}
      aria-label={t("label")}
    >
      <MessageSquare aria-hidden="true" className="h-4 w-4" />
      <span>{t("label")}</span>
    </Link>
  );
}
