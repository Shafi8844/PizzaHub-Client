import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from "@/components/ui/sidebar"
import { useSession } from "@/lib/auth-client"
import { custom } from "better-auth"

const menuItems = {
    customer:[

    ],
    vendor:[

    ],
    admin:[

    ]
}
export function DahsboardSideBar() {
  const {data:session,isPending}=useSession()
  const role=session?.user?.role || "customer";
  
  return (
    <Sidebar>
      <SidebarHeader />
      <SidebarContent>
        <SidebarGroup />
        <SidebarGroup />
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  )
}