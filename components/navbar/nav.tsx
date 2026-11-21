import Image from "next/image"
import Link from "next/link"

const navLinks = [
  { name: "Home", url: "/" },
  { name: "Menu", url: "/menu" },
  { name: "Dashboard", url: "/dashboard" },
]

export default function Nav() {
  return (
    <header className="mx-auto grid min-h-[64px] w-full max-w-[1200px] grid-cols-[1fr_auto] items-center gap-x-2 gap-y-2 px-4 py-2 sm:min-h-[68px] sm:px-6 md:h-[72px] md:grid-cols-[1fr_auto_1fr] md:gap-0 md:px-8 md:py-0 xl:px-12">
      <Link href="/" aria-label="PizzaHub home" className="flex min-w-0 items-center gap-1.5 justify-self-start sm:gap-2">
        <Image
          src="/pizzahub-icon.png"
          alt=""
          width={22}
          height={22}
          className="h-[22px] w-[22px] shrink-0 rounded-full sm:h-6 sm:w-6"
          priority
        />
        <span className="font-heading whitespace-nowrap text-lg font-extrabold leading-none tracking-[-0.6px] sm:text-[22px]">
          PizzaHub
        </span>
      </Link>

      <nav
        aria-label="Main navigation"
        className="col-span-2 row-start-2 flex items-center justify-center gap-5 whitespace-nowrap text-[13px] font-medium sm:gap-8 sm:text-sm md:col-span-1 md:col-start-2 md:row-start-1 md:gap-6 md:text-[15px]"
      >
        {navLinks.map((item) => (
          <Link key={item.url} href={item.url} className="transition-colors hover:text-[#c92d1b]">
            {item.name}
          </Link>
        ))}
      </nav>

      <div className="flex items-center gap-2 justify-self-end whitespace-nowrap text-[13px] font-medium sm:gap-4 sm:text-sm md:gap-5 md:text-[15px]">
        <Link href="/sign-in" className="transition-colors hover:text-[#c92d1b]">
          Sign In
        </Link>
        <Link
          href="/sign-up"
          className="rounded-lg bg-[#cf2d1b] px-2.5 py-2 text-[11px] font-semibold leading-tight text-white shadow-[0_2px_4px_rgba(0,0,0,0.18)] ring-1 ring-inset ring-[#f26b4c] transition-colors hover:bg-[#b92516] sm:px-4 sm:text-sm"
        >
          Sign Up
        </Link>
      </div>
    </header>
  )
}
