import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { FormField } from "@/components/admin/form-field"
import { Trash2, Plus } from "lucide-react"
import { getAboutParagraphs } from "@/lib/data/about"
import { upsertAboutParagraph, deleteAboutParagraph } from "@/lib/actions/about"

export default async function AboutAdminPage() {
  const paragraphs = await getAboutParagraphs()

  return (
    <div className="max-w-3xl">
      <h2 className="text-xl font-semibold text-foreground mb-1">About paragraphs</h2>
      <p className="text-sm text-muted-foreground mb-6">
        Each row is one paragraph. Use <code className="font-mono">**bold**</code> for emphasis.
      </p>

      <div className="space-y-6">
        {paragraphs.map((p) => (
          <form
            key={p.id}
            action={upsertAboutParagraph}
            className="rounded-lg border border-border bg-card/50 p-4 space-y-3"
          >
            <input type="hidden" name="id" value={p.id} />
            <div className="grid grid-cols-3 gap-3">
              <FormField label="Sort order" htmlFor={`order-${p.id}`}>
                <Input
                  id={`order-${p.id}`}
                  name="sortOrder"
                  type="number"
                  defaultValue={p.sortOrder}
                />
              </FormField>
            </div>
            <FormField label="Content" htmlFor={`content-${p.id}`}>
              <Textarea
                id={`content-${p.id}`}
                name="content"
                rows={5}
                defaultValue={p.content}
                required
              />
            </FormField>
            <div className="flex items-center justify-between">
              <Button type="submit" size="sm">Save</Button>
              <Button
                type="submit"
                size="sm"
                variant="outline"
                formAction={deleteAboutParagraph}
                className="text-destructive border-destructive/30 hover:bg-destructive/10"
              >
                <Trash2 className="h-4 w-4 mr-1" />
                Delete
              </Button>
            </div>
          </form>
        ))}
      </div>

      <div className="mt-10 pt-8 border-t border-border">
        <h3 className="text-base font-medium text-foreground mb-3 flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Add new paragraph
        </h3>
        <form action={upsertAboutParagraph} className="rounded-lg border border-dashed border-border p-4 space-y-3">
          <div className="grid grid-cols-3 gap-3">
            <FormField label="Sort order" htmlFor="new-sortOrder">
              <Input id="new-sortOrder" name="sortOrder" type="number" defaultValue={paragraphs.length} />
            </FormField>
          </div>
          <FormField label="Content" htmlFor="new-content">
            <Textarea id="new-content" name="content" rows={5} required />
          </FormField>
          <Button type="submit" size="sm">Add paragraph</Button>
        </form>
      </div>
    </div>
  )
}
