import { getOrders } from "@/lib/api/order"
import { auth } from "@/lib/auth"
import { headers } from "next/headers"
import { DashboardShell } from "../../_components/dashboard-shell"
import { VendorOrdersTable } from "./_components/vendor-orders-table"

const VendorOrdersPage = async () => {
  const session = await auth.api.getSession({ headers: await headers() })
  const vendorId = session?.user?.id
  const orders = vendorId ? await getOrders(`vendorId=${vendorId}`) : []

  return (
    <DashboardShell
      breadcrumb="Vendor / Customer Orders"
      title="Customer Orders"
      description="Review incoming orders and accept or reject pending requests."
    >
      <VendorOrdersTable initialOrders={orders} vendorId={vendorId ?? ""} />
    </DashboardShell>
  )
}

export default VendorOrdersPage
