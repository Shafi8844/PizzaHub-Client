import SignUpForm from "@/components/auth/sign-up-form"
import SignUpBrandPanel from "@/components/auth/sign-up-brand-panel"

export default function SignUpPage() {
  return (
    <main className="grid min-h-screen bg-[#faf6f0] lg:grid-cols-2">
      <SignUpBrandPanel />
      <section className="flex items-center justify-center px-5 py-10 sm:px-8 lg:px-12 lg:py-12">
        <SignUpForm />
      </section>
    </main>
  )
}
