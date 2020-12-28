import { CATEGORY_API } from 'constants/APIUri';
import { GET } from './Clients';

async function loadBrand() {
  const result = await GET({ url: CATEGORY_API.BRAND, mock: true });
  return result;
}
async function loadGroup() {
  const result = await GET({ url: CATEGORY_API.GROUP, mock: true });
  return result;
}
export default {
  loadBrand,
  loadGroup,
};
