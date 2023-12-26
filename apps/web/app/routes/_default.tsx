import type { MetaFunction } from "@remix-run/node";
import { Link, json, useLoaderData, Outlet } from "@remix-run/react";
import { backendClient } from "~/modules/backend-client";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export async function loader() {
  const cart = await backendClient.storeGetCart(2);
  return json({ cart: cart.data });
}

export default function Index() {
  const { cart } = useLoaderData<typeof loader>();
  return (
    <div>
      <div className="flex px-8 py-4 bg-slate-900 text-white">
        <h1 className="text-slate-200">Ecommerce</h1>
        <div className="flex-1"></div>
        <div>
          <Link to="/cart">Warenkorb ({cart.totalItems})</Link>
        </div>
      </div>
      <Outlet />
    </div>
  );
}
