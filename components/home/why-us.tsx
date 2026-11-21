import Section from "@/components/section"

const perks = [
  {
    title: "Local shops",
    description: "Menus from approved restaurants in your area.",
  },
  {
    title: "Clear order status",
    description: "Pending, accepted, rejected or cancelled. Always visible.",
  },
  {
    title: "Built for vendors",
    description: "Publish items, manage orders and grow with Premium.",
  },
]

function CheckIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="size-4"
    >
      <path d="M5 12l5 5L20 7" />
    </svg>
  )
}

export default function WhyUs() {
  return (
    <Section className="pb-20 md:pb-24">
      <h2 className="mb-7 font-heading text-[clamp(1.75rem,3.4vw,2.5rem)] font-semibold tracking-[-0.02em] text-ink">
        Why choose PizzaHub?
      </h2>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {perks.map((perk) => (
          <div
            key={perk.title}
            className="rounded-[20px] border border-line bg-white p-7 shadow-card"
          >
            <span className="flex size-11 items-center justify-center rounded-xl bg-brand-tint text-brand">
              <CheckIcon />
            </span>
            <h3 className="mt-4 mb-1.5 font-heading text-xl font-semibold tracking-[-0.02em] text-ink">
              {perk.title}
            </h3>
            <p className="text-sm leading-relaxed text-ink-soft">
              {perk.description}
            </p>
          </div>
        ))}
      </div>
    </Section>
  )
}
