import Anthropic from "@anthropic-ai/sdk"

export type ReformatKind = "experience" | "project-long"

const PROMPTS: Record<ReformatKind, string> = {
  experience: `You reformat a portfolio "Experience" description for readability.

Rules:
- Keep ALL of the engineer's facts, numbers, and technologies. Do not invent or drop content.
- Keep the same tone (confident, first-person past tense).
- Output shape:
    * One short opening sentence (1-2 lines max) that states the role's headline impact.
    * A blank line.
    * A bulleted list (lines starting with "- ") of 4-8 specific achievements / responsibilities.
- Use **bold** sparingly (1-3 times) for the most important numbers or technologies.
- Each bullet is one sentence, max ~25 words.
- No markdown headings, no emoji, no introductions like "Here is the reformatted text".
- Output ONLY via the reformat tool.`,
  "project-long": `You reformat a portfolio project's long description for readability.

Rules:
- Keep ALL of the engineer's facts and technologies. Do not invent or drop content.
- Keep the same tone (confident, first-person past tense).
- Output shape:
    * One short opening paragraph (1-2 sentences) describing what the project is.
    * A blank line.
    * A bulleted list (lines starting with "- ") of 3-6 implementation details that would impress another senior engineer.
- Use **bold** sparingly (1-3 times) for key numbers or technologies.
- Total length under ~150 words.
- No markdown headings, no emoji.
- Output ONLY via the reformat tool.`,
}

export async function reformatText(text: string, kind: ReformatKind): Promise<string> {
  const apiKey = process.env.ANTHROPIC_API_KEY
  if (!apiKey) throw new Error("ANTHROPIC_API_KEY is not set")

  const model = process.env.ANTHROPIC_MODEL ?? "claude-sonnet-4-5"
  const client = new Anthropic({ apiKey })

  const response = await client.messages.create({
    model,
    max_tokens: 1500,
    system: PROMPTS[kind],
    tools: [
      {
        name: "reformat",
        description: "Return the reformatted text.",
        input_schema: {
          type: "object",
          properties: {
            text: {
              type: "string",
              description:
                "The reformatted text using paragraphs separated by blank lines and lines starting with '- ' for bullets.",
            },
          },
          required: ["text"],
        },
      },
    ],
    tool_choice: { type: "tool", name: "reformat" },
    messages: [
      {
        role: "user",
        content: `Reformat the following text. Keep every fact:\n\n${text}`,
      },
    ],
  })

  const toolUse = response.content.find(
    (block): block is Anthropic.Messages.ToolUseBlock => block.type === "tool_use",
  )
  if (!toolUse) throw new Error("Model did not return a reformat tool call")

  const data = toolUse.input as { text?: string }
  if (typeof data.text !== "string" || !data.text.trim()) {
    throw new Error("Model returned empty text")
  }
  return data.text.trim()
}
