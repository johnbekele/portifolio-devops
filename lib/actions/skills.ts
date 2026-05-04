"use server"

import { updateTag } from "next/cache"
import { redirect } from "next/navigation"
import { eq } from "drizzle-orm"
import { db } from "@/db"
import { skillCategories } from "@/db/schema"
import { TAGS } from "@/lib/tags"
import { requireAdmin } from "@/lib/auth"
import { parseInt0, parseList, parseStr } from "./_helpers"

export async function upsertSkillCategory(formData: FormData) {
  await requireAdmin()

  const id = formData.get("id")
  const values = {
    sortOrder: parseInt0(formData.get("sortOrder")),
    title: parseStr(formData.get("title")),
    iconName: parseStr(formData.get("iconName"), "Cloud"),
    description: parseStr(formData.get("description")),
    skills: parseList(formData.get("skills")),
  }

  if (typeof id === "string" && id) {
    await db.update(skillCategories).set(values).where(eq(skillCategories.id, Number(id)))
  } else {
    await db.insert(skillCategories).values(values)
  }

  updateTag(TAGS.skills)
  redirect("/admin/skills")
}

export async function deleteSkillCategory(formData: FormData) {
  await requireAdmin()
  const id = formData.get("id")
  if (typeof id !== "string" || !id) return
  await db.delete(skillCategories).where(eq(skillCategories.id, Number(id)))
  updateTag(TAGS.skills)
  redirect("/admin/skills")
}
