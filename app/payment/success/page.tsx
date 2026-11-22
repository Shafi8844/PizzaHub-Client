import Link from "next/link"
import { redirect } from "next/navigation"

import { stripe } from "@/lib/stripe"
import { checkVerify } from "@/lib/actions/payments"

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

  let verification: Awaited<ReturnType<typeof checkVerify>> | null = null
  let verificationError: string | null = null

  try {
    verification = await checkVerify(sessionId)
    console.log("Stripe checkout verification:", verification)
  } catch (error) {
    verificationError =
      error instanceof Error ? error.message : "Unknown verification error"
    console.error("Stripe checkout verification failed:", verificationError)
  }

  const customerEmail =
    session.customer_details?.email ?? session.customer_email ?? verification?.email

  return (
    <main className="mx-auto max-w-xl px-6 py-20 text-center">
      <section id="success">
        <h1 className="text-2xl font-semibold">Payment successful</h1>
        <p className="mt-3 text-sm text-muted-foreground">
          We appreciate your business!
          {customerEmail ? (
            <> A confirmation email will be sent to {customerEmail}.</>
          ) : (
            " Your payment is confirmed."
          )}
        </p>
        {verification?.success ? (
          <p className="mt-3 text-sm text-muted-foreground">
            Your vendor subscription has been verified.
          </p>
        ) : verificationError ? (
          <p className="mt-3 text-sm text-muted-foreground">
            Your payment succeeded, but subscription verification did not
            finish. Please contact support.
          </p>
        ) : null}
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
