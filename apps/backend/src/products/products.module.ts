import { Module } from '@nestjs/common';
import { ProductsAdminApiModule } from './products-admin-api/products-admin-api.module';

@Module({
  controllers: [],
  imports: [ProductsAdminApiModule],
})
export class ProductsModule {}
