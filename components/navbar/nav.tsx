"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { ChevronDown, LayoutDashboard, LogOut, Settings } from "lucide-react"
import Logo from "@/components/logo"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { signOut, useSession } from "@/lib/auth-client"

const navLinks = [
  { name: "Home", url: "/" },
  { name: "Browse Menu", url: "/browse-menu" },
]

function initialsFor(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean)
  if (parts.length === 0) return "U"
  return (parts[0][0] + (parts[1]?.[0] ?? "")).toUpperCase()
}

export default function Nav() {
  const router = useRouter()
  const { data: session, isPending } = useSession()
  const role = (session?.user?.role as string | undefined) ?? "customer"
  const dashboardHref = `/dashboard/${role}`
  const settingsHref =
    role === "vendor"
      ? "/dashboard/vendor/settings"
      : role === "customer"
        ? "/dashboard/customer/settings"
        : "/dashboard/admin/settings"

  async function handleSignOut() {
    await signOut()
    router.push("/")
    router.refresh()
  }

  return (
    <header className="mx-auto grid min-h-16 w-full max-w-[1200px] grid-cols-[1fr_auto] items-center gap-x-4 gap-y-1 px-4 py-2.5 sm:px-6 md:h-[76px] md:grid-cols-[1fr_auto_1fr] md:gap-0 md:py-0 lg:px-8 xl:px-12">
      <Logo href="/" priority className="justify-self-start" />

      <nav
        aria-label="Main navigation"
        className="col-span-2 row-start-2 flex items-center justify-center gap-6 text-sm font-medium whitespace-nowrap sm:gap-8 md:col-span-1 md:col-start-2 md:row-start-1 md:gap-7"
      >
        {navLinks.map((item) => (
          <Link
            key={item.url}
            href={item.url}
            className="text-ink transition-colors hover:text-brand"
          >
            {item.name}
          </Link>
        ))}
      </nav>

      <div className="flex items-center gap-3 justify-self-end text-sm font-medium whitespace-nowrap sm:gap-5">
        {isPending ? (
          <div className="h-9 w-28 animate-pulse rounded-xl bg-[#f3ece3]" />
        ) : session?.user ? (
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-2 rounded-xl p-1 pr-2 transition-colors outline-none hover:bg-[#fdf5ed] focus-visible:ring-2 focus-visible:ring-brand/30">
              <Avatar className="size-8">
                <AvatarImage
                  src={session.user.image ?? undefined}
                  alt={session.user.name ?? "Profile image"}
                />
                <AvatarFallback>
                  {initialsFor(session.user.name ?? session.user.email ?? "")}
                </AvatarFallback>
              </Avatar>
              <span className="hidden max-w-32 truncate text-sm font-semibold text-ink sm:inline">
                {session.user.name ?? session.user.email}
              </span>
              <ChevronDown className="size-4 text-ink-soft" aria-hidden />
            </DropdownMenuTrigger>

            <DropdownMenuContent
              align="end"
              sideOffset={8}
              className="w-56 rounded-xl border border-line bg-white p-1.5 text-ink shadow-lg"
            >
              <DropdownMenuLabel className="px-2.5 py-2">
                <span className="block truncate text-sm font-semibold text-ink">
                  {session.user.name ?? session.user.email}
                </span>
                <span className="block truncate text-xs font-normal text-ink-soft">
                  {session.user.email}
                </span>
              </DropdownMenuLabel>
              <DropdownMenuSeparator className="-mx-1.5 my-1 bg-line" />

              <DropdownMenuItem
                render={<Link href={dashboardHref} />}
                className="gap-2.5 rounded-lg px-2.5 py-2 text-sm font-medium text-ink focus:bg-brand-tint"
              >
                <LayoutDashboard className="size-4" aria-hidden />
                Dashboard
              </DropdownMenuItem>
              <DropdownMenuItem
                render={<Link href={settingsHref} />}
                className="gap-2.5 rounded-lg px-2.5 py-2 text-sm font-medium text-ink focus:bg-brand-tint"
              >
                <Settings className="size-4" aria-hidden />
                Profile Settings
              </DropdownMenuItem>

              <DropdownMenuSeparator className="-mx-1.5 my-1 bg-line" />
              <DropdownMenuItem
                onClick={handleSignOut}
                variant="destructive"
                className="gap-2.5 rounded-lg px-2.5 py-2 text-sm font-medium"
              >
                <LogOut className="size-4" aria-hidden />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <>
            <Link
              href="/sign-in"
              className="text-ink transition-colors hover:text-brand"
            >
              Sign In
            </Link>
            <Link
              href="/sign-up"
              className="inline-flex h-9 items-center justify-center rounded-[10px] bg-brand px-3.5 text-[13px] font-semibold text-white shadow-[0_1px_2px_rgba(31,26,23,0.16)] ring-1 ring-white/20 transition-colors ring-inset hover:bg-brand-hover sm:px-4"
            >
              Sign Up
            </Link>
          </>
        )}
      </div>
    </header>
  )
}
