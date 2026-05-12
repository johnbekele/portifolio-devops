import { NextResponse } from "next/server"
import { auth, isAdminEmail } from "@/lib/auth"
import { deleteByUrl, hasBlobToken } from "@/lib/blob"

export const runtime = "nodejs"

export async function POST(req: Request) {
  const session = await auth()
  if (!session?.user || !isAdminEmail(session.user.email)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const body = await req.json().catch(() => null)
  const url = typeof body?.url === "string" ? body.url : null

  if (!url) {
    return NextResponse.json({ error: "Missing url" }, { status: 400 })
  }

  if (!hasBlobToken()) {
    return NextResponse.json(
      {
        error:
          "Storage not configured: no BLOB_READ_WRITE_TOKEN (or BLOB1_/BLOB2_) env var found.",
      },
      { status: 500 },
    )
  }

  try {
    await deleteByUrl(url)
    return NextResponse.json({ ok: true })
  } catch (err) {
    const message = err instanceof Error ? err.message : "Delete failed"
    console.error("blob delete error", err)
    return NextResponse.json({ error: `Delete failed: ${message}` }, { status: 500 })
  }
}
