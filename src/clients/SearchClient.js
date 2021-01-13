import { GET, isValid } from './Clients';

async function searchKeywords(keyword) {
  const res = await GET({ url: `/marketplace/product/v1/products/list?q=${keyword}`, isAuth: true });
  if (!isValid(res)) {
    return [];
  }
  return res.data;
}

export default {
  searchKeywords,
};
