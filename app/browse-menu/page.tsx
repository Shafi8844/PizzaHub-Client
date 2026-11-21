import Image from "next/image"
import Link from "next/link"
import { Search, SlidersHorizontal, UtensilsCrossed } from "lucide-react"

import Nav from "@/components/navbar/nav"
import Footer from "@/components/footer/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { getMenuItems } from "@/lib/api/menu"
import type { MenuItem } from "@/app/dashboard/vendor/menu-items/page"
import { MenuItemDialog } from "./_components/menu-item-dialog"

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>

function getParam(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value
}

const BrowseMenu = async ({ searchParams }: { searchParams: SearchParams }) => {
  const params = await searchParams
  const search = getParam(params.search) ?? ""
  const category = getParam(params.category) ?? "all"
  const location = getParam(params.location) ?? "all"

  const query = new URLSearchParams()
  if (search) query.set("search", search)
  if (category !== "all") query.set("category", category)
  if (location !== "all") query.set("location", location)

  const menuItems = await getMenuItems(query.toString())

  const categories = [
    "all",
    ...new Set(menuItems.map((item) => item.category).filter(Boolean)),
  ]
  const locations = [
    "all",
    ...new Set(menuItems.map((item) => item.location).filter(Boolean)),
  ]

  return (
    <div className="min-h-screen bg-cream text-ink">
      <Nav />
      <main className="px-5 py-10 sm:px-8 lg:px-10 lg:py-14">
        <div className="mx-auto w-full max-w-[1200px]">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold tracking-[0.12em] text-brand uppercase">
              Browse Menu
            </p>
            <h1 className="mt-3 font-heading text-4xl font-semibold tracking-[-0.03em] text-ink sm:text-5xl">
              Find your next favorite slice
            </h1>
            <p className="mt-4 text-base leading-relaxed text-ink-soft">
              Search by name, filter by category or location, and discover
              delicious items from PizzaHub vendors.
            </p>
          </div>

          <Card className="mt-8 rounded-2xl border border-line bg-white shadow-[0_1px_2px_rgba(31,26,23,0.04)] ring-0">
            <CardContent className="p-4 sm:p-5">
              <form className="grid gap-3 md:grid-cols-[1fr_220px_220px_auto]">
                <div className="relative">
                  <Search
                    className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-ink-soft"
                    aria-hidden
                  />
                  <Input
                    name="search"
                    defaultValue={search}
                    placeholder="Search pizza, sides, location..."
                    className="h-11 rounded-xl border-line bg-white pl-10 text-sm text-ink placeholder:text-[#9a8e82] focus-visible:border-brand focus-visible:ring-brand/15"
                  />
                </div>

                <Select name="category" defaultValue={category}>
                  <SelectTrigger className="h-11 w-full rounded-xl border-line bg-white px-3.5 text-sm text-ink focus-visible:border-brand focus-visible:ring-brand/15">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((value) => (
                      <SelectItem key={value} value={value}>
                        {value === "all" ? "All Categories" : value}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select name="location" defaultValue={location}>
                  <SelectTrigger className="h-11 w-full rounded-xl border-line bg-white px-3.5 text-sm text-ink focus-visible:border-brand focus-visible:ring-brand/15">
                    <SelectValue placeholder="Location" />
                  </SelectTrigger>
                  <SelectContent>
                    {locations.map((value) => (
                      <SelectItem key={value} value={value}>
                        {value === "all" ? "All Locations" : value}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <div className="flex gap-2">
                  <Button
                    type="submit"
                    className="h-11 flex-1 rounded-xl bg-brand px-5 text-sm font-semibold text-white hover:bg-brand-hover md:flex-none"
                  >
                    <SlidersHorizontal className="size-4" aria-hidden />
                    Apply
                  </Button>
                  {(search || category !== "all" || location !== "all") && (
                    <Button
                      render={<Link href="/browse-menu" />}
                      variant="outline"
                      className="h-11 rounded-xl border-line px-4 text-sm text-ink-soft hover:bg-[#f5ede3] hover:text-ink"
                    >
                      Clear
                    </Button>
                  )}
                </div>
              </form>
            </CardContent>
          </Card>

          <div className="mt-8 flex items-center justify-between gap-4">
            <p className="text-sm text-ink-soft">
              Showing <span className="font-semibold text-ink">{menuItems.length}</span>{" "}
              item{menuItems.length === 1 ? "" : "s"}
            </p>
          </div>

          {menuItems.length > 0 ? (
            <div className="mt-5 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {menuItems.map((item: MenuItem) => (
                <Card
                  key={item._id}
                  className="overflow-hidden rounded-2xl border border-line bg-white shadow-[0_1px_2px_rgba(31,26,23,0.04)] ring-0"
                >
                  <div className="relative aspect-[4/3] bg-[#f5ede3]">
                    {item.images?.[0] ? (
                      <Image
                        src={item.images[0]}
                        alt={item.itemName}
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center text-ink-soft">
                        <UtensilsCrossed className="size-10" aria-hidden />
                      </div>
                    )}
                  </div>
                  <CardContent className="gap-3 p-5">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-xs font-semibold tracking-wide text-brand uppercase">
                          {item.category}
                        </p>
                        <h2 className="mt-1 font-heading text-xl font-semibold text-ink">
                          {item.itemName}
                        </h2>
                      </div>
                      <p className="shrink-0 text-lg font-semibold text-ink">
                        ${Number(item.price).toFixed(2)}
                      </p>
                    </div>
                    <p className="line-clamp-2 text-sm leading-relaxed text-ink-soft">
                      {item.description}
                    </p>
                    <div className="flex items-center justify-between gap-3 pt-1">
                      <p className="truncate text-xs text-ink-soft">{item.location}</p>
                      <span className="rounded-full bg-[#f5ede3] px-2.5 py-1 text-[11px] font-semibold capitalize text-ink-soft">
                        {item.status || "pending"}
                      </span>
                    </div>
                    <div className="pt-2">
                      <MenuItemDialog item={item} />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="mt-5 rounded-2xl border border-dashed border-line-strong bg-[#fffdfa] ring-0">
              <CardContent className="items-center py-14 text-center">
                <div className="rounded-full bg-brand-tint p-3 text-brand">
                  <UtensilsCrossed className="size-6" aria-hidden />
                </div>
                <h2 className="mt-4 font-heading text-xl font-semibold text-ink">
                  No menu items found
                </h2>
                <p className="mt-2 max-w-md text-sm text-ink-soft">
                  Try adjusting your search or filters to find what you’re looking for.
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default BrowseMenu
