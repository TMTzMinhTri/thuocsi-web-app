import GetQuantityProductFromCart from 'utils/GetQuantityProductFromCart';
import { PRODUCT_API } from 'constants/APIUri';
import { GET, isValid } from './Clients';
import CartClient from './CartClient';
import { PAGE_SIZE } from '../constants/data';

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
  let cart = {};
  let productListWithQuantityInCart = {};
  try {
    cart = await CartClient.loadDataCart(ctx);
  } catch (error) {
    cart.status = 'ERROR';
  }
  const cartObject = {};
  // eslint-disable-next-line no-restricted-syntax
  if (cart && cart[0] && cart[0].cartItems && cart[0].cartItems.length > 0) {
    // eslint-disable-next-line no-restricted-syntax
    for (const item of cart[0].cartItems) {
      cartObject[item.sku] = item;
    }
    productListWithQuantityInCart = GetQuantityProductFromCart(result, cartObject);
  } else {
    productListWithQuantityInCart = result || [];
  }

  return productListWithQuantityInCart;
}

async function loadDataPormotion(ctx) {
  const res = await GET({ url: '/mock/product', mock: true, ctx });
  if (!isValid(res)) {
    return [];
  }
  return res.data;
}

async function loadDataProductCollection(ctx) {
  const url = `${PRODUCT_API.PRODUCT_LIST_COLLECTION}?q=MAIN_PAGE`;

  const result = await GET({
    url,
    ctx,
    isBasic: true,
  });

  return result;
}

async function loadDataProduct(ctx, isTotal) {
  const url = PRODUCT_API.PRODUCT_LIST;
  const params = {
    current_tab: ctx.query.current_tab ? ctx.query.current_tab : '',
    sortBy: ctx.query.sortBy ? ctx.query.sortBy : '',
    page: ctx.query.page || 0,
    q: ctx.query.q ? ctx.query.q : '',
    limit: PAGE_SIZE,
    getTotal: typeof isTotal !== 'undefined' ? isTotal : true,
  };

  const result = await GET({
    url,
    ctx,
    params,
    isBasic: true,
  });

  if (!isValid(result)) return result;
  let cart = {};
  let productListWithQuantityInCart = {};
  try {
    cart = await CartClient.loadDataCart(ctx);
  } catch (error) {
    cart.status = 'ERROR';
  }
  const cartObject = {};
  // eslint-disable-next-line no-restricted-syntax
  if (cart && cart[0] && cart[0].cartItems && cart[0].cartItems.length > 0) {
    // eslint-disable-next-line no-restricted-syntax
    for (const item of cart[0].cartItems) {
      cartObject[item.sku] = item;
    }
    productListWithQuantityInCart = GetQuantityProductFromCart(result, cartObject);
  } else {
    productListWithQuantityInCart = result || [];
  }

  return productListWithQuantityInCart;
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
  const url = `/ingredients/${slug}/products`;
  const res = await GET({ url, ctx, mock: true });
  if (!isValid(res)) {
    return [];
  }
  return res.data;
}

export default {
  loadDataMostSearch,
  loadFeedback,
  getInfoBanner,
  loadDataProduct,
  loadDataProductDetail,
  loadDataPormotion,
  loadDataIngredient,
  getIngredientBySlug,
  getProductsBySlug,
  loadDataProductCollection,
};
