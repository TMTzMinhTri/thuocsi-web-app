import { CATEGORY_API, PRODUCT_API } from 'constants/APIUri';
import { GET, isValid } from './Clients';
import { PAGE_SIZE } from '../constants/data';

async function loadBrand(ctx) {
  const res = await GET({ url: CATEGORY_API.BRAND, ctx, isBasic: true });
  if (!isValid(res)) {
    return [];
  }
  return res.data;
}
async function loadGroup(ctx) {
  const res = await GET({ url: CATEGORY_API.GROUP, ctx, isBasic: true });
  if (!isValid(res)) {
    return [];
  }
  return res.data;
}
async function loadCategoryInfoBySlug(ctx) {
  const { query } = ctx;
  const url = `${CATEGORY_API.CATEGORY_INFO}?q=${query.slug || ''}`;
  const res = await GET({ url, ctx, isBasic: true });
  if (!isValid(res)) {
    return [];
  }
  return res.data;
}
async function loadProductWithCategory(ctx) {
  const { query } = ctx;
  const page = query.page - 1 || 0;
  const slug = query.slug || '';
  const currentTab = query.current_tab || '';
  const sortBy = query.sortBy || '';
  const url = `${PRODUCT_API.PRODUCT_LIST}?category=${slug}&current_tab=${currentTab}&sortBy=${sortBy}&offset=${page}&getTotal=true&limit=${PAGE_SIZE}`;
  const res = await GET({
    url,
    ctx,
    isBasic: true,
  });
  if (!isValid(res)) {
    return [];
  }
  return res;
}
async function loadManufacturerInfoBySlug(ctx) {
  const { query } = ctx;
  const url = `${CATEGORY_API.MANUFACTURER_INFO}?q=${query.slug || ''}`;
  const res = await GET({ url, ctx, isBasic: true });
  if (!isValid(res)) {
    return [];
  }
  return res.data;
}
async function loadProductWithManufacturer(ctx) {
  const { query } = ctx;
  const page = query.page - 1 || 0;
  const slug = query.slug || '';
  const currentTab = query.current_tab || '';
  const sortBy = query.sortBy || '';
  const url = `${PRODUCT_API.PRODUCT_LIST}?manufacturers=${slug}&current_tab=${currentTab}&sortBy=${sortBy}&offset=${page}&getTotal=true&limit=${PAGE_SIZE}`;
  const res = await GET({
    url,
    ctx,
    isBasic: true,
  });
  if (!isValid(res)) {
    return [];
  }
  return res;
}
async function loadTags(ctx) {
  const url = PRODUCT_API.TAGS;
  const res = await GET({
    url,
    ctx,
    isBasic: true,
  });
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
  loadManufacturerInfoBySlug,
  loadProductWithManufacturer,
  loadTags,
};
