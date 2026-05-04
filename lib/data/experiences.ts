import { unstable_cache } from "next/cache"
import { asc, eq } from "drizzle-orm"
import { db } from "@/db"
import { experiences } from "@/db/schema"
import { TAGS } from "@/lib/tags"

export const getExperiences = unstable_cache(
  async () =>
    db
      .select()
      .from(experiences)
      .where(eq(experiences.isVisible, true))
      .orderBy(asc(experiences.sortOrder)),
  ["experiences"],
  { tags: [TAGS.experiences], revalidate: 3600 },
)

export const getAllExperiences = unstable_cache(
  async () => db.select().from(experiences).orderBy(asc(experiences.sortOrder)),
  ["experiences-all"],
  { tags: [TAGS.experiences], revalidate: 3600 },
)
