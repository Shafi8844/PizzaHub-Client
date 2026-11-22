import { Card, CardContent } from "@/components/ui/card"
import { createBackendToken } from "@/lib/api/backend-token"
import { getTransactions } from "@/lib/api/transactions"
import { DashboardShell } from "../../_components/dashboard-shell"

const AdminTransactionsPage = async () => {
  const token = await createBackendToken()
  const transactions = token ? await getTransactions(token) : []

  return (
    <DashboardShell
      breadcrumb="Admin / Transactions"
      title="Transactions"
      description="Read-only records of verified vendor subscription payments."
    >
      <Card className="rounded-2xl border border-line bg-white shadow-[0_1px_2px_rgba(31,26,23,0.04)] ring-0">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[760px] text-left">
              <thead>
                <tr className="border-b border-line bg-[#fdfaf7] text-xs font-semibold tracking-wide text-ink-soft uppercase">
                  <th className="px-5 py-4">Vendor</th>
                  <th className="px-5 py-4">Plan</th>
                  <th className="px-5 py-4">Amount</th>
                  <th className="px-5 py-4">Status</th>
                  <th className="px-5 py-4">Date</th>
                </tr>
              </thead>
              <tbody>
                {transactions.length ? transactions.map((transaction) => (
                  <tr key={transaction._id} className="border-b border-line last:border-0">
                    <td className="px-5 py-4">
                      <p className="text-sm font-medium text-ink">{transaction.vendorName}</p>
                      <p className="mt-1 text-xs text-ink-soft">{transaction.vendorEmail}</p>
                    </td>
                    <td className="px-5 py-4 text-sm capitalize text-ink-soft">{transaction.plan}</td>
                    <td className="px-5 py-4 text-sm font-semibold text-ink">
                      {new Intl.NumberFormat("en-US", {
                        style: "currency",
                        currency: transaction.currency?.toUpperCase() || "USD",
                      }).format(transaction.amount)}
                    </td>
                    <td className="px-5 py-4">
                      <span className="rounded-full bg-leaf-tint px-2.5 py-1 text-xs font-semibold capitalize text-leaf">
                        {transaction.status}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-sm text-ink-soft">
                      {new Date(transaction.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan={5} className="px-5 py-12 text-center text-sm text-ink-soft">
                      No verified subscription transactions yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </DashboardShell>
  )
}

export default AdminTransactionsPage
