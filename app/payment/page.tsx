import { CreditCard, Lock, ShieldCheck } from "lucide-react"

import Nav from "@/components/navbar/nav"
import Footer from "@/components/footer/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const inputClassName =
  "h-11 rounded-xl border-line bg-white px-3.5 text-sm text-ink placeholder:text-[#9a8e82] focus-visible:border-brand focus-visible:ring-brand/15"

const labelClassName = "text-[13px] font-semibold text-ink"

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>

function getParam(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value
}

const PaymentPage = async ({
  searchParams,
}: {
  searchParams: SearchParams
}) => {
  const params = await searchParams
  const plan = getParam(params.plan) ?? "premium"
  const amount = Number(getParam(params.amount) ?? "19")
  const isPremium = plan === "premium"
  const planName = isPremium ? "Premium Vendor Plan" : "Vendor Plan"
  const total = Number.isFinite(amount) ? amount : 19

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
              Complete subscription payment
            </h1>
            <p className="mt-4 text-base leading-relaxed text-ink-soft">
              This is a static Stripe-style payment page for vendor subscription
              checkout. No real payment is processed.
            </p>
          </div>

          <div className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
            <Card className="rounded-2xl border border-line bg-white shadow-[0_1px_2px_rgba(31,26,23,0.04)] ring-0">
              <CardHeader className="p-6 pb-0">
                <CardTitle className="font-heading text-2xl font-semibold text-ink">
                  Payment details
                </CardTitle>
                <p className="mt-2 text-sm text-ink-soft">
                  Enter your card information to subscribe securely.
                </p>
              </CardHeader>
              <CardContent className="p-6">
                <form className="space-y-5">
                  <div className="space-y-2">
                    <Label htmlFor="email" className={labelClassName}>
                      Vendor email
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="vendor@example.com"
                      className={inputClassName}
                      defaultValue="vendor@pizzahub.com"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="cardNumber" className={labelClassName}>
                      Card number
                    </Label>
                    <div className="relative">
                      <Input
                        id="cardNumber"
                        placeholder="4242 4242 4242 4242"
                        className={`${inputClassName} pr-11`}
                        defaultValue="4242 4242 4242 4242"
                      />
                      <CreditCard
                        className="absolute top-1/2 right-3.5 size-4 -translate-y-1/2 text-ink-soft"
                        aria-hidden
                      />
                    </div>
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="expiry" className={labelClassName}>
                        Expiration date
                      </Label>
                      <Input
                        id="expiry"
                        placeholder="MM / YY"
                        className={inputClassName}
                        defaultValue="12 / 28"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cvc" className={labelClassName}>
                        CVC
                      </Label>
                      <Input
                        id="cvc"
                        placeholder="123"
                        className={inputClassName}
                        defaultValue="123"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="nameOnCard" className={labelClassName}>
                      Name on card
                    </Label>
                    <Input
                      id="nameOnCard"
                      placeholder="Full name on card"
                      className={inputClassName}
                      defaultValue="PizzaHub Vendor"
                    />
                  </div>

                  <Button
                    type="button"
                    className="h-11 w-full rounded-xl bg-brand text-sm font-semibold text-white hover:bg-brand-hover"
                  >
                    Pay ${total.toFixed(2)}
                  </Button>

                  <div className="flex items-center justify-center gap-2 text-xs text-ink-soft">
                    <Lock className="size-3.5" aria-hidden />
                    <span>Powered by Stripe-style secure checkout (demo)</span>
                  </div>
                </form>
              </CardContent>
            </Card>

            <div className="space-y-4">
              <Card className="rounded-2xl border border-line bg-white shadow-[0_1px_2px_rgba(31,26,23,0.04)] ring-0">
                <CardHeader className="p-5 pb-0">
                  <CardTitle className="text-base font-semibold text-ink">
                    Subscription summary
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-5 pt-4">
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-ink-soft">{planName}</span>
                      <span className="font-medium text-ink">
                        ${total.toFixed(2)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-ink-soft">Billing cycle</span>
                      <span className="font-medium text-ink">Monthly</span>
                    </div>
                    <div className="border-t border-line pt-3 flex items-center justify-between">
                      <span className="font-semibold text-ink">Total</span>
                      <span className="font-semibold text-ink">
                        ${total.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="rounded-2xl border border-line bg-[#fffdfa] shadow-[0_1px_2px_rgba(31,26,23,0.04)] ring-0">
                <CardContent className="gap-3 p-5">
                  <div className="flex items-center gap-2 text-brand">
                    <ShieldCheck className="size-4" aria-hidden />
                    <p className="text-sm font-semibold text-ink">Secure checkout</p>
                  </div>
                  <p className="text-xs leading-relaxed text-ink-soft">
                    Your payment information is encrypted and handled securely.
                    This vendor payment page is a static UI mock and does not
                    charge a real card.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default PaymentPage
