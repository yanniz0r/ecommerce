import type { MetaFunction } from "@remix-run/node";
import { Link, json, useLoaderData } from "@remix-run/react";
import { storeListProducts } from "@ecommerce/backend-client";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export async function loader() {
  const products = await storeListProducts({
    baseUrl: "http://localhost:3000",
  })
  return json({ products: products.data });
}

export default function Index() {
  const { products } = useLoaderData<typeof loader>();
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
      <h1>Welcome to Remix</h1>
      <ul>
        {products.map(product => (
          <li key={product.id}>
            <Link
              to={`/products/${product.id}`}
              rel="noreferrer"
            >
              {product.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
