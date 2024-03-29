import { json } from "@remix-run/node"
import { Link, useLoaderData, useRevalidator } from "@remix-run/react"
import { RemoveLineItemButton } from "~/modules/cart/remove-line-item-button"
import { backendClient } from "~/modules/backend-client"

export async function loader() {
  const cart = await backendClient.storeGetCart(2)
  return json(cart.data)
}

export default function CartPage() {
  const cart = useLoaderData<typeof loader>()
  const revalidator = useRevalidator()

  return <div>
    <h1>Cart</h1>
    <table>
      <tbody className="divide-y">
        {cart.lineItems.map(item => (
          <tr key={item.id}>
            <td className="py-2 px-2.5">
              <Link to={`/products/${item.product.id}`}>{item.product.name}</Link>
            </td>
            <td className="py-2 px-2.5">
              {item.quantity}
            </td>
            <td className="py-2 px-2.5">
              <RemoveLineItemButton cartId={2} lineItemId={item.id} onRemoved={revalidator.revalidate} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    <p>{cart.totalPrice / 100}€</p>
  </div>
}