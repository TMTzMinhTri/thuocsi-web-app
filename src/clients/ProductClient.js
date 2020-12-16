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
  const result = await GET({ url: '/product', mock: true, ctx });
  return result.data;
}

export default {
  loadDataMostSearch,
  loadFeedback,
  getInfoBanner,
  loadDataProduct,
};
