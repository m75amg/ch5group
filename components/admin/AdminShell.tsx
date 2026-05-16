"use client";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  BarChart3,
  PieChart,
  Building2,
  Calendar,
  Briefcase,
  FileDown,
  Megaphone,
  History,
  MapPin,
  Link2,
  Mail,
  Inbox,
  LogOut,
} from "lucide-react";

import { cn } from "@/lib/utils";

const NAV_GROUPS = [
  {
    label: "운영",
    items: [
      { href: "/admin", label: "대시보드", icon: LayoutDashboard, exact: true },
      { href: "/admin/inquiries", label: "문의 내역", icon: Inbox },
    ],
  },
  {
    label: "콘텐츠",
    items: [
      { href: "/admin/stats", label: "통계 수치", icon: BarChart3 },
      { href: "/admin/audience-chart", label: "독자 분포 차트", icon: PieChart },
      { href: "/admin/partners", label: "파트너", icon: Building2 },
      { href: "/admin/programs", label: "프로그램", icon: Calendar },
      { href: "/admin/cases", label: "사례", icon: Briefcase },
      { href: "/admin/media-kit", label: "미디어킷", icon: FileDown },
      { href: "/admin/announcements", label: "공지/배너", icon: Megaphone },
      { href: "/admin/history", label: "연혁", icon: History },
    ],
  },
  {
    label: "회사 정보",
    items: [
      { href: "/admin/contact-info", label: "연락처 정보", icon: MapPin },
      { href: "/admin/footer-links", label: "운영 플랫폼 링크", icon: Link2 },
      { href: "/admin/email-templates", label: "이메일 템플릿", icon: Mail },
    ],
  },
];

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { data: session } = useSession();

  const isActive = (href: string, exact?: boolean) =>
    exact ? pathname === href : pathname === href || pathname.startsWith(`${href}/`);

  return (
    <div className="flex min-h-screen">
      <aside className="hidden lg:flex w-64 shrink-0 flex-col border-r border-border bg-background">
        <div className="flex h-16 items-center gap-2 px-5 border-b border-border">
          <span
            aria-hidden="true"
            className="grid h-7 w-7 place-items-center rounded-md bg-brand-accent text-brand-accent-foreground text-caption font-semibold"
          >
            C5
          </span>
          <span className="text-button font-semibold text-foreground">
            Channel5 · Admin
          </span>
        </div>

        <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-6">
          {NAV_GROUPS.map((group) => (
            <div key={group.label}>
              <p className="px-3 text-caption uppercase tracking-[0.08em] text-foreground-muted">
                {group.label}
              </p>
              <ul className="mt-2 space-y-1">
                {group.items.map((item) => {
                  const Icon = item.icon;
                  const active = isActive(item.href, item.exact);
                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className={cn(
                          "flex items-center gap-2 px-3 py-2 rounded-md text-body-sm transition-colors",
                          active
                            ? "bg-brand-accent/10 text-brand-accent"
                            : "text-foreground-muted hover:bg-neutral-100 hover:text-foreground",
                        )}
                      >
                        <Icon className="h-4 w-4 shrink-0" />
                        <span>{item.label}</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </nav>

        <div className="border-t border-border p-4">
          <p className="text-caption text-foreground-muted truncate">
            {session?.user?.email ?? ""}
          </p>
          <p className="text-button text-foreground truncate">
            {session?.user?.name ?? ""}
            {session?.user?.role ? (
              <span className="ml-2 text-caption font-mono text-brand-accent">
                {session.user.role}
              </span>
            ) : null}
          </p>
          <button
            type="button"
            onClick={() => signOut({ callbackUrl: "/admin/login" })}
            className="mt-3 inline-flex items-center gap-1 text-button text-foreground-muted hover:text-foreground transition-colors"
          >
            <LogOut className="h-4 w-4" />
            로그아웃
          </button>
        </div>
      </aside>

      <main className="flex-1 min-w-0">
        <header className="lg:hidden flex h-14 items-center justify-between px-4 border-b border-border bg-background">
          <Link href="/admin" className="flex items-center gap-2">
            <span
              aria-hidden="true"
              className="grid h-7 w-7 place-items-center rounded-md bg-brand-accent text-brand-accent-foreground text-caption font-semibold"
            >
              C5
            </span>
            <span className="text-button font-semibold text-foreground">
              Admin
            </span>
          </Link>
          <button
            type="button"
            onClick={() => signOut({ callbackUrl: "/admin/login" })}
            className="text-button text-foreground-muted"
          >
            <LogOut className="h-5 w-5" />
          </button>
        </header>
        <div className="px-6 py-8 lg:px-10 lg:py-10">{children}</div>
      </main>
    </div>
  );
}
