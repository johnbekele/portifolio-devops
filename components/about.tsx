import Image from "next/image"

export function About() {
  return (
    <div>
      <h2 className="text-sm font-semibold uppercase tracking-widest text-primary mb-8 lg:hidden">
        About
      </h2>
      
      {/* Photo Feature - Centered at top with gradient ring */}
      <div className="flex justify-center mb-10">
        <div className="relative">
          {/* Gradient ring */}
          <div className="absolute -inset-1 bg-gradient-to-br from-primary via-accent to-primary rounded-full opacity-75 blur-sm" />
          <div className="relative w-40 h-40 md:w-48 md:h-48 rounded-full overflow-hidden border-4 border-background shadow-2xl">
            <Image
              src="/images/profile.jpg"
              alt="Portrait of Yohans Bekele"
              fill
              className="object-cover"
              priority
            />
          </div>
          {/* Status indicator */}
          <div className="absolute bottom-2 right-2 w-5 h-5 bg-green-500 rounded-full border-4 border-background" />
        </div>
      </div>
      
      {/* Bio Text */}
      <div className="space-y-4 text-muted-foreground leading-relaxed">
        <p>
          I&apos;m an{" "}
          <span className="font-medium text-foreground">AIOps Engineer</span>,{" "}
          <span className="font-medium text-foreground">Product Support Specialist</span>, and{" "}
          <span className="font-medium text-foreground">Full Stack Developer</span> with 4+ years of experience in
          cloud infrastructure, AI/ML systems, application support, security engineering, and building production systems end-to-end.
        </p>

        <p>
          As an AIOps Engineer at Thomson Reuters, I built the{" "}
          <span className="font-medium text-foreground">entire AWS infrastructure from zero</span> for an enterprise M&amp;A
          platform — 7 microservices on ECS Fargate, dual Aurora PostgreSQL databases, CloudFront with WAF, and{" "}
          <span className="font-medium text-foreground">20+ CI/CD pipelines</span> with production approval gates and
          security scanning. I designed{" "}
          <span className="font-medium text-foreground">end-to-end security</span> with data isolation, customer-managed
          KMS keys with envelope encryption, zero-trust S3 resource policies, WAFv2 in BLOCK mode, GuardDuty, and Security Hub
          compliance (CIS &amp; AWS Best Practices). The platform includes{" "}
          <span className="font-medium text-foreground">agentic AI services</span> powered by Claude via Bedrock,
          document processing with <span className="font-medium text-foreground">pgvector embeddings</span>,
          and a knowledge graph pipeline. 863 commits in 4 months.
        </p>

        <p>
          As a Product Support Specialist, I support the{" "}
          <span className="font-medium text-foreground">TAP UK digital application</span> — monitoring application health,
          diagnosing issues across Azure and on-prem Windows Server environments, and debugging Microsoft SQL Server databases.
          I write automation scripts for cache cleaning, registry cleanup, database reindexing, and server diagnostics.
          I built <span className="font-medium text-foreground">KB Hub</span>, an AI-powered internal tool using{" "}
          <span className="font-medium text-foreground">RAG pipelines</span> to ingest knowledge base resources from
          multiple data sources and surface precise resolutions — integrated across applications as a debugging and support tool.
          I also handle database migrations, on-prem server setup, and maintain{" "}
          <span className="font-medium text-foreground">99.8% uptime</span> through proactive monitoring and incident
          response via ServiceNow and JIRA.
        </p>

        <p>
          I also freelance as a full stack developer on Upwork, building web applications with{" "}
          <span className="font-medium text-foreground">React, Next.js, Node.js, FastAPI</span>, and{" "}
          <span className="font-medium text-foreground">Python</span>. I built{" "}
          <span className="font-medium text-foreground">InfraCanvas</span> — a visual AWS infrastructure designer
          that generates IaC code with GitHub integration.
        </p>
      </div>
    </div>
  )
}
