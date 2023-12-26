import { Controller, Get, Inject, Param } from '@nestjs/common';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { DrizzleService } from 'src/drizzle/drizzle.service';
import { ListProductsProductDao } from '../products-admin-api/dao/list-products-product.dao';

@Controller('/api/store/products')
export class ProductsStoreApiController {
  constructor(
    @Inject(DrizzleService)
    private readonly drizzleService: DrizzleService,
  ) {}

  @Get('/')
  @ApiOkResponse({
    isArray: true,
    type: ListProductsProductDao,
  })
  @ApiOperation({
    operationId: 'storeListProducts',
  })
  public async listProducts() {
    const products = await this.drizzleService.getDb().query.products.findMany({
      columns: {
        id: true,
        name: true,
        price: true,
        currencyIsoCode: true,
        imageUrl: true,
      },
    });
    return ListProductsProductDao.fromArray(products);
  }

  @Get('/:productId')
  @ApiOkResponse({
    type: ListProductsProductDao,
  })
  @ApiOperation({
    operationId: 'storeGetProduct',
  })
  public async getProduct(@Param('productId') productId: number) {
    const product = await this.drizzleService.getDb().query.products.findFirst({
      columns: {
        id: true,
        name: true,
        price: true,
        currencyIsoCode: true,
        imageUrl: true,
      },
      where: (product, { eq }) => eq(product.id, productId),
    });
    return new ListProductsProductDao(product);
  }
}
