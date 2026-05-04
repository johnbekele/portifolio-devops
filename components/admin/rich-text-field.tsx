"use client"

import { useState } from "react"
import { Sparkles, Loader2 } from "lucide-react"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

type Common = {
  id: string
  name: string
  rows?: number
  required?: boolean
  reformatKind: "experience" | "project-long"
}

type Uncontrolled = Common & { defaultValue?: string; value?: never; onChange?: never }
type Controlled = Common & {
  value: string
  onChange: (next: string) => void
  defaultValue?: never
}

type RichTextFieldProps = Uncontrolled | Controlled

export function RichTextField(props: RichTextFieldProps) {
  const isControlled = "value" in props && props.value !== undefined
  const [internal, setInternal] = useState(
    !isControlled ? (props as Uncontrolled).defaultValue ?? "" : "",
  )
  const value = isControlled ? (props as Controlled).value : internal
  const setValue = isControlled
    ? (next: string) => (props as Controlled).onChange(next)
    : setInternal

  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function reformat() {
    if (!value.trim()) {
      setError("Write something first.")
      return
    }
    setBusy(true)
    setError(null)
    try {
      const res = await fetch("/api/admin/reformat-text", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: value, kind: props.reformatKind }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error ?? "Reformat failed")
      setValue(data.text)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Reformat failed")
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="space-y-2">
      <Textarea
        id={props.id}
        name={props.name}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        rows={props.rows ?? 12}
        required={props.required}
      />
      <div className="flex items-center gap-3">
        <Button type="button" size="sm" variant="outline" onClick={reformat} disabled={busy}>
          {busy ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Reformatting...
            </>
          ) : (
            <>
              <Sparkles className="mr-2 h-4 w-4" />
              Reformat with AI
            </>
          )}
        </Button>
        {error && <p className="text-xs text-destructive">{error}</p>}
      </div>
    </div>
  )
}
