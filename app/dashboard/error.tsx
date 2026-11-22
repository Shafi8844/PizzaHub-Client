"use client"

import { useEffect } from "react"

import { Button } from "@/components/ui/button"

export default function DashboardError({
  error,
  retry,
}: {
  error: Error & { digest?: string }
  retry: () => void
}) {
  useEffect(() => {
    console.error("Dashboard page failed:", error)
  }, [error])

  return (
    <div className="flex min-h-[50vh] items-center justify-center bg-cream px-5 py-12">
      <div className="w-full max-w-lg rounded-2xl border border-line bg-white p-7 text-center">
        <h1 className="font-heading text-2xl font-semibold text-ink">Dashboard data could not load</h1>
        <p className="mt-2 text-sm text-ink-soft">
          Check that the API is running, then try again. Your account data has not been changed.
        </p>
        {error.digest ? <p className="mt-2 text-xs text-ink-soft">Reference: {error.digest}</p> : null}
        <Button onClick={retry} className="mt-5 rounded-xl bg-brand text-white hover:bg-brand-hover">
          Try again
        </Button>
      </div>
    </div>
  )
}
