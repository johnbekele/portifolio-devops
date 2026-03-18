import { ArrowUpRight } from "lucide-react"
import { Badge } from "@/components/ui/badge"

const experiences = [
  {
    period: "2022 - PRESENT",
    title: "Senior DevOps Engineer",
    company: "CloudScale Inc",
    url: "#",
    description:
      "Lead cloud infrastructure initiatives for a platform serving 5M+ users. Architect and maintain Kubernetes clusters, implement GitOps workflows, and mentor junior engineers on AWS best practices.",
    technologies: ["AWS", "Kubernetes", "Terraform", "ArgoCD", "Prometheus"],
  },
  {
    period: "2020 - 2022",
    title: "DevOps Engineer",
    company: "TechFlow Solutions",
    url: "#",
    description:
      "Built and maintained CI/CD pipelines using Jenkins and GitHub Actions. Migrated legacy infrastructure to AWS, reducing costs by 35%. Implemented infrastructure as code using Terraform and CloudFormation.",
    technologies: ["AWS", "Jenkins", "Docker", "Terraform", "CloudFormation"],
  },
  {
    period: "2018 - 2020",
    title: "Cloud Engineer",
    company: "DataStream Analytics",
    url: "#",
    description:
      "Managed AWS infrastructure for data processing pipelines. Automated deployment processes and monitoring solutions. Implemented security best practices and achieved SOC 2 compliance.",
    technologies: ["AWS", "Python", "Ansible", "CloudWatch", "Lambda"],
  },
  {
    period: "2016 - 2018",
    title: "Systems Administrator",
    company: "NetCore Systems",
    url: "#",
    description:
      "Administered Linux servers and network infrastructure. Introduced automation using Bash and Python scripts, reducing manual operations by 60%.",
    technologies: ["Linux", "Bash", "Python", "Nginx", "MySQL"],
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
          href="/resume.pdf"
          className="inline-flex items-center font-medium text-foreground hover:text-primary transition-colors group"
        >
          View Full Resume
          <ArrowUpRight className="ml-1 h-4 w-4 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
        </a>
      </div>
    </div>
  )
}
