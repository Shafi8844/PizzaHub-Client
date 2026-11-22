"use client"

import Image from "next/image"
import { MapPin, Tag, UtensilsCrossed } from "lucide-react"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import type { MenuItem } from "@/lib/api/menu"
import { useSession } from "@/lib/auth-client"

export function MenuItemDialog({ item }: { item: MenuItem }) {
  const image = item.images?.[0]
  const { data: session } = useSession()
  const user = session?.user
  const router = useRouter()

  return (
    <Dialog>
      <DialogTrigger
        render={
          <Button
            variant="outline"
            className="h-10 rounded-xl border-line px-4 text-sm text-ink-soft hover:bg-[#f5ede3] hover:text-ink"
          />
        }
      >
        View Details
      </DialogTrigger>

      <DialogContent className="overflow-hidden p-0 sm:max-w-2xl">
        <div className="grid sm:grid-cols-[240px_1fr]">
            <div className="relative min-h-56 bg-[#f5ede3] sm:min-h-full">
              {image ? (
                <Image
                  src={image}
                  alt={item.itemName}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, 240px"
                />
              ) : (
                <div className="flex h-full items-center justify-center text-ink-soft">
                  <UtensilsCrossed className="size-10" aria-hidden />
                </div>
              )}
            </div>

            <div className="p-6">
              <DialogHeader className="gap-3">
                <p className="text-xs font-semibold tracking-[0.12em] text-brand uppercase">
                  {item.category}
                </p>
                <DialogTitle className="font-heading text-2xl font-semibold tracking-[-0.02em] text-ink">
                  {item.itemName}
                </DialogTitle>
                <DialogDescription className="text-sm leading-relaxed text-ink-soft">
                  {item.description}
                </DialogDescription>
              </DialogHeader>

              <div className="mt-5 space-y-3 rounded-xl bg-[#fdfaf7] p-4">
                <div className="flex items-center justify-between gap-3 text-sm">
                  <span className="flex items-center gap-2 text-ink-soft">
                    <Tag className="size-4" aria-hidden />
                    Price
                  </span>
                  <span className="font-semibold text-ink">
                    ${Number(item.price).toFixed(2)}
                  </span>
                </div>
                <div className="flex items-center justify-between gap-3 text-sm">
                  <span className="flex items-center gap-2 text-ink-soft">
                    <MapPin className="size-4" aria-hidden />
                    Location
                  </span>
                  <span className="text-right font-medium text-ink">
                    {item.location}
                  </span>
                </div>
                <div className="flex items-center justify-between gap-3 text-sm">
                  <span className="text-ink-soft">Restaurant</span>
                  <span className="text-right font-medium text-ink">
                    {item.vendorName || "Local restaurant"}
                  </span>
                </div>
              </div>

              <DialogFooter className="mt-6">
                {user?.role === "customer" && user.id !== item.vendorId ? (
                  <Button
                    onClick={() => router.push(`/order/${item._id}`)}
                    className="h-11 rounded-xl bg-brand px-5 text-sm font-semibold text-white hover:bg-brand-hover"
                  >
                    Order Now
                  </Button>
                ) : !user ? (
                  <Button
                    onClick={() =>
                      router.push(
                        `/sign-in?redirectTo=${encodeURIComponent(`/menu/${item._id}`)}`
                      )
                    }
                    className="h-11 rounded-xl bg-brand px-5 text-sm font-semibold text-white hover:bg-brand-hover"
                  >
                    Sign in to order
                  </Button>
                ) : (
                  <p className="text-sm text-ink-soft">
                    {user.id === item.vendorId
                      ? "You cannot order your own menu item."
                      : "Only customers can place orders."}
                  </p>
                )}
              </DialogFooter>
            </div>
          </div>
      </DialogContent>
    </Dialog>
  )
}
