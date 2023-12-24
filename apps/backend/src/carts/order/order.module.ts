import { Module } from '@nestjs/common';

import { OrderStoreApiController } from './order-store-api/order-store-api.controller';
import { OrderStoreApiModule } from './order-store-api/order-store-api.module';

@Module({
  controllers: [OrderStoreApiController],
  imports: [OrderStoreApiModule],
})
export class OrderModule {}
