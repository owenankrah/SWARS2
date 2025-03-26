import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  // Skip middleware for API routes and static files
  if (
    request.nextUrl.pathname.startsWith("/_next") ||
    request.nextUrl.pathname.startsWith("/api") ||
    request.nextUrl.pathname.startsWith("/static") ||
    request.nextUrl.pathname.includes(".")
  ) {
    return NextResponse.next()
  }

  // For demonstration purposes, we're not implementing strict auth checks in middleware
  // since we're using client-side auth with localStorage
  // In a real app, you would check for auth cookies/tokens here

  return NextResponse.next()
}

