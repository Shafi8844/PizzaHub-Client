import { getOrders } from "@/lib/api/order"
import { auth } from "@/lib/auth"
import { headers } from "next/headers"
import { DashboardShell } from "../../_components/dashboard-shell"
import { CustomerOrdersTable } from "./_components/customer-orders-table"

const CustomerOrdersPage = async () => {
  const session = await auth.api.getSession({ headers: await headers() })
  const customerId = session?.user?.id
  const orders = customerId ? await getOrders(`customerId=${customerId}`) : []

  return (
    <DashboardShell
      breadcrumb="Customer / My Orders"
      title="My Orders"
      description="Track your orders and cancel pending requests when needed."
    >
      <CustomerOrdersTable initialOrders={orders} customerId={customerId ?? ""} />
    </DashboardShell>
  )
}

export default CustomerOrdersPage
