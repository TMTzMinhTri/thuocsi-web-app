import { CATEGORY_API, PRODUCT_API } from 'constants/APIUri';
import { GetQuantityProductFromCart } from 'utils';
import { GET, isValid } from './Clients';
import CartClient from './CartClient';
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
async function loadProductWithCategory(ctx, isTotal) {
  const { query } = ctx;
  const url = PRODUCT_API.PRODUCT_LIST;
  const params = {
    category: query.slug || '',
    current_tab: ctx.query.current_tab ? ctx.query.current_tab : '',
    sortBy: ctx.query.sortBy ? ctx.query.sortBy : '',
    page: ctx.query.page || 0,
    q: ctx.query.q ? ctx.query.q : '',
    limit: PAGE_SIZE,
    getTotal: typeof isTotal !== 'undefined' ? isTotal : true,
  };
  const result = await GET({ url, ctx, params, isBasic: true });
  if (!isValid(result)) return result;

  let cart = {};
  let productListWithQuantityInCart = {};
  try {
    cart = await CartClient.loadDataCart(ctx);
  } catch (error) {
    cart.status = 'ERROR';
  }
  const cartObject = {};
  if (cart && cart[0] && cart[0].cartItems && cart[0].cartItems.length > 0) {
    // eslint-disable-next-line no-restricted-syntax
    for (const item of cart[0].cartItems) {
      cartObject[item.sku] = item;
    }
    productListWithQuantityInCart = GetQuantityProductFromCart.GetQuantity(result, cartObject);
  } else {
    productListWithQuantityInCart = result;
  }

  return productListWithQuantityInCart;
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
async function loadProductWithManufacturer(ctx, isTotal) {
  const { query } = ctx;
  const url = PRODUCT_API.PRODUCT_LIST;
  const params = {
    manufacturers: query.slug || '',
    current_tab: ctx.query.current_tab ? ctx.query.current_tab : '',
    sortBy: ctx.query.sortBy ? ctx.query.sortBy : '',
    page: ctx.query.page || 0,
    q: ctx.query.q ? ctx.query.q : '',
    limit: PAGE_SIZE,
    getTotal: typeof isTotal !== 'undefined' ? isTotal : true,
  };
  const result = await GET({ url, ctx, params, isBasic: true });
  if (!isValid(result)) return result;

  let cart = {};
  let productListWithQuantityInCart = {};
  try {
    cart = await CartClient.loadDataCart(ctx);
  } catch (error) {
    cart.status = 'ERROR';
  }
  const cartObject = {};
  if (cart && cart[0] && cart[0].cartItems && cart[0].cartItems.length > 0) {
    // eslint-disable-next-line no-restricted-syntax
    for (const item of cart[0].cartItems) {
      cartObject[item.sku] = item;
    }
    productListWithQuantityInCart = GetQuantityProductFromCart.GetQuantity(result, cartObject);
  } else {
    productListWithQuantityInCart = result;
  }

  return productListWithQuantityInCart;
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
