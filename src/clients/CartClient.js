import { PRODUCT_API, CART_API } from 'constants/APIUri';
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
  const arraySku = [];
  data.forEach((item) => {
    arraySku.push(item.sku);
  });
  const body = {
    codes: arraySku,
  };
  const res = await POST({ url: PRODUCT_API.PRODUCT_LIST, body });
  if (!isValidWithData(res)) {
    return [];
  }
  const result = [];
  data.forEach((item, index) => {
    result[index] = {
      ...item,
      imageUrls: res.data[index] && res.data[index].imageUrls && res.data[index].imageUrls,
      unit: res.data[index] && res.data[index].unit && res.data[index].unit,
      volume: res.data[index] && res.data[index].volume && res.data[index].volume,
      name: res.data[index] && res.data[index].name && res.data[index].name,
      maxQuantity: res.data[index] && res.data[index].maxQuantity && res.data[index].maxQuantity,
    };
  });
  return result;
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
