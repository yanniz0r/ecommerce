import { ApiProperty } from '@nestjs/swagger';

export class InitCartDao {
  constructor(id: string, authToken: string) {
    this.id = id;
    this.authToken = authToken;
  }

  @ApiProperty({
    description: 'The id of the cart for further access and manipulation',
  })
  id: string;

  @ApiProperty({
    description: 'The auth token to authenticate each cart request',
    default: '2840ab9d-1fb1-4214-b44a-a26b1ea31fc7',
  })
  authToken: string;
}
