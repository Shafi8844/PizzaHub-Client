import Link from "next/link"
import { redirect } from "next/navigation"

import { stripe } from "@/lib/stripe"

type SuccessPageProps = {
  searchParams: Promise<{ session_id?: string }>
}

export default async function SuccessPage({ searchParams }: SuccessPageProps) {
  const { session_id: sessionId } = await searchParams

  if (!sessionId || !stripe) {
    redirect("/payment")
  }

  let session

  try {
    session = await stripe.checkout.sessions.retrieve(sessionId)
  } catch {
    redirect("/payment")
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

  return (
    <main className="mx-auto max-w-xl px-6 py-20 text-center">
      <section id="success">
        <h1 className="text-2xl font-semibold">Payment successful</h1>
        <p className="mt-3 text-sm text-muted-foreground">
          We appreciate your business!
          {session.customer_details?.email ? (
            <> A confirmation email will be sent to {session.customer_details.email}.</>
          ) : (
            " Your payment is confirmed."
          )}
        </p>
        <p className="mt-3 text-sm text-muted-foreground">
          If you have any questions, please email{" "}
          <a className="underline" href="mailto:orders@example.com">
            orders@example.com
          </a>
          .
        </p>
        <Link className="mt-6 inline-block underline" href="/">
          Return to PizzaHub
        </Link>
      </section>
    </main>
  )
}
