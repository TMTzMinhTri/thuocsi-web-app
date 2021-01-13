import GetQuantityProduct from 'utils/GetQuantityProduct';
import { PRODUCT_API } from 'constants/APIUri';
import { GET, isValid } from './Clients';

async function loadDataMostSearch(ctx) {
  const url = '/product/most-search';
  const result = await GET({ url, ctx });
  if (!isValid(result)) {
    return [];
  }
  return result.data;
}

async function loadFeedback() {
  const result = await GET({ url: '/feedback', mock: true });
  if (!isValid(result)) {
    return [];
  }
  return result.data;
}

async function getInfoBanner() {
  const result = await GET({ url: '/banner', mock: true });
  if (!isValid(result)) {
    return [];
  }
  return result.data;
}

// TODO  @truong
async function loadDataProductDetail(ctx) {
  const { query } = ctx;
  const url = `/marketplace/product/v1/products?q=${query.slug}`;
  const result = await GET({
    url,
    ctx,
    isAuth: true,
    isBasic: true,
  });
  if (!isValid(result)) {
    return [];
  }
  return result.data;
}

async function loadDataCart(ctx) {
  const res = await GET({ url: '/cart', mock: true, ctx });
  if (!isValid(res)) {
    return [];
  }
  return res.data;
}

async function loadDataPormotion(ctx) {
  const res = await GET({ url: '/mock/product', mock: true, ctx });
  if (!isValid(res)) {
    return [];
  }
  return res.data;
}

async function loadDataProduct(ctx) {
  const result = await GET({
    url: '/marketplace/product/v1/products/list',
    ctx,
    isAuth: true,
    isBasic: true,
  });
  if (!isValid(result)) return result;
  let cart = {};
  let productListWithPrice = {};
  try {
    cart = await loadDataCart();
  } catch (error) {
    cart.status = 'ERROR';
  }
  const cartObject = {};
  if (cart && cart.cartItems && cart.cartItems.length > 0) {
    // eslint-disable-next-line no-restricted-syntax
    for (const item of cart.cartItems) {
      cartObject[item.sku] = item;
    }
    productListWithPrice = GetQuantityProduct(result, cartObject);
  } else {
    productListWithPrice = result.data || [];
  }

  return productListWithPrice;
}
// TODO  @dat.le
async function loadDataIngredient(ctx) {
  const res = await GET({ url: PRODUCT_API.INGREDIENT_LIST, ctx, isBasic: true });
  if (!isValid(res)) {
    return [];
  }
  return res.data;
}

async function getIngredientBySlug(ctx, slug) {
  const url = `${PRODUCT_API.INGREDIENT}/info?q=${slug}`;
  const res = await GET({ url, ctx, isBasic: true });
  if (!isValid(res)) {
    return [];
  }
  return res.data;
}

async function getProductsBySlug(ctx, slug) {
  const url = `/ingredients/${slug}/products`;
  const res = await GET({ url, ctx, mock: true });
  if (isValid(res)) {
    return [];
  }
  return res.data;
}

export default {
  loadDataMostSearch,
  loadFeedback,
  getInfoBanner,
  loadDataProduct,
  loadDataCart,
  loadDataProductDetail,
  loadDataPormotion,
  loadDataIngredient,
  getIngredientBySlug,
  getProductsBySlug,
};
