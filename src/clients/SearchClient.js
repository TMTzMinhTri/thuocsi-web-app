import { GET, isValid } from './Clients';

// TODO: update search fuzzy
async function searchKeywords(keyword) {
  const url = `/marketplace/product/v1/search/fuzzy?q=${keyword}`;
  const res = await GET({ url });
  if (!isValid(res)) {
    return [];
  }
  return res.data;
}

export default {
  searchKeywords,
};
