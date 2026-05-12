"use client"

import { useState, useEffect, type ReactNode } from "react"
import { Navigation } from "@/components/navigation"

const sections = ["work", "stack", "experience", "about", "certifications", "contact"]

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
  const [activeSection, setActiveSection] = useState("work")

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
    <main className="relative min-h-screen bg-background">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div className="absolute -top-40 -left-32 h-[420px] w-[420px] rounded-full bg-primary/10 blur-[120px]" />
        <div className="absolute top-1/3 -right-32 h-[480px] w-[480px] rounded-full bg-accent/10 blur-[140px]" />
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 py-12 lg:py-24 lg:flex lg:gap-12">
        <header className="lg:sticky lg:top-24 lg:flex lg:max-h-[calc(100vh-6rem)] lg:w-[42%] lg:flex-col lg:justify-between lg:py-0">
          {hero}
          <Navigation activeSection={activeSection} setActiveSection={setActiveSection} />
        </header>

        <div className="lg:w-[58%] pt-16 lg:pt-0">
          <section id="work" className="mb-28 scroll-mt-24">
            {projects}
          </section>

          <section id="stack" className="mb-28 scroll-mt-24">
            {skills}
          </section>

          <section id="experience" className="mb-28 scroll-mt-24">
            {experience}
          </section>

          <section id="about" className="mb-28 scroll-mt-24">
            {about}
          </section>

          <section id="certifications" className="mb-28 scroll-mt-24">
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
