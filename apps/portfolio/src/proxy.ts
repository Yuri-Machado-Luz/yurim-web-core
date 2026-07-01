import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const ROUTES_PERMITTED = new Set(["/", "/contato", "/projetos", "/sobre"]);

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/_next") || pathname.includes(".")) {
    return NextResponse.next();
  }

  if (!ROUTES_PERMITTED.has(pathname)) {
    const url = request.nextUrl.clone();
    url.pathname = "/404";

    return NextResponse.rewrite(url, {
      status: 404,
      headers: { "x-status-code": "404" },
    });
  }

  return NextResponse.next();
}
