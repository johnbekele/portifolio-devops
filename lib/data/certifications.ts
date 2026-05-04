import { unstable_cache } from "next/cache"
import { asc } from "drizzle-orm"
import { db } from "@/db"
import { certifications } from "@/db/schema"
import { TAGS } from "@/lib/tags"

export const getCertifications = unstable_cache(
  async () =>
    db.select().from(certifications).orderBy(asc(certifications.sortOrder)),
  ["certifications"],
  { tags: [TAGS.certifications], revalidate: 3600 },
)
