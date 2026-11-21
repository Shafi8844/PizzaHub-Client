const BaseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5050"

export type NewMenuItem = {
  vendorId: string
  itemName: string
  category: string
  description: string
  price: number
  location: string
  images: string[]
  status: "pending" | "approved" | "rejected" | "inactive"
  createdAt: string
}

export const createmenu = async (menuData: NewMenuItem) => {
  const res = await fetch(`${BaseUrl}/menu`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(menuData),
  })
  return res.json()
}

export const deleteMenuItem = async (menuId: string) => {
  const res = await fetch(`${BaseUrl}/menu/${menuId}`, {
    method: "DELETE",
  })
  return res.json()
}