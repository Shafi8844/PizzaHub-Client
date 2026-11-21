function PizzaIllustration() {
  return (
    <div aria-hidden="true" className="relative aspect-square w-44 shrink-0 sm:w-52 lg:w-56">
      <div className="absolute inset-0 rounded-full bg-[#c88a39] shadow-[0_12px_0_rgba(172,112,52,0.16)]" />
      <div className="absolute inset-[4%] rounded-full bg-[#e5a858] shadow-[inset_0_0_0_6px_rgba(186,119,43,0.28)]" />
      <div className="absolute inset-[12%] rounded-full bg-[#d83c2b]" />
      <div className="absolute left-[19%] top-[29%] h-[44%] w-[62%] rounded-[42%_46%_40%_43%] bg-[#ffdf9c] [clip-path:polygon(0_30%,8%_12%,28%_5%,37%_0,52%_8%,74%_6%,88%_17%,100%_35%,96%_67%,84%_84%,65%_91%,49%_100%,34%_92%,15%_94%,4%_76%)]" />
      <span className="absolute left-[34%] top-[35%] h-[13%] w-[13%] rounded-full bg-[#b62619] shadow-[inset_4px_4px_0_rgba(244,103,75,0.58)]" />
      <span className="absolute left-[59%] top-[42%] h-[13%] w-[13%] rounded-full bg-[#b62619] shadow-[inset_4px_4px_0_rgba(244,103,75,0.58)]" />
      <span className="absolute left-[44%] top-[60%] h-[13%] w-[13%] rounded-full bg-[#b62619] shadow-[inset_4px_4px_0_rgba(244,103,75,0.58)]" />
      <span className="absolute left-[22%] top-[62%] h-[7%] w-[9%] rotate-[-24deg] rounded-[80%_10%_80%_10%] bg-[#398b50]" />
      <span className="absolute left-[72%] top-[68%] h-[8%] w-[9%] rotate-[18deg] rounded-[80%_10%_80%_10%] bg-[#398b50]" />
    </div>
  )
}

export default function SignUpBrandPanel() {
  return (
    <aside className="flex min-h-[270px] flex-col items-center justify-center gap-5 bg-gradient-to-br from-[#f8d3ae] via-[#f2b58e] to-[#e98d6c] px-6 py-8 text-center sm:min-h-[340px] lg:min-h-screen lg:gap-6">
      <PizzaIllustration />
      <div>
        <h1 className="font-heading text-3xl font-bold tracking-[-0.04em] text-[#211c19] sm:text-4xl">
          Pizza night, sorted.
        </h1>
        <p className="mt-2 text-sm text-[#625951] sm:text-base">
          Local shops, simple ordering, one place.
        </p>
      </div>
    </aside>
  )
}
