export type MenuItemStatus = "pending" | "approved" | "rejected" | "inactive"

export type MenuItem = {
  _id: string
  vendorId: string
  itemName: string
  category: string
  description: string
  price: number
  location: string
  images: string[]
  status: MenuItemStatus
  createdAt: string
  vendorName?: string
}

const BaseURL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5050"

function menuApiUrl(path: string) {
  return typeof window === "undefined" ? `${BaseURL}${path}` : `/api/backend${path}`
}

function authHeaders(token?: string) {
  const headers = new Headers()
  if (token) headers.set("authorization", `Bearer ${token}`)
  return headers
}

export const getMenuItems = async (query = "", token?: string): Promise<MenuItem[]> => {
  const response = await fetch(menuApiUrl(`/menu${query ? `?${query}` : ""}`), {
    headers: authHeaders(token),
    cache: "no-store",
  })
  if (!response.ok) {
    throw new Error("Failed to fetch menu items")
  }
  return response.json()
}

export const getMenuCount = async (query = "", token?: string): Promise<{ count: number }> => {
  const response = await fetch(menuApiUrl(`/menu/count${query ? `?${query}` : ""}`), {
    headers: authHeaders(token),
    cache: "no-store",
  })
  if (!response.ok) return { count: 0 }
  return response.json()
}

export const getMenuItemById = async (id: string, token?: string): Promise<MenuItem | null> => {
  if (!/^[a-f\d]{24}$/i.test(id)) return null
  const response = await fetch(menuApiUrl(`/menu/${id}`), {
    headers: authHeaders(token),
    cache: "no-store",
  })
  if (!response.ok) return null
  return response.json()
}
