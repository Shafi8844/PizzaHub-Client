import { redirect } from "next/navigation"

import { getSession } from "@/lib/core/server"

export default async function CustomerDashboardLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const session = await getSession()
  if (!session) redirect("/sign-in")
  if (session.user.role !== "customer") redirect(`/dashboard/${session.user.role}`)

  return children
}
