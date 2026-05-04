"use server"

import { updateTag } from "next/cache"
import { redirect } from "next/navigation"
import { eq } from "drizzle-orm"
import { db } from "@/db"
import { experiences } from "@/db/schema"
import { TAGS } from "@/lib/tags"
import { requireAdmin } from "@/lib/auth"
import { parseBool, parseInt0, parseList, parseStr } from "./_helpers"

export async function upsertExperience(formData: FormData) {
  await requireAdmin()

  const id = formData.get("id")
  const values = {
    sortOrder: parseInt0(formData.get("sortOrder")),
    period: parseStr(formData.get("period")),
    title: parseStr(formData.get("title")),
    company: parseStr(formData.get("company")),
    url: parseStr(formData.get("url")),
    description: parseStr(formData.get("description")),
    technologies: parseList(formData.get("technologies")),
    isVisible: parseBool(formData.get("isVisible")),
  }

  if (typeof id === "string" && id) {
    await db.update(experiences).set(values).where(eq(experiences.id, Number(id)))
  } else {
    await db.insert(experiences).values(values)
  }

  updateTag(TAGS.experiences)
  redirect("/admin/experience")
}

export async function deleteExperience(formData: FormData) {
  await requireAdmin()
  const id = formData.get("id")
  if (typeof id !== "string" || !id) return
  await db.delete(experiences).where(eq(experiences.id, Number(id)))
  updateTag(TAGS.experiences)
  redirect("/admin/experience")
}
