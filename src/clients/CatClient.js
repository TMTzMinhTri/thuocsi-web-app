import { PRODUCT_API } from 'constants/APIUri';
import { GET, isValid } from './Clients';

async function loadBrand(ctx) {
  const res = await GET({ url: PRODUCT_API.MANUFACTURER, ctx, isBasic: true });
  if (!isValid(res)) {
    return [];
  }
  return res.data;
}
async function loadGroup(ctx) {
  const res = await GET({ url: PRODUCT_API.CATEGORY_LIST, ctx, isBasic: true });
  if (!isValid(res)) {
    return [];
  }
  return res.data;
}
async function loadCategoryInfoBySlug(ctx) {
  const { query } = ctx;
  const url = `${PRODUCT_API.CATEGORY_INFO}?q=${query.slug || ''}`;
  const res = await GET({ url, ctx, isBasic: true });
  if (!isValid(res)) {
    return [];
  }
  return res.data;
}

async function loadManufacturerInfoBySlug(ctx) {
  const { query } = ctx;
  const url = `${PRODUCT_API.MANUFACTURER_INFO}?q=${query.slug || ''}`;
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
