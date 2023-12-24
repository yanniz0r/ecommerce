import { Controller, Get, Inject } from '@nestjs/common';
import { DrizzleService } from 'src/drizzle/drizzle.service';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ListProductsProductDao } from './dao/list-products-product.dao';

@Controller('/api/admin/products')
@ApiTags('admin', 'products')
export class ProductsAdminApiController {
  constructor(
    @Inject(DrizzleService)
    private readonly drizzleService: DrizzleService,
  ) {}

  @Get('/')
  @ApiOkResponse({
    isArray: true,
    type: ListProductsProductDao,
  })
  public async listProducts() {
    const products = await this.drizzleService.getDb().query.products.findMany({
      columns: {
        id: true,
        name: true,
        price: true,
        currencyIsoCode: true,
      },
    });
    return ListProductsProductDao.fromArray(products);
  }
}
