import { integer, sqliteTable } from 'drizzle-orm/sqlite-core';
import { carts } from './cart.model';
import { relations } from 'drizzle-orm';
import { products } from './products.model';

export const lineItems = sqliteTable('line_items', {
  id: integer('id').primaryKey(),
  cartId: integer('cart_id')
    .notNull()
    .references(() => carts.id),
  productId: integer('product_id').notNull(),
  productPrice: integer('product_price').notNull(),
  quantity: integer('quantity').notNull(),
});

export const lineItemsRelations = relations(lineItems, ({ one }) => {
  return {
    cart: one(carts, {
      fields: [lineItems.cartId],
      references: [carts.id],
    }),
    product: one(products, {
      fields: [lineItems.productId],
      references: [products.id],
    }),
  };
});

export type LineItem = typeof lineItems.$inferSelect;
