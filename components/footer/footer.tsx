import Link from "next/link"
import Logo from "@/components/logo"

const footerLinks = [
  { name: "Home", url: "/" },
  { name: "Browse Menu", url: "/#featured" },
  { name: "Sign In", url: "/sign-in" },
]

export default function Footer() {
  return (
    <footer className="bg-ink text-[#ede4d8]">
      <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-10 px-4 py-14 sm:px-6 md:flex-row md:items-start md:justify-between md:gap-12 md:py-16 lg:px-8 xl:px-12">
        <div className="max-w-[280px]">
          <Logo href="/" textClassName="text-[#ede4d8]" />
          <p className="mt-3 text-sm leading-relaxed opacity-75">
            Hot and fresh pizza from the shops in your neighbourhood.
          </p>
        </div>

        <nav
          aria-label="Footer navigation"
          className="flex flex-col gap-2.5 text-sm"
        >
          {footerLinks.map((item) => (
            <Link
              key={item.url}
              href={item.url}
              className="w-fit whitespace-nowrap opacity-85 transition-opacity hover:opacity-100"
            >
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="flex flex-col gap-2.5 text-sm">
          <a
            href="mailto:hello@pizzahub.example"
            className="w-fit opacity-85 transition-opacity hover:opacity-100"
          >
            hello@pizzahub.example
          </a>
          <span className="inline-flex items-center gap-2 opacity-85">
            <svg
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
              className="size-4"
            >
              <path d="M18.2 2h3.4l-7.4 8.5L23 22h-6.8l-5.3-7-6.1 7H1.4l7.9-9.1L1 2h7l4.8 6.4L18.2 2zm-1.2 18h1.9L7 3.9H5z" />
            </svg>
            Follow us
          </span>
        </div>

        <p className="text-sm whitespace-nowrap opacity-60">© PizzaHub</p>
      </div>
    </footer>
  )
}
