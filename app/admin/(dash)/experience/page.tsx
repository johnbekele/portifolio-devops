import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plus, Pencil, Trash2 } from "lucide-react"
import { getAllExperiences } from "@/lib/data/experiences"
import { deleteExperience } from "@/lib/actions/experiences"

export default async function ExperienceListPage() {
  const items = await getAllExperiences()

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-foreground">Experience</h2>
          <p className="text-sm text-muted-foreground">{items.length} entries</p>
        </div>
        <Button asChild size="sm">
          <Link href="/admin/experience/new">
            <Plus className="h-4 w-4 mr-1" />
            New entry
          </Link>
        </Button>
      </div>

      <div className="space-y-3">
        {items.map((exp) => (
          <div
            key={exp.id}
            className="flex items-start justify-between gap-4 rounded-lg border border-border bg-card/50 p-4"
          >
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs font-mono text-muted-foreground">#{exp.sortOrder}</span>
                <h3 className="font-medium text-foreground truncate">{exp.title}</h3>
                {!exp.isVisible && (
                  <Badge variant="outline" className="text-xs">Hidden</Badge>
                )}
              </div>
              <p className="text-sm text-muted-foreground mt-1 truncate">
                {exp.company} · {exp.period}
              </p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <Button asChild size="sm" variant="outline">
                <Link href={`/admin/experience/${exp.id}`}>
                  <Pencil className="h-4 w-4" />
                </Link>
              </Button>
              <form action={deleteExperience}>
                <input type="hidden" name="id" value={exp.id} />
                <Button
                  type="submit"
                  size="sm"
                  variant="outline"
                  className="text-destructive border-destructive/30 hover:bg-destructive/10"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </form>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
