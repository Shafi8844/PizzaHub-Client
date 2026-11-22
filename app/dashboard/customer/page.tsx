import { Card, CardContent } from "@/components/ui/card"
import { getOrders } from "@/lib/api/order"
import { auth } from "@/lib/auth"
import { headers } from "next/headers"
import { DashboardShell, StatCard } from "../_components/dashboard-shell"

const CustomerDashboardPage = async () => {
  const session = await auth.api.getSession({ headers: await headers() })
  const customerId = session?.user?.id
  const orders = customerId ? await getOrders(`customerId=${customerId}`) : []

  const pending = orders.filter((o) => o.status === "pending").length
  const accepted = orders.filter((o) => o.status === "accepted").length
  const rejected = orders.filter((o) => o.status === "rejected").length

  return (
    <DashboardShell
      breadcrumb="Customer / Overview"
      title="Customer Overview"
      description="See your order activity and current status."
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Total Orders" value={orders.length} />
        <StatCard label="Pending" value={pending} />
        <StatCard label="Accepted" value={accepted} />
        <StatCard label="Rejected" value={rejected} />
      </div>
      <Card className="mt-6 rounded-2xl border border-line bg-white shadow-[0_1px_2px_rgba(31,26,23,0.04)] ring-0">
        <CardContent className="p-6">
          <p className="text-sm font-semibold text-ink">Recent activity</p>
          <p className="mt-2 text-sm text-ink-soft">
            {orders.length === 0
              ? "You have not placed any orders yet."
              : `You have ${pending} pending order${pending === 1 ? "" : "s"} waiting for vendor response.`}
          </p>
        </CardContent>
      </Card>
    </DashboardShell>
  )
}

export default CustomerDashboardPage
