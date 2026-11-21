"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import {
  ClipboardList,
  Crown,
  LayoutDashboard,
  LogOut,
  PlusCircle,
  Receipt,
  Settings,
  ShoppingBag,
  UtensilsCrossed,
  Users,
  type LucideIcon,
} from "lucide-react"
import Logo from "@/components/logo"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "@/components/ui/sidebar"
import { signOut, useSession } from "@/lib/auth-client"

type Role = "customer" | "vendor" | "admin"
type NavItem = { label: string; href: string; icon: LucideIcon }

const menuItems: Record<Role, NavItem[]> = {
  vendor: [
    { label: "Overview", href: "/dashboard/vendor", icon: LayoutDashboard },
    {
      label: "My Menu Items",
      href: "/dashboard/vendor/menu-items",
      icon: UtensilsCrossed,
    },
    {
      label: "Add Menu Item",
      href: "/dashboard/vendor/menu-items/new",
      icon: PlusCircle,
    },
    {
      label: "Customer Orders",
      href: "/dashboard/vendor/orders",
      icon: ShoppingBag,
    },
    {
      label: "Subscription",
      href: "/dashboard/vendor/subscription",
      icon: Crown,
    },
    {
      label: "Profile Settings",
      href: "/dashboard/vendor/settings",
      icon: Settings,
    },
  ],
  customer: [
    { label: "Overview", href: "/dashboard/customer", icon: LayoutDashboard },
    { label: "My Orders", href: "/dashboard/customer/orders", icon: ClipboardList },
    {
      label: "Profile Settings",
      href: "/dashboard/customer/settings",
      icon: Settings,
    },
  ],
  admin: [
    { label: "Overview", href: "/dashboard/admin", icon: LayoutDashboard },
    { label: "Manage Users", href: "/dashboard/admin/users", icon: Users },
    {
      label: "Manage Menu Items",
      href: "/dashboard/admin/menu-items",
      icon: UtensilsCrossed,
    },
    { label: "Transactions", href: "/dashboard/admin/transactions", icon: Receipt },
  ],
}

const roleLabels: Record<Role, string> = {
  customer: "Customer",
  vendor: "Vendor",
  admin: "Admin",
}

function initialsFor(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean)
  if (parts.length === 0) return "U"
  return (parts[0][0] + (parts[1]?.[0] ?? "")).toUpperCase()
}

export function DahsboardSideBar() {
  const router = useRouter()
  const pathname = usePathname()
  const { data: session, isPending } = useSession()
  const role = (session?.user?.role ?? "customer") as Role
  const items = menuItems[role] ?? menuItems.customer
  const user = session?.user
  const displayName = user?.name ?? user?.email ?? "Account"

  async function handleSignOut() {
    await signOut()
    router.push("/")
    router.refresh()
  }

  return (
    <Sidebar className="border-r border-line bg-[#fffdfa]">
      <SidebarHeader className="gap-3 border-b border-line px-4 py-5">
        <Logo href="/" />
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium tracking-wide text-ink-soft uppercase">
            {roleLabels[role]} Dashboard
          </span>
          <span className="rounded-full bg-brand-tint px-2 py-0.5 text-[10px] font-semibold tracking-wide text-brand uppercase">
            {roleLabels[role]}
          </span>
        </div>
      </SidebarHeader>

      <SidebarContent className="px-2 py-4">
        <SidebarGroup className="p-0">
          <SidebarGroupLabel className="px-3 text-[11px] font-semibold tracking-[0.08em] text-ink-soft uppercase">
            Menu
          </SidebarGroupLabel>
          <SidebarGroupContent>
            {isPending ? (
              <SidebarMenu>
                {[0, 1, 2, 3].map((index) => (
                  <SidebarMenuItem key={index} className="h-9 animate-pulse rounded-lg bg-[#f3ece3]" />
                ))}
              </SidebarMenu>
            ) : (
              <SidebarMenu className="gap-1.5">
                {items.map(({ label, href, icon: Icon }) => {
                  const isActive = pathname === href
                  return (
                    <SidebarMenuItem key={href}>
                      <SidebarMenuButton
                        render={<Link href={href} />}
                        tooltip={label}
                        isActive={isActive}
                        className={`h-10 gap-3 rounded-xl px-3 text-sm font-medium transition-colors ${
                          isActive
                            ? "bg-brand-tint text-brand hover:bg-brand-tint hover:text-brand"
                            : "text-ink-soft hover:bg-[#f5ede3] hover:text-ink"
                        }`}
                      >
                        <Icon className="size-[18px]" aria-hidden />
                        <span className="truncate">{label}</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  )
                })}
              </SidebarMenu>
            )}
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-line p-3">
        <div className="flex items-center gap-2.5 rounded-xl bg-[#faf5ee] p-2.5">
          <Avatar className="size-9">
            <AvatarImage src={user?.image ?? undefined} alt={displayName} />
            <AvatarFallback className="bg-brand-tint text-brand">
              {initialsFor(displayName)}
            </AvatarFallback>
          </Avatar>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold text-ink">{displayName}</p>
            <p className="truncate text-xs text-ink-soft">{user?.email ?? "Guest"}</p>
          </div>
        </div>
        <SidebarSeparator className="my-1 bg-line" />
        <SidebarMenuButton
          onClick={handleSignOut}
          tooltip="Log out"
          className="h-10 gap-3 rounded-xl px-3 text-sm font-medium text-ink-soft hover:bg-brand-tint hover:text-brand"
        >
          <LogOut className="size-[18px]" aria-hidden />
          <span>Log out</span>
        </SidebarMenuButton>
      </SidebarFooter>
    </Sidebar>
  )
}
