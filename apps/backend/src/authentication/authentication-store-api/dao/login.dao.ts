import { ApiProperty } from '@nestjs/swagger';

export class LoginDao {
  constructor(token: string) {
    this.token = token;
  }

  @ApiProperty()
  public token: string;
}
