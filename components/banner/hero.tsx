import Link from "next/link"

export default function Hero() {
  return (
    <section className="mx-auto grid w-full max-w-[1200px] items-center gap-7 px-5 py-7 sm:px-8 md:py-9 lg:grid-cols-2 lg:gap-10 lg:px-10 lg:py-8 xl:px-12">
      <div className="mx-auto w-full max-w-[540px]">
        <p className="mb-4 text-xs font-bold tracking-[0.12em] text-[#ce321f] sm:mb-5 sm:text-sm">
          PIZZA ORDERING &amp; DELIVERY
        </p>
        <h1 className="font-heading text-[clamp(2.4rem,4.5vw,4.25rem)] font-semibold leading-[1.02] tracking-[-0.05em] text-[#211c19]">
          Hot &amp; fresh pizza, delivered to your door.
        </h1>
        <p className="mt-4 max-w-[540px] text-base leading-[1.5] text-[#625951] sm:mt-5 sm:text-lg">
          Discover local pizza shops, browse their menus and order in a few clicks.
        </p>

        <form className="mt-5 flex w-full max-w-[560px] flex-col gap-1 rounded-2xl border border-[#e9dfd3] bg-white p-1.5 shadow-[0_8px_24px_rgba(67,45,25,0.08)] md:flex-row md:items-center md:gap-0 md:rounded-[18px]">
          <label className="sr-only" htmlFor="craving">What are you craving?</label>
          <input
            id="craving"
            name="craving"
            placeholder="What are you craving?"
            className="min-h-11 min-w-0 flex-1 rounded-xl bg-transparent px-3 text-sm text-[#332d28] outline-none placeholder:text-[#8b8076] sm:px-4 sm:text-base"
          />
          <span aria-hidden="true" className="hidden h-10 w-px bg-[#e8ddd1] md:block" />
          <label className="sr-only" htmlFor="city">Area or city</label>
          <input
            id="city"
            name="city"
            placeholder="Area or city"
            className="min-h-11 min-w-0 flex-1 rounded-xl bg-transparent px-3 text-sm text-[#332d28] outline-none placeholder:text-[#8b8076] sm:px-4 sm:text-base"
          />
          <Link
            href="/menu"
            className="flex min-h-11 shrink-0 items-center justify-center rounded-xl bg-[#cf301d] px-4 text-center text-sm font-semibold text-white shadow-sm ring-1 ring-inset ring-[#ed6246] transition-colors hover:bg-[#b92516] sm:px-5 sm:text-base"
          >
            Explore Pizza Menu
          </Link>
        </form>
      </div>

      <div className="relative mx-auto aspect-square w-full max-w-[440px] overflow-hidden rounded-[26px] bg-gradient-to-br from-[#f9d9b4] via-[#f4b58b] to-[#e88a67] sm:rounded-[34px]">
        <div className="absolute left-1/2 top-[47%] aspect-square w-[63%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#c88a39] shadow-[0_20px_0_rgba(172,112,52,0.17)]" />
        <div className="absolute left-1/2 top-[46%] aspect-square w-[58%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#e5a858] shadow-[inset_0_0_0_10px_rgba(186,119,43,0.28)]" />
        <div className="absolute left-1/2 top-[46%] aspect-square w-[49%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#d83c2b]" />
        <div className="absolute left-1/2 top-[47%] h-[29%] w-[40%] -translate-x-1/2 -translate-y-1/2 rounded-[42%_46%_40%_43%] bg-[#ffdf9c] [clip-path:polygon(0_30%,8%_12%,28%_5%,37%_0,52%_8%,74%_6%,88%_17%,100%_35%,96%_67%,84%_84%,65%_91%,49%_100%,34%_92%,15%_94%,4%_76%)]" />

        <span className="absolute left-[39%] top-[36%] h-[7.5%] w-[7.5%] rounded-full bg-[#b62619] shadow-[inset_8px_8px_0_rgba(244,103,75,0.58)]" />
        <span className="absolute left-[55%] top-[39%] h-[7.5%] w-[7.5%] rounded-full bg-[#b62619] shadow-[inset_8px_8px_0_rgba(244,103,75,0.58)]" />
        <span className="absolute left-[45%] top-[51%] h-[7.5%] w-[7.5%] rounded-full bg-[#b62619] shadow-[inset_8px_8px_0_rgba(244,103,75,0.58)]" />
        <span className="absolute left-[31%] top-[53%] h-[4%] w-[5%] rotate-[-24deg] rounded-[80%_10%_80%_10%] bg-[#398b50]" />
        <span className="absolute left-[69%] top-[56%] h-[5%] w-[5%] rotate-[18deg] rounded-[80%_10%_80%_10%] bg-[#398b50]" />

        <div className="absolute bottom-[5%] left-[4%] right-[4%] rounded-[18px] border border-[#e9e1d8] bg-white px-4 py-3 shadow-[0_10px_22px_rgba(71,49,31,0.12)] sm:bottom-[4.5%] sm:left-[4.5%] sm:right-[36%] sm:rounded-[22px] sm:px-5 sm:py-4">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-sm font-bold text-[#29231f] sm:text-lg">Margherita</h2>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#e4f1e8] px-2.5 py-1 text-[11px] font-semibold text-[#33734d] sm:px-3 sm:text-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-[#33734d]" /> Accepted
            </span>
          </div>
          <p className="mt-1 text-xs text-[#635950] sm:text-base">Fire and Dough · Riverside</p>
          <div aria-label="Order progress: two of three steps complete" className="mt-3 flex gap-1.5">
            <span className="h-2 flex-1 rounded-full bg-[#34764f]" />
            <span className="h-2 flex-1 rounded-full bg-[#34764f]" />
            <span className="h-2 flex-1 rounded-full bg-[#eee9e2]" />
          </div>
        </div>
      </div>
    </section>
  )
}
