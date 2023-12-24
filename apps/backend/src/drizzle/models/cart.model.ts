import { relations } from 'drizzle-orm';
import { integer, sqliteTable } from 'drizzle-orm/sqlite-core';
import { lineItems } from './line-item.model';
import { orders } from './order.model';

export const carts = sqliteTable('carts', {
  id: integer('id').primaryKey(),
});

export const cartsRelations = relations(carts, ({ many, one }) => {
  return {
    lineItems: many(lineItems),
    order: one(orders, {
      fields: [carts.id],
      references: [orders.cartId],
    }),
  };
});

export type Cart = typeof carts.$inferSelect;
