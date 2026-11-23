import { getSession } from "@/lib/core/server"
import { DashboardShell } from "../../_components/dashboard-shell"
import { ProfileSettings } from "../../_components/profile-settings"

export default async function AdminSettingsPage() {
  const session = await getSession()

  return (
    <DashboardShell
      breadcrumb="Admin / Profile Settings"
      title="Profile Settings"
      description="Update your account name and profile image. Your role and access remain managed securely."
    >
      <ProfileSettings user={session?.user} />
    </DashboardShell>
  )
}
