import SignUpForm from "@/components/auth/sign-up-form"
import AuthBrandPanel from "@/components/auth/auth-brand-panel"

export default function SignUpPage() {
  return (
    <main className="grid min-h-screen bg-cream text-ink lg:grid-cols-2">
      <AuthBrandPanel />
      <section className="flex items-center justify-center px-5 py-10 sm:px-8 lg:px-12 lg:py-12">
        <SignUpForm />
      </section>
    </main>
  )
}
