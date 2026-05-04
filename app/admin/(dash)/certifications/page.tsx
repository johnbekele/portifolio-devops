import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Plus, Pencil, Trash2, Award } from "lucide-react"
import { getCertifications } from "@/lib/data/certifications"
import { deleteCertification } from "@/lib/actions/certifications"

export default async function CertificationsListPage() {
  const items = await getCertifications()

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-foreground">Certifications</h2>
          <p className="text-sm text-muted-foreground">{items.length} entries</p>
        </div>
        <Button asChild size="sm">
          <Link href="/admin/certifications/new">
            <Plus className="h-4 w-4 mr-1" />
            New certification
          </Link>
        </Button>
      </div>

      <div className="space-y-3">
        {items.map((c) => (
          <div
            key={c.id}
            className="flex items-start gap-4 rounded-lg border border-border bg-card/50 p-4"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary shrink-0">
              <Award className="h-5 w-5" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono text-muted-foreground">#{c.sortOrder}</span>
                <h3 className="font-medium text-foreground truncate">{c.title}</h3>
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                {c.issuer} · {c.date}
              </p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <Button asChild size="sm" variant="outline">
                <Link href={`/admin/certifications/${c.id}`}>
                  <Pencil className="h-4 w-4" />
                </Link>
              </Button>
              <form action={deleteCertification}>
                <input type="hidden" name="id" value={c.id} />
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
