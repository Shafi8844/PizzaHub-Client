import { redirect } from "next/navigation"

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { getSession } from "@/lib/core/server"
import { DahsboardSideBar } from "../components/DahsboardSideBar"
import { Toaster } from "@/components/ui/toast"

const DahsboardLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await getSession()
  if (!session) redirect("/sign-in")

  const user = session.user as typeof session.user & {
    banned?: boolean
    blocked?: boolean
  }
  if (user.banned || user.blocked) redirect("/?blocked=1")

  return (
    <SidebarProvider>
      <DahsboardSideBar />
      <main className="min-w-0 flex-1">
        <div className="sticky top-0 z-10 flex h-14 items-center border-b border-line bg-cream/95 px-4 backdrop-blur sm:px-6 lg:hidden">
          <SidebarTrigger />
          <span className="ml-3 text-sm font-medium text-ink-soft">Dashboard</span>
        </div>
        {children}
      </main>
      <Toaster />
    </SidebarProvider>
  )
}

export default DahsboardLayout
