import Link from "next/link"
import { redirect } from "next/navigation"
import { ArrowRight, Check } from "lucide-react"

import Footer from "@/components/footer/footer"
import Nav from "@/components/navbar/nav"
import { Card, CardContent } from "@/components/ui/card"
import { getSession } from "@/lib/core/server"
import { stripe } from "@/lib/stripe"

type SuccessPageProps = {
  searchParams: Promise<{ session_id?: string }>
}

export default async function SuccessPage({ searchParams }: SuccessPageProps) {
  const { session_id: sessionId } = await searchParams

  if (!sessionId || !stripe) {
    redirect("/payment")
  }

  const userSession = await getSession()
  if (!userSession) redirect("/sign-in")
  if (userSession.user.role !== "vendor") redirect(`/dashboard/${userSession.user.role}`)

  let session

  try {
    session = await stripe.checkout.sessions.retrieve(sessionId)
  } catch {
    redirect("/payment")
  }

  if (session.metadata?.userId !== userSession.user.id) {
    redirect("/dashboard/vendor/subscription")
  }

  if (session.status !== "complete" || session.payment_status !== "paid") {
    return (
      <main className="mx-auto max-w-xl px-6 py-20 text-center">
        <h1 className="text-2xl font-semibold">Payment not completed</h1>
        <p className="mt-3 text-sm text-muted-foreground">
          This checkout session has not been paid. You can return to the payment
          page and try again.
        </p>
        <Link className="mt-6 inline-block underline" href="/payment">
          Return to payment
        </Link>
      </main>
    )
  }

  const customerEmail = session.customer_details?.email ?? session.customer_email

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
              Payment successful
            </h1>
            <p className="mt-4 text-sm leading-relaxed text-ink-soft">
              Your Premium subscription payment is confirmed.
              {customerEmail ? (
                <> A receipt will be sent to <span className="font-medium text-ink">{customerEmail}</span>.</>
              ) : null}
            </p>
            <p className="mt-3 text-sm leading-relaxed text-ink-soft">
              Premium access will be activated securely as Stripe confirms your subscription.
            </p>
            <Link
              href="/dashboard/vendor/subscription"
              className="mt-8 inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-brand px-5 font-semibold text-white transition-colors hover:bg-brand-hover"
            >
              Return to subscription
              <ArrowRight className="size-4" aria-hidden />
            </Link>
            <p className="mt-6 text-xs text-ink-soft">
              Need help? <a className="underline" href="mailto:orders@example.com">Contact support</a>
            </p>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  )
}
