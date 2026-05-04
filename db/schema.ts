import { sqliteTable, integer, text } from "drizzle-orm/sqlite-core"
import { sql } from "drizzle-orm"

export const hero = sqliteTable("hero", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  title: text("title").notNull(),
  subtitle: text("subtitle").notNull(),
  tagline: text("tagline").notNull(),
  resumeUrl: text("resume_url").notNull().default("/Yohans_Bekele_Resume.pdf"),
  githubUrl: text("github_url").notNull(),
  linkedinUrl: text("linkedin_url").notNull(),
  email: text("email").notNull(),
  profileImageUrl: text("profile_image_url").notNull().default("/images/profile.jpg"),
  location: text("location").notNull().default("Gdansk, Poland"),
  contactBlurb: text("contact_blurb").notNull().default(""),
  updatedAt: integer("updated_at", { mode: "timestamp_ms" })
    .notNull()
    .default(sql`(unixepoch() * 1000)`),
})

export const aboutParagraphs = sqliteTable("about_paragraphs", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  sortOrder: integer("sort_order").notNull().default(0),
  content: text("content").notNull(),
})

export const experiences = sqliteTable("experiences", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  sortOrder: integer("sort_order").notNull().default(0),
  period: text("period").notNull(),
  title: text("title").notNull(),
  company: text("company").notNull(),
  url: text("url").notNull(),
  description: text("description").notNull(),
  technologies: text("technologies", { mode: "json" }).notNull().$type<string[]>(),
  isVisible: integer("is_visible", { mode: "boolean" }).notNull().default(true),
})

export const projects = sqliteTable("projects", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  sortOrder: integer("sort_order").notNull().default(0),
  title: text("title").notNull(),
  category: text("category", { enum: ["devops", "fullstack", "llm"] }).notNull(),
  description: text("description").notNull(),
  longDescription: text("long_description").notNull(),
  technologies: text("technologies", { mode: "json" }).notNull().$type<string[]>(),
  images: text("images", { mode: "json" })
    .notNull()
    .$type<{ src: string; alt?: string }[]>(),
  githubUrl: text("github_url"),
  demoUrl: text("demo_url"),
  featured: integer("featured", { mode: "boolean" }).notNull().default(false),
  isVisible: integer("is_visible", { mode: "boolean" }).notNull().default(true),
})

export const skillCategories = sqliteTable("skill_categories", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  sortOrder: integer("sort_order").notNull().default(0),
  title: text("title").notNull(),
  iconName: text("icon_name").notNull(),
  description: text("description").notNull(),
  skills: text("skills", { mode: "json" }).notNull().$type<string[]>(),
})

export const certifications = sqliteTable("certifications", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  sortOrder: integer("sort_order").notNull().default(0),
  title: text("title").notNull(),
  issuer: text("issuer").notNull(),
  date: text("date").notNull(),
  credentialId: text("credential_id").notNull(),
  url: text("url").notNull(),
})

export type Hero = typeof hero.$inferSelect
export type AboutParagraph = typeof aboutParagraphs.$inferSelect
export type Experience = typeof experiences.$inferSelect
export type Project = typeof projects.$inferSelect
export type SkillCategory = typeof skillCategories.$inferSelect
export type Certification = typeof certifications.$inferSelect
