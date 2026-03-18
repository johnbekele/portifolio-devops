"use client"

import { Github, Linkedin, Mail, Code2 } from "lucide-react"

export function Hero() {
  return (
    <div>
      <div className="flex items-center gap-3 mb-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
          <Code2 className="h-6 w-6" />
        </div>
      </div>
      
      <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
        Alex Chen
      </h1>
      
      <h2 className="mt-3 text-lg font-medium text-primary">
        DevOps Engineer | Platform Engineer | SRE
      </h2>
      
      <p className="mt-2 text-sm font-medium text-accent">
        AWS Certified Solutions Architect
      </p>
      
      <p className="mt-4 max-w-xs leading-relaxed text-muted-foreground">
        I build scalable cloud infrastructure, automate everything, and ensure systems are reliable, secure, and cost-efficient.
      </p>

      <div className="mt-8 flex items-center gap-5">
        <a
          href="https://github.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-muted-foreground transition-colors hover:text-primary"
          aria-label="GitHub"
        >
          <Github className="h-5 w-5" />
        </a>
        <a
          href="https://linkedin.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-muted-foreground transition-colors hover:text-primary"
          aria-label="LinkedIn"
        >
          <Linkedin className="h-5 w-5" />
        </a>
        <a
          href="mailto:alex@example.com"
          className="text-muted-foreground transition-colors hover:text-primary"
          aria-label="Email"
        >
          <Mail className="h-5 w-5" />
        </a>
      </div>
    </div>
  )
}
