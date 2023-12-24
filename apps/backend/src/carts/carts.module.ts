import { Module } from '@nestjs/common';
import { CartsStoreApiController } from './carts-store-api/carts-store-api.controller';
import { OrderModule } from './order/order.module';
import { CartsService } from './carts.service';

@Module({
  controllers: [CartsStoreApiController],
  imports: [OrderModule],
  providers: [CartsService],
})
export class CartsModule {}
