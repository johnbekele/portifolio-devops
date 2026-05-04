import { config } from "dotenv"
config({ path: [".env.local", ".env"] })
import { createClient } from "@libsql/client"
import { drizzle } from "drizzle-orm/libsql"
import {
  hero,
  aboutParagraphs,
  experiences,
  projects,
  skillCategories,
  certifications,
} from "./schema"

async function main() {
  const url = process.env.TURSO_DATABASE_URL
  const authToken = process.env.TURSO_AUTH_TOKEN
  if (!url) throw new Error("TURSO_DATABASE_URL is not set")

  const client = createClient({ url, authToken })
  const db = drizzle(client)

  console.log("Seeding database...")

  await db.delete(hero)
  await db.delete(aboutParagraphs)
  await db.delete(experiences)
  await db.delete(projects)
  await db.delete(skillCategories)
  await db.delete(certifications)

  // ── Hero ──────────────────────────────────────────────
  await db.insert(hero).values({
    name: "Yohans (John) Bekele",
    title: "Site Reliability Engineer | DevOps | Full Stack",
    subtitle: "AWS Certified Cloud Practitioner | 4+ Years Experience",
    tagline:
      "I build cloud infrastructure from zero, deploy AI-powered microservices on AWS, and automate everything — 99.8% uptime, 20+ CI/CD pipelines, 863 commits on my latest project.",
    resumeUrl: "/Yohans_Bekele_Resume.pdf",
    githubUrl: "https://github.com/johnbekele",
    linkedinUrl: "https://www.linkedin.com/in/yohans-b-a1a975205/",
    email: "yohansdemisie@gmail.com",
    profileImageUrl: "/images/profile.jpg",
    location: "Gdansk, Poland",
    contactBlurb:
      "I'm always interested in hearing about SRE/DevOps, cloud infrastructure, and automation opportunities, or collaborating on AI/LLM applications and full stack projects. Based in Gdansk, Poland. Feel free to reach out!",
  })

  // ── About paragraphs ──────────────────────────────────
  const aboutData = [
    "**AIOps engineer, product support specialist, and full-stack developer** with 4+ years shipping cloud infra, AI/ML systems, and production apps end-to-end. I work the whole stack — from empty AWS account to UI — and tend to own the unglamorous parts (pipelines, security baselines, on-call) too.",
    "At Thomson Reuters I built the AWS footprint for an enterprise M&A platform from an empty account: **7** ECS Fargate services, dual Aurora Postgres, CloudFront + WAFv2, and **20+** CI/CD pipelines with prod approval gates and security scans. Security baseline is customer-managed KMS with envelope encryption, zero-trust S3 policies, WAFv2 in BLOCK, GuardDuty, and Security Hub on CIS + AWS Best Practices. On top of that I shipped agentic services on **Bedrock** (Claude), pgvector document ingestion, and a knowledge-graph pipeline — **863 commits in four months**.",
    "On the support side I keep the **TAP UK** digital application healthy across Azure and on-prem Windows Server, debug Microsoft SQL Server, and write the boring scripts that make on-call quiet — cache and registry cleanup, DB reindex, server diagnostics. I built **KB Hub**, a RAG tool that ingests our internal knowledge base and surfaces the exact fix to engineers from inside the app. Day-to-day that's DB migrations, on-prem server setup, and incident response via ServiceNow and JIRA at **99.8%** uptime.",
    "On the side I freelance on Upwork — React, Next.js, Node, FastAPI, Python. Most recent build is **InfraCanvas**: drag-and-drop AWS architecture, exports Terraform and Pulumi, and pushes straight to GitHub with the GitHub Actions workflow generated for you.",
  ]
  for (let i = 0; i < aboutData.length; i++) {
    await db.insert(aboutParagraphs).values({
      sortOrder: i,
      content: aboutData[i],
    })
  }

  // ── Experiences ───────────────────────────────────────
  const experienceData = [
    {
      sortOrder: 0,
      period: "DEC 2025 - PRESENT",
      title: "AIOps Engineer (Internal Gig) — Project MAIA",
      company: "Thomson Reuters",
      url: "https://www.thomsonreuters.com",
      description:
        "Built the entire AWS cloud infrastructure from zero for an enterprise M&A due diligence platform — 7 microservices (FastAPI + Next.js) on ECS Fargate across 4 environments. Designed IaC with Pulumi (Python) managing dual Aurora PostgreSQL databases, ElastiCache Redis, CloudFront CDN with WAF, and ALB with path-based routing. Authored 20+ GitHub Actions CI/CD workflows with production approval gates, security scanning, and automated release notes. Designed end-to-end security with data isolation, customer-managed KMS keys with envelope encryption, zero-trust S3 resource policies, WAFv2 in BLOCK mode, GuardDuty, Security Hub (CIS & AWS Best Practices), and per-service secret isolation. Deployed agentic AI services, conversational AI via Bedrock, and document processing with pgvector embeddings. 863 commits in 4 months.",
      technologies: [
        "AWS ECS",
        "Pulumi",
        "GitHub Actions",
        "Aurora PostgreSQL",
        "CloudFront",
        "WAF",
        "Docker",
        "FastAPI",
        "Next.js",
      ],
    },
    {
      sortOrder: 1,
      period: "AUG 2024 - PRESENT",
      title: "Product Support Specialist",
      company: "Thomson Reuters",
      url: "https://www.thomsonreuters.com",
      description:
        "Supporting the TAP UK digital application — monitoring application health, diagnosing issues across Azure and on-prem Windows Server environments, and debugging Microsoft SQL Server databases. Built KB Hub, an AI-powered RAG tool that ingests knowledge base resources from multiple data sources to surface precise resolutions, integrated across applications as a debugging tool. Automated cache cleaning, registry cleanup, database reindexing, and server diagnostics. Managed database migrations, on-prem server setup, and maintained 99.8% uptime through proactive monitoring and incident response via ServiceNow and JIRA.",
      technologies: [
        "Python",
        "Azure",
        "Windows Server",
        "MS SQL Server",
        "RAG",
        "ServiceNow",
        "JIRA",
        "Bash",
        "Automation",
      ],
    },
    {
      sortOrder: 2,
      period: "JUL 2024 - PRESENT",
      title: "Freelance Full Stack Developer",
      company: "Upwork",
      url: "https://www.upwork.com",
      description:
        "Built and delivered end-to-end web applications for clients including an enterprise room rental platform (Pokojowo), AI-powered trading platform (Wise-Trade), law firm case management system (LawConnect), agricultural machinery rental marketplace (AgroTech), and an AI teaching assistant (TeacherBot). Developed responsive frontends with React and Next.js, built RESTful APIs with Node.js/Express and Python/FastAPI, and containerized applications with Docker.",
      technologies: [
        "React",
        "Next.js",
        "TypeScript",
        "Node.js",
        "FastAPI",
        "Python",
        "MongoDB",
        "PostgreSQL",
        "Docker",
        "Tailwind CSS",
      ],
    },
    {
      sortOrder: 3,
      period: "APR 2022 - JUN 2024",
      title: "Application Support Analyst",
      company: "Infosys",
      url: "https://www.infosys.com",
      description:
        "Monitored application performance and infrastructure health using New Relic and Datadog, tracking metrics, logs, events, and traces across distributed systems to ensure high availability and SLA compliance. Managed incident triage, event correlation, and escalation via ServiceNow and JIRA, reducing mean time to resolution (MTTR) by 45% through signal enrichment and actionable alerting. Automated routine operational tasks, health checks, and reporting with Python, Bash, and SQL scripts, improving team efficiency by 30%. Built custom dashboards for anomaly detection and proactive alerting to surface issues before customer impact. Supported database migrations and integrity verification across MS SQL Server, PostgreSQL, and MySQL production environments. Created runbooks and automated remediation scripts for incident response procedures, enabling faster recovery and reduced human intervention. Collaborated with development and infrastructure teams to implement observability solutions, reduce alert noise, and improve system reliability.",
      technologies: [
        "New Relic",
        "Datadog",
        "Python",
        "Bash",
        "SQL",
        "PostgreSQL",
        "MySQL",
        "ServiceNow",
        "JIRA",
        "Observability",
      ],
    },
    {
      sortOrder: 4,
      period: "AUG 2022 - FEB 2023",
      title: "Data Analytics / Migration Specialist",
      company: "Cisco (Contract)",
      url: "https://www.cisco.com",
      description:
        "Executed large-scale data migration and transformation projects across multiple source systems, automating ETL pipelines using Python, Bash, and SQL, improving data processing efficiency by 30%. Designed data validation and cleansing routines to ensure accuracy, consistency, and compliance during migrations. Built data ingestion pipelines that normalized and enriched datasets from heterogeneous sources. Created dashboards and analytical reports providing actionable insights on migrated datasets for business continuity and compliance. Authored technical documentation and best practices guides for migration workflows and automation scripts. Collaborated with cross-functional teams to ensure seamless data integration with minimal disruption to business operations.",
      technologies: [
        "Python",
        "Bash",
        "SQL",
        "ETL Pipelines",
        "Data Migration",
        "Data Validation",
        "Analytics",
        "Documentation",
      ],
    },
  ]
  for (const exp of experienceData) {
    await db.insert(experiences).values(exp)
  }

  // ── Projects ──────────────────────────────────────────
  const projectData = [
    {
      sortOrder: 0,
      title: "Archyra",
      category: "fullstack" as const,
      description:
        "One npm package: 25 animated React components, an AWS architecture designer that exports Terraform/Pulumi, and an MCP server so Claude, Cursor, and Windsurf can install components for you.",
      longDescription:
        "Three things in one install. First, 25 React + Framer Motion components (loading, chat, e-commerce, auth, effects) typed in TypeScript, each shipped with a vanilla HTML/CSS/JS twin so non-React projects can copy-paste. Second, a drag-and-drop designer for 20+ AWS services with live IaC preview and ZIP export to Terraform HCL, Pulumi TS, or Pulumi Python. Third, an MCP server that exposes the catalog and designer to Claude Code / Cursor / Windsurf — `npx archyra init` writes the config, then the assistant can list, install, and scaffold components directly. Built solo, OSS.",
      technologies: [
        "TypeScript",
        "React",
        "Framer Motion",
        "Next.js",
        "AWS",
        "Terraform",
        "Pulumi",
        "MCP",
      ],
      githubUrl: "https://github.com/johnbekele/archyra-oss",
      demoUrl: null,
      images: [{ src: "/images/projects/archyra.png", alt: "Archyra screenshot" }],
      featured: true,
    },
    {
      sortOrder: 1,
      title: "InfraCanvas",
      category: "devops" as const,
      description:
        "Drag-and-drop AWS architecture in the browser. Exports Terraform or Pulumi, pushes to your GitHub repo, and writes the GitHub Actions workflow to deploy it.",
      longDescription:
        "Canvas for 20+ AWS primitives — EC2, Lambda, RDS, S3, DynamoDB, VPC, public/private subnets, the usual networking and IAM pieces. Drop a service, edit its props, draw a connection, and the IaC pane updates as you go. Export targets are Terraform HCL, Pulumi TypeScript, or Pulumi Python; you get back a ZIP with `main.tf` / `variables.tf` / `outputs.tf` (or the Pulumi equivalent) plus a GitHub Actions pipeline. Connect a repo and InfraCanvas commits straight to it. Connection validation catches things like a Lambda wired to a public subnet before you ever run plan.",
      technologies: [
        "TypeScript",
        "Next.js",
        "React",
        "AWS",
        "Terraform",
        "Pulumi",
        "GitHub Actions",
      ],
      githubUrl: "https://github.com/johnbekele/infracanvas",
      demoUrl: "https://infracanvas-web.vercel.app/designer",
      images: [{ src: "/images/projects/infracanvas.png", alt: "InfraCanvas screenshot" }],
      featured: true,
    },
    {
      sortOrder: 2,
      title: "Wise Trade",
      category: "llm" as const,
      description:
        "Trading dashboard with live watchlists, top gainers/laggards, high-volume scans, and an AI insights endpoint behind a tiered API.",
      longDescription:
        "React + JS dashboard talking to a Python FastAPI backend, deployed to AWS with Pulumi. Frontend handles watchlist state, search-to-add tickers, and polling refresh against the market endpoints. Backend wraps a market data provider and an LLM call for the AI insights tier; auth and tier checks live server-side. Pulumi spins up the API and supporting infra so a redeploy is one command. UI, API, and infra were all shipped solo.",
      technologies: ["React", "JavaScript", "Python", "FastAPI", "Pulumi", "AWS"],
      githubUrl: "https://github.com/johnbekele/wise-Trade-Client",
      demoUrl: "https://wise-trade-client.vercel.app",
      images: [{ src: "/images/projects/wise-trade.png", alt: "Wise Trade screenshot" }],
      featured: true,
    },
    {
      sortOrder: 3,
      title: "AgroTech",
      category: "fullstack" as const,
      description:
        "Two-sided marketplace for renting farm equipment: owners list machinery, farmers browse, book a date range, and return when done.",
      longDescription:
        "React frontend, Node/Mongo backend. Equipment listings with availability, a date-range booking flow, and dual roles (owner vs renter) sharing the same auth. Landing page walks new users through the three-step browse-book-return loop and a chat widget hands evaluators test credentials so reviewers can poke around without signing up. Footer keeps a real developer credit because the site is shipped, not a mockup.",
      technologies: ["React", "JavaScript", "Node.js", "MongoDB"],
      githubUrl: "https://github.com/johnbekele/agrotech",
      demoUrl: "https://agrotech-kohl-nine.vercel.app",
      images: [{ src: "/images/projects/agrotech.png", alt: "AgroTech screenshot" }],
      featured: true,
    },
    {
      sortOrder: 4,
      title: "LawConnect",
      category: "fullstack" as const,
      description:
        "Case management for advocates: cases, fees and invoices, a client portal, and a calendar that won't let a deadline slip.",
      longDescription:
        "MERN app aimed at small/mid law practices. Four modules: case management with status workflow and auto reminders; fees with billing, payments, and invoice generation; a client portal so the people whose case it actually is can log in and see updates; and a calendar that pulls every court date and filing deadline into one view. Auth, roles, and document storage are scoped per firm so two firms on the same instance never see each other's data.",
      technologies: ["MongoDB", "Express", "React", "Node.js", "JavaScript"],
      githubUrl: "https://github.com/johnbekele/LawConnect",
      demoUrl: "https://law-connect-two.vercel.app",
      images: [{ src: "/images/projects/lawconnect.png", alt: "LawConnect screenshot" }],
      featured: false,
    },
    {
      sortOrder: 5,
      title: "Book & Memories",
      category: "fullstack" as const,
      description:
        "Social app for readers — share books, the notes you took, and the memory attached to them. Email/password, Google, and Apple sign-in.",
      longDescription:
        "React frontend on a Node backend. Three sign-in paths share one session model: email/password with bcrypt, Google OAuth, and Apple OAuth, plus a 'Remember me' long-lived token and password reset flow. Once in, users post books with notes/memories, follow other readers, and browse a feed. Designed dark-first because the actual reading-and-reminiscing use case happens at night.",
      technologies: ["React", "Node.js", "JavaScript", "OAuth"],
      githubUrl: "https://github.com/johnbekele/Book-and-Memories",
      demoUrl: "https://book-and-memories.vercel.app",
      images: [{ src: "/images/projects/book-memories.png", alt: "Book & Memories screenshot" }],
      featured: false,
    },
    {
      sortOrder: 6,
      title: "Crypto Info Finder",
      category: "fullstack" as const,
      description:
        "Type a coin name, get live market data back. Single-page React app over a public crypto API with a dark, retro UI.",
      longDescription:
        "Small focused SPA. Search input fires a fetch against a public crypto API, results render with price, supply, and basic market stats. State is kept simple — no Redux, just hooks — and errors (bad ticker, rate limit, network) surface inline instead of crashing the page. Built mainly to nail one thing well: fast async UX with a loading skeleton, debounced input, and a UI that holds up on a 3G connection.",
      technologies: ["React", "JavaScript", "REST API", "CSS"],
      githubUrl: "https://github.com/johnbekele/CryptocurrencyTracker",
      demoUrl: "https://cryptocurrency-tracker-ten-rho.vercel.app",
      images: [{ src: "/images/projects/crypto-tracker.png", alt: "Crypto Tracker screenshot" }],
      featured: false,
    },
  ]
  for (const p of projectData) {
    await db.insert(projects).values(p)
  }

  // ── Skill categories ──────────────────────────────────
  const skillData = [
    {
      sortOrder: 0,
      title: "Cloud Platforms & Services",
      iconName: "Cloud",
      description:
        "Built production infrastructure from zero on AWS — 7 microservices across 4 environments.",
      skills: [
        "AWS ECS Fargate",
        "Aurora PostgreSQL",
        "DynamoDB",
        "ElastiCache",
        "CloudFront",
        "ALB",
        "S3",
        "IAM",
        "VPC",
        "Bedrock",
        "SageMaker",
        "KMS",
        "WAFv2",
        "GuardDuty",
      ],
    },
    {
      sortOrder: 1,
      title: "Infrastructure as Code",
      iconName: "Code",
      description:
        "Designed and maintained multi-environment IaC stacks with state management and feature flags.",
      skills: ["Pulumi (Python)", "Terraform", "CloudFormation"],
    },
    {
      sortOrder: 2,
      title: "CI/CD & DevOps",
      iconName: "GitBranch",
      description:
        "Authored 20+ CI/CD workflows with SHA-pinned actions, security gates, and automated release notes.",
      skills: [
        "GitHub Actions",
        "AWS CodeBuild",
        "Docker",
        "ECR",
        "Production Approval Gates",
        "Security Scanning",
        "Automated Rollbacks",
        "Feature Flags",
      ],
    },
    {
      sortOrder: 3,
      title: "AI & LLM Systems",
      iconName: "Brain",
      description:
        "Deployed agentic AI services, conversational AI, and document processing pipelines to production.",
      skills: [
        "Claude/Bedrock",
        "Anthropic API",
        "pgvector",
        "Agentic AI",
        "RAG",
        "LangChain",
        "Document Processing",
        "Embeddings",
      ],
    },
    {
      sortOrder: 4,
      title: "Monitoring & Observability",
      iconName: "Workflow",
      description:
        "Full-stack observability achieving 99.8% uptime through proactive monitoring and alert tuning.",
      skills: [
        "New Relic",
        "Datadog",
        "CloudWatch",
        "Prometheus",
        "Grafana",
        "ELK Stack",
        "Alerting",
        "Anomaly Detection",
      ],
    },
    {
      sortOrder: 5,
      title: "Security",
      iconName: "Shield",
      description:
        "Implemented defense-in-depth security with compliance audits (CIS, AWS Best Practices).",
      skills: [
        "WAFv2",
        "GuardDuty",
        "Security Hub",
        "KMS Encryption",
        "Zero-Trust S3 Policies",
        "Secrets Manager",
        "Microsoft Entra ID SSO",
        "RBAC",
      ],
    },
    {
      sortOrder: 6,
      title: "Programming & Full Stack",
      iconName: "Database",
      description:
        "Backend services, frontend applications, automation scripts, and ETL pipelines.",
      skills: [
        "Python",
        "TypeScript",
        "JavaScript",
        "Bash",
        "SQL",
        "FastAPI",
        "Next.js",
        "React",
        "Node.js",
        "Express",
        "Tailwind CSS",
      ],
    },
    {
      sortOrder: 7,
      title: "Incident Management",
      iconName: "Container",
      description:
        "Incident response, escalation, and resolution with documented runbooks and automation.",
      skills: [
        "ServiceNow",
        "JIRA",
        "PagerDuty",
        "Root Cause Analysis",
        "Post-Incident Reviews",
        "Runbooks",
        "SLA Management",
      ],
    },
  ]
  for (const s of skillData) {
    await db.insert(skillCategories).values(s)
  }

  // ── Certifications ────────────────────────────────────
  await db.insert(certifications).values({
    sortOrder: 0,
    title: "AWS Certified Cloud Practitioner",
    issuer: "Amazon Web Services",
    date: "Certified",
    credentialId: "Verified",
    url: "https://aws.amazon.com/certification/certified-cloud-practitioner/",
  })

  console.log("Seed complete.")
  client.close()
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
