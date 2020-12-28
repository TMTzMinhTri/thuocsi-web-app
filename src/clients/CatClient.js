import { CATEGORY_API } from 'constants/APIUri';
import { GET } from './Clients';

async function loadBrand() {
  const result = await GET({ url: CATEGORY_API.BRAND, mock: true });
  if (result.status === 'ERROR') return result;
  return result.data;
}
async function loadGroup() {
  const result = await GET({ url: CATEGORY_API.GROUP, mock: true });
  if (result.status === 'ERROR') return result;
  return result.data;
}
export default {
  loadBrand,
  loadGroup,
};
