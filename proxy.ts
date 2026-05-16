import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

function applyNoStoreHeaders(response: NextResponse) {
  response.headers.set("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0");
  response.headers.set("Pragma", "no-cache");
  response.headers.set("Expires", "0");
  return response;
}

async function hasValidSession(request: NextRequest) {
  try {
    const sessionUrl = new URL("/api/auth/get-session", request.url);

    const response = await fetch(sessionUrl, {
      method: "GET",
      headers: {
        cookie: request.headers.get("cookie") ?? "",
      },
      cache: "no-store",
    });

    if (!response.ok) {
      return false;
    }

    const data = await response.json();

    return Boolean(data?.session && data?.user);
  } catch {
    return false;
  }
}

export default async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const token =
    request.cookies.get("better-auth.session_token") ||
    request.cookies.get("__Secure-better-auth.session_token");

  const isDashboardRoute = pathname.startsWith("/dashboard");
  const isAuthRoute = pathname.startsWith("/auth");

  if (!isDashboardRoute && !isAuthRoute) {
    return NextResponse.next();
  }

  if (isDashboardRoute && !token) {
    return applyNoStoreHeaders(
      NextResponse.redirect(new URL("/auth/login", request.url)),
    );
  }

  if (token) {
    const validSession = await hasValidSession(request);

    if (!validSession && isDashboardRoute) {
      const response = NextResponse.redirect(new URL("/auth/login", request.url));
      response.cookies.delete("better-auth.session_token");
      response.cookies.delete("__Secure-better-auth.session_token");
      return applyNoStoreHeaders(response);
    }

    if (!validSession && isAuthRoute) {
      const response = NextResponse.next();
      response.cookies.delete("better-auth.session_token");
      response.cookies.delete("__Secure-better-auth.session_token");
      return applyNoStoreHeaders(response);
    }

    if (isAuthRoute && validSession) {
      return applyNoStoreHeaders(
        NextResponse.redirect(new URL("/dashboard/products", request.url)),
      );
    }
  }

  return applyNoStoreHeaders(NextResponse.next());
}

export const config = {
  matcher: ["/dashboard/:path*", "/auth/:path*"],
};
