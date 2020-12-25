import { GET } from './Clients';

async function loadBrand(ctx) {
  const url = '/cat/brand';
  const result = await GET({ url, mock: true, ctx });
  return result.data;
}
async function loadGroup(ctx) {
  const url = '/cat/group';
  const result = await GET({ url, mock: true, ctx });
  return result.data;
}
export default {
  loadBrand,
  loadGroup,
};
