import { LoaderFunctionArgs, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { cartsStoreApiControllerAddItemToCart, storeGetProduct } from "@ecommerce/backend-client";

export async function loader({ params }: LoaderFunctionArgs) {
  console.log(params)
  const product = await storeGetProduct(
    parseInt(params.slug!, 10),
    {
      baseUrl: "http://localhost:3000",
    }
  )
  return json(product.data)
}

export default function ProductsDetailPage() {
  const product = useLoaderData<typeof loader>()
  const [quantity, setQuantity] = useState(1)
  const addToCartMutation = useMutation({
    async mutationFn() {
      cartsStoreApiControllerAddItemToCart(2, {
        productId: 1,
        quantity,
      }, {
        baseUrl: "http://localhost:3000",
      })
    }
  })
  return <div>
    {addToCartMutation.isSuccess &&
      <div>Added to cart!</div>
    }
    <h1>{product.name}</h1>
    <p>{product.price}</p>
    <input type="number" value={quantity} onChange={e => setQuantity(parseInt(e.target.value, 10))} />
    <button onClick={() => addToCartMutation.mutate()}>Add to cart</button>
  </div>
}