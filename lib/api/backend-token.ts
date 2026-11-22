import "server-only"

import { createHmac } from "node:crypto"

import { getSession } from "@/lib/core/server"

function base64url(value: string) {
  return Buffer.from(value).toString("base64url")
}

export async function createBackendToken() {
  const session = await getSession()
  if (!session) return null

  const secret = process.env.BETTER_AUTH_SECRET
  if (!secret) throw new Error("BETTER_AUTH_SECRET is not configured")

  const now = Math.floor(Date.now() / 1000)
  const header = base64url(JSON.stringify({ alg: "HS256", typ: "JWT" }))
  const payload = base64url(
    JSON.stringify({
      iss: "pizzahub-client",
      aud: "pizzahub-api",
      sub: session.user.id,
      iat: now,
      exp: now + 300,
    })
  )
  const signingInput = `${header}.${payload}`
  const signature = createHmac("sha256", secret)
    .update(signingInput)
    .digest("base64url")

  return `${signingInput}.${signature}`
}
