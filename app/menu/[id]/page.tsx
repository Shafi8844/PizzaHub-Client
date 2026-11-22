import { redirect } from "next/navigation"

export default async function MenuItemPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  redirect(`/order/${id}`)
}
