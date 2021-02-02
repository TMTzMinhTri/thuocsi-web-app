import { PROMOTION_API } from 'constants/APIUri';
import { GET, POST, isValid } from './Clients';

async function getPromos(ctx) {
  const url = PROMOTION_API.PROMOTION_ALL;
  const res = await GET({ url, ctx });
  if (!isValid(res)) {
    return [];
  }
  return res.data;
}

async function getPromosByStatus({ ctx, status }) {
  const stringify = encodeURI(JSON.stringify({ status }));
  const url = `${PROMOTION_API.PROMOTION_ALL}?q=${stringify}`;
  const res = await GET({ url, ctx, isBasic: true });
  if (!isValid(res)) {
    return [];
  }
  return res.data;
}
async function getOtherPromos() {
  const url = '/promo-codes/other';
  const result = await GET({ url, mock: true });
  if (!isValid(result)) {
    return [];
  }
  return result.data;
}

async function checkPromoAvailableForCart({ voucherCode, cartItems, totalPrice, ctx }) {
  const url = `${PROMOTION_API.PROMOTION_API_PREFIX}/check`;
  const body = { voucherCode, cartItems, totalPrice };
  const result = await POST({ url, ctx, body });
  return result;
}

export default {
  getPromos,
  getOtherPromos,
  getPromosByStatus,
  checkPromoAvailableForCart,
};
