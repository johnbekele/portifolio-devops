import { unstable_cache } from "next/cache"
import { db } from "@/db"
import { hero } from "@/db/schema"
import { TAGS } from "@/lib/tags"

export const getHero = unstable_cache(
  async () => {
    const rows = await db.select().from(hero).limit(1)
    return rows[0] ?? null
  },
  ["hero"],
  { tags: [TAGS.hero], revalidate: 3600 },
)
