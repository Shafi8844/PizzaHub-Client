import Nav from "@/components/navbar/nav"
import Hero from "@/components/banner/hero"
import Categories from "@/components/home/categories"
import Featured from "@/components/home/featured"
import HowItWorks from "@/components/home/how-it-works"
import VendorCta from "@/components/home/vendor-cta"
import WhyUs from "@/components/home/why-us"
import Footer from "@/components/footer/footer"

export default function Page() {
  return (
    <div className="min-h-screen bg-cream text-ink">
      <Nav />
      <main>
        <Hero />
        <Categories />
        <Featured />
        <HowItWorks />
        <VendorCta />
        <WhyUs />
      </main>
      <Footer />
    </div>
  )
}
