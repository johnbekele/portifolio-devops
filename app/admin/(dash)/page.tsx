import Link from "next/link"
import {
  User,
  AlignLeft,
  Briefcase,
  FolderGit2,
  Sparkles,
  Award,
  ArrowRight,
} from "lucide-react"
import { SiteReviewPanel } from "./site-review-panel"

const tiles = [
  { href: "/admin/hero", label: "Hero", icon: User, desc: "Name, title, links, profile photo" },
  { href: "/admin/about", label: "About", icon: AlignLeft, desc: "Bio paragraphs" },
  { href: "/admin/experience", label: "Experience", icon: Briefcase, desc: "Roles & companies" },
  { href: "/admin/projects", label: "Projects", icon: FolderGit2, desc: "Showcase projects" },
  { href: "/admin/skills", label: "Skills", icon: Sparkles, desc: "Skill categories" },
  { href: "/admin/certifications", label: "Certifications", icon: Award, desc: "Certifications" },
]

export default function AdminDashboard() {
  return (
    <div>
      <h2 className="text-xl font-semibold text-foreground mb-2">Manage content</h2>
      <p className="text-sm text-muted-foreground mb-8">
        Edits publish instantly. The public site is statically cached and refreshes only the section
        you change.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {tiles.map((t) => (
          <Link
            key={t.href}
            href={t.href}
            className="group rounded-lg border border-border bg-card/50 p-5 transition-all hover:bg-card hover:border-primary/30"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-md bg-primary/10 text-primary">
                <t.icon className="h-4 w-4" />
              </div>
              <span className="font-medium text-foreground">{t.label}</span>
              <ArrowRight className="ml-auto h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-1" />
            </div>
            <p className="text-sm text-muted-foreground">{t.desc}</p>
          </Link>
        ))}
      </div>

      <div className="mt-10">
        <SiteReviewPanel />
      </div>
    </div>
  )
}
