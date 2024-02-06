import { relations } from 'drizzle-orm';
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const products = sqliteTable('products', {
  id: integer('id').primaryKey(),
  name: text('name').notNull(),
  price: integer('price').notNull(),
  slug: text('slug').unique().notNull(),
  description: text('description').notNull(),
  imageUrl: text('image_url'),
});

export const productsRelations = relations(products, ({ one }) => {
  return {};
});

export type Product = typeof products.$inferSelect;
export type ProductInsert = typeof products.$inferInsert;
