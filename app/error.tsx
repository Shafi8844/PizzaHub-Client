"use client"

import { useEffect } from "react"

import { Button } from "@/components/ui/button"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <main className="flex min-h-[60vh] items-center justify-center bg-cream px-5 py-16 text-ink">
      <div className="max-w-lg text-center">
        <p className="text-xs font-semibold tracking-[0.12em] text-brand uppercase">Error</p>
        <h1 className="mt-3 font-heading text-3xl font-semibold tracking-[-0.03em]">Something went wrong</h1>
        <p className="mt-4 text-sm leading-relaxed text-ink-soft">
          An unexpected error occurred. Please try again.
        </p>
        <Button onClick={reset} className="mt-8 rounded-xl bg-brand text-white hover:bg-brand-hover">
          Try again
        </Button>
      </div>
    </main>
  )
}
