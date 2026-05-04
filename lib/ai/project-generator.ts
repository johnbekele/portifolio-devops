import Anthropic from "@anthropic-ai/sdk"

const PROJECT_CATEGORIES = ["devops", "fullstack", "llm"] as const
export type ProjectCategory = (typeof PROJECT_CATEGORIES)[number]

export interface GeneratedProject {
  title: string
  category: ProjectCategory
  description: string
  longDescription: string
  technologies: string[]
}

interface GenerateInput {
  imageUrls: string[]
  notes: string
}

const SYSTEM_PROMPT = `You help a senior DevOps / full-stack engineer fill out their portfolio.
Given screenshots of a project and a few freeform notes, return a JSON object that describes the project for the public portfolio site.

Rules:
- Write in confident first-person past tense, like the engineer himself wrote it.
- Be specific. Mention concrete technologies, scale numbers, and what the user did — not vague hype.
- "description" is one tight sentence (max ~30 words) shown in the project list. Plain text, no formatting.
- "longDescription" is shown in the project modal. Format it for readability:
    * A short opening paragraph (1-2 sentences, what the project is).
    * Then a blank line and a bulleted list (lines starting with "- ") covering the stack and 2-4 engineering details that would impress another senior engineer.
    * Use **bold** sparingly to highlight key numbers or technologies.
    * Keep total length under ~150 words.
- "technologies" is a deduped array of short labels (e.g. "Next.js", "AWS Lambda", "Postgres"). 4-10 items.
- "category" must be exactly one of: "devops" (infra, IaC, CI/CD, observability tools), "fullstack" (web/mobile apps with both frontend and backend), "llm" (AI/LLM-powered apps).
- Never invent github_url or demo_url; the engineer fills those.
- Output ONLY via the fill_project tool. No prose.`

export async function generateProjectFields(input: GenerateInput): Promise<GeneratedProject> {
  const apiKey = process.env.ANTHROPIC_API_KEY
  if (!apiKey) {
    throw new Error("ANTHROPIC_API_KEY is not set")
  }

  const model = process.env.ANTHROPIC_MODEL ?? "claude-sonnet-4-5"
  const client = new Anthropic({ apiKey })

  const userContent: Anthropic.Messages.ContentBlockParam[] = []

  for (const url of input.imageUrls.slice(0, 6)) {
    userContent.push({
      type: "image",
      source: { type: "url", url },
    })
  }

  userContent.push({
    type: "text",
    text: `Notes from the engineer:\n\n${input.notes.trim() || "(no extra notes)"}\n\nFill out the project fields.`,
  })

  const response = await client.messages.create({
    model,
    max_tokens: 1500,
    system: SYSTEM_PROMPT,
    tools: [
      {
        name: "fill_project",
        description: "Return the structured project description.",
        input_schema: {
          type: "object",
          properties: {
            title: { type: "string", description: "Short project name (1-4 words)." },
            category: {
              type: "string",
              enum: ["devops", "fullstack", "llm"],
            },
            description: {
              type: "string",
              description: "One-sentence summary, max ~30 words.",
            },
            longDescription: {
              type: "string",
              description: "3-6 sentence paragraph for the project modal.",
            },
            technologies: {
              type: "array",
              items: { type: "string" },
              description: "4-10 short tech labels.",
            },
          },
          required: ["title", "category", "description", "longDescription", "technologies"],
        },
      },
    ],
    tool_choice: { type: "tool", name: "fill_project" },
    messages: [{ role: "user", content: userContent }],
  })

  const toolUse = response.content.find(
    (block): block is Anthropic.Messages.ToolUseBlock => block.type === "tool_use",
  )
  if (!toolUse) {
    throw new Error("Model did not return a fill_project tool call")
  }

  const data = toolUse.input as Partial<GeneratedProject>
  if (
    typeof data.title !== "string" ||
    typeof data.category !== "string" ||
    typeof data.description !== "string" ||
    typeof data.longDescription !== "string" ||
    !Array.isArray(data.technologies)
  ) {
    throw new Error("Model returned malformed project payload")
  }

  const category = (PROJECT_CATEGORIES as readonly string[]).includes(data.category)
    ? (data.category as ProjectCategory)
    : "fullstack"

  return {
    title: data.title,
    category,
    description: data.description,
    longDescription: data.longDescription,
    technologies: data.technologies.filter((t): t is string => typeof t === "string"),
  }
}
