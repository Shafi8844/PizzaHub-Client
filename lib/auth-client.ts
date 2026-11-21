import { createAuthClient } from "better-auth/react"
import { inferAdditionalFields } from "better-auth/client/plugins"
import type { auth } from "@/lib/auth"

// No baseURL: the client defaults to the current origin + /api/auth in the
// browser, which works for local dev and production alike. BETTER_AUTH_URL is
// server-only (not NEXT_PUBLIC_), so it would be undefined here anyway.
export const authClient = createAuthClient({
  plugins: [inferAdditionalFields<typeof auth>()],
})

export const { signIn, signUp, signOut, useSession } = authClient
