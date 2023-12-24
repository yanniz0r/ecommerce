import { ApiProperty } from '@nestjs/swagger';

export class AddLineItemDto {
  @ApiProperty()
  productId: number;

  @ApiProperty()
  quantity: number;
}
