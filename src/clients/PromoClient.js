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

async function getPromosActive({ ctx }) {
  const url = `${PROMOTION_API.PROMOTION_API_PREFIX}/promotion/active`;
  const res = await GET({ url, ctx });
  return res;
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

async function getPromoDetailByVoucherCode({ voucherCode }) {
  const url = PROMOTION_API.PROMOTION_DETAI_VOUCHER_CODE;
  return GET({ url, params: { voucherCode } });
}

export default {
  getPromos,
  getOtherPromos,
  getPromosByStatus,
  checkPromoAvailableForCart,
  getPromosActive,
  getPromoDetailByVoucherCode,
};
