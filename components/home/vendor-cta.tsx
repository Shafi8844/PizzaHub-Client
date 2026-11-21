import Link from "next/link"
import Section from "@/components/section"

export default function VendorCta() {
  return (
    <Section>
      <div className="grid items-center gap-10 rounded-[28px] bg-ink px-6 py-12 text-[#ede4d8] sm:px-10 md:rounded-[32px] md:px-14 md:py-14 lg:grid-cols-2 lg:gap-12">
        <div className="flex flex-col items-start gap-4">
          <span className="text-xs font-semibold tracking-[0.09em] text-[#f5b83d] uppercase">
            For restaurants
          </span>
          <h2 className="font-heading text-[clamp(1.75rem,3.4vw,2.5rem)] font-semibold tracking-[-0.02em] text-white">
            Run a pizza shop? Reach hungry neighbours.
          </h2>
          <p className="max-w-[460px] text-[15px] leading-relaxed opacity-75">
            Start free with up to 3 active items. Go Premium for unlimited
            items, a badge and featured placement.
          </p>
          <Link
            href="/sign-up"
            className="mt-1 inline-flex h-12 items-center justify-center rounded-xl bg-brand px-6 text-[15px] font-semibold text-white shadow-[0_1px_2px_rgba(0,0,0,0.24)] ring-1 ring-white/15 transition-colors ring-inset hover:bg-brand-hover"
          >
            Become a vendor
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-[20px] border border-[#4a413a] p-6">
            <b className="font-heading text-lg font-semibold text-white">
              Free
            </b>
            <p className="mt-2 text-sm leading-relaxed opacity-75">
              3 active items
              <br />
              Order management
            </p>
          </div>
          <div className="rounded-[20px] bg-white p-6 text-ink">
            <b className="font-heading text-lg font-semibold">Premium</b>
            <p className="mt-2 text-sm leading-relaxed text-ink-soft">
              Unlimited items
              <br />
              Featured placement
            </p>
          </div>
        </div>
      </div>
    </Section>
  )
}
