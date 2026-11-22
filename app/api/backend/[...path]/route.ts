import { NextResponse } from "next/server"

import { createBackendToken } from "@/lib/api/backend-token"

type RouteContext = {
  params: Promise<{ path: string[] }>
}

function isAllowed(method: string, path: string[]) {
  const route = `/${path.join("/")}`
  if (method === "GET") {
    return ["/menu", "/menu/count", "/orders", "/orders/count", "/users", "/transactions"].includes(route) ||
      /^\/(menu|orders)\/[a-f\d]{24}$/i.test(route)
  }
  if (method === "POST") return route === "/menu" || route === "/orders"
  if (method === "PATCH") return /^\/(menu|orders|users)\/[^/]+$/.test(route)
  if (method === "DELETE") return /^\/menu\/[a-f\d]{24}$/i.test(route)
  return false
}

async function proxy(request: Request, context: RouteContext) {
  const { path } = await context.params
  const method = request.method.toUpperCase()
  if (!isAllowed(method, path)) {
    return NextResponse.json({ error: "API route not found" }, { status: 404 })
  }

  if (["POST", "PATCH", "DELETE"].includes(method)) {
    const origin = request.headers.get("origin")
    const appOrigin = process.env.NEXT_PUBLIC_APP_URL ?? process.env.BETTER_AUTH_URL
    let originAllowed = false
    try {
      originAllowed = Boolean(
        origin && appOrigin && new URL(origin).origin === new URL(appOrigin).origin
      )
    } catch {
      originAllowed = false
    }
    if (!originAllowed) {
      return NextResponse.json({ error: "Request origin is not allowed" }, { status: 403 })
    }
  }

  const backendUrl = process.env.NEXT_PUBLIC_API_URL
  if (!backendUrl) {
    return NextResponse.json({ error: "Backend API is not configured" }, { status: 503 })
  }

  try {
    const token = await createBackendToken()
    const incomingUrl = new URL(request.url)
    const target = `${backendUrl.replace(/\/+$/, "")}/${path.map(encodeURIComponent).join("/")}${incomingUrl.search}`
    const headers = new Headers()
    const contentType = request.headers.get("content-type")
    if (contentType) headers.set("content-type", contentType)
    if (token) headers.set("authorization", `Bearer ${token}`)

    const response = await fetch(target, {
      method,
      headers,
      body: method === "GET" ? undefined : await request.arrayBuffer(),
      cache: "no-store",
    })
    const responseType = response.headers.get("content-type") ?? "application/json"
    return new NextResponse(await response.arrayBuffer(), {
      status: response.status,
      headers: { "content-type": responseType, "cache-control": "no-store" },
    })
  } catch {
    return NextResponse.json({ error: "Backend API is unavailable" }, { status: 502 })
  }
}

export const GET = proxy
export const POST = proxy
export const PATCH = proxy
export const DELETE = proxy
