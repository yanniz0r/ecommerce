import { Controller, Get, Req, Request, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthenticationGuard } from 'src/authentication/authentication-guard';

@Controller('/api/store/customers/current-customer')
@ApiBearerAuth()
export class CurrentCustomerStoreApiController {
  @Get('/')
  @UseGuards(AuthenticationGuard)
  @ApiTags('store', 'customers')
  public async getCurrentCustomer(@Req() request: Request) {
    console.log(request);
    return 'ok';
  }
}
