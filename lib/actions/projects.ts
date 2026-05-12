"use server"

import { updateTag } from "next/cache"
import { redirect } from "next/navigation"
import { eq } from "drizzle-orm"
import { db } from "@/db"
import { projects } from "@/db/schema"
import { TAGS } from "@/lib/tags"
import { requireAdmin } from "@/lib/auth"
import {
  parseBool,
  parseInt0,
  parseJsonArray,
  parseList,
  parseStr,
  parseStrOrNull,
} from "./_helpers"

const ALLOWED_CATEGORIES = ["devops", "fullstack", "llm"] as const
type Category = (typeof ALLOWED_CATEGORIES)[number]

function normalizeCategories(formData: FormData): Category[] {
  const raw = formData.getAll("categories")
  const seen = new Set<Category>()
  for (const value of raw) {
    if (
      typeof value === "string" &&
      (ALLOWED_CATEGORIES as readonly string[]).includes(value)
    ) {
      seen.add(value as Category)
    }
  }
  if (seen.size === 0) {
    const fallback = parseStr(formData.get("category"), "fullstack")
    if ((ALLOWED_CATEGORIES as readonly string[]).includes(fallback)) {
      seen.add(fallback as Category)
    } else {
      seen.add("fullstack")
    }
  }
  return Array.from(seen)
}

export async function upsertProject(formData: FormData) {
  await requireAdmin()

  const id = formData.get("id")
  const categories = normalizeCategories(formData)

  const values = {
    sortOrder: parseInt0(formData.get("sortOrder")),
    title: parseStr(formData.get("title")),
    category: categories[0],
    categories,
    description: parseStr(formData.get("description")),
    longDescription: parseStr(formData.get("longDescription")),
    technologies: parseList(formData.get("technologies")),
    images: parseJsonArray<{ src: string; alt?: string }>(formData.get("images"), []),
    githubUrl: parseStrOrNull(formData.get("githubUrl")),
    demoUrl: parseStrOrNull(formData.get("demoUrl")),
    featured: parseBool(formData.get("featured")),
    isVisible: parseBool(formData.get("isVisible")),
  }

  if (typeof id === "string" && id) {
    await db.update(projects).set(values).where(eq(projects.id, Number(id)))
  } else {
    await db.insert(projects).values(values)
  }

  updateTag(TAGS.projects)
  redirect("/admin/projects")
}

export async function deleteProject(formData: FormData) {
  await requireAdmin()
  const id = formData.get("id")
  if (typeof id !== "string" || !id) return
  await db.delete(projects).where(eq(projects.id, Number(id)))
  updateTag(TAGS.projects)
  redirect("/admin/projects")
}
