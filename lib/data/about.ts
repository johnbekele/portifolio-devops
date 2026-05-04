import { unstable_cache } from "next/cache"
import { asc } from "drizzle-orm"
import { db } from "@/db"
import { aboutParagraphs } from "@/db/schema"
import { TAGS } from "@/lib/tags"

export const getAboutParagraphs = unstable_cache(
  async () =>
    db
      .select()
      .from(aboutParagraphs)
      .orderBy(asc(aboutParagraphs.sortOrder)),
  ["about_paragraphs"],
  { tags: [TAGS.about], revalidate: 3600 },
)
