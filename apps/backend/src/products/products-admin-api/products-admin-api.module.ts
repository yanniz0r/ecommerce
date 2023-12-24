import { Module } from '@nestjs/common';
import { ProductsAdminApiController } from './products-admin-api.controller';

@Module({
  controllers: [ProductsAdminApiController],
  imports: [],
})
export class ProductsAdminApiModule {}
