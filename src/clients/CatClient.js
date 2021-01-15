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
async function loadCategoryInfoBySlug(ctx) {
  const { query } = ctx;
  const res = await GET({ url: `${CATEGORY_API.CATEGORY_INFO}?q=${query.slug}`, ctx });
  if (!isValid(res)) {
    return [];
  }
  return res.data;
}
async function loadProductWithCategory(ctx) {
  const { query } = ctx;
  const res = await GET({ url: `${CATEGORY_API.PRODUCT_LIST}?category=${query.slug}&current_tab=${query.current_tab}&sortBy=${query.sortBy}`, ctx });
  if (!isValid(res)) {
    return [];
  }
  return res.data;
}
export default {
  loadBrand,
  loadGroup,
  loadProductWithCategory,
  loadCategoryInfoBySlug,
};
