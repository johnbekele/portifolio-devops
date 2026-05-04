import { ArrowUpRight } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import type { Experience as ExperienceData } from "@/db/schema"
import { renderRichText } from "@/lib/text"

interface ExperienceProps {
  experiences: ExperienceData[]
  resumeUrl: string
}

export function Experience({ experiences, resumeUrl }: ExperienceProps) {
  return (
    <div>
      <h2 className="text-sm font-semibold uppercase tracking-widest text-primary mb-8 lg:hidden">
        Experience
      </h2>

      <div className="space-y-12">
        {experiences.map((exp) => (
          <div
            key={exp.id}
            className="group relative grid pb-1 transition-all sm:grid-cols-8 sm:gap-8 md:gap-4"
          >
            <div className="absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-md transition motion-reduce:transition-none lg:-inset-x-6 lg:block lg:group-hover:bg-card lg:group-hover:shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)] lg:group-hover:drop-shadow-lg" />

            <header className="z-10 mb-2 mt-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground sm:col-span-2">
              {exp.period}
            </header>

            <div className="z-10 sm:col-span-6">
              <h3 className="font-medium leading-snug text-foreground">
                <a
                  href={exp.url}
                  className="inline-flex items-baseline font-medium text-foreground hover:text-primary focus-visible:text-primary group/link"
                >
                  <span className="absolute -inset-x-4 -inset-y-2.5 hidden rounded md:-inset-x-6 md:-inset-y-4 lg:block" />
                  <span>
                    {exp.title} ·{" "}
                    <span className="inline-block">
                      {exp.company}
                      <ArrowUpRight className="inline-block h-4 w-4 shrink-0 transition-transform group-hover/link:-translate-y-1 group-hover/link:translate-x-1 group-focus-visible/link:-translate-y-1 group-focus-visible/link:translate-x-1 motion-reduce:transition-none ml-1" />
                    </span>
                  </span>
                </a>
              </h3>

              <div className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {renderRichText(exp.description)}
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                {exp.technologies.map((tech) => (
                  <Badge
                    key={tech}
                    variant="secondary"
                    className="bg-primary/10 text-primary hover:bg-primary/20"
                  >
                    {tech}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12">
        <a
          href={resumeUrl}
          download
          className="inline-flex items-center font-medium text-foreground hover:text-primary transition-colors group"
        >
          View Full Resume
          <ArrowUpRight className="ml-1 h-4 w-4 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
        </a>
      </div>
    </div>
  )
}
