import { PRODUCT_API, CART_API } from 'constants/APIUri';
import { convertArrayToMap } from 'utils/ArrUtils';
import { isEmpty } from 'utils/ValidateUtils';
import { GET, POST, PUT, isValidWithData } from './Clients';

const loadDataCart = async (ctx) => GET({ url: CART_API.CART_INFO, ctx });

const updateCartItem = async (data) => {
  const body = {
    sku: data.product.sku,
    quantity: data.q,
  };
  return POST({ url: CART_API.CART_ADD, body });
};

// { sku, quantity, isImportant }
const updateCartItemImportant = async (body) => POST({ url: CART_API.CART_ADD, body });

const getInfoCartItem = async (data) => {
  if (isEmpty(data)) {
    return [];
  }
  const body = { codes: data.map((item) => item.sku) };
  const res = await POST({ url: PRODUCT_API.PRODUCT_LIST, body });
  if (!isValidWithData(res)) {
    return [];
  }

  const mapProducts = convertArrayToMap(res.data, 'sku');

  return data.map((item) => {
    // TODO: ẩn nhà cung cấp
    // const { imageUrls, unit, volume, name, maxQuantity, slug, seller } =
    const { imageUrls, unit, volume, name, maxQuantity, slug } = mapProducts.get(item.sku) || {};
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
};

const removeCartItem = ({ sku }) => {
  const body = { sku };
  return PUT({ url: CART_API.CART_REMOVE, body });
};

const updateRedeemCode = (redeemCode) => {
  const body = { redeemCode };
  return PUT({ url: CART_API.CART_UPDATE_REDEEM_CODE, body });
};

const updateDeliveryMethod = (body) => PUT({ url: CART_API.DELIVERY_METHOD_UPDATE, body });

const updatePaymentMethod = (body) => PUT({ url: CART_API.PAYMENT_METHOD_UPDATE, body });

const updateNote = (note) => {
  const body = { note };
  return PUT({ url: CART_API.CART_INFO, body });
};

export default {
  loadDataCart,
  updateCartItem,
  removeCartItem,
  updateRedeemCode,
  updateNote,
  getInfoCartItem,
  updateCartItemImportant,
  updateDeliveryMethod,
  updatePaymentMethod,
};
