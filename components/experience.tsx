import { ArrowUpRight, FileDown } from "lucide-react"
import type { Experience as ExperienceData } from "@/db/schema"
import { renderRichText } from "@/lib/text"

interface ExperienceProps {
  experiences: ExperienceData[]
  resumeUrl: string
}

export function Experience({ experiences, resumeUrl }: ExperienceProps) {
  return (
    <div>
      <div className="mb-8 lg:mb-12">
        <div className="flex items-center gap-3 mb-3">
          <span className="font-mono text-xs text-primary">03</span>
          <span className="h-px w-8 bg-primary/40" />
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            Track Record
          </span>
        </div>
        <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Where I&apos;ve done the work
        </h2>
        <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground">
          Roles and responsibilities behind the projects above.
        </p>
      </div>

      <div className="relative space-y-6">
        <div
          aria-hidden
          className="absolute left-[7px] top-2 bottom-2 w-px bg-gradient-to-b from-primary/40 via-border to-transparent"
        />

        {experiences.map((exp) => (
          <div key={exp.id} className="group relative pl-8">
            <div className="absolute left-0 top-2 flex h-4 w-4 items-center justify-center">
              <div className="absolute h-4 w-4 rounded-full bg-primary/20 transition-all group-hover:bg-primary/40" />
              <div className="relative h-2 w-2 rounded-full bg-primary" />
            </div>

            <div className="rounded-lg border border-border/60 bg-card/30 p-4 transition-all group-hover:border-primary/30 group-hover:bg-card/60">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="font-semibold text-foreground">
                  <a
                    href={exp.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-baseline gap-1 hover:text-primary transition-colors"
                  >
                    {exp.title}
                    <span className="text-muted-foreground font-normal"> · </span>
                    <span className="text-primary">
                      {exp.company}
                      <ArrowUpRight className="inline-block h-3.5 w-3.5 ml-0.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </span>
                  </a>
                </h3>
                <span className="font-mono text-[11px] uppercase tracking-wide text-muted-foreground">
                  {exp.period}
                </span>
              </div>

              <div className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {renderRichText(exp.description)}
              </div>

              {exp.technologies.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {exp.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-md bg-primary/10 px-2 py-0.5 text-[11px] font-medium text-primary"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8">
        <a
          href={resumeUrl}
          download
          className="group inline-flex items-center gap-2 rounded-lg border border-border bg-card/40 px-4 py-2.5 text-sm font-medium text-muted-foreground transition-all hover:border-primary/40 hover:text-foreground hover:bg-card"
        >
          <FileDown className="h-4 w-4" />
          Download full resume
          <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </a>
      </div>
    </div>
  )
}
