import { CATEGORY_API } from 'constants/APIUri';
import { GET, isValid } from './Clients';

async function loadBrand() {
  const res = await GET({ url: CATEGORY_API.BRAND, isBasic: true });
  if (!isValid(res)) {
    return [];
  }
  return res.data;
}
async function loadGroup() {
  const res = await GET({ url: CATEGORY_API.GROUP, isBasic: true });
  if (!isValid(res)) {
    return [];
  }
  return res.data;
}
export default {
  loadBrand,
  loadGroup,
};
