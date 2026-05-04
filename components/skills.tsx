import type { SkillCategory } from "@/db/schema"
import { getIcon } from "@/lib/icons"

interface SkillsProps {
  categories: SkillCategory[]
}

export function Skills({ categories }: SkillsProps) {
  return (
    <div>
      <h2 className="text-sm font-semibold uppercase tracking-widest text-primary mb-8 lg:hidden">
        Skills
      </h2>

      <div className="grid gap-6 sm:grid-cols-2">
        {categories.map((category) => {
          const Icon = getIcon(category.iconName)
          return (
            <div
              key={category.id}
              className="group rounded-lg border border-border bg-card/50 p-6 transition-all hover:bg-card hover:border-primary/30"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="font-medium text-foreground">{category.title}</h3>
              </div>

              <p className="text-sm text-muted-foreground mb-4">{category.description}</p>

              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <span
                    key={skill}
                    className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded"
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
