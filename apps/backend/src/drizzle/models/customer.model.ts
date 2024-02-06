import { integer, text } from 'drizzle-orm/sqlite-core';
import { sqliteTable } from 'drizzle-orm/sqlite-core';
import { carts } from './cart.model';
import { relations } from 'drizzle-orm';

export const customers = sqliteTable('customers', {
  id: integer('id').primaryKey(),
  firstName: text('first_name').notNull(),
  lastName: text('last_name').notNull(),
  email: text('email').notNull().unique(),
  password: text('password').notNull(),
});

export const customersRelations = relations(customers, ({ many }) => {
  return {
    carts: many(carts),
  };
});

export type Customer = typeof customers.$inferSelect;
export type CustomerInsert = typeof customers.$inferInsert;
