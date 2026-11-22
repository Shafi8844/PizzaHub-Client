const BaseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5050"

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
  const response = await fetch(`${BaseUrl}/orders`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(orderData),
  })
  if (!response.ok) throw new Error("Failed to create order")
  return response.json()
}

export async function getOrders(query = ""): Promise<Order[]> {
  const response = await fetch(`${BaseUrl}/orders${query ? `?${query}` : ""}`, {
    cache: "no-store",
  })
  if (!response.ok) return []
  return response.json()
}

export async function getOrdersCount(query = ""): Promise<{ count: number }> {
  const response = await fetch(`${BaseUrl}/orders/count${query ? `?${query}` : ""}`, {
    cache: "no-store",
  })
  if (!response.ok) return { count: 0 }
  return response.json()
}