"use client"

import React, { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { authClient } from "@/lib/auth-client"

const roles = ["Customer", "Vendor", "Admin"] as const
type Role = (typeof roles)[number]

const fieldClassName =
  "mt-1.5 h-10 w-full rounded-xl border border-[#e4d8cb] bg-white px-3 text-sm text-[#29231f] shadow-none outline-none transition focus-visible:border-[#cf301d] focus-visible:ring-2 focus-visible:ring-[#cf301d]/15"

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
      <label htmlFor={id} className="text-xs font-semibold text-[#29231f]">
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
        className={`${fieldClassName} ${type === "file" ? "file:mr-3 file:border-0 file:bg-transparent file:text-xs file:font-medium file:text-[#6d6259]" : ""}`}
      />
    </div>
  )
}

function RolePicker({ value, onChange }: { value: Role; onChange: (role: Role) => void }) {
  return (
    <fieldset>
      <legend className="text-xs font-semibold text-[#29231f]">Account role</legend>
      <div role="radiogroup" aria-label="Account role" className="mt-2 grid grid-cols-3 gap-2">
        {roles.map((role) => {
          const selected = value === role
          return (
            <button
              key={role}
              type="button"
              role="radio"
              aria-checked={selected}
              onClick={() => onChange(role)}
              className={`min-h-10 rounded-xl border px-2 text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#cf301d]/30 sm:text-sm ${
                selected
                  ? "border-[#cf301d] bg-[#fff0ec] text-[#29231f] ring-1 ring-[#cf301d]"
                  : "border-[#e4d8cb] bg-white text-[#29231f] hover:border-[#cf301d]/50"
              }`}
            >
              {role === "Vendor" ? "Vendor" : role}
            </button>
          )
        })}
      </div>
    </fieldset>
  )
}

export default function SignUpForm() {
  const [role, setRole] = useState<Role>("Customer")
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
      const { data,error } = await authClient.signUp.email({
        name,
        email,
        password,
        callbackURL: "/",
      })

      if (error) {
        setErrorMessage(error.message ?? "We couldn't create your account. Please try again.")
        return
      }

      router.push("/")
    } catch {
      setErrorMessage("We couldn't create your account. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
    console.log()
  }

  return (
    <div className="w-full max-w-[400px]">
      <Link href="/" className="mb-7 inline-flex items-center gap-2" aria-label="PizzaHub home">
        <Image src="/pizzahub-icon.png" alt="" width={20} height={20} className="h-5 w-5 rounded-full" />
        <span className="font-heading text-lg font-bold tracking-[-0.04em] text-[#211c19]">PizzaHub</span>
      </Link>

      <div className="mb-4">
        <h2 className="font-heading text-3xl font-bold tracking-[-0.04em] text-[#211c19] sm:text-[34px]">
          Sign Up
        </h2>
        <p className="mt-1 text-xs text-[#625951] sm:text-sm">Create your PizzaHub account.</p>
      </div>

      <Button
        type="button"
        variant="outline"
        className="h-10 w-full rounded-xl border-[#e9dfd3] bg-white text-sm text-[#29231f] hover:bg-[#fffaf5]"
      >
        Continue with Google
      </Button>
      <div className="my-4 flex items-center gap-3 text-xs text-[#625951]">
        <span className="h-px flex-1 bg-[#e9dfd3]" />
        or use your email
        <span className="h-px flex-1 bg-[#e9dfd3]" />
      </div>

      <form onSubmit={handleSignUp} className="space-y-3">
        <FormField id="fullName" label="Full name" autoComplete="name" required />
        <FormField id="email" label="Email" type="email" placeholder="" autoComplete="email" required />
        <FormField
          id="password"
          label="Password"
          type="password"
          placeholder="At least 8 characters"
          autoComplete="new-password"
          required
        />
        <FormField id="profileImage" label="Profile image (optional)" type="file" accept="image/*" />
        <RolePicker value={role} onChange={setRole} />
        {errorMessage && <p role="alert" className="text-sm text-red-700">{errorMessage}</p>}
        <Button
          type="submit"
          disabled={isSubmitting}
          className="h-10 w-full rounded-xl bg-[#cf301d] text-sm font-semibold text-white hover:bg-[#b92516]"
        >
          {isSubmitting ? "Creating account..." : "Sign Up"}
        </Button>
      </form>

      <p className="mt-4 text-center text-xs text-[#625951] sm:text-sm">
        Have an account?{" "}
        <Link href="/sign-in" className="font-medium text-[#29231f] hover:text-[#cf301d]">
          Sign In
        </Link>
      </p>
    </div>
  )
}
