import { Cloud, Container, GitBranch, Shield, Code, Brain, Database, Workflow } from "lucide-react"

const skillCategories = [
  {
    title: "Cloud Platforms & Services",
    icon: Cloud,
    skills: ["AWS ECS Fargate", "Aurora PostgreSQL", "DynamoDB", "ElastiCache", "CloudFront", "ALB", "S3", "IAM", "VPC", "Bedrock", "SageMaker", "KMS", "WAFv2", "GuardDuty"],
    description: "Built production infrastructure from zero on AWS — 7 microservices across 4 environments.",
  },
  {
    title: "Infrastructure as Code",
    icon: Code,
    skills: ["Pulumi (Python)", "Terraform", "CloudFormation"],
    description: "Designed and maintained multi-environment IaC stacks with state management and feature flags.",
  },
  {
    title: "CI/CD & DevOps",
    icon: GitBranch,
    skills: ["GitHub Actions", "AWS CodeBuild", "Docker", "ECR", "Production Approval Gates", "Security Scanning", "Automated Rollbacks", "Feature Flags"],
    description: "Authored 20+ CI/CD workflows with SHA-pinned actions, security gates, and automated release notes.",
  },
  {
    title: "AI & LLM Systems",
    icon: Brain,
    skills: ["Claude/Bedrock", "Anthropic API", "pgvector", "Agentic AI", "RAG", "LangChain", "Document Processing", "Embeddings"],
    description: "Deployed agentic AI services, conversational AI, and document processing pipelines to production.",
  },
  {
    title: "Monitoring & Observability",
    icon: Workflow,
    skills: ["New Relic", "Datadog", "CloudWatch", "Prometheus", "Grafana", "ELK Stack", "Alerting", "Anomaly Detection"],
    description: "Full-stack observability achieving 99.8% uptime through proactive monitoring and alert tuning.",
  },
  {
    title: "Security",
    icon: Shield,
    skills: ["WAFv2", "GuardDuty", "Security Hub", "KMS Encryption", "Zero-Trust S3 Policies", "Secrets Manager", "Microsoft Entra ID SSO", "RBAC"],
    description: "Implemented defense-in-depth security with compliance audits (CIS, AWS Best Practices).",
  },
  {
    title: "Programming & Full Stack",
    icon: Database,
    skills: ["Python", "TypeScript", "JavaScript", "Bash", "SQL", "FastAPI", "Next.js", "React", "Node.js", "Express", "Tailwind CSS"],
    description: "Backend services, frontend applications, automation scripts, and ETL pipelines.",
  },
  {
    title: "Incident Management",
    icon: Container,
    skills: ["ServiceNow", "JIRA", "PagerDuty", "Root Cause Analysis", "Post-Incident Reviews", "Runbooks", "SLA Management"],
    description: "Incident response, escalation, and resolution with documented runbooks and automation.",
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
