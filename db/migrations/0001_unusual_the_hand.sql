ALTER TABLE `projects` ADD `categories` text DEFAULT '[]' NOT NULL;
--> statement-breakpoint
UPDATE `projects` SET `categories` = json_array(`category`) WHERE `categories` = '[]';
