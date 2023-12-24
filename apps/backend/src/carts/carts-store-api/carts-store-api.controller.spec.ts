import { Test, TestingModule } from '@nestjs/testing';
import { CartsStoreApiController } from './carts-store-api.controller';

describe('CartsStoreApiController', () => {
  let controller: CartsStoreApiController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CartsStoreApiController],
    }).compile();

    controller = module.get<CartsStoreApiController>(CartsStoreApiController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
