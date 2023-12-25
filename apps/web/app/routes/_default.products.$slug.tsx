import { LoaderFunctionArgs, json } from "@remix-run/node";
import { useLoaderData, useRevalidator } from "@remix-run/react";
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
  const revalidator = useRevalidator()

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
  return <div className="mx-auto max-w-screen-lg">
    {addToCartMutation.isSuccess &&
      <div className="bg-emerald-400 text-emerald-50 px-4 py-2 rounded">Added to cart!</div>
    }
    <h1>{product.name}</h1>
    <p>{product.price}</p>
    <input type="number" value={quantity} onChange={e => setQuantity(parseInt(e.target.value, 10))} />
    <button onClick={async () => {
      await addToCartMutation.mutateAsync()
      revalidator.revalidate()
    }}>Add to cart</button>
  </div>
}