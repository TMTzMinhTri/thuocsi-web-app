import { GetQuantityProductFromCart } from 'utils';
import { PRODUCT_API } from 'constants/APIUri';
import { GET, isValid } from './Clients';
import CartClient from './CartClient';

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

async function getMenu() {
  const result = await GET({ url: '/menu', mock: true });
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

async function loadDataProductCollection(ctx) {
  const url = `${PRODUCT_API.PRODUCT_LIST_COLLECTION}?q=MAIN_PAGE`;

  const result = await GET({ url, ctx, isBasic: true });
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

    productListWithQuantityInCart = GetQuantityProductFromCart.GetQuantity2(result, cartObject);
  } else {
    productListWithQuantityInCart = result.data || [];
  }

  return productListWithQuantityInCart;
}

// TODO  @dat.le
async function loadDataManufacturer(ctx) {
  const res = await GET({ url: PRODUCT_API.MANUFACTURER_LIST, ctx, isBasic: true });
  if (!isValid(res)) {
    return [];
  }
  return res.data;
}

// fix limit 20 of tabs
export const getTabs = async ({ ctx }) =>
  GET({ url: PRODUCT_API.TABS_ACTIVE, params: { limit: 20 }, ctx });

export const getDeals = async ({ ctx, params }) => GET({ url: PRODUCT_API.DEALS, params, ctx });

export default {
  loadDataMostSearch,
  loadFeedback,
  getInfoBanner,
  getMenu,
  loadDataPormotion,
  loadDataProductCollection,
  loadDataManufacturer,
  getTabs,
  getDeals,
};
