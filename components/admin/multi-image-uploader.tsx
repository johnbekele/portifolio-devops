"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import {
  Upload,
  Loader2,
  X,
  ArrowUp,
  ArrowDown,
  Clipboard,
  ImagePlus,
} from "lucide-react"
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

async function uploadOne(file: File, prefix: string): Promise<string> {
  const fd = new FormData()
  fd.append("file", file)
  fd.append("prefix", prefix)
  const res = await fetch("/api/upload", { method: "POST", body: fd })
  const data = await res.json()
  if (!res.ok) throw new Error(data.error ?? "Upload failed")
  return data.url as string
}

function isEditableTarget(target: EventTarget | null) {
  if (!(target instanceof HTMLElement)) return false
  const tag = target.tagName
  if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return true
  if (target.isContentEditable) return true
  return false
}

export function MultiImageUploader({ value, onChange, prefix = "projects" }: MultiImageUploaderProps) {
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [pasteHint, setPasteHint] = useState<string | null>(null)
  const valueRef = useRef(value)
  const dropRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    valueRef.current = value
  }, [value])

  async function handleFiles(filesList: FileList | File[] | null | undefined) {
    if (!filesList) return
    const files = Array.from(filesList).filter((f) => f.type.startsWith("image/"))
    if (files.length === 0) return
    setBusy(true)
    setError(null)
    try {
      const results = await Promise.all(files.map((f) => uploadOne(f, prefix)))
      onChange([
        ...valueRef.current,
        ...results.map((url) => ({ src: url, alt: "" })),
      ])
      setPasteHint(`Added ${results.length} ${results.length === 1 ? "image" : "images"}.`)
      setTimeout(() => setPasteHint(null), 2500)
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

  function extractImageFiles(items: DataTransferItemList | null): File[] {
    if (!items) return []
    const out: File[] = []
    for (const item of Array.from(items)) {
      if (item.kind === "file") {
        const file = item.getAsFile()
        if (file && file.type.startsWith("image/")) out.push(file)
      }
    }
    return out
  }

  useEffect(() => {
    function onWindowPaste(e: ClipboardEvent) {
      if (isEditableTarget(e.target)) return
      const files = extractImageFiles(e.clipboardData?.items ?? null)
      if (files.length === 0) return
      e.preventDefault()
      void handleFiles(files)
    }
    window.addEventListener("paste", onWindowPaste)
    return () => window.removeEventListener("paste", onWindowPaste)
  }, [])

  function onZonePaste(e: React.ClipboardEvent<HTMLDivElement>) {
    const files = extractImageFiles(e.clipboardData?.items ?? null)
    if (files.length === 0) return
    e.preventDefault()
    void handleFiles(files)
  }

  function onDragOver(e: React.DragEvent<HTMLDivElement>) {
    if (Array.from(e.dataTransfer.types).includes("Files")) {
      e.preventDefault()
      setIsDragging(true)
    }
  }

  function onDragLeave(e: React.DragEvent<HTMLDivElement>) {
    if (e.currentTarget.contains(e.relatedTarget as Node)) return
    setIsDragging(false)
  }

  function onDrop(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault()
    setIsDragging(false)
    const files = e.dataTransfer.files
    void handleFiles(files)
  }

  return (
    <div className="space-y-3">
      {value.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {value.map((img, idx) => (
            <div
              key={`${img.src}-${idx}`}
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
      )}

      <div
        ref={dropRef}
        tabIndex={0}
        role="button"
        aria-label="Drop, paste, or click to add images"
        onPaste={onZonePaste}
        onDragOver={onDragOver}
        onDragEnter={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        onClick={() => dropRef.current?.focus()}
        className={`relative flex flex-col items-center justify-center gap-2 rounded-md border-2 border-dashed px-4 py-8 text-center transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-ring ${
          isDragging
            ? "border-primary bg-primary/10"
            : "border-border bg-secondary/20 hover:border-primary/40 hover:bg-secondary/40"
        }`}
      >
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
          {busy ? <Loader2 className="h-5 w-5 animate-spin" /> : <ImagePlus className="h-5 w-5" />}
        </div>
        <p className="text-sm font-medium text-foreground">
          {busy ? "Uploading..." : isDragging ? "Drop to upload" : "Drop, paste, or browse images"}
        </p>
        <p className="text-xs text-muted-foreground">
          Drag files here, paste from clipboard{" "}
          <kbd className="rounded border border-border bg-background px-1 font-mono text-[10px]">
            Ctrl/Cmd+V
          </kbd>
          , or use the button below.
        </p>

        <label className="mt-2 inline-flex items-center gap-2 cursor-pointer">
          <Button type="button" variant="outline" size="sm" disabled={busy} asChild>
            <span>
              <Upload className="mr-2 h-4 w-4" />
              Browse files
            </span>
          </Button>
          <input
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            disabled={busy}
            onChange={(e) => {
              void handleFiles(e.target.files)
              e.target.value = ""
            }}
            onClick={(e) => e.stopPropagation()}
          />
        </label>
      </div>

      {(pasteHint || error) && (
        <div className="flex items-center gap-2 text-xs">
          {pasteHint && (
            <span className="inline-flex items-center gap-1 text-emerald-500">
              <Clipboard className="h-3 w-3" />
              {pasteHint}
            </span>
          )}
          {error && <span className="text-destructive">{error}</span>}
        </div>
      )}
    </div>
  )
}
