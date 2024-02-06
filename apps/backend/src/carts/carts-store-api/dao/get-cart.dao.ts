import { ApiProperty } from '@nestjs/swagger';
import { Cart } from 'src/drizzle/models/cart.model';
import { LineItem } from 'src/drizzle/models/line-item.model';
import { Product } from 'src/drizzle/models/product.model';

type CartData = Pick<Cart, 'id'> & {
  lineItems: (Pick<LineItem, 'id' | 'quantity'> & {
    product: Pick<Product, 'id' | 'name' | 'price'>;
  })[];
};

class GetCartLineItemProductDao {
  constructor(product: CartData['lineItems'][number]['product']) {
    this.id = product.id;
    this.name = product.name;
    this.price = product.price;
  }

  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  price: number;

  @ApiProperty()
  currency: string;
}

class GetCartLineItemDao {
  constructor(lineItem: CartData['lineItems'][number]) {
    this.id = lineItem.id;
    this.quantity = lineItem.quantity;
    this.product = new GetCartLineItemProductDao(lineItem.product);
    this.subtotal = lineItem.quantity * lineItem.product.price;
  }

  @ApiProperty()
  id: number;

  @ApiProperty()
  quantity: number;

  @ApiProperty()
  subtotal: number;

  @ApiProperty({ type: GetCartLineItemProductDao })
  product: GetCartLineItemProductDao;
}

export class GetCartDao {
  constructor(cart: CartData, totalPrice: number) {
    this.id = cart.id;
    this.lineItems = cart.lineItems.map(
      (lineItem) => new GetCartLineItemDao(lineItem),
    );
    this.totalPrice = totalPrice;
    this.totalItems = cart.lineItems.reduce(
      (acc, lineItem) => acc + lineItem.quantity,
      0,
    );
  }

  @ApiProperty()
  id: number;

  @ApiProperty({ isArray: true, type: GetCartLineItemDao })
  lineItems: GetCartLineItemDao[];

  @ApiProperty()
  totalItems: number;

  @ApiProperty()
  totalPrice: number;
}
