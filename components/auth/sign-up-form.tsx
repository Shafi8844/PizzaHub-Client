"use client"

import React, { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { authClient } from "@/lib/auth-client"
import Logo from "@/components/logo"

const roles = [
  { value: "customer", label: "Customer" },
  { value: "vendor", label: "Vendor" },
] as const
type Role = (typeof roles)[number]["value"]

const fieldClassName =
  "mt-1.5 h-11 w-full rounded-xl border border-line bg-white px-3.5 text-sm text-ink shadow-none outline-none transition placeholder:text-[#8a7f74] focus-visible:border-brand focus-visible:ring-2 focus-visible:ring-brand/15"

function FormField({
  id,
  label,
  type = "text",
  placeholder,
  accept,
  autoComplete,
  required = false,
}: {
  id: string
  label: string
  type?: string
  placeholder?: string
  accept?: string
  autoComplete?: string
  required?: boolean
}) {
  return (
    <div>
      <label htmlFor={id} className="text-[13px] font-semibold text-ink">
        {label}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        placeholder={placeholder}
        accept={accept}
        autoComplete={autoComplete}
        required={required}
        className={`${fieldClassName} ${type === "file" ? "cursor-pointer file:mr-3 file:cursor-pointer file:rounded-lg file:border file:border-line file:bg-[#fdfbf8] file:px-3 file:py-1.5 file:text-xs file:font-medium file:text-ink-soft" : ""}`}
      />
    </div>
  )
}

function RolePicker({
  value,
  onChange,
}: {
  value: Role
  onChange: (role: Role) => void
}) {
  return (
    <fieldset>
      <legend className="text-[13px] font-semibold text-ink">
        Account role
      </legend>
      <div
        role="radiogroup"
        aria-label="Account role"
        className="mt-2 grid grid-cols-3 gap-2"
      >
        {roles.map(({ value: roleValue, label }) => {
          const selected = value === roleValue
          return (
            <button
              key={roleValue}
              type="button"
              role="radio"
              aria-checked={selected}
              onClick={() => onChange(roleValue)}
              className={`min-h-11 rounded-xl border px-2 text-sm font-medium transition-colors focus-visible:ring-2 focus-visible:ring-brand/30 focus-visible:outline-none ${
                selected
                  ? "border-brand bg-brand-tint text-ink ring-1 ring-brand"
                  : "border-line bg-white text-ink hover:border-brand/50"
              }`}
            >
              {label}
            </button>
          )
        })}
      </div>
    </fieldset>
  )
}

export default function SignUpForm() {
  const [role, setRole] = useState<Role>("customer")
  const [errorMessage, setErrorMessage] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()

  async function handleSignUp(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setErrorMessage("")
    setIsSubmitting(true)

    const formData = new FormData(event.currentTarget)
    const name = String(formData.get("fullName") ?? "").trim()
    const email = String(formData.get("email") ?? "").trim()
    const password = String(formData.get("password") ?? "")

    try {
      const { error } = await authClient.signUp.email({
        name,
        email,
        password,
        signupRole: role,
        callbackURL: "/",
      })

      if (error) {
        setErrorMessage(
          error.message ?? "We couldn't create your account. Please try again."
        )
        return
      }

      router.push(`/dashboard/${role}`)
      router.refresh()
    } catch {
      setErrorMessage("We couldn't create your account. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="w-full max-w-[400px]">
      <Logo className="mb-7" />

      <div className="mb-5">
        <h2 className="font-heading text-3xl font-semibold tracking-[-0.02em] text-ink sm:text-[34px]">
          Sign Up
        </h2>
        <p className="mt-1.5 text-sm text-ink-soft">
          Create your PizzaHub account.
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

      <form onSubmit={handleSignUp} className="space-y-3.5">
        <FormField
          id="fullName"
          label="Full name"
          autoComplete="name"
          required
        />
        <FormField
          id="email"
          label="Email"
          type="email"
          placeholder="you@email.com"
          autoComplete="email"
          required
        />
        <FormField
          id="password"
          label="Password"
          type="password"
          placeholder="Min 8 characters"
          autoComplete="new-password"
          required
        />
        <FormField
          id="profileImage"
          label="Profile image (optional)"
          type="file"
          accept="image/*"
        />
        <RolePicker value={role} onChange={setRole} />
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
          {isSubmitting ? "Creating account..." : "Sign Up"}
        </Button>
      </form>

      <p className="mt-5 text-center text-sm text-ink-soft">
        Have an account?{" "}
        <Link href="/sign-in" className="font-medium text-ink hover:text-brand">
          Sign In
        </Link>
      </p>
    </div>
  )
}
