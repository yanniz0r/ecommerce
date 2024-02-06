import type { MetaFunction } from "@remix-run/node";
import { Link, json, useLoaderData } from "@remix-run/react";
import { backendClient } from "~/modules/backend-client";
import { formatPrice } from "~/modules/price/format-price";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export async function loader() {
  const products = await backendClient.storeListProducts()
  return json({ products: products.data });
}

export default function Index() {
  const { products } = useLoaderData<typeof loader>();
  return (
    <div className="mx-auto max-w-screen-lg pt-4">
      <ul className="grid grid-cols-4 gap-2">
        {products.map(product => (
          <li key={product.id}>
            <Link
              to={`/products/${product.id}`}
              rel="noreferrer"
            >
              <div className="rounded overflow-hidden shadow" >
                <img src={product.imageUrl} alt={product.name} />
                <div className="p-4">
                  <h2 className="font-semibold">{product.name}</h2>
                  <small>{formatPrice(product.price, "€")}</small>
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
