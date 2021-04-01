import { PRODUCT_API, CART_API } from 'constants/APIUri';
import { isEmpty } from 'utils/ValidateUtils';
import { HTTP_STATUS } from 'constants/Enums';
import { GET, POST, PUT } from './Clients';

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
  const skus = data.reduce((accumulator, item) => {
    if (item?.sku) return [...accumulator, item.sku];
    return accumulator;
  }, []);
  if (skus.length === 0) {
    return {
      status: HTTP_STATUS.Forbidden,
      message: 'Dữ liệu không đủ',
    };
  }
  const skuListArray = [];
  const LIMIT = 50;
  for (let i = 0; i < skus.length; i += LIMIT) {
    skuListArray.push(skus.slice(i, i + LIMIT));
  }
  const responses = await Promise.all(
    skuListArray.map((skuList) => {
      const body = {
        codes: skuList,
      };
      const params = {
        limit: LIMIT + 1,
      };
      return POST({ url: PRODUCT_API.PRODUCT_LIST, body, params });
    }),
  );

  const mapProducts = {};
  responses.forEach((response) => {
    response?.data?.forEach((product) => {
      mapProducts[product?.sku] = product;
    });
  });

  return data.map((item) => {
    // TODO: ẩn nhà cung cấp
    // const { imageUrls, unit, volume, name, maxQuantity, slug, seller } =
    const { imageUrls, unit, volume, name, maxQuantity, slug } = mapProducts[item.sku] || {};
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
