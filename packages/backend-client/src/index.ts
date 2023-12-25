/**
 * Ecommerc
 * 1.0
 * DO NOT MODIFY - This file has been generated using oazapfts.
 * See https://www.npmjs.com/package/oazapfts
 */
import * as Oazapfts from "oazapfts/lib/runtime";
import * as QS from "oazapfts/lib/runtime/query";
export const defaults: Oazapfts.RequestOpts = {
    baseUrl: "/",
};
const oazapfts = Oazapfts.runtime(defaults);
export const servers = {};
export type ListProductsProductDao = {
    currency: string;
    price: number;
    id: number;
    name: string;
};
export type InitCartDao = {
    /** The id of the cart for further access and manipulation */
    id: number;
    /** The auth token to authenticate each cart request */
    authToken: string;
};
export type GetCartLineItemProductDao = {
    id: number;
    name: string;
    price: number;
    currency: string;
};
export type GetCartLineItemDao = {
    id: number;
    quantity: number;
    product: GetCartLineItemProductDao;
};
export type GetCartDao = {
    id: number;
    lineItems: GetCartLineItemDao[];
    totalPrice: number;
};
export type AddLineItemDto = {
    productId: number;
    quantity: number;
};
export function appControllerGetHello(opts?: Oazapfts.RequestOpts) {
    return oazapfts.fetchText("/", {
        ...opts
    });
}
export function productsAdminApiControllerListProducts(opts?: Oazapfts.RequestOpts) {
    return oazapfts.fetchJson<{
        status: 200;
        data: ListProductsProductDao[];
    }>("/api/admin/products", {
        ...opts
    });
}
export function storeListProducts(opts?: Oazapfts.RequestOpts) {
    return oazapfts.fetchJson<{
        status: 200;
        data: ListProductsProductDao[];
    }>("/api/store/products", {
        ...opts
    });
}
export function storeGetProduct(productId: number, opts?: Oazapfts.RequestOpts) {
    return oazapfts.fetchJson<{
        status: 200;
        data: ListProductsProductDao;
    }>(`/api/store/products/${encodeURIComponent(productId)}`, {
        ...opts
    });
}
export function cartsStoreApiControllerCreateCart(opts?: Oazapfts.RequestOpts) {
    return oazapfts.fetchJson<{
        status: 201;
        data: InitCartDao;
    }>("/api/store/carts", {
        ...opts,
        method: "POST"
    });
}
export function cartsStoreApiControllerGetCart(cartId: number, opts?: Oazapfts.RequestOpts) {
    return oazapfts.fetchJson<{
        status: 200;
        data: GetCartDao;
    }>(`/api/store/carts/${encodeURIComponent(cartId)}`, {
        ...opts
    });
}
export function cartsStoreApiControllerAddItemToCart(cartId: number, addLineItemDto: AddLineItemDto, opts?: Oazapfts.RequestOpts) {
    return oazapfts.fetchJson<{
        status: 201;
        data: GetCartDao;
    }>(`/api/store/carts/${encodeURIComponent(cartId)}/line-items`, oazapfts.json({
        ...opts,
        method: "POST",
        body: addLineItemDto
    }));
}
export function cartsStoreApiControllerDeleteItemFromCart(cartId: number, lineItemId: number, opts?: Oazapfts.RequestOpts) {
    return oazapfts.fetchText(`/api/store/carts/${encodeURIComponent(cartId)}/line-items/${encodeURIComponent(lineItemId)}`, {
        ...opts,
        method: "DELETE"
    });
}
export function orderStoreApiControllerCreateOrder(cartId: number, opts?: Oazapfts.RequestOpts) {
    return oazapfts.fetchText(`/api/store/carts/${encodeURIComponent(cartId)}/order`, {
        ...opts,
        method: "POST"
    });
}

