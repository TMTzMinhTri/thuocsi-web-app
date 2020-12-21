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

async function loadDataProduct(ctx) {
  const result = await GET({ url: '/marketplace/product/v1/products', ctx, isAuth: true });
  console.log('res', result);
  return result.data;
}

async function loadDataCart(ctx) {
  const res = await GET({ url: '/cart', mock: true, ctx });
  return res.data;
}
export default {
  loadDataMostSearch,
  loadFeedback,
  getInfoBanner,
  loadDataProduct,
  loadDataCart,
};
