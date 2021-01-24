import { PRODUCT_API, CART_API } from 'constants/APIUri';
import { convertArrayToMap } from 'utils/ArrUtils';
import { GET, POST, PUT, isValid, isValidWithData } from './Clients';

async function loadDataCart(ctx) {
  const res = await GET({ url: CART_API.CART_INFO, ctx });
  if (!isValid(res)) {
    return [];
  }
  return res.data;
}

async function updateCartItem(data) {
  const body = {
    sku: data.product.skuId,
    quantity: data.q,
  };
  return POST({ url: CART_API.CART_ADD, body });
}

async function getInfoCartItem(data) {
  if (!data || data.length === 0) {
    return [];
  }
  const body = {
    codes: data.map((item) => item.sku),
  };
  const res = await POST({ url: PRODUCT_API.PRODUCT_LIST, body });
  if (!isValidWithData(res)) {
    return [];
  }

  const mapProducts = convertArrayToMap(res.data, 'skuId');

  return data.map((item) => {
    const { imageUrls, unit, volume, name, maxQuantity, slug } = mapProducts.get(item.skuId) || {};
    return {
      ...item,
      imageUrls,
      unit,
      volume,
      name,
      maxQuantity,
      slug,
    };
  });
}

async function removeCartItem(data) {
  const body = {
    skuId: data.skuId,
  };
  return PUT({ url: CART_API.CART_REMOVE, body });
}

async function updateRedeemCode(code) {
  const body = {
    redeemCode: code,
  };
  return PUT({ url: CART_API.CART_INFO, body });
}

async function updateNote(note) {
  const body = {
    note,
  };
  return PUT({ url: CART_API.CART_INFO, body });
}

export default {
  loadDataCart,
  updateCartItem,
  removeCartItem,
  updateRedeemCode,
  updateNote,
  getInfoCartItem,
};
