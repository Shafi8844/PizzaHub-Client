import { NextResponse } from "next/server"
import { headers } from "next/headers"

import { stripe } from "@/lib/stripe"
import { getSession } from "@/lib/core/server"

export async function POST(req: Request) {

    const userSession = await getSession()
    
  try {
    if (!stripe) {
      return NextResponse.json(
        { error: "STRIPE_SECRET_KEY is not configured" },
        { status: 500 }
      )
    }

    const headersList = await headers()
    const origin = headersList.get("origin") ?? process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000"

    const formData = await req.formData()
    const plan = String(formData.get("plan") ?? "premium")
    const amount = Number(formData.get("amount") ?? 19)
    const total = Number.isFinite(amount) && amount > 0 ? amount : 19
    const planName = plan === "premium" ? "Premium Vendor Plan" : "Vendor Plan"

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      customer_email: userSession?.user?.email ?? undefined,
      metadata: {
        userId:userSession?.user?.id,
      },
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: "usd",
            unit_amount: Math.round(total * 100),
            product_data: {
              name: planName,
              description: "PizzaHub vendor subscription",
            },
          },
        },
      ],
      success_url: `${origin}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/payment?plan=${encodeURIComponent(plan)}&amount=${encodeURIComponent(String(total))}&canceled=1`,
    })

    if (!session.url) {
      return NextResponse.json(
        { error: "Stripe session URL missing" },
        { status: 500 }
      )
    }

    return NextResponse.redirect(session.url, 303)
  } catch (err) {
    const error = err as Error & { statusCode?: number }
    return NextResponse.json(
      { error: error.message },
      { status: error.statusCode || 500 }
    )
  }
}