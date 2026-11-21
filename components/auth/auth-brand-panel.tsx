import PizzaIllustration from "@/components/pizza-illustration"

export default function AuthBrandPanel() {
  return (
    <aside className="flex min-h-[260px] flex-col items-center justify-center gap-6 bg-[linear-gradient(145deg,#f8ddbc,#f0b48c_55%,#e58b66)] px-6 py-10 text-center sm:min-h-[320px] lg:min-h-screen lg:py-12">
      <PizzaIllustration className="w-40 shrink-0 sm:w-48 lg:w-56" />
      <div className="max-w-[360px]">
        <h1 className="font-heading text-3xl font-semibold tracking-[-0.02em] text-ink sm:text-4xl">
          Pizza night, sorted.
        </h1>
        <p className="mt-2 text-[15px] text-ink-soft sm:text-base">
          Local shops, simple ordering, one place.
        </p>
      </div>
    </aside>
  )
}
