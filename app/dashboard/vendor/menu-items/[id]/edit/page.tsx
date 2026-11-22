import { notFound } from "next/navigation"

import { getMenuItemById } from "@/lib/api/menu"
import { createBackendToken } from "@/lib/api/backend-token"
import { DashboardShell } from "@/app/dashboard/_components/dashboard-shell"
import { EditMenuItemForm } from "./_components/edit-menu-item-form"

export default async function EditMenuItemPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const token = await createBackendToken()
  const item = token ? await getMenuItemById(id, token) : null

  if (!item) notFound()

  return (
    <DashboardShell
      breadcrumb="Vendor / My Menu Items / Edit"
      title="Edit Menu Item"
      description="Update your menu details. Replacing the image is optional."
    >
      <EditMenuItemForm item={item} />
    </DashboardShell>
  )
}
