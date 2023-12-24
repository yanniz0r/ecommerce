CREATE TABLE `products` (
	`id` integer PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`price` integer NOT NULL,
	`slug` text NOT NULL,
	`description` text NOT NULL,
	`currency_iso_code` integer NOT NULL,
	FOREIGN KEY (`currency_iso_code`) REFERENCES `currencies`(`iso_code`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `currencies` (
	`iso_code` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`symbol` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `products_slug_unique` ON `products` (`slug`);