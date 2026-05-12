"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import {
  ArrowUpRight,
  Github,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  X,
  Sparkles,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { VisuallyHidden } from "@radix-ui/react-visually-hidden"
import type { Project } from "@/db/schema"
import { renderRichText } from "@/lib/text"

type ProjectCategory = "all" | "devops" | "fullstack" | "llm"

const categories = [
  { id: "all" as const, label: "All" },
  { id: "devops" as const, label: "DevOps & Cloud" },
  { id: "fullstack" as const, label: "Full-Stack" },
  { id: "llm" as const, label: "AI / LLM" },
]

interface ProjectsProps {
  projects: Project[]
}

export function Projects({ projects }: ProjectsProps) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>("all")

  const projectCategories = (p: Project): string[] =>
    p.categories && p.categories.length > 0 ? p.categories : [p.category]

  const filteredProjects =
    activeCategory === "all"
      ? projects
      : projects.filter((p) => projectCategories(p).includes(activeCategory))

  const openModal = (project: Project) => {
    setSelectedProject(project)
    setCurrentImageIndex(0)
  }

  const closeModal = () => {
    setSelectedProject(null)
    setCurrentImageIndex(0)
  }

  const nextImage = () => {
    if (selectedProject) {
      setCurrentImageIndex((prev) =>
        prev === selectedProject.images.length - 1 ? 0 : prev + 1,
      )
    }
  }

  const prevImage = () => {
    if (selectedProject) {
      setCurrentImageIndex((prev) =>
        prev === 0 ? selectedProject.images.length - 1 : prev - 1,
      )
    }
  }

  const getCategoryMeta = (category: string) => {
    const meta: Record<string, { className: string; label: string; dot: string }> = {
      devops: {
        className: "border-blue-500/40 text-blue-300 bg-blue-500/10",
        label: "DevOps",
        dot: "bg-blue-400",
      },
      fullstack: {
        className: "border-emerald-500/40 text-emerald-300 bg-emerald-500/10",
        label: "Full-Stack",
        dot: "bg-emerald-400",
      },
      llm: {
        className: "border-purple-500/40 text-purple-300 bg-purple-500/10",
        label: "AI/LLM",
        dot: "bg-purple-400",
      },
    }
    return meta[category] ?? { className: "", label: category, dot: "bg-muted-foreground" }
  }

  const featuredProjects = filteredProjects.filter((p) => p.featured)
  const rest = filteredProjects.filter((p) => !p.featured)
  const totalCount = projects.length

  return (
    <div>
      <div className="mb-8 lg:mb-12">
        <div className="flex items-center gap-3 mb-3">
          <span className="font-mono text-xs text-primary">01</span>
          <span className="h-px w-8 bg-primary/40" />
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            Selected Work
          </span>
        </div>
        <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Things I&apos;ve been{" "}
          <span className="relative inline-block">
            <span className="relative z-10 text-primary">building</span>
            <span className="absolute inset-x-0 bottom-1 h-2 bg-primary/20" />
          </span>
        </h2>
        <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground">
          A selection of <span className="font-semibold text-foreground">{totalCount}</span>{" "}
          {totalCount === 1 ? "project" : "projects"} spanning cloud infrastructure, full-stack
          apps, and AI tooling — built end-to-end and shipped.
        </p>
      </div>

      <div className="flex flex-wrap gap-2 mb-10">
        {categories.map((cat) => {
          const isActive = activeCategory === cat.id
          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-full transition-all ${
                isActive
                  ? "bg-primary text-primary-foreground shadow-md shadow-primary/20"
                  : "bg-card/60 border border-border text-muted-foreground hover:text-foreground hover:border-primary/40"
              }`}
            >
              {cat.label}
            </button>
          )
        })}
      </div>

      {featuredProjects.length > 0 && (
        <FeaturedShowcase
          projects={featuredProjects}
          onOpen={openModal}
          getCategoryMeta={getCategoryMeta}
        />
      )}

      <div className="mt-10 grid gap-6 sm:grid-cols-2">
        {rest.map((project, idx) => (
          <CaseStudyCard
            key={project.id}
            project={project}
            index={featuredProjects.length > 0 ? idx + 2 : idx + 1}
            onOpen={() => openModal(project)}
            getCategoryMeta={getCategoryMeta}
          />
        ))}
      </div>

      <div className="mt-12 flex flex-wrap items-center justify-between gap-4 rounded-xl border border-border bg-card/40 p-5">
        <div>
          <p className="text-sm font-medium text-foreground">More on GitHub</p>
          <p className="text-xs text-muted-foreground mt-0.5">
            Open source contributions, experiments, and side projects.
          </p>
        </div>
        <a
          href="https://github.com/johnbekele"
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-2 rounded-lg border border-primary/40 bg-primary/10 px-4 py-2 text-sm font-semibold text-primary transition-all hover:bg-primary hover:text-primary-foreground"
        >
          <Github className="h-4 w-4" />
          View All Repos
          <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </a>
      </div>

      <Dialog open={!!selectedProject} onOpenChange={(open) => !open && closeModal()}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-card border-border p-0">
          <VisuallyHidden>
            <DialogTitle>{selectedProject?.title}</DialogTitle>
            <DialogDescription>{selectedProject?.description}</DialogDescription>
          </VisuallyHidden>

          {selectedProject && (
            <div>
              <div className="relative aspect-video bg-secondary">
                {selectedProject.images[currentImageIndex] && (
                  <Image
                    src={selectedProject.images[currentImageIndex].src}
                    alt={
                      selectedProject.images[currentImageIndex].alt ??
                      `${selectedProject.title} - Image ${currentImageIndex + 1}`
                    }
                    fill
                    className="object-cover"
                  />
                )}

                <DialogClose asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-4 right-4 bg-background/80 hover:bg-background text-foreground rounded-full"
                  >
                    <X className="h-4 w-4" />
                    <span className="sr-only">Close</span>
                  </Button>
                </DialogClose>

                {selectedProject.images.length > 1 && (
                  <>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute left-4 top-1/2 -translate-y-1/2 bg-background/80 hover:bg-background text-foreground rounded-full"
                      onClick={prevImage}
                    >
                      <ChevronLeft className="h-5 w-5" />
                      <span className="sr-only">Previous image</span>
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute right-4 top-1/2 -translate-y-1/2 bg-background/80 hover:bg-background text-foreground rounded-full"
                      onClick={nextImage}
                    >
                      <ChevronRight className="h-5 w-5" />
                      <span className="sr-only">Next image</span>
                    </Button>
                  </>
                )}

                {selectedProject.images.length > 1 && (
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                    {selectedProject.images.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setCurrentImageIndex(idx)}
                        className={`w-2 h-2 rounded-full transition-colors ${
                          idx === currentImageIndex
                            ? "bg-primary"
                            : "bg-foreground/50 hover:bg-foreground/80"
                        }`}
                        aria-label={`Go to image ${idx + 1}`}
                      />
                    ))}
                  </div>
                )}
              </div>

              {selectedProject.images.length > 1 && (
                <div className="flex gap-2 p-4 overflow-x-auto">
                  {selectedProject.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentImageIndex(idx)}
                      className={`relative flex-shrink-0 w-20 h-14 rounded overflow-hidden border-2 transition-colors ${
                        idx === currentImageIndex
                          ? "border-primary"
                          : "border-transparent hover:border-muted-foreground"
                      }`}
                    >
                      <Image
                        src={img.src}
                        alt={img.alt ?? `Thumbnail ${idx + 1}`}
                        fill
                        className="object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}

              <div className="p-6">
                <div className="flex items-start justify-between gap-4 flex-wrap">
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h2 className="text-2xl font-semibold text-foreground">
                        {selectedProject.title}
                      </h2>
                      {projectCategories(selectedProject).map((c) => {
                        const badge = getCategoryMeta(c)
                        return (
                          <Badge key={c} variant="outline" className={badge.className}>
                            <span className={`mr-1.5 inline-block h-1.5 w-1.5 rounded-full ${badge.dot}`} />
                            {badge.label}
                          </Badge>
                        )
                      })}
                    </div>
                    {selectedProject.featured && (
                      <Badge variant="outline" className="mt-2 border-accent text-accent">
                        Featured Project
                      </Badge>
                    )}
                  </div>

                  <div className="flex gap-3">
                    {selectedProject.githubUrl && (
                      <Button asChild variant="outline" size="sm">
                        <a
                          href={selectedProject.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Github className="h-4 w-4 mr-2" />
                          GitHub
                        </a>
                      </Button>
                    )}
                    {selectedProject.demoUrl && (
                      <Button asChild size="sm">
                        <a
                          href={selectedProject.demoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <ExternalLink className="h-4 w-4 mr-2" />
                          Live Demo
                        </a>
                      </Button>
                    )}
                  </div>
                </div>

                <div className="mt-4 text-muted-foreground leading-relaxed">
                  {renderRichText(selectedProject.longDescription)}
                </div>

                <div className="mt-6">
                  <h3 className="text-sm font-semibold uppercase tracking-wide text-foreground mb-3">
                    Technologies Used
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.technologies.map((tech) => (
                      <Badge
                        key={tech}
                        variant="secondary"
                        className="bg-primary/10 text-primary"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

type CategoryMeta = { className: string; label: string; dot: string }

interface FeaturedShowcaseProps {
  projects: Project[]
  onOpen: (project: Project) => void
  getCategoryMeta: (cat: string) => CategoryMeta
}

const IMAGE_INTERVAL_MS = 2200
const PROJECT_HOLD_MS = 4000

function FeaturedShowcase({ projects, onOpen, getCategoryMeta }: FeaturedShowcaseProps) {
  const [projectIdx, setProjectIdx] = useState(0)
  const [imageIdx, setImageIdx] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const lastProjectAdvance = useRef<number>(Date.now())

  const project = projects[projectIdx] ?? projects[0]
  const cats =
    project.categories && project.categories.length > 0
      ? project.categories
      : [project.category]
  const images = project.images.length > 0 ? project.images : [{ src: "", alt: "" }]
  const hasMultipleImages = images.length > 1
  const hasMultipleProjects = projects.length > 1

  useEffect(() => {
    setImageIdx(0)
    lastProjectAdvance.current = Date.now()
  }, [projectIdx])

  useEffect(() => {
    if (isPaused) return
    if (!hasMultipleImages && !hasMultipleProjects) return

    const id = setInterval(() => {
      const now = Date.now()
      const heldLongEnough = now - lastProjectAdvance.current >= PROJECT_HOLD_MS

      setImageIdx((curr) => {
        const next = curr + 1
        if (next >= images.length) {
          if (hasMultipleProjects && heldLongEnough) {
            setProjectIdx((p) => (p + 1) % projects.length)
            return 0
          }
          return 0
        }
        return next
      })
    }, IMAGE_INTERVAL_MS)

    return () => clearInterval(id)
  }, [isPaused, hasMultipleImages, hasMultipleProjects, images.length, projects.length, projectIdx])

  const handleSelectProject = (idx: number) => {
    if (idx === projectIdx) return
    setProjectIdx(idx)
  }

  const handleSelectImage = (idx: number) => {
    setImageIdx(idx)
    lastProjectAdvance.current = Date.now()
  }

  return (
    <article
      onClick={() => onOpen(project)}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className="group relative cursor-pointer overflow-hidden rounded-2xl border border-border bg-card/60 transition-all hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/10"
    >
      <div className="absolute -top-px left-6 right-6 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />

      <div className="relative aspect-[16/9] overflow-hidden bg-secondary">
        {images.map((img, i) => (
          <div
            key={`${project.id}-${i}-${img.src}`}
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
              i === imageIdx ? "opacity-100" : "opacity-0"
            }`}
            aria-hidden={i !== imageIdx}
          >
            {img.src && (
              <Image
                src={img.src}
                alt={img.alt ?? `${project.title} screenshot ${i + 1}`}
                fill
                className={`object-cover transition-transform duration-[4000ms] ease-out ${
                  i === imageIdx ? "scale-105" : "scale-100"
                }`}
                priority={i === 0 && projectIdx === 0}
                sizes="(min-width: 1024px) 720px, 100vw"
              />
            )}
          </div>
        ))}

        <div className="absolute inset-0 bg-gradient-to-t from-card via-card/30 to-transparent" />

        <div className="absolute top-4 left-4 flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-accent/50 bg-background/80 px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest text-accent backdrop-blur">
            <Sparkles className="h-3 w-3" />
            Featured
          </span>
        </div>

        <div className="absolute top-4 right-4 flex flex-wrap gap-1.5 justify-end max-w-[60%]">
          {cats.map((c) => {
            const m = getCategoryMeta(c)
            return (
              <Badge key={c} variant="outline" className={`${m.className} backdrop-blur`}>
                <span className={`mr-1.5 inline-block h-1.5 w-1.5 rounded-full ${m.dot}`} />
                {m.label}
              </Badge>
            )
          })}
        </div>

        {hasMultipleImages && (
          <div
            className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5"
            onClick={(e) => e.stopPropagation()}
          >
            {images.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => handleSelectImage(i)}
                className={`h-1.5 rounded-full transition-all ${
                  i === imageIdx
                    ? "w-6 bg-primary"
                    : "w-1.5 bg-foreground/40 hover:bg-foreground/70"
                }`}
                aria-label={`Show image ${i + 1}`}
              />
            ))}
          </div>
        )}

        {hasMultipleImages && (
          <div className="pointer-events-none absolute bottom-3 right-3 rounded-md bg-background/80 px-2 py-0.5 text-[10px] font-mono text-foreground backdrop-blur">
            {String(imageIdx + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}
          </div>
        )}
      </div>

      <div key={project.id} className="p-6 sm:p-8 animate-in fade-in slide-in-from-bottom-2 duration-700">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-mono text-muted-foreground mb-2">
              SPOTLIGHT / {String(projectIdx + 1).padStart(2, "0")}
              {hasMultipleProjects && (
                <span className="text-muted-foreground/60">
                  {" "}
                  of {String(projects.length).padStart(2, "0")}
                </span>
              )}
            </p>
            <h3 className="text-2xl font-bold tracking-tight text-foreground transition-colors group-hover:text-primary sm:text-3xl">
              {project.title}
            </h3>
          </div>
          <ArrowUpRight className="h-6 w-6 shrink-0 text-muted-foreground transition-all group-hover:text-primary group-hover:-translate-y-1 group-hover:translate-x-1" />
        </div>

        <p className="mt-4 text-base leading-relaxed text-muted-foreground">
          {project.description}
        </p>

        <div className="mt-6 flex flex-wrap gap-1.5">
          {project.technologies.slice(0, 8).map((tech) => (
            <span
              key={tech}
              className="rounded-md bg-primary/10 px-2 py-1 text-xs font-medium text-primary"
            >
              {tech}
            </span>
          ))}
          {project.technologies.length > 8 && (
            <span className="rounded-md bg-muted px-2 py-1 text-xs font-medium text-muted-foreground">
              +{project.technologies.length - 8}
            </span>
          )}
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              onOpen(project)
            }}
            className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-all hover:bg-primary/90"
          >
            View Case Study
            <ArrowUpRight className="h-4 w-4" />
          </button>
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-lg border border-border px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground"
              onClick={(e) => e.stopPropagation()}
            >
              <Github className="h-4 w-4" />
              Source
            </a>
          )}
          {project.demoUrl && (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-lg border border-border px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground"
              onClick={(e) => e.stopPropagation()}
            >
              <ExternalLink className="h-4 w-4" />
              Live
            </a>
          )}
        </div>

        {hasMultipleProjects && (
          <div
            className="mt-6 flex items-center gap-2 border-t border-border/60 pt-4"
            onClick={(e) => e.stopPropagation()}
          >
            <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground/70">
              Featured
            </span>
            <div className="flex flex-1 items-center gap-1.5">
              {projects.map((p, i) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => handleSelectProject(i)}
                  className={`group/dot relative h-1 flex-1 overflow-hidden rounded-full bg-muted transition-colors hover:bg-muted/80`}
                  aria-label={`Show ${p.title}`}
                  title={p.title}
                >
                  <span
                    className={`absolute inset-y-0 left-0 rounded-full bg-primary transition-all ${
                      i < projectIdx
                        ? "w-full opacity-60"
                        : i === projectIdx
                          ? isPaused
                            ? "w-1/2"
                            : "w-full animate-[showcase-progress_4s_linear_forwards]"
                          : "w-0"
                    }`}
                  />
                </button>
              ))}
            </div>
            <span className="font-mono text-[10px] tabular-nums text-muted-foreground/70">
              {String(projectIdx + 1).padStart(2, "0")}/
              {String(projects.length).padStart(2, "0")}
            </span>
          </div>
        )}
      </div>
    </article>
  )
}

