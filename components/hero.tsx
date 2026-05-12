"use client"

import { Github, Linkedin, Mail, ArrowRight, FileDown, Sparkles } from "lucide-react"
import type { Hero as HeroData } from "@/db/schema"

interface HeroProps {
  data: HeroData | null
}

export function Hero({ data }: HeroProps) {
  if (!data) {
    return (
      <div>
        <h1 className="text-4xl font-bold tracking-tight text-foreground">No content yet</h1>
        <p className="mt-2 text-muted-foreground">
          Run the seed script or sign in to /admin to add content.
        </p>
      </div>
    )
  }

  const handleScrollToWork = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    document.getElementById("work")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <div>
      <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
        </span>
        Available for new opportunities
      </div>

      <h1 className="mt-6 text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-[3.5rem] lg:leading-[1.05]">
        {data.name}
      </h1>

      <h2 className="mt-4 text-lg font-medium text-primary">{data.title}</h2>

      <p className="mt-1 text-sm font-medium uppercase tracking-[0.18em] text-accent">
        {data.subtitle}
      </p>

      <p className="mt-5 max-w-md leading-relaxed text-muted-foreground">{data.tagline}</p>

      <div className="mt-8 flex flex-wrap items-center gap-3">
        <a
          href="#work"
          onClick={handleScrollToWork}
          className="group inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition-all hover:shadow-primary/40 hover:-translate-y-0.5"
        >
          <Sparkles className="h-4 w-4" />
          See My Work
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </a>

        <a
          href={data.resumeUrl}
          download
          className="inline-flex items-center gap-2 rounded-lg border border-border bg-card/50 px-4 py-2.5 text-sm font-medium text-muted-foreground transition-all hover:border-primary/40 hover:text-foreground hover:bg-card"
        >
          <FileDown className="h-4 w-4" />
          Resume
        </a>
      </div>

      <div className="mt-8 flex items-center gap-5">
        <a
          href={data.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-muted-foreground transition-colors hover:text-primary"
          aria-label="GitHub"
        >
          <Github className="h-5 w-5" />
        </a>
        <a
          href={data.linkedinUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-muted-foreground transition-colors hover:text-primary"
          aria-label="LinkedIn"
        >
          <Linkedin className="h-5 w-5" />
        </a>
        <a
          href={`mailto:${data.email}`}
          className="text-muted-foreground transition-colors hover:text-primary"
          aria-label="Email"
        >
          <Mail className="h-5 w-5" />
        </a>
      </div>
    </div>
  )
}
