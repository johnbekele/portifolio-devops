import { unstable_cache } from "next/cache"
import { asc } from "drizzle-orm"
import { db } from "@/db"
import { skillCategories } from "@/db/schema"
import { TAGS } from "@/lib/tags"

export const getSkillCategories = unstable_cache(
  async () =>
    db
      .select()
      .from(skillCategories)
      .orderBy(asc(skillCategories.sortOrder)),
  ["skill_categories"],
  { tags: [TAGS.skills], revalidate: 3600 },
)
