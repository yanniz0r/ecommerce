import { Body, Controller, Get, Inject, Param, Post } from '@nestjs/common';
import { AddLineItemDto } from './dto/add-line-item.dto';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { GetCartDao } from './dao/get-cart.dao';
import { CartsService } from '../carts.service';
import { randomUUID } from 'crypto';
import { InitCartDao } from './dao/init-cart.dao';

@Controller('/api/store/carts')
@ApiTags('carts', 'store')
export class CartsStoreApiController {
  constructor(
    @Inject(CartsService)
    private readonly cartsService: CartsService,
  ) {}

  @Post()
  @ApiCreatedResponse({
    type: InitCartDao,
  })
  async createCart() {
    const authToken = randomUUID(); // TODO this should be part of the carts service
    const id = this.cartsService.initCart();
    return new InitCartDao(String(id), authToken);
  }

  @Get('/:cartId')
  @ApiOkResponse({
    type: GetCartDao,
  })
  async getCart(@Param('cartId') cartId: number) {
    const cart = await this.cartsService.cartsTable.findFirst({
      where: (cart, { eq }) => eq(cart.id, cartId),
      with: {
        lineItems: {
          columns: {
            quantity: true,
          },
          with: {
            product: {
              columns: {
                id: true,
                name: true,
                price: true,
                currencyIsoCode: true,
              },
            },
          },
        },
      },
    });

    const totalPrice = cart.lineItems.reduce(
      (acc, lineItem) => acc + lineItem.quantity * lineItem.product.price,
      0,
    );

    return new GetCartDao(cart, totalPrice);
  }

  @Post('/:cartId/line-items')
  @ApiCreatedResponse({
    type: GetCartDao,
  })
  async addItemToCart(
    @Param('cartId') cartId: number,
    @Body() addLineItemBody: AddLineItemDto,
  ) {
    await this.cartsService.assertCartNotOrdered(cartId);
    await this.cartsService.addLineItemToCart(
      cartId,
      addLineItemBody.productId,
      addLineItemBody.quantity,
    );
    const cart = await this.cartsService.cartsTable.findFirst({
      where: (cart, { eq }) => eq(cart.id, cartId),
      with: {
        lineItems: {
          columns: {
            quantity: true,
          },
          with: {
            product: {
              columns: {
                id: true,
                name: true,
                price: true,
                currencyIsoCode: true,
              },
            },
          },
        },
      },
    });

    const totalPrice = cart.lineItems.reduce(
      (acc, lineItem) => acc + lineItem.quantity * lineItem.product.price,
      0,
    );

    return new GetCartDao(cart, totalPrice);
  }
}
