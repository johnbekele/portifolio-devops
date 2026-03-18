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
              alt="Profile photo"
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
          <span className="font-medium text-foreground">AWS Certified Solutions Architect</span> with expertise spanning{" "}
          <span className="font-medium text-foreground">DevOps</span>,{" "}
          <span className="font-medium text-foreground">Platform Engineering</span>, and{" "}
          <span className="font-medium text-foreground">Site Reliability Engineering (SRE)</span>. 
          I design and implement cloud-native solutions that are scalable, secure, and cost-optimized.
        </p>
        
        <p>
          As a <span className="font-medium text-foreground">Platform Engineer</span>, I build internal developer platforms 
          that accelerate software delivery. I create self-service infrastructure, golden paths, and 
          tooling that empowers development teams to ship faster while maintaining security and compliance.
        </p>
        
        <p>
          My <span className="font-medium text-foreground">SRE</span> background drives my focus on reliability and observability. 
          I implement SLOs, error budgets, and incident management processes. I specialize in{" "}
          <span className="font-medium text-foreground">Kubernetes</span>,{" "}
          <span className="font-medium text-foreground">Terraform</span>,{" "}
          <span className="font-medium text-foreground">CI/CD pipelines</span>, and{" "}
          <span className="font-medium text-foreground">Infrastructure as Code</span>.
        </p>
        
        <p>
          I&apos;m passionate about{" "}
          <span className="font-medium text-foreground">GitOps workflows</span>,{" "}
          <span className="font-medium text-foreground">DevSecOps</span>, and building systems that are 
          observable, maintainable, and resilient by design.
        </p>
      </div>
    </div>
  )
}
