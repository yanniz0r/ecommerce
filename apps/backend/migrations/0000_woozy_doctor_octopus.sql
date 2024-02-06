CREATE TABLE `customers` (
	`id` integer PRIMARY KEY NOT NULL,
	`first_name` text NOT NULL,
	`last_name` text NOT NULL,
	`email` text NOT NULL,
	`password` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `products` (
	`id` integer PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`price` integer NOT NULL,
	`slug` text NOT NULL,
	`description` text NOT NULL,
	`image_url` text
);
--> statement-breakpoint
CREATE TABLE `carts` (
	`id` integer PRIMARY KEY NOT NULL,
	`customerId` integer,
	FOREIGN KEY (`customerId`) REFERENCES `customers`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `line_items` (
	`id` integer PRIMARY KEY NOT NULL,
	`cart_id` integer NOT NULL,
	`product_id` integer NOT NULL,
	`product_price` integer NOT NULL,
	`quantity` integer NOT NULL,
	FOREIGN KEY (`cart_id`) REFERENCES `carts`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `orders` (
	`id` integer PRIMARY KEY NOT NULL,
	`cart_id` integer NOT NULL,
	`total` integer NOT NULL,
	FOREIGN KEY (`cart_id`) REFERENCES `carts`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `customers_email_unique` ON `customers` (`email`);--> statement-breakpoint
CREATE UNIQUE INDEX `products_slug_unique` ON `products` (`slug`);