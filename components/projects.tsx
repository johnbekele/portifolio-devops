"use client"

import { useState } from "react"
import Image from "next/image"
import { ArrowUpRight, Github, ExternalLink, ChevronLeft, ChevronRight, X } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogTitle, DialogDescription, DialogClose } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { VisuallyHidden } from "@radix-ui/react-visually-hidden"

type ProjectCategory = "all" | "devops" | "fullstack" | "llm"

const projects = [
  {
    title: "AI Document Assistant",
    category: "llm" as const,
    description:
      "RAG-powered document Q&A system that allows users to chat with their PDFs and documents using LangChain and OpenAI.",
    longDescription:
      "A full-stack application that combines RAG (Retrieval Augmented Generation) with a modern chat interface. Users can upload documents, and the system chunks, embeds, and stores them in a vector database. The AI assistant then answers questions by retrieving relevant context and generating accurate responses.",
    technologies: ["Python", "LangChain", "OpenAI", "Pinecone", "Next.js", "FastAPI"],
    github: "https://github.com/alexchen/ai-doc-assistant",
    demo: "https://doc-assistant.example.com",
    images: [
      "/images/projects/ai-assistant.jpg",
      "/images/projects/ai-assistant.jpg",
      "/images/projects/ai-assistant.jpg",
    ],
    featured: true,
  },
  {
    title: "AWS EKS Terraform Module",
    category: "devops" as const,
    description:
      "Production-ready Terraform module for deploying highly available EKS clusters with managed node groups, IRSA, and cluster autoscaler.",
    longDescription:
      "This comprehensive Terraform module provides a complete EKS cluster setup including VPC configuration, managed node groups with spot instance support, IAM roles for service accounts (IRSA), cluster autoscaler, and AWS Load Balancer Controller integration. It follows AWS best practices and includes security hardening configurations.",
    technologies: ["Terraform", "AWS EKS", "Kubernetes", "IAM"],
    github: "https://github.com/alexchen/eks-terraform-module",
    demo: null,
    images: [
      "/images/projects/eks-architecture.jpg",
      "/images/projects/eks-architecture.jpg",
      "/images/projects/eks-architecture.jpg",
    ],
    featured: true,
  },
  {
    title: "E-Commerce Platform",
    category: "fullstack" as const,
    description:
      "Full-stack e-commerce application with real-time inventory, Stripe payments, and admin dashboard built with Next.js and PostgreSQL.",
    longDescription:
      "A complete e-commerce solution featuring product catalog management, shopping cart, secure checkout with Stripe, order tracking, and a comprehensive admin dashboard. Built with Next.js 14 App Router, PostgreSQL, Redis for caching, and deployed on AWS with auto-scaling capabilities.",
    technologies: ["Next.js", "TypeScript", "PostgreSQL", "Stripe", "Redis", "AWS"],
    github: "https://github.com/alexchen/ecommerce-platform",
    demo: "https://shop.example.com",
    images: [
      "/images/projects/ecommerce.jpg",
      "/images/projects/ecommerce.jpg",
      "/images/projects/ecommerce.jpg",
    ],
    featured: true,
  },
  {
    title: "LLM Code Review Agent",
    category: "llm" as const,
    description:
      "AI-powered code review assistant that analyzes pull requests, suggests improvements, and identifies potential bugs using GPT-4.",
    longDescription:
      "An intelligent code review bot that integrates with GitHub. It analyzes code changes, identifies potential issues, suggests improvements based on best practices, and provides detailed explanations. Uses function calling for structured analysis and maintains context across the entire PR.",
    technologies: ["Python", "OpenAI", "GitHub API", "FastAPI", "Docker"],
    github: "https://github.com/alexchen/llm-code-reviewer",
    demo: null,
    images: [
      "/images/projects/code-reviewer.jpg",
      "/images/projects/code-reviewer.jpg",
    ],
    featured: true,
  },
  {
    title: "CI/CD Pipeline Generator",
    category: "devops" as const,
    description:
      "CLI tool that generates GitHub Actions or GitLab CI pipelines based on project requirements. Supports Docker, Kubernetes, and serverless.",
    longDescription:
      "A powerful CLI tool written in Go that analyzes your project structure and generates optimized CI/CD pipelines. It detects language, frameworks, and deployment targets automatically, then creates production-ready pipeline configurations with caching, parallelization, and security scanning stages.",
    technologies: ["Go", "GitHub Actions", "GitLab CI", "Docker"],
    github: "https://github.com/alexchen/pipeline-generator",
    demo: "https://pipeline-gen.example.com",
    images: [
      "/images/projects/cicd-pipeline.jpg",
      "/images/projects/cicd-pipeline.jpg",
    ],
    featured: false,
  },
  {
    title: "Real-time Analytics Dashboard",
    category: "fullstack" as const,
    description:
      "Live analytics dashboard with WebSocket updates, interactive charts, and customizable widgets for monitoring business metrics.",
    longDescription:
      "A modern analytics platform that displays real-time data through WebSocket connections. Features include customizable dashboard layouts, interactive Recharts visualizations, data export capabilities, and role-based access control. Built for high performance with optimistic updates and efficient data streaming.",
    technologies: ["React", "Node.js", "WebSocket", "Redis", "PostgreSQL", "Chart.js"],
    github: "https://github.com/alexchen/realtime-analytics",
    demo: "https://analytics.example.com",
    images: [
      "/images/projects/analytics-dashboard.jpg",
      "/images/projects/analytics-dashboard.jpg",
    ],
    featured: false,
  },
  {
    title: "Infrastructure Cost Analyzer",
    category: "devops" as const,
    description:
      "AWS cost optimization tool that analyzes resource utilization and provides actionable recommendations with Slack integration.",
    longDescription:
      "Built with Python and AWS SDK, this tool provides real-time cost analysis and optimization recommendations. Features include unused resource detection, rightsizing suggestions, reserved instance recommendations, and automated Slack notifications for cost anomalies.",
    technologies: ["Python", "AWS SDK", "Lambda", "DynamoDB", "Slack API"],
    github: "https://github.com/alexchen/aws-cost-analyzer",
    demo: "https://cost-analyzer.example.com",
    images: [
      "/images/projects/cost-analyzer.jpg",
      "/images/projects/cost-analyzer.jpg",
    ],
    featured: false,
  },
  {
    title: "Semantic Search Engine",
    category: "llm" as const,
    description:
      "Vector-based semantic search system that understands natural language queries and returns contextually relevant results.",
    longDescription:
      "A semantic search engine that goes beyond keyword matching. Uses OpenAI embeddings to convert documents and queries into vector representations, enabling natural language search across large document collections. Features hybrid search combining semantic and keyword approaches for optimal results.",
    technologies: ["Python", "OpenAI", "Pinecone", "FastAPI", "React"],
    github: "https://github.com/alexchen/semantic-search",
    demo: "https://search.example.com",
    images: [
      "/images/projects/semantic-search.jpg",
      "/images/projects/semantic-search.jpg",
    ],
    featured: false,
  },
]

