import { Module } from '@nestjs/common';
import { CurrentCustomerStoreApiController } from './current-customer-store-api.controller';

@Module({
  controllers: [CurrentCustomerStoreApiController],
})
export class CurrentCustomerStoreApiModule {}
