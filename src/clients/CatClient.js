import { CATEGORY_API, PRODUCT_API } from 'constants/APIUri';
import { GET, isValid } from './Clients';

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

async function loadManufacturerInfoBySlug(ctx) {
  const { query } = ctx;
  const url = `${CATEGORY_API.MANUFACTURER_INFO}?q=${query.slug || ''}`;
  const res = await GET({ url, ctx, isBasic: true });
  if (!isValid(res)) {
    return [];
  }
  return res.data;
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
  loadCategoryInfoBySlug,
  loadManufacturerInfoBySlug,
  loadTags,
};
