import { Injectable } from '@nestjs/common';
import { drizzle } from 'drizzle-orm/libsql';
// import { drizzle } from 'drizzle-orm/postgres-js';
import { Client, createClient } from '@libsql/client';
import * as productsSchema from './models/product.model';
import * as currenciesSchema from './models/currencies.model';
import * as cartSchema from './models/cart.model';
import * as lineItemSchema from './models/line-item.model';
import * as orderSchema from './models/order.model';

function initializeDrizzle(client: Client) {
  const db = drizzle(client, {
    schema: {
      ...productsSchema,
      ...currenciesSchema,
      ...cartSchema,
      ...lineItemSchema,
      ...orderSchema,
    } as const,
    logger: true,
  });
  return db;
}

@Injectable()
export class DrizzleService {
  private db: ReturnType<typeof initializeDrizzle>;
  private queryClient: Client;

  constructor() {
    this.connect();
  }

  private async connect(): Promise<void> {
    const connectionString = process.env.DATABASE_URL ?? 'file:database.sqlite';

    this.queryClient = createClient({
      url: connectionString,
    });
    this.db = initializeDrizzle(this.queryClient);
  }

  public getDb() {
    return this.db;
  }
}
