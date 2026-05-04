"use server"

import { updateTag } from "next/cache"
import { redirect } from "next/navigation"
import { eq } from "drizzle-orm"
import { db } from "@/db"
import { aboutParagraphs } from "@/db/schema"
import { TAGS } from "@/lib/tags"
import { requireAdmin } from "@/lib/auth"
import { parseInt0, parseStr } from "./_helpers"

export async function upsertAboutParagraph(formData: FormData) {
  await requireAdmin()

  const id = formData.get("id")
  const content = parseStr(formData.get("content"))
  const sortOrder = parseInt0(formData.get("sortOrder"))

  if (typeof id === "string" && id) {
    await db
      .update(aboutParagraphs)
      .set({ content, sortOrder })
      .where(eq(aboutParagraphs.id, Number(id)))
  } else {
    await db.insert(aboutParagraphs).values({ content, sortOrder })
  }

  updateTag(TAGS.about)
  redirect("/admin/about")
}

export async function deleteAboutParagraph(formData: FormData) {
  await requireAdmin()
  const id = formData.get("id")
  if (typeof id !== "string" || !id) return
  await db.delete(aboutParagraphs).where(eq(aboutParagraphs.id, Number(id)))
  updateTag(TAGS.about)
  redirect("/admin/about")
}
