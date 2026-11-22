import Image from "next/image"
import Link from "next/link"
import { Pencil, Plus } from "lucide-react"
import { headers } from "next/headers"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { getMenuItems, type MenuItem, type MenuItemStatus } from "@/lib/api/menu"
import { createBackendToken } from "@/lib/api/backend-token"
import { DeleteJobDialog } from "@/app/components/DeleteJobDialog"
import { auth } from "@/lib/auth"

const statusStyles: Record<MenuItemStatus, string> = {
  approved: "bg-leaf-tint text-leaf",
  pending: "bg-gold-tint text-gold",
  rejected: "bg-brand-tint text-brand",
  inactive: "bg-[#f3ece3] text-ink-soft",
}

const MenuItemsPage = async () => {
  const session = await auth.api.getSession({ headers: await headers() })
  const vendorId = session?.user?.id
  const token = await createBackendToken()
  const menu = vendorId ? await getMenuItems("", token ?? undefined) : []

  return (
    <div className="min-h-screen bg-cream px-5 py-6 sm:px-8 lg:px-10 lg:py-8">
      <div className="mx-auto w-full max-w-[1040px]">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-medium text-ink-soft">
              Vendor <span className="mx-1.5 text-line-strong">/</span> Menu Items
            </p>
            <h1 className="mt-3 font-heading text-3xl font-semibold tracking-[-0.02em] text-ink">
              My Menu Items
            </h1>
            <p className="mt-2 text-sm text-ink-soft">
              Manage your own menu items, approval status, and availability.
            </p>
          </div>

          <Button
            render={<Link href="/dashboard/vendor/menu-items/new" />}
            className="h-11 rounded-xl bg-brand px-4 text-sm font-semibold text-white hover:bg-brand-hover"
          >
            <Plus className="size-4" aria-hidden />
            Add Menu Item
          </Button>
        </div>

        <Card className="mt-7 rounded-2xl border border-line bg-white shadow-[0_1px_2px_rgba(31,26,23,0.04)] ring-0">
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[760px] text-left">
                <thead>
                  <tr className="border-b border-line bg-[#fdfaf7] text-xs font-semibold tracking-wide text-ink-soft uppercase">
                    <th className="px-6 py-4">Item</th>
                    <th className="px-6 py-4">Category</th>
                    <th className="px-6 py-4">Price</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4">Availability</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {menu.map((item: MenuItem) => (
                    <tr
                      key={item._id}
                      className="border-b border-line last:border-b-0"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-4">
                          <Image
                            src={item.images?.[0] || "/placeholder.png"}
                            alt={item.itemName}
                            width={56}
                            height={56}
                            className="size-14 rounded-xl object-cover ring-1 ring-line"
                          />
                          <div className="min-w-0">
                            <p className="font-medium text-ink">{item.itemName}</p>
                            <p className="mt-1 max-w-[320px] truncate text-sm text-ink-soft">
                              {item.description}
                            </p>
                            <p className="mt-1 text-xs text-ink-soft">
                              {item.location}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-ink-soft">
                        {item.category}
                      </td>
                      <td className="px-6 py-4 text-sm font-medium text-ink">
                        ${item.price.toFixed(2)}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold capitalize ${statusStyles[item.status] ?? statusStyles.pending}`}
                        >
                          {item.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-ink-soft">
                        {item.status === "approved" ? "Active" : item.status === "inactive" ? "Inactive" : "Awaiting review"}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="outline"
                            size="icon-sm"
                            className="rounded-lg border-line text-ink-soft hover:bg-[#f5ede3] hover:text-ink"
                            aria-label={`Edit ${item.itemName}`}
                            render={<Link href={`/dashboard/vendor/menu-items/${item._id}/edit`} />}
                          >
                            <Pencil className="size-4" aria-hidden />
                          </Button>
                          <DeleteJobDialog menu={item} />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default MenuItemsPage
