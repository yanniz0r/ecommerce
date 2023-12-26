import { relations } from 'drizzle-orm';
import { sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { products } from 'src/drizzle/models/product.model';

export const currencies = sqliteTable('currencies', {
  isoCode: text('iso_code').primaryKey(),
  name: text('name').notNull(),
  symbol: text('symbol').notNull(),
});

export const curreniesRelations = relations(currencies, ({ many }) => {
  return {
    products: many(products),
  };
});

export type Currency = typeof currencies.$inferSelect;
export type CurrencyInsert = typeof currencies.$inferInsert;
