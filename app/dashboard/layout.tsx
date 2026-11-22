import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { DahsboardSideBar } from "../components/DahsboardSideBar"
import { Toaster } from "@/components/ui/toast"

const DahsboardLayout = ({ children }: { children: React.ReactNode }) => {
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