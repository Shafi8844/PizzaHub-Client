const BaseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5050"

export type NewMenuItem = {
  name: string
  description: string
  category: string
  price: number
  status: "Live" | "Pending" | "Draft"
  location: string
  image: string
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