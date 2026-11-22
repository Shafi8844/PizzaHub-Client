"use client"

import * as React from "react"
import { useRouter } from "next/navigation"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { authClient } from "@/lib/auth-client"

type UserLike = {
  name?: string | null
  email?: string | null
  image?: string | null
  role?: string | null
}

export function ProfileSettings({ user }: { user?: UserLike }) {
  const [name, setName] = React.useState(user?.name ?? "")
  const [image, setImage] = React.useState(user?.image ?? "")
  const [isSaving, setIsSaving] = React.useState(false)
  const [message, setMessage] = React.useState("")
  const [errorMessage, setErrorMessage] = React.useState("")
  const email = user?.email ?? ""
  const router = useRouter()
  const initials = (name || email || "U")
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0])
    .join("")
    .toUpperCase()

  async function saveProfile(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsSaving(true)
    setMessage("")
    setErrorMessage("")

    try {
      const { error } = await authClient.updateUser({ name: name.trim(), image: image.trim() || null })
      if (error) {
        setErrorMessage(error.message ?? "Profile could not be updated")
        return
      }
      setMessage("Profile updated")
      router.refresh()
    } catch {
      setErrorMessage("Profile could not be updated. Please try again.")
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <Card className="max-w-2xl rounded-2xl border border-line bg-white shadow-[0_1px_2px_rgba(31,26,23,0.04)] ring-0">
      <CardContent className="space-y-6 p-6">
        <div className="flex items-center gap-4">
          <Avatar className="size-14">
          <AvatarImage src={image || undefined} alt={name || "User"} />
            <AvatarFallback className="bg-brand-tint text-brand">{initials}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-semibold text-ink">{name || "Account"}</p>
            <p className="text-sm capitalize text-ink-soft">{user?.role || "user"}</p>
          </div>
        </div>
        <form onSubmit={saveProfile} className="space-y-5">
          <div className="grid gap-5 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="profile-name" className="text-[13px] font-semibold text-ink">Name</Label>
              <Input id="profile-name" value={name} onChange={(event) => setName(event.target.value)} required maxLength={100} className="h-11 rounded-xl border-line text-ink" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="profile-email" className="text-[13px] font-semibold text-ink">Email</Label>
              <Input id="profile-email" value={email} readOnly className="h-11 rounded-xl border-line bg-[#fdfaf7] text-ink" />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="profile-image" className="text-[13px] font-semibold text-ink">Profile image URL</Label>
            <Input id="profile-image" type="url" value={image} onChange={(event) => setImage(event.target.value)} placeholder="https://..." className="h-11 rounded-xl border-line text-ink" />
          </div>
          {errorMessage ? <p role="alert" className="rounded-xl bg-brand-tint px-4 py-3 text-sm text-brand">{errorMessage}</p> : null}
          {message ? <p role="status" className="rounded-xl bg-leaf-tint px-4 py-3 text-sm text-leaf">{message}</p> : null}
          <Button type="submit" disabled={isSaving} className="rounded-xl bg-brand text-white hover:bg-brand-hover">
            {isSaving ? "Saving..." : "Save Profile"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
