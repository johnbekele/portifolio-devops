import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plus, Pencil, Trash2 } from "lucide-react"
import { getAllProjects } from "@/lib/data/projects"
import { deleteProject } from "@/lib/actions/projects"

export default async function ProjectsListPage() {
  const items = await getAllProjects()

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-foreground">Projects</h2>
          <p className="text-sm text-muted-foreground">{items.length} entries</p>
        </div>
        <Button asChild size="sm">
          <Link href="/admin/projects/new">
            <Plus className="h-4 w-4 mr-1" />
            New project
          </Link>
        </Button>
      </div>

      <div className="space-y-3">
        {items.map((p) => {
          const thumb = p.images[0]
          return (
            <div
              key={p.id}
              className="flex items-start gap-4 rounded-lg border border-border bg-card/50 p-4"
            >
              <div className="relative w-24 h-16 shrink-0 rounded-md overflow-hidden bg-secondary">
                {thumb && (
                  <Image
                    src={thumb.src}
                    alt={thumb.alt ?? p.title}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                )}
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-xs font-mono text-muted-foreground">#{p.sortOrder}</span>
                  <h3 className="font-medium text-foreground truncate">{p.title}</h3>
                  <Badge variant="outline" className="text-xs">{p.category}</Badge>
                  {p.featured && (
                    <Badge variant="outline" className="text-xs border-accent text-accent">Featured</Badge>
                  )}
                  {!p.isVisible && <Badge variant="outline" className="text-xs">Hidden</Badge>}
                </div>
                <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{p.description}</p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <Button asChild size="sm" variant="outline">
                  <Link href={`/admin/projects/${p.id}`}>
                    <Pencil className="h-4 w-4" />
                  </Link>
                </Button>
                <form action={deleteProject}>
                  <input type="hidden" name="id" value={p.id} />
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
          )
        })}
      </div>
    </div>
  )
}
