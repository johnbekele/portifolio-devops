"use client"

import { useState } from "react"
import Link from "next/link"
import { Sparkles, Loader2 } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { FormField, FormSection, FormActions } from "@/components/admin/form-field"
import { MultiImageUploader, type ProjectImage } from "@/components/admin/multi-image-uploader"
import { upsertProject } from "@/lib/actions/projects"
import type { Project } from "@/db/schema"

const CATEGORIES = [
  { value: "devops", label: "DevOps & Cloud" },
  { value: "fullstack", label: "Full-Stack" },
  { value: "llm", label: "AI / LLM" },
] as const

type Category = (typeof CATEGORIES)[number]["value"]

interface ProjectFormProps {
  item: Project | null
}

export function ProjectForm({ item }: ProjectFormProps) {
  const [images, setImages] = useState<ProjectImage[]>(item?.images ?? [])
  const [title, setTitle] = useState(item?.title ?? "")
  const [category, setCategory] = useState<Category>(item?.category ?? "fullstack")
  const [description, setDescription] = useState(item?.description ?? "")
  const [longDescription, setLongDescription] = useState(item?.longDescription ?? "")
  const [technologies, setTechnologies] = useState(item?.technologies?.join(", ") ?? "")

  const [aiNotes, setAiNotes] = useState("")
  const [aiBusy, setAiBusy] = useState(false)
  const [aiError, setAiError] = useState<string | null>(null)

  async function generateWithAI() {
    setAiBusy(true)
    setAiError(null)
    try {
      const res = await fetch("/api/admin/generate-project", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          imageUrls: images.map((img) => img.src),
          notes: aiNotes,
        }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error ?? "Generation failed")
      setTitle(data.title)
      setCategory(data.category)
      setDescription(data.description)
      setLongDescription(data.longDescription)
      setTechnologies(
        Array.isArray(data.technologies) ? data.technologies.join(", ") : "",
      )
    } catch (err) {
      setAiError(err instanceof Error ? err.message : "Generation failed")
    } finally {
      setAiBusy(false)
    }
  }

  return (
    <form action={upsertProject}>
      {item && <input type="hidden" name="id" value={item.id} />}
      <input type="hidden" name="images" value={JSON.stringify(images)} />

      <FormSection>
        <div className="grid grid-cols-3 gap-4">
          <FormField label="Sort order" htmlFor="sortOrder">
            <Input
              id="sortOrder"
              name="sortOrder"
              type="number"
              defaultValue={item?.sortOrder ?? 0}
            />
          </FormField>
          <FormField label="Category" htmlFor="category">
            <select
              id="category"
              name="category"
              value={category}
              onChange={(e) => setCategory(e.target.value as Category)}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              {CATEGORIES.map((c) => (
                <option key={c.value} value={c.value}>
                  {c.label}
                </option>
              ))}
            </select>
          </FormField>
          <div className="space-y-2 pt-7">
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                name="featured"
                defaultChecked={item?.featured ?? false}
                className="h-4 w-4 rounded border-border"
              />
              Featured
            </label>
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                name="isVisible"
                defaultChecked={item?.isVisible ?? true}
                className="h-4 w-4 rounded border-border"
              />
              Visible
            </label>
          </div>
        </div>

        <FormField label="Images">
          <MultiImageUploader value={images} onChange={setImages} prefix="projects" />
        </FormField>

        <div className="rounded-lg border border-dashed border-primary/40 bg-primary/5 p-4 space-y-3">
          <div className="flex items-center gap-2 text-sm font-medium text-foreground">
            <Sparkles className="h-4 w-4 text-primary" />
            Generate fields with Claude
          </div>
          <p className="text-xs text-muted-foreground">
            Upload screenshots above, drop a few notes below, then let Claude fill out the rest.
            You can edit anything before saving.
          </p>
          <Textarea
            value={aiNotes}
            onChange={(e) => setAiNotes(e.target.value)}
            rows={3}
            placeholder="e.g. AWS infra designer that exports Terraform/Pulumi. Built solo. Next.js + React Flow + Lambda. Shipped to demo at infracanvas.app."
            className="bg-background"
          />
          <div className="flex items-center gap-3">
            <Button type="button" onClick={generateWithAI} disabled={aiBusy} size="sm">
              {aiBusy ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-4 w-4" />
                  Generate with AI
                </>
              )}
            </Button>
            {aiError && <p className="text-xs text-destructive">{aiError}</p>}
          </div>
        </div>

        <FormField label="Title" htmlFor="title">
          <Input
            id="title"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </FormField>

        <FormField label="Short description" htmlFor="description" hint="One-liner shown in the list.">
          <Textarea
            id="description"
            name="description"
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </FormField>

        <FormField
          label="Long description"
          htmlFor="longDescription"
          hint='Shown in the project modal. Blank lines = new paragraph, "- " = bullet, **text** = bold.'
        >
          <Textarea
            id="longDescription"
            name="longDescription"
            rows={10}
            value={longDescription}
            onChange={(e) => setLongDescription(e.target.value)}
            required
          />
        </FormField>

        <FormField label="Technologies" htmlFor="technologies" hint="Comma-separated.">
          <Input
            id="technologies"
            name="technologies"
            value={technologies}
            onChange={(e) => setTechnologies(e.target.value)}
          />
        </FormField>

        <div className="grid grid-cols-2 gap-4">
          <FormField label="GitHub URL" htmlFor="githubUrl">
            <Input id="githubUrl" name="githubUrl" type="url" defaultValue={item?.githubUrl ?? ""} />
          </FormField>
          <FormField label="Demo URL" htmlFor="demoUrl">
            <Input id="demoUrl" name="demoUrl" type="url" defaultValue={item?.demoUrl ?? ""} />
          </FormField>
        </div>
      </FormSection>

      <FormActions>
        <Button type="submit">{item ? "Save changes" : "Create"}</Button>
        <Button asChild variant="outline">
          <Link href="/admin/projects">Cancel</Link>
        </Button>
      </FormActions>
    </form>
  )
}
