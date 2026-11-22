const BaseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5050"

export type User = {
  _id: string
  id?: string
  name?: string
  email?: string
  role?: "customer" | "vendor" | "admin"
  image?: string | null
  blocked?: boolean
  premium?: boolean
}

export async function getUsers(query = "", token?: string): Promise<User[]> {
  const headers = new Headers()
  if (token) headers.set("authorization", `Bearer ${token}`)
  const response = await fetch(`${BaseUrl}/users${query ? `?${query}` : ""}`, {
    headers,
    cache: "no-store",
  })
  if (!response.ok) return []
  return response.json()
}
