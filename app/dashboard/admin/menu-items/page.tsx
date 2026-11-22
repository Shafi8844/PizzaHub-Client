import { getMenuItems } from "@/lib/api/menu"
import { DashboardShell } from "../../_components/dashboard-shell"
import { AdminMenuTable } from "./_components/admin-menu-table"

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>
function getParam(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value
}

const AdminMenuItemsPage = async ({ searchParams }: { searchParams: SearchParams }) => {
  const params = await searchParams
  const search = getParam(params.search) ?? ""
  const status = getParam(params.status) ?? "all"
  const query = new URLSearchParams()
  if (search) query.set("search", search)
  if (status && status !== "all") query.set("status", status)
  const items = await getMenuItems(query.toString())

  return (
    <DashboardShell
      breadcrumb="Admin / Manage Menu Items"
      title="Manage Menu Items"
      description="Review, approve, reject, update status, or delete menu submissions."
    >
      <AdminMenuTable initialItems={items} search={search} status={status} />
    </DashboardShell>
  )
}

export default AdminMenuItemsPage
