import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { AdminProviders } from "./providers";

import "../globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Admin · Channel5 Korea",
  robots: { index: false, follow: false },
};

export default function AdminRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" className={inter.variable}>
      <body className="min-h-screen bg-background-muted text-foreground antialiased">
        <AdminProviders>{children}</AdminProviders>
      </body>
    </html>
  );
}
