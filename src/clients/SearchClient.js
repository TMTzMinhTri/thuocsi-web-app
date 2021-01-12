import { GET, isValid } from './Clients';

async function searchKeywords(ctx) {
  const res = await GET({ url: '/mock/search', mock: true, ctx });
  if (!isValid(res)) {
    return [];
  }
  return res.data;
}

export default {
  searchKeywords,
};
