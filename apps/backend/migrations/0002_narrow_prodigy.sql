CREATE TABLE `carts` (
	`id` integer PRIMARY KEY NOT NULL
);
--> statement-breakpoint
CREATE TABLE `line_items` (
	`id` integer PRIMARY KEY NOT NULL,
	`cart_id` integer NOT NULL,
	`product_id` integer NOT NULL,
	`product_price` integer NOT NULL,
	`quantity` integer NOT NULL
);
