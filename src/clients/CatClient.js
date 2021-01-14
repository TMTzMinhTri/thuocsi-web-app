import { CATEGORY_API } from 'constants/APIUri';
import { GET, isValid } from './Clients';

async function loadBrand(ctx) {
  const res = await GET({ url: CATEGORY_API.BRAND, ctx });
  if (!isValid(res)) {
    return [];
  }
  return res.data;
}
async function loadGroup(ctx) {
  const res = await GET({ url: CATEGORY_API.GROUP, ctx });
  if (!isValid(res)) {
    return [];
  }
  return res.data;
}
export default {
  loadBrand,
  loadGroup,
};
