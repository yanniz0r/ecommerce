import { Module } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { AuthenticationStoreApiModule } from './authentication-store-api/authentication-store-api.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  providers: [AuthenticationService],
  imports: [
    AuthenticationStoreApiModule,
    JwtModule.register({
      global: true,
      secret: 'DEVELOPMENT_SECRET',
      signOptions: { expiresIn: '1d' },
    }),
  ],
})
export class AuthenticationModule {}
