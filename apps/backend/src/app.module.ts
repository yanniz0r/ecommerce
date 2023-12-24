import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DrizzleModule } from './drizzle/drizzle.module';
import { ProductsModule } from './products/products.module';
import { CartsModule } from './carts/carts.module';
import { PriceService } from './price/price.service';
import { PriceModule } from './price/price.module';

@Module({
  imports: [DrizzleModule, ProductsModule, CartsModule, PriceModule],
  controllers: [AppController],
  providers: [AppService, PriceService],
})
export class AppModule {}
