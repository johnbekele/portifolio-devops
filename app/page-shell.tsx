"use client"

import { useState, useEffect, type ReactNode } from "react"
import { Navigation } from "@/components/navigation"

const sections = ["about", "experience", "projects", "skills", "certifications", "contact"]

interface PageShellProps {
  hero: ReactNode
  about: ReactNode
  experience: ReactNode
  projects: ReactNode
  skills: ReactNode
  certifications: ReactNode
  contact: ReactNode
}

export function PageShell({
  hero,
  about,
  experience,
  projects,
  skills,
  certifications,
  contact,
}: PageShellProps) {
  const [activeSection, setActiveSection] = useState("about")

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 150

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(sectionId)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()

    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl px-6 py-12 lg:py-24 lg:flex lg:gap-12">
        <header className="lg:sticky lg:top-24 lg:flex lg:max-h-[calc(100vh-6rem)] lg:w-1/2 lg:flex-col lg:justify-between lg:py-0">
          {hero}
          <Navigation activeSection={activeSection} setActiveSection={setActiveSection} />
        </header>

        <div className="lg:w-1/2 pt-16 lg:pt-0">
          <section id="about" className="mb-24 scroll-mt-24">
            {about}
          </section>

          <section id="experience" className="mb-24 scroll-mt-24">
            {experience}
          </section>

          <section id="projects" className="mb-24 scroll-mt-24">
            {projects}
          </section>

          <section id="skills" className="mb-24 scroll-mt-24">
            {skills}
          </section>

          <section id="certifications" className="mb-24 scroll-mt-24">
            {certifications}
          </section>

          <section id="contact" className="scroll-mt-24">
            {contact}
          </section>
        </div>
      </div>
    </main>
  )
}
