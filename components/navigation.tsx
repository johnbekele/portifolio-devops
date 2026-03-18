"use client"

import { cn } from "@/lib/utils"

const navItems = [
  { id: "about", label: "ABOUT" },
  { id: "experience", label: "EXPERIENCE" },
  { id: "projects", label: "PROJECTS" },
  { id: "skills", label: "SKILLS" },
  { id: "certifications", label: "CERTIFICATIONS" },
  { id: "contact", label: "CONTACT" },
]

interface NavigationProps {
  activeSection: string
  setActiveSection: (section: string) => void
}

export function Navigation({ activeSection, setActiveSection }: NavigationProps) {
  const handleClick = (id: string) => {
    setActiveSection(id)
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <nav className="hidden lg:block mt-16" aria-label="In-page navigation">
      <ul className="flex flex-col gap-4">
        {navItems.map((item) => (
          <li key={item.id}>
            <button
              onClick={() => handleClick(item.id)}
              className={cn(
                "group flex items-center gap-4 text-xs font-semibold uppercase tracking-widest transition-all",
                activeSection === item.id
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <span
                className={cn(
                  "h-px transition-all",
                  activeSection === item.id
                    ? "w-16 bg-foreground"
                    : "w-8 bg-muted-foreground group-hover:w-16 group-hover:bg-foreground"
                )}
              />
              {item.label}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  )
}
