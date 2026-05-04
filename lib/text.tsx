import type { ReactNode } from "react"

// Renders **bold** segments inside a single line of text.
function renderInlineBold(text: string, keyPrefix: string): ReactNode[] {
  const parts = text.split(/(\*\*[^*]+\*\*)/g)
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <span key={`${keyPrefix}-${i}`} className="font-medium text-foreground">
          {part.slice(2, -2)}
        </span>
      )
    }
    return <span key={`${keyPrefix}-${i}`}>{part}</span>
  })
}

// Renders text with paragraph + bullet support.
//   - Blocks are separated by blank lines.
//   - A block whose every line starts with "- ", "* ", or "• " becomes a <ul>.
//   - Otherwise the block is a <p>; single newlines inside it become <br/>.
//   - **bold** is rendered inline anywhere.
//
// This lets the admin write descriptions as a paragraph, several paragraphs, a
// bulleted list, or a mix — without needing a markdown library.
export function renderRichText(text: string): ReactNode {
  if (!text?.trim()) return null

  const blocks = text
    .replace(/\r\n/g, "\n")
    .split(/\n\s*\n/)
    .map((b) => b.trim())
    .filter(Boolean)

  return blocks.map((block, blockIdx) => {
    const lines = block.split("\n").map((l) => l.trim()).filter(Boolean)
    const bulletRe = /^[-*•]\s+/
    const isList = lines.length > 0 && lines.every((l) => bulletRe.test(l))

    if (isList) {
      return (
        <ul
          key={blockIdx}
          className="mt-3 list-disc space-y-1.5 pl-5 marker:text-muted-foreground/60"
        >
          {lines.map((line, i) => (
            <li key={i}>{renderInlineBold(line.replace(bulletRe, ""), `b${blockIdx}-${i}`)}</li>
          ))}
        </ul>
      )
    }

    return (
      <p key={blockIdx} className={blockIdx === 0 ? "" : "mt-3"}>
        {lines.map((line, i) => (
          <span key={i}>
            {renderInlineBold(line, `b${blockIdx}-${i}`)}
            {i < lines.length - 1 && <br />}
          </span>
        ))}
      </p>
    )
  })
}
