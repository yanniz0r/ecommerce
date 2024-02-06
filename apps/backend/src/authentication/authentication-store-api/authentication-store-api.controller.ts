import { Body, Controller, Inject, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { getApiOperationId } from 'src/common/get-api-operation-id';
import { LoginDto } from './dto/login.dto';
import { LoginDao } from './dao/login.dao';
import { AuthenticationService } from '../authentication.service';
import { RegisterDto } from './dto/register.dto';

@Controller('/api/store/authentication')
@ApiTags('store', 'authentication')
export class AuthenticationStoreApiController {
  constructor(
    @Inject(AuthenticationService)
    private authenticationService: AuthenticationService,
  ) {}

  @Post('/register')
  @ApiOperation({
    operationId: getApiOperationId({
      apiScope: 'store',
      verb: 'register',
      noun: 'user',
    }),
  })
  public async registerUser(@Body() body: RegisterDto) {
    await this.authenticationService.registerCustomerWithEmailAndPassword({
      email: body.email,
      password: body.password,
      firstName: body.firstName,
      lastName: body.lastName,
    });
    return 'ok';
  }

  @Post('/login')
  @ApiOperation({
    operationId: getApiOperationId({
      apiScope: 'store',
      verb: 'login',
      noun: 'user',
    }),
  })
  @ApiCreatedResponse({
    type: LoginDao,
  })
  public async login(@Body() body: LoginDto) {
    const customer =
      await this.authenticationService.loginCustomerWithEmailAndPassword(
        body.email,
        body.password,
      );
    const token = this.authenticationService.createAuthToken(
      String(customer.id),
    );
    return new LoginDao(token);
  }
}
