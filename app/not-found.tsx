import Link from "next/link"

import Footer from "@/components/footer/footer"
import Nav from "@/components/navbar/nav"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-cream text-ink">
      <Nav />
      <main className="flex min-h-[60vh] items-center px-5 py-16 sm:px-8">
        <div className="mx-auto max-w-xl text-center">
          <p className="text-xs font-semibold tracking-[0.12em] text-brand uppercase">404</p>
          <h1 className="mt-3 font-heading text-4xl font-semibold tracking-[-0.03em] text-ink">Page not found</h1>
          <p className="mt-4 text-sm leading-relaxed text-ink-soft">
            The page you requested does not exist or may have been moved.
          </p>
          <Button render={<Link href="/" />} className="mt-8 rounded-xl bg-brand text-white hover:bg-brand-hover">
            Back to home
          </Button>
        </div>
      </main>
      <Footer />
    </div>
  )
}
