import { Module } from '@nestjs/common';
import { CurrentCustomerStoreApiController } from './current-customer-store-api/current-customer-store-api.controller';
import { CurrentCustomerStoreApiModule } from './current-customer-store-api/current-customer-store-api.module';

@Module({
  imports: [CurrentCustomerStoreApiModule],
  controllers: [CurrentCustomerStoreApiController],
})
export class CustomersModule {}
