import { redirect } from "next/navigation"

import { getSession } from "@/lib/core/server"

export default async function VendorDashboardLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const session = await getSession()
  if (!session) redirect("/sign-in")
  if (session.user.role !== "vendor") redirect(`/dashboard/${session.user.role}`)

  return children
}
