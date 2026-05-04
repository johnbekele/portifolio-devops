import { NextResponse } from "next/server"
import { auth, isAdminEmail } from "@/lib/auth"
import { reviewSite } from "@/lib/ai/site-review"

export const runtime = "nodejs"
export const maxDuration = 60

export async function POST() {
  const session = await auth()
  if (!session?.user || !isAdminEmail(session.user.email)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }
  if (!process.env.ANTHROPIC_API_KEY) {
    return NextResponse.json(
      { error: "AI not configured: ANTHROPIC_API_KEY env var is missing." },
      { status: 500 },
    )
  }

  try {
    const suggestions = await reviewSite()
    return NextResponse.json({ suggestions })
  } catch (err) {
    const message = err instanceof Error ? err.message : "Review failed"
    console.error("site-review error", err)
    return NextResponse.json({ error: `Review failed: ${message}` }, { status: 500 })
  }
}
