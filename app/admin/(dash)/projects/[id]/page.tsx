import Link from "next/link"
import { notFound } from "next/navigation"
import { eq } from "drizzle-orm"
import { db } from "@/db"
import { projects } from "@/db/schema"
import { ProjectForm } from "./project-form"
import { ArrowLeft } from "lucide-react"

interface PageProps {
  params: Promise<{ id: string }>
}

export default async function ProjectEditPage({ params }: PageProps) {
  const { id } = await params
  const isNew = id === "new"

  let item: typeof projects.$inferSelect | null = null
  if (!isNew) {
    const numId = Number(id)
    if (!Number.isFinite(numId)) notFound()
    const rows = await db.select().from(projects).where(eq(projects.id, numId)).limit(1)
    if (!rows[0]) notFound()
    item = rows[0]
  }

  return (
    <div className="max-w-3xl">
      <Link
        href="/admin/projects"
        className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-4"
      >
        <ArrowLeft className="h-4 w-4 mr-1" />
        Back to list
      </Link>

      <h2 className="text-xl font-semibold text-foreground mb-6">
        {isNew ? "New project" : `Edit: ${item?.title}`}
      </h2>

      <ProjectForm item={item} />
    </div>
  )
}
