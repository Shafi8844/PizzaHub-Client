import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { DahsboardSideBar } from "../components/DahsboardSideBar"
const DahsboardLayout = ({children}:{children:React.ReactNode}) => {
  return (
    <div>
        <SidebarProvider>
      <DahsboardSideBar />
      <main>
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
    </div>
  )
}

export default DahsboardLayout