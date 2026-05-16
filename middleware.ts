import createMiddleware from "next-intl/middleware";
import { getToken } from "next-auth/jwt";
import { NextResponse, type NextRequest } from "next/server";

import { routing } from "./i18n/routing";

const intlMiddleware = createMiddleware(routing);

const ADMIN_LOGIN = "/admin/login";

export default async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // ─── /admin/* protection (skip i18n routing) ─────────────────────────────
  if (pathname.startsWith("/admin")) {
    // Login page is public
    if (pathname === ADMIN_LOGIN) {
      return NextResponse.next();
    }

    const token = await getToken({
      req: request,
      secret: process.env.NEXTAUTH_SECRET,
    });

    if (!token) {
      const loginUrl = new URL(ADMIN_LOGIN, request.url);
      if (pathname !== "/admin") {
        loginUrl.searchParams.set("from", pathname);
      }
      return NextResponse.redirect(loginUrl);
    }

    return NextResponse.next();
  }

  // ─── Everything else → next-intl ─────────────────────────────────────────
  return intlMiddleware(request);
}

export const config = {
  // Match everything except Next.js internals, static files, and the NextAuth
  // / contact-form API routes (those handle auth/validation themselves).
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
