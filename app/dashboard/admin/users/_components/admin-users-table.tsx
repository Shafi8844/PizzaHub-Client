"use client"

import * as React from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { User } from "@/lib/api/users"

export function AdminUsersTable({
  initialUsers,
  search,
  role,
}: {
  initialUsers: User[]
  search: string
  role: string
}) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [loadingId, setLoadingId] = React.useState<string | null>(null)

  function setParam(key: string, value: string) {
    const params = new URLSearchParams(searchParams.toString())
    if (value && value !== "all") params.set(key, value)
    else params.delete(key)
    router.push(`${pathname}?${params.toString()}`)
  }

  async function toggleBlock(user: User) {
    setLoadingId(user._id)
    try {
      await fetch(`/api/backend/users/${user._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ blocked: !user.blocked }),
      })
      router.refresh()
    } finally {
      setLoadingId(null)
    }
  }

  return (
    <Card className="rounded-2xl border border-line bg-white shadow-[0_1px_2px_rgba(31,26,23,0.04)] ring-0">
      <CardContent className="p-0">
        <div className="flex flex-col gap-3 border-b border-line p-4 sm:flex-row">
          <Input
            defaultValue={search}
            placeholder="Search by name or email"
            className="h-10 rounded-xl border-line"
            onKeyDown={(e) => {
              if (e.key === "Enter") setParam("search", (e.target as HTMLInputElement).value)
            }}
          />
          <Select value={role} onValueChange={(v) => setParam("role", v ?? "all")}>
            <SelectTrigger className="h-10 w-full rounded-xl border-line sm:w-[180px]">
              <SelectValue placeholder="Role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All roles</SelectItem>
              <SelectItem value="customer">Customer</SelectItem>
              <SelectItem value="vendor">Vendor</SelectItem>
              <SelectItem value="admin">Admin</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] text-left">
            <thead>
              <tr className="border-b border-line bg-[#fdfaf7] text-xs font-semibold tracking-wide text-ink-soft uppercase">
                <th className="px-5 py-4">User</th>
                <th className="px-5 py-4">Role</th>
                <th className="px-5 py-4">Status</th>
                <th className="px-5 py-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {initialUsers.length === 0 ? (
                <tr><td colSpan={4} className="px-5 py-12 text-center text-sm text-ink-soft">No users found.</td></tr>
              ) : initialUsers.map((user) => (
                <tr key={user._id} className="border-b border-line last:border-b-0">
                  <td className="px-5 py-4">
                    <p className="text-sm font-medium text-ink">{user.name || "Unnamed user"}</p>
                    <p className="mt-1 text-sm text-ink-soft">{user.email}</p>
                  </td>
                  <td className="px-5 py-4 text-sm capitalize text-ink-soft">{user.role || "customer"}</td>
                  <td className="px-5 py-4">
                    <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${user.blocked ? "bg-brand-tint text-brand" : "bg-leaf-tint text-leaf"}`}>
                      {user.blocked ? "Blocked" : "Active"}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-right">
                    <Button
                      size="sm"
                      variant="outline"
                      disabled={loadingId === user._id}
                      onClick={() => toggleBlock(user)}
                      className="rounded-lg border-line text-ink-soft hover:bg-[#f5ede3] hover:text-ink"
                    >
                      {user.blocked ? "Unblock" : "Block"}
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  )
}
