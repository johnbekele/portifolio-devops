import { Cloud, Container, GitBranch, Shield, Code, Brain, Database, Workflow } from "lucide-react"

const skillCategories = [
  {
    title: "Cloud Platforms & Services",
    icon: Cloud,
    skills: ["AWS ECS", "EC2", "Aurora RDS", "DynamoDB", "ElastiCache", "CloudFront", "ALB", "SageMaker", "Bedrock", "S3", "IAM", "VPC"],
    description: "Deep expertise in AWS services for scalable, production-ready cloud infrastructure.",
  },
  {
    title: "Infrastructure as Code",
    icon: Code,
    skills: ["Pulumi (AWS, Python)", "Terraform", "CloudFormation"],
    description: "Provisioning, managing, and versioning cloud infrastructure programmatically.",
  },
  {
    title: "Containers & Orchestration",
    icon: Container,
    skills: ["Docker", "Amazon ECR", "Kubernetes", "Nginx", "PM2"],
    description: "Container orchestration at scale, from development to production deployments.",
  },
  {
    title: "CI/CD & DevOps",
    icon: GitBranch,
    skills: ["GitHub Actions", "AWS CodeBuild", "CodePipeline", "Jenkins", "Blue-Green Deployments", "Feature Flags", "Automated Rollbacks"],
    description: "Automated pipelines with versioned releases and deterministic deployment workflows.",
  },
  {
    title: "Monitoring & Observability",
    icon: Workflow,
    skills: ["New Relic", "Datadog", "CloudWatch", "Prometheus", "Grafana", "ELK Stack", "Log Aggregation", "Alerting"],
    description: "Full-stack observability with metrics, logs, traces, and proactive alerting.",
  },
  {
    title: "Incident Management",
    icon: Shield,
    skills: ["ServiceNow", "JIRA", "PagerDuty", "Root Cause Analysis", "Post-Incident Reviews", "SLA Management"],
    description: "Incident response, escalation, and resolution with 99.8% uptime track record.",
  },
  {
    title: "Programming & Scripting",
    icon: Brain,
    skills: ["Python", "Bash", "Shell Scripting", "SQL", "JavaScript", "YAML", "JSON"],
    description: "Automation scripting, data processing, and application development.",
  },
  {
    title: "Databases",
    icon: Database,
    skills: ["PostgreSQL", "MySQL", "MS SQL Server", "MongoDB", "Amazon Aurora", "DynamoDB"],
    description: "Database administration, migrations, data validation, and integrity verification.",
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
