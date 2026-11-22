import { Card, CardContent } from "@/components/ui/card"
import { getMenuItems } from "@/lib/api/menu"
import { getOrders } from "@/lib/api/order"
import { createBackendToken } from "@/lib/api/backend-token"
import { auth } from "@/lib/auth"
import { headers } from "next/headers"
import { DashboardShell, StatCard } from "../_components/dashboard-shell"

const VendorDashBoardPage = async () => {
  const session = await auth.api.getSession({ headers: await headers() })
  const vendorId = session?.user?.id
  const token = await createBackendToken()

  const [menu, orders] = await Promise.all([
    vendorId ? getMenuItems("", token ?? undefined) : Promise.resolve([]),
    vendorId ? getOrders("", token ?? undefined) : Promise.resolve([]),
  ])

  const active = menu.filter((i) => i.status === "approved").length
  const pendingOrders = orders.filter((o) => o.status === "pending").length
  const acceptedOrders = orders.filter((o) => o.status === "accepted").length
  const premium = Boolean((session?.user as { premium?: boolean } | undefined)?.premium)

  return (
    <DashboardShell
      breadcrumb="Vendor / Overview"
      title="Vendor Overview"
      description="Track your menu, orders, and subscription at a glance."
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Total Menu Items" value={menu.length} />
        <StatCard label="Active Menu Items" value={active} />
        <StatCard label="Pending Orders" value={pendingOrders} />
        <StatCard label="Accepted Orders" value={acceptedOrders} />
      </div>

      <Card className="mt-6 rounded-2xl border border-line bg-white shadow-[0_1px_2px_rgba(31,26,23,0.04)] ring-0">
        <CardContent className="flex flex-col gap-2 p-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold text-ink">Current Subscription</p>
            <p className="mt-1 text-sm text-ink-soft">
              {premium ? "Premium plan - unlimited active items and featured placement." : "Free plan - up to 3 active menu items."}
            </p>
          </div>
          <span className={`inline-flex w-fit rounded-full px-3 py-1.5 text-xs font-semibold ${premium ? "bg-brand-tint text-brand" : "bg-[#f3ece3] text-ink-soft"}`}>
            {premium ? "Premium" : "Free"}
          </span>
        </CardContent>
      </Card>
    </DashboardShell>
  )
}

export default VendorDashBoardPage
