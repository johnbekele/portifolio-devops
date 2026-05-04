import Link from "next/link"
import { notFound } from "next/navigation"
import { eq } from "drizzle-orm"
import { db } from "@/db"
import { skillCategories } from "@/db/schema"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { FormField, FormSection, FormActions } from "@/components/admin/form-field"
import { upsertSkillCategory } from "@/lib/actions/skills"
import { ICON_NAMES } from "@/lib/icons"
import { ArrowLeft } from "lucide-react"

interface PageProps {
  params: Promise<{ id: string }>
}

export default async function SkillCategoryEditPage({ params }: PageProps) {
  const { id } = await params
  const isNew = id === "new"

  let item: typeof skillCategories.$inferSelect | null = null
  if (!isNew) {
    const numId = Number(id)
    if (!Number.isFinite(numId)) notFound()
    const rows = await db
      .select()
      .from(skillCategories)
      .where(eq(skillCategories.id, numId))
      .limit(1)
    if (!rows[0]) notFound()
    item = rows[0]
  }

  return (
    <div className="max-w-2xl">
      <Link
        href="/admin/skills"
        className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-4"
      >
        <ArrowLeft className="h-4 w-4 mr-1" />
        Back to list
      </Link>

      <h2 className="text-xl font-semibold text-foreground mb-6">
        {isNew ? "New skill category" : `Edit: ${item?.title}`}
      </h2>

      <form action={upsertSkillCategory}>
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
            <FormField label="Icon" htmlFor="iconName">
              <select
                id="iconName"
                name="iconName"
                defaultValue={item?.iconName ?? "Cloud"}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                {ICON_NAMES.map((name) => (
                  <option key={name} value={name}>
                    {name}
                  </option>
                ))}
              </select>
            </FormField>
          </div>

          <FormField label="Title" htmlFor="title">
            <Input id="title" name="title" defaultValue={item?.title ?? ""} required />
          </FormField>

          <FormField label="Description" htmlFor="description">
            <Textarea
              id="description"
              name="description"
              rows={3}
              defaultValue={item?.description ?? ""}
              required
            />
          </FormField>

          <FormField label="Skills" htmlFor="skills" hint="Comma-separated list.">
            <Textarea
              id="skills"
              name="skills"
              rows={4}
              defaultValue={item?.skills?.join(", ") ?? ""}
            />
          </FormField>
        </FormSection>

        <FormActions>
          <Button type="submit">{isNew ? "Create" : "Save changes"}</Button>
          <Button asChild variant="outline">
            <Link href="/admin/skills">Cancel</Link>
          </Button>
        </FormActions>
      </form>
    </div>
  )
}
