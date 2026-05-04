import { unstable_cache } from "next/cache"
import { asc, eq } from "drizzle-orm"
import { db } from "@/db"
import { projects } from "@/db/schema"
import { TAGS } from "@/lib/tags"

export const getProjects = unstable_cache(
  async () =>
    db
      .select()
      .from(projects)
      .where(eq(projects.isVisible, true))
      .orderBy(asc(projects.sortOrder)),
  ["projects"],
  { tags: [TAGS.projects], revalidate: 3600 },
)

export const getAllProjects = unstable_cache(
  async () => db.select().from(projects).orderBy(asc(projects.sortOrder)),
  ["projects-all"],
  { tags: [TAGS.projects], revalidate: 3600 },
)
