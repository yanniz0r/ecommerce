import { ApiProperty } from '@nestjs/swagger';
import { Cart } from 'src/drizzle/models/cart.model';
import { LineItem } from 'src/drizzle/models/line-item.model';
import { Product } from 'src/drizzle/models/products.model';

type CartData = Pick<Cart, 'id'> & {
  lineItems: (Pick<LineItem, 'quantity'> & {
    product: Pick<Product, 'id' | 'name' | 'price' | 'currencyIsoCode'>;
  })[];
};

class GetCartLineItemProductDao {
  constructor(product: CartData['lineItems'][number]['product']) {
    this.id = `product-${product.id}`;
    this.name = product.name;
    this.price = product.price;
    this.currency = product.currencyIsoCode;
  }

  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  price: number;

  @ApiProperty()
  currency: string;
}

class GetCartLineItemDao {
  constructor(lineItem: CartData['lineItems'][number]) {
    this.quantity = lineItem.quantity;
    this.product = new GetCartLineItemProductDao(lineItem.product);
  }

  @ApiProperty()
  quantity: number;

  @ApiProperty({ type: GetCartLineItemProductDao })
  product: GetCartLineItemProductDao;
}

export class GetCartDao {
  constructor(cart: CartData, totalPrice: number) {
    this.id = `cart-${cart.id}`;
    this.lineItems = cart.lineItems.map(
      (lineItem) => new GetCartLineItemDao(lineItem),
    );
    this.totalPrice = totalPrice;
  }

  @ApiProperty()
  id: string;

  @ApiProperty({ isArray: true, type: GetCartLineItemDao })
  lineItems: GetCartLineItemDao[];

  @ApiProperty()
  totalPrice: number;
}
