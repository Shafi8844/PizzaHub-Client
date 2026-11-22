import { getMenuCount, getMenuItems } from "@/lib/api/menu"
import { getUsers } from "@/lib/api/users"
import { DashboardShell, StatCard } from "../_components/dashboard-shell"

const AdminDashboardPage = async () => {
  const [users, items, pendingItems] = await Promise.all([
    getUsers(),
    getMenuItems(),
    getMenuCount("status=pending"),
  ])

  const vendors = users.filter((u) => u.role === "vendor").length
  const customers = users.filter((u) => u.role === "customer").length

  return (
    <DashboardShell
      breadcrumb="Admin / Overview"
      title="Admin Overview"
      description="Monitor platform users, menu submissions, and transactions."
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <StatCard label="Total Registered Users" value={users.length} />
        <StatCard label="Total Vendors" value={vendors} />
        <StatCard label="Total Customers" value={customers} />
        <StatCard label="Total Menu Items" value={items.length} />
        <StatCard label="Pending Menu Items" value={pendingItems.count} />
        <StatCard label="Total Transactions" value="—" hint="Connect payments collection/count to populate." />
      </div>
    </DashboardShell>
  )
}

export default AdminDashboardPage
