import { Hero } from "@/components/hero"
import { About } from "@/components/about"
import { Experience } from "@/components/experience"
import { Projects } from "@/components/projects"
import { Skills } from "@/components/skills"
import { Certifications } from "@/components/certifications"
import { Contact } from "@/components/contact"
import { PageShell } from "./page-shell"
import { getHero } from "@/lib/data/hero"
import { getAboutParagraphs } from "@/lib/data/about"
import { getExperiences } from "@/lib/data/experiences"
import { getProjects } from "@/lib/data/projects"
import { getSkillCategories } from "@/lib/data/skills"
import { getCertifications } from "@/lib/data/certifications"

export default async function Home() {
  const [hero, about, experiences, projects, skills, certifications] = await Promise.all([
    getHero(),
    getAboutParagraphs(),
    getExperiences(),
    getProjects(),
    getSkillCategories(),
    getCertifications(),
  ])

  return (
    <PageShell
      hero={<Hero data={hero} />}
      about={
        <About
          paragraphs={about}
          name={hero?.name ?? ""}
          profileImageUrl={hero?.profileImageUrl ?? "/images/profile.jpg"}
        />
      }
      experience={<Experience experiences={experiences} resumeUrl={hero?.resumeUrl ?? "/Yohans_Bekele_Resume.pdf"} />}
      projects={<Projects projects={projects} />}
      skills={<Skills categories={skills} />}
      certifications={<Certifications certifications={certifications} />}
      contact={
        <Contact
          email={hero?.email ?? ""}
          githubUrl={hero?.githubUrl ?? ""}
          linkedinUrl={hero?.linkedinUrl ?? ""}
          location={hero?.location ?? ""}
          blurb={hero?.contactBlurb ?? ""}
          name={hero?.name ?? ""}
        />
      }
    />
  )
}
