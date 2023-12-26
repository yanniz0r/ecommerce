import { Controller, Get, Inject } from '@nestjs/common';
import { DrizzleService } from 'src/drizzle/drizzle.service';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ListProductsProductDao } from './dao/list-products-product.dao';
import { getApiOperationId } from 'src/common/get-api-operation-id';

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
  @ApiOperation({
    operationId: getApiOperationId({
      apiScope: 'admin',
      verb: 'list',
      noun: 'products',
    }),
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
}
