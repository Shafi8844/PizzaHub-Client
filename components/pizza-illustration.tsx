export default function PizzaIllustration({
  className,
}: {
  className?: string
}) {
  return (
    <svg viewBox="0 0 120 120" aria-hidden="true" className={className}>
      <circle cx="60" cy="62" r="56" fill="#1F1A17" opacity=".08" />
      <circle cx="60" cy="58" r="54" fill="#C98A3D" />
      <circle cx="60" cy="58" r="50" fill="#E2A65C" />
      <circle cx="60" cy="58" r="42" fill="#D2402B" />
      <path
        d="M24 50c6-12 18-8 24-14 8 6 20 0 28 8 10-4 18 6 18 14 4 10-6 18-12 24-8 8-20 2-28 8-10-6-22 2-28-8-8-6-10-18-2-32z"
        fill="#F8DD9A"
      />
      <circle cx="46" cy="46" r="7" fill="#B3281A" />
      <circle cx="44" cy="44" r="2.5" fill="#D9503C" />
      <circle cx="74" cy="52" r="7" fill="#B3281A" />
      <circle cx="72" cy="50" r="2.5" fill="#D9503C" />
      <circle cx="56" cy="72" r="7" fill="#B3281A" />
      <circle cx="54" cy="70" r="2.5" fill="#D9503C" />
      <path
        d="M80 72c6-2 10 2 9 8-6 2-10-2-9-8zM34 66c-5 0-8 4-6 8 5 0 8-3 6-8z"
        fill="#3F8A4F"
      />
    </svg>
  )
}
