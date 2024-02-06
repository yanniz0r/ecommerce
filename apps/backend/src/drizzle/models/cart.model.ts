import { relations } from 'drizzle-orm';
import { integer, sqliteTable } from 'drizzle-orm/sqlite-core';
import { lineItems } from './line-item.model';
import { orders } from './order.model';
import { customers } from './customer.model';

export const carts = sqliteTable('carts', {
  id: integer('id').primaryKey(),
  customerId: integer('customerId').references(() => customers.id, {
    onDelete: 'cascade',
  }),
});

export const cartsRelations = relations(carts, ({ many, one }) => {
  return {
    lineItems: many(lineItems),
    order: one(orders, {
      fields: [carts.id],
      references: [orders.cartId],
    }),
    customer: one(customers, {
      fields: [carts.customerId],
      references: [customers.id],
    }),
  };
});

export type Cart = typeof carts.$inferSelect;
