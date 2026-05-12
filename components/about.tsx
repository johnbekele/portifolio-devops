import Image from "next/image"
import type { AboutParagraph } from "@/db/schema"
import { renderRichText } from "@/lib/text"

interface AboutProps {
  paragraphs: AboutParagraph[]
  name: string
  profileImageUrl: string
}

export function About({ paragraphs, name, profileImageUrl }: AboutProps) {
  return (
    <div>
      <div className="mb-8 lg:mb-10">
        <div className="flex items-center gap-3 mb-3">
          <span className="font-mono text-xs text-primary">04</span>
          <span className="h-px w-8 bg-primary/40" />
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            Behind the Work
          </span>
        </div>
        <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          A bit about me
        </h2>
      </div>

      <div className="rounded-xl border border-border bg-card/40 p-6 sm:p-8">
        <div className="flex flex-col items-start gap-5 sm:flex-row sm:items-center">
          <div className="relative shrink-0">
            <div className="absolute -inset-1 bg-gradient-to-br from-primary via-accent to-primary rounded-full opacity-60 blur-sm" />
            <div className="relative h-20 w-20 rounded-full overflow-hidden border-2 border-background shadow-xl">
              <Image
                src={profileImageUrl}
                alt={name ? `Portrait of ${name}` : "Profile photo"}
                fill
                className="object-cover"
              />
            </div>
            <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-card" />
          </div>

          <div>
            <p className="font-semibold text-foreground">{name}</p>
            <p className="text-xs uppercase tracking-wider text-muted-foreground mt-0.5">
              Online · open to work
            </p>
          </div>
        </div>

        <div className="mt-6 space-y-4 text-muted-foreground leading-relaxed">
          {paragraphs.map((p) => (
            <div key={p.id}>{renderRichText(p.content)}</div>
          ))}
        </div>
      </div>
    </div>
  )
}
