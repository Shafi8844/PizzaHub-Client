"use client"

import * as React from "react"
import { Info } from "lucide-react"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { createmenu, type NewMenuItem } from "@/lib/actions/menu"
import { useSession } from "@/lib/auth-client"
import { getVendorMenuCount } from "@/lib/api/menu"

const inputClassName =
  "h-11 rounded-xl border-line bg-white px-3.5 text-sm text-ink placeholder:text-[#9a8e82] focus-visible:border-brand focus-visible:ring-brand/15"

const labelClassName = "text-[13px] font-semibold text-ink"

const AddNewItems = () => {
  const router = useRouter()
  const { data: session } = useSession()

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {

    event.preventDefault()
    const formData = new FormData(event.currentTarget)

    if(session?.user && session?.user?.role === "vendor") {
      const countResult = await getVendorMenuCount (`vendorId=${session.user.id}`)
      if (countResult.count >= 3) {
        router.push("/payment")
        return
      }
      else{
        const payload: NewMenuItem = {
      vendorId: session?.user?.id ?? "",
      itemName: String(formData.get("itemName") ?? "").trim(),
      category: String(formData.get("category") ?? "").trim(),
      description: String(formData.get("description") ?? "").trim(),
      price: Number(formData.get("price") ?? 0),
      location: String(formData.get("location") ?? "").trim(),
      images: [String(formData.get("image") ?? "").trim()].filter(Boolean),
      status: "pending",
      createdAt: new Date().toISOString(),
    }

    const result = await createmenu(payload)
    if (result?.insertedId) {
      router.push("/dashboard/vendor/menu-items")
      router.refresh()
    }
      }
    }
    
  }

  return (
    <div className="min-h-screen bg-cream px-5 py-6 sm:px-8 lg:px-10 lg:py-8">
      <div className="mx-auto w-full max-w-[1040px]">
        <p className="text-xs font-medium text-ink-soft">
          Vendor <span className="mx-1.5 text-line-strong">/</span> Add Menu
          Item
        </p>
        <h1 className="mt-3 font-heading text-3xl font-semibold tracking-[-0.02em] text-ink">
          Add Menu Item
        </h1>

        <form
          onSubmit={handleSubmit}
          className="mt-7 grid gap-6 lg:grid-cols-[minmax(0,1fr)_300px]"
        >
          <Card className="rounded-2xl border border-line bg-white shadow-[0_1px_2px_rgba(31,26,23,0.04)] ring-0">
            <CardContent className="gap-5 p-6">
              <div className="space-y-2">
                <Label htmlFor="itemName" className={labelClassName}>
                  Item name
                </Label>
                <Input
                  id="itemName"
                  name="itemName"
                  placeholder="e.g. Classic Margherita"
                  className={inputClassName}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category" className={labelClassName}>
                  Category
                </Label>
                <Select name="category" defaultValue="Classic Pizzas">
                  <SelectTrigger
                    id="category"
                    className={`${inputClassName} w-full justify-between`}
                  >
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Classic Pizzas">Classic Pizzas</SelectItem>
                    <SelectItem value="Signature Pizzas">
                      Signature Pizzas
                    </SelectItem>
                    <SelectItem value="Sides">Sides</SelectItem>
                    <SelectItem value="Drinks">Drinks</SelectItem>
                    <SelectItem value="Desserts">Desserts</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description" className={labelClassName}>
                  Description
                </Label>
                <Textarea
                  id="description"
                  name="description"
                  rows={5}
                  placeholder="Describe the item, its toppings and flavours..."
                  className="min-h-32 resize-none rounded-xl border-line bg-white p-3.5 text-sm text-ink placeholder:text-[#9a8e82] focus-visible:border-brand focus-visible:ring-brand/15"
                  required
                />
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="price" className={labelClassName}>
                    Price
                  </Label>
                  <div className="flex h-11 items-center rounded-xl border border-line bg-white px-3.5 focus-within:border-brand focus-within:ring-2 focus-within:ring-brand/15">
                    <span className="text-sm font-medium text-ink-soft">$</span>
                    <Input
                      id="price"
                      name="price"
                      type="number"
                      min="0"
                      step="0.01"
                      placeholder="0.00"
                      className="h-full border-0 bg-transparent pl-2 shadow-none focus-visible:ring-0"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location" className={labelClassName}>
                    Location (area / city)
                  </Label>
                  <Input
                    id="location"
                    name="location"
                    placeholder="e.g. Dhanmondi, Dhaka"
                    className={inputClassName}
                    required
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-4">
            <Card className="rounded-2xl border border-line bg-white shadow-[0_1px_2px_rgba(31,26,23,0.04)] ring-0">
              <CardHeader className="p-5 pb-0">
                <CardTitle className={labelClassName}>Item image</CardTitle>
              </CardHeader>
              <CardContent className="p-5 pt-3">
                <div className="space-y-2">
                  <Label htmlFor="image" className="sr-only">
                    Image URL
                  </Label>
                  <Input
                    id="image"
                    name="image"
                    type="url"
                    placeholder="https://..."
                    className={inputClassName}
                    required
                  />
                  <p className="text-xs text-ink-soft">
                    Provide a public image URL for this menu item.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-2xl border border-line bg-white shadow-[0_1px_2px_rgba(31,26,23,0.04)] ring-0">
              <CardContent className="gap-2 p-5">
                <div className="flex items-center gap-2">
                  <Info className="size-4 text-brand" aria-hidden />
                  <p className={labelClassName}>Pending review</p>
                </div>
                <p className="text-xs leading-relaxed text-ink-soft">
                  New items are submitted with <span className="font-medium">pending</span>{" "}
                  status and reviewed before they go live.
                </p>
              </CardContent>
            </Card>

            <Button
              type="submit"
              className="h-11 w-full rounded-xl bg-brand text-sm font-semibold text-white hover:bg-brand-hover"
            >
              Submit for approval
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddNewItems
