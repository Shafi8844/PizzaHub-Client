import { getMenuCount, getMenuItems } from "@/lib/api/menu"
import { getUsers } from "@/lib/api/users"
import { createBackendToken } from "@/lib/api/backend-token"
import { getTransactions } from "@/lib/api/transactions"
import { DashboardShell, StatCard } from "../_components/dashboard-shell"
import { DashboardChart } from "../_components/dashboard-chart"

const AdminDashboardPage = async () => {
  const token = await createBackendToken()
  const [users, items, pendingItems, transactions] = await Promise.all([
    getUsers("", token ?? undefined),
    getMenuItems("", token ?? undefined),
    getMenuCount("status=pending", token ?? undefined),
    token ? getTransactions(token) : Promise.resolve([]),
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
        <StatCard label="Total Transactions" value={transactions.length} />
      </div>
      <DashboardChart
        title="Platform activity"
        description="Current platform totals at a glance."
        data={[
          { label: "Customers", value: customers, color: "bg-brand" },
          { label: "Vendors", value: vendors, color: "bg-gold" },
          { label: "Menu items", value: items.length, color: "bg-leaf" },
          {
            label: "Transactions",
            value: transactions.length,
            color: "bg-ink-soft",
          },
        ]}
      />
    </DashboardShell>
  )
}

export default AdminDashboardPage
