import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

type DashboardChartProps = {
  title: string
  description: string
  data: { label: string; value: number; color?: string }[]
}

export function DashboardChart({
  title,
  description,
  data,
}: DashboardChartProps) {
  const max = Math.max(1, ...data.map((item) => item.value))

  return (
    <Card className="mt-6 rounded-2xl border border-line bg-white shadow-[0_1px_2px_rgba(31,26,23,0.04)] ring-0">
      <CardHeader className="p-6 pb-2">
        <CardTitle className="font-heading text-lg font-semibold text-ink">
          {title}
        </CardTitle>
        <p className="text-sm text-ink-soft">{description}</p>
      </CardHeader>
      <CardContent
        className="space-y-4 p-6 pt-3"
        role="img"
        aria-label={`${title}: ${data.map((item) => `${item.label} ${item.value}`).join(", ")}`}
      >
        {data.map((item) => (
          <div
            key={item.label}
            className="grid grid-cols-[7rem_minmax(0,1fr)_2rem] items-center gap-3"
          >
            <span className="truncate text-xs font-medium text-ink-soft">
              {item.label}
            </span>
            <div className="h-3 overflow-hidden rounded-full bg-[#f3ece3]">
              <div
                className={`h-full rounded-full ${item.color ?? "bg-brand"}`}
                style={{ width: `${(item.value / max) * 100}%` }}
              />
            </div>
            <span className="text-right text-xs font-semibold text-ink tabular-nums">
              {item.value}
            </span>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
