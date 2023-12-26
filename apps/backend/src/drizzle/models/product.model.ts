import { relations } from 'drizzle-orm';
// import { integer, pgTable, text } from 'drizzle-orm/pg-core';
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { currencies } from './currencies.model';

export const products = sqliteTable('products', {
  id: integer('id').primaryKey(),
  name: text('name').notNull(),
  price: integer('price').notNull(),
  slug: text('slug').unique().notNull(),
  description: text('description').notNull(),
  currencyIsoCode: text('currency_iso_code')
    .references(() => currencies.isoCode, {
      onDelete: 'cascade',
    })
    .notNull(),
  imageUrl: text('image_url'),
});

export const productsRelations = relations(products, ({ one }) => {
  return {
    currency: one(currencies, {
      fields: [products.id],
      references: [currencies.isoCode],
    }),
  };
});

export type Product = typeof products.$inferSelect;
export type ProductInsert = typeof products.$inferInsert;
