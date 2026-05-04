"use client"

import { useState } from "react"
import Image from "next/image"
import { Upload, Loader2, X, ArrowUp, ArrowDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export interface ProjectImage {
  src: string
  alt?: string
}

interface MultiImageUploaderProps {
  value: ProjectImage[]
  onChange: (images: ProjectImage[]) => void
  prefix?: string
}

export function MultiImageUploader({ value, onChange, prefix = "projects" }: MultiImageUploaderProps) {
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
      onChange([...value, { src: data.url, alt: "" }])
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed")
    } finally {
      setBusy(false)
    }
  }

  function removeAt(idx: number) {
    onChange(value.filter((_, i) => i !== idx))
  }

  function move(idx: number, dir: -1 | 1) {
    const next = [...value]
    const target = idx + dir
    if (target < 0 || target >= next.length) return
    ;[next[idx], next[target]] = [next[target], next[idx]]
    onChange(next)
  }

  function setAlt(idx: number, alt: string) {
    onChange(value.map((img, i) => (i === idx ? { ...img, alt } : img)))
  }

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {value.map((img, idx) => (
          <div
            key={idx}
            className="relative rounded-md border border-border bg-secondary/40 overflow-hidden"
          >
            <div className="relative aspect-video">
              <Image src={img.src} alt={img.alt || `Image ${idx + 1}`} fill className="object-cover" unoptimized />
            </div>
            <div className="p-2 space-y-2">
              <Input
                value={img.alt ?? ""}
                onChange={(e) => setAlt(idx, e.target.value)}
                placeholder="Alt text (optional)"
                className="text-xs"
              />
              <div className="flex items-center gap-1">
                <Button type="button" size="icon" variant="ghost" onClick={() => move(idx, -1)} disabled={idx === 0}>
                  <ArrowUp className="h-4 w-4" />
                </Button>
                <Button
                  type="button"
                  size="icon"
                  variant="ghost"
                  onClick={() => move(idx, 1)}
                  disabled={idx === value.length - 1}
                >
                  <ArrowDown className="h-4 w-4" />
                </Button>
                <Button type="button" size="icon" variant="ghost" onClick={() => removeAt(idx)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <label className="inline-flex items-center gap-2 cursor-pointer">
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
                Add image
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
    </div>
  )
}
