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
