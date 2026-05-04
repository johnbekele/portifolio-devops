import { NextResponse } from "next/server"
import { auth, isAdminEmail } from "@/lib/auth"
import { uploadFile } from "@/lib/blob"

export const runtime = "nodejs"

export async function POST(req: Request) {
  const session = await auth()
  if (!session?.user || !isAdminEmail(session.user.email)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const form = await req.formData()
  const file = form.get("file")
  const prefix = (form.get("prefix") as string | null) ?? "uploads"

  if (!(file instanceof File)) {
    return NextResponse.json({ error: "Missing file" }, { status: 400 })
  }

  if (file.size > 8 * 1024 * 1024) {
    return NextResponse.json({ error: "File too large (max 8MB)" }, { status: 413 })
  }

  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    console.error("upload: BLOB_READ_WRITE_TOKEN env var is not set")
    return NextResponse.json(
      {
        error:
          "Storage not configured: BLOB_READ_WRITE_TOKEN is missing. Add it to your Vercel project env vars (Storage → Blob).",
      },
      { status: 500 },
    )
  }

  try {
    const { url } = await uploadFile(file, prefix)
    return NextResponse.json({ url })
  } catch (err) {
    const message = err instanceof Error ? err.message : "Upload failed"
    console.error("upload error", err)
    // Admin-only route — safe to return the underlying message to the caller
    // so we can debug without trawling Vercel logs.
    return NextResponse.json({ error: `Upload failed: ${message}` }, { status: 500 })
  }
}
