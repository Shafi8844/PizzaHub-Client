import { auth } from "@/lib/auth"
import { headers } from "next/headers"
import { DashboardShell } from "../../_components/dashboard-shell"
import { ProfileSettings } from "../../_components/profile-settings"

const CustomerSettingsPage = async () => {
  const session = await auth.api.getSession({ headers: await headers() })
  return (
    <DashboardShell breadcrumb="Customer / Profile Settings" title="Profile Settings" description="Manage your customer account details.">
      <ProfileSettings user={session?.user} />
    </DashboardShell>
  )
}

export default CustomerSettingsPage
