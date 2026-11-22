import Image from "next/image"
import Link from "next/link"
import { notFound, redirect } from "next/navigation"
import { ArrowLeft, MapPin, ShoppingBag } from "lucide-react"

import Nav from "@/components/navbar/nav"
import Footer from "@/components/footer/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { getMenuItemById } from "@/lib/api/menu"
import { createBackendToken } from "@/lib/api/backend-token"
import { getSession } from "@/lib/core/server"
import { OrderForm } from "./_components/order-form"

type Props = {
  params: Promise<{ id: string }>
}

const OrderPage = async ({ params }: Props) => {
  const { id } = await params
  const session = await getSession()
  if (!session) redirect(`/sign-in?redirectTo=${encodeURIComponent(`/order/${id}`)}`)
  if (session.user.role !== "customer") {
    redirect(`/dashboard/${session.user.role}`)
  }

  const token = await createBackendToken()
  const item = await getMenuItemById(id, token ?? undefined)
  if (!item || item.status !== "approved") notFound()
  if (item.vendorId === session.user.id) redirect("/browse-menu")

  const image = item.images?.[0]

  return (
    <div className="min-h-screen bg-cream text-ink">
      <Nav />
      <main className="px-5 py-10 sm:px-8 lg:px-10 lg:py-14">
        <div className="mx-auto w-full max-w-[1040px]">
          <Link
            href="/browse-menu"
            className="inline-flex items-center gap-2 text-sm font-medium text-ink-soft hover:text-ink"
          >
            <ArrowLeft className="size-4" aria-hidden />
            Back to menu
          </Link>

          <div className="mt-5 grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
            <Card className="rounded-2xl border border-line bg-white shadow-[0_1px_2px_rgba(31,26,23,0.04)] ring-0">
              <CardHeader className="p-6 pb-0">
                <p className="text-xs font-semibold tracking-[0.12em] text-brand uppercase">
                  Place Order
                </p>
                <CardTitle className="mt-2 font-heading text-3xl font-semibold tracking-[-0.02em] text-ink">
                  Complete your order
                </CardTitle>
                <p className="mt-2 text-sm text-ink-soft">
                  Provide your delivery details to order this menu item.
                </p>
              </CardHeader>
              <CardContent className="p-6">
                <OrderForm item={item} />
              </CardContent>
            </Card>

            <Card className="overflow-hidden rounded-2xl border border-line bg-white shadow-[0_1px_2px_rgba(31,26,23,0.04)] ring-0">
              <div className="relative aspect-[4/3] bg-[#f5ede3]">
                {image ? (
                  <Image
                    src={image}
                    alt={item.itemName}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 360px"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-ink-soft">
                    <ShoppingBag className="size-10" aria-hidden />
                  </div>
                )}
              </div>
              <CardContent className="gap-3 p-5">
                <p className="text-xs font-semibold tracking-wide text-brand uppercase">
                  {item.category}
                </p>
                <h2 className="font-heading text-2xl font-semibold text-ink">
                  {item.itemName}
                </h2>
                <p className="text-sm leading-relaxed text-ink-soft">
                  {item.description}
                </p>
                <div className="mt-2 space-y-2 rounded-xl bg-[#fdfaf7] p-4 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-ink-soft">Price</span>
                    <span className="font-semibold text-ink">
                      ${Number(item.price).toFixed(2)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between gap-3">
                    <span className="flex items-center gap-2 text-ink-soft">
                      <MapPin className="size-4" aria-hidden />
                      Location
                    </span>
                    <span className="text-right font-medium text-ink">
                      {item.location}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default OrderPage
