import { CART_API } from 'constants/APIUri';
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
  updateCartItemImportant,
  updateDeliveryMethod,
  updatePaymentMethod,
};
