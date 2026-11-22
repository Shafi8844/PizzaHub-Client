import { redirect } from "next/navigation"
import { getSession } from "@/lib/core/server"

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession()
  const role = session?.user.role
  if (!role) redirect("/sign-in")
  if (role !== "admin") redirect(`/dashboard/${role}`)
  return children
}
