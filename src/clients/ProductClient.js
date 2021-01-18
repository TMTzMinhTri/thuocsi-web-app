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
  return result.data;
}

async function loadDataPormotion(ctx) {
  const res = await GET({ url: '/mock/product', mock: true, ctx });
  if (!isValid(res)) {
    return [];
  }
  return res.data;
}

async function loadDataProduct(ctx, isTotal) {
  const getTotal = typeof isTotal !== 'undefined' ? isTotal : true;
  const curentTab = ctx.query.current_tab ? ctx.query.current_tab : '';
  const sortBy = ctx.query.sortBy ? ctx.query.sortBy : '';
  const q = ctx.query.q ? ctx.query.q : '';
  const page = ctx.query.page - 1 || 0;
  const url = `/marketplace/product/v1/products/list?&current_tab=${curentTab}&sortBy=${sortBy}&offset=${page}&getTotal=${getTotal}&limit=${PAGE_SIZE}&q=${q}`;
  const result = await GET({
    url,
    ctx,
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
};
