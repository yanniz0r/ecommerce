import { ApiProperty } from '@nestjs/swagger';
import { Product } from '../../../drizzle/models/product.model';

type ProductData = Pick<Product, 'name' | 'id' | 'price' | 'imageUrl'>;

export class ListProductsProductDao {
  constructor(product: ProductData) {
    this.id = product.id;
    this.name = product.name;
    this.price = product.price;
    this.imageUrl = product.imageUrl;
  }

  static fromArray(products: ProductData[]) {
    return products.map((product) => new ListProductsProductDao(product));
  }

  @ApiProperty()
  public currency: string;

  @ApiProperty()
  public price: number;

  @ApiProperty()
  public id: number;

  @ApiProperty()
  public name: string;

  @ApiProperty()
  public imageUrl: string;
}
