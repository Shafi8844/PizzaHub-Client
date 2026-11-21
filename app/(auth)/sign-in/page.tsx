import AuthBrandPanel from "@/components/auth/auth-brand-panel"
import SignInForm from "@/components/auth/sign-in-form"

export default function SignInPage() {
  return (
    <main className="grid min-h-screen bg-cream text-ink lg:grid-cols-2">
      <AuthBrandPanel />
      <section className="flex items-center justify-center px-5 py-10 sm:px-8 lg:px-12 lg:py-12">
        <SignInForm />
      </section>
    </main>
  )
}
