import "server-only"

import { headers } from "next/headers"
import { auth } from "@/lib/auth"

export async function createBackendToken() {
  const result = await auth.api.getToken({ headers: await headers() })
  return result?.token ?? null
}
