// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const url = new URL(request.url);
  const token = request.cookies.get("token");

  // Allow /dashboard publicly
  if (url.pathname.startsWith("/dashboard")) {
    return NextResponse.next();
  }

  // Handle /login
  if (url.pathname === "/login") {
    if (token) {
      // If logged in, redirect to homepage
      return NextResponse.redirect(new URL("/", request.url));
    }
    return NextResponse.next();
  }

  // Protect homepage (/) or other protected routes
  if (url.pathname === "/" && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // For all other routes, optionally you can protect or leave public
  return NextResponse.next();
}

export const config = {
  matcher: [
    // apply middleware to all routes except static assets
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
