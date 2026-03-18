"use client"

import { useState, useEffect } from "react"
import { Hero } from "@/components/hero"
import { Navigation } from "@/components/navigation"
import { About } from "@/components/about"
import { Experience } from "@/components/experience"
import { Projects } from "@/components/projects"
import { Skills } from "@/components/skills"
import { Certifications } from "@/components/certifications"
import { Contact } from "@/components/contact"

const sections = ["about", "experience", "projects", "skills", "certifications", "contact"]

export default function Home() {
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
        {/* Left Column - Fixed Info */}
        <header className="lg:sticky lg:top-24 lg:flex lg:max-h-[calc(100vh-6rem)] lg:w-1/2 lg:flex-col lg:justify-between lg:py-0">
          <Hero />
          <Navigation activeSection={activeSection} setActiveSection={setActiveSection} />
        </header>

        {/* Right Column - Scrollable Content */}
        <div className="lg:w-1/2 pt-16 lg:pt-0">
          <section id="about" className="mb-24 scroll-mt-24">
            <About />
          </section>

          <section id="experience" className="mb-24 scroll-mt-24">
            <Experience />
          </section>

          <section id="projects" className="mb-24 scroll-mt-24">
            <Projects />
          </section>

          <section id="skills" className="mb-24 scroll-mt-24">
            <Skills />
          </section>

          <section id="certifications" className="mb-24 scroll-mt-24">
            <Certifications />
          </section>

          <section id="contact" className="scroll-mt-24">
            <Contact />
          </section>
        </div>
      </div>
    </main>
  )
}
