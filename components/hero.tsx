"use client"

import { Github, Linkedin, Mail, Code2, FileDown } from "lucide-react"

export function Hero() {
  return (
    <div>
      <div className="flex items-center gap-3 mb-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
          <Code2 className="h-6 w-6" />
        </div>
      </div>

      <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
        Yohans (John) Bekele
      </h1>

      <h2 className="mt-3 text-lg font-medium text-primary">
        Site Reliability Engineer | DevOps | Full Stack
      </h2>

      <p className="mt-2 text-sm font-medium text-accent">
        AWS Certified Cloud Practitioner | 4+ Years Experience
      </p>

      <p className="mt-4 max-w-xs leading-relaxed text-muted-foreground">
        I build cloud infrastructure from zero, deploy AI-powered microservices on AWS, and automate everything — 99.8% uptime, 20+ CI/CD pipelines, 863 commits on my latest project.
      </p>

      <div className="mt-6">
        <a
          href="/Yohans_Bekele_Resume_AIOps.pdf"
          download
          className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
        >
          <FileDown className="h-4 w-4" />
          Download Resume
        </a>
      </div>

      <div className="mt-6 flex items-center gap-5">
        <a
          href="https://github.com/johnbekele"
          target="_blank"
          rel="noopener noreferrer"
          className="text-muted-foreground transition-colors hover:text-primary"
          aria-label="GitHub"
        >
          <Github className="h-5 w-5" />
        </a>
        <a
          href="https://www.linkedin.com/in/yohans-b-a1a975205/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-muted-foreground transition-colors hover:text-primary"
          aria-label="LinkedIn"
        >
          <Linkedin className="h-5 w-5" />
        </a>
        <a
          href="mailto:yohansdemisie@gmail.com"
          className="text-muted-foreground transition-colors hover:text-primary"
          aria-label="Email"
        >
          <Mail className="h-5 w-5" />
        </a>
      </div>
    </div>
  )
}
