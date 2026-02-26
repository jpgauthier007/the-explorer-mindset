import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Redirect /en/* to /* to avoid duplicate content
  if (pathname.startsWith("/en")) {
    const url = request.nextUrl.clone();
    url.pathname = pathname.replace(/^\/en/, "") || "/";
    return NextResponse.redirect(url);
  }

  // Set language header for root layout to read
  const lang = pathname.startsWith("/fr") ? "fr" : "en";
  const response = NextResponse.next();
  response.headers.set("x-lang", lang);
  return response;
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};
