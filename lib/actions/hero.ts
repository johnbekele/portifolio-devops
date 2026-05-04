"use server"

import { updateTag } from "next/cache"
import { redirect } from "next/navigation"
import { db } from "@/db"
import { hero } from "@/db/schema"
import { TAGS } from "@/lib/tags"
import { requireAdmin } from "@/lib/auth"
import { parseStr } from "./_helpers"

export async function saveHero(formData: FormData) {
  await requireAdmin()

  const values = {
    name: parseStr(formData.get("name")),
    title: parseStr(formData.get("title")),
    subtitle: parseStr(formData.get("subtitle")),
    tagline: parseStr(formData.get("tagline")),
    resumeUrl: parseStr(formData.get("resumeUrl"), "/Yohans_Bekele_Resume.pdf"),
    githubUrl: parseStr(formData.get("githubUrl")),
    linkedinUrl: parseStr(formData.get("linkedinUrl")),
    email: parseStr(formData.get("email")),
    profileImageUrl: parseStr(formData.get("profileImageUrl"), "/images/profile.jpg"),
    location: parseStr(formData.get("location")),
    contactBlurb: parseStr(formData.get("contactBlurb")),
    updatedAt: new Date(),
  }

  const existing = await db.select().from(hero).limit(1)

  if (existing.length === 0) {
    await db.insert(hero).values(values)
  } else {
    await db.update(hero).set(values)
  }

  updateTag(TAGS.hero)
  updateTag(TAGS.about)
  updateTag(TAGS.experiences)
  redirect("/admin/hero?saved=1")
}
