import { NextResponse, type NextRequest } from "next/server"
import { getSessionCookie } from "better-auth/cookies"

function roleFromPath(pathname: string) {
  if (pathname.startsWith("/dashboard/admin")) return "admin"
  if (pathname.startsWith("/dashboard/vendor")) return "vendor"
  if (pathname.startsWith("/dashboard/customer")) return "customer"
  return null
}

export async function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl
  const isProtected =
    pathname.startsWith("/dashboard") ||
    pathname.startsWith("/order") ||
    pathname === "/payment" ||
    pathname.startsWith("/payment/")

  if (!isProtected) return NextResponse.next()

  const sessionCookie = getSessionCookie(request)
  if (!sessionCookie) {
    const signInUrl = new URL("/sign-in", request.url)
    signInUrl.searchParams.set("redirectTo", `${pathname}${search}`)
    return NextResponse.redirect(signInUrl)
  }

  // Fine-grained role authorization is enforced in server components/API/backend.
  // This proxy prevents unauthenticated access and preserves redirect target.
  const requiredRole = roleFromPath(pathname)
  if (requiredRole) {
    // Role cookie is not trusted; server pages will enforce exact role.
    return NextResponse.next()
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/dashboard/:path*", "/order/:path*", "/payment", "/payment/:path*"],
}
