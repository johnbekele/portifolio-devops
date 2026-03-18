"use client"

import { useState } from "react"
import { Send, Github, Linkedin, Mail, Twitter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { FieldGroup, Field, FieldLabel } from "@/components/ui/field"

export function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsSubmitting(false)
  }

  return (
    <div>
      <h2 className="text-sm font-semibold uppercase tracking-widest text-primary mb-8 lg:hidden">
        Contact
      </h2>

      <div className="mb-8">
        <p className="text-muted-foreground leading-relaxed">
          I&apos;m always interested in hearing about new opportunities, 
          challenging projects, or just connecting with fellow DevOps 
          enthusiasts. Feel free to reach out!
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="name">Name</FieldLabel>
            <Input
              id="name"
              name="name"
              placeholder="Your name"
              required
              className="bg-card border-border focus:border-primary"
            />
          </Field>
        </FieldGroup>

        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="email">Email</FieldLabel>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="your@email.com"
              required
              className="bg-card border-border focus:border-primary"
            />
          </Field>
        </FieldGroup>

        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="message">Message</FieldLabel>
            <Textarea
              id="message"
              name="message"
              placeholder="Your message..."
              rows={5}
              required
              className="bg-card border-border focus:border-primary resize-none"
            />
          </Field>
        </FieldGroup>

        <Button
          type="submit"
          disabled={isSubmitting}
          className="bg-primary text-primary-foreground hover:bg-primary/90"
        >
          {isSubmitting ? (
            "Sending..."
          ) : (
            <>
              Send Message
              <Send className="ml-2 h-4 w-4" />
            </>
          )}
        </Button>
      </form>

      <div className="mt-12 pt-8 border-t border-border">
        <h3 className="text-sm font-medium text-foreground mb-4">
          Or find me on
        </h3>
        
        <div className="flex items-center gap-4">
          <a
            href="mailto:alex@example.com"
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            <Mail className="h-4 w-4" />
            alex@example.com
          </a>
        </div>

        <div className="flex items-center gap-6 mt-4">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary transition-colors"
            aria-label="GitHub"
          >
            <Github className="h-5 w-5" />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary transition-colors"
            aria-label="LinkedIn"
          >
            <Linkedin className="h-5 w-5" />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary transition-colors"
            aria-label="Twitter"
          >
            <Twitter className="h-5 w-5" />
          </a>
        </div>
      </div>

      <footer className="mt-16 pt-8 border-t border-border text-sm text-muted-foreground">
        <p>
          Built with Next.js and Tailwind CSS. Deployed on Vercel.
        </p>
        <p className="mt-2">
          Design inspired by{" "}
          <a
            href="https://brittanychiang.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground hover:text-primary transition-colors"
          >
            Brittany Chiang
          </a>
        </p>
      </footer>
    </div>
  )
}
