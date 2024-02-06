import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DrizzleModule } from './drizzle/drizzle.module';
import { ProductsModule } from './products/products.module';
import { CartsModule } from './carts/carts.module';
import { PriceService } from './price/price.service';
import { PriceModule } from './price/price.module';
import { AuthenticationModule } from './authentication/authentication.module';
import { CustomersModule } from './customers/customers.module';

@Module({
  imports: [
    DrizzleModule,
    ProductsModule,
    CartsModule,
    PriceModule,
    AuthenticationModule,
    CustomersModule,
  ],
  controllers: [AppController],
  providers: [AppService, PriceService],
})
export class AppModule {}
