"use client"

import * as React from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import type { MenuItem } from "@/lib/api/menu"

export function EditMenuItemForm({ item }: { item: MenuItem }) {
  const router = useRouter()
  const [isSaving, setIsSaving] = React.useState(false)
  const [errorMessage, setErrorMessage] = React.useState("")

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsSaving(true)
    setErrorMessage("")
    const formData = new FormData(event.currentTarget)

    try {
      let images = item.images
      const imageFile = formData.get("image")
      if (imageFile instanceof File && imageFile.size > 0) {
        const uploadData = new FormData()
        uploadData.set("image", imageFile)
        const uploadResponse = await fetch("/api/uploads/menu-image", {
          method: "POST",
          body: uploadData,
        })
        const uploadResult = (await uploadResponse.json()) as {
          url?: string
          error?: string
        }
        if (!uploadResponse.ok || !uploadResult.url) {
          throw new Error(uploadResult.error ?? "Image upload failed")
        }
        images = [uploadResult.url]
      }

      const response = await fetch(`/api/backend/menu/${item._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          itemName: String(formData.get("itemName") ?? "").trim(),
          category: String(formData.get("category") ?? "").trim(),
          description: String(formData.get("description") ?? "").trim(),
          price: Number(formData.get("price")),
          location: String(formData.get("location") ?? "").trim(),
          images,
        }),
      })
      if (!response.ok) {
        const result = (await response.json().catch(() => null)) as { error?: string } | null
        throw new Error(result?.error ?? "Menu item could not be updated")
      }

      router.push("/dashboard/vendor/menu-items")
      router.refresh()
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "Menu item could not be updated")
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <Card className="max-w-3xl rounded-2xl border border-line bg-white ring-0">
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid gap-5 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="itemName">Item name</Label>
              <Input id="itemName" name="itemName" defaultValue={item.itemName} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Input id="category" name="category" defaultValue={item.category} required />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea id="description" name="description" defaultValue={item.description} rows={4} required />
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="price">Price</Label>
              <Input id="price" name="price" type="number" min="0.01" step="0.01" defaultValue={item.price} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input id="location" name="location" defaultValue={item.location} required />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="image">Replace image (optional)</Label>
            <Input id="image" name="image" type="file" accept="image/jpeg,image/png,image/webp" />
            <p className="text-xs text-ink-soft">JPG, PNG, or WebP. Maximum size 5 MB.</p>
            {item.images?.[0] ? (
              <Image src={item.images[0]} alt={item.itemName} width={96} height={96} className="size-24 rounded-xl object-cover" />
            ) : null}
          </div>
          {errorMessage ? <p role="alert" className="rounded-xl bg-brand-tint px-4 py-3 text-sm text-brand">{errorMessage}</p> : null}
          <Button type="submit" disabled={isSaving} className="rounded-xl bg-brand text-white hover:bg-brand-hover">
            {isSaving ? "Saving changes..." : "Save Changes"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
