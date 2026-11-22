import type { MenuItem } from "@/app/dashboard/vendor/menu-items/page"

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

export const getVendorMenuCount = async (vendorId: string): Promise<{count: number}> => {
  const response = await fetch(`${BaseURL}/menu/count?${vendorId}`)
  return response.json()
}

export const getMenuItemById = async (id: string): Promise<MenuItem> => {
  const response = await fetch(`${BaseURL}/menu/${id}`)
  return response.json()
}
