import Link from "next/link"
import Logo from "@/components/logo"

const navLinks = [
  { name: "Home", url: "/" },
  { name: "Browse Menu", url: "/#featured" },
]

export default function Nav() {

  
  return (
    <header className="mx-auto grid min-h-16 w-full max-w-[1200px] grid-cols-[1fr_auto] items-center gap-x-4 gap-y-1 px-4 py-2.5 sm:px-6 md:h-[76px] md:grid-cols-[1fr_auto_1fr] md:gap-0 md:py-0 lg:px-8 xl:px-12">
      <Logo href="/" priority className="justify-self-start" />

      <nav
        aria-label="Main navigation"
        className="col-span-2 row-start-2 flex items-center justify-center gap-6 text-sm font-medium whitespace-nowrap sm:gap-8 md:col-span-1 md:col-start-2 md:row-start-1 md:gap-7"
      >
        {navLinks.map((item) => (
          <Link
            key={item.url}
            href={item.url}
            className="text-ink transition-colors hover:text-brand"
          >
            {item.name}
          </Link>
        ))}
      </nav>

      <div className="flex items-center gap-3 justify-self-end text-sm font-medium whitespace-nowrap sm:gap-5">
        <Link
          href="/sign-in"
          className="text-ink transition-colors hover:text-brand"
        >
          Sign In
        </Link>
        <Link
          href="/sign-up"
          className="inline-flex h-9 items-center justify-center rounded-[10px] bg-brand px-3.5 text-[13px] font-semibold text-white shadow-[0_1px_2px_rgba(31,26,23,0.16)] ring-1 ring-white/20 transition-colors ring-inset hover:bg-brand-hover sm:px-4"
        >
          Sign Up
        </Link>
      </div>
    </header>
  )
}
