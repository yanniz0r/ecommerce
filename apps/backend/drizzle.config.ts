import type { Config } from 'drizzle-kit';
export default {
  schema: [
    './src/drizzle/models/product.model.ts',
    './src/drizzle/models/currencies.model.ts',
    './src/drizzle/models/cart.model.ts',
    './src/drizzle/models/line-item.model.ts',
    './src/drizzle/models/order.model.ts',
  ],
  out: './migrations',
  driver: 'libsql',
  dbCredentials: {
    url: 'file:database.sqlite',
  },
} satisfies Config;
