import { GET } from './Clients';

async function searchKeywords(keyword) {
  const res = await GET({ url: `/marketplace/product/v1/products/list?q=${keyword}`, isAuth: true });
  return res.data;
}

export default {
  searchKeywords,
};
