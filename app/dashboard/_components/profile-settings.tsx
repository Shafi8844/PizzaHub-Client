import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

type UserLike = {
  name?: string | null
  email?: string | null
  image?: string | null
  role?: string | null
}

export function ProfileSettings({ user }: { user?: UserLike }) {
  const name = user?.name ?? ""
  const email = user?.email ?? ""
  const initials = (name || email || "U")
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0])
    .join("")
    .toUpperCase()

  return (
    <Card className="max-w-2xl rounded-2xl border border-line bg-white shadow-[0_1px_2px_rgba(31,26,23,0.04)] ring-0">
      <CardContent className="space-y-6 p-6">
        <div className="flex items-center gap-4">
          <Avatar className="size-14">
            <AvatarImage src={user?.image ?? undefined} alt={name || "User"} />
            <AvatarFallback className="bg-brand-tint text-brand">{initials}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-semibold text-ink">{name || "Account"}</p>
            <p className="text-sm capitalize text-ink-soft">{user?.role || "user"}</p>
          </div>
        </div>
        <div className="grid gap-5 sm:grid-cols-2">
          <div className="space-y-2">
            <Label className="text-[13px] font-semibold text-ink">Name</Label>
            <Input value={name} readOnly className="h-11 rounded-xl border-line bg-[#fdfaf7] text-ink" />
          </div>
          <div className="space-y-2">
            <Label className="text-[13px] font-semibold text-ink">Email</Label>
            <Input value={email} readOnly className="h-11 rounded-xl border-line bg-[#fdfaf7] text-ink" />
          </div>
        </div>
        <p className="text-xs text-ink-soft">Profile editing can be wired to your auth/user update endpoint; this page currently displays account details.</p>
      </CardContent>
    </Card>
  )
}
