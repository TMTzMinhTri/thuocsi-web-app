import { GET } from './Clients';

async function searchKeywords(ctx) {
  const res = await GET({ url: '/mock/search', mock: true, ctx });
  return res.data;
}

export default {
  searchKeywords,
};
