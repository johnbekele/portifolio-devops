import { Award, ExternalLink } from "lucide-react"

const certifications = [
  {
    title: "AWS Solutions Architect - Professional",
    issuer: "Amazon Web Services",
    date: "2024",
    credentialId: "AWS-SAP-12345",
    url: "https://aws.amazon.com/certification/",
  },
  {
    title: "AWS DevOps Engineer - Professional",
    issuer: "Amazon Web Services",
    date: "2023",
    credentialId: "AWS-DOP-67890",
    url: "https://aws.amazon.com/certification/",
  },
  {
    title: "Certified Kubernetes Administrator (CKA)",
    issuer: "Cloud Native Computing Foundation",
    date: "2023",
    credentialId: "CKA-2023-45678",
    url: "https://www.cncf.io/certification/cka/",
  },
  {
    title: "HashiCorp Certified: Terraform Associate",
    issuer: "HashiCorp",
    date: "2022",
    credentialId: "TF-ASSOC-11111",
    url: "https://www.hashicorp.com/certification/terraform-associate",
  },
  {
    title: "AWS Solutions Architect - Associate",
    issuer: "Amazon Web Services",
    date: "2021",
    credentialId: "AWS-SAA-22222",
    url: "https://aws.amazon.com/certification/",
  },
]

export function Certifications() {
  return (
    <div>
      <h2 className="text-sm font-semibold uppercase tracking-widest text-primary mb-8 lg:hidden">
        Certifications
      </h2>

      <div className="space-y-4">
        {certifications.map((cert, index) => (
          <a
            key={index}
            href={cert.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-start gap-4 rounded-lg border border-border bg-card/50 p-4 transition-all hover:bg-card hover:border-primary/30"
          >
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Award className="h-6 w-6" />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2">
                <h3 className="font-medium text-foreground group-hover:text-primary transition-colors">
                  {cert.title}
                </h3>
                <ExternalLink className="h-4 w-4 shrink-0 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              
              <p className="text-sm text-muted-foreground mt-1">
                {cert.issuer}
              </p>
              
              <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
                <span>{cert.date}</span>
                <span className="text-border">|</span>
                <span className="font-mono">{cert.credentialId}</span>
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  )
}
