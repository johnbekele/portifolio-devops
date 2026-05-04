"use server"

import { updateTag } from "next/cache"
import { redirect } from "next/navigation"
import { eq } from "drizzle-orm"
import { db } from "@/db"
import { certifications } from "@/db/schema"
import { TAGS } from "@/lib/tags"
import { requireAdmin } from "@/lib/auth"
import { parseInt0, parseStr } from "./_helpers"

export async function upsertCertification(formData: FormData) {
  await requireAdmin()

  const id = formData.get("id")
  const values = {
    sortOrder: parseInt0(formData.get("sortOrder")),
    title: parseStr(formData.get("title")),
    issuer: parseStr(formData.get("issuer")),
    date: parseStr(formData.get("date")),
    credentialId: parseStr(formData.get("credentialId")),
    url: parseStr(formData.get("url")),
  }

  if (typeof id === "string" && id) {
    await db.update(certifications).set(values).where(eq(certifications.id, Number(id)))
  } else {
    await db.insert(certifications).values(values)
  }

  updateTag(TAGS.certifications)
  redirect("/admin/certifications")
}

export async function deleteCertification(formData: FormData) {
  await requireAdmin()
  const id = formData.get("id")
  if (typeof id !== "string" || !id) return
  await db.delete(certifications).where(eq(certifications.id, Number(id)))
  updateTag(TAGS.certifications)
  redirect("/admin/certifications")
}
