import { json } from "@remix-run/node"
import { Link, useLoaderData, useRevalidator } from "@remix-run/react"
import { cartsStoreApiControllerGetCart } from "@ecommerce/backend-client"
import { RemoveLineItemButton } from "~/modules/cart/remove-line-item-button"

export async function loader() {
  const cart = await cartsStoreApiControllerGetCart(2, {
    baseUrl: "http://localhost:3000",
  })
  return json(cart.data)
}

export default function CartPage() {
  const cart = useLoaderData<typeof loader>()
  const revalidator = useRevalidator()

  return <div>
    <h1>Cart</h1>
    <ul>
      {cart.lineItems.map(item => (
        <li key={item.product.id}>
          <Link to={`/products/${item.product.id}`}>{item.product.name}</Link> x {item.quantity}
          <RemoveLineItemButton cartId={2} lineItemId={item.id} onRemoved={revalidator.revalidate} />
        </li>
      ))}
    </ul>
    <p>{cart.totalPrice / 100}€</p>
  </div>
}