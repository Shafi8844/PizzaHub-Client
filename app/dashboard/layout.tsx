import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { DahsboardSideBar } from "../components/DahsboardSideBar"
import { Toaster } from "@/components/ui/toast"

const DahsboardLayout = ({children}:{children:React.ReactNode}) => {
  return (
    <div>
        <SidebarProvider>
      <DahsboardSideBar />
      <main>
        <SidebarTrigger />
        {children}
      </main>
      <Toaster />
    </SidebarProvider>
    </div>
  )
}

export default DahsboardLayout