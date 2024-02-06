import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
  @ApiProperty()
  public email: string;

  @ApiProperty()
  public password: string;

  @ApiProperty()
  public firstName: string;

  @ApiProperty()
  public lastName: string;
}
