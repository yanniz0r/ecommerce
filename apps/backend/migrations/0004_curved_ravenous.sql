CREATE TABLE `orders` (
	`id` integer PRIMARY KEY NOT NULL,
	`cart_id` integer NOT NULL,
	`total` integer NOT NULL,
	FOREIGN KEY (`cart_id`) REFERENCES `carts`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
ALTER TABLE products ADD `image_url` text;