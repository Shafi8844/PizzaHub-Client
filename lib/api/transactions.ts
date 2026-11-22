const BaseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5050"

export type Transaction = {
  _id: string
  vendorId: string
  vendorName: string
  vendorEmail: string
  plan: string
  amount: number
  currency: string
  stripeSessionId: string
  stripeSubscriptionId: string
  status: string
  createdAt: string
}

export async function getTransactions(token: string): Promise<Transaction[]> {
  const response = await fetch(`${BaseUrl}/transactions`, {
    headers: { authorization: `Bearer ${token}` },
    cache: "no-store",
  })
  if (!response.ok) {
    throw new Error(`Unable to load transactions (HTTP ${response.status})`)
  }
  return response.json()
}
