import { redirect } from "next/navigation"
import { getSession } from "@/lib/core/server"

export default async function VendorLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession()
  const role = session?.user.role
  if (!role) redirect("/sign-in")
  if (role !== "vendor") redirect(`/dashboard/${role}`)
  return children
}
