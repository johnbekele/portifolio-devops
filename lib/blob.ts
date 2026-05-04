import { put, del } from "@vercel/blob"

export async function uploadFile(file: File, prefix = "uploads") {
  const ext = file.name.split(".").pop() ?? "bin"
  const safeName = file.name.replace(/[^a-zA-Z0-9.-]/g, "_")
  const pathname = `${prefix}/${Date.now()}-${safeName}`
  const blob = await put(pathname, file, {
    access: "public",
    addRandomSuffix: true,
    contentType: file.type || `application/${ext}`,
  })
  return { url: blob.url, pathname: blob.pathname }
}

export async function deleteByUrl(url: string) {
  try {
    await del(url)
  } catch {
    // ignore — blob may already be gone
  }
}
