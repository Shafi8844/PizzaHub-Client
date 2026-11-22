"use client"

import * as React from "react"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import type { Order, OrderStatus } from "@/lib/api/order"

const statusStyles: Record<OrderStatus, string> = {
  pending: "bg-gold-tint text-gold",
  accepted: "bg-leaf-tint text-leaf",
  rejected: "bg-brand-tint text-brand",
  cancelled: "bg-[#f3ece3] text-ink-soft",
}

export function VendorOrdersTable({
  initialOrders,
  vendorId,
}: {
  initialOrders: Order[]
  vendorId: string
}) {
  const router = useRouter()
  const [loadingId, setLoadingId] = React.useState<string | null>(null)

  async function updateStatus(order: Order, status: "accepted" | "rejected") {
    if (order.status !== "pending") return
    setLoadingId(order._id)
    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5050"}/orders/${order._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status, vendorId }),
      })
      router.refresh()
    } finally {
      setLoadingId(null)
    }
  }

  return (
    <Card className="rounded-2xl border border-line bg-white shadow-[0_1px_2px_rgba(31,26,23,0.04)] ring-0">
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[980px] text-left">
            <thead>
              <tr className="border-b border-line bg-[#fdfaf7] text-xs font-semibold tracking-wide text-ink-soft uppercase">
                <th className="px-5 py-4">Customer</th>
                <th className="px-5 py-4">Item</th>
                <th className="px-5 py-4">Delivery</th>
                <th className="px-5 py-4">Message</th>
                <th className="px-5 py-4">Status</th>
                <th className="px-5 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {initialOrders.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-5 py-12 text-center text-sm text-ink-soft">
                    No customer orders yet.
                  </td>
                </tr>
              ) : (
                initialOrders.map((order) => (
                  <tr key={order._id} className="border-b border-line align-top last:border-b-0">
                    <td className="px-5 py-4 text-sm">
                      <p className="font-medium text-ink">{order.customerName}</p>
                      <p className="mt-1 text-ink-soft">{order.customerEmail || "—"}</p>
                      <p className="mt-1 text-ink-soft">{order.phone || "—"}</p>
                    </td>
                    <td className="px-5 py-4 text-sm">
                      <p className="font-medium text-ink">{order.itemName}</p>
                      <p className="mt-1 text-ink-soft">
                        Qty: {order.quantity ?? 1} · ${Number(order.totalPrice ?? order.unitPrice ?? 0).toFixed(2)}
                      </p>
                    </td>
                    <td className="px-5 py-4 text-sm text-ink-soft">
                      <p>{order.deliveryDate || "Not specified"}</p>
                      <p className="mt-1 max-w-[220px]">{order.deliveryAddress}</p>
                    </td>
                    <td className="px-5 py-4 text-sm text-ink-soft">
                      <p className="max-w-[220px]">{order.note || "—"}</p>
                    </td>
                    <td className="px-5 py-4">
                      <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold capitalize ${statusStyles[order.status] ?? statusStyles.pending}`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex justify-end gap-2">
                        <Button
                          size="sm"
                          disabled={order.status !== "pending" || loadingId === order._id}
                          onClick={() => updateStatus(order, "accepted")}
                          className="rounded-lg bg-leaf text-white hover:bg-leaf/90 disabled:opacity-50"
                        >
                          Accept
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          disabled={order.status !== "pending" || loadingId === order._id}
                          onClick={() => updateStatus(order, "rejected")}
                          className="rounded-lg border-brand/30 text-brand hover:bg-brand-tint disabled:opacity-50"
                        >
                          Reject
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  )
}
