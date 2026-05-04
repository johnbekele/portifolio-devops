import Anthropic from "@anthropic-ai/sdk"
import { getHero } from "@/lib/data/hero"
import { getAboutParagraphs } from "@/lib/data/about"
import { getAllExperiences } from "@/lib/data/experiences"
import { getAllProjects } from "@/lib/data/projects"
import { getSkillCategories } from "@/lib/data/skills"
import { getCertifications } from "@/lib/data/certifications"

export interface SiteSuggestion {
  section: string
  priority: "high" | "medium" | "low"
  issue: string
  suggestion: string
}

const SYSTEM_PROMPT = `You are a hiring-bar senior engineer reviewing a personal portfolio site
for another senior engineer. Goal: surface the highest-leverage edits that would
improve how the site reads to a hiring manager or staff engineer skimming for 30 seconds.

Rules:
- Output 3 to 6 suggestions, ordered by priority.
- Each suggestion targets a specific section and points at a concrete fix.
- "issue" is one sentence describing what's weak right now.
- "suggestion" is one or two sentences describing what to change. Be specific.
- Focus on impact, signal, and clarity. Things that help: concrete numbers, sharp
  technologies, scope of ownership. Things that hurt: jargon walls, vague claims,
  redundancy, generic adjectives ("passionate", "innovative"), grammar issues.
- Do NOT be polite-vague. Do not pad. If something is fine, say nothing.
- "priority": "high" only for things that materially hurt first impression.
- Output ONLY via the review tool.`

async function loadSnapshot() {
  const [hero, about, experiences, projects, skills, certifications] = await Promise.all([
    getHero(),
    getAboutParagraphs(),
    getAllExperiences(),
    getAllProjects(),
    getSkillCategories(),
    getCertifications(),
  ])

  return {
    hero: hero
      ? {
          name: hero.name,
          title: hero.title,
          subtitle: hero.subtitle,
          tagline: hero.tagline,
          contactBlurb: hero.contactBlurb,
          location: hero.location,
        }
      : null,
    about: about.map((p) => p.content),
    experiences: experiences.map((e) => ({
      period: e.period,
      title: e.title,
      company: e.company,
      description: e.description,
      technologies: e.technologies,
      isVisible: e.isVisible,
    })),
    projects: projects.map((p) => ({
      title: p.title,
      category: p.category,
      description: p.description,
      longDescription: p.longDescription,
      technologies: p.technologies,
      featured: p.featured,
      isVisible: p.isVisible,
      hasGithub: Boolean(p.githubUrl),
      hasDemo: Boolean(p.demoUrl),
      imageCount: p.images.length,
    })),
    skills: skills.map((s) => ({ title: s.title, skills: s.skills })),
    certifications: certifications.map((c) => ({ title: c.title, issuer: c.issuer })),
  }
}

export async function reviewSite(): Promise<SiteSuggestion[]> {
  const apiKey = process.env.ANTHROPIC_API_KEY
  if (!apiKey) throw new Error("ANTHROPIC_API_KEY is not set")

  const model = process.env.ANTHROPIC_MODEL ?? "claude-sonnet-4-5"
  const client = new Anthropic({ apiKey })
  const snapshot = await loadSnapshot()

  const response = await client.messages.create({
    model,
    max_tokens: 2000,
    system: SYSTEM_PROMPT,
    tools: [
      {
        name: "review",
        description: "Return prioritized portfolio improvement suggestions.",
        input_schema: {
          type: "object",
          properties: {
            suggestions: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  section: {
                    type: "string",
                    description:
                      "Which section the issue is in. One of: hero, about, experience, projects, skills, certifications, contact, or 'site-wide'.",
                  },
                  priority: { type: "string", enum: ["high", "medium", "low"] },
                  issue: { type: "string" },
                  suggestion: { type: "string" },
                },
                required: ["section", "priority", "issue", "suggestion"],
              },
            },
          },
          required: ["suggestions"],
        },
      },
    ],
    tool_choice: { type: "tool", name: "review" },
    messages: [
      {
        role: "user",
        content: `Review this portfolio. Snapshot below as JSON:\n\n${JSON.stringify(snapshot, null, 2)}`,
      },
    ],
  })

  const toolUse = response.content.find(
    (block): block is Anthropic.Messages.ToolUseBlock => block.type === "tool_use",
  )
  if (!toolUse) throw new Error("Model did not return a review tool call")

  const data = toolUse.input as { suggestions?: unknown }
  if (!Array.isArray(data.suggestions)) throw new Error("Model returned no suggestions")

  return data.suggestions
    .filter((s): s is SiteSuggestion => {
      if (typeof s !== "object" || s === null) return false
      const x = s as Record<string, unknown>
      return (
        typeof x.section === "string" &&
        (x.priority === "high" || x.priority === "medium" || x.priority === "low") &&
        typeof x.issue === "string" &&
        typeof x.suggestion === "string"
      )
    })
    .slice(0, 6)
}
