export function parseList(input: FormDataEntryValue | null): string[] {
  if (typeof input !== "string") return []
  return input
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean)
}

export function parseBool(input: FormDataEntryValue | null): boolean {
  return input === "on" || input === "true" || input === "1"
}

export function parseInt0(input: FormDataEntryValue | null, fallback = 0): number {
  if (typeof input !== "string") return fallback
  const n = Number.parseInt(input, 10)
  return Number.isFinite(n) ? n : fallback
}

export function parseStr(input: FormDataEntryValue | null, fallback = ""): string {
  if (typeof input !== "string") return fallback
  return input
}

export function parseStrOrNull(input: FormDataEntryValue | null): string | null {
  if (typeof input !== "string" || !input.trim()) return null
  return input
}

export function parseJsonArray<T>(input: FormDataEntryValue | null, fallback: T[] = []): T[] {
  if (typeof input !== "string" || !input) return fallback
  try {
    const parsed = JSON.parse(input)
    if (Array.isArray(parsed)) return parsed as T[]
    return fallback
  } catch {
    return fallback
  }
}
