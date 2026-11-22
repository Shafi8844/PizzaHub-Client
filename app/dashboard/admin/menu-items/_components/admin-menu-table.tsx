"use client"

import * as React from "react"
import Image from "next/image"
import { usePathname, useRouter, useSearchParams } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { MenuItem, MenuItemStatus } from "@/app/dashboard/vendor/menu-items/page"

const statusStyles: Record<MenuItemStatus, string> = {
  approved: "bg-leaf-tint text-leaf",
  pending: "bg-gold-tint text-gold",
  rejected: "bg-brand-tint text-brand",
  inactive: "bg-[#f3ece3] text-ink-soft",
}

export function AdminMenuTable({
  initialItems,
  search,
  status,
}: {
  initialItems: MenuItem[]
  search: string
  status: string
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

  async function patchItem(id: string, body: Record<string, unknown>) {
    setLoadingId(id)
    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5050"}/menu/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      })
      router.refresh()
    } finally {
      setLoadingId(null)
    }
  }

  async function deleteItem(id: string) {
    setLoadingId(id)
    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5050"}/menu/${id}`, { method: "DELETE" })
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
            placeholder="Search menu items"
            className="h-10 rounded-xl border-line"
            onKeyDown={(e) => {
              if (e.key === "Enter") setParam("search", (e.target as HTMLInputElement).value)
            }}
          />
          <Select value={status} onValueChange={(v) => setParam("status", v ?? "all")}>
            <SelectTrigger className="h-10 w-full rounded-xl border-line sm:w-[180px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All statuses</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="approved">Approved</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[980px] text-left">
            <thead>
              <tr className="border-b border-line bg-[#fdfaf7] text-xs font-semibold tracking-wide text-ink-soft uppercase">
                <th className="px-5 py-4">Item</th>
                <th className="px-5 py-4">Vendor</th>
                <th className="px-5 py-4">Status</th>
                <th className="px-5 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {initialItems.length === 0 ? (
                <tr><td colSpan={4} className="px-5 py-12 text-center text-sm text-ink-soft">No menu items found.</td></tr>
              ) : initialItems.map((item) => (
                <tr key={item._id} className="border-b border-line align-top last:border-b-0">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <Image src={item.images?.[0] || "/placeholder.png"} alt={item.itemName} width={52} height={52} className="size-[52px] rounded-xl object-cover ring-1 ring-line" />
                      <div>
                        <p className="text-sm font-medium text-ink">{item.itemName}</p>
                        <p className="mt-1 text-xs text-ink-soft">{item.category} · ${Number(item.price).toFixed(2)}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-sm text-ink-soft">{item.vendorId || "—"}</td>
                  <td className="px-5 py-4">
                    <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold capitalize ${statusStyles[item.status] ?? statusStyles.pending}`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex flex-wrap justify-end gap-2">
                      <Button size="sm" disabled={loadingId === item._id} onClick={() => patchItem(item._id, { status: "approved" })} className="rounded-lg bg-leaf text-white hover:bg-leaf/90">Approve</Button>
                      <Button size="sm" variant="outline" disabled={loadingId === item._id} onClick={() => patchItem(item._id, { status: "rejected" })} className="rounded-lg border-brand/30 text-brand hover:bg-brand-tint">Reject</Button>
                      <Button size="sm" variant="outline" disabled={loadingId === item._id} onClick={() => patchItem(item._id, { status: "inactive" })} className="rounded-lg border-line text-ink-soft hover:bg-[#f5ede3]">Inactive</Button>
                      <Button size="sm" variant="outline" disabled={loadingId === item._id} onClick={() => deleteItem(item._id)} className="rounded-lg border-brand/30 text-brand hover:bg-brand-tint">Delete</Button>
                    </div>
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
