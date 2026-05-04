import Link from "next/link"
import { notFound } from "next/navigation"
import { eq } from "drizzle-orm"
import { db } from "@/db"
import { experiences } from "@/db/schema"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { FormField, FormSection, FormActions } from "@/components/admin/form-field"
import { RichTextField } from "@/components/admin/rich-text-field"
import { upsertExperience } from "@/lib/actions/experiences"
import { ArrowLeft } from "lucide-react"

interface PageProps {
  params: Promise<{ id: string }>
}

export default async function ExperienceEditPage({ params }: PageProps) {
  const { id } = await params
  const isNew = id === "new"

  let item: typeof experiences.$inferSelect | null = null
  if (!isNew) {
    const numId = Number(id)
    if (!Number.isFinite(numId)) notFound()
    const rows = await db.select().from(experiences).where(eq(experiences.id, numId)).limit(1)
    if (!rows[0]) notFound()
    item = rows[0]
  }

  return (
    <div className="max-w-2xl">
      <Link
        href="/admin/experience"
        className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-4"
      >
        <ArrowLeft className="h-4 w-4 mr-1" />
        Back to list
      </Link>

      <h2 className="text-xl font-semibold text-foreground mb-6">
        {isNew ? "New experience" : `Edit: ${item?.title}`}
      </h2>

      <form action={upsertExperience}>
        {item && <input type="hidden" name="id" value={item.id} />}

        <FormSection>
          <div className="grid grid-cols-2 gap-4">
            <FormField label="Sort order" htmlFor="sortOrder">
              <Input
                id="sortOrder"
                name="sortOrder"
                type="number"
                defaultValue={item?.sortOrder ?? 0}
              />
            </FormField>
            <FormField label="Visible" htmlFor="isVisible">
              <div className="flex items-center h-10">
                <input
                  id="isVisible"
                  name="isVisible"
                  type="checkbox"
                  defaultChecked={item?.isVisible ?? true}
                  className="h-4 w-4 rounded border-border"
                />
                <label htmlFor="isVisible" className="ml-2 text-sm text-muted-foreground">
                  Show on public site
                </label>
              </div>
            </FormField>
          </div>

          <FormField label="Period" htmlFor="period" hint="e.g. AUG 2024 - PRESENT">
            <Input id="period" name="period" defaultValue={item?.period ?? ""} required />
          </FormField>

          <FormField label="Title" htmlFor="title">
            <Input id="title" name="title" defaultValue={item?.title ?? ""} required />
          </FormField>

          <FormField label="Company" htmlFor="company">
            <Input id="company" name="company" defaultValue={item?.company ?? ""} required />
          </FormField>

          <FormField label="Company URL" htmlFor="url">
            <Input id="url" name="url" type="url" defaultValue={item?.url ?? ""} required />
          </FormField>

          <FormField
            label="Description"
            htmlFor="description"
            hint='Use blank lines to separate paragraphs, "- " for bullets, **text** for bold. Or click Reformat with AI to do it for you.'
          >
            <RichTextField
              id="description"
              name="description"
              defaultValue={item?.description ?? ""}
              rows={12}
              required
              reformatKind="experience"
            />
          </FormField>

          <FormField
            label="Technologies"
            htmlFor="technologies"
            hint="Comma-separated list, e.g. AWS ECS, Docker, Pulumi"
          >
            <Input
              id="technologies"
              name="technologies"
              defaultValue={item?.technologies?.join(", ") ?? ""}
            />
          </FormField>
        </FormSection>

        <FormActions>
          <Button type="submit">{isNew ? "Create" : "Save changes"}</Button>
          <Button asChild variant="outline">
            <Link href="/admin/experience">Cancel</Link>
          </Button>
        </FormActions>
      </form>
    </div>
  )
}
