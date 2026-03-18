import { Cloud, Container, GitBranch, Shield, Code, Brain, Database, Workflow } from "lucide-react"

const skillCategories = [
  {
    title: "Cloud & DevOps",
    icon: Cloud,
    skills: ["AWS", "Kubernetes", "Docker", "Terraform"],
    description: "Deep expertise in AWS services, container orchestration, and infrastructure as code.",
  },
  {
    title: "Backend Development",
    icon: Database,
    skills: ["Python", "Node.js", "Go", "PostgreSQL", "Redis"],
    description: "Building scalable APIs, microservices, and data pipelines with modern backends.",
  },
  {
    title: "Frontend Development",
    icon: Code,
    skills: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
    description: "Creating responsive, performant web applications with modern frameworks.",
  },
  {
    title: "AI & LLM",
    icon: Brain,
    skills: ["OpenAI API", "LangChain", "RAG", "Fine-tuning", "Prompt Engineering"],
    description: "Building AI-powered applications, RAG systems, and experimenting with LLMs.",
  },
  {
    title: "CI/CD & GitOps",
    icon: GitBranch,
    skills: ["GitHub Actions", "Jenkins", "ArgoCD", "GitLab CI"],
    description: "Automated pipelines for testing, building, and deploying applications continuously.",
  },
  {
    title: "Monitoring & Observability",
    icon: Workflow,
    skills: ["Prometheus", "Grafana", "CloudWatch", "Datadog"],
    description: "Full-stack observability with metrics, logs, and traces for production systems.",
  },
  {
    title: "Containerization",
    icon: Container,
    skills: ["Docker", "Kubernetes", "EKS", "Helm", "ECS"],
    description: "Container orchestration at scale with Kubernetes, from cluster setup to production.",
  },
  {
    title: "Security",
    icon: Shield,
    skills: ["IAM", "Secrets Management", "SOC 2", "AWS Security Hub"],
    description: "Security-first approach with least-privilege access and compliance automation.",
  },
]

export function Skills() {
  return (
    <div>
      <h2 className="text-sm font-semibold uppercase tracking-widest text-primary mb-8 lg:hidden">
        Skills
      </h2>

      <div className="grid gap-6 sm:grid-cols-2">
        {skillCategories.map((category, index) => (
          <div
            key={index}
            className="group rounded-lg border border-border bg-card/50 p-6 transition-all hover:bg-card hover:border-primary/30"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <category.icon className="h-5 w-5" />
              </div>
              <h3 className="font-medium text-foreground">{category.title}</h3>
            </div>

            <p className="text-sm text-muted-foreground mb-4">
              {category.description}
            </p>

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
        ))}
      </div>
    </div>
  )
}
