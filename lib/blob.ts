import { put, del } from "@vercel/blob"

// Vercel injects BLOB_READ_WRITE_TOKEN by default, but renames it (BLOB1_, BLOB2_, ...)
// when a project is connected to multiple Blob stores. Accept either name.
function blobToken(): string | undefined {
  return (
    process.env.BLOB_READ_WRITE_TOKEN ||
    process.env.BLOB1_READ_WRITE_TOKEN ||
    process.env.BLOB2_READ_WRITE_TOKEN
  )
}

export function hasBlobToken(): boolean {
  return Boolean(blobToken())
}

export async function uploadFile(file: File, prefix = "uploads") {
  const ext = file.name.split(".").pop() ?? "bin"
  const safeName = file.name.replace(/[^a-zA-Z0-9.-]/g, "_")
  const pathname = `${prefix}/${Date.now()}-${safeName}`
  const blob = await put(pathname, file, {
    access: "public",
    addRandomSuffix: true,
    contentType: file.type || `application/${ext}`,
    token: blobToken(),
  })
  return { url: blob.url, pathname: blob.pathname }
}

export async function deleteByUrl(url: string) {
  try {
    await del(url, { token: blobToken() })
  } catch {
    // ignore — blob may already be gone
  }
}
