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
  const result = await GET({ url: '/marketplace/product/v1/products', ctx, isAuth: true });
  const cart = await loadDataCart();
  const cartObject = {};

  // eslint-disable-next-line no-restricted-syntax
  for (const item of cart.product) {
    cartObject[item.sku] = item;
  }

  const productListWithPrice = GetQuantityProduct(result, cartObject);
  return productListWithPrice;
}
export default {
  loadDataMostSearch,
  loadFeedback,
  getInfoBanner,
  loadDataProduct,
  loadDataCart,
};
