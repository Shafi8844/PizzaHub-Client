import Section from "@/components/section"
import PizzaIllustration from "@/components/pizza-illustration"

type FeaturedItem = {
  category: string
  name: string
  shop: string
  initial: string
  price: string
  premium?: boolean
  tone?: "default" | "green" | "rose"
}

const featuredItems: FeaturedItem[] = [
  {
    category: "Classic Pizzas",
    name: "Margherita",
    shop: "Fire and Dough · Downtown",
    initial: "F",
    price: "$11.00",
    premium: true,
  },
  {
    category: "Vegetarian Pizzas",
    name: "Garden Veg",
    shop: "Napoli Corner · Riverside",
    initial: "N",
    price: "$12.50",
    tone: "green",
  },
  {
    category: "Meat Lovers",
    name: "Meat Feast",
    shop: "Slice Society · Eastside",
    initial: "S",
    price: "$14.00",
    premium: true,
  },
  {
    category: "Specialty / Gourmet",
    name: "Truffle Bianca",
    shop: "The Crust Club · Old Town",
    initial: "T",
    price: "$16.00",
    tone: "rose",
  },
  {
    category: "Sides & Appetizers",
    name: "Garlic Dough Balls",
    shop: "Fire and Dough · Downtown",
    initial: "F",
    price: "$5.50",
  },
  {
    category: "Beverages & Desserts",
    name: "Tiramisu",
    shop: "Napoli Corner · Riverside",
    initial: "N",
    price: "$6.00",
    tone: "rose",
  },
]

const toneClassName: Record<NonNullable<FeaturedItem["tone"]>, string> = {
  default: "bg-[linear-gradient(145deg,#f9e6cc,#f2c79f)]",
  green: "bg-[linear-gradient(145deg,#e5efda,#bfd9b5)]",
  rose: "bg-[linear-gradient(145deg,#fce5de,#f3b8a8)]",
}

function FeaturedCard({ item }: { item: FeaturedItem }) {
  return (
    <article className="overflow-hidden rounded-[20px] border border-line bg-white shadow-card">
      <div
        className={`relative flex aspect-[4/3] items-center justify-center ${toneClassName[item.tone ?? "default"]}`}
      >
        <PizzaIllustration className="w-[52%] drop-shadow-[0_10px_14px_rgba(31,26,23,0.14)]" />
        {item.premium && (
          <span className="absolute top-3 left-3 inline-flex items-center gap-1.5 rounded-full bg-white px-2.5 py-1 text-[11px] font-semibold text-gold">
            <span className="size-1.5 rounded-full bg-gold" /> Premium
          </span>
        )}
      </div>
      <div className="flex flex-col gap-1.5 p-5">
        <span className="text-[11px] font-semibold tracking-[0.09em] text-brand uppercase">
          {item.category}
        </span>
        <h3 className="font-heading text-xl font-semibold tracking-[-0.02em] text-ink">
          {item.name}
        </h3>
        <div className="flex items-center gap-2">
          <span className="flex size-[34px] shrink-0 items-center justify-center rounded-full bg-brand-tint text-[13px] font-bold text-brand">
            {item.initial}
          </span>
          <span className="text-sm text-ink-soft">{item.shop}</span>
        </div>
        <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
          <b className="font-heading text-[22px] font-semibold text-ink">
            {item.price}
          </b>
          <span className="inline-flex h-[34px] items-center justify-center rounded-[10px] border border-line-strong px-3.5 text-[13px] font-medium text-ink">
            View Details
          </span>
        </div>
      </div>
    </article>
  )
}

export default function Featured() {
  return (
    <Section id="featured" className="scroll-mt-6">
      <div className="mb-7 flex flex-wrap items-end justify-between gap-4">
        <div>
          <span className="text-xs font-semibold tracking-[0.09em] text-brand uppercase">
            Featured
          </span>
          <h2 className="mt-2 font-heading text-[clamp(1.75rem,3.4vw,2.5rem)] font-semibold tracking-[-0.02em] text-ink">
            Fresh out of the oven
          </h2>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {featuredItems.map((item) => (
          <FeaturedCard key={item.name} item={item} />
        ))}
      </div>
    </Section>
  )
}
