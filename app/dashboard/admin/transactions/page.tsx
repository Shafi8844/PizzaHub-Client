import { DashboardShell } from "../../_components/dashboard-shell"
import { Card, CardContent } from "@/components/ui/card"

const AdminTransactionsPage = () => {
  return (
    <DashboardShell
      breadcrumb="Admin / Transactions"
      title="Transactions"
      description="Payment and subscription transactions."
    >
      <Card className="rounded-2xl border border-line bg-white shadow-[0_1px_2px_rgba(31,26,23,0.04)] ring-0">
        <CardContent className="p-6 text-sm text-ink-soft">
          Transactions UI is ready. Add a backend <code className="rounded bg-[#f3ece3] px-1.5 py-0.5 text-ink">GET /payments</code> endpoint returning payment records to populate this table.
        </CardContent>
      </Card>
    </DashboardShell>
  )
}

export default AdminTransactionsPage
