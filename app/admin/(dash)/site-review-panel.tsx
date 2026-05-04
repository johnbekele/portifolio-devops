"use client"

import { useState } from "react"
import { Sparkles, Loader2, AlertCircle, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface Suggestion {
  section: string
  priority: "high" | "medium" | "low"
  issue: string
  suggestion: string
}

const SECTION_LINKS: Record<string, string> = {
  hero: "/admin/hero",
  about: "/admin/about",
  experience: "/admin/experience",
  projects: "/admin/projects",
  skills: "/admin/skills",
  certifications: "/admin/certifications",
}

const PRIORITY_STYLES: Record<Suggestion["priority"], string> = {
  high: "bg-destructive/10 text-destructive border-destructive/30",
  medium: "bg-amber-500/10 text-amber-400 border-amber-500/30",
  low: "bg-muted text-muted-foreground border-border",
}

export function SiteReviewPanel() {
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [suggestions, setSuggestions] = useState<Suggestion[] | null>(null)

  async function run() {
    setBusy(true)
    setError(null)
    try {
      const res = await fetch("/api/admin/site-review", { method: "POST" })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error ?? "Review failed")
      setSuggestions(data.suggestions ?? [])
    } catch (err) {
      setError(err instanceof Error ? err.message : "Review failed")
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="rounded-lg border border-primary/30 bg-primary/5 p-5">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h3 className="font-medium text-foreground flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-primary" />
            Review with Claude
          </h3>
          <p className="text-sm text-muted-foreground mt-1">
            Have Claude skim your whole site and surface the highest-impact edits.
          </p>
        </div>
        <Button onClick={run} disabled={busy} size="sm">
          {busy ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Reviewing...
            </>
          ) : (
            <>
              <Sparkles className="mr-2 h-4 w-4" />
              {suggestions ? "Re-run review" : "Run review"}
            </>
          )}
        </Button>
      </div>

      {error && (
        <div className="mt-4 flex items-start gap-2 text-sm text-destructive">
          <AlertCircle className="h-4 w-4 mt-0.5 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {suggestions && suggestions.length === 0 && (
        <p className="mt-4 text-sm text-muted-foreground">
          Nothing flagged. Site reads cleanly.
        </p>
      )}

      {suggestions && suggestions.length > 0 && (
        <ul className="mt-5 space-y-3">
          {suggestions.map((s, i) => {
            const link = SECTION_LINKS[s.section]
            return (
              <li
                key={i}
                className="rounded-md border border-border bg-card/60 p-4 space-y-2"
              >
                <div className="flex items-center gap-2 flex-wrap">
                  <Badge variant="outline" className={PRIORITY_STYLES[s.priority]}>
                    {s.priority}
                  </Badge>
                  <span className="text-sm font-medium text-foreground capitalize">
                    {s.section}
                  </span>
                  {link && (
                    <a
                      href={link}
                      className="ml-auto inline-flex items-center text-xs text-muted-foreground hover:text-primary"
                    >
                      Edit section
                      <ArrowRight className="h-3 w-3 ml-1" />
                    </a>
                  )}
                </div>
                <p className="text-sm text-foreground">{s.issue}</p>
                <p className="text-sm text-muted-foreground">{s.suggestion}</p>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}
