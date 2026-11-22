import "server-only"

const BASE_URL = process.env.NEXT_PUBLIC_API_URL?.replace(/\/+$/, "")

export const checkVerify = async (sessionId: string) => {
  if (!BASE_URL) {
    throw new Error("NEXT_PUBLIC_API_URL is not configured")
  }

  const response = await fetch(`${BASE_URL}/payments/checkout-verify`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ sessionId }),
    cache: "no-store",
  })

  if (!response.ok) {
    throw new Error(`Payment verification failed (${response.status})`)
  }

  return response.json() as Promise<{
    success: boolean
    message?: string
    email?: string | null
  }>
}
