import Link from "next/link"
import { XCircle } from "lucide-react"

import Footer from "@/components/footer/footer"
import Nav from "@/components/navbar/nav"
import { Card, CardContent } from "@/components/ui/card"

export default function PaymentCancelPage() {
  return (
    <div className="min-h-screen bg-cream text-ink">
      <Nav />
      <main className="px-5 py-16 sm:px-8 sm:py-24">
        <Card className="mx-auto max-w-xl rounded-3xl border border-line bg-white ring-0">
          <CardContent className="p-8 text-center sm:p-12">
            <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-brand-tint text-brand">
              <XCircle className="size-7" aria-hidden />
            </div>
            <h1 className="mt-6 font-heading text-3xl font-semibold tracking-[-0.03em]">Payment cancelled</h1>
            <p className="mt-4 text-sm leading-relaxed text-ink-soft">
              Your Stripe checkout was cancelled. No payment was completed.
            </p>
            <Link href="/dashboard/vendor/subscription" className="mt-8 inline-flex h-11 items-center justify-center rounded-xl bg-brand px-5 font-semibold text-white hover:bg-brand-hover">
              Back to subscription
            </Link>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  )
}
