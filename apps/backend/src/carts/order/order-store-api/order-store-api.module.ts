import { Module } from '@nestjs/common';
import { OrderStoreApiController } from './order-store-api.controller';

@Module({
  providers: [OrderStoreApiController],
})
export class OrderStoreApiModule {}
