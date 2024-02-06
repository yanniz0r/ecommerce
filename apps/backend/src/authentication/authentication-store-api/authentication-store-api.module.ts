import { Module } from '@nestjs/common';
import { AuthenticationStoreApiController } from './authentication-store-api.controller';
import { AuthenticationService } from '../authentication.service';

@Module({
  controllers: [AuthenticationStoreApiController],
  providers: [AuthenticationService],
})
export class AuthenticationStoreApiModule {}
