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

export const getMenuItems = async (query = ""): Promise<MenuItem[]> => {
  const response = await fetch(`${BaseURL}/menu${query ? `?${query}` : ""}`, {
    cache: "no-store",
  })
  if (!response.ok) {
    throw new Error("Failed to fetch menu items")
  }
  return response.json()
}

export const getMenuCount = async (query = ""): Promise<{ count: number }> => {
  const response = await fetch(`${BaseURL}/menu/count${query ? `?${query}` : ""}`, {
    cache: "no-store",
  })
  if (!response.ok) return { count: 0 }
  return response.json()
}

export const getMenuItemById = async (id: string): Promise<MenuItem | null> => {
  if (!/^[a-f\d]{24}$/i.test(id)) return null
  const response = await fetch(`${BaseURL}/menu/${id}`, { cache: "no-store" })
  if (!response.ok) return null
  return response.json()
}
