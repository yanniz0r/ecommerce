import * as openApiOperations from './open-api-operations';

export class BackendClient {
  constructor(private baseUrl: string) {}

  storeGetCart(cartId: number) {
    return openApiOperations.storeGetCart(
      cartId,
      this.requestOptions
    ) 
  }

  storeListProducts() {
    return openApiOperations.storeListProducts(
      this.requestOptions
    )
  }

  storeDeleteCartLineItem(cartId: number, lineItemId: number) {
    return openApiOperations.storeDeleteCartLineItem(
      cartId,
      lineItemId,
      this.requestOptions
    ) 
  }

  storeAddLineItem(cartId: number, lineItem: openApiOperations.AddLineItemDto) {
    return openApiOperations.storeCreateCartLineItem(
      cartId,
      lineItem,
      this.requestOptions
    ) 
  }

  storeGetProduct(productId: number) {
    return openApiOperations.storeGetProduct(
      productId,
      this.requestOptions
    ) 
  }
  
  private get requestOptions() {
    return {
      baseUrl: this.baseUrl,
    }
  }
}