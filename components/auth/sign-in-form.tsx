"use client"

import React, { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { authClient } from "@/lib/auth-client"
import Logo from "@/components/logo"

const fieldClassName =
  "mt-1.5 h-11 w-full rounded-xl border border-line bg-white px-3.5 text-sm text-ink shadow-none outline-none transition placeholder:text-[#8a7f74] focus-visible:border-brand focus-visible:ring-2 focus-visible:ring-brand/15"

export default function SignInForm() {
  const [errorMessage, setErrorMessage] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()

  async function handleSignIn(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setErrorMessage("")
    setIsSubmitting(true)

    const formData = new FormData(event.currentTarget)
    const email = String(formData.get("email") ?? "").trim()
    const password = String(formData.get("password") ?? "")

    try {
      const { error } = await authClient.signIn.email({
        email,
        password,
        callbackURL: "/",
      })

      if (error) {
        setErrorMessage(
          error.message ?? "We couldn't sign you in. Please try again."
        )
        return
      }

      router.push("/")
    } catch {
      setErrorMessage("We couldn't sign you in. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="w-full max-w-[400px]">
      <Logo className="mb-7" />

      <div className="mb-5">
        <h2 className="font-heading text-3xl font-semibold tracking-[-0.02em] text-ink sm:text-[34px]">
          Sign In
        </h2>
        <p className="mt-1.5 text-sm text-ink-soft">
          Welcome back. Your next pizza is a few clicks away.
        </p>
      </div>

      <Button
        type="button"
        variant="outline"
        className="h-11 w-full rounded-xl border-line bg-white text-sm font-medium text-ink hover:bg-[#fffaf5]"
      >
        Continue with Google
      </Button>
      <div className="my-4 flex items-center gap-3 text-xs text-ink-soft">
        <span className="h-px flex-1 bg-line" />
        or use your email
        <span className="h-px flex-1 bg-line" />
      </div>

      <form onSubmit={handleSignIn} className="space-y-3.5">
        <div>
          <label htmlFor="email" className="text-[13px] font-semibold text-ink">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="you@email.com"
            autoComplete="email"
            required
            className={fieldClassName}
          />
        </div>
        <div>
          <label
            htmlFor="password"
            className="text-[13px] font-semibold text-ink"
          >
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            placeholder="Your password"
            autoComplete="current-password"
            required
            className={fieldClassName}
          />
        </div>

        {errorMessage && (
          <p
            role="alert"
            className="rounded-xl border border-[#f3c9c2] bg-[#fdf1ef] px-3.5 py-2.5 text-sm text-[#a3281a]"
          >
            {errorMessage}
          </p>
        )}

        <Button
          type="submit"
          disabled={isSubmitting}
          className="h-11 w-full rounded-xl bg-brand text-sm font-semibold text-white hover:bg-brand-hover"
        >
          {isSubmitting ? "Signing in..." : "Sign In"}
        </Button>
      </form>

      <p className="mt-5 text-center text-sm text-ink-soft">
        New here?{" "}
        <Link href="/sign-up" className="font-medium text-ink hover:text-brand">
          Sign Up
        </Link>
      </p>
    </div>
  )
}
