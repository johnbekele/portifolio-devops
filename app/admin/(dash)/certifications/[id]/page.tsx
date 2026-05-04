import Link from "next/link"
import { notFound } from "next/navigation"
import { eq } from "drizzle-orm"
import { db } from "@/db"
import { certifications } from "@/db/schema"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { FormField, FormSection, FormActions } from "@/components/admin/form-field"
import { upsertCertification } from "@/lib/actions/certifications"
import { ArrowLeft } from "lucide-react"

interface PageProps {
  params: Promise<{ id: string }>
}

export default async function CertificationEditPage({ params }: PageProps) {
  const { id } = await params
  const isNew = id === "new"

  let item: typeof certifications.$inferSelect | null = null
  if (!isNew) {
    const numId = Number(id)
    if (!Number.isFinite(numId)) notFound()
    const rows = await db
      .select()
      .from(certifications)
      .where(eq(certifications.id, numId))
      .limit(1)
    if (!rows[0]) notFound()
    item = rows[0]
  }

  return (
    <div className="max-w-2xl">
      <Link
        href="/admin/certifications"
        className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-4"
      >
        <ArrowLeft className="h-4 w-4 mr-1" />
        Back to list
      </Link>

      <h2 className="text-xl font-semibold text-foreground mb-6">
        {isNew ? "New certification" : `Edit: ${item?.title}`}
      </h2>

      <form action={upsertCertification}>
        {item && <input type="hidden" name="id" value={item.id} />}

        <FormSection>
          <FormField label="Sort order" htmlFor="sortOrder">
            <Input id="sortOrder" name="sortOrder" type="number" defaultValue={item?.sortOrder ?? 0} />
          </FormField>

          <FormField label="Title" htmlFor="title">
            <Input id="title" name="title" defaultValue={item?.title ?? ""} required />
          </FormField>

          <FormField label="Issuer" htmlFor="issuer">
            <Input id="issuer" name="issuer" defaultValue={item?.issuer ?? ""} required />
          </FormField>

          <FormField label="Date" htmlFor="date" hint="Free-form, e.g. 'Certified' or 'Mar 2024'.">
            <Input id="date" name="date" defaultValue={item?.date ?? ""} required />
          </FormField>

          <FormField label="Credential ID" htmlFor="credentialId">
            <Input
              id="credentialId"
              name="credentialId"
              defaultValue={item?.credentialId ?? ""}
              required
            />
          </FormField>

          <FormField label="URL" htmlFor="url">
            <Input id="url" name="url" type="url" defaultValue={item?.url ?? ""} required />
          </FormField>
        </FormSection>

        <FormActions>
          <Button type="submit">{isNew ? "Create" : "Save changes"}</Button>
          <Button asChild variant="outline">
            <Link href="/admin/certifications">Cancel</Link>
          </Button>
        </FormActions>
      </form>
    </div>
  )
}
