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
          I&apos;m a results-driven{" "}
          <span className="font-medium text-foreground">Site Reliability Engineer</span> and{" "}
          <span className="font-medium text-foreground">DevOps professional</span> with 4 years of experience in
          cloud infrastructure, application support, monitoring, incident management, and automation across enterprise systems.
        </p>

        <p>
          I have proven expertise in designing and deploying scalable cloud solutions on{" "}
          <span className="font-medium text-foreground">AWS</span>, implementing{" "}
          <span className="font-medium text-foreground">Infrastructure as Code (IaC)</span> with Pulumi and Terraform,
          building robust <span className="font-medium text-foreground">CI/CD pipelines</span>, and ensuring production
          reliability with <span className="font-medium text-foreground">99.8% uptime</span>.
        </p>

        <p>
          Currently delivering end-to-end{" "}
          <span className="font-medium text-foreground">LLM applications on AWS</span> as part of DevOps engineering initiatives,
          working with <span className="font-medium text-foreground">ECS, Aurora RDS, DynamoDB, Bedrock, SageMaker</span>, and
          focusing on agentic LLM systems and production reliability engineering.
        </p>

        <p>
          Strong background in{" "}
          <span className="font-medium text-foreground">containerization</span> (Docker, Kubernetes),{" "}
          <span className="font-medium text-foreground">monitoring & observability</span> (New Relic, Datadog, Prometheus),{" "}
          <span className="font-medium text-foreground">automation scripting</span>, data migration, and cross-functional collaboration.
        </p>
      </div>
    </div>
  )
}
