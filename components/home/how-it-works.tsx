import Section from "@/components/section"

const steps = [
  {
    number: "01",
    title: "Browse",
    description: "Find a local shop and pick what you are craving.",
  },
  {
    number: "02",
    title: "Order",
    description:
      "Choose a delivery date and tell the vendor where to bring it.",
  },
  {
    number: "03",
    title: "Track",
    description: "Follow your order from pending to accepted, live.",
  },
]

export default function HowItWorks() {
  return (
    <Section>
      <span className="text-xs font-semibold tracking-[0.09em] text-brand uppercase">
        How it works
      </span>
      <h2 className="mt-2 mb-7 font-heading text-[clamp(1.75rem,3.4vw,2.5rem)] font-semibold tracking-[-0.02em] text-ink">
        Pizza in three easy steps
      </h2>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {steps.map((step) => (
          <div
            key={step.number}
            className="rounded-[20px] border border-line bg-white p-7 shadow-card"
          >
            <span className="font-heading text-[40px] leading-none font-semibold text-brand">
              {step.number}
            </span>
            <h3 className="mt-3 mb-1.5 font-heading text-xl font-semibold tracking-[-0.02em] text-ink">
              {step.title}
            </h3>
            <p className="text-sm leading-relaxed text-ink-soft">
              {step.description}
            </p>
          </div>
        ))}
      </div>
    </Section>
  )
}
