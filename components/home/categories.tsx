import Link from "next/link"
import * as motion from "motion/react-client"
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
          <motion.div
            key={category}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{
              duration: 0.3,
              delay: categories.indexOf(category) * 0.04,
              ease: "easeOut",
            }}
          >
            <Link
              href={`/browse-menu?category=${encodeURIComponent(category)}`}
              className="flex items-center gap-3.5 rounded-[20px] border border-line bg-white p-5 shadow-card transition-all hover:-translate-y-0.5 hover:shadow-[0_14px_34px_rgba(31,26,23,0.09)]"
            >
              <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-brand-tint">
                <PizzaIllustration className="size-[30px]" />
              </span>
              <b className="text-[15px] font-semibold text-ink">{category}</b>
            </Link>
          </motion.div>
        ))}
      </div>
    </Section>
  )
}
