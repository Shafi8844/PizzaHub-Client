import Link from "next/link"
import Section from "@/components/section"
import PizzaIllustration from "@/components/pizza-illustration"

const categories = [
  "Classic Pizzas",
  "Vegetarian Pizzas",
  "Meat Lovers",
  "Specialty / Gourmet",
  "Sides & Appetizers",
  "Beverages & Desserts",
]

export default function Categories() {
  return (
    <Section>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((category) => (
          <Link
            key={category}
            href="/#featured"
            className="flex items-center gap-3.5 rounded-[20px] border border-line bg-white p-5 shadow-card transition-all hover:-translate-y-0.5 hover:shadow-[0_14px_34px_rgba(31,26,23,0.09)]"
          >
            <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-brand-tint">
              <PizzaIllustration className="size-[30px]" />
            </span>
            <b className="text-[15px] font-semibold text-ink">{category}</b>
          </Link>
        ))}
      </div>
    </Section>
  )
}
