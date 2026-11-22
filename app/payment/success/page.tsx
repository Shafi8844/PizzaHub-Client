import Link from "next/link"
import { redirect } from "next/navigation"
import { ArrowRight, Check } from "lucide-react"

import Footer from "@/components/footer/footer"
import Nav from "@/components/navbar/nav"
import { Card, CardContent } from "@/components/ui/card"
import { getSession } from "@/lib/core/server"

type SuccessPageProps = {
  searchParams: Promise<{ session_id?: string }>
}

export default async function SuccessPage({ searchParams }: SuccessPageProps) {
  const { session_id: sessionId } = await searchParams
  const userSession = await getSession()
  if (!userSession) redirect("/sign-in")
  if (userSession.user.role !== "vendor") redirect(`/dashboard/${userSession.user.role}`)
  if (!sessionId) redirect("/dashboard/vendor/subscription")

  return (
    <div className="min-h-screen bg-cream text-ink">
      <Nav />
      <main className="px-5 py-16 sm:px-8 sm:py-24">
        <Card className="mx-auto max-w-xl rounded-3xl border border-line bg-white shadow-[0_12px_40px_rgba(31,26,23,0.08)] ring-0">
          <CardContent className="p-8 text-center sm:p-12">
            <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-leaf-tint text-leaf">
              <Check className="size-7" aria-hidden />
            </div>
            <p className="mt-6 text-xs font-semibold tracking-[0.12em] text-brand uppercase">
              Vendor subscription
            </p>
            <h1 className="mt-3 font-heading text-3xl font-semibold tracking-[-0.03em] text-ink sm:text-4xl">
              Payment submitted
            </h1>
            <p className="mt-4 text-sm leading-relaxed text-ink-soft">
              Your Stripe checkout was completed. Premium access is activated only after verified Stripe webhook confirmation on the server.
            </p>
            <Link
              href="/dashboard/vendor/subscription"
              className="mt-8 inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-brand px-5 font-semibold text-white transition-colors hover:bg-brand-hover"
            >
              Return to subscription
              <ArrowRight className="size-4" aria-hidden />
            </Link>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  )
}
