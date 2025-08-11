import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  // Get the pathname of the request
  const path = request.nextUrl.pathname

  // Define paths that are considered public (no auth required)
  const isPublicPath =
    path === "/auth/login" ||
    path === "/auth/forgot-password" ||
    path === "/auth/reset-password" ||
    path === "/" ||
    path === "/services" ||
    path === "/portfolio" ||
    path === "/blog" ||
    path === "/contact" ||
    path === "/pricing" ||
    path === "/community" ||
    path.startsWith("/community/") ||
    path.startsWith("/blog/") ||
    path.startsWith("/portfolio/")

  // Check if the path is for dashboard or protected routes
  const isProtectedPath = path.startsWith("/dashboard") || path === "/auth/kyc-verification"

  // Get the token from cookies
  const token = request.cookies.get("dreamers-auth-token")?.value
  const isLoggedIn = token ? true : false

  // If the path is protected and user is not logged in, redirect to login
  if (isProtectedPath && !isLoggedIn) {
    return NextResponse.redirect(new URL("/auth/login", request.url))
  }

  // If the user is logged in and trying to access login page, redirect to dashboard
  if (isPublicPath && isLoggedIn && (path === "/auth/login" || path === "/auth/forgot-password")) {
    return NextResponse.redirect(new URL("/dashboard", request.url))
  }

  return NextResponse.next()
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    "/dashboard/:path*",
    "/auth/:path*",
    "/",
    "/services",
    "/portfolio",
    "/portfolio/:path*",
    "/blog",
    "/blog/:path*",
    "/contact",
    "/pricing",
    "/community",
    "/community/:path*",
  ],
}

