import Image from "next/image"
import Link from "next/link"
import * as motion from "motion/react-client"

import { getMenuItems, type MenuItem } from "@/lib/api/menu"
import PizzaIllustration from "@/components/pizza-illustration"
import Section from "@/components/section"

function FeaturedCard({ item, index }: { item: MenuItem; index: number }) {
  const image = item.images?.[0]

  return (
    <motion.article
      className="flex h-full flex-col overflow-hidden rounded-[20px] border border-line bg-white shadow-card"
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{
        duration: 0.35,
        delay: (index % 3) * 0.06,
        ease: "easeOut",
      }}
    >
      <Link
        href={`/browse-menu?search=${encodeURIComponent(item.itemName)}`}
        aria-label={`Browse ${item.itemName}`}
        className="relative flex aspect-[4/3] items-center justify-center overflow-hidden bg-[linear-gradient(145deg,#f9e6cc,#f2c79f)]"
      >
        {image ? (
          <Image
            src={image}
            alt={item.itemName}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-300 hover:scale-105"
          />
        ) : (
          <PizzaIllustration className="w-[52%] drop-shadow-[0_10px_14px_rgba(31,26,23,0.14)]" />
        )}
      </Link>
      <div className="flex flex-1 flex-col gap-2 p-5">
        <span className="text-[11px] font-semibold tracking-[0.09em] text-brand uppercase">
          {item.category}
        </span>
        <h3 className="font-heading text-xl font-semibold tracking-[-0.02em] text-ink">
          {item.itemName}
        </h3>
        <p className="text-sm text-ink-soft">
          {item.vendorName || "Local PizzaHub restaurant"}
          {item.location ? ` · ${item.location}` : ""}
        </p>
        <div className="mt-auto flex items-center justify-between gap-3 pt-3">
          <b className="font-heading text-[22px] font-semibold text-ink">
            ${Number(item.price).toFixed(2)}
          </b>
          <Link
            href={`/browse-menu?search=${encodeURIComponent(item.itemName)}`}
            className="inline-flex h-[36px] items-center justify-center rounded-[10px] border border-line-strong px-3.5 text-[13px] font-medium text-ink transition-colors hover:border-brand hover:text-brand"
          >
            View Details
          </Link>
        </div>
      </div>
    </motion.article>
  )
}

export default async function Featured() {
  let items: MenuItem[] = []
  try {
    items = (await getMenuItems("status=approved")).slice(0, 6)
  } catch {
    // Keep the public landing page available while the backend is offline.
  }

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
        <Link
          href="/browse-menu"
          className="text-sm font-semibold text-brand hover:text-brand-hover"
        >
          Browse the menu
        </Link>
      </div>
      {items.length ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, index) => (
            <FeaturedCard key={item._id} item={item} index={index} />
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-line bg-white px-6 py-10 text-center">
          <p className="font-semibold text-ink">New favorites are on the way</p>
          <p className="mt-2 text-sm text-ink-soft">
            Approved restaurant items will appear here as soon as they are
            available.
          </p>
          <Link
            href="/browse-menu"
            className="mt-4 inline-block text-sm font-semibold text-brand"
          >
            Explore the menu
          </Link>
        </div>
      )}
    </Section>
  )
}
