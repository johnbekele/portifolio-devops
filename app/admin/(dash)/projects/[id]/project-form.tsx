"use client"

import { useState } from "react"
import Link from "next/link"
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

interface ProjectFormProps {
  item: Project | null
}

export function ProjectForm({ item }: ProjectFormProps) {
  const [images, setImages] = useState<ProjectImage[]>(item?.images ?? [])

  return (
    <form action={upsertProject}>
      {item && <input type="hidden" name="id" value={item.id} />}
      <input type="hidden" name="images" value={JSON.stringify(images)} />

      <FormSection>
        <div className="grid grid-cols-3 gap-4">
          <FormField label="Sort order" htmlFor="sortOrder">
            <Input id="sortOrder" name="sortOrder" type="number" defaultValue={item?.sortOrder ?? 0} />
          </FormField>
          <FormField label="Category" htmlFor="category">
            <select
              id="category"
              name="category"
              defaultValue={item?.category ?? "fullstack"}
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

        <FormField label="Title" htmlFor="title">
          <Input id="title" name="title" defaultValue={item?.title ?? ""} required />
        </FormField>

        <FormField label="Short description" htmlFor="description" hint="One-liner shown in the list.">
          <Textarea
            id="description"
            name="description"
            rows={3}
            defaultValue={item?.description ?? ""}
            required
          />
        </FormField>

        <FormField label="Long description" htmlFor="longDescription" hint="Full text shown in the modal.">
          <Textarea
            id="longDescription"
            name="longDescription"
            rows={8}
            defaultValue={item?.longDescription ?? ""}
            required
          />
        </FormField>

        <FormField label="Technologies" htmlFor="technologies" hint="Comma-separated.">
          <Input
            id="technologies"
            name="technologies"
            defaultValue={item?.technologies?.join(", ") ?? ""}
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

        <FormField label="Images">
          <MultiImageUploader value={images} onChange={setImages} prefix="projects" />
        </FormField>
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
