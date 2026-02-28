import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // HTTP Basic Auth for /admin
  if (pathname.startsWith("/admin")) {
    const authHeader = request.headers.get("authorization");

    if (authHeader?.startsWith("Basic ")) {
      const credentials = atob(authHeader.slice(6));
      const password = credentials.slice(credentials.indexOf(":") + 1);
      const adminPassword = process.env.ADMIN_PASSWORD;

      if (adminPassword && password === adminPassword) {
        return NextResponse.next();
      }
    }

    return new NextResponse("Unauthorized", {
      status: 401,
      headers: { "WWW-Authenticate": 'Basic realm="TEM Admin"' },
    });
  }

  // Redirect /newsletter to the signup section
  if (pathname === "/newsletter") {
    const url = request.nextUrl.clone();
    url.pathname = "/";
    url.hash = "#join";
    return NextResponse.redirect(url);
  }
  if (pathname === "/fr/newsletter") {
    const url = request.nextUrl.clone();
    url.pathname = "/fr";
    url.hash = "#join";
    return NextResponse.redirect(url);
  }

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
