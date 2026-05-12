"use client"

import { cn } from "@/lib/utils"

const navItems = [
  { id: "work", label: "WORK", number: "01" },
  { id: "stack", label: "STACK", number: "02" },
  { id: "experience", label: "EXPERIENCE", number: "03" },
  { id: "about", label: "ABOUT", number: "04" },
  { id: "certifications", label: "CERTIFICATIONS", number: "05" },
  { id: "contact", label: "CONTACT", number: "06" },
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
      <ul className="flex flex-col gap-3">
        {navItems.map((item) => {
          const isActive = activeSection === item.id
          return (
            <li key={item.id}>
              <button
                onClick={() => handleClick(item.id)}
                className={cn(
                  "group flex w-full items-center gap-4 text-xs font-semibold uppercase tracking-[0.18em] transition-all",
                  isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                )}
              >
                <span
                  className={cn(
                    "font-mono text-[10px] tabular-nums transition-colors",
                    isActive ? "text-primary" : "text-muted-foreground/60"
                  )}
                >
                  {item.number}
                </span>
                <span
                  className={cn(
                    "h-px transition-all",
                    isActive
                      ? "w-14 bg-primary"
                      : "w-6 bg-muted-foreground/50 group-hover:w-12 group-hover:bg-foreground"
                  )}
                />
                <span>{item.label}</span>
              </button>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
