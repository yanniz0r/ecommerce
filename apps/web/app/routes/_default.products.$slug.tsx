import { LoaderFunctionArgs, json } from "@remix-run/node";
import { useLoaderData, useRevalidator } from "@remix-run/react";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { cartsStoreApiControllerAddItemToCart, storeGetProduct } from "@ecommerce/backend-client";
import { formatPrice } from "~/modules/price/format-price";

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
  return <div className="mx-auto max-w-screen-lg pt-4">
    {addToCartMutation.isSuccess &&
      <div className="bg-emerald-400 text-emerald-50 px-4 py-2 rounded mb-4">Added to cart!</div>
    }
    <div className="grid grid-cols-2 gap-4 items-center">
      <img src={product.imageUrl} alt={product.name} className="rounded" />
      <div className="flex flex-col gap-4">
        <h1 className="text-4xl tracking-tighter font-semibold">{product.name}</h1>
        <p>{formatPrice(product.price, product.currency)}</p>
        <div className="flex gap-2">
          <input type="number" value={quantity} onChange={e => setQuantity(parseInt(e.target.value, 10))} className="border-2 rounded px-1.5 w-14" />
          <button className="bg-slate-900 rounded text-slate-200 px-2" onClick={async () => {
            await addToCartMutation.mutateAsync()
            revalidator.revalidate()
          }}>Add to cart</button>
        </div>
      </div>
    </div>
  </div>
}