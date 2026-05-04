"use client"

import { useState } from "react"
import Image from "next/image"
import { Upload, Loader2, X } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ImageUploaderProps {
  value?: string
  onChange: (url: string) => void
  prefix?: string
  label?: string
}

export function ImageUploader({ value, onChange, prefix = "uploads", label = "Upload image" }: ImageUploaderProps) {
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleFile(file: File) {
    setBusy(true)
    setError(null)
    try {
      const fd = new FormData()
      fd.append("file", file)
      fd.append("prefix", prefix)
      const res = await fetch("/api/upload", { method: "POST", body: fd })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error ?? "Upload failed")
      onChange(data.url)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed")
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="space-y-2">
      {value && (
        <div className="relative w-full aspect-video rounded-md overflow-hidden border border-border bg-secondary/40">
          <Image src={value} alt="Preview" fill className="object-cover" unoptimized />
          <button
            type="button"
            onClick={() => onChange("")}
            className="absolute top-2 right-2 bg-background/80 hover:bg-background rounded-full p-1"
            aria-label="Remove image"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      )}

      <label className="flex items-center gap-2 cursor-pointer">
        <Button type="button" variant="outline" size="sm" disabled={busy} asChild>
          <span>
            {busy ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Uploading...
              </>
            ) : (
              <>
                <Upload className="mr-2 h-4 w-4" />
                {label}
              </>
            )}
          </span>
        </Button>
        <input
          type="file"
          accept="image/*"
          className="hidden"
          disabled={busy}
          onChange={(e) => {
            const file = e.target.files?.[0]
            if (file) handleFile(file)
            e.target.value = ""
          }}
        />
      </label>

      {error && <p className="text-xs text-destructive">{error}</p>}

      {value && (
        <p className="text-xs text-muted-foreground break-all font-mono">{value}</p>
      )}
    </div>
  )
}
