import AuthBrandPanel from "@/components/auth/auth-brand-panel"
import SignInForm from "@/components/auth/sign-in-form"

export default async function SignInPage({
  searchParams,
}: {
  searchParams: Promise<{ redirectTo?: string }>
}) {
  const params = await searchParams
  const requestedPath = params.redirectTo ?? "/"
  const redirectTo =
    requestedPath.startsWith("/") && !requestedPath.startsWith("//")
      ? requestedPath
      : "/"

  return (
    <main className="grid min-h-screen bg-cream text-ink lg:grid-cols-2">
      <AuthBrandPanel />
      <section className="flex items-center justify-center px-5 py-10 sm:px-8 lg:px-12 lg:py-12">
        <SignInForm redirectTo={redirectTo} />
      </section>
    </main>
  )
}
