import { integer, sqliteTable } from 'drizzle-orm/sqlite-core';
import { carts } from './cart.model';
import { relations } from 'drizzle-orm';

export const orders = sqliteTable('orders', {
  id: integer('id').primaryKey(),
  cartId: integer('cart_id')
    .notNull()
    .references(() => carts.id),
  total: integer('total').notNull(),
});

export const ordersRelations = relations(orders, ({ one }) => {
  return {
    cart: one(carts, {
      fields: [orders.cartId],
      references: [carts.id],
    }),
  };
});

export type Oder = typeof orders.$inferSelect;
export type OrderInsert = typeof orders.$inferInsert;
