import type { ReactNode } from "react"

export function DashboardShell({
  breadcrumb,
  title,
  description,
  action,
  children,
}: {
  breadcrumb: string
  title: string
  description?: string
  action?: ReactNode
  children: ReactNode
}) {
  return (
    <div className="min-h-screen bg-cream px-5 py-6 sm:px-8 lg:px-10 lg:py-8">
      <div className="mx-auto w-full max-w-[1040px]">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-medium text-ink-soft">{breadcrumb}</p>
            <h1 className="mt-3 font-heading text-3xl font-semibold tracking-[-0.02em] text-ink">
              {title}
            </h1>
            {description ? (
              <p className="mt-2 text-sm text-ink-soft">{description}</p>
            ) : null}
          </div>
          {action}
        </div>
        <div className="mt-7">{children}</div>
      </div>
    </div>
  )
}

export function StatCard({
  label,
  value,
  hint,
}: {
  label: string
  value: string | number
  hint?: string
}) {
  return (
    <div className="rounded-2xl border border-line bg-white p-5 shadow-[0_1px_2px_rgba(31,26,23,0.04)]">
      <p className="text-xs font-semibold tracking-wide text-ink-soft uppercase">
        {label}
      </p>
      <p className="mt-3 font-heading text-3xl font-semibold text-ink">{value}</p>
      {hint ? <p className="mt-1 text-xs text-ink-soft">{hint}</p> : null}
    </div>
  )
}
