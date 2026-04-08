import { ArrowUpRight } from "lucide-react"
import { Badge } from "@/components/ui/badge"

const experiences = [
  {
    period: "DEC 2025 - PRESENT",
    title: "AIOps Engineer (Internal Gig) — Project MAIA",
    company: "Thomson Reuters",
    url: "https://www.thomsonreuters.com",
    description:
      "Built the entire AWS cloud infrastructure from zero for an enterprise M&A due diligence platform — 7 microservices (FastAPI + Next.js) on ECS Fargate across 4 environments. Designed IaC with Pulumi (Python) managing dual Aurora PostgreSQL databases, ElastiCache Redis, CloudFront CDN with WAF, and ALB with path-based routing. Authored 20+ GitHub Actions CI/CD workflows with production approval gates, security scanning, and automated release notes. Designed end-to-end security with data isolation, customer-managed KMS keys with envelope encryption, zero-trust S3 resource policies, WAFv2 in BLOCK mode, GuardDuty, Security Hub (CIS & AWS Best Practices), and per-service secret isolation. Deployed agentic AI services, conversational AI via Bedrock, and document processing with pgvector embeddings. 863 commits in 4 months.",
    technologies: ["AWS ECS", "Pulumi", "GitHub Actions", "Aurora PostgreSQL", "CloudFront", "WAF", "Docker", "FastAPI", "Next.js"],
  },
  {
    period: "AUG 2024 - PRESENT",
    title: "Product Support Specialist",
    company: "Thomson Reuters",
    url: "https://www.thomsonreuters.com",
    description:
      "Supporting the TAP UK digital application — monitoring application health, diagnosing issues across Azure and on-prem Windows Server environments, and debugging Microsoft SQL Server databases. Built KB Hub, an AI-powered RAG tool that ingests knowledge base resources from multiple data sources to surface precise resolutions, integrated across applications as a debugging tool. Automated cache cleaning, registry cleanup, database reindexing, and server diagnostics. Managed database migrations, on-prem server setup, and maintained 99.8% uptime through proactive monitoring and incident response via ServiceNow and JIRA.",
    technologies: ["Python", "Azure", "Windows Server", "MS SQL Server", "RAG", "ServiceNow", "JIRA", "Bash", "Automation"],
  },
  {
    period: "JUL 2024 - PRESENT",
    title: "Freelance Full Stack Developer",
    company: "Upwork",
    url: "https://www.upwork.com",
    description:
      "Built and delivered end-to-end web applications for clients including an enterprise room rental platform (Pokojowo), AI-powered trading platform (Wise-Trade), law firm case management system (LawConnect), agricultural machinery rental marketplace (AgroTech), and an AI teaching assistant (TeacherBot). Developed responsive frontends with React and Next.js, built RESTful APIs with Node.js/Express and Python/FastAPI, and containerized applications with Docker.",
    technologies: ["React", "Next.js", "TypeScript", "Node.js", "FastAPI", "Python", "MongoDB", "PostgreSQL", "Docker", "Tailwind CSS"],
  },
  {
    period: "APR 2022 - JUN 2024",
    title: "Application Support Analyst",
    company: "Infosys",
    url: "https://www.infosys.com",
    description:
      "Monitored application performance and infrastructure health using New Relic and Datadog, tracking metrics, logs, events, and traces across distributed systems to ensure high availability and SLA compliance. Managed incident triage, event correlation, and escalation via ServiceNow and JIRA, reducing mean time to resolution (MTTR) by 45% through signal enrichment and actionable alerting. Automated routine operational tasks, health checks, and reporting with Python, Bash, and SQL scripts, improving team efficiency by 30%. Built custom dashboards for anomaly detection and proactive alerting to surface issues before customer impact. Supported database migrations and integrity verification across MS SQL Server, PostgreSQL, and MySQL production environments. Created runbooks and automated remediation scripts for incident response procedures, enabling faster recovery and reduced human intervention. Collaborated with development and infrastructure teams to implement observability solutions, reduce alert noise, and improve system reliability.",
    technologies: ["New Relic", "Datadog", "Python", "Bash", "SQL", "PostgreSQL", "MySQL", "ServiceNow", "JIRA", "Observability"],
  },
  {
    period: "AUG 2022 - FEB 2023",
    title: "Data Analytics / Migration Specialist",
    company: "Cisco (Contract)",
    url: "https://www.cisco.com",
    description:
      "Executed large-scale data migration and transformation projects across multiple source systems, automating ETL pipelines using Python, Bash, and SQL, improving data processing efficiency by 30%. Designed data validation and cleansing routines to ensure accuracy, consistency, and compliance during migrations. Built data ingestion pipelines that normalized and enriched datasets from heterogeneous sources. Created dashboards and analytical reports providing actionable insights on migrated datasets for business continuity and compliance. Authored technical documentation and best practices guides for migration workflows and automation scripts. Collaborated with cross-functional teams to ensure seamless data integration with minimal disruption to business operations.",
    technologies: ["Python", "Bash", "SQL", "ETL Pipelines", "Data Migration", "Data Validation", "Analytics", "Documentation"],
  },
]

export function Experience() {
  return (
    <div>
      <h2 className="text-sm font-semibold uppercase tracking-widest text-primary mb-8 lg:hidden">
        Experience
      </h2>

      <div className="space-y-12">
        {experiences.map((exp, index) => (
          <div
            key={index}
            className="group relative grid pb-1 transition-all sm:grid-cols-8 sm:gap-8 md:gap-4"
          >
            <div className="absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-md transition motion-reduce:transition-none lg:-inset-x-6 lg:block lg:group-hover:bg-card lg:group-hover:shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)] lg:group-hover:drop-shadow-lg" />

            <header className="z-10 mb-2 mt-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground sm:col-span-2">
              {exp.period}
            </header>

            <div className="z-10 sm:col-span-6">
              <h3 className="font-medium leading-snug text-foreground">
                <a
                  href={exp.url}
                  className="inline-flex items-baseline font-medium text-foreground hover:text-primary focus-visible:text-primary group/link"
                >
                  <span className="absolute -inset-x-4 -inset-y-2.5 hidden rounded md:-inset-x-6 md:-inset-y-4 lg:block" />
                  <span>
                    {exp.title} ·{" "}
                    <span className="inline-block">
                      {exp.company}
                      <ArrowUpRight className="inline-block h-4 w-4 shrink-0 transition-transform group-hover/link:-translate-y-1 group-hover/link:translate-x-1 group-focus-visible/link:-translate-y-1 group-focus-visible/link:translate-x-1 motion-reduce:transition-none ml-1" />
                    </span>
                  </span>
                </a>
              </h3>

              <p className="mt-2 text-sm leading-normal text-muted-foreground">
                {exp.description}
              </p>

              <div className="mt-4 flex flex-wrap gap-2">
                {exp.technologies.map((tech) => (
                  <Badge
                    key={tech}
                    variant="secondary"
                    className="bg-primary/10 text-primary hover:bg-primary/20"
                  >
                    {tech}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12">
        <a
          href="/Yohans_Bekele_Resume_AIOps.pdf"
          download
          className="inline-flex items-center font-medium text-foreground hover:text-primary transition-colors group"
        >
          View Full Resume
          <ArrowUpRight className="ml-1 h-4 w-4 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
        </a>
      </div>
    </div>
  )
}
