import { PRODUCT_API } from 'constants/APIUri';
import { GET, GET_ALL, isValid } from './Clients';

async function loadDataIngredient(ctx) {
  const res = await GET_ALL({ url: PRODUCT_API.INGREDIENT_LIST, ctx, isBasic: true });
  if (!isValid(res)) {
    return [];
  }
  return res.data;
}

async function getIngredientBySlug(ctx, slug) {
  const url = `${PRODUCT_API.INGREDIENT}/info`;
  const params = {
    q: slug,
  };
  const res = await GET({ url, params, ctx, isBasic: true });
  if (!isValid(res)) {
    return [];
  }
  return res.data;
}

async function getProductsBySlug(ctx, slug) {
  const url = PRODUCT_API.PRODUCT_LIST;
  const res = await GET({ url, ctx, isBasic: true, params: { ingredient: slug } });
  if (!isValid(res)) {
    return [];
  }
  return res.data;
}

export default {
  loadDataIngredient,
  getIngredientBySlug,
  getProductsBySlug,
};
