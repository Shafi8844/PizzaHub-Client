import Image from "next/image"
import Link from "next/link"
import { cn } from "@/lib/utils"

export default function Logo({
  href = "/",
  priority = false,
  className,
  textClassName,
}: {
  href?: string
  priority?: boolean
  className?: string
  textClassName?: string
}) {
  return (
    <Link
      href={href}
      aria-label="PizzaHub home"
      className={cn("inline-flex min-w-0 items-center gap-2", className)}
    >
      <Image
        src="/pizzahub-icon.png"
        alt=""
        width={22}
        height={22}
        className="size-[22px] shrink-0 rounded-full"
        priority={priority}
      />
      <span
        className={cn(
          "font-heading text-[21px] leading-none font-bold tracking-[-0.02em] whitespace-nowrap text-ink",
          textClassName
        )}
      >
        PizzaHub
      </span>
    </Link>
  )
}