interface CaseStudyCardProps {
  project: Project
  index: number
  onOpen: () => void
  getCategoryMeta: (cat: string) => CategoryMeta
}

function CaseStudyCard({ project, index, onOpen, getCategoryMeta }: CaseStudyCardProps) {
  const cats =
    project.categories && project.categories.length > 0
      ? project.categories
      : [project.category]
  const firstImage = project.images[0]
  const num = String(index).padStart(2, "0")

  return (
    <article
      onClick={onOpen}
      className="group relative flex cursor-pointer flex-col overflow-hidden rounded-xl border border-border bg-card/40 transition-all hover:-translate-y-1 hover:border-primary/40 hover:bg-card hover:shadow-xl hover:shadow-primary/5"
    >
      <div className="relative aspect-video overflow-hidden bg-secondary">
        {firstImage && (
          <Image
            src={firstImage.src}
            alt={firstImage.alt ?? `${project.title} screenshot`}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-card/90 via-transparent to-transparent" />

        <div className="absolute top-3 right-3 flex flex-wrap gap-1 justify-end max-w-[70%]">
          {cats.map((c) => {
            const m = getCategoryMeta(c)
            return (
              <Badge
                key={c}
                variant="outline"
                className={`${m.className} backdrop-blur text-[10px]`}
              >
                <span className={`mr-1 inline-block h-1.5 w-1.5 rounded-full ${m.dot}`} />
                {m.label}
              </Badge>
            )
          })}
        </div>

        <div className="absolute top-3 left-3 font-mono text-xs text-foreground/90 backdrop-blur">
          /{num}
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-semibold leading-snug text-foreground transition-colors group-hover:text-primary">
            {project.title}
          </h3>
          <ArrowUpRight className="h-4 w-4 shrink-0 text-muted-foreground transition-all group-hover:text-primary group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </div>

        <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted-foreground">
          {project.description}
        </p>

        <div className="mt-4 flex flex-wrap gap-1.5">
          {project.technologies.slice(0, 4).map((tech) => (
            <span
              key={tech}
              className="rounded-md bg-primary/10 px-1.5 py-0.5 text-[10px] font-medium text-primary"
            >
              {tech}
            </span>
          ))}
          {project.technologies.length > 4 && (
            <span className="rounded-md bg-muted px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground">
              +{project.technologies.length - 4}
            </span>
          )}
        </div>

        <div className="mt-4 flex items-center gap-3 border-t border-border/60 pt-3 text-xs">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-muted-foreground transition-colors hover:text-primary"
              onClick={(e) => e.stopPropagation()}
            >
              <Github className="h-3.5 w-3.5" />
              Source
            </a>
          )}
          {project.demoUrl && (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-muted-foreground transition-colors hover:text-primary"
              onClick={(e) => e.stopPropagation()}
            >
              <ExternalLink className="h-3.5 w-3.5" />
              Demo
            </a>
          )}
          <span className="ml-auto text-muted-foreground/60">View →</span>
        </div>
      </div>
    </article>
  )
}
