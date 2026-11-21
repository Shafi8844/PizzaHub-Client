import { cn } from "@/lib/utils"

export default function Section({
  id,
  className,
  children,
}: {
  id?: string
  className?: string
  children: React.ReactNode
}) {
  return (
    <section
      id={id}
      className={cn(
        "mx-auto w-full max-w-[1200px] px-4 pb-14 sm:px-6 md:pb-20 lg:px-8 xl:px-12",
        className
      )}
    >
      {children}
    </section>
  )
}
