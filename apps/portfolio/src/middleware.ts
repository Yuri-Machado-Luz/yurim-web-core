import { NextResponse, type NextRequest } from "next/server";

import { LOCALE_COOKIE, LOCALE_COOKIE_DOMAIN } from "@/lib/locale-cookie";
import { localeFromPath } from "@/lib/locale-path";
import { isProdDomain } from "@/lib/theme-cookie";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const locale = localeFromPath(pathname);

  const response = NextResponse.next();

  const cookieOptions: {
    path: string;
    maxAge: number;
    sameSite: "lax";
    secure?: boolean;
    domain?: string;
  } = {
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
    sameSite: "lax",
  };

  if (request.nextUrl.protocol === "https:") {
    cookieOptions.secure = true;
  }

  const host = request.headers.get("host")?.split(":")[0] ?? "";
  if (isProdDomain(host)) {
    cookieOptions.domain = LOCALE_COOKIE_DOMAIN;
  }

  response.cookies.set(LOCALE_COOKIE, locale, cookieOptions);
  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon\\.svg|og/|downloads/|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)",
  ],
};
