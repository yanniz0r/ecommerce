import {
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { eq, and } from 'drizzle-orm';
import { DrizzleService } from 'src/drizzle/drizzle.service';
import { carts } from 'src/drizzle/models/cart.model';
import { lineItems } from 'src/drizzle/models/line-item.model';

@Injectable()
export class CartsService {
  constructor(
    @Inject(DrizzleService)
    private readonly drizzleService: DrizzleService,
  ) {}

  async initCart() {
    const createdCart = await this.drizzleService
      .getDb()
      .insert(carts)
      .values({})
      .returning({
        id: carts.id,
      });
    return createdCart[0].id;
  }

  /**
   * Checks if a cart can be modified and throws an error otherwise
   */
  async assertCartNotOrdered(cartId: number) {
    const cart = await this.drizzleService.getDb().query.carts.findFirst({
      where: (cart, { eq }) => eq(cart.id, cartId),
      with: {
        order: true,
      },
    });

    if (cart.order) {
      throw new ConflictException('Cart already ordered');
    }
  }

  /**
   * Adds a line item to a cart or updates the quantity if the product is already in the cart
   */
  async addLineItemToCart(cartId: number, productId: number, quantity: number) {
    const product = await this.drizzleService.getDb().query.products.findFirst({
      where: (product, { eq }) => eq(product.id, productId),
      columns: {
        price: true,
        currencyIsoCode: true,
      },
    });
    if (!product) throw new NotFoundException('Product not found');
    const productPrice = product.price;
    await this.drizzleService.getDb().insert(lineItems).values({
      cartId,
      productId,
      quantity,
      productPrice,
    });
  }

  /**
   * Removes a line item from a cart
   */
  async removeLineItemFromCart(cartId: number, lineItemId: number) {
    await this.drizzleService
      .getDb()
      .delete(lineItems)
      .where(and(eq(lineItems.id, lineItemId), eq(lineItems.cartId, cartId)));
  }

  get cartsTable() {
    return this.drizzleService.getDb().query.carts;
  }
}
