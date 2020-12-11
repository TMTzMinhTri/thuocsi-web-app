import { GET } from './Clients';

async function loadDataMostSearch() {
  const url = '/product/most-search';
  const result = await GET({ url, mock: true });
  return result.data;
}

async function loadFeedback() {
  const result = await GET({ url: '/feedback', mock: true });
  return result.data;
}

async function getInfoBanner() {
  const result = await GET({ url: '/banner', mock: true });
  return result.data;
}

async function loadDataProduct() {
  const result = await GET({ url: '/product', mock: true });
  return result.data;
}

export default {
  loadDataMostSearch,
  loadFeedback,
  getInfoBanner,
  loadDataProduct,
};
