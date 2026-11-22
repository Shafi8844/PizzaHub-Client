import { NextResponse } from "next/server"

import { getSession } from "@/lib/core/server"

const MAX_IMAGE_SIZE = 5 * 1024 * 1024
const ALLOWED_TYPES = new Set(["image/jpeg", "image/png", "image/webp"])

export async function POST(request: Request) {
  const session = await getSession()
  if (!session) {
    return NextResponse.json({ error: "Sign in to upload a menu image" }, { status: 401 })
  }
  if (session.user.role !== "vendor") {
    return NextResponse.json({ error: "Only vendors can upload menu images" }, { status: 403 })
  }
  const user = session.user as typeof session.user & { blocked?: boolean; banned?: boolean }
  if (user.blocked || user.banned) {
    return NextResponse.json({ error: "This account cannot upload menu images" }, { status: 403 })
  }

  const apiKey = process.env.IMGBB_API_KEY
  if (!apiKey) {
    return NextResponse.json({ error: "Image uploads are not configured" }, { status: 503 })
  }

  const formData = await request.formData()
  const file = formData.get("image")
  if (!(file instanceof File) || file.size === 0) {
    return NextResponse.json({ error: "Choose an image to upload" }, { status: 400 })
  }
  if (!ALLOWED_TYPES.has(file.type)) {
    return NextResponse.json({ error: "Upload a JPG, PNG, or WebP image" }, { status: 415 })
  }
  if (file.size > MAX_IMAGE_SIZE) {
    return NextResponse.json({ error: "Images must be 5 MB or smaller" }, { status: 413 })
  }

  try {
    const imageData = Buffer.from(await file.arrayBuffer()).toString("base64")
    const uploadData = new FormData()
    uploadData.set("image", imageData)

    const response = await fetch(
      `https://api.imgbb.com/1/upload?key=${encodeURIComponent(apiKey)}`,
      { method: "POST", body: uploadData }
    )
    const result = (await response.json()) as {
      success?: boolean
      data?: { display_url?: string }
    }

    if (!response.ok || !result.success || !result.data?.display_url) {
      return NextResponse.json({ error: "Image upload failed. Please try again." }, { status: 502 })
    }

    return NextResponse.json({ url: result.data.display_url })
  } catch {
    return NextResponse.json({ error: "Image upload failed. Please try again." }, { status: 502 })
  }
}
