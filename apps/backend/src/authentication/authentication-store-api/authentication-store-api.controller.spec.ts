import { Test, TestingModule } from '@nestjs/testing';
import { AuthenticationStoreApiController } from './authentication-store-api.controller';

describe('AuthenticationStoreApiController', () => {
  let controller: AuthenticationStoreApiController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthenticationStoreApiController],
    }).compile();

    controller = module.get<AuthenticationStoreApiController>(AuthenticationStoreApiController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
