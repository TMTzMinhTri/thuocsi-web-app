import { PAGE_SIZE } from 'constants/data';
import { GET, isValid } from './Clients';

async function searchKeywords(keyword) {
  const url = `/marketplace/product/v1/search?q=${keyword}`;
  const res = await GET({ url });
  if (!isValid(res)) {
    return [];
  }
  return res.data;
}

async function searchProducts(keyword, page) {
  const url = '/marketplace/product/v1/products/list';
  const params = {
    page,
    q: keyword,
    limit: PAGE_SIZE,
    getTotal: true,
  };
  const res = await GET({ url, params });
  if (!isValid(res)) {
    return [];
  }
  return res;
}

export default {
  searchKeywords,
  searchProducts,
};
