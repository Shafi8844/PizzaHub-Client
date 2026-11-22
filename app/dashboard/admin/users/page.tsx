import { getUsers } from "@/lib/api/users"
import { createBackendToken } from "@/lib/api/backend-token"
import { DashboardShell } from "../../_components/dashboard-shell"
import { AdminUsersTable } from "./_components/admin-users-table"

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>

function getParam(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value
}

const AdminUsersPage = async ({ searchParams }: { searchParams: SearchParams }) => {
  const params = await searchParams
  const search = getParam(params.search) ?? ""
  const role = getParam(params.role) ?? "all"
  const query = new URLSearchParams()
  if (search) query.set("search", search)
  if (role && role !== "all") query.set("role", role)
  const token = await createBackendToken()
  const users = await getUsers(query.toString(), token ?? undefined)

  return (
    <DashboardShell
      breadcrumb="Admin / Manage Users"
      title="Manage Users"
      description="View, search, filter, block, or unblock users."
    >
      <AdminUsersTable initialUsers={users} search={search} role={role} />
    </DashboardShell>
  )
}

export default AdminUsersPage
