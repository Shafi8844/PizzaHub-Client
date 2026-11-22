import { ArrowRight, Lock, ShieldCheck } from "lucide-react"

import Nav from "@/components/navbar/nav"
import Footer from "@/components/footer/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

function getParam(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value
}

const PaymentPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) => {
  const params = await searchParams
  const plan = getParam(params.plan) ?? "premium"
  const canceled = getParam(params.canceled)

  const isPremium = plan === "premium"
  const planName = isPremium ? "Premium Vendor Plan" : "Vendor Plan"
  const total = 19

  return (
    <div className="min-h-screen bg-cream text-ink">
      <Nav />
      <main className="px-5 py-10 sm:px-8 lg:px-10 lg:py-14">
        <div className="mx-auto w-full max-w-[1040px]">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold tracking-[0.12em] text-brand uppercase">
              Vendor Payment
            </p>
            <h1 className="mt-3 font-heading text-4xl font-semibold tracking-[-0.03em] text-ink sm:text-5xl">
              Redirect to Stripe checkout
            </h1>
            <p className="mt-4 text-base leading-relaxed text-ink-soft">
              Confirm your vendor subscription and continue to Stripe&apos;s
              secure payment page.
            </p>
            {canceled ? (
              <p className="mt-4 rounded-xl bg-brand-tint px-4 py-3 text-sm text-brand">
                Payment was canceled. You can try again when ready.
              </p>
            ) : null}
          </div>

          <div className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
            <Card className="rounded-2xl border border-line bg-white shadow-[0_1px_2px_rgba(31,26,23,0.04)] ring-0">
              <CardHeader className="p-6 pb-0">
                <CardTitle className="font-heading text-2xl font-semibold text-ink">
                  Subscription checkout
                </CardTitle>
                <p className="mt-2 text-sm text-ink-soft">
                  You&apos;ll be redirected to Stripe to complete payment
                  securely.
                </p>
              </CardHeader>
              <CardContent className="p-6">
                <div className="rounded-2xl bg-[#fdfaf7] p-5">
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-ink-soft">Plan</span>
                      <span className="font-medium text-ink">{planName}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-ink-soft">Billing</span>
                      <span className="font-medium text-ink">Monthly</span>
                    </div>
                    <div className="flex items-center justify-between border-t border-line pt-3">
                      <span className="font-semibold text-ink">Total</span>
                      <span className="font-semibold text-ink">
                        ${total.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>

                <form action="/api/checkout_sessions" method="POST" className="mt-6">
                  <input type="hidden" name="plan" value={plan} />
                  <input type="hidden" name="amount" value={String(total)} />
                  <Button
                    type="submit"
                    className="h-11 w-full rounded-xl bg-brand text-sm font-semibold text-white hover:bg-brand-hover"
                  >
                    Continue to Stripe
                    <ArrowRight className="size-4" aria-hidden />
                  </Button>
                </form>

                <div className="mt-4 flex items-center justify-center gap-2 text-xs text-ink-soft">
                  <Lock className="size-3.5" aria-hidden />
                  <span>Secure redirect to Stripe Checkout</span>
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-2xl border border-line bg-[#fffdfa] shadow-[0_1px_2px_rgba(31,26,23,0.04)] ring-0">
              <CardContent className="gap-3 p-5">
                <div className="flex items-center gap-2 text-brand">
                  <ShieldCheck className="size-4" aria-hidden />
                  <p className="text-sm font-semibold text-ink">Before you continue</p>
                </div>
                <p className="text-xs leading-relaxed text-ink-soft">
                  Card details are collected on Stripe, not on PizzaHub. After
                  payment, Stripe can redirect back to your app based on your
                  checkout session configuration.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default PaymentPage
