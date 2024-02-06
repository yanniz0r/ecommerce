import { Test, TestingModule } from '@nestjs/testing';
import { CurrentCustomerStoreApiController } from './current-customer-store-api.controller';

describe('CurrentCustomerStoreApiController', () => {
  let controller: CurrentCustomerStoreApiController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CurrentCustomerStoreApiController],
    }).compile();

    controller = module.get<CurrentCustomerStoreApiController>(CurrentCustomerStoreApiController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
