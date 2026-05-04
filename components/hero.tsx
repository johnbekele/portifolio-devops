import { Github, Linkedin, Mail, Code2, FileDown } from "lucide-react"
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

  return (
    <div>
      <div className="flex items-center gap-3 mb-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
          <Code2 className="h-6 w-6" />
        </div>
      </div>

      <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
        {data.name}
      </h1>

      <h2 className="mt-3 text-lg font-medium text-primary">{data.title}</h2>

      <p className="mt-2 text-sm font-medium text-accent">{data.subtitle}</p>

      <p className="mt-4 max-w-xs leading-relaxed text-muted-foreground">{data.tagline}</p>

      <div className="mt-6">
        <a
          href={data.resumeUrl}
          download
          className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
        >
          <FileDown className="h-4 w-4" />
          Download Resume
        </a>
      </div>

      <div className="mt-6 flex items-center gap-5">
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
