"use client"

import * as React from "react"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useSession } from "@/lib/auth-client"
import { createOrder } from "@/lib/api/order"
import type { MenuItem } from "@/lib/api/menu"

const inputClassName =
  "h-11 rounded-xl border-line bg-white px-3.5 text-sm text-ink placeholder:text-[#9a8e82] focus-visible:border-brand focus-visible:ring-brand/15"

const labelClassName = "text-[13px] font-semibold text-ink"

export function OrderForm({ item }: { item: MenuItem }) {
  const router = useRouter()
  const { data: session } = useSession()
  const user = session?.user
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState("")

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError("")

    if (!user) {
      router.push(`/sign-in?redirectTo=${encodeURIComponent(`/order/${item._id}`)}`)
      return
    }

    const formData = new FormData(event.currentTarget)
    const quantity = Math.max(1, Number(formData.get("quantity") ?? 1))

    const orderDetails = {
      menuItemId: item._id,
      vendorId: item.vendorId,
      itemName: item.itemName,
      itemImage: item.images?.[0] ?? "",
      unitPrice: Number(item.price),
      quantity,
      totalPrice: Number(item.price) * quantity,
      customerId: user.id,
      customerName: String(formData.get("customerName") ?? user.name ?? "").trim(),
      customerEmail: String(formData.get("customerEmail") ?? user.email ?? "").trim(),
      deliveryAddress: String(formData.get("deliveryAddress") ?? "").trim(),
      phone: String(formData.get("phone") ?? "").trim(),
      deliveryDate: String(formData.get("deliveryDate") ?? "").trim(),
      note: String(formData.get("note") ?? "").trim(),
      status: "pending",
      createdAt: new Date().toISOString(),
    }

    try {
      setLoading(true)
      const res = await createOrder(orderDetails)
      if (res?.insertedId) {
        router.push("/dashboard/customer/orders")
        router.refresh()
      }
    } catch {
      setError("Could not place the order. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="customerName" className={labelClassName}>
            Full name
          </Label>
          <Input
            id="customerName"
            name="customerName"
            defaultValue={user?.name ?? ""}
            className={inputClassName}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="customerEmail" className={labelClassName}>
            Email
          </Label>
          <Input
            id="customerEmail"
            name="customerEmail"
            type="email"
            defaultValue={user?.email ?? ""}
            className={inputClassName}
            required
          />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-3">
        <div className="space-y-2">
          <Label htmlFor="phone" className={labelClassName}>
            Phone number
          </Label>
          <Input
            id="phone"
            name="phone"
            placeholder="e.g. 01XXXXXXXXX"
            className={inputClassName}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="quantity" className={labelClassName}>
            Quantity
          </Label>
          <Input
            id="quantity"
            name="quantity"
            type="number"
            min="1"
            defaultValue="1"
            className={inputClassName}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="deliveryDate" className={labelClassName}>
            Delivery date
          </Label>
          <Input
            id="deliveryDate"
            name="deliveryDate"
            type="date"
            className={inputClassName}
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="deliveryAddress" className={labelClassName}>
          Delivery address
        </Label>
        <Textarea
          id="deliveryAddress"
          name="deliveryAddress"
          rows={4}
          placeholder="House, road, area, city..."
          className="min-h-28 resize-none rounded-xl border-line bg-white p-3.5 text-sm text-ink placeholder:text-[#9a8e82] focus-visible:border-brand focus-visible:ring-brand/15"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="note" className={labelClassName}>
          Order note <span className="font-normal text-ink-soft">(optional)</span>
        </Label>
        <Textarea
          id="note"
          name="note"
          rows={3}
          placeholder="Any special instruction?"
          className="min-h-24 resize-none rounded-xl border-line bg-white p-3.5 text-sm text-ink placeholder:text-[#9a8e82] focus-visible:border-brand focus-visible:ring-brand/15"
        />
      </div>

      {error ? <p className="text-sm text-brand">{error}</p> : null}

      <Button
        type="submit"
        disabled={loading}
        className="h-11 w-full rounded-xl bg-brand text-sm font-semibold text-white hover:bg-brand-hover disabled:opacity-60"
      >
        {loading ? "Placing order..." : "Place Order"}
      </Button>
    </form>
  )
}
