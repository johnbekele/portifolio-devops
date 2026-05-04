"use client"

import { useState } from "react"
import Image from "next/image"
import { ArrowUpRight, Github, ExternalLink, ChevronLeft, ChevronRight, X } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogTitle, DialogDescription, DialogClose } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { VisuallyHidden } from "@radix-ui/react-visually-hidden"
import type { Project } from "@/db/schema"
import { renderRichText } from "@/lib/text"

type ProjectCategory = "all" | "devops" | "fullstack" | "llm"

const categories = [
  { id: "all" as const, label: "All Projects" },
  { id: "devops" as const, label: "DevOps & Cloud" },
  { id: "fullstack" as const, label: "Full-Stack Apps" },
  { id: "llm" as const, label: "AI & LLM" },
]

interface ProjectsProps {
  projects: Project[]
}

export function Projects({ projects }: ProjectsProps) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>("all")

  const filteredProjects =
    activeCategory === "all" ? projects : projects.filter((p) => p.category === activeCategory)

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

  const getCategoryBadge = (category: string) => {
    const colors: Record<string, string> = {
      devops: "bg-blue-500/10 text-blue-400 border-blue-500/30",
      fullstack: "bg-green-500/10 text-green-400 border-green-500/30",
      llm: "bg-purple-500/10 text-purple-400 border-purple-500/30",
    }
    const labels: Record<string, string> = {
      devops: "DevOps",
      fullstack: "Full-Stack",
      llm: "AI/LLM",
    }
    return { className: colors[category], label: labels[category] }
  }

  return (
    <div>
      <h2 className="text-sm font-semibold uppercase tracking-widest text-primary mb-8 lg:hidden">
        Projects
      </h2>

      <div className="flex flex-wrap gap-2 mb-10">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`px-4 py-2 text-sm font-medium rounded-full transition-all ${
              activeCategory === cat.id
                ? "bg-primary text-primary-foreground"
                : "bg-card border border-border text-muted-foreground hover:text-foreground hover:border-primary/50"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      <div className="space-y-16">
        {filteredProjects.map((project) => {
          const categoryBadge = getCategoryBadge(project.category)
          const firstImage = project.images[0]
          return (
            <div
              key={project.id}
              className="group relative grid gap-4 pb-1 transition-all lg:grid-cols-12 lg:gap-6 cursor-pointer"
              onClick={() => openModal(project)}
            >
              <div className="absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-md transition motion-reduce:transition-none lg:-inset-x-6 lg:block lg:group-hover:bg-card lg:group-hover:shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)] lg:group-hover:drop-shadow-lg" />

              <div className="z-10 lg:col-span-5 order-2 lg:order-1">
                <div className="relative aspect-video overflow-hidden rounded-md border border-border bg-secondary/50">
                  {firstImage && (
                    <Image
                      src={firstImage.src}
                      alt={firstImage.alt ?? `${project.title} screenshot`}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  )}
                  <div className="absolute inset-0 bg-background/20 group-hover:bg-transparent transition-colors" />
                  {project.images.length > 1 && (
                    <div className="absolute bottom-2 right-2 bg-background/80 text-foreground text-xs px-2 py-1 rounded">
                      +{project.images.length - 1} more
                    </div>
                  )}
                </div>
              </div>

              <div className="z-10 lg:col-span-7 order-1 lg:order-2">
                <h3 className="font-medium leading-snug text-foreground">
                  <span className="inline-flex items-center gap-2 flex-wrap">
                    {project.title}
                    <Badge variant="outline" className={`text-xs ${categoryBadge.className}`}>
                      {categoryBadge.label}
                    </Badge>
                    {project.featured && (
                      <Badge variant="outline" className="text-xs border-accent text-accent">
                        Featured
                      </Badge>
                    )}
                  </span>
                </h3>

                <p className="mt-2 text-sm leading-normal text-muted-foreground">
                  {project.description}
                </p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <Badge
                      key={tech}
                      variant="secondary"
                      className="bg-primary/10 text-primary hover:bg-primary/20"
                    >
                      {tech}
                    </Badge>
                  ))}
                </div>

                <div className="mt-4 flex items-center gap-4">
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Github className="h-4 w-4" />
                      <span>Source Code</span>
                    </a>
                  )}
                  {project.demoUrl && (
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <ExternalLink className="h-4 w-4" />
                      <span>Live Demo</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          )
        })}
      </div>

      <div className="mt-12">
        <a
          href="https://github.com/johnbekele"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center font-medium text-foreground hover:text-primary transition-colors group"
        >
          View All Projects on GitHub
          <ArrowUpRight className="ml-1 h-4 w-4 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
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
                      {(() => {
                        const badge = getCategoryBadge(selectedProject.category)
                        return (
                          <Badge variant="outline" className={badge.className}>
                            {badge.label}
                          </Badge>
                        )
                      })()}
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
