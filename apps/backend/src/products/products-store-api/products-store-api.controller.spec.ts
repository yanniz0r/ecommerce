import { Test, TestingModule } from '@nestjs/testing';
import { ProductsStoreApiController } from './products-store-api.controller';

describe('ProductsStoreApiController', () => {
  let controller: ProductsStoreApiController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductsStoreApiController],
    }).compile();

    controller = module.get<ProductsStoreApiController>(ProductsStoreApiController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
