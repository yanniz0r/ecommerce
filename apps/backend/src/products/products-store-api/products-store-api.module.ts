import { Module } from '@nestjs/common';
import { ProductsStoreApiController } from './products-store-api.controller';

@Module({
  controllers: [ProductsStoreApiController]
})
export class ProductsStoreApiModule {}
