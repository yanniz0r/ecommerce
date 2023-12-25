import { Module } from '@nestjs/common';
import { ProductsAdminApiModule } from './products-admin-api/products-admin-api.module';
import { ProductsStoreApiModule } from './products-store-api/products-store-api.module';

@Module({
  controllers: [],
  imports: [ProductsAdminApiModule, ProductsStoreApiModule],
})
export class ProductsModule {}
