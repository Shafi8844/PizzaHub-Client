const BaseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5050"

function ordersApiUrl(path: string) {
  return typeof window === "undefined" ? `${BaseUrl}${path}` : `/api/backend${path}`
}

function authHeaders(token?: string) {
  const headers = new Headers()
  if (token) headers.set("authorization", `Bearer ${token}`)
  return headers
}

export type OrderStatus = "pending" | "accepted" | "rejected" | "cancelled"

export type Order = {
  _id: string
  menuItemId?: string
  vendorId?: string
  itemName: string
  itemImage?: string
  unitPrice?: number
  quantity?: number
  totalPrice?: number
  customerId: string
  customerName: string
  customerEmail?: string
  deliveryAddress: string
  phone?: string
  note?: string
  deliveryDate?: string
  status: OrderStatus
  createdAt: string
}

export async function createOrder(orderData: Record<string, unknown>) {
  const response = await fetch(ordersApiUrl("/orders"), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(orderData),
  })
  if (!response.ok) {
    const result = (await response.json().catch(() => null)) as { error?: string } | null
    throw new Error(result?.error ?? "Failed to create order")
  }
  return response.json()
}

export async function getOrders(query = "", token?: string): Promise<Order[]> {
  const response = await fetch(ordersApiUrl(`/orders${query ? `?${query}` : ""}`), {
    headers: authHeaders(token),
    cache: "no-store",
  })
  if (!response.ok) throw new Error(`Unable to load orders (HTTP ${response.status})`)
  return response.json()
}

export async function getOrdersCount(query = "", token?: string): Promise<{ count: number }> {
  const response = await fetch(ordersApiUrl(`/orders/count${query ? `?${query}` : ""}`), {
    headers: authHeaders(token),
    cache: "no-store",
  })
  if (!response.ok) throw new Error(`Unable to load order count (HTTP ${response.status})`)
  return response.json()
}
