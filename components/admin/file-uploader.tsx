"use client"

import { useState } from "react"
import { Upload, Loader2, FileText, Trash2, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"

interface FileUploaderProps {
  value?: string
  onChange: (url: string) => void
  prefix?: string
  accept?: string
  label?: string
  fallbackUrl?: string
}

function isBlobUrl(url: string) {
  return url.includes("vercel-storage.com") || url.includes("blob.vercel")
}

function getFileName(url: string) {
  try {
    const u = new URL(url, "http://placeholder")
    const name = u.pathname.split("/").pop() ?? url
    return decodeURIComponent(name)
  } catch {
    return url.split("/").pop() ?? url
  }
}

async function deleteRemote(url: string) {
  if (!isBlobUrl(url)) return
  try {
    await fetch("/api/upload/delete", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url }),
    })
  } catch {
    // best effort
  }
}

export function FileUploader({
  value,
  onChange,
  prefix = "uploads",
  accept,
  label = "Upload file",
  fallbackUrl = "",
}: FileUploaderProps) {
  const [busy, setBusy] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleFile(file: File) {
    setBusy(true)
    setError(null)
    const previousUrl = value
    try {
      const fd = new FormData()
      fd.append("file", file)
      fd.append("prefix", prefix)
      const res = await fetch("/api/upload", { method: "POST", body: fd })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error ?? "Upload failed")
      onChange(data.url)
      if (previousUrl && previousUrl !== data.url) {
        void deleteRemote(previousUrl)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed")
    } finally {
      setBusy(false)
    }
  }

  async function handleDelete() {
    if (!value) return
    if (typeof window !== "undefined" && !window.confirm("Delete this file?")) return
    setDeleting(true)
    setError(null)
    try {
      if (isBlobUrl(value)) {
        const res = await fetch("/api/upload/delete", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ url: value }),
        })
        if (!res.ok) {
          const data = await res.json().catch(() => ({}))
          throw new Error(data.error ?? "Delete failed")
        }
      }
      onChange(fallbackUrl)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Delete failed")
    } finally {
      setDeleting(false)
    }
  }

  const fileName = value ? getFileName(value) : null
  const isOnBlob = value ? isBlobUrl(value) : false

  return (
    <div className="space-y-2">
      {value && (
        <div className="flex items-center gap-3 rounded-md border border-border bg-secondary/40 p-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
            <FileText className="h-4 w-4" />
          </div>
          <div className="flex-1 min-w-0">
            <a
              href={value}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-sm text-foreground hover:text-primary truncate"
            >
              <span className="truncate">{fileName}</span>
              <ExternalLink className="h-3 w-3 shrink-0" />
            </a>
            <p className="text-[11px] text-muted-foreground mt-0.5">
              {isOnBlob ? "Stored in Vercel Blob" : "Local / external file"}
            </p>
          </div>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={handleDelete}
            disabled={deleting || busy}
            className="text-destructive hover:text-destructive hover:bg-destructive/10"
          >
            {deleting ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Trash2 className="h-4 w-4" />
            )}
            <span className="sr-only">Delete</span>
          </Button>
        </div>
      )}

      <label className="flex items-center gap-2 cursor-pointer">
        <Button type="button" variant="outline" size="sm" disabled={busy || deleting} asChild>
          <span>
            {busy ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Uploading...
              </>
            ) : (
              <>
                <Upload className="mr-2 h-4 w-4" />
                {value ? "Replace file" : label}
              </>
            )}
          </span>
        </Button>
        <input
          type="file"
          accept={accept}
          className="hidden"
          disabled={busy || deleting}
          onChange={(e) => {
            const file = e.target.files?.[0]
            if (file) handleFile(file)
            e.target.value = ""
          }}
        />
      </label>

      {error && <p className="text-xs text-destructive">{error}</p>}

      {value && (
        <p className="text-[11px] text-muted-foreground break-all font-mono">{value}</p>
      )}
    </div>
  )
}
