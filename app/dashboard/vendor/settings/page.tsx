import { auth } from "@/lib/auth"
import { headers } from "next/headers"
import { DashboardShell } from "../../_components/dashboard-shell"
import { ProfileSettings } from "../../_components/profile-settings"

const VendorSettingsPage = async () => {
  const session = await auth.api.getSession({ headers: await headers() })
  return (
    <DashboardShell breadcrumb="Vendor / Profile Settings" title="Profile Settings" description="Manage your vendor account details.">
      <ProfileSettings user={session?.user} />
    </DashboardShell>
  )
}

export default VendorSettingsPage
