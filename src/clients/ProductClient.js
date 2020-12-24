import GetQuantityProduct from 'utils/GetQuantityProduct';
import { GET } from './Clients';

async function loadDataMostSearch(ctx) {
  const url = '/product/most-search';
  const result = await GET({ url, ctx });
  return result.data;
}

async function loadFeedback(ctx) {
  const result = await GET({ url: '/feedback', mock: true, ctx });
  return result.data;
}

async function getInfoBanner(ctx) {
  const result = await GET({ url: '/banner', mock: true, ctx });
  return result.data;
}

async function loadDataCart(ctx) {
  const res = await GET({ url: '/cart', mock: true, ctx });
  return res.data;
}

async function loadDataProduct(ctx) {
  const result = await GET({ url: '/marketplace/product/v1/products', ctx, isAuth: true, mock2: true });
  let cart = {};
  let productListWithPrice = {};
  try {
    cart = await loadDataCart();
  } catch (error) {
    cart.status = 'ERROR';
  }
  const cartObject = {};
  // eslint-disable-next-line no-restricted-syntax
  if (cart && cart.cartItems && cart.cartItems.length > 0 && result.status === 'OK') {
    for (const item of cart.cartItems) {
      cartObject[item.sku] = item;
    }
    productListWithPrice = GetQuantityProduct(result, cartObject);
  } else {
    productListWithPrice = result.data;
  }

  return productListWithPrice;
}
export default {
  loadDataMostSearch,
  loadFeedback,
  getInfoBanner,
  loadDataProduct,
  loadDataCart,
};
