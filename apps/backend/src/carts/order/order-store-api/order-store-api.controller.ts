import {
  Controller,
  Inject,
  NotFoundException,
  Param,
  Post,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { getApiOperationId } from 'src/common/get-api-operation-id';
import { DrizzleService } from 'src/drizzle/drizzle.service';
import { orders } from 'src/drizzle/models/order.model';

@Controller('/api/store/carts/:cartId/order')
@ApiTags('carts', 'store')
export class OrderStoreApiController {
  constructor(
    @Inject(DrizzleService)
    private readonly drizzleService: DrizzleService,
  ) {}

  @Post()
  @ApiOperation({
    operationId: getApiOperationId({
      apiScope: 'store',
      verb: 'create',
      noun: 'cartOrder',
    }),
  })
  async createOrder(@Param('cartId') cartId: number) {
    const cart = await this.drizzleService.getDb().query.carts.findFirst({
      with: {
        lineItems: {
          with: {
            product: true,
          },
        },
      },
    });

    if (!cart) throw new NotFoundException('Cart not found');

    const totalPrice = cart.lineItems.reduce(
      (acc, lineItem) => acc + lineItem.product.price * lineItem.quantity,
      0,
    );

    const createdOrder = await this.drizzleService
      .getDb()
      .insert(orders)
      .values({
        cartId,
        total: totalPrice,
      })
      .returning({
        id: orders.id,
      });
    return createdOrder[0].id;
  }
}
