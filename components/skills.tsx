import type { SkillCategory } from "@/db/schema"
import { getIcon } from "@/lib/icons"

interface SkillsProps {
  categories: SkillCategory[]
}

export function Skills({ categories }: SkillsProps) {
  return (
    <div>
      <div className="mb-8 lg:mb-12">
        <div className="flex items-center gap-3 mb-3">
          <span className="font-mono text-xs text-primary">02</span>
          <span className="h-px w-8 bg-primary/40" />
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            Capability Stack
          </span>
        </div>
        <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          The tools behind the work
        </h2>
        <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground">
          Technologies I reach for to ship reliable, scalable systems — grouped by what they
          actually do.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {categories.map((category, idx) => {
          const Icon = getIcon(category.iconName)
          const num = String(idx + 1).padStart(2, "0")
          return (
            <div
              key={category.id}
              className="group relative overflow-hidden rounded-xl border border-border bg-card/40 p-5 transition-all hover:bg-card hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5"
            >
              <div className="absolute right-4 top-4 font-mono text-[10px] text-muted-foreground/50">
                /{num}
              </div>

              <div className="flex items-center gap-3 mb-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary/20">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="font-semibold text-foreground">{category.title}</h3>
              </div>

              <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                {category.description}
              </p>

              <div className="flex flex-wrap gap-1.5">
                {category.skills.map((skill) => (
                  <span
                    key={skill}
                    className="text-xs font-medium text-foreground/80 bg-background/60 border border-border/80 px-2 py-0.5 rounded transition-colors group-hover:border-primary/30 group-hover:text-foreground"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
