import Link from "next/link"
import * as motion from "motion/react-client"
import PizzaIllustration from "@/components/pizza-illustration"

export default function Hero() {
  return (
    <section className="mx-auto grid w-full max-w-[1200px] items-center gap-8 px-4 pt-6 pb-12 sm:px-6 md:pt-8 md:pb-16 lg:grid-cols-2 lg:gap-12 lg:px-8 lg:pt-8 lg:pb-20 xl:px-12">
      <motion.div
        className="mx-auto w-full max-w-[540px]"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
      >
        <p className="mb-4 text-xs font-bold tracking-[0.09em] text-brand uppercase sm:mb-5">
          Pizza ordering &amp; delivery
        </p>
        <h1 className="font-heading text-[clamp(2.5rem,5vw,4.25rem)] leading-[1.05] font-semibold tracking-[-0.02em] text-ink">
          Hot &amp; fresh pizza, delivered to your door.
        </h1>
        <p className="mt-4 max-w-[480px] text-base leading-relaxed text-ink-soft sm:mt-5 sm:text-lg">
          Discover local pizza shops, browse their menus and order in a few
          clicks.
        </p>

        <form className="mt-6 flex w-full max-w-[520px] flex-col gap-2 rounded-2xl border border-line bg-white p-2 shadow-card sm:flex-row sm:items-center sm:gap-0 sm:rounded-[16px]">
          <label className="sr-only" htmlFor="craving">
            What are you craving?
          </label>
          <input
            id="craving"
            name="craving"
            placeholder="What are you craving?"
            className="min-h-11 min-w-0 flex-[2] rounded-xl bg-transparent px-3.5 text-sm text-ink outline-none placeholder:text-[#8a7f74] sm:text-[15px]"
          />
          <span
            aria-hidden="true"
            className="hidden h-8 w-px bg-line sm:block"
          />
          <label className="sr-only" htmlFor="city">
            Area or city
          </label>
          <input
            id="city"
            name="city"
            placeholder="Area or city"
            className="min-h-11 min-w-0 flex-1 rounded-xl bg-transparent px-3.5 text-sm text-ink outline-none placeholder:text-[#8a7f74] sm:rounded-none sm:text-[15px]"
          />
          <Link
            href="/#featured"
            className="flex min-h-11 shrink-0 items-center justify-center rounded-xl bg-brand px-5 text-center text-sm font-semibold text-white shadow-[0_1px_2px_rgba(31,26,23,0.16)] ring-1 ring-white/20 transition-colors ring-inset hover:bg-brand-hover sm:ml-2 sm:px-6"
          >
            Explore Pizza Menu
          </Link>
        </form>
      </motion.div>

      <div className="relative mx-auto aspect-square w-full max-w-[440px] overflow-hidden rounded-[26px] bg-[linear-gradient(145deg,#f8ddbc,#f0b48c_55%,#e58b66)] sm:rounded-[32px]">
        <PizzaIllustration className="absolute top-[43%] left-1/2 w-[68%] max-w-[340px] -translate-x-1/2 -translate-y-1/2 drop-shadow-[0_18px_24px_rgba(31,26,23,0.18)]" />

        <div className="absolute right-5 bottom-5 left-5 rounded-[18px] border border-line bg-white px-4 py-3.5 shadow-[0_10px_30px_rgba(31,26,23,0.12)] sm:right-auto sm:left-6 sm:max-w-[300px]">
          <div className="flex items-center justify-between gap-3">
            <h2 className="font-heading text-base font-semibold text-ink sm:text-lg">
              Margherita
            </h2>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-leaf-tint px-2.5 py-1 text-[11px] font-semibold text-leaf sm:px-3 sm:text-xs">
              <span className="size-1.5 rounded-full bg-leaf" /> Accepted
            </span>
          </div>
          <p className="mt-1 text-xs text-ink-soft sm:text-sm">
            Fire and Dough · Riverside
          </p>
          <div
            aria-label="Order progress: two of three steps complete"
            className="mt-3 flex gap-1.5"
          >
            <span className="h-2 flex-1 rounded-full bg-leaf" />
            <span className="h-2 flex-1 rounded-full bg-leaf" />
            <span className="h-2 flex-1 rounded-full bg-[#eee9e2]" />
          </div>
        </div>
      </div>
    </section>
  )
}
