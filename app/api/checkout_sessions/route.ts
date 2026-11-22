import { NextResponse } from "next/server"

import { stripe } from "@/lib/stripe"
import { getSession } from "@/lib/core/server"

export async function POST(req: Request) {
  try {
    if (!stripe) {
      return NextResponse.json(
        { error: "STRIPE_SECRET_KEY is not configured" },
        { status: 500 }
      )
    }

    const userSession = await getSession()
    if (!userSession) {
      return NextResponse.json({ error: "Sign in to upgrade your subscription" }, { status: 401 })
    }
    if (userSession.user.role !== "vendor") {
      return NextResponse.json({ error: "Only vendors can purchase this subscription" }, { status: 403 })
    }
    const currentUser = userSession.user as typeof userSession.user & {
      banned?: boolean
      blocked?: boolean
    }
    if (currentUser.banned || currentUser.blocked) {
      return NextResponse.json({ error: "This account cannot make purchases" }, { status: 403 })
    }

    const origin =
      process.env.NEXT_PUBLIC_APP_URL ??
      process.env.BETTER_AUTH_URL ??
      new URL(req.url).origin
    const userId = userSession.user.id
    const metadata = { userId }

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      customer_email: userSession?.user?.email ?? undefined,
      client_reference_id: userId,
      metadata,
      subscription_data: { metadata },
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: "usd",
            unit_amount: 1900,
            recurring: { interval: "month" },
            product_data: {
              name: "PizzaHub Premium Vendor Plan",
              description: "Monthly subscription for PizzaHub vendors",
            },
          },
        },
      ],
      success_url: `${origin}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/payment?canceled=1`,
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
