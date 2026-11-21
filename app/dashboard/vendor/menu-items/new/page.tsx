"use client"

import * as React from "react"
import { ImagePlus, Info } from "lucide-react"
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
import { createmenu } from "@/lib/actions/menu"

const inputClassName =
  "h-11 rounded-xl border-line bg-white px-3.5 text-sm text-ink placeholder:text-[#9a8e82] focus-visible:border-brand focus-visible:ring-brand/15"

const labelClassName = "text-[13px] font-semibold text-ink"

const AddNewItems = () => {
  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const data = Object.fromEntries(new FormData(event.currentTarget))
    const result = await createmenu(data as unknown as FormData)
    console.log(result)
  }

  return (
    <div className="min-h-screen bg-cream px-5 py-6 sm:px-8 lg:px-10 lg:py-8">
      <div className="mx-auto w-full max-w-[1040px]">
        <p className="text-xs font-medium text-ink-soft">
          Vendor <span className="mx-1.5 text-line-strong">/</span> Add Menu Item
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
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category" className={labelClassName}>
                  Category
                </Label>
                <Select name="category" defaultValue="classic-pizzas">
                  <SelectTrigger
                    id="category"
                    className={`${inputClassName} w-full justify-between`}
                  >
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="classic-pizzas">Classic Pizzas</SelectItem>
                    <SelectItem value="signature-pizzas">
                      Signature Pizzas
                    </SelectItem>
                    <SelectItem value="sides">Sides</SelectItem>
                    <SelectItem value="drinks">Drinks</SelectItem>
                    <SelectItem value="desserts">Desserts</SelectItem>
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
                <Label
                  htmlFor="itemImage"
                  className="flex min-h-36 cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed border-line-strong bg-[#fdfaf7] px-4 py-6 text-center"
                >
                  <ImagePlus className="size-7 text-ink-soft" aria-hidden />
                  <span className="mt-3 text-sm font-medium text-ink">
                    Drop an image or browse.
                  </span>
                  <span className="mt-1 text-xs font-normal text-ink-soft">
                    Uploaded to ImgBB.
                  </span>
                  <Input
                    id="itemImage"
                    name="itemImage"
                    type="file"
                    accept="image/*"
                    className="sr-only"
                  />
                </Label>
              </CardContent>
            </Card>

            <Card className="rounded-2xl border border-line bg-white shadow-[0_1px_2px_rgba(31,26,23,0.04)] ring-0">
              <CardContent className="gap-2 p-5">
                <div className="flex items-center gap-2">
                  <Info className="size-4 text-brand" aria-hidden />
                  <p className={labelClassName}>Pending review</p>
                </div>
                <p className="text-xs leading-relaxed text-ink-soft">
                  New items are reviewed by an admin before they go live.
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
