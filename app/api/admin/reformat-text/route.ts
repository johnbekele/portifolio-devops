import { NextResponse } from "next/server"
import { auth, isAdminEmail } from "@/lib/auth"
import { reformatText, type ReformatKind } from "@/lib/ai/text-reformat"

export const runtime = "nodejs"
export const maxDuration = 60

const ALLOWED_KINDS: ReformatKind[] = ["experience", "project-long"]

export async function POST(req: Request) {
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

  let body: { text?: unknown; kind?: unknown }
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 })
  }

  const text = typeof body.text === "string" ? body.text : ""
  const kind = body.kind as ReformatKind
  if (!text.trim()) {
    return NextResponse.json({ error: "Text is empty" }, { status: 400 })
  }
  if (!ALLOWED_KINDS.includes(kind)) {
    return NextResponse.json({ error: "Invalid kind" }, { status: 400 })
  }

  try {
    const reformatted = await reformatText(text, kind)
    return NextResponse.json({ text: reformatted })
  } catch (err) {
    const message = err instanceof Error ? err.message : "Reformat failed"
    console.error("reformat-text error", err)
    return NextResponse.json({ error: `Reformat failed: ${message}` }, { status: 500 })
  }
}
