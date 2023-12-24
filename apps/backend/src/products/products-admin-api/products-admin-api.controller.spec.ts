import { Test, TestingModule } from '@nestjs/testing';
import { ProductsAdminApiController } from './products-admin-api.controller';

describe('ProductsAdminApiController', () => {
  let controller: ProductsAdminApiController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductsAdminApiController],
    }).compile();

    controller = module.get<ProductsAdminApiController>(ProductsAdminApiController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
