export const TAGS = {
  hero: "hero",
  about: "about",
  experiences: "experiences",
  projects: "projects",
  skills: "skills",
  certifications: "certifications",
} as const

export type CacheTag = (typeof TAGS)[keyof typeof TAGS]