const categories = [
  { id: "all" as const, label: "All Projects" },
  { id: "devops" as const, label: "DevOps & Cloud" },
  { id: "fullstack" as const, label: "Full-Stack Apps" },
  { id: "llm" as const, label: "AI & LLM" },
]

export function Projects() {
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>("all")

  const filteredProjects = activeCategory === "all" 
    ? projects 
    : projects.filter(p => p.category === activeCategory)

  const openModal = (project: typeof projects[0]) => {
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
        prev === selectedProject.images.length - 1 ? 0 : prev + 1
      )
    }
  }

  const prevImage = () => {
    if (selectedProject) {
      setCurrentImageIndex((prev) => 
        prev === 0 ? selectedProject.images.length - 1 : prev - 1
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

      {/* Category Filter */}
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
        {filteredProjects.map((project, index) => {
          const categoryBadge = getCategoryBadge(project.category)
          return (
            <div
              key={index}
              className="group relative grid gap-4 pb-1 transition-all lg:grid-cols-12 lg:gap-6 cursor-pointer"
              onClick={() => openModal(project)}
            >
              <div className="absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-md transition motion-reduce:transition-none lg:-inset-x-6 lg:block lg:group-hover:bg-card lg:group-hover:shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)] lg:group-hover:drop-shadow-lg" />

              {/* Project Image/Screenshot */}
              <div className="z-10 lg:col-span-5 order-2 lg:order-1">
                <div className="relative aspect-video overflow-hidden rounded-md border border-border bg-secondary/50">
                  <Image
                    src={project.images[0]}
                    alt={`${project.title} screenshot`}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-background/20 group-hover:bg-transparent transition-colors" />
                  {project.images.length > 1 && (
                    <div className="absolute bottom-2 right-2 bg-background/80 text-foreground text-xs px-2 py-1 rounded">
                      +{project.images.length - 1} more
                    </div>
                  )}
                </div>
              </div>

              {/* Project Details */}
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

                {/* Links Section */}
                <div className="mt-4 flex items-center gap-4">
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Github className="h-4 w-4" />
                      <span>Source Code</span>
                    </a>
                  )}
                  {project.demo && (
                    <a
                      href={project.demo}
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

      {/* Project Modal */}
      <Dialog open={!!selectedProject} onOpenChange={(open) => !open && closeModal()}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-card border-border p-0">
          <VisuallyHidden>
            <DialogTitle>{selectedProject?.title}</DialogTitle>
            <DialogDescription>
              {selectedProject?.description}
            </DialogDescription>
          </VisuallyHidden>
          
          {selectedProject && (
            <div>
              {/* Image Gallery */}
              <div className="relative aspect-video bg-secondary">
                <Image
                  src={selectedProject.images[currentImageIndex]}
                  alt={`${selectedProject.title} - Image ${currentImageIndex + 1}`}
                  fill
                  className="object-cover"
                />
                
                {/* Close Button */}
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

                {/* Navigation Arrows */}
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

                {/* Image Indicators */}
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

              {/* Image Thumbnails */}
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
                        src={img}
                        alt={`Thumbnail ${idx + 1}`}
                        fill
                        className="object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}

              {/* Project Details */}
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
                    {selectedProject.github && (
                      <Button asChild variant="outline" size="sm">
                        <a
                          href={selectedProject.github}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Github className="h-4 w-4 mr-2" />
                          GitHub
                        </a>
                      </Button>
                    )}
                    {selectedProject.demo && (
                      <Button asChild size="sm">
                        <a
                          href={selectedProject.demo}
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

                <p className="mt-4 text-muted-foreground leading-relaxed">
                  {selectedProject.longDescription}
                </p>

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
