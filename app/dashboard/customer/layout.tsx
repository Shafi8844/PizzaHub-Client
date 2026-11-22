import { redirect } from "next/navigation"
import { getSession } from "@/lib/core/server"

export default async function CustomerLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession()
  const role = session?.user.role
  if (!role) redirect("/sign-in")
  if (role !== "customer") redirect(`/dashboard/${role}`)
  return children
}
