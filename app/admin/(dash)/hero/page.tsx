import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { FormField, FormSection, FormActions } from "@/components/admin/form-field"
import { RichTextField } from "@/components/admin/rich-text-field"
import { HeroProfileImageField } from "./profile-image-field"
import { getHero } from "@/lib/data/hero"
import { saveHero } from "@/lib/actions/hero"

interface HeroAdminProps {
  searchParams: Promise<{ saved?: string }>
}

export default async function HeroAdminPage({ searchParams }: HeroAdminProps) {
  const data = await getHero()
  const params = await searchParams

  return (
    <div className="max-w-2xl">
      <h2 className="text-xl font-semibold text-foreground mb-1">Hero & profile</h2>
      <p className="text-sm text-muted-foreground mb-6">
        Top-of-page identity, social links, and the profile photo used in About.
      </p>

      {params.saved && (
        <div className="mb-6 rounded-md border border-green-500/30 bg-green-500/10 p-3 text-sm text-green-500">
          Saved.
        </div>
      )}

      <form action={saveHero} className="space-y-5">
        <FormSection>
          <FormField label="Name" htmlFor="name">
            <Input id="name" name="name" defaultValue={data?.name ?? ""} required />
          </FormField>

          <FormField label="Title" htmlFor="title">
            <Input id="title" name="title" defaultValue={data?.title ?? ""} required />
          </FormField>

          <FormField label="Subtitle" htmlFor="subtitle">
            <Input id="subtitle" name="subtitle" defaultValue={data?.subtitle ?? ""} />
          </FormField>

          <FormField label="Tagline" htmlFor="tagline" hint="Short pitch shown under your name.">
            <RichTextField
              id="tagline"
              name="tagline"
              rows={3}
              defaultValue={data?.tagline ?? ""}
              reformatKind="hero-tagline"
              buttonLabel="Polish with AI"
            />
          </FormField>

          <FormField label="Resume URL" htmlFor="resumeUrl">
            <Input id="resumeUrl" name="resumeUrl" defaultValue={data?.resumeUrl ?? "/Yohans_Bekele_Resume.pdf"} />
          </FormField>

          <FormField label="GitHub URL" htmlFor="githubUrl">
            <Input id="githubUrl" name="githubUrl" type="url" defaultValue={data?.githubUrl ?? ""} />
          </FormField>

          <FormField label="LinkedIn URL" htmlFor="linkedinUrl">
            <Input id="linkedinUrl" name="linkedinUrl" type="url" defaultValue={data?.linkedinUrl ?? ""} />
          </FormField>

          <FormField label="Email" htmlFor="email">
            <Input id="email" name="email" type="email" defaultValue={data?.email ?? ""} />
          </FormField>

          <FormField label="Profile photo" hint="Used in the About section.">
            <HeroProfileImageField defaultValue={data?.profileImageUrl ?? "/images/profile.jpg"} />
          </FormField>

          <FormField label="Location" htmlFor="location">
            <Input id="location" name="location" defaultValue={data?.location ?? ""} />
          </FormField>

          <FormField label="Contact blurb" htmlFor="contactBlurb" hint="Intro paragraph at the top of Contact.">
            <RichTextField
              id="contactBlurb"
              name="contactBlurb"
              rows={4}
              defaultValue={data?.contactBlurb ?? ""}
              reformatKind="hero-blurb"
              buttonLabel="Polish with AI"
            />
          </FormField>
        </FormSection>

        <FormActions>
          <Button type="submit">Save changes</Button>
        </FormActions>
      </form>
    </div>
  )
}
