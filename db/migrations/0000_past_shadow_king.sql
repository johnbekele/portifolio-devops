CREATE TABLE `about_paragraphs` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`sort_order` integer DEFAULT 0 NOT NULL,
	`content` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `certifications` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`sort_order` integer DEFAULT 0 NOT NULL,
	`title` text NOT NULL,
	`issuer` text NOT NULL,
	`date` text NOT NULL,
	`credential_id` text NOT NULL,
	`url` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `experiences` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`sort_order` integer DEFAULT 0 NOT NULL,
	`period` text NOT NULL,
	`title` text NOT NULL,
	`company` text NOT NULL,
	`url` text NOT NULL,
	`description` text NOT NULL,
	`technologies` text NOT NULL,
	`is_visible` integer DEFAULT true NOT NULL
);
--> statement-breakpoint
CREATE TABLE `hero` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`title` text NOT NULL,
	`subtitle` text NOT NULL,
	`tagline` text NOT NULL,
	`resume_url` text DEFAULT '/Yohans_Bekele_Resume.pdf' NOT NULL,
	`github_url` text NOT NULL,
	`linkedin_url` text NOT NULL,
	`email` text NOT NULL,
	`profile_image_url` text DEFAULT '/images/profile.jpg' NOT NULL,
	`location` text DEFAULT 'Gdansk, Poland' NOT NULL,
	`contact_blurb` text DEFAULT '' NOT NULL,
	`updated_at` integer DEFAULT (unixepoch() * 1000) NOT NULL
);
--> statement-breakpoint
CREATE TABLE `projects` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`sort_order` integer DEFAULT 0 NOT NULL,
	`title` text NOT NULL,
	`category` text NOT NULL,
	`description` text NOT NULL,
	`long_description` text NOT NULL,
	`technologies` text NOT NULL,
	`images` text NOT NULL,
	`github_url` text,
	`demo_url` text,
	`featured` integer DEFAULT false NOT NULL,
	`is_visible` integer DEFAULT true NOT NULL
);
--> statement-breakpoint
CREATE TABLE `skill_categories` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`sort_order` integer DEFAULT 0 NOT NULL,
	`title` text NOT NULL,
	`icon_name` text NOT NULL,
	`description` text NOT NULL,
	`skills` text NOT NULL
);
