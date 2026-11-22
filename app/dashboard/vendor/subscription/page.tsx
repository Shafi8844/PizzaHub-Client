import Link from "next/link"
import { Check, Crown, Sparkles } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const plans = [
  {
    name: "Free",
    price: "$0",
    period: "/month",
    description: "For vendors getting started on PizzaHub.",
    features: [
      "Max 3 active menu items",
      "Basic vendor dashboard",
      "Order management",
    ],
    cta: "Current Plan",
    href: "/dashboard/vendor/subscription",
    featured: false,
  },
  {
    name: "Premium",
    price: "$19",
    period: "/month",
    description: "Grow your menu and stand out to customers.",
    features: [
      "Unlimited active items",
      "Premium vendor badge",
      "Featured menu placement",
      "All Free features",
    ],
    cta: "Upgrade to Premium",
    href: "/payment?plan=premium&amount=19",
    featured: true,
  },
]

const SubscriptionPage = () => {
  return (
    <div className="min-h-screen bg-cream px-5 py-6 sm:px-8 lg:px-10 lg:py-8">
      <div className="mx-auto w-full max-w-[1040px]">
        <p className="text-xs font-medium text-ink-soft">
          Vendor <span className="mx-1.5 text-line-strong">/</span> Subscription
        </p>
        <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="font-heading text-3xl font-semibold tracking-[-0.02em] text-ink">
              Subscription Plans
            </h1>
            <p className="mt-2 text-sm text-ink-soft">
              Choose the plan that fits your PizzaHub vendor business.
            </p>
          </div>
          <div className="inline-flex items-center gap-2 rounded-full bg-brand-tint px-3 py-1.5 text-xs font-semibold text-brand">
            <Crown className="size-3.5" aria-hidden />
            Vendor billing
          </div>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {plans.map((plan) => (
            <Card
              key={plan.name}
              className={`rounded-2xl border bg-white shadow-[0_1px_2px_rgba(31,26,23,0.04)] ring-0 ${
                plan.featured ? "border-brand/30" : "border-line"
              }`}
            >
              <CardHeader className="p-6 pb-0">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs font-semibold tracking-[0.12em] text-brand uppercase">
                      {plan.name}
                    </p>
                    <CardTitle className="mt-2 font-heading text-2xl font-semibold text-ink">
                      {plan.name} Plan
                    </CardTitle>
                  </div>
                  {plan.featured ? (
                    <span className="inline-flex items-center gap-1 rounded-full bg-brand-tint px-2.5 py-1 text-[11px] font-semibold text-brand">
                      <Sparkles className="size-3.5" aria-hidden />
                      Recommended
                    </span>
                  ) : null}
                </div>
                <div className="mt-4 flex items-end gap-1">
                  <span className="font-heading text-4xl font-semibold text-ink">
                    {plan.price}
                  </span>
                  <span className="pb-1 text-sm text-ink-soft">{plan.period}</span>
                </div>
                <p className="mt-2 text-sm text-ink-soft">{plan.description}</p>
              </CardHeader>
              <CardContent className="p-6">
                <ul className="space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3 text-sm text-ink">
                      <span className="mt-0.5 rounded-full bg-leaf-tint p-1 text-leaf">
                        <Check className="size-3.5" aria-hidden />
                      </span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                {plan.featured ? (
                  <Button
                    render={<Link href={plan.href} />}
                    className="mt-6 h-11 w-full rounded-xl bg-brand text-sm font-semibold text-white hover:bg-brand-hover"
                  >
                    {plan.cta}
                  </Button>
                ) : (
                  <Button
                    variant="outline"
                    disabled
                    className="mt-6 h-11 w-full rounded-xl border-line text-sm font-semibold text-ink-soft"
                  >
                    {plan.cta}
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

export default SubscriptionPage
