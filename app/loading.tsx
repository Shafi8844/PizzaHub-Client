import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <main className="min-h-screen bg-cream px-5 py-10 sm:px-8">
      <div
        className="mx-auto max-w-6xl"
        aria-label="Loading PizzaHub"
        role="status"
      >
        <Skeleton className="h-16 w-full rounded-2xl" />
        <Skeleton className="mt-8 h-72 w-full rounded-3xl" />
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }, (_, index) => (
            <Skeleton key={index} className="h-64 rounded-2xl" />
          ))}
        </div>
        <span className="sr-only">Loading page content…</span>
      </div>
    </main>
  )
}
