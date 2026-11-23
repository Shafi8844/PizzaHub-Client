import { Skeleton } from "@/components/ui/skeleton"

export default function DashboardLoading() {
  return (
    <div
      className="min-h-screen bg-cream px-5 py-6 sm:px-8 lg:px-10 lg:py-8"
      role="status"
      aria-label="Loading dashboard"
    >
      <div className="mx-auto w-full max-w-[1040px]">
        <Skeleton className="h-4 w-36 rounded" />
        <Skeleton className="mt-4 h-10 w-64 rounded-xl" />
        <Skeleton className="mt-3 h-5 w-80 max-w-full rounded" />
        <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {Array.from({ length: 4 }, (_, index) => (
            <Skeleton key={index} className="h-32 rounded-2xl" />
          ))}
        </div>
        <Skeleton className="mt-6 h-80 rounded-2xl" />
        <span className="sr-only">Loading dashboard data…</span>
      </div>
    </div>
  )
}
