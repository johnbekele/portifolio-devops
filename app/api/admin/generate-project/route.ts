import { NextResponse } from "next/server"
import { auth, isAdminEmail } from "@/lib/auth"
import { generateProjectFields } from "@/lib/ai/project-generator"

export const runtime = "nodejs"
export const maxDuration = 60

export async function POST(req: Request) {
  const session = await auth()
  if (!session?.user || !isAdminEmail(session.user.email)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  if (!process.env.ANTHROPIC_API_KEY) {
    return NextResponse.json(
      {
        error:
          "AI not configured: ANTHROPIC_API_KEY env var is missing. Add it in Vercel project settings.",
      },
      { status: 500 },
    )
  }

  let body: { imageUrls?: unknown; notes?: unknown }
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 })
  }

  const imageUrls = Array.isArray(body.imageUrls)
    ? body.imageUrls.filter((u): u is string => typeof u === "string")
    : []
  const notes = typeof body.notes === "string" ? body.notes : ""

  if (imageUrls.length === 0 && notes.trim().length === 0) {
    return NextResponse.json(
      { error: "Provide at least one screenshot or some notes." },
      { status: 400 },
    )
  }

  try {
    const result = await generateProjectFields({ imageUrls, notes })
    return NextResponse.json(result)
  } catch (err) {
    const message = err instanceof Error ? err.message : "Generation failed"
    console.error("generate-project error", err)
    return NextResponse.json({ error: `Generation failed: ${message}` }, { status: 500 })
  }
}
