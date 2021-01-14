import { GET, POST, PUT, isValid } from './Clients';

async function loadDataCart(ctx) {
  const res = await GET({ url: '/marketplace/order/v1/cart', isAuth: true, ctx });
  if (!isValid(res)) {
    return [];
  }
  return res.data;
}

async function updateCartItem(data) {
  const body = {
    sku: data.product.skuId,
    quantity: data.q,
  };
  return POST({ url: '/marketplace/order/v1/cart/add', body });
}

async function removeCartItem(data) {
  const body = {
    skuId: data.skuId,
  };
  return PUT({ url: '/marketplace/order/v1/cart/remove', body });
}
export default {
  loadDataCart,
  updateCartItem,
  removeCartItem,
};
