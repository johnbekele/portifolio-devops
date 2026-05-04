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
      <h2 className="text-sm font-semibold uppercase tracking-widest text-primary mb-8 lg:hidden">
        About
      </h2>

      <div className="flex justify-center mb-10">
        <div className="relative">
          <div className="absolute -inset-1 bg-gradient-to-br from-primary via-accent to-primary rounded-full opacity-75 blur-sm" />
          <div className="relative w-40 h-40 md:w-48 md:h-48 rounded-full overflow-hidden border-4 border-background shadow-2xl">
            <Image
              src={profileImageUrl}
              alt={name ? `Portrait of ${name}` : "Profile photo"}
              fill
              className="object-cover"
              priority
            />
          </div>
          <div className="absolute bottom-2 right-2 w-5 h-5 bg-green-500 rounded-full border-4 border-background" />
        </div>
      </div>

      <div className="space-y-4 text-muted-foreground leading-relaxed">
        {paragraphs.map((p) => (
          <div key={p.id}>{renderRichText(p.content)}</div>
        ))}
      </div>
    </div>
  )
}
